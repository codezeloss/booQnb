"use client";

import Container from "@/components/Container";
import Logo from "@/components/navbar/Logo";
import Search from "@/components/navbar/Search";
import { ModeToggle } from "@/components/ModeToggle";
import UserMenu from "@/components/navbar/UserMenu";
import { SafeUser } from "@/types/SafeUser";
import Categories from "@/components/navbar/Categories";
import { onClickRentModalOpen } from "@/redux/modalSlice";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";

interface Props {
  currentUser?: SafeUser | null;
}

export default function Navbar({ currentUser }: Props) {
  const dispatch = useDispatch();

  return (
    <header className="fixed w-full z-10 shadow-sm">
      <div className="py-4 border-b">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />

            <div className="flex gap-x-4 items-center">
              <Button
                className="w-fit hidden md:flex"
                variant="ghost"
                size="sm"
                onClick={() => dispatch(onClickRentModalOpen())}
              >
                BooQnb my Home
              </Button>
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
