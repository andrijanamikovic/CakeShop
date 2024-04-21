import { createRouter, createWebHistory } from "vue-router";

import AuthComponent from "./pages/auth/AuthComponent.vue";
import HomeComponent from "./pages/HomeComponent.vue";
import CakesComponent from "./pages/CakesComponent.vue";
import CookiesComponent from "./pages/CookiesComponent.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/login" },
    { path: "/login", component: AuthComponent },
    { path: "/home", component: HomeComponent },
    { path: "/cakes", component: CakesComponent },
    { path: "/cookies", component: CookiesComponent },
  ],
});

export default router;
