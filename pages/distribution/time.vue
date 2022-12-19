<template>
	<view>
		<ren-calendar ref='ren' :markDays='markDays' :headerBar='true' @onDayClick='onDayClick' :open="true"
			:disabledAfter='true'></ren-calendar>
		<view class="time">
			<view class="title">
				預約時間
			</view>
			<picker mode="selector" :range="timeList" :value="index" :range-key="'hour'" @change="changeTime">
				<view class="hour"><text>{{defaultTime?defaultTime:'請選擇時間'}}</text>
					<image src="/static/img/xia.png" mode="widthFix"></image>
				</view>
			</picker>
		</view>
		
		<view class="exchange">
			<view class="ture" @click="goto()">
				確認
			</view>
		</view>
		<!-- <hTimeAlert title="预约时间" rangeStartTime="8:00:00" rangeEndTime="20:00:00" :defaultTime="defaultTime"
			intervalTime="15" :isShow="isShow" @closeAlert="handelClose"></hTimeAlert> -->
	</view>
</template>

<script>
	import {getPreTime} from '@/api/index.js'
	import hTimeAlert from "@/components/h-time-alert/h-time-alert.vue";
	import RenCalendar from '@/components/ren-calendar/ren-calendar.vue'
	export default {
		components: {
			RenCalendar,
			hTimeAlert
		},
		onLoad(option) {
			this.bodyBj = option.bodyBj
			// this.defaultTimeF()
		},
		data() {
			return {
				bodyBj:'',
				curDate: '',
				markDays: [],
				isShow: false,
				defaultTime: '',
				timeList:[]
			}
		},
		onReady() {
			let today = this.$refs.ren.getToday().date;
			console.log(today);
			this.curDate = today;
			this.getPreTime(today)
			this.markDays.push(today);
		},
		methods: {
			getPreTime(date){
				let data = {
					date:date
				}
				getPreTime(data).then(res=>{
					this.timeList = res.data
				})
			},
			goto() {
				if (!this.defaultTime) {
					return uni.showToast({
						title: '請選擇時間',
						icon: 'none'
					})
				} else {
					getApp().globalData.date = this.curDate
					getApp().globalData.time = this.defaultTime
					uni.redirectTo({
						url: '/pages/distribution/distribution?active=2&bodyBj='+ this.bodyBj
					})
				}

			},
			// defaultTimeF(){
			// 	let hour = new Date().getHours()<10?"0"+new Date().getHours():new Date().getHours()
			// 	let min = new Date().getMinutes()<10?"0"+new Date().getMinutes():new Date().getMinutes()
			// 	this.defaultTime = hour+':'+min
			// },
			onDayClick(data) {
				this.curDate = data.date;
				console.log(this.curDate);
			},
			showMask() {
				this.isShow = true;
			},
			changeTime(e){
				let index = e.target.value
				if(this.timeList[index].count>=20){
					return uni.showToast({
						title:'時間段已約滿',
						icon:'none'
					})
				}else{
					this.defaultTime = this.timeList[index].hour
				}
			},
			handelClose(e) {
				this.isShow = false;
				this.defaultTime = e.date
			}
		}
	}
</script>

<style lang="less">
	.exchange {
		position: absolute;
		width: 100%;
		bottom: 40rpx;
		text-align: center;

		.ture {
			display: inline-block;
			padding: 16rpx 300rpx;
			border: 4rpx solid #FF85B4;
			border-radius: 50rpx;
			background-color: #FF85B4;
			color: #fff;
			font-size: 36rpx;
			font-weight: 600;
			letter-spacing: 4rpx;
			margin-top: 36rpx;
		}
	}

	.time {
		margin: 50rpx 30rpx;
		font-size: 38rpx;
		padding: 0 40rpx;

		.title {
			margin-bottom: 20rpx;
		}

		.hour {
			padding: 0 6rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #000;

			image {
				width: 30rpx;
				height: 30rpx;
			}
		}
	}

	.calendar-wrapper {
		margin: 50rpx 30rpx;
		box-shadow: 0rpx 0rpx 10px 0rpx rgba(0, 0, 0, .2);
	}

	.change {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto;
		margin-top: 100rpx;
		height: 100rpx;
		color: #b89249;
		background-color: #21191b;
	}
</style>
