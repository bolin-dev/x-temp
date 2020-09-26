import config from "config";
import { isUrl, fetch, download } from "services/request";

// 防抖
export function debounce(func, ms = 1000) {
	let timer;
	return function (...args) {
		if (timer) clearTimeout(timer);
		timer = setTimeout(() => func.apply(this, args), ms);
	};
}

// 节流
export function throttle(func, ms = 1000) {
	let canRun = true;
	return function (...args) {
		if (!canRun) return 0;
		canRun = false;
		setTimeout(() => {
			func.apply(this, args);
			canRun = true;
		}, ms);
	};
}

// 富文本图片样式
export const richTextReplace = (text = "") => {
	if (text) {
		const regex = new RegExp("<img", "gi");
		text = text.replace(regex, `<img style="max-width: 100%;"`);
	}
	return text;
};

// 获取缓存数据
export const getStorageSync = key => {
	try {
		key = uni.getStorageSync(key);
	} catch (err) {
		key = "";
	}
	return key;
};

// 选择图片
export const chooseImage = (count = 1, payload = {}) =>
	new Promise(resolve => {
		uni.chooseImage({
			count,
			success: ({ tempFilePaths }) =>
				resolve({
					err: false,
					msg: "获取图片成功~",
					data: tempFilePaths,
				}),
			fail: () => resolve({ err: true, msg: "获取图片失败！", data: "" }),
			...payload,
		});
	});

// 保存文件
export const saveFile = tempFilePath =>
	new Promise(resolve => {
		if (tempFilePath) {
			uni.saveFile({
				tempFilePath,
				success: ({ savedFilePath }) =>
					resolve({
						err: false,
						msg: "保存成功~",
						data: savedFilePath,
					}),
				fail: () => resolve({ err: true, msg: "保存失败！", data: "" }),
			});
		}
	});

// 消息提示
export const toast = (title = "", icon = "none", payload = {}) => {
	if (typeof title !== "string") {
		if ("err" in title && "msg" in title) {
			icon = title.err ? "fail" : "success";
			title = title.msg || "";
		} else {
			title = "";
		}
	}
	title = title.trim();
	if (title) {
		hideLoading();
		const isNone = !["fail", "success"].includes(icon);
		uni.showToast({
			title,
			icon: isNone ? "none" : "",
			image: isNone ? "" : `/static/toast/${icon}.png`,
			...payload,
		});
	}
};

// loading提示
let delay;
let timer;
export const loading = (title = "", mask = true) => {
	hideLoading();
	delay = setTimeout(() => uni.showLoading({ title, mask, success: startLoading }), 300);
};
const startLoading = () => {
	timer = setTimeout(hideLoading, 30000);
};
export const hideLoading = () => {
	if (delay) {
		clearTimeout(delay);
		delay = null;
	}
	if (timer) {
		clearTimeout(timer);
		timer = null;
		uni.hideLoading();
	}
};

// 对话框(APP-PLUS)
export const prompt = ({ title = "", message, placeholder = "", buttons = ["取消", "确定"] }) =>
	new Promise(resolve => {
		if (!buttons || !buttons.length) buttons = ["取消", "确定"];
		plus.nativeUI.prompt(message, e => resolve(e), title, placeholder, buttons);
	});

// 登录
export const login = (provider = "", payload = {}) =>
	new Promise(resolve => {
		uni.login({
			provider,
			success: data => resolve({ err: false, msg: "登录成功~", data }),
			fail: () => resolve({ err: true, msg: "登录失败！", data: "" }),
			...payload,
		});
	});

// 分享
export const share = (provider, payload = {}) =>
	new Promise(resolve => {
		uni.share({
			provider,
			success: () => resolve({ err: false, msg: "分享成功~", data: "" }),
			fail: () => resolve({ err: true, msg: "分享失败！", data: "" }),
			...payload,
		});
	});

// 系统分享
export const shareWithSystem = payload =>
	new Promise(resolve => {
		uni.shareWithSystem({
			success: () => resolve({ err: false, msg: "分享成功~", data: "" }),
			fail: () => resolve({ err: true, msg: "分享失败！", data: "" }),
			...payload,
		});
	});

// 保存图片到系统相册
export const saveImageToPhotosAlbum = filePath =>
	new Promise(async resolve => {
		if (isUrl(filePath)) {
			filePath = await download(filePath);
			filePath = filePath.data;
		}
		if (filePath) {
			uni.saveImageToPhotosAlbum({
				filePath,
				success: () => resolve({ err: false, msg: "保存成功~", data: "" }),
				fail: () => resolve({ err: true, msg: "保存失败！", data: "" }),
			});
		}
	});

// 调用第三方应用
export const openURL = url =>
	new Promise(resolve =>
		plus.runtime.openURL(url, () =>
			resolve({
				err: true,
				msg: "打开失败，请确保应用已安装！",
				data: "",
			})
		)
	);

// 更新APPwgt文件
export const updateWgt = () => {
	const wgt_url = config.wgt_url;
	if (isUrl(wgt_url)) {
		const url = "/pages/index/index";
		return new Promise(() => {
			plus.runtime.getProperty(plus.runtime.appid, async widgetInfo => {
				const fetchRes = await fetch(`#${wgt_url}`, widgetInfo);
				if (!fetchRes.err) {
					const { update, wgtUrl } = fetchRes.data;
					if (update && wgtUrl) {
						loading("正在更新，请稍候~");
						const downloadRes = await download(wgtUrl);
						if (!downloadRes.err) {
							const saveRes = await saveFile(downloadRes.data);
							if (!saveRes.err) {
								plus.runtime.install(
									saveRes.data,
									{ force: false },
									() => plus.runtime.restart(),
									() => uni.reLaunch({ url })
								);
							}
						}
					}
				}
			});
		});
	}
};
