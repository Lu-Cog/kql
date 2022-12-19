import {
	HTTP_REQUEST_URL,
	HEADER,
	TOKENNAME
} from '@/api/app.js';

import Cache from "@/utils/cache.js"

/**
 * 发送请求
 */
function baseRequest(url, method, data, head, {
	noAuth = false,
	noVerify = false
}) {
	// let Url = 'https://kql.iqweb.net',
	let Url = 'http://kql_dev.iqweb.net',
		header = head || HEADER;

	if (!noAuth) {
		//登录过期自动登录
		if (!Cache.get('token')) {
			return Promise.reject({
				msg: '未登录'
			});
		}
	}
	
	data.token = getApp().globalData.token;
	return new Promise((reslove, reject) => {
		uni.request({
			url: Url + '/api/' + url,
			method: method || 'GET',
			header: header,
			data: data || {},
			success: (res) => {
				if (res.data.code == 200) {
					reslove(res.data, res);
				} else if ([410000, 410001, 410002, 40000].indexOf(res.data.code) !== -1) {
					reject(res.data);
				} else if (res.data.code == 501) {
					uni.reLaunch({
						url: '/pages/error/index'
					})
					reject(res.data);
				} else if(res.data.code == -200){
					uni.clearStorageSync();
					uni.showToast({
						title: res.data.msg,
						icon: 'none'
					})
					setTimeout(function(){
						uni.sendNativeEvent('loginOut', ret => {})
					},500)
				}else{
					uni.showToast({
						title: res.data.msg,
						icon: 'none'
					})
				}


			},
			fail: (message) => {
				reject('请求失败');
			}
		})
	});
}

const request = {};

['options', 'get', 'post', 'put', 'head', 'delete', 'trace', 'connect'].forEach((method) => {
	request[method] = (api, data,head, opt) => baseRequest(api, method, data,head, opt || {})
});



export default request;
