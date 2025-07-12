import axios from "axios";
import { API, ROUTES_API } from "../constants";

const api = axios.create({
  baseURL: API.BASE_URL,
});

const getDifficults = () => {
  return api
    .get(ROUTES_API.DIFFICULTIES)
    .then((response) => response?.data)
    .catch((error) => {
      console.log(error);
      error;
    });
};

const getGameSessionByDifficultyId = (id) => {
  return api
    .get(`${ROUTES_API.DIFFICULTIES}/${id}`)
    .then((response) => response?.data)
    .catch((error) => {
      if (error.response?.status === 404) {
        console.error("Dificultad no encontrada (404)");
      } else {
        console.error(error);
      }
      return error;
    });
};

const checkWord = ({ sessionId, word }) => {
  return api
    .post(ROUTES_API.CHECK_WORD, { sessionId, word })
    .then((response) => response?.data)
    .catch((error) => {
      console.error("Error al verificar palabra:", error);
      return error;
    });
};

export { getDifficults, getGameSessionByDifficultyId, checkWord };
