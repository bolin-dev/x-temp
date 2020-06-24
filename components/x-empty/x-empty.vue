<template>
	<view class="x-center x-col x-empty">
		<view class="thumb">
			<image :src="thumb" mode="widthFix"></image>
		</view>
		<view class="title" v-if="title">{{ title }}</view>
	</view>
</template>

<script>
	export default {
		name: "x-empty",
		props: {
			thumb: {
				type: String,
				default: "/static/empty.png",
			},
			title: {
				type: String,
				default: "暂无数据",
			},
		},
	};
</script>

<style scoped lang="scss">
	.x-empty {
		padding: 90rpx;

		.thumb {
			width: 240rpx;
			height: 240rpx;
			overflow: hidden;
		}

		.title {
			color: $info-color;
			margin-top: 30rpx;
			text-align: center;
		}
	}
</style>
