import customAxios from "../src/customAxios";

export function search(cityCountryName) {
  return customAxios.get("/review/search", { params: { cityCountryName } });
}

export function list() {
  return customAxios.get(`/review/list/`);
}

export function addReview(cityCountryName, revText) {
  return customAxios.post("/review/add", { cityCountryName, revText });
}

export function evaluateReview(reviewId, usefulnessCount, uselessnessCount) {
  return customAxios.post("/review/evaluate", { reviewId, usefulnessCount, uselessnessCount });
}

export function reportReview(reviewId, report) {
  return customAxios.post("/review/report", { reviewId, report });
}

export function deleteReview(reviewId) {
  return customAxios.delete(`/review/delete/${reviewId}`);
}
