import { isLoggedIn, getCurrentUser } from './auth.js';
import { drawLogin, drawMinSidaUser, drawRegister } from './dom.js';

const main = document.querySelector('main');
const searchParams = new URLSearchParams(window.location.search);

if (isLoggedIn()) {
  const user = getCurrentUser();
  if (user.isAdmin) {
    console.log('I am admin');
  } else {
    main.append(drawMinSidaUser(user));
  }
} else if (searchParams.has('registrera')) {
  main.append(drawRegister());
} else {
  main.append(drawLogin());
}
