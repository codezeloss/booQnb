"use client";

import { SafeUser } from "@/types/SafeUser";
import useCountries from "@/hooks/useCountries";
import Heading from "@/components/ui/heading";
import Image from "next/image";
import HeartButton from "@/components/ui/heart-button";

interface Props {
  id: string;
  title: string;
  imageSrc: string;
  locationValue: string;
  currentUser?: SafeUser | null | undefined;
}

export default function ListingHead({
  id,
  title,
  imageSrc,
  locationValue,
  currentUser,
}: Props) {
  const { getByValue } = useCountries();

  const location = getByValue(locationValue);

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className="relative w-full h-[60vh] overflow-hidden rounded-xl">
        <Image
          className="object-cover w-full"
          src={imageSrc}
          alt="Image"
          fill
        />
        <div className="absolute top-2 right-6">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
}
