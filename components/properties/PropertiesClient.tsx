"use client";

import { SafeListing, SafeUser } from "@/types/SafeUser";
import Heading from "@/components/ui/heading";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import ListingCard from "@/components/listings/ListingCard";

interface Props {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

export default function PropertiesClient({ listings, currentUser }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [deletingId, setDeletingId] = useState("");

  // ** Handle Cancel
  const onCancel = useCallback((id: string) => {
    setDeletingId(id);

    axios
      .delete(`/api/listings/${id}`)
      .then(() => {
        toast({
          description: "Properties deleted successfully",
        });
        router.refresh();
      })
      .catch((e) => {
        toast({
          variant: "destructive",
          title: "Oups! Something went wrong!!",
          description: "Please try again",
        });
      })
      .finally(() => {
        setDeletingId("");
      });
  }, []);

  return (
    <div>
      <Heading title="Properties" subtitle="List of your properties" />

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing, index) => (
          <ListingCard
            key={index}
            data={listing}
            currentUser={currentUser}
            actionId={listing.id}
            onAction={onCancel}
            disabled={deletingId === listing.id}
            actionLabel="Delete Property"
          />
        ))}
      </div>
    </div>
  );
}
