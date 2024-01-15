import { getAll } from './fetch.js';
import { createKursCard } from './dom.js';

const initPage = async () => {
  const kurser = await getAll('http://localhost:3000/kursData');
  kurser.forEach((kurs) => {
    createKursCard(kurs);
  });
};

document.addEventListener('DOMContentLoaded', initPage);
