<template>
	<view class="x-upload" @click="chooseType">
		<slot></slot>
		<view class="thumb" v-if="!isSlot">
			<image :src="thumb || '/static/upload.png'" mode="aspectFill"></image>
			<view class="x-center mask" @click.stop v-if="status === 'uploading'">
				<text class="icon-redo spin"></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "x-upload",
		props: {
			api: {
				type: String,
				default: ""
			}
		},
		data() {
			return {
				thumb: "",
				status: "init"
			};
		},
		methods: {
			async chooseType() {
				const res = await this.$tools.chooseImage();
				if (res && !res.err) {
					this.$emit("change", res);
					const url = res.data[0];
					this.thumb = url;
					this.upload(url);
				}
			},
			async upload(url) {
				let hasUpload = false;
				// #ifndef MP
				hasUpload = this.$listeners["upload"];
				// #endif
				
				if (hasUpload) return this.$emit("upload", url);
				
				let payload = { err: true, msg: "图片不存在或已删除！", data: "" };
				if (url) {
					this.status = "uploading";
					const res = await this.$upload(url, this.api);
					this.status = "done";
					if (res.err) this.thumb = "";
					payload = res;
				}
				this.$emit("done", payload);
			}
		},
		computed: {
			isSlot() {
				return this.$slots.default;
			}
		}
	};
</script>

<style scoped lang="scss">
	.x-upload {
		display: inline;

		.thumb {
			width: 160rpx;
			height: 160rpx;
			overflow: hidden;

			image {
				height: 100%;
			}
		}

		.mask {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			background-color: rgba($color: #000000, $alpha: 0.75);
			color: #ffffff;
			font-size: 66rpx;
		}
	}
</style>
