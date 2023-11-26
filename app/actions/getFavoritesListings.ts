import prismadb from "@/lib/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export default async function getFavoritesListings() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) return [];

    const favorites = await prismadb.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    });

    const safeFavorites = favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toISOString(),
    }));

    return safeFavorites;
  } catch (e: any) {
    throw new Error(e);
  }
}
