var ObjectiveJ={};
(function(_1,_2){
if(!this.JSON){
JSON={};
}
(function(){
function f(n){
return n<10?"0"+n:n;
};
if(typeof Date.prototype.toJSON!=="function"){
Date.prototype.toJSON=function(_3){
return this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z";
};
String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(_4){
return this.valueOf();
};
}
var cx=new RegExp("[\\u0000\\u00ad\\u0600-\\u0604\\u070f\\u17b4\\u17b5\\u200c-\\u200f\\u2028-\\u202f\\u2060-\\u206f\\ufeff\\ufff0-\\uffff]","g");
var _5=new RegExp("[\\\\\\\"\\x00-\\x1f\\x7f-\\x9f\\u00ad\\u0600-\\u0604\\u070f\\u17b4\\u17b5\\u200c-\\u200f\\u2028-\\u202f\\u2060-\\u206f\\ufeff\\ufff0-\\uffff]","g");
var _6,_7,_8={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r","\"":"\\\"","\\":"\\\\"},_9;
function _a(_b){
_5.lastIndex=0;
return _5.test(_b)?"\""+_b.replace(_5,function(a){
var c=_8[a];
return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4);
})+"\"":"\""+_b+"\"";
};
function _c(_d,_e){
var i,k,v,_f,_10=_6,_11,_12=_e[_d];
if(_12&&typeof _12==="object"&&typeof _12.toJSON==="function"){
_12=_12.toJSON(_d);
}
if(typeof _9==="function"){
_12=_9.call(_e,_d,_12);
}
switch(typeof _12){
case "string":
return _a(_12);
case "number":
return isFinite(_12)?String(_12):"null";
case "boolean":
case "null":
return String(_12);
case "object":
if(!_12){
return "null";
}
_6+=_7;
_11=[];
if(Object.prototype.toString.apply(_12)==="[object Array]"){
_f=_12.length;
for(i=0;i<_f;i+=1){
_11[i]=_c(i,_12)||"null";
}
v=_11.length===0?"[]":_6?"[\n"+_6+_11.join(",\n"+_6)+"\n"+_10+"]":"["+_11.join(",")+"]";
_6=_10;
return v;
}
if(_9&&typeof _9==="object"){
_f=_9.length;
for(i=0;i<_f;i+=1){
k=_9[i];
if(typeof k==="string"){
v=_c(k,_12);
if(v){
_11.push(_a(k)+(_6?": ":":")+v);
}
}
}
}else{
for(k in _12){
if(Object.hasOwnProperty.call(_12,k)){
v=_c(k,_12);
if(v){
_11.push(_a(k)+(_6?": ":":")+v);
}
}
}
}
v=_11.length===0?"{}":_6?"{\n"+_6+_11.join(",\n"+_6)+"\n"+_10+"}":"{"+_11.join(",")+"}";
_6=_10;
return v;
}
};
if(typeof JSON.stringify!=="function"){
JSON.stringify=function(_13,_14,_15){
var i;
_6="";
_7="";
if(typeof _15==="number"){
for(i=0;i<_15;i+=1){
_7+=" ";
}
}else{
if(typeof _15==="string"){
_7=_15;
}
}
_9=_14;
if(_14&&typeof _14!=="function"&&(typeof _14!=="object"||typeof _14.length!=="number")){
throw new Error("JSON.stringify");
}
return _c("",{"":_13});
};
}
if(typeof JSON.parse!=="function"){
JSON.parse=function(_16,_17){
var j;
function _18(_19,key){
var k,v,_1a=_19[key];
if(_1a&&typeof _1a==="object"){
for(k in _1a){
if(Object.hasOwnProperty.call(_1a,k)){
v=_18(_1a,k);
if(v!==_44){
_1a[k]=v;
}else{
delete _1a[k];
}
}
}
}
return _17.call(_19,key,_1a);
};
cx.lastIndex=0;
if(cx.test(_16)){
_16=_16.replace(cx,function(a){
return "\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4);
});
}
if(/^[\],:{}\s]*$/.test(_16.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){
j=eval("("+_16+")");
return typeof _17==="function"?_18({"":j},""):j;
}
throw new SyntaxError("JSON.parse");
};
}
}());
var _1b=new RegExp("([^%]+|%[\\+\\-\\ \\#0]*[0-9\\*]*(.[0-9\\*]+)?[hlL]?[cbBdieEfgGosuxXpn%@])","g");
var _1c=new RegExp("(%)([\\+\\-\\ \\#0]*)([0-9\\*]*)((.[0-9\\*]+)?)([hlL]?)([cbBdieEfgGosuxXpn%@])");
_2.sprintf=function(_1d){
var _1d=arguments[0],_1e=_1d.match(_1b),_1f=0,_20="",arg=1;
for(var i=0;i<_1e.length;i++){
var t=_1e[i];
if(_1d.substring(_1f,_1f+t.length)!=t){
return _20;
}
_1f+=t.length;
if(t.charAt(0)!="%"){
_20+=t;
}else{
var _21=t.match(_1c);
if(_21.length!=8||_21[0]!=t){
return _20;
}
var _22=_21[1],_23=_21[2],_24=_21[3],_25=_21[4],_26=_21[6],_27=_21[7];
var _28=null;
if(_24=="*"){
_28=arguments[arg++];
}else{
if(_24!=""){
_28=Number(_24);
}
}
var _29=null;
if(_25==".*"){
_29=arguments[arg++];
}else{
if(_25!=""){
_29=Number(_25.substring(1));
}
}
var _2a=(_23.indexOf("-")>=0);
var _2b=(_23.indexOf("0")>=0);
var _2c="";
if(RegExp("[bBdiufeExXo]").test(_27)){
var num=Number(arguments[arg++]);
var _2d="";
if(num<0){
_2d="-";
}else{
if(_23.indexOf("+")>=0){
_2d="+";
}else{
if(_23.indexOf(" ")>=0){
_2d=" ";
}
}
}
if(_27=="d"||_27=="i"||_27=="u"){
var _2e=String(Math.abs(Math.floor(num)));
_2c=_2f(_2d,"",_2e,"",_28,_2a,_2b);
}
if(_27=="f"){
var _2e=String((_29!=null)?Math.abs(num).toFixed(_29):Math.abs(num));
var _30=(_23.indexOf("#")>=0&&_2e.indexOf(".")<0)?".":"";
_2c=_2f(_2d,"",_2e,_30,_28,_2a,_2b);
}
if(_27=="e"||_27=="E"){
var _2e=String(Math.abs(num).toExponential(_29!=null?_29:21));
var _30=(_23.indexOf("#")>=0&&_2e.indexOf(".")<0)?".":"";
_2c=_2f(_2d,"",_2e,_30,_28,_2a,_2b);
}
if(_27=="x"||_27=="X"){
var _2e=String(Math.abs(num).toString(16));
var _31=(_23.indexOf("#")>=0&&num!=0)?"0x":"";
_2c=_2f(_2d,_31,_2e,"",_28,_2a,_2b);
}
if(_27=="b"||_27=="B"){
var _2e=String(Math.abs(num).toString(2));
var _31=(_23.indexOf("#")>=0&&num!=0)?"0b":"";
_2c=_2f(_2d,_31,_2e,"",_28,_2a,_2b);
}
if(_27=="o"){
var _2e=String(Math.abs(num).toString(8));
var _31=(_23.indexOf("#")>=0&&num!=0)?"0":"";
_2c=_2f(_2d,_31,_2e,"",_28,_2a,_2b);
}
if(RegExp("[A-Z]").test(_27)){
_2c=_2c.toUpperCase();
}else{
_2c=_2c.toLowerCase();
}
}else{
var _2c="";
if(_27=="%"){
_2c="%";
}else{
if(_27=="c"){
_2c=String(arguments[arg++]).charAt(0);
}else{
if(_27=="s"||_27=="@"){
_2c=String(arguments[arg++]);
}else{
if(_27=="p"||_27=="n"){
arg++;
_2c="";
}
}
}
}
_2c=_2f("","",_2c,"",_28,_2a,false);
}
_20+=_2c;
}
}
return _20;
};
function _2f(_32,_33,_34,_35,_36,_37,_38){
var _39=(_32.length+_33.length+_34.length+_35.length);
if(_37){
return _32+_33+_34+_35+pad(_36-_39," ");
}else{
if(_38){
return _32+_33+pad(_36-_39,"0")+_34+_35;
}else{
return pad(_36-_39," ")+_32+_33+_34+_35;
}
}
};
function pad(n,ch){
return Array(MAX(0,n)+1).join(ch);
};
CPLogDisable=false;
var _3a="Cappuccino";
var _3b=["fatal","error","warn","info","debug","trace"];
var _3c=_3b[3];
var _3d={};
for(var i=0;i<_3b.length;i++){
_3d[_3b[i]]=i;
}
var _3e={};
CPLogRegister=function(_3f,_40){
CPLogRegisterRange(_3f,_3b[0],_40||_3b[_3b.length-1]);
};
CPLogRegisterRange=function(_41,_42,_43){
var min=_3d[_42];
var max=_3d[_43];
if(min!==_44&&max!==_44){
for(var i=0;i<=max;i++){
CPLogRegisterSingle(_41,_3b[i]);
}
}
};
CPLogRegisterSingle=function(_45,_46){
if(!_3e[_46]){
_3e[_46]=[];
}
for(var i=0;i<_3e[_46].length;i++){
if(_3e[_46][i]===_45){
return;
}
}
_3e[_46].push(_45);
};
CPLogUnregister=function(_47){
for(var _48 in _3e){
for(var i=0;i<_3e[_48].length;i++){
if(_3e[_48][i]===_47){
_3e[_48].splice(i--,1);
}
}
}
};
function _49(_4a,_4b,_4c){
if(_4c==_44){
_4c=_3a;
}
if(_4b==_44){
_4b=_3c;
}
var _4d=(typeof _4a[0]=="string"&&_4a.length>1)?_2.sprintf.apply(null,_4a):String(_4a[0]);
if(_3e[_4b]){
for(var i=0;i<_3e[_4b].length;i++){
_3e[_4b][i](_4d,_4b,_4c);
}
}
};
CPLog=function(){
_49(arguments);
};
for(var i=0;i<_3b.length;i++){
CPLog[_3b[i]]=(function(_4e){
return function(){
_49(arguments,_4e);
};
})(_3b[i]);
}
var _4f=function(_50,_51,_52){
var now=new Date();
_51=(_51==null?"":" ["+_51+"]");
if(typeof _2.sprintf=="function"){
return _2.sprintf("%4d-%02d-%02d %02d:%02d:%02d.%03d %s%s: %s",now.getFullYear(),now.getMonth(),now.getDate(),now.getHours(),now.getMinutes(),now.getSeconds(),now.getMilliseconds(),_52,_51,_50);
}else{
return now+" "+_52+_51+": "+_50;
}
};
CPLogConsole=function(_53,_54,_55){
if(typeof console!="undefined"){
var _56=_4f(_53,_54,_55);
var _57={"fatal":"error","error":"error","warn":"warn","info":"info","debug":"debug","trace":"debug"}[_54];
if(_57&&console[_57]){
console[_57](_56);
}else{
if(console.log){
console.log(_56);
}
}
}
};
CPLogAlert=function(_58,_59,_5a){
if(typeof alert!="undefined"&&!CPLogDisable){
var _5b=_4f(_58,_59,_5a);
CPLogDisable=!confirm(_5b+"\n\n(Click cancel to stop log alerts)");
}
};
var _5c=null;
CPLogPopup=function(_5d,_5e,_5f){
try{
if(CPLogDisable||window.open==_44){
return;
}
if(!_5c||!_5c.document){
_5c=window.open("","_blank","width=600,height=400,status=no,resizable=yes,scrollbars=yes");
if(!_5c){
CPLogDisable=!confirm(_5d+"\n\n(Disable pop-up blocking for CPLog window; Click cancel to stop log alerts)");
return;
}
_60(_5c);
}
var _61=_5c.document.createElement("div");
_61.setAttribute("class",_5e||"fatal");
var _62=_4f(_5d,null,_5f);
_61.appendChild(_5c.document.createTextNode(_62));
_5c.log.appendChild(_61);
if(_5c.focusEnabled.checked){
_5c.focus();
}
if(_5c.blockEnabled.checked){
_5c.blockEnabled.checked=_5c.confirm(_62+"\nContinue blocking?");
}
if(_5c.scrollEnabled.checked){
_5c.scrollToBottom();
}
}
catch(e){
}
};
var _63="<style type=\"text/css\" media=\"screen\"> body{font:10px Monaco,Courier,\"Courier New\",monospace,mono;padding-top:15px;} div > .fatal,div > .error,div > .warn,div > .info,div > .debug,div > .trace{display:none;overflow:hidden;white-space:pre;padding:0px 5px 0px 5px;margin-top:2px;-moz-border-radius:5px;-webkit-border-radius:5px;} div[wrap=\"yes\"] > div{white-space:normal;} .fatal{background-color:#ffb2b3;} .error{background-color:#ffe2b2;} .warn{background-color:#fdffb2;} .info{background-color:#e4ffb2;} .debug{background-color:#a0e5a0;} .trace{background-color:#99b9ff;} .enfatal .fatal,.enerror .error,.enwarn .warn,.eninfo .info,.endebug .debug,.entrace .trace{display:block;} div#header{background-color:rgba(240,240,240,0.82);position:fixed;top:0px;left:0px;width:100%;border-bottom:1px solid rgba(0,0,0,0.33);text-align:center;} ul#enablers{display:inline-block;margin:1px 15px 0 15px;padding:2px 0 2px 0;} ul#enablers li{display:inline;padding:0px 5px 0px 5px;margin-left:4px;-moz-border-radius:5px;-webkit-border-radius:5px;} [enabled=\"no\"]{opacity:0.25;} ul#options{display:inline-block;margin:0 15px 0px 15px;padding:0 0px;} ul#options li{margin:0 0 0 0;padding:0 0 0 0;display:inline;} </style>";
function _60(_64){
var doc=_64.document;
doc.writeln("<html><head><title></title>"+_63+"</head><body></body></html>");
doc.title=_3a+" Run Log";
var _65=doc.getElementsByTagName("head")[0];
var _66=doc.getElementsByTagName("body")[0];
var _67=window.location.protocol+"//"+window.location.host+window.location.pathname;
_67=_67.substring(0,_67.lastIndexOf("/")+1);
var div=doc.createElement("div");
div.setAttribute("id","header");
_66.appendChild(div);
var ul=doc.createElement("ul");
ul.setAttribute("id","enablers");
div.appendChild(ul);
for(var i=0;i<_3b.length;i++){
var li=doc.createElement("li");
li.setAttribute("id","en"+_3b[i]);
li.setAttribute("class",_3b[i]);
li.setAttribute("onclick","toggle(this);");
li.setAttribute("enabled","yes");
li.appendChild(doc.createTextNode(_3b[i]));
ul.appendChild(li);
}
var ul=doc.createElement("ul");
ul.setAttribute("id","options");
div.appendChild(ul);
var _68={"focus":["Focus",false],"block":["Block",false],"wrap":["Wrap",false],"scroll":["Scroll",true],"close":["Close",true]};
for(o in _68){
var li=doc.createElement("li");
ul.appendChild(li);
_64[o+"Enabled"]=doc.createElement("input");
_64[o+"Enabled"].setAttribute("id",o);
_64[o+"Enabled"].setAttribute("type","checkbox");
if(_68[o][1]){
_64[o+"Enabled"].setAttribute("checked","checked");
}
li.appendChild(_64[o+"Enabled"]);
var _69=doc.createElement("label");
_69.setAttribute("for",o);
_69.appendChild(doc.createTextNode(_68[o][0]));
li.appendChild(_69);
}
_64.log=doc.createElement("div");
_64.log.setAttribute("class","enerror endebug enwarn eninfo enfatal entrace");
_66.appendChild(_64.log);
_64.toggle=function(_6a){
var _6b=(_6a.getAttribute("enabled")=="yes")?"no":"yes";
_6a.setAttribute("enabled",_6b);
if(_6b=="yes"){
_64.log.className+=" "+_6a.id;
}else{
_64.log.className=_64.log.className.replace(new RegExp("[\\s]*"+_6a.id,"g"),"");
}
};
_64.scrollToBottom=function(){
_64.scrollTo(0,_66.offsetHeight);
};
_64.wrapEnabled.addEventListener("click",function(){
_64.log.setAttribute("wrap",_64.wrapEnabled.checked?"yes":"no");
},false);
_64.addEventListener("keydown",function(e){
var e=e||_64.event;
if(e.keyCode==75&&(e.ctrlKey||e.metaKey)){
while(_64.log.firstChild){
_64.log.removeChild(_64.log.firstChild);
}
e.preventDefault();
}
},"false");
window.addEventListener("unload",function(){
if(_64&&_64.closeEnabled&&_64.closeEnabled.checked){
CPLogDisable=true;
_64.close();
}
},false);
_64.addEventListener("unload",function(){
if(!CPLogDisable){
CPLogDisable=!confirm("Click cancel to stop logging");
}
},false);
};
CPLogDefault=(typeof window==="object"&&window.console)?CPLogConsole:CPLogPopup;
var _44;
if(typeof window!=="undefined"){
window.setNativeTimeout=window.setTimeout;
window.clearNativeTimeout=window.clearTimeout;
window.setNativeInterval=window.setInterval;
window.clearNativeInterval=window.clearInterval;
}
NO=false;
YES=true;
nil=null;
Nil=null;
NULL=null;
ABS=Math.abs;
ASIN=Math.asin;
ACOS=Math.acos;
ATAN=Math.atan;
ATAN2=Math.atan2;
SIN=Math.sin;
COS=Math.cos;
TAN=Math.tan;
EXP=Math.exp;
POW=Math.pow;
CEIL=Math.ceil;
FLOOR=Math.floor;
ROUND=Math.round;
MIN=Math.min;
MAX=Math.max;
RAND=Math.random;
SQRT=Math.sqrt;
E=Math.E;
LN2=Math.LN2;
LN10=Math.LN10;
LOG2E=Math.LOG2E;
LOG10E=Math.LOG10E;
PI=Math.PI;
PI2=Math.PI*2;
PI_2=Math.PI/2;
SQRT1_2=Math.SQRT1_2;
SQRT2=Math.SQRT2;
function _6c(_6d){
this._eventListenersForEventNames={};
this._owner=_6d;
};
_6c.prototype.addEventListener=function(_6e,_6f){
var _70=this._eventListenersForEventNames;
if(!_71.call(_70,_6e)){
var _72=[];
_70[_6e]=_72;
}else{
var _72=_70[_6e];
}
var _73=_72.length;
while(_73--){
if(_72[_73]===_6f){
return;
}
}
_72.push(_6f);
};
_6c.prototype.removeEventListener=function(_74,_75){
var _76=this._eventListenersForEventNames;
if(!_71.call(_76,_74)){
return;
}
var _77=_76[_74],_78=_77.length;
while(_78--){
if(_77[_78]===_75){
return _77.splice(_78,1);
}
}
};
_6c.prototype.dispatchEvent=function(_79){
var _7a=_79.type,_7b=this._eventListenersForEventNames;
if(_71.call(_7b,_7a)){
var _7c=this._eventListenersForEventNames[_7a],_7d=0,_7e=_7c.length;
for(;_7d<_7e;++_7d){
_7c[_7d](_79);
}
}
var _7f=(this._owner||this)["on"+_7a];
if(_7f){
_7f(_79);
}
};
var _80=0,_81=null,_82=[];
function _83(_84){
var _85=_80;
if(_81===null){
window.setNativeTimeout(function(){
var _86=_82,_87=0,_88=_82.length;
++_80;
_81=null;
_82=[];
for(;_87<_88;++_87){
_86[_87]();
}
},0);
}
return function(){
var _89=arguments;
if(_80>_85){
_84.apply(this,_89);
}else{
_82.push(function(){
_84.apply(this,_89);
});
}
};
};
var _8a=null;
if(window.ActiveXObject!==_44){
var _8b=["Msxml2.XMLHTTP.3.0","Msxml2.XMLHTTP.6.0"],_8c=_8b.length;
while(_8c--){
try{
var _8d=_8b[_8c];
new ActiveXObject(_8d);
_8a=function(){
return new ActiveXObject(_8d);
};
break;
}
catch(anException){
}
}
}
if(!_8a){
_8a=window.XMLHttpRequest;
}
CFHTTPRequest=function(){
this._eventDispatcher=new _6c(this);
this._nativeRequest=new _8a();
var _8e=this;
this._nativeRequest.onreadystatechange=function(){
_8f(_8e);
};
};
CFHTTPRequest.UninitializedState=0;
CFHTTPRequest.LoadingState=1;
CFHTTPRequest.LoadedState=2;
CFHTTPRequest.InteractiveState=3;
CFHTTPRequest.CompleteState=4;
CFHTTPRequest.prototype.status=function(){
try{
return this._nativeRequest.status||0;
}
catch(anException){
return 0;
}
};
CFHTTPRequest.prototype.statusText=function(){
try{
return this._nativeRequest.statusText||"";
}
catch(anException){
return "";
}
};
CFHTTPRequest.prototype.readyState=function(){
return this._nativeRequest.readyState;
};
CFHTTPRequest.prototype.success=function(){
var _90=this.status();
if(_90>=200&&_90<300){
return YES;
}
return _90===0&&this.responseText()&&this.responseText().length;
};
CFHTTPRequest.prototype.responseXML=function(){
var _91=this._nativeRequest.responseXML;
if(_91&&(_8a===window.XMLHttpRequest)){
return _91;
}
return _92(this.responseText());
};
CFHTTPRequest.prototype.responsePropertyList=function(){
var _93=this.responseText();
if(CFPropertyList.sniffedFormatOfString(_93)===CFPropertyList.FormatXML_v1_0){
return CFPropertyList.propertyListFromXML(this.responseXML());
}
return CFPropertyList.propertyListFromString(_93);
};
CFHTTPRequest.prototype.responseText=function(){
return this._nativeRequest.responseText;
};
CFHTTPRequest.prototype.setRequestHeader=function(_94,_95){
return this._nativeRequest.setRequestHeader(_94,_95);
};
CFHTTPRequest.prototype.getResponseHeader=function(_96){
return this._nativeRequest.getResponseHeader(_96);
};
CFHTTPRequest.prototype.getAllResponseHeaders=function(){
return this._nativeRequest.getAllResponseHeaders();
};
CFHTTPRequest.prototype.overrideMimeType=function(_97){
if("overrideMimeType" in this._nativeRequest){
return this._nativeRequest.overrideMimeType(_97);
}
};
CFHTTPRequest.prototype.open=function(_98,_99,_9a,_9b,_9c){
return this._nativeRequest.open(_98,_99,_9a,_9b,_9c);
};
CFHTTPRequest.prototype.send=function(_9d){
try{
return this._nativeRequest.send(_9d);
}
catch(anException){
this._eventDispatcher.dispatchEvent({type:"failure",request:this});
}
};
CFHTTPRequest.prototype.abort=function(){
return this._nativeRequest.abort();
};
CFHTTPRequest.prototype.addEventListener=function(_9e,_9f){
this._eventDispatcher.addEventListener(_9e,_9f);
};
CFHTTPRequest.prototype.removeEventListener=function(_a0,_a1){
this._eventDispatcher.removeEventListener(_a0,_a1);
};
function _8f(_a2){
var _a3=_a2._eventDispatcher;
_a3.dispatchEvent({type:"readystatechange",request:_a2});
var _a4=_a2._nativeRequest,_a5=["uninitialized","loading","loaded","interactive","complete"][_a2.readyState()];
_a3.dispatchEvent({type:_a5,request:_a2});
if(_a5==="complete"){
var _a6="HTTP"+_a2.status();
_a3.dispatchEvent({type:_a6,request:_a2});
var _a7=_a2.success()?"success":"failure";
_a3.dispatchEvent({type:_a7,request:_a2});
}
};
function _a8(_a9,_aa,_ab){
var _ac=new CFHTTPRequest();
if(_a9.pathExtension()==="plist"){
_ac.overrideMimeType("text/xml");
}
if(_2.asyncLoader){
_ac.onsuccess=_83(_aa);
_ac.onfailure=_83(_ab);
}else{
_ac.onsuccess=_aa;
_ac.onfailure=_ab;
}
_ac.open("GET",_a9.absoluteString(),_2.asyncLoader);
_ac.send("");
};
_2.asyncLoader=YES;
_2.Asynchronous=_83;
_2.determineAndDispatchHTTPRequestEvents=_8f;
var _ad=0;
objj_generateObjectUID=function(){
return _ad++;
};
CFPropertyList=function(){
this._UID=objj_generateObjectUID();
};
CFPropertyList.DTDRE=/^\s*(?:<\?\s*xml\s+version\s*=\s*\"1.0\"[^>]*\?>\s*)?(?:<\!DOCTYPE[^>]*>\s*)?/i;
CFPropertyList.XMLRE=/^\s*(?:<\?\s*xml\s+version\s*=\s*\"1.0\"[^>]*\?>\s*)?(?:<\!DOCTYPE[^>]*>\s*)?<\s*plist[^>]*\>/i;
CFPropertyList.FormatXMLDTD="<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<!DOCTYPE plist PUBLIC \"-//Apple//DTD PLIST 1.0//EN\" \"http://www.apple.com/DTDs/PropertyList-1.0.dtd\">";
CFPropertyList.Format280NorthMagicNumber="280NPLIST";
CFPropertyList.FormatOpenStep=1,CFPropertyList.FormatXML_v1_0=100,CFPropertyList.FormatBinary_v1_0=200,CFPropertyList.Format280North_v1_0=-1000;
CFPropertyList.sniffedFormatOfString=function(_ae){
if(_ae.match(CFPropertyList.XMLRE)){
return CFPropertyList.FormatXML_v1_0;
}
if(_ae.substr(0,CFPropertyList.Format280NorthMagicNumber.length)===CFPropertyList.Format280NorthMagicNumber){
return CFPropertyList.Format280North_v1_0;
}
return NULL;
};
CFPropertyList.dataFromPropertyList=function(_af,_b0){
var _b1=new CFMutableData();
_b1.setRawString(CFPropertyList.stringFromPropertyList(_af,_b0));
return _b1;
};
CFPropertyList.stringFromPropertyList=function(_b2,_b3){
if(!_b3){
_b3=CFPropertyList.Format280North_v1_0;
}
var _b4=_b5[_b3];
return _b4["start"]()+_b6(_b2,_b4)+_b4["finish"]();
};
function _b6(_b7,_b8){
var _b9=typeof _b7,_ba=_b7.valueOf(),_bb=typeof _ba;
if(_b9!==_bb){
_b9=_bb;
_b7=_ba;
}
if(_b7===YES||_b7===NO){
_b9="boolean";
}else{
if(_b9==="number"){
if(FLOOR(_b7)===_b7){
_b9="integer";
}else{
_b9="real";
}
}else{
if(_b9!=="string"){
if(_b7.slice){
_b9="array";
}else{
_b9="dictionary";
}
}
}
}
return _b8[_b9](_b7,_b8);
};
var _b5={};
_b5[CFPropertyList.FormatXML_v1_0]={"start":function(){
return CFPropertyList.FormatXMLDTD+"<plist version = \"1.0\">";
},"finish":function(){
return "</plist>";
},"string":function(_bc){
return "<string>"+_bd(_bc)+"</string>";
},"boolean":function(_be){
return _be?"<true/>":"<false/>";
},"integer":function(_bf){
return "<integer>"+_bf+"</integer>";
},"real":function(_c0){
return "<real>"+_c0+"</real>";
},"array":function(_c1,_c2){
var _c3=0,_c4=_c1.length,_c5="<array>";
for(;_c3<_c4;++_c3){
_c5+=_b6(_c1[_c3],_c2);
}
return _c5+"</array>";
},"dictionary":function(_c6,_c7){
var _c8=_c6._keys,_8c=0,_c9=_c8.length,_ca="<dict>";
for(;_8c<_c9;++_8c){
var key=_c8[_8c];
_ca+="<key>"+key+"</key>";
_ca+=_b6(_c6.valueForKey(key),_c7);
}
return _ca+"</dict>";
}};
var _cb="A",_cc="D",_cd="f",_ce="d",_cf="S",_d0="T",_d1="F",_d2="K",_d3="E";
_b5[CFPropertyList.Format280North_v1_0]={"start":function(){
return CFPropertyList.Format280NorthMagicNumber+";1.0;";
},"finish":function(){
return "";
},"string":function(_d4){
return _cf+";"+_d4.length+";"+_d4;
},"boolean":function(_d5){
return (_d5?_d0:_d1)+";";
},"integer":function(_d6){
var _d7=""+_d6;
return _ce+";"+_d7.length+";"+_d7;
},"real":function(_d8){
var _d9=""+_d8;
return _cd+";"+_d9.length+";"+_d9;
},"array":function(_da,_db){
var _dc=0,_dd=_da.length,_de=_cb+";";
for(;_dc<_dd;++_dc){
_de+=_b6(_da[_dc],_db);
}
return _de+_d3+";";
},"dictionary":function(_df,_e0){
var _e1=_df._keys,_8c=0,_e2=_e1.length,_e3=_cc+";";
for(;_8c<_e2;++_8c){
var key=_e1[_8c];
_e3+=_d2+";"+key.length+";"+key;
_e3+=_b6(_df.valueForKey(key),_e0);
}
return _e3+_d3+";";
}};
var _e4="xml",_e5="#document",_e6="plist",_e7="key",_e8="dict",_e9="array",_ea="string",_eb="true",_ec="false",_ed="real",_ee="integer",_ef="data";
var _f0=function(_f1,_f2,_f3){
var _f4=_f1;
_f4=(_f4.firstChild);
if(_f4!==NULL&&((_f4.nodeType)===8||(_f4.nodeType)===3)){
while((_f4=(_f4.nextSibling))&&((_f4.nodeType)===8||(_f4.nodeType)===3)){
}
}
if(_f4){
return _f4;
}
if((String(_f1.nodeName))===_e9||(String(_f1.nodeName))===_e8){
_f3.pop();
}else{
if(_f4===_f2){
return NULL;
}
_f4=_f1;
while((_f4=(_f4.nextSibling))&&((_f4.nodeType)===8||(_f4.nodeType)===3)){
}
if(_f4){
return _f4;
}
}
_f4=_f1;
while(_f4){
var _f5=_f4;
while((_f5=(_f5.nextSibling))&&((_f5.nodeType)===8||(_f5.nodeType)===3)){
}
if(_f5){
return _f5;
}
var _f4=(_f4.parentNode);
if(_f2&&_f4===_f2){
return NULL;
}
_f3.pop();
}
return NULL;
};
CFPropertyList.propertyListFromData=function(_f6,_f7){
return CFPropertyList.propertyListFromString(_f6.rawString(),_f7);
};
CFPropertyList.propertyListFromString=function(_f8,_f9){
if(!_f9){
_f9=CFPropertyList.sniffedFormatOfString(_f8);
}
if(_f9===CFPropertyList.FormatXML_v1_0){
return CFPropertyList.propertyListFromXML(_f8);
}
if(_f9===CFPropertyList.Format280North_v1_0){
return _fa(_f8);
}
return NULL;
};
var _cb="A",_cc="D",_cd="f",_ce="d",_cf="S",_d0="T",_d1="F",_d2="K",_d3="E";
function _fa(_fb){
var _fc=new _fd(_fb),_fe=NULL,key="",_ff=NULL,_100=NULL,_101=[],_102=NULL;
while(_fe=_fc.getMarker()){
if(_fe===_d3){
_101.pop();
continue;
}
var _103=_101.length;
if(_103){
_102=_101[_103-1];
}
if(_fe===_d2){
key=_fc.getString();
_fe=_fc.getMarker();
}
switch(_fe){
case _cb:
_ff=[];
_101.push(_ff);
break;
case _cc:
_ff=new CFMutableDictionary();
_101.push(_ff);
break;
case _cd:
_ff=parseFloat(_fc.getString());
break;
case _ce:
_ff=parseInt(_fc.getString(),10);
break;
case _cf:
_ff=_fc.getString();
break;
case _d0:
_ff=YES;
break;
case _d1:
_ff=NO;
break;
default:
throw new Error("*** "+_fe+" marker not recognized in Plist.");
}
if(!_100){
_100=_ff;
}else{
if(_102){
if(_102.slice){
_102.push(_ff);
}else{
_102.setValueForKey(key,_ff);
}
}
}
}
return _100;
};
function _bd(_104){
return _104.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&apos;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
};
function _105(_106){
return _106.replace(/&quot;/g,"\"").replace(/&apos;/g,"'").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&");
};
function _92(_107){
if(window.DOMParser){
return (new window.DOMParser().parseFromString(_107,"text/xml").documentElement);
}else{
if(window.ActiveXObject){
XMLNode=new ActiveXObject("Microsoft.XMLDOM");
var _108=_107.match(CFPropertyList.DTDRE);
if(_108){
_107=_107.substr(_108[0].length);
}
XMLNode.loadXML(_107);
return XMLNode;
}
}
return NULL;
};
CFPropertyList.propertyListFromXML=function(_109){
var _10a=_109;
if(_109.valueOf&&typeof _109.valueOf()==="string"){
_10a=_92(_109);
}
while(((String(_10a.nodeName))===_e5)||((String(_10a.nodeName))===_e4)){
_10a=(_10a.firstChild);
}
if(_10a!==NULL&&((_10a.nodeType)===8||(_10a.nodeType)===3)){
while((_10a=(_10a.nextSibling))&&((_10a.nodeType)===8||(_10a.nodeType)===3)){
}
}
if(((_10a.nodeType)===10)){
while((_10a=(_10a.nextSibling))&&((_10a.nodeType)===8||(_10a.nodeType)===3)){
}
}
if(!((String(_10a.nodeName))===_e6)){
return NULL;
}
var key="",_10b=NULL,_10c=NULL,_10d=_10a,_10e=[],_10f=NULL;
while(_10a=_f0(_10a,_10d,_10e)){
var _110=_10e.length;
if(_110){
_10f=_10e[_110-1];
}
if((String(_10a.nodeName))===_e7){
key=((String((_10a.firstChild).nodeValue)));
while((_10a=(_10a.nextSibling))&&((_10a.nodeType)===8||(_10a.nodeType)===3)){
}
}
switch(String((String(_10a.nodeName)))){
case _e9:
_10b=[];
_10e.push(_10b);
break;
case _e8:
_10b=new CFMutableDictionary();
_10e.push(_10b);
break;
case _ed:
_10b=parseFloat(((String((_10a.firstChild).nodeValue))));
break;
case _ee:
_10b=parseInt(((String((_10a.firstChild).nodeValue))),10);
break;
case _ea:
_10b=_105((_10a.firstChild)?((String((_10a.firstChild).nodeValue))):"");
break;
case _eb:
_10b=YES;
break;
case _ec:
_10b=NO;
break;
case _ef:
_10b=new CFMutableData();
_10b.bytes=(_10a.firstChild)?CFData.decodeBase64ToArray(((String((_10a.firstChild).nodeValue))),YES):[];
break;
default:
throw new Error("*** "+(String(_10a.nodeName))+" tag not recognized in Plist.");
}
if(!_10c){
_10c=_10b;
}else{
if(_10f){
if(_10f.slice){
_10f.push(_10b);
}else{
_10f.setValueForKey(key,_10b);
}
}
}
}
return _10c;
};
kCFPropertyListOpenStepFormat=CFPropertyList.FormatOpenStep;
kCFPropertyListXMLFormat_v1_0=CFPropertyList.FormatXML_v1_0;
kCFPropertyListBinaryFormat_v1_0=CFPropertyList.FormatBinary_v1_0;
kCFPropertyList280NorthFormat_v1_0=CFPropertyList.Format280North_v1_0;
CFPropertyListCreate=function(){
return new CFPropertyList();
};
CFPropertyListCreateFromXMLData=function(data){
return CFPropertyList.propertyListFromData(data,CFPropertyList.FormatXML_v1_0);
};
CFPropertyListCreateXMLData=function(_111){
return CFPropertyList.dataFromPropertyList(_111,CFPropertyList.FormatXML_v1_0);
};
CFPropertyListCreateFrom280NorthData=function(data){
return CFPropertyList.propertyListFromData(data,CFPropertyList.Format280North_v1_0);
};
CFPropertyListCreate280NorthData=function(_112){
return CFPropertyList.dataFromPropertyList(_112,CFPropertyList.Format280North_v1_0);
};
CPPropertyListCreateFromData=function(data,_113){
return CFPropertyList.propertyListFromData(data,_113);
};
CPPropertyListCreateData=function(_114,_115){
return CFPropertyList.dataFromPropertyList(_114,_115);
};
CFDictionary=function(_116){
this._keys=[];
this._count=0;
this._buckets={};
this._UID=objj_generateObjectUID();
};
var _117=Array.prototype.indexOf,_71=Object.prototype.hasOwnProperty;
CFDictionary.prototype.copy=function(){
return this;
};
CFDictionary.prototype.mutableCopy=function(){
var _118=new CFMutableDictionary(),keys=this._keys,_119=this._count;
_118._keys=keys.slice();
_118._count=_119;
var _11a=0,_11b=this._buckets,_11c=_118._buckets;
for(;_11a<_119;++_11a){
var key=keys[_11a];
_11c[key]=_11b[key];
}
return _118;
};
CFDictionary.prototype.containsKey=function(aKey){
return _71.apply(this._buckets,[aKey]);
};
CFDictionary.prototype.containsValue=function(_11d){
var keys=this._keys,_11e=this._buckets,_8c=0,_11f=keys.length;
for(;_8c<_11f;++_8c){
if(_11e[keys]===_11d){
return YES;
}
}
return NO;
};
CFDictionary.prototype.count=function(){
return this._count;
};
CFDictionary.prototype.countOfKey=function(aKey){
return this.containsKey(aKey)?1:0;
};
CFDictionary.prototype.countOfValue=function(_120){
var keys=this._keys,_121=this._buckets,_8c=0,_122=keys.length,_123=0;
for(;_8c<_122;++_8c){
if(_121[keys]===_120){
return ++_123;
}
}
return _123;
};
CFDictionary.prototype.keys=function(){
return this._keys.slice();
};
CFDictionary.prototype.valueForKey=function(aKey){
var _124=this._buckets;
if(!_71.apply(_124,[aKey])){
return nil;
}
return _124[aKey];
};
CFDictionary.prototype.toString=function(){
var _125="{\n",keys=this._keys,_8c=0,_126=this._count;
for(;_8c<_126;++_8c){
var key=keys[_8c];
_125+="\t"+key+" = \""+String(this.valueForKey(key)).split("\n").join("\n\t")+"\"\n";
}
return _125+"}";
};
CFMutableDictionary=function(_127){
CFDictionary.apply(this,[]);
};
CFMutableDictionary.prototype=new CFDictionary();
CFMutableDictionary.prototype.copy=function(){
return this.mutableCopy();
};
CFMutableDictionary.prototype.addValueForKey=function(aKey,_128){
if(this.containsKey(aKey)){
return;
}
++this._count;
this._keys.push(aKey);
this._buckets[aKey]=_128;
};
CFMutableDictionary.prototype.removeValueForKey=function(aKey){
var _129=-1;
if(_117){
_129=_117.call(this._keys,aKey);
}else{
var keys=this._keys,_8c=0,_12a=keys.length;
for(;_8c<_12a;++_8c){
if(keys[_8c]===aKey){
_129=_8c;
break;
}
}
}
if(_129===-1){
return;
}
--this._count;
this._keys.splice(_129,1);
delete this._buckets[aKey];
};
CFMutableDictionary.prototype.removeAllValues=function(){
this._count=0;
this._keys=[];
this._buckets={};
};
CFMutableDictionary.prototype.replaceValueForKey=function(aKey,_12b){
if(!this.containsKey(aKey)){
return;
}
this._buckets[aKey]=_12b;
};
CFMutableDictionary.prototype.setValueForKey=function(aKey,_12c){
if(_12c===nil||_12c===_44){
this.removeValueForKey(aKey);
}else{
if(this.containsKey(aKey)){
this.replaceValueForKey(aKey,_12c);
}else{
this.addValueForKey(aKey,_12c);
}
}
};
CFData=function(){
this._rawString=NULL;
this._propertyList=NULL;
this._propertyListFormat=NULL;
this._JSONObject=NULL;
this._bytes=NULL;
this._base64=NULL;
};
CFData.prototype.propertyList=function(){
if(!this._propertyList){
this._propertyList=CFPropertyList.propertyListFromString(this.rawString());
}
return this._propertyList;
};
CFData.prototype.JSONObject=function(){
if(!this._JSONObject){
try{
this._JSONObject=JSON.parse(this.rawString());
}
catch(anException){
}
}
return this._JSONObject;
};
CFData.prototype.rawString=function(){
if(this._rawString===NULL){
if(this._propertyList){
this._rawString=CFPropertyList.stringFromPropertyList(this._propertyList,this._propertyListFormat);
}else{
if(this._JSONObject){
this._rawString=JSON.stringify(this._JSONObject);
}else{
throw new Error("Can't convert data to string.");
}
}
}
return this._rawString;
};
CFData.prototype.bytes=function(){
return this._bytes;
};
CFData.prototype.base64=function(){
return this._base64;
};
CFMutableData=function(){
CFData.call(this);
};
CFMutableData.prototype=new CFData();
function _12d(_12e){
this._rawString=NULL;
this._propertyList=NULL;
this._propertyListFormat=NULL;
this._JSONObject=NULL;
this._bytes=NULL;
this._base64=NULL;
};
CFMutableData.prototype.setPropertyList=function(_12f,_130){
_12d(this);
this._propertyList=_12f;
this._propertyListFormat=_130;
};
CFMutableData.prototype.setJSONObject=function(_131){
_12d(this);
this._JSONObject=_131;
};
CFMutableData.prototype.setRawString=function(_132){
_12d(this);
this._rawString=_132;
};
CFMutableData.prototype.setBytes=function(_133){
_12d(this);
this._bytes=_133;
};
CFMutableData.prototype.setBase64String=function(_134){
_12d(this);
this._base64=_134;
};
var _135=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9","+","/","="],_136=[];
for(var i=0;i<_135.length;i++){
_136[_135[i].charCodeAt(0)]=i;
}
CFData.decodeBase64ToArray=function(_137,_138){
if(_138){
_137=_137.replace(/[^A-Za-z0-9\+\/\=]/g,"");
}
var pad=(_137[_137.length-1]=="="?1:0)+(_137[_137.length-2]=="="?1:0),_139=_137.length,_13a=[];
var i=0;
while(i<_139){
var bits=(_136[_137.charCodeAt(i++)]<<18)|(_136[_137.charCodeAt(i++)]<<12)|(_136[_137.charCodeAt(i++)]<<6)|(_136[_137.charCodeAt(i++)]);
_13a.push((bits&16711680)>>16);
_13a.push((bits&65280)>>8);
_13a.push(bits&255);
}
if(pad>0){
return _13a.slice(0,-1*pad);
}
return _13a;
};
CFData.encodeBase64Array=function(_13b){
var pad=(3-(_13b.length%3))%3,_13c=_13b.length+pad,_13d=[];
if(pad>0){
_13b.push(0);
}
if(pad>1){
_13b.push(0);
}
var i=0;
while(i<_13c){
var bits=(_13b[i++]<<16)|(_13b[i++]<<8)|(_13b[i++]);
_13d.push(_135[(bits&16515072)>>18]);
_13d.push(_135[(bits&258048)>>12]);
_13d.push(_135[(bits&4032)>>6]);
_13d.push(_135[bits&63]);
}
if(pad>0){
_13d[_13d.length-1]="=";
_13b.pop();
}
if(pad>1){
_13d[_13d.length-2]="=";
_13b.pop();
}
return _13d.join("");
};
CFData.decodeBase64ToString=function(_13e,_13f){
return CFData.bytesToString(CFData.decodeBase64ToArray(_13e,_13f));
};
CFData.bytesToString=function(_140){
return String.fromCharCode.apply(NULL,_140);
};
CFData.encodeBase64String=function(_141){
var temp=[];
for(var i=0;i<_141.length;i++){
temp.push(_141.charCodeAt(i));
}
return CFData.encodeBase64Array(temp);
};
var _142,_143,_144=0;
function _145(){
if(++_144!==1){
return;
}
_142={};
_143={};
};
function _146(){
_144=MAX(_144-1,0);
if(_144!==0){
return;
}
delete _142;
delete _143;
};
var _147=new RegExp("^"+"(?:"+"([^:/?#]+):"+")?"+"(?:"+"(//)"+"("+"(?:"+"("+"([^:@]*)"+":?"+"([^:@]*)"+")?"+"@"+")?"+"([^:/?#]*)"+"(?::(\\d*))?"+")"+")?"+"([^?#]*)"+"(?:\\?([^#]*))?"+"(?:#(.*))?");
var _148=["url","scheme","authorityRoot","authority","userInfo","user","password","domain","portNumber","path","queryString","fragment"];
function _149(aURL){
if(aURL._parts){
return aURL._parts;
}
var _14a=aURL.string(),_14b=_14a.match(/^mhtml:/);
if(_14b){
_14a=_14a.substr("mhtml:".length);
}
if(_144>0&&_71.call(_143,_14a)){
aURL._parts=_143[_14a];
return aURL._parts;
}
aURL._parts={};
var _14c=aURL._parts,_14d=_147.exec(_14a),_8c=_14d.length;
while(_8c--){
_14c[_148[_8c]]=_14d[_8c]||NULL;
}
_14c.portNumber=parseInt(_14c.portNumber,10);
if(isNaN(_14c.portNumber)){
_14c.portNumber=-1;
}
_14c.pathComponents=[];
if(_14c.path){
var _14e=_14c.path.split("/"),_14f=_14c.pathComponents,_8c=0,_150=_14e.length;
for(;_8c<_150;++_8c){
var _151=_14e[_8c];
if(_151){
_14f.push(_151);
}else{
if(_8c===0){
_14f.push("/");
}
}
}
_14c.pathComponents=_14f;
}
if(_14b){
_14c.url="mhtml:"+_14c.url;
_14c.scheme="mhtml:"+_14c.scheme;
}
if(_144>0){
_143[_14a]=_14c;
}
return _14c;
};
CFURL=function(aURL,_152){
aURL=aURL||"";
if(aURL instanceof CFURL){
if(!_152){
return aURL;
}
var _153=aURL.baseURL();
if(_153){
_152=new CFURL(_153.absoluteURL(),_152);
}
aURL=aURL.string();
}
if(_144>0){
var _154=aURL+" "+(_152&&_152.UID()||"");
if(_71.call(_142,_154)){
return _142[_154];
}
_142[_154]=this;
}
if(aURL.match(/^data:/)){
var _155={},_8c=_148.length;
while(_8c--){
_155[_148[_8c]]="";
}
_155.url=aURL;
_155.scheme="data";
_155.pathComponents=[];
this._parts=_155;
this._standardizedURL=this;
this._absoluteURL=this;
}
this._UID=objj_generateObjectUID();
this._string=aURL;
this._baseURL=_152;
};
CFURL.prototype.UID=function(){
return this._UID;
};
var _156={};
CFURL.prototype.mappedURL=function(){
return _156[this.absoluteString()]||this;
};
CFURL.setMappedURLForURL=function(_157,_158){
_156[_157.absoluteString()]=_158;
};
CFURL.prototype.schemeAndAuthority=function(){
var _159="",_15a=this.scheme();
if(_15a){
_159+=_15a+":";
}
var _15b=this.authority();
if(_15b){
_159+="//"+_15b;
}
return _159;
};
CFURL.prototype.absoluteString=function(){
if(this._absoluteString===_44){
this._absoluteString=this.absoluteURL().string();
}
return this._absoluteString;
};
CFURL.prototype.toString=function(){
return this.absoluteString();
};
function _15c(aURL){
aURL=aURL.standardizedURL();
var _15d=aURL.baseURL();
if(!_15d){
return aURL;
}
var _15e=((aURL)._parts||_149(aURL)),_15f,_160=_15d.absoluteURL(),_161=((_160)._parts||_149(_160));
if(_15e.scheme||_15e.authority){
_15f=_15e;
}else{
_15f={};
_15f.scheme=_161.scheme;
_15f.authority=_161.authority;
_15f.userInfo=_161.userInfo;
_15f.user=_161.user;
_15f.password=_161.password;
_15f.domain=_161.domain;
_15f.portNumber=_161.portNumber;
_15f.queryString=_15e.queryString;
_15f.fragment=_15e.fragment;
var _162=_15e.pathComponents;
if(_162.length&&_162[0]==="/"){
_15f.path=_15e.path;
_15f.pathComponents=_162;
}else{
var _163=_161.pathComponents,_164=_163.concat(_162);
if(!_15d.hasDirectoryPath()&&_163.length){
_164.splice(_163.length-1,1);
}
if(_162.length&&(_162[0]===".."||_162[0]===".")){
_165(_164,YES);
}
_15f.pathComponents=_164;
_15f.path=_166(_164,_162.length<=0||aURL.hasDirectoryPath());
}
}
var _167=_168(_15f),_169=new CFURL(_167);
_169._parts=_15f;
_169._standardizedURL=_169;
_169._standardizedString=_167;
_169._absoluteURL=_169;
_169._absoluteString=_167;
return _169;
};
function _166(_16a,_16b){
var path=_16a.join("/");
if(path.length&&path.charAt(0)==="/"){
path=path.substr(1);
}
if(_16b){
path+="/";
}
return path;
};
function _165(_16c,_16d){
var _16e=0,_16f=0,_170=_16c.length,_171=_16d?_16c:[],_172=NO;
for(;_16e<_170;++_16e){
var _173=_16c[_16e];
if(_173===""){
continue;
}
if(_173==="."){
_172=_16f===0;
continue;
}
if(_173!==".."||_16f===0||_171[_16f-1]===".."){
_171[_16f]=_173;
_16f++;
continue;
}
if(_16f>0&&_171[_16f-1]!=="/"){
--_16f;
}
}
if(_172&&_16f===0){
_171[_16f++]=".";
}
_171.length=_16f;
return _171;
};
function _168(_174){
var _175="",_176=_174.scheme;
if(_176){
_175+=_176+":";
}
var _177=_174.authority;
if(_177){
_175+="//"+_177;
}
_175+=_174.path;
var _178=_174.queryString;
if(_178){
_175+="?"+_178;
}
var _179=_174.fragment;
if(_179){
_175+="#"+_179;
}
return _175;
};
CFURL.prototype.absoluteURL=function(){
if(this._absoluteURL===_44){
this._absoluteURL=_15c(this);
}
return this._absoluteURL;
};
CFURL.prototype.standardizedURL=function(){
if(this._standardizedURL===_44){
var _17a=((this)._parts||_149(this)),_17b=_17a.pathComponents,_17c=_165(_17b,NO);
var _17d=_166(_17c,this.hasDirectoryPath());
if(_17a.path===_17d){
this._standardizedURL=this;
}else{
var _17e=_17f(_17a);
_17e.pathComponents=_17c;
_17e.path=_17d;
var _180=new CFURL(_168(_17e),this.baseURL());
_180._parts=_17e;
_180._standardizedURL=_180;
this._standardizedURL=_180;
}
}
return this._standardizedURL;
};
function _17f(_181){
var _182={},_183=_148.length;
while(_183--){
var _184=_148[_183];
_182[_184]=_181[_184];
}
return _182;
};
CFURL.prototype.string=function(){
return this._string;
};
CFURL.prototype.authority=function(){
var _185=((this)._parts||_149(this)).authority;
if(_185){
return _185;
}
var _186=this.baseURL();
return _186&&_186.authority()||"";
};
CFURL.prototype.hasDirectoryPath=function(){
var _187=this._hasDirectoryPath;
if(_187===_44){
var path=this.path();
if(!path){
return NO;
}
if(path.charAt(path.length-1)==="/"){
return YES;
}
var _188=this.lastPathComponent();
_187=_188==="."||_188==="..";
this._hasDirectoryPath=_187;
}
return _187;
};
CFURL.prototype.hostName=function(){
return this.authority();
};
CFURL.prototype.fragment=function(){
return ((this)._parts||_149(this)).fragment;
};
CFURL.prototype.lastPathComponent=function(){
if(this._lastPathComponent===_44){
var _189=this.pathComponents(),_18a=_189.length;
if(!_18a){
this._lastPathComponent="";
}else{
this._lastPathComponent=_189[_18a-1];
}
}
return this._lastPathComponent;
};
CFURL.prototype.path=function(){
return ((this)._parts||_149(this)).path;
};
CFURL.prototype.pathComponents=function(){
return ((this)._parts||_149(this)).pathComponents;
};
CFURL.prototype.pathExtension=function(){
var _18b=this.lastPathComponent();
if(!_18b){
return NULL;
}
_18b=_18b.replace(/^\.*/,"");
var _18c=_18b.lastIndexOf(".");
return _18c<=0?"":_18b.substring(_18c+1);
};
CFURL.prototype.queryString=function(){
return ((this)._parts||_149(this)).queryString;
};
CFURL.prototype.scheme=function(){
var _18d=this._scheme;
if(_18d===_44){
_18d=((this)._parts||_149(this)).scheme;
if(!_18d){
var _18e=this.baseURL();
_18d=_18e&&_18e.scheme();
}
this._scheme=_18d;
}
return _18d;
};
CFURL.prototype.user=function(){
return ((this)._parts||_149(this)).user;
};
CFURL.prototype.password=function(){
return ((this)._parts||_149(this)).password;
};
CFURL.prototype.portNumber=function(){
return ((this)._parts||_149(this)).portNumber;
};
CFURL.prototype.domain=function(){
return ((this)._parts||_149(this)).domain;
};
CFURL.prototype.baseURL=function(){
return this._baseURL;
};
CFURL.prototype.asDirectoryPathURL=function(){
if(this.hasDirectoryPath()){
return this;
}
var _18f=this.lastPathComponent();
if(_18f!=="/"){
_18f="./"+_18f;
}
return new CFURL(_18f+"/",this);
};
function _190(aURL){
if(!aURL._resourcePropertiesForKeys){
aURL._resourcePropertiesForKeys=new CFMutableDictionary();
}
return aURL._resourcePropertiesForKeys;
};
CFURL.prototype.resourcePropertyForKey=function(aKey){
return _190(this).valueForKey(aKey);
};
CFURL.prototype.setResourcePropertyForKey=function(aKey,_191){
_190(this).setValueForKey(aKey,_191);
};
CFURL.prototype.staticResourceData=function(){
var data=new CFMutableData();
data.setRawString(_192.resourceAtURL(this).contents());
return data;
};
function _fd(_193){
this._string=_193;
var _194=_193.indexOf(";");
this._magicNumber=_193.substr(0,_194);
this._location=_193.indexOf(";",++_194);
this._version=_193.substring(_194,this._location++);
};
_fd.prototype.magicNumber=function(){
return this._magicNumber;
};
_fd.prototype.version=function(){
return this._version;
};
_fd.prototype.getMarker=function(){
var _195=this._string,_196=this._location;
if(_196>=_195.length){
return null;
}
var next=_195.indexOf(";",_196);
if(next<0){
return null;
}
var _197=_195.substring(_196,next);
if(_197==="e"){
return null;
}
this._location=next+1;
return _197;
};
_fd.prototype.getString=function(){
var _198=this._string,_199=this._location;
if(_199>=_198.length){
return null;
}
var next=_198.indexOf(";",_199);
if(next<0){
return null;
}
var size=parseInt(_198.substring(_199,next),10),text=_198.substr(next+1,size);
this._location=next+1+size;
return text;
};
var _19a=0,_19b=1<<0,_19c=1<<1,_19d=1<<2,_19e=1<<3,_19f=1<<4;
var _1a0={},_1a1={},_1a2=new Date().getTime(),_1a3=0,_1a4=0;
CFBundle=function(aURL){
aURL=_1a5(aURL).asDirectoryPathURL();
var _1a6=aURL.absoluteString(),_1a7=_1a0[_1a6];
if(_1a7){
return _1a7;
}
_1a0[_1a6]=this;
this._bundleURL=aURL;
this._resourcesDirectoryURL=new CFURL("Resources/",aURL);
this._staticResource=NULL;
this._isValid=NO;
this._loadStatus=_19a;
this._loadRequests=[];
this._infoDictionary=new CFDictionary();
this._eventDispatcher=new _6c(this);
};
CFBundle.environments=function(){
return ["Browser","ObjJ"];
};
CFBundle.bundleContainingURL=function(aURL){
aURL=new CFURL(".",_1a5(aURL));
var _1a8,_1a9=aURL.absoluteString();
while(!_1a8||_1a8!==_1a9){
var _1aa=_1a0[_1a9];
if(_1aa&&_1aa._isValid){
return _1aa;
}
aURL=new CFURL("..",aURL);
_1a8=_1a9;
_1a9=aURL.absoluteString();
}
return NULL;
};
CFBundle.mainBundle=function(){
return new CFBundle(_1ab);
};
function _1ac(_1ad,_1ae){
if(_1ae){
_1a1[_1ad.name]=_1ae;
}
};
CFBundle.bundleForClass=function(_1af){
return _1a1[_1af.name]||CFBundle.mainBundle();
};
CFBundle.prototype.bundleURL=function(){
return this._bundleURL;
};
CFBundle.prototype.resourcesDirectoryURL=function(){
return this._resourcesDirectoryURL;
};
CFBundle.prototype.resourceURL=function(_1b0,_1b1,_1b2){
if(_1b1){
_1b0=_1b0+"."+_1b1;
}
if(_1b2){
_1b0=_1b2+"/"+_1b0;
}
var _1b3=(new CFURL(_1b0,this.resourcesDirectoryURL())).mappedURL();
return _1b3.absoluteURL();
};
CFBundle.prototype.mostEligibleEnvironmentURL=function(){
if(this._mostEligibleEnvironmentURL===_44){
this._mostEligibleEnvironmentURL=new CFURL(this.mostEligibleEnvironment()+".environment/",this.bundleURL());
}
return this._mostEligibleEnvironmentURL;
};
CFBundle.prototype.executableURL=function(){
if(this._executableURL===_44){
var _1b4=this.valueForInfoDictionaryKey("CPBundleExecutable");
if(!_1b4){
this._executableURL=NULL;
}else{
this._executableURL=new CFURL(_1b4,this.mostEligibleEnvironmentURL());
}
}
return this._executableURL;
};
CFBundle.prototype.infoDictionary=function(){
return this._infoDictionary;
};
CFBundle.prototype.valueForInfoDictionaryKey=function(aKey){
return this._infoDictionary.valueForKey(aKey);
};
CFBundle.prototype.hasSpritedImages=function(){
var _1b5=this._infoDictionary.valueForKey("CPBundleEnvironmentsWithImageSprites")||[],_8c=_1b5.length,_1b6=this.mostEligibleEnvironment();
while(_8c--){
if(_1b5[_8c]===_1b6){
return YES;
}
}
return NO;
};
CFBundle.prototype.environments=function(){
return this._infoDictionary.valueForKey("CPBundleEnvironments")||["ObjJ"];
};
CFBundle.prototype.mostEligibleEnvironment=function(_1b7){
_1b7=_1b7||this.environments();
var _1b8=CFBundle.environments(),_8c=0,_1b9=_1b8.length,_1ba=_1b7.length;
for(;_8c<_1b9;++_8c){
var _1bb=0,_1bc=_1b8[_8c];
for(;_1bb<_1ba;++_1bb){
if(_1bc===_1b7[_1bb]){
return _1bc;
}
}
}
return NULL;
};
CFBundle.prototype.isLoading=function(){
return this._loadStatus&_19b;
};
CFBundle.prototype.load=function(_1bd){
if(this._loadStatus!==_19a){
return;
}
this._loadStatus=_19b|_19c;
var self=this,_1be=this.bundleURL(),_1bf=new CFURL("..",_1be);
if(_1bf.absoluteString()===_1be.absoluteString()){
_1bf=_1bf.schemeAndAuthority();
}
_192.resolveResourceAtURL(_1bf,YES,function(_1c0){
var _1c1=_1be.absoluteURL().lastPathComponent();
self._staticResource=_1c0._children[_1c1]||new _192(_1be,_1c0,YES,NO);
function _1c2(_1c3){
self._loadStatus&=~_19c;
var _1c4=_1c3.request.responsePropertyList();
self._isValid=!!_1c4||CFBundle.mainBundle()===self;
if(_1c4){
self._infoDictionary=_1c4;
}
if(!self._infoDictionary){
_1c6(self,new Error("Could not load bundle at \""+path+"\""));
return;
}
if(self===CFBundle.mainBundle()&&self.valueForInfoDictionaryKey("CPApplicationSize")){
_1a4=self.valueForInfoDictionaryKey("CPApplicationSize").valueForKey("executable")||0;
}
_1ca(self,_1bd);
};
function _1c5(){
self._isValid=CFBundle.mainBundle()===self;
self._loadStatus=_19a;
_1c6(self,new Error("Could not load bundle at \""+self.bundleURL()+"\""));
};
new _a8(new CFURL("Info.plist",self.bundleURL()),_1c2,_1c5);
});
};
function _1c6(_1c7,_1c8){
_1c9(_1c7._staticResource);
_1c7._eventDispatcher.dispatchEvent({type:"error",error:_1c8,bundle:_1c7});
};
function _1ca(_1cb,_1cc){
if(!_1cb.mostEligibleEnvironment()){
return _1cd();
}
_1ce(_1cb,_1cf,_1cd);
_1d0(_1cb,_1cf,_1cd);
if(_1cb._loadStatus===_19b){
return _1cf();
}
function _1cd(_1d1){
var _1d2=_1cb._loadRequests,_1d3=_1d2.length;
while(_1d3--){
_1d2[_1d3].abort();
}
this._loadRequests=[];
_1cb._loadStatus=_19a;
_1c6(_1cb,_1d1||new Error("Could not recognize executable code format in Bundle "+_1cb));
};
function _1cf(){
if((typeof CPApp==="undefined"||!CPApp||!CPApp._finishedLaunching)&&typeof OBJJ_PROGRESS_CALLBACK==="function"&&_1a4){
OBJJ_PROGRESS_CALLBACK(MAX(MIN(1,_1a3/_1a4),0),_1a4,_1cb.path());
}
if(_1cb._loadStatus===_19b){
_1cb._loadStatus=_19f;
}else{
return;
}
_1c9(_1cb._staticResource);
function _1d4(){
_1cb._eventDispatcher.dispatchEvent({type:"load",bundle:_1cb});
};
if(_1cc){
_1d5(_1cb,_1d4);
}else{
_1d4();
}
};
};
function _1ce(_1d6,_1d7,_1d8){
var _1d9=_1d6.executableURL();
if(!_1d9){
return;
}
_1d6._loadStatus|=_19d;
new _a8(_1d9,function(_1da){
try{
_1a3+=_1da.request.responseText().length;
_1db(_1d6,_1da.request.responseText(),_1d9);
_1d6._loadStatus&=~_19d;
_1d7();
}
catch(anException){
_1d8(anException);
}
},_1d8);
};
function _1dc(_1dd){
return "mhtml:"+new CFURL("MHTMLTest.txt",_1dd.mostEligibleEnvironmentURL());
};
function _1de(_1df){
if(_1e0===_1e1){
return new CFURL("dataURLs.txt",_1df.mostEligibleEnvironmentURL());
}
if(_1e0===_1e2||_1e0===_1e3){
return new CFURL("MHTMLPaths.txt",_1df.mostEligibleEnvironmentURL());
}
return NULL;
};
function _1d0(_1e4,_1e5,_1e6){
if(!_1e4.hasSpritedImages()){
return;
}
_1e4._loadStatus|=_19e;
if(!_1e7()){
return _1e8(_1dc(_1e4),function(){
_1d0(_1e4,_1e5,_1e6);
});
}
var _1e9=_1de(_1e4);
if(!_1e9){
_1e4._loadStatus&=~_19e;
return _1e5();
}
new _a8(_1e9,function(_1ea){
try{
_1a3+=_1ea.request.responseText().length;
_1db(_1e4,_1ea.request.responseText(),_1e9);
_1e4._loadStatus&=~_19e;
}
catch(anException){
_1e6(anException);
}
_1e5();
},_1e6);
};
var _1eb=[],_1e0=-1,_1ec=0,_1e1=1,_1e2=2,_1e3=3;
function _1e7(){
return _1e0!==-1;
};
function _1e8(_1ed,_1ee){
if(_1e7()){
return;
}
_1eb.push(_1ee);
if(_1eb.length>1){
return;
}
_1eb.push(function(){
var size=0,_1ef=CFBundle.mainBundle().valueForInfoDictionaryKey("CPApplicationSize");
if(!_1ef){
return;
}
switch(_1e0){
case _1e1:
size=_1ef.valueForKey("data");
break;
case _1e2:
case _1e3:
size=_1ef.valueForKey("mhtml");
break;
}
_1a4+=size;
});
_1f0([_1e1,"data:image/gif;base64,R0lGODlhAQABAIAAAMc9BQAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==",_1e2,_1ed+"!test",_1e3,_1ed+"?"+_1a2+"!test"]);
};
function _1f1(){
var _1f2=_1eb.length;
while(_1f2--){
_1eb[_1f2]();
}
};
function _1f0(_1f3){
if(_1f3.length<2){
_1e0=_1ec;
_1f1();
return;
}
var _1f4=new Image();
_1f4.onload=function(){
if(_1f4.width===1&&_1f4.height===1){
_1e0=_1f3[0];
_1f1();
}else{
_1f4.onerror();
}
};
_1f4.onerror=function(){
_1f0(_1f3.slice(2));
};
_1f4.src=_1f3[1];
};
function _1d5(_1f5,_1f6){
var _1f7=[_1f5._staticResource];
function _1f8(_1f9){
for(;_1f9<_1f7.length;++_1f9){
var _1fa=_1f7[_1f9];
if(_1fa.isNotFound()){
continue;
}
if(_1fa.isFile()){
var _1fb=new _302(_1fa.URL());
if(_1fb.hasLoadedFileDependencies()){
_1fb.execute();
}else{
_1fb.loadFileDependencies(function(){
_1f8(_1f9);
});
return;
}
}else{
if(_1fa.URL().absoluteString()===_1f5.resourcesDirectoryURL().absoluteString()){
continue;
}
var _1fc=_1fa.children();
for(var name in _1fc){
if(_71.call(_1fc,name)){
_1f7.push(_1fc[name]);
}
}
}
}
_1f6();
};
_1f8(0);
};
var _1fd="@STATIC",_1fe="p",_1ff="u",_200="c",_201="t",_202="I",_203="i";
function _1db(_204,_205,_206){
var _207=new _fd(_205);
if(_207.magicNumber()!==_1fd){
throw new Error("Could not read static file: "+_206);
}
if(_207.version()!=="1.0"){
throw new Error("Could not read static file: "+_206);
}
var _208,_209=_204.bundleURL(),file=NULL;
while(_208=_207.getMarker()){
var text=_207.getString();
if(_208===_1fe){
var _20a=new CFURL(text,_209),_20b=_192.resourceAtURL(new CFURL(".",_20a),YES);
file=new _192(_20a,_20b,NO,YES);
}else{
if(_208===_1ff){
var URL=new CFURL(text,_209),_20c=_207.getString();
if(_20c.indexOf("mhtml:")===0){
_20c="mhtml:"+new CFURL(_20c.substr("mhtml:".length),_209);
if(_1e0===_1e3){
var _20d=URLString.indexOf("!"),_20e=URLString.substring(0,_20d),_20f=URLString.substring(_20d);
_20c=_20e+"?"+_1a2+_20f;
}
}
CFURL.setMappedURLForURL(URL,new CFURL(_20c));
var _20b=_192.resourceAtURL(new CFURL(".",URL),YES);
new _192(URL,_20b,NO,YES);
}else{
if(_208===_201){
file.write(text);
}
}
}
}
};
CFBundle.prototype.addEventListener=function(_210,_211){
this._eventDispatcher.addEventListener(_210,_211);
};
CFBundle.prototype.removeEventListener=function(_212,_213){
this._eventDispatcher.removeEventListener(_212,_213);
};
CFBundle.prototype.onerror=function(_214){
throw _214.error;
};
CFBundle.prototype.bundlePath=function(){
return this._bundleURL.absoluteURL().path();
};
CFBundle.prototype.path=function(){
CPLog.warn("CFBundle.prototype.path is deprecated, use CFBundle.prototype.bundlePath instead.");
return this.bundlePath.apply(this,arguments);
};
CFBundle.prototype.pathForResource=function(_215){
return this.resourceURL(_215).absoluteString();
};
var _216={};
function _192(aURL,_217,_218,_219){
this._parent=_217;
this._eventDispatcher=new _6c(this);
var name=aURL.absoluteURL().lastPathComponent()||aURL.schemeAndAuthority();
this._name=name;
this._URL=aURL;
this._isResolved=!!_219;
if(_218){
this._URL=this._URL.asDirectoryPathURL();
}
if(!_217){
_216[name]=this;
}
this._isDirectory=!!_218;
this._isNotFound=NO;
if(_217){
_217._children[name]=this;
}
if(_218){
this._children={};
}else{
this._contents="";
}
};
_192.rootResources=function(){
return _216;
};
_2.StaticResource=_192;
function _1c9(_21a){
_21a._isResolved=YES;
_21a._eventDispatcher.dispatchEvent({type:"resolve",staticResource:_21a});
};
_192.prototype.resolve=function(){
if(this.isDirectory()){
var _21b=new CFBundle(this.URL());
_21b.onerror=function(){
};
_21b.load(NO);
}else{
var self=this;
function _21c(_21d){
self._contents=_21d.request.responseText();
_1c9(self);
};
function _21e(){
self._isNotFound=YES;
_1c9(self);
};
new _a8(this.URL(),_21c,_21e);
}
};
_192.prototype.name=function(){
return this._name;
};
_192.prototype.URL=function(){
return this._URL;
};
_192.prototype.contents=function(){
return this._contents;
};
_192.prototype.children=function(){
return this._children;
};
_192.prototype.parent=function(){
return this._parent;
};
_192.prototype.isResolved=function(){
return this._isResolved;
};
_192.prototype.write=function(_21f){
this._contents+=_21f;
};
function _220(_221){
var _222=_221.schemeAndAuthority(),_223=_216[_222];
if(!_223){
_223=new _192(new CFURL(_222),NULL,YES,YES);
}
return _223;
};
_192.resourceAtURL=function(aURL,_224){
aURL=_1a5(aURL).absoluteURL();
var _225=_220(aURL),_226=aURL.pathComponents(),_8c=0,_227=_226.length;
for(;_8c<_227;++_8c){
var name=_226[_8c];
if(_71.call(_225._children,name)){
_225=_225._children[name];
}else{
if(_224){
if(name!=="/"){
name="./"+name;
}
_225=new _192(new CFURL(name,_225.URL()),_225,YES,YES);
}else{
throw new Error("Static Resource at "+aURL+" is not resolved (\""+name+"\")");
}
}
}
return _225;
};
_192.prototype.resourceAtURL=function(aURL,_228){
return _192.resourceAtURL(new CFURL(aURL,this.URL()),_228);
};
_192.resolveResourceAtURL=function(aURL,_229,_22a){
aURL=_1a5(aURL).absoluteURL();
_22b(_220(aURL),_229,aURL.pathComponents(),0,_22a);
};
_192.prototype.resolveResourceAtURL=function(aURL,_22c,_22d){
_192.resolveResourceAtURL(new CFURL(aURL,this.URL()).absoluteURL(),_22c,_22d);
};
function _22b(_22e,_22f,_230,_231,_232){
var _233=_230.length;
for(;_231<_233;++_231){
var name=_230[_231],_234=_71.call(_22e._children,name)&&_22e._children[name];
if(!_234){
_234=new _192(new CFURL(name,_22e.URL()),_22e,_231+1<_233||_22f,NO);
_234.resolve();
}
if(!_234.isResolved()){
return _234.addEventListener("resolve",function(){
_22b(_22e,_22f,_230,_231,_232);
});
}
if(_234.isNotFound()){
return _232(null,new Error("File not found: "+_230.join("/")));
}
if((_231+1<_233)&&_234.isFile()){
return _232(null,new Error("File is not a directory: "+_230.join("/")));
}
_22e=_234;
}
_232(_22e);
};
function _235(aURL,_236,_237){
var _238=_192.includeURLs(),_239=new CFURL(aURL,_238[_236]).absoluteURL();
_192.resolveResourceAtURL(_239,NO,function(_23a){
if(!_23a){
if(_236+1<_238.length){
_235(aURL,_236+1,_237);
}else{
_237(NULL);
}
return;
}
_237(_23a);
});
};
_192.resolveResourceAtURLSearchingIncludeURLs=function(aURL,_23b){
_235(aURL,0,_23b);
};
_192.prototype.addEventListener=function(_23c,_23d){
this._eventDispatcher.addEventListener(_23c,_23d);
};
_192.prototype.removeEventListener=function(_23e,_23f){
this._eventDispatcher.removeEventListener(_23e,_23f);
};
_192.prototype.isNotFound=function(){
return this._isNotFound;
};
_192.prototype.isFile=function(){
return !this._isDirectory;
};
_192.prototype.isDirectory=function(){
return this._isDirectory;
};
_192.prototype.toString=function(_240){
if(this.isNotFound()){
return "<file not found: "+this.name()+">";
}
var _241=this.name();
if(this.isDirectory()){
var _242=this._children;
for(var name in _242){
if(_242.hasOwnProperty(name)){
var _243=_242[name];
if(_240||!_243.isNotFound()){
_241+="\n\t"+_242[name].toString(_240).split("\n").join("\n\t");
}
}
}
}
return _241;
};
var _244=NULL;
_192.includeURLs=function(){
if(_245){
return _245;
}
var _245=[];
if(!_1.OBJJ_INCLUDE_PATHS&&!_1.OBJJ_INCLUDE_URLS){
_245=["Frameworks","Frameworks/Debug"];
}else{
_245=(_1.OBJJ_INCLUDE_PATHS||[]).concat(_1.OBJJ_INCLUDE_URLS||[]);
}
var _246=_245.length;
while(_246--){
_245[_246]=new CFURL(_245[_246]).asDirectoryPathURL();
}
return _245;
};
var _247="accessors",_248="class",_249="end",_24a="function",_24b="implementation",_24c="import",_24d="each",_24e="outlet",_24f="action",_250="new",_251="selector",_252="super",_253="var",_254="in",_255="=",_256="+",_257="-",_258=":",_259=",",_25a=".",_25b="*",_25c=";",_25d="<",_25e="{",_25f="}",_260=">",_261="[",_262="\"",_263="@",_264="]",_265="?",_266="(",_267=")",_268=/^(?:(?:\s+$)|(?:\/(?:\/|\*)))/,_269=/^[+-]?\d+(([.]\d+)*([eE][+-]?\d+))?$/,_26a=/^[a-zA-Z_$](\w|$)*$/;
function _26b(_26c){
this._index=-1;
this._tokens=(_26c+"\n").match(/\/\/.*(\r|\n)?|\/\*(?:.|\n|\r)*?\*\/|\w+\b|[+-]?\d+(([.]\d+)*([eE][+-]?\d+))?|"[^"\\]*(\\[\s\S][^"\\]*)*"|'[^'\\]*(\\[\s\S][^'\\]*)*'|\s+|./g);
this._context=[];
return this;
};
_26b.prototype.push=function(){
this._context.push(this._index);
};
_26b.prototype.pop=function(){
this._index=this._context.pop();
};
_26b.prototype.peak=function(_26d){
if(_26d){
this.push();
var _26e=this.skip_whitespace();
this.pop();
return _26e;
}
return this._tokens[this._index+1];
};
_26b.prototype.next=function(){
return this._tokens[++this._index];
};
_26b.prototype.previous=function(){
return this._tokens[--this._index];
};
_26b.prototype.last=function(){
if(this._index<0){
return NULL;
}
return this._tokens[this._index-1];
};
_26b.prototype.skip_whitespace=function(_26f){
var _270;
if(_26f){
while((_270=this.previous())&&_268.test(_270)){
}
}else{
while((_270=this.next())&&_268.test(_270)){
}
}
return _270;
};
_2.Lexer=_26b;
function _271(){
this.atoms=[];
};
_271.prototype.toString=function(){
return this.atoms.join("");
};
_2.preprocess=function(_272,aURL,_273){
return new _274(_272,aURL,_273).executable();
};
_2.eval=function(_275){
return eval(_2.preprocess(_275).code());
};
var _274=function(_276,aURL,_277){
this._URL=new CFURL(aURL);
_276=_276.replace(/^#[^\n]+\n/,"\n");
this._currentSelector="";
this._currentClass="";
this._currentSuperClass="";
this._currentSuperMetaClass="";
this._buffer=new _271();
this._preprocessed=NULL;
this._dependencies=[];
this._tokens=new _26b(_276);
this._flags=_277;
this._classMethod=false;
this._executable=NULL;
this.preprocess(this._tokens,this._buffer);
};
_2.Preprocessor=_274;
_274.Flags={};
_274.Flags.IncludeDebugSymbols=1<<0;
_274.Flags.IncludeTypeSignatures=1<<1;
_274.prototype.executable=function(){
if(!this._executable){
this._executable=new _278(this._buffer.toString(),this._dependencies,this._URL);
}
return this._executable;
};
_274.prototype.accessors=function(_279){
var _27a=_279.skip_whitespace(),_27b={};
if(_27a!=_266){
_279.previous();
return _27b;
}
while((_27a=_279.skip_whitespace())!=_267){
var name=_27a,_27c=true;
if(!/^\w+$/.test(name)){
throw new SyntaxError(this.error_message("*** @property attribute name not valid."));
}
if((_27a=_279.skip_whitespace())==_255){
_27c=_279.skip_whitespace();
if(!/^\w+$/.test(_27c)){
throw new SyntaxError(this.error_message("*** @property attribute value not valid."));
}
if(name=="setter"){
if((_27a=_279.next())!=_258){
throw new SyntaxError(this.error_message("*** @property setter attribute requires argument with \":\" at end of selector name."));
}
_27c+=":";
}
_27a=_279.skip_whitespace();
}
_27b[name]=_27c;
if(_27a==_267){
break;
}
if(_27a!=_259){
throw new SyntaxError(this.error_message("*** Expected ',' or ')' in @property attribute list."));
}
}
return _27b;
};
_274.prototype.brackets=function(_27d,_27e){
var _27f=[];
while(this.preprocess(_27d,NULL,NULL,NULL,_27f[_27f.length]=[])){
}
if(_27f[0].length===1){
_27e.atoms[_27e.atoms.length]="[";
_27e.atoms[_27e.atoms.length]=_27f[0][0];
_27e.atoms[_27e.atoms.length]="]";
}else{
var _280=new _271();
if(_27f[0][0].atoms[0]==_252){
_27e.atoms[_27e.atoms.length]="objj_msgSendSuper(";
_27e.atoms[_27e.atoms.length]="{ receiver:self, super_class:"+(this._classMethod?this._currentSuperMetaClass:this._currentSuperClass)+" }";
}else{
_27e.atoms[_27e.atoms.length]="objj_msgSend(";
_27e.atoms[_27e.atoms.length]=_27f[0][0];
}
_280.atoms[_280.atoms.length]=_27f[0][1];
var _281=1,_282=_27f.length,_283=new _271();
for(;_281<_282;++_281){
var pair=_27f[_281];
_280.atoms[_280.atoms.length]=pair[1];
_283.atoms[_283.atoms.length]=", "+pair[0];
}
_27e.atoms[_27e.atoms.length]=", \"";
_27e.atoms[_27e.atoms.length]=_280;
_27e.atoms[_27e.atoms.length]="\"";
_27e.atoms[_27e.atoms.length]=_283;
_27e.atoms[_27e.atoms.length]=")";
}
};
_274.prototype.directive=function(_284,_285,_286){
var _287=_285?_285:new _271(),_288=_284.next();
if(_288.charAt(0)==_262){
_287.atoms[_287.atoms.length]=_288;
}else{
if(_288===_248){
_284.skip_whitespace();
return;
}else{
if(_288===_24b){
this.implementation(_284,_287);
}else{
if(_288===_24c){
this._import(_284);
}else{
if(_288===_251){
this.selector(_284,_287);
}
}
}
}
}
if(!_285){
return _287;
}
};
_274.prototype.implementation=function(_289,_28a){
var _28b=_28a,_28c="",_28d=NO,_28e=_289.skip_whitespace(),_28f="Nil",_290=new _271(),_291=new _271();
if(!(/^\w/).test(_28e)){
throw new Error(this.error_message("*** Expected class name, found \""+_28e+"\"."));
}
this._currentSuperClass="objj_getClass(\""+_28e+"\").super_class";
this._currentSuperMetaClass="objj_getMetaClass(\""+_28e+"\").super_class";
this._currentClass=_28e;
this._currentSelector="";
if((_28c=_289.skip_whitespace())==_266){
_28c=_289.skip_whitespace();
if(_28c==_267){
throw new SyntaxError(this.error_message("*** Can't Have Empty Category Name for class \""+_28e+"\"."));
}
if(_289.skip_whitespace()!=_267){
throw new SyntaxError(this.error_message("*** Improper Category Definition for class \""+_28e+"\"."));
}
_28b.atoms[_28b.atoms.length]="{\nvar the_class = objj_getClass(\""+_28e+"\")\n";
_28b.atoms[_28b.atoms.length]="if(!the_class) throw new SyntaxError(\"*** Could not find definition for class \\\""+_28e+"\\\"\");\n";
_28b.atoms[_28b.atoms.length]="var meta_class = the_class.isa;";
}else{
if(_28c==_258){
_28c=_289.skip_whitespace();
if(!_26a.test(_28c)){
throw new SyntaxError(this.error_message("*** Expected class name, found \""+_28c+"\"."));
}
_28f=_28c;
_28c=_289.skip_whitespace();
}
_28b.atoms[_28b.atoms.length]="{var the_class = objj_allocateClassPair("+_28f+", \""+_28e+"\"),\nmeta_class = the_class.isa;";
if(_28c==_25e){
var _292=0,_293=[],_294,_295={};
while((_28c=_289.skip_whitespace())&&_28c!=_25f){
if(_28c===_263){
_28c=_289.next();
if(_28c===_247){
_294=this.accessors(_289);
}else{
if(_28c!==_24e){
throw new SyntaxError(this.error_message("*** Unexpected '@' token in ivar declaration ('@"+_28c+"')."));
}
}
}else{
if(_28c==_25c){
if(_292++==0){
_28b.atoms[_28b.atoms.length]="class_addIvars(the_class, [";
}else{
_28b.atoms[_28b.atoms.length]=", ";
}
var name=_293[_293.length-1];
_28b.atoms[_28b.atoms.length]="new objj_ivar(\""+name+"\")";
_293=[];
if(_294){
_295[name]=_294;
_294=NULL;
}
}else{
_293.push(_28c);
}
}
}
if(_293.length){
throw new SyntaxError(this.error_message("*** Expected ';' in ivar declaration, found '}'."));
}
if(_292){
_28b.atoms[_28b.atoms.length]="]);\n";
}
if(!_28c){
throw new SyntaxError(this.error_message("*** Expected '}'"));
}
for(ivar_name in _295){
var _296=_295[ivar_name],_297=_296["property"]||ivar_name;
var _298=_296["getter"]||_297,_299="(id)"+_298+"\n{\nreturn "+ivar_name+";\n}";
if(_290.atoms.length!==0){
_290.atoms[_290.atoms.length]=",\n";
}
_290.atoms[_290.atoms.length]=this.method(new _26b(_299));
if(_296["readonly"]){
continue;
}
var _29a=_296["setter"];
if(!_29a){
var _29b=_297.charAt(0)=="_"?1:0;
_29a=(_29b?"_":"")+"set"+_297.substr(_29b,1).toUpperCase()+_297.substring(_29b+1)+":";
}
var _29c="(void)"+_29a+"(id)newValue\n{\n";
if(_296["copy"]){
_29c+="if ("+ivar_name+" !== newValue)\n"+ivar_name+" = [newValue copy];\n}";
}else{
_29c+=ivar_name+" = newValue;\n}";
}
if(_290.atoms.length!==0){
_290.atoms[_290.atoms.length]=",\n";
}
_290.atoms[_290.atoms.length]=this.method(new _26b(_29c));
}
}else{
_289.previous();
}
_28b.atoms[_28b.atoms.length]="objj_registerClassPair(the_class);\n";
}
while((_28c=_289.skip_whitespace())){
if(_28c==_256){
this._classMethod=true;
if(_291.atoms.length!==0){
_291.atoms[_291.atoms.length]=", ";
}
_291.atoms[_291.atoms.length]=this.method(_289);
}else{
if(_28c==_257){
this._classMethod=false;
if(_290.atoms.length!==0){
_290.atoms[_290.atoms.length]=", ";
}
_290.atoms[_290.atoms.length]=this.method(_289);
}else{
if(_28c==_263){
if((_28c=_289.next())==_249){
break;
}else{
throw new SyntaxError(this.error_message("*** Expected \"@end\", found \"@"+_28c+"\"."));
}
}
}
}
}
if(_290.atoms.length!==0){
_28b.atoms[_28b.atoms.length]="class_addMethods(the_class, [";
_28b.atoms[_28b.atoms.length]=_290;
_28b.atoms[_28b.atoms.length]="]);\n";
}
if(_291.atoms.length!==0){
_28b.atoms[_28b.atoms.length]="class_addMethods(meta_class, [";
_28b.atoms[_28b.atoms.length]=_291;
_28b.atoms[_28b.atoms.length]="]);\n";
}
_28b.atoms[_28b.atoms.length]="}";
this._currentClass="";
};
_274.prototype._import=function(_29d){
var _29e="",_29f=_29d.skip_whitespace(),_2a0=(_29f!==_25d);
if(_29f===_25d){
while((_29f=_29d.next())&&_29f!==_260){
_29e+=_29f;
}
if(!_29f){
throw new SyntaxError(this.error_message("*** Unterminated import statement."));
}
}else{
if(_29f.charAt(0)===_262){
_29e=_29f.substr(1,_29f.length-2);
}else{
throw new SyntaxError(this.error_message("*** Expecting '<' or '\"', found \""+_29f+"\"."));
}
}
this._buffer.atoms[this._buffer.atoms.length]="objj_executeFile(\"";
this._buffer.atoms[this._buffer.atoms.length]=_29e;
this._buffer.atoms[this._buffer.atoms.length]=_2a0?"\", YES);":"\", NO);";
this._dependencies.push(new _2a1(new CFURL(_29e),_2a0));
};
_274.prototype.method=function(_2a2){
var _2a3=new _271(),_2a4,_2a5="",_2a6=[],_2a7=[null];
while((_2a4=_2a2.skip_whitespace())&&_2a4!=_25e){
if(_2a4==_258){
var type="";
_2a5+=_2a4;
_2a4=_2a2.skip_whitespace();
if(_2a4==_266){
while((_2a4=_2a2.skip_whitespace())&&_2a4!=_267){
type+=_2a4;
}
_2a4=_2a2.skip_whitespace();
}
_2a7[_2a6.length+1]=type||null;
_2a6[_2a6.length]=_2a4;
}else{
if(_2a4==_266){
var type="";
while((_2a4=_2a2.skip_whitespace())&&_2a4!=_267){
type+=_2a4;
}
_2a7[0]=type||null;
}else{
if(_2a4==_259){
if((_2a4=_2a2.skip_whitespace())!=_25a||_2a2.next()!=_25a||_2a2.next()!=_25a){
throw new SyntaxError(this.error_message("*** Argument list expected after ','."));
}
}else{
_2a5+=_2a4;
}
}
}
}
var _2a8=0,_2a9=_2a6.length;
_2a3.atoms[_2a3.atoms.length]="new objj_method(sel_getUid(\"";
_2a3.atoms[_2a3.atoms.length]=_2a5;
_2a3.atoms[_2a3.atoms.length]="\"), function";
this._currentSelector=_2a5;
if(this._flags&_274.Flags.IncludeDebugSymbols){
_2a3.atoms[_2a3.atoms.length]=" $"+this._currentClass+"__"+_2a5.replace(/:/g,"_");
}
_2a3.atoms[_2a3.atoms.length]="(self, _cmd";
for(;_2a8<_2a9;++_2a8){
_2a3.atoms[_2a3.atoms.length]=", ";
_2a3.atoms[_2a3.atoms.length]=_2a6[_2a8];
}
_2a3.atoms[_2a3.atoms.length]=")\n{ with(self)\n{";
_2a3.atoms[_2a3.atoms.length]=this.preprocess(_2a2,NULL,_25f,_25e);
_2a3.atoms[_2a3.atoms.length]="}\n}";
if(this._flags&_274.Flags.IncludeDebugSymbols){
_2a3.atoms[_2a3.atoms.length]=","+JSON.stringify(_2a7);
}
_2a3.atoms[_2a3.atoms.length]=")";
this._currentSelector="";
return _2a3;
};
_274.prototype.preprocess=function(_2aa,_2ab,_2ac,_2ad,_2ae){
var _2af=_2ab?_2ab:new _271(),_2b0=0,_2b1="";
if(_2ae){
_2ae[0]=_2af;
var _2b2=false,_2b3=[0,0,0];
}
while((_2b1=_2aa.next())&&((_2b1!==_2ac)||_2b0)){
if(_2ae){
if(_2b1===_265){
++_2b3[2];
}else{
if(_2b1===_25e){
++_2b3[0];
}else{
if(_2b1===_25f){
--_2b3[0];
}else{
if(_2b1===_266){
++_2b3[1];
}else{
if(_2b1===_267){
--_2b3[1];
}else{
if((_2b1===_258&&_2b3[2]--===0||(_2b2=(_2b1===_264)))&&_2b3[0]===0&&_2b3[1]===0){
_2aa.push();
var _2b4=_2b2?_2aa.skip_whitespace(true):_2aa.previous(),_2b5=_268.test(_2b4);
if(_2b5||_26a.test(_2b4)&&_268.test(_2aa.previous())){
_2aa.push();
var last=_2aa.skip_whitespace(true),_2b6=true,_2b7=false;
if(last==="+"||last==="-"){
if(_2aa.previous()!==last){
_2b6=false;
}else{
last=_2aa.skip_whitespace(true);
_2b7=true;
}
}
_2aa.pop();
_2aa.pop();
if(_2b6&&((!_2b7&&(last===_25f))||last===_267||last===_264||last===_25a||_269.test(last)||last.charAt(last.length-1)==="\""||last.charAt(last.length-1)==="'"||_26a.test(last)&&!/^(new|return|case|var)$/.test(last))){
if(_2b5){
_2ae[1]=":";
}else{
_2ae[1]=_2b4;
if(!_2b2){
_2ae[1]+=":";
}
var _2b0=_2af.atoms.length;
while(_2af.atoms[_2b0--]!==_2b4){
}
_2af.atoms.length=_2b0;
}
return !_2b2;
}
if(_2b2){
return NO;
}
}
_2aa.pop();
if(_2b2){
return NO;
}
}
}
}
}
}
}
_2b3[2]=MAX(_2b3[2],0);
}
if(_2ad){
if(_2b1===_2ad){
++_2b0;
}else{
if(_2b1===_2ac){
--_2b0;
}
}
}
if(_2b1===_24a){
var _2b8="";
while((_2b1=_2aa.next())&&_2b1!==_266&&!(/^\w/).test(_2b1)){
_2b8+=_2b1;
}
if(_2b1===_266){
if(_2ad===_266){
++_2b0;
}
_2af.atoms[_2af.atoms.length]="function"+_2b8+"(";
if(_2ae){
++_2b3[1];
}
}else{
_2af.atoms[_2af.atoms.length]=_2b1+"= function";
}
}else{
if(_2b1==_263){
this.directive(_2aa,_2af);
}else{
if(_2b1==_261){
this.brackets(_2aa,_2af);
}else{
_2af.atoms[_2af.atoms.length]=_2b1;
}
}
}
}
if(_2ae){
throw new SyntaxError(this.error_message("*** Expected ']' - Unterminated message send or array."));
}
if(!_2ab){
return _2af;
}
};
_274.prototype.selector=function(_2b9,_2ba){
var _2bb=_2ba?_2ba:new _271();
_2bb.atoms[_2bb.atoms.length]="sel_getUid(\"";
if(_2b9.skip_whitespace()!=_266){
throw new SyntaxError(this.error_message("*** Expected '('"));
}
var _2bc=_2b9.skip_whitespace();
if(_2bc==_267){
throw new SyntaxError(this.error_message("*** Unexpected ')', can't have empty @selector()"));
}
_2ba.atoms[_2ba.atoms.length]=_2bc;
var _2bd,_2be=true;
while((_2bd=_2b9.next())&&_2bd!=_267){
if(_2be&&/^\d+$/.test(_2bd)||!(/^(\w|$|\:)/.test(_2bd))){
if(!(/\S/).test(_2bd)){
if(_2b9.skip_whitespace()==_267){
break;
}else{
throw new SyntaxError(this.error_message("*** Unexpected whitespace in @selector()."));
}
}else{
throw new SyntaxError(this.error_message("*** Illegal character '"+_2bd+"' in @selector()."));
}
}
_2bb.atoms[_2bb.atoms.length]=_2bd;
_2be=(_2bd==_258);
}
_2bb.atoms[_2bb.atoms.length]="\")";
if(!_2ba){
return _2bb;
}
};
_274.prototype.error_message=function(_2bf){
return _2bf+" <Context File: "+this._URL+(this._currentClass?" Class: "+this._currentClass:"")+(this._currentSelector?" Method: "+this._currentSelector:"")+">";
};
function _2a1(aURL,_2c0){
this._URL=aURL;
this._isLocal=_2c0;
};
_2.FileDependency=_2a1;
_2a1.prototype.URL=function(){
return this._URL;
};
_2a1.prototype.isLocal=function(){
return this._isLocal;
};
_2a1.prototype.toMarkedString=function(){
var _2c1=this.URL().absoluteString();
return (this.isLocal()?_203:_202)+";"+_2c1.length+";"+_2c1;
};
_2a1.prototype.toString=function(){
return (this.isLocal()?"LOCAL: ":"STD: ")+this.URL();
};
var _2c2=0,_2c3=1,_2c4=2,_2c5=0;
function _278(_2c6,_2c7,aURL,_2c8){
if(arguments.length===0){
return this;
}
this._code=_2c6;
this._function=_2c8||NULL;
this._URL=_1a5(aURL||new CFURL("(Anonymous"+(_2c5++)+")"));
this._fileDependencies=_2c7;
if(_2c7.length){
this._fileDependencyStatus=_2c2;
this._fileDependencyCallbacks=[];
}else{
this._fileDependencyStatus=_2c4;
}
if(this._function){
return;
}
this.setCode(_2c6);
};
_2.Executable=_278;
_278.prototype.path=function(){
return this.URL().path();
};
_278.prototype.URL=function(){
return this._URL;
};
_278.prototype.functionParameters=function(){
var _2c9=["global","objj_executeFile","objj_importFile"];
return _2c9;
};
_278.prototype.functionArguments=function(){
var _2ca=[_1,this.fileExecuter(),this.fileImporter()];
return _2ca;
};
_278.prototype.execute=function(){
var _2cb=_2cc;
_2cc=CFBundle.bundleContainingURL(this.URL());
var _2cd=this._function.apply(_1,this.functionArguments());
_2cc=_2cb;
return _2cd;
};
_278.prototype.code=function(){
return this._code;
};
_278.prototype.setCode=function(code){
this._code=code;
var _2ce=this.functionParameters().join(",");
this._function=new Function(_2ce,code);
};
_278.prototype.fileDependencies=function(){
return this._fileDependencies;
};
_278.prototype.hasLoadedFileDependencies=function(){
return this._fileDependencyStatus===_2c4;
};
var _2cf=0,_2d0=[],_2d1={};
_278.prototype.loadFileDependencies=function(_2d2){
var _2d3=this._fileDependencyStatus;
if(_2d2){
if(_2d3===_2c4){
return _2d2();
}
this._fileDependencyCallbacks.push(_2d2);
}
if(_2d3===_2c2){
if(_2cf){
throw "Can't load";
}
_2d4(this);
}
};
function _2d4(_2d5){
_2d0.push(_2d5);
_2d5._fileDependencyStatus=_2c3;
var _2d6=_2d5.fileDependencies(),_8c=0,_2d7=_2d6.length,_2d8=_2d5.referenceURL(),_2d9=_2d8.absoluteString(),_2da=_2d5.fileExecutableSearcher();
_2cf+=_2d7;
for(;_8c<_2d7;++_8c){
var _2db=_2d6[_8c],_2dc=_2db.isLocal(),URL=_2db.URL(),_2dd=(_2dc&&(_2d9+" ")||"")+URL;
if(_2d1[_2dd]){
if(--_2cf===0){
_2de();
}
continue;
}
_2d1[_2dd]=YES;
_2da(URL,_2dc,_2df);
}
};
function _2df(_2e0){
--_2cf;
if(_2e0._fileDependencyStatus===_2c2){
_2d4(_2e0);
}else{
if(_2cf===0){
_2de();
}
}
};
function _2de(){
var _2e1=_2d0,_8c=0,_2e2=_2e1.length;
_2d0=[];
for(;_8c<_2e2;++_8c){
_2e1[_8c]._fileDependencyStatus=_2c4;
}
for(_8c=0;_8c<_2e2;++_8c){
var _2e3=_2e1[_8c],_2e4=_2e3._fileDependencyCallbacks,_2e5=0,_2e6=_2e4.length;
for(;_2e5<_2e6;++_2e5){
_2e4[_2e5]();
}
_2e3._fileDependencyCallbacks=[];
}
};
_278.prototype.referenceURL=function(){
if(this._referenceURL===_44){
this._referenceURL=new CFURL(".",this.URL());
}
return this._referenceURL;
};
_278.prototype.fileImporter=function(){
return _278.fileImporterForURL(this.referenceURL());
};
_278.prototype.fileExecuter=function(){
return _278.fileExecuterForURL(this.referenceURL());
};
_278.prototype.fileExecutableSearcher=function(){
return _278.fileExecutableSearcherForURL(this.referenceURL());
};
var _2e7={};
_278.fileExecuterForURL=function(aURL){
var _2e8=_1a5(aURL),_2e9=_2e8.absoluteString(),_2ea=_2e7[_2e9];
if(!_2ea){
_2ea=function(aURL,_2eb,_2ec){
_278.fileExecutableSearcherForURL(_2e8)(aURL,_2eb,function(_2ed){
if(!_2ed.hasLoadedFileDependencies()){
throw "No executable loaded for file at URL "+aURL;
}
_2ed.execute(_2ec);
});
};
_2e7[_2e9]=_2ea;
}
return _2ea;
};
var _2ee={};
_278.fileImporterForURL=function(aURL){
var _2ef=_1a5(aURL),_2f0=_2ef.absoluteString(),_2f1=_2ee[_2f0];
if(!_2f1){
_2f1=function(aURL,_2f2,_2f3){
_145();
_278.fileExecutableSearcherForURL(_2ef)(aURL,_2f2,function(_2f4){
_2f4.loadFileDependencies(function(){
_2f4.execute();
_146();
if(_2f3){
_2f3();
}
});
});
};
_2ee[_2f0]=_2f1;
}
return _2f1;
};
var _2f5={},_2f6={};
_278.fileExecutableSearcherForURL=function(_2f7){
var _2f8=_2f7.absoluteString(),_2f9=_2f5[_2f8],_2fa={};
if(!_2f9){
_2f9=function(aURL,_2fb,_2fc){
var _2fd=(_2fb&&_2f7||"")+aURL,_2fe=_2f6[_2fd];
if(_2fe){
return _2ff(_2fe);
}
var _300=(aURL instanceof CFURL)&&aURL.scheme();
if(_2fb||_300){
if(!_300){
aURL=new CFURL(aURL,_2f7);
}
_192.resolveResourceAtURL(aURL,NO,_2ff);
}else{
_192.resolveResourceAtURLSearchingIncludeURLs(aURL,_2ff);
}
function _2ff(_301){
if(!_301){
throw new Error("Could not load file at "+aURL);
}
_2f6[_2fd]=_301;
_2fc(new _302(_301.URL()));
};
};
_2f5[_2f8]=_2f9;
}
return _2f9;
};
var _303={};
function _302(aURL){
aURL=_1a5(aURL);
var _304=aURL.absoluteString(),_305=_303[_304];
if(_305){
return _305;
}
_303[_304]=this;
var _306=_192.resourceAtURL(aURL).contents(),_307=NULL,_308=aURL.pathExtension();
if(_306.match(/^@STATIC;/)){
_307=_309(_306,aURL);
}else{
if(_308==="j"||!_308){
_307=_2.preprocess(_306,aURL,_274.Flags.IncludeDebugSymbols);
}else{
_307=new _278(_306,[],aURL);
}
}
_278.apply(this,[_307.code(),_307.fileDependencies(),aURL,_307._function]);
this._hasExecuted=NO;
};
_2.FileExecutable=_302;
_302.prototype=new _278();
_302.prototype.execute=function(_30a){
if(this._hasExecuted&&!_30a){
return;
}
this._hasExecuted=YES;
_278.prototype.execute.call(this);
};
_302.prototype.hasExecuted=function(){
return this._hasExecuted;
};
function _309(_30b,aURL){
var _30c=new _fd(_30b);
var _30d=NULL,code="",_30e=[];
while(_30d=_30c.getMarker()){
var text=_30c.getString();
if(_30d===_201){
code+=text;
}else{
if(_30d===_202){
_30e.push(new _2a1(new CFURL(text),NO));
}else{
if(_30d===_203){
_30e.push(new _2a1(new CFURL(text),YES));
}
}
}
}
var fn=_302._lookupCachedFunction(aURL);
if(fn){
return new _278(code,_30e,aURL,fn);
}
return new _278(code,_30e,aURL);
};
var _30f={};
_302._cacheFunction=function(aURL,fn){
aURL=typeof aURL==="string"?aURL:aURL.absoluteString();
_30f[aURL]=fn;
};
_302._lookupCachedFunction=function(aURL){
aURL=typeof aURL==="string"?aURL:aURL.absoluteString();
return _30f[aURL];
};
var _310=1,_311=2,_312=4,_313=8;
objj_ivar=function(_314,_315){
this.name=_314;
this.type=_315;
};
objj_method=function(_316,_317,_318){
this.name=_316;
this.method_imp=_317;
this.types=_318;
};
objj_class=function(){
this.isa=NULL;
this.super_class=NULL;
this.sub_classes=[];
this.name=NULL;
this.info=0;
this.ivars=[];
this.method_list=[];
this.method_hash={};
this.method_store=function(){
};
this.method_dtable=this.method_store.prototype;
this.allocator=function(){
};
this._UID=-1;
};
objj_object=function(){
this.isa=NULL;
this._UID=-1;
};
class_getName=function(_319){
if(_319==Nil){
return "";
}
return _319.name;
};
class_isMetaClass=function(_31a){
if(!_31a){
return NO;
}
return ((_31a.info&(_311)));
};
class_getSuperclass=function(_31b){
if(_31b==Nil){
return Nil;
}
return _31b.super_class;
};
class_setSuperclass=function(_31c,_31d){
_31c.super_class=_31d;
_31c.isa.super_class=_31d.isa;
};
class_addIvar=function(_31e,_31f,_320){
var _321=_31e.allocator.prototype;
if(typeof _321[_31f]!="undefined"){
return NO;
}
_31e.ivars.push(new objj_ivar(_31f,_320));
_321[_31f]=NULL;
return YES;
};
class_addIvars=function(_322,_323){
var _324=0,_325=_323.length,_326=_322.allocator.prototype;
for(;_324<_325;++_324){
var ivar=_323[_324],name=ivar.name;
if(typeof _326[name]==="undefined"){
_322.ivars.push(ivar);
_326[name]=NULL;
}
}
};
class_copyIvarList=function(_327){
return _327.ivars.slice(0);
};
class_addMethod=function(_328,_329,_32a,_32b){
if(_328.method_hash[_329]){
return NO;
}
var _32c=new objj_method(_329,_32a,_32b);
_328.method_list.push(_32c);
_328.method_dtable[_329]=_32c;
if(!((_328.info&(_311)))&&(((_328.info&(_311)))?_328:_328.isa).isa===(((_328.info&(_311)))?_328:_328.isa)){
class_addMethod((((_328.info&(_311)))?_328:_328.isa),_329,_32a,_32b);
}
return YES;
};
class_addMethods=function(_32d,_32e){
var _32f=0,_330=_32e.length,_331=_32d.method_list,_332=_32d.method_dtable;
for(;_32f<_330;++_32f){
var _333=_32e[_32f];
if(_32d.method_hash[_333.name]){
continue;
}
_331.push(_333);
_332[_333.name]=_333;
}
if(!((_32d.info&(_311)))&&(((_32d.info&(_311)))?_32d:_32d.isa).isa===(((_32d.info&(_311)))?_32d:_32d.isa)){
class_addMethods((((_32d.info&(_311)))?_32d:_32d.isa),_32e);
}
};
class_getInstanceMethod=function(_334,_335){
if(!_334||!_335){
return NULL;
}
var _336=_334.method_dtable[_335];
return _336?_336:NULL;
};
class_getClassMethod=function(_337,_338){
if(!_337||!_338){
return NULL;
}
var _339=(((_337.info&(_311)))?_337:_337.isa).method_dtable[_338];
return _339?_339:NULL;
};
class_copyMethodList=function(_33a){
return _33a.method_list.slice(0);
};
class_replaceMethod=function(_33b,_33c,_33d){
if(!_33b||!_33c){
return NULL;
}
var _33e=_33b.method_dtable[_33c],_33f=NULL;
if(_33e){
_33f=_33e.method_imp;
}
_33e.method_imp=_33d;
return _33f;
};
var _340=function(_341){
var meta=(((_341.info&(_311)))?_341:_341.isa);
if((_341.info&(_311))){
_341=objj_getClass(_341.name);
}
if(_341.super_class&&!((((_341.super_class.info&(_311)))?_341.super_class:_341.super_class.isa).info&(_312))){
_340(_341.super_class);
}
if(!(meta.info&(_312))&&!(meta.info&(_313))){
meta.info=(meta.info|(_313))&~(0);
objj_msgSend(_341,"initialize");
meta.info=(meta.info|(_312))&~(_313);
}
};
var _342=new objj_method("forward",function(self,_343){
return objj_msgSend(self,"forward::",_343,arguments);
});
class_getMethodImplementation=function(_344,_345){
if(!((((_344.info&(_311)))?_344:_344.isa).info&(_312))){
_340(_344);
}
var _346=_344.method_dtable[_345];
if(!_346){
_346=_342;
}
var _347=_346.method_imp;
return _347;
};
var _348={};
objj_allocateClassPair=function(_349,_34a){
var _34b=new objj_class(),_34c=new objj_class(),_34d=_34b;
if(_349){
_34d=_349;
while(_34d.superclass){
_34d=_34d.superclass;
}
_34b.allocator.prototype=new _349.allocator;
_34b.method_store.prototype=new _349.method_store;
_34b.method_dtable=_34b.method_store.prototype;
_34c.method_store.prototype=new _349.isa.method_store;
_34c.method_dtable=_34c.method_store.prototype;
_34b.super_class=_349;
_34c.super_class=_349.isa;
}else{
_34b.allocator.prototype=new objj_object();
}
_34b.isa=_34c;
_34b.name=_34a;
_34b.info=_310;
_34b._UID=objj_generateObjectUID();
_34c.isa=_34d.isa;
_34c.name=_34a;
_34c.info=_311;
_34c._UID=objj_generateObjectUID();
return _34b;
};
var _2cc=nil;
objj_registerClassPair=function(_34e){
_1[_34e.name]=_34e;
_348[_34e.name]=_34e;
_1ac(_34e,_2cc);
};
class_createInstance=function(_34f){
if(!_34f){
objj_exception_throw(new objj_exception(OBJJNilClassException,"*** Attempting to create object with Nil class."));
}
var _350=new _34f.allocator();
_350.isa=_34f;
_350._UID=objj_generateObjectUID();
return _350;
};
var _351=function(){
};
_351.prototype.member=false;
with(new _351()){
member=true;
}
if(new _351().member){
var _352=class_createInstance;
class_createInstance=function(_353){
var _354=_352(_353);
if(_354){
var _355=_354.isa,_356=_355;
while(_355){
var _357=_355.ivars;
count=_357.length;
while(count--){
_354[_357[count].name]=NULL;
}
_355=_355.super_class;
}
_354.isa=_356;
}
return _354;
};
}
object_getClassName=function(_358){
if(!_358){
return "";
}
var _359=_358.isa;
return _359?class_getName(_359):"";
};
objj_lookUpClass=function(_35a){
var _35b=_348[_35a];
return _35b?_35b:Nil;
};
objj_getClass=function(_35c){
var _35d=_348[_35c];
if(!_35d){
}
return _35d?_35d:Nil;
};
objj_getMetaClass=function(_35e){
var _35f=objj_getClass(_35e);
return (((_35f.info&(_311)))?_35f:_35f.isa);
};
ivar_getName=function(_360){
return _360.name;
};
ivar_getTypeEncoding=function(_361){
return _361.type;
};
objj_msgSend=function(_362,_363){
if(_362==nil){
return nil;
}
var isa=_362.isa;
if(!((((isa.info&(_311)))?isa:isa.isa).info&(_312))){
_340(isa);
}
var _364=isa.method_dtable[_363];
if(!_364){
_364=_342;
}
var _365=_364.method_imp;
switch(arguments.length){
case 2:
return _365(_362,_363);
case 3:
return _365(_362,_363,arguments[2]);
case 4:
return _365(_362,_363,arguments[2],arguments[3]);
}
return _365.apply(_362,arguments);
};
objj_msgSendSuper=function(_366,_367){
var _368=_366.super_class;
arguments[0]=_366.receiver;
if(!((((_368.info&(_311)))?_368:_368.isa).info&(_312))){
_340(_368);
}
var _369=_368.method_dtable[_367];
if(!_369){
_369=_342;
}
var _36a=_369.method_imp;
return _36a.apply(_366.receiver,arguments);
};
method_getName=function(_36b){
return _36b.name;
};
method_getImplementation=function(_36c){
return _36c.method_imp;
};
method_setImplementation=function(_36d,_36e){
var _36f=_36d.method_imp;
_36d.method_imp=_36e;
return _36f;
};
method_exchangeImplementations=function(lhs,rhs){
var _370=method_getImplementation(lhs),_371=method_getImplementation(rhs);
method_setImplementation(lhs,_371);
method_setImplementation(rhs,_370);
};
sel_getName=function(_372){
return _372?_372:"<null selector>";
};
sel_getUid=function(_373){
return _373;
};
sel_isEqual=function(lhs,rhs){
return lhs===rhs;
};
sel_registerName=function(_374){
return _374;
};
objj_eval=function(_375){
var url=_2.pageURL;
var _376=_2.asyncLoader;
_2.asyncLoader=NO;
var _377=_2.preprocess(_375,url,0);
if(!_377.hasLoadedFileDependencies()){
_377.loadFileDependencies();
}
_1._objj_eval_scope={};
_1._objj_eval_scope.objj_executeFile=_278.fileExecuterForURL(url);
_1._objj_eval_scope.objj_importFile=_278.fileImporterForURL(url);
var code="with(_objj_eval_scope){"+_377._code+"\n//*/\n}";
var _378;
_378=eval(code);
_2.asyncLoader=_376;
return _378;
};
_2.objj_eval=objj_eval;
_145();
var _379=new CFURL(window.location.href),_37a=document.getElementsByTagName("base"),_37b=_37a.length;
if(_37b>0){
var _37c=_37a[_37b-1],_37d=_37c&&_37c.getAttribute("href");
if(_37d){
_379=new CFURL(_37d,_379);
}
}
var _37e=new CFURL(window.OBJJ_MAIN_FILE||"main.j"),_1ab=new CFURL(".",new CFURL(_37e,_379)).absoluteURL(),_37f=new CFURL("..",_1ab).absoluteURL();
if(_1ab===_37f){
_37f=new CFURL(_37f.schemeAndAuthority());
}
_192.resourceAtURL(_37f,YES);
_2.pageURL=_379;
_2.bootstrap=function(){
_380();
};
function _380(){
_192.resolveResourceAtURL(_1ab,YES,function(_381){
var _382=_192.includeURLs(),_8c=0,_383=_382.length;
for(;_8c<_383;++_8c){
_381.resourceAtURL(_382[_8c],YES);
}
_278.fileImporterForURL(_1ab)(_37e.lastPathComponent(),YES,function(){
_146();
_389(function(){
var _384=window.location.hash.substring(1),args=[];
if(_384.length){
args=_384.split("/");
for(var i=0,_383=args.length;i<_383;i++){
args[i]=decodeURIComponent(args[i]);
}
}
var _385=window.location.search.substring(1).split("&"),_386=new CFMutableDictionary();
for(var i=0,_383=_385.length;i<_383;i++){
var _387=_385[i].split("=");
if(!_387[0]){
continue;
}
if(_387[1]==null){
_387[1]=true;
}
_386.setValueForKey(decodeURIComponent(_387[0]),decodeURIComponent(_387[1]));
}
main(args,_386);
});
});
});
};
var _388=NO;
function _389(_38a){
if(_388){
return _38a();
}
if(window.addEventListener){
window.addEventListener("load",_38a,NO);
}else{
if(window.attachEvent){
window.attachEvent("onload",_38a);
}
}
};
_389(function(){
_388=YES;
});
if(typeof OBJJ_AUTO_BOOTSTRAP==="undefined"||OBJJ_AUTO_BOOTSTRAP){
_2.bootstrap();
}
function _1a5(aURL){
if(aURL instanceof CFURL&&aURL.scheme()){
return aURL;
}
return new CFURL(aURL,_1ab);
};
objj_importFile=_278.fileImporterForURL(_1ab);
objj_executeFile=_278.fileExecuterForURL(_1ab);
objj_import=function(){
CPLog.warn("objj_import is deprecated, use objj_importFile instead");
objj_importFile.apply(this,arguments);
};
})(window,ObjectiveJ);
