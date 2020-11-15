import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useDebounce from "../utils/hooks/useDebounce";
import useFetchImage from "../utils/hooks/useFetchImage";
import useScroll from "../utils/hooks/useScroll";
import Image from "./image";
import Loading from "./Loading";

import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";

export default function Images() {

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(null);
  const [images, setImages, errors, isLoading] = useFetchImage(
    page,
    searchTerm
  );

  function handleRemove(index) {
    setImages([
      ...images.slice(0, index),
      ...images.slice(index + 1, images.length),
    ]);
  }

  const [showPreview, setShowPreview] = useState(false);

  const debounce = useDebounce();
  function handleInput(e) {
    const text = e.target.value;
    debounce(() => setSearchTerm(text));
  }


  return (
    <section>
      <div className="my-5">
        <input
          type="text"
          onChange={handleInput}
          className="w-full border rounded shadow p-2"
          placeholder="Search Photos Here"
        />
      </div>
      {errors.length > 0 && (
        <div className="flex h-screen">
          <p className="m-auto">{errors[0]}</p>
        </div>
      )}


      <AnimateSharedLayout type={'switch'}>
        <InfiniteScroll
          dataLength={images.length}
          next={() => setPage(page + 1)}
          hasMore={true}
          className="flex flex-wrap"
        >
          {images.map((img, index) => (
            <motion.div
              className="w-1/3 p-1 border flex justify-center"
              key={index}
              layoutId={img.urls.regular}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Image
                show={() => setShowPreview(img.urls.regular)}
                image={img.urls.regular}
                handleRemove={handleRemove}
                index={index}
              />
            </motion.div>
          ))}
        </InfiniteScroll>

        <AnimatePresence>
          {showPreview && (
            <motion.section
              layoutId={showPreview}
              exit={{ opacity: 0, rotate: 360, transition: { duration: 1 } }}
              className="fixed w-full h-full flex justify-center items-center top-0 left-0 z-40"
              onClick={() => setShowPreview(false)}
            >
              <motion.div className="bg-white">
                <motion.img
                  src={showPreview}
                  className="rounded-lg"
                  width="00"
                  height="auto"
                />
              </motion.div>
            </motion.section>
          )}
        </AnimatePresence>
      </AnimateSharedLayout>
      {isLoading && <Loading />}
    </section>
  );
}
