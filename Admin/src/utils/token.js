import { STORAGE } from "../contants/storage";

export const localToken = {
  get: () => JSON.parse(localStorage.getItem(STORAGE.token)),
  set: (token) => {
    return localStorage.setItem(STORAGE.token, JSON.stringify(token));
  },
  remove: () => localStorage.removeItem(STORAGE.token),
};
const tokenMethod = {
  get: () => {
    return localToken.get();
  },
  set: (token) => {
    return localToken.set(token);
  },
  remove: () => {
    return localToken.remove();
  },
};
export default tokenMethod;
