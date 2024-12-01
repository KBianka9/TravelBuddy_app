import customAxios from "../src/customAxios";

export function signup(name, email, password, password2) {
  return customAxios.post("/user/register", { name, email, password, password2 });
}

export function login(email, password) {
  return customAxios.post("/user/login", { email, password });
}

export function deleteUser(id) {
  return customAxios.delete(`/user/delete/${id}`);
}

export function updateUser({ userId, name, email, currentPassword, newPassword }) {
  return customAxios.put("/user/update", { userId, name, email, currentPassword, newPassword });
}

export function searchByName(name) {
  return customAxios.get("/user/search", { params: { name } });
}

export function roleUser({ userId }) {
  return customAxios.put("/user/role", { userId });
}

export function list() {
  return customAxios.get(`/user/list/`);
}

export function listByName(name) {
  return customAxios.get(`/user/listByName/${name}`);
}
