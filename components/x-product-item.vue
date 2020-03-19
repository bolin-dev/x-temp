<template>
	<view class="x-row x-product-item">
		<x-thumb :src="thumb" size="big" shape="square"></x-thumb>
		<view class="x-flex content">
			<view class="x-one-line title">{{ title }}</view>
			<view class="x-one-line x-info sub" v-if="sub">{{ sub }}</view>
			<view class="x-row x-info money">
				<view class="price">
					￥<text class="val">{{ price }}</text>
				</view>
				<slot></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'x-product-item',
		props: ['thumb', 'title', 'sub', 'price']
	};
</script>

<style scoped lang="scss">
	.x-product-item {
		align-items: center;
		.content {
			padding-left: 20rpx;
			.money {
				margin-top: 10rpx;
				justify-content: space-between;
				align-items: baseline;
				.price {
					color: $red;
					.val {
						font-size: $title-size;
					}
				}
			}
		}
	}
</style>
