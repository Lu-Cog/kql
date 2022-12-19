<template>
	<view class="body">
		<view class="info">
			<view class="phone">
				<view class="title">受贈郵箱帳號</view>
				<input type="text" v-model="phone" value="" placeholder="請輸入對方郵箱帳號" />
			</view>
			<view class="wabi">
				<view class="title">轉贈瓦幣</view>
				<input type="text" v-model="wacoin" value="" placeholder="請輸入瓦幣數" />
			</view>
		</view>
		<view class="careful">
			<view>註意事項：</view>
			<view>進行瓦幣轉贈者，請務必詳細閱讀並了解下述註意事項後，再進行瓦幣轉贈。</view>
			<view>進行瓦幣轉贈即視同願意接受並遵守以下條約即約定：</view>
			<view>1.瓦幣轉出及轉入對象，需為使用註冊帳號之扛氣來會員。</view>
			<view>2.請務必確認所輸入的資料之正確性，一經轉出即完成扣瓦幣轉贈，不得事後要求換、取消、退還轉出之瓦幣。</view>
			<view>3.轉出及轉入之瓦幣，僅限扛氣來APP消費使用，禁止轉售。</view>
		</view>
		<button type="default" hover-class="none" @click="toSuccess">確認</button>
	</view>
</template>

<script>
	import {getGiving} from '@/api/index.js'
	export default {
		data() {
			return {
				phone:'',
				wacoin:''
			};
		},
		onLoad() {
		},
		methods: {
			toSuccess() {
				let data = {
					'token': '8a6166bc9a13b3616c36125a806660ae',
					'wa_coin':this.wacoin,
					'phone' : this.phone
				}
				getGiving(data).then(res=>{
					setTimeout(()=>{
						uni.navigateTo({
							url: "/pages/user/user"
						})
					},1000)
					
				}).catch(res=>{
					uni.showToast({
						title:res,
						icon:'none'
					})
				})
				
			},
		}
	}
</script>

<style lang="less">
	.body {
		height: 100vh;
		background-color: #FF9EC3;
		padding: 36rpx 30rpx;

		.info {
			background-color: #fff;
			padding: 30rpx;
			border-radius: 20rpx;
			box-shadow: 0rpx 7rpx 10rpx 0rpx rgba(0, 0, 0, 0.2);

			.title {
				font-size: 32rpx;
				font-weight: 600;
			}

			input {
				margin: 10rpx 0 42rpx;
				padding: 14rpx 22rpx;
				font-size: 30rpx;
				border-bottom: 2rpx solid #D8D8D8;
			}
		}

		.careful {
			font-size: 30rpx;
			font-weight: 600;
			line-height: 50rpx;
			padding: 60rpx 20rpx;
		}

		button {
			background: #FF85B4;
			border-radius: 50rpx;
			border: none;
			outline: none;
			color: #fff;
			position: relative;
			bottom: -100rpx;
		}
	}
</style>
