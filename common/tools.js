import config from "config";
import { isUrl, fetch, download } from "services/request";
import sha1 from "sha1";

// 富文本图片样式
export const richTextReplace = (text = "") => {
	if (text) {
		const regex = new RegExp("<img", "gi");
		text = text.replace(regex, `<img style="max-width: 100%;"`);
	}
	return text;
}

// 密码sha1加密
export const pwd2sh1 = (val = "") => {
	if (val) {
		val = val.trim();
		if (val) val = sha1(val);
	}
	return val;
}

// 获取缓存数据
export const getStorageSync = (key) => {
	try {
		key = uni.getStorageSync(key);
	} catch (err) {
		key = "";
	}
	return key;
}

// 选择图片
export const chooseImage = (count = 1, payload = {}) => new Promise((resolve) => {
	uni.chooseImage({
		count,
		success: ({ tempFilePaths }) => resolve({ err: false, msg: "获取图片成功~", data: tempFilePaths }),
		fail: () => resolve({ err: true, msg: "获取图片失败！", data: "" }),
		...payload
	});
});

// 保存文件
export const saveFile = (tempFilePath) => new Promise((resolve) => {
	if (tempFilePath) {
		uni.saveFile({
			tempFilePath,
			success: ({ savedFilePath }) => resolve({ err: false, msg: "保存成功~", data: savedFilePath }),
			fail: () => resolve({ err: true, msg: "保存失败！", data: "" })
		});
	}
});

// 消息提示
export const toast = (title = "", icon = "none", payload = {}) => {
	if (typeof title !== "string") {
		if ("err" in title && "msg" in title) {
			icon = title.err ? "fail" : "success";
			title = title.msg;
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
			...payload
		});
	}
}

// loading提示
let delay = null;
let timer = null;
export const loading = (title = "", mask = true) => {
	hideLoading();
	delay = setTimeout(() => {
		uni.showLoading({ title, mask, success: startLoading });
	}, 300);
}
const startLoading = () => {
	timer = setTimeout(hideLoading, 30000);
}
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
}

// 对话框(APP-PLUS)
export const prompt = ({ title = "", message, placeholder = "", buttons = ["取消", "确定"] }) => new Promise((resolve) => {
	// #ifdef APP-PLUS
	if (!buttons || !buttons.length) buttons = ["取消", "确定"];
	plus.nativeUI.prompt(
		message,
		(e) => resolve(e),
		title,
		placeholder,
		buttons,
	);
	// #endif
});

// 登录
export const login = (provider = "", payload = {}) => new Promise((resolve) => {
	uni.login({
		provider,
		success: (data) => resolve({ err: false, msg: "登录成功~", data }),
		fail: () => resolve({ err: true, msg: "登录失败！", data: "" }),
		...payload
	});
});

// 分享
export const share = (provider, payload = {}) => new Promise((resolve) => {
	uni.share({
		provider,
		success: () => resolve({ err: false, msg: "分享成功~", data: "" }),
		fail: () => resolve({ err: true, msg: "分享失败！", data: "" }),
		...payload
	});
});

// 系统分享
export const shareWithSystem = (payload) => new Promise((resolve) => {
	uni.shareWithSystem({
		success: () => resolve({ err: false, msg: "分享成功~", data: "" }),
		fail: () => resolve({ err: true, msg: "分享失败！", data: "" }),
		...payload
	})
});

// 保存图片到系统相册
export const saveImageToPhotosAlbum = (filePath) => new Promise(async (resolve) => {
	if (isUrl(filePath)) {
		filePath = await download(filePath);
		filePath = filePath.data;
	}
	if (filePath) {
		uni.saveImageToPhotosAlbum({
			filePath,
			success: () => resolve({ err: false, msg: "保存成功~", data: "" }),
			fail: () => resolve({ err: true, msg: "保存失败！", data: "" })
		})
	}
});

// 调用第三方应用
export const openURL = url => new Promise((resolve) => {
	plus.runtime.openURL(url, () => resolve({ err: true, msg: "打开失败，请确保应用已安装！", data: "" }));
});

// 更新APPwgt文件
export const updateWgt = () => new Promise(() => {
	const url = "/pages/index/index";
	plus.runtime.getProperty(plus.runtime.appid, async (widgetInfo) => {
		const { err, data } = await fetch(config.wgt_url, widgetInfo);
		if (!err) {
			const { update, wgtUrl } = data;
			if (update && wgtUrl) {
				loading("正在更新，请稍候~");
				plus.downloader.createDownload(
					wgtUrl, 
					{ filename: "_doc/update/" + widgetInfo.name + "/" + new Date().getTime() + "/" },
					(res) => {
						hideLoading();
						plus.runtime.install(
							res.filename, 
							{ force: false },
							() => plus.runtime.restart(),
							() => uni.reLaunch({ url })
						);
					}
				).start();
			} else {
				uni.reLaunch({ url });
			}
		} else {
			uni.reLaunch({ url });
		}
	});
});
