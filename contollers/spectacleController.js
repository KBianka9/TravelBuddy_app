import customAxios from "../src/customAxios";

export function addItem(name, userId) {
  return customAxios.post("/spectacle/add", { name, userId });
}
