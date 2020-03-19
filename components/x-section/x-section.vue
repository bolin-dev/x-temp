<template>
	<view 
		class="x-row x-section" 
		:style="{
			borderBottom: border ? '1rpx solid #e5e5ea' : 'none',
			minHeight: `${minHeight}rpx`
		}"
	>
		<view class="x-flex x-row box">
			<view class="label" v-if="label && label.length > 0">{{ label }}</view>
			<view class="x-flex content">
				<slot></slot>
			</view>
			<view class="extra" v-if="isExtra">
				<slot name="extra"></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "x-section",
		props: {
			label: {
				type: String,
				default: ''
			},
			border: {
				type: Boolean,
				default: true
			},
			minHeight: {
				type: Number,
				default: 88
			}
		},
		computed: {
			isExtra() {
				return this.$slots.extra;
			}
		}
	};
</script>

<style scoped lang="scss">
	.x-section {
		padding: 15rpx 20rpx;

		.box {
			align-items: flex-start;

			.label {
				min-width: 160rpx;
				padding: 0 10rpx;
			}

			.content {
				padding: 0 10rpx;
			}

			.extra {
				padding: 0 10rpx;
				color: $main-color;
			}
		}
	}
</style>
