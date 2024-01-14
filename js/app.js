import { drawHeader, drawFooter } from './dom.js';

const initPage = async () => {
  drawHeader();
  drawFooter();
};

document.addEventListener('DOMContentLoaded', initPage);
