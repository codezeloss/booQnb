"use client";

import React, { useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  actionLabel?: string;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

export default function Modal({
  title,
  description,
  isOpen,
  onClose,
  children,
  actionLabel,
  secondaryAction,
  secondaryActionLabel,
}: ModalProps) {
  const onChange = (open: boolean) => {
    if (!open) onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
}
