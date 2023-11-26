"use client";

import { SafeListing, SafeUser } from "@/types/SafeUser";
import Heading from "@/components/ui/heading";
import ListingCard from "@/components/listings/ListingCard";

interface Props {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

export default function FavoritesClient({ listings, currentUser }: Props) {
  return (
    <div>
      <Heading title="Favorites" subtitle="List of places you have favorited" />

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing, index) => (
          <ListingCard key={index} data={listing} currentUser={currentUser} />
        ))}
      </div>
    </div>
  );
}
