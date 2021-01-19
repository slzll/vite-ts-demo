import { createRouter, createWebHashHistory, isNavigationFailure } from "vue-router";
import NProgress from "nprogress";
import routes from "./routes";

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach((to, from, failure) => {
  if (isNavigationFailure(failure)) {
    console.error(failure);
  }
  NProgress.done();
});

export default router;
