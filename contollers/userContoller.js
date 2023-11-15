import customAxios from "../src/customAxios";

export function signup(name, email, password, password2) {
  return customAxios.post("/user/addUser", { name, email, password, password2 });
}

export function login(email, password) {
  return customAxios.post("/user/login", { email, password });
}
