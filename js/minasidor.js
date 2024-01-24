import { isLoggedIn, getCurrentUser } from './auth.js';
import { drawLogin } from './dom.js';

const main = document.querySelector('main');
if (isLoggedIn()) {
  const user = getCurrentUser();
  if (user.isAdmin) {
    console.log('I am admin');
  } else {
    console.log('I am user');
  }
} else {
  main.append(drawLogin());
}
