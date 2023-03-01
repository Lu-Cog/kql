<script>
	export default {
		globalData: {
			token: '',
			date: '',
			time: '',
			address_id: '',
			shop_id:'',
			shop_name:''
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			let that = this
			// this.globalData.shop_id = option.referrerInfo.extraData.shop_id
			// this.globalData.shop_name = option.referrerInfo.extraData.shop_name
			console.log('App Show')
			try {
				var arg = JSON.parse(plus.runtime.arguments);
				// var arg = {"token":"4b3dfd77e1ac163d6d0255458a5dccfb"}
				if(arg.type==11){
					uni.navigateTo({
						url:'/pages/user/memberBar'
					})
				}
				
				if (arg.token == "" || arg.token == undefined) {
					if (uni.getStorageSync('token') == '' || uni.getStorageSync('token') == undefined) {
						return uni.sendNativeEvent('loginOut', ret => {})
					}
					that.globalData.token = uni.getStorageSync('token')
				} else {
					uni.setStorageSync('token', arg.token);
					that.globalData.token = arg.token;
				}
			} catch (e) {
				console.log('Shortcut-exception: ' + e);
			}
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
