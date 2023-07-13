import jwtDecode from "jwt-decode";
const token = "token";

export function setTokenLocalStorage(jwt) {
  localStorage.setItem(token, jwt);
}

export function getTokenLocalStorage() {
  return localStorage.getItem(token);
}

export function removeTokenLocalStorage() {
  localStorage.removeItem(token);
}

export function decodeJwt() {
  const accessToken = getTokenLocalStorage();
  const currentUser = accessToken ? jwtDecode(accessToken) : "";
  return currentUser;
}
