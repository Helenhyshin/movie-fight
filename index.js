const fetchData = async (searchTerm) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "89579383",
      s: searchTerm,
    },
  });

  if (response.data.Error) {
    return [];
  }
  return response.data.Search;
};

const input = document.querySelector("input");

// because we are waiting for fetchData to get data and access response, use async and await
const onInput = debounce(async (event) => {
  const movies = await fetchData(event.target.value);
  for (let movie of movies) {
    const div = document.createElement("div");
    div.innerHTML = `
    <img src ="${movie.Poster}" />
    <h1>${movie.Title}</h1>
    `;
    document.querySelector("#target").appendChild(div);
  }
}, 500);

input.addEventListener("input", onInput);
