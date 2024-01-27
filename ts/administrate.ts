const searchParams: URLSearchParams = new URLSearchParams(
  window.location.search
);

enum Settings {
  KURSURL = 'http://localhost:3000/kursData',
  USERURL = 'http://localhost:3000/userData',
}

interface Kurs {
  readonly id: number;
  bokningar: [number, string][];
  kursTitel: string;
  kursDagar: number;
  kursPris: number;
}

interface User {
  namn: string;
  efterNamn: string;
  bokningar: [number, string][];
}

const drawAdminPage = async (): Promise<HTMLDivElement> => {
  if (searchParams.has('add')) {
    const div: HTMLDivElement = createDiv();
    div.classList.add('adminPage');
    div.append(
      createButton('<- Tillbaka till kurser', () => {
        location.href = './minasidor.html';
      }),
      createH2('Lägg till ny kurs')
    );
    const form = createForm();
    form.append(
      createLabel('kursTitel', 'Titel'),
      createInput('text', 'kursTitel', ''),
      createLabel('kursDagar', 'Antal dagar'),
      createInput('number', 'kursDagar', ''),
      createLabel('kursPris', 'Pris'),
      createInput('number', 'kursPris', ''),
      createButton('Lägg till kurs', (e: Event) => {
        e.preventDefault();
        addCourse(form);
      })
    );
    div.append(form);
    return div;
  } else {
    const courses: Kurs[] = await getCourses();
    const div: HTMLDivElement = createDiv();
    div.append(createH2('Kurser & Deltagare'));
    div.append(
      createButton('Lägg till ny kurs', () => {
        location.href = '?add';
      })
    );
    div.classList.add('adminPage');
    courses.forEach(async (course: Kurs) => {
      div.append(await createCourseCard(course));
    });
    return div;
  }
};

const addCourse = async (form: HTMLFormElement): Promise<void> => {
  const formData: FormData = new FormData(form);
  for (const [name, value] of formData.entries()) {
    const input = document.querySelector(`input[name="${name}"]`);
    input ? input.classList.remove('faulty') : false;
    if (value.toString().length < 1) {
      const label: HTMLLabelElement | null =
        document.querySelector<HTMLLabelElement>(`label[for="${name}"]`);
      const input: HTMLInputElement | null =
        document.querySelector<HTMLInputElement>(`input[name="${name}"]`);
      input ? input.classList.add('faulty') : false;
      label
        ? alert(`Du måste fylla i ${label.innerHTML}`)
        : alert('Nånting gick fel');
      return;
    }
  }
  const entries: {
    [k: string]: any;
  } = Object.fromEntries(formData.entries());
  entries.bokningar = [];
  entries.kursUpplagg = 'På plats';
  entries.kursBild = 'landingpage.png';
  entries.kursStart = new Date().toLocaleDateString('sv-SE');
  entries.beskrivning = 'Ny kurs';
  entries.djupareBeskrivning =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...';

  console.log(entries);

  try {
    const response = await fetch(Settings.KURSURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entries),
    });

    if (response.ok) {
      await response.json();
      alert(`Du har lagt till kursen ${entries.kursTitel}`);
      location.href = './minasidor.html';
    } else {
      throw new Error(`${response.status} ${response.statusText}`);
    }
  } catch (error) {
    throw new Error(`Ett fel inträffade i add metoden: ${error}`);
  }
};

const getCourses = async (): Promise<Kurs[]> => {
  try {
    const response = await fetch(Settings.KURSURL);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(`${response.status} ${response.statusText}`);
    }
  } catch (error) {
    throw new Error(`Ett fel inträffade i get metoden: ${error}`);
  }
};

const getUser = async (id: number): Promise<User> => {
  try {
    const response = await fetch(`${Settings.USERURL}/${id}`);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(`${response.status} ${response.statusText}`);
    }
  } catch (error) {
    throw new Error(`Ett fel inträffade i get metoden: ${error}`);
  }
};

const createDiv = (): HTMLDivElement => {
  return document.createElement('div');
};

const createSpan = (text: string): HTMLSpanElement => {
  const span = document.createElement('span');
  span.append(text);
  return span;
};

const createCourseCard = async (kurs: Kurs): Promise<HTMLDivElement> => {
  const div: HTMLDivElement = createDiv();
  div.append(
    createSpan(kurs.id + ': ' + kurs.kursTitel),
    createSpan(`Antal dagar: ${kurs.kursDagar}`),
    createSpan(`Pris: ${kurs.kursPris}:-`),
    createH3('Deltagare'),
    createHr()
  );
  kurs.bokningar.forEach(async (element: [number, string]) => {
    const span = createSpan(
      (await getUser(element[0])).namn +
        ' ' +
        (await getUser(element[0])).efterNamn +
        ' - ' +
        element[1]
    );
    div.append(span);
  });
  return div;
};

const createHr = (): HTMLHRElement => {
  return document.createElement('hr');
};

const createH3 = (text: string): HTMLHeadingElement => {
  const h3 = document.createElement('h3');
  h3.append(text);
  return h3;
};

const createH2 = (text: string): HTMLHeadingElement => {
  const h2 = document.createElement('h2');
  h2.append(text);
  return h2;
};

const createButton = (text: string, action): HTMLButtonElement => {
  const button = document.createElement('button');
  button.append(text);
  button.addEventListener('click', action);
  return button;
};

const createForm = (): HTMLFormElement => {
  return document.createElement('form');
};

const createLabel = (target: string, text: string): HTMLLabelElement => {
  const label = document.createElement('label');
  label.append(text);
  label.setAttribute('for', target);
  return label;
};

const createInput = (
  type: string,
  name: string,
  value: string
): HTMLInputElement => {
  const input = document.createElement('input');
  input.setAttribute('type', type);
  input.setAttribute('id', name);
  input.setAttribute('name', name);
  input.setAttribute('value', value);
  return input;
};

export { drawAdminPage };
