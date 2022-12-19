<template>
	<view>
		<view class="top_title">
			<text>完成轉贈</text>
		</view>
		<view class="wabi">
			<view class="img">
				<image src="../../static/img/548.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="num">
			<text>餘：{{wa_coin}}</text>
		</view>
	</view>
</template>

<script>
	import {getUserInfo} from '../../api/index.js'
	export default {
		data() {
			return {
				wacoin:0,
				wa_coin:0
			};
		},
		onLoad() {
			this.getUserInfo()
		},
		methods:{
			getUserInfo(){
				let data = {
					'token' : '8a6166bc9a13b3616c36125a806660ae'
				}
				let that = this
				getUserInfo(data).then(res=>{
					that.wa_coin = res.data.wa_coin
				})
			}
		}
	}
</script>

<style lang="less">
	.top_title {
		padding: 116rpx 0 74rpx;
		font-size: 70rpx;
		letter-spacing: 8rpx;
		font-weight: 600;
		text-align: center;
		color:  #FF9EC3;
	}

	.wabi {
		display: flex;
		justify-content: center;

		.img {
			width: 304rpx;
			height: 304rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 50%;
			background: #FF9EC3;
			box-shadow: 0rpx 7rpx 10rpx 0rpx rgba(0, 0, 0, 0.2);

			image {
				width: 290rpx;
				height: 290rpx;
			}
		}
	}

	.num {
		text-align: center;
		margin-top: 30rpx;
		color: #FF9EC3;
		font-size: 50rpx;
		font-weight: 600;
	}
</style>
