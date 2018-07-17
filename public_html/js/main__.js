$(document).ready(function(){
	$('select').formSelect();
});
     

/*-----------------------------------------------
// スマホではtouchend,PCではclickを取得するようにする    
-------------------------------------------------*/
let isTouchDevice = (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);

//デバイス判定によるイベントの決定
let eventType = (isTouchDevice) ? 'touchend' : 'click';

/*-----------------------------------------------
// 低い音の準備
-------------------------------------------------*/
const context = new(window.AudioContext || window.webkitAudioContext);
const osc = context.createOscillator();
const gain = context.createGain();


/*-----------------------------------------------
// 再生処理 
-------------------------------------------------*/
$('.play').on(eventType, function(){
	isPlaying = true;
	$('.play').hide();
	$('.stop').show();
	playOn(tempo);
});


/*-----------------------------------------------
// 停止処理   
-------------------------------------------------*/
$('.stop').on(eventType, function(){
	$('.stop').hide();
	$('.play').show();
	isPlaying = false;
	clearInterval(timer1);
	gain.gain.cancelScheduledValues(context.currentTime);
	gain2.gain.cancelScheduledValues(context.currentTime);
	$('.anime1 .frame1').hide();
	$('.anime1 .frame2').hide();
	$('.anime1 .frame0').show();
});

/*-----------------------------------------------
// テンポ操作
-------------------------------------------------*/
$('.tempo1_up').on(eventType, function(){
	tempo = tempo + 1;
	$('.tempo').text(tempo);
});

$('.tempo1_down').on(eventType, function(){
	tempo = tempo - 1;
	$('.tempo').text(tempo);
});

$('.tempo5_up').on(eventType, function(){
	tempo = tempo + 5;
	$('.tempo').text(tempo);
});

$('.tempo5_down').on(eventType, function(){
	tempo = tempo - 5;
	$('.tempo').text(tempo);
});

