const searchParams: URLSearchParams = new URLSearchParams(
  window.location.search
);

enum Settings {
  KURSURL = 'http://localhost:3000/kursData',
  USERURL = 'http://localhost:3000/userData',
}

interface Kurs {
  id: number;
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
    return div;
  } else {
    const courses: Kurs[] = await getCourses();
    const div: HTMLDivElement = createDiv();
    div.append(createH2('Kurser & Deltagare'));
    div.classList.add('adminPage');
    courses.forEach(async (course: Kurs) => {
      div.append(await createCourseCard(course));
    });
    return div;
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
    createH3('Kunder'),
    createHr()
  );
  kurs.bokningar.forEach(async (element) => {
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

const createHr = () => {
  return document.createElement('hr');
};

const createH3 = (text: string) => {
  const h3 = document.createElement('h3');
  h3.append(text);
  return h3;
};

const createH2 = (text: string) => {
  const h2 = document.createElement('h2');
  h2.append(text);
  return h2;
};

const createButton = (text: string, action: () => void) => {
  const button = document.createElement('button');
  button.append(text);
  button.addEventListener('click', action);
  return button;
};

export { drawAdminPage };
