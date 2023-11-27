import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import EmptyState from "@/components/EmptyState";
import Container from "@/components/Container";
import TripsClient from "@/components/trips/TripsClient";
import ClientOnly from "@/components/ClientOnly";

export default async function TripsPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser)
    return (
      <ClientOnly>
        <EmptyState title="Unautorized" subtitle="Please login" />
      </ClientOnly>
    );

  const reservations = await getReservations({ userId: currentUser.id });
  if (reservations.length === 0)
    return (
      <ClientOnly>
        <EmptyState
          title="No trips found"
          subtitle="Looks like you havent reserved any trips"
        />
      </ClientOnly>
    );

  return (
    <ClientOnly>
      <main>
        <Container>
          <TripsClient reservations={reservations} currentUser={currentUser} />
        </Container>
      </main>
    </ClientOnly>
  );
}
