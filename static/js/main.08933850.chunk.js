(this.webpackJsonpcovidcompare=this.webpackJsonpcovidcompare||[]).push([[0],{161:function(e,a,t){e.exports=t(170)},170:function(e,a,t){"use strict";t.r(a);var n=t(0),o=t.n(n),l=t(10),r=t.n(l),i=t(26),c=t(7),s=t(98),d=t(209),u=t(15),m=t(97),h=t(88),f=t.n(h),b=t(18),p=o.a.createContext(),k=o.a.createContext(),w={dateFormatter:c.k("%m-%d-%y"),dateParser:c.l("%m-%d-%y")},g={width:window.innerWidth,height:750,margin:{top:80,right:100,bottom:60,left:100}},v={width:g.width-g.margin.left-g.margin.right,height:g.height-g.margin.top-g.margin.bottom},y=function(e){var a=e.focus,t=e.overlay,o=e.linesStates,l=Object(n.useContext)(p).dataStates,r=Object(n.useContext)(k).selectedStates,i=c.i().domain(c.e(l,(function(e){return e.dayOfOutbreak}))).range([0,v.width]),s=c.i().domain(c.e(l,(function(e){return e.casesPerThousand}))).range([v.height,0]);return Object(n.useEffect)((function(){if(t){t.on("mousemove",(function(){var e=i.invert(c.g(this)[0]),t=c.c((function(e){return e.dayOfOutbreak})).left;Object.keys(r).sort().filter((function(e){return!0===r[e].selected})).forEach((function(n,o){var c=l.filter((function(e){return e.state===n})),d=r[n].htmlFormat,u=t(c,e,0),m=c[u]?c[u].casesPerThousand:c[c.length-1].casesPerThousand,h=c[u]?c[u].dayOfOutbreak:c[c.length-1].dayOfOutbreak,f=c[u]?w.dateFormatter(c[u].date):w.dateFormatter(c[c.length-1].date),b=c[u]?c[u].cases:c[c.length-1].cases;a.select("#circle-".concat(d)).attr("cy",s(m)).attr("cx",i(h)),a.select("#d-label-".concat(d)).text("".concat(r[n].abbreviation," => ").concat(f," (Day: ").concat(h,")")).attr("fill",r[n].color),a.select("#d-label-b-".concat(d)).text("".concat(b," cases (").concat(m.toFixed(3)," per 1000)")).attr("fill",r[n].color)}))}))}}),[o]),null},O=function(e){var a=e.focus,t=e.overlay,l=Object(n.useContext)(k).selectedStates,r=Object(n.useContext)(p).dataStates,s=Object(n.useState)([]),d=Object(i.a)(s,2),u=d[0],m=d[1];return Object(n.useEffect)((function(){if(r.length>0){var e=c.i().domain(c.e(r,(function(e){return e.dayOfOutbreak}))).range([0,v.width]),t=c.i().domain(c.e(r,(function(e){return e.casesPerThousand}))).range([v.height,0]),n=c.f().x((function(a){return e(a.dayOfOutbreak)})).y((function(e){return t(e.casesPerThousand)})),o={};Object.keys(l).sort().filter((function(e){return!0===l[e].selected})).forEach((function(i,c){var s=r.filter((function(e){return e.state===i})),d=b[i].htmlFormat,u=s[s.length-1].dayOfOutbreak,m=s[s.length-1].casesPerThousand,h=(l[i].lockdown-s[0].date)/864e5+1,f=s.filter((function(e){return e.dayOfOutbreak===h}))[0];o[i]=f?{line:n(s),lineLabelX:e(u)+3,lineLabelY:t(m),lockdownMarkerX:e(h),lockdownMarkerY:t(f.casesPerThousand)}:{line:n(s),lineLabelX:e(u)+3,lineLabelY:t(m)};var p=0,k=0;c>14&&(p+=200,k=600),a.append("circle").attr("id","circle-".concat(d)).attr("r",5).attr("fill",l[i].color).attr("stroke","white"),c<30&&(a.append("text").attr("id","d-label-".concat(d)).attr("x",10+p).attr("y",10+40*c-k).style("font-size",12),a.append("text").attr("id","d-label-b-".concat(d)).attr("x",10+p).attr("y",25+40*c-k).style("font-size",12))})),m(o)}}),[r,l]),o.a.createElement(o.a.Fragment,null,o.a.createElement(y,{focus:a,overlay:t,linesStates:u}),r.length>0?Object.keys(u).sort().map((function(e,a){var t=b[e].htmlFormat;return o.a.createElement("g",{key:a,id:"bounds-render-".concat(t)},o.a.createElement("path",{fill:"none",stroke:l[e].color,strokeWidth:2,strokeLinejoin:"round",strokeLinecap:"round",d:u[e].line}),o.a.createElement("circle",{id:"line-marker-lockdown",r:4,fill:u[e].lockdownMarkerX?l[e].color:"none",cx:u[e].lockdownMarkerX,cy:u[e].lockdownMarkerY}),o.a.createElement("text",{id:"line-label-".concat(t),className:"line-label",x:u[e].lineLabelX,y:u[e].lineLabelY,fontSize:14},l[e].abbreviation))})):o.a.createElement("g",null))},E=t(196),C=(t(71),g.margin),j=Object(E.a)({root:{color:"#f2ffcc",textAlign:"left",padding:0,fontSize:10,marginLeft:C.left,marginRight:C.right}}),S=function(){var e=j();return o.a.createElement(o.a.Fragment,null,o.a.createElement("p",{className:e.root},"Line marking indicates day of lockdown order/advisory"),o.a.createElement("p",{className:e.root},"*Data from The New York Times, based on reports from state and local health agencies."),o.a.createElement("p",{className:e.root},"*Population data from US Census Bureau (2019)."),o.a.createElement("p",{className:e.root},"*WA: although 2/27 is counted as 'Day 1,' WA had an isolated case on 1/21."))},F=g.width,M=g.height,x=g.margin,N=function(){var e=Object(n.useContext)(p).dataStates,a=Object(n.useRef)(null),t=Object(n.useRef)(null),l=Object(n.useRef)(null),r=Object(n.useRef)(null),i=c.j(r.current).append("g").attr("class","focus").style("display","none"),s=c.j(r.current).append("rect").attr("class","overlay").attr("width",v.width).attr("height",v.height).on("mouseover",(function(){return i.style("display",null)})).on("mouseout",(function(){return i.style("display","none")}));return Object(n.useEffect)((function(){var n=c.i().domain(c.e(e,(function(e){return e.dayOfOutbreak}))).range([0,v.width]),o=c.i().domain(c.e(e,(function(e){return e.casesPerThousand}))).range([v.height,0]),l=c.b().scale(o),r=c.a().scale(n);c.j(t.current).call(r),c.j(a.current).call(l)}),[e,window.innerWidth]),o.a.createElement("div",{height:M,width:F},o.a.createElement("svg",{height:M,width:F,ref:l},o.a.createElement("text",{className:"title",textAnchor:"middle",fill:"gray",transform:"translate (".concat(x.left+v.width/2,", ").concat(x.top/2,")")},"COVID-19 US State Comparison"),o.a.createElement("text",{className:"axes-label",textAnchor:"middle",transform:"translate(".concat(x.left+v.width/2,", ").concat(v.height+x.top+40,")")},"Day of Outbreak"),o.a.createElement("text",{className:"axes-label",textAnchor:"middle",transform:"translate(".concat(F-v.width-x.right-40,", ").concat(v.height/2,") rotate(-90)")},"Cases per 1000 people"),o.a.createElement("g",{id:"bounds",transform:"translate(".concat(x.left,", ").concat(x.top,")"),ref:r},o.a.createElement("g",{ref:a,id:"y-axis"}),o.a.createElement("g",{ref:t,id:"x-axis",transform:"translate(0,".concat(v.height,")")}),o.a.createElement(O,{focus:i,overlay:s}))))},L=t(39),A=t(13),P=t(207),T=t(203),B=t(202),D=t(208),W=t(216),G=t(206),I=t(3),R=t(199),Y=t(99),H=t(215),V=t(210),z=Object(E.a)({date:{backgroundColor:"#29293d",maxWidth:100,paddingLeft:10}}),K=function(){var e=Object(n.useContext)(k),a=e.selectedStates,t=e.setSelectedStates,l=Object(n.useState)(null),r=Object(i.a)(l,2),c=r[0],s=r[1],d=Object(n.useState)(null),u=Object(i.a)(d,2),m=u[0],h=u[1],f=Object(n.useState)(new Date),b=Object(i.a)(f,2),p=b[0],w=b[1],g=Object(n.useRef)(null),v=z(),y=function(e){s(e.currentTarget),h(e.currentTarget.name)},O=function(){s(null),h(null)},E=function(e){var n={},o=Object.keys(a).sort((function(e,t){return a[t].latestCaseCount-a[e].latestCaseCount})),l=Object.keys(a).sort((function(e,t){return a[t].latestCaseCount/a[t].population-a[e].latestCaseCount/a[e].population}));"cases-top-12"===e.target.id?o.forEach((function(e,t){n[e]=Object(A.a)({},a[e],{selected:t<12})})):"cases-bottom-12"===e.target.id?o.reverse().forEach((function(e,t){n[e]=Object(A.a)({},a[e],{selected:t<12})})):"cases-top-12-per-1000"===e.target.id?l.forEach((function(e,t){n[e]=Object(A.a)({},a[e],{selected:t<12})})):"cases-bottom-12-per-1000"===e.target.id&&l.reverse().forEach((function(e,t){n[e]=Object(A.a)({},a[e],{selected:t<12})})),t(n),O()},C=function(e){var n={};"all-with-lockdown"===e.target.id?Object.keys(a).forEach((function(e){n[e]=Object(A.a)({},a[e],{selected:a[e].lockdown<new Date})})):"all-without-lockdown"===e.target.id&&Object.keys(a).forEach((function(e){n[e]=Object(A.a)({},a[e],{selected:!(a[e].lockdown<new Date)})})),t(n),O()},j=function(e){var n={},o=Object.keys(a).sort((function(e,t){return a[t].population-a[e].population}));"population-top-12"===e.target.id?o.forEach((function(e,t){n[e]=Object(A.a)({},a[e],{selected:t<12})})):o.reverse().forEach((function(e,t){n[e]=Object(A.a)({},a[e],{selected:t<12})})),t(n),O()};return Object(n.useEffect)((function(){var e={};"lockdown-before"===g.current?Object.keys(a).forEach((function(t){e[t]=Object(A.a)({},a[t],{selected:a[t].lockdown<p})})):"lockdown-after"===g.current&&Object.keys(a).forEach((function(t){e[t]=Object(A.a)({},a[t],{selected:a[t].lockdown>p})})),t(e),O()}),[p]),o.a.createElement(o.a.Fragment,null,o.a.createElement(R.a,{id:"filter-cases",name:"cases",onClick:y},"Filter by Case Counts"),o.a.createElement(Y.a,{id:"filter-cases-menu",anchorEl:c,keepMounted:!0,open:Boolean("cases"===m),onClose:O},o.a.createElement(H.a,{id:"cases-top-12",onClick:E},"Highest 12 (total)"),o.a.createElement(H.a,{id:"cases-bottom-12",onClick:E},"Lowest 12 (total)"),o.a.createElement(H.a,{id:"cases-top-12-per-1000",onClick:E},"Highest 12 (per 1000)"),o.a.createElement(H.a,{id:"cases-bottom-12-per-1000",onClick:E},"Lowest 12 (per 1000)")),o.a.createElement(R.a,{id:"filter-lockdown",name:"lockdown",onClick:y},"Filter by Lockdown Date"),o.a.createElement(Y.a,{id:"filter-lockdown-menu",anchorEl:c,keepMounted:!0,open:Boolean("lockdown"===m),onClose:O},o.a.createElement(H.a,{id:"all-with-lockdown",onClick:C},"All with lockdown"),o.a.createElement(H.a,{id:"all-without-lockdown",onClick:C},"All without lockdown"),o.a.createElement(H.a,{id:"lockdown-before",ref:g,onClick:function(e){return g.current=e.currentTarget.id}},"Lockdown before:",o.a.createElement(V.a,{variant:"inline",disableToolbar:!0,autoOk:!0,value:p,onChange:function(e){w(e)},disableFuture:!0,format:"MM/dd/yyyy",className:v.date})),o.a.createElement(H.a,{id:"lockdown-after",ref:g,onClick:function(e){return g.current=e.currentTarget.id}},"Lockdown after:",o.a.createElement(V.a,{variant:"inline",disableToolbar:!0,autoOk:!0,value:p,onChange:function(e){return w(e)},disableFuture:!0,format:"MM/dd/yyyy",className:v.date}))),o.a.createElement(R.a,{id:"filter-population",name:"population",onClick:y},"Filter by Total Population"),o.a.createElement(Y.a,{id:"filter-population-menu",anchorEl:c,keepMounted:!0,open:Boolean("population"===m),onClose:O},o.a.createElement(H.a,{id:"population-top-12",onClick:j},"Highest 12"),o.a.createElement(H.a,{id:"population-bottom-12",onClick:j},"Lowest 12")))},q=t(204),X=t(205),J=t(173),U=t(212),Z=["AliceBlue","AntiqueWhite","Aquamarine","Azure","Beige","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Aqua","Coral","Cornsilk","Crimson","Cyan","DeepPink","DeepSkyBlue","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Ivory","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","RebeccaPurple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"],$=t(93),Q=t.n($),_=t(94),ee=t.n(_),ae=function(){var e=Object(n.useContext)(p).dataStates,a=Object(n.useContext)(k),t=a.selectedStates,l=a.setSelectedStates,r=function(e){l(Object(A.a)({},t,Object(L.a)({},e.target.name,Object(A.a)({},t[e.target.name],{selected:e.target.checked}))))};return Object(n.useEffect)((function(){var a=Object(c.l)("%m-%d-%y"),t={};Object.keys(b).forEach((function(e,n){t[e]=Object(A.a)({},b[e],{lockdown:b[e].lockdown.startsWith("none")?b[e].lockdown:a(b[e].lockdown),color:Z[n]})}));var n=Object(c.h)().key((function(e){return e.state})).entries(e);Object.keys(n).forEach((function(e){var a=n[e].key,o=n[e].values.length-1,l=n[e].values[o].cases;t[a]=Object(A.a)({},t[a],{latestCaseCount:l})})),l(t)}),[e]),o.a.createElement("div",null,o.a.createElement(q.a,{style:{alignItems:"left",backgroundColor:"#29293d"}},o.a.createElement(X.a,{id:"select-all",label:"Select All",name:"Select All",onClick:function(e){var a={};Object.keys(t).forEach((function(e,n){a[e]=Object(A.a)({},t[e],{selected:!0})})),l(a)},control:o.a.createElement(B.a,{id:"selector-all",name:"select-all",style:{color:"green"}},o.a.createElement(Q.a,null))}),o.a.createElement(X.a,{id:"deselect-all",label:"Deselect All",name:"Deselect All",onClick:function(e){var a={};Object.keys(t).forEach((function(e,n){a[e]=Object(A.a)({},t[e],{selected:!1})})),l(a)},control:o.a.createElement(B.a,{id:"deselector-all",name:"deselect-all",style:{color:"red"}},o.a.createElement(ee.a,null))}),o.a.createElement("br",null),o.a.createElement(J.a,{variant:"h6"},"Selected"),o.a.createElement(G.a,{style:{backgroundColor:"white"}}),t?Object.keys(t).sort().filter((function(e){return!0===t[e].selected})).map((function(e,a){return o.a.createElement(X.a,{key:a,id:t[e].htmlFormat,name:e,checked:t[e].selected,onChange:r,control:o.a.createElement(U.a,{name:e,style:{color:t[e].color}}),label:"".concat(e," (").concat(t[e].abbreviation,")")})})):o.a.createElement("div",null),o.a.createElement("br",null),o.a.createElement(J.a,{variant:"h6"},"Not Selected"),o.a.createElement(G.a,{style:{backgroundColor:"white"}}),t?Object.keys(t).sort().filter((function(e){return!1===t[e].selected})).map((function(e,a){return o.a.createElement(X.a,{key:a,id:t[e].htmlFormat,name:e,checked:t[e].selected,onChange:r,control:o.a.createElement(U.a,{name:e,style:{color:t[e].color}}),label:"".concat(e," (").concat(t[e].abbreviation,")")})})):o.a.createElement("div",null)))},te=t(95),ne=t.n(te),oe=t(96),le=t.n(oe),re=Object(E.a)((function(e){return{root:{display:"flex"},appBar:{transition:e.transitions.create(["margin","width"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen}),backgroundColor:"#000018"},appBarShift:{width:"calc(100% - ".concat(250,"px)"),marginLeft:250,transition:e.transitions.create(["margin","width"],{easing:e.transitions.easing.easeOut,duration:e.transitions.duration.enteringScreen})},menuButton:{marginRight:e.spacing(2),color:"#ffffff"},hide:{display:"none"},drawer:{width:250,flexShrink:1},drawerPaper:{width:250},drawerHeader:Object(A.a)({display:"flex",alignItems:"center",padding:e.spacing(0,1)},e.mixins.toolbar,{justifyContent:"flex-end",backgroundColor:e.palette.background.default})}})),ie=function(){var e=Object(n.useState)(!1),a=Object(i.a)(e,2),t=a[0],l=a[1],r=re();return o.a.createElement("div",{className:r.root},o.a.createElement(P.a,{position:"relative",className:Object(I.a)(r.appBar,Object(L.a)({},r.appBarShift,t))},o.a.createElement(T.a,null,o.a.createElement(B.a,{onClick:function(){l(!0)},edge:"start",className:Object(I.a)(r.menuButton,t&&r.hide)},o.a.createElement(ne.a,null)),o.a.createElement(K,null))),o.a.createElement(D.a,{onClickAway:function(e){e.x>250&&e.y>70&&t&&l(!1)}},o.a.createElement(W.a,{className:r.drawer,variant:"persistent",anchor:"left",open:t,classes:{paper:r.drawerPaper}},o.a.createElement("div",{className:r.drawerHeader},o.a.createElement(B.a,{color:"inherit",edge:"end",onClick:function(){l(!1)}},o.a.createElement(le.a,null))),o.a.createElement(G.a,null),o.a.createElement(ae,null))))},ce=Object(s.a)({palette:{background:{default:"#29293d"},text:{primary:"#fff",secondary:"#f2ffcc"},contrastThreshold:3},typography:{fontFamily:"Raleway, Arial"},overrides:{MuiMenu:{paper:{backgroundColor:"#29293d"}},MuiPickersCalendarHeader:{switchHeader:{color:"#29293d"}},MuiPickersDay:{day:{color:"#29293d"},daySelected:{backgroundColor:"#29293d"},dayDisabled:{color:"#29293d"},current:{color:"#29293d"}}}});var se=function(){var e=Object(n.useState)([]),a=Object(i.a)(e,2),t=a[0],l=a[1],r=Object(n.useState)([]),s=Object(i.a)(r,2),h=s[0],w=s[1];return Object(n.useEffect)((function(){c.d(f.a).then((function(e){var a=c.l("%Y-%m-%d");e.forEach((function(e){e.date=a(e.date),e.fips=parseInt(e.fips),e.cases=parseInt(e.cases),e.deaths=parseInt(e.deaths)})),e=e.filter((function(e){return e.date>new Date(2020,1,26)&&Object.keys(b).includes(e.state)})),Object.keys(b).forEach((function(a){var t=e.filter((function(e){return e.state===a}));t.forEach((function(e){e.dayOfOutbreak=(e.date-t[0].date)/864e5+1,e.casesPerThousand=e.cases/b[a].population*1e3,e.deathsPerThousand=e.deaths/b[a].population*1e3}))})),l(e),console.log("imported dataset")}))}),[]),o.a.createElement("div",{minWidth:"sm"},o.a.createElement(u.a,{utils:m.a},o.a.createElement(p.Provider,{value:{dataStates:t,setDataStates:l}},o.a.createElement(k.Provider,{value:{selectedStates:h,setSelectedStates:w}},o.a.createElement(d.a,{theme:ce},o.a.createElement(ie,{className:"header"}),o.a.createElement(N,{className:"chart"}),o.a.createElement(S,null))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(se,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},18:function(e){e.exports=JSON.parse('{"Alabama":{"name":"Alabama","abbreviation":"AL","htmlFormat":"alabama","lockdown":"04-04-20","population":4903185,"selected":false},"Alaska":{"name":"Alaska","abbreviation":"AK","htmlFormat":"alaska","lockdown":"03-28-20","population":731545,"selected":false},"Arizona":{"name":"Arizona","abbreviation":"AZ","htmlFormat":"arizona","lockdown":"03-31-20","population":7278717,"selected":false},"Arkansas":{"name":"Arkansas","abbreviation":"AR","htmlFormat":"arkansas","lockdown":"none as of 04-10","population":3017804,"selected":false},"California":{"name":"California","abbreviation":"CA","htmlFormat":"california","lockdown":"03-19-20","population":39512223,"selected":true},"Colorado":{"name":"Colorado","abbreviation":"CO","htmlFormat":"colorado","lockdown":"03-26-20","population":5758736,"selected":false},"Connecticut":{"name":"Connecticut","abbreviation":"CT","htmlFormat":"connecticut","lockdown":"03-23-20","population":3565287,"selected":false},"Delaware":{"name":"Delaware","abbreviation":"DE","htmlFormat":"delaware","lockdown":"03-24-20","population":973764,"selected":false},"District of Columbia":{"name":"District of Columbia","abbreviation":"DC","htmlFormat":"district-of-columbia","lockdown":"04-01-20","population":705749,"selected":false},"Florida":{"name":"Florida","abbreviation":"FL","htmlFormat":"florida","lockdown":"04-02-20","population":21477737,"selected":true},"Georgia":{"name":"Georgia","abbreviation":"GA","htmlFormat":"georgia","lockdown":"none as of 04-10","population":10617423,"selected":false},"Hawaii":{"name":"Hawaii","abbreviation":"HI","htmlFormat":"hawaii","lockdown":"03-25-20","population":1415872,"selected":true},"Idaho":{"name":"Idaho","abbreviation":"ID","htmlFormat":"idaho","lockdown":"03-25-20","population":1787065,"selected":false},"Illinois":{"name":"Illinois","abbreviation":"IL","htmlFormat":"illinois","lockdown":"03-21-20","population":12671821,"selected":true},"Indiana":{"name":"Indiana","abbreviation":"IN","htmlFormat":"indiana","lockdown":"03-24-20","population":6732219,"selected":false},"Iowa":{"name":"Iowa","abbreviation":"IA","htmlFormat":"iowa","lockdown":"none as of 04-10","population":3155070,"selected":false},"Kansas":{"name":"Kansas","abbreviation":"KS","htmlFormat":"kansas","lockdown":"03-30-20","population":2913314,"selected":false},"Kentucky":{"name":"Kentucky","abbreviation":"KY","htmlFormat":"kentucky","lockdown":"03-26-20","population":4467673,"selected":false},"Louisiana":{"name":"Louisiana","abbreviation":"LA","htmlFormat":"louisiana","lockdown":"03-23-20","population":4648794,"selected":true},"Maine":{"name":"Maine","abbreviation":"ME","htmlFormat":"maine","lockdown":"04-02-20","population":1344212,"selected":false},"Maryland":{"name":"Maryland","abbreviation":"MD","htmlFormat":"maryland","lockdown":"03-30-20","population":6045680,"selected":false},"Massachusetts":{"name":"Massachusetts","abbreviation":"MA","htmlFormat":"massachusetts","lockdown":"03-24-20","population":6892503,"selected":false},"Michigan":{"name":"Michigan","abbreviation":"MI","htmlFormat":"michigan","lockdown":"03-24-20","population":9986857,"selected":true},"Minnesota":{"name":"Minnesota","abbreviation":"MN","htmlFormat":"minnesota","lockdown":"03-27-20","population":5639632,"selected":false},"Mississippi":{"name":"Mississippi","abbreviation":"MS","htmlFormat":"mississippi","lockdown":"04-03-20","population":2976149,"selected":false},"Missouri":{"name":"Missouri","abbreviation":"MO","htmlFormat":"missouri","lockdown":"04-06-20","population":6137428,"selected":false},"Montana":{"name":"Montana","abbreviation":"MT","htmlFormat":"montana","lockdown":"03-28-20","population":1068778,"selected":false},"Nebraska":{"name":"Nebraska","abbreviation":"NE","htmlFormat":"nebraska","lockdown":"none as of 04-10","population":1934408,"selected":false},"Nevada":{"name":"Nevada","abbreviation":"NV","htmlFormat":"nevada","lockdown":"04-02-20","population":3080156,"selected":false},"New Hampshire":{"name":"New Hampshire","abbreviation":"NH","htmlFormat":"new-hampshire","lockdown":"03-27-20","population":1359711,"selected":false},"New Jersey":{"name":"New Jersey","abbreviation":"NJ","htmlFormat":"new-jersey","lockdown":"03-21-20","population":8882190,"selected":true},"New Mexico":{"name":"New Mexico","abbreviation":"NM","htmlFormat":"new-mexico","lockdown":"03-24-20","population":2096829,"selected":false},"New York":{"name":"New York","abbreviation":"NY","htmlFormat":"new-york","lockdown":"03-22-20","population":19453561,"selected":true},"North Carolina":{"name":"North Carolina","abbreviation":"NC","htmlFormat":"north-carolina","lockdown":"03-30-20","population":10488084,"selected":false},"North Dakota":{"name":"North Dakota","abbreviation":"ND","htmlFormat":"north-dakota","lockdown":"none as of 04-10","population":762062,"selected":false},"Ohio":{"name":"Ohio","abbreviation":"OH","htmlFormat":"ohio","lockdown":"03-23-20","population":11689100,"selected":false},"Oklahoma":{"name":"Oklahoma","abbreviation":"OK","htmlFormat":"oklahoma","lockdown":"04-02-20","population":3956971,"selected":false},"Oregon":{"name":"Oregon","abbreviation":"OR","htmlFormat":"oregon","lockdown":"03-23-20","population":4217737,"selected":false},"Pennsylvania":{"name":"Pennsylvania","abbreviation":"PA","htmlFormat":"pennsylvania","lockdown":"04-02-20","population":12801989,"selected":true},"Rhode Island":{"name":"Rhode Island","abbreviation":"RI","htmlFormat":"rhode-island","lockdown":"03-28-20","population":1059361,"selected":false},"South Carolina":{"name":"South Carolina","abbreviation":"SC","htmlFormat":"south-carolina","lockdown":"04-07-20","population":5148714,"selected":false},"South Dakota":{"name":"South Dakota","abbreviation":"SD","htmlFormat":"south-dakota","lockdown":"none as of 04-10","population":884659,"selected":false},"Tennessee":{"name":"Tennessee","abbreviation":"TN","htmlFormat":"tennessee","lockdown":"03-31-20","population":6829174,"selected":false},"Texas":{"name":"Texas","abbreviation":"TX","htmlFormat":"texas","lockdown":"04-02-20","population":28995881,"selected":false},"Utah":{"name":"Utah","abbreviation":"UT","htmlFormat":"utah","lockdown":"none as of 04-10","population":3205958,"selected":false},"Vermont":{"name":"Vermont","abbreviation":"VT","htmlFormat":"vermont","lockdown":"03-25-20","population":623989,"selected":false},"Virginia":{"name":"Virginia","abbreviation":"VA","htmlFormat":"virginia","lockdown":"03-30-20","population":8535519,"selected":false},"Washington":{"name":"Washington","abbreviation":"WA","htmlFormat":"washington","lockdown":"03-23-20","population":7614893,"selected":true},"West Virginia":{"name":"West Virginia","abbreviation":"WV","htmlFormat":"west-virginia","lockdown":"03-24-20","population":1792147,"selected":false},"Wisconsin":{"name":"Wisconsin","abbreviation":"WI","htmlFormat":"wisconsin","lockdown":"03-25-20","population":5822434,"selected":false},"Wyoming":{"name":"Wyoming","abbreviation":"WY","htmlFormat":"wyoming","lockdown":"none as of 04-10","population":578759,"selected":false}}')},71:function(e,a,t){},88:function(e,a,t){e.exports=t.p+"static/media/us-states.1e399162.csv"}},[[161,1,2]]]);
//# sourceMappingURL=main.08933850.chunk.js.map