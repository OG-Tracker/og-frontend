import React, { Fragment, useState, useEffect } from "react";
import Badge from "@/components/ui/Badge";
import Icon from "@/components/ui/Icon";
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
import { Link, useLocation } from "react-router-dom";
import Image from "@/components/ui/Image";
import MovingShapes from "./shapes";

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
import CheckIcon from "@/components/partials/ecommerce/checkIcon";
import MyIcon from "@/components/partials/ecommerce/icon-check";
import Magnifier from "@/components/partials/ecommerce/icon-magnifier";
import AnimatedBackground from './dynamicBackground';
import CanvasAnimation from './canvasAnimation';



import shade1 from "@/assets/images/all-img/shade-1.png";
import shade2 from "@/assets/images/all-img/shade-2.png";
import shade3 from "@/assets/images/all-img/shade-3.png";
import shade4 from "@/assets/images/all-img/shade-4.png";

// import Ecommerce from "./related";
import VerifiedIcon from "@/components/partials/ecommerce/verified-icon";
import Chart from "react-apexcharts";
import Donut from "../chart/appex-chart/Donut";
import ProductRankDisplay from "./rank-track";
// import { products } from "@/constant/data";



export const ProductDetails = () => {

  const useMobileCheck = (maxWidth) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < maxWidth);

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < maxWidth);
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, [maxWidth]);

    return isMobile;
  };

  const isMobile = useMobileCheck(768);
  // const location = useLocation();

  // const isSpecialPath = location.pathname === '/smallTipper' || location.pathname === '/bigTipper' || location.pathname === '/root' || location.pathname === '/refCanceller' || location.pathname === '/auctionAdmin' || location.pathname === '/generalAdmin' || location.pathname === '/fellowshipAdmin' || location.pathname === '/leaseAdmin' || location.pathname === '/stakingAdmin' || location.pathname === '/treasurer' || location.pathname === '/whitelistedCaller'  || category === 'Bounty' || track === 'smallTipper' || category === 'Tip' || track === 'bigTipper' || track === 'root' || track === 'refCanceller' || track === 'auctionAdmin' || track === 'generalAdmin' || track === 'fellowshipAdmin' || track === 'leaseAdmin' || track === 'stakingAdmin' || track === 'treasurer' || track === 'whitelistedCaller'  ;
  //   const {
  //     name,
  //     img,
  //     rating,
  //     subtitle,
  //     price,
  //     oldPrice,
  //     percent,

  //     desc,
  // // TODO proposal details
  //     refNum,
  //     status,
  //     proposer,
  //     paLink,
  //     subLink,
  //     reqDot,
  //     benAdd,
  //     scanLink,
  //     ptitle,
  //     track,
  //     category,
  //     fdate,
  //     ldate,
  //     propLink,
  //     summary,
  //     twitter,
  //     github,
  //     youtube,
  //     website,
  //     articles,
  //   } = item;

  // const colors = [
  //   { code: "Black" },
  //   { code: "Pink" },
  //   { code: "Orange" },
  //   { code: "Red" },
  //   { code: "Yellow" },
  // ];
  // const sizes = [{ code: "S" }, { code: "M" }, { code: "L" }, { code: "XLs" }];

  // const lists = [
  //   {
  //     id: 1,
  //   },
  //   {
  //     id: 2,
  //   },
  //   {
  //     id: 3,
  //   },
  //   {
  //     id: 4,
  //   },
  //   {
  //     id: 5,
  //   },
  //   {
  //     id: 6,
  //   },
  // ];
  // const lists1 = [
  //   {
  //     id: 1,
  //     text: "Task1 : description",
  //   },
  //   {
  //     id: 2,
  //     text: "Task2 : description",
  //   },
  //   {
  //     id: 3,
  //     text: "Task3 : description",
  //   },
  //   {
  //     id: 4,
  //     text: "Task4 : description",
  //   },
  //   {
  //     id: 5,
  //     text: "Task5 : description",
  //   },
  //   {
  //     id: 6,
  //     text: "Task6 : description",
  //   },
  //   {
  //     id: 7,
  //     text: "Task7 : description",
  //   },
  // ];
  // const lists2 = [
  //   {
  //     id: 1,
  //     text: "Plate Type : Slim",
  //   },
  //   {
  //     id: 2,
  //     text: "Sales Channel Type : E-commerce Only Sells Online",
  //   },
  //   {
  //     id: 3,
  //     text: "Material Composition : 100% Cotton",
  //   },
  //   {
  //     id: 4,
  //     text: "Size : M,L,XL",
  //   },
  //   {
  //     id: 5,
  //     text: 'M- long: 29", body: 40"',
  //   },
  //   {
  //     id: 6,
  //     text: 'L- long: 30 ", body: 42"',
  //   },
  //   {
  //     id: 7,
  //     text: 'XL- long: 31", body: 44"',
  //   },
  // ];

  const buttons = [
    {
      title: "Overview",
    },
    {
      title: "Progress",
    },

    // {
    //   title: "Related",
    // },

  ];


  const subscanLink = "https://polkadot.subscan.io/account/";




  const dispatch = useDispatch();

  // const [color, setColor] = useState("Black");
  // const [size, setSize] = useState("S");
  let { id } = useParams();
  const {
    data: getProduct,
    isLoading,
    isError,
    error,
  } = useGetProductQuery(id);
  const product = getProduct?.product;
  const cartItems = useSelector((state) => state.cart.items);
  // const handleAddToCart = () => {
  //   dispatch(
  //     addToCart({
  //       id: product.id,
  //       name: product.name,
  //       price: product.price,
  //       img: product.img,
  //     })
  //   );
  // };
  const isValidID = product && product.id === id;
  // const isSpecialPath = location.pathname === '/smallTipper' || location.pathname === '/bigTipper' || location.pathname === '/root' || location.pathname === '/refCanceller' || location.pathname === '/auctionAdmin' || location.pathname === '/generalAdmin' || location.pathname === '/fellowshipAdmin' || location.pathname === '/leaseAdmin' || location.pathname === '/stakingAdmin' || location.pathname === '/treasurer' || location.pathname === '/whitelistedCaller'  || category === 'Bounty' || track === 'smallTipper' || category === 'Tip' || track === 'bigTipper' || track === 'root' || track === 'refCanceller' || track === 'auctionAdmin' || track === 'generalAdmin' || track === 'fellowshipAdmin' || track === 'leaseAdmin' || track === 'stakingAdmin' || track === 'treasurer' || track === 'whitelistedCaller';

  if (isLoading) {
    return <LoaderCircle />;
  }
  if (isError || error) {
    return (
      <Alert className="alert-danger " icon="heroicons:information-circle">
        Error: {error.message}
      </Alert>
    );
  }
  if (!isValidID) {
    return (
      <div>
        <Alert className="alert-danger " icon="heroicons:information-circle">
          Your id <strong>{id}</strong> is not Matching
        </Alert>
      </div>
    );
  }

  const pathname = window.location.pathname;
  const pathEnd = pathname.split('/').pop(); // Extracts the last part of the URL

  const containsUSD = product?.reqDot.includes('USD');
  const number = product?.reqDot.replace(/[^\d.-]/g, '');
  const formattedNumber = new Intl.NumberFormat().format(number); 

  // Determine the message or content based on the URL's ending
  let tooltipContent;
  switch (pathEnd) {
    case '221':
      tooltipContent = <div className=" text-kog-white text-sm text-left">
        <b>1.</b> This REF exceeded the deadline-duration without completing the expected deliverables in full. <br />
        <b>2.</b> OGT Team reached out to the proposer but there was no response. <br />
        <b>3.</b> Proposal will remain flagged until it is delivered or the proposer provide a transparent explanation about its status.
      </div>;
      break;

    case '193':
      tooltipContent = <div className=" text-kog-white text-sm text-left">
        <b>1.</b> The duration of this REF was extended by 1 month. <br />
        <b>2.</b> The team was very responsive and provided a detailed transparency-report about it's progress. <br />
        <b>3.</b> The proposal was successfully delivered within the new timeframe.
      </div>;
      break;

 case '222':
      tooltipContent = <div className=" text-kog-white text-sm text-left">
        <b>1.</b> The team hasn't made any sales yet, and that's why no income reports have been created so far.
</div>;
      break;

      case '485':
        tooltipContent = <div className=" text-kog-white text-sm text-left">
          <b>1.</b> The duration of this REF was extended by 2 months. <br />
          <b>2.</b> Due to the slow responsiveness of involved third parties in completing the pre-audit steps, the proposal experienced some unexpected delays. <br />
          <b>3.</b> The team reached out to us and provided a very detailed update about proposal's progress.
        </div>;
        break;

        case '219':
        tooltipContent = <div className=" text-kog-white text-sm text-left">
          <b>1.</b> This REF has been flagged until further notice. <br />
          <b>2.</b> The proposer delivered an extremely low amount of expected deliverables. <br />
          <b>3.</b> Our multiple efforts to communicate with him were unsuccessful.
        </div>;
        break;

        case '165':
        tooltipContent = <div className=" text-kog-white text-sm text-left">
          <b>1.</b> This REF has been flagged until further notice. <br />
          <b>2.</b> The team provided initially a transparency report with inadequate information and 0 updates. <br />
          <b>3.</b> Their GitHub has been inactive for months. <br />
          <b>4.</b> Their Website is not functional. <br />
          <b>5.</b> Direct points of contact were disabled.
        </div>;
        break;
      

    case '160':
    tooltipContent = <div className=" text-kog-white text-sm text-left">
      <b>1.</b> The duration of this REF was extended by 2 months.<br />
      <b>2.</b> The proposer was very transparent and communicative, providing us with a detailed transparency-report and a clear overview about its proposal's status. <br />
      <b>3.</b> The proposer delivered 4 additional tasks that weren't initially promised.
    </div>;
    break;

    case '374':
      tooltipContent = <div className=" text-kog-white text-sm text-left">
        <b>1.</b> The duration of this REF was extended by 1 month.<br />
        <b>2.</b> The activation with Benjamin Cowen was not executed as planned, resulting in a refund of a portion of the initial capital received 3,575 DOT.<br />
        <b>3.</b> The team was extremely communicative and provided full details about their proposal's status along with an insightful transparency-report. <br />
        <b>4.</b> To maximize the campaign's reach, proposer decided to convert two of the remaining videos into eight tweets from Kripto Emre due to his exceptional performance on X.
      </div>;
      break;

      case '98':
      tooltipContent = <div className=" text-kog-white text-sm text-left">
        <b>1.</b> The Polkadot Insider team was transparent and responsive to our calls.<br />
        <b>2.</b> The amount of certain tasks that was produced were less than expected.<br />
        <b>3.</b> In exchange the team overdelivered and increased the expected amount on some other tasks. <br />
        <b>4.</b> The team provided a very detailed <a target="_blank" className=" text-blue-300" href="https://polkadot.polkassembly.io/post/2276">transparency-report</a> about its progress.
      </div>;
      break;

    case '343':
      tooltipContent = <div className=" text-kog-white text-sm text-left">
        <b>1.</b>The duration of this REF was extended by 1 month.<br />
        <b>2.</b>The team was expecting confirmation from the involved external third parties which cause delays.<br />
        <b>3.</b>Very transparent team with clear constant explanations about their progress. <br />
        <b>4.</b>The proposal was succesfully delivered within the new timeframe.

      </div>;
      break;

    case '304':
      tooltipContent = <div className=" text-kog-white text-sm text-left">
        <b>1.</b> The duration of this REF was extended by 2 months. <br />
        <b>2.</b> OGT Team reached out to the parties involved and they were quite responsive.<br />
        <b>3.</b> The team faced unexpected delays scheduling upcoming spaces with ecosystem teams.
      </div>;
      break;

      case '369':
      tooltipContent = <div className=" text-kog-white text-sm text-left">
        <b>1.</b> According to proposer's report, the interviews have been replaced with 2 live show videos due to technical issues with the equipment.<br />
        <b>2.</b> The number of Shorts videos has been reduced from 9 to 4, with two live shows added in exchange.<br />
        <b>3.</b> As a result, there are now 10 live show videos being produced, instead of the originally promised.
      </div>;
      break;

      case '240':
      tooltipContent = <div className=" text-kog-white text-sm text-left">
        <b>1.</b> The duration of this REF was extended by 2 months.<br />
        <b>2.</b> The proposer was transparent and provided us with a comprehensive overview and report about the progress of his proposal.<br />
      </div>;
      break;

    case '263':
      tooltipContent = <div className=" text-kog-white text-sm text-left">
        <b>1.</b> This REF exceeded the deadline-duration without completing the expected deliverables in full. <br />
        <b>2.</b> OGT Team reached out to the proposer but there was no response. <br />
        <b>3.</b> Proposal will remain flagged until it is delivered or the proposer provide a transparent explanation about its status.
      </div>;
      break;

    case '342':
      tooltipContent = <div className=" text-kog-white text-sm text-left">
        <b>1.</b> The Lunar Strategy team decided to reduce the amount of X posts to 24 as they chose to work with fewer but more effective and impactful KOLs.
      </div>;
      break;

      case '279':
      tooltipContent = <div className=" text-kog-white text-sm text-left">
        <b>1.</b> This proposal's duration has been extended for one month due to external factors such as response time from dApp builders & data indexing complexities. <br />
        <b>2.</b> The team has provided a transparency-report about their progress in the comment section of their original proposal.
      </div>;
      break;

      case '155':
        tooltipContent = <div className=" text-kog-white text-sm text-left">
          <b>1.</b> The duration of this REF was extended by 1 month.<br />
          <b>2.</b> Very transparent and communicative team with consistent reports about their progress.<br />
          
        </div>;
        break;



        

        case '141':
          tooltipContent = <div className=" text-kog-white text-sm text-left">
            <b>1.</b> This proposal's duration has been extended for two months.
            
            
          </div>;
          break;

    default:
      // For the default case, you want to display the icon
      tooltipContent = <Icon icon="svg-spinners:blocks-shuffle-3" className="text-3xl text-kog-white" />;
  }

  const isNotIcon = typeof tooltipContent !== 'object' || tooltipContent.props.icon !== "svg-spinners:blocks-shuffle-3";

  const buttonClassName = `btn btn-outline-kog-900 bg-kog-100 text-kog-900 hover:bg-kog-900 hover:text-white rounded-full px-6 border border-kog-500 shadow-[0px_1px_10px_3px_rgba(254,0,188,0.2)] ${isNotIcon ? "animate-glow" : ""
    }`;


  return (
    <div className="w-full p-0 py-6 sm:p-6 rounded-lg">
      {/* <div className="pb-5">
        <div className="grid grid-cols-12  md:space-x-6 md:space-y-0 space-y-4 sm:space-y-4  rtl:space-x-reverse ">
          <div className=" col-span-12 md:col-span-5 lg:col-span-4 space-y-4 ">
            <ThumbSliderCom product={product} />
          </div>
          <div className="col-span-12 md:col-span-7 lg:col-span-8 space-y-2 ">
            <div className="space-y-2">
              <h1 className=" text-slate-300 text-xl lg:text-2xl font-medium ">
                {product?.name}
              </h1>
              <p className="flex items-center  text-slate-300  font-normal text-sm lg:text-base space-x-1.5 rtl:space-x-reverse">
                <Icon icon="ph:star-fill" className="text-yellow-400" />
                <Icon icon="ph:star-fill" className="text-yellow-400" />
                <Icon icon="ph:star-fill" className="text-yellow-400" />
                <Icon icon="ph:star-fill" className="text-yellow-400" />
                <Icon icon="ph:star-fill" className="text-slate-300/80" />
                <span className="ltr:pl-2 rtl:pr-2 text-slate-500 dark:text-slate-400">
                  (789 reviews)
                </span>
              </p>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <p className="font-normal text-sm lg:text-base text-slate-500 dark:text-slate-400 ">
                  Brand:
                </p>
                <p className="font-medium text-sm lg:text-base  text-slate-300 ">
                  {product.brand}
                </p>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <p className="font-normal text-sm lg:text-base text-slate-500 dark:text-slate-400 ">
                  Available:
                </p>
                <p className="font-medium text-sm lg:text-base  text-slate-300 ">
                  In Stock
                </p>
              </div>
              <p className="font-normal text-sm lg:text-base text-slate-500 dark:text-slate-400">
                {product?.desc}
              </p>
            </div>
            <div className="pb-1">
              <div className="mb-4">
                <div className="pb-2 flex items-center space-x-2 rtl:space-x-reverse mb-3">
                  <p className="font-normal text-sm lg:text-base text-slate-500 dark:text-slate-400 ">
                    Color:
                  </p>
                  <p className="font-medium text-sm lg:text-base  text-slate-300 ">
                    {color}
                  </p>
                </div>
                <div className="flex space-x-4 rtl:space-x-reverse h-6 ">
                  {colors.map((innerColor, i) => {
                    return (
                      <label key={i}>
                        <input
                          type="radio"
                          name="color"
                          value={innerColor.code}
                          onChange={() => setColor(innerColor.code)}
                          className="hidden"
                        />
                        <div
                          style={{ backgroundColor: innerColor.code }}
                          className={`h-7 w-7 ${
                            innerColor.code === color
                              ? "ring-slate-900 dark:ring-slate-300"
                              : "ring-slate-300"
                          } ring-1 ring-slate-400 dark:ring-slate-900 ring-offset-2 ring-offset-white dark:ring-offset-slate-700 cursor-pointer rounded-sm`}
                        />
                      </label>
                    );
                  })}
                </div>
              </div>
              <div>
                <div className="pb-2 flex items-center space-x-2 rtl:space-x-reverse mb-3">
                  <p className="font-normal text-sm lg:text-base text-slate-500 dark:text-slate-400 ">
                    Size:
                  </p>
                  <p className="font-medium text-base  text-slate-300 ">
                    {size}
                  </p>
                </div>
                <div className="flex items-center space-x-4 rtl:space-x-reverse mb-4 h-6 ">
                  {sizes.map((list, i) => {
                    return (
                      <label key={i}>
                        <input
                          type="radio"
                          name="color"
                          value={list.code}
                          onChange={() => setSize(list.code)}
                          className="hidden h-7 w-7"
                        />
                        <div
                          style={{ backgroundColor: list.code }}
                          className={`h-7 w-7 ${
                            list.code === size
                              ? "ring-slate-900 dark:ring-slate-300"
                              : ""
                          } ring-1 ring-slate-400 dark:ring-slate-900 ring-offset-2 flex justify-center items-center ring-offset-white cursor-pointer dark:ring-offset-slate-700 rounded-sm`}
                        >
                          {list.code}
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="w-full border-t border-slate-300 dark:border-slate-600"></div>

            <div className="overflow-x-auto ">
              <div className="inline-block max-w-full align-middle">
                <div className="overflow-hidden ">
                  <table className="min-w-full   ">
                    <tbody className="bg-kog-999  dark:bg-kog-50 ">
                      <tr className="space-x-6 rtl:space-x-reverse">
                        <td className="table-td py-2 pl-0 rtl:pr-0 font-normal text-sm lg:text-base text-slate-500 dark:text-slate-400  ">
                          Price:
                        </td>
                        <td className="table-td py-2 space-x-2 rtl:space-x-reverse">
                          <span className=" text-slate-300 font-semibold	text-base lg:text-xl">
                            ${product?.price}
                          </span>
                          <del className="text-slate-500 dark:text-slate-400 font-semibold text-base lg:text-xl ">
                            {product.oldPrice}
                          </del>
                          <Badge className=" font-normal text-[10px] bg-danger-600 text-white ">
                            <span>40%</span>
                          </Badge>
                        </td>
                      </tr>
                      <tr className="space-x-1 rtl:space-x-reverse">
                        <td className="table-td py-2 pl-0 rtl:pr-0 font-normal text-sm lg:text-base text-slate-500 dark:text-slate-400  ">
                          Quantity:
                        </td>
                        <td className="table-td py-2 ">
                          <CounterButton product={product} />
                        </td>
                      </tr>
                      <tr className="space-x-1 rtl:space-x-reverse">
                        <td className="table-td py-2 pl-0 rtl:pr-0 font-normal text-sm lg:text-base text-slate-500 dark:text-slate-400  ">
                          Total Price:
                        </td>
                        <td className="table-td py-2 text-slate-900 font-semibold	text-base lg:text-xl ">
                          $336
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="flex space-x-4 rtl:space-x-reverse pb-5">
              <Button
                onClick={handleAddToCart}
                disabled={cartItems.some((cartItem) => cartItem.id === id)}
                text="Add to Cart"
                icon="heroicons:shopping-bag"
                className="btn-outline-dark w-[180px] btn-sm  font-medium hover:bg-slate-900 dark:text-white hover:text-white dark:hover:text-white  dark:hover:bg-slate-700 flex items-center"
                iconClass=" text-sm leading-none"
              />
              <Button
                text="Buy Now"
                className="btn-outline-dark w-[180px] btn-sm bg-slate-900 dark:bg-kog-50  font-medium hover:bg-kog-999 text-white hover: hover:text-white  dark:hover:!bg-slate-700 flex items-center"
                iconClass=" text-sm leading-none"
              />
              <Button
                icon="octicon:heart-16"
                className="btn-outline-secondary w-[40px] border dark:border-slate-600 dark:hover:border-slate-600 btn-sm  font-medium hover:bg-slate-900 hover:text-white dark:hover:text-white  dark:hover:bg-slate-700 flex items-center"
                iconClass=" text-sm leading-none"
              />
              <Button
                icon="eva:repeat-fill"
                className="btn-outline-secondary w-[40px] border dark:border-slate-600 dark:hover:border-slate-600 btn-sm  font-medium hover:bg-slate-900 hover:text-white dark:hover:text-white  dark:hover:bg-slate-700 flex items-center"
                iconClass=" text-sm leading-none"
              />
            </div>
            <div className="flex space-x-3 rtl:space-x-reverse ">
              <p className="font-normal text-sm lg:text-base text-slate-500 dark:text-slate-400">
                Share to:
              </p>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <button
                  type="button"
                  className="border p-2 dark:border-slate-600 rounded h-8 w-8 flex justify-center items-center"
                >
                  <img className="w-full h-full" src={gmail} alt="" />
                </button>
                <button
                  type="button"
                  className="border p-2 dark:border-slate-600 rounded h-8 w-8 flex justify-center items-center"
                >
                  <img className="w-full h-full" src={facebook} alt="" />
                </button>
                <button
                  type="button"
                  className="border p-2 dark:border-slate-600 rounded h-8 w-8 flex justify-center items-center"
                >
                  <img className="w-full h-full" src={twitter} alt="" />
                </button>
                <button
                  type="button"
                  className="border p-2 dark:border-slate-600 rounded h-8 w-8 flex justify-center items-center"
                >
                  <img className="w-full h-full" src={insta} alt="" />
                </button>
                <button
                  type="button"
                  className="border p-2 dark:border-slate-600 rounded h-8 w-8 flex justify-center items-center"
                >
                  <img className="w-full h-full" src={linkedin} alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="space-y-5">
        <div className="border border-1 border-slate-700 rounded backdrop-blur-2xl bg-kog-999 bg-opacity-30 shadow-[inset_0px_0px_11px_6px_rgba(0,0,0,0.5)]">
          {/* <Card> */}
          <Tab.Group>

            <Tab.List className="lg:space-x-2 md:space-x-4 space-x-0 rtl:space-x-reverse mt-[-30px] ml-5 ">
              {buttons.map((item, i) => (
                <Tab as={Fragment} key={i}>
                  {({ selected }) => (
                    <button
                      className={` text-lg lg:text-xl font-medium mb-7 capitalize bg-black 
             dark:bg-kog-50 ring-0 foucs:ring-0 focus:outline-none px-2
              transition duration-150 before:transition-all before:duration-150 relative 
              before:absolute before:left-1/2 before:bottom-[-2px] before:h-[2.5px] before:bg-[rgba(1,1,1,0.9)]
              before:-translate-x-1/2 border-solid border  rounded-t-md border-[#890F83] shadow-[inset_0px_-6px_4px_1px_rgba(0,0,0,0.5)]
              
              ${selected
                          ? " text-slate-300 font-md text-lg lg:text-xl  before:w-full"
                          : "text-slate-500 font-md text-lg lg:text-xl before:w-0 "
                        }
              `}
                    >
                      {item.title}
                    </button>
                  )}
                </Tab>
              ))}
            </Tab.List>

            <Tab.Panels>
              {/* Development */}
              <Tab.Panel>
                <div className="text-kog-white text-sm lg:text-base font-normal grid grid-cols-1 md:grid-cols-2 pb-10">
                  <div className=" sm:border-r-2 border-kog-200 px-5 min-h-[65vh]">
                    <div className="sm:flex flex-row-reverse justify-between items-center">
                      <p className="text-2xl	border-kog-300 text-kog-white px-2 py-2 rounded-full max-w-[40px] max-h-[40px]  p-1 shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)] bg-gradient-to-t from-kog-300 to-kog-800 mb-5 sm:mb-1 mx-auto sm:mx-1 sm:ml-3">
                        {/* {product?.status} */}

                        {/* TODO add if statement for icon display */}
                        {/* {status} */}
                        {/* {product?.status === 'Delivered' ? <CheckIcon /> : product?.status === 'In progress' ? <Icon icon="eos-icons:hourglass" className="text-white" /> : product?.status === 'Flagged' ? <MyIcon /> : null} */}
                        {
                          product?.status === 'Delivered' ? (
                            <CheckIcon />
                          ) : product?.status === 'InProgress' ? (
                            new Date() >= new Date(product?.ldate) ? (

                              <Tooltip
                                title={<Icon icon="simple-line-icons:magnifier" className="animate-zoom" />}
                                placement={isMobile ? "bottom" : "left"}
                                className=""
                                arrow
                                allowHTML
                                interactive
                                theme="custom-light"
                                maxWidth="220px"
                                content={
                                  <div className=" text-kog-white text-sm bg-kog-500 h-10px">
                                    Final Assessment Badge
                                  </div>
                                }
                              />

                              // <Magnifier />
                            ) : (
                              <Icon icon="eos-icons:hourglass" className="text-white" />
                            )
                          ) : product?.status === 'Flagged' ? (
                            <MyIcon />
                          ) : null
                        }
                      </p>
                      <div className="text-left ">
                        <p className="align-middle text-center">
                          <span className="align-middle text-slate-300 text-lg sm:text-2xl	font-medium	mt-2 ">#{product?.refNum}</span>
                          <span className="align-middle text-kog-400"> ⦿ </span>
                          <span className="align-middle text-slate-300 text-md sm:text-xl	font-medium	mt-2  mx-1">{product?.fdate}</span>
                          <span className="align-middle text-kog-400 "> ⦿ </span>
                          <span className="align-middle border border-kog-300 text-white px-3 py-1 rounded-3xl mx-1 p-2 shadow-[0px_0px_10px_2px_rgba(0,0,0,0.4)] transition-all duration-200 ease-in-out bg-gradient-to-t from-kog-100 to-kog-300 ">
                            {
                              product?.track === 'smallSpender' ? 'Small Spender' :
                                product?.track === 'bigSpender' ? 'Big Spender' :
                                  product?.track === 'mediumSpender' ? 'Medium Spender' :
                                    product?.track === 'smallTipper' ? 'Small Tipper' :
                                      product?.track === 'bigTipper' ? 'Big Tipper' :
                                        product?.track === 'root' ? 'Root' :
                                          product?.track === 'refCanceller' ? 'Ref Canceller' :
                                            product?.track === 'auctionAdmin' ? 'Auction Admin' :
                                              product?.track === 'generalAdmin' ? 'General Admin' :
                                                product?.track === 'fellowshipAdmin' ? 'Fellowship Admin' :
                                                  product?.track === 'leaseAdmin' ? 'Lease Admin' :
                                                    product?.track === 'stakingAdmin' ? 'Staking Admin' :
                                                      product?.track === 'whitelistedCaller' ? 'Whitelisted Caller' :
                                                        product?.track === 'treasurer' ? 'Treasurer' :
                                                          product?.track}

                          </span>


                        </p>
                      </div>


                    </div>
                    {/* bg-gradient-to-l from-[#E6007A] via-kog-500 to-kog-900 text-transparent bg-clip-text bg-300% animate-gradient */}
                    <p className=" text-slate-300 text-xl sm:text-3xl text-center sm:text-left	font-medium	mt-5 ">
                      {product?.ptitle}
                    </p>

                    {/* <div className="mt-8 grid grid-cols-4 lg:grid-cols-8 w-full shadow-[inset_0px_0px_25px_rgba(0,0,0)] justify-center items-center divide-x divide-kog-400 border rounded-full border-kog-500 py-2  bg-transparent">
                      <Link target="_blank" to={product?.twitter} className="flex justify-center items-center text-2xl px-2 my-[5px] sm:my-0" >
                        <div class="rounded-full p-2 shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)] transition-all duration-200 ease-in-out bg-gradient-to-t hover:bg-gradient-to-l from-kog-300 to-kog-500 hover:bg-kog-500 flex justify-center items-center m-auto min-w-[45px] min-h-[45px] hover:min-w-full hover:shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)]">
                          <Icon className={'m-auto text-white'} icon="pajamas:twitter" />
                        </div>
                      </Link>

                      <Link target="_blank" to={product?.website} className="flex justify-center items-center text-2xl px-2 my-[5px] sm:my-0">
                        <div class="rounded-full p-2 shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)] transition-all duration-200 ease-in-out bg-gradient-to-t hover:bg-gradient-to-l from-kog-300 to-kog-500 hover:bg-kog-500 flex justify-center items-center m-auto min-w-[45px] min-h-[45px] hover:min-w-full hover:shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)]">
                          <Icon className={'m-auto text-white'} icon="streamline:web" />
                        </div>
                      </Link>

                      <Link target="_blank" to={product?.github} className="flex justify-center items-center text-2xl px-2 my-[5px] sm:my-0">
                        <div class="rounded-full p-2 shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)] transition-all duration-200 ease-in-out bg-gradient-to-t hover:bg-gradient-to-l from-kog-300 to-kog-500 hover:bg-kog-500 flex justify-center items-center m-auto min-w-[45px] min-h-[45px] hover:min-w-full hover:shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)]">
                          <Icon className={'m-auto text-white'} icon="mdi:github" />
                        </div>
                      </Link>

                      <Link target="_blank" to={product?.youtube} className="flex justify-center items-center text-2xl px-2 my-[5px] sm:my-0" >
                        <div class="rounded-full p-2 shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)] transition-all duration-200 ease-in-out bg-gradient-to-t hover:bg-gradient-to-l from-kog-300 to-kog-500 hover:bg-kog-500 flex justify-center items-center m-auto min-w-[45px] min-h-[45px] hover:min-w-full hover:shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)]">
                          <Icon className={'m-auto text-white'} icon="mdi:youtube" />
                        </div>
                      </Link>

                      <Link target="_blank" to={product?.articles} className="flex justify-center items-center text-2xl px-2 my-[5px] sm:my-0">
                        <div class="rounded-full p-2 shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)] transition-all duration-200 ease-in-out bg-gradient-to-t hover:bg-gradient-to-l from-kog-300 to-kog-500 hover:bg-kog-500 flex justify-center items-center m-auto min-w-[45px] min-h-[45px] hover:min-w-full hover:shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)]">
                          <Icon className={'m-auto text-white'} icon="akar-icons:medium-fill" />
                        </div>
                      </Link>

                      <Link target="_blank" to={product?.scanLink} className="flex justify-center items-center px-2">
                        <div class="rounded-full p-2 shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)] transition-all duration-200 ease-in-out bg-gradient-to-t hover:bg-gradient-to-l from-kog-300 to-kog-500 hover:bg-kog-500 flex justify-center items-center m-auto min-w-[45px] min-h-[45px] hover:min-w-full hover:shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)]">
                          <svg className="m-auto" width="28" height="28" viewBox="0 0 48 48" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_3485_29957)">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M51.5772 29.0772L24 13.5L-3.57715 29.0772L24 46.1543L51.5772 29.0772ZM41.8764 29.2725L24 19.175L6.12369 29.2725L24 40.3425L41.8764 29.2725Z" fill="#ebeaea" />
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M24 7.17497L6.12368 17.2725L24 28.3425L41.8763 17.2725L24 7.17497ZM24 1.5L-3.57715 17.0772L24 34.1543L51.5772 17.0772L24 1.5Z" fill="#ebeaea" />
                            </g>
                            <defs>
                              <clipPath id="clip0_3485_29957">
                                <rect width="48" height="48" fill="#ebeaea" />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>

                      </Link>
                      <Link target="_blank" to={product?.paLink} className="flex justify-center items-center px-2">
                        <div class="rounded-full p-2 shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)] transition-all duration-200 ease-in-out bg-gradient-to-t hover:bg-gradient-to-l from-kog-300 to-kog-500 hover:bg-kog-500 flex justify-center items-center m-auto min-w-[45px] min-h-[45px] hover:min-w-full hover:shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)]">
                          <svg className="m-auto" width="28" height="28" viewBox="0 0 39 40" fill="#fff" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_8997_79043)"><path d="M6.09501 24.9033C6.90889 27.5289 8.33317 29.8097 10.2706 31.7368C12.553 34.0176 15.2777 35.5293 18.427 36.2719C19.7805 36.5901 21.1518 36.7669 22.5318 36.7404C24.9557 36.6962 27.2735 36.1746 29.4852 35.158C31.4314 34.2651 33.1299 33.0364 34.6073 31.4981C34.8196 31.2771 34.9434 31.2418 35.1911 31.4805C35.8015 32.0728 36.4385 32.6385 37.0666 33.2043C37.2524 33.3634 37.2612 33.4607 37.0843 33.6552C34.0676 36.82 30.4052 38.7914 26.1235 39.6489C24.4073 39.9936 22.6645 40.0644 20.9306 39.9494C18.4978 39.7903 16.1535 39.1892 13.9242 38.1725C11.6329 37.1382 9.60707 35.7238 7.86431 33.9381C5.66153 31.6838 3.99839 29.0759 3.04297 26.0526C3.61799 25.7166 4.26379 25.6017 4.88304 25.3719C5.28998 25.2216 5.72346 25.1243 6.10386 24.9033H6.09501Z" fill="#ebeaea"></path><path d="M16.4719 30.3222C13.2164 28.4481 11.1375 25.69 10.4121 22.0036C9.79281 18.883 10.3325 15.9303 12.0398 13.2252C13.756 10.5201 16.1711 8.74319 19.2763 7.91221C19.3293 7.89453 19.3824 7.90337 19.4355 7.89453C19.5859 8.00945 19.6124 8.1951 19.6567 8.36306C19.8247 9.01724 19.984 9.68026 20.1255 10.3433C20.1786 10.582 20.2582 10.8118 20.4086 11.0151C19.2497 11.245 18.1881 11.7047 17.2416 12.3942C14.9946 14.0473 13.6676 16.2397 13.4818 19.0598C13.2872 21.871 14.2603 24.2313 16.2773 26.1762C16.7992 26.6801 17.392 27.1044 18.0201 27.4668C18.0201 27.7497 17.8254 27.9442 17.6927 28.1652C17.2681 28.8813 16.9231 29.6415 16.4631 30.3311L16.4719 30.3222Z" fill="#ebeaea"></path><path d="M12.5088 6.72766C14.6851 5.10105 17.1179 4.0579 19.8072 3.62473C21.9127 3.27996 24.0093 3.38604 26.0794 3.87226C28.521 4.44687 30.7061 5.53422 32.6523 7.12547C33.3866 7.72661 34.0589 8.38962 34.6782 9.10568C34.8551 9.30901 34.802 9.40625 34.6162 9.55654C33.9174 10.1135 33.2273 10.6792 32.5639 11.2627C32.3427 11.4572 32.2631 11.3069 32.1392 11.1831C31.29 10.2638 30.3876 9.41509 29.3172 8.74323C27.6452 7.69124 25.8317 7.03707 23.8677 6.81606C20.4442 6.42709 17.3567 7.29343 14.5612 9.29133C14.287 9.18525 14.1897 8.9112 14.0216 8.69903C13.5173 8.04485 13.0662 7.34647 12.5 6.7365L12.5088 6.72766Z" fill="#ebeaea"></path><path d="M12.5068 6.72695C12.6749 6.68275 12.7456 6.80651 12.8252 6.92143C13.4003 7.70822 13.9841 8.495 14.5592 9.28178C13.0287 10.4752 11.7548 11.8897 10.8613 13.6223C9.23357 16.7518 8.93278 20.0227 9.89705 23.4173C9.94128 23.5588 9.96782 23.7091 10.0032 23.8505C9.81743 24.0273 9.56089 24.045 9.33088 24.1246C8.54354 24.4074 7.73851 24.6285 6.96886 24.9379C6.22576 22.8869 5.96036 20.7653 6.11075 18.5906C6.3673 14.8511 7.77389 11.5891 10.2598 8.78673C10.9321 8.02647 11.6929 7.35461 12.4979 6.73579L12.5068 6.72695Z" fill="#ebeaea"></path><path d="M6.96917 24.9291C6.98686 24.8231 7.03994 24.77 7.1461 24.7347C8.03075 24.4429 8.9154 24.1424 9.8089 23.8506C9.87082 23.833 9.94159 23.8506 10.0124 23.8418C10.4812 25.0352 11.012 26.1845 11.7817 27.2188C14.3118 30.6223 17.7 32.4345 21.9374 32.6378C22.2294 32.6555 22.3444 32.7086 22.3355 33.0268C22.3178 33.8755 22.3267 34.7241 22.3444 35.5816C22.3444 35.8645 22.2559 35.9264 21.9905 35.9264C15.3822 35.7761 9.55235 31.6831 7.16379 25.5214C7.09302 25.3358 6.96032 25.159 6.96917 24.9468V24.9291Z" fill="#ebeaea"></path><path d="M3.95416 11.006C4.69727 9.32639 5.71461 7.8147 6.90889 6.43563C9.64246 3.27966 13.0218 1.14916 17.047 0.0352855C17.3743 -0.053117 17.4716 0.0176049 17.5424 0.327014C17.7105 1.10496 17.8962 1.87406 18.1174 2.63432C18.2147 2.98793 18.1705 3.13821 17.7901 3.23546C15.4458 3.85427 13.3491 4.9593 11.4825 6.49751C9.51861 8.12411 7.97932 10.0778 6.90004 12.3851C6.88235 12.4205 6.85581 12.4558 6.82927 12.4824C6.21886 12.0403 5.49345 11.8105 4.82112 11.4834C4.52034 11.3331 4.17532 11.2536 3.94531 10.9884L3.95416 11.006Z" fill="#fff"></path><path d="M3.95252 11.0059C4.84601 11.4125 5.73066 11.8192 6.62416 12.217C6.74801 12.27 6.81878 12.3673 6.83647 12.491C5.79259 14.8248 5.23526 17.2559 5.2618 19.8107C5.27949 21.5434 5.56258 23.2408 6.09337 24.8939C6.09337 25.0088 6.04029 25.1061 5.91644 25.1414C4.95217 25.4243 4.01444 25.8133 3.04133 26.052C1.41357 20.9777 1.69666 16.0094 3.8729 11.1473C3.89944 11.0943 3.92598 11.0501 3.95252 11.0059Z" fill="#ebeaea"></path><path d="M16.4698 30.3218C16.4521 30.0389 16.6556 29.8444 16.7794 29.6234C17.1864 28.8985 17.5402 28.1382 18.0179 27.4575C20.6807 28.8366 23.3877 28.9427 26.1302 27.7051C26.6698 27.4575 27.174 27.157 27.6341 26.7857C27.8198 26.6354 27.9172 26.6619 28.0587 26.8476C28.5895 27.5283 29.1291 28.209 29.6776 28.8631C29.8722 29.1018 29.8634 29.2168 29.6157 29.4024C26.4929 31.6567 23.0604 32.3374 19.3184 31.4533C18.3099 31.2146 17.3633 30.8257 16.4609 30.3218H16.4698Z" fill="#ebeaea"></path><path d="M20.4067 11.0061C20.1944 11.015 20.1413 10.8647 20.1059 10.6967C19.8848 9.75967 19.6548 8.8226 19.4336 7.88554C21.6187 7.31092 23.7861 7.417 25.9446 8.04466C26.3073 8.15075 26.3516 8.28335 26.2189 8.61044C25.9181 9.3707 25.6527 10.1486 25.3961 10.9266C25.3077 11.1918 25.2104 11.2537 24.9361 11.1653C23.6622 10.7675 22.3618 10.6791 21.0437 10.8559C20.8313 10.8824 20.6367 11.0238 20.4156 10.9885L20.4067 11.0061Z" fill="#ebeaea"></path></g><defs><clipPath id="clip0_8997_79043"><rect width="39" height="40" fill="white"></rect></clipPath></defs></svg>
                        </div>
                      </Link>

                      <Link target="_blank" to={product?.subLink} className="flex justify-center items-center px-2">
                        <div class="rounded-full p-2 shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)] transition-all duration-200 ease-in-out bg-gradient-to-t hover:bg-gradient-to-l from-kog-300 to-kog-500 hover:bg-kog-500 flex justify-center items-center m-auto min-w-[45px] min-h-[45px] hover:min-w-full hover:shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)]">
                          <svg className="m-auto" width="29" height="29" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg"><path opacity="0.4" d="M10.86 1.74096C11.4896 1.11138 12.5103 1.11138 13.1399 1.74096C13.7695 2.37054 13.7695 3.3913 13.1399 4.02088L5.54017 11.6206C5.33031 11.8305 5.33031 12.1707 5.54017 12.3806L7.06012 13.9005C7.26998 14.1104 7.61024 14.1104 7.8201 13.9005L15.4198 6.3008C16.0494 5.67122 17.0702 5.67122 17.6998 6.3008L22.3632 10.9643C22.9356 11.5366 22.9356 12.4646 22.3632 13.0369L13.1399 22.2603C12.5103 22.8898 11.4896 22.8898 10.86 22.2603C10.2304 21.6307 10.2304 20.6099 10.86 19.9803L18.4597 12.3806C18.6696 12.1707 18.6696 11.8305 18.4597 11.6206L16.9398 10.1007C16.7299 9.89081 16.3897 9.89081 16.1798 10.1007L8.58007 17.7004C7.95049 18.33 6.92973 18.33 6.30015 17.7004L1.63667 13.0369C1.06432 12.4646 1.06432 11.5366 1.63667 10.9643L10.86 1.74096Z" fill="#fff"></path><path d="M4.02023 10.8606C4.64981 11.4902 4.64981 12.511 4.02023 13.1406C3.39064 13.7702 2.36989 13.7702 1.7403 13.1406C1.11072 12.511 1.11072 11.4902 1.7403 10.8606C2.36989 10.2311 3.39064 10.2311 4.02023 10.8606Z" fill="#fff"></path><path d="M13.1399 1.74096C13.7695 2.37054 13.7695 3.3913 13.1399 4.02088C12.5103 4.65046 11.4896 4.65046 10.86 4.02088C10.2304 3.3913 10.2304 2.37054 10.86 1.74096C11.4896 1.11138 12.5103 1.11138 13.1399 1.74096Z" fill="#fff"></path><path d="M17.6998 6.3008C18.3293 6.93039 18.3293 7.95114 17.6998 8.58073C17.0702 9.21031 16.0494 9.21031 15.4198 8.58073C14.7903 7.95114 14.7903 6.93039 15.4198 6.3008C16.0494 5.67122 17.0702 5.67122 17.6998 6.3008Z" fill="#fff"></path><path d="M13.1399 10.8606C13.7695 11.4902 13.7695 12.511 13.1399 13.1406C12.5103 13.7702 11.4896 13.7702 10.86 13.1406C10.2304 12.511 10.2304 11.4902 10.86 10.8606C11.4896 10.2311 12.5103 10.2311 13.1399 10.8606Z" fill="#fff"></path><path d="M8.58007 6.3008C9.20965 6.93039 9.20965 7.95114 8.58007 8.58073C7.95049 9.21031 6.92973 9.21031 6.30015 8.58073C5.67056 7.95114 5.67056 6.93039 6.30015 6.3008C6.92973 5.67122 7.95049 5.67122 8.58007 6.3008Z" fill="#fff"></path><path d="M8.58007 15.4205C9.20965 16.0501 9.20965 17.0708 8.58007 17.7004C7.95049 18.33 6.92973 18.33 6.30015 17.7004C5.67056 17.0708 5.67056 16.0501 6.30015 15.4205C6.92973 14.7909 7.95049 14.7909 8.58007 15.4205Z" fill="#fff"></path><path d="M13.1399 19.9803C13.7695 20.6099 13.7695 21.6307 13.1399 22.2603C12.5103 22.8898 11.4896 22.8898 10.86 22.2603C10.2304 21.6307 10.2304 20.6099 10.86 19.9803C11.4896 19.3508 12.5103 19.3508 13.1399 19.9803Z" fill="#fff"></path><path d="M17.6998 15.4205C18.3293 16.0501 18.3293 17.0708 17.6998 17.7004C17.0702 18.33 16.0494 18.33 15.4198 17.7004C14.7903 17.0708 14.7903 16.0501 15.4198 15.4205C16.0494 14.7909 17.0702 14.7909 17.6998 15.4205Z" fill="#fff"></path><path d="M22.2596 10.8606C22.8892 11.4902 22.8892 12.511 22.2596 13.1406C21.63 13.7702 20.6093 13.7702 19.9797 13.1406C19.3501 12.511 19.3501 11.4902 19.9797 10.8606C20.6093 10.2311 21.63 10.2311 22.2596 10.8606Z" fill="#fff"></path></svg>
                        </div>
                      </Link>
                    </div> */}



                    <div className="mt-8 grid grid-cols-4 lg:grid-cols-8 w-full shadow-[inset_0px_0px_25px_rgba(0,0,0)] justify-center items-center sm:divide-x divide-kog-400 border rounded-lg sm:rounded-full border-kog-500 py-2  bg-transparent">
                      {product?.twitter && !product.twitter.startsWith('-') ? (
                        <a href={product.twitter} target="_blank" className="flex justify-center items-center text-2xl px-2 my-[5px] sm:my-0">
                          <div className="rounded-full p-2 shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)] transition-all duration-200 ease-in-out bg-gradient-to-t hover:bg-gradient-to-l from-kog-300 to-kog-500 hover:bg-kog-500 flex justify-center items-center m-auto min-w-[45px] min-h-[45px] hover:min-w-full hover:shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)]">
                            <Icon className={'m-auto text-white'} icon="pajamas:twitter" />
                          </div>
                        </a>
                      ) : (
                        <Tooltip title="d" placement="bottom" className="btn btn-outline-kog-900 bg-kog-100 dark:text-kog-900 dark:hover:bg-kog-900 dark:hover:text-white rounded-full px-4 py-1 shadow-[0px_0px_10px_5px_rgba(0,0,0,0.3)]" arrow allowHTML interactive theme="custom-light" maxWidth="220px" content={<div className="dark:text-slate-300 text-kog-white text-sm">N/A</div>}>
                          <div className="flex justify-center items-center text-2xl px-2 my-[5px] sm:my-0 cursor-not-allowed">
                            <div className="rounded-full p-2 shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)] bg-gradient-to-t from-kog-300 to-kog-500 flex justify-center items-center m-auto min-w-[45px] min-h-[45px]">
                              <Icon className={'m-auto text-white'} icon="pajamas:twitter" />
                            </div>
                          </div>
                        </Tooltip>
                      )}
                      {product?.website && !product.website.startsWith('-') ? (
                        <a href={product.website} target="_blank" className="flex justify-center items-center text-2xl px-2 my-[5px] sm:my-0">
                          <div className="rounded-full p-2 shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)] transition-all duration-200 ease-in-out bg-gradient-to-t hover:bg-gradient-to-l from-kog-300 to-kog-500 hover:bg-kog-500 flex justify-center items-center m-auto min-w-[45px] min-h-[45px] hover:min-w-full hover:shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)]">
                            <Icon className={'m-auto text-white'} icon="streamline:web" />
                          </div>
                        </a>
                      ) : (
                        <Tooltip title="d" placement="bottom" className="btn btn-outline-kog-900 bg-kog-100 dark:text-kog-900 dark:hover:bg-kog-900 dark:hover:text-white rounded-full px-4 py-1 shadow-[0px_0px_10px_5px_rgba(0,0,0,0.3)]" arrow allowHTML interactive theme="custom-light" maxWidth="220px" content={<div className="dark:text-slate-300 text-kog-white text-sm">N/A</div>}>
                          <div className="flex justify-center items-center text-2xl px-2 my-[5px] sm:my-0 cursor-not-allowed">
                            <div className="rounded-full p-2 shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)] bg-gradient-to-t from-kog-300 to-kog-500 flex justify-center items-center m-auto min-w-[45px] min-h-[45px]">
                              <Icon className={'m-auto text-white'} icon="streamline:web" />
                            </div>
                          </div>
                        </Tooltip>
                      )}
                      {product?.github && !product.github.startsWith('-') ? (
                        <a href={product.github} target="_blank" className="flex justify-center items-center text-2xl px-2 my-[5px] sm:my-0">
                          <div className="rounded-full p-2 shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)] transition-all duration-200 ease-in-out bg-gradient-to-t hover:bg-gradient-to-l from-kog-300 to-kog-500 hover:bg-kog-500 flex justify-center items-center m-auto min-w-[45px] min-h-[45px] hover:min-w-full hover:shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)]">
                            <Icon className={'m-auto text-white'} icon="mdi:github" />
                          </div>
                        </a>
                      ) : (
                        <Tooltip title="d" placement="bottom" className="btn btn-outline-kog-900 bg-kog-100 dark:text-kog-900 dark:hover:bg-kog-900 dark:hover:text-white rounded-full px-4 py-1 shadow-[0px_0px_10px_5px_rgba(0,0,0,0.3)]" arrow allowHTML interactive theme="custom-light" maxWidth="220px" content={<div className="dark:text-slate-300 text-kog-white text-sm">N/A</div>}>
                          <div className="flex justify-center items-center text-2xl px-2 my-[5px] sm:my-0 cursor-not-allowed">
                            <div className="rounded-full p-2 shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)] bg-gradient-to-t from-kog-300 to-kog-500 flex justify-center items-center m-auto min-w-[45px] min-h-[45px]">
                              <Icon className={'m-auto text-white'} icon="mdi:github" />
                            </div>
                          </div>
                        </Tooltip>
                      )}

                      {product?.youtube && !product.youtube.startsWith('-') ? (
                        <a href={product.youtube} target="_blank" className="flex justify-center items-center text-2xl px-2 my-[5px] sm:my-0">
                          <div className="rounded-full p-2 shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)] transition-all duration-200 ease-in-out bg-gradient-to-t hover:bg-gradient-to-l from-kog-300 to-kog-500 hover:bg-kog-500 flex justify-center items-center m-auto min-w-[45px] min-h-[45px] hover:min-w-full hover:shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)]">
                            <Icon className={'m-auto text-white'} icon="mdi:youtube" />
                          </div>
                        </a>
                      ) : (
                        <Tooltip title="" placement="bottom" className="btn btn-outline-kog-900 bg-kog-100 dark:text-kog-900 dark:hover:bg-kog-900 dark:hover:text-white rounded-full px-4 py-1 shadow-[0px_0px_10px_5px_rgba(0,0,0,0.3)]" arrow allowHTML interactive theme="custom-light" maxWidth="220px" content={<div className="dark:text-slate-300 text-kog-white text-sm">N/A</div>}>
                          <div className="flex justify-center items-center text-2xl px-2 my-[5px] sm:my-0 cursor-not-allowed">
                            <div className="rounded-full p-2 shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)] bg-gradient-to-t from-kog-300 to-kog-500 flex justify-center items-center m-auto min-w-[45px] min-h-[45px]">
                              <Icon className={'m-auto text-white'} icon="mdi:youtube" />
                            </div>
                          </div>
                        </Tooltip>
                      )}
                      {product?.articles && !product.articles.startsWith('-') ? (
                        <a href={product.articles} target="_blank" className="flex justify-center items-center text-2xl px-2 my-[5px] sm:my-0">
                          <div className="rounded-full p-2 shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)] transition-all duration-200 ease-in-out bg-gradient-to-t hover:bg-gradient-to-l from-kog-300 to-kog-500 hover:bg-kog-500 flex justify-center items-center m-auto min-w-[45px] min-h-[45px] hover:min-w-full hover:shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)]">
                            <Icon className={'m-auto text-white'} icon="akar-icons:medium-fill" />
                          </div>
                        </a>
                      ) : (
                        <Tooltip title="" placement="bottom" className="btn btn-outline-kog-900 bg-kog-100 dark:text-kog-900 dark:hover:bg-kog-900 dark:hover:text-white rounded-full px-4 py-1 shadow-[0px_0px_10px_5px_rgba(0,0,0,0.3)]" arrow allowHTML interactive theme="custom-light" maxWidth="220px" content={<div className="dark:text-slate-300 text-kog-white text-sm">N/A</div>}>
                          <div className="flex justify-center items-center text-2xl px-2 my-[5px] sm:my-0 cursor-not-allowed">
                            <div className="rounded-full p-2 shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)] bg-gradient-to-t from-kog-300 to-kog-500 flex justify-center items-center m-auto min-w-[45px] min-h-[45px]">
                              <Icon className={'m-auto text-white'} icon="akar-icons:medium-fill" />
                            </div>
                          </div>
                        </Tooltip>
                      )}
                      {product?.subLink && !product.subLink.startsWith('-') ? (
                        <a href={product.subLink} target="_blank" className="flex justify-center items-center px-2">
                          <div className="rounded-full p-2 shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)] transition-all duration-200 ease-in-out bg-gradient-to-t hover:bg-gradient-to-l from-kog-300 to-kog-500 hover:bg-kog-500 flex justify-center items-center m-auto min-w-[45px] min-h-[45px] hover:min-w-full hover:shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)]">
                            <svg className="m-auto" width="28" height="28" viewBox="0 0 48 48" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                              <g clip-path="url(#clip0_3485_29957)">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M51.5772 29.0772L24 13.5L-3.57715 29.0772L24 46.1543L51.5772 29.0772ZM41.8764 29.2725L24 19.175L6.12369 29.2725L24 40.3425L41.8764 29.2725Z" fill="#ebeaea" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M24 7.17497L6.12368 17.2725L24 28.3425L41.8763 17.2725L24 7.17497ZM24 1.5L-3.57715 17.0772L24 34.1543L51.5772 17.0772L24 1.5Z" fill="#ebeaea" />
                              </g>
                              <defs>
                                <clipPath id="clip0_3485_29957">
                                  <rect width="48" height="48" fill="#ebeaea" />
                                </clipPath>
                              </defs>
                            </svg>
                          </div>
                        </a>
                      ) : (
                        <Tooltip title="" placement="bottom" className="btn btn-outline-kog-900 bg-kog-100 dark:text-kog-900 dark:hover:bg-kog-900 dark:hover:text-white rounded-full px-4 py-1 shadow-[0px_0px_10px_5px_rgba(0,0,0,0.3)]" arrow allowHTML interactive theme="custom-light" maxWidth="220px" content={<div className="dark:text-slate-300 text-kog-white text-sm">N/A</div>}>
                          <div className="flex justify-center items-center px-2 cursor-not-allowed">
                            <div className="rounded-full p-2 shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)] bg-gradient-to-t from-kog-300 to-kog-500 flex justify-center items-center m-auto min-w-[45px] min-h-[45px]">
                              <svg className="m-auto" width="28" height="28" viewBox="0 0 48 48" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_3485_29957)">
                                  <path fill-rule="evenodd" clip-rule="evenodd" d="M51.5772 29.0772L24 13.5L-3.57715 29.0772L24 46.1543L51.5772 29.0772ZM41.8764 29.2725L24 19.175L6.12369 29.2725L24 40.3425L41.8764 29.2725Z" fill="#ebeaea" />
                                  <path fill-rule="evenodd" clip-rule="evenodd" d="M24 7.17497L6.12368 17.2725L24 28.3425L41.8763 17.2725L24 7.17497ZM24 1.5L-3.57715 17.0772L24 34.1543L51.5772 17.0772L24 1.5Z" fill="#ebeaea" />
                                </g>
                                <defs>
                                  <clipPath id="clip0_3485_29957">
                                    <rect width="48" height="48" fill="#ebeaea" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                          </div>
                        </Tooltip>
                      )}
                      {product?.paLink && !product.paLink.startsWith('-') ? (
                        <a href={product.paLink} target="_blank" className="flex justify-center items-center px-2">
                          <div className="rounded-full p-2 shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)] transition-all duration-200 ease-in-out bg-gradient-to-t hover:bg-gradient-to-l from-kog-300 to-kog-500 hover:bg-kog-500 flex justify-center items-center m-auto min-w-[45px] min-h-[45px] hover:min-w-full hover:shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)]">
                            <svg className="m-auto" width="28" height="28" viewBox="0 0 39 40" fill="#fff" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_8997_79043)"><path d="M6.09501 24.9033C6.90889 27.5289 8.33317 29.8097 10.2706 31.7368C12.553 34.0176 15.2777 35.5293 18.427 36.2719C19.7805 36.5901 21.1518 36.7669 22.5318 36.7404C24.9557 36.6962 27.2735 36.1746 29.4852 35.158C31.4314 34.2651 33.1299 33.0364 34.6073 31.4981C34.8196 31.2771 34.9434 31.2418 35.1911 31.4805C35.8015 32.0728 36.4385 32.6385 37.0666 33.2043C37.2524 33.3634 37.2612 33.4607 37.0843 33.6552C34.0676 36.82 30.4052 38.7914 26.1235 39.6489C24.4073 39.9936 22.6645 40.0644 20.9306 39.9494C18.4978 39.7903 16.1535 39.1892 13.9242 38.1725C11.6329 37.1382 9.60707 35.7238 7.86431 33.9381C5.66153 31.6838 3.99839 29.0759 3.04297 26.0526C3.61799 25.7166 4.26379 25.6017 4.88304 25.3719C5.28998 25.2216 5.72346 25.1243 6.10386 24.9033H6.09501Z" fill="#ebeaea"></path><path d="M16.4719 30.3222C13.2164 28.4481 11.1375 25.69 10.4121 22.0036C9.79281 18.883 10.3325 15.9303 12.0398 13.2252C13.756 10.5201 16.1711 8.74319 19.2763 7.91221C19.3293 7.89453 19.3824 7.90337 19.4355 7.89453C19.5859 8.00945 19.6124 8.1951 19.6567 8.36306C19.8247 9.01724 19.984 9.68026 20.1255 10.3433C20.1786 10.582 20.2582 10.8118 20.4086 11.0151C19.2497 11.245 18.1881 11.7047 17.2416 12.3942C14.9946 14.0473 13.6676 16.2397 13.4818 19.0598C13.2872 21.871 14.2603 24.2313 16.2773 26.1762C16.7992 26.6801 17.392 27.1044 18.0201 27.4668C18.0201 27.7497 17.8254 27.9442 17.6927 28.1652C17.2681 28.8813 16.9231 29.6415 16.4631 30.3311L16.4719 30.3222Z" fill="#ebeaea"></path><path d="M12.5088 6.72766C14.6851 5.10105 17.1179 4.0579 19.8072 3.62473C21.9127 3.27996 24.0093 3.38604 26.0794 3.87226C28.521 4.44687 30.7061 5.53422 32.6523 7.12547C33.3866 7.72661 34.0589 8.38962 34.6782 9.10568C34.8551 9.30901 34.802 9.40625 34.6162 9.55654C33.9174 10.1135 33.2273 10.6792 32.5639 11.2627C32.3427 11.4572 32.2631 11.3069 32.1392 11.1831C31.29 10.2638 30.3876 9.41509 29.3172 8.74323C27.6452 7.69124 25.8317 7.03707 23.8677 6.81606C20.4442 6.42709 17.3567 7.29343 14.5612 9.29133C14.287 9.18525 14.1897 8.9112 14.0216 8.69903C13.5173 8.04485 13.0662 7.34647 12.5 6.7365L12.5088 6.72766Z" fill="#ebeaea"></path><path d="M12.5068 6.72695C12.6749 6.68275 12.7456 6.80651 12.8252 6.92143C13.4003 7.70822 13.9841 8.495 14.5592 9.28178C13.0287 10.4752 11.7548 11.8897 10.8613 13.6223C9.23357 16.7518 8.93278 20.0227 9.89705 23.4173C9.94128 23.5588 9.96782 23.7091 10.0032 23.8505C9.81743 24.0273 9.56089 24.045 9.33088 24.1246C8.54354 24.4074 7.73851 24.6285 6.96886 24.9379C6.22576 22.8869 5.96036 20.7653 6.11075 18.5906C6.3673 14.8511 7.77389 11.5891 10.2598 8.78673C10.9321 8.02647 11.6929 7.35461 12.4979 6.73579L12.5068 6.72695Z" fill="#ebeaea"></path><path d="M6.96917 24.9291C6.98686 24.8231 7.03994 24.77 7.1461 24.7347C8.03075 24.4429 8.9154 24.1424 9.8089 23.8506C9.87082 23.833 9.94159 23.8506 10.0124 23.8418C10.4812 25.0352 11.012 26.1845 11.7817 27.2188C14.3118 30.6223 17.7 32.4345 21.9374 32.6378C22.2294 32.6555 22.3444 32.7086 22.3355 33.0268C22.3178 33.8755 22.3267 34.7241 22.3444 35.5816C22.3444 35.8645 22.2559 35.9264 21.9905 35.9264C15.3822 35.7761 9.55235 31.6831 7.16379 25.5214C7.09302 25.3358 6.96032 25.159 6.96917 24.9468V24.9291Z" fill="#ebeaea"></path><path d="M3.95416 11.006C4.69727 9.32639 5.71461 7.8147 6.90889 6.43563C9.64246 3.27966 13.0218 1.14916 17.047 0.0352855C17.3743 -0.053117 17.4716 0.0176049 17.5424 0.327014C17.7105 1.10496 17.8962 1.87406 18.1174 2.63432C18.2147 2.98793 18.1705 3.13821 17.7901 3.23546C15.4458 3.85427 13.3491 4.9593 11.4825 6.49751C9.51861 8.12411 7.97932 10.0778 6.90004 12.3851C6.88235 12.4205 6.85581 12.4558 6.82927 12.4824C6.21886 12.0403 5.49345 11.8105 4.82112 11.4834C4.52034 11.3331 4.17532 11.2536 3.94531 10.9884L3.95416 11.006Z" fill="#fff"></path><path d="M3.95252 11.0059C4.84601 11.4125 5.73066 11.8192 6.62416 12.217C6.74801 12.27 6.81878 12.3673 6.83647 12.491C5.79259 14.8248 5.23526 17.2559 5.2618 19.8107C5.27949 21.5434 5.56258 23.2408 6.09337 24.8939C6.09337 25.0088 6.04029 25.1061 5.91644 25.1414C4.95217 25.4243 4.01444 25.8133 3.04133 26.052C1.41357 20.9777 1.69666 16.0094 3.8729 11.1473C3.89944 11.0943 3.92598 11.0501 3.95252 11.0059Z" fill="#ebeaea"></path><path d="M16.4698 30.3218C16.4521 30.0389 16.6556 29.8444 16.7794 29.6234C17.1864 28.8985 17.5402 28.1382 18.0179 27.4575C20.6807 28.8366 23.3877 28.9427 26.1302 27.7051C26.6698 27.4575 27.174 27.157 27.6341 26.7857C27.8198 26.6354 27.9172 26.6619 28.0587 26.8476C28.5895 27.5283 29.1291 28.209 29.6776 28.8631C29.8722 29.1018 29.8634 29.2168 29.6157 29.4024C26.4929 31.6567 23.0604 32.3374 19.3184 31.4533C18.3099 31.2146 17.3633 30.8257 16.4609 30.3218H16.4698Z" fill="#ebeaea"></path><path d="M20.4067 11.0061C20.1944 11.015 20.1413 10.8647 20.1059 10.6967C19.8848 9.75967 19.6548 8.8226 19.4336 7.88554C21.6187 7.31092 23.7861 7.417 25.9446 8.04466C26.3073 8.15075 26.3516 8.28335 26.2189 8.61044C25.9181 9.3707 25.6527 10.1486 25.3961 10.9266C25.3077 11.1918 25.2104 11.2537 24.9361 11.1653C23.6622 10.7675 22.3618 10.6791 21.0437 10.8559C20.8313 10.8824 20.6367 11.0238 20.4156 10.9885L20.4067 11.0061Z" fill="#ebeaea"></path></g><defs><clipPath id="clip0_8997_79043"><rect width="39" height="40" fill="white"></rect></clipPath></defs></svg>
                          </div>
                        </a>
                      ) : (
                        <Tooltip title="" placement="bottom" className="btn btn-outline-kog-900 bg-kog-100 dark:text-kog-900 dark:hover:bg-kog-900 dark:hover:text-white rounded-full px-4 py-1 shadow-[0px_0px_10px_5px_rgba(0,0,0,0.3)]" arrow allowHTML interactive theme="custom-light" maxWidth="220px" content={<div className="dark:text-slate-300 text-kog-white text-sm">N/A</div>}>
                          <div className="flex justify-center items-center px-2 cursor-not-allowed">
                            <div className="rounded-full p-2 shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)] bg-gradient-to-t from-kog-300 to-kog-500 flex justify-center items-center m-auto min-w-[45px] min-h-[45px]">
                              <svg className="m-auto" width="28" height="28" viewBox="0 0 39 40" fill="#fff" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_8997_79043)"><path d="M6.09501 24.9033C6.90889 27.5289 8.33317 29.8097 10.2706 31.7368C12.553 34.0176 15.2777 35.5293 18.427 36.2719C19.7805 36.5901 21.1518 36.7669 22.5318 36.7404C24.9557 36.6962 27.2735 36.1746 29.4852 35.158C31.4314 34.2651 33.1299 33.0364 34.6073 31.4981C34.8196 31.2771 34.9434 31.2418 35.1911 31.4805C35.8015 32.0728 36.4385 32.6385 37.0666 33.2043C37.2524 33.3634 37.2612 33.4607 37.0843 33.6552C34.0676 36.82 30.4052 38.7914 26.1235 39.6489C24.4073 39.9936 22.6645 40.0644 20.9306 39.9494C18.4978 39.7903 16.1535 39.1892 13.9242 38.1725C11.6329 37.1382 9.60707 35.7238 7.86431 33.9381C5.66153 31.6838 3.99839 29.0759 3.04297 26.0526C3.61799 25.7166 4.26379 25.6017 4.88304 25.3719C5.28998 25.2216 5.72346 25.1243 6.10386 24.9033H6.09501Z" fill="#ebeaea"></path><path d="M16.4719 30.3222C13.2164 28.4481 11.1375 25.69 10.4121 22.0036C9.79281 18.883 10.3325 15.9303 12.0398 13.2252C13.756 10.5201 16.1711 8.74319 19.2763 7.91221C19.3293 7.89453 19.3824 7.90337 19.4355 7.89453C19.5859 8.00945 19.6124 8.1951 19.6567 8.36306C19.8247 9.01724 19.984 9.68026 20.1255 10.3433C20.1786 10.582 20.2582 10.8118 20.4086 11.0151C19.2497 11.245 18.1881 11.7047 17.2416 12.3942C14.9946 14.0473 13.6676 16.2397 13.4818 19.0598C13.2872 21.871 14.2603 24.2313 16.2773 26.1762C16.7992 26.6801 17.392 27.1044 18.0201 27.4668C18.0201 27.7497 17.8254 27.9442 17.6927 28.1652C17.2681 28.8813 16.9231 29.6415 16.4631 30.3311L16.4719 30.3222Z" fill="#ebeaea"></path><path d="M12.5088 6.72766C14.6851 5.10105 17.1179 4.0579 19.8072 3.62473C21.9127 3.27996 24.0093 3.38604 26.0794 3.87226C28.521 4.44687 30.7061 5.53422 32.6523 7.12547C33.3866 7.72661 34.0589 8.38962 34.6782 9.10568C34.8551 9.30901 34.802 9.40625 34.6162 9.55654C33.9174 10.1135 33.2273 10.6792 32.5639 11.2627C32.3427 11.4572 32.2631 11.3069 32.1392 11.1831C31.29 10.2638 30.3876 9.41509 29.3172 8.74323C27.6452 7.69124 25.8317 7.03707 23.8677 6.81606C20.4442 6.42709 17.3567 7.29343 14.5612 9.29133C14.287 9.18525 14.1897 8.9112 14.0216 8.69903C13.5173 8.04485 13.0662 7.34647 12.5 6.7365L12.5088 6.72766Z" fill="#ebeaea"></path><path d="M12.5068 6.72695C12.6749 6.68275 12.7456 6.80651 12.8252 6.92143C13.4003 7.70822 13.9841 8.495 14.5592 9.28178C13.0287 10.4752 11.7548 11.8897 10.8613 13.6223C9.23357 16.7518 8.93278 20.0227 9.89705 23.4173C9.94128 23.5588 9.96782 23.7091 10.0032 23.8505C9.81743 24.0273 9.56089 24.045 9.33088 24.1246C8.54354 24.4074 7.73851 24.6285 6.96886 24.9379C6.22576 22.8869 5.96036 20.7653 6.11075 18.5906C6.3673 14.8511 7.77389 11.5891 10.2598 8.78673C10.9321 8.02647 11.6929 7.35461 12.4979 6.73579L12.5068 6.72695Z" fill="#ebeaea"></path><path d="M6.96917 24.9291C6.98686 24.8231 7.03994 24.77 7.1461 24.7347C8.03075 24.4429 8.9154 24.1424 9.8089 23.8506C9.87082 23.833 9.94159 23.8506 10.0124 23.8418C10.4812 25.0352 11.012 26.1845 11.7817 27.2188C14.3118 30.6223 17.7 32.4345 21.9374 32.6378C22.2294 32.6555 22.3444 32.7086 22.3355 33.0268C22.3178 33.8755 22.3267 34.7241 22.3444 35.5816C22.3444 35.8645 22.2559 35.9264 21.9905 35.9264C15.3822 35.7761 9.55235 31.6831 7.16379 25.5214C7.09302 25.3358 6.96032 25.159 6.96917 24.9468V24.9291Z" fill="#ebeaea"></path><path d="M3.95416 11.006C4.69727 9.32639 5.71461 7.8147 6.90889 6.43563C9.64246 3.27966 13.0218 1.14916 17.047 0.0352855C17.3743 -0.053117 17.4716 0.0176049 17.5424 0.327014C17.7105 1.10496 17.8962 1.87406 18.1174 2.63432C18.2147 2.98793 18.1705 3.13821 17.7901 3.23546C15.4458 3.85427 13.3491 4.9593 11.4825 6.49751C9.51861 8.12411 7.97932 10.0778 6.90004 12.3851C6.88235 12.4205 6.85581 12.4558 6.82927 12.4824C6.21886 12.0403 5.49345 11.8105 4.82112 11.4834C4.52034 11.3331 4.17532 11.2536 3.94531 10.9884L3.95416 11.006Z" fill="#fff"></path><path d="M3.95252 11.0059C4.84601 11.4125 5.73066 11.8192 6.62416 12.217C6.74801 12.27 6.81878 12.3673 6.83647 12.491C5.79259 14.8248 5.23526 17.2559 5.2618 19.8107C5.27949 21.5434 5.56258 23.2408 6.09337 24.8939C6.09337 25.0088 6.04029 25.1061 5.91644 25.1414C4.95217 25.4243 4.01444 25.8133 3.04133 26.052C1.41357 20.9777 1.69666 16.0094 3.8729 11.1473C3.89944 11.0943 3.92598 11.0501 3.95252 11.0059Z" fill="#ebeaea"></path><path d="M16.4698 30.3218C16.4521 30.0389 16.6556 29.8444 16.7794 29.6234C17.1864 28.8985 17.5402 28.1382 18.0179 27.4575C20.6807 28.8366 23.3877 28.9427 26.1302 27.7051C26.6698 27.4575 27.174 27.157 27.6341 26.7857C27.8198 26.6354 27.9172 26.6619 28.0587 26.8476C28.5895 27.5283 29.1291 28.209 29.6776 28.8631C29.8722 29.1018 29.8634 29.2168 29.6157 29.4024C26.4929 31.6567 23.0604 32.3374 19.3184 31.4533C18.3099 31.2146 17.3633 30.8257 16.4609 30.3218H16.4698Z" fill="#ebeaea"></path><path d="M20.4067 11.0061C20.1944 11.015 20.1413 10.8647 20.1059 10.6967C19.8848 9.75967 19.6548 8.8226 19.4336 7.88554C21.6187 7.31092 23.7861 7.417 25.9446 8.04466C26.3073 8.15075 26.3516 8.28335 26.2189 8.61044C25.9181 9.3707 25.6527 10.1486 25.3961 10.9266C25.3077 11.1918 25.2104 11.2537 24.9361 11.1653C23.6622 10.7675 22.3618 10.6791 21.0437 10.8559C20.8313 10.8824 20.6367 11.0238 20.4156 10.9885L20.4067 11.0061Z" fill="#ebeaea"></path></g><defs><clipPath id="clip0_8997_79043"><rect width="39" height="40" fill="white"></rect></clipPath></defs></svg>
                            </div>
                          </div>
                        </Tooltip>
                      )}
                      {product?.scanLink && !product.scanLink.startsWith('-') ? (
                        <a href={product.scanLink} target="_blank" className="flex justify-center items-center px-2">
                          <div className="rounded-full p-2 shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)] transition-all duration-200 ease-in-out bg-gradient-to-t hover:bg-gradient-to-l from-kog-300 to-kog-500 hover:bg-kog-500 flex justify-center items-center m-auto min-w-[45px] min-h-[45px] hover:min-w-full hover:shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)]">
                            <svg className="m-auto" width="29" height="29" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg"><path opacity="0.4" d="M10.86 1.74096C11.4896 1.11138 12.5103 1.11138 13.1399 1.74096C13.7695 2.37054 13.7695 3.3913 13.1399 4.02088L5.54017 11.6206C5.33031 11.8305 5.33031 12.1707 5.54017 12.3806L7.06012 13.9005C7.26998 14.1104 7.61024 14.1104 7.8201 13.9005L15.4198 6.3008C16.0494 5.67122 17.0702 5.67122 17.6998 6.3008L22.3632 10.9643C22.9356 11.5366 22.9356 12.4646 22.3632 13.0369L13.1399 22.2603C12.5103 22.8898 11.4896 22.8898 10.86 22.2603C10.2304 21.6307 10.2304 20.6099 10.86 19.9803L18.4597 12.3806C18.6696 12.1707 18.6696 11.8305 18.4597 11.6206L16.9398 10.1007C16.7299 9.89081 16.3897 9.89081 16.1798 10.1007L8.58007 17.7004C7.95049 18.33 6.92973 18.33 6.30015 17.7004L1.63667 13.0369C1.06432 12.4646 1.06432 11.5366 1.63667 10.9643L10.86 1.74096Z" fill="#fff"></path><path d="M4.02023 10.8606C4.64981 11.4902 4.64981 12.511 4.02023 13.1406C3.39064 13.7702 2.36989 13.7702 1.7403 13.1406C1.11072 12.511 1.11072 11.4902 1.7403 10.8606C2.36989 10.2311 3.39064 10.2311 4.02023 10.8606Z" fill="#fff"></path><path d="M13.1399 1.74096C13.7695 2.37054 13.7695 3.3913 13.1399 4.02088C12.5103 4.65046 11.4896 4.65046 10.86 4.02088C10.2304 3.3913 10.2304 2.37054 10.86 1.74096C11.4896 1.11138 12.5103 1.11138 13.1399 1.74096Z" fill="#fff"></path><path d="M17.6998 6.3008C18.3293 6.93039 18.3293 7.95114 17.6998 8.58073C17.0702 9.21031 16.0494 9.21031 15.4198 8.58073C14.7903 7.95114 14.7903 6.93039 15.4198 6.3008C16.0494 5.67122 17.0702 5.67122 17.6998 6.3008Z" fill="#fff"></path><path d="M13.1399 10.8606C13.7695 11.4902 13.7695 12.511 13.1399 13.1406C12.5103 13.7702 11.4896 13.7702 10.86 13.1406C10.2304 12.511 10.2304 11.4902 10.86 10.8606C11.4896 10.2311 12.5103 10.2311 13.1399 10.8606Z" fill="#fff"></path><path d="M8.58007 6.3008C9.20965 6.93039 9.20965 7.95114 8.58007 8.58073C7.95049 9.21031 6.92973 9.21031 6.30015 8.58073C5.67056 7.95114 5.67056 6.93039 6.30015 6.3008C6.92973 5.67122 7.95049 5.67122 8.58007 6.3008Z" fill="#fff"></path><path d="M8.58007 15.4205C9.20965 16.0501 9.20965 17.0708 8.58007 17.7004C7.95049 18.33 6.92973 18.33 6.30015 17.7004C5.67056 17.0708 5.67056 16.0501 6.30015 15.4205C6.92973 14.7909 7.95049 14.7909 8.58007 15.4205Z" fill="#fff"></path><path d="M13.1399 19.9803C13.7695 20.6099 13.7695 21.6307 13.1399 22.2603C12.5103 22.8898 11.4896 22.8898 10.86 22.2603C10.2304 21.6307 10.2304 20.6099 10.86 19.9803C11.4896 19.3508 12.5103 19.3508 13.1399 19.9803Z" fill="#fff"></path><path d="M17.6998 15.4205C18.3293 16.0501 18.3293 17.0708 17.6998 17.7004C17.0702 18.33 16.0494 18.33 15.4198 17.7004C14.7903 17.0708 14.7903 16.0501 15.4198 15.4205C16.0494 14.7909 17.0702 14.7909 17.6998 15.4205Z" fill="#fff"></path><path d="M22.2596 10.8606C22.8892 11.4902 22.8892 12.511 22.2596 13.1406C21.63 13.7702 20.6093 13.7702 19.9797 13.1406C19.3501 12.511 19.3501 11.4902 19.9797 10.8606C20.6093 10.2311 21.63 10.2311 22.2596 10.8606Z" fill="#fff"></path></svg>
                          </div>
                        </a>
                      ) : (
                        <Tooltip title="" placement="bottom" className="btn btn-outline-kog-900 bg-kog-100 dark:text-kog-900 dark:hover:bg-kog-900 dark:hover:text-white rounded-full px-4 py-1 shadow-[0px_0px_10px_5px_rgba(0,0,0,0.3)]" arrow allowHTML interactive theme="custom-light" maxWidth="220px" content={<div className="dark:text-slate-300 text-kog-white text-sm">N/A</div>}>
                          <div className="flex justify-center items-center px-2 cursor-not-allowed">
                            <div className="rounded-full p-2 shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)] bg-gradient-to-t from-kog-300 to-kog-500 flex justify-center items-center m-auto min-w-[45px] min-h-[45px]">
                              <svg className="m-auto" width="29" height="29" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg"><path opacity="0.4" d="M10.86 1.74096C11.4896 1.11138 12.5103 1.11138 13.1399 1.74096C13.7695 2.37054 13.7695 3.3913 13.1399 4.02088L5.54017 11.6206C5.33031 11.8305 5.33031 12.1707 5.54017 12.3806L7.06012 13.9005C7.26998 14.1104 7.61024 14.1104 7.8201 13.9005L15.4198 6.3008C16.0494 5.67122 17.0702 5.67122 17.6998 6.3008L22.3632 10.9643C22.9356 11.5366 22.9356 12.4646 22.3632 13.0369L13.1399 22.2603C12.5103 22.8898 11.4896 22.8898 10.86 22.2603C10.2304 21.6307 10.2304 20.6099 10.86 19.9803L18.4597 12.3806C18.6696 12.1707 18.6696 11.8305 18.4597 11.6206L16.9398 10.1007C16.7299 9.89081 16.3897 9.89081 16.1798 10.1007L8.58007 17.7004C7.95049 18.33 6.92973 18.33 6.30015 17.7004L1.63667 13.0369C1.06432 12.4646 1.06432 11.5366 1.63667 10.9643L10.86 1.74096Z" fill="#fff"></path><path d="M4.02023 10.8606C4.64981 11.4902 4.64981 12.511 4.02023 13.1406C3.39064 13.7702 2.36989 13.7702 1.7403 13.1406C1.11072 12.511 1.11072 11.4902 1.7403 10.8606C2.36989 10.2311 3.39064 10.2311 4.02023 10.8606Z" fill="#fff"></path><path d="M13.1399 1.74096C13.7695 2.37054 13.7695 3.3913 13.1399 4.02088C12.5103 4.65046 11.4896 4.65046 10.86 4.02088C10.2304 3.3913 10.2304 2.37054 10.86 1.74096C11.4896 1.11138 12.5103 1.11138 13.1399 1.74096Z" fill="#fff"></path><path d="M17.6998 6.3008C18.3293 6.93039 18.3293 7.95114 17.6998 8.58073C17.0702 9.21031 16.0494 9.21031 15.4198 8.58073C14.7903 7.95114 14.7903 6.93039 15.4198 6.3008C16.0494 5.67122 17.0702 5.67122 17.6998 6.3008Z" fill="#fff"></path><path d="M13.1399 10.8606C13.7695 11.4902 13.7695 12.511 13.1399 13.1406C12.5103 13.7702 11.4896 13.7702 10.86 13.1406C10.2304 12.511 10.2304 11.4902 10.86 10.8606C11.4896 10.2311 12.5103 10.2311 13.1399 10.8606Z" fill="#fff"></path><path d="M8.58007 6.3008C9.20965 6.93039 9.20965 7.95114 8.58007 8.58073C7.95049 9.21031 6.92973 9.21031 6.30015 8.58073C5.67056 7.95114 5.67056 6.93039 6.30015 6.3008C6.92973 5.67122 7.95049 5.67122 8.58007 6.3008Z" fill="#fff"></path><path d="M8.58007 15.4205C9.20965 16.0501 9.20965 17.0708 8.58007 17.7004C7.95049 18.33 6.92973 18.33 6.30015 17.7004C5.67056 17.0708 5.67056 16.0501 6.30015 15.4205C6.92973 14.7909 7.95049 14.7909 8.58007 15.4205Z" fill="#fff"></path><path d="M13.1399 19.9803C13.7695 20.6099 13.7695 21.6307 13.1399 22.2603C12.5103 22.8898 11.4896 22.8898 10.86 22.2603C10.2304 21.6307 10.2304 20.6099 10.86 19.9803C11.4896 19.3508 12.5103 19.3508 13.1399 19.9803Z" fill="#fff"></path><path d="M17.6998 15.4205C18.3293 16.0501 18.3293 17.0708 17.6998 17.7004C17.0702 18.33 16.0494 18.33 15.4198 17.7004C14.7903 17.0708 14.7903 16.0501 15.4198 15.4205C16.0494 14.7909 17.0702 14.7909 17.6998 15.4205Z" fill="#fff"></path><path d="M22.2596 10.8606C22.8892 11.4902 22.8892 12.511 22.2596 13.1406C21.63 13.7702 20.6093 13.7702 19.9797 13.1406C19.3501 12.511 19.3501 11.4902 19.9797 10.8606C20.6093 10.2311 21.63 10.2311 22.2596 10.8606Z" fill="#fff"></path></svg>
                            </div>
                          </div>
                        </Tooltip>
                      )}

                    </div>



                    <div class="divide-y divide-solid divide-kog-300 text-lg">
                      <div class="py-4"></div>
                      <div class="py-4 flex justify-between items-center">
                        <div className="text-white font-semibold">
                        <span className="text-kog-900 ">REQUESTED:</span> {formattedNumber} <span className="">{containsUSD ? 'USDT' : 'DOT'}</span>

                          {/* <span className="text-kog-900 ">REQUESTED:</span> {product?.reqDot} <span className="">DOT</span> */}
                        </div>

                        {product?.propLink && !product.propLink.startsWith('-') ? (

                          <Link target="_blank" to={product?.propLink}><Icon className="text-2xl text-kog-dot font-bold" icon="heroicons:book-open" /></Link>
                        ) : (
                          <Tooltip title="d" placement="bottom" className="btn btn-outline-kog-900 bg-kog-100 dark:text-kog-900 dark:hover:bg-kog-900 dark:hover:text-white rounded-full px-4 py-1 shadow-[0px_0px_10px_5px_rgba(0,0,0,0.3)]" arrow allowHTML interactive theme="custom-light" maxWidth="220px" content={<div className="dark:text-slate-300 text-kog-white text-sm">N/A</div>}>
                            <div className="flex justify-center items-center text-2xl px-2 my-[5px] sm:my-0 cursor-not-allowed">

                              <Icon className="text-2xl text-kog-dot font-bold" icon="heroicons:book-open" />

                            </div>
                          </Tooltip>
                        )}

                        {/* <Link target="_blank" to={product?.propLink}><Icon className="text-2xl text-kog-dot font-bold" icon="heroicons:book-open" /></Link> */}
                      </div>



                      <div class="py-4 text-white font-semibold"><span className="text-kog-900">PROPOSER:</span> {product?.proposer}</div>
                      <div class="flex py-4 text-white font-semibold"><span className="text-kog-900">BENEFICIARY:  </span>







                        {product?.scanLink && !product.scanLink.startsWith('-') ? (


                          <Link target="_blank" to={product?.scanLink} className="text-blue-400 truncate"> {product?.benAdd}</Link>


                        ) : (
                          // <Tooltip title="d" placement="bottom" className="btn btn-outline-kog-900 bg-kog-100 dark:text-kog-900 dark:hover:bg-kog-900 dark:hover:text-white rounded-full px-4 py-1 shadow-[0px_0px_10px_5px_rgba(0,0,0,0.3)]" arrow allowHTML interactive theme="custom-light" maxWidth="220px" content={<div className="dark:text-slate-300 text-kog-white text-sm">Address N/A</div>}>
                          <span className="truncate">

                            {product?.benAdd}


                          </span>
                          // </Tooltip>
                        )}

                        {/* <Link target="_blank" to={product?.propLink}><Icon className="text-2xl text-kog-dot font-bold" icon="heroicons:book-open" /></Link> */}


                        {/* <Link target="_blank" to={subscanLink + product?.benAdd} className="text-blue-400"> {product?.benAdd.substring(0, 25) + "..."}</Link> */}
                      </div>
                      <div class="py-4"></div>
                    </div>
                    <div className="mb-[-5px] text-center  flex items-center">
                      <div className="m-auto ">



                        <div className="py-8">
                          {product?.category === "Bounty" ?

                            <Tooltip
                              title="OGT Review"
                              placement={isMobile ? "top" : "right"}
                              className="btn btn-outline-kog-900  bg-kog-100 text-kog-900 hover:bg-kog-900 hover:text-white  rounded-full px-6 border border-kog-500 shadow-[0px_1px_10px_3px_rgba(254,0,188,0.2)]"
                              arrow
                              allowHTML
                              interactive
                              theme="custom-light"
                              maxWidth="320px"
                              content={tooltipContent}
                            // content={
                            //   <div className=" text-kog-white text-sm">


                            //     <Icon icon="svg-spinners:blocks-shuffle-3" className="text-3xl" />
                            //   </div>
                            // }
                            />

                            :

                            <Tooltip
                              title="OGT Review"
                              placement={isMobile ? "top" : "right"}
                              className={buttonClassName}
                              arrow
                              allowHTML
                              interactive
                              theme="custom-light"
                              maxWidth="320px"
                              content={tooltipContent}
                            // content={
                            //   <div className=" text-kog-white text-sm">

                            //     <Icon icon="svg-spinners:blocks-shuffle-3" className="text-3xl" />
                            //   </div>
                            // }
                            />

                          }
                          {/* 
                          <Tooltip
                            title="OGT Review"
                            placement="right"
                            className="btn btn-outline-kog-900  bg-kog-100 text-kog-900 hover:bg-kog-900 hover:text-white rounded-full px-6  shadow-[0px_0px_10px_5px_rgba(0,0,0,0.3)]"
                            arrow
                            allowHTML
                            interactive
                            theme="custom-light"
                            maxWidth="320px"
                            content={
                              <div className="dark:text-slate-300 text-kog-white text-sm">
                            

                                <Icon icon="svg-spinners:blocks-shuffle-3" className="text-3xl" />
                              </div>
                            }
                          /> */}
                        </div>
                      </div>



                    </div>


                  </div>

                  <div className="px-4 flex flex-col justify-between h-full">
                    <div class="flex justify-between items-center mb-4 sm:mb-8 sm:px-8">
                      <h2 className="text-kog-900 dark:text-kog-900 text-2xl font-semibold mt-2">
                        SUMMARY
                      </h2>
                      <span className="align-middle border border-kog-300 text-white px-3 py-1 rounded-3xl mx-1 p-2 shadow-[0px_0px_10px_2px_rgba(0,0,0,0.4)] transition-all duration-200 ease-in-out bg-gradient-to-t from-kog-100 to-kog-300 ">
                        {product?.category}
                      </span>
                    </div>

                    <p className="text-lg text-white px-4 sm:px-8 py-4 rounded-lg shadow-[0px_0px_10px_3px_rgba(0,0,0,0.3)]">
                      {product?.summary}
                    </p>

                    {/* Adjustments start here: Place the tooltip trigger (button) at the bottom-right */}
                    {product?.track != "smallTipper" || product?.track != "bigTipper" || product?.track != "root" || product?.track != "referendumCanceller" || product?.track != "auctionAdmin" || product?.track != "generalAdmin" || product?.track != "fellowshipAdmin" || product?.track != "leaseAdmin" || product?.track != "stakingAdmin" || product?.track != "whitelistedCaller" ? (

                      <div className="mt-5 sm:mt-auto self-center sm:self-end mr-3 mb-[-5px]"> {/* This div ensures the button is pushed to the bottom-right */}
                        <Tooltip
                          title={<ProductRankDisplay products={products} refNum={product?.refNum} />}
                          placement={isMobile ? "top" : "left"}
                          className="btn btn-outline-kog-900 bg-kog-100 border border-kog-500 text-kog-900 hover:bg-kog-900 hover:text-white rounded-full px-4 py-1 shadow-[0px_1px_10px_3px_rgba(254,0,188,0.2)]"
                          arrow
                          allowHTML
                          interactive
                          theme="custom-light"
                          maxWidth="220px"
                          content={
                            <div className=" text-kog-white text-sm bg-kog-500">
                              Rank is determined based on the DOT requested amount for each track
                            </div>
                          }
                        />
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>






                  {/* <ul className="space-y-3 p-6 lg:ml-28 ml-14 rounded-md bg-slate-white dark:bg-kog-50">
                      {lists.map((item, i) => (
                        <li
                          key={i}
                          className="text-sm lg:text-base text-kog-white dark:text-slate-400 flex space-x-2 items-center rtl:space-x-reverse"
                        >
                          <span className="h-[10px] w-[10px] bg-slate-900 dark:bg-slate-400 rounded-full inline-block"></span>
                          <span>Lorem ipsum dolor sit amet.</span>
                        </li>
                      ))}
                    </ul> */}
                </div>
              </Tab.Panel>
              {/* Progress */}
              <Tab.Panel>

                

                <div>
                  {/* || product?.category === "bounty" */}
                  {product?.track === "smallTipper" || product?.track === "bigTipper" || product?.track === "root" || product?.track === "referendumCanceller" || product?.track === "auctionAdmin" || product?.track === "generalAdmin" || product?.track === "fellowshipAdmin" || product?.track === "leaseAdmin" || product?.track === "stakingAdmin" || product?.track === "treasurer" || product?.category === "Bounty" || product?.track === "whitelistedCaller" ? (
                    <div>
                      {/* <MovingShapes />      

                      <div class="container">
                      <p className="text-center ">This page is so transparent, it's invisible!</p>
                        <div class="upperpart" >
                          
                          <div class="first">
                            <div class="line"></div>
                            <div class="ball"></div>
                          </div>
                          <div class="second">
                            <div class="line"></div>
                            <div class="ball"></div>
                          </div>
                          <div class="third">
                            <div class="line"></div>
                            <div class="ball"></div>
                          </div>
                          <div class="fourth">
                            <div class="line"></div>
                            <div class="ball"></div>
                          </div>
                          <div class="fifth">
                            <div class="line"></div>
                            <div class="ball"></div>
                          </div>
                        </div>
                      </div> */}

                      {/* <p className="text-center ">This page is so transparent, it's invisible!</p> */}

                      {/* animate-spin-slow */}
                      <div className="opacity-80  my-10 min-h-[60vh] bg-no-repeat bg-center flex items-center justify-center overflow-hidden relative ">
                        {/* <AnimatedBackground /> */}
                        {product?.category === "Bounty" ?
                          <>
                            <div className="flex justify-center items-center absolute max-w-2xl center text-center text-white rounded  hover:bg-kog-500 hover:bg-opacity-20 hover:shadow-[0px_0px_5px_5px_rgba(241,26,230,0.3)] ">
                              <Card className="m-auto">
                                <div className="center w-full flex flex-col justify-between text-3xl">
                                  <div className="mb-auto">
                                    <span className="text-kog-900 font-bold"> Bounties</span> are a special category in OpenGov and their tracking approach needs an alternative treatment.
                                    <br /><br />A detailed demonstration of <span className="text-kog-900 font-bold">Child Bounties</span> will be implement in OG Tracker on our next major upgrade.
                                  </div>
                                </div>
                              </Card>

                            </div>
                            <CanvasAnimation />
                          </>
                          :
                          <CanvasAnimation />
                        }





                        {/* <div id="preloader">
                          <div class="preload-item"></div>
                          <div class="preload-item"></div>
                          <div class="preload-item"></div>
                          <div class="preload-item"></div>
                          <div class="preload-item"></div>
                          <div class="preload-item"></div>
                          <div class="preload-item"></div>
                          <div class="preload-item"></div>
                          <div class="preload-item"></div>
                        </div> */}
                      </div>

                    </div>
                  ) : (

                    <div className="text-slate-100 dark:text-slate-100 text-sm lg:text-base font-normal sm:px-5 pb-10 grid grid-cols-1 md:grid-cols-3 ">
                      <div className="col-span-2">
                        <div className="sm:p-10 sm:min-h-[65vh] sm:pt-1 ">
                          <h2 className=" text-kog-900 dark:text-kog-900 text-2xl	font-semibold	mt-2 px-4 sm:px-0 ">
                            TASKS
                            {/* <Link target="_blank" to={product?.propLink} className="">
                              <Icon className="mt-[-10px] text-kog-900 min-w-[40px] min-h-[40px] cursor-pointer float-right text-xl p-2" icon="simple-line-icons:magnifier" />
                            </Link> */}
                          </h2>

                          {/* <Image src={'https://polkadot.study/img/polkadot_pink.svg'} alt="" /> */}
                          <div className={`max-h-[calc(65vh-100px)] overflow-auto`}>
                            <ul>
                              {Object.keys(product).map((key, index) => {
                                // Assuming your tasks are named as task1, task2, ..., taskN and statuses as status1, status2, ..., statusN
                                if (key.startsWith('task') && product[key] !== null) {
                                  const taskNumber = key.replace('task', '');
                                  const statusKey = `status${taskNumber}`;
                                  const status = product[statusKey];
                                  return (
                                    <li key={index} className="my-3 mx-5 rounded-md shadow-[0px_0px_5px_5px_rgba(0,0,0,0.3)] bg-kog-200 bg-opacity-40 hover:shadow-[0px_0px_3px_3px_rgba(137,15,131,0.5)] p-3 text-xl  duration-200">
                                      <div className="flex justify-between items-center w-full">

                                        <p className="text-lg sm:text-xl flex col-span-11">{product[key]}</p>
                                        <p className="text-kog-500 text-3xl col-span-1 ">
                                          {status === 'A' ? <Icon icon="mdi:check-decagram" className="text-kog-800" />
                                            : status === 'B' ? <Icon icon="eos-icons:hourglass" className="text-kog-800" />
                                              : status === 'C' ? <MyIcon />
                                                : status === 'D' ? <Tooltip
                                                title={<Icon icon="bi:patch-exclamation-fill" className="text-kog-800 animate-tada " />}
                                                placement={isMobile ? "bottom" : "right"}
                                                className="mt-2"
                                                arrow
                                                allowHTML
                                                interactive
                                                theme="custom-light"
                                                maxWidth="220px"
                                                content={
                                                  <div className=" text-kog-white text-sm bg-kog-500 h-10px">
                                                    Learn more on OGT Review
                                                  </div>
                                                }
                                              />
                                                
                                                
                                                : null
                                              }
                                              
                                        </p>
                                      </div>
                                    </li>
                                  );
                                }
                                return null;
                              })}
                              
                            </ul>
                          </div>




                        </div>

                      </div>

                      <div className="flex flex-col justify-between h-full sm:border-l-2 border-kog-200 px-5">
                        <div >
                          <h2 className=" text-kog-900 dark:text-kog-900 text-2xl	font-semibold	mt-3 ">
                            DURATION
                          </h2>
                          <div className="flex flex-col justify-center items-center min-h-[60vh]"> {/* Adjusted for vertical flex column */}
                            <div className="text-center mb-8"> {/* Added margin-bottom for spacing */}

                              {/* <div className="flex justify-between items-center max-w-6 text-md text-kog-500 my-1">
                              <p className="text-kog-900">{product?.fdate}</p>

                              <p className="text-white text-lg"><Timer startDate={product?.fdate} endDate={product?.ldate} /> </p>
                              <p className="text-kog-900">{product?.ldate}</p>
                            </div> */}
                              {/* <ProgressBarTimer startDate={product?.fdate} endDate={product?.ldate} theHeight={56} /> */}
                              {/* {!isSpecialPath && (
            <>
             
            </>
          )} */}
                              <CircularProgressBar startDate={product?.fdate} endDate={product?.ldate} status={product?.status} size={300} strokeWidth={20} baseColor="#321a48" progressColor="#da18d0" textColor="#ff69b4" shadowColor="rgba(255, 105, 180, 0.2)" />
                            </div>
                            <div className="grid grid-cols-2 gap-4 mx-auto gap-x-24"> {/* Grid for Start and End labels and dates */}
                              <div className="text-kog-900 text-center text-base font-bold">Start</div>
                              <div className="text-kog-900 text-center text-base font-bold">End</div>
                              <div className="text-white text-center text-base ">{product?.fdate}</div>
                              <div className="text-white text-center text-base ">{product?.ldate}</div>
                            </div>
                          </div>
                        </div>


                      </div>

                    </div>

                  )}
                </div>
                {/* <ul className="space-y-3 p-6 lg:ml-28 ml-14 rounded-md bg-slate-white dark:bg-kog-50">
                      {lists.map((item, i) => (
                        <li
                          key={i}
                          className="text-sm lg:text-base text-kog-white dark:text-slate-400 flex space-x-2 items-center rtl:space-x-reverse"
                        >
                          <span className="h-[10px] w-[10px] bg-slate-900 dark:bg-slate-400 rounded-full inline-block"></span>
                          <span>Lorem ipsum dolor sit amet.</span>
                        </li>
                      ))}
                    </ul> */}



                {/* <div className="text-kog-white dark:text-slate-400 text-sm font-normal">
                    <div className="flex justify-between items-start pb-4">
                      <ul className="space-y-3 rounded-md bg-slate-white dark:bg-kog-50 ">
                        {lists1.map((item, i) => (
                          <li
                            key={i}
                            className="text-sm lg:text-base text-kog-white dark:text-slate-400 flex space-x-2 items-center rtl:space-x-reverse"
                          >
                            <span className="h-[10px] w-[10px] bg-slate-900 dark:bg-slate-400 rounded-full inline-block"></span>
                            <span>
                            
                              {item.text}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <ul className="space-y-3 rounded-md bg-slate-white dark:bg-kog-50">
                        {lists2.map((item, i) => (
                          <li
                            key={i}
                            className="text-sm lg:text-base text-kog-white dark:text-slate-400 flex space-x-2 items-center rtl:space-x-reverse"
                          >
                            <span className="h-[10px] w-[10px] bg-slate-900 dark:bg-slate-400 rounded-full inline-block"></span>
                            <span>{item.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div> */}
              </Tab.Panel>

              {/* <Tab.Panel>


                <div className="text-slate-100 dark:text-slate-100 text-sm lg:text-base font-normal px-5 pb-10 ">

                  



<Ecommerce />
                  

                 

                </div>
              </Tab.Panel> */}
            </Tab.Panels>
          </Tab.Group>
          {/* </Card> */}
        </div>
        {/* <div className="border border-1 dark:border-slate-700 rounded p-6">
          <h6 className=" text-slate-300 pb-6 text-lg lg:text-xl">
            Reviews & Ratings
          </h6>
          <div className="space-y-12">
            <div className="bg-secondary-100 dark:bg-slate-700 p-6 rounded grid grid-cols-12 	">
              <div className="col-span-12 items-center md:col-span-6 flex space-x-3 justify-center md:justify-start rtl:space-x-reverse order-2 md:order-1 mt-3 md:mt-0">
                <div className="font-medium items-center flex ">
                  <p className=" text-slate-300 text-base lg:text-lg">
                    4.2
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm lg:text-base">
                    /5
                  </p>
                </div>
                <div className="flex items-center md:justify-start  text-slate-300 font-normal text-sm lg:text-base">
                  <div className="flex items-center space-x-1.5">
                    <Icon icon="ph:star-fill" className="text-yellow-400" />
                    <Icon icon="ph:star-fill" className="text-yellow-400" />
                    <Icon icon="ph:star-fill" className="text-yellow-400" />
                    <Icon icon="ph:star-fill" className="text-yellow-400" />
                    <Icon icon="ph:star-fill" className="text-slate-300/80" />
                  </div>
                  <div className=" text-slate-500 dark:text-slate-400">
                    (789 reviews)
                  </div>
                </div>
              </div>
              <div className="col-span-12 md:col-span-6 flex justify-center md:justify-end items-center order-1 md:order-2">
                <button
                  type="button"
                  className="bg-yellow-500 text-white rounded px-6 py-3 text-sm lg:text-base"
                >
                  Rate this product
                </button>
              </div>
            </div>
            <div className="flex space-x-3 rtl:space-x-reverse ">
              <div className=" h-14 w-14 rounded-full object-cover bg-kog-999 ring-1 overflow-hidden flex-none">
                <img
                  className="h-full w-full object-contain"
                  src={blackJumper}
                />
              </div>
              <div>
                {" "}
                <div>
                  <p className="text-slate-900  dark:text-slate-300 font-medium text-sm lg:text-base pb-1">
                    Devied Beakhum
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 font-normal text-xs  pb-1">
                    08-03-2023
                  </p>
                  <p className="flex items-center  text-slate-300  font-normal text-sm lg:text-base space-x-1.5 rtl:space-x-reverse pb-3">
                    <Icon icon="ph:star-fill" className="text-yellow-400" />
                    <Icon icon="ph:star-fill" className="text-yellow-400" />
                    <Icon icon="ph:star-fill" className="text-yellow-400" />
                    <Icon icon="ph:star-fill" className="text-yellow-400" />
                    <Icon icon="ph:star-fill" className="text-yellow-400" />
                  </p>
                  <p className="pb-4 text-sm  lg:text-base text-slate-500 dark:text-slate-400">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore
                    magna. Lori ipsum dolor sit amet, consetetur sadipscing
                    elitr, sed diam nonumy eirmod tempor invidunt.
                  </p>
                  <div className="flex space-x-2 rtl:space-x-reverse pb-3">
                    <p className="font-normal text-sm lg:text-base text-slate-500 dark:text-slate-400">
                      Info:
                    </p>
                    <p className="font-medium text-sm lg:text-base text-[#10B26C] ">
                      Verified Purchase
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-12 ">
                  <div className="col-span-12 flex justify-end space-x-4 rtl:space-x-reverse">
                    <p className="flex items-center space-x-2 rtl:space-x-reverse ">
                      <span className="cursor-pointer ">
                        <Icon icon="heroicons:hand-thumb-up" />
                      </span>
                      <span>02</span>
                    </p>
                    <p className="flex items-center space-x-2 rtl:space-x-reverse ">
                      <span className="cursor-pointer ">
                        <Icon icon="carbon:reply" />
                      </span>
                      <span>00</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex space-x-3 rtl:space-x-reverse ">
              <div className=" h-14 w-14 rounded-full object-cover bg-kog-999 ring-1 overflow-hidden flex-none">
                <img
                  className="h-full w-full object-contain"
                  src={blackJumper}
                />
              </div>
              <div>
                {" "}
                <div>
                  <p className="text-slate-900  dark:text-slate-300 font-medium text-sm lg:text-base pb-1">
                    Devied Beakhum
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 font-normal text-xs  pb-1">
                    08-03-2023
                  </p>
                  <p className="flex items-center  text-slate-300  font-normal text-sm lg:text-base space-x-1.5 rtl:space-x-reverse pb-3">
                    <Icon icon="ph:star-fill" className="text-yellow-400" />
                    <Icon icon="ph:star-fill" className="text-yellow-400" />
                    <Icon icon="ph:star-fill" className="text-yellow-400" />
                    <Icon icon="ph:star-fill" className="text-yellow-400" />
                    <Icon icon="ph:star-fill" className="text-yellow-400" />
                  </p>
                  <p className="pb-4 text-sm lg:text-base text-slate-500 dark:text-slate-400">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore
                    magna. Lori ipsum dolor sit amet, consetetur sadipscing
                    elitr, sed diam nonumy eirmod tempor invidunt.
                  </p>
                  <div className="flex space-x-2 rtl:space-x-reverse pb-3">
                    <p className="font-normal text-sm lg:text-base text-slate-500 dark:text-slate-400">
                      Info:
                    </p>
                    <p className="font-medium text-sm lg:text-base text-[#10B26C] ">
                      Verified Purchase
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-12">
                  <div className=" col-span-12 mb-3">
                    <div className="flex space-x-2 rtl:space-x-reverse mb-9">
                      <div className=" h-[90px] w-[90px] rounded bg-slate-100 p-1 overflow-hidden ">
                        <img
                          className="h-full w-full object-contain"
                          src={three}
                        />
                      </div>
                      <div className=" h-[90px] w-[90px] rounded bg-slate-100 overflow-hidden p-1">
                        <img
                          className="h-full w-full object-contain"
                          src={one}
                        />
                      </div>
                      <div className=" h-[90px] w-[90px] rounded bg-slate-100 overflow-hidden p-1">
                        <img
                          className="h-full w-full object-contain"
                          src={two}
                        />
                      </div>
                    </div>
                    <div className=" max-h-[400px] max-w-[346px] rounded  bg-slate-100 overflow-hidden p-1">
                      <img
                        className="h-full w-full object-contain"
                        src={three}
                      />
                    </div>
                  </div>
                  <div className="col-span-12 flex justify-end space-x-4 rtl:space-x-reverse">
                    <p className="flex items-center space-x-2 rtl:space-x-reverse ">
                      <span className="cursor-pointer ">
                        <Icon icon="heroicons:hand-thumb-up" />
                      </span>
                      <span>02</span>
                    </p>
                    <p className="flex items-center space-x-2 rtl:space-x-reverse ">
                      <span className="cursor-pointer ">
                        <Icon icon="carbon:reply" />
                      </span>
                      <span>00</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};
