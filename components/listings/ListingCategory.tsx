"use client";

import { IconType } from "react-icons";

interface Props {
  icon: IconType;
  label: string;
  description: string;
}

export default function ListingCategory({
  icon: Icon,
  label,
  description,
}: Props) {
  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex items-center gap-4">
        <Icon
          size={40}
          className="text-neutral-600 dark:text-muted-foreground"
        />
        <div className="flex flex-col">
          <div className="text-lg font-semibold">{label}</div>
          <div className="text-neutral-500 dark:text-muted-foreground font-light">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
}
