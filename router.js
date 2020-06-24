import { toast } from "common/tools";

const pages = {
	home: "pages/home/home",
};

function toNav(url, query = {}, type = "navigateTo", payload = {}) {
	if (url.indexOf("/") === -1) {
		if (url in pages) {
			url = pages[url];
		} else {
			let route = this.$mp.page.route.split("/");
			if (route.length === 3) route[2] = url;
			route[3] = url;
			url = route.join("/");
		}
	}
	const queryStr = encodeURIComponent(JSON.stringify(query));
	uni[type]({
		url: `/${url}?query=${queryStr}`,
		fail: () => toast("开发中..."),
		...payload,
	});
}

export default toNav;
