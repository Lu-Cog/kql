<template>
	<view>
		<view class="bg_img">
			<view class="info">
				<view class="info_item">
					訂單編號：{{orderInfo.order_no}}
				</view>
				<view class="info_item">
					下單時間：{{orderInfo.add_time}}
				</view>
				<view class="info_item">
					配送地址：{{orderInfo.address}}
				</view>
				<view class="info_item">
					收貨人：{{orderInfo.consignee}}
				</view>
				<view class="info_item">
					聯繫電話：{{orderInfo.consignee_phone}}
				</view>
				<view class="info_item">
					型號：{{orderInfo.gas_model}}
				</view>
				<view class="info_item">
					數量：{{orderInfo.pail_num}}
				</view>
				<view class="info_item">
					付款金額：{{orderInfo.pay_price}}
				</view>
				<view class="info_item">
					付款狀態：{{orderInfo.gtpay_status_str}}
				</view>
				<view class="info_item">
					付款方式：{{orderInfo.pay_type_str}}
				</view>
				<view class="info_item">
					留言：{{orderInfo.message||''}}
				</view>
				<view class="info_item">
					瓦斯行：{{orderInfo.store_name||''}}
				</view>
				<view class="info_item">
					送達時間：{{orderInfo.service_time||''}}
				</view>
				<view class="info_item">
					存餘氣：{{orderInfo.remnant||0}}公斤
				</view>
				<image :src="orderInfo.order_type==1?'../../static/img/1982.png':'../../static/img/2083.png'" mode="widthFix"></image>
			</view>
		</view>
		<view class="mask" v-if="maskShow">
			<view class="mask_f">
				<view class="mask_main">
					<view class="title">
						<view class="top">
							餘氣撲滿
						</view>
						<view class="time">
							{{orderInfo.service_time}}儲存餘氣
						</view>
						<view class="kg">
							{{Number(orderInfo.remnant)}}kg
						</view>
					</view>
					<view class="img">
						<image src="../../static/img/606.png" mode="widthFix" @click="goto()"></image>
					</view>
					<view class="imgb">
						<image src="../../static/img/1602(1).png" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<image src="../../static/img/cha.png" mode="widthFix" @click="changeMask()"></image>
		</view>
		<!-- <view v-if="orderInfo.red_packet_status==0" class="fab shake" @click="gotoRed(orderInfo.order_no)">
			<image src="../../static/img/2055.png" mode="widthFix"></image>
		</view> -->
	</view>
</template>

<script>
	import {
		orderInfo,
		getOrderConfig
	} from '../../api/index.js'
	export default {
		data() {
			return {
				order_id:'',
				orderInfo: {},
				maskShow:false,
				paytype:''
			};
		},
		onLoad(option) {
			this.order_id = option.order_id
			// if(option.type==2){
			// 	this.maskShow = true
			// }
		},
		onShow() {
			this.getOrderInfo()
		},
		methods:{
			goto(){
				uni.navigateTo({
					url:'/pages/residual/residual'
				})
			},
			gotoRed(order_no){
				uni.navigateTo({
					url:'/pages/user/redEnvelopes?order_no='+order_no
				})
			},
			getOrderInfo() {
				let data = {
					'order_id': this.order_id,
					'token': ''
				}
				orderInfo(data).then(res => {
					this.orderInfo = res.data
					getOrderConfig({}).then(res2 => {
						res2.data.gtpay_type.forEach(item=>{
							if(this.orderInfo.gtpay_type==item.type){
								this.paytype = item.name
							}
						})
					})
					if(this.orderInfo.remnant!=0){
						this.maskShow = true
					}
				})
			},
			changeMask(){
				this.maskShow = false
			}
		}
	}
</script>

<style lang="less">
	.mask{
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		display: flex;
		padding: 60rpx;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.4);
		>image{
			width: 60rpx;
			height: 60rpx;
		}
	}
	.mask_f{
		width: 100%;
		background-color: #fff;
		height: 90%;
	}
	.mask_main {
		background: url(../../static/img/2.png) no-repeat;
		background-size: 100% 100%;
		width: 100%;
		height: 100%;
		.title {
			text-align: center;
			padding-top: 100rpx;
		
			.top {
				font-size: 56rpx;
				color: #C4C4C4;
				margin-bottom: 10rpx;
			}
		
			.time {
				color: #C4C4C4;
			}
		
			.kg {
				font-size: 56rpx;
				color: #66A4B3;
				padding: 20rpx 0;
			}
		}
		
		.img {
			text-align: center;
			margin: 50rpx 0;
		
			image {
				width: 200rpx;
				height: 180rpx;
			}
		}
		
		.imgb {
			text-align: center;
		
			image {
				width: 480rpx;
				height: 280rpx;
			}
		}
	}
	
	.fab{
		position: fixed;
		bottom: 20%;
		right: 20rpx;
		image{
			width: 100rpx;
		}
	}
	@-webkit-keyframes shake {
		0% {
			-webkit-transform: rotate(2deg) translate3d(0, 0, 0)
		}
	
		50% {
			-webkit-transform: rotate(-2deg) translate3d(0, 0, 0)
		}
	
		100% {
			-webkit-transform: rotate(2deg) translate3d(0, 0, 0)
		}
	}
	
	@-moz-keyframes shake {
		0% {
			transform: rotate(2deg) translate3d(0, 0, 0)
		}
	
		50% {
			transform: rotate(-2deg) translate3d(0, 0, 0)
		}
	
		100% {
			transform: rotate(2deg) translate3d(0, 0, 0)
		}
	}
	
	@-ms-keyframes shake {
		0% {
			transform: rotate(2deg) translate3d(0, 0, 0)
		}
	
		50% {
			transform: rotate(-2deg) translate3d(0, 0, 0)
		}
	
		100% {
			transform: rotate(2deg) translate3d(0, 0, 0)
		}
	}
	.fab.shake {
		animation: shake .2s infinite linear;
		-webkit-animation: shake .2s infinite linear;
	}
	.bg_img {
		width: 100%;
		box-sizing: content-box;
		margin-top: -8rpx;
		background: url(../../static/img/38.png) no-repeat;
		background-size: 100% 100%;
		border-top: 1px solid #fff;
		border-bottom: 1px solid #fff;
		letter-spacing: 2px;

		.info {
			margin:80rpx 50rpx;
			padding: 48rpx 56rpx;
			background-color: #fff;
			position: relative;

			.info_item {
				margin-bottom: 30rpx;
			}

			image {
				position: absolute;
				width: 240rpx;
				height: 240rpx;
				right: 40rpx;
				bottom: 8rpx;
			}
		}
	}
</style>
