"use client";

import { Button } from "@/components/ui/button";
import ProfileMenu from "@/components/navbar/ProfileMenu";
import { SignInFormModal } from "@/components/modals/SignInFormModal";
import { useDispatch, useSelector } from "react-redux";
import {
  onClickLoginClose,
  onClickLoginOpen,
  onClickRegisterClose,
  onClickRegisterOpen,
} from "@/redux/modalSlice";
import { SignUpFormModal } from "@/components/modals/SignUpFormModal";
import { SafeUser } from "@/types/SafeUser";
import { useRouter } from "next/navigation";

interface Props {
  currentUser?: SafeUser | null;
}

export default function UserMenu({ currentUser }: Props) {
  const dispatch = useDispatch();
  const router = useRouter();

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
        {currentUser ? (
          <div className="flex items-center gap-x-2">
            <Button
              className="w-fit hidden md:flex"
              variant="ghost"
              size="sm"
              onClick={() => router.push("/add-listing")}
              type="button"
            >
              BooQnb my Home
            </Button>
            <ProfileMenu user={currentUser} />
          </div>
        ) : (
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
        )}
      </div>
    </>
  );
}
