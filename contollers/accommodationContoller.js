import customAxios from "../src/customAxios";

export function search(cityCountryName, nightPrice) {
  return customAxios.get("/accommodation/search", {
    params: {
      cityCountryName,
      minNightPrice: nightPrice.min,
      maxNightPrice: nightPrice.max,
    },
  });
}

export function listWithFav() {
  return customAxios.get(`/accommodation/listWithFav/`);
}

export function listByFav(userId) {
  return customAxios.get(`/accommodation/listByFav/${userId}`);
}

export function favoriteHotel(accommodationId, userId) {
  return customAxios.post("/usersFavAccomm/add", { accommodationId, userId });
}

export function unFavoriteHotel(accommodationId, userId) {
  return customAxios.delete(`/usersFavAccomm/delete/${accommodationId}/${userId}`);
}

export function completedHotel(accommodationId, userId, completed) {
  return customAxios.post("/usersFavAccomm/completed", { accommodationId, userId, completed });
}
