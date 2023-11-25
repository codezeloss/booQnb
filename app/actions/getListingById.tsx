import prismadb from "@/lib/prismadb";

interface Props {
  listingId?: string;
}

export default async function getListingById(params: Props) {
  try {
    const { listingId } = params;

    const listing = await prismadb.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });

    if (!listing) return null;

    // !! Return safe listing
    return {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toISOString(),
        updatedAt: listing.user.updatedAt.toISOString(),
        emailVerified: listing.user.emailVerified?.toISOString(),
      },
    };
  } catch (e: any) {
    console.log(e);
    throw new Error(e);
  }
}
