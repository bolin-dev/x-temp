<template>
	<view></view>
</template>

<script>
	export default {
		onLoad() {
			if (process.env.NODE_ENV === 'development') {
				// uni.reLaunch({ url: '/pages/login/login' });
				uni.switchTab({ url: "/pages/home/home" });
			} else {
				this.$store.dispatch("checkToken");
			}
		}
	};
</script>

<style></style>
