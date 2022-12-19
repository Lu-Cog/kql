<template>
	<view class="rules_body">
		<view class="vip">
			<image src="../../static/img/vipy.png" mode="heightFix"></image>
			<view class="right">
				<view class="right_r">
					<text>折$10元</text>
					<text>有效期限：2021.06.30</text>
				</view>
			</view>
		</view>
		<view class="rules_list">
			<view class="item">
				<text>優惠內容</text>
				<text>折$10元</text>
			</view>
			<view class="item">
				<text>有效日期</text>
				<text>即日起~2021.06.30 23:59</text>
			</view>
			<view class="item">
				<text>使用規範</text>
				<text>1.凡使用"即時配送"訂購瓦斯即可立即折抵10元。</text>
				<text>2.無法與其他優惠或瓦幣並行使用</text>
			</view>
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
	.rules_list{
		padding: 60rpx;
		.item{
			display: flex;
			flex-direction: column;
			margin-bottom: 40rpx;
			text{
				color: #C4C4C4;
				font-size: 34rpx;
				margin-bottom: 10rpx;
				&:first-child{
					color: #000;
					font-size: 38rpx;
					font-weight: 700;
					
				}
			}
		}
	}
	
	.rules_body{
		border: 1px solid #F3F3F3;
		background-color: #F3F3F3;
		height: 100vh;
	}
	.vip {
		margin: 40rpx;
		display: flex;
		align-items: center;
		margin-bottom: 14rpx;

		image {
			height: 180rpx;
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
					color: #000;
					font-size: 30rpx;

					&:first-child {
						font-size: 38rpx;
						margin-bottom: 10rpx;
					}
				}

			}
		}
	}
</style>
