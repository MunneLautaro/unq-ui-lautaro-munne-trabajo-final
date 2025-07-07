import axios from "axios";
import { API, ROUTES_API } from "../constants";

const api = axios.create({
  baseURL: API.BASE_URL,
});

export const getDifficults = () => {
  return api
    .get(ROUTES_API.DIFFICULTIES)
    .then((response) => response?.data)
    .catch((error) => {
      console.log(error);
      error;
    });
};
