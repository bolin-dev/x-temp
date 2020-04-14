import config from "config";
import api from "services/api";
import { getStorageSync, toast, loading, hideLoading } from "common/tools";

const isDev = process.env.NODE_ENV === "development";

export const isUrl = (url) => {
	return /^(https?:\/\/(([a-zA-Z0-9]+-?)+[a-zA-Z0-9]+\.)+[a-zA-Z]+)(:\d+)?(\/.*)?(\?.*)?(#.*)?$/.test(url);
}

const interceptor = (url, route = "") => {
	let options = false;
	let _params = [];

	if (url.indexOf("#") !== -1) {
		_params = url.split("#");
		url = _params.filter(item => item)[0];
	}

	if (url in api && typeof api[url] === "string") {
		url = `${config.api_url}${api[url]}`;
	} else if (route) {
		route = route.split("/").splice(1);
		if (route.length > 1) {
			let uri = "";
			for (let i = 0; i < route.length; i++) {
				if (typeof uri !== "undefined") {
					if (i !== route.length - 1) {
						uri = uri ? uri[route[i]] : api[route[i]];
					} else {
						uri = uri[url];
					}
				}
			}
			if (typeof uri === "string") url = `${config.api_url}${uri}`;
		}
	}

	if (isUrl(url)) {
		if (_params.length && _params[0] === "") {
			loading();
			_params.splice(0, 1);
		}
		options = {
			url,
			header: { Authorization: `bearer ${getStorageSync("token")}` },
			_params
		};
	} else {
		if (isDev) toast("接口错误或未定义！", "fail");
	}

	return options;
}

const success = (statusCode, data, params = []) => {
	let res = { err: true, msg: "网络错误请稍后重试！", data: "" };

	if (statusCode === 200) {
		if (typeof data === "string") {
			try {
				data = JSON.parse(data);
			} catch (e) {
				if (isDev) toast(e);
			}
		}
		res = typeof data !== "string" ? data : { err: false, msg: "success", data };
	}

	if (res.err) {
		toast(res);
	} else {
		const len = params.length;
		if (len > 1) {
			toast(res, "", { mask: true });
			if (len > 2) {
				setTimeout(() => {
					uni.navigateBack();
				}, 1500);
			}
		}
	}
	return res;
}

const fail = (errMsg) => {
	const res = { err: true, msg: errMsg, data: "" };
	toast(res);
	return res;
}

const complete = () => {
	hideLoading();
}

export function fetch(url, data = {}, payload = {}) {
	let route = "";
	try {
		route = this.$mp.page.route;
	} catch (e) {
		route = "";
	}
	const options = interceptor(url, route);
	if (options) {
		return new Promise((resolve) => {
			uni.request({
				data,
				method: "POST",
				success: ({ statusCode, data }) => resolve(success(statusCode, data, options._params)),
				fail: ({ errMsg }) => resolve(fail(errMsg)),
				complete,
				...options,
				...payload
			});
		});
	}
}

export function submit(url, formData = null, name = "files") {
	if (!name) name = "files";
	if (formData && name in formData && Object.keys(formData[name]).length > 0) {
		let route = "";
		try {
			route = this.$mp.page.route;
		} catch (e) {
			route = "";
		}
		const options = interceptor(url, route);
		if (options) {
			let files = [];
			const formDataFiles = formData[name];
			for (let key in formDataFiles) {
				files.push({ name: key, uri: formDataFiles[key] });
			}
			delete formData[name];
			return new Promise((resolve) => {
				uni.uploadFile({
					fileType: "image",
					filePath: "",
					name: "",
					files,
					formData,
					success: ({ statusCode, data }) => resolve(success(statusCode, data, options._params)),
					fail: ({ errMsg }) => resolve(fail(errMsg)),
					complete,
					...options
				});
			});
		}
	} else {
		return (fetch(url, formData));
	}
}

export function upload(filePath, url = config.upload_url, name = "file") {
	if (!url) url = config.upload_url;
	if (!name) name = "file";
	let route = "";
	try {
		route = this.$mp.page.route;
	} catch (e) {
		route = "";
	}
	const options = interceptor(url, route);
	if (options) {
		return new Promise((resolve) => {
			uni.uploadFile({
				fileType: "image",
				filePath,
				name,
				success: ({ statusCode, data }) => resolve(success(statusCode, data, options._params)),
				fail: ({ errMsg }) => resolve(fail(errMsg)),
				complete,
				...options
			});
		});
	}
}

export function download(url) {
	let route = "";
	try {
		route = this.$mp.page.route;
	} catch (e) {
		route = "";
	}
	const options = interceptor(url, route);
	if (options) {
		return new Promise((resolve) => {
			uni.downloadFile({
				success: ({ statusCode, tempFilePath }) => resolve(success(statusCode, tempFilePath, options._params)),
				fail: ({ errMsg }) => resolve(fail(errMsg)),
				complete,
				...options
			});
		});
	}
}
