import { createApp } from "vue";

import router from "./router";
import store from "./store";
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import 'element-plus/lib/theme-chalk/index.css';
import ElementPlus from 'element-plus';
import App from "./App.vue";
// Vue.use(ElementUI);
const app = createApp(App)
app.use(ElementPlus)
app.use(store).use(router).mount("#app");
// Vue.config.productionTip = false;
// new Vue({
//     router,
//     store,
//     render: h => h(App)
//   }).$mount("#app");
  
