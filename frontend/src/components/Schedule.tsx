//コンサートスケジュール

import { Concert } from "../types/concert";

const Schedule : React.FC<Concert>= (props) => {
  return (
    <div className=" flex justify-between items-center  my-2  rounded-lg  transition duration-300 ">
      <div className="schedule-inner ">
        <p className=" ">{props.date}</p>
        <p className=" ">{props.place}</p>
        <p className=""> {props.venue}</p>
      </div>
    </div>
  );
};

export default Schedule;
