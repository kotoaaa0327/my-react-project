//カウントダウン

import { useState, useEffect } from "react";

const now = new Date();

const Countdown: React.FC = () => {
  const startLiveDate = new Date("2026-03-28");
  const [timeLeft, setTimeLeft] = useState(
    startLiveDate.getTime() - Date.now()
  );

  //日時計算
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(startLiveDate.getTime() - Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, [startLiveDate]);

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
