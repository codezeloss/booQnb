"use client";

import { IconType } from "react-icons";
import { cn } from "@/lib/utils";

interface Props {
  icon: IconType;
  label: string;
  selected?: boolean;
  onClick: () => void;
}

export default function CategoryInput({
  icon: Icon,
  label,
  selected,
  onClick,
}: Props) {
  return (
    <div
      className={cn(
        "rounded-md border-2 p-4 flex flex-col gap-3 hover:border-black hover:dark:border-white transition cursor-pointer",
        selected && "border-4 border-black dark:border-white"
      )}
      onClick={onClick}
    >
      <Icon size={30} />
      <p>{label}</p>
    </div>
  );
}
