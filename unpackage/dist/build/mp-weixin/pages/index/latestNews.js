(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/latestNews"],{"76e6":function(t,n,e){"use strict";var i;e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return c})),e.d(n,"a",(function(){return i}));var a=function(){var t=this,n=t.$createElement;t._self._c},c=[]},"89f1":function(t,n,e){"use strict";var i=e("d631"),a=e.n(i);a.a},"97c6":function(t,n,e){"use strict";(function(t){e("5238");i(e("66fd"));var n=i(e("f55a"));function i(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},b2c4:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=e("7a26"),a={data:function(){return{action:1,newslist:[]}},onLoad:function(){this.getArticleList()},methods:{goto:function(n){t.navigateTo({url:n})},chageBar:function(t){this.action=t,this.getArticleList},getArticleList:function(){var t=this,n={cate_id:this.action,page_index:1,page_size:10};(0,i.articleList)(n).then((function(n){t.newslist=n.data}))}}};n.default=a}).call(this,e("543d")["default"])},d631:function(t,n,e){},e874:function(t,n,e){"use strict";e.r(n);var i=e("b2c4"),a=e.n(i);for(var c in i)"default"!==c&&function(t){e.d(n,t,(function(){return i[t]}))}(c);n["default"]=a.a},f55a:function(t,n,e){"use strict";e.r(n);var i=e("76e6"),a=e("e874");for(var c in a)"default"!==c&&function(t){e.d(n,t,(function(){return a[t]}))}(c);e("89f1");var u,o=e("f0c5"),r=Object(o["a"])(a["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],u);n["default"]=r.exports}},[["97c6","common/runtime","common/vendor"]]]);