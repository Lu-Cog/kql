(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/jinjie-tabBar/jinjie-tabBar"],{323:function(t,e,n){"use strict";n.r(e);var a=n(324),i=n(326);for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);n(328);var s,u=n(11),c=Object(u["default"])(i["default"],a["render"],a["staticRenderFns"],!1,null,null,null,!1,a["components"],s);c.options.__file="components/jinjie-tabBar/jinjie-tabBar.vue",e["default"]=c.exports},324:function(t,e,n){"use strict";n.r(e);var a=n(325);n.d(e,"render",(function(){return a["render"]})),n.d(e,"staticRenderFns",(function(){return a["staticRenderFns"]})),n.d(e,"recyclableRender",(function(){return a["recyclableRender"]})),n.d(e,"components",(function(){return a["components"]}))},325:function(t,e,n){"use strict";var a;n.r(e),n.d(e,"render",(function(){return i})),n.d(e,"staticRenderFns",(function(){return s})),n.d(e,"recyclableRender",(function(){return r})),n.d(e,"components",(function(){return a}));var i=function(){var t=this,e=t.$createElement;t._self._c},r=!1,s=[];i._withStripped=!0},326:function(t,e,n){"use strict";n.r(e);var a=n(327),i=n.n(a);for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);e["default"]=i.a},327:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={props:{tabIndex:{default:0}},data:function(){return{tabList:[{iconPath:"../../static/img/1132.png",selectedIconPath:"../../static/img/11321.png",text:"首頁",pagePath:"/pages/index/index",middleClass:"left"},{iconPath:"../../static/img/2086.png",selectedIconPath:"../../static/img/4951.png",text:"餘氣撲滿",pagePath:"/pages/residual/residual",middleClass:""},{iconPath:"../../static/img/4721.png",selectedIconPath:"../../static/img/472.png",text:"我的",pagePath:"/pages/user/user",middleClass:"right"}],showTabBar:!1,showMiddleButton:!1}},computed:{getHeight:function(){return Number(this.height)}},mounted:function(){this.getSystemInfo(),this.setTabBar()},methods:{setTabBar:function(){var t=this.tabList.length;if(t%2){this.showMiddleButton=!0;var e=Math.floor(t/2);this.tabList[e].middleClass="mid-button"}},handlePush:function(e,n){var a=getCurrentPages();this.tabIndex!=n&&(0==n?a.length>1?t.navigateBack({delta:a.length-1}):t.reLaunch({url:e.pagePath}):a.length>2?t.navigateBack({delta:1}):t.navigateTo({url:e.pagePath}))},getSystemInfo:function(){var e=this;t.getSystemInfo({success:function(t){t.safeArea.top>=43&&(e.showTabBar=!0)}})}}};e.default=n}).call(this,n(1)["default"])},328:function(t,e,n){"use strict";n.r(e);var a=n(329),i=n.n(a);for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);e["default"]=i.a},329:function(t,e,n){}}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/jinjie-tabBar/jinjie-tabBar.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/jinjie-tabBar/jinjie-tabBar-create-component',
    {
        'components/jinjie-tabBar/jinjie-tabBar-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(323))
        })
    },
    [['components/jinjie-tabBar/jinjie-tabBar-create-component']]
]);
