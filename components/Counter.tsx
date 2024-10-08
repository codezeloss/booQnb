"use client";

import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";

interface Props {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

export default function Counter({ title, subtitle, value, onChange }: Props) {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value === 1) return;

    onChange(value - 1);
  }, [value, onChange]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <p className="font-semibold">{title}</p>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>

      <div className="flex items-center gap-4">
        <Button
          size="icon"
          variant="ghost"
          className="w-8 h-8 rounded-full border border-muted-foreground dark:border-muted-foreground flex items-center justify-center text-muted-foreground dark:text-muted-foreground hover:opacity-80 transition"
          onClick={onReduce}
          type="button"
        >
          <MinusIcon size={18} />
        </Button>
        <div className="text-lg text-muted-foreground dark:text-muted-foreground">
          {value}
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="w-8 h-8 rounded-full border border-muted-foreground dark:border-muted-foreground flex items-center justify-center text-muted-foreground dark:text-muted-foreground hover:opacity-80 transition"
          onClick={onAdd}
          type="button"
        >
          <PlusIcon size={18} />
        </Button>
      </div>
    </div>
  );
}
