"use client";

import { SafeListing, SafeReservation, SafeUser } from "@/types/SafeUser";
import { useRouter } from "next/navigation";
import useCountries from "@/hooks/useCountries";
import React, { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "@/components/ui/heart-button";
import { Button } from "@/components/ui/button";

interface Props {
  data: SafeListing;
  reservation?: SafeReservation;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser: SafeUser | null | undefined;
  onAction?: (id: string) => void;
}

export default function ListingCard({
  data,
  reservation,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
  onAction,
}: Props) {
  const router = useRouter();
  const { getByValue } = useCountries();

  // ** Get Location
  const location = getByValue(data.locationValue);

  // !! Handle Canceling
  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) return;

      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  // ** Price
  const price = useMemo(() => {
    if (reservation) return reservation.totalPrice;

    return data.price;
  }, [reservation, data.price]);

  // ** Format reservation
  const reservationData = useMemo(() => {
    if (!reservation) return null;

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div
      className="col-span-1 cursor-pointer group text-black dark:text-white"
      onClick={() => router.push(`/listings/${data.id}`)}
    >
      <div className="flex flex-col gap-1.5 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            className="object-cover w-full h-full group-hover:scale-110 transition"
            src={data.imageSrc}
            alt="Listed Home image"
            fill
          />
          <div className="absolute top-0.5 right-5">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="">
          <div className="font-bold text-lg">
            {location?.region}, {location?.label}
          </div>
          <div className="font-light text-sm text-neutral-500 dark:text-neutral-400">
            {reservationData || data.category}
          </div>
        </div>

        <div className="flex items-end gap-1">
          <div className="text-lg font-extrabold">$ {price}</div>
          {!reservation && (
            <div className="font-normal text-xs mb-1 text-neutral-500 dark:text-muted-foreground">
              / night
            </div>
          )}
        </div>

        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            size="default"
            variant="destructive"
            onClick={handleCancel}
          >
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
