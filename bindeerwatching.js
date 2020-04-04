// In the name of lord | daNialz on the code o_o

let bindeerareadom=document.getElementById('bindeerarea'),primaryid,cursorX=0,cursorY=0,scrollY=0,mouseEvent='',chekasiboard='',websitekey=bindeerareadom.getAttribute('key'),currPos=window.location.href;

fetch('bindeer.php',{method:'post',body:JSON.stringify({'act':'hellodeer','key':websitekey,'url':currPos,'dom':getDom()})}).then(response => response.json()).then(result => hellodeer(result));

function hellodeer(id){
primaryid=id;
bindeerareadom.setAttribute('data-id',id);
let inputs=document.createElement('div');
inputs.innerHTML= '<input class="deerwatchingpoint" type="hidden" value="0:0"><input class="deerwatchingroad" type="hidden" value="0"><input class="deerwatchingmouse" type="hidden" value=""><input class="deerwatchingkey" type="hidden" value="×">';
bindeerareadom.appendChild(inputs);
}

function getDom(){
let webdom=document.documentElement.outerHTML,currLink=getCookie('currLink'),locationHref=window.location.href;
//if(!currLink){setCookie('currLink',locationHref,1);currLink=locationHref;}
//if(locationHref!=currLink){
//setCookie('currLink',locationHref,1);
//currLink=locationHref;
//}else{}
return webdom;
}

function initer(){
let lastdataInit=bindeerareadom.getElementsByClassName('deerwatchingpoint')[0].value,newdataKey,lastdataRoad=bindeerareadom.getElementsByClassName('deerwatchingroad')[0].value,lastdataKey=bindeerareadom.getElementsByClassName('deerwatchingkey')[0].value,lastdataAction=bindeerareadom.getElementsByClassName('deerwatchingmouse')[0].value,newdataAction=lastdataAction,newdataInit=lastdataInit+','+cursorX+':'+cursorY,newdataRoad=lastdataRoad+','+scrollY;
if(chekasiboard==''){chekasiboard='×';}
newdataKey=lastdataKey+','+chekasiboard;
chekasiboard='';
if(mouseEvent!=''){newdataAction=lastdataAction+mouseEvent;}
mouseEvent='';
scrollY=scrollY.toString().replace(/\*/g, '');
bindeerareadom.getElementsByClassName('deerwatchingpoint')[0].value=newdataInit;
bindeerareadom.getElementsByClassName('deerwatchingmouse')[0].value=newdataAction;
bindeerareadom.getElementsByClassName('deerwatchingroad')[0].value=newdataRoad;
lastdataKey=bindeerareadom.getElementsByClassName('deerwatchingkey')[0].value=newdataKey;
}

function sv(){
let init=bindeerareadom.getElementsByClassName('deerwatchingpoint')[0].value,road=bindeerareadom.getElementsByClassName('deerwatchingroad')[0].value,keys=bindeerareadom.getElementsByClassName('deerwatchingkey')[0].value,actions=bindeerareadom.getElementsByClassName('deerwatchingmouse')[0].value;
resetiniter();
fetch('bindeer.php',{method:'post',body:JSON.stringify({'act':'initer','init':init,'keypress':keys,'road':road,'actions':actions,'id':primaryid,'key':websitekey})}).then(response => response.json());
}

function resetiniter(){
bindeerareadom.getElementsByClassName('deerwatchingpoint')[0].value='';
bindeerareadom.getElementsByClassName('deerwatchingroad')[0].value='';
bindeerareadom.getElementsByClassName('deerwatchingkey')[0].value='';
bindeerareadom.getElementsByClassName('deerwatchingmouse')[0].value='';
}

document.onscroll = function(e){
scrollY = document.documentElement.scrollTop || document.body.scrollTop;
}
document.onclick = function(e){
scrollY = scrollY+'*';
}
let mousemovenum=1;
document.onmousemove = function(e){
cursorX = e.pageX;
cursorY = e.clientY;
let eventdata={'action':'mousemove','x':e.x,'y':e.y,'scrollY':parseInt(scrollY),'scrollX':parseInt(scrollX),'timestamp':e.timeStamp,'eventnumber':mousemovenum};
mousemovenum++;
mouseEvent=(mouseEvent+JSON.stringify(eventdata)+',');
}
document.onmousedown = function(e){
let eventtarget=e.srcElement.nodeName;if(e.srcElement.id!=''){eventtarget+='#'+e.srcElement.id;}if(e.srcElement.className!=''){eventtarget+='.'+e.srcElement.className;}
let eventdata={'action':'mousedown','x':e.x,'y':e.y,'scrollY':parseInt(scrollY),'scrollX':parseInt(scrollX),'target':eventtarget,'which':e.which,'timestamp':e.timeStamp};
mouseEvent=(mouseEvent+JSON.stringify(eventdata)+',');
//console.log(e);
//console.log(eventdata);
}
document.onmouseup = function(e){
let eventtarget=e.srcElement.nodeName;if(e.srcElement.id!=''){eventtarget+='#'+e.srcElement.id;}if(e.srcElement.className!=''){eventtarget+='.'+e.srcElement.className;}
let eventdata={'action':'mouseup','x':e.x,'y':e.y,'scrollY':parseInt(scrollY),'scrollX':parseInt(scrollX),'target':eventtarget,'which':e.which,'timestamp':e.timeStamp};
mouseEvent=(mouseEvent+JSON.stringify(eventdata)+',');
//console.log(e);
//console.log(eventdata);
}
window.addEventListener("keydown",function(e){
chekasiboard=(chekasiboard+e.key);
//console.log(e);
},false);
setInterval(function(){initer()},1000); // zamane sabt dar browser
setInterval(function(){sv()},3000); // zamane sabt dar db

window.addEventListener('popstate',function(e){
let locationHref=window.location.href,eventdata={'action':'pagechange','lastlocation':currPos,'newlocation':locationHref,'timestamp':e.timeStamp};
mouseEvent=(mouseEvent+JSON.stringify(eventdata)+',');
setTimeout(function(){
fetch('bindeer.php',{method:'post',body:JSON.stringify({'act':'pagechange','key':websitekey,'url':locationHref,'target':primaryid,'dom':getDom()})}).then(response => response.json());

},1000);
currPos=locationHref;
});
const pushUrl = (href) => {
  history.pushState({}, '', href);
  window.dispatchEvent(new Event('popstate'));
};

// Foreign Functions
function setCookie(cname, cvalue, exdays) {var d = new Date();d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));var expires = "expires="+d.toUTCString();document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";}
function getCookie(cname) {var name = cname + "=";var ca = document.cookie.split(';');for(var i = 0; i < ca.length; i++) {var c = ca[i];while (c.charAt(0) == ' ') {c = c.substring(1);}if (c.indexOf(name) == 0) {return c.substring(name.length, c.length);}}return "";}

