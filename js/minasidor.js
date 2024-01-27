import { isLoggedIn, getCurrentUser } from './auth.js';
import { drawLogin, drawMinSidaUser, drawRegister } from './dom.js';
import { drawAdminPage } from './administrate.js';

const main = document.querySelector('main');
const searchParams = new URLSearchParams(window.location.search);
const initPage = async () => {
  if (isLoggedIn()) {
    const user = getCurrentUser();
    if (user.isAdmin) {
      main.append(await drawAdminPage());
    } else {
      main.append(await drawMinSidaUser(user));
    }
  } else if (searchParams.has('registrera')) {
    main.append(await drawRegister());
  } else {
    main.append(await drawLogin());
  }
};

document.addEventListener('DOMContentLoaded', initPage);
