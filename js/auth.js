import { getUsers } from './fetch.js';

const isLoggedIn = () => {
  return localStorage.getItem('user') !== null;
};

const doLogin = async (username, password) => {
  const users = await getUsers();
  const user = users.find((user) => user.epost == username);
  if (user && user.password == password) {
    localStorage.user = JSON.stringify(user);
    return true;
  } else {
    return false;
  }
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.user);
};

export { isLoggedIn, doLogin, getCurrentUser };
