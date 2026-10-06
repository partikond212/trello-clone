import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import QueryProvider from "./providers/QueryProvider";
import { RouterProvider } from "./providers/RouterProvider";

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <QueryProvider>
          <RouterProvider />
        </QueryProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
