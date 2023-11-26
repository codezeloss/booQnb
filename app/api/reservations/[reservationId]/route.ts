import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

interface IParams {
  reservationId?: string;
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.error();
    }

    const { reservationId } = params;

    if (!reservationId) throw new Error("Invalid ID");

    const reservation = await prismadb.reservation.deleteMany({
      where: {
        id: reservationId,
        OR: [
          { userId: currentUser.id },
          { listing: { userId: currentUser.id } },
        ],
      },
    });

    return NextResponse.json(reservation);
  } catch (e) {
    console.log("[RESERVATION_DELETE]", e);
    return NextResponse.json("Internal error, cannot delete the reservation!");
  }
}
