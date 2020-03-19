<template>
	<view class="x-row x-product-list">
		<view 
			class="product" 
			v-for="(item, index) in products" 
			:key="index" 
			@click="toNav(`/pages/product/product?id=${item.id}`)"
		>
			<x-product-card 
				:thumb="item.thumb" 
				:title="item.title" 
				:sub="item.sub" 
				:price="item.price" 
				:old="item.old" 
				:saled="item.saled"
			>
			</x-product-card>
		</view>
	</view>
</template>

<script>
	import xProductCard from '@/components/x-product-card.vue';
	export default {
		name: 'x-product-list',
		components:{
			xProductCard
		},
		data() {
			return {
				products: [
					{
						thumb: 'https://picsum.photos/200',
						title: '红蛇果红蛇果红蛇果红蛇果红蛇果红蛇果',
						sub: '产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍',
						price: '39.8',
						old: '40.0',
						saled: '88.8'
					},
					{
						thumb: 'https://picsum.photos/200',
						title: '红蛇果红蛇果红蛇果红蛇果红蛇果红蛇果',
						sub: '产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍',
						price: '39.8',
						old: '40.0',
						saled: '88.8'
					},
					{
						thumb: 'https://picsum.photos/200',
						title: '红蛇果红蛇果红蛇果红蛇果红蛇果红蛇果',
						sub: '产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍',
						price: '39.8',
						old: '40.0',
						saled: '88.8'
					},
					{
						thumb: 'https://picsum.photos/200',
						title: '红蛇果红蛇果红蛇果红蛇果红蛇果红蛇果',
						sub: '产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍',
						price: '39.8',
						old: '40.0',
						saled: '88.8'
					}
				]
			};
		},
		methods: {
			toNav(url) {
				uni.navigateTo({ url });
			}
		}
	};
</script>

<style scoped lang="scss">
	.x-product-list {
		flex-wrap: wrap;
		padding: 15rpx;
		.product {
			width: 50%;
			padding: 15rpx;
		}
	}
</style>
