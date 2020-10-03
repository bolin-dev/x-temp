<template>
	<view class="home">
		<button type="default" @click="fetch">fetch</button>
		<x-cell title="title" sub="sub">321</x-cell>
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
		// padding: 30rpx;
	}
</style>
