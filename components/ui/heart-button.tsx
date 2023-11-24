import { SafeUser } from "@/types/SafeUser";
import { HeartIcon } from "lucide-react";

interface Props {
  listingId: string;
  currentUser?: SafeUser | null | undefined;
}

export default function HeartButton({ listingId, currentUser }: Props) {
  const hasFavorited = false;
  const toggleFavorite = () => {};

  return (
    <div
      className="relative hover:opacity-80 transition cursor-pointer"
      onClick={toggleFavorite}
    >
      <HeartIcon
        className={`${
          hasFavorited ? "fill-rose-500 text-rose-500" : "fill-neutral-500/70"
        } absolute -top-[2px] -right-[2px]`}
        size={24}
      />
    </div>
  );
}
