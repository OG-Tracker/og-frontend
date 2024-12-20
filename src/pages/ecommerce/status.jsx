import React from 'react';

import Icon from "@/components/ui/Icon";



// import React, { Fragment, useState } from "react";
import Badge from "@/components/ui/Badge";
// import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Tab } from "@headlessui/react";
import CounterButton from "@/components/partials/ecommerce/counter-button";
import blackJumper from "@/assets/images/e-commerce/product-card/classical-black-tshirt.png";
import one from "@/assets/images/e-commerce/productDetails/1.png";
import two from "@/assets/images/e-commerce/productDetails/2.png";
import three from "@/assets/images/e-commerce/productDetails/3.png";
import gmail from "@/assets/images/e-commerce/productDetails/gmail.svg";
import facebook from "@/assets/images/e-commerce/productDetails/facebook.svg";
import twitter from "@/assets/images/e-commerce/productDetails/twitter.svg";
import insta from "@/assets/images/e-commerce/productDetails/insta.svg";
import linkedin from "@/assets/images/e-commerce/productDetails/linkedin.svg";
import { Link } from "react-router-dom";
import Image from "@/components/ui/Image";

import { useParams, useNavigate } from "react-router-dom";
import ThumbSliderCom from "@/components/partials/ecommerce/thumb-slider";
import { useGetProductQuery } from "@/store/api/shop/shopApiSlice";
import { addToCart, updateQuantity } from "@/store/api/shop/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@/components/ui/Alert";
import LoaderCircle from "@/components/Loader-circle";
import { products, proposals } from "@/constant/data";
import { ItemsList } from "./tasks";
import Timer from "@/components/partials/ecommerce/timer";
import ProgressBarTimer from "@/components/partials/ecommerce/progressBar";
import Tooltip from "@/components/ui/Tooltip";
import CircularProgressBar from "@/components/partials/ecommerce/circularBar";

import Ecommerce from "./related";

import Chart from "react-apexcharts";

// Define the ProductStatusIcon component that accepts a product prop
const ProductStatusIcon = ({ product }) => {
  // Determine which icon to render based on the product's status
  let iconProps = {};
  switch (product?.status) {
    case 'Delivered':
      iconProps = {
        icon: 'ic:sharp-verified',
        className: 'text-kog-800'
      };
      break;
    case 'InProgress':
      iconProps = {
        icon: 'eos-icons:hourglass',
        className: 'text-kog-800'
      };
      break;
    case 'Flagged':
      iconProps = {
        icon: 'ph:heart-fill',
        className: 'text-slate-400 dark:text-slate-400 hover:text-danger-600 dark:hover:text-danger-600'
      };
      break;
    default:
      // Return null if none of the conditions are met
      return null;
  }

  // Render the Icon component with the determined props
  return <Icon {...iconProps} />;
};

export default ProductStatusIcon;
