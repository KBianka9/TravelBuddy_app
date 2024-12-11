import customAxios from "../src/customAxios";

export function addPackingItem(category, name, userId) {
  return customAxios.post("/packingItem/add", { category, name, userId });
}

export function listPackingItem(userId) {
  return customAxios.get(`/packingItem/listItems/${userId}`);
}

export function amountPackingItem(userId, packingItemId, amount) {
  return customAxios.put("/packingItemOnUser/updateAmount", { userId, packingItemId, amount });
}
