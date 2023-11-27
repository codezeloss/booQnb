import EmptyState from "@/components/EmptyState";
import Container from "@/components/Container";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ListingClient from "@/components/listings/ListingClient";
import getListingById from "@/app/actions/getListingById";
import getReservations from "@/app/actions/getReservations";
import ClientOnly from "@/components/ClientOnly";

interface Props {
  listingId?: string;
}

export default async function SingleListingPage({ params }: { params: Props }) {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!listing)
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );

  return (
    <ClientOnly>
      <main>
        <Container>
          <div>
            <ListingClient
              listing={listing}
              reservations={reservations}
              currentUser={currentUser}
            />
          </div>
        </Container>
      </main>
    </ClientOnly>
  );
}
