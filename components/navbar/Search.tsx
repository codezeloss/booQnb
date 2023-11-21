"use client";

import { SearchIcon } from "lucide-react";

export default function Search() {
  return (
    <div className="border w-full md:w-auto py-2 rounded-md shadow-sm transition cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold px-6 hover:font-bold">
          Anywhere
        </div>
        <div className="hidden sm:block text-sm font-semibold px-6 border-x flex-1 text-center hover:font-bold">
          Any Week
        </div>
        <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
          <div className="hidden sm:block hover:font-bold">Add Guests</div>
          <div className="p-2 bg-black dark:bg-white dark:text-black text-white rounded-full">
            <SearchIcon size={16} />
          </div>
        </div>
      </div>
    </div>
  );
}
