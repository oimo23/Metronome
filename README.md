## 概要
WebAudio APIを使用したメトロノームアプリ

## デプロイ先
http://oimo-tools.com/metronome/

## 説明
ブラウザで使えるメトロノームアプリケーションです。
既に最低限の機能は実装されていますが、まだ開発途中です。

JavascriptのSetintevalを使用して、単純に定期的に音を鳴らすと場合によって簡単に遅延が発生します。
なので、このアプリケーションでは協調スケジューリングという手法を使って正確なスケジューリングが出来るようにしています。

## 参考リンク
2 つの時計のお話 - Web Audio の正確なスケジューリングについて
https://www.html5rocks.com/ja/tutorials/audio/scheduling/