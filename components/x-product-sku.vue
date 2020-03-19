<template>
	<uni-popup ref="xProductSku" type="bottom" custom>
		<view class="x-product-sku">
			<view class="x-row header">
				<x-thumb :src="thumb" size="big" shape="square"></x-thumb>
				<view class="x-flex info">
					<view class="x-one-line title">{{ title }}</view>
					<view class="x-info price">
						￥<text class="val">{{ price }}</text>
					</view>
					<view class="x-info stock">库存 {{ stock }} 件</view>
				</view>
			</view>
			<view class="sku" v-for="(item, index) in sku" :key="index">
				<view class="x-sub type">{{ item.title }}</view>
				<view class="x-row options">
					<view class="label" v-for="(opt, oIndex) in item.options" :key="oIndex" @click="changeSku(item.key, opt.key)">
						<x-label :title="opt.label" :checked="opt.key === active[item.key]"></x-label>
					</view>
				</view>
			</view>
			<view class="x-row num">
				<view class="x-sub type">购买数量</view>
				<x-counter :num="num" :max="stock" @change="changeNum"></x-counter>
			</view>
			<view class="x-safearea">
				<view class="x-row bottom"><button type="primary" @click="confirm">确定</button></view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
	import xLabel from '@/components/x-label.vue';
	import xCounter from '@/components/x-counter.vue';
	export default {
		name: 'x-product-sku',
		components: {
			xLabel,
			xCounter
		},
		props: ['thumb', 'title', 'price', 'stock', 'active', 'sku', 'num'],
		methods: {
			open() {
				this.$refs.xProductSku.open();
			},
			close() {
				this.$refs.xProductSku.close();
			},
			changeSku(key, val) {
				const payload = {};
				payload[key] = val;
				this.$emit('changeSku', payload);
			},
			changeNum(e) {
				this.$emit('changeNum', e.value);
			},
			confirm() {
				const res = this.noChecked;
				if (!res) {
					this.close();
					this.$emit('confirm');
				} else {
					this.tools.toast(res);
				}
			}
		},
		computed: {
			noChecked() {
				const sku = this.sku;
				if (sku && sku.length) {
					for (let i = 0; i < sku.length; i++) {
						if (!this.active[sku[i].key]) {
							return `请选择${sku[i].title}`;
						}
					}
				}
				return false;
			}
		}
	};
</script>

<style scoped lang="scss">
	.x-product-sku {
		max-height: 80vh;
		overflow: hidden;
		background-color: #ffffff;
		border-radius: $radius $radius 0 0;
		padding: 0 30rpx;
		.header {
			padding: 30rpx 0;
			border-bottom: $border;
			align-items: center;
			.info {
				padding-left: 20rpx;
				.price {
					margin-top: 10rpx;
					color: $red;
					.val {
						font-size: $title-size;
					}
				}
			}
		}
		.sku {
			border-bottom: $border;
			padding-top: 30rpx;
			padding-bottom: 10rpx;
			.type {
				margin-bottom: 20rpx;
			}
			.options {
				flex-wrap: wrap;
				.label {
					margin-right: 20rpx;
					margin-bottom: 20rpx;
				}
			}
		}
		.num {
			align-items: center;
			justify-content: space-between;
			padding: 30rpx 0;
		}
		.x-safearea {
			.bottom {
				height: $tabbar-hei;
				align-items: center;
				button {
					width: 100%;
				}
			}
		}
	}
</style>
