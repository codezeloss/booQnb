"use client";

import { SafeReservation, SafeUser } from "@/types/SafeUser";
import { useRouter } from "next/navigation";
import Heading from "@/components/ui/heading";
import { useCallback, useState } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import ListingCard from "@/components/listings/ListingCard";

interface Props {
  reservations: SafeReservation[];
  currentUser?: SafeUser | null;
}

export default function ReservationClient({
  reservations,
  currentUser,
}: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [deletingId, setDeletingId] = useState("");

  // ** Cancel handler
  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast({
            description: "Reservation cancelled successfully",
          });
          router.refresh();
        })
        .catch((e) => {
          toast({
            variant: "destructive",
            title: "Oups! Something went wrong!!",
            description: "Please try again",
          });
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router, toast]
  );

  return (
    <div>
      <Heading title="Reservations" subtitle="Bookings on your properties" />

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation, index) => (
          <ListingCard
            key={index}
            data={reservation.listing}
            currentUser={currentUser}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel guest reservation"
          />
        ))}
      </div>
    </div>
  );
}
