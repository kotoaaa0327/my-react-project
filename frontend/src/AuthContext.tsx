import React, { useContext, useState, useEffect, createContext } from "react";

import {
  //認証済みユーザーの情報を表すオブジェクト。ユーザーのUID,メールアドレス,表示名などの情報が含まれる。
  User,
  //ユーザーの認証状態（ログイン・ログアウト・トークン更新）が変化したときに、自動で呼ばれ、現在のユーザー情報を取得する
  onAuthStateChanged,
  //メールアドレスとパスワードを使用して、新しいユーザーアカウントを作成し、同時にサインインさせる
  createUserWithEmailAndPassword,
  //メールアドレスとパスワードを使用して、既存のユーザーをサインインさせる。
  signInWithEmailAndPassword,
  //現在のユーザーをログアウトさせる。
  signOut,
  //指定したメールアドレスにパスワードリセット用のメールを送信
  sendPasswordResetEmail,
  //パスワードリセットやメール確認などの認証アクションメールに含めるアクション設定（リダイレクトURLなど）のオプションを指定するための型。
  ActionCodeSettings,
  //現在サインインしているユーザーのメールアドレスに確認メールを送信。
  sendEmailVerification as sendVerificationEmail,
  //Firebase Authentication のユーザー情報(displayNameやphotoURL)を更新
  updateProfile,
} from "firebase/auth";

//ドキュメントの場所指定・データを書き込む、Firestore からデータを1件読み取る
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebase";

//Contextを作成(認証データ(または初期状態のnull)を、コンポーネント間で渡すためのパイプ)
const AuthContext = createContext<AuthContextType | null>(null);

export interface AuthContextType {
  //currentUser: 現在サインインしているユーザーオブジェクト
  //User:サインイン中のユーザー/null: (ログアウト状態)/アプリの初期ロード時の状態
  currentUser: User | null | undefined;
  //Firestoreから取得したプロフィールデータ
  userProfile: any | null;
  //login・signupが成功した場合に、サインインしたUserオブジェクトなどの情報を返す
  login: (email: string, password: string) => Promise<any>;
  signup: (
    email: string,
    password: string,
    name: string,
    birthDate: string
  ) => Promise<any>;
  logout: () => Promise<void>;
  loading: boolean;
  resetPassword: (email: string) => Promise<void>;
  //この関数が呼び出される→コンテキストプロバイダの実装内部でcurrentUserの値を取得する→取得したcurrentUserでFirebaseの実際のメール送信関数を実行
  sendEmailVerification: () => Promise<void>;
}

//useAuthフックの定義
//useAuth を作るときに AuthContext が null のままだとエラーになるのを防ぐ
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

//Providerコンポーネントを定義(ログイン状態やプロフィールをまとめて管理するための箱)
export function AuthProvider({ children }: { children: React.ReactNode }) {
  //今ログインしてるユーザーの情報
  const [currentUser, setCurrentUser] = useState<User | null | undefined>();
  //Firestore に保存されているユーザーのプロフィール情報
  const [userProfile, setUserProfile] = useState<any | null>(null);
  //Firebaseの認証状態をチェック中かどうか
  const [loading, setLoading] = useState(true);

  async function signup(
    email: string,
    password: string,
    name: string,
    birthDate: string
  ) {
      //新規登録
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Firebase Authentication に名前を登録
      await updateProfile(user, { displayName: name });

      // Firestore にユーザーデータを保存
      await setDoc(doc(db, "users", user.uid), {
        name,
        birthDate,
        email,
        createdAt: serverTimestamp(),
      });

      setCurrentUser(user);
      setUserProfile({ name, birthDate, email });
      return user;
  }

  //ログイン
  async function login(email: string, password: string) {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Firestore からプロフィールを取得
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        setUserProfile(userDoc.data());
      } else {
        setUserProfile(null);
      }

      setCurrentUser(user);
      return user;
  }

  //パスワードリセットの認証アクションメールにリダイレクトURLを含める
  // email引数に指定されたメールアドレスにパスワードリセットメールを送信
  async function resetPassword(email: string) {
    const actionCodeSettings: ActionCodeSettings = {
      url: "https://sszxu.csb.app/",
    };
    await sendPasswordResetEmail(auth, email, actionCodeSettings);
  }

  async function sendEmailVerification() {
    //ユーザーがログイン中でなかったら処理を即座に停止しこのエラーメッセージをアプリの呼び出し元に伝える
    if (!currentUser)
      throw new Error("User not signed in for email verification.");
    //現在ログインしているユーザーのメールアドレスが本物であることを確認するためのメール送信。
    const actionCodeSettings: ActionCodeSettings = {
      url: "https://sszxu.csb.app/dashboard",
    };

    await sendVerificationEmail(currentUser, actionCodeSettings);
  }

  //Firebaseの認証状態を監視
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          setCurrentUser(user);
          // Firestoreからプロフィールを取得
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setUserProfile(userDoc.data());
          } else {
            setUserProfile(null);
          }
        } else {
          setCurrentUser(null);
          setUserProfile(null);
        }
      } catch (error) {
        console.error("認証状態またはプロフィールロード中にエラー:", error);
        setCurrentUser(null);
        setUserProfile(null);
      }
      
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  //ログアウト
  async function logout() {
    setUserProfile(null);
    await signOut(auth);
  }

  const value: AuthContextType = {
    currentUser,
    userProfile,
    signup,
    login,
    logout,
    loading,
    resetPassword,
    sendEmailVerification,
  };

  //アプリ全体に値を渡す
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
