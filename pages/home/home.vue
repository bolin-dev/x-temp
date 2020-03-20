<template>
	<view class="home">
		<button type="primary" @click="fetch">fetch</button>
		<input type="text" value="" placeholder="" />
	</view>
</template>

<script>
	export default {
		methods: {
			async fetch() {
				await this.$fetch("fetch");
				// await this.$fetch("#fetch");
				// await this.$fetch("#fetch#");
				// await this.$fetch("#fetch##");
				// await this.$fetch("fetch#");
				// await this.$fetch("fetch##");
			}
		}
	}
</script>

<style scoped lang="scss">
	.home {}
</style>
