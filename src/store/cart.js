export default {
  state: {
    items: [],
  },
  mutations: {
    addItem(state, item) {
      state.items.push(item);
    },
    setItems(state, items) {
      state.items = items;
    },
  },
  actions: {
    addItem(context, item) {
      context.commit("addItem", item);
    },
    setItems(context, items) {
      context.commit("setItems", items);
    },
  },
  getters: {
    getItems(state) {
      return state.items;
    },
  },
};
