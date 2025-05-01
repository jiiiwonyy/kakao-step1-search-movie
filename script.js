const API_KEY = "730ef22a257d17fcc89a845cf56f1e80";
const BASE_URL = "https://api.themoviedb.org/3";
const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`;
const movieList = document.querySelector(".movie-list");
const titleElement = document.querySelector("#movie-list-container h2");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

// 초기 로딩 시 추천 영화 (인기 영화) 표시
window.addEventListener("DOMContentLoaded", () => {
  fetchPopularMovies();
});

// 검색 버튼 클릭 이벤트
searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchSearchResults(query);
  }
});

//  엔터 키로 검색
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const query = searchInput.value.trim();
    if (query) {
      fetchSearchResults(query);
    }
  }
});

// 인기 영화 가져오기
function fetchPopularMovies() {
  titleElement.textContent = "추천 영화";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const top8Movies = data.results;
      renderMovies(top8Movies);
    })
    .catch((error) => {
      console.error("에러 발생:", error);
    });
}

function fetchSearchResults(query) {
  const formattedQuery = query.replace(/\s+/g, "").trim().toLowerCase();

  titleElement.textContent = `"${query}" 검색 결과`;
  fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=ko-KR&query=${encodeURIComponent(
      formattedQuery
    )}&page=1`
  )
    .then((res) => res.json())
    .then((data) => {
      // 영화 제목을 소문자로 변환 후, 공백을 없애서 비교
      const filteredMovies = data.results.filter((movie) =>
        movie.title.replace(/\s+/g, "").toLowerCase().includes(formattedQuery)
      );
      renderMovies(filteredMovies);
    })
    .catch((err) => {
      console.error("검색 실패:", err);
    });
}

// 영화 카드 렌더링
function renderMovies(movies) {
  movieList.innerHTML = ""; // 기존 목록 초기화
  if (movies.length === 0) {
    movieList.innerHTML = "<p>검색 결과가 없습니다.</p>";
    return;
  }

  movies.forEach((movie) => {
    const card = document.createElement("div");
    card.className = "movie-card";

    const img = document.createElement("img");
    img.src = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "https://via.placeholder.com/300x450?text=No+Image";
    img.alt = movie.title;

    const title = document.createElement("h3");
    title.textContent = movie.title;

    const releaseDate = document.createElement("p");
    releaseDate.textContent = `개봉 날짜: ${movie.release_date || "N/A"}`;

    const rating = document.createElement("p");
    rating.textContent = `평점: ${movie.vote_average.toFixed(1)}점`;

    const overview = document.createElement("p");
    const truncatedOverview = movie.overview
      ? movie.overview.length > 50
        ? movie.overview.substring(0, 50) + "..."
        : movie.overview
      : "내용 없음";

    overview.textContent = `개요: ${truncatedOverview}`;

    // 영화리스트 카드에 요소 추가
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(releaseDate);
    card.appendChild(rating);
    card.appendChild(overview);
    movieList.appendChild(card);
  });
}
