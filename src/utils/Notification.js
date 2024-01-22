import { notification } from 'antd';


export const openNotificationWithIcon = (type, message, description) => {
  notification[type]({
    message: <p >{message}</p>,
    description
  });
};
