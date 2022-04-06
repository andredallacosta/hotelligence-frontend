// alerts if well done, can send snackbars to front
// plans in the future with that e-e

// importing functions and variables redux
import { alertConstants } from "Redux@Constants";

function request(message) {
  return { type: alertConstants.INFO, message };
}

function success(message) {
  message = { message, isDialog: true };
  return { type: alertConstants.SUCCESS, message };
}

function error(_message, title) {
  // Converte o erro em um Array com as entradas.
  let message = _message.response ? Object.entries(_message.response.data) : "";

  message = {
    message: {
      message: _message,
      title,
    },
    isDialog: true,
  };

  if (_message.response?.status === 400) {
    message = {
      message: {
        message,
        title,
      },
      isDialog: true,
    };
  }

  return { type: alertConstants.ERROR, message };
}

export const alertActions = {
  request,
  success,
  error,
};
