import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
// import Badge from "@/components/ui/Badge";
// import Button from "@/components/ui/Button";
// import { current } from "@reduxjs/toolkit";
// import CounterButton from "@/components/partials/ecommerce/counter-button";
// import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
// import { addToCart, updateQuantity } from "@/store/api/shop/cartSlice";
import { Link, useLocation  } from "react-router-dom";
// import ProgressBar from "@/components/ui/ProgressBar";
import subLogo from "@/assets/images/logo/subscan.jpg";
import Timer from "./timer";
import ProgressBarTimer from "./progressBar";
import Image from "@/components/ui/Image";
import VerifiedIcon from "./verified-icon";

// import ProductRank from "./rank-track";
// import { products } from "@/constant/data";
import CheckIcon from "./checkIcon"; 
import { products } from "@/constant/data";


const Profiles = ({ item, wish }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const {
    // TODO proposal details
    refNum,
    status,
    proposer,
    paLink,
    subLink,
    reqDot,
    benAdd,
    scanLink,
    ptitle,
    track,
    category,
    fdate,
    ldate,
    propLink,
    summary,
    twitter,
    github,
    youtube,
    website,
    articles,
  } = item;

  // const isSpecialPath = location.pathname === '/smallTipper' || location.pathname === '/bigTipper' || location.pathname === '/root' || location.pathname === '/refCanceller' || location.pathname === '/auctionAdmin' || location.pathname === '/generalAdmin' || location.pathname === '/fellowshipAdmin' || location.pathname === '/leaseAdmin' || location.pathname === '/stakingAdmin' || location.pathname === '/treasurer' || location.pathname === '/whitelistedCaller'  || category === 'Bounty';
  
  return (
    

    <Card bodyClass=" rounded-md" className="group shadow-[inset_0px_0px_10px_7px_rgba(0,0,0,0.4)] hover:shadow-[0px_0px_7px_7px_rgba(166,0,157,0.3)]  border-kog-700 border-2 hover:bg-kog-100 hover:bg-opacity-70  duration-150 ease-out hover:ease-in">
    
      <div className="p-4 min-h-[220px]">
        <Link to={item.proposer}>
          <div className="flex justify-between items-center border-b border-kog-300 pb-3 ">
      
          </div>
        </Link>
        <Link to={item.proposer}>
        
          <h5 className="  text-2xl my-2 truncate border-b border-kog-300 pb-2 font-bold text-white bg-clip-text bg-300% animate-gradient">
            {proposer}
          </h5>
        </Link>
      </div>

    </Card>
  );
};

export default Profiles;
