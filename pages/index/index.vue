<template>
	<view class="content">
		<header>
			<view class="left" @click="goto('./latestNews')">
				<image src="/static/img/ling.png" mode="widthFix"></image>
				<view class="">
					訊息通知
				</view>
			</view>
			<view class="header_cen">
				<view class="article">
					<swiper vertical="true" :autoplay="true" :interval="3000" :duration="1000">
						<swiper-item v-for="(item,index) in articlelist" :key="index">
							<view style="text-align: center;">{{item.title}}</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
			<image class="right"  @click="scanCode()" src="../../static/img/sao.png" mode="widthFix"></image>
			
		</header>
		<view class="main">
			<view class="mian_top">
				<image src="/static/img/1741.png" mode="heightFix"></image>
				<navigator url="" @click="gotos(1)" class="real_time">即時配送</navigator>
				<navigator url="" @click="gotos(2)" class="appointment">預約配送</navigator>
			</view>
			<view class="vip">享有便利及更多會員回饋</view>
			<view class="kg">重量看得見．安全又美觀．樓層不加價</view>
			<view class="yq">餘氣可累積．預約抽紅包．下單賺代金</view>
		</view>

		<view class="banner">
			<swiper :indicator-dots="false" :autoplay="true" :circular="true" :interval="3000" :duration="1000">
				<swiper-item>
					<image src="/static/img/517.png" mode=""></image>
				</swiper-item>
				<!-- <swiper-item>
					<image src="/static/img/0.png" mode="" @click="openF"></image>
				</swiper-item> -->
			</swiper>

		</view>
		<view class="talk" v-if="false">
			<image src="../../static/img/1643.png" mode="widthFix"></image>
		</view>
		<view class="mask" v-if="mask">
			<view class="left">
				<view class="top">
					<image src="../../static/img/2073.png" mode="widthFix"></image>
					<text>A聯盟店 002</text>
				</view>
				<view class="bottom">
					訂單配送中............
				</view>
			</view>
			<view class="right">
				<text>30分鐘</text>
			</view>
		</view>
		<view class="mask2" v-if="mask2">
			<image src="../../static/close.png" mode="widthFix" @click="closeMask2()"></image>
			<view class="title">
				請問您對"A聯盟店 002"的定單體驗滿意嗎?
			</view>
			<uni-rate :size="40" v-model="value" :margin="20" @change="onChange" />
		</view>
		<TabBar tabIndex=0></TabBar>
		<uni-popup ref="popup" type="center">
			<view class="popupMain">
				<view class="closeP" @click="closeF">
					X
				</view>
				<image class="bgImgP" src="../../static/img/2.jpg" mode="widthFix"></image>
				<p class="ptitle">年費方案</p>
				<view class="vipMain">
					<p>VIP享優惠</p>
					<view class="vipList">
						<view class="vipItem">
							<p>每桶瓦斯</p>
							<p>立即回贈</p>
							<p><image src="../../static/img/548.png" mode="widthFix"></image>120枚</p>
						</view>
						<view class="vipItem">
							<p class="bigText">$599元/年</p>
							<p class="cenText">最低現賺</p>
							<p class="lastText">$1200元</p>
						</view>
					</view>
				</view>
				<p class="tip">瓦幣使用規則：可用於線下特約商店1：1抵扣使用</p>
				<!-- <p class="payTypeTip">選擇付款方式：<text @click="$refs.popup1.open()">{{payName}}</text></p> -->
				<button class="join" @click="joinVip()" v-if="!vip">立即加入</button>
				<button class="join yvip" v-else>您已是VIP會員</button>
			</view>
		</uni-popup>
		<uni-popup ref="popup1" type="center">
			<view class="popupMain1">
				<p class="ptitle">請選擇付款方式</p>
				<radio-group @change="radioChange" class="radiogroup">
					<label class="lable" v-for="(item, index) in paylist" :key="item.name">
						<radio :value="item.type" :checked="paytype==item.type"  />
						<view>{{item.name}}</view>
					</label>
				</radio-group>
				<view class="btn">
					<view class="btnItem" @click="$refs.popup1.close()">
						取消
					</view>
					<view class="btnItem" @click="joinVips()">
						確定
					</view>
				</view>
			</view>
		</uni-popup>
	</view>

</template>

<script>
	import TabBar from '../../components/jinjie-tabBar/jinjie-tabBar.vue'
	import {
		getHomeArticle,
		getUserInfo,
		getOrderConfig,
		gethoinConfig,
		memberAdd
	} from '../../api/index.js'
	export default {
		components: {
			TabBar
		},
		data() {
			return {
				title: 'Hello',
				articlelist: [],
				value: 0,
				mask: false,
				mask2: false,
				openCamerainfo:'',
				wa_coin:'',
				remnant:'',
				userOrderCount:'',
				mobile:'',
				paylist: [],
				email:'',
				paytype:'',
				payName:'',
				vip:''
			}
		},
		onLoad() {
			this.getHomeArticle()
		},
		onShow() {
			this.getOrderConfig()
			this.getUserInfo()
			
		},
		methods: {
			radioChange: function(evt) {
				this.paytype = evt.detail.value 
				this.paylist.forEach(item=>{
					if(item.type==this.paytype){
						this.payName = item.name
					}
				})
			},
			joinVip(){
				this.$refs.popup1.open()
			},
			joinVips(){
				if (!this.paytype) {
					return uni.showToast({
						title: '請選擇支付方式',
						icon: 'none'
					})
				}
				uni.showLoading({
					title:'加載中...'
				})
				let data = {
					gtpay_type:this.paytype
				}
				memberAdd(data).then(res=>{
					uni.hideLoading()
					if(this.paytype==9){
						uni.sendNativeEvent('openBrower', {
							linkUrl : res.data.pay_url
						})
					}else{
						uni.navigateTo({
							url:'../distribution/webView?url='+res.data.pay_url
						})
					}
					
				})
			},
			openF(){
				this.$refs.popup.open()
			},
			closeF(){
				this.$refs.popup.close()
			},
			getOrderConfig(){
				let data ={}
				this.user_type = uni.getStorageSync('user_type')
				getOrderConfig(data).then(res=>{
					this.userOrderCount = res.data.userOrderCount
				})
				gethoinConfig(data).then(res=>{
					this.paylist = res.data.gtpay_type
					// this.paytype = res.data.gtpay_type[0].type
					// this.payName = res.data.gtpay_type[0].name
				})
			},
			getUserInfo() {
				let data = {}
				getUserInfo(data).then(res => {
					this.wa_coin = res.data.wa_coin
					this.remnant = res.data.remnant
					this.makecode = res.data.makecode
					this.Invitation_link = res.data.Invitation_link
					this.mobile = res.data.mobile
					this.email = res.data.email
					this.vip = res.data.clean_time
					// 打开开通年费
					// if(!res.data.clean_time){
					// 	this.openF()
					// }
					uni.setStorageSync('user_type', res.data.user_type)
				})
			},
			scanCode() {
				// uni.showToast({
				// 	title:'暫未開放',
				// 	icon:'none'
				// })
				let that = this
				uni.sendNativeEvent('openCamera', {
					img: that.makecode,
					linkUrl : that.Invitation_link
				})
			},
			closeMask2() {
				this.mask2 = false
			},
			onChange(e) {
				console.log('rate发生改变:' + JSON.stringify(e))
			},
			goto(url) {
				uni.navigateTo({
					url: url
				})
			},
			gotos(type){
				// return uni.navigateTo({
				// 	url:'../distribution/webView?url='+'/hybrid/html/index.html&type='+type+'&order_id=1'
				// })
				// if(uni.getStorageSync('user_type')==2){
				// 	return uni.showToast({
				// 		title:'商業用戶，不可下單！',
				// 		icon:'none'
				// 	})
				// }
				if(!this.email){
					return uni.navigateTo({
						url:'bind?phone='+this.mobile
					})
				}
				if(type==1){
					if(this.userOrderCount==0){
						return uni.showToast({
							title:'新用戶首單必須是預約單！',
							icon:'none'
						})
					}
					let myDate = new Date();
					//获取当前小时数(0-23)
					if(myDate.getHours()<8 || myDate.getHours()>=21){
						return uni.showToast({
							title:'即時單配送時間為08：00~21：00~若已過營業時間，請改預約明日下單，謝謝',
							icon:'none'
						})
					}
					uni.navigateTo({
						url:'/pages/distribution/distribution?active='+type
					})
				}else{
					uni.navigateTo({
						url:'/pages/distribution/distribution?active='+type
					})
				}
				
			},
			getHomeArticle() {
				let data = {
					'token': ''
				}
				getHomeArticle(data).then(res => {
					this.articlelist = res.data
				})
			}
		}
	}
</script>

<style lang="less">
	.radiogroup{
		padding: 10rpx;
		width: 90%;
		min-height: 500rpx;
		max-height: 1000rpx;
		overflow: auto;
		background-color: #fff;
		.lable {
			display: flex;
			margin-bottom: 20rpx;
			box-shadow: 0 0 2rpx 4rpx rgba(0,0,0,0.07);
			border-radius: 20rpx;
			padding: 20rpx;
			align-items: center;
		}
		
	}
	.popupMain1{
		width: 640rpx;
		background-color: #fff;
		box-sizing: border-box;
		border-radius: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: column;
		position: relative;
		.ptitle{
			position: relative;
			top: 0;
			width: 100%;
			padding: 20rpx;
			text-align: center;
			box-sizing: border-box;
			box-shadow: 4rpx 0 4rpx 4rpx rgba(0, 0, 0, 0.07);
		}
		.btn{
			position: relative;
			bottom: 0;
			box-shadow: -4rpx 0 4rpx 4rpx rgba(0, 0, 0, 0.07);
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			.btnItem{
				flex: 1;
				text-align: center;
				padding: 20rpx;
				box-sizing: border-box;
				&:last-child{
					border-left: 1rpx solid #eee;
				}
			}
		}
	}
	.popupMain{
		width: 540rpx;
		height: 766rpx;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin-bottom: 100rpx;
		.closeP{
			position: absolute;
			top: 15rpx;
			right: 15rpx;
			width: 50rpx;
			height: 50rpx;
			color: #666;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #fff;
		}
		.bgImgP{
			position: absolute;
			z-index: -1;
			width: 100%;
			border-radius: 30rpx;
		}
		.ptitle{
			margin-top: 270rpx;
			font-size: 38rpx;
			margin-bottom: 10rpx;
			font-weight: 600;
			color: #fff;
		}
		.vipMain{
			background-color: #fff;
			width: 90%;
			border-radius: 30rpx;
			padding: 10rpx;
			box-sizing: border-box;
			>p{
				text-align: center;
				font-size: 30rpx;
				font-weight: 700;
				margin: 0rpx 0 10rpx;
			}
			.vipList{
				display: flex;
				justify-content: space-between;
				align-items: center;
				.vipItem{
					padding: 10rpx;
					width: 48%;
					box-sizing: border-box;
					background-color: #F2F2F2;
					border-radius: 30rpx;
					display: flex;
					justify-content: center;
					flex-direction: column;
					align-items: center;
					p{
						display: flex;
						align-items: center;
						font-weight: 600;
						font-size: 26rpx;
						color: #FF85B4;
						white-space: nowrap;
						&:last-child{
							margin-top: 10rpx;
							font-size: 36rpx;
							color: #FF9EC3;
						}
						&:first-child{
							margin-bottom: 10rpx;
							color: #000;
						}
					}
					.bigText{
						font-size: 36rpx;
						color: #FF85B4 !important;
					}
					.cenText{
						color: #000;
					}
					.lastText{
						font-size: 30rpx !important;
						color: #FF9EC3;
						text-decoration: underline;
					}
					image{
						width: 40rpx;
						height: 40rpx;
						background-color: #FF85B4;
						border-radius: 50%;
					}
				}
			}
		}
		.tip{
			width: 90%;
			text-align: center;
			font-size: 20rpx;
			color: #666;
			margin: 10rpx 0 0;
		}
		.payTypeTip{
			width: 90%;
			text-align: center;
			font-size: 26rpx;
			color: #333;
			margin: 20rpx 0 20rpx;
			text{
				background-color: rgba(255, 255, 255, 0.7);
				border-radius: 50rpx;
				padding: 4rpx 30rpx;
				color: #FF9EC3;
				text-decoration: underline;
			}
		}
		.join{
			height: 70rpx;
			width: 300rpx;
			margin-top: 40rpx;
			display: flex;
			font-size: 30rpx;
			justify-content: center;
			align-items: center;
			background-color: rgba(255, 255, 255, 0.7);
		}
		.yvip{
			background-color: rgba(240, 240, 240, 0.7);
			// color: #fff;
		}
	}
	.mask2 {
		padding: 30rpx 50rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: #fff;
		z-index: 1000;
		box-shadow: -4rpx 0rpx 4rpx 4rpx rgba(0, 0, 0, 0.07);
		box-sizing: border-box;

		image {
			width: 60rpx;
			height: 60rpx;
			position: absolute;
			right: 40rpx;
			top: 20rpx;
		}

		.title {
			padding-top: 40rpx;
		}

		.uni-rate {
			padding: 30rpx 0;
		}
	}

	.mask {
		padding: 30rpx 50rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: #fff;
		z-index: 1000;
		box-shadow: -4rpx 0rpx 4rpx 4rpx rgba(0, 0, 0, 0.07);
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;

		image {
			width: 22rpx;
			height: 22rpx;
		}

		.top {
			color: #FF85B4;
			font-weight: 500;
			margin-bottom: 6rpx;
		}

		.bottom {
			font-size: 30rpx;
		}

		.right {
			font-weight: 700;
		}
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 30rpx;
		color: #FF9EC3;
		padding: 20rpx;

		image {
			width: 30rpx;
			height: 30rpx;
		}

		.left {
			text-align: center;
		}

		.right {
			margin:0 20rpx;
			width: 50rpx;
			
		}

		.header_cen {
			display: flex;
			align-items: center;
			box-shadow: 0px 0rpx 10rpx 0rpx rgba(0, 0, 0, 0.1);
			font-size: 30rpx;
			color: #000;
			border-radius: 10rpx;
			margin: 0 20rpx;
			padding: 14rpx 28rpx;
			flex: 1;

			image {
				width: 40rpx;
				height: 40rpx;
				margin-right: 20rpx;
			}

			.article {
				flex: 1;

				swiper {
					height: 20px !important;
					line-height: 20px;
				}
			}
		}
	}

	.main {
		width: 100%;
		text-align: center;
		margin-top: 80rpx;

		image {
			width: 260rpx;
			height: 600rpx;
		}

		.mian_top {
			display: flex;
			flex-direction: column;
			align-items: center;
			position: relative;
			margin-bottom: 10rpx;

			navigator {
				background: #FF85B4;
				color: #fff;
				font-size: 40rpx;
				font-weight: 600;
				letter-spacing: 4rpx;
				border-radius: 80rpx;
				padding: 20rpx 150rpx;
				position: absolute;
			}

			.real_time {
				bottom: 170rpx;
			}

			.appointment {
				bottom: 50rpx;
			}
		}

		.vip {
			color: #FF85B4;
			font-size: 36rpx;
			font-weight: 600;
			letter-spacing: 10rpx;
			margin-bottom: 24rpx;
		}

		.kg {
			font-size: 30rpx;
			letter-spacing: 5rpx;
			margin-bottom: 18rpx;
		}

		.yq {
			font-size: 30rpx;
			letter-spacing: 5rpx;
		}
	}

	.banner {
		display: flex;
		justify-content: space-between;
		margin-top: 40rpx;

		swiper {
			width: 100%;
			padding: 30rpx;
			text-align: center;
			
			image {
				width: 90%;
				height: 180rpx;
				border-radius: 20rpx;
			}
		}

		.left {
			text-align: center;
			line-height: 210rpx;
			background-color: #FFEBF2;
			width: 160rpx;
			height: 160rpx;
			border-bottom-right-radius: 16rpx;
			border-top-right-radius: 16rpx;

			image {
				width: 100rpx;
				height: 100rpx;
			}
		}

		.right {
			border-top-left-radius: 16rpx;
			border-bottom-left-radius: 16rpx;
			overflow: hidden;

			image {
				height: 160rpx;
				width: 540rpx;
			}
		}
	}

	.talk {
		position: absolute;
		right: 50rpx;
		bottom: 300rpx;

		image {
			width: 120rpx;
			height: 120rpx;
		}
	}
</style>
