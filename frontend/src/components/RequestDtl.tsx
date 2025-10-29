import { useState } from "react";
import { doc, setDoc, serverTimestamp, FieldValue } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { requestSong } from "../types/requestSong";
import { useLocation } from "react-router-dom";

type RequestData = Omit<requestSong, "id" | "createdAt"> & {
  LikeCount: number;
  createdAt: FieldValue;
};

const RequestFormDtl: React.FC = () => {
  const { currentUser, userProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // フォームの状態管理
  const [songTitle, setSongTitle] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleBackClick = () => {
    navigate(-1);
  };

  //ユーザーがログインしているか確認
  if (!currentUser || !userProfile) {
    return (
      <div className="flex flex-col items-center   min-h-[100vh]">
        <p className="request-login ">リクエストにはログインが必要です。</p>
        <button
          className="move-login-page "
          onClick={() =>
            navigate("/fanclub/detail", { state: { from: location.pathname } })
          }
        >
          ログインページへ移動
        </button>
        <div className="text-center">
          <button onClick={handleBackClick} className="back-button">
            戻る
          </button>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center  min-h-[100vh] ">
        <div className="text-center font-bold">
          <h2 className="mt-60 text-lg md:text-2xl lg:text-3xl">
            リクエストが完了しました
          </h2>
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

  // ユーザー情報の準備
  const displayName = userProfile.name || currentUser.displayName || "未設定";

  //ログイン
  const handleSubmitRequest = async (event: React.FormEvent) => {
    event.preventDefault();
    //新たなログイン試行を始める前に、画面上の古いエラー表示をリセットするため、以前のログイン試行で表示されていたエラーメッセージを一旦消去。
    setError(null);
    setSuccess(false);

    if (!songTitle.trim() || !reason.trim()) {
      setError("曲名と選曲理由を両方入力してください。");
      return;
    }

    setLoading(true);

    try {
      const userRequestDoc = doc(db, "requests", currentUser.uid);
      const requestData: RequestData = {
        songTitle: songTitle.trim(),
        reason: reason.trim(),
        requesterUid: currentUser.uid,
        requesterDisplayName: displayName,
        LikeCount: 0,
        createdAt: serverTimestamp(),
      };

      await setDoc(userRequestDoc, requestData as Record<string, any>);
      setIsSubmitted(true);
      setSuccess(true);
      setSongTitle("");
      setReason("");
    } catch (error) {
      console.error("楽曲リクエストの送信に失敗しました:", error);
      setError(
        "ログインに失敗しました。メールアドレスまたはパスワードを確認してください。"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:pt-16 min-h-[100vh] ">
      <h1 className="font-bold text-center text-3xl md:text-4xl">
        楽曲リクエスト
      </h1>
      {/* モーダル内のエラー表示 */}
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-blue-500">{error}</p>}

      <form
        onSubmit={handleSubmitRequest}
        className="flex flex-col px-3 md:px-20"
      >
        <h2 className="request-detail">
          2026年にラストツアーが行われます！
          <br></br>
          そこで最後にStormに歌って欲しい楽曲とリクエストした理由をご記入ください！
        </h2>

        {/* 曲名入力 */}
        <label htmlFor="songTitle" className="mt-10 mb-3">
          【曲名】
        </label>
        <input
          type="text"
          value={songTitle}
          id="songTitle"
          onChange={(event) => setSongTitle(event.target.value)}
          disabled={loading}
          required
          className="py-4 px-2"
        />
        {/* 選挙区理由入力 */}
        <label htmlFor="reason" className="mt-5 mb-3">
          【選曲理由】
        </label>
        <textarea
          value={reason}
          id="reason"
          onChange={(event) => setReason(event.target.value)}
          disabled={loading}
          rows={5}
          required
          className="py-2 px-2"
        />
        {/* 送信ボタン */}
        <button
          type="submit"
          className="mx-20 md:mx-48 lg:mx-96  py-2 my-11 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition text-center"
        >
          {loading ? "送信中..." : "リクエストを送信"}
        </button>

        {/* 戻るボタン */}
        <div className="text-center">
          <button onClick={handleBackClick} className="back-button">
            戻る
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequestFormDtl;
