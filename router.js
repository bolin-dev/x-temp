import { toast } from "./common/tools";

const pages = {
	home: "pages/home/home"
}

const toNav = (url, query = {}, type = "navigateTo") => {
	if (url.indexOf("/") === -1) {
		url = url in pages ? pages[url] : "";
	}
	if (url) {
		const queryStr = encodeURIComponent(JSON.stringify(query));
		uni[type]({ url: `/${url}?query=${queryStr}` });
	} else {
		toast("页面错误或不存在");
	}
}

export default toNav;
