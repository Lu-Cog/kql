(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/distribution/appointment"],{145:function(n,e,r){"use strict";(function(n){r(5);o(r(4));var e=o(r(146));function o(n){return n&&n.__esModule?n:{default:n}}wx.__webpack_require_UNI_MP_PLUGIN__=r,n(e.default)}).call(this,r(1)["createPage"])},146:function(n,e,r){"use strict";r.r(e);var o=r(147),t=r(149);for(var u in t)"default"!==u&&function(n){r.d(e,n,(function(){return t[n]}))}(u);r(151);var i,c=r(11),a=Object(c["default"])(t["default"],o["render"],o["staticRenderFns"],!1,null,null,null,!1,o["components"],i);a.options.__file="pages/distribution/appointment.vue",e["default"]=a.exports},147:function(n,e,r){"use strict";r.r(e);var o=r(148);r.d(e,"render",(function(){return o["render"]})),r.d(e,"staticRenderFns",(function(){return o["staticRenderFns"]})),r.d(e,"recyclableRender",(function(){return o["recyclableRender"]})),r.d(e,"components",(function(){return o["components"]}))},148:function(n,e,r){"use strict";var o;r.r(e),r.d(e,"render",(function(){return t})),r.d(e,"staticRenderFns",(function(){return i})),r.d(e,"recyclableRender",(function(){return u})),r.d(e,"components",(function(){return o}));try{o={uniPopup:function(){return r.e("uni_modules/uni-popup/components/uni-popup/uni-popup").then(r.bind(null,316))}}}catch(c){if(-1===c.message.indexOf("Cannot find module")||-1===c.message.indexOf(".vue"))throw c;console.error(c.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var t=function(){var n=this,e=n.$createElement,r=(n._self._c,Number(n.orderInfo.gas_model_price)),o=Number(n.orderInfo.pail_num),t=Number(n.orderInfo.order_remnant),u=t?Number(n.orderInfo.order_remnant):null,i=t?Number(n.orderInfo.gas_model_price):null,c=t?Number(n.orderInfo.pail_num):null,a=Number(n.orderInfo.wa_coin),d=a?Number(n.orderInfo.wa_coin):null,f=n.orderInfo.freight?Number(n.orderInfo.freight):null,s=Number(n.orderInfo.pay_price);n._isMounted||(n.e0=function(e){return n.$refs.popup1.open()},n.e1=function(e){return n.$refs.popup1.close()}),n.$mp.data=Object.assign({},{$root:{m0:r,m1:o,m2:t,m3:u,m4:i,m5:c,m6:a,m7:d,m8:f,m9:s}})},u=!1,i=[];t._withStripped=!0},149:function(n,e,r){"use strict";r.r(e);var o=r(150),t=r.n(o);for(var u in o)"default"!==u&&function(n){r.d(e,n,(function(){return o[n]}))}(u);e["default"]=t.a},150:function(n,e,r){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=r(18),t={data:function(){return{order_id:"",orderInfo:{},paylist:[],cancelList:[{name:"更改送貨地址",type:1},{name:"發票/統編/載具問題",type:2},{name:"更改付款方式",type:3},{name:" 其他/下錯單",type:4}],cancelType:0}},onLoad:function(n){this.order_id=n.order_id,this.getOrderInfo(),this.getOrderConfig()},methods:{radioChange:function(n){this.cancelType=n.detail.value},getOrderConfig:function(){var n=this,e={};(0,o.getOrderConfig)(e).then((function(e){n.paylist=e.data.gtpay_type}))},orderCancel:function(){if(!this.cancelType)return n.showToast({title:"請選擇取消原因",icon:"none"});var e={cancelType:this.cancelType,order_no:this.orderInfo.order_no};(0,o.orderCancel)(e).then((function(e){setTimeout((function(){n.reLaunch({url:"/pages/index/index"})}),500)})).catch((function(e){n.showToast({title:e,icon:"none"})}))},gotoIndex:function(){n.reLaunch({url:"/pages/index/index"})},getOrderInfo:function(){var n=this,e={order_id:this.order_id,token:""};(0,o.orderInfo)(e).then((function(e){n.orderInfo=e.data}))},callPhone:function(e){n.makePhoneCall({phoneNumber:e})}}};e.default=t}).call(this,r(1)["default"])},151:function(n,e,r){"use strict";r.r(e);var o=r(152),t=r.n(o);for(var u in o)"default"!==u&&function(n){r.d(e,n,(function(){return o[n]}))}(u);e["default"]=t.a},152:function(n,e,r){}},[[145,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/distribution/appointment.js.map