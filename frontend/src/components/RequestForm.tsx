//TopPage リクエストフォーム

import { Link } from "react-router-dom";

type RequestFormProps = {
  isLinkOnly?: boolean;
};

const RequestForm: React.FC = ({ isLinkOnly = false }: RequestFormProps) => {
  const content = (
    <div className="text-center ">
      <h2 className="section-title"> REQUEST </h2>
      <div className="section-layout ">
        <div className="section-inner">
          <p>
          【受付期間】
          <br />
            2025/11/1(土)10:00 ～ 2026/12/1(月)18:00
          </p>
          <p className="mt-2">
            Storm FINAL TOUR 2026 「Best of
            storm」の開催を記念して、会員限定でStormに歌ってほしい曲を大募集！
            <br />
            沢山の方のリクエスト募集しております！
          </p>
        </div>
        <Link to="/request/detail" className="topPage-button">
          リクエストはこちら
        </Link>
      </div>
    </div>
  );

  if (isLinkOnly) {
    //isLinkOnly→true：content（リンクだけの中身）を返す
    return content;
  }
//false のとき：<div>{content}</div> にラップして返す
  return <div>{content}</div>;
};

export default RequestForm;
