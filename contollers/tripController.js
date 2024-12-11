import customAxios from "../src/customAxios";

export function listTrip(travellerId) {
  return customAxios.get(`/trip/list/${travellerId}`);
}

export function removeTrip(tripId) {
  return customAxios.delete(`/trip/delete/${tripId}`);
}

export function addTrip(travellerId, tripTitle, from, to, accommodationId, days) {
  return customAxios.post("/trip/add", { travellerId, tripTitle, from, to, accommodationId, days });
}
