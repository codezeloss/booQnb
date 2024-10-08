"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/types/SafeUser";
import { useRouter } from "next/navigation";

interface Props {
  user?: SafeUser | null;
}

export default function ProfileMenu({ user }: Props) {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image
          src={user?.image || "/images/placeholder.jpg"}
          alt=""
          className="rounded-full border-2 dark:border-white border-black cursor-pointer"
          width={40}
          height={40}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-52 space-y-2">
        <DropdownMenuLabel className="font-extrabold">
          {user ? user.name : "My Account"}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("/trips")}>
          My trips
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/favorites")}>
          My favorites
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/reservations")}>
          My reservations
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/properties")}>
          My properties
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            className="w-full"
            variant="default"
            onClick={() => router.push("/add-listing")}
            type="button"
          >
            BooQnb my Home
          </Button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button
            variant="destructive"
            className="w-full flex items-center gap-x-2"
            onClick={() => signOut()}
            type="button"
          >
            <LogOutIcon size={18} />
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
