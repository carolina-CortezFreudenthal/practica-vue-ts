import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () =>
      import("../views/Home.vue"),
  },
  {
    path: "/products/:id",
    name: "product",
    component: () =>
      import("../views/Product.vue"),
    props: (route) => {
      const id = Number(route.params.id);
      return { id }
    },
  },
  {
    path: "/account",
    name: "account",
    component: () =>
      import("../views/UserAccount.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import("../views/Authenticate.vue"),
  },
  {
    path: "/404",
    name: "notfound",
    beforeEnter: [() => { console.log("before not found")}],
    component: () =>
      import("../views/NotFound.vue"),
  },
  {
    path: "/:pathMatch(.*)",
    redirect: { name: 'notfound'},
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const withToken = !!localStorage.getItem("auth-token");
  // If we are not logged in
  if (!withToken && to.name == 'login') next();
  if (!withToken && to.name != 'login') next({ name: 'login' });
  // If we are logged in
  if (withToken && to.name == 'login') next({ name: 'home' });
  if (withToken && to.name != 'login') next();
})

export default router;