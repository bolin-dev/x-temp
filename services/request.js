import config from "config";
import api from "services/api";
import { getStorageSync, toast, loading, hideLoading } from "common/tools";

const isDev = process.env.NODE_ENV === "development";

export const isUrl = (url) => {
	return /^(https?:\/\/(([a-zA-Z0-9]+-?)+[a-zA-Z0-9]+\.)+[a-zA-Z]+)(:\d+)?(\/.*)?(\?.*)?(#.*)?$/.test(url);
}

const interceptor = (url) => {
	let options = false;
	let params = [];

	if (url.indexOf("/") !== -1) {
		params = url.split("/");
		url = params.filter(item => item)[0];
	}
	if (url in api) url = `${config.api_url}${api[url]}`;
	if (isUrl(url)) {
		if (params.length && params[0] === "") {
			loading();
			params.splice(0, 1);
		}
		options = {
			url,
			header: {
				Authorization: `bearer ${getStorageSync("token")}`
			},
			_params: params
		};
	} else {
		if (isDev) toast("接口错误或未定义！");
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
			toast(res);
			if (len > 2) {
				setTimeout(() => {
					uni.navigateBack();
				}, 1000);
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

// POST请求
export const fetch = (url, data = {}, payload = {}) => new Promise((resolve) => {
	const options = interceptor(url);
	if (options) {
		uni.request({
			data,
			method: "POST",
			success: ({ statusCode, data }) => resolve(success(statusCode, data, options._params)),
			fail: ({ errMsg }) => resolve(fail(errMsg)),
			complete,
			...options,
			...payload
		});
	}
});

// 表单提交
export const submit = (url, formData = null, name = "files") => new Promise((resolve) => {
	if (!name) name = "files";
	if (formData && name in formData && Object.keys(formData[name]).length > 0) {
		const options = interceptor(url);
		if (options) {
			let files = [];
			const formDataFiles = formData[name];
			for (let key in formDataFiles) {
				files.push({ name: key, uri: formDataFiles[key] });
			}
			delete formData[name];
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
		}
	} else {
		resolve(fetch(url, formData));
	}
});

// 图片上传
export const upload = (filePath, url = config.upload_url, name = "file") => new Promise((resolve) => {
	if (!url) url = config.upload_url;
	if (!name) name = "file";
	const options = interceptor(url);
	if (options) {
		uni.uploadFile({
			fileType: "image",
			filePath,
			name,
			success: ({ statusCode, data }) => resolve(success(statusCode, data, options._params)),
			fail: ({ errMsg }) => resolve(fail(errMsg)),
			complete,
			...options
		});
	}
});

// 下载文件
export const download = (url) => new Promise((resolve) => {
	const options = interceptor(url);
	if (options) {
		uni.downloadFile({
			success: ({ statusCode, tempFilePath }) => resolve(success(statusCode, tempFilePath, options._params)),
			fail: ({ errMsg }) => resolve(fail(errMsg)),
			complete,
			...options
		});
	}
});
