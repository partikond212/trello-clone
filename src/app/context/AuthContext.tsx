import { createContext, useContext, useEffect, useState, type FC } from "react";
import { getMe } from "@/entities/user/api/userApi";
import type { User } from "@/entities/user/model/User";

type AuthContextType = {
  user: User | null;
  token: string;
  isLoading: boolean;
  login: (data: { token: string; user: User }) => void;
  logout: () => void;
  updateUser: (newUser: User) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (!savedToken) {
      setIsLoading(false);
      return;
    }

    getMe(savedToken)
      .then((freshUser) => {
        setUser(freshUser);
        setIsLoading(false);
        setToken(savedToken);
      })
      .catch(() => {
        setIsLoading(false);
        localStorage.removeItem("token");
      });
  }, []);
  const updateUser = (newUser: User) => {
    setUser(newUser);
  };
  const login = (data: { token: string; user: User }) => {
    localStorage.setItem("token", data.token);
    setUser(data.user);
    setToken(data.token);
  };
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken("");
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, token, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
