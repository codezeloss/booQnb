"use client";

import { Button } from "@/components/ui/button";
import Avatar from "@/components/Avatar";
import { MenuIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import ProfileMenu from "@/components/Navbar/ProfileMenu";
import { SignInFormModal } from "@/components/SignInFormModal";
import { useDispatch, useSelector } from "react-redux";
import {
  onClickLoginClose,
  onClickLoginOpen,
  onClickRegisterClose,
  onClickRegisterOpen,
} from "@/redux/modalSlice";
import { SignUpFormModal } from "@/components/SignUpFormModal";

export default function UserMenu() {
  const dispatch = useDispatch();

  // ** RTK - Modal
  const { isLoginModalOpen, isRegisterModalOpen } = useSelector(
    (state: any) => state.modal
  );

  return (
    <>
      <SignInFormModal
        isOpen={isLoginModalOpen}
        onClose={() => dispatch(onClickLoginClose())}
      />

      <SignUpFormModal
        isOpen={isRegisterModalOpen}
        onClose={() => dispatch(onClickRegisterClose())}
      />

      <div className="flex items-center gap-x-4">
        <div className="flex items-center gap-x-2">
          <Button
            variant="secondary"
            size="default"
            onClick={() => dispatch(onClickLoginOpen())}
          >
            Sign In
          </Button>
          <Button
            variant="default"
            size="default"
            onClick={() => dispatch(onClickRegisterOpen())}
          >
            Sign up
          </Button>
        </div>

        {false && (
          <div>
            <ProfileMenu />
          </div>
        )}
      </div>
    </>
  );
}
