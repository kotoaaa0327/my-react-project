//コンサートチケット詳細

import { useNavigate } from "react-router-dom";
import { concertsDetails } from "../data/concertDetailData";
import { ConcertDetail } from "../types/concert";
import { useState } from "react";
import { ReservationData } from "../types/ticketDetaildata";
import {
  collection,
  addDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase";

const initialReservationState: ReservationData = {
  concertIndex: null,
  ticketType: null,
  ticketCount: 1,
  name: "",
  mail: "",
};

//チケット最大予約可能枚数
const MAX_TICKETS = 4;

const TicketDtl: React.FC = () => {
  const navigate = useNavigate();

  //公演詳細
  const ScheduleDtl: React.FC<ConcertDetail> = ({
    date,
    place,
    venue,
    open,
    start,
    premiumPrice,
    price,
  }) => {
    return (
      <div className="ticket-container">
        <div className="flex justify-center">
          <div className="text-left">
          <div className="date-and-location ">
            <p className=" ">{date}</p>
            <p className=" ">{place}</p>
            <p className=""> {venue}</p>
          </div>

          <div className="ticket-detail">
            <p className=""> 開場 {open}</p>
            <p className=""> / 開演{start}</p>
          </div>

          <div className="ticket-detail">
            <p className=""> プレミアムチケット{premiumPrice}</p>
            <p className=""> / 通常チケット{price}</p>
          </div>
          </div>
        </div>
      </div>
    );
  };

  const [loading, setLoading] = useState(false);

  //公演選択
  const [selectedConcertDetail, setSelectedConcertDetail] =
    useState<ConcertDetail | null>(null);

  //ドロップダウン
  const [isArrowActive, setArrowActive] = useState(false);

  //ユーザーが現在選択している公演のインデックス
  const [selectedIndex, setSelectedIndex] = useState<number | "">("");

  //予約の内容を一時的に保存・管理
  const [ReservationData, setReservationData] = useState<ReservationData>(
    initialReservationState
  );

  //予約画面の切り替え false→予約フォーム表示/true→予約完了メッセージ表示
  const [isSubmitted, setIsSubmitted] = useState(false);

  //エラー処理
  const [error, setError] = useState<{ [key: string]: string }>({});

  const validate = (data: ReservationData, selected: ConcertDetail | null) => {
    const newErrors: { [key: string]: string } = {};

    if (selected === null) {
      newErrors.concertIndex = "公演日時を選択してください";
    }

    if (data.ticketType === null) {
      newErrors.ticketType = "チケットの種類を選択してください";
    }

    if (
      data.ticketCount === null ||
      data.ticketCount < 1 ||
      data.ticketCount > MAX_TICKETS
    ) {
      newErrors.ticketCount = "チケットの枚数を選択してください";
    }

    if (!data.name.trim()) {
      newErrors.name = "名前を入力してください";
    }

    if (!data.mail.trim()) {
      newErrors.mail = "メールアドレスを入力してください";
    }
    return newErrors;
  };

  //公演選択(ドロップダウン)
  const handleSelectConcert = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    const selectedIndex = parseInt(value, 10);

    setSelectedIndex(value === "" ? "" : selectedIndex);

    if (value === "") {
      setSelectedConcertDetail(null);
    } else if (selectedIndex >= 0 && selectedIndex < concertsDetails.length) {
      const detail = concertsDetails[selectedIndex];
      setSelectedConcertDetail(detail);
    }
  };

  //チケットの種類選択
  const handleTicketTypeSelect = (type: "premium" | "general") => {
    setReservationData((prev) => ({
      ...prev,
      ticketType: type,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target;

    const newValue: string | number =
      type === "number" || name === "ticketCount"
        ? parseInt(value, 10) || 0
        : value;
    setReservationData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  //申し込み完了時の処理
  const handleApplicationCompleted = async (event: React.FormEvent) => {
    event.preventDefault();

    const validationErrors = validate(ReservationData, selectedConcertDetail);
    setError(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    if (isSubmitted || loading) return;

    setLoading(true);

    try {
      await addDoc(collection(db, "reservations"), {
        ...ReservationData,
        concertsDetail: selectedConcertDetail,
        timestamp: serverTimestamp(),
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error("エラーが発生しました。もう一度お試しください。", error);
      alert("予約処理中にエラーが発生しました。もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  //戻るボタン
  const handleBackClick = () => {
    navigate(-1);
  };

  const arrowClassName = `select-arrow ${isArrowActive ? "active" : ""}`;

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center  min-h-[100vh] ">
        <div className="text-center font-bold">
          <h2 className="mt-60 text-lg md:text-2xl lg:text-3xl">
            チケットの申し込みが完了しました
          </h2>
          <p className="my-8 md:text-xl lg:text-2xl">
            詳細はメールをご確認ください。
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-8 mb-60 px-6 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600  "
          >
            トップページへ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative justify-center mx-4 md:mx-32 lg:mx-36 xl:mx-60">
      <div>
        <h2 className="ticket-title">チケット詳細・申し込み</h2>

        <div>
          <h3 className="ticket-category">
            チケット詳細
          </h3>
          <div className="border-black bg-white">
            {concertsDetails.map((concert, index) => (
              <ScheduleDtl key={index} {...concert} />
            ))}
          </div>
        </div>
        <div>
          <h3 className="ticket-category mt-10 lg:mt-16">
            チケット申し込み
          </h3>

          <div className="border border-black bg-white">
            <div>
              <div className="flex justify-center">
              <p className="text-left text-sm md:text-lg lg:text-[1.625rem] mb-3 p-3 lg:mt-4">
                ご希望の公演を選択し、必要事項を入力してください。
                <br />
                お申し込みはお一人様1公演1回までです。
              </p>
              </div>
              <form onSubmit={handleApplicationCompleted} className="md:px-4 lg:px-8">
                {/* 公演選択 */}
                <div className="container">
                  <div className="select-container">
                    <h3 className="concert-select-title ">
                      公演日時の選択 (必須)
                    </h3>
                    <select
                      value={selectedIndex.toString()}
                      onChange={handleSelectConcert}
                      onFocus={() => setArrowActive(true)}
                      onBlur={() => setArrowActive(false)}
                      className="concert-select-inner"
                    >
                      <option value="">選択してください</option>
                      {concertsDetails.map((concert, index) => (
                        <option value={index} key={index}>
                          {concert.date}
                          {concert.place}
                          {concert.venue}
                        </option>
                      ))}
                    </select>
                    {error.concertIndex && (
                      <p className="text-red-500 md:text-lg lg:text-xl">
                        {error.concertIndex}
                      </p>
                    )}
                    <div
                      className={`select-arrow ${
                        isArrowActive ? "active" : ""
                      }`}
                    ></div>
                  </div>
                </div>

                {/* チケットの種類選択 */}
                <div className="container">
                  <div className="select-container">
                    <h3 className="concert-select-title">
                      チケット種類の選択 (必須)
                    </h3>
                    <div className="concert-select-inner">
                      <label className=" mr-5 md:mr-10">
                        <input
                          type="radio"
                          name="ticketType"
                          value="premium"
                          checked={ReservationData.ticketType === "premium"}
                          onChange={() => handleTicketTypeSelect("premium")}
                        />
                        プレミアムチケット
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="ticketType"
                          value="general"
                          checked={ReservationData.ticketType === "general"}
                          onChange={() => handleTicketTypeSelect("general")}
                        />
                        一般チケット
                      </label>
                    </div>

                    {error.ticketType && (
                      <p className="text-red-500 md:text-lg lg:text-xl">
                        {error.ticketType}
                      </p>
                    )}
                  </div>
                </div>

                {/* チケット枚数選択 */}
                <div className="container">
                  <div className="select-container">
                    <h3 className="concert-select-title">
                      チケット枚数の選択 (必須)
                    </h3>

                    <input
                      type="number"
                      name="ticketCount"
                      value={ReservationData.ticketCount}
                      onChange={handleChange}
                      min="1"
                      max={MAX_TICKETS}
                      className="concert-select-inner ml-5"
                    />

                    <p className="mt-3 text-sm md:text-xl">
                      ※最大{MAX_TICKETS}枚まで
                    </p>
                    <div
                      className={`select-arrow ${
                        isArrowActive ? "active" : ""
                      }`}
                    ></div>
                  </div>
                </div>

                {/* 予約者氏名 */}
                <div className="select-container">
                  <h3 className="concert-select-title">氏名</h3>
                  <label htmlFor="name"></label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={ReservationData.name}
                    onChange={handleChange}
                    className="concert-select-inner"
                  />
                  {error.name && (
                    <p className="text-red-500 mx-3 md:text-lg lg:text-xl">
                      {error.name}
                    </p>
                  )}
                </div>

                {/* 予約者メールアドレス */}
                <div className="select-container">
                  <h3 className="concert-select-title">メールアドレス</h3>
                  <label htmlFor="mail"></label>
                  <input
                    type="text"
                    name="mail"
                    id="mail"
                    value={ReservationData.mail}
                    onChange={handleChange}
                    className="concert-select-inner"
                  />
                  {error.mail && (
                    <p className="text-red-500 mx-3 md:text-lg lg:text-xl">
                      {error.mail}
                    </p>
                  )}
                </div>

                {/* 予約ボタン */}
                <div className="text-center">
                  <button
                    type="submit"
                    className="reservation-button"
                    onClick={handleApplicationCompleted}
                    disabled={loading}
                  >
                    {loading ? "登録処理中..." : "予約を完了する"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* 戻るボタン */}
        <div className="text-center">
          <button onClick={handleBackClick} className="back-button">
            戻る
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketDtl;
