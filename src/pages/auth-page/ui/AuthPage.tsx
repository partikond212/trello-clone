import { useState, type FC } from "react";
import LoginForm from "@/features/login/ui/LoginForm";
import RegisterForm from "@/features/register/ui/RegisterForm";
import styles from "./AuthPage.module.css";
const AuthPage: FC = () => {
  const [authState, setAuthState] = useState<"login" | "register">("login");
  return (
    <div className={styles.authPage}>
      <div className={styles.banner}>
        <div className={styles.title}>
          <div className={styles.titleLogo}>
            <svg
              data-dc-tpl="45"
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="#0079BF"
            >
              <rect
                data-dc-tpl="46"
                x="3"
                y="3"
                width="7"
                height="15"
                rx="2"
              ></rect>
              <rect
                data-dc-tpl="47"
                x="14"
                y="3"
                width="7"
                height="9"
                rx="2"
              ></rect>
            </svg>
          </div>
          <span>Trello Clone</span>
        </div>
        <h1 className={styles.pageSentence}>
          Доски, колонки и карточки — без лишнего шума
        </h1>
        <ul className={styles.bannerInfo}>
          <li>Колонки и карточки с метками, сроками и приоритетами</li>
          <li>Перетаскивание задач между этапами</li>
          <li>Чек-листы, участники и обсуждение в карточке</li>
        </ul>
      </div>
      <div className={styles.authActions}>
        <div className={styles.authButtons}>
          <div
            className={`${styles.thumb} ${authState === "login" ? `${styles.thumbLogin}` : `${styles.thumbRegister}`} `}
          ></div>
          <button
            className={`${authState === "login" ? `${styles.activeButton} ` : `${styles.disactiveButton}`}`}
            data-action="login"
            onClick={() => setAuthState("login")}
          >
            Вход
          </button>
          <button
            className={`${authState === "register" ? `${styles.activeButton} ` : `${styles.disactiveButton}`}`}
            data-action="register"
            onClick={() => setAuthState("register")}
          >
            Регистрация
          </button>
        </div>
        {authState === "login" ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
};

export default AuthPage;
