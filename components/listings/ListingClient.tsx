"use client";

import { SafeListing, SafeReservation, SafeUser } from "@/types/SafeUser";
import { Range } from "react-date-range";
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
  currentUser?: SafeUser | null;
  listing: SafeListing & {
    user: any;
  };
  reservations?: SafeReservation[];
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

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  // ** Disable Date
  const disabledDate = useMemo(() => {
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

  // ** Category
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

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
          description: "Reserved successfully!",
        });
        setDateRange(initialDateRange);
        router.push("/trips");
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
  }, [
    currentUser,
    dateRange.endDate,
    dateRange.startDate,
    dispatch,
    listing?.id,
    router,
    toast,
    totalPrice,
  ]);

  // ** Notice everytime we do a change in the calendar
  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

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
              onChangeDate={(value) => setDateRange(value)}
              dateRange={dateRange}
              onSubmit={onCreateReservation}
              disabled={isLoading}
              disabledDates={disabledDate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
