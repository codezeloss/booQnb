"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";

export default function ProfileMenu() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Image
          src=""
          alt=""
          className="rounded-full border cursor-pointer"
          width={40}
          height={40}
        />
      </PopoverTrigger>

      <PopoverContent className="w-60 mr-3 sm:mr-4 md:mr-10 xl:mr-20">
        <div className="grid gap-4"></div>
      </PopoverContent>
    </Popover>
  );
}
