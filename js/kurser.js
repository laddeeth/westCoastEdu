import { getAll, getCourse } from './fetch.js';
import { createKursCard, createKursPage } from './dom.js';

const initPage = async () => {
  const searchParams = new URLSearchParams(window.location.search);
  const main = document.querySelector('main');

  if (searchParams.has('id')) {
    const kurs = await getCourse(searchParams.get('id'));
    main.append(createKursPage(kurs));
  } else {
    const kurser = await getAll();

    kurser.forEach((kurs) => {
      main.append(createKursCard(kurs));
    });
  }
};

document.addEventListener('DOMContentLoaded', initPage);
