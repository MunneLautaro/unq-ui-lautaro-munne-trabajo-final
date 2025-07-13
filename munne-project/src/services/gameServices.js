import axios from "axios";
import { API, ROUTES_API } from "../constants";

import { errorMessage } from "../utilities/index";

const api = axios.create({
  baseURL: API.BASE_URL,
});

const getDifficults = () => {
  return api
    .get(ROUTES_API.DIFFICULTIES)
    .then((response) => response?.data)
    .catch((error) => {
      throw errorMessage(error);
    });
};

const getGameSessionByDifficultyId = (id) => {
  return api
    .get(`${ROUTES_API.DIFFICULTIES}/${id}`)
    .then((response) => response?.data)
    .catch((error) => {
      throw errorMessage(error);
    });
};

const checkWord = ({ sessionId, word }) => {
  return api
    .post(ROUTES_API.CHECK_WORD, { sessionId, word })
    .then((response) => response?.data)
    .catch((error) => {
      throw errorMessage(error);
    });
};

export { getDifficults, getGameSessionByDifficultyId, checkWord };
