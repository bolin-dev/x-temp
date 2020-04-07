import Vue from "vue";
import App from "App";

String.prototype.trimAll = function(enter = true) {
	var str = this;
	str = str.replace(/\s/g, "");
	if (enter) str = str.replace(/[\r\n]/g, "");
	return str;
}

console.log = (function($) {
	return function() {
		if (process.env.NODE_ENV === "development") $.call(console, ...arguments);
	}
})(console.log);

import store from "store";
import toNav from "router";
import * as tools from "common/tools";
import { fetch, submit, upload, download } from "services/request";

Vue.prototype.$store = store;
Vue.prototype.$toNav = toNav;
Vue.prototype.$tools = tools;
Vue.prototype.$fetch = fetch;
Vue.prototype.$submit = submit;
Vue.prototype.$upload = upload;
Vue.prototype.$download = download;

Vue.config.productionTip = false;

Vue.mixin({
	data() {
		return {
			_props: null
		}
	},
	onLoad(option) {
		const query = option.query || ""
		if (query) {
			try {
				this._props = JSON.parse(decodeURIComponent(query));
			} catch (e) {
				this._props = null;
			}
		}
	}
});

App.mpType = "app";

const app = new Vue({ ...App });
app.$mount();
