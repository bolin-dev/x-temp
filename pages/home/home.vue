<template>
	<view class="home">
		<button type="default" @click="fetch">fetch</button>
		<view class="x-num-red">
			测试标题
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			async fetch() {
				const res = await this.$fetch("index");
			},
		},
	};
</script>

<style scoped lang="scss">
	.home {
		padding: 30rpx;
	}
</style>
