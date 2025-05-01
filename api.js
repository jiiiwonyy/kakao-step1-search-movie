const API_KEY = "730ef22a257d17fcc89a845cf56f1e80";
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchPopularMovies() {
  const res = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`
  );
  const data = await res.json();
  return data.results;
}

export async function fetchSearchResults(query) {
  const formatted = query.replace(/\s+/g, "").trim().toLowerCase();
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=ko-KR&query=${encodeURIComponent(
      formatted
    )}&page=1`
  );
  const data = await res.json();
  return data.results.filter((movie) =>
    movie.title.replace(/\s+/g, "").toLowerCase().includes(formatted)
  );
}
