import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { bookingSchema } from "../../../lib/validation";
import { GAMES } from "../../../lib/games";
import { appendBooking, getBookingRows } from "../../../lib/sheets";
import { allowRequest } from "../../../lib/rate-limit";

export const runtime = "nodejs";

function getClientKey(req: NextRequest) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

export async function POST(req: NextRequest) {
  try {
    if (!allowRequest(`booking:${getClientKey(req)}`, 10, 60_000)) {
      return NextResponse.json({error: "Too many requests. Please try again later."}, {status: 429});
    }

    const body = await req.json();
    const parsed = bookingSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({error: "Please check the booking details."}, {status: 400});

    const data = parsed.data;
    const game = GAMES.find(g => g.id === data.gameId);
    if (!game) return NextResponse.json({error: "Invalid game selected."}, {status: 400});

    const requestedDateTime = new Date(`${data.date}T${data.time}:00`);
    if (Number.isNaN(requestedDateTime.getTime()) || requestedDateTime.getTime() < Date.now() - 60_000) {
      return NextResponse.json({error: "Please choose a future date and time."}, {status: 400});
    }

    // Basic duplicate-slot protection. For high-volume production use, add a real database
    // with a unique constraint/transaction; Google Sheets is intentionally the staff ledger.
    const rows = await getBookingRows();
    const duplicate = rows.slice(1).some(r => r[3] === data.date && r[4] === data.time && r[5] === data.gameId && r[9] !== "CANCELLED");
    if (duplicate) {
      return NextResponse.json({error: "That game slot already has a booking request. Please choose another time."}, {status: 409});
    }

    const bookingId = `GZ-${randomUUID().slice(0, 8).toUpperCase()}`;
    const total = game.price * data.players;
    const createdAt = new Date().toISOString();

    await appendBooking([
      bookingId,
      createdAt,
      data.name,
      data.email,
      data.phone,
      data.date,
      data.time,
      data.gameId,
      game.name,
      String(data.players),
      String(total),
      "PENDING"
    ]);

    return NextResponse.json({ok: true, bookingId});
  } catch (error) {
    console.error("booking_error", error instanceof Error ? error.message : "unknown");
    return NextResponse.json({error: "Unable to create the booking right now."}, {status: 500});
  }
}