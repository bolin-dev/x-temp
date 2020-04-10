<template>
	<view class="x-thumb" :style="{
			boxShadow: shadow ? '0 2px 8px rgba(0, 0, 0, 0.15)' : 'none',
			width: calcSize,
			height: calcSize,
			borderRadius: calcRadius
		}">
		<image :src="`${src || `https://img.la/${size}x${size}`}`" mode="aspectFill" lazy-load></image>
	</view>
</template>

<script>
	const sizes = [
		{
			size: "min",
			num: 44
		},
		{
			size: "mid",
			num: 88
		},
		{
			size: "big",
			num: 160
		}
	];
	export default {
		name: "x-thumb",
		props: {
			src: {
				type: String,
				default: ""
			},
			size: {
				type: [String, Number],
				default: "mid"
			},
			shape: {
				type: String,
				default: "circle"
			},
			shadow: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			calcSize() {
				const size = this.size;
				let calcSize = '';
				const index = sizes.findIndex(item => item.size === size);
				if (index !== -1) {
					calcSize = sizes[index].num;
				} else {
					calcSize = size;
				}
				calcSize = `${calcSize}rpx`;
				return calcSize;
			},
			calcRadius() {
				let calcRadius = '';
				const shape = this.shape;
				if (shape === 'circle') {
					calcRadius = '50%';
				} else if (shape === 'square') {
					const calcSize = this.calcSize;
					if (calcSize >= 44) {
						calcRadius = 8;
					} else {
						calcRadius = 4;
					}
					calcRadius = `${calcRadius}px`;
				}
				return calcRadius;
			}
		}
	};
</script>

<style scoped lang="scss">
	.x-thumb {
		z-index: 1;
		overflow: hidden;

		image {
			height: 100%;
		}
	}
</style>
