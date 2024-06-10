// import cakes from "../data/cakes.json";
// import cookies from "../data/cookies.json";
// import users from "../data/users.json"
export default {
  state: {
    cakes: [],
    cookies: [],
    users: [],
    current: null,
    orders: [],
    message: "",
  },
  mutations: {
    setUsers(state, users) {
      state.users = Object.keys(users).map((key) => ({
        key: key,
        user: key,
        ...users[key],
      }));
    },
    setCurrent(state, current) {
      state.current = current;
    },
    // Mutations to update items, if necessary
    setCakes(state, cakes) {
      state.cakes = Object.keys(cakes).map((key) => ({
        key: key,
        ...cakes[key],
      }));
    },
    setCookies(state, cookies) {
      state.cookies = Object.keys(cookies).map((key) => ({
        key: key,
        ...cookies[key],
      }));
    },
    setOrders(state, orders) {
      state.orders = Object.keys(orders).map((key) => {
        const dynamicKey = Object.keys(orders[key])[0];
        return {
          key: key,
          items: orders[key][dynamicKey].map((item) => ({
            key: item.key,
            quantity: item.quantity,
          })),
        };
      });
    },
    setMessage(state, message) {
      state.message = message;
    },
  },
  actions: {
    setUsers(context, users) {
      context.commit("setUsers", users);
    },
    setCurrent(context, current) {
      context.commit("setCurrent", current);
    },
    setCakes(context, cakes) {
      context.commit("setCakes", cakes);
    },
    setCookies(context, cookies) {
      context.commit("setCookies", cookies);
    },
    setOrders(context, orders) {
      context.commit("setOrders", orders);
    },
    setMessage(context, message) {
      context.commit("setMessage", message);
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
    getOrders(state) {
      return state.orders;
    },
    getMessage(state) {
      return state.message;
    },
  },
};
