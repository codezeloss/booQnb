"use client";

import Container from "@/components/Container";
import Logo from "@/components/Navbar/Logo";
import Search from "@/components/Navbar/Search";
import { ModeToggle } from "@/components/ModeToggle";
import UserMenu from "@/components/Navbar/UserMenu";

export default function Navbar() {
  return (
    <div className="fixed w-full z-10 shadow-sm">
      <div className="py-4 border-b">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />

            <div className="flex gap-x-4 items-center">
              <UserMenu />
              <ModeToggle />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
