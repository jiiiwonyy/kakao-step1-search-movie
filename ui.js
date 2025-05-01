export function renderMovies(movies, onClick) {
  const movieList = document.querySelector(".movie-list");
  movieList.innerHTML = "";

  if (movies.length === 0) {
    movieList.innerHTML = "<p>검색 결과가 없습니다.</p>";
    return;
  }

  movies.forEach((movie) => {
    const card = document.createElement("div");
    card.className = "movie-card";
    card.innerHTML = `
        <img src="${
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/300x450?text=No+Image"
        }" alt="${movie.title}" />
        <h2>${movie.title}</h2>
        <p class="movie-info">개봉 날짜: ${movie.release_date || "N/A"}</p>
        <p class="movie-info">평점: ${movie.vote_average.toFixed(1)}점</p>
        <p class="movie-info">개요: ${
          movie.overview?.substring(0, 50) ?? "내용 없음"
        }...</p>
      `;
    card.addEventListener("click", () => onClick(movie));
    movieList.appendChild(card);
  });
}

export function openModal(movie) {
  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `
      <h2>${movie.title} (${movie.original_title})</h2>
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${
    movie.title
  }" />
      <p><strong>개봉일:</strong> ${movie.release_date || "N/A"}</p>
      <p><strong>평점:</strong> ${movie.vote_average.toFixed(1)}점</p>
      <p><strong>줄거리:</strong> ${movie.overview || "내용 없음"}</p>
    `;
  modal.classList.remove("hidden");
}

export function initModalClose() {
  const modal = document.getElementById("modal");
  const closeBtn = document.querySelector(".close");
  closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("hidden");
  });
}
