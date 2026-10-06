import { useAuth } from "@/app/context/AuthContext";
import { useState, type FC } from "react";
import UserAvatar from "./UserAvatar";
import Header from "@/widgets/header/ui/Header";
import NotificationThumbButton from "./components/notification-thumb-button/NotificationThumbButton";
import FileUpload from "@/shared/ui/file-upload/FileUpload";
import { useNotification } from "@/app/context/NotificationContext";
import useEditUser from "@/features/edit-user/model/useEditUser";
import styles from "./UserProfile.module.css";
import { useNavigate } from "react-router-dom";
const UserProfile: FC = () => {
  const { user, logout } = useAuth();
  const { mutate } = useEditUser();
  const { showNotification } = useNotification();
  const [name, setName] = useState(user?.name);
  const [hasChanges, setHasChanges] = useState(false);
  const [email, setEmail] = useState(user?.email);
  const navigate = useNavigate();
  const handleChangeUser = (email?: string, name?: string) => {
    mutate(
      { email, name },
      {
        onSuccess: () => {
          showNotification("Вы успешно изменили пользователя", "success");
          setHasChanges(false);
        },
        onError: () => {
          showNotification("Вы не смогли изменить пользователя", "error");
        },
      },
    );
  };
  const handleNavigation = () => {
    navigate("/");
  };
  const rejectChanges = () => {
    setEmail(user?.email);
    setName(user?.name);
    setHasChanges(false);
  };
  const handleChangeAvatar = (avatar: string) => {
    mutate(
      { avatar },
      {
        onSuccess: () => {
          showNotification("Вы успешно изменили аватарку", "success");
          setHasChanges(false);
        },
        onError: () => {
          showNotification("Вы не смогли изменить аватарку", "error");
        },
      },
    );
  };
  return (
    <div className={styles.userProfileWrapper}>
      <Header />
      <button
        onClick={() => handleNavigation()}
        className={styles.goToTheBoardsPageBtn}
      >
        На главную
      </button>

      <main className={styles.userProfile}>
        <h1 className={styles.title}>Профиль и настройки</h1>
        <span className={styles.SubTitle}>
          Данные аккаунта и параметры рабочего пространства.
        </span>
        <div className={styles.userInfo}>
          <div className={styles.mainInfo}>
            <div className={styles.avatarAndInitials}>
              <UserAvatar className={styles.userAvatar} user={user!} />
              <div className={styles.userInitials}>
                <span className={styles.userName}>{user?.name}</span>
                <span>{user?.email}</span>
              </div>
            </div>
            <FileUpload onSuccess={(value) => handleChangeAvatar(value)} />
          </div>
          <div className={styles.changeInfo}>
            <div className={styles.changeInfoElements}>
              <div className={styles.changeInfoEl}>
                <label htmlFor="userName">Имя</label>
                <input
                  type="text"
                  id="userName"
                  onChange={(e) => {
                    setName(e.target.value);
                    setHasChanges(true);
                  }}
                  value={name}
                />
              </div>
              <div className={styles.changeInfoEl}>
                <label htmlFor="userEmail">Email</label>
                <input
                  type="email"
                  id="userEmail"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setHasChanges(true);
                  }}
                  value={email}
                />
              </div>
            </div>
            <div
              className={`${styles.btnChangesBlock} ${hasChanges ? styles.active : styles.hidden} `}
            >
              <button
                type="button"
                className={`${styles.saveChanges} ${hasChanges ? styles.active : styles.hidden} `}
                onClick={() => handleChangeUser(email, name)}
              >
                Сохранить изменения
              </button>
              <button
                type="button"
                className={`${styles.rejectChanges} ${hasChanges ? styles.active : styles.hidden} `}
                onClick={() => rejectChanges()}
              >
                Отменить изменения
              </button>
            </div>
          </div>
        </div>
        <div className={styles.userSettings}>
          <div className={styles.settingsTitle}>
            <span>Уведомления</span>
          </div>
          <div className={styles.settingsElement}>
            <div className={styles.settingsElementInfo}>
              <span className={styles.spanTitle}>Упоминания и комментарии</span>
              <span className={styles.spanSubTitle}>
                Письмо, когда вас упомянули в карточке
              </span>
            </div>
            <NotificationThumbButton />
          </div>
          <div className={styles.settingsElement}>
            <div className={styles.settingsElementInfo}>
              <span className={styles.spanTitle}>Приближение дедлайна</span>
              <span className={styles.spanSubTitle}>
                Напоминание за день до срока
              </span>
            </div>
            <NotificationThumbButton />
          </div>
          <div className={styles.settingsElement}>
            <div className={styles.settingsElementInfo}>
              <span className={styles.spanTitle}>Активность на доске</span>
              <span className={styles.spanSubTitle}>
                Ежедневная сводка изменений
              </span>
            </div>

            <NotificationThumbButton />
          </div>
        </div>
        <div className={styles.userSession}>
          <div>
            <span>Сессия</span>
          </div>
          <div>
            <span>Выйти из аккаунта на этом устройстве.</span>
          </div>
          <button onClick={logout} className={styles.logout}>
            Выйти
          </button>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
