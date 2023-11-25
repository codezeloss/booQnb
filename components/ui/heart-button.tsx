import { SafeUser } from "@/types/SafeUser";
import { HeartIcon } from "lucide-react";
import useFavorite from "@/hooks/useFavorite";

interface Props {
  listingId: string;
  currentUser?: SafeUser | null | undefined;
}

export default function HeartButton({ listingId, currentUser }: Props) {
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  });

  return (
    <button
      type="button"
      className="relative hover:opacity-80 transition cursor-pointer"
      onClick={toggleFavorite}
    >
      <HeartIcon
        className={`${
          hasFavorited ? "fill-rose-500 text-rose-500" : "text-white"
        } absolute -top-[2px] -right-[2px]`}
        size={24}
      />
    </button>
  );
}
