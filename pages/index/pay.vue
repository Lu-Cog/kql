<template>
	<view class="pay">
		<view class="paytitle">
			{{shop_name}}
		</view>
		<view class="payInput">
			${{money}}
		</view>
		<view class="numKey">
			<button class="keyItem" v-for="item in numList" :key="item" @click="clickNum(item)">
				{{item}}
			</button>
			<button class="keyItem" @click="clearNum()">
				清除
			</button>
			<button class="keyItem" @click="clickNum(0)">
				0
			</button>
			<button class="keyItem" @click="delNum()">
				←
			</button>
		</view>
		<view class="wabi">
			<text>您有{{wa_coin}}枚瓦幣，本次使用</text><input type="number" v-model="wbNum" @input="wbInput()"/>
		</view>
		<view class="payType">
			<text>付款方式</text>
			<picker mode="selector" :range="paylist" range-key='name' :value="index" @change='changePay'>
				<view>{{paylist[payindex].name}}
					<image src="../../static/img/xiala.png" mode="widthFix"></image>
				</view>
			</picker>
		</view>
		<view class="info">
			<p><span>小計</span><span>{{money}}元</span></p>
			<p><span>瓦幣折抵</span><span>-{{wbNum}}元</span></p>
			<p><span>合計金額</span><span>${{money-wbNum}}元</span></p>
		</view>
		<button class="submit" @click="submit">結帳</button>
		<p class='xieyi'>您下訂單的同時，即自動同意</p>
	</view>
</template>

<script>
	import {
		getOrderConfig,
		getUserInfo,
		hoinPay,
	} from '@/api/index.js'
	export default {
		data() {
			return {
				wa_coin:0,
				wbNum:0,
				money:0,
				numList:[1,2,3,4,5,6,7,8,9],
				paylist:[],
				payindex:0,
				shop_id:'',
				shop_name:'',
			};
		},
		onLoad(option) {
			this.shop_id = option.shop_id || 0
			this.shop_name = option.shop_name || ''
			this.getOrderConfig()
			this.getUserInfo()
		},
		methods:{
			submit(){
				if(!this.money){
					return uni.showToast({
						title:'請輸入金額',
						icon:'none'
					})
				}
				uni.showLoading({
					title:'加載中...'
				})
				let data = {
					amount:this.money,
					wa_coin:this.wbNum,
					shop_id:this.shop_id,
					shop_name:this.shop_name,
					gtpay_type:this.paylist[this.payindex].type
				}
				hoinPay(data).then(res=>{
					uni.hideLoading()
					uni.reLaunch({
						url:'../distribution/webView?url='+res.data.pay_url
					})
				})
			},
			clearNum(num){
				this.money = 0
			},
			clickNum(num){
				if(this.money){
					this.money = this.money+''+num
				}else{
					this.money = num
				}
			},
			wbInput(){
				if(this.wbNum>=this.wa_coin){
					this.wbNum = this.wa_coin
				}else if(this.wbNum<=0){
					this.wbNum = 0
				}
				
			},
			delNum(){
				if(this.money){
					this.money=this.money.substring(0,this.money.length-1);
					if(!this.money){
						this.money = 0
					}
				}else{
					this.money = 0
				}
			},
			getOrderConfig() {
				getOrderConfig({}).then(res => {
					this.paylist = res.data.gtpay_type
				})
			},
			getUserInfo() {
				let data = {}
				getUserInfo(data).then(res => {
					this.wa_coin = parseInt(res.data.wa_coin)
				})
			},
			changePay(e) {
				this.payindex = e.target.value
			},
		}
	}
</script>

<style lang="less">
.pay{
	min-height: 100vh;
	background: linear-gradient(#99BAA4,#779D6E);
	display: flex;
	align-items: center;
	flex-direction: column;
	padding-top: 20rpx;
	.paytitle{
		background-color: #FEC104;
		text-align: center;
		padding: 20rpx;
		width: 80%;
		font-weight: 700;
		border-radius: 10rpx;
		margin-bottom: 20rpx;
	}
	.payInput{
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		background-color: #fff;
		border: 4rpx #AC8D21 solid;
		width: 80%;
		color: #AC8D21;
		font-size: 48rpx;
		font-weight: 700;
		vertical-align: middle;
		border-radius: 10rpx;
		padding:0 10rpx;
		height: 90rpx;
		margin-bottom: 20rpx;
	}
	.numKey{
		width: 80%;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		.keyItem{
			margin-bottom: 20rpx;
			width: 30%;
			// background-color: #fff;
			border-radius: 10rpx;
			box-shadow: 0 0 8rpx #88ACCD;
			height: 100rpx;
			font-size: 48rpx;
			color: #88ACCD;
			font-weight: 700;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
	.wabi{
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 80%;
		text{
			color:#FF9EC3;
			background-color: #F6EAB8;
			border: 1px solid #FF9EC3;
			border-radius: 10rpx;
			height: 60rpx;
			padding: 0 10rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		input{
			background-color: #fff;
			width: 100rpx;
			height: 60rpx;
			border-radius: 10rpx;
			margin: 0 10rpx;
			text-align: right;
			padding: 0 10rpx;
		}
		button{
			height: 60rpx;
			background-color: #FFBA04;
			color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 0;
		}
	}
	.payType{
		margin-top: 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 80%;
		text{
			color:#FF9EC3;
			background-color: #F6EAB8;
			border: 1px solid #FF9EC3;
			border-radius: 10rpx;
			height: 60rpx;
			padding: 0 10rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-right: 20rpx;
		}
		>picker {
			width: 60%;
			box-sizing: border-box;
			border: 1px solid #A3A3A3;
			padding: 20rpx 38rpx;
			border-radius: 15rpx;
			display: inline-block;
			background-color: #fff;
		
			view {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
			image {
				margin-left: 10rpx;
				width: 40rpx;
				height: 40rpx;
				vertical-align: middle;
			}
		}
	}
	.info{
		width: 70%;
		margin-top: 40rpx;
		p{
			margin-bottom: 10rpx;
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			&:last-child{
				font-size: 40rpx;
				font-weight: 700;
				color: #FFBA04;
			}
		}
	}
	.submit{
		margin-top: 30rpx;
		width: 200rpx;
		height: 70rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #FFB535;
	}
	.xieyi{
		margin-top: 50rpx;
		font-size: 30rpx;
		color: #333;
	}
}
</style>
