"use client";

import Calendar from "@/components/Calendar";
import { Button } from "@/components/ui/button";
import { Range } from "react-date-range";

interface Props {
  price: number;
  totalPrice: number;
  dateRange: Range;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}

export default function ListingReservation({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
}: Props) {
  return (
    <div className="rounded-xl border border-neutral-200 dark:border-muted-foreground overflow-hidden">
      <div className="flex items-center gap-1 p-4">
        <div className="text-2xl font-semibold">$ {price}</div>
        <div className="font-light text-neutral-600 dark:text-muted-foreground -mb-1">
          /night
        </div>
      </div>

      <hr />

      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />

      <hr />

      <div className="p-4">
        <Button
          className="w-full font-bold"
          disabled={disabled}
          variant="default"
          onClick={onSubmit}
        >
          Reserve
        </Button>
      </div>

      <div className="p-4 flex items-center justify-between font-semibold text-lg">
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  );
}
