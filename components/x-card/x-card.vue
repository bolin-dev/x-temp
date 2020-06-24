<template>
	<view
		class="x-card"
		:style="{
			backgroundColor: color,
			borderRadius: radius,
			padding: pad,
		}"
	>
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name: "x-card",
		props: {
			color: {
				type: String,
				default: "",
			},
			radius: {
				type: [String, Number],
				default: "",
			},
			pad: {
				type: String,
				default: "",
			},
		},
	};
</script>

<style scoped lang="scss">
	.x-card {
		background-color: #ffffff;
		border-radius: $radius;
		padding: 30rpx;
	}
</style>
