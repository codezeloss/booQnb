"use client";

import { useRouter } from "next/navigation";
import { Building2Icon } from "lucide-react";

export default function Logo() {
  const router = useRouter();

  return (
    <div className="cursor-pointer" onClick={() => router.push("/")}>
      <div className="flex items-center gap-2 text-black dark:text-white">
        <Building2Icon size={30} />
        <p className="font-extrabold text-2xl hidden lg:flex">BooQnb</p>
      </div>
    </div>
  );
}
