//チケット予約データ
export interface ReservationData {
    concertIndex : number | null;
    ticketType: "premium" | "general" | null;
    ticketCount: number;
    name: string;
    mail: string;
};