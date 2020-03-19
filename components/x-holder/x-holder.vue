<template>
	<image :src="`https://img.la/${calcSize}`" mode="widthFix"></image>
</template>

<script>
	const sizes = [
		{
			size: "min",
			num: "44"
		},
		{
			size: "mid",
			num: "88"
		},
		{
			size: "big",
			num: "160"
		}
	];
	export default {
		name: "x-holder",
		props: {
			size: {
				type: String,
				default: "mid"
			}
		},
		computed: {
			calcSize() {
				let calcSize = this.size;
				const index = sizes.findIndex(item => item.size === calcSize);
				if (index !== -1) {
					calcSize = sizes[index].num;
				}
				if (calcSize.search('x') === -1) {
					calcSize = `${calcSize}x${calcSize}`;
				}
				return calcSize;
			}
		}
	}
</script>

<style></style>
