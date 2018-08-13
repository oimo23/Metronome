/*-----------------------------------------------
// 低い音の準備
-------------------------------------------------*/
const context = new(window.AudioContext||window.webkitAudioContext)();
const osc = context.createOscillator();
const gain = context.createGain();

/*-----------------------------------------------
// 高い音の準備
-------------------------------------------------*/
const context2 = new AudioContext();
const osc2 = context2.createOscillator();
const gain2 = context2.createGain();

alert('hello');