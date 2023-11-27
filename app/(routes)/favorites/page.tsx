import getCurrentUser from "@/app/actions/getCurrentUser";
import getFavoritesListings from "@/app/actions/getFavoritesListings";
import EmptyState from "@/components/EmptyState";
import Container from "@/components/Container";
import FavoritesClient from "@/components/favorites/FavoritesClient";
import ClientOnly from "@/components/ClientOnly";

export default async function FavoritesPage() {
  const currentUser = await getCurrentUser();
  const listings = await getFavoritesListings();

  if (listings.length === 0)
    return (
      <ClientOnly>
        <EmptyState
          title="No favorites found"
          subtitle="Looks like you have no favorite listings."
        />
      </ClientOnly>
    );

  return (
    <ClientOnly>
      <main>
        <Container>
          <FavoritesClient listings={listings} currentUser={currentUser} />
        </Container>
      </main>
    </ClientOnly>
  );
}
