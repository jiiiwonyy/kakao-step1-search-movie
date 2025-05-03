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
    movieList.appendChild(card);
  });

  movieList.onclick = (e) => {
    const card = e.target.closest(".movie-card");
    if (card) {
      const movieTitle = card.querySelector("h2").innerText;
      const movie = movies.find((m) => m.title === movieTitle);
      if (movie) {
        onClick(movie);
      }
    }
  };
}

// 북마크
function getBookmarks() {
  return JSON.parse(localStorage.getItem("bookmarks")) || [];
}

function saveBookmarks(bookmarks) {
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function toggleBookmark(movie) {
  const bookmarks = getBookmarks();
  const index = bookmarks.findIndex((m) => m.id === movie.id);
  if (index === -1) {
    bookmarks.push(movie);
  } else {
    bookmarks.splice(index, 1);
  }
  saveBookmarks(bookmarks);
}

function setupBookmarkButton(wrapperElement, movie) {
  const icon = wrapperElement.querySelector("i");
  const isBookmarked = getBookmarks().some((m) => m.id === movie.id);

  icon.classList.toggle("fa-solid", isBookmarked);
  icon.classList.toggle("fa-regular", !isBookmarked);

  wrapperElement.onclick = (e) => {
    toggleBookmark(movie);
    icon.classList.toggle("fa-solid");
    icon.classList.toggle("fa-regular");
  };
}

export function openModal(movie) {
  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modal-body");
  const imageContainer = document.getElementById("image-container");
  const modalImage = document.getElementById("modal-image");
  const bookmarkWrapper = imageContainer.querySelector(".bookmark-button");

  modalImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  modalImage.alt = movie.title;

  modalBody.innerHTML = `
      <h2>${movie.title} (${movie.original_title})</h2>
      <p><strong>개봉일:</strong> ${movie.release_date || "N/A"}</p>
      <p><strong>평점:</strong> ${movie.vote_average.toFixed(1)}점</p>
      <p><strong>줄거리:</strong> ${movie.overview || "내용 없음"}</p>
  `;

  setupBookmarkButton(bookmarkWrapper, movie);
  modal.classList.remove("hidden");
}

export function initModalClose() {
  const modal = document.getElementById("modal");
  const closeButton = document.querySelector(".close");
  closeButton.addEventListener("click", () => modal.classList.add("hidden"));
  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("hidden");
  });
}
