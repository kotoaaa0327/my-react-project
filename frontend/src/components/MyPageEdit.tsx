import { useAuth } from "../AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

const MyPageEdit: React.FC = () => {
  const { currentUser, userProfile } = useAuth();
  const [birthDate, setBirthDate] = useState(userProfile?.birthDate || "");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(
    userProfile?.name || currentUser?.displayName || ""
  );

  //マイページ更新処理
  const handleUpdateProfile = async () => {
    //サインインしていない場合は何もしない
    if (!currentUser) return;
    setLoading(true);
    try {
      //Firestoreの"users"コレクションから自分のユーザー情報のドキュメントを取得
      const userRef = doc(db, "users", currentUser.uid);
      //Firestore上のドキュメントを新しい生年月日と名前に更新
      await updateDoc(userRef, { birthDate, name });
      alert("生年月日を更新しました");
      navigate("/MyPage");
    } catch (error) {
      console.error("更新エラー", error);
    }
  };

  //mypageに戻るボタン
  const handleBackClick = async () => {
    navigate("/MyPage");
  };

  return (
    <div className="min-h-[100vh] mx-10">
      <div className="  ">
        <h1 className="update-title">登録内容変更</h1>

        {/* 名前変更フィールド */}
        <div className="text-center mt-4">
          <label className="label font-bold text-black">
            名前 :
            <input
              type="text"
              className="input ml-2 border-b border-gray-400"
              placeholder="山田太郎"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </label>
        </div>

        {/* 年齢変更フィールド */}
        <div className="text-center mt-10 md:mt-16">
          <label className="label font-bold text-black">
            生年月日 :
            <div className="flex items-center ml-2">
              <input
                type="text"
                className="w-20 h-8 text-center border-b border-gray-400"
                placeholder="YYYY"
                maxLength={4}
                //0文字目から4文字目の「手前」まで切り取る
                value={birthDate.slice(0, 4)}
                onChange={(event) => {
                  const val = event.target.value.replace(/\D/g, "");
                  setBirthDate(val + birthDate.slice(4));
                }}
              />

              <span className="mx-1"></span>
              <input
                type="text"
                className="w-12 h-8 text-center border-b border-gray-400"
                placeholder="MM"
                maxLength={2}
                //4文字目から6文字目の「手前」まで切り取る
                value={birthDate.slice(4, 6)}
                onChange={(event) => {
                  const val = event.target.value.replace(/\D/g, "");
                  setBirthDate(
                    birthDate.slice(0, 4) + val + birthDate.slice(6)
                  );
                }}
              />

              <span className="mx-1"></span>
              <input
                type="text"
                className="w-12 h-8 text-center border-b border-gray-400"
                placeholder="DD"
                maxLength={2}
                //4文字目から6文字目の「手前」まで切り取る
                value={birthDate.slice(6, 8)}
                onChange={(event) => {
                  const val = event.target.value.replace(/\D/g, "");
                  setBirthDate(birthDate.slice(0, 6) + val);
                }}
              />
            </div>
          </label>
        </div>

        {/* 変更完了ボタン */}
        <div className="modal-action justify-center ">
          <button
            className="update-button"
            onClick={handleUpdateProfile}
            disabled={loading}
          >
            {loading ? "登録処理中..." : "更新を完了する"}
          </button>
        </div>

        {/* 戻るボタン */}
        <div className="text-center mt-10">
        <button
          onClick={handleBackClick}
          className="back-button"
        >
          戻る
        </button>
        </div>
      </div>
    </div>
  );
};

export default MyPageEdit;
