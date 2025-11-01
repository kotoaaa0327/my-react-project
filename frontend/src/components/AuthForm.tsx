//ログインフォーム

import { useState, FormEvent } from "react";
//ログイン・サインアップなどの処理をまとめたカスタムフック
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

//LoginFormにonLoginSuccess関数を渡し、ログイン成功時にその関数を呼び出して、親コンポーネントに成功したことを知らせる。
interface LoginFormProps {
  onLoginSuccess: () => void;
}

//
export default function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  //ログイン処理が実行中かどうか（通信中かどうか）管理(loading→true ログイン処理中　loading→false 処理完了)
  const [loading, setLoading] = useState(false);
  //login()を呼び出す
  const { login } = useAuth();
  const { signup } = useAuth();
  const navigate = useNavigate();

  //ログイン
  //フォーム送信時にhandleSubmitが呼ばれる
  async function handleSubmit(event: FormEvent) {
    //送信した瞬間にページがリロードするのを防ぐ
    event.preventDefault();
    //新たなログイン試行を始める前に、画面上の古いエラー表示をリセットするため、以前のログイン試行で表示されていたエラーメッセージを一旦消去。
    setError("");
    //ログイン処理中
    setLoading(true);

    //成功するかもしれない処理
    try {
      await login(email, password);
      console.log("login成功、MyPageへ移動します");
      //onLoginSuccess() を呼んで親にログイン成功と通知
      onLoginSuccess();

      // navigate("/MyPage");
      //エラーが起きたときだけ実行される
    } catch (event) {
      setError(
        "ログインに失敗しました。メールアドレスまたはパスワードを確認してください。"
      );
      //成功・失敗どちらの場合でも必ず実行される。falseで処理完了に変える
    } finally {
      setLoading(false);
    }
  }

  //新規登録モーダルを開く処理
  async function handleSignup(event: FormEvent) {
    event.preventDefault();
    setError("");

    //signup_modalを取得
    const modalElement = document.getElementById("signup_modal");
    (document.getElementById("signup_modal") as HTMLDialogElement)!.showModal();
  }

  // 最終的な新規登録処理
  async function handleFinalSignup() {
    setLoading(true);

    try {
      //アカウントを作成
      await signup(email, password, name, birthDate);
      console.log("LOGIN SUCCESS: Calling onLoginSuccess()");

      //onLoginSuccess() を呼んで親にログイン成功と通知
      onLoginSuccess();

      // 登録成功後のリダイレクト処理
    } catch (event) {
      // 認証失敗時
      setError(
        "新規登録に失敗しました。パスワードは6文字以上、メールアドレスの形式を確認してください。"
      );
      //成功・失敗どちらの場合でも必ず実行される。falseで処理完了に変える
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
    {/* 新規登録フォーム */}
      <dialog id="signup_modal" className="modal">
        <div className="modal-box text-left flex flex-col items-center">
          <h3 className="font-bold text-xl text-center">新規登録</h3>

          {/* モーダル内のエラー表示 */}
          {error && <p className="text-red-500">{error}</p>}

          <div className="w-full max-w-md">
          {/* 名前入力フィールド */}
          <div className="mt-4">
            <label className="label font-bold w-full text-left">
              名前 :
              <input
                type="text"
                className="input ml-2 border-b border-gray-400 w-full"
                placeholder="山田太郎"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </label>
          </div>

          {/* 年齢入力フィールド */}
          <div className="mt-4">
            <label className="label font-bold w-full text-left">
              生年月日 :
              <div className="flex items-center ml-2 h-10">
                <input
                  type="text"
                  className="w-20 text-center border-b border-gray-400"
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
                  className="w-12 text-center border-b border-gray-400"
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
                  className="w-12 text-center border-b border-gray-400"
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

          {/* メールアドレス入力フィールド */}
          <div className="mt-4">
            <label className="label font-bold w-full text-left">
              メールアドレス :
              <input
                type="email"
                className="input ml-2 border-b border-gray-400 w-full"
                placeholder="メールアドレス"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>
          </div>

          {/* パスワード入力フィールド */}
          <div className="mt-5">
            <label className="label font-bold w-full text-left">
              パスワード :
              <input
                type="password"
                className="input ml-2 border-b border-gray-400 w-full"
                placeholder="パスワード"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </label>
          </div>
          </div>
        

          {/* 新規登録完了ボタン */}
          <div className="text-center mt-6 md:px-8 lg:px-20  ">
            <button
              className="btn px-5 py-1 mt-5 border-2 border-gray-400  rounded-full hover:bg-[#FFABCE] transition "
              onClick={handleFinalSignup}
              //連打防止
              disabled={loading}
            >
              {loading ? "登録処理中..." : "登録を完了する"}
            </button>

            {/* 閉じる */}
            <form method="dialog" className="">
              <button
                className="btn px-5 py-1 mt-5 border-2 border-gray-400 rounded-full hover:bg-[#A4C6FF] transition"
                onClick={() => {
                  setError("");
                }}
                disabled={loading}
              >
                閉じる
              </button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop"></form>
      </dialog>

      {/* ログイン入力フォーム */}
      <div className="mt-10">
        <div className="hero-content ">
          <div className="login-form card bg-base-100 shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={handleSubmit}>
              {/* メインフォームのエラー表示 */}
              {error && <p style={{ color: "red" }}>{error}</p>}

              {/* メールアドレス入力フォーム */}
              <div className="form-control">
                <label className="label font-bold md:text-lg">
                  メールアドレス :
                  <input
                    type="email"
                    className="input ml-2"
                    placeholder="メールアドレス"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </label>
              </div>

               {/* パスワード入力フォーム */}
              <div className="form-control mt-5">
                <label className="label font-bold md:text-lg">
                  パスワード :
                  <input
                    type="password"
                    className="input ml-2"
                    placeholder="パスワード"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                </label>
              </div>

              <div className="flex mt-6 md:px-8 lg:px-20  justify-between">
                {/* ログインボタン */}
                <div className="form-control ">
                  <button
                    type="submit"
                    disabled={loading}
                    className="login-btn"
                  >
                    {loading ? "ログイン中..." : "ログイン"}
                  </button>
                </div>

                {/* 新規登録ボタン*/}
                <div className="form-control ">
                  <button
                    type="button"
                    onClick={handleSignup}
                    disabled={loading}
                    className="new-member-btn"
                  >
                    新規会員登録
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};