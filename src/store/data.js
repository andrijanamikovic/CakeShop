import cakes from "../data/cakes.json";
import cookies from "../data/cookies.json";
// import users from "../data/users.json"
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
    users: [],
  },
  mutations: {
    setUsers(state, users) {
      state.users = Object.keys(users).map((key) => ({
        key: key,
        ...users[key],
      }));
    },
    // Mutations to update items, if necessary
  },
  actions: {
    setUsers(context, users) {
      context.commit("setUsers", users);
    },
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
    getUsers(state) {
      return state.users;
    },
  },
};
