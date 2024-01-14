const drawHeader = () => {
  let links = [
    { href: '/', text: 'Start' },
    { href: '/kurser.html', text: 'Kurser' },
  ];
  let header = document.querySelector('header');
  header.append(
    createNavigation(links),
    createHeaderOne('<a href="/">WestCoast Education</a>'),
    createSpan('')
  );
};

const drawFooter = () => {
  let footer = document.querySelector('footer');
  footer.append(createParagraph('WestCoast Education 2023 ©'));
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

export { drawHeader, drawFooter };
