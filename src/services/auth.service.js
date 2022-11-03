//calls to the server to login
import {serviceEndpoint} from "./config.service";

function AuthService() {

  const login = async (username, password) => {
    const endpoint = serviceEndpoint + "/auth";
    const fetchOptions = {
      method: "POST",
      body: JSON.stringify({
        password: password,
        username: username,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
    const response = await fetch(endpoint, fetchOptions);

    if (!response.ok) throw new Error(response.status);

    const tokenObj = await response.json();
    return tokenObj.access_token;
  };

  return { login }
}

export default new AuthService;
