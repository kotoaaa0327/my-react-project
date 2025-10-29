//TopPage グッズ

import { Link } from "react-router-dom";

type GoodsProps = {
  isLinkOnly?: boolean;
};

const Goods : React.FC= ({ isLinkOnly = false }: GoodsProps) => {
  const content = (
    <div className="text-center ">
      <h2 className="section-title"> GOODS </h2>
      <div className="section-layout">
      <div className="section-inner ">
          <p>
          【受付期間】
          <br />
          2025/12/1(日) 10:00 ～ 2026/6/1(月) 18:00
          <br />
          Storm FINAL TOUR 2026 「Best of storm」のグッズをオンライン販売いたします！
          </p>
        </div>
      <Link
        to="/goods/detail"
        className="topPage-button"
      >
        詳細はこちら
      </Link>
      </div>
    </div>
  );

  if (isLinkOnly) {
    return content;
  }

  return (
    <div>
      {content}
    </div>
  );
};

export default Goods;
