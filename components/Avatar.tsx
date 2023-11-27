"use client";

import Image from "next/image";

interface Props {
  src: string | null | undefined;
}

export default function Avatar({ src }: Props) {
  return (
    <>
      <Image
        src={src ? src : "/images/placeholder.jpg"}
        alt="User Avatar"
        className="rounded-full border cursor-pointer"
        width={35}
        height={35}
      />
    </>
  );
}
