import { isLoggedIn, getCurrentUser } from './auth.js';
import { drawLogin, drawMinSidaUser } from './dom.js';

const main = document.querySelector('main');
if (isLoggedIn()) {
  const user = getCurrentUser();
  if (user.isAdmin) {
    console.log('I am admin');
  } else {
    main.append(drawMinSidaUser(user));
  }
} else {
  main.append(drawLogin());
}
