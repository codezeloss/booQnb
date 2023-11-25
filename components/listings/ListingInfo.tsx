"use client";

import { IconType } from "react-icons";
import { SafeUser } from "@/types/SafeUser";
import useCountries from "@/hooks/useCountries";
import Avatar from "@/components/Avatar";
import ListingCategory from "@/components/listings/ListingCategory";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
});

interface Props {
  user: SafeUser | null | undefined;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
}

export default function ListingInfo({
  user,
  category,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  locationValue,
}: Props) {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="flex flex-col col-span-4 gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex row items-center gap-2">
          <p className="">Hosted by {user?.name}</p>
          <Avatar src={user?.image} />
        </div>

        <div className="flex items-center gap-4 font-light text-neutral-500 dark:text-muted-foreground">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500 dark:text-muted-foreground">
        {description}
      </div>
      <hr />
      <Map center={coordinates} />
    </div>
  );
}
