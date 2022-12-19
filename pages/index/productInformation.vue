<template>
	<view>
		<view class="bgimg">
			<image :src="articlelist.img_url" mode="widthFix"></image>
		</view>
		<view class="content">
			<view class="time">
				{{articlelist.create_time}}
			</view>
			<view class="title">
				<text>
					{{articlelist.title}}
				</text>
			</view>
			<view class="contents" v-html="articlelist.content">
			</view>
		</view>
	</view>
</template>

<script>
	import { articleDetail} from '../../api/index.js'
	export default {
		data() {
			return {
				article_id:'',
				articlelist:{}
			};
		},
		onLoad(option) {
			this.article_id	= option.article_id	
			this.articleDetail()
		},
		methods:{
			articleDetail(){
				let data={
					'token': '8a6166bc9a13b3616c36125a806660ae',
					'article_id':this.article_id
				}
				articleDetail(data).then(res=>{
					this.articlelist = res.data
				})
			}
		}
	}
</script>

<style lang="less">
.bgimg{
	width: 100%;
	image{
		width: 100%;
		height: 100%;
	}
}
.content{
	padding: 50rpx 40rpx;
	.time{
		color: #FF5252;
		font-size: 32rpx;
	}
	.title{
		font-size: 38rpx;
		font-weight: 700;
		padding: 24rpx 0;
		text{
			border-bottom: 2px solid #FF9EC3;
		}
	}
	.contents{
		color: #A1A1A1;
		font-size: 30rpx;
	}
}
</style>
