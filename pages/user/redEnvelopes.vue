<template>
	<view class="body">
		<view class="title">
			<view class="top">
				感謝您使用預約配送功能，
			</view>
			<view class="buttom">
				您將獲得乙次紅包三選一的抽獎活動!!
			</view>
		</view>
		<view class="main">
			<view :class="show==1?'shake':''" class="red" @click="flip(1)">
				<image class="img" src="../../static/img/2055.png" mode="widthFix"></image>
			</view>
			<view :class="show==2?'shake':''" class="red" @click="flip(2)">
				<image class="img" src="../../static/img/2055.png" mode="widthFix"></image>
			</view>
			<view :class="show==3?'shake':''" class="red" @click="flip(3)">
				<image class="img" src="../../static/img/2055.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="windows" v-if="show1">
			<view class="text">恭喜抽中{{redNum}}瓦幣！</view>
			<view class="close" @click="close()">
				<image class="img" src="../../static/img/cha1.png" mode="widthFix" />
			</view>
		</view>
		<view class="opacity" v-if="show1"></view>

	</view>
</template>

<script>
	import {
		getPrize,
		redPacket
	} from '../../api/index.js'
	import {
		pre
	} from '@/static/js/preview.js'
	export default {
		data() {
			return {
				show: 0,
				show1: false,
				order_no: '',
				redData: {},
				redNum:''
			};
		},
		onLoad(options) {
			this.order_no = options.order_no
			setTimeout(()=>{
				this.getPrize()
			},100)
		},
		methods: {
			flip(type) {
				let that = this
				that.show = type
				switch (type) {
					case 1:
						this.redNum = this.redData.one
						break;
					case 2:
						this.redNum = this.redData.two
						break;
					case 3:
						this.redNum = this.redData.three
						break;
				}
				setTimeout(function() {
					let data = {
						order_no : that.order_no,
						wa_coin : that.redNum
					}
					redPacket(data).then(res=>{
						// uni.showToast({
						// 	title:res.msg,
						// 	icon:'none'
						// })
						that.show = 0
						that.show1 = true
						// uni.navigateBack({
						// 	delta:1
						// })
					}).catch(res=>{
						that.show = 0
						that.show1 = false
					})
				}, 2000)
			},
			close() {
				this.show1 = false
			},
			getPrize() {
				let data = {
					order_no:this.order_no
				}
				getPrize(data).then(res => {
					this.redData = res.data
				})
			}
		}
	}
</script>

<style lang="less">
	@import url("@/static/css/content.css");

	.body {
		background: url(../../static/img/16.png) no-repeat bottom center;
		background-size: 100%;
		height: 100vh;
	}

	.title {
		padding: 100rpx 80rpx 100rpx;
		color: #FF0000;
		font-size: 34rpx;
		font-weight: 700;
	}

	* {
		margin: 0;
		padding: 0;
		list-style: none;
		border: 0;
	}

	@-webkit-keyframes shake {
		0% {
			-webkit-transform: rotate(2deg) translate3d(0, 0, 0)
		}

		50% {
			-webkit-transform: rotate(-2deg) translate3d(0, 0, 0)
		}

		100% {
			-webkit-transform: rotate(2deg) translate3d(0, 0, 0)
		}
	}

	@-moz-keyframes shake {
		0% {
			transform: rotate(2deg) translate3d(0, 0, 0)
		}

		50% {
			transform: rotate(-2deg) translate3d(0, 0, 0)
		}

		100% {
			transform: rotate(2deg) translate3d(0, 0, 0)
		}
	}

	@-ms-keyframes shake {
		0% {
			transform: rotate(2deg) translate3d(0, 0, 0)
		}

		50% {
			transform: rotate(-2deg) translate3d(0, 0, 0)
		}

		100% {
			transform: rotate(2deg) translate3d(0, 0, 0)
		}
	}

	.main {
		margin-top: 100rpx;
		padding: 0 30rpx;
		display: flex;
		justify-content: space-around;
	}

	.red {
		width: 200rpx;
		height: 240rpx;
		border-radius: 15px;
		box-shadow: 1px 1px 20px #666;
		overflow: hidden;
		transform-origin: 50% 100%;
		-webkit-transform-origin: 50% 100%;
	}

	.red .img {
		width: 100%;
		height: auto;
	}

	.red.shake {
		animation: shake .2s infinite linear;
		-webkit-animation: shake .2s infinite linear;
	}

	.windows {
		width: 300px;
		position: absolute;
		top: 50%;
		margin-top: -100px;
		left: 50%;
		margin-left: -150px;
		border-radius: 15px;
		background: #fff;
		z-index: 11;
	}

	.text {
		text-align: center;
		font-size: 18px;
		color: red;
		font-weight: 700;
		font-family: "微软雅黑";
		vertical-align: middle;
		padding: 60px 0;
	}

	.close {
		width: 30px;
		height: 30px;
		position: absolute;
		right: -10px;
		top: -10px;
		background: #fff;
		border-radius: 50%;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: all 0.5s linear;
	}

	.close:hover {
		transform: rotate(180deg);
	}

	.close .img {
		// padding-top: 5px;
		width: 20rpx;
	}

	.opacity {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #000;
		opacity: 0.5;
		filter: alpha(opacity=50);
		z-index: 10;
		width: 100%;
		height: 100%;
	}
</style>
