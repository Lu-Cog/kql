<template>
	<view>
		<Header title="常用收貨人資訊" image='../../static/img/tianjia.png' @gotoF='gotoF()'></Header>
		<view class="user_list">
			<view v-if="addressList.length!=0">
				<view class="useritem" v-for="(item,index) in addressList" :key="index"
					@click="changeImg(item.id)">
					<image :src="change!=item.id?'../../static/img/256.png':'../../static/img/271.png'" mode="widthFix">
					</image>
					<view class="center">
						<text>{{item.name}}</text>
						<text>{{item.address_str}}</text>
						<text>{{item.telephone}}</text>
					</view>
					<image src="../../static/img/1745.png" mode="widthFix"
						@click="goto('/pages/distribution/addConsignee?address_id='+item.id)"></image>
				</view>
			</view>
			<view v-else class="no">
				暫無資訊
			</view>
		</view>
		<view class="footer" v-if="show!='false'">
			<navigator url="" @click="toFrist()">確認</navigator>
			<view class="tab-bar" v-show="showTabBar === true"></view>
		</view>
	</view>
</template>

<script>
	import {
		addressList
	} from '@/api/index.js'
	import Header from '../../components/header/header.vue'
	export default {
		components: {
			Header
		},
		data() {
			return {
				pageIndex: 1,
				pageSize: 10,
				addressList: [],
				change: '',
				showTabBar: false,
				show: '',
				bodyBj:''
			};
		},
		onLoad(option) {
			this.bodyBj = option.bodyBj
			this.show = option.show
			this.active = option.active
			this.getAddress()
			this.getSystemInfo()
		},
		onShow() {
			this.getAddress()
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
			toFrist() {
				getApp().globalData.address_id = this.change
				uni.redirectTo({
					url: '/pages/distribution/distribution?active=' + this.active+'&bodyBj='+ this.bodyBj
				})
			},
			gotoF() {
				uni.navigateTo({
					url: '/pages/distribution/addConsignee'
				})
			},
			goto(url) {
				uni.navigateTo({
					url: url
				})
			},
			getAddress() {
				let data = {
					'token': '',
					'pageIndex': this.pageIndex,
					'pageSize': this.pageSize
				}
				addressList(data).then(res => {
					this.addressList = res.data.list
				})
			},
			changeImg(id) {
				this.change = id
			}
		}

	}
</script>

<style lang="less">
		
	.no {
		text-align: center;
		color: #999;
		margin-top: 200rpx;
	}

	.tab-bar {
		height: 30rpx;
		background-color: #FF9EC1;
	}

	.useritem {
		padding: 10rpx 60rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #F3F3F3;
		margin-bottom: 3px;

		image {
			&:first-child {
				width: 46rpx;
				height: 46rpx;
			}

			&:last-child {
				width: 30rpx;
				height: 30rpx;
			}
		}

		.center {
			display: flex;
			flex-direction: column;
			flex: 1;
			padding-left: 48rpx;

			text {
				font-size: 30rpx;
				margin-bottom: 10rpx;
				color: #707070;

				&:first-child {
					font-size: 34rpx;
					color: #000;
					font-weight: 700;
				}
			}
		}
	}

	.footer {
		position: fixed;
		bottom: 0;
		width: 100%;
		text-align: center;

		navigator {
			padding: 20rpx 0;
			background-color: #FF9EC3;
			color: #fff;
		}
	}
</style>
