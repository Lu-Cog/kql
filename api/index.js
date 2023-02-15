import request from "@/api/request.js";

/**
 * 获取用户信息
 *
 */
export function getUserInfo(data) {
  return request.get("index/getUserInfo",data,{noAuth : true});
}

/**
 *图片上传
 *
 */
export function uploadImage(data) {
  return request.post("index/uploadImage_bd",data,{noAuth : true});
}

/**
 *修改信息
 *
 */
export function userSave(data) {
  return request.get("index/userSave",data,{noAuth : true});
}

/**
 * 修改密码
 *
 */
export function updatePwd(data) {
  return request.get("index/rider_password_update",data);
}

/**
 *我的會員
 *
 */
export function myMembersList(data) {
  return request.get("index/myMembersList",data,{noAuth : true});
}

/**
 *提交訂單
 *
 */
export function orderCreate(data) {
  return request.get("order/order_create",data,{noAuth : true});
}

/**
 *取消訂單
 *
 */
export function orderCancel(data) {
  return request.get("order/order_cancel",data,{noAuth : true});
}

/**
 *提交訂單
 *
 */
export function getPreTime(data) {
  return request.get("order/get_pre_time",data,{noAuth : true});
}

/**
 * 訂單列表
 *
 */
export function orderList(data) {
  return request.get("order/order_list",data,{noAuth : true});
}

/**
 * 訂單詳情
 *
 */
export function orderInfo(data) {
  return request.get("order/order_info",data,{noAuth : true});
}

/**
 * hongbao 
 *
 */
export function getPrize(data) {
  return request.get("order/get_prize",data,{noAuth : true});
}

/**
 * hongbao 
 *
 */
export function redPacket(data) {
  return request.get("order/red_packet",data,{noAuth : true});
}

/**
 * 余氣
 *
 */
export function remnantlist(data) {
  return request.get("index/remnant_list",data,{noAuth : true});
}

/**
 * 瓦幣
 *
 */
export function waCoinList(data) {
  return request.get("index/wa_coin_list",data,{noAuth : true});
}
/**
 * 押金
 *
 */
export function yPriceList(data) {
  return request.get("index/goldPressingList",data,{noAuth : true});
}

/**
 * 计算押金
 *
 */
export function goldPressing(data) {
  return request.get("order/gold_pressing",data,{noAuth : true});
}
/**
 * 贈送瓦幣
 *
 */
export function getGiving(data) {
  return request.get("index/giving",data,{noAuth : true});
}

/**
 * 贈送瓦幣
 *
 */
export function articleList(data) {
  return request.get("article/article_list",data,{noAuth : true});
}

/**
 * 贈送瓦幣
 *
 */
export function articleDetail(data) {
  return request.get("article/article_detail",data,{noAuth : true});
}

export function articleDetailJ(id) {
  return request.get("article/detail_json?article_id="+id,{},{noAuth : true});
}


/**
 * 地址管理
 *
 */
export function addressList(data) {
  return request.get("address/address_list",data,{noAuth : true});
}

/**
 * 臺灣地址列表
 *
 */
export function areaList(data) {
  return request.get("address/area_list",data,{noAuth : true});
}

/**
 * 添加修改地址
 *
 */
export function addressAdd(data) {
  return request.get("address/address_add",data,{noAuth : true});
}

/**
 * 地址詳情
 *
 */
export function addressAddInfo(data) {
  return request.get("address/get_address_info",data,{noAuth : true});
}

/**
 * 删除地址
 *
 */
export function addressDelete(data) {
  return request.get("address/address_delete",data,{noAuth : true});
}

/**
 * 余气兑换瓦币
 *
 */
export function getToWacoin(data) {
  return request.get("index/remnant_to_wa_coin",data,{noAuth : true});
}

/**
 * 默認地址
 *
 */
export function getDefaultAddress(data) {
  return request.get("address/get_default_address",data,{noAuth : true});
}

/**
 * 消息通知
 *
 */
export function getNotice(data) {
  return request.get("index/notice",data,{noAuth : true});
}

/**
 * 首頁消息通知
 *
 */
export function getHomeArticle(data) {
  return request.get("article/home_article_list",data,{noAuth : true});
}

/**
 * 获取订单配置
 *
 */
export function getOrderConfig(data) {
  return request.get("order/order_config",data);
}
export function gethoinConfig(data) {
  return request.get("hoin_pay/order_config",data);
}
/**
 * 綁定
 *
 */
export function bind(data) {
  return request.get("index/binding",data);
}

/**
 * 驗證碼
 *
 */
export function sendCode(data) {
  return request.post("index/sendCode",data);
}

/**
 * 驗證驗證碼
 *
 */
export function checkCode(data) {
  return request.post("index/checkCode",data);
}

export function gtpay(data) {
  return request.get("order/gtpay_order",data);
}

export function hoinPay(data) {
	// let head = {
	// 	'content-type': 'multipart/form-data; boundary=<calculated when request is sent>'
	// }
  return request.get("hoin_pay/order_create",data);
}


export function hoinPayInfo(data) {
  return request.get("hoin_pay/get_order",data);
}

export function memberAdd(data) {
  return request.get("member/memberAdd",data);
}

export function memberOrder(data) {
  return request.get("member/get_order",data);
}

/**
 *賬戶註銷
 *
 */
export function cancelNo(data) {
  return request.get("index/cancel",data,{noAuth : true});
}


/**
 *特约店家列表
 *
 */
export function guestshops(data) {
  return request.get("index/guestshops",data,{noAuth : true});
}