import customAxios from "../src/customAxios";

export function listDestination() {
  return customAxios.get(`/destination/list`);
}
