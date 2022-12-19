<template>
	<view class="password">
		<view class="title">
			為了您帳號的安全，建議您為您的帳號設定一組新密碼
		</view>
		<view class="new">
			<view class="top">
				原密碼
			</view>
			<input type="text" v-model="pwd" :password="showPwd" />
			<image :src="showPwd?'../../static/img/yj.png':'../../static/img/yjf.png'" mode="widthFix"
				@click="changeShowPwd(1)"></image>
			<view class="tip">
			</view>
		</view>
		<view class="new">
			<view class="top">
				新密碼
			</view>
			<input type="text" v-model="pwd1"  :password="showPwd2"/>
			<image :src="showPwd2?'../../static/img/yj.png':'../../static/img/yjf.png'" mode="widthFix"
				@click="changeShowPwd(2)"></image>
			<view class="tip">
				密碼需為8-20位，至少包含一個英文字母和數字
			</view>
		</view>
		<view class="new">
			<view class="top">
				確認密碼
			</view>
			<input type="text" v-model="pwd2" :password="showPwd3" />
			<image :src="showPwd3?'../../static/img/yj.png':'../../static/img/yjf.png'" mode="widthFix"
				@click="changeShowPwd(3)"></image>
			<view class="tip" v-show="tipShow">
				兩次密碼不一致
			</view>
		</view>
		<view class="footer">
			<navigator url="" @click="goPre()">儲存</navigator>
			<view class="tab-bar" v-show="showTabBar === true"></view>
		</view>
	</view>
</template>

<script>
	import { updatePwd } from '@/api/index.js'
	export default {
		data() {
			return {
				showTabBar: false,
				pwd: '',
				pwd1: '',
				pwd2: '',
				tipShow: false,
				showPwd: true,
				showPwd2: true,
				showPwd3: true
			};
		},
		onLoad() {
			this.getSystemInfo()
		},
		watch: {
			pwd2(val) {
				this.tipShow = false
			}
		},
		methods: {
			changeShowPwd(type) {
				switch (type) {
					case 1:
						this.showPwd = !this.showPwd
						break;
					case 2:
						this.showPwd2 = !this.showPwd2
						break;
					case 3:
						this.showPwd3 = !this.showPwd3
						break;
					default:
						break;
				}
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
			goPre() {
				if(this.pwd==''){
					return uni.showToast({
						title:'請輸入原密碼',
						icon:'none'
					})
				}
				if(this.pwd1==''){
					return uni.showToast({
						title:'請輸入新密碼',
						icon:'none'
					})
				}
				if(this.pwd2==''){
					return uni.showToast({
						title:'請輸入確認密碼',
						icon:'none'
					})
				}
				if(this.pwd1 != this.pwd2){
					return uni.showToast({
						title:'兩次輸入的密碼不一致',
						icon:'none'
					})
				}
				let data = {
					original_password : this.pwd,
					new_password : this.pwd2
				}
				updatePwd(data).then(res=>{
					uni.showToast({
						title:res.msg+',請重新登錄',
						icon:'none'
					})
					setTimeout(function(){
						uni.sendNativeEvent('loginOut')
					},500)
				}).catch(res=>{
					uni.showToast({
						title:res,
						icon:'none'
					})
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

	.footer {
		width: 100%;
		position: absolute;
		bottom: 0;
		left: 0;

		navigator {
			text-align: center;
			padding: 20rpx;
			color: #fff;
			background-color: #FF9EC3;
		}
	}

	.password {
		padding: 100rpx 40rpx;
		font-size: 30rpx;
		color: #505050;

		.title {
			padding-left: 20rpx;
		}

		.new {
			position: relative;
			image{
				position: absolute;
				z-index: 1000;
				width: 50rpx;
				height: 20rpx;
				right: 10rpx;
				top: 80rpx;
			}
			.top {
				padding-left: 20rpx;
			}

			padding-top: 26rpx;

			input {
				border: 1px solid #999;
				padding: 14rpx;
				border-radius: 20rpx;
				margin: 6rpx 0;
			}

			.tip {
				padding-left: 20rpx;
				color: #FF85B4;
				font-size: 30rpx;
			}
		}
	}
</style>
