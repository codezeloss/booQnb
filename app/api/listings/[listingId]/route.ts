import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";

interface IParams {
  listingId?: string;
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.error();

    const { listingId } = params;
    if (!listingId) throw new Error("Invalid Id");

    const listing = await prismadb.listing.deleteMany({
      where: {
        id: listingId,
        userId: currentUser.id,
      },
    });

    return NextResponse.json(listing);
  } catch (e) {
    console.log("[LISTINGS_DELETE]", e);
    return NextResponse.json("Internal error, cannot delete listing!");
  }
}
