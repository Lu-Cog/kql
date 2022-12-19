<template>
	<view>
		<web-view :src="url" @message="handleMessage"></web-view>
	</view>
</template>

<script>
	export default {
		onLoad(option) {
			this.url = option.url
			this.type = option.type
			this.order_id = option.order_id
		},
		data() {
			return {
				url: '',
				type: '',
				order_id: ''
			};
		},
		methods: {
			handleMessage(evt) {
				if (evt.detail.data[0].action=='index') {
					uni.reLaunch({
						url:'/pages/index/index'
					})
				}else if(evt.detail.data[0].action=='order'){
					if (this.type == 1) {
						uni.reLaunch({
							url: '/pages/distribution/order?order_id=' + this.order_id
						})
					} else {
						uni.reLaunch({
							url: '/pages/distribution/appointment?order_id=' + this.order_id
						})
					}
				}
			}
		}
	}
</script>

<style lang="less">

</style>
