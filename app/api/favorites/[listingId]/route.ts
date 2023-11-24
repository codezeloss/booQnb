import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";

// !! POST
export async function POST(
  req: Request,
  { params }: { params: { listingId: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.error();

    const { listingId } = params;
    if (!listingId) {
      throw new Error("Null or Invalid ListingID");
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])];
    favoriteIds.push(listingId);

    const user = await prismadb.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favoriteIds,
      },
    });

    return NextResponse.json(user);
  } catch (e) {
    console.log("[FAVORITES_POST]", e);
    return NextResponse.json("Internal error, cannot add favorite!");
  }
}

// !! DELETE
export async function DELETE(
  req: Request,
  { params }: { params: { listingId: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.error();

    const { listingId } = params;
    if (!listingId) {
      throw new Error("Null or Invalid ListingID");
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])];
    favoriteIds = favoriteIds.filter((id) => id !== listingId);

    const user = await prismadb.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favoriteIds,
      },
    });

    return NextResponse.json(user);
  } catch (e) {
    console.log("[FAVORITES_DELETE]", e);
    return NextResponse.json("Internal error, cannot delete favorite!");
  }
}
