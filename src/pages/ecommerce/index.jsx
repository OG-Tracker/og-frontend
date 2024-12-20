import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Select from "react-select";
import clsx from "clsx";
import Icon from "@/components/ui/Icon";
import ProductBox from "@/components/partials/ecommerce/product-box";
import ProductList from "@/components/partials/ecommerce/product-list";
import LoaderCircle from "@/components/Loader-circle";
import Alert from "@/components/ui/Alert";
import { selectOptions, selectCategory } from "@/constant/data";
import { useGetProductsQuery } from "@/store/api/shop/shopApiSlice";

const Ecommerce = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data: getProduct, isLoading, isError } = useGetProductsQuery();
  const products = getProduct?.products || [];

  const query = new URLSearchParams(location.search);
  const initialCategory = selectOptions.find(option => option.value === query.get('category')) || selectOptions[0];
  const initialSort = selectCategory.find(option => option.value === query.get('sort')) || selectCategory[0];
  const initialStatuses = { Delivered: query.getAll('status').includes('Delivered'), InProgress: query.getAll('status').includes('InProgress'), Flagged: query.getAll('status').includes('Flagged') };

  const [view, setView] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSort, setSelectedSort] = useState(initialSort);
  const [selectedStatuses, setSelectedStatuses] = useState(initialStatuses);
  const [visibleProducts, setVisibleProducts] = useState(30);

  const styles = {
    control: (provided) => ({ ...provided, backgroundColor: "transparent" }),
    option: (provided) => ({ ...provided, fontSize: "14px" }),
  };

  useEffect(() => {
    const handleScroll = () => {
      const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;
      if (bottom) {
        setVisibleProducts(prevVisibleProducts => prevVisibleProducts + 15);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const updateURLParams = useCallback(() => {
    const params = new URLSearchParams();
    if (selectedCategory.value !== 'all') {
      params.set('category', selectedCategory.value);
    }
    if (selectedSort.value !== 'all') {
      params.set('sort', selectedSort.value);
    }
    Object.keys(selectedStatuses).forEach(status => {
      if (selectedStatuses[status]) {
        params.append('status', status);
      }
    });
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  }, [selectedCategory, selectedSort, selectedStatuses, navigate, location.pathname]);

  useEffect(() => {
    updateURLParams();
  }, [selectedCategory, selectedSort, selectedStatuses, updateURLParams]);

  const filterAndSortProducts = useCallback(() => {
    let filteredProducts = [...products];

    if (selectedCategory.value !== "all") {
      filteredProducts = filteredProducts.filter(product => product.category.toLowerCase() === selectedCategory.value);
    }

    if (location.pathname !== '/all') {
      const trackMapping = {
        '/bigSpender': 'bigSpender',
        '/mediumSpender': 'mediumSpender',
        '/smallSpender': 'smallSpender',
        '/bigTipper': 'bigTipper',
        '/smallTipper': 'smallTipper',
        '/root': 'root',
        '/whitelistedCaller': 'whitelistedCaller',
        '/referendumCanceller': 'referendumCanceller',
        '/referendumKiller': 'referendumKiller',
        '/auctionAdmin': 'auctionAdmin',
        '/generalAdmin': 'generalAdmin',
        '/fellowshipAdmin': 'fellowshipAdmin',
        '/leaseAdmin': 'leaseAdmin',
        '/stakingAdmin': 'stakingAdmin',
        '/treasurer': 'treasurer',
      };
      const activeTrack = trackMapping[location.pathname] || 'defaultTrack';
      filteredProducts = filteredProducts.filter(product => product.track === activeTrack);
    }

    const statusFilters = Object.entries(selectedStatuses).filter(([_, value]) => value).map(([key]) => key);
    if (statusFilters.length > 0) {
      filteredProducts = filteredProducts.filter(product => statusFilters.includes(product.status));
    }

    // Helper function to parse numeric value from reqDot
    const parseReqDotValue = (reqDot) => {
      return parseFloat(reqDot.replace(/[^0-9.]/g, ''));
    };

    if (selectedSort.value !== "all") {
      switch (selectedSort.value) {
        case "refAsc":
          filteredProducts.sort((a, b) => parseInt(a.refNum) - parseInt(b.refNum));
          break;
        case "refDesc":
          filteredProducts.sort((a, b) => parseInt(b.refNum) - parseInt(a.refNum));
          break;
          case "dotAsc":
            // Exclude products where reqDot includes USDT or USDC
            filteredProducts = filteredProducts.filter(product => !product.reqDot.includes('USDT') && !product.reqDot.includes('USDC'));
            filteredProducts.sort((a, b) => parseReqDotValue(a.reqDot) - parseReqDotValue(b.reqDot));
            break;
          case "dotDesc":
            // Exclude products where reqDot includes USDT or USDC
            filteredProducts = filteredProducts.filter(product => !product.reqDot.includes('USDT') && !product.reqDot.includes('USDC'));
            filteredProducts.sort((a, b) => parseReqDotValue(b.reqDot) - parseReqDotValue(a.reqDot));
            break;
          
        case "stablesAsc":
          // Show only products that include USDT or USDC
          filteredProducts = filteredProducts.filter(product => product.reqDot.includes('USDT') || product.reqDot.includes('USDC'));
          filteredProducts.sort((a, b) => parseReqDotValue(a.reqDot) - parseReqDotValue(b.reqDot));
          break;
        case "stablesDesc":
          // Show only products that include USDT or USDC
          filteredProducts = filteredProducts.filter(product => product.reqDot.includes('USDT') || product.reqDot.includes('USDC'));
          filteredProducts.sort((a, b) => parseReqDotValue(b.reqDot) - parseReqDotValue(a.reqDot));
          break;
        default:
          break;
      }
    }

    return filteredProducts.slice(0, visibleProducts);
  }, [products, selectedCategory, selectedSort, selectedStatuses, visibleProducts, location.pathname]);

  const handleStatusChange = (status) => {
    setSelectedStatuses(prev => ({ ...prev, [status]: !prev[status] }));
  };

  const filteredProducts = filterAndSortProducts();

  const hideStatusFilter = [
    "/smallTipper",
    "/bigTipper",
    "/root",
    "/referendumCanceller",
    "/referendumKiller",
    "/auctionAdmin",
    "/generalAdmin",
    "/fellowshipAdmin",
    "/leaseAdmin",
    "/stakingAdmin"
  ].includes(location.pathname);

  if (isLoading) return <LoaderCircle />;
  if (isError) return <Alert> Something is mismatch...</Alert>;

  return (
    <div>
      <div className="grid grid-cols-12 gap-5">
        <div className="lg:col-span-12 col-span-12">
          <div>
            <div className="md:flex mb-6 md:space-y-0 space-y-4 px-3">
              <div className="flex-1 flex items-center sm:space-x-3 rtl:space-x-reverse">
                <button type="button" onClick={() => setView("grid")} className={clsx("border border-slate-700 text-slate-400 hidden lg:inline-flex rounded h-12 w-12 items-center justify-center transition-all duration-200", { "border-kog-900 text-slate-200 shadow-[0px_0px_4px_2px_rgba(254,0,188,0.5)]": view === "grid" })}><Icon icon="heroicons:view-columns" className="w-7 h-7" /></button>
                <button onClick={() => setView("list")} className={clsx("border border-slate-700 text-slate-400 rounded h-12 w-12 hidden lg:inline-flex items-center justify-center transition-all duration-200", { "border-kog-900 text-slate-100 shadow-[0px_0px_4px_2px_rgba(254,0,188,0.5)]": view === "list" })}><Icon className="w-7 h-7" icon="heroicons:list-bullet" /></button>
                {!hideStatusFilter && (
                  <div className="grid grid-cols-12 shadow-[inset_0px_0px_35px_rgba(0,0,0)] items-center divide-x divide-kog-400 border rounded-full border-kog-500 bg-transparent w-full sm:w-auto">
                    {["Delivered", "InProgress", "Flagged"].map((status) => (
                      <label key={status} className="flex flex-col justify-center items-center col-span-4 cursor-pointer">
                        <input type="checkbox" checked={selectedStatuses[status]} onChange={() => handleStatusChange(status)} className="sr-only" />
                        <div className={`rounded-full p-1 my-1 mx-5 flex justify-center items-center w-10 h-10 text-2xl transition-all duration-100 cursor-pointer ${selectedStatuses[status] ? (status === "Delivered" ? "bg-green-600 hover:bg-green-700 shadow-[0px_0px_5px_5px_rgba(33,192,91,0.9)]" : status === "InProgress" ? "bg-yellow-400 hover:bg-yellow-500 shadow-[0px_0px_5px_5px_rgba(229,175,8,0.9)]" : "bg-red-600 hover:bg-red-700 shadow-[0px_0px_5px_5px_rgba(237,67,67,0.9)]") : (status === "Delivered" ? "bg-gradient-to-t from-kog-200 to-green-500 hover:from-green-500 hover:to-green-500 shadow-[0px_0px_10px_5px_rgba(0,0,0,0.5)]" : status === "InProgress" ? "bg-gradient-to-t from-kog-200 to-yellow-500 hover:from-yellow-500 hover:to-yellow-500 shadow-[0px_0px_10px_5px_rgba(0,0,0,0.5)]" : "bg-gradient-to-t from-kog-200 to-red-500 hover:from-red-500 hover:to-red-500 shadow-[0px_0px_10px_5px_rgba(0,0,0,0.5)]")}`}>
                          <Icon className={`text-white ${selectedStatuses[status] ? "text-3xl" : ""}`} icon={status === "Delivered" ? "mingcute:check-fill" : status === "InProgress" ? "mdi:hourglass" : "ph:flag"} />
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex-none sm:flex items-center sm:space-x-4 sm:rtl:space-x-reverse sm:space-y-0 space-y-2">
                <div className="sm:flex sm:space-x-3 rtl:space-x-reverse items-center">
                  <label htmlFor="select" className="text-sm font-normal text-white hidden sm:inline-block">Category:</label>
                  <Select className="rounded text-sm font-normal min-w-[140px] border border-kog-600 shadow-[0px_1px_10px_3px_rgba(254,0,188,0.2)] block" classNamePrefix="select" value={selectedCategory} options={selectOptions} styles={styles} onChange={setSelectedCategory} />
                </div>
                <div className="sm:flex sm:space-x-3 rtl:space-x-reverse items-center">
                  <label htmlFor="select" className="text-sm font-normal text-white hidden sm:inline-block">Sort by:</label>
                  <Select className="rounded text-sm font-normal min-w-[150px] border border-kog-600 shadow-[0px_1px_10px_3px_rgba(254,0,188,0.2)]" classNamePrefix="select" value={selectedSort} options={selectCategory} styles={styles} onChange={setSelectedSort} />
                </div>
              </div>
            </div>
            {view === "grid" && (
              <div className="grid 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 h-max border-kog-800">
                {filteredProducts.length > 0 ? filteredProducts.map((item, i) => (<ProductBox key={`grid_key_${i}`} item={item} className="m-50" />)) : (<div className="col-span-12"><Alert className="bg-kog-200 border border-kog-800 text-white text-lg py-2 text-center shadow-2xl">There are No Proposals on this category</Alert></div>)}
              </div>
            )}
            {view === "list" && (
              <div className="space-y-3 grid-cols-1 gap-5 h-max border-kog-800">
                {filteredProducts.length > 0 ? filteredProducts.map((item, i) => (<ProductList item={item} key={`list_key_${i}`} />)) : (<Alert className="bg-kog-200 border border-kog-800 text-white text-lg py-2 text-center shadow-2xl">There are No Proposals on this category</Alert>)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ecommerce;