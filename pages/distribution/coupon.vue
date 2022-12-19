<template>
	<view>
		<view class="search">
			<input type="text" placeholder="輸入優惠券代碼" />
			<view class="button">
				使用
			</view>
		</view>
		<view class="main">
			<view class="select">
				<text>可選擇１張</text>
			</view>
			<view class="vipList">
				<view class="item">
					<image src="../../static/img/viph.png" mode="heightFix"></image>
					<view class="right">
						<view class="right_r">
							<text>折$10元</text>
							<text>有效期限：2021.06.30</text>
						</view>
						<image src="../../static/img/weixuan.png" mode="widthFix"></image>
						<navigator url='/pages/distribution/rules' class="rules">使用規則</navigator>
					</view>
				</view>
				<view class="item">
					<image src="../../static/img/vipy.png" mode="heightFix"></image>
					<view class="right">
						<view class="right_r">
							<text>折$10元</text>
							<text>有效期限：2021.06.30</text>
						</view>
						<image src="../../static/img/select.png" mode="widthFix"></image>
						<navigator url='/pages/distribution/rules' class="rules">使用規則</navigator>
					</view>
				</view>
				<view class="item">
					<image src="../../static/img/vipy.png" mode="heightFix"></image>
					<view class="right">
						<view class="right_r">
							<text>折$10元</text>
							<text>有效期限：2021.06.30</text>
						</view>
						<image src="../../static/img/select.png" mode="widthFix"></image>
						<navigator url='/pages/distribution/rules' class="rules">使用規則</navigator>
					</view>
				</view>
			</view>

		</view>
		<view class="footer">
			<view class="top">
				<text>已選擇優惠券。</text>
				<text>折$10元</text>
			</view>
			<navigator url="">OK</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="less">
	.footer {
		width: 100%;
		position: absolute;
		bottom: 0;

		.top {
			text-align: right;
			background-color: #fff;
			font-size: 30rpx;
			padding: 16rpx 28rpx;

			text {
				color: #FF9EC3;

				&:first-child {
					color: #707070;
				}
			}
		}

		navigator {
			text-align: center;
			padding: 20rpx;
			color: #fff;
			background-color: #FF9EC3;
		}
	}

	.search {
		display: flex;
		justify-content: space-between;
		padding: 20rpx 32rpx;
		background-color: #fff;

		input {
			background-color: #F3F3F3;
			padding: 20rpx 40rpx;
			flex: 1;
			height: 100%;
		}

		.button {
			display: flex;
			justify-content: center;
			/*实现水平居中*/
			align-items: center;
			/*实现垂直居中*/
			margin-left: 8rpx;
			background-color: #C4C4C4;
			padding: 0rpx 24rpx;
		}
	}

	.main {
		height: 85vh;
		background-color: #F3F3F3;

		.select {
			text-align: right;
			font-size: 32rpx;
			color: #707070;
			padding: 40rpx 30rpx 10rpx;
		}
	}

	.item {
		display: flex;
		align-items: center;
		// margin-bottom: 14rpx;
		padding: 10rpx 20rpx;

		image {
			height: 180rpx;
			width: 200rpx;
		}

		.right {
			height: 180rpx;
			box-sizing: border-box;
			padding: 42rpx 46rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: relative;
			background-color: #fff;
			flex: 1;

			.right_r {
				display: flex;
				flex-direction: column;

				text {
					color: #C4C4C4;
					font-size: 30rpx;

					&:first-child {
						font-size: 38rpx;
						margin-bottom: 10rpx;
					}
				}

			}

			image {
				width: 46rpx;
				height: 46rpx;
			}

			.rules {
				color: #C4C4C4;
				position: absolute;
				bottom: 20rpx;
				right: 24rpx;
				font-size: 30rpx;
			}
		}
	}
</style>
