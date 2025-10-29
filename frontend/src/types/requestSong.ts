//楽曲リクエストデータ
import { Timestamp, FieldValue } from "firebase/firestore";

export interface requestSong {
    id: string;
    songTitle: string;
    reason: string;
    requesterUid: string;
    requesterDisplayName: string;
    createdAt: Timestamp | FieldValue;
};