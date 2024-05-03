import data from "@/store/data";

export default {
  login(context, data) {
    context.commit("login", data);
  },
  signup(context) {
    context.commit("register", data);
  },
};
