<template>
	<view class="page">
		<view class="info">
			<view class="title">
				瞭解刪除帳戶的影響
			</view>
			<view class="m20">
				刪除帳戶後，您將無法使用透過該帳戶登入的扛氣來服務，所有個人資料也將被刪除。
			</view>
			<view class="">
				1.帳號設定的個人資料刪除(例如：姓名、電子信箱、手機號等)。
			</view>
			<view class="">
				2.您將無法至特約商店，使用瓦幣折抵。
			</view>
			<view class="">
				3.無法使用餘氣來兌換瓦斯及兌換瓦幣。
			</view>
			<view class="">
				4.如有任何問題，歡迎來電詢問扛氣來客服專線: <text>03-853-5118</text>
			</view>
			<view class="m20">
				如欲重新申請帳戶，需重新驗證您的身份
			</view>
		</view>
		<view class="tip">
			提醒您
		</view>
		<view class="item border">
			<image src="../../static/img/wabi.png" mode=""></image>
			您尚有<text>{{Number(wa_coin)}}枚</text>的瓦幣。
		</view>
		<view class="item">
			<image src="../../static/img/2086.png" mode=""></image>
			您尚有<text>{{Number(remnant)}}kg</text>的餘氣。
		</view>
		<view class="form">
			<view class="m20">
				請問您刪除扛氣來APP帳號的原因：
			</view>
			<radio-group @change="radioChange">
				<label class="radio" v-for="(item, index) in items" :key="index">
					<view>
						<radio :value="item" :checked="index === current" />
					</view>
					<view>{{item}}</view>
				</label>
			</radio-group>
			<textarea v-if="current==4" v-model="content" maxlength="-1" placeholder="請輸入"></textarea>
			<view class="btn">
				<view class="btni" @click="cancel">
					取消
				</view>
				<view class="btni" @click="sub">
					傳送電子郵件
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		cancelNo
	} from '../../api/index.js'
	export default {
		onLoad(option) {
			this.remnant = option.remnant
			this.wa_coin = option.wa_coin
		},
		data() {
			return {
				remnant: 0,
				wa_coin: 0,
				current: -1,
				items: [
					'我無意間建立了另一個帳號',
					'我想要改用一般用戶',
					'我想要改用商業用戶',
					'APP操作不順暢',
					'其他'
				],
				value: '',
				content:''
			};
		},
		methods: {
			radioChange: function(evt) {
				this.value = evt.detail.value
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i] === evt.detail.value) {
						this.current = i;
						break;
					}
				}
				console.log(this.current);
			},
			cancel(){
				uni.navigateBack({
					delta:1
				})
			},
			sub(){
				let content = ''
				if(this.current>=4){
					if(this.content){
						content = this.content
					}else{
						return uni.showToast({
							title:'請輸入原因',
							icon:'none'
						})
					}
				}else if(this.current>=0){
					content = this.value
				}else{
					return uni.showToast({
						title:'請選擇原因',
						icon:'none'
					})
				}
				uni.showModal({
					title: '提示',
					content: '已收到您的註銷申請，\r\n後續客服人員將與您聯絡｡',
					success: function(res) {
						if (res.confirm) {
							uni.showLoading({
								title:'注銷中...'
							})
							cancelNo({content}).then(res=>{
								uni.hideLoading()
								uni.clearStorageSync();
								uni.sendNativeEvent('loginOut')
							}).catch(res=>{
								uni.hideLoading()
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}
			
		}
	}
</script>

<style lang="less">
	.page {
		background-color: #eee;
		min-height: 100vh;
	}

	.info {
		padding: 40rpx;
		background-color: #fff;

		.m20 {
			margin: 20rpx 0;
		}
	}

	.tip {
		padding: 20rpx;
		background-color: #eee;
		font-size: 32rpx;
		font-weight: 700;
	}

	.item {
		background-color: #fff;
		display: flex;
		align-items: center;
		padding: 20rpx 30rpx;

		image {
			width: 100rpx;
			height: 100rpx;
			margin-right: 30rpx;
		}

		text {
			color: #FF9EC3;
			font-weight: 700;
			margin: 0 10rpx;
		}
	}

	.border {
		border-bottom: 8rpx solid #eee;
	}

	.form {
		padding: 40rpx;

		.m20 {
			margin-bottom: 20rpx;
		}

		.radio {
			display: flex;
			margin-bottom: 10rpx;
		}
		.btn{
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 20rpx 0;
			.btni{
				width: 45%;
				background-color: #FF9EC3;
				color: #fff;
				padding: 14rpx 0;
				text-align: center;
				border-radius: 10rpx;
			}
		}
	}
	textarea{
		background-color: #fff;
		width: 100%;
		border: 1rpx solid #999;
		border-radius: 20rpx;
		height: 100px;
		padding: 10px;
		box-sizing: border-box;
	}
</style>
