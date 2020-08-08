import axios from "axios";
import {config} from "../web-config";

export const loginService = (username, password) => {
  return axios.post(`${config.apiEndpoint}login-user`, {email: username, password})
}

