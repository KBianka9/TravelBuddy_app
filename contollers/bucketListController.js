import customAxios from "../src/customAxios";

export function addItem(spectacle) {
  return customAxios.post("/spectacle/add", { spectacle });
}
export function listItems(userId) {
  return customAxios.get(`/bucketList/list/${userId}`);
}
export function removeItem(bucketListId, userId) {
  return customAxios.delete(`/bucketList/delete/${bucketListId}/${userId}`);
}
export function completedItem(bucketListId, userId, spectacleId, completed) {
  return customAxios.post("/bucketList/completed", { bucketListId, userId, spectacleId, completed });
}
