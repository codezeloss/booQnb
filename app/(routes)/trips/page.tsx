import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import EmptyState from "@/components/EmptyState";
import Container from "@/components/Container";
import TripsClient from "@/components/trips/TripsClient";

export default async function TripsPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser)
    return <EmptyState title="Unautorized" subtitle="Please login" />;

  const reservations = await getReservations({ userId: currentUser.id });
  if (reservations.length === 0)
    return (
      <EmptyState
        title="No trips found"
        subtitle="Looks like you havent reserved any trips"
      />
    );

  return (
    <main>
      <Container>
        <TripsClient reservations={reservations} currentUser={currentUser} />
      </Container>
    </main>
  );
}
