"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="w-full h-full flex items-center justify-center text-center py-8">
      <div className="flex flex-col items-center justify-center space-y-4">
        <h1 className="font-bold text-4xl">Oooppss!!</h1>
        <h2 className="font-bold text-xl">Something went wrong</h2>

        <Image
          className=""
          src="/public/error-illustration.svg"
          alt="Error illustration"
          width={600}
          height={600}
        />

        <Button variant="default" size="lg" onClick={() => reset()}>
          Try again
        </Button>
      </div>
    </div>
  );
}
