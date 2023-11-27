import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import EmptyState from "@/components/EmptyState";
import Container from "@/components/Container";
import ReservationClient from "@/components/reservations/ReservationClient";
import ClientOnly from "@/components/ClientOnly";

export default async function Page() {
  const currentUser = await getCurrentUser();
  if (!currentUser)
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );

  const reservations = await getReservations({ authorId: currentUser.id });
  if (reservations.length === 0)
    return (
      <ClientOnly>
        <EmptyState
          title="No reservations found"
          subtitle="Looks like you have no reservations on your properties"
        />
      </ClientOnly>
    );

  return (
    <ClientOnly>
      {" "}
      <main>
        <Container>
          <ReservationClient
            reservations={reservations}
            currentUser={currentUser}
          />
        </Container>
      </main>
    </ClientOnly>
  );
}
