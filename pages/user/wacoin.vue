<template>
	<view>
		<view class="header">
			<view class="head">
				<image src="/static/img/548.png" mode="widthFix"></image>
			</view>
			
		</view>
		<view class="num">
			<text>{{wacoin?wacoin:0}}</text>
		</view>
		<view class="transfer">
			<navigator url="/pages/user/transfer">轉贈瓦幣</navigator>
		</view>
		<view class="definite">
			<view class="title">
				帳戶明細：
			</view>
			<view class="content">
				<view class="content_item" v-for="(item,index) in waCoinList" :key='index'>
					<view class="item_title">
						{{item.source}}
					</view>
					<view class="item_bottom">
						<text>{{item.add_time}}</text>
						<text>{{Number(item.wa_coin)}}</text>
					</view>
				</view>
				
			</view>
		</view>
	</view>
	
</template>

<script>
	import {waCoinList} from '@/api/index.js'
	import TabBar from '../../components/jinjie-tabBar/jinjie-tabBar.vue'
	export default {
		components: {
			TabBar
		},
		data() {
			return {
				waCoinList:[],
				wacoin:''
			};
		},
		onLoad(option) {
			this.wacoin = option.wacoin
			this.getWaCoinList()
		},
		methods:{
			getWaCoinList(){
				let data = {
				}
				waCoinList(data).then(res=>{
					this.waCoinList = res.data
				})
			}
		}
	}
</script>

<style lang="less">
	.header{
		position: relative;
		height: 160rpx;
		width: 100%;
		background-color: #FF9EC3;
		.head{
			display: flex;
			justify-content: center;
			align-items: center;
			width: 170rpx;
			height: 170rpx;
			position: absolute;
			left: 50%;
			bottom: -60rpx;
			transform: translate(-50%);
			border-radius: 50%;
			background-color: #FF9EC3;
			image{
				width: 160rpx;
				height: 160rpx;
			}
		}
	}
	.num{
		margin-top: 80rpx;
		text-align: center;
		font-size: 50rpx;
		font-weight: 600;
		margin-bottom: 20rpx;
	}
	.transfer{
		text-align: center;
		navigator{
			display: inline-block;
			background: #FF9EC3;
			padding: 4rpx 30rpx;
			border-radius: 60rpx;
			color: #fff;
			letter-spacing: 6rpx;
			font-weight: 600;
		}
	}
	.definite{
		padding: 44rpx;
		.title{
			font-size: 32rpx;
			font-weight: 600;
			letter-spacing: 6rpx;
			margin-bottom: 20rpx;
		}
		.content{
			width: 100%;
			height: 700rpx;
			background: #F3F3F3;
			border-radius: 20rpx;
			padding: 36rpx 22rpx;
			box-sizing: border-box;
			overflow: auto;
			.content_item{
				border-bottom: 1px solid #707070;
				margin-bottom: 34rpx;
				.item_title{
					font-weight: 600;
					font-size: 34rpx;
					letter-spacing: 6rpx;
					padding-bottom: 10rpx;
				}
				.item_bottom{
					display: flex;
					justify-content: space-between;
					padding-bottom: 8rpx;
					font-size: 30rpx;
					letter-spacing: 6rpx;
				}
			}
		}
	}
</style>
