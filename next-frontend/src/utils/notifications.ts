import { toast } from 'react-toastify';

export const notifyError = (errorCode: string) => {
  const errorMessages: { [key: string]: string } = {
    "ERR_AUTH_USERNAME": "Username is already taken.",
    "ERR_AUTH_EMAIL": "Email is already in use.",
    "Email Not Found":"Email Not Found"
  };

  const message = errorMessages[errorCode] || "An unknown error occurred.";
  toast.error(message);
};
