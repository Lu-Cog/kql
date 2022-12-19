<template>
	<view>
		<web-view :src="src"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src:''
			};
		},
		onLoad(option) {
			this.src = 'https://kql.iqweb.net/api/article/detail?article_id='+option.id
		}
	}
</script>

<style lang="less">

</style>
