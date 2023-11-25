"use client";

import { SafeUser } from "@/types/SafeUser";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import React, { useCallback, useMemo } from "react";
import { onClickLoginOpen } from "@/redux/modalSlice";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

interface Props {
  listingId: string;
  currentUser?: SafeUser | null | undefined;
}

const useFavorite = ({ listingId, currentUser }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { toast } = useToast();

  // ** Already favorited
  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  // ** Toggle Favorite
  const toggleFavorite = useCallback(
    async (e: { stopPropagation: () => void }) => {
      e.stopPropagation();
      if (!currentUser) dispatch(onClickLoginOpen());

      try {
        let request;

        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
        }

        await request();
        router.refresh();
        toast({
          description: "Success",
        });
      } catch (e) {
        console.log(e);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Please try again!",
        });
      }
    },
    [currentUser, dispatch, hasFavorited, router, toast, listingId]
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
