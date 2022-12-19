<template>
	<view>
		<view class="header">
			<view class="img">
				<image :src="pig" mode="widthFix"></image>
				<view class="right">
					<navigator v-if="yuqi>0" :url="'/pages/residual/exchange?yuqi='+yuqi">兌換瓦幣</navigator>
					<navigator v-else class="nav" hover-class="none" @click="getNo()">兌換瓦幣</navigator>
					<text>{{Number(yuqi)}}kg</text>
				</view>
			</view>
			<view class="accumulation">
				<view class="title">
					餘氣累計:
				</view>
				<view class="progress">
					<view class="bar" :style="'width:'+progress+'%'">
						<text v-if="yuqi>=remnant">{{remnant}}/{{remnant}}kg 立即兌換瓦斯</text>
					</view>
					<text v-if="yuqi<remnant">{{Number(yuqi)}}/{{remnant}}kg</text>
				</view>
			</view>
		</view>
		<view class="definite">
			<view class="title">
				儲氣明細：
			</view>
			<view class="content">
				<view class="content_item" v-for="(item,index) in remnantlist" :key='index'>
					<view class="item_bottom">
						<text>{{item.add_time}}</text>
						<text>{{Number(item.remnant)}}kg</text>
					</view>
				</view>
				
			</view>
		</view>
		<TabBar tabIndex=1></TabBar>
	</view>
</template>

<script>
	import {remnantlist,getUserInfo} from '../../api/index.js'
	import TabBar from '../../components/jinjie-tabBar/jinjie-tabBar.vue'
	export default {
		components: {
			TabBar
		},
		data() {
			return {
				yuqi:0,
				remnant:'',
				remnantlist:[],
			};
		},
		onLoad() {
			if(uni.getStorageSync('user_type')==1){
				this.remnant=15
			}else{
				this.remnant=20
			}
		},
		onShow() {
			this.getRemnantlist()
			this.getUserInfo()
		},
		methods:{
			getNo(){
				uni.showToast({
					title:'餘氣不足',
					icon:'none'
				})
			},
			getRemnantlist(){
				let data ={
					
				}
				remnantlist(data).then(res=>{
					this.remnantlist = res.data
				})
			},
			getUserInfo(){
				let data = {
					'token' : ''
				}
				let that = this
				getUserInfo(data).then(res=>{
					that.yuqi = res.data.remnant
				})
			}
		},
		computed:{
			progress(){
				if(this.yuqi<this.remnant){
					return (this.yuqi/this.remnant).toFixed(2)*100
				}else{
					return 100
				}
			},
			pig(){
				if(this.yuqi>=this.remnant){
					return "../../static/img/1602(2).png"
				}else if(this.yuqi>=(this.remnant/2)){
					return "../../static/img/1603.png"
				}else{
					return "../../static/img/1608.png"
				}
			}
		}
	}
</script>

<style lang="less">
	.header {
		background: #FF9EC3;
		padding: 44rpx 30rpx 44rpx;

		.img {
			text-align: center;
			position: relative;

			image {
				width: 286rpx;
				height: 200rpx;
			}

			.right {
				position: absolute;
				right: 0;
				bottom: 20rpx;

				navigator {
					background-color: #FF85B4;
					border-radius: 40rpx;
					padding: 4rpx 10rpx;
					font-size: 30rpx;
					letter-spacing: 4rpx;
					color: #fff;
					margin-bottom: 30rpx;
				}
				.nav{
					color: #FF85B4;
					background-color: #fff;
				}
				text {
					color: #fff;
					font-size: 50rpx;

				}
			}
		}
		.accumulation{
			.title{
				font-size: 30rpx;
				letter-spacing: 4rpx;
				font-weight: 600;
				padding: 14rpx;
			}
			.progress{
				display: flex;
				align-items: center;
				height: 54rpx;
				border: 4rpx solid #FF85B4;
				background-color: #fff;
				font-size: 30rpx;
				font-weight: 600;
				>text{
					color: #FF85B4;
					padding-left: 16rpx;
				}
				.bar{
					height: 100%;
					width: 0%;
					background-color: #FF85B4;
					display: flex;
					justify-content: flex-end;
					align-items: center;
					text{
						color: #fff;
						padding-right: 16rpx;
					}
				}
			}
			
		}
	}
	.definite{
		padding: 44rpx;
		.title{
			font-size: 36rpx;
			font-weight: 600;
			letter-spacing: 6rpx;
			margin-bottom: 20rpx;
		}
		.content{
			width: 100%;
			height: 600rpx;
			background: #F3F3F3;
			border-radius: 20rpx;
			padding: 36rpx 22rpx;
			box-sizing: border-box;
			overflow: auto;
			.content_item{
				border-bottom: 1px solid #707070;
				margin-bottom: 34rpx;
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
