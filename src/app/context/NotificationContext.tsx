import { createContext, useContext, useState,type FC } from "react";
import Notification, {type NotificationProps, type NotificationType} from "../../shared/ui/notification/Notification";

type NotificationContextType = {
  showNotification:(message:string , type: NotificationType) => void,
  hideNotification:() => void,
  
}

const NotificationContext = createContext<NotificationContextType | null>(null)

type NotificationProviderProps = {
  children:React.ReactNode
}
export const NotificationProvider:FC<NotificationProviderProps>= ({children}) => {
 const [notification, setNotification] = useState< Pick<NotificationProps,'message' | 'type'> | null>(null);

const showNotification = (message:string , type: NotificationType = 'info') => {
  setNotification({ message, type });
};
 
const hideNotification = () => setNotification(null);

return  (
  <NotificationContext.Provider value={{showNotification,hideNotification}} >
    {children}
    {notification &&
    <Notification type = {notification.type} onClose={hideNotification} duration={4000} message={notification.message}/>
    }
  </NotificationContext.Provider>
)
};

export const  useNotification = () => {
  const context = useContext(NotificationContext);
  if(!context) {
        throw new Error('useNotification must be used within NotificationProvider');

  }
  return context
}