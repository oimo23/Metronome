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
				this.osc.frequency.value = 1400;
				console.log(this.count);
				console.log("head!");
			} else {
				this.osc.frequency.value = 1200;
				console.log("tick!");
			}
      		
      		this.gain.gain.value = 1;
      		setTimeout(()=>this.gain.gain.value = 0, 30);

			this.timer1 = setTimeout(()=> this.scheduling(), this.tick);
      		this.timer2 = setTimeout(()=> this.flash = false, 20 );

      		this.count++;
		}
	},
	created: function() {
		// Web Audio API　を使用してメトロノーム音の作成を行っておく
		this.context = new(window.AudioContext||window.webkitAudioContext)();
		this.osc = this.context.createOscillator();
		this.gain = this.context.createGain();
		
		this.osc.frequency.value = 1400;
    	this.gain.gain.value = 0;

		this.osc.connect(this.gain);
		this.gain.connect(this.context.destination);
	}
});