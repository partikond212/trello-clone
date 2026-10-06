import { useState } from "react";
import useLogin from "../model/useLogin";
import styles from "./LoginForm.module.css";
import { useNotification } from "@/app/context/NotificationContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  //TODO:Можно было бы сделать так чтобы формы плавно между собой переключались
  const { mutate: loginUser } = useLogin();
  const { showNotification } = useNotification();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser(
      { email, password },
      {
        onSuccess: () => {
          showNotification("Вы успешно вошли в аккаунт", "success");
          setTimeout(() => {
            navigate("/user/me");
          }, 2000);
        },
        onError: () => {
          showNotification("Вы не смогли войти в аккаунт", "error");
        },
      },
    );
  };
  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <h2>С возвращением</h2>
      <span>Войдите, чтобы продолжить работу с досками команды.</span>
      <div className={styles.inputs}>
        <div className={styles.userEmailInput}>
          <label htmlFor="userEmail">Email</label>
          <input
            type="email"
            id="userEmail"
            placeholder="you@team.dev"
            autoComplete="false"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.userPasswordInput}>
          <label htmlFor="userPassword">Пароль</label>
          <input
            type="password"
            id="userPassword"
            placeholder="......"
            autoComplete="false"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <button type="submit" className={styles.submitButton}>
        Войти
      </button>
    </form>
  );
};

export default LoginForm;
