<template>
	<view class="home">
		<button type="primary" @click="fetch">fetch</button>
	</view>
</template>

<script>
	export default {
		methods: {
			async fetch() {
				const res = await this.$fetch('index');
				console.log(res);
			}
		}
	};
</script>

<style scoped lang="scss">
	.home {
		padding: 30rpx;
	}
</style>
