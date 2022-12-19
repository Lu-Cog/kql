<template>
	<view>
		<view class="loading">
			<view class="title">
				物流人員接單中......
			</view>
			<view style="height: 100rpx;">
				
			</view>
			<image src="../../static/img/jie.png" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status:0,
				order_id:''
			};
		},
		onLoad(option) {
			let that = this
			this.order_id = option.order_id
			console.log(option.order_id);
			setTimeout(function(){
				that.status=1
				uni.reLaunch({
					url:'/pages/distribution/order?order_id=' + that.order_id
				})
			},2000)
		},
		// updated() {
		// 	if(this.status==1){
		// 		uni.navigateTo({
		// 			url:'/pages/distribution/order?order_id=' + this.order_id
		// 		})
		// 	}
		// }
	}
</script>

<style lang="less">
.loading{
	height: 100vh;
	background-color: #FF9EC3;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	.title{
		color: #fff;
		font-size: 50rpx;
		
	}
}
</style>
