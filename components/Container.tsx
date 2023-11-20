"use client";

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Container({ children }: Props) {
  return (
    <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-10 xl:px-20">
      {children}
    </div>
  );
}
