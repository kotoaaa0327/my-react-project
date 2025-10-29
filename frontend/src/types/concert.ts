//コンサート日時場所
export interface Concert {
    date: string;
    venue: string;
    place: string;
  }

  //コンサート時間・値段
  export interface ConcertDetail extends Concert {
    open: string;
    start: string;
    premiumPrice: string;
    price: string;
  }