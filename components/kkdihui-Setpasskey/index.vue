<template>
	<view>
		<!-- 输入码 -->
		<view class="input" v-if="isYan" :style="styles">
			<text v-if="show || password">{{password}}</text>
			<text class="on" v-else>{{placeholder}}</text>
			<view class="im"  v-if=" show"><image src="/static/cursor.gif" ></image></view>
		</view>
		<view class="input" v-if="!isYan" :style="styles">
			<view v-if="show || password"><text style="font-size: 24rpx;" v-for="(item,idx) in password" :key="idx">●</text></view>
			<text class="on" v-else>{{placeholder}}</text>
			<view class="im" v-if="show"><image src="/static/cursor.gif" ></image></view>
		</view>	
		<!-- 键盘 -->
		<view  v-show="show" :class="['keyboard', show ? '' : 'active', isIphoneX ? 'isIphone' : '']">
			<view class="top_wxc" @tap.stop="finish()"> <text>完成</text></view>
			<block v-for="(item, index) in NumberArrs" :key="index">			
				<view v-if="index != 0" class="keyboard-item" @tap.stop="Setkey(item)">{{item}}</view>				
			</block>
			<view class="keyboard-item delte" @tap.stop="clear">清空</view>
			<view class="keyboard-item" @tap.stop="Setkey(NumberArrs[0])"><text>{{NumberArrs[0]}}</text></view>
			<view class="keyboard-item delte" @tap.stop="del()"><image class="img" src="/static/del.png" mode="aspectFill" :lazy-load="true"></image></view>
		</view>
		
	</view>
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: false 
			},
			isIphoneX: {
				type: Boolean,
				default: false 
			},
			isYan: {
				type: Boolean,
				default: false 
			},
			placeholder:{
				type:String,
				default:''
			},
			styles:{
				type:String,
				default:''
			},
			maxLen:{
				type:Number,
				default:6
			}
		},
		data() {
			return {
				password: '',
				trantision: false,
			};
		},
		computed:{
			NumberArrs(){
				let NumberArr = [1, 2, 3, 4,0, 5,6,7,8,9]
				return NumberArr.sort((a,b)=> Math.random()>0.5 ? -1 : 1);
			}
		},
		
		methods: {
			
			Setkey(key) {//设置
				let len = this.password.length
				if(len < this.maxLen){
					this.password += key;
					this.$emit('keys',this.password);
				}else{
					this.finish()
				}
				
			},
			clear() {//清空
				this.password = '';
				this.$emit('keys',this.password);
			},
			finish() {//完成
				this.$emit('finish', false);
			},
			del() {//删除
				if (this.password.length > 0) {
					this.password = this.password.substring(0, this.password.length - 1);
					this.$emit('keys',this.password);
				}
			}
		}
	}
</script>

<style lang="scss">
	input {
		display: none;
	}
	.input{
		display: flex;
		
		width: 100%;
		font-size: 28rpx;
		.on{
			color: #777777;
		}
		.im{
			margin-top: 6rpx;
			image{
				width: 4rpx;
				height: 30rpx;
			}
		}
		
	}
	.mask {
		position: fixed;
		width: 100vw;
		height: 100vh;
		left: 0;
		top: 0;
		transition: all 0.3s ease;
		// background: rgba(102, 102, 102, 0.3);
		opacity: 1;
		z-index: 2;
		visibility: visible;
	}
	.content {
		width: 588rpx;
		height: 570rpx;
		border-radius: 15rpx;
		position: fixed;
		left: 50%;
		top:35%;
		margin-left: -294rpx;
		margin-top: -285rpx;
		background: #fff;
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		justify-content: center;
		z-index: 2;
		opacity: 1;
		visibility: visible;
		transition: all 0.3s ease;
	}
	.contenthide {
		margin-left: -350rpx;
		margin-top: -340rpx;
		width: 700rpx;
		height: 680rpx;
		opacity: 0;
		z-index: 0;
		visibility: hidden;
	}
	.visible {
		opacity: 0;
		z-index: 2;
		visibility: hidden;
	}
	.title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 80rpx;
		width: 560rpx;
		font-size: 32rpx;
	}
	.top_wxc{
		width: 100%;
		padding: 20rpx;
		color: #37416B;
	}
	.center {
		color: #333;
		font-size: 32rpx;
	}
	.close {
		width: 50rpx;
		height: 50rpx;	
	}
	image {
		width: 100%;
		height: 100%;
	}
	.pay-money {
		width: 525rpx;
		height: 240rpx;
		border-bottom: 1rpx solid #EBEBEB;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}
	.pay-money view {
		width: 100%;
		height: 80rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.pay-way {
		width: 520rpx;
		height: 85rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #8A8A8A;
		font-size: 28rpx;
	}
	.money {
		font-size: 45rpx;
		font-weight: 600;
		margin-bottom: 50rpx;
	}
	.money text {
		font-size: 60rpx;
		margin-left: 10rpx;
	}
	.pay-img {
		color: #333333;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.pay-img image {
		width: 35rpx;
		height: 35rpx;
		margin-right: 10rpx;
	}
	.code {
		width: 100%;
		height: 120rpx;
		background: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
	}
	.code-box {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		border: 1px solid #d0d0d0;
	}
	.code-box-item {
		width: 86rpx;
		height: 86rpx;
		background: #fff;
		font-size: 40rpx;
		line-height: 75rpx;
		text-align: center;
	}
	.code-box-item:not(:last-child) {
		border-right: 1px solid #d0d0d0;
	}
	.keyboard {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background: #EBEBEB;
		display: flex;
		justify-content: center;
		z-index: 999;
		flex-wrap: wrap;
		transition:all 0.2s ease-in 0.2s;
	}
	.active {
		bottom: -400rpx;
	}
	.keyboard-item {
		box-sizing: border-box;
		width: 250rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: #fff;
		font-size: 40rpx;
		color: #333;
		height: 99rpx;
		border: 1rpx solid #EBEBEB;
		border-top:none;
		border-left:none;
	}
	.hide {
		opacity: 0;
	}
	.delte {
		background: none;
		box-shadow: none;
	}
	.delte image {
		width: 60rpx;
		height: 60rpx;
	}
	.isIphone {
		padding-bottom: 68rpx !important;
	}
</style>
