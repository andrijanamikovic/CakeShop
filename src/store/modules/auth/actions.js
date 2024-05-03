import data from "@/store/data";

export default {
  login(context, data) {
    context.commit("login", data);
  },
  signup(context) {
    context.commit("register", data);
  },
  setUser(context, user) {
    context.commit("setUser", user);
  },
  setLoggedIn(context, isLoggedIn) {
    context.commit("setLoggedIn", isLoggedIn);
  },
};
