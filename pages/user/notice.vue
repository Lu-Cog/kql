<template>
	<view>
		<view class="news">
			<view class="no" v-if="noticelist.length==0">
				<view class="no_center">
					暫無通知
				</view>
			</view>
			<view v-else class="item" @click="goto('./noticeInfo?title='+item.title+'&content='+item.content+'&time='+item.add_time)" v-for="(item,index) in noticelist" :key='index'>
				<image :src="item.icon" mode="widthFix"></image>
				<view class="center">
					<view>{{item.title}}</view>
					<view v-html="item.content"></view>
					<!-- <view>{{item.add_time}}</view> -->
				</view>
				<image src="../../static/img/you.png" mode="widthFix"></image>
			</view>
			
		</view>
	</view>
</template>

<script>
	import {getNotice} from '../../api/index.js'
	export default {
		data() {
			return {
				noticelist:[]
			};
		},
		onLoad() {
			this.getNotice()
		},
		methods:{
			getNotice(){
				let data = {
					'token':''
				}
				getNotice(data).then(res=>{
					this.noticelist = res.data?res.data:[]
				})
			},
			goto(url){
				uni.navigateTo({
					url:url
				})
			}
		}
	}
</script>

<style lang="less">
.news{
	.no{
		padding-top: 100rpx;
		text-align: center;
		color: #999999;
	}
	.item{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx 30rpx 30rpx 50rpx;
		border-bottom: 1px solid #eee;
		box-sizing: border-box;
		>image{
			width: 70rpx;
			height: 70rpx;
			&:first-child{
				width: 50rpx;
				height: 50rpx;
			}
		}
		.center{
			flex: 1;
			margin-left: 30rpx;
			width: 80%;
			box-sizing: border-box;
			view{
				font-size: 32rpx;
				width: 100%;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				&:first-child{
					font-weight: 700;
				}
				&:last-child{
					width: 100%;
				}
			}
		}
	}
	
}
</style>
