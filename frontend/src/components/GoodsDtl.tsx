//グッズ詳細

import { useNavigate } from "react-router-dom";

const GoodsDtl : React.FC= () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <div className="relative">
      <img
        src="/images/StormGoods.png"
        alt="StormGoods"
        className="w-full h-auto"
      />
      <h2 className="precautions "> 【注意事項】 </h2>
      <div className="py-4">
        <dl>
          <dd className="goods-detail">
            ◼「Storm Goods Shop MARKET」にて公演グッズを販売中です。
            <br />
            ◼ 発送までにお時間をいただきますが、追加生産にて対応させていただきます。
            <br />
            ◼ お一人様あたり1商品2点までの購入とさせていただきます。
            <br />
            ◼ご注文後のキャンセルは承っておりません。
            <br />
            ◼ 利用可能な決済手段は、クレジットカード（デビットカード・プリペイドカード）/ PayPay / Paidy /コンビニ支払い のみとなります。
            </dd>
        </dl>
      </div>
      <div className="text-center">
      <button
        onClick={handleBackClick}
        className="back-button"
      >
        戻る
      </button>
      </div>
    </div>
  );
};
export default GoodsDtl;
