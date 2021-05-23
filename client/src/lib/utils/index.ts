import { message, notification } from 'antd';
import { MessageType } from 'antd/lib/message';

export const iconColor = '#1890ff';

export const formatListingPrice = (price: number, round = true) => {
  const formattedListingPrice = round ? Math.round(price / 100) : price / 100;
  return `$${formattedListingPrice}`;
}

export const displaySuccessNotification = (
  message: string,
  description?: string,
): void => {
  return notification['success']({
    message,
    description,
    placement: 'topLeft',
    style: {
      marginTop: 50,
    },
  });
};

export const displayErrorMessage = (error: string): MessageType => {
  return message.error(error);
};
