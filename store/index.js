import Vue from "vue"
import Vuex from "vuex"

import { getStorageSync } from "common/tools";
import { fetch } from "services/request";

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {},
	state: {
		isLogin: false,
		member: ""
	},
	mutations: {
		upAuth(state, payload) {
			state.isLogin = !payload.err
			state.member = payload.err ? "" : payload.data.member
		},
		upMember(state, payload) {
			state.member = { ...state.member, ...payload }
		}
	},
	actions: {
		async checkToken({ commit }) {
			let url = "/pages/login/login";
			let token = getStorageSync("token");
			if (token && typeof token === "string") {
				const res = await fetch("checkToken");
				token = "";
				if (res && !res.err) {
					token = res.data.token;
					url = "/pages/home/home";
					commit("upAuth", res);
				}
			}
			uni.setStorageSync("token", token);
			uni.hideLoading();
			uni.reLaunch({ url });
		},
		async login({ commit }, payload) {
			uni.showLoading({ title: "登录中...", mask: true });
			const res = await fetch("login", payload);
			uni.hideLoading();
			if (res && "err" in res) {
				const { err, msg, data } = res;
				uni.showToast({ icon: err ? "none" : "success", title: msg });
				if (!err) {
					uni.setStorage({ key: "account", data: payload.account });
					uni.setStorageSync("token", data.token);
					uni.reLaunch({ url: "/pages/home/home" });
					commit("upAuth", res);
				}
			}
		},
		logout({ commit }) {
			uni.showModal({
				title: "退出登录",
				content: "是否确认退出登录",
				confirmText: "退出",
				success: async ({ confirm }) => {
					if (confirm) {
						uni.showLoading({ mask: true });
						await fetch("logout");
						uni.removeStorageSync("token");
						uni.hideLoading();
						uni.reLaunch({ url: "/pages/login/login" });
						commit("upAuth", { err: true });
					}
				}
			})
		}
	}
})

export default store;
