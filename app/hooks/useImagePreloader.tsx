import { useState, useEffect } from "react";

export const useImagePreloader = (imageList: string[]) => {
  const [imagesPreloaded, setImagesPreloaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const preloadImages = async () => {
      try {
        const promises = imageList.map((src) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = reject;
          });
        });

        await Promise.all(promises);
        if (isMounted) {
          setImagesPreloaded(true);
        }
      } catch (err) {
        console.error("Error preloading images:", err);
        if (isMounted) {
          setImagesPreloaded(false);
        }
      }
    };

    preloadImages();

    return () => {
      isMounted = false;
    };
  }, [imageList]);

  return { imagesPreloaded };
};
