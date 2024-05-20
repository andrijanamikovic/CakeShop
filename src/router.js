import { createRouter, createWebHistory } from "vue-router";

import AuthComponent from "./pages/auth/AuthComponent.vue";
import HomeComponent from "./pages/HomeComponent.vue";
import CakesComponent from "./pages/CakesComponent.vue";
import CookiesComponent from "./pages/CookiesComponent.vue";
import UserAccount from "./pages/UserAccount.vue";
import ItemComponent from "./pages/ItemComponent.vue";
import CartComponent from "./pages/CartComponent.vue";
import AddWorkerComponent from "./pages/AddWorkerComponent.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/login" },
    { path: "/login", component: AuthComponent },
    { path: "/home", component: HomeComponent, meta: { requiresAuth: true } },
    { path: "/cakes", component: CakesComponent, meta: { requiresAuth: true } },
    {
      path: "/cookies",
      component: CookiesComponent,
      meta: { requiresAuth: true },
    },
    { path: "/account", component: UserAccount, meta: { requiresAuth: true } },
    { path: "/cart", component: CartComponent, meta: { requiresAuth: true } },
    {
      path: "/cakes/:itemId",
      name: "CakeItem",
      component: ItemComponent,
      meta: { requiresAuth: true },
    },
    {
      path: "/cookies/:itemId",
      name: "CookieItem",
      component: ItemComponent,
      meta: { requiresAuth: true },
    },
    {
      path: "/addWorker",
      component: AddWorkerComponent,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = checkIfLoggedIn(); // You need to implement this function
  console.log("Jel proveravas ti?", isLoggedIn);
  if (to.meta.requiresAuth && !isLoggedIn) {
    console.log("Jel udjes ovde?");
    // If the route requires authentication and the user is not logged in, redirect to login
    next("/login");
  } else {
    // Otherwise, proceed to the requested route
    next();
  }
});

function checkIfLoggedIn() {
  // Implement your logic to check if the user is logged in
  // For example, you can check if there is a token in local storage
  return localStorage.getItem("loggedInUser") !== null;
}

export default router;
