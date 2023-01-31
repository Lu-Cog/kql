<template>
	<view class="body" :style="bodyBj?'background-color: #FFD2E3':'background-color: #F3F3F3;'">
		<view class="header">
			<text :class="active==1?'active':''" @click="changetab(1)">
				即時配送
			</text>
			<text :class="active==2?'active':''" @click="changetab(2)">
				預約配送
			</text>
		</view>
		<view class="exchange" v-if="!bodyBj">
			<navigator :class="pull?'ture':''" @click="yuqi()">
				餘氣兌換
			</navigator>
		</view>

		<view class="consulting">
			<view class="title">
				輸入訂單資訊
			</view>

			<view class="time" v-if="active==2" @click="goto('/pages/distribution/time?bodyBj='+ bodyBj)">
				<view class="head">
					預約時間
				</view>
				<view class="stime">
					<text v-if="(!date)&&(!time)">選擇時間</text>
					<text>{{date}}</text>
					<text>{{time}}</text>
					<image src="../../static/img/1.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="contacts">
				<checkbox-group @change="checkbox">
					<label>
						<checkbox style="transform:scale(0.7)" value="1" />儲存以下收貨人資訊或者
					</label>
				</checkbox-group>
				<navigator url="" @click="goto('/pages/distribution/consignee?active='+active+'&bodyBj='+ bodyBj)">
					選擇常用收貨人資訊</navigator>
			</view>
			<view class="wuliu" v-if="bodyBj">
				<text>※本次消費僅收取物流費{{Number(freight)*num}}元</text>
			</view>
			<view class="consignee item">
				<view class="head">
					收貨人
				</view>
				<input type="text" value="" v-model="name" placeholder="請輸入收貨人姓名" />
			</view>
			<view class="address item">
				<view class="head">
					收貨地址
				</view>
				<view class="city">
					<picker mode="selector" :range="arealist" range-key='name' :value="index"
						@change='changeCity'>
						<view>{{city?city:arealist.length!=0?arealist[index].name:'市'}}
							<image src="../../static/img/xiala.png" mode="widthFix"></image>
						</view>
					</picker>
					<picker mode="selector" :range="itemslist" range-key="name" :value="index1"
						@change="changeCountry">
						<view>{{country?country:itemslist.length!=0?itemslist[index1].name:'區'}}
							<image src="../../static/img/xiala.png" mode="widthFix"></image>
						</view>
					</picker>
				</view>

				<input type="text" v-model="address" value="" placeholder="詳細地址(里道路/街/巷弄號)" />
			</view>
			<view class="phone item">
				<view class="head">
					聯繫電話
				</view>
				<input type="text" v-model="telephone" value="" placeholder="請輸入手機號碼" />
			</view>
			<view class="model item">
				<view class="head">
					型號
				</view>
				<picker mode="selector" :range="gas" range-key='name' :value="index2"
					@change='changeGas'>
					<view>{{gasName+' ($'+Number(gasPrice)+')'}}
						<image src="../../static/img/xiala.png" mode="widthFix"></image>
					</view>
				</picker>
				<!-- <input type="text" disabled="true" :placeholder="gas.name+' ($'+Number(gas.price)+')'" /> -->
			</view>
			<view class="number item">
				<view class="head">
					數量
				</view>
				<view class="num">
					<text class="add" :class="{'hs':num==1}" @click="sub">-</text>
					<text>{{num}}</text>
					<!-- :class="{'hs':num==pail_num}" -->
					<text class="add" :class="{'hs':num==pail_num}" @click="add">+</text>
				</view>
			</view>
			<view class="model item">
				<view class="head">
					公司抬頭
				</view>
				<input type="text" v-model="customer_name" placeholder="請輸入公司抬頭" />
			</view>
			<view class="model item">
				<view class="head">
					統一編號
				</view>
				<input type="text" v-model="invoice_phone" placeholder="請輸入統一編號" />
			</view>
			<view class="model item">
				<view class="head">
					手機條碼載具
				</view>
				<input type="text" v-model="voucher_phone" placeholder="請輸入手機條碼載具" />
			</view>
			<view class="model item">
				<view class="head">
					自然人憑證載具
				</view>
				<input type="text" v-model="voucher_user" placeholder="請輸入自然人憑證載具" />
			</view>
			<view class="model item pir">
				<view class="head">
					付款方式
				</view>
				<!-- <picker mode="selector" :range="paylist" range-key='name' :value="index" @change='changePay'>
					<view>{{paylist[payindex].name}}
						<image src="../../static/img/xiala.png" mode="widthFix"></image>
					</view>
				</picker> -->
				<radio-group @change="radioChange" class="radiogroup">
					<label class="lable" v-for="(item,index) in paylist" :key="item.name">
						<radio :value="item.type" />
						<view>{{item.name}}</view>
					</label>
				</radio-group>
			</view>
			<view class="message item">
				<view class="head">
					留言給配送員
				</view>
				<textarea v-model="message"  placeholder="告知配送員您的需求或者注意事項" />
			</view>
		</view>
		<view class="coupon" v-if="false">
			<view class="coupon_na" @click="goto('/pages/distribution/coupon',1)">
				<image src="/static/img/1554.png" mode="widthFix"></image>
				<text>優惠券</text>
				<view class="right">
					<text>選擇優惠券或輸入優惠碼</text>
					<image src="../../static/img/you.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<view class="tile" v-if="!bodyBj && wa_coin_config==1">
			<view class="img">
				<image src="/static/img/1687.png" mode="widthFix"></image>
			</view>
			<text>瓦幣</text>
			<view class="right">
				<text>{{check?"［-$"+Number(gasPrice)*num+"］":''}}</text>
				<image @click="checkend()" :src="check?'../../static/img/-1655.png':'../../static/img/1655.png'"
					mode="widthFix"></image>
			</view>
		</view>
		<view class="button">
			<button type="default" @click="subOrder()">發送</button>
		</view>

	</view>
</template>

<script>
	import hTimeAlert from "@/components/h-time-alert/h-time-alert";
	import {
		areaList,
		getUserInfo,
		getDefaultAddress,
		addressAddInfo,
		getOrderConfig
	} from '@/api/index.js'
	export default {
		components: {
			hTimeAlert,
		},
		onLoad(option) {
			this.address_id = getApp().globalData.address_id
			this.getUserInfo()
			this.date = getApp().globalData.date
			this.time = getApp().globalData.time
			this.active = option.active ? option.active : 1
			this.getAreaList()
			this.bodyBj = option.bodyBj == 'true' ? true : false
		},
		onShow() {
			this.getDefaultAddress()
			this.getOrderConfig()
		},
		data() {
			return {
				current: 0,
				payindex: 0,
				bodyBj: false,
				user_type: 1,
				pull: false,
				active: 1,
				date: '',
				time: '',
				name: '',
				address_id: '', //地址id
				telephone: '', //電話號碼
				address: '', //詳細地址
				city_id: '', //市id
				country_id: '', //縣id
				message: '', //留言
				invoice_phone: '',
				customer_name: '',
				voucher_phone: '',
				voucher_user: '',
				wa_coin: 0,
				keep_address: 0,
				check: false,
				arealist: [],
				index: 0,
				index1: 0,
				index2:0,
				itemslist: [],
				city_id: '',
				country_id: '',
				city: '',
				country: '',
				gas: [],
				remnant: '',
				freight: '',
				userOrderCount: '',
				num: 1,
				pail_num: 1,
				paylist: [],
				paytype:'',
				gasName:'',
				gasPrice:'',
				wa_coin_config: 0
			};
		},
		methods: {
			radioChange: function(evt) {
				this.paytype = evt.detail.value 
			},
			getUserInfo() {
				let data = {}
				getUserInfo(data).then(res => {
					this.wa_coin = res.data.wa_coin
					this.remnant = res.data.remnant
					if (uni.getStorageSync('user_type') == 1) {
						if (this.remnant >= 15) {
							this.pull = true
						}
					} else {
						if (this.remnant >= 20) {
							this.pull = true
						}
					}
					this.pail_num = res.data.pail_num
				})
			},
			add() {
				
				if (this.pail_num > this.num) {
					this.num++
				}
			},
			sub() {
				if (this.num > 1) {
					this.num--
				}
			},
			yuqi() {
				if (uni.getStorageSync('user_type') == 1) {
					if (this.remnant >= 15) {
						this.bodyBj = !this.bodyBj
						this.check = false
						this.getOrderConfig()
					} else {
						uni.showToast({
							title: '餘氣不足',
							icon: 'none'
						})
					}
				} else {
					if (this.remnant >= 20) {
						this.bodyBj = !this.bodyBj
						this.check = false
						this.getOrderConfig()
					} else {
						uni.showToast({
							title: '餘氣不足',
							icon: 'none'
						})
					}
				}

			},
			getOrderConfig() {
				this.gas = []
				let data = {

				}
				this.user_type = uni.getStorageSync('user_type')
				getOrderConfig(data).then(res => {
					if (this.bodyBj) {
						this.freight = res.data.remnant_freight
					}
					if (this.check) {
						this.freight = res.data.freight
					}
					// this.freight = res.data.freight
					this.userOrderCount = res.data.userOrderCount
					if (this.user_type == 1) {
						this.gas.push(res.data.gas_one)
					} else if (this.user_type == 2) {
						this.gas.push(res.data.gas_one)
						this.gas.push(res.data.gas_two)
					}
					this.gasName = this.gas[this.index2].name
					this.gasPrice = this.gas[this.index2].price
					this.paylist = res.data.gtpay_type
					this.wa_coin_config = res.data.wa_coin_config
				})
			},
			getDefaultAddress() {
				let data = {}
				getDefaultAddress(data).then(res => {
					if (!res.data) return
					this.address = res.data.address
					this.city = res.data.city
					this.name = res.data.name
					this.telephone = res.data.telephone
					this.country = res.data.country
					this.address_id = res.data.id
				})
			},
			checkbox(e) {
				this.keep_address = e.detail.value[0] ? e.detail.value[0] : 0
			},
			changePay(e) {
				this.payindex = e.target.value
			},
			changeCountry(e) {
				console.log(e.target.value);
				this.country = ''
				this.index1 = e.target.value
				this.country_id = this.itemslist[e.target.value].id
			},
			changeCity(e) {
				this.city = ''
				this.index = e.target.value
				this.itemslist = this.arealist[this.index].items
				this.city_id = this.arealist[this.index].id
				this.index1 = 0
				this.country_id = this.itemslist[this.index1].id
			},
			changeGas(e) {
				this.index2 = e.target.value
				this.gasName = this.gas[this.index2].name
				this.gasPrice = this.gas[this.index2].price
			},
			getAreaList() {
				let that = this
				let data = {}
				areaList(data).then(res => {
					this.arealist = res.data
					this.itemslist = this.arealist[this.index].items
					this.city_id = this.arealist[this.index].id
					this.country_id = this.itemslist[this.index1].id
					if (!this.address_id) return
					let data = {
						'address_id': this.address_id
					}
					addressAddInfo(data).then(res => {
						this.city_id = res.data.city_id
						this.country_id = res.data.country_id
						this.arealist.forEach(function(item) {
							if (item.id == that.city_id) {
								that.index = that.arealist.indexOf(item)
							}
						})
						this.itemslist = this.arealist[this.index].items
						this.itemslist.forEach(function(item) {
							if (item.id == that.country_id) {
								that.index1 = that.itemslist.indexOf(item)
							}
						})
						this.address = res.data.address
						this.name = res.data.name
						this.telephone = res.data.telephone
					})
				})
			},
			checkend() {
				if (uni.getStorageSync('user_type') == 1) {
					if (this.wa_coin >= 600) {
						this.check = !this.check
						this.getOrderConfig()
					} else {
						uni.showToast({
							title: '瓦幣不足',
							icon: 'none'
						})
					}
				} else {
					if (this.wa_coin >= 800) {
						this.check = !this.check
						this.getOrderConfig()
					} else {
						uni.showToast({
							title: '瓦幣不足',
							icon: 'none'
						})
					}
				}


				// if(this.check){
				// 	this.wa_coin = 1
				// }else{
				// 	this.wa_coin = 0
				// }
			},
			goto(url, type) {
				if (type == 1) {
					uni.showToast({
						title: '暫未開發',
						icon: 'none'
					})
				} else {
					uni.redirectTo({
						url: url
					})
				}

			},
			subOrder() {
				if (!this.name) {
					return uni.showToast({
						title: '請輸入姓名',
						icon: 'none'
					})
				}
				let reg = /^(09\d{8})$/
				if (!reg.test(this.telephone)) {
					return uni.showToast({
						title: '請輸入正確電話號碼',
						icon: 'none'
					})
				}
				if (!this.address) {
					return uni.showToast({
						title: '請輸入收貨地址',
						icon: 'none'
					})
				}
				if (!this.data && this.active == 2 && !this.time) {
					return uni.showToast({
						title: '請選擇預約時間',
						icon: 'none'
					})
				}
				if (!this.paytype) {
					return uni.showToast({
						title: '請選擇支付方式',
						icon: 'none'
					})
				}
				let city = this.city ? this.city : this.arealist[this.index].name
				let country = this.country ? this.country : this.itemslist[this.index1].name
				let allAddress = city + country + this.address
				let wa_coin = this.check ? 1 : 0
				let remnant = this.bodyBj ? 1 : 0
				let data = {
					"gtpay_type": this.paytype,
					"freight": this.freight,
					"gas": this.gas[this.index2],
					"allAddress": allAddress,
					"address_id": this.address_id,
					"order_type": this.active,
					"name": this.name,
					"telephone": this.telephone,
					"address": this.address,
					"message": this.message,
					"invoice_phone": this.invoice_phone,
					"customer_name": this.customer_name,
					"voucher_phone": this.voucher_phone,
					"voucher_user": this.voucher_user,
					"wa_coin": wa_coin,
					"remnant": remnant,
					"city_id": this.city_id,
					"country_id": this.country_id,
					"pre_date": this.date,
					"pre_hour": this.time,
					'token': '8a6166bc9a13b3616c36125a806660ae',
					'keep_address': this.keep_address,
					'pail_num': this.num
				}
				uni.navigateTo({
					url: '/pages/distribution/Information?data=' + encodeURIComponent(JSON.stringify(data))
				})


			},
			changetab(type) {
				if (type == 1) {
					if (this.userOrderCount == 0) {
						return uni.showToast({
							title: '新用戶首單必須是預約單！',
							icon: 'none'
						})
					}
					let myDate = new Date();
					//获取当前小时数(0-23)
					if (myDate.getHours() <= 8 || myDate.getHours() >= 21) {
						return uni.showToast({
							title: '即時單配送時間為08：00~21：00~若已過營業時間，請改預約明日下單，謝謝',
							icon: 'none'
						})
					}
					this.active = type
				} else {
					this.active = type
				}
			},


		}
	}
</script>

<style lang="less">
	.model{
		picker{
			width: 100%;
			box-sizing: border-box;
			view{
				display: flex;
				justify-content: space-between;
			}
		}
	}
	.radiogroup{
		margin-bottom: 20rpx;
		border: 1px solid #A3A3A3;
		border-radius: 20rpx;
		background-color: #fff;
		.lable {
			display: flex;
			padding: 20rpx;
			align-items: center;
			&:last-child{
				border-bottom: none;
			}
		}
	}
	

	.pir {
		>picker {
			width: 100%;
			box-sizing: border-box;

			view {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
		}
	}

	.number {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 30rpx 0;

		text {
			display: inline-block;
			width: 80rpx;
			height: 80rpx;
			text-align: center;
			line-height: 80rpx;
			font-size: 50rpx;
			color: #505050;
		}

		.add {
			border: 1px solid #A3A3A3;
			border-radius: 15rpx;
			background-color: #fff;
		}

		.hs {
			background-color: #eaeaea;
		}
	}

	.wuliu {
		display: flex;
		justify-content: flex-end;
		color: red;
		font-size: 26rpx;
		margin: 50rpx 0;
	}

	.body {
		background-color: #F3F3F3;

		picker {
			border: 1px solid #A3A3A3;
			padding: 20rpx 38rpx;
			border-radius: 15rpx;
			display: inline-block;
			margin: 0 10rpx 10rpx 0;
			background-color: #fff;

			image {
				margin-left: 10rpx;
				width: 40rpx;
				height: 40rpx;
				vertical-align: middle;
			}
		}

		.head {
			font-size: 40rpx;
			padding-left: 20rpx;
			color: #505050;
			margin-bottom: 8rpx;
		}

		.header {
			padding: 0 200rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 40rpx;
			color: #A1A1A1;
			background-color: #fff;

			text {
				padding: 16rpx 0;
			}

			.active {
				color: #505050;
				border-bottom: 6rpx solid #FF85B4;
			}
		}

		.exchange {
			text-align: center;

			navigator {
				display: inline-block;
				padding: 16rpx 250rpx;
				border: 4rpx solid #FF85B4;
				border-radius: 50rpx;
				background-color: #fff;
				color: #FF85B4;
				font-size: 42rpx;
				font-weight: 600;
				letter-spacing: 4rpx;
				margin-top: 36rpx;
			}

			.ture {
				color: #fff;
				background-color: #FF85B4;
			}
		}

		.consulting {
			box-sizing: border-box;
			padding: 40rpx 32rpx;
			border-bottom: 6rpx solid #fff;

			.title {
				font-size: 40rpx;
				font-weight: 600;
				letter-spacing: 8rpx;
				margin-bottom: 36rpx;
				text-align: center;
			}

			.contacts {
				display: flex;
				font-size: 26rpx;
				justify-content: center;
				padding-bottom: 4rpx;
				letter-spacing: 4rpx;
				border-bottom: 2rpx solid #A3A3A3;
				margin-bottom: 36rpx;

				checkbox-group {
					font-weight: 600;
				}

				navigator {
					padding-top: 4rpx;
					color: #66A4B3;
					text-decoration: underline;
				}
			}

			.time {
				.stime {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 14rpx;
					border: 1px solid #A3A3A3;
					padding: 18rpx 36rpx;
					border-radius: 20rpx;
					font-size: 32rpx;
					background-color: #fff;

					image {
						width: 16rpx;
						height: 16rpx;
					}
				}
			}

			.item {
				margin-bottom: 30rpx;
				width: 100%;
				.head {
					font-size: 40rpx;
					padding-left: 20rpx;
					color: #505050;
					margin-bottom: 8rpx;
				}

				>input {
					margin-bottom: 14rpx;
					border: 1px solid #A3A3A3;
					padding: 18rpx 36rpx;
					border-radius: 20rpx;
					font-size: 36rpx;
					background-color: #fff;
				}

				textarea {
					box-sizing: border-box;
					width: 100%;
					margin-bottom: 14rpx;
					border: 1px solid #A3A3A3;
					padding: 18rpx 36rpx;
					border-radius: 20rpx;
					font-size: 42rpx;
					background-color: #fff;
				}
			}

			.city {
				display: flex;

				.uni-combox {
					margin-bottom: 14rpx;
					border: 1px solid #A3A3A3;
					padding-left: 36rpx;
					border-radius: 20rpx;
					background-color: #fff;
					margin-right: 40rpx;
				}

				input {
					width: 100rpx;
				}
			}

		}

		.coupon {
			padding: 38rpx 58rpx;
			letter-spacing: 4rpx;
			border-bottom: 6rpx solid #fff;

			.coupon_na {
				display: flex;
				justify-content: space-between;
				align-items: center;

				>image {
					width: 44rpx;
					height: 44rpx;
					margin-right: 14rpx;
				}

				>text {
					font-size: 40rpx;
					font-weight: 600;
					flex: 1;
				}

				.right {
					display: flex;
					align-items: center;

					text {
						font-size: 42rpx;
						color: #D8D8D8;
					}

					image {
						width: 40rpx;
						height: 40rpx;
					}
				}
			}
		}

		.tile {
			padding: 38rpx 58rpx;
			letter-spacing: 4rpx;


			display: flex;
			justify-content: space-between;
			align-items: center;

			.img {
				background-color: #FF85B4;
				border-radius: 50%;
				width: 44rpx;
				height: 44rpx;
				margin-right: 14rpx;

				image {
					width: 44rpx;
					height: 44rpx;
				}
			}


			>text {
				font-size: 40rpx;
				font-weight: 600;
				flex: 1;
			}

			.right {
				display: flex;
				align-items: center;

				text {
					font-size: 42rpx;
					color: #FF85B4;
				}

				image {
					width: 100rpx;
					height: 100rpx;
				}
			}

		}

		.button {
			padding: 28rpx;
			background-color: #fff;

			button {
				border-radius: 50rpx;
				background-color: #FF85B4;
				color: #fff;
				font-size: 40rpx;
				letter-spacing: 6rpx;
				font-weight: 600;
				box-shadow: 0rpx 7rpx 10rpx 0rpx rgba(0, 0, 0, 0.2);
			}
		}
	}
</style>
