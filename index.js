const fetchData = async (searchTerm) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "89579383",
      s: searchTerm,
    },
  });
  console.log(response.data);
};

const input = document.querySelector("input");
let timeoutId;
const onInput = (event) => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(() => {
    fetchData(event.target.value);
  }, 500);
};
// on keyup, start keyupTimer
// if keyupTimer is greater than half a second, send API request
// else clearTimeout
input.addEventListener("input", onInput);
