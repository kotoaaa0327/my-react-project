
//TopPage コンサートチケット

import { Link } from "react-router-dom";

type TicketProps = {
  isLinkOnly?: boolean;
};

const Ticket : React.FC = ({ isLinkOnly = false }: TicketProps) => {
  const content = (
    <div className="text-center ">
      <h2 className="section-title"> TICKET </h2>
      <div className="section-layout">
        <div className="section-inner">
          <p>
            【受付期間】
            <br />
            2025/12/1(月) 10:00 ～ 2026/1/1(木) 18:00
            <br />
          </p>
        </div>
      <Link
        to="/ticket/detail"
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

export default Ticket;