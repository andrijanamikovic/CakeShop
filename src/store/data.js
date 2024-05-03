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
    current: null,
  },
  mutations: {
    setUsers(state, users) {
      state.users = Object.keys(users).map((key) => ({
        key: key,
        ...users[key],
      }));
    },
    setCurrent(state, current) {
      state.current = current;
    },
    // Mutations to update items, if necessary
  },
  actions: {
    setUsers(context, users) {
      context.commit("setUsers", users);
    },
    setCurrent(context, current) {
      context.commit("setCurrent", current);
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
    getCurrent(state) {
      return state.current;
    },
  },
};
