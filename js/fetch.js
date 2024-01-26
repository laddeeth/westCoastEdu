import { getCurrentUser } from './auth.js';
const url = 'http://localhost:3000';

const getAll = async () => {
  try {
    const response = await fetch(url + '/kursData');

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(`${response.status} ${response.statusText}`);
    }
  } catch (error) {
    throw new Error(`Ett fel inträffade i get metoden: ${error}`);
  }
};

const getCourse = async (id) => {
  try {
    const response = await fetch(url + `/kursData/${id}`);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(`${response.status} ${response.statusText}`);
    }
  } catch (error) {
    throw new Error(`Ett fel inträffade i get metoden: ${error}`);
  }
};

const getUsers = async (id) => {
  try {
    let response;
    id
      ? (response = await fetch(url + `/userData/${id}`))
      : (response = await fetch(url + `/userData`));

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(`${response.status} ${response.statusText}`);
    }
  } catch (error) {
    throw new Error(`Ett fel inträffade i get metoden: ${error}`);
  }
};

const bookCourse = async (user, kursid, typ) => {
  const course = await getCourse(kursid);
  course.bokningar.push([user.id, typ]);
  try {
    const response = await fetch(url + `/kursData/${kursid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(course),
    });
    if (response.ok) {
      await response.json();
    } else {
      throw new Error(`${response.status} ${response.statusText}`);
    }
  } catch (error) {
    throw new Error(`Ett fel inträffade i update metoden: ${error}`);
  }
  user.bokningar.push([kursid, typ]);
  try {
    const response = await fetch(url + `/userData/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      const result = await response.json();
      localStorage.user = JSON.stringify(user);
      return result;
    } else {
      throw new Error(`${response.status} ${response.statusText}`);
    }
  } catch (error) {
    throw new Error(`Ett fel inträffade i update metoden: ${error}`);
  }
};

const removeCourse = async (kurs) => {
  const user = await getCurrentUser();
  const course = await getCourse(kurs[0]);
  const filteredCourses = course.bokningar.filter(
    (element) => !(element[0] == user.id && element[1] == kurs[1])
  );
  course.bokningar = filteredCourses;
  try {
    const response = await fetch(url + `/kursData/${kurs[0]}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(course),
    });
    if (response.ok) {
      await response.json();
    } else {
      throw new Error(`${response.status} ${response.statusText}`);
    }
  } catch (error) {
    throw new Error(`Ett fel inträffade i update metoden: ${error}`);
  }
  console.log(user.bokningar, kurs);
  const filteredUser = user.bokningar.filter(
    (element) => !(element[0] == kurs[0] && element[1] == kurs[1])
  );
  user.bokningar = filteredUser;
  console.log(filteredUser);
  try {
    const response = await fetch(url + `/userData/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      const result = await response.json();
      localStorage.user = JSON.stringify(user);
    } else {
      throw new Error(`${response.status} ${response.statusText}`);
    }
  } catch (error) {
    throw new Error(`Ett fel inträffade i update metoden: ${error}`);
  }
  location.reload();
};

export { getAll, getCourse, getUsers, bookCourse, removeCourse };
