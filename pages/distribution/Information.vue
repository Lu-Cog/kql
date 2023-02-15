<template>
	<view>
		<view class="user_info">
			<view class="item" v-if="data.order_type==2">
				<text>預約時間</text>
				<text>{{data.pre_date+' '+data.pre_hour}}</text>
			</view>
			<view class="item">
				<text>收貨人</text>
				<text>{{data.name}}</text>
			</view>
			<view class="item">
				<text>收貨地址</text>
				<text>{{data.allAddress}}</text>
			</view>
			<view class="item">
				<text>聯繫電話</text>
				<text>{{data.telephone}}</text>
			</view>
			<view class="item">
				<text>型號</text>
				<text>{{data.gas.name+' ($'+Number(data.gas.price)+')'}}</text>
			</view>
			<view class="item" v-if="data.customer_name">
				<text>公司抬頭</text>
				<text>{{data.customer_name}}</text>
			</view>
			<view class="item" v-if="data.invoice_phone">
				<text>統一編號</text>
				<text>{{data.invoice_phone}}</text>
			</view>
			<view class="item" v-if="data.voucher_phone">
				<text>手機條碼載具</text>
				<text>{{data.voucher_phone}}</text>
			</view>
			<view class="item" v-if="data.voucher_user">
				<text>自然人憑證載具</text>
				<text>{{data.voucher_user}}</text>
			</view>
			<view class="item">
				<text>留言</text>
				<text>{{data.message}}</text>
			</view>
		</view>
		<!-- <view class="radioform">
			<view class="title">支付方式</view>
			<radio-group @change="radioChange">
				<label :class="{radio:payType==1}" >
					<radio value="1" checked="true" color='#ff87ad' /><text>現金支付</text>
				</label>
				<label :class="{radio:payType==2}">
					<radio value="2" color='#ff87ad' /><text>GTPay支付</text>
				</label>
			</radio-group>
		</view> -->
		<view class="coupon">
			<text v-if="false">優惠券　 （＄-10元 ）</text>
			<view>
				<text>{{data.gas.name}}</text><text>(＄{{Number(data.gas.price)}}元)</text>
			</view>
			<view>
				<text>數量</text><text>(X {{Number(data.pail_num)}})</text>
			</view>
			<view v-if="data.remnant==1">
				<text>餘氣兌換</text><text>(＄-{{Number(data.gas.price)*Number(data.pail_num)}}元)</text>
			</view>
			<view v-if="data.wa_coin==1">
				<text>瓦幣</text><text>(＄-{{Number(data.gas.price)*Number(data.pail_num)}}元)</text>
			</view>
			<view v-if="data.freight">
				<text>物流運費</text><text>(＄{{Number(data.freight)*Number(data.pail_num)}}元)</text>
			</view>
		</view>
		
		<view class="total">
			合計<text>${{money}}元</text>
		</view>
		<view class="deposit" v-if="goldData.y_pail_num">
			<text>{{goldData.y_title}}</text>
			<text>${{goldData.y_price}}元</text>
		</view>
		<view class="collect" v-if="goldData.y_pail_num">
			*配送員上門收現金
		</view>
		<view class="button">
			<button type="default" @click="goto()">確認訂單</button>
		</view>

	</view>
</template>

<script>
	import {
		orderInfo,
		orderCreate,
		gtpay,
		goldPressing
	} from "@/api/index.js"
	export default {
		data() {
			return {
				data: {
					gas:{
						price:0
					}
				},
				remnant: '',
				payType:1,
				money:'',
				goldData:{}
			};
		},
		onLoad(option) {
			this.data = JSON.parse(decodeURIComponent(option.data))
			console.log(this.data,'this.data');
			if(this.data.wa_coin==1 || this.data.remnant==1){
				this.money = Number(this.data.freight)*Number(this.data.pail_num)
			}else{
				this.money = Number(this.data.gas.price)*Number(this.data.pail_num)
			}
			// if(this.data.freight){
				
			// }else{
			// 	this.money = Number(this.data.gas.price)*Number(this.data.pail_num)
			// }
			if (uni.getStorageSync('user_type') == 1) {
				this.remnant = 15
			} else {
				this.remnant = 20
			}
			this.goldPressing()
		},
		
		methods: {
			goldPressing(){
				let data= {
					gas_id:this.data.gas.gas_id,
					pail_num : this.data.pail_num
				}
				goldPressing(data).then(res=>{
					this.goldData = res.data
				})
			},
			radioChange: function(evt) {
				this.payType = evt.detail.value
			},
			goto() {
				uni.showLoading({
					title:'加載中...'
				})
				orderCreate(this.data).then(res => {
					uni.hideLoading()
					if(this.data.gtpay_type==4 || this.money<=0){
						if (this.data.order_type == 1) {
							uni.reLaunch({
								url: '/pages/distribution/loading?order_id=' + res.data.order_id
							})
						} else {
							uni.reLaunch({
								url: '/pages/distribution/appointment?order_id=' + res.data.order_id
							})
						}
					}else{
						uni.showLoading({
							title:'加載中...'
						})
						gtpay({order_id:res.data.order_id}).then(res1=>{
							uni.hideLoading()
							if(this.data.gtpay_type==9){
								uni.sendNativeEvent('openBrower', {
									linkUrl : res1.data.pay_url
								})
							}else{
								uni.reLaunch({
									url:'./webView?url='+res1.data.pay_url+'&type='+this.data.order_type+'&order_id='+res.data.order_id
								})
							}
						})
					}
					
				}).catch(res => {
					uni.hideLoading()
					uni.showToast({
						title: res,
						icon: 'none'
					})
				})
				
			}
		}
	}
</script>

<style lang="less">
	.user_info {
		padding: 72rpx 42rpx 0;

		.item {
			text {
				color: #707070;
				font-size: 30rpx;
				margin-bottom: 30rpx;

				&:first-child {
					display: inline-block;
					color: #000;
					font-size: 36rpx;
					font-weight: 700;
					width: 26%;
				}
			}
		}
	}

	.coupon {
		margin: 0 40rpx;
		padding-bottom: 20rpx;
		border-bottom: 1px solid #000;
		color: #FF9EC3;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		box-sizing: border-box;

		view {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}

	.total {
		margin: 10rpx 40rpx 10rpx;
		text-align: right;
		font-weight: 700;

		text {
			color: red;
		}
	}
	.deposit{
		margin: 20rpx 40rpx;
		display: flex;
		justify-content: space-between;
		color: #FF9EC3;
		font-size: 30rpx;
	}
	.collect{
		margin: 10rpx 40rpx 10rpx;
		text-align: right;
		color: #FF9EC3;
		font-size: 30rpx;
	}
	.button {
		position: absolute;
		bottom: 30rpx;
		width: 100%;
		text-align: center;

		button {
			width: 90%;
			color: #fff;
			background-color: #FF85B4;
			border-radius: 80rpx;
		}
	}

	.radioform {
		padding: 2rpx 42rpx;
		margin: 0rpx 0 60rpx;
		font-size: 34rpx;

		.title {
			color: #000;
			font-size: 36rpx;
			font-weight: 700;
			width: 26%;
		}

		radio-group {
			display: flex;
			flex-direction: column;

			label {
				margin: 10rpx 0;
				padding: 20rpx;
				// background-color: #eee;
				box-shadow: 0 0 6rpx 2rpx rgba(0, 0, 0, .09);
				border-radius: 10rpx;
				position: relative;
				display: flex;
				justify-content: space-between;
				
				radio {
					margin-right: 20rpx;
				}
			}
			.radio{
				background-color: #FF9EC3;
				color: #fff;
			}
		}
	}
</style>
