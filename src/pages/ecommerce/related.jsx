import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from 'react-router-dom';
import { useGetProductsQuery } from "@/store/api/shop/shopApiSlice";
import { updateSearchFilter, updateCategoryFilter } from "@/store/api/shop/action";
import ProductBox from "@/components/partials/ecommerce/product-box";
import ProductList from "@/components/partials/ecommerce/fetchList";
import Alert from "@/components/ui/Alert";
import LoaderCircle from "@/components/Loader-circle";

const Ecommerce = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [view, setView] = useState("list"); // Default view set to list
  const [randomProducts, setRandomProducts] = useState([]);

  const { data: getProduct, isLoading, isError } = useGetProductsQuery();
  const products = getProduct?.products || [];

  // Extracts the active track from the URL
  const getActiveTrackFromPath = () => {
    const pathSegments = location.pathname.split('/');
    const track = pathSegments[1]; // Assuming the URL structure is domain.com/track/number
    return track || 'defaultTrack';
  };

  // Shuffles the array and returns 3 random elements
  const getRandomProducts = (array) => {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray.slice(0, 3); // Return only the first 3 elements
  };

  useEffect(() => {
    const activeTrack = getActiveTrackFromPath();
    const filteredProducts = products.filter(product => product.track === activeTrack);
    setRandomProducts(getRandomProducts(filteredProducts));
  }, [location, products]); // Dependency on location and products ensures refresh on URL or products change

  if (isLoading) return <LoaderCircle />;
  if (isError) return <Alert> Something is mismatch...</Alert>;

  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="lg:col-span-12 col-span-12">
        {view === "list" && (
          <div className="space-y-3 grid-cols-1 gap-5 h-max">
            {randomProducts.length > 0 ? (
              randomProducts.map((item, i) => (
                <div key={`list_key_${i}`}>
                  <ProductList item={item} />
                </div>
              ))
            ) : (
              <Alert className="bg-red-500/40 text-white py-2">
                There are no products.
              </Alert>
            )}
          </div>
        )}
        {/* Implement grid view if needed */}
      </div>
    </div>
  );
};

export default Ecommerce;
