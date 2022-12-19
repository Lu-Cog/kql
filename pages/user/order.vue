<template>
	<view>
		<view class="taber">
			<view :class="action==1?'active':''" @click="chageBar(1)">待收貨</view>
			<view :class="action==2?'active':''" @click="chageBar(2)">已完成</view>
			<view :class="action==3?'active':''" @click="chageBar(3)">已取消</view>
		</view>
		<view class="main">
			<view class="left" v-if="action==1">
				<view class="no" v-if="orderlist.length==0">
					<view class="no_center">
						暫無訂單
					</view>
				</view>
				<view v-else class="item" @click="goto(item.order_id,item.order_type)" v-for="(item,index) in orderlist"
					:key="index">
					<view class="top">
						預計送達時間：{{item.service_time}}
					</view>
					<view class="botton">
						訂單編號：{{item.order_no}}
					</view>
				</view>

			</view>
			<view class="right" v-else>
				<view class="search">
					<input type="text" placeholder="輸入訂單編號" />
					<image src="../../static/img/1942.png" mode="widthFix"></image>
				</view>
				<view class="no" v-if="orderlist.length==0">
					<view class="no_center">
						暫無訂單
					</view>
				</view>
				<view v-else class="item" @click="gotos(item.order_id)" v-for="(item,index) in orderlist"
					:key="index">
					<view class="item_l">
						<text>訂單編號：{{item.order_no}}</text>
						<text v-if="action==2">送達時間：{{item.service_time}}</text>
						<text>配送地址：{{item.address}}</text>
					</view>
					<view class="item_r">
						{{item.order_type==1?'即時':'預約'}}
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	import {
		orderList
	} from '@/api/index.js'
	export default {
		data() {
			return {
				action: 1,
				orderlist: []
			};
		},
		onShow() {
			this.getOrderList()
		},
		methods: {
			gotos(id){
				uni.navigateTo({
					url: '../user/orderDetails?order_id=' + id+'&type='+this.action
				})
			},
			goto(id, type) {
				if (type == 1) {
					uni.navigateTo({
						url: '../distribution/order?order_id=' + id
					})
				} else {
					uni.navigateTo({
						url: '../distribution/appointment?order_id=' + id
					})
				}

			},
			getOrderList() {
				let data = {
					'order_type': this.action,
					'page_index': 1,
					'page_size': 1000,
				}
				orderList(data).then(res => {
					this.orderlist = res.data ? res.data : []
				})
			},
			chageBar(num) {
				this.action = num
				this.getOrderList()
			}
		}
	}
</script>

<style lang="less">
	.taber {
		display: flex;
		justify-content: space-around;
		padding: 40rpx 140rpx;
		color: #505050;

		view {
			padding: 10rpx;
		}

		.active {
			color: #FF85B4;
			border-bottom: 2px solid #FF85B4;
		}
	}

	.main {
		.no {
			padding-top: 100rpx;
			text-align: center;
			color: #999999;
		}
		.left {
			

			.item {
				padding: 30rpx 60rpx;
				font-size: 30rpx;
				border-bottom: 2px solid #E5E5E5;

				.top {
					margin-bottom: 20rpx;
				}
			}
		}

		.right {
			.search {
				margin: 0 36rpx 20rpx;
				position: relative;

				input {
					padding: 16rpx 28rpx;
					border-radius: 20rpx;
					background-color: #F1F1F1;
				}

				image {
					position: absolute;
					bottom: 20rpx;
					right: 10rpx;
					width: 40rpx;
					height: 40rpx;
				}
			}

			.item {
				padding: 20rpx 50rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 2px solid #E5E5E5;

				.item_l {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					font-size: 30rpx;

					text {
						margin-bottom: 20rpx;
					}
				}

				.item_r {
					border-radius: 50%;
					width: 140rpx;
					height: 140rpx;
					background-color: #C0C0C0;
					text-align: center;
					line-height: 140rpx;
					color: #fff;
					font-size: 40rpx;
					font-weight: 600;
				}
			}
		}
	}
</style>
