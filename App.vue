<script>
	export default {
		onLaunch: function () {
			// this.startup();
		},
		methods: {
			// async startup() {
			// 	// #ifdef APP-PLUS
			// 	if (process.env.NODE_ENV === "development") {
			// 		uni.setKeepScreenOn({ keepScreenOn: true });
			// 	} else {
			// 		await this.$tools.updateWgt();
			// 	}
			// 	// #endif
			// },
		},
	};
</script>

<style lang="scss">
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
		font-size: $body-size;
		color: $body-color;
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
		display: flex;
		justify-content: center;
		align-items: center;
		border: none;
		outline: none;
		box-shadow: none;
		margin: 0;
		font-size: $body-size;
		height: 88rpx;
		border-radius: 44rpx;
		min-width: 180rpx;
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
		font-weight: bold;
		border: 4rpx solid $main-color;
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

	[class^="x-"] {
		&[class$="-hover"] {
			background-color: rgba($color: $hover-bgc, $alpha: 0.75);
		}

		&[class*="-del"] {
			text-decoration: line-through;
		}

		&[class^="x-num"] {
			font-size: $number-size;
		}
		&[class$="-num"] {
			color: $number-color;
		}

		&[class^="x-l-title"] {
			font-size: $l-title-size;
		}
		&[class$="-l-title"] {
			color: $l-title-color;
		}

		&[class^="x-title"] {
			font-size: $title-size;
		}
		&[class$="-title"] {
			color: $title-color;
		}

		&[class^="x-sub"] {
			font-size: $sub-size;
		}
		&[class$="-sub"] {
			color: $sub-color;
		}

		&[class^="x-info"] {
			font-size: $info-size;
		}
		&[class$="-info"] {
			color: $info-color;
		}

		&[class$="-blue"] {
			color: $blue;
		}
		&[class$="-green"] {
			color: $green;
		}
		&[class$="-indigo"] {
			color: $indigo;
		}
		&[class$="-orange"] {
			color: $orange;
		}
		&[class$="-pink"] {
			color: $pink;
		}
		&[class$="-purple"] {
			color: $purple;
		}
		&[class$="-red"] {
			color: $red;
		}
		&[class$="-teal"] {
			color: $teal;
		}
		&[class$="-yellow"] {
			color: $yellow;
		}
		&[class$="-main"] {
			color: $main-color;
		}

		&[class^="x-row"] {
			display: flex;
			align-items: center;
			* {
				flex-shrink: 0;
			}
		}
		&[class^="x-col"] {
			display: flex;
			flex-direction: column;
			* {
				flex-shrink: 0;
			}
		}
		&[class*="-flex"] {
			flex: 1;
			overflow: hidden;
		}
		&[class$="-center"] {
			justify-content: center;
			align-items: center;
		}
	}

	.x-one-line {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
