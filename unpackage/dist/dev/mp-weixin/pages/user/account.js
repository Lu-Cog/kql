(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/account"],{209:function(e,n,t){"use strict";(function(e){t(5);a(t(4));var n=a(t(210));function a(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=t,e(n.default)}).call(this,t(1)["createPage"])},210:function(e,n,t){"use strict";t.r(n);var a=t(211),o=t(213);for(var r in o)"default"!==r&&function(e){t.d(n,e,(function(){return o[e]}))}(r);t(215);var i,u=t(11),c=Object(u["default"])(o["default"],a["render"],a["staticRenderFns"],!1,null,null,null,!1,a["components"],i);c.options.__file="pages/user/account.vue",n["default"]=c.exports},211:function(e,n,t){"use strict";t.r(n);var a=t(212);t.d(n,"render",(function(){return a["render"]})),t.d(n,"staticRenderFns",(function(){return a["staticRenderFns"]})),t.d(n,"recyclableRender",(function(){return a["recyclableRender"]})),t.d(n,"components",(function(){return a["components"]}))},212:function(e,n,t){"use strict";var a;t.r(n),t.d(n,"render",(function(){return o})),t.d(n,"staticRenderFns",(function(){return i})),t.d(n,"recyclableRender",(function(){return r})),t.d(n,"components",(function(){return a}));var o=function(){var e=this,n=e.$createElement;e._self._c},r=!1,i=[];o._withStripped=!0},213:function(e,n,t){"use strict";t.r(n);var a=t(214),o=t.n(a);for(var r in a)"default"!==r&&function(e){t.d(n,e,(function(){return a[e]}))}(r);n["default"]=o.a},214:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=t(18),o=function(){t.e("components/dy-Date/dy-Date").then(function(){return resolve(t(346))}.bind(null,t)).catch(t.oe)},r={components:{dyDatePicker:o},data:function(){return{array:["男","女"],userInfo:{username:"瓦客",sex:0},avatarf:"",showTabBar:!1}},onLoad:function(){this.getUserInfo(),this.getSystemInfo()},methods:{cancelNo:function(){e.showModal({title:"提示",content:"是否確認注銷帳號？注銷后不可恢復！",success:function(n){n.confirm?(0,a.cancelNo)({}).then((function(n){e.clearStorageSync(),e.sendNativeEvent("loginOut")})):n.cancel&&console.log("用户点击取消")}})},getUserInfo:function(){var e={token:""},n=this;(0,a.getUserInfo)(e).then((function(e){n.userInfo=e.data}))},noOpen:function(){e.showToast({title:"暫未開放"})},getData:function(e){this.userInfo.birthday=e,console.log(e)},getSystemInfo:function(){var n=this;e.getSystemInfo({success:function(e){e.safeArea.top>=43&&(n.showTabBar=!0)}})},bindPickerChange:function(e){this.userInfo.sex=e.target.value},goto:function(n){e.navigateTo({url:n})},userSave:function(){var n={username:this.userInfo.username,avatar:this.avatarf,sex:this.userInfo.sex,birthday:this.userInfo.birthday};(0,a.userSave)(n).then((function(n){e.navigateBack({delta:1})}))},uploadImageOne:function(){var n=this;e.chooseImage({count:1,success:function(t){e.showLoading({title:"圖片壓縮中"}),e.compressImage({src:t.tempFilePaths[0],quality:40,success:function(t){e.showLoading({title:"圖片上傳中"}),e.uploadFile({url:"https://kql.iqweb.net/api/index/uploadImage_bd",sizeType:["compressed"],filePath:t.tempFilePath,fileType:"image",name:"Filedata",header:{"Content-Type":"multipart/form-data"},success:function(t){console.log(JSON.parse(t.data)),n.userInfo.avatar=JSON.parse(t.data).data.newfilename,n.avatarf=JSON.parse(t.data).data.uploadPath,e.hideLoading()},fail:function(n){e.hideLoading(),e.showToast({title:"上傳圖片失敗",icon:"none"})}})},fail:function(){e.hideLoading(),e.showToast({title:"圖片壓縮失敗",icon:"none"})}})}})}}};n.default=r}).call(this,t(1)["default"])},215:function(e,n,t){"use strict";t.r(n);var a=t(216),o=t.n(a);for(var r in a)"default"!==r&&function(e){t.d(n,e,(function(){return a[e]}))}(r);n["default"]=o.a},216:function(e,n,t){}},[[209,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/user/account.js.map