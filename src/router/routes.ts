import Home from "../views/Home.vue";

const routes = [
  {
    name: "home",
    path: "/",
    component: Home,
  },
  {
    name: "gif",
    path: "/gif",
    component: () => import("../views/Gif.vue"),
  },
];

export default routes;
