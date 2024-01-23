import { isLoggedIn } from './auth.js';
import { drawLogin } from './dom.js';

const main = document.querySelector('main');
if (isLoggedIn()) {
} else {
  main.append(drawLogin());
}
