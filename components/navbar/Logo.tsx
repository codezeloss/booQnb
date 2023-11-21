"use client";

import { useRouter } from "next/navigation";
import { BuildingIcon } from "lucide-react";

export default function Logo() {
  const router = useRouter();

  return (
    <div
      className="hidden md:block cursor-pointer"
      onClick={() => router.push("/")}
    >
      <div className="flex items-center gap-2 text-black dark:text-white">
        <BuildingIcon size={30} />
        <p className="font-extrabold text-2xl hidden lg:flex">BooQnb</p>
      </div>
    </div>
  );
}
