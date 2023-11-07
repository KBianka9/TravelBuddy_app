import customAxios from "../src/customAxios";

export function signup(name, email, password, password2) {
  return customAxios.post("/user/register", { name, email, password, password2 });
}
