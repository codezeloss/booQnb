import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import getListings, { IListingsParams } from "@/app/actions/getListings";
import ListingCard from "@/components/listings/ListingCard";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { SafeListing } from "@/types/SafeUser";

interface Props {
  searchParams: IListingsParams;
}

export default async function Home({ searchParams }: Props) {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return <EmptyState showReset />;
  }

  return (
    <main className="">
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {listings &&
            listings.map((listing: SafeListing, index) => {
              return (
                <ListingCard
                  key={index}
                  data={listing}
                  currentUser={currentUser}
                />
              );
            })}
        </div>
      </Container>
    </main>
  );
}
