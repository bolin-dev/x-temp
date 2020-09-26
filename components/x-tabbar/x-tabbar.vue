<template>
	<view class="x-row x-tabbar">
		<view
			class="x-center tab"
			:class="{ active: current == index }"
			v-for="(item, index) in tab"
			:key="index"
			@click="change(index)"
		>
			{{ item }}
			<view class="dot" :style="{ backgroundColor: current == index ? color : '' }"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "x-tabbar",
		props: {
			tab: {
				type: Array,
				required: true,
			},
			current: {
				type: [String, Number],
				default: 0,
			},
			color: {
				type: String,
				default: "",
			},
		},
		methods: {
			change(current) {
				if (this.current !== current) {
					this.$emit("change", current);
				}
			},
		},
	};
</script>

<style scoped lang="scss">
	.x-tabbar {
		overflow: hidden;
		padding: 0 20rpx;
		justify-content: space-around;

		.tab {
			height: 88rpx;
			padding: 0 10rpx;
			min-width: 142rpx;
			color: $info-color;

			.dot {
				position: absolute;
				height: 8rpx;
				width: 44rpx;
				border-radius: 8rpx;
				bottom: 0;
				left: 50%;
				transform: translateX(-50%);
			}
		}

		.active {
			color: $body-color;

			.dot {
				background-color: $main-color;
			}
		}
	}
</style>
