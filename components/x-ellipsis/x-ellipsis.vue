<template>
	<view class="x-ellipsis" :style="{ '-webkit-line-clamp': lines }">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name: "x-ellipsis",
		props: {
			lines: {
				type: [Number, String],
				default: 1,
			},
		},
	};
</script>

<style scoped lang="scss">
	.x-ellipsis {
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-all;
		display: -webkit-box;
		-webkit-box-orient: vertical;
	}
</style>
