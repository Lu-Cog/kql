(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/distribution/order"],{121:function(e,n,r){"use strict";(function(e){r(5);o(r(4));var n=o(r(122));function o(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=r,e(n.default)}).call(this,r(1)["createPage"])},122:function(e,n,r){"use strict";r.r(n);var o=r(123),t=r(125);for(var u in t)"default"!==u&&function(e){r.d(n,e,(function(){return t[e]}))}(u);r(127);var i,c=r(11),a=Object(c["default"])(t["default"],o["render"],o["staticRenderFns"],!1,null,null,null,!1,o["components"],i);a.options.__file="pages/distribution/order.vue",n["default"]=a.exports},123:function(e,n,r){"use strict";r.r(n);var o=r(124);r.d(n,"render",(function(){return o["render"]})),r.d(n,"staticRenderFns",(function(){return o["staticRenderFns"]})),r.d(n,"recyclableRender",(function(){return o["recyclableRender"]})),r.d(n,"components",(function(){return o["components"]}))},124:function(e,n,r){"use strict";var o;r.r(n),r.d(n,"render",(function(){return t})),r.d(n,"staticRenderFns",(function(){return i})),r.d(n,"recyclableRender",(function(){return u})),r.d(n,"components",(function(){return o}));try{o={uniPopup:function(){return r.e("uni_modules/uni-popup/components/uni-popup/uni-popup").then(r.bind(null,316))}}}catch(c){if(-1===c.message.indexOf("Cannot find module")||-1===c.message.indexOf(".vue"))throw c;console.error(c.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var t=function(){var e=this,n=e.$createElement,r=(e._self._c,Number(e.orderInfo.gas_model_price)),o=Number(e.orderInfo.pail_num),t=Number(e.orderInfo.order_remnant),u=t?Number(e.orderInfo.order_remnant):null,i=t?Number(e.orderInfo.gas_model_price):null,c=t?Number(e.orderInfo.pail_num):null,a=Number(e.orderInfo.wa_coin),d=a?Number(e.orderInfo.wa_coin):null,f=e.orderInfo.freight?Number(e.orderInfo.freight):null,s=Number(e.orderInfo.pay_price);e._isMounted||(e.e0=function(n){return e.$refs.popup1.open()},e.e1=function(n){return e.$refs.popup1.close()}),e.$mp.data=Object.assign({},{$root:{m0:r,m1:o,m2:t,m3:u,m4:i,m5:c,m6:a,m7:d,m8:f,m9:s}})},u=!1,i=[];t._withStripped=!0},125:function(e,n,r){"use strict";r.r(n);var o=r(126),t=r.n(o);for(var u in o)"default"!==u&&function(e){r.d(n,e,(function(){return o[e]}))}(u);n["default"]=t.a},126:function(e,n,r){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=r(18),t={data:function(){return{order_id:"",orderInfo:{service_time:""},paylist:[],cancelList:[{name:"更改送貨地址",type:1},{name:"發票/統編/載具問題",type:2},{name:"更改付款方式",type:3},{name:" 其他/下錯單",type:4}],cancelType:0}},onLoad:function(e){this.order_id=e.order_id,this.getOrderInfo(),this.getOrderConfig()},methods:{radioChange:function(e){this.cancelType=e.detail.value},getOrderConfig:function(){var e=this,n={};(0,o.getOrderConfig)(n).then((function(n){e.paylist=n.data.gtpay_type}))},orderCancel:function(){if(!this.cancelType)return e.showToast({title:"請選擇取消原因",icon:"none"});var n={cancelType:this.cancelType,order_no:this.orderInfo.order_no};(0,o.orderCancel)(n).then((function(n){setTimeout((function(){e.reLaunch({url:"/pages/index/index"})}),500)})).catch((function(n){e.showToast({title:n,icon:"none"})}))},gotoIndex:function(){e.reLaunch({url:"/pages/index/index"})},getOrderInfo:function(){var e=this,n={order_id:this.order_id};(0,o.orderInfo)(n).then((function(n){e.orderInfo=n.data}))},callPhone:function(n){e.makePhoneCall({phoneNumber:n})}}};n.default=t}).call(this,r(1)["default"])},127:function(e,n,r){"use strict";r.r(n);var o=r(128),t=r.n(o);for(var u in o)"default"!==u&&function(e){r.d(n,e,(function(){return o[e]}))}(u);n["default"]=t.a},128:function(e,n,r){}},[[121,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/distribution/order.js.map