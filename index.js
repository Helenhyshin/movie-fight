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

const root = document.querySelector(".autocomplete");
root.innerHTML = `
    <label><b>Search For a Movie</b></label>
    <input class="input" />
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
`;

const input = document.querySelector("input");
const dropdown = document.querySelector(".dropdown");
const resultsWrapper = document.querySelector(".results");

// because we are waiting for fetchData to get data and access response, use async and await
const onInput = debounce(async (event) => {
  const movies = await fetchData(event.target.value);
  if (!movies.length) {
    dropdown.classList.remove("is-active");
    return;
  }
  resultsWrapper.innerHTML = "";

  dropdown.classList.add("is-active");

  for (let movie of movies) {
    const option = document.createElement("a");
    const imgSrc = movie.Poster === "N/A" ? " " : movie.Poster;

    option.classList.add("dropdown-item");
    option.innerHTML = `
    <img src ="${imgSrc}" />
    ${movie.Title}
    `;
    option.addEventListener("click", () => {
      input.value = movie.Title;
      dropdown.classList.remove("is-active");
    });
    resultsWrapper.appendChild(option);
  }
}, 500);

input.addEventListener("input", onInput);
document.addEventListener("click", (event) => {
  if (!root.contains(event.target)) {
    input.dropdown.classList.remove("is-active");
  }
});
