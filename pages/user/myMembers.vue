<template>
	<view>
		<Header title="我的會員" image="../../static/img/1553.png" @gotoF="gotoF()"></Header>
		<view class="search">
			<input type="text" v-model="search" placeholder="搜尋關鍵字" @confirm="myMembersList()"/>
			<image src="../../static/img/3.png" mode="widthFix"></image>
		</view>
		<view class="user_list">
			<view v-if="memberslist.length!=0" class="user_item" v-for="(item,index) in memberslist" :key='index'>
				<image :src="item.avatar" mode="widthFix"></image>
				<view class="right">
					<view class="top">
						{{item.username}}
					</view>
					<view class="bottom">
						會員編號:{{item.email}}
					</view>
				</view>
			</view>
			<view v-else class="no">
				暫無會員
			</view>
		</view>
	</view>
</template>

<script>
	import {
		myMembersList
	} from '../../api/index.js'
	import Header from '../../components/header/header.vue'
	export default {
		components: {
			Header
		},
		data() {
			return {
				search:'',
				memberslist: []
			};
		},
		onShow() {
			this.myMembersList()
		},
		methods: {
			myMembersList() {
				let that = this,
					data = {
						'search' : this.search,
						'token': '8a6166bc9a13b3616c36125a806660ae'
					}
				myMembersList(data).then(res => {
					this.memberslist = res.data;
				})
			},
			gotoF(){
				uni.navigateTo({
					url:'./memberBar'
				})
			}
		}
	}
</script>

<style lang="less">
	.no{
		text-align: center;
		color: #999;
		margin-top: 200rpx;
	}
	.search {
		padding: 38rpx;
		position: relative;

		input {
			box-shadow: 0 0 7rpx 4rpx rgba(0, 0, 0, 0.07);
			border-radius: 50rpx;
			padding: 14rpx 20rpx 14rpx 90rpx;
		}

		image {
			width: 50rpx;
			height: 50rpx;
			position: absolute;
			top: 46rpx;
			left: 60rpx;
		}
	}

	.user_item {
		margin: 0 50rpx 40rpx;
		display: flex;
		align-items: center;

		image {
			width: 60rpx;
			height: 60rpx;
			margin-right: 10rpx;
		}

		.top {
			color: #6C6C6C;
			font-size: 32rpx;
		}

		.bottom {
			color: #6C6C6C;
			font-size: 30rpx;
		}
	}
</style>
