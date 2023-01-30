<template>
	<view>
		<view class="content">
			<uni-card title="幫助" isShadow>
				<text class="content-box-text">如使用操作上有任何問題,煩請聯繫客服,我們將盡速為您處理~!!!</text>
			</uni-card>
			<uni-card title="服務電話" isShadow @click="clickCard">
				<text class="content-box-text">03 853 5118</text>
			</uni-card>
			<uni-card title="客服郵箱" isShadow>
				<text class="content-box-text">kql2021888@gmail.com</text>
			</uni-card>
			<uni-card title="服務時間" isShadow>
				<text class="content-box-text">周一~周五10:00~18:00</text>
			</uni-card>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			clickCard(){
				uni.makePhoneCall({
					phoneNumber:'03 853 5118'
				})
			}
		}
	}
</script>

<style lang="scss">
.content{
	padding: 50rpx 0rpx;
}
.content-box-text {
		font-size: 16px;
		line-height: 22px;
	}

</style>
