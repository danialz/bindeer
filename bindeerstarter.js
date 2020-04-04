let websiteid='85bu-69ll-85sh-69it';
function init(){
document.body.innerHTML += '<div style="display:none;"><iframe src="javascript:false;" style="width:0;height:0;border:0;border:none;" key="'+websiteid+'" data-id="" id="bindeerarea"></iframe></div>';
let bindeerareadom = document.getElementById('bindeerarea');
let script=document.createElement('script');
script.src= 'js/bindeerwatching.js';
bindeerareadom.appendChild(script);
}
window.onload = function() {
init();
};