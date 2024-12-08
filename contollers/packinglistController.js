import customAxios from "../src/customAxios";

export function addPackingItem(category, name, userId) {
  return customAxios.post("/packingItem/add", { category, name, userId });
}

export function listPackingItem(userId) {
  return customAxios.get(`/packingItem/listItems${userId}`);
}

export function resetPackingList(packingItemId) {
  return customAxios.delete(`/packingItemOnUser/reset/${packingItemId}`);
}

export function amountPackingItem(packingItem, amount) {
  return customAxios.post("/packingItemOnUser/update", { packingItem, amount });
}
