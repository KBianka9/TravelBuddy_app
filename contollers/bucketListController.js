import customAxios from "../src/customAxios";

export function listItems(userId) {
  return customAxios.get(`/bucketList/list/${userId}`);
}

export function removeItem(bucketListId) {
  return customAxios.delete(`/bucketList/delete/${bucketListId}`);
}
export function completedItem(bucketListId, userId, spectacleId, completed) {
  return customAxios.post("/bucketList/completed", { bucketListId, userId, spectacleId, completed });
}
