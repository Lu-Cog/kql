<template>
	<view>
		<view class="header">
			<view class="forecast">預計送達時間</view>
			<view class="time">
				{{orderInfo?orderInfo.service_time:'30分鐘'}}
			</view>
			<image src="/static/img/che.png" mode="widthFix"></image>
			<view class="tip">
				訂單處理中...如任何疑問請與客服中心尋求協助喔！
			</view>
		</view>
		<view class="phone">
			<image src="/static/img/1673.png" mode="widthFix"></image>
			<text>聯絡配送員：{{orderInfo.delivery_man}}</text>
			<image src="../../static/img/1742.png" mode="widthFix" @click="callPhone(orderInfo.delivery_phone)"></image>
		</view>
		<view class="info">
			<view class="title">
				訂單詳情
			</view>
			<view class="infoItem">
				<text>付款狀態：</text>
				<text>{{orderInfo.gtpay_status_str}}</text>
			</view>
			<view class="infoItem">
				<text>付款方式：</text>
				<text>{{orderInfo.pay_type_str}}</text>
				<!-- <text v-for="(item,index) in paylist" :key="item" v-if="orderInfo.gtpay_type==item.type">{{item.name}}</text> -->
			</view>
			<view class="infoItem">
				<text>配送來自：</text>
				<text>{{orderInfo.store_name||''}}</text>
			</view>
			<view class="infoItem">
				<text>你的訂單：</text>
				<text>{{orderInfo?orderInfo.order_no:''}}</text>
			</view>
			<view class="infoItem">
				<text>送達地址：</text>
				<text>{{orderInfo?orderInfo.address:''}}</text>
			</view>
			<view class="infoItem">
				<text>留&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;言：</text>
				<text>{{orderInfo?orderInfo.message:''}}</text>
			</view>
			<view class="money">
				<view class="moneyitem">
					<text>{{orderInfo.gas_model}}</text>
					<text>${{Number(orderInfo.gas_model_price)}}元</text>
				</view>
				<view class="moneyitem">
					<text>數量</text>
					<text>X {{Number(orderInfo.pail_num)}}</text>
				</view>
				<view class="moneyitem" v-if="Number(orderInfo.order_remnant)">
					<text>餘氣兌換（{{Number(orderInfo.order_remnant)}}kg）</text>
					<text>-${{Number(orderInfo.gas_model_price)*Number(orderInfo.pail_num)}}元 </text>
				</view>
				<view class="moneyitem" v-if="Number(orderInfo.wa_coin)">
					<text>瓦幣</text>
					<text>-${{Number(orderInfo.wa_coin)}}元 </text>
				</view>
				<view class="moneyitem" v-if="orderInfo.freight">
					<text>物流運費</text>
					<text>${{Number(orderInfo.freight)}}元</text>
				</view>
			</view>
			<view class="total">
				合計<text>${{Number(orderInfo.pay_price)}}元</text>
			</view>
			<view class="deposit">
				<text>壓桶押金({{orderInfo.gas_model}})X{{Number(orderInfo.pail_num)}}</text>
				<text>${{Number(orderInfo.pay_price)}}元</text>
			</view>
			<view class="collect">
				*配送員上門收現金
			</view>
			<view class="toindex">
				<view @click="gotoIndex()">回首頁</view>
			</view>
			<view class="toindex">
				<view @click="$refs.popup1.open()">取消訂單</view>
			</view>
		</view>
		<uni-popup ref="popup1" type="center">
			<view class="popupMain1">
				<p class="ptitle">您為何取消訂單?</p>
				<radio-group @change="radioChange" class="radiogroup">
					<label class="lable" v-for="(item, index) in cancelList" :key="item.type">
						<radio :value="item.type" :checked="cancelType==item.type" />
						<view>{{item.name}}</view>
					</label>
				</radio-group>
				<view class="btn">
					<view class="btnItem" @click="$refs.popup1.close()">
						取消
					</view>
					<view class="btnItem" @click="orderCancel()">
						確定
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		orderInfo,
		orderCancel,
		getOrderConfig
	} from '../../api/index.js'
	export default {
		data() {
			return {
				order_id: '',
				orderInfo: {
					service_time: ""
				},
				paylist:[],
				cancelList:[{name:'更改送貨地址',type:1},{name:'發票/統編/載具問題',type:2},{name:'更改付款方式',type:3},{name:' 其他/下錯單',type:4}],
				cancelType:0
			};
		},
		onLoad(option) {
			this.order_id = option.order_id
			this.getOrderInfo()
			this.getOrderConfig()
		},
		methods: {
			radioChange: function(evt) {
				this.cancelType = evt.detail.value 
			},
			getOrderConfig() {
				let data = {
			
				}
				getOrderConfig(data).then(res => {
					this.paylist = res.data.gtpay_type
				})
			},
			orderCancel(){
				if(!this.cancelType){
					return uni.showToast({
						title:'請選擇取消原因',
						icon:'none'
					})
				}
				let data = {
					cancelType:this.cancelType,
					order_no : this.orderInfo.order_no
				}
				orderCancel(data).then(res=>{
					setTimeout(function(){
						uni.reLaunch({
							url:'/pages/index/index'
						})
					},500)
				}).catch(res=>{
					uni.showToast({
						title:res,
						icon:'none'
					})
				})
			},
			gotoIndex(){
				uni.reLaunch({
					url:'/pages/index/index'
				})
			},
			getOrderInfo() {
				let data = {
					'order_id': this.order_id,
				}
				orderInfo(data).then(res => {
					this.orderInfo = res.data
				})
			},
			callPhone(phone) {
				uni.makePhoneCall({
					phoneNumber: phone 
				});
			}
		}
	}
</script>

<style lang="less">
	.radiogroup{
		padding: 10rpx;
		width: 90%;
		// min-height: 500rpx;
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
	.toindex{
		text-align: center;
		padding-top: 40rpx;
		view{
			background-color: #FF9EC3;
			display: inline-block;
			color: #fff;
			width: 80%;
			padding: 20rpx 0;
			border-radius: 20rpx;
		}
	}
	.header {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 34rpx 56rpx;

		.forecast {
			color: #505050;
			font-size: 32rpx;
			padding-bottom: 20rpx;
		}

		.time {
			font-size: 70rpx;
			font-weight: 700;
			padding-bottom: 60rpx;
		}

		.tip {
			color: #505050;
			font-size: 32rpx;
		}
	}

	.phone {
		display: flex;
		padding: 10rpx 20rpx;
		justify-content: space-between;
		align-items: center;
		box-shadow: 0 0 7rpx 8rpx rgba(0, 0, 0, .07);

		image {
			&:first-child {
				width: 150rpx;
				height: 120rpx;
			}

			&:last-child {
				width: 116rpx;
				height: 116rpx;
			}
		}
	}

	.info {
		padding: 60rpx;
		font-size: 32rpx;
		color: #505050;

		.title {
			font-weight: 700;
			margin-bottom: 20rpx;
		}

		.infoItem {
			margin-bottom: 20rpx;
		}

		.money {
			border-top: 1px solid #707070;
			border-bottom: 1px solid #707070;
			padding: 20rpx 0 0;

			.moneyitem {
				display: flex;
				margin-bottom: 20rpx;
				justify-content: space-between;
			}
		}

		.total {
			text-align: right;
			font-size: 36rpx;
			font-weight: 700;

			text {
				color: red;
			}
		}
		.deposit{
			display: flex;
			justify-content: space-between;
			color: red;
			font-size: 30rpx;
		}
		.collect{
			text-align: right;
			color: red;
			font-size: 30rpx;
		}
	}
</style>
