const searchParams = new URLSearchParams(window.location.search);
var Settings;
(function (Settings) {
    Settings["KURSURL"] = "http://localhost:3000/kursData";
    Settings["USERURL"] = "http://localhost:3000/userData";
})(Settings || (Settings = {}));
const drawAdminPage = async () => {
    if (searchParams.has('add')) {
        const div = createDiv();
        return div;
    }
    else {
        const courses = await getCourses();
        const div = createDiv();
        div.append(createH2('Kurser & Deltagare'));
        div.classList.add('adminPage');
        courses.forEach(async (course) => {
            div.append(await createCourseCard(course));
        });
        return div;
    }
};
const getCourses = async () => {
    try {
        const response = await fetch(Settings.KURSURL);
        if (response.ok) {
            return await response.json();
        }
        else {
            throw new Error(`${response.status} ${response.statusText}`);
        }
    }
    catch (error) {
        throw new Error(`Ett fel inträffade i get metoden: ${error}`);
    }
};
const getUser = async (id) => {
    try {
        const response = await fetch(`${Settings.USERURL}/${id}`);
        if (response.ok) {
            return await response.json();
        }
        else {
            throw new Error(`${response.status} ${response.statusText}`);
        }
    }
    catch (error) {
        throw new Error(`Ett fel inträffade i get metoden: ${error}`);
    }
};
const createDiv = () => {
    return document.createElement('div');
};
const createSpan = (text) => {
    const span = document.createElement('span');
    span.append(text);
    return span;
};
const createCourseCard = async (kurs) => {
    const div = createDiv();
    div.append(createSpan(kurs.id + ': ' + kurs.kursTitel), createSpan(`Antal dagar: ${kurs.kursDagar}`), createSpan(`Pris: ${kurs.kursPris}:-`), createH3('Kunder'), createHr());
    kurs.bokningar.forEach(async (element) => {
        const span = createSpan((await getUser(element[0])).namn +
            ' ' +
            (await getUser(element[0])).efterNamn +
            ' - ' +
            element[1]);
        div.append(span);
    });
    return div;
};
const createHr = () => {
    return document.createElement('hr');
};
const createH3 = (text) => {
    const h3 = document.createElement('h3');
    h3.append(text);
    return h3;
};
const createH2 = (text) => {
    const h2 = document.createElement('h2');
    h2.append(text);
    return h2;
};
const createButton = (text, action) => {
    const button = document.createElement('button');
    button.append(text);
    button.addEventListener('click', action);
    return button;
};
export { drawAdminPage };
//# sourceMappingURL=administrate.js.map