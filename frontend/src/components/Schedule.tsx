//コンサートスケジュール

import { Concert } from "../types/concert";

const Schedule: React.FC<Concert> = (props) => {
  return (
    <div className="w-full flex justify-center my-2 transition">
      <div className="schedule-inner">
        <p className=" ">{props.date}</p>
        <p className=" ">{props.place}</p>
        <p className=""> {props.venue}</p>
      </div>
    </div>
  );
};

export default Schedule;
