import { Reservation } from "@/components/account/reservations/Reservation";

export interface ReservationData {
  id: number;
  user_id: number;
  people: number;
  date: string;
  message: string | null;
  pending: number;
  accepted: number;
  created_at: string;
  updated_at: string;
}

export default function ReservationsList() {
  // demo reservations json
  const reservations: ReservationData[] = [
    {
      id: 1,
      user_id: 2,
      people: 2,
      date: "2024-04-15 18:00",
      message: null,
      pending: 0,
      accepted: 0,
      created_at: "2024-04-15T20:52:12.000000Z",
      updated_at: "2024-04-15T20:52:12.000000Z",
    },
    {
      id: 2,
      user_id: 2,
      people: 4,
      date: "2024-04-16 19:00",
      message: "We are celebrating a birthday!",
      pending: 1,
      accepted: 0,
      created_at: "2024-04-15T20:52:12.000000Z",
      updated_at: "2024-04-15T20:52:12.000000Z",
    },
    {
      id: 3,
      user_id: 2,
      people: 3,
      date: "2024-04-16 19:00",
      message: "",
      pending: 0,
      accepted: 1,
      created_at: "2024-04-15T20:52:12.000000Z",
      updated_at: "2024-04-15T20:52:12.000000Z",
    },
  ];

  return (
    <div>
      {reservations.map((reservation) => (
        <Reservation key={reservation.id} reservation={reservation} />
      ))}
    </div>
  );
}