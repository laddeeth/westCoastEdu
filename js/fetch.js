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
  console.log(user);
  user.bokningar.push([kursid, typ]);
  console.log(user);
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

export { getAll, getCourse, getUsers, bookCourse };
