import { useAuth } from "../AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const MyPage: React.FC = () => {
  //currentUser にアクセス
  const { currentUser, userProfile, loading: authLoading ,logout} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackClick = () => {
    navigate("/");
  };

  if (authLoading) {
    return (
      <div>
        <p>マイページ情報を読み込み中...</p>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div>
        <div>
          <p>マイページ閲覧にはログインが必要です。</p>
          <button
            onClick={() =>
              navigate("/fanclub/detail", {
                state: { from: location.pathname },
              })
            }
          >
            ログインページへ移動
          </button>
        </div>
      </div>
    );
  }

  const birthDate: string = userProfile?.birthDate ?? "未登録";
  const displayName = userProfile?.name || currentUser.displayName || "未設定";

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/", { replace: true });
    } catch (error) {
      console.error("ログアウト中にエラーが発生しました:", error);
      alert("ログアウト処理に失敗しました。再度お試しください。");
    }
  };

  const handleEditClick = () => {
    navigate("/MyPageEdit");
  };

  return (
    <div className=" min-h-[100vh] mx-8 flex justify-center">
      <div className="px-4">
        <h1 className="mypage-title">
          マイページ<br></br>(登録内容変更)
        </h1>

        <div className="text-left">
          <div className=" mt-8 text-lg">
            <p className="mypage-item">【ファンクラブ名】</p>
            <p className="mypage-detail">Storm</p>
          </div>

          <div className=" mt-8 text-lg">
            <p className="mypage-item">【氏名】</p>
            <p className="mypage-detail">{displayName}</p>
          </div>

          <div className=" mt-8 text-lg">
            <p className="mypage-item">【生年月日】</p>
            <p className="mypage-detail">{birthDate}</p>
          </div>

          <div className=" mt-8 text-lg">
            <p className="mypage-item">【メール】</p>
            <p className="mypage-detail">{currentUser.email}</p>
          </div>

          <div className="flex justify-center mt-12">
            <button
              onClick={handleEditClick}
              className="px-6 py-2 border-2 border-gray-500 rounded-full hover:bg-[#A4C6FF] transition"
            >
              登録内容を変更する
            </button>
          </div>

          <div className="text-center mt-3 flex ">
            <div className="flex mr-3 ">
            <button
              onClick={handleLogout}
              className="back-button"
            >
              ログアウト
            </button>
            </div>

            <div className="flex">
            <button
            onClick={handleBackClick}
            className=" back-button "
          >
            戻る
          </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
