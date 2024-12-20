import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from 'react-router-dom';
import Select from "react-select";
import clsx from "clsx";
import Icon from "@/components/ui/Icon";
import Profiles from "@/components/partials/ecommerce/profiles-box";
import ProductList from "@/components/partials/ecommerce/product-list";
import LoaderCircle from "@/components/Loader-circle";
import Alert from "@/components/ui/Alert";
import { selectOptions, selectCategory } from "@/constant/data";
import { useGetProductsQuery } from "@/store/api/shop/shopApiSlice";
import CheckIcon from "@/components/partials/ecommerce/checkIcon";

const Profile = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { data: getProduct, isLoading, isError } = useGetProductsQuery();
  const products = getProduct?.products || [];
  const [view, setView] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState(selectOptions[0]);
  const [selectedSort, setSelectedSort] = useState(selectCategory[0]);
  const [selectedStatuses, setSelectedStatuses] = useState({ Delivered: false, InProgress: false, Flagged: false });
  const [visibleProducts, setVisibleProducts] = useState(30); // State to manage the number of visible products

  const styles = {
    control: (provided, state) => ({ ...provided, backgroundColor: "transparent" }),
    option: (provided, state) => ({ ...provided, fontSize: "14px" }),
  };

  // Adjust useEffect for infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      // Calculate the distance from the bottom of the page
      const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;
      if (bottom) {
        setVisibleProducts(prevVisibleProducts => prevVisibleProducts + 15); // Load more products
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [selectedCategory, selectedSort, location.pathname, selectedStatuses, visibleProducts]);

  const filterAndSortProducts = useCallback(() => {
    let filteredProducts = [...products];

    // if (location.pathname !== '/all') {
    //   const trackMapping = {
    //     '/bigSpender': 'bigSpender',
    //     '/mediumSpender': 'mediumSpender',
    //     '/smallSpender': 'smallSpender',
    //     '/bigTipper': 'bigTipper',
    //     '/smallTipper': 'smallTipper',
    //     '/root': 'root',
    //     '/whitelistedCaller': 'whitelistedCaller',
    //     '/refCanceller': 'refCanceller',
    //     '/auctionAdmin': 'auctionAdmin',
    //     '/generalAdmin': 'generalAdmin',
    //     '/fellowshipAdmin': 'fellowshipAdmin',
    //     '/leaseAdmin': 'leaseAdmin',
    //     '/stakingAdmin': 'stakingAdmin',
    //     '/treasurer': 'treasurer',
    //   };
    //   const activeTrack = trackMapping[location.pathname] || 'defaultTrack';
    //   filteredProducts = filteredProducts.filter(product => product.track === activeTrack);
    // }

    if (selectedCategory.value !== "option1") {
      filteredProducts = filteredProducts.filter(product => selectedCategory.value === 'All' || product.category === selectedCategory.label);
    }

    const statusFilters = Object.entries(selectedStatuses).filter(([_, value]) => value).map(([key]) => key);
    if (statusFilters.length > 0) {
      filteredProducts = filteredProducts.filter(product => statusFilters.includes(product.status));
    }

    if (selectedSort.value !== "option1") {
      switch (selectedSort.value) {
        case "option2":
          filteredProducts.sort((a, b) => parseInt(a.refNum) - parseInt(b.refNum));
          break;
        case "option3":
          filteredProducts.sort((a, b) => parseInt(b.refNum) - parseInt(a.refNum));
          break;
        case "option4":
          filteredProducts.sort((a, b) => parseFloat(a.reqDot.replace(/,/g, '')) - parseFloat(b.reqDot.replace(/,/g, '')));
          break;
        case "option5":
          filteredProducts.sort((a, b) => parseFloat(b.reqDot.replace(/,/g, '')) - parseFloat(a.reqDot.replace(/,/g, '')));
          break;
        default:
          break;
      }
    }

    // Limit the displayed products
    return filteredProducts.slice(0, visibleProducts);
  }, [products, selectedCategory, selectedSort, location.pathname, selectedStatuses, visibleProducts]);

  const handleStatusChange = (status) => {
    setSelectedStatuses(prev => ({ ...prev, [status]: !prev[status] }));
  };

  const filteredProducts = filterAndSortProducts();

  if (isLoading) return <LoaderCircle />;
  if (isError) return <Alert> Something is mismatch...</Alert>;

  return (
    <div>
      <div className="grid grid-cols-12 gap-5">
        <div className="lg:col-span-12 col-span-12">
          <div>
            <div className="md:flex mb-6 md:space-y-0 space-y-4 px-3">
              <div className="flex-1 flex items-center space-x-3 rtl:space-x-reverse">
                {/* View Switch Buttons */}
                <button type="button" onClick={() => setView("grid")} className={clsx("border border-slate-700 text-slate-400  lg:inline-flex rounded h-12 w-12  items-center justify-center transition-all duration-200", { "border-kog-900 text-slate-200 shadow-[0px_0px_4px_2px_rgba(254,0,188,0.5)]": view === "grid" })}><Icon icon="heroicons:view-columns" className="w-7 h-7" /></button>
                <button onClick={() => setView("list")} className={clsx("border border-slate-700 text-slate-400 rounded h-12 w-12 inline-flex items-center justify-center transition-all duration-200", { " border-kog-900 text-slate-100 shadow-[0px_0px_4px_2px_rgba(254,0,188,0.5)]": view === "list" })}><Icon className="w-7 h-7" icon="heroicons:list-bullet" /></button>
                {/* Status Checkboxes */}

                {
                  location.pathname !== "/smallTipper" && location.pathname !== "/bigTipper" && location.pathname !== "/root" && location.pathname !== "/refCanceller" && location.pathname !== "/auctionAdmin" && location.pathname !== "/generalAdmin" && location.pathname !== "/fellowshipAdmin" && location.pathname !== "/leaseAdmin" && location.pathname !== "/stakingAdmin" && (
                    <div className="grid grid-cols-12 shadow-[inset_0px_0px_35px_rgba(0,0,0)] items-center divide-x  divide-kog-400 border rounded-full border-kog-500  bg-transparent">
                      {["Delivered", "In progress", "Flagged"].map((status) => (
                        <label key={status} className="flex flex-col justify-center items-center col-span-4 cursor-pointer">
                          <input type="checkbox" checked={selectedStatuses[status]} onChange={() => handleStatusChange(status)} className="sr-only" />
                          <div className={
                            `rounded-full p-1 my-1 mx-5 flex justify-center items-center w-10 h-10 text-2xl transition-all duration-100 cursor-pointer ${selectedStatuses[status] ?
                              (
                                status === "Delivered" ? "bg-green-600 hover:bg-green-700 shadow-[0px_0px_5px_5px_rgba(33,192,91,0.9)]" :
                                  status === "In progress" ? "bg-yellow-400 hover:bg-yellow-500 shadow-[0px_0px_5px_5px_rgba(229,175,8,0.9)] " :
                                    "bg-red-600 hover:bg-red-700 shadow-[0px_0px_5px_5px_rgba(237,67,67,0.9)]"
                              ) :
                              (
                                status === "Delivered" ? "bg-gradient-to-t from-kog-200 to-kog-400 hover:to-green-500 shadow-[0px_0px_10px_5px_rgba(0,0,0,0.5)]" :
                                  status === "In progress" ? "bg-gradient-to-t from-kog-200 to-kog-400 hover:to-yellow-500 shadow-[0px_0px_10px_5px_rgba(0,0,0,0.5)]" :
                                    "bg-gradient-to-t from-kog-200 to-kog-400 hover:to-red-500 shadow-[0px_0px_10px_5px_rgba(0,0,0,0.5)]"
                              )
                            }`
                          }>
                            <Icon className={
                              `text-white ${selectedStatuses[status] ? "text-3xl" : ""}`
                            } icon={
                              status === "Delivered" ? "mingcute:check-fill" :
                                status === "In progress" ? "mdi:hourglass" :
                                  "ph:flag"
                            } />
                          </div>
                        </label>
                      ))}
                    </div>
                  )
                }
                {/* Similar to the existing checkbox implementation */}
              </div>
              <div className="flex-none sm:flex items-center sm:space-x-4 sm:rtl:space-x-reverse sm:space-y-0 space-y-2">
                

                <div className="flex space-x-3 rtl:space-x-reverse items-center">
                  <label htmlFor="select" className="text-sm font-normal text-white">Category:</label>
                  <Select className="rounded text-sm font-normal  min-w-[140px] border border-kog-600 shadow-[0px_1px_10px_3px_rgba(254,0,188,0.2)]" classNamePrefix="select" value={selectedCategory} options={selectOptions} styles={styles} onChange={setSelectedCategory} />
                </div>
                <div className="flex space-x-3 rtl:space-x-reverse items-center">
                  <label htmlFor="select" className="text-sm font-normal text-white">Sort by:</label>
                  <Select className="rounded text-sm font-normal min-w-[150px] border border-kog-600 shadow-[0px_1px_10px_3px_rgba(254,0,188,0.2)]" classNamePrefix="select" value={selectedSort} options={selectCategory} styles={styles} onChange={setSelectedSort} />
                </div>
                
              </div>
            </div>
            {/* Products Display */}
            {view === "grid" && (
              <div className="grid 2xl:grid-cols-5 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 h-max border-kog-800 ">
                {filteredProducts.length > 0 ? filteredProducts.map((item, i) => (<Profiles key={`grid_key_${i}`} item={item} className="m-50" />)) : (<div className="col-span-12 "><Alert className="bg-kog-200 border border-kog-800 text-white text-lg py-2 text-center shadow-2xl">There are No Proposals on this category</Alert></div>)}
              </div>
            )}
            {/* {view === "list" && (
              <div className="space-y-3 grid-cols-1 gap-5 h-max border-kog-800">
                {filteredProducts.length > 0 ? filteredProducts.map((item, i) => (<ProductList item={item} key={`list_key_${i}`} />)) : (<Alert className="bg-kog-200 border border-kog-800 text-white text-lg py-2 text-center shadow-2xl">There are No Proposals on this category track</Alert>)}
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
