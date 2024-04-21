import cakes from "../data/cakes.json";
import cookies from "../data/cookies.json";

export default {
  state: {
    cakes: Object.keys(cakes).map((key) => ({
      key: key,
      ...cakes[key],
    })),
    cookies: Object.keys(cookies).map((key) => ({
      key: key,
      ...cookies[key],
    })),
  },
  mutations: {
    // Mutations to update items, if necessary
  },
  actions: {
    // Actions to fetch or update items, if necessary
  },
  getters: {
    // Getters to retrieve items, if necessary
    getCakes(state) {
      return state.cakes;
    },
    getCookies(state) {
      return state.cookies;
    },
  },
};
