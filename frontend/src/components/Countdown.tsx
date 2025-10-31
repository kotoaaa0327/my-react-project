//カウントダウン

import { useState, useEffect } from "react";

const Countdown: React.FC = () => {

  const countdownEnv = import.meta.env.VITE_COUNTDOWN_END;

  const endDate = countdownEnv
    ? new Date(countdownEnv)
    : new Date(new Date().setHours(23, 59, 59, 999));

  if (isNaN(endDate.getTime())) {
    console.error("Countdown target date is invalid:", countdownEnv);
  }

  // const targetDate = import.meta.env.VITE_COUNTDOWN_END as string;
  // console.log("targetDate:", targetDate);

  // const endDate = new Date(targetDate);
  // if (isNaN(endDate.getTime())) {
  //   console.error("Countdown target date is invalid:", targetDate);
  //   // fallback に今日の日付などを設定してエラーを防ぐ
  // }

  const [timeLeft, setTimeLeft] = useState(
    endDate.getTime() - Date.now()
  );

  //日時計算
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(endDate.getTime() - Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <div className=" text-center py-10">
      <h2 className="section-title ">LAST LIVE START IN</h2>
      <div className="flex justify-center gap-3 md:gap-4 lg:gap-5 text-3xl mt-5 ">
        {/* 日にち */}
        <div className="countdown-box">
          <span className="countdown">
            <span
              className="countdown-number"
              style={{ "--value": days } as React.CSSProperties}
            >
              {days}
            </span>
          </span>
          <div className="countdown-unit">DAYS</div>
        </div>
        {/* 時間 */}
        <div className="countdown-box">
          <span className="countdown">
            <span
              className="countdown-number"
              style={{ "--value": hours } as React.CSSProperties}
            >
              {hours}
            </span>
          </span>
          <div className="countdown-unit">HOURS</div>
        </div>
        {/* 分 */}
        <div className="countdown-box">
          <span className="countdown">
            <span
              className="countdown-number"
              style={{ "--value": minutes } as React.CSSProperties}
            >
              {minutes}
            </span>
          </span>
          <div className="countdown-unit">MINS</div>
        </div>
        {/* 秒 */}
        <div className="countdown-box">
          <span className="countdown">
            <span
              className="countdown-number"
              style={{ "--value": seconds } as React.CSSProperties}
            >
              {seconds}
            </span>
          </span>
          <div className="countdown-unit">SECS</div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
