<template>
	<view class="pages">
		<view class="home">
			<image src="../../static/img/shop.png" mode="widthFix"></image>
			<view class="home_c">
				<view class="title">至以下特約店家消费，皆可使用瓦幣1：1折抵使用。</view>
				<view class="btn">
					<view class="btn_item" @click="joinTy">
						我也想加入特約店
					</view>
					<view class="btn_item" @click="lookMore">
						我要看更多店家資訊
					</view>
				</view>
			</view>
		</view>
		<view class="main">
			<view class="search">
				<input type="text" v-model="key" placeholder="輸入店家關鍵字搜索" @confirm='guestshops' confirm-type='done'>
				<image src="../../static/img/ss.png" mode="widthFix" @click="guestshops"></image>
			</view>
			<view class="no" v-if="list.length<=0">
				暫無店家
			</view>
			<view class="item" v-for='item in list' v-else>
				<view class="head">
					<view class="name">
						{{item.title}}
					</view>
					<view class="phone" @click="cell(item.phone)">
						{{item.phone}}
					</view>
				</view>
				<view class="address" @click="openAddress(item)">
					{{item.address}}
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import {
		guestshops
	} from '../../api/index.js'
	export default {
		onLoad() {
			this.guestshops()
		},
		data() {
			return {
				list: [],
				key: '',
			};
		},
		methods: {
			joinTy() {
				uni.navigateTo({
					url:'/pages/index/webviewTy'
				})
			},
			lookMore() {
				uni.sendNativeEvent('lookMore', ret => {})
			},
			cell(phone) {
				uni.makePhoneCall({
					phoneNumber: phone
				})
			},
			openAddress(item) {
				uni.sendNativeEvent('openMap', {
					latitude: item.lat,
					longitude: item.lon,
					name: item.title,
					address: item.address,
				})
				// uni.openLocation({
				// 	latitude: item.lat,
				// 	longitude: item.lon,
				// 	name:item.title,
				// 	address:item.address,
				// 	success: function () {
				// 		console.log('success');
				// 	}
				// });
			},
			guestshops() {
				uni.showLoading({
					title:'加載中...'
				})
				guestshops({
					keyword: this.key
				}).then(res => {
					uni.hideLoading()
					this.list = res.data
				})
			}
		}
	}
</script>

<style lang="less">
	.pages {
		background-color: #FF9EC3;
		min-height: 100vh;
	
	.home {
			width: 100%;
			position: relative;

			image {
				width: 100%;
				display: block;
			}

			.home_c {
				position: absolute;
				bottom: 50rpx;
				left: 90rpx;
				right: 90rpx;

				.title {
					padding: 30rpx;
				}

				.btn {
					display: flex;
					align-items: center;
					justify-content: space-between;

					.btn_item {
						border-radius: 60rpx;
						background-color: #FFE699;
						color: #D4410E;
						padding: 6rpx;
						width: 46%;
						font-size: 28rpx;
						text-align: center;
					}
				}
			}
		}

		.main {
			margin: 0 60rpx;
			background-color: #fff;
			min-height: 70vh;
			padding: 20rpx;
			.search{
				position: relative;
				border-radius: 20rpx;
				background-color: #eee;
				margin-bottom: 20rpx;
				image{
					position: absolute;
					right: 20rpx;
					top: 10%;
					width: 50rpx;
					height: 50rpx;
				}
			}
			input {
				padding: 0 20rpx;
				margin-right: 70rpx;
				height: 70rpx;
			}

			.item {
				border-bottom: 1px solid #FF9EC3;
				padding: 20rpx;

				.head {
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-weight: 700;
					font-size: 30rpx;
					margin-bottom: 10rpx;

					.phone {
						white-space: nowrap;
					}
				}

				.address {
					font-size: 28rpx;
				}
			}
			.no{
				margin-top: 200rpx;
				text-align: center;
				color: #999;
			}
		}
	}
</style>
