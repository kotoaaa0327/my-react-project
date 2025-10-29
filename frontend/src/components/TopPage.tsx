//トップページ

import React from "react";
import { concerts } from "../data/concertData";

import MainVisual from "./MainVisual";
import Schedule from "./Schedule";
import Goods from "./Goods";
import Ticket from "./Ticket";
import RequestForm from "./RequestForm";
import Countdown from "./Countdown";
import FanClub from "./FanClub";

const TopPage: React.FC = () => {
  //コンサート日程コンポーネント化
  const concertsSchedule = concerts.map((concert, index) => (
    <Schedule
      key={index}
      date={concert.date}
      venue={concert.venue}
      place={concert.place}
    />
  ));

  return (
    <div>
      <main className="main-bg">
        <MainVisual />
        <Countdown />

        <section id="schedule" className="text-center tracking-wider ">
          <h2 className="section-title"> SCHEDULE </h2>
          <div className="schedule-layout ">{concertsSchedule}</div>
        </section>

        <section id="ticket">
          <Ticket />
        </section>

        <section id="goods">
          <Goods />
        </section>

        <section id="fanclub">
          <FanClub />
        </section>

        <section id="request">
          <RequestForm />
        </section>
      </main>

    </div>
  );
};

export default TopPage;
