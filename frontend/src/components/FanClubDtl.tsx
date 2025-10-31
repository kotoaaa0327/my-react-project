//ファンクラブログイン画面
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoginForm from "./AuthForm";
import { useAuth } from "../AuthContext";


const FanClubDtl: React.FC = () => {
  //ページ遷移
  const navigate = useNavigate();
  //現在表示しているページのURL情報を取得
  const location = useLocation();
//Firebase認証でサインインしているユーザー情報,
//ログアウトする関数
// Firestoreから取得したプロフィールデータ
// 読み込み中かどうかの状態 を取り出す
  const { currentUser, logout, userProfile, loading: authLoading } = useAuth();


  useEffect(() => {
    //ユーザー情報の読み込みが終わった&サインイン済みのユーザーがいたら
    if (!authLoading && currentUser) {
      //マイページに遷移(その時ログイン後に戻るボタンでこのログイン画面に戻らない)
      navigate("/MyPage", {replace:true});
    }
  },[currentUser,authLoading,navigate]);

  const handleBackClick = () => {
    navigate(-1);
  };

  //ユーザー情報の読み込み中
  if (authLoading) {
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center">
        <p className="text-xl">情報を読み込み中...</p>
      </div>
    );
  }
  //サインイン済みのユーザーがいる場合何も表示しない
  //実際はuseEffectでマイページに自動遷移してる
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
