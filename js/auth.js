const isLoggedIn = () => {
  return localStorage.getItem('user') !== null;
};

const doLogin = (username, password) => {
  console.log(username, password);
};

export { isLoggedIn, doLogin };
