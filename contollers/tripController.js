import customAxios from "../src/customAxios";

export function listTrip() {
  return customAxios.get(`/trip/list/`);
}

export function removeTrip(tripId, travellerId) {
  return customAxios.delete(`/trip/delete/${tripId}/${travellerId}`);
}
