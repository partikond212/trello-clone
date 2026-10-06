import React, { useState } from "react";
import styles from "./RegisterForm.module.css";
import useRegister from "../model/useRegister";
import { useNotification } from "@/app/context/NotificationContext";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { mutate: registUser } = useRegister();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registUser(
      { name, email, password },
      {
        onSuccess: () => {
          showNotification("Вы зарегали аккаунт", "success");
          setTimeout(() => {
            navigate("/user/me");
          }, 2500);
        },
        onError: (error) => {
          showNotification(
            getErrorMessage(error, "Не удалось зарегистрировать аккаунт"),
            "error",
          );
        },
      },
    );
  };
  return (
    <form className={styles.registerForm} onSubmit={handleSubmit}>
      <h2>Создайте аккаунт</h2>
      <span>Бесплатно, без ограничений на количество досок.</span>
      <div className={styles.inputs}>
        <div className={styles.fullNameInput}>
          <label htmlFor="fullUserName">Имя</label>
          <input
            type="text"
            id="fullUserName"
            placeholder="Аня Ковалёва"
            autoFocus
            autoComplete="false"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
        Зарегистрироваться
      </button>
    </form>
  );
};

export default RegisterForm;
