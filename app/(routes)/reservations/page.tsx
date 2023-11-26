import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import EmptyState from "@/components/EmptyState";
import Container from "@/components/Container";
import ReservationClient from "@/components/reservations/ReservationClient";

export default async function Page() {
  const currentUser = await getCurrentUser();
  if (!currentUser)
    return <EmptyState title="Unauthorized" subtitle="Please login" />;

  const reservations = await getReservations({ authorId: currentUser.id });
  if (reservations.length === 0)
    return (
      <EmptyState
        title="No reservations found"
        subtitle="Looks like you have no reservations on your properties"
      />
    );

  return (
    <main>
      <Container>
        <ReservationClient
          reservations={reservations}
          currentUser={currentUser}
        />
      </Container>
    </main>
  );
}
