<template>
	<view class="home">
		<button type="primary" @click="fetch">fetch</button>
	</view>
</template>

<script>
	export default{
		methods:{
			async fetch() {
				await this.$fetch("fetch");
				// await this.$fetch("#api");
				// await this.$fetch("#fetch#");
				// await this.$fetch("#api##");
				// await this.$fetch("api#");
				// await this.$fetch("api##");
			}
		}
	}
</script>

<style scoped lang="scss"></style>
