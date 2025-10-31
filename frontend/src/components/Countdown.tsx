// //カウントダウン

import { useState, useEffect } from "react";

const Countdown: React.FC = () => {
  const countdownEnv = import.meta.env.VITE_COUNTDOWN_END;

const endDate = countdownEnv
? new Date(countdownEnv)
: new Date(new Date().setHours(23, 59, 59, 999));

const [timeLeft, setTimeLeft] = useState(endDate.getTime() - Date.now());

useEffect(() => {
  const timer = setInterval(() => {
    setTimeLeft(endDate.getTime() - Date.now());
  }, 1000);
  return () => clearInterval(timer);
}, [endDate]);

const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
const seconds = Math.floor((timeLeft / 1000) % 60);

  return (
    <div className="text-center py-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-5">
        LAST LIVE START IN
      </h2>
      <div className="flex justify-center gap-3 md:gap-4 lg:gap-5 text-3xl md:text-4xl">
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

//         <div className="countdown-box">
//           <div className="countdown">
//             <span className="countdown-number">{days}</span>
//             <div className="countdown-unit">DAYS</div>
//           </div>
//         </div>
//         {/* 時間 */}
//         <div className="countdown-box">
//           <div className="countdown">
//             <span className="countdown-number">{hours}</span>
//             <div className="countdown-unit">HOURS</div>
//           </div>
//         </div>

//         {/* 分 */}
//         <div className="countdown-box">
//           <div className="countdown">
//             <span className="countdown-number">{minutes}</span>
//             <div className="countdown-unit">MINS</div>
//           </div>
//         </div>

//         {/* 秒 */}
//         <div className="countdown-box">
//           <div className="countdown">
//             <span className="countdown-number">{seconds}</span>
//             <div className="countdown-unit">SECS</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Countdown;
