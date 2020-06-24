<template>
	<view></view>
</template>

<script>
	export default {
		onLoad() {
			this.$store.dispatch("checkToken");
		},
	};
</script>

<style></style>
