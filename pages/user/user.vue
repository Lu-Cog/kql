<template>
	<view class="user">
		<view class="header">
			<view class="top"></view>
			<view class="head">
				<view class="headImg">
					<image v-if="userInfo.clean_time" src="../../static/vip.png" mode="widthFix" class="vip"></image>
					<image :src="userInfo.avatar?userInfo.avatar:'../../static/img/1612.png'" mode=""
						@click="uploadImageOne()"></image>
				</view>
				<view class="center" v-if="userInfo.userId">
					<view class="name">Hi，{{userInfo.username}}</view>
					<view class="vipDate" v-if="userInfo.clean_time">
						VIP到期日：{{userInfo.clean_time}}
					</view>
					<view class="img" v-if="userInfo.userId">
						<view class="item" @click="goto('./wacoin?wacoin='+Number(userInfo.wa_coin))">
							<image src="../../static/img/548.png" mode="widthFix"></image>
							<text>{{Number(userInfo.wa_coin)}}枚</text>
						</view>
						<view class="item" @click="goto('/pages/residual/residual')">
							<image src="../../static/img/1602(2).png" mode="widthFix"></image>
							<text>{{Number(userInfo.remnant)}}kg</text>
						</view>
					</view>
				</view>
				
			</view>
		</view>
		<view class="funlist">
			<view class="item" v-if="userInfo.makecode" @click="goto('./memberBar?makecode='+userInfo.makecode)">
				<image src="../../static/img/ma.png" mode=" "></image>
				<text>會員推薦碼</text>
				<image src="../../static/img/1.png" mode="widthFix"></image>
			</view>
			<view class="item" @click="goto('./order')">
				<image src="../../static/img/2053.png" mode=" "></image>
				<text>我的訂單</text>
				<image src="../../static/img/1.png" mode="widthFix"></image>
			</view>
			<view class="item" v-if="userInfo.makecode" @click="goto('./myMembers')">
				<image src="../../static/img/2049.png" mode=" "></image>
				<text>我的會員</text>
				<image src="../../static/img/1.png" mode="widthFix"></image>
			</view>
			<view class="item" @click="goto('./notice')">
				<image src="../../static/img/2052.png" mode=" "></image>
				<text>通知</text>
				<image src="../../static/img/1.png" mode="widthFix"></image>
			</view>
			<view class="item" v-if="false" @click="goto('',2)">
				<image src="../../static/img/1186.png" mode=" "></image>
				<text>收藏</text>
				<image src="../../static/img/1.png" mode="widthFix"></image>
			</view>
			<view class="item" v-if="false" @click="goto('../distribution/coupon',2)">
				<image src="../../static/img/2050.png" mode=" "></image>
				<text>優惠券</text>
				<image src="../../static/img/1.png" mode="widthFix"></image>
			</view>
			<view class="item set" @click="goto('./account')">
				<image src="../../static/img/1185.png" mode=" "></image>
				<text>帳號設定</text>
				<image src="../../static/img/1.png" mode="widthFix"></image>
			</view>
			<view class="item" @click="goto('./help')">
				<image src="../../static/img/2051.png" mode=" "></image>
				<text>幫助中心</text>
				<image src="../../static/img/1.png" mode="widthFix"></image>
			</view>
			<w-compress ref='wCompress' />
		</view>
		<view class="loginout" v-if="userInfo.userId" @click="loginOut()">
			登 出
		</view>
		<TabBar tabIndex=2></TabBar>
	</view>
</template>

<script>
	import WCompress from '@/components/w-compress/w-compress.vue'
	import TabBar from '../../components/jinjie-tabBar/jinjie-tabBar.vue'
	import {
		getUserInfo,
		userSave
	} from '../../api/index.js'
	export default {
		components: {
			TabBar,
			WCompress
		},
		data() {
			return {
				userInfo: {},
				avatarf: ''
			};
		},
		onLoad() {},
		onShow() {
			this.getUserInfo()
		},
		methods: {
			loginOut() {
				uni.showModal({
					title: '提示',
					content: '退出登錄？',
					success: function(res) {
						if (res.confirm) {
							uni.clearStorageSync();
							uni.sendNativeEvent('loginOut')
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			uploadImageOne() {
				let that = this
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					success(res) {
						uni.showLoading({
							title: '圖片壓縮中',
						});
						uni.compressImage({
							src: res.tempFilePaths[0],
							quality: 40,
							success: res => {
								uni.showLoading({
									title: '圖片上傳中',
								});
								uni.uploadFile({
									url: 'https://kql.iqweb.net/api/index/uploadImage_bd',
									// url: 'https://kql_dev.iqweb.net/api/index/uploadImage_bd',
									filePath: res.tempFilePath,
									name: 'Filedata',
									header: {
										// #ifdef MP
										"Content-Type": "multipart/form-data",
										// #endif
										// [TOKENNAME]: 'Bearer ' + store.state.app.token
									},
									success(res1) {
										uni.hideLoading();
										that.userInfo.avatar = JSON.parse(res1.data).data.newfilename
										let data = {
											"avatar": JSON.parse(res1.data).data.uploadPath
										}
										userSave(data).then(res2 => {
											uni.showToast({
												title: res2.msg,
												icon: 'none',
											})
										})
									},
									fail: function(res) {
										uni.hideLoading();
										uni.showToast({
											title: '圖片上傳失敗',
											icon: 'none',
										})
								
									}
								})
							},
							fail() {
								uni.hideLoading();
								uni.showToast({
									title: '圖片壓縮失敗',
									icon: 'none',
								})
							}
						})

					}
				})
			},
			
			goto(url, type) {
				if (type == 2) {
					uni.showToast({
						title: '暫未開發',
						icon: 'none'
					})
				} else {
					uni.navigateTo({
						url: url
					})
				}

			},
			getUserInfo() {
				let data = {
					'token': ''
				}
				let that = this
				getUserInfo(data).then(res => {
					that.userInfo = res.data
					uni.setStorageSync('user_type', res.data.user_type)
				})
			}
		}
	}
</script>

<style lang="less">
	.loginout {
		font-size: 30rpx;
		color: #fff;
		text-align: center;
		padding: 16rpx 20rpx;
		background-color: #FF85B4;
		border-radius: 10rpx;
		width: 80%;
		margin: 80rpx auto;
	}
	.user {
		height: 100vh;
		background-color: #F8F8F8;
	}

	.header {
		background-color: #FF9EC3;

		.top {
			height: var(--status-bar-height);
			width: 100%;
		}

		.head {
			padding: 60rpx 24rpx 30rpx;
			align-items: center;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			
			.headImg{
				position: relative;
				.vip{
					width: 60rpx;
					height: 60rpx;
					position: absolute;
					z-index: 100;
					top: -20rpx;
					left: -10rpx;
				}
			}
			image {
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
				flex-shrink: 0;
			}

			

			.center {
				flex: 1;
				color: #fff;
				padding: 0 0 0 20rpx;
				width: 50%;

				.name {
					width: 100%;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					font-size: 40rpx;
					margin-bottom: 12rpx;
				}
				.vipDate{
					font-size: 24rpx;
					margin: 10rpx 0;
				}
				
			}
			.img {
				font-size: 30rpx;
				display: flex;
				color: #fff;
				.item {
					margin-right: 20rpx;
					display: flex;
					align-items: center;
					
					image {
						margin-right: 4rpx;
					}
					text{
						white-space: nowrap;
					}
				}
				image {
					width: 50rpx;
					height: 50rpx;
					vertical-align: middle;
				}
			}
			
			
		}
	}

	.funlist {
		.item {
			background-color: #fff;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 30rpx;
			margin-bottom: 1px;

			image {
				width: 40rpx;
				height: 40rpx;

				&:last-child {
					width: 16rpx;
					height: 16rpx;
				}
			}

			text {
				flex: 1;
				padding-left: 16rpx;
				color: #6C6C6C;
				font-size: 34rpx;
			}

		}

		.set {
			margin-top: 20rpx;
		}
	}
</style>
