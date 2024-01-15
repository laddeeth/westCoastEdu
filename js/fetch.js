const getAll = async (url) => {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      throw new Error(`${response.status} ${response.statusText}`);
    }
  } catch (error) {
    throw new Error(`Ett fel inträffade i get metoden: ${error}`);
  }
};

export { getAll };
