<template>
	<view class="x-product-card">
		<view class="thumb"><image :src="thumb" mode="widthFix"></image></view>
		<view class="content">
			<view class="x-one-line title">{{ title }}</view>
			<view class="x-one-line x-info sub" v-if="sub">{{ sub }}</view>
			<view class="x-one-line price">
				￥<text class="val">{{ price }}</text>
			</view>
			<view class="x-row x-info extra">
				<view class="x-del old">￥{{ old }}</view>
				<view class="saled">已售 {{ saled }} 件</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'x-product-card',
		props: ['thumb', 'title', 'sub', 'price', 'old', 'saled']
	};
</script>

<style scoped lang="scss">
	.x-product-card {
		overflow: hidden;
		background-color: #ffffff;
		border-radius: $radius;
		.thumb {
			overflow: hidden;
			height: 0;
			padding-bottom: 100%;
			image {
				position: absolute;
			}
		}
		.content {
			padding: 20rpx;
			.price {
				margin-top: 10rpx;
				color: $red;
				font-size: $info-size;
				.val {
					font-size: $title-size;
				}
			}
			.extra {
				justify-content: space-between;
			}
		}
	}
</style>
