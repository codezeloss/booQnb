"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { ImagePlus } from "lucide-react";
import { useCallback } from "react";

declare global {
  var cloudinary: any;
}

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function ImageUpload({ value, onChange }: Props) {
  // ** Handle image uploading
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <>
      <CldUploadWidget
        onUpload={handleUpload}
        uploadPreset="bqktyr06"
        options={{
          maxFiles: 1,
        }}
      >
        {({ open }) => {
          function handleOnClick() {
            open();
          }
          return (
            <div
              className="relative w-full cursor-pointer transition hover:opacity-70 border-dashed border-2 p-20 border-neutral-300 flex justify-center gap-4"
              onClick={handleOnClick}
            >
              <div className="w-fit flex items-center gap-x-2">
                <ImagePlus size={18} />
                Upload an Image
              </div>

              {value && (
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={value}
                    alt="Upload image"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              )}
            </div>
          );
        }}
      </CldUploadWidget>
    </>
  );
}
