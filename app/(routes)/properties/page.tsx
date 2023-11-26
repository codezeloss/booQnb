import getCurrentUser from "@/app/actions/getCurrentUser";
import EmptyState from "@/components/EmptyState";
import Container from "@/components/Container";
import getListings from "@/app/actions/getListings";
import PropertiesClient from "@/components/properties/PropertiesClient";

export default async function PropertiesPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser)
    return <EmptyState title="Unautorized" subtitle="Please login" />;

  const listings = await getListings({ userId: currentUser.id });
  if (listings.length === 0)
    return (
      <EmptyState
        title="No properties found"
        subtitle="Looks like you have no properties"
      />
    );

  return (
    <main>
      <Container>
        <PropertiesClient listings={listings} currentUser={currentUser} />
      </Container>
    </main>
  );
}
