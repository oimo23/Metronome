new Vue({
	el: '#app',
	data: {
		tempo: 120,
		times: "4/4",
		firstClick: true,
		count: 0,
		isPlaying: false,
		baseTime: null,
		tick: null,
		lastClickTimeStamp: null,
		flash: false,
		osc: null,
		gain: null,
		context: null,
		osc2: null,
		gain2: null,
		context2: null,
		timer1: null,
		timer2: null,
	},
	methods: {
		// **************************************************
		// 再生ボタンが押されたとき、前処理をしてスケジューリング関数を起動
		// **************************************************
		startPlay() {
			// 初回クリックであれば、モバイルのミュート対策のため裏で鳴らしておく
			if ( this.firstClick == true ) {
				this.osc.start(0);
				this.osc2.start(0);
			}
			
			this.lastClickTimeStamp = performance.now();	
			this.scheduling(this.tempo);

			this.firstClick = false;
			this.isPlaying = true;
		},

		// **************************************************
		// 停止ボタンが押されたとき、タイマーの解除とカウントの初期化
		// **************************************************
		stopPlay() {
			this.isPlaying = false;

			clearInterval(this.timer1);
			clearInterval(this.timer2);
			
			this.count = 0;
		},

		// **************************************************
		// テンポチェンジを行う
		// **************************************************
		tempoChange(value) {
			if( this.tempo < 40 || this.tempo > 250 ) { return };

			this.tempo = parseInt(this.tempo) + parseInt(value);
		},

		// **************************************************
		// メトロノームのスケジューリングを行う
		// **************************************************
		scheduling() {
			this.flash = true;
			this.tick = 60 * 1000 / this.tempo;

			// １拍目なら高い音、それ以外なら低い音にする
			if(this.count % parseInt(this.times.split("/")[0]) === 0 || this.count === 0) {
				this.gain.gain.value = 1;
      			setTimeout(()=>this.gain.gain.value = 0, 30);
			} else {
				this.gain2.gain.value = 1;
      			setTimeout(()=>this.gain2.gain.value = 0, 30);
			}
      	
      		this.timer1 = setTimeout(()=> this.scheduling(), this.tick);
      		this.timer2 = setTimeout(()=> this.flash = false, 20 );

      		this.count++;
		}
	},
	created: function() {
		// Web Audio API　を使用してメトロノーム音の作成を行っておく
		// 高い音
		this.context = new(window.AudioContext||window.webkitAudioContext)();
		this.osc = this.context.createOscillator();
		this.gain = this.context.createGain();
		
		this.osc.frequency.value = 1200;
    	this.gain.gain.value = 0;

		this.osc.connect(this.gain);
		this.gain.connect(this.context.destination);

		// 低い音
		this.context2 = new(window.AudioContext||window.webkitAudioContext)();
		this.osc2 = this.context2.createOscillator();
		this.gain2 = this.context2.createGain();
		
		this.osc2.frequency.value = 1000;
    	this.gain2.gain.value = 0;

		this.osc2.connect(this.gain2);
		this.gain2.connect(this.context2.destination);
	}
});