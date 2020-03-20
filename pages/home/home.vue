<template>
	<view class="home">
		<button type="primary" @click="fetch">fetch</button>
	</view>
</template>

<script>
	export default {
		methods: {
			async fetch() {
				this.$tools.toast({ err: true, msg: "321"});
				// this.$tools.toast("123", "fail");
				// await this.$fetch("fetch");
				// await this.$fetch("#fetch");
				// await this.$fetch("#fetch#");
				// await this.$fetch("#fetch##", {
				// 	account: "18319569012",
				// 	password: this.$tools.pwd2sh1("123456")
				// });
				// await this.$fetch("fetch#");
				// await this.$fetch("fetch##");
			}
		}
	}
</script>

<style scoped lang="scss">
	.home {}
</style>
