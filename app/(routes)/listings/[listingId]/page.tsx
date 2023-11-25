import getListingById from "@/app/actions/getListingById";
import EmptyState from "@/components/EmptyState";
import Container from "@/components/Container";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ListingClient from "@/components/listings/ListingClient";

interface Props {
  listingId?: string;
}

export default async function SingleListingPage({ params }: { params: Props }) {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();

  if (!listing) return <EmptyState />;

  return (
    <main className="">
      <Container>
        <div className="">
          <ListingClient listing={listing} currentUser={currentUser} />
        </div>
      </Container>
    </main>
  );
}
