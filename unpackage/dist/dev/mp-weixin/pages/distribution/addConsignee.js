(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/distribution/addConsignee"],{137:function(t,e,n){"use strict";(function(t){n(5);i(n(4));var e=i(n(138));function i(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n(1)["createPage"])},138:function(t,e,n){"use strict";n.r(e);var i=n(139),s=n(141);for(var d in s)"default"!==d&&function(t){n.d(e,t,(function(){return s[t]}))}(d);n(143);var a,r=n(11),o=Object(r["default"])(s["default"],i["render"],i["staticRenderFns"],!1,null,null,null,!1,i["components"],a);o.options.__file="pages/distribution/addConsignee.vue",e["default"]=o.exports},139:function(t,e,n){"use strict";n.r(e);var i=n(140);n.d(e,"render",(function(){return i["render"]})),n.d(e,"staticRenderFns",(function(){return i["staticRenderFns"]})),n.d(e,"recyclableRender",(function(){return i["recyclableRender"]})),n.d(e,"components",(function(){return i["components"]}))},140:function(t,e,n){"use strict";var i;n.r(e),n.d(e,"render",(function(){return s})),n.d(e,"staticRenderFns",(function(){return a})),n.d(e,"recyclableRender",(function(){return d})),n.d(e,"components",(function(){return i}));var s=function(){var t=this,e=t.$createElement;t._self._c},d=!1,a=[];s._withStripped=!0},141:function(t,e,n){"use strict";n.r(e);var i=n(142),s=n.n(i);for(var d in i)"default"!==d&&function(t){n.d(e,t,(function(){return i[t]}))}(d);e["default"]=s.a},142:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=n(18),s=function(){n.e("components/header/header").then(function(){return resolve(n(339))}.bind(null,n)).catch(n.oe)},d={components:{Header:s},data:function(){return{arealist:[],showTabBar:!1,index:0,index1:0,itemslist:[],city_id:"",country_id:"",name:"",address:"",telephone:"",address_id:""}},onLoad:function(t){this.address_id=t.address_id,this.getSystemInfo(),this.getAreaList()},onShow:function(){this.getAreaList()},methods:{getSystemInfo:function(){var e=this;t.getSystemInfo({success:function(t){t.safeArea.top>=43&&(e.showTabBar=!0)}})},gotoF:function(){if(console.log(this.address_id),this.address_id){var e={id:this.address_id};t.showModal({title:"提示",content:"確認刪除？",success:function(n){n.confirm?(0,i.addressDelete)(e).then((function(e){t.navigateBack({delta:1})})).catch((function(e){t.showToast({title:e,icon:"none"})})):n.cancel&&console.log("用户点击取消")}})}},keep:function(){var e={address_id:this.address_id,city_id:this.city_id,country_id:this.country_id,name:this.name,address:this.address,telephone:this.telephone};(0,i.addressAdd)(e).then((function(e){t.navigateBack({delta:1})})).catch((function(e){t.showToast({title:e,icon:"none"})}))},changeCountry:function(t){this.index1=t.target.value,this.country_id=this.itemslist[this.index1].id},changeCity:function(t){this.index=t.target.value,this.itemslist=this.arealist[this.index].items,this.index1=0,this.city_id=this.arealist[this.index].id,this.country_id=this.itemslist[this.index1].id},getAreaList:function(){var t=this,e=this,n={};(0,i.areaList)(n).then((function(n){if(t.arealist=n.data,t.itemslist=t.arealist[t.index].items,t.city_id=t.arealist[t.index].id,t.country_id=t.itemslist[t.index1].id,t.address_id){var s={address_id:t.address_id};(0,i.addressAddInfo)(s).then((function(n){t.city_id=n.data.city_id,t.country_id=n.data.country_id,t.arealist.forEach((function(t){t.id==e.city_id&&(e.index=e.arealist.indexOf(t))})),t.itemslist=t.arealist[e.index].items,t.itemslist.forEach((function(t){t.id==e.country_id&&(e.index1=e.itemslist.indexOf(t))})),t.address=n.data.address,t.name=n.data.name,t.telephone=n.data.telephone}))}}))}}};e.default=d}).call(this,n(1)["default"])},143:function(t,e,n){"use strict";n.r(e);var i=n(144),s=n.n(i);for(var d in i)"default"!==d&&function(t){n.d(e,t,(function(){return i[t]}))}(d);e["default"]=s.a},144:function(t,e,n){}},[[137,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/distribution/addConsignee.js.map