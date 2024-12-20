import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import GovGrid from "./GovGrid";
import GridLoading from "@/components/skeleton/Grid";
import TableLoading from "@/components/skeleton/Table";
import { ToastContainer } from "react-toastify";

const GovPostPage = () => {
  const [filler, setFiller] = useState("grid");
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleItems, setVisibleItems] = useState(12); // Initial visible items count

  const { gov1 } = useSelector((state) => state.gov1);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight &&
        visibleItems < gov1?.length
      ) {
        setVisibleItems((prevVisible) => prevVisible + 12); // Load 12 more items
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [gov1?.length, visibleItems]);

  useEffect(() => {
    setIsLoaded(true);
    setTimeout(() => {
      setIsLoaded(false);
    }, 1500);
  }, [filler]);

  const displayedItems = gov1?.slice(0, visibleItems) || []; // Items to display

  return (
    <div className="mb-10">
      <ToastContainer />
      {isLoaded && filler === "grid" && <GridLoading count={displayedItems?.length} />}
      {isLoaded && filler === "list" && <TableLoading count={displayedItems?.length} />}
      {!isLoaded && (
        <div
          className={`grid ${
            filler === "grid"
              ? "xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5"
              : ""
          }`}
        >
          {displayedItems.length > 0 ? (
            displayedItems.map((project, index) => (
              <GovGrid gov1={project} key={index} />
            ))
          ) : (
            <p>No projects found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default GovPostPage;
