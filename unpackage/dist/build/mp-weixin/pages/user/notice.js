(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/notice"],{"060b":function(t,n,e){},"1ffe":function(t,n,e){"use strict";var u=e("060b"),a=e.n(u);a.a},"4d76":function(t,n,e){"use strict";e.r(n);var u=e("6b4f"),a=e("f2df");for(var o in a)"default"!==o&&function(t){e.d(n,t,(function(){return a[t]}))}(o);e("1ffe");var c,f=e("f0c5"),i=Object(f["a"])(a["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],c);n["default"]=i.exports},"6b4f":function(t,n,e){"use strict";var u;e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return o})),e.d(n,"a",(function(){return u}));var a=function(){var t=this,n=t.$createElement;t._self._c},o=[]},"895d":function(t,n,e){"use strict";(function(t){e("5238");u(e("66fd"));var n=u(e("4d76"));function u(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},"9aa0":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u=e("7a26"),a={data:function(){return{noticelist:[]}},onLoad:function(){this.getNotice()},methods:{getNotice:function(){var t=this,n={token:""};(0,u.getNotice)(n).then((function(n){t.noticelist=n.data?n.data:[]}))},goto:function(n){t.navigateTo({url:n})}}};n.default=a}).call(this,e("543d")["default"])},f2df:function(t,n,e){"use strict";e.r(n);var u=e("9aa0"),a=e.n(u);for(var o in u)"default"!==o&&function(t){e.d(n,t,(function(){return u[t]}))}(o);n["default"]=a.a}},[["895d","common/runtime","common/vendor"]]]);