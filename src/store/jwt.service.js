// const ID_TOKEN_KEY = "dX0IY675gh1eFGPWn62z";
const USER_KEY = "hr6Ssk5YGKhYKltISaM7";
import Cookies from "js-cookie";

export const getToken = () => {
  return Cookies.get("token");
};

export const saveToken = (token) => {
  Cookies.setItem("token", token);
};

export const destroyToken = () => {
  Cookies.removeItem("token");
};

export const getUser = () => {
  return window.localStorage.getItem(USER_KEY);
};

export const saveUser = (data) => {
  window.localStorage.setItem(USER_KEY, data);
};

export const destroyUser = () => {
  window.localStorage.removeItem(USER_KEY);
  Cookies.remove("PHPSESSID");
};

export const getSession = () => {
  return Cookies.get("PHPSESSID");
};

export default {
  getToken,
  saveToken,
  destroyToken,
  getUser,
  saveUser,
  destroyUser,
  getSession,
};
