//ファンクラブログイン画面
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoginForm from "./AuthForm";
import { useAuth } from "../AuthContext";

const FanClubDtl: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { currentUser, logout, userProfile, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && currentUser) {
      navigate("/MyPage", {replace:true});
    }
  },[currentUser,authLoading,navigate]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/", { replace: true });
    } catch (error) {
      console.error("ログアウト中にエラーが発生しました:", error);
      alert("ログアウト処理に失敗しました。再度お試しください。");
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center">
        <p className="text-xl">情報を読み込み中...</p>
      </div>
    );
  }

  if (currentUser) {
    return null;
  }



  const handleLoginSuccess = () => {
    console.log("ログイン成功。MyPageへのリダイレクトを開始します。");
  };

  return (
    <div className="min-h-[100vh] pt-20 md:pt-32 lg:pt-40 flex flex-col items-center">
      <div className="text-center w-full max-w-sm">
        <h1 className="fanclub-title">FAN CLUB</h1>
        <div>
          <p className="md:text-xl lg:text-2xl">ファンクラブ ログインはこちら</p>
          <LoginForm onLoginSuccess={handleLoginSuccess} />
        </div>

        <button
          onClick={handleBackClick}
          className="back-button mt-10"
        >
          戻る
        </button>
      </div>
    </div>
  );
};
export default FanClubDtl;
