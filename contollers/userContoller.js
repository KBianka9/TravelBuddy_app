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
