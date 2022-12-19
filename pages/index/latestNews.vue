<template>
	<view>
		<view class="taber">
			<view :class="action==1?'active':''" @click="chageBar(1)">產品訊息</view>
			<view :class="action==2?'active':''" @click="chageBar(2)">公司訊息</view>
		</view>
		<view class="main">
			<view class="left" v-if="action==1">
				<!-- <view class="search">
					<input type="text" placeholder="輸入關鍵字搜尋" />
					<image src="../../static/img/1942.png" mode="widthFix"></image>
				</view> -->
				<view class="item" @click="goto('./productInformation?article_id='+item.id)" v-for="(item,index) in newslist" :key="index">
					<view class="item_left">
						<image :src="item.img_url" mode="aspectFit"></image>
					</view>
					<view class="item_right">
						<view class="top">
							<text>{{item.title}}</text>
						</view>
						<view class="content">
							{{item.description}}
						</view>
						<view class="time">
							{{item.create_time}}
						</view>
					</view>
				</view>

			</view>
			<view class="right" v-else>
				<!-- <view class="search">
					<input type="text" placeholder="輸入關鍵字搜尋" />
					<image src="../../static/img/1942.png" mode="widthFix"></image>
				</view> -->
				<view class="item" @click="goto('./productInformation?article_id='+item.id)" v-for="(item,index) in newslist" :key="index">
					<view class="item_left">
						<image :src="item.img_url" mode="aspectFit"></image>
					</view>
					<view class="item_right">
						<view class="top">
							<text>{{item.title}}</text>
						</view>
						<view class="content">
							{{item.description}}
						</view>
						<view class="time">
							{{item.create_time}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		articleList
	} from '@/api/index.js'
	export default {
		data() {
			return {
				action: 1,
				newslist: []
			};
		},
		onLoad() {
			this.getArticleList()
		},
		methods: {
			goto(url) {
				uni.navigateTo({
					url: url
				})
			},
			chageBar(num) {
				this.action = num
				this.getArticleList()
			},
			getArticleList() {
				let data = {
					"cate_id": this.action,
					"page_index": 1,
					"page_size": 1000,
				}
				articleList(data).then(res => {
					this.newslist = res.data
				})
			}
		}
	}
</script>

<style lang="less">
	.taber {
		display: flex;
		justify-content: space-around;
		padding: 40rpx 200rpx;
		color: #505050;

		view {
			padding: 10rpx;
		}

		.active {
			color: #FF85B4;
			border-bottom: 2px solid #FF85B4;
		}
	}

	.main {

		.item {
			padding: 30rpx;
			font-size: 30rpx;
			display: flex;
			align-items: center;

			.item_left {
				width: 300rpx;
				height: 160rpx;
				margin-right: 10rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}

			.top {
				text {
					// border-bottom: 2px solid #FF9EC3;
				}
			}

			.content {
				margin: 10rpx 0;
				color: #A1A1A1;
			}

			.time {
				color: #FF5252;
			}
		}

		.search {
			margin: 0 36rpx 20rpx;
			position: relative;

			input {
				padding: 16rpx 28rpx;
				border-radius: 20rpx;
				font-size: 30rpx;
				background-color: #F1F1F1;
			}

			image {
				position: absolute;
				bottom: 20rpx;
				right: 10rpx;
				width: 40rpx;
				height: 40rpx;
			}
		}

	}
</style>
