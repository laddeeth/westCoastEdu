import { getAll } from './fetch.js';
import { createKursCard } from './dom.js';

const initPage = async () => {
  const kurser = await getAll('http://localhost:3000/kursData');
  const main = document.querySelector('main');

  kurser.forEach((kurs) => {
    main.append(createKursCard(kurs));
  });
};

document.addEventListener('DOMContentLoaded', initPage);
