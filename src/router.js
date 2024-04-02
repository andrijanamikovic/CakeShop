import { createRouter, createWebHistory } from "vue-router";

import AuthComponent from "./pages/auth/AuthComponent.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/login" },
    { path: "/login", component: AuthComponent },
  ],
});

export default router;
