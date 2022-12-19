<template>
	<view>
		<Header :title="address_id?'編輯收貨人資訊':'新增收貨人資訊'" :image="address_id?'../../static/img/shangchu.png':''"
			@gotoF='gotoF()'></Header>
		<view class="addList">
			<view class="addItem">
				<view class="title">
					收貨人
				</view>
				<input type="text" v-model="name" placeholder="請輸入收貨人姓名" />
			</view>
			<view class="addItem">
				<view class="title">
					收貨地址
				</view>
				<view class="city">
					<picker mode="selector" :range="arealist" range-key='name' :value="index"
						@change='changeCity($event)'>
						<view>{{arealist.length!=0?arealist[index].name:'市'}}
							<image src="../../static/img/xiala.png" mode="widthFix"></image>
						</view>
					</picker>
					<picker mode="selector" :range="itemslist" range-key="name" :value="index1"
						@change="changeCountry($event)">
						<view>{{itemslist.length!=0?itemslist[index1].name:'區'}}
							<image src="../../static/img/xiala.png" mode="widthFix"></image>
						</view>
					</picker>
				</view>
				<input type="text" v-model="address" placeholder="詳細地址(里道路/街/巷弄號)" />
			</view>
			<view class="addItem">
				<view class="title">
					聯繫電話
				</view>
				<input type="text" v-model="telephone" placeholder="請輸入手機號碼" />
			</view>
			<view class="footer">
				<navigator @click="keep()" url="">儲存</navigator>
				<view class="tab-bar" v-show="showTabBar === true"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import Header from '../../components/header/header.vue'
	import {
		areaList,
		addressAdd,
		addressDelete,
		addressAddInfo
	} from '@/api/index.js'
	export default {
		components: {
			Header
		},
		data() {
			return {
				arealist: [],
				showTabBar:false,
				index: 0,
				index1: 0,
				itemslist: [],
				city_id: '',
				country_id: '',
				name: '',
				address: '',
				telephone: '',
				address_id: '',
			};
		},
		onLoad(option) {
			this.address_id = option.address_id
			this.getSystemInfo()
			this.getAreaList()
		},
		onShow() {
			this.getAreaList()
		},
		methods: {
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
			gotoF() {
				console.log(this.address_id);
				if(!this.address_id) return
				let data = {
					'id': this.address_id
				}
				uni.showModal({
					title: '提示',
					content: '確認刪除？',
					success: function(res) {
						if (res.confirm) {
							addressDelete(data).then(res => {
								uni.navigateBack({
									delta: 1,
								})
							}).catch(res => {
								uni.showToast({
									title: res,
									icon: 'none'
								})
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			keep() {
				let data = {
					'address_id': this.address_id,
					'city_id': this.city_id,
					'country_id': this.country_id,
					'name': this.name,
					'address': this.address,
					'telephone': this.telephone,
				}
				addressAdd(data).then(res => {
					// uni.showToast({
					// 	title: res.msg,
					// 	icon: 'none'
					// })
					uni.navigateBack({
						delta: 1,
					})
				}).catch(res => {
					uni.showToast({
						title: res,
						icon: 'none'
					})
				})
			},
			changeCountry(e) {
				this.index1 = e.target.value
				this.country_id = this.itemslist[this.index1].id
			},
			changeCity(e) {
				this.index = e.target.value
				this.itemslist = this.arealist[this.index].items
				this.index1=0,
				this.city_id = this.arealist[this.index].id
				this.country_id = this.itemslist[this.index1].id
			},
			getAreaList() {
				let that = this
				let data = {}
				areaList(data).then(res => {
					this.arealist = res.data
					this.itemslist = this.arealist[this.index].items
					this.city_id = this.arealist[this.index].id
					this.country_id = this.itemslist[this.index1].id
					if(!this.address_id) return
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
						this.itemslist = this.arealist[that.index].items
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
			}
		}
	}
</script>

<style lang="less">
	.tab-bar {
		height: 30rpx;
		background-color: #FF9EC1;
	}
	.addList {
		padding: 32rpx;

		.addItem {
			margin-bottom: 10rpx;

			.title {
				color: #505050;
				font-size: 40rpx;
				padding: 14rpx;
			}
		}

		picker {
			border: 1px solid #A3A3A3;
			padding: 20rpx 38rpx;
			border-radius: 15rpx;
			display: inline-block;
			margin: 0 10rpx 10rpx 0;

			image {
				margin-left: 10rpx;
				width: 40rpx;
				height: 40rpx;
				vertical-align: middle;
			}
		}

		input {
			border: 1px solid #A3A3A3;
			border-radius: 15rpx;
			padding: 20rpx 38rpx;
		}
	}

	.footer {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		text-align: center;

		navigator {
			padding: 20rpx 0;
			background-color: #FF9EC3;
			color: #fff;
			font-weight: 700;
		}
	}
</style>
