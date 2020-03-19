<template>
	<view 
		class="x-row x-cell" 
		:hover-class="{ 'x-cell-hover': isBind }" 
		@click="click"
	>
		<view class="thumb" v-if="thumb && thumb.length > 0">
			<x-thumb 
				:src="thumb" 
				size="min" 
				shape="square"
			>
			</x-thumb>
		</view>
		<view 
			class="x-flex x-row content" 
			:style="{
				borderBottom: border ? '1rpx solid #e5e5ea' : 'none',
				minHeight: `${minHeight}rpx`
			}"
		>
			<view class="x-flex main">
				<view class="x-one-line">{{ title }}</view>
				<view class="x-one-line x-sub sub" v-if="sub && sub.length > 0">{{ sub }}</view>
			</view>
			<view class="x-row extra" v-if="isExtra">
				<slot></slot>
				<view class="icon" v-if="extra">
					<text class="icon-right"></text>
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
				type: String,
				default: ""
			},
			title: {
				type: String,
				required: true
			},
			sub: {
				type: String,
				default: ""
			},
			extra: {
				type: Boolean,
				default: true
			},
			border: {
				type: Boolean,
				default: true
			},
			minHeight: {
				type: Number,
				default: 110
			}
		},
		data() {
			return {
				isBind: false
			}
		},
		methods: {
			click() {
				this.$emit("click");
			}
		},
		mounted() {
			const t = this._events["click"];
			if (t) {
				this.isBind = true;
			}
		},
		computed: {
			isExtra() {
				return this.$slots.default || this.extra;
			}
		}
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
			padding: 15rpx 0;
			padding-right: 20rpx;

			.main {
				padding-right: 10rpx;

				.sub {
					margin-top: 5rpx;
					color: $info-color;
				}
			}

			.extra {
				padding: 0 10rpx;
				color: $info-color;

				.icon {
					padding-left: 15rpx;
				}
			}
		}
	}

	.x-cell-hover {
		@extend %x-hover;
	}
</style>
