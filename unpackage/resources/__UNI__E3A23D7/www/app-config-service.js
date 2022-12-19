
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/user/user","pages/user/transfer","pages/user/success","pages/user/redEnvelopes","pages/residual/residual","pages/residual/exchange","pages/distribution/distribution","pages/distribution/time","pages/distribution/coupon","pages/distribution/rules","pages/distribution/Information","pages/distribution/loading","pages/distribution/order","pages/distribution/consignee","pages/distribution/addConsignee","pages/distribution/appointment","pages/user/wacoin","pages/user/memberBar","pages/user/order","pages/user/orderDetails","pages/user/myMembers","pages/user/notice","pages/user/noticeInfo","pages/user/account","pages/user/password","pages/distribution/complete","pages/index/latestNews","pages/index/productInformation","pages/user/help","pages/index/bind","pages/index/webview","pages/distribution/webView","pages/index/pay","pages/index/paySuccess"],"window":{"navigationBarTitleText":"扛氣來","backgroundColor":"#F8F8F8","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#FF9EC3"},"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"扛氣來","compilerVersion":"3.6.4","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true},"window":{"navigationBarTitleText":"首頁"}},{"path":"/pages/user/user","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationBarTextStyle":"white","navigationBarBackgroundColor":"#FF9EC3","navigationStyle":"custom"}},{"path":"/pages/user/transfer","meta":{},"window":{"navigationBarTitleText":"瓦幣會員轉贈","enablePullDownRefresh":false,"navigationBarTextStyle":"white","navigationBarBackgroundColor":"#FF9EC3"}},{"path":"/pages/user/success","meta":{},"window":{"navigationBarTitleText":"瓦幣會員轉贈","enablePullDownRefresh":false,"navigationBarTextStyle":"white","navigationBarBackgroundColor":"#FF9EC3"}},{"path":"/pages/user/redEnvelopes","meta":{},"window":{"navigationBarTitleText":"紅包三選一","enablePullDownRefresh":false}},{"path":"/pages/residual/residual","meta":{},"window":{"navigationBarTitleText":"餘氣撲滿","enablePullDownRefresh":false,"navigationBarTextStyle":"white","navigationBarBackgroundColor":"#FF9EC3"}},{"path":"/pages/residual/exchange","meta":{},"window":{"navigationBarTitleText":"瓦幣兌換","enablePullDownRefresh":false}},{"path":"/pages/distribution/distribution","meta":{},"window":{"navigationBarTitleText":"配送服務","enablePullDownRefresh":false}},{"path":"/pages/distribution/time","meta":{},"window":{"navigationBarTitleText":"預約時間","enablePullDownRefresh":false}},{"path":"/pages/distribution/coupon","meta":{},"window":{"navigationBarTitleText":"優惠券","enablePullDownRefresh":false}},{"path":"/pages/distribution/rules","meta":{},"window":{"navigationBarTitleText":"使用規則","enablePullDownRefresh":false}},{"path":"/pages/distribution/Information","meta":{},"window":{"navigationBarTitleText":"訂單資訊","enablePullDownRefresh":false}},{"path":"/pages/distribution/loading","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/distribution/order","meta":{},"window":{"navigationBarTitleText":"您的訂單","enablePullDownRefresh":false}},{"path":"/pages/distribution/consignee","meta":{},"window":{"navigationBarTitleText":"常用收貨人資訊","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/distribution/addConsignee","meta":{},"window":{"navigationBarTitleText":"新增收貨人","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/distribution/appointment","meta":{},"window":{"navigationBarTitleText":"您的訂單","enablePullDownRefresh":false}},{"path":"/pages/user/wacoin","meta":{},"window":{"navigationBarTitleText":"我的瓦幣","enablePullDownRefresh":false}},{"path":"/pages/user/memberBar","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/user/order","meta":{},"window":{"navigationBarTitleText":"我的訂單","enablePullDownRefresh":false}},{"path":"/pages/user/orderDetails","meta":{},"window":{"navigationBarTitleText":"訂單詳情","enablePullDownRefresh":false}},{"path":"/pages/user/myMembers","meta":{},"window":{"navigationBarTitleText":"我的會員","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/user/notice","meta":{},"window":{"navigationBarTitleText":"通知","enablePullDownRefresh":false}},{"path":"/pages/user/noticeInfo","meta":{},"window":{"navigationBarTitleText":"通知詳情","enablePullDownRefresh":false}},{"path":"/pages/user/account","meta":{},"window":{"navigationBarTitleText":"帳號設定","enablePullDownRefresh":false}},{"path":"/pages/user/password","meta":{},"window":{"navigationBarTitleText":"變更密碼","enablePullDownRefresh":false}},{"path":"/pages/distribution/complete","meta":{},"window":{"navigationBarTitleText":"完成訂單","enablePullDownRefresh":false}},{"path":"/pages/index/latestNews","meta":{},"window":{"navigationBarTitleText":"最新消息","enablePullDownRefresh":false}},{"path":"/pages/index/productInformation","meta":{},"window":{"navigationBarTitleText":"產品訊息","enablePullDownRefresh":false}},{"path":"/pages/user/help","meta":{},"window":{"navigationBarTitleText":"幫助中心","enablePullDownRefresh":false}},{"path":"/pages/index/bind","meta":{},"window":{"navigationBarTitleText":"綁定","enablePullDownRefresh":false}},{"path":"/pages/index/webview","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/distribution/webView","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/index/pay","meta":{},"window":{"navigationBarTitleText":"HOIN PAY 付款系統","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#ffffff","navigationBarTextStyle":"black"}},{"path":"/pages/index/paySuccess","meta":{},"window":{"navigationBarTitleText":"支付結果","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#ffffff","navigationBarTextStyle":"black"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
