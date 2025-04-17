"use client";

import Image from "next/image";
import { ChangeEvent, useRef, useState, useTransition } from "react";
import { convertBlobUrlToFile } from "../lib/utlis";
import { uploadImage } from "../auth/storage/client";

const UploadImage = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      //   console.log("files:", filesArray);
      const newImageUrls = filesArray.map((file) => URL.createObjectURL(file));
      console.log("urls of image", imageUrls, newImageUrls);

      setImageUrls([...imageUrls, ...newImageUrls]);
    }
  };

  const [isPending, startTransition] = useTransition();

  const handleUpload = () => {
    startTransition(async () => {
      const urls = [];
      for (const url of imageUrls) {
        const imageFile = await convertBlobUrlToFile(url);

        const { imageUrl, error } = await uploadImage({
          file: imageFile,
          bucket: "users",
        });

        if (error) {
          console.error(error);
          return;
        }

        urls.push(imageUrl);
      }

      //   console.log("urls:", urls);
      setImageUrls([]);
    });
  };

  return (
    <>
      <div className="flex flex-col items-center gap-3 text-white">
        <input
          type="file"
          multiple
          ref={imageInputRef}
          onChange={handleImageChange}
          hidden
        />

        <button
          className="bg-slate-400 p-2 w-40 rounded cursor-pointer"
          onClick={() => imageInputRef.current?.click()}
          disabled={isPending}
        >
          Select Images
        </button>

        {/* <Image
          src="https://uzwdlxtnesdbocomgkwb.supabase.co/storage/v1/object/public/users//3bd0707b-693a-4d34-b005-0e6171a09b11.png"
          width={180}
          height={180}
          alt={`image-$`}
          className="rounded-md object-contain"
        /> */}

        {imageUrls.length > 0 && (
          <div className="w-[500px] h-full p-2 flex gap-4 rounded-md overflow-x-scroll">
            {imageUrls.map((url, idx) => (
              <Image
                src={url}
                key={idx}
                width={180}
                height={180}
                alt={`image-${idx}`}
                className="rounded-md object-contain"
              />
            ))}
          </div>
        )}

        <button
          onClick={handleUpload}
          className="bg-emerald-600 p-2 w-40 rounded cursor-pointer"
          disabled={isPending}
        >
          {isPending ? "Uploading" : "Upload"}
        </button>
      </div>
    </>
  );
};

export default UploadImage;
