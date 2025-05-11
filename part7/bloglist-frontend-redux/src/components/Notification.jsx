import { useSelector } from "react-redux";

const Notification = () => {
  const message = useSelector((state) => state.notification.message)
  const messageStyle = useSelector((state) => state.notification.messageStyle)

  if (message === '') {
    return null;
  }

  return <div className={messageStyle}>{message}</div>;
};

export default Notification;
