import Vue from "vue";
import { store } from "./store";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Unfound from "../views/404.vue";
import Excluded from "../views/Excluded.vue";
import Changelog from "../views/Changelog.vue";
import Watchlist from "../views/Watchlist.vue";
import Submit from "../views/Submit.vue";
import Report from "../views/Report.vue";
import FormFailure from "../views/FormStatus/FormFailure.vue";
import FormSuccess from "../views/FormStatus/FormSuccess.vue";

Vue.use(VueRouter);

const routes = [
	{ path: "/", name: "Home", alias: "/all", component: Home },
	{ path: "/about", name: "About", component: About },
	{ path: "/submit", name: "Submit", component: Submit },
	{ path: "/report", name: "Report", component: Report },
	{
		path: "/updates",
		name: "Changelog",
		alias: "/changelog",
		component: Changelog
	},
	{ path: "/success", name: "FormSuccess", component: FormSuccess },
	{ path: "/failure", name: "FormFailure", component: FormFailure },
	{ path: "/excluded", name: "Excluded", component: Excluded },
	{ path: "/watchlist", name: "Watchlist", component: Watchlist },
	{ path: "*", name: "404", component: Unfound },
	{
		path: "/:catchAll(.*)",
		component: Unfound,
		name: "404"
	}
];

const router = new VueRouter({
	routes: routes,
	mode: "history"
});

// Update header title to match current page/route
router.afterEach((to) => {
	if (to.name === "About") {
		store.commit("updateTitle", "AboutList");
	} else if (to.name === "Excluded") {
		store.commit("updateTitle", "ExcludedList");
	} else if (to.name === "Watchlist") {
		store.commit("updateTitle", "WatchList");
	} else {
		store.commit("updateTitle", "EncryptedList");
	}
});

export default router;
