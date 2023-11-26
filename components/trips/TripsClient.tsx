"use client";

import { SafeReservation, SafeUser } from "@/types/SafeUser";
import Heading from "@/components/ui/heading";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import ListingCard from "@/components/listings/ListingCard";

interface Props {
  reservations: SafeReservation[];
  currentUser?: SafeUser | null;
}

export default function TripsClient({ reservations, currentUser }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [deletingId, setDeletingId] = useState("");

  // ** Handle Cancel
  const onCancel = useCallback((id: string) => {
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
  }, []);

  return (
    <div>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />

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
            actionLabel="Cancel Reservation"
          />
        ))}
      </div>
    </div>
  );
}
