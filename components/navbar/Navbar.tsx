"use client";

import Container from "@/components/Container";
import Logo from "@/components/navbar/Logo";
import Search from "@/components/navbar/Search";
import { ModeToggle } from "@/components/ModeToggle";
import UserMenu from "@/components/navbar/UserMenu";
import { SafeUser } from "@/types/SafeUser";
import Categories from "@/components/navbar/Categories";

interface Props {
  currentUser?: SafeUser | null;
}

export default function Navbar({ currentUser }: Props) {
  return (
    <header className="fixed w-full z-10 shadow-sm bg-white dark:bg-background">
      <div className="py-4 border-b">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />

            <div className="flex gap-x-4 items-center">
              <UserMenu currentUser={currentUser} />
              <ModeToggle />
            </div>
          </div>
        </Container>
      </div>

      <Categories />
    </header>
  );
}
