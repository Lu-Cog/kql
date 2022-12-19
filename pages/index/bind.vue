<template>
	<view class="body">
		<view class="item">
			<text>Email*</text>
			<input type="text" v-model="accountName" placeholder="請輸入郵箱" />
		</view>
		<!-- <view class="item">
			<text>驗證碼*</text>
			<view class="yzm">
				<input type="text" v-model="code" placeholder="請輸入驗證碼" />
				<button type="default" @click="sendYzm" :disabled="disabled">{{text}}</button>
			</view>
		</view> -->
		<view class="item">
			<text>密碼*</text>
			<input type="password" v-model="password" placeholder="請輸入密碼" />
			<text class="tip">密碼需為8-20位，至少包含一個英文字母和數字</text>
		</view>
		<view class="item">
			<text>電話號碼</text>
			<input type="text" v-model="phone" placeholder="請輸入電話號碼" />
		</view>
		<view class="radioform">
			<view class="title">請選擇以下身份綁定</view>
			<radio-group @change="radioChange">
				<label class="radio">
					<radio value="1" checked="true" color='#FF9EC3' />一般用戶
				</label>
				<label class="radio">
					<radio value="2" color='#FF9EC3' />商業用戶
				</label>
			</radio-group>
		</view>
		<button class="btn" hover-class="none" type="default" @click="sub">確認綁定</button>
		<uni-popup ref="popup" :mask-click="false" background-color="#fff">
			<view class="popupView">
				<view class="title">
					{{title}}
				</view>
				<scroll-view scroll-y="true" @scrolltolower="scrolltolower">
					<view v-html="content"></view>
				</scroll-view>
				
				<checkbox-group @change="changeCheckBox">
					<label>
						<checkbox :checked="check" value="1" style="transform:scale(0.7)"/><text>我已閲讀並同意扛氣來的{{title}}</text>
					</label>
				</checkbox-group>
				<button @click="close" :class="{'check':check}">同意</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	let setTime = ''
	import {
		bind,
		sendCode,
		checkCode,
		articleDetailJ
	} from '@/api/index.js'
	export default {
		data() {
			return {
				userType: 1,
				accountName: '',
				password: '',
				phone: '',
				code: '',
				text: '發送驗證碼',
				disabled: false,
				content: '',
				title:'',
				check:false
			};
		},
		onLoad(option) {
			this.phone = option.phone || ''
			this.getarticleDetailJ()

		},
		methods: {
			scrolltolower(e){
				this.check = true
			},
			changeCheckBox(e){
				if(e.detail.value.length>0){
					this.check = true
				}else{
					this.check = false
				}
			},
			close() {
				if(!this.check) return
				this.$refs.popup.close()
			},
			getarticleDetailJ() {
				let that = this
				articleDetailJ(2).then(res => {
					that.content = res.data.content
					that.title = res.data.title
					this.$refs.popup.open('center')
				})
			},
			sendYzm() {
				let that = this
				if (!this.accountName) {
					return uni.showToast({
						title: '請輸入郵箱',
						icon: 'none'
					})
				}
				let data = {
					accountName: that.accountName,
					isVerUser: true,
					type: 4
				}
				uni.showLoading({
					title: '發送中...'
				})
				sendCode(data).then(res => {
					uni.hideLoading()
					uni.showToast({
						title: res.msg
					})
					let time = 60
					setTime = setInterval(() => {
						time--
						if (time <= 0) {
							clearInterval(setTime)
							that.disabled = false
							return that.text = '發送驗證碼'
						}
						that.disabled = true
						that.text = time + 's'
					}, 1000)
				})
			},
			radioChange: function(evt) {
				this.userType = evt.detail.value
			},
			sub() {
				if (!this.accountName) {
					return uni.showToast({
						title: '請輸入郵箱',
						icon: 'none'
					})
				}
				// if (!this.code) {
				// 	return uni.showToast({
				// 		title: '請輸入驗證碼',
				// 		icon: 'none'
				// 	})
				// }
				if (this.password.length < 8 || this.password.length > 20) {
					return uni.showToast({
						title: '請輸入正確的密碼',
						icon: 'none'
					})
				}
				let data = {
					accountName: this.accountName,
					password: this.password,
					phone: this.phone,
					userType: this.userType,
					type: 4,
					code: this.code
				}
				bind(data).then(res => {
					uni.setStorageSync('token', res.data.token);
					getApp().globalData.token = res.data.token
					uni.setStorageSync('user_type', res.data.user_type)
					uni.showToast({
						title: '綁定成功'
					})
					uni.sendNativeEvent('token', {
						token: res.data.token
					}, ret => {})
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						})
					}, 1000)
				})
			}
		}
	}
</script>

<style lang="less">
	.uni-popup__wrapper {
		width: 90%;
		height: 90vh;
		padding: 20rpx;
		border-radius: 20rpx;
		
		.popupView{
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}
		button{
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #999;
			color: #fff;
		}
		.check{
			background-color: #FF9EC3;
		}
		.title{
			text-align: center;
			margin: 20rpx 0;
		}
		scroll-view{
			height: 78%;
		}
		checkbox-group{
			margin: 10rpx 0 10rpx;
			text{
				color: #FF9EC3;
			}
		}
	}

	.checkbox {
		margin-top: 60rpx;

		label {
			display: flex;

			.tiaoyue {
				display: flex;

				navigator {
					color: #FF9EC3;
					text-decoration: underline;
				}
			}
		}
	}

	.body {
		padding: 60rpx 50rpx;
	}

	.item {
		font-size: 34rpx;
		margin-bottom: 40rpx;

		.tip {
			font-size: 28rpx;
			color: #FF9EC3;
		}

		>input {
			margin-top: 10rpx;
			width: 100%;
			height: 80rpx;
			font-size: 30rpx;
			padding-left: 20rpx;
			line-height: 80rpx;
			box-sizing: border-box;
			border: 1rpx solid #999;
			border-radius: 10rpx;
		}

		.yzm {
			display: flex;
			align-items: center;

			input {
				margin-top: 10rpx;
				flex: 1;
				margin-right: 40rpx;
				height: 80rpx;
				font-size: 30rpx;
				padding-left: 20rpx;
				line-height: 80rpx;
				box-sizing: border-box;
				border: 1rpx solid #999;
				border-radius: 10rpx;
			}

			button {
				width: 240rpx;
				text-align: center;
				height: 80rpx;
				font-size: 30rpx;
				line-height: 80rpx;
				box-sizing: border-box;
				border-radius: 10rpx;
			}
		}
	}

	.radioform {
		margin-top: 60rpx;
		font-size: 34rpx;

		.title {
			font-size: 38rpx;
		}

		radio-group {
			display: flex;
			flex-direction: column;

			label {
				margin: 30rpx 0 60rpx;
				position: relative;

				radio {
					margin-right: 20rpx;
				}

				&::before {
					content: '(目前僅限用複合式15kg瓦斯)';
					position: absolute;
					bottom: -40rpx;
					left: 70rpx;
				}

				&:last-child {
					&::before {
						content: '(目前僅限用複合式20kg瓦斯)';
						position: absolute;
						bottom: -40rpx;
						left: 70rpx;
					}
				}
			}
		}
	}

	.btn {
		margin: 40rpx auto 80rpx;
		background-color: #FF9EC3 !important;
		color: #fff !important;
		border: none;
		border-radius: 100rpx;
		height: 80rpx;
		line-height: 80rpx;
		width: 90%;
	}

	button::after {
		border: none;
	}
</style>
