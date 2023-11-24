import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.error();

    const body = await req.json();
    const {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      location,
      price,
    } = body;

    Object.keys(body).forEach((value: any) => {
      if (!body[value]) {
        NextResponse.error();
      }
    });

    const listing = await prismadb.listing.create({
      data: {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        locationValue: location,
        price: parseInt(price, 10),
        userId: currentUser.id,
      },
    });

    return NextResponse.json(listing);
  } catch (e) {
    console.log("[LISTINGS_POST]", e);
    return NextResponse.json("Internal error, cannot create listing!");
  }
}
