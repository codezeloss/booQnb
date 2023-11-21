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
import { User } from "@prisma/client";
import { SafeUser } from "@/types/SafeUser";

interface Props {
  user?: SafeUser | null;
}

export default function ProfileMenu({ user }: Props) {
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
        <DropdownMenuItem>My trips</DropdownMenuItem>
        <DropdownMenuItem>My favorites</DropdownMenuItem>
        <DropdownMenuItem>My reservations</DropdownMenuItem>
        <DropdownMenuItem>My properties</DropdownMenuItem>
        <DropdownMenuItem>
          <Button className="w-full" variant="secondary">
            BooQnb my Home
          </Button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button
            variant="destructive"
            className="w-full flex items-center gap-x-2"
            onClick={() => signOut()}
          >
            <LogOutIcon size={18} />
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
