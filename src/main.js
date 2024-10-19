import Vue from "vue";
import axios from "axios";
import App from "./App.vue";
import Meta from "vue-meta";
import has from "lodash/has";
import router from "./scripts/router";
import { store } from "./scripts/store";

Vue.use(Meta);
Vue.prototype.$has = has;
Vue.prototype.$http = axios;

Vue.config.productionTip = false;

new Vue({
	el: "#app",
	store,
	router,
	render: (h) => h(App)
}).$mount("#app ");
