<template>
	<view class="x-list">
		<view class="x-row row head">
			<view class="x-flex x-one-line col" v-for="(item, index) in columns" :key="index">
				{{ item.title || "" }}
			</view>
		</view>
		<view class="x-row row" v-for="(row, rowIndex) in dataSource" :key="rowIndex">
			<view class="x-flex x-one-line col" v-for="(col, colIndex) in columns" :key="colIndex">
				{{ row[col.key] }}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "x-list",
		props: {
			columns: {
				type: Array,
				required: true,
			},
			dataSource: {
				type: Array,
				required: true,
			},
		},
	};
</script>

<style scoped lang="scss">
	.x-list {
		.row {
			border-bottom: $border;
			height: 88rpx;
			padding: 0 20rpx;

			.col {
				padding: 0 10rpx;
				text-align: center;
			}
		}

		.row:last-child {
			border: none;
		}

		.head {
			color: $info-color;
		}
	}
</style>
