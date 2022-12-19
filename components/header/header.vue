<template>
	<view class="header">
		<view class="top"></view>
		<view class="head">
			<image src="../../static/img/s1.png" mode="widthFix" @click="backTo()"></image>
			<view>{{title}}</view>
			<image @click="goto()" :src="image" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	export default {
		name: "header",
		props: {
			title: {
				type: String,
				default: '加載中...'
			},
			image: {
				type: String
			}
		},
		data() {
			return {

			};
		},
		methods: {
			backTo() {
				uni.navigateBack({
					delta: 1
				})
			},
			goto() {
				this.$emit('gotoF')
			}
		}
	}
</script>

<style lang="less">
	.header {
		background-color: #FF9EC3;

		.top {
			height: var(--status-bar-height);
			width: 100%;
		}

		.head {
			padding: 30rpx;
			padding-top: 40rpx;
			color: #fff;
			display: flex;
			justify-content: space-between;
			align-items: center;

			image {
				&:first-child {
					width: 22rpx;
					height: 22rpx;
				}

				&:last-child {
					width: 42rpx;
					height: 42rpx;
				}
			}
		}
	}
</style>
