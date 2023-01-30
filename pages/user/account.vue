<template>
	<view class="account_body">
		<view class="item">
			<view class="lable">大頭貼</view>
			<image @click="uploadImageOne()" class="avatar"
				:src="userInfo.avatar?userInfo.avatar:'../../static/img/1612.png'" mode="widthFix"></image>
		</view>
		<view class="item">
			<view class="lable">使用者帳號</view>
			<input type="text" :value="userInfo.account_star" disabled="true" />
		</view>
		<view class="item">
			<view class="lable">姓名</view>
			<input type="text" v-model="userInfo.username" />
		</view>
		<view class="item">
			<view class="lable">性別</view>
			<picker :range="array" :value="userInfo.sex" @change="bindPickerChange">
				<view>{{array[userInfo.sex]}}</view>
			</picker>
		</view>
		<div class="item">
			<div class="lable">生日</div>
			<dyDatePicker @getData="getData" :childValue="userInfo.birthday" placeholder="請選擇日期" minSelect="1931/01/01"
				maxSelect="2025/12/31"></dyDatePicker>
		</div>
		<view class="item">
			<view class="lable">Email</view>
			<input type="text" :value="userInfo.email" :disabled="true"/>
		</view>
		<view class="item" @click="goto('../distribution/consignee?show=false')">
			<view class="lable">常用地址</view>
			<image src="../../static/img/1.png" mode="widthFix"></image>
		</view>
		<view class="item mag" @click="goto('./password')">
			<view class="lable">密碼變更</view>
			<image src="../../static/img/1.png" mode="widthFix"></image>
		</view>
		<!-- <view class="item" @click="noOpen()">
			<view class="lable">幫助中心</view>
			<image src="../../static/img/1.png" mode="widthFix"></image>
		</view> -->
		<view class="item mag" @click="cancelNo()">
			<view class="lable">註銷帳號</view>
			<image src="../../static/img/1.png" mode="widthFix"></image>
		</view>
		<view class="footer" @click="userSave()">
			<navigator url="">保存</navigator>
			<view class="tab-bar" v-show="showTabBar === true"></view>
		</view>
	</view>

</template>

<script>
	import dyDatePicker from '../../components/dy-Date/dy-Date.vue'
	import {
		uploadImage,
		userSave,
		getUserInfo,
		cancelNo
	} from '../../api/index.js'
	export default {
		components: {
			dyDatePicker
		},
		data() {
			return {
				array: ['男', '女'],
				userInfo: {
					username: '瓦客',
					sex: 0,
				},
				avatarf: '',
				showTabBar: false,
			};
		},
		onLoad() {
			this.getUserInfo()
			this.getSystemInfo()
			// this.avatarf = this.userInfo.avatar
		},
		// onBackPress(e) {
		// 	console.log(e,'12');
		// 	if(e.from == "backbutton"){
		// 		this.userSave()
		// 		// uni.navigateBack();
		// 		return true;
		// 	}
		// },
		// onBackPress(options) {
		// 	uni.showModal({
		// 		title: '提示',
		// 		content: '是否退出？',
		// 		success: function(res) {
		// 			if (res.confirm) {
		// 				// 退出当前应用，改方法只在App中生效  
		//				// plus.runtime.quit();
		// 			} else if (res.cancel) {
		// 				console.log('用户点击取消');
		// 			}
		// 		}
		// 	});
		// 	return true;
		// },
		methods: {
			cancelNo(){
				uni.navigateTo({
					url:'/pages/user/cancellation?wa_coin='+this.userInfo.wa_coin+'&remnant='+this.userInfo.remnant
				})
			},
			getUserInfo() {
				let data = {
					'token': ''
				}
				let that = this
				getUserInfo(data).then(res => {
					that.userInfo = res.data
				})
			},
			noOpen() {
				uni.showToast({
					title: '暫未開放'
				})
			},
			getData(date) {
				this.userInfo.birthday = date
				console.log(date);
			},
			getSystemInfo() {
				uni.getSystemInfo({
					success: (res) => {
						// X及以上的异形屏top为44，非异形屏为20
						if (res.safeArea.top >= 43) {
							this.showTabBar = true
						}
					}
				});
			},
			bindPickerChange: function(e) {
				this.userInfo.sex = e.target.value
			},
			goto(url) {
				uni.navigateTo({
					url: url
				})
			},
			userSave() {
				let that = this
				let data = {
					"username": this.userInfo.username,
					"avatar": this.avatarf,
					"sex": this.userInfo.sex,
					'birthday': this.userInfo.birthday

				}
				userSave(data).then(res1 => {
					uni.navigateBack({
						delta: 1,
					})
					// uni.showToast({
					// 	title: res1.msg,
					// 	icon: 'none',
					// })
				})
			},
			uploadImageOne() {
				let that = this
				uni.chooseImage({
					count: 1,
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
									sizeType: ['compressed'],
									filePath: res.tempFilePath,
									fileType: 'image',
									name: 'Filedata',
									header: {
										// #ifdef MP
										"Content-Type": "multipart/form-data",
										// #endif
										// [TOKENNAME]: 'Bearer ' + store.state.app.token
									},
									success(res1) {
										console.log(JSON.parse(res1.data));
										that.userInfo.avatar = JSON.parse(res1.data).data.newfilename
										that.avatarf = JSON.parse(res1.data).data.uploadPath
										uni.hideLoading();
									},
									fail: function(res) {
										uni.hideLoading();
										uni.showToast({
											title: '上傳圖片失敗',
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
			}
		}
	}
</script>

<style lang="less">
	.tab-bar {
		height: 30rpx;
		background-color: #FF9EC1;
	}

	.account_body {
		height: 100vh;
		background-color: #F8F8F8;
	}

	.footer {
		width: 100%;
		position: absolute;
		bottom: 0;

		navigator {
			text-align: center;
			padding: 20rpx;
			color: #fff;
			background-color: #FF9EC3;
		}
	}

	.item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx 60rpx;
		color: #6C6C6C;
		text-align: 24rpx;
		background-color: #fff;
		margin-bottom: 1px;

		input {
			text-align: right;
			flex: 1;
		}

		.avatar {
			width: 60rpx;
			height: 60rpx;
		}

		image {
			width: 18rpx;
			height: 18rpx;
		}
	}

	.mag {
		margin-top: 20rpx;
	}
</style>
