"use client";
import { ComponentHeroBannerType } from "@/types/component";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  images: ComponentHeroBannerType["imagesCollection"]["items"];
};

export default function HeroGallery({ images }: Props) {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <AnimatePresence>
      {images.map((image, index) =>
        index === currentImage ? (
          <motion.div
            key={image.url}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className='absolute top-0 left-0 w-full h-full bg-white dark:bg-white'
          >
            <Image
              src={image.url}
              alt={image.title || image.description}
              fill
              className='object-center object-cover h-full w-full'
              unoptimized
            />
          </motion.div>
        ) : null
      )}
    </AnimatePresence>
  );
}
