//component内の実装問題を警告
import { StrictMode } from "react";
//Reactのcomponentをブラウザに表示する
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
//アプリ全体でログイン情報共有
import {AuthProvider} from "./AuthContext"

const root = document.getElementById("root")!;

createRoot(root).render(
  <StrictMode>
    <AuthProvider>
    <App />
    </AuthProvider>
  </StrictMode>
);
