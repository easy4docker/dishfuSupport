(this["webpackJsonpweb-app"]=this["webpackJsonpweb-app"]||[]).push([[0],{149:function(e,t){},157:function(e,t,a){},159:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),s=a(33),i=a.n(s),r=(a(93),a(6)),o=a(15),l=a(9),u=a(167),d=a(161),j=a(168),b=a(8),h=a.n(b),f=a(12);var O=a(16),p=a(1),x=function(e){var t=e.message,a=e.title,n=e.className;return Object(p.jsxs)(d.a,{className:n+" rounded p-3 message-box grid-bg",children:[Object(p.jsx)("b",{style:{textTransform:"capitalize"},children:a}),Object(p.jsx)("h3",{className:"text-secondary m-3 p-3",children:t})]})},m=a(64),g=a(61),v=a(81),S=a(50);console.log("window.location.hostname--\x3e",window.location.hostname);var y={ready:!1,loading:{},screenModel:{},_watcher:"",fp:"",data:{signinForm:{},isAuth:!1,authInfo:{}},config:{apiServer:"http://192.168.86.126:3001",webServer:"http://192.168.86.126:3006",sockerServer:"http://192.168.86.126:3001/dishFu",ipfsServer:"//gateway.ipfs.io/ipfs/"}},w=Object(g.createStore)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:y,t=arguments.length>1?arguments[1]:void 0;switch(e._watcher="",t.type){case"updateSigninForm":return e.data.signinForm=t.data,e._watcher="auth",N(e.data),e;case"saveAuthInfo":return e.data.authInfo=t.authInfo,e.data.isAuth=!0,e._watcher="forceAuth",console.log("good news===?",t.authInfo),N(e.data),e;case"saveAuthAdmin":return e.data.authInfo=t.authInfo,e.data.isAuth=!0,e._watcher="saveAuthAdmin",N(e.data),e;case"signOff":return e.data.authInfo={},e.data.isAuth=!1,e._watcher="forceAuth",N(e.data),e;case"loadScreenModel":return e.screenModel=t.screenModel,e;case"addLoading":return e._watcher="loading",e.loading[t.id]=(new Date).getTime(),e;case"removeLoading":return e._watcher="loading",delete e.loading[t.id],e;case"initStore":return e.data=t.data,e.fp=t.fp,e._watcher="afterInit",e;default:return e}}),Object(v.composeWithDevTools)()),N=function(e){setTimeout((function(){localStorage.setItem("localSettingData",JSON.stringify(e))}),500)};(function(){var e=Object(f.a)(h.a.mark((function e(t){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:S.a.load().then((function(e){return e.get()})).then((function(e){e.visitorId;var a="localSettingData",n=y.data;try{n=localStorage.getItem(a)?JSON.parse(localStorage.getItem(a)):y.data}catch(c){}"function"===typeof t&&t(n,e.visitorId)}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}})()((function(e,t){w.dispatch({type:"initStore",data:e,fp:t})}));var k=w;var A=function(e){var t=e.roles,a=e.exroles,c=e.comp,s=e.showException,i=Object(n.useState)([]),o=Object(r.a)(i,2),l=o[0],u=o[1],d=a||[],j=t.filter((function(e){return[].concat(Object(m.a)(l),["all"]).includes(e)})),b=d.filter((function(e){return Object(m.a)(l).includes(e)})),h=function(){u(k.getState().data.authInfo&&k.getState().data.authInfo.roles?k.getState().data.authInfo.roles:[])};Object(n.useEffect)((function(){var e=k.subscribe((function(){"role"!==k.getState()._watcher&&"auth"!==k.getState()._watcher||h()}));return h(),function(){e()}}),[]);var f=Object(p.jsx)("div",{className:"p-3",children:Object(p.jsx)(x,{message:"Missing required roles"})});return!j.length||b.length?s?f:"":c},I=a(162);function C(){var e=Object(n.useState)(0),t=Object(r.a)(e,2),a=t[0],c=t[1];return Object(n.useEffect)((function(){var e=k.subscribe((function(){"loading"===k.getState()._watcher&&c(Object.keys(k.getState().loading).length)}));return function(){e()}}),[]),Object(p.jsx)("div",{className:a?"loading":"no-loading",children:Object(p.jsx)(I.a,{animation:"border",size:"md",className:"loading-text"})})}var $=function e(t){var a=this;Object(O.a)(this,e),this.loadingOn=function(){k.dispatch({type:"addLoading",id:a.id})},this.loadingOff=function(){k.dispatch({type:"removeLoading",id:a.id})},this.fetchApi=function(){var e=Object(f.a)(h.a.mark((function e(t,n){var c;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a.loadingOn(),c=a,fetch(t.url,{}).then((function(e){return e.json()})).then((function(e,t){200===e.status?(c.loadingOff(),n(e.data)):c.loadingOff()})).catch((function(e){c.loadingOff()}));case 4:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),this.updateSigninForm=function(e,t,a){k.dispatch({type:"updateSigninForm",data:{token:e,phone:a,socketid:t}})},this.DatabaseApi=function(e,t,n){fetch(a.server+"/api/"+e,{method:"POST",body:JSON.stringify(t),headers:{Accept:"application/json","Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){n(e)})).catch((function(e){n(e)}))},this.id=(new Date).getTime(),this.defaultData={recipes:[],plates:[],orders:[],menus:[],focuses:[]},this.server=k.getState().config.apiServer},_=(a(62),function e(t){var a=this;Object(O.a)(this,e),this.load=Object(f.a)(h.a.mark((function e(){var t,n,c;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=S.a.load(),e.next=3,t;case 3:return n=e.sent,e.next=6,n.get();case 6:return c=e.sent,a.visitorId=c.visitorId,e.abrupt("return",a.visitorId);case 10:case"end":return e.stop()}}),e)}))),this.visitorId=null}),T=a(166),D=a(163),F=a(83),q=a(82),E=a.n(q);function L(e){var t=Object(n.useState)(e.defaultValue),a=Object(r.a)(t,2),c=a[0],s=a[1],i=Object(n.useState)({}),o=Object(r.a)(i,2),l=o[0],u=o[1],d=Object(n.useState)(!1),j=Object(r.a)(d,2),b=j[0],h=j[1],f=Object(n.useState)(!1),O=Object(r.a)(f,2),x=O[0],m=O[1],g=function(e){return e?e.charAt(0).toUpperCase()+e.slice(1):""},v=function(e){return e?e.toUpperCase():""},S=function(e){return(g(e.street_address1)+","+g(e.city)+","+v(e.state)+" "+v(e.postal_code)+v("USA"===e.country?"":e.country)).replace(/\s+/gi," ")},y=function(t){return E()(t,(function(t,a){a.country=a.country?a.country:"USA",u(a),a.street_address1&&a.city&&a.postal_code&&a.state&&!t?(e.passAddress(S(a)),h(!0)):(e.passAddress(""),h(!1))})),!0};return Object(n.useEffect)((function(){}),[]),Object(p.jsxs)(T.a.Group,{children:[Object(p.jsx)(T.a.Control,{defaultValue:c,required:!0,placeholder:"Input Your address",as:"textarea",rows:"1",onChange:function(e){e.target.value=e.target.value,y(e.target.value)},onFocus:function(){m(!0)},onBlur:function(e){m(!1),e.target.value=b?S(l):"",s(S(l))}}),x&&Object(p.jsx)(T.a.Text,{className:"p-3 mt-1 alert-secondary",children:Object(p.jsxs)(D.a,{children:[Object(p.jsxs)(F.a,{sx:6,className:"p-0 pl-2",children:["Street Address: ",Object(p.jsx)("b",{children:l.street_address1}),Object(p.jsx)("br",{}),"City: ",Object(p.jsx)("b",{children:l.city}),Object(p.jsx)("br",{}),b?Object(p.jsx)("span",{className:"text-success",children:"Correct Format."}):Object(p.jsx)("span",{className:"text-info",children:"Parsing ..."})]}),Object(p.jsxs)(F.a,{sx:6,className:"p-0 pl-2",children:["State: ",Object(p.jsx)("b",{children:l.state}),Object(p.jsx)("br",{}),"Postal: ",Object(p.jsx)("b",{children:l.postal_code}),Object(p.jsx)("br",{}),"Country: ",Object(p.jsx)("b",{children:l.country}),Object(p.jsx)("br",{})]})]})})]})}function M(e){return Object(p.jsx)(d.a,{className:"bg-info",fluid:!0,children:Object(p.jsx)(d.a,{children:Object(p.jsxs)(j.a,{expand:"lg",className:"p-1",children:[Object(p.jsx)(j.a.Brand,{href:"/",children:Object(p.jsx)(R,{})}),Object(p.jsx)(j.a.Brand,{className:"menu-color",children:e.comp})]})})})}function R(){return Object(p.jsxs)("div",{className:"border rounded p-1 m-0",style:{color:"yellow",fontSize:"1.5rem"},children:["\u83dc\u8b5c",Object(p.jsx)("span",{className:"ml-1",style:{fontSize:"1rem"},children:"SupportCenter"})]})}var z=a(164);var P=a(18),Y=a(19);function U(e){var t=Object(n.useState)(!1),a=Object(r.a)(t,2),c=(a[0],a[1]);return Object(n.useEffect)((function(){var e=k.subscribe((function(){return"auth"===k.getState()._watcher&&c(k.getState().data.auth),!1}));return c(k.getState().data.auth),function(){e()}}),[]),Object(p.jsx)("div",{className:"rounded p-1 m-0",style:{fontSize:"1.1rem"},children:Object(p.jsxs)("span",{className:"menu-color",onClick:function(){k.dispatch({type:"signOff"})},children:[Object(p.jsx)(P.a,{size:"1x",icon:Y.d,className:"mr-1"})," Sign off"]})})}var G=a(88),V=a(165),Q=a(169),B=a(47),H=a.n(B),J=a(48),W=a.n(J);function K(e){var t=k.getState().config.sockerServer,a=k.getState().config.webServer,c=new $,s=Object(n.useState)(""),i=Object(r.a)(s,2),o=i[0],l=i[1],u=Object(n.useState)(""),j=Object(r.a)(u,2),b=j[0],h=j[1],f=Object(n.useState)(""),O=Object(r.a)(f,2),x=O[0],m=O[1],g=Object(n.useState)(!1),v=Object(r.a)(g,2),S=v[0],y=v[1],w=Object(n.useState)(""),N=Object(r.a)(w,2),A=N[0],I=N[1],C=/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,_=function(e,t){c.loadingOn(),c.DatabaseApi("admin",{action:"add"===e?"addSessionRecord":"delete"===e?"deleteSessionRecord":"",data:{phone:o.replace(C,"$1$2$3"),visitorId:k.getState().fp,token:b,socketid:x}},(function(e){c.loadingOff(),t&&t(e)}))},D=function(e){if(!o)return!0;var a=W.a.connect(t);return a.on("connect",(function(){a.on("afterTransfer",(function(e,t){!function(e){var t=Object(G.a)({},e);t.signInTime=(new Date).getTime(),console.log("afterTransfer,  rec->",t),k.dispatch({type:"saveAuthInfo",authInfo:t})}(t),a.disconnect()}));var e=a.id.replace("/dishFu#","");b?c.updateSigninForm(b,e,o):c.updateSigninForm(e,e,o)})),a.on("disconnect",(function(){})),a},F=function(){var e=k.getState().data.signinForm;l(e?e.phone:""),m(e?e.socketid:""),y(C.test(e.phone)),h(e?e.token:"")},q=function(e){return(e||"").replace(C,"$1$2$3")};Object(n.useEffect)((function(){F();var e=k.subscribe((function(){return"auth"===k.getState()._watcher&&F(),k.getState()._watcher,!1}));return function(){e()}}),[]);var E=function(e,t){t?H.a.toDataURL(a+"/crossFromMobile/"+q(t)+"/"+e,{width:338,type:"image/png",quality:1,color:{dark:"#000000",light:"#0000"}},(function(e,t){I(t)})):I("")};Object(n.useEffect)((function(){b&&(D(),b===x?(console.log("add once===============>"),_("add",(function(){console.log("after add ===============>",b),E(b,o)}))):E(b,o))}),[b]),Object(n.useEffect)((function(){var e,t;x&&(e=x,c.loadingOn(),c.DatabaseApi("admin",{action:"updateSessionRecord",data:{phone:o.replace(C,"$1$2$3"),visitorId:k.getState().fp,token:b,socketid:e}},(function(e){c.loadingOff(),t&&t(e)})))}),[x]);var L=Object(p.jsxs)("span",{children:[Object(p.jsxs)(T.a.Group,{children:[Object(p.jsx)(T.a.Label,{children:"Signin with your smart phone"}),Object(p.jsx)(T.a.Control,{defaultValue:o,placeholder:"(xxx)xxx-xxxx",type:"text",style:{fontSize:"2rem"},onChange:function(e){C.test(e.target.value)?(e.target.value=e.target.value.replace(C,"($1)$2-$3"),l(e.target.value.replace(C,"($1)$2-$3"))):l("")}})]}),Object(p.jsx)(T.a.Group,{children:Object(p.jsx)(T.a.Label,{children:Object(p.jsxs)(V.a,{className:"btn btn-warning m-0 mr-3",disabled:!o,onClick:function(){c.loadingOn(),c.DatabaseApi("admin",{action:"checkPhone",data:{visitorId:k.getState().fp,phone:o.replace(C,"$1$2$3")}},(function(e){c.loadingOff(),"success"===e.status&&(y(C.test(o)),D())}))},children:[Object(p.jsx)(P.a,{size:"1x",icon:Y.b,className:"m-0"})," Submit"]})})})]}),M=Object(p.jsxs)(Q.a,{variant:"secondary",children:[Object(p.jsx)(Q.a.Heading,{className:"p-3",children:"Request submitted! What's the next step?"}),Object(p.jsxs)("ol",{children:[Object(p.jsxs)("li",{children:["The phone ",o," will receive a text message with an authentication link."]}),Object(p.jsx)("li",{children:"Click confirmed the link of the txt mesage."}),Object(p.jsx)("li",{children:"Last step, to use the phone scan this QR code. The computer client with grant an admin permission."})]}),Object(p.jsxs)(d.a,{fluid:!0,children:[a+"/crossFromMobile/"+q(o)+"/"+b,Object(p.jsx)("br",{}),Object(p.jsx)(z.a,{src:A,className:"border border-primary"})]}),Object(p.jsx)(d.a,{fluid:!0,className:"p-3",children:Object(p.jsx)("h3",{children:"OR "})}),Object(p.jsxs)(V.a,{className:"btn btn-warning m-1 mr-3",onClick:function(){_("delete",(function(){c.updateSigninForm("","","")}))},children:[Object(p.jsx)(P.a,{size:"1x",icon:Y.b,className:"mr-2"}),"Reset"]})]});return Object(p.jsxs)(d.a,{fluid:!0,className:"p-3 content-body",children:[Object(p.jsxs)(T.a,{className:"p-3",children:[!S&&L,S&&M]}),"socketId:",x,Object(p.jsx)("hr",{}),"token:",b]})}function X(e){var t=new $,a=/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,c=Object(n.useState)(!0),s=Object(r.a)(c,2),i=s[0],o=s[1],u=Object(n.useState)(!1),j=Object(r.a)(u,2),b=j[0],h=j[1],f=Object(l.g)().token,O=Object(l.g)().authcode,x=Object(n.useState)(k.getState().data.auth),m=Object(r.a)(x,2),g=m[0],v=m[1],S=Object(n.useState)(!1),y=Object(r.a)(S,2),w=y[0],N=y[1];Object(n.useEffect)((function(){t.loadingOn(),t.DatabaseApi("admin",{action:"checkTokenAuthCode",data:{token:f,authcode:O}},(function(e){t.loadingOff(),"success"!==e.status?v(!1):(v(!0),k.dispatch({type:"saveAuthInfo",authInfo:e.data[0]}),N(e.data[0]))}));var e=k.subscribe((function(){return"saveAuthAdmin"===k.getState()._watcher&&k.getState().data.authInfo&&k.getState().data.authInfo.authcode===O&&h(!0),!1}));return function(){e()}}),[]);var A=function(e){return Object(p.jsxs)(d.a,{fluid:!0,className:"m-0 p-0",children:[Object(p.jsx)(M,{comp:"Auth with Mobile"}),Object(p.jsx)(d.a,{children:Object(p.jsxs)(Q.a,{variant:e.variant?e.variant:"light mt-3",children:[Object(p.jsx)(Q.a.Heading,{children:e.title}),e.body]})})]})},I=Object(p.jsx)(A,{title:"To confirm:",body:Object(p.jsxs)(d.a,{fluid:!0,children:[function(){var e=k.getState().data.authInfo;return!!e&&Object(p.jsxs)(d.a,{fluid:!0,className:"alert-secondary p-3 m-1",children:["Current authentication information on this equipment is:",Object(p.jsx)("br",{}),"Phone: ",Object(p.jsx)("b",{children:(e.phone?e.phone:"").replace(a,"($1)$2-$3")}),Object(p.jsx)("br",{}),"Authrized Time: ",Object(p.jsx)("b",{children:e.created}),Object(p.jsx)("br",{})]})}(),function(){var e=w;return!!e&&Object(p.jsxs)(d.a,{fluid:!0,className:"alert-info p-3 m-1",children:["Will set this equipment to:",Object(p.jsx)("br",{}),"Phone: ",Object(p.jsx)("b",{children:e.phone.replace(a,"($1)$2-$3")}),Object(p.jsx)("br",{}),"Authrized Time: ",Object(p.jsx)("b",{children:e.created}),Object(p.jsx)("br",{})]})}(),Object(p.jsx)(V.a,{onClick:function(){k.dispatch({type:"saveAuthAdmin",authInfo:w})},className:"m-2",children:"Continue Anyway"}),Object(p.jsx)(V.a,{onClick:function(){o(!1)},variant:"danger",className:"m-2",children:"Stop"})]})}),C=Object(p.jsx)(A,{title:"Warning!",body:"The authentication link fail to process!",variant:"danger m-3 p-3"});return g?i?b?Object(p.jsx)(A,{title:"Succeess!",body:"The mobile authentication completed! You can use this equipment for desktop admin application."}):I:Object(p.jsx)(A,{title:"Stop!",body:"No worry. The mobile authentication is not going through!"}):C}function Z(e){var t=new $,a=/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,c=k.getState().config.sockerServer,s=Object(n.useState)(!0),i=Object(r.a)(s,2),o=i[0],u=i[1],j=Object(n.useState)(!1),b=Object(r.a)(j,2),h=b[0],f=b[1],O=Object(l.g)(),x=Object(l.g)().token,m=Object(l.g)().phone,g=Object(n.useState)(""),v=Object(r.a)(g,2),S=v[0],y=v[1],w=Object(n.useState)(""),N=Object(r.a)(w,2),A=N[0],I=N[1];Object(n.useEffect)((function(){t.loadingOn(),t.DatabaseApi("admin",{action:"getTargetSocket",data:{token:x,phone:m}},(function(e){var t=e.data&&e.data[0]?e.data[0].socketid:"";"success"===e.status&&t&&y(t)}));var e=k.getState().data.authInfo;console.log("---info---\x3e",e,O),t.loadingOn(),t.DatabaseApi("admin",{action:"checkTokenAuthCode",data:{token:e.token,authcode:e.authcode}},(function(e){console.log("---result--\x3e",e),t.loadingOff(),"success"!==e.status?I(!1):I(!0)}))}),[]),Object(n.useEffect)((function(){}),[S]);var C=function(e){return Object(p.jsxs)(d.a,{fluid:!0,className:"m-0 p-0",children:[Object(p.jsx)(M,{comp:"Auth with Mobile"}),Object(p.jsx)(d.a,{children:Object(p.jsxs)(Q.a,{variant:e.variant?e.variant:"light mt-3",children:[Object(p.jsx)(Q.a.Heading,{children:e.title}),e.body]})})]})},_=S&&Object(p.jsx)(C,{title:"To confirm:",body:Object(p.jsxs)(d.a,{fluid:!0,children:[function(){var e,t=k.getState().data.authInfo;return!!t&&Object(p.jsxs)(d.a,{fluid:!0,className:"alert-secondary p-3 m-1",children:["Current authentication information on this equipment is:",Object(p.jsx)("br",{}),"Phone: ",Object(p.jsx)("b",{children:(e=t.phone,(e||"").replace(a,"($1)$2-$3"))}),Object(p.jsx)("br",{}),"Authrized Time: ",Object(p.jsx)("b",{children:t.created}),Object(p.jsx)("br",{})]})}(),Object(p.jsx)(V.a,{onClick:function(){console.log("======permit====>"+S);var e=W.a.connect(c);e.on("connect",(function(){e.emit("transfer",S,e.id,k.getState().data.authInfo),e.disconnect(),f(!0)}))},className:"m-2",children:"Authorize the desktop"}),Object(p.jsx)(V.a,{onClick:function(){u(!1)},variant:"danger",className:"m-2",children:"Stop"})]})}),T=Object(p.jsx)(C,{title:"Warning!",body:"The fail to process the QR!",variant:"danger m-3 p-3"});return A?o?h?Object(p.jsx)(C,{title:"Succeess!",body:"The mobile authentication completed! You can use this equipment for desktop admin application."}):_:Object(p.jsx)(C,{title:"Stop!",body:"No worry. The mobile authentication is not going through!"}):T}var ee=function(e){var t=Object(n.useState)(""),a=Object(r.a)(t,2),c=a[0],s=a[1],i={authUsers:{caption:"User Admin",role:["all"],linkTo:"/authUsers"},transTracking:{caption:"Transaction Report",role:["all"],linkTo:"/transReport"}},b=function(e){return Object(l.f)().pathname!==i[e].linkTo?"menu-color":"menu-color-select"},h=function(e){var t=i[e]?i[e]:{role:[]},a=t&&t.role?t.role:[],n=t&&t.exrole?t.exrole:[],c=function(t){return Object(p.jsx)(u.a.Link,{as:o.b,to:t.linkTo,className:b(e),onClick:function(){s(!1)},children:t.caption})}(t);return Object(p.jsx)(A,{roles:a,comp:c,exroles:n})};return Object(n.useEffect)((function(){}),[]),Object(p.jsx)(d.a,{className:"bg-info",fluid:!0,children:Object(p.jsx)(d.a,{children:Object(p.jsxs)(j.a,{expand:"lg",className:"p-1",expanded:c,children:[Object(p.jsx)(j.a.Brand,{as:o.b,to:"/",className:"menu_color",children:Object(p.jsx)(R,{})}),Object(p.jsx)(j.a.Brand,{className:"menu_color",children:Object(p.jsx)(U,{})}),Object(p.jsx)(j.a.Collapse,{id:"basic-navbar-nav",children:Object(p.jsxs)(u.a,{className:"me-auto",children:[h("authUsers"),h("transTracking")]})})]})})})};var te=function(){var e=(new Date).getFullYear();return Object(p.jsxs)(d.a,{fluid:!0,className:"footer",children:[Object(p.jsxs)("div",{className:"float-left alert-secondary footer-tag",children:["\xa9 ",e," Dishfu \xa0 \xa0",Object(p.jsx)(o.b,{to:"/privacy",children:"Privacy"}),"\xa0|\xa0",Object(p.jsx)(o.b,{to:"/terms",children:"Term"})]}),Object(p.jsx)("div",{className:"clearfix p-0 m-0"})]})};var ae=function(e){return new $,Object(n.useEffect)((function(){}),[]),Object(p.jsx)(d.a,{fluid:!0,className:"p-0 m-0 content-body",children:Object(p.jsx)(d.a,{fluid:!0,className:"p-0 m-0 content-body",children:Object(p.jsx)(d.a,{className:"alert-light text-secondary p-3",children:"Nothing to address"})})})};function ne(e){var t=new $,a=Object(n.useState)(""),c=Object(r.a)(a,2),s=c[0],i=c[1],o=Object(n.useState)(""),l=Object(r.a)(o,2),u=l[0],j=l[1],b=Object(n.useState)(""),h=Object(r.a)(b,2),f=h[0],O=h[1],x=Object(n.useState)(!1),m=Object(r.a)(x,2),g=m[0],v=m[1],S=function(){t.loadingOn(),t.DatabaseApi("application",{action:"save",data:{type:"foodie",visitorId:k.getState().fp,address:s,phone:f,description:u}},(function(){t.loadingOff(),v(!0)}))},y=function(e){j(e.target.value)},w=function(e){var t=/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;t.test(e.target.value)?(e.target.value=e.target.value.replace(t,"($1)$2-$3"),O(e.target.value.replace(t,"($1)$2-$3"))):O("")};Object(n.useEffect)((function(){}),[]);return g?Object(p.jsx)(d.a,{children:Object(p.jsxs)(Q.a,{variant:"success mt-3",children:[Object(p.jsx)(Q.a.Heading,{children:"You application submitted!"}),Object(p.jsx)("span",{children:"You might become a foodie automatically upon our AI valification. or you will be contacted sooner."})]})}):Object(p.jsxs)(d.a,{className:"mb-3 pb-3",children:[Object(p.jsxs)(Q.a,{variant:"secondary mt-3",children:[Object(p.jsx)(Q.a.Heading,{children:"If you have the Foodie role:"}),Object(p.jsxs)("ul",{children:[Object(p.jsx)("li",{children:"You can be a housewife who wants to share her cooking hobby with neighbours, while making a side income. Foodie can be a restaurant owner, to extend their business objectives. "}),Object(p.jsx)("li",{children:"You needs to provide a real address (not PO box), can create receipts, and contact supplies. "}),Object(p.jsx)("li",{children:"You drives the following workflow: create receipt -> contact supplier and confirm the plate -> publish the plate to \u201cmenu\u201d"}),Object(p.jsx)("li",{children:"You authentication requires a barcode provided by DishFoo via mail. Once the barcode is scanned, then Foodie can publish the plate to the menu."})]})]}),Object(p.jsxs)(T.a,{children:[Object(p.jsxs)(T.a.Group,{children:[Object(p.jsxs)(T.a.Label,{children:[Object(p.jsx)("b",{children:"Foodie Address:"})," ",Object(p.jsx)("span",{className:"form_notice_info",children:"* Required"})]}),Object(p.jsx)(L,{passAddress:i,defaultValue:s})]}),Object(p.jsxs)(T.a.Group,{children:[Object(p.jsxs)(T.a.Label,{children:[Object(p.jsx)("b",{children:"Application Description:"})," ",Object(p.jsx)("span",{className:"form_notice_info",children:"(Option)"})," "]}),Object(p.jsx)(T.a.Control,{defaultValue:u,placeholder:"Input Description",as:"textarea",rows:"3",onChange:y})]}),Object(p.jsxs)(T.a.Group,{children:[Object(p.jsxs)(T.a.Label,{children:[Object(p.jsx)("b",{children:"Contact Phone:"})," ",Object(p.jsx)("span",{className:"form_notice_info",children:"(Option)"})]}),Object(p.jsx)(T.a.Control,{defaultValue:f,placeholder:"Input Contact Phone",as:"textarea",rows:"1",onChange:w})]}),Object(p.jsxs)(V.a,{className:"btn btn-info m-0 mr-3",disabled:!s,onClick:S,children:[Object(p.jsx)(P.a,{size:"1x",icon:Y.c,className:"m-0"})," Submit"]})]})]})}function ce(e){var t=new $,a=Object(n.useState)(""),c=Object(r.a)(a,2),s=c[0],i=c[1],o=Object(n.useState)(""),l=Object(r.a)(o,2),u=l[0],j=l[1],b=Object(n.useState)(""),h=Object(r.a)(b,2),f=h[0],O=h[1],x=Object(n.useState)(""),m=Object(r.a)(x,2),g=m[0],v=m[1],S=Object(n.useState)(!1),y=Object(r.a)(S,2),w=y[0],N=y[1],A=function(){t.loadingOn(),t.DatabaseApi("application",{action:"save",data:{type:"supie",visitorId:k.getState().fp,address:s,phone:g,qualification:u,description:f}},(function(){t.loadingOff(),N(!0)}))},I=function(e){j(e.target.value)},C=function(e){O(e.target.value)},_=function(e){var t=/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;t.test(e.target.value)?(e.target.value=e.target.value.replace(t,"($1)$2-$3"),v(e.target.value.replace(t,"($1)$2-$3"))):v("")};Object(n.useEffect)((function(){}),[]);return w?Object(p.jsx)(d.a,{children:Object(p.jsxs)(Q.a,{variant:"success mt-3",children:[Object(p.jsx)(Q.a.Heading,{children:"You application submitted!"}),Object(p.jsx)("span",{children:"You might become a supie automatically upon our AI valification. or you will be contacted sooner."})]})}):Object(p.jsxs)(d.a,{className:"mb-3 pb-3",children:[Object(p.jsxs)(Q.a,{variant:"secondary mt-3",children:[Object(p.jsx)(Q.a.Heading,{children:"If you have the Supie role"}),Object(p.jsxs)("ul",{children:[Object(p.jsx)("li",{children:"You can be grocery stores, farms or restaurants."}),Object(p.jsx)("li",{children:"You can make plate based on receipt and send back to Foodie for validation."}),Object(p.jsx)("li",{children:" You needs to provide a real address (not PD box), can view the receipts from Foodie."})]})]}),Object(p.jsxs)(T.a,{children:[Object(p.jsxs)(T.a.Group,{children:[Object(p.jsxs)(T.a.Label,{children:[Object(p.jsx)("b",{children:"Supie Address:"})," ",Object(p.jsx)("span",{className:"form_notice_info",children:"* Required"})]}),Object(p.jsx)(L,{passAddress:i,defaultValue:s})]}),Object(p.jsxs)(T.a.Group,{children:[Object(p.jsxs)(T.a.Label,{children:[Object(p.jsx)("b",{children:"Contact Phone:"})," ",Object(p.jsx)("span",{className:"form_notice_info",children:"* Required"})]}),Object(p.jsx)(T.a.Control,{defaultValue:g,placeholder:"Input Contact Phone",as:"textarea",rows:"1",onChange:_})]}),Object(p.jsxs)(T.a.Group,{children:[Object(p.jsxs)(T.a.Label,{children:[Object(p.jsx)("b",{children:"Your Qualification:"})," ",Object(p.jsx)("span",{className:"form_notice_info",children:"* Required"})]}),Object(p.jsx)(T.a.Control,{defaultValue:u,placeholder:"Input Qualification",as:"textarea",rows:"1",onChange:I})]}),Object(p.jsxs)(T.a.Group,{children:[Object(p.jsxs)(T.a.Label,{children:[Object(p.jsx)("b",{children:"Application Description:"})," ",Object(p.jsx)("span",{className:"form_notice_info",children:"(Option)"})," "]}),Object(p.jsx)(T.a.Control,{defaultValue:f,placeholder:"Input Description",as:"textarea",rows:"3",onChange:C})]}),Object(p.jsxs)(V.a,{className:"btn btn-info m-0 mr-3",disabled:!(g&&s&&u),onClick:A,children:[Object(p.jsx)(P.a,{size:"1x",icon:Y.a,className:"m-0"})," Submit"]})]})]})}function se(e){var t=Object(n.useState)(""),a=Object(r.a)(t,2),c=(a[0],a[1]),s=Object(n.useState)(""),i=Object(r.a)(s,2),o=i[0],l=(i[1],Object(n.useState)("")),u=Object(r.a)(l,2),j=(u[0],u[1]);return Object(n.useEffect)((function(){console.log("SettingStore==>>>>",k.getState().data)}),[]),Object(n.useEffect)((function(){if(o){var e=k.getState().config.webServer+"/MobileAuth/"+o;j(e),H.a.toDataURL(e,{width:338,type:"image/png",quality:1,color:{dark:"#000000",light:"#0000"}},(function(e,t){c(t)}))}}),[o]),Object(p.jsx)(d.a,{className:"content-body mt-3",children:"Nothing"})}function ie(e){return Object(p.jsx)(d.a,{children:Object(p.jsx)(se,{})})}var re=function(e){return Object(n.useEffect)((function(){}),[]),Object(p.jsx)(d.a,{fluid:!0,className:"m-0 p-0",children:Object(p.jsxs)(l.c,{children:[Object(p.jsx)(l.a,{exact:!0,path:"/",children:Object(p.jsx)(ae,{})}),Object(p.jsx)(l.a,{exact:!0,path:"/authUsers",children:Object(p.jsx)(ce,{})}),Object(p.jsx)(l.a,{exact:!0,path:"/authUsers/:uid",children:Object(p.jsx)(ne,{})}),Object(p.jsx)(l.a,{exact:!0,path:"/transReport",children:Object(p.jsx)(ie,{})})]})})},oe=(a(157),a(34)),le=(a(158),function(e){var t=new $,a=(new _,Object(n.useState)(!1)),c=Object(r.a)(a,2),s=c[0],i=c[1],u=Object(n.useState)(!1),j=Object(r.a)(u,2),b=j[0],h=j[1],f={isDesktopOrLaptop:Object(oe.useMediaQuery)({query:"(min-width: 1224px)"}),isBigScreen:Object(oe.useMediaQuery)({query:"(min-width: 1824px)"}),isTabletOrMobile:Object(oe.useMediaQuery)({query:"(max-width: 1224px)"}),isPortrait:Object(oe.useMediaQuery)({query:"(orientation: portrait)"}),isRetina:Object(oe.useMediaQuery)({query:"(min-resolution: 2dppx)"})},O=function(e){var a=k.getState().data.authInfo;t.loadingOn(),t.DatabaseApi("admin",{action:"checkTokenAuthCode",data:{token:a.token,authcode:a.authcode}},(function(a){t.loadingOff(),h("success"===a.status),e&&e()}))};Object(n.useEffect)((function(){var e=k.subscribe((function(){return"afterInit"===k.getState()._watcher&&O((function(){i(!0)})),"forceAuth"===k.getState()._watcher&&O(),!1}));return k.dispatch({type:"loadScreenModel",screenModel:f}),function(){e()}}),[]);var x=Object(p.jsx)(M,{comp:Object(p.jsx)(I.a,{animation:"border",size:"md",className:"loading-text"})}),m=Object(p.jsx)(M,{comp:Object(p.jsx)("span",{size:"lg",children:Object(p.jsx)("b",{children:"Admin Sign in"})})}),g=Object(p.jsx)(o.a,{className:"p-0 m-0",children:Object(p.jsxs)(l.c,{children:[Object(p.jsx)(l.a,{exact:!0,path:"/CrossFromMobile/:phone/:token",children:Object(p.jsx)(Z,{})}),Object(p.jsx)(l.a,{exact:!0,path:"/adminAuth/:token/:authcode",children:Object(p.jsx)(X,{})}),Object(p.jsxs)(l.a,{children:[b?Object(p.jsx)(ee,{}):m,Object(p.jsx)(C,{}),b?Object(p.jsx)(re,{}):Object(p.jsx)(d.a,{className:"p-3",children:Object(p.jsx)(K,{})}),Object(p.jsx)(te,{})]})]})});return s?g:x}),ue=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,170)).then((function(t){var a=t.getCLS,n=t.getFID,c=t.getFCP,s=t.getLCP,i=t.getTTFB;a(e),n(e),c(e),s(e),i(e)}))};document._cacheExist=!0,i.a.render(Object(p.jsx)(c.a.StrictMode,{children:Object(p.jsx)(le,{})}),document.getElementById("root")),ue()},93:function(e,t,a){}},[[159,1,2]]]);
//# sourceMappingURL=main.aa4b4a5e.chunk.js.map