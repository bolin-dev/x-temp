import Vue from "vue"
import Vuex from "vuex"

import { getStorageSync } from "common/tools";
import { fetch } from "services/request";

Vue.use(Vuex);

const loginUrl = "/pages/login/login";
const homeUrl = "/pages/home/home";

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
			let url = loginUrl;
			let token = getStorageSync("token");
			const res = await fetch("#checkToken");
			// if (token && typeof token === "string") {
			// 	const res = await fetch("#checkToken");
			// 	token = "";
			// 	if (res && !res.err) {
			// 		token = res.data.token;
			// 		url = homeUrl;
			// 		commit("upAuth", res);
			// 	}
			// }
			uni.setStorageSync("token", token);
			uni.reLaunch({ url });
		},
		async login({ commit }, payload) {
			const res = await fetch("#login#", payload);
			if (res && !res.err) {
				uni.setStorage({ key: "account", data: payload.account });
				uni.setStorageSync("token", data.token);
				uni.reLaunch({ url: homeUrl });
				commit("upAuth", res);
			}
		},
		logout({ commit }) {
			uni.showModal({
				title: "退出登录",
				content: "是否确认退出登录？",
				confirmText: "退出",
				success: async ({ confirm }) => {
					if (confirm) {
						await fetch("#logout");
						uni.removeStorageSync("token");
						uni.reLaunch({ url: loginUrl });
						commit("upAuth", { err: true });
					}
				}
			})
		}
	}
})

export default store;
