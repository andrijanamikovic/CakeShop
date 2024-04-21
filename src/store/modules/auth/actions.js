export default {
  changeLoginStatus(context) {
    context.commit("toggleIsLoggedIn");
  },
  login(context) {
    context.commit("toggleIsLoggedIn");
  },
  signup(context) {
    context.commit("toggleIsLoggedIn");
  },
};
