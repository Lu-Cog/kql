(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/memberBar"],{161:function(n,e,t){"use strict";(function(n){t(5);o(t(4));var e=o(t(162));function o(n){return n&&n.__esModule?n:{default:n}}wx.__webpack_require_UNI_MP_PLUGIN__=t,n(e.default)}).call(this,t(1)["createPage"])},162:function(n,e,t){"use strict";t.r(e);var o=t(163),i=t(165);for(var a in i)"default"!==a&&function(n){t.d(e,n,(function(){return i[n]}))}(a);t(167);var r,c=t(11),u=Object(c["default"])(i["default"],o["render"],o["staticRenderFns"],!1,null,null,null,!1,o["components"],r);u.options.__file="pages/user/memberBar.vue",e["default"]=u.exports},163:function(n,e,t){"use strict";t.r(e);var o=t(164);t.d(e,"render",(function(){return o["render"]})),t.d(e,"staticRenderFns",(function(){return o["staticRenderFns"]})),t.d(e,"recyclableRender",(function(){return o["recyclableRender"]})),t.d(e,"components",(function(){return o["components"]}))},164:function(n,e,t){"use strict";var o;t.r(e),t.d(e,"render",(function(){return i})),t.d(e,"staticRenderFns",(function(){return r})),t.d(e,"recyclableRender",(function(){return a})),t.d(e,"components",(function(){return o}));var i=function(){var n=this,e=n.$createElement;n._self._c},a=!1,r=[];i._withStripped=!0},165:function(n,e,t){"use strict";t.r(e);var o=t(166),i=t.n(o);for(var a in o)"default"!==a&&function(n){t.d(e,n,(function(){return o[n]}))}(a);e["default"]=i.a},166:function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=t(18),i=function(){t.e("components/header/header").then(function(){return resolve(t(339))}.bind(null,t)).catch(t.oe)},a={components:{Header:i},data:function(){return{makecode:"",shareinfo:"",downloadinfo:"",openCamerainfo:"",Invitation_link:""}},onLoad:function(n){this.makecode=n.makecode,this.getUserInfo()},onShow:function(){var e=this;n.onNativeEventReceive((function(n,t){"share"==n?e.shareinfo=t:"download"==n?e.downloadinfo=t:"scanResult"==n&&(e.openCamerainfo=t)}))},methods:{copy:function(){var e=this;n.setClipboardData({data:e.Invitation_link,success:function(){n.showToast({title:"複製成功",icon:"none"})},fail:function(){n.showToast({title:"複製失敗",icon:"none"})}})},share:function(){n.sendNativeEvent("share",{img:this.makecode,linkUrl:this.Invitation_link})},download:function(){n.sendNativeEvent("download",{img:this.makecode})},scanCode:function(){var e=this;n.sendNativeEvent("openCamera",{img:e.makecode,linkUrl:e.Invitation_link})},getUserInfo:function(){var n={token:""},e=this;(0,o.getUserInfo)(n).then((function(n){e.makecode=n.data.makecode,e.Invitation_link=n.data.Invitation_link}))},saveImg:function(e){var t=this;n.downloadFile({url:e,success:function(e){200===e.statusCode?n.saveImageToPhotosAlbum({filePath:e.tempFilePath,success:function(){this.tools.toast("保存成功")},fail:function(){this.tools.toast("保存失败，请稍后重试")}}):t.tools.toast("下载失败")}})}}};e.default=a}).call(this,t(1)["default"])},167:function(n,e,t){"use strict";t.r(e);var o=t(168),i=t.n(o);for(var a in o)"default"!==a&&function(n){t.d(e,n,(function(){return o[n]}))}(a);e["default"]=i.a},168:function(n,e,t){}},[[161,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/user/memberBar.js.map