import prismadb from "@/lib/prismadb";

export default async function getListings() {
  try {
    const listings = await prismadb.listing.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return listings;
  } catch (e: any) {
    throw new Error(e);
  }
}
