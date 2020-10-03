<template>
	<view class="x-row x-cell" :hover-class="{ 'x-hover': hasBind }" @click="handleClick">
		<view class="thumb" v-if="thumb">
			<x-thumb v-if="typeof thumb === 'string'" :src="thumb" size="min" shape="square" />
			<x-thumb v-else v-bind="thumb" />
		</view>
		<view
			class="x-flex x-row content"
			:style="{
				borderBottom: border ? '1rpx solid #e5e5ea' : 'none',
				minHeight: `${minHeight}rpx`,
			}"
		>
			<view class="x-flex main">
				<view class="x-one-line">{{ title }}</view>
				<view class="x-one-line x-sub sub" v-if="sub && sub.length">
					{{ sub }}
				</view>
			</view>
			<view class="x-row extra">
				<slot />
				<view class="icon" v-if="extra">
					<text class="icon-right" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "x-cell",
		props: {
			thumb: {
				type: [String, Object],
				default: "",
			},
			title: {
				type: String,
				default: "",
			},
			sub: {
				type: String,
				default: "",
			},
			extra: {
				type: Boolean,
				default: true,
			},
			border: {
				type: Boolean,
				default: true,
			},
			minHeight: {
				type: Number,
				default: 88,
			},
		},
		data() {
			return {
				hasBind: false,
			};
		},
		methods: {
			handleClick() {
				this.$emit("click");
			},
		},
		mounted() {
			const t = this._events["click"];
			if (t) this.hasBind = true;
		},
		computed: {
			isExtra() {
				return this.$slots.default || this.extra;
			},
		},
	};
</script>

<style scoped lang="scss">
	.x-cell {
		padding-left: 30rpx;
		transition: all 0.1s ease;
		.thumb {
			padding-right: 20rpx;
		}
		.content {
			padding: 16rpx 20rpx 16rpx 2rpx;
			.main {
				padding-right: 10rpx;
				.sub {
					margin-top: 6rpx;
					color: $info-color;
				}
			}
			.extra {
				padding: 0 10rpx;
				color: $info-color;
				.icon {
					padding-left: 20rpx;
				}
			}
		}
	}
</style>
