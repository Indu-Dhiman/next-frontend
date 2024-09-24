import { toast } from 'react-toastify';

export const notifyError = (errorCode: string, time?: string, id?: string | number) => {
  const errorMessages: { [key: string]: string } = {
    "ERR_AUTH_USERNAME": "Username is already taken.",
    "ERR_AUTH_EMAIL": "Email is already in use.",
    "Email Not Found": "Email Not Found",
    "ERR_AUTH_USERNAME_OR_EMAIL_ALREADY_EXIST": "Email Already Exist",
    "Password Not Matched": "Password Not Matched",
  };

  const message = errorMessages[errorCode] || "An unknown error occurred.";

  toast.error(message, {
    toastId: id, 
    autoClose: time ? parseInt(time) : undefined, 
  });
};
