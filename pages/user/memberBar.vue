<template>
	<view>
		<Header title="我的會員條碼" image='../../static/img/1565.png' @gotoF='scanCode()'></Header>
		<view class="main">
			<!-- <view class="title">
				推薦好友並註冊完成,即享好友每筆訂單的瓦幣贈送
			</view> -->
			<image :src="makecode" mode="widthFix"></image>
			<view class="botton">
				<image src="../../static/img/share.png" mode="widthFix" @click="share()"></image>
				<image src="../../static/img/copy.png" mode="widthFix" @click="copy()"></image>
				<image src="../../static/img/download.png" mode="widthFix" @click="download()"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import Header from '../../components/header/header.vue'
	import {
		getUserInfo
	} from '../../api/index.js'
	export default {
		components: {
			Header
		},
		data() {
			return {
				makecode: '',
				shareinfo: '',
				downloadinfo: '',
				openCamerainfo: '',
				Invitation_link:''
			};
		},
		onLoad(option) {
			this.makecode = option.makecode
			this.getUserInfo()
		},
		onShow() {
			uni.onNativeEventReceive((event, data) => {
				if (event == 'share') {
					this.shareinfo = data
				} else if (event == 'download') {
					this.downloadinfo = data
				} else if (event == 'scanResult') {
					this.openCamerainfo = data
				}
			})
		},
		methods: {
			copy() {
				let that = this
				uni.setClipboardData({
					data: that.Invitation_link,
					success() {
						uni.showToast({
							title: '複製成功',
							icon: 'none'
						})
					},
					fail() {
						uni.showToast({
							title: '複製失敗',
							icon: 'none'
						})
					}
				})

			},
			share() {
				uni.sendNativeEvent('share', {
					img: this.makecode,
					linkUrl : this.Invitation_link
				})
			},
			download() {
				uni.sendNativeEvent('download', {
					img: this.makecode
				})
			},
			scanCode() {
				let that = this
				uni.sendNativeEvent('openCamera', {
					img: that.makecode,
					linkUrl : that.Invitation_link
				})
			},
			getUserInfo() {
				let data = {
					'token': ''
				}
				let that = this
				getUserInfo(data).then(res => {
					that.makecode = res.data.makecode
					that.Invitation_link = res.data.Invitation_link
				})
			},
			/* 
			 保存到本地
			 @params url  网络图片
			 */
			saveImg(url) {
				const that = this;
				uni.downloadFile({
					url,
					success: res => {
						if (res.statusCode === 200) {
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success: function() {
									this.tools.toast('保存成功');
								},
								fail: function() {
									this.tools.toast('保存失败，请稍后重试');
								}
							});
						} else {
							this.tools.toast('下载失败');
						}
					}
				});
			}
		}
	}
</script>

<style lang="less">
	.main {
		padding: 160rpx 120rpx;
		display: flex;
		flex-direction: column;
		align-items: center;

		.title {
			text-align: center;
			color: #505050;
		}

		>image {
			margin: 60rpx 0;
			width: 460rpx;
			height: 460rpx;
		}

		.botton {
			display: flex;
			justify-content: space-around;
			width: 100%;

			image {
				width: 50rpx;
				height: 50rpx;

				&:nth-child(2) {
					width: 40rpx;
					width: 40rpx;
				}
			}
		}
	}
</style>
