<template>
	<view class="x-info x-label" :class="{ checked: checked }">{{ title }}</view>
</template>

<script>
	export default {
		name: 'x-label',
		props: ['title', 'checked']
	};
</script>

<style scoped lang="scss">
	.x-label {
		background-color: $gray-6;
		padding: 10rpx 20rpx;
		border-radius: $radius;
		min-width: 88rpx;
		text-align: center;
	}
	.checked {
		background-color: rgba($color: $main-color, $alpha: 0.75);
		color: $second-color;
	}
</style>
