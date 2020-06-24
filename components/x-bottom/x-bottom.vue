<template>
	<view
		class="x-bottom"
		:class="{ 'x-safearea': safearea }"
		:style="{ backgroundColor }"
	>
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name: "x-bottom",
		props: {
			safearea: {
				type: Boolean,
				default: true,
			},
			backgroundColor: {
				type: String,
				default: "#FFFFFF",
			},
		},
	};
</script>

<style scoped lang="scss">
	.x-bottom {
		position: fixed;
		z-index: 999;
		left: 0;
		right: 0;
	}
</style>
