"use client";

import { Reservation } from "@prisma/client";
import { SafeListing, SafeUser } from "@/types/SafeUser";
import { useCallback, useEffect, useMemo, useState } from "react";
import { categories } from "@/components/navbar/Categories";
import ListingHead from "@/components/listings/ListingHead";
import ListingInfo from "@/components/listings/ListingInfo";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { onClickLoginOpen } from "@/redux/modalSlice";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import ListingReservation from "@/components/listings/ListingReservation";

interface Props {
  reservations?: Reservation[];
  listing: SafeListing & {
    user: SafeUser | null | undefined;
  };
  currentUser?: SafeUser | null | undefined;
}

// !!
const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

export default function ListingClient({
  listing,
  reservations = [],
  currentUser,
}: Props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { toast } = useToast();

  // ** Disable Date
  const disableDate = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState(initialDateRange);

  // ** Reservation creation
  const onCreateReservation = useCallback(() => {
    if (!currentUser) dispatch(onClickLoginOpen());

    setIsLoading(true);

    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast({
          description: "Listing reserved successfully!",
        });
        setDateRange(initialDateRange);
        router.refresh();
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Cannot reserve. Please try again!",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentUser, dateRange, dispatch, listing?.id, toast, totalPrice]);

  // ** Notice everytime we do a change in the calendar
  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.startDate,
        dateRange.endDate
      );

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  // ** Category
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="flex flex-col gap-y-6">
        <ListingHead
          id={listing.id}
          title={listing.title}
          imageSrc={listing.imageSrc}
          locationValue={listing.locationValue}
          currentUser={currentUser}
        />

        <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
          <ListingInfo
            user={listing.user}
            category={category}
            description={listing.description}
            roomCount={listing.roomCount}
            guestCount={listing.guestCount}
            bathroomCount={listing.bathroomCount}
            locationValue={listing.locationValue}
          />
          <div className="order-first mb-10 md:order-last md:col-span-3">
            <ListingReservation
              price={listing.price}
              totalPrice={totalPrice}
              onChange={(value) => setDateRange(value)}
              dateRange={dateRange}
              onSubmit={onCreateReservation}
              disabled={isLoading}
              disabledDates={disableDate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
