<script>
	export default {
		onLaunch: function () {
			this.startup();
		},
		methods: {
			async startup() {
				// #ifdef APP-PLUS
				if (process.env.NODE_ENV === "development") {
					uni.setKeepScreenOn({ keepScreenOn: true });
				} else {
					await this.$tools.updateWgt();
				}
				// #endif
			},
		},
	};
</script>

<style lang="scss">
	@import "normalize.css";
	@import "common/icon.css";

	::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}

	page {
		background-color: $bgc;
		@extend %x-body;
	}

	view {
		position: relative;
		background-repeat: no-repeat;
		background-size: 100% auto;
	}

	image,
	video {
		width: 100%;
	}

	view,
	button,
	input,
	textarea {
		box-sizing: border-box;
	}

	.x-radio {
		display: flex;
		align-items: center;
		font-size: $sub-size;
		color: $info-color;
	}

	radio,
	switch {
		transform: scale(0.75);
	}

	input,
	textarea {
		width: 100%;
		min-height: auto;
		font-size: $body-size;
	}

	.input-placeholder,
	.textarea-placeholder {
		font-size: $body-size;
		color: $info-color;
	}

	input {
		height: auto;
	}

	button {
		@extend %x-center;
		border: none;
		outline: none;
		box-shadow: none;
		margin: 0;
		font-size: $body-size;
		height: 88rpx;
		border-radius: 44rpx;
	}

	button:after {
		border: none;
		outline: none;
		box-shadow: none;
		margin: 0;
	}

	button[type="primary"] {
		background: $main-color;
	}

	.button-hover[type="primary"] {
		background: $main-color;
	}

	button[type="default"] {
		background: none;
		color: $main-color;
		border: 2rpx solid $main-color;
	}

	.button-hover[type="default"] {
		background: none;
		color: $main-color;
	}

	.x-header {
		padding-top: var(--status-bar-height);
	}

	.x-safearea {
		padding-bottom: 0;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}

	.x-top {
		top: var(--window-top);
	}

	.x-bottom {
		bottom: var(--window-bottom);
	}

	.x-num {
		@extend %x-num;
	}

	.x-l-title {
		@extend %x-l-title;
	}

	.x-title {
		@extend %x-title;
	}

	.x-sub {
		@extend %x-sub;
	}

	.x-info {
		@extend %x-info;
	}

	.x-center {
		@extend %x-center;
		flex-direction: row;
	}

	.x-center-col {
		@extend %x-center;
		flex-direction: column;
	}

	.x-row {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.x-col {
		display: flex;
		flex-direction: column;
	}

	.x-flex {
		flex: 1;
		overflow: hidden;
	}

	.x-one-line {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.x-del {
		text-decoration: line-through;
	}

	.x-link {
		color: $main-color;
	}

	.x-desc {
		color: $info-color;
	}

	.x-btn-area {
		padding: 60rpx 30rpx;
	}

	.x-square {
		padding-bottom: 100%;
		height: 0;
		word-wrap: break-word;
	}
</style>
