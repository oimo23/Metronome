/*-----------------------------------------------
// 低い音の準備
-------------------------------------------------*/
var context = new(window.AudioContext||window.webkitAudioContext)();
var osc = context.createOscillator();
var gain = context.createGain();

/*-----------------------------------------------
// 高い音の準備
-------------------------------------------------*/
var context2 = new(window.AudioContext||window.webkitAudioContext)();
var osc2 = context2.createOscillator();
var gain2 = context2.createGain();

alert('hello');