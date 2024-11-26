import axios from "axios";

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

function getToken() {
  return getCookie("csrftoken");
}

const instance = axios.create({
  baseURL: "/api/",
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});

instance.defaults.headers.post["X-CSRFToken"] = getToken();

export default instance;
