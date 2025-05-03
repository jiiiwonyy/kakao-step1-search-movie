import { fetchPopularMovies, fetchSearchResults } from "./api.js";
import { renderMovies, openModal, initModalClose } from "./ui.js";

const headerTitle = document.querySelector("header h1");
const titleElement = document.querySelector(".title-text");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

document.addEventListener("DOMContentLoaded", async () => {
  const movies = await fetchPopularMovies();
  renderMovies(movies, openModal);
});

initModalClose();

searchButton.addEventListener("click", async () => {
  const query = document.getElementById("search-input").value.trim();
  if (query) {
    const results = await fetchSearchResults(query);
    renderMovies(results, openModal);
  }
});

searchInput.addEventListener("keydown", async (event) => {
  if (event.key === "Enter") {
    const query = searchInput.value.trim();
    if (query) {
      const results = await fetchSearchResults(query);
      renderMovies(results, openModal);
    }
  }
});

// 새로고침 로직
function reloadPage() {
  window.location.reload();
}
[headerTitle, titleElement].forEach((el) =>
  el.addEventListener("click", reloadPage)
);

// 페이지 최초 로드 시 인기 영화 가져오기
window.addEventListener("DOMContentLoaded", () => {
  fetchPopularMovies();
});
