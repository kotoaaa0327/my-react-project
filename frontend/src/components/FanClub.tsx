//TopPage ファンクラブ

import { Link } from "react-router-dom";

type FanClubProps = {
  isLinkOnly?: boolean;
};

const FanClub: React.FC = ({ isLinkOnly = false }: FanClubProps) => {
  const content = (
    <div className="text-center">
      <h2 className="section-title"> FANCLUB </h2>
      <div className="section-layout">
        <div className="section-inner">
          <p>
            マイページへのログイン・会員情報変更・
            <br />新規会員登録はこちらから！
            <br />
          </p>
        </div>
        <Link to="/fanclub/detail" className="topPage-button">
          詳細はこちら
        </Link>
      </div>
    </div>
  );

  if (isLinkOnly) {
    return content;
  }

  return <div>{content}</div>;
};

export default FanClub;
