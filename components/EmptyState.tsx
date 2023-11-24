"use client";

import { useRouter } from "next/navigation";
import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";

interface Props {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

export default function EmptyState({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters",
  showReset = false,
}) {
  const router = useRouter();

  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading center title={title} subtitle={subtitle} />

      <div className="mt-2">
        {showReset && (
          <Button variant="default" onClick={() => router.push("/")}>
            Remove all filters
          </Button>
        )}
      </div>
    </div>
  );
}
