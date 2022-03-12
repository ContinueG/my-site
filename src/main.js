// 入口文件
import "./mock";
import Vue from "vue";
import App from "./App.vue";
import "./styles/global.less";
import router from "./router";
import showMessage from "./utils/showMessage";
import "./eventBus";
import store from "./store/index"
Vue.prototype.$showMessage = showMessage;

store.dispatch("setting/fetchSettings")

// 注册全局指令
import vLoading from "./directives/loading";
Vue.directive("loading", vLoading);
import vLazy from "./directives/Lazy"
Vue.directive("lazy", vLazy)

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");