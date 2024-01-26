import { isLoggedIn, doLogin, getCurrentUser, doLogOut } from './auth.js';
import { bookCourse, getCourse, removeCourse } from './fetch.js';

const imgURL = '/img/';

const drawMinSidaUser = (user) => {
  const div = createDiv();
  const h3 = createHeaderThree('Hejsan ' + user.namn + '!');
  const p = createParagraph('');
  if (user.bokningar.length > 0) {
    p.append('Du är inskriven i nedanstående kurser');
    user.bokningar.forEach(async (bokning) => {
      const course = await getCourse(bokning[0]);
      div.append(drawKursCard(course));
      div.lastChild.append(createParagraph(bokning[1]));
      div.classList.add('hasCourses');
    });
  } else {
    p.innerHTML =
      'Du har tyvärr inte bokat upp dig på några kurser, besök gärna <a href="./kurser.html">sidan för kurser</a> för att säkra en plats.';
  }
  div.append(h3, p);
  return div;
};
const drawHeader = () => {
  let links = [
    { href: '/', text: 'Start' },
    {
      href: '/kurser.html',
      text: 'Kurser',
    },
  ];
  let header = document.querySelector('header');
  header.append(
    createNavigation(links),
    createHeaderOne('<a href="/">WestCoast Education</a>'),
    isLoggedIn()
      ? createFontAwesome(['fa-regular', 'fa-user'])
      : createFontAwesome(['fa-solid', 'fa-right-to-bracket']),
    isLoggedIn() ? createFontAwesome(['fa-regular', 'fa-circle-xmark']) : ''
  );
  if (isLoggedIn()) {
    header.lastChild.previousSibling.addEventListener('click', () => {
      location.href = './minasidor.html';
    });
    header.lastChild.addEventListener('click', doLogOut);
  } else {
    header.lastChild.remove();
    header.lastChild.addEventListener('click', () => {
      location.href = './minasidor.html';
    });
  }
};

const drawFooter = () => {
  let footer = document.querySelector('footer');
  footer.append(createParagraph('WestCoast Education 2023 ©'));
};

const drawLogin = () => {
  const div = createDiv();
  const form = document.createElement('form');
  const label = createLabel('username', 'Användarnamn');
  const input = createInput('text', 'username', '');
  const label2 = createLabel('password', 'Lösenord');
  const input2 = createInput('password', 'password', '');
  const button = createInput('button', 'login', 'Logga in');
  button.addEventListener('click', async (e) => {
    e.preventDefault();

    if (await doLogin(input.value, input2.value)) {
      location.href = './minasidor.html';
    } else {
      alert('Fel användarnamn/lösenord');
    }
  });
  form.append(label, input, label2, input2, button);
  div.append(form);
  return div;
};

const drawKursCard = (kurs) => {
  let div = createDiv();
  div.className = 'kurser';
  div.append(
    createImg({
      src: imgURL + kurs.kursBild,
      alt: kurs.kursTitel,
      width: 100,
      height: 100,
    }),
    createHeaderThree(kurs.kursTitel),
    createParagraph(kurs.beskrivning)
  );
  div.addEventListener('click', () => {
    location.href = `./kurser.html?id=${kurs.id}`;
  });
  return div;
};

const drawKursPage = (kurs) => {
  let div = createDiv();
  let fa = createFontAwesome(['fa-solid', 'fa-arrow-left']);
  let span = createSpan('');
  span.append(fa, ' Tillbaka till kurser');
  span.addEventListener('click', () => {
    location.href = './kurser.html';
  });
  div.className = 'kurs';

  let div2 = createDiv();
  div2.append(
    createHeaderThree(kurs.kursTitel),
    createSpan('Kod: ' + kurs.id),
    createSpan('Startdatum: ' + kurs.kursStart),
    createSpan('Längd(dagar): ' + kurs.kursDagar),
    createSpan('Upplägg: ' + kurs.kursUpplagg),
    createParagraph(kurs.djupareBeskrivning)
  );
  div.append(
    span,
    createImg({
      src: imgURL + kurs.kursBild,
      alt: kurs.kursTitel,
      width: 100,
      height: 100,
    }),
    div2
  );
  if (isLoggedIn()) {
    const user = getCurrentUser();
    switch (kurs.kursUpplagg) {
      case 'På plats':
        if (
          user.bokningar.find(
            (arr) => arr[0] == kurs.id && arr[1] == 'På plats'
          )
        ) {
          const p = createParagraph('Du är bokad på plats på denna kurs');
          const button = createButton('Ta bort anmälan', () => {
            removeCourse([kurs.id, kurs.kursUpplagg]);
          });
          button.classList.add('removeCourse');
          p.append(button);
          div.append(p);
        } else {
          div.append(
            createButton('Boka På plats', async () => {
              await bookCourse(user, kurs.id, kurs.kursUpplagg);
              location.reload();
            })
          );
        }
        break;
      case 'På plats/Distans':
        if (
          user.bokningar.find(
            (arr) => arr[0] == kurs.id && arr[1] == 'På plats'
          )
        ) {
          const p = createParagraph('Du är bokad på plats på denna kurs');
          const button = createButton('Ta bort anmälan', () => {
            removeCourse([kurs.id, 'På plats']);
          });
          button.classList.add('removeCourse');
          p.append(button);
          div.append(p);
        } else {
          div.append(
            createButton('Boka På plats', async () => {
              await bookCourse(user, kurs.id, 'På plats');
              location.reload();
            })
          );
        }
        if (
          user.bokningar.find((arr) => arr[0] == kurs.id && arr[1] == 'Distans')
        ) {
          const p = createParagraph('Du är bokad på distans på denna kurs');
          const button = createButton('Ta bort anmälan', () => {
            removeCourse([kurs.id, 'Distans']);
          });
          button.classList.add('removeCourse');
          p.append(button);
          div.append(p);
        } else {
          div.append(
            createButton('Boka Distans', async () => {
              await bookCourse(user, kurs.id, 'Distans');
              location.reload();
            })
          );
        }

        break;
      case 'Distans':
        if (
          user.bokningar.find((arr) => arr[0] == kurs.id && arr[1] == 'Distans')
        ) {
          const p = createParagraph('Du är bokad på distans på denna kurs');
          const button = createButton('Ta bort anmälan', () => {
            removeCourse([kurs.id, kurs.kursUpplagg]);
          });
          button.classList.add('removeCourse');
          p.append(button);
          div.append(p);
        } else {
          div.append(
            createButton('Boka På distans', async () => {
              await bookCourse(user, kurs.id, kurs.kursUpplagg);
              location.reload();
            })
          );
        }
        break;
    }
  } else {
    console.log('Inte inloggad');
  }
  return div;
};
const createButton = (text, action) => {
  const button = document.createElement('button');
  button.append(text);
  button.addEventListener('click', action);
  return button;
};

const createLabel = (target, text) => {
  const label = document.createElement('label');
  label.append(text);
  label.setAttribute('for', target);
  return label;
};

const createInput = (type, name, value) => {
  const input = document.createElement('input');
  input.setAttribute('type', type);
  input.setAttribute('id', name);
  input.setAttribute('name', name);
  input.setAttribute('value', value);
  return input;
};

const createNavigation = (links) => {
  let nav = document.createElement('nav');
  let ul = document.createElement('ul');
  links.forEach((link) => {
    let li = document.createElement('li');
    let a = document.createElement('a');
    a.setAttribute('href', link.href);
    a.append(document.createTextNode(link.text));
    li.append(a);
    ul.append(li);
  });
  ul.classList.add('hide');
  let fa = createFontAwesome(['fa-solid', 'fa-bars', 'fa-inverse']);
  fa.addEventListener('click', () => {
    ul.classList.toggle('hide');
  });
  nav.append(fa, ul);
  return nav;
};

const createFontAwesome = (classList) => {
  let i = document.createElement('i');
  i.classList.add(...classList);
  return i;
};

const createHeaderOne = (text) => {
  let h1 = document.createElement('h1');
  h1.innerHTML = text;
  return h1;
};

const createHeaderThree = (text) => {
  let h3 = document.createElement('h3');
  h3.innerHTML = text;
  return h3;
};

const createParagraph = (text) => {
  let p = document.createElement('p');
  p.append(text);
  return p;
};
const createSpan = (text) => {
  let span = document.createElement('span');
  span.append(document.createTextNode(text));
  return span;
};

const createDiv = () => {
  return document.createElement('div');
};

const createImg = (imgData) => {
  let img = document.createElement('img');
  for (const [key, value] of Object.entries(imgData)) {
    img.setAttribute(key, value);
  }
  return img;
};

export {
  drawHeader,
  drawFooter,
  drawKursCard,
  drawKursPage,
  drawLogin,
  drawMinSidaUser,
};
