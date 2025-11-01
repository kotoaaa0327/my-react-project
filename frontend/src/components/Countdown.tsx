// //カウントダウン

import { useState, useEffect } from "react";

const Countdown: React.FC = () => {
  const countdownEnv = import.meta.env.VITE_COUNTDOWN_END;

//.envから取得した日付文字列（2026-03-28T00:00:00Z）が存在するかどうか
const endDate = countdownEnv
//存在するなら、それをDate型に変換して使う
? new Date(countdownEnv)
//存在しない（undefinedや空）なら、今日の23:59:59 に設定した日付を使う
: new Date(new Date().setHours(23, 59, 59, 999));

//設定した終了時間と、今の現在時刻との差をstateに保存
const [timeLeft, setTimeLeft] = useState(endDate.getTime() - Date.now());

useEffect(() => {
  //1,000ミリ秒（=1秒）ごとに処理を実行する
  const timer = setInterval(() => {
    setTimeLeft(endDate.getTime() - Date.now());
  }, 1000);
  //コンポーネントが消える時や再レンダー時にタイマーを止める
  return () => clearInterval(timer);
}, [endDate]);

//ミリ秒の塊から、日・時間・分・秒を順番に切り分け
//残り時間（ms）を1日のミリ秒で割る
const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
//1時間をミリ秒に変換（= 3600000ms）。24時間を超えた分を切り捨てて今の時間部分だけにする
const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
//ミリ秒 → 分 に変換。60分を超えた分は切り捨て、0〜59 の範囲にする
const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
//ミリ秒 → 秒に変換。0〜59秒を取得
const seconds = Math.floor((timeLeft / 1000) % 60);

  return (
    <div className="text-center py-10 md:py-4 lg:py-6">
      <h2 className="section-title">
        LAST LIVE START IN
      </h2>
      <div className="flex justify-center gap-3 md:gap-6 lg:gap-7 xl:gap-8 text-3xl md:text-4xl">
        {/* 日にち */}
        <div className="countdown-box">
          <span className="countdown-number">{days}</span>
          <span className="countdown-unit">DAYS</span>
        </div>
        {/* 時間 */}
        <div className="countdown-box">
          <span className=" countdown-number">{hours}</span>
          <span className="countdown-unit">HOURS</span>
        </div>
        {/* 分 */}
        <div className="countdown-box">
          <span className="countdown-number">{minutes}</span>
          <span className="countdown-unit">MINS</span>
        </div>
        {/* 秒 */}
        <div className="countdown-box">
          <span className="countdown-number">{seconds}</span>
          <span className="countdown-unit">SECS</span>
        </div>
      </div>
    </div>
  );
};

export default Countdown;

