(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{245:function(t,e,r){var content=r(258);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(10).default)("cc5c1dac",content,!0,{sourceMap:!1})},246:function(t,e,r){var content=r(264);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(10).default)("18c61df0",content,!0,{sourceMap:!1})},247:function(t,e,r){var content=r(266);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(10).default)("4917e514",content,!0,{sourceMap:!1})},248:function(t,e,r){var content=r(268);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(10).default)("463aa360",content,!0,{sourceMap:!1})},250:function(t,e,r){var content=r(278);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(10).default)("6c6c4052",content,!0,{sourceMap:!1})},251:function(t,e,r){var content=r(280);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(10).default)("c68e16f4",content,!0,{sourceMap:!1})},257:function(t,e,r){"use strict";var n=r(245);r.n(n).a},258:function(t,e,r){(t.exports=r(9)(!1)).push([t.i,".f-tab[data-v-7e37b802]{width:100vw;background-color:#8e75ae;height:50px}.f-tab[data-v-7e37b802],.f-tab__tabs[data-v-7e37b802]{display:grid;justify-items:center}.f-tab__tabs[data-v-7e37b802]{position:relative}.f-tab__tab-item[data-v-7e37b802]{border-bottom:5px solid transparent;display:grid;justify-items:center;-webkit-box-align:center;align-items:center;margin:0 5px;width:80%}.f-tab__tab-item[data-v-7e37b802]:first-child{width:100%;background-color:#55287e}.f-tab__tabs:hover .f-tab__tab-item.active[data-v-7e37b802]{border-bottom-color:transparent}.f-tab__tabs .f-tab__tab-item.active[data-v-7e37b802],.f-tab__tabs .f-tab__tab-item[data-v-7e37b802]:hover,.f-tab__tabs:hover .f-tab__tab-item.active[data-v-7e37b802]:hover{border-bottom-color:#55287e}.f-tab__tab-item *[data-v-7e37b802]{color:#fff;text-decoration:none;font-size:20px;font-weight:600}.f-tab__tab-item a[data-v-7e37b802]{width:100%;height:100%;display:grid;justify-items:center;-webkit-box-align:center;align-items:center}.f-tab.fixed[data-v-7e37b802]{box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12);position:fixed;top:86px;z-index:999}.bottom-hovery[data-v-7e37b802]{position:absolute;width:100px;height:5px;border-bottom-color:#55287e;bottom:0}",""])},260:function(t,e,r){"use strict";var n={props:{title:{type:String,default:"Page"},link:{type:String,default:void 0},tabs:{type:Array,default:function(){return[]}},fixed:{type:Boolean,default:!0},from:{type:String,default:""}},computed:{tabStyles:function(){return{"grid-template-columns":"repeat(".concat(this.tabs.length+1,", 120px)")}}},methods:{mouseOver:function(t){}}},o=(r(257),r(4)),component=Object(o.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{class:["f-tab",t.fixed?"fixed":""]},[t.title?r("div",{staticClass:"f-tab__tabs",style:t.tabStyles},[t._l([{title:t.title,link:t.link}].concat(t.tabs),(function(e,n){return r("div",{key:n,class:["f-tab__tab-item",e.active?"active":""],on:{mouseover:function(e){return t.mouseOver(n)}}},[e.link?r("nuxt-link",{attrs:{to:e.link}},[r("div",[t._v(t._s(e.title?e.title:t.$t("_tabs."+t.from+"."+e.type)))])]):r("div",[t._v(t._s(e.title))])],1)})),t._v(" "),r("div",{staticClass:"bottom-hovery"})],2):t._e(),t._v(" "),t._t("default")],2)}),[],!1,null,"7e37b802",null);e.a=component.exports},261:function(t,e,r){"use strict";var n={props:{text:{type:String,default:"Title"},icon:{type:Boolean,default:!1},to:{type:String,default:"#"},backgroundColor:{type:String,default:"#fafafa"},tab:{type:Boolean,default:!1},secondText:{type:String,default:"Title-2"},secondTo:{type:String,default:"#"}},data:function(){return{fontSize:20,lineHeight:0,contentLeftMargin:10,contentRightMargin:38}},computed:{whiteBarHeight:function(){return this.height-this.lineHeight},height:function(){return this.fontSize+this.fontSize},contentMargin:function(){return this.contentLeftMargin+this.contentRightMargin},titleWidth:function(){return this.fontSize*this.text.length+this.contentMargin},svgStyles:function(){return{left:"".concat(this.titleWidth,"px"),height:"".concat(this.height,"px")}},svgStyles2:function(){return{left:"".concat(2*this.titleWidth+20,"px"),height:"".concat(this.height,"px")}},rectangleStyles:function(){return{width:"".concat(this.titleWidth+30,"px"),height:"".concat(this.height,"px"),"background-color":this.backgroundColor}},rectangleStyles2:function(){return{left:"".concat(this.titleWidth+30,"px"),width:"".concat(this.titleWidth+20,"px"),height:"".concat(this.height,"px"),"background-color":"purple"}},backgroundStyles:function(){return{height:"".concat(this.height,"px")}},maskStyles:function(){return{left:"".concat(this.titleWidth+20,"px"),height:"".concat(this.height,"px")}},contentStyles:function(){return{"font-size":"".concat(this.fontSize,"px"),padding:"5px ".concat(this.contentRightMargin,"px 0px ").concat(this.contentLeftMargin,"px")}},contentStyles2:function(){return{"font-size":"".concat(this.fontSize,"px"),padding:"5px ".concat(this.contentRightMargin,"px 0px ").concat(this.titleWidth+this.contentLeftMargin+30,"px")}},barStyles:function(){return{height:"".concat(this.height+3,"px")}}},mounted:function(){this.$emit("click","tab-1")}},o=(r(265),r(4)),c={components:{FBlockBoxTitle:Object(o.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"f-block-box-title"},[r("div",{staticClass:"bar",style:t.barStyles},[r("div",{staticClass:"background",style:t.backgroundStyles}),t._v(" "),r("div",{staticClass:"mask",style:t.maskStyles}),t._v(" "),r("div",{staticClass:"rectangle",style:t.rectangleStyles}),t._v(" "),t.tab?r("div",{staticClass:"rectangle second",style:t.rectangleStyles2}):t._e(),t._v(" "),r("svg",{staticClass:"triangle",style:t.svgStyles,attrs:{viewBox:"0 0 80 100",preserveAspectRatio:"none"}},[r("path",{attrs:{d:"M80,100\n         L80,0\n         C30,5 50,95 0,100z",fill:t.tab?"url(#Gradient2)":t.backgroundColor}}),t._v(" "),r("defs",[r("linearGradient",{attrs:{id:"Gradient2",x1:"0",x2:"0",y1:"0",y2:"1"}},[r("stop",{attrs:{offset:"41%","stop-color":"purple"}}),t._v(" "),r("stop",{attrs:{offset:"100%","stop-color":"#66448e"}})],1)],1)]),t._v(" "),r("div",{staticClass:"content",style:t.contentStyles,on:{click:function(e){return t.$emit("click","tab-1")}}},[r("div",[t._v(t._s(t.text))])]),t._v(" "),t.tab?r("svg",{staticClass:"triangle",style:t.svgStyles2,attrs:{viewBox:"0 0 80 100",preserveAspectRatio:"none"}},[r("path",{attrs:{d:"M80,100\n         L80,0\n         C30,5 50,95 0,100z",fill:t.backgroundColor}})]):t._e(),t._v(" "),t.tab?r("div",{staticClass:"content second",style:t.contentStyles2,on:{click:function(e){return t.$emit("click","tab-2")}}},[r("div",[t._v(t._s(t.secondText))])]):t._e()])])}),[],!1,null,"75c8b15b",null).exports},props:{title:{type:String,default:"Title"},backgroundColor:{type:String,default:"#fafafa"},tab:{type:Boolean,default:!1},secondTitle:{type:String,default:"Title-2"},secondTo:{type:String,default:"#"}}},l=(r(267),Object(o.a)(c,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"f-block-box"},[r("f-block-box-title",{attrs:{"background-color":t.backgroundColor,text:t.title,"second-text":t.secondTitle,tab:t.tab},on:{click:function(e){return t.$emit("click",e)}}}),t._v(" "),r("div",{staticClass:"content"},[t._t("default")],2)],1)}),[],!1,null,"23eb7892",null));e.a=l.exports},262:function(t){t.exports=JSON.parse('[{"name":"魔卡幻想","src":"/ads/魔卡幻想.jpg","link":"http://wan.ali213.net/play/game.html?gid=2&serverid=152&user=28&comefrm=alisy"},{"name":"龙权天下","src":"/ads/龙权天下.jpg","link":"http://wan.ali213.net/play/game.html?gid=40&serverid=48&user=711&comefrm=alisy"},{"name":"魔域","src":"/ads/魔域.jpg","link":"http://act.17173.com/os/2019/12/my1217/"},{"name":"不败传说","src":"/ads/不败传说.jpg","link":"http://bbcs.ixinyou.com/act/ad06/?ext=20061"},{"name":"新倩女幽魂","src":"/ads/新倩女幽魂.jpg","link":"http://act.17173.com/os/2019/12/xqnyh1227/"},{"name":"鬼谷无双","src":"/ads/鬼谷无双.jpg","link":"http://ggws.ixinyou.com/?ext=00002"},{"name":"不败传说-2","src":"/ads/不败传说-2.jpg","link":"http://bbcs.ixinyou.com/act/ad01/?ext=00002"},{"name":"不思议地下城","src":"/ads/不思议地下城.jpeg","link":"https://game.stargame.com/play/startgame?id=614"},{"name":"御龙传奇至尊版","src":"/ads/御龙传奇至尊版.jpg","link":"http://sy.duowan.com/game/89563.html"}]')},263:function(t,e,r){"use strict";var n=r(246);r.n(n).a},264:function(t,e,r){(t.exports=r(9)(!1)).push([t.i,".f-temp-ad[data-v-f32e1344],.f-temp-ad img[data-v-f32e1344]{width:20vw}",""])},265:function(t,e,r){"use strict";var n=r(247);r.n(n).a},266:function(t,e,r){(t.exports=r(9)(!1)).push([t.i,".bar[data-v-75c8b15b]{display:block;position:relative;color:#fff;width:100%;border:1px solid rgba(0,0,0,.5)}.background[data-v-75c8b15b]{width:100%;z-index:1}.background[data-v-75c8b15b],.mask[data-v-75c8b15b]{position:absolute;top:0;left:0}.mask[data-v-75c8b15b]{z-index:4}.content[data-v-75c8b15b]{position:absolute;top:0;left:0;display:grid;z-index:5;cursor:pointer}.content.second[data-v-75c8b15b]{z-index:4}.rectangle[data-v-75c8b15b]{background:-webkit-gradient(linear,left top,left bottom,from(#66448e),color-stop(70%),to(#e7d6fa));background:linear-gradient(180deg,#66448e,70%,#e7d6fa);position:absolute;top:0;left:0;z-index:2}.rectangle.second[data-v-75c8b15b]{background:-webkit-gradient(linear,left top,left bottom,from(purple),color-stop(70%),to(#66448e));background:linear-gradient(180deg,purple,70%,#66448e);z-index:1}.triangle[data-v-75c8b15b]{top:0;position:absolute;z-index:3}",""])},267:function(t,e,r){"use strict";var n=r(248);r.n(n).a},268:function(t,e,r){(t.exports=r(9)(!1)).push([t.i,".content[data-v-23eb7892]{border:1px solid rgba(0,0,0,.5);border-top:none;padding:10px}",""])},270:function(t,e,r){"use strict";var n={props:{image:{type:String,default:""}}},o=(r(277),r(279),r(4)),component=Object(o.a)(n,(function(){var t=this.$createElement,e=this._self._c||t;return e("v-img",{staticClass:"f-image-preview",attrs:{src:this.image}},[this._t("default"),this._v(" "),e("div",{staticClass:"fixed-mask play-mask"},[e("v-img",{staticClass:"v-icon",attrs:{src:"/misc_icons/play_circle_outline.svg"}}),this._v(" "),e("div",{staticClass:"fixed-mask play-mask__background"})],1),this._v(" "),e("div",{staticClass:"fixed-mask live-mask"},[this._v("LIVE")])],2)}),[],!1,null,"4e02d005",null);e.a=component.exports},271:function(t,e,r){"use strict";var n=r(262),o={data:function(){return{ads:n}}},c=(r(263),r(4)),component=Object(c.a)(o,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"f-temp-ad"},this._l(this.ads,(function(t,r){return e("div",{key:r},[e("a",{attrs:{href:t.link,target:"_blank",title:t.name}},[e("img",{attrs:{alt:t.name,border:"0",src:t.src}})])])})),0)}),[],!1,null,"f32e1344",null);e.a=component.exports},277:function(t,e,r){"use strict";var n=r(250);r.n(n).a},278:function(t,e,r){(t.exports=r(9)(!1)).push([t.i,".v-image[data-v-4e02d005]{height:100%;cursor:pointer;position:relative}.fixed-mask[data-v-4e02d005]{position:absolute}.play-mask[data-v-4e02d005]{-webkit-transition:all .1s ease-out;transition:all .1s ease-out;top:calc(50% - 36px);left:calc(50% - 36px);width:72px;height:72px;opacity:0}.v-image:hover .play-mask[data-v-4e02d005]{opacity:1}.v-image:hover .play-mask .v-icon[data-v-4e02d005]{opacity:1;-webkit-transform:scale(1);transform:scale(1)}.play-mask .v-icon[data-v-4e02d005]{opacity:0;-webkit-transition:all .3s ease-out;transition:all .3s ease-out;-webkit-transform:scale(2);transform:scale(2);color:#fff;width:100%;height:100%;z-index:2;position:absolute}.play-mask__background[data-v-4e02d005]{top:0;width:100%;height:100%;background:#000;opacity:.4;z-index:1;border-radius:50%}.live-mask[data-v-4e02d005]{font-weight:700;top:0;left:0;background:#fff;color:red;border:2px solid red;padding:0 2px;height:18px;line-height:14px;margin:10px}",""])},279:function(t,e,r){"use strict";var n=r(251);r.n(n).a},280:function(t,e,r){(t.exports=r(9)(!1)).push([t.i,".f-image-preview.v-image .v-image__image{-webkit-transition:all .3s ease-out;transition:all .3s ease-out}.f-image-preview.v-image:hover .v-image__image{-webkit-transform:scale(1.1);transform:scale(1.1)}",""])},333:function(t,e,r){var content=r(442);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(10).default)("31c18804",content,!0,{sourceMap:!1})},334:function(t,e,r){var content=r(444);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(10).default)("2fdd8848",content,!0,{sourceMap:!1})},335:function(t,e,r){var content=r(446);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(10).default)("2b723c9c",content,!0,{sourceMap:!1})},441:function(t,e,r){"use strict";var n=r(333);r.n(n).a},442:function(t,e,r){(t.exports=r(9)(!1)).push([t.i,".f-stream[data-v-41f414f0]{display:grid;grid-template-columns:calc(100vw - 535px) 340px;height:100%}.f-stream__main[data-v-41f414f0]{height:inherit}.f-stream__title-info[data-v-41f414f0]{display:grid;grid-template-columns:40px auto;margin:5px 0}.f-stream__title[data-v-41f414f0]{justify-self:start;font-size:20px}.f-stream__grid[data-v-41f414f0]{display:grid;grid-template-columns:auto 200px;margin:10px}.f-stream__viewer[data-v-41f414f0]{justify-self:end}.f-stream__streamer a[data-v-41f414f0]{color:#3e006f}.f-stream__chat[data-v-41f414f0]{position:fixed;top:138px;right:0;width:340px;height:calc(100% - 174px)}.stream-info[data-v-41f414f0]{display:grid;grid-template-columns:45px auto}.stream-info>div[data-v-41f414f0]{padding:2px 8px}.stream-info__title[data-v-41f414f0]{background-color:#1d7dcc;color:#fff}.stream-info__content[data-v-41f414f0]{background-color:#fafafa}.f-link[data-v-41f414f0]{height:100%}@media (min-width:1905px){.f-stream[data-v-41f414f0]{grid-template-columns:calc(100vw - 535px) 435px}.f-stream__title-video[data-v-41f414f0]{width:calc(100vw - 535px);height:calc((900vw - 4815px)/16);margin:auto}.f-stream__chat[data-v-41f414f0]{width:415px}}@media (max-width:1904px) and (min-width:1265px){.f-stream__title-video[data-v-41f414f0]{width:calc(100vw - 540px);height:calc((900vw - 4860px)/16)}}@media (max-width:1264px){.f-stream[data-v-41f414f0]{grid-template-columns:1fr;width:calc(100vw - 200px)}.f-stream.no-chat[data-v-41f414f0]{grid-template-rows:1fr 0}.stream-below-info[data-v-41f414f0],.stream-comment[data-v-41f414f0]{width:100%}.f-stream__main[data-v-41f414f0]{width:calc(100vw - 200px);height:calc((900vw - 1800px)/16 + 150px)}.f-stream__title-video[data-v-41f414f0]{width:calc(100vw - 200px);height:calc((900vw - 1800px)/16)}.no-chat .f-stream__chat[data-v-41f414f0]{display:none}.f-stream__chat[data-v-41f414f0],.f-stream__chat iframe[data-v-41f414f0]{position:relative;height:400px;top:0;width:calc(100vw - 200px)}}",""])},443:function(t,e,r){"use strict";var n=r(334);r.n(n).a},444:function(t,e,r){(t.exports=r(9)(!1)).push([t.i,".f-image-preview[data-v-62cfbcbf],.stream-frame[data-v-62cfbcbf]{height:56.25vw;min-height:56.25vw}.chatroom-frame[data-v-62cfbcbf]{height:100vh}.tabs[data-v-62cfbcbf]{display:grid;grid-template-columns:repeat(2,1fr);font-size:14px;justify-items:center;-webkit-box-align:center;align-items:center;grid-column-gap:3px;background:#55287e}.tabs>div[data-v-62cfbcbf]{border-radius:5px 5px 0 0;padding:7px 7px 4px;color:#fff;cursor:pointer;border-bottom:3px solid transparent}.tabs>div.selected[data-v-62cfbcbf]{color:orange;border-bottom-color:orange}.stream-info__main>div[data-v-62cfbcbf]{margin-top:10px}",""])},445:function(t,e,r){"use strict";var n=r(335);r.n(n).a},446:function(t,e,r){(t.exports=r(9)(!1)).push([t.i,".stream-type-id[data-v-3c799954]{background-color:#f2ecf6}.content[data-v-3c799954]{margin:0 100px 5px;padding-top:70px}.stream-below-info[data-v-3c799954],.stream-comment[data-v-3c799954]{margin-top:20px;width:calc(100% - 340px)}.f-tab__grid[data-v-3c799954]{display:grid;grid-template-columns:1fr 1fr;justify-self:end;justify-items:center;padding:0 40px}.mobile-content[data-v-3c799954]{margin-top:56px}@media (min-width:1904px){.stream-below-info[data-v-3c799954],.stream-comment[data-v-3c799954]{margin-top:20px;width:calc(100vw - 535px)}}@media (max-width:1264px){.stream-below-info[data-v-3c799954],.stream-comment[data-v-3c799954]{width:100%}}",""])},450:function(t,e,r){"use strict";r.r(e);var n=r(25),o=(r(86),r(87),r(11),r(260)),c=r(22),l=r(259),d=r(270),f=(r(271),{components:{FLink:l.a,FImagePreview:d.a},props:{stream:{type:Object,default:function(){return{}}}},computed:{viewers:function(){return c.a.fviewers(this.stream.viewers)}}}),m=(r(441),r(4)),v=Object(m.a)(f,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{class:["f-stream",t.stream.chatSource&&!t.stream.externalLink?"":"no-chat"]},[r("div",{staticClass:"f-stream__main"},[r("div",{staticClass:"f-stream__title-info"},[r("v-avatar",{attrs:{size:"30px"}},[r("v-img",{attrs:{src:t.stream.streamer_image}})],1),t._v(" "),r("div",{staticClass:"f-stream__title"},[t._v("\n        "+t._s(t.stream.title)+"\n      ")])],1),t._v(" "),r("div",{staticClass:"f-stream__title-video"},[t.stream.externalLink?r("f-link",{attrs:{link:t.stream.externalLink,external:""}},[r("f-image-preview",{attrs:{image:t.stream.preview}})],1):r("iframe",{attrs:{src:t.stream.source,height:"100%",width:"100%",frameborder:"0",scrolling:"no",allowfullscreen:"true"}})],1),t._v(" "),r("div",{staticClass:"f-stream__grid"},[r("div",{staticClass:"f-stream__streamer"},[r("span",[t._v(t._s(t.$t("fStream.streamer"))+":")]),t._v(" "),r("a",[t._v(t._s(t.stream.streamer_name))])]),t._v(" "),r("div",{staticClass:"f-stream__viewer"},[t._v("\n        "+t._s(t.viewers)+t._s(t.$t("fStream.viewers_unit"))+"\n      ")]),t._v(" "),r("div",[r("v-btn",{attrs:{depressed:"",to:"/live/recommend"}},[t._v(t._s(t.$t("fStream.back_to_streams_overview")))]),t._v(" "),r("v-btn",{attrs:{depressed:""}},[t._v(t._s(t.$t("fStream.relative_products")))]),t._v(" "),r("v-btn",{attrs:{depressed:"",icon:""}},[r("v-icon",[t._v("more_vert")])],1)],1),t._v(" "),r("div",{style:{"justify-self":"end","align-self":"center",display:"grid","grid-template-columns":"1fr 1fr","grid-gap":"15px"}},[r("div",{staticClass:"stream-info"},[r("div",{staticClass:"stream-info__title"},[t._v(t._s(t.$t("fStream.like")))]),t._v(" "),r("div",{staticClass:"stream-info__content"},[t._v("642")])]),t._v(" "),r("div",{staticClass:"stream-info"},[r("div",{staticClass:"stream-info__title"},[t._v(t._s(t.$t("fStream.subscribe")))]),t._v(" "),r("div",{staticClass:"stream-info__content"},[t._v("887")])])])])]),t._v(" "),r("div",{staticClass:"f-stream__chat"},[r("iframe",{attrs:{frameborder:"0",scrolling:"yes",src:t.stream.chatSource,height:"100%",width:"100%"}})])])}),[],!1,null,"41f414f0",null).exports,h=r(261),_=r(269),x={components:{FLink:l.a,FImagePreview:d.a,FBlockBox:h.a,FStreamContainer:_.a},props:{stream:{type:Object,default:function(){return{}}},source:{type:Array,default:function(){return[]}},moreEnabled:{type:Boolean,default:!1}},data:function(){return{selectedTab:"chatroom",selectedTab2:"tab-1"}},computed:{chatroomEnabled:function(){return this.stream.chatSource&&!(this.$vuetify.breakpoint.xs&&"youtube"===this.stream.platform)}},watch:{stream:function(t){this.chatroomEnabled||(this.selectedTab="streaminfo")}},mounted:function(){},methods:{switchTab:function(t){this.selectedTab2=t,this.$emit("click",t)},loadMore:function(){this.$emit("load-more")}}},y=(r(443),Object(m.a)(x,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"f-stream-mobile"},[r("div",{staticClass:"stream-frame"},[t.stream.externalLink?r("f-link",{attrs:{link:t.stream.externalLink,external:""}},[r("f-image-preview",{attrs:{image:t.stream.preview}})],1):r("iframe",{attrs:{src:t.stream.source,height:"100%",width:"100%",frameborder:"0",scrolling:"no",allowfullscreen:"true"}})],1),t._v(" "),r("div",{staticClass:"stream-info"},[t.chatroomEnabled?r("div",{staticClass:"tabs"},[r("div",{class:["chatroom"===t.selectedTab?"selected":""],on:{click:function(e){t.selectedTab="chatroom"}}},[t._v("\n        "+t._s(t.$t("fStream.chatroom"))+"\n      ")]),t._v(" "),r("div",{class:["streaminfo"===t.selectedTab?"selected":""],on:{click:function(e){t.selectedTab="streaminfo"}}},[t._v("\n        "+t._s(t.$t("fStream.streamer"))+"\n      ")])]):t._e(),t._v(" "),r("div",{staticClass:"tab-content"},[r("div",{directives:[{name:"show",rawName:"v-show",value:"chatroom"===t.selectedTab,expression:"selectedTab === 'chatroom'"}],staticClass:"chatroom-frame"},[r("iframe",{attrs:{frameborder:"0",scrolling:"yes",src:t.stream.chatSource,height:"100%",width:"100%"}})]),t._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:"streaminfo"===t.selectedTab,expression:"selectedTab === 'streaminfo'"}],staticClass:"stream-info__main"},[r("f-block-box",{attrs:{title:t.$t("account_type_subtype.streamer_info"),"background-color":"#f2ecf6"}},[r("div",{domProps:{innerHTML:t._s(t.stream.description)}})]),t._v(" "),r("f-block-box",{attrs:{title:t.$t("account_type_subtype.hot_recommend"),"second-title":t.$t("fStream.vod"),"background-color":"#f2ecf6",tab:""},on:{click:t.switchTab}},[r("f-stream-container",{attrs:{narrow:"","max-col":2,streams:t.source,available:"tab-1"===t.selectedTab2||t.source.length>0,msg:t.$t("account_type_subtype.no_vod_msg"),type:"tab-1"===t.selectedTab2?"stream":"vod"}}),t._v(" "),t.source.length>0?r("div",[r("v-btn",{class:[t.moreEnabled?"theme":""],attrs:{dark:t.moreEnabled,block:"",disabled:!t.moreEnabled},on:{click:t.loadMore}},[t._v("\n              "+t._s(t.$t("fFollowedStreams.load_more_streams"))+"\n            ")])],1):t._e()],1)],1)])])])}),[],!1,null,"62cfbcbf",null).exports),k={components:{FTab:o.a,FStream:v,FStreamMobile:y,FBlockBox:h.a,FStreamContainer:_.a},data:function(){return{stream:{},vods:[],streams:[],pageIndex:0,pageSize:6,selectedTab:"",loadMoreEnabled:{"tab-1":!0,"tab-2":!0}}},computed:{list:function(){var t=this;return"tab-1"===this.selectedTab?this.streams.filter((function(e){return e.id.toString()!==t.$route.params.id})):"tab-2"===this.selectedTab?this.vods:[]}},mounted:function(){var t=this;this.$route.params.id&&("youtube"===this.$route.params.type?(this.getYoutubeStream(this.$route.params.id).then((function(e){return t.stream=e})),this.getYoutubeStreams(0,13).then((function(e){return t.streams=e}))):"twitch"===this.$route.params.type?(this.getTwitchStream(this.$route.params.id).then((function(e){return t.stream=e})),this.getTwitchStreams(0,13,!0).then((function(e){e.forEach((function(s){return s.then((function(e){return t.streams.push(e)}))}))}))):(this.getStream(this.$route.params.id).then((function(e){return t.stream=e})),this.getStreams(0,13,{src:this.$route.params.type}).then((function(e){return t.streams=e})))),this.getVodsOfStream(this.pageIndex,12,this.$route.params.id).then((function(e){return t.vods=e}))},methods:{switchTab:function(t){this.selectedTab=t,this.pageIndex=0},loadMore:function(){var t=this;this.pageIndex++,"tab-1"===this.selectedTab?"twitch"===this.$route.params.type?this.getTwitchStreams(this.pageIndex,this.pageSize,!0).then((function(e){e.forEach((function(s){return s.then((function(e){return t.streams.push(e)}))})),t.loadMoreEnabled["tab-1"]=e&&e.length===t.pageSize})):"youtube"===this.$route.params.type?this.getYoutubeStreams(this.pageIndex,this.pageSize).then((function(e){t.streams=e,t.loadMoreEnabled["tab-1"]=e&&e.length===t.pageSize})):this.getStreams(this.pageIndex,this.pageSize,{src:this.$route.params.type}).then((function(e){var r;(r=t.streams).push.apply(r,Object(n.a)(e)),t.loadMoreEnabled["tab-1"]=e&&e.length===t.pageSize})):"tab-2"===this.selectedTab&&this.getVodsOfStream(this.pageIndex,this.pageSize,this.$route.params.id).then((function(e){var r;(r=t.vods).push.apply(r,Object(n.a)(e)),t.loadMoreEnabled["tab-2"]=e&&e.length===t.pageSize}))}}},w=(r(445),Object(m.a)(k,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"stream-type-id"},[t.$vuetify.breakpoint.xs?t._e():r("f-tab",{attrs:{tabs:[],title:""}},[r("div",{staticClass:"f-tab__grid"},[r("v-btn",{staticClass:"theme",attrs:{icon:"",dark:""}},[r("v-icon",[t._v("star_border")])],1),t._v(" "),r("v-btn",{staticClass:"theme",attrs:{to:"/live/recommend"}},[t._v("\n        "+t._s(t.$t("account_type_subtype.stream_overview"))+"\n      ")])],1)]),t._v(" "),t.$vuetify.breakpoint.xs?r("div",{staticClass:"mobile-content"},[t.stream?r("f-stream-mobile",{attrs:{stream:t.stream,source:t.list,"more-enabled":t.loadMoreEnabled},on:{"load-more":t.loadMore,click:t.switchTab}}):t._e()],1):r("div",{staticClass:"content"},[r("div",[t.stream?r("f-stream",{attrs:{stream:t.stream}}):t._e()],1),t._v(" "),r("div",{staticClass:"stream-below-info"},[r("f-block-box",{attrs:{title:t.$t("account_type_subtype.streamer_info"),"background-color":"#f2ecf6"}},[r("div",{domProps:{innerHTML:t._s(t.stream.description)}})])],1),t._v(" "),r("div",{staticClass:"stream-comment"},[r("f-block-box",{attrs:{title:t.$t("account_type_subtype.hot_recommend"),"second-title":t.$t("fStream.vod"),"background-color":"#f2ecf6",tab:""},on:{click:t.switchTab}},[r("f-stream-container",{attrs:{narrow:"","max-col":3,streams:t.list,type:"tab-1"===t.selectedTab?"stream":"vod",available:"tab-1"===t.selectedTab||t.vods.length>0,msg:t.$t("account_type_subtype.no_vod_msg")}}),t._v(" "),t.list.length>0?r("div",[r("v-btn",{class:[t.loadMoreEnabled[t.selectedTab]?"theme":"disabled"],attrs:{dark:t.loadMoreEnabled[t.selectedTab],block:"",disabled:!t.loadMoreEnabled[t.selectedTab]},on:{click:t.loadMore}},[t._v("\n            "+t._s(t.$t("fFollowedStreams.load_more_streams"))+"\n          ")])],1):t._e()],1)],1)])],1)}),[],!1,null,"3c799954",null));e.default=w.exports}}]);