import instance from "@/loaders/axios";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin() {
    // // @ts-expect-error
    // const cookieCsrf = await cookieStore.get("csrftoken");

    // if (!cookieCsrf.value) {
    //   console.error("CSRF Token not found");
    //   const response = await instance.get("/csrf/", { withCredentials: true });
    //   console.log(response.data);
    // }

    // @ts-expect-error
    const csrfToken = await cookieStore.get("csrftoken");

    console.log(csrfToken.value);

    // axios.defaults.headers.common["X-CSRFToken"] = csrfToken.value;

    try {
      const response = await instance.post(
        "/login/",
        {
          username: username,
          password: password,
        },
        {
          headers: {
            "X-CSRFToken": csrfToken.value,
          },
        }
      );
      instance.defaults.headers.post["X-CSRFToken"] = (
        await cookieStore.get("csrftoken")
      ).value;
      setMessage(response.data.detail);
    } catch (error) {
      setError(error.response.data.error);
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <input
        type="username"
        placeholder="Email"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
    </div>
  );
}
