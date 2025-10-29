import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import TopPage from "./components/TopPage";
import GoodsDtl from "./components/GoodsDtl";
import TicketDtl from "./components/TicketDtl";
import FanClubDtl from "./components/FanClubDtl";
import MyPage from "./components/MyPage";
import MyPageEdit from "./components/MyPageEdit";
import RequestDtl from "./components/RequestDtl";
import "./index.css";

const AppContent: React.FC = () => {
  const location = useLocation();

  const isDetailPage =
    location.pathname.includes("/detail") ||
    location.pathname.includes("/MyPage");

  return (
    <div className="main-bg w-full">
      {!isDetailPage && <Header />}
      <Routes>
        <Route path="/" element={<TopPage />} />

        <Route path="/ticket/detail" element={<TicketDtl />} />

        <Route path="/goods/detail" element={<GoodsDtl />} />

        <Route path="/fanclub/detail" element={<FanClubDtl />} />

        <Route path="/mypage" element={<MyPage />} />

        <Route path="/mypageedit" element={<MyPageEdit />} />

        <Route path="/request/detail" element={<RequestDtl />} />
      </Routes>
      
      {!isDetailPage && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
