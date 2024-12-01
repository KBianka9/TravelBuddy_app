import customAxios from "../src/customAxios";

export function addPackingItem(category, name) {
  return customAxios.post("/packingItem/add", { category, name });
}

export function listPackingItem() {
  return customAxios.get(`/packingItem/listItems`);
}

export function resetPackingList(packingItemId) {
  return customAxios.delete(`/packingItemOnUser/reset/${packingItemId}`);
}

export function amountPackingItem(packingItem, amount) {
  return customAxios.post("/packingItemOnUser/add", { packingItem, amount });
}
