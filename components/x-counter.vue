<template>
	<view class="x-row x-counter">
		<button class="x-center btn" @click.stop="cut">-</button>
		<view class="x-center num">{{ num }}</view>
		<button class="x-center btn" @click.stop="add">+</button>
	</view>
</template>

<script>
export default {
	name: 'x-counter',
	props: {
		index: {
			type: Number,
			default: 0
		},
		num: {
			type: Number,
			default: 1
		},
		min: {
			type: Number,
			default: 1
		},
		max: {
			type: Number,
			default: 99
		}
	},
	methods: {
		cut() {
			if (this.num > this.min) {
				const value = this.num - 1;
				this.$emit('change', {
					index: this.index,
					value
				});
			}
		},
		add() {
			if (this.num < this.max) {
				const value = this.num + 1;
				this.$emit('change', {
					index: this.index,
					value
				});
			} else {
				this.tools.toast('数量超出限制~');
			}
		}
	}
};
</script>

<style scoped lang="scss">
$hei: 50rpx;

.x-counter {
	align-items: center;
	overflow: hidden;
	border: $border;
	border-radius: 8rpx;
	width: fit-content;

	.btn {
		padding: 0;
		width: 66rpx;
		height: $hei;
		line-height: 1;
		border-radius: 0;
		font-size: $sub-size;
		color: $sub-color;
	}

	.btn:after {
		padding: 0;
	}

	.num {
		padding: 0 15rpx;
		min-width: 66rpx;
		height: $hei;
		border-left: $border;
		border-right: $border;
		font-size: $sub-size;
	}
}
</style>
