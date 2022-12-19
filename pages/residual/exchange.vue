<template>
	<view class="body">
		<view class="img">
			<image src="../../static/img/1602(2).png" mode="widthFix"></image>
		</view>
		<view class="num">
			<text>{{yuqi?yuqi:0}} Kg</text>
		</view>
		<view class="content">
			<view class="content_top">
				<text>我要兌換</text>
				<text class="jian" @click="subNum()">-</text>
				<input type="text" v-model="num" />
				<text class="kg">kg</text>
				<text class="add" @click="addNum()">+</text>
			</view>
			<view class="content_center">
				<view class="img">
					<image src="../../static/img/548.png" mode="widthFix"></image>
				</view>
				<text>=</text>
				<view class="content_num">
					<text>20</text>枚
				</view>
			</view>
			<button type="default" hover-class="none" @click="goto()">確定兌換瓦幣</button>
		</view>
	</view>
</template>

<script>
	import {getToWacoin} from '../../api/index.js'
	export default {
		data() {
			return {
				yuqi:'',
				num:0
			};
		},
		onLoad(option) {
			this.yuqi = option.yuqi
		},
		methods:{
			goto(){
				let data = {
					'remnant' : this.num
				}
				getToWacoin(data).then(res=>{
					uni.showToast({
						title:'兌換成功',
						icon:'none',
					})
					setTimeout(function(){
						uni.navigateBack({
							delta:1,
						})
					},3000)
				}).catch(res=>{
					uni.showToast({
						title:res,
						icon:'none'
					})
				})
			},
			addNum(){
				if(this.num>=Number(this.yuqi)){
					return uni.showToast({
						title:'已經加到最大',
						icon:'none'
					})
				}
				this.num+=1
			},
			subNum(){
				
				if(this.num<=0){
					return uni.showToast({
						title:'不能再減了',
						icon:'none'
					})
				}
				this.num-=1
			}
		}
	}
</script>

<style lang="less">
	.body {
		height: 100vh;
		background-color: #FF9EC3;
		padding-top: 44rpx;
		text-align: center;

		.img {
			image {
				width: 286rpx;
				height: 286rpx;
			}
		}

		.num {
			font-size: 40rpx;
			color: #fff;
			margin: 20rpx 0;
		}

		.content {
			background-color: #fff;
			margin: 0 70rpx;
			border-radius: 50rpx;
			text-align: center;
			padding: 120rpx 0 60rpx;

			.content_top {
				display: flex;
				justify-content: center;
				align-items: center;
				position: relative;
				margin-bottom: 70rpx;

				text {
					font-size: 30rpx;
					font-weight: 600;

					&:first-child {
						margin-right: 20rpx;
					}
				}

				.jian {
					font-size: 40rpx;
				}

				.add {
					font-size: 40rpx;
				}

				.kg {
					position: absolute;
					right: 138rpx;
					bottom: 1rpx;
				}

				input {
					height: 80rpx;
					width: 168rpx;
					background-color: #f3f3f3;
					font-size: 74rpx;
					margin: 0 40rpx;
				}
			}

			.content_center {
				display: flex;
				justify-content: center;
				align-items: center;
				color: #FF9EC3;
				margin-bottom: 120rpx;
				.img{
					background-color: #FF9EC3;
					border-radius: 50%;
					display: flex;
					justify-content: center;
					align-items: center;
					image{
						width: 120rpx;
						height: 120rpx;
					}
				}
				>text{
					margin: 0 60rpx;
					font-size: 40rpx;
				}
				.content_num{
					font-size: 26rpx;
					font-weight: 600;
					text{
						font-size: 60rpx;
						margin-right: 20rpx;
					}
				}
			}

			button {
				background-color: #FF9EC3;
				border-radius: 50rpx;
				border: none;
				outline: none;
				font-size: 36rpx;
				letter-spacing: 4rpx;
				color: #fff;
				width: 312rpx;
			}
		}
	}
</style>
