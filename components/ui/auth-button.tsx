"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Props {
  icon: string;
  title: string;
  onClickHandler: () => void;
}

export default function AuthButton({ icon, title, onClickHandler }: Props) {
  return (
    <Button
      type="button"
      className="w-full text-center shadow-0 flex items-center dark:bg-white/10 gap-x-2 hover:border-2 hover:border-black dark:hover:border-white"
      size="default"
      variant="outline"
      onClick={onClickHandler}
    >
      <Image src={icon} alt={title} width={20} height={20} />
      <p>{title}</p>
    </Button>
  );
}
