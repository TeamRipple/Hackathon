import http from "./httpService";
import { usersEndPoint } from "../config.json";
//function call to backend for login
export function login(email, password) {
  return http.post(usersEndPoint + "/login", {
    email: email,
    password: password,
  });
}
