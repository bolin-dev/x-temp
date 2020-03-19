import { toast } from "common/tools";

const pages = {
	home: "pages/home/home"
}

const toNav = (url, query = {}, type = "navigateTo") => {
	if (url.indexOf("/") === -1) url = url in pages? pages[url]: "";
	if (!url) return toast("页面错误或不存在");
	const queryStr = encodeURIComponent(JSON.stringify(query));
	uni[type]({ url: `/${url}?query=${queryStr}` });
}

export default toNav;
