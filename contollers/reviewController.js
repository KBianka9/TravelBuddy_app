import customAxios from "../src/customAxios";

export function search(cityCountryName) {
  return customAxios.get("/review/search", { params: { cityCountryName } });
}

export function list() {
  return customAxios.get(`/review/list`);
}

export function addReview(userId, cityCountryName, revText, image) {
  const data = new FormData();
  data.append("userId", userId);
  data.append("cityCountryName", cityCountryName);
  data.append("revText", revText);
  data.append("image", { uri: image.path, name: "img.jpg", type: image.mime });
  return customAxios.post("/review/add", data);
}

export function evaluateReview(reviewId, usefulnessCount, uselessnessCount) {
  return customAxios.post("/review/evaluate", { reviewId, usefulnessCount, uselessnessCount });
}

export function reportPost(reviewId, report) {
  return customAxios.post("/review/report", { reviewId, report });
}

export function deleteReview(reviewId) {
  return customAxios.delete(`/review/delete/${reviewId}`);
}
