"use client";

import { SearchIcon } from "lucide-react";
import SearchModal from "@/components/modals/SearchModal";
import {
  onClickSearchModalClose,
  onClickSearchModalOpen,
} from "@/redux/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import useCountries from "@/hooks/useCountries";
import { useMemo } from "react";
import { differenceInDays } from "date-fns";

export default function Search() {
  const dispatch = useDispatch();
  const params = useSearchParams();
  const { getByValue } = useCountries();

  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");

  // ** Dynamic labels
  const locationLabel = useMemo(() => {
    if (locationValue) return getByValue(locationValue as string)?.label;
    return "Anywhere";
  }, [getByValue, locationValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff} Days`;
    }
    return "Anywhere";
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) return `${guestCount} Guests`;
    return "Add Guests";
  }, [guestCount]);

  // ** RTK - Modal
  const { isSearchModalOpen } = useSelector((state: any) => state.modal);

  return (
    <>
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => dispatch(onClickSearchModalClose())}
      />

      <div
        className="border w-full md:w-auto py-2 rounded-md shadow-sm transition cursor-pointer"
        onClick={() => dispatch(onClickSearchModalOpen())}
      >
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold px-6 hover:font-bold">
            {locationLabel}
          </div>
          <div className="hidden sm:block text-sm font-semibold px-6 border-x flex-1 text-center hover:font-bold">
            {durationLabel}
          </div>
          <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
            <div className="hidden sm:block hover:font-bold">{guestLabel}</div>
            <div className="p-2 bg-black dark:bg-white dark:text-black text-white rounded-full">
              <SearchIcon size={16} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
