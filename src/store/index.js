import { createStore } from "vuex";
import auth from "./modules/auth";
import data from "./data";
import cart from "./cart";
const store = createStore({
  modules: { auth, data, cart },
});

export default store;
