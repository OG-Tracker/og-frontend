import React from "react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Badge from "@/components/ui/Badge";
import CounterButton from "@/components/partials/ecommerce/counter-button";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateQuantity } from "@/store/api/shop/cartSlice";
import { Link } from "react-router-dom";
import CircularProgressBar from "./circularBar";
import Image from "@/components/ui/Image";

const ProductList = ({ item }) => {
  const dispatch = useDispatch();
  const { img, rating, desc, price, oldPrice, percent, id } =
    item;
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
  const cartItems = useSelector((state) => state.cart.items);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <Card
      bodyClass="px-3 py-2 rounded-md"
      className="group "
    >
      {/* <Link to={item.id}>
        <div className=" bg-secondary-200 dark:rounded relative h-[259px] flex flex-col justify-center items-center rounded-md  mb-3 lg:mb-0   ltr:md:mr-0 ltr:sm:mr-0 rtl:md:ml-0 rtl:sm:ml-0 ltr:lg:mr-3 rtl:lg:ml-3">
          <div className="h-[235px]  w-[266px] p-12">
            <img
              className="  h-full w-full  object-contain  transition-all duration-300 group-hover:scale-105"
              src={img}
              alt={name}
            />
            {percent && (
              <Badge className=" font-normal bg-danger-600 text-white absolute ltr:left-2 rtl:right-2 top-3">
                {percent}
              </Badge>
            )}
            <div className="hover-box flex flex-col invisible absolute ltr:right-2 rtl:left-2 top-2 opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 ">
              <button className="bg-kogl p-2.5  mb-1.5 rounded-full">
                <Icon
                  icon="ph:heart-fill"
                  className="text-slate-400 dark:text-slate-400 hover:text-danger-600 dark:hover:text-danger-600"
                />
              </button>
              <button className="bg-kogl p-2.5 mb-1.5 rounded-full  ">
                <Icon
                  icon="ph:eye"
                  className="text-slate-400 dark:text-slate-400 hover:text-danger-600  dark:hover:text-danger-600"
                />
              </button>
              <button className="bg-kogl p-2.5 mb-1.5 rounded-full ">
                <Icon
                  icon="jam:refresh-reverse"
                  className="text-slate-400 dark:text-slate-400 hover:text-danger-600  dark:hover:text-danger-600"
                />
              </button>
            </div>
          </div>
        </div>
      </Link> */}

      <div>
        {/* <p className="text-xs	text-slate-900 dark:text-slate-300 font-normal uppercase pb-2">
          {category}
        </p>
        <h6 className="text-slate-900 dark:text-slate-300 text-lg	font-medium	pb-2 w-full truncate">
          <Link to={item.id}>{name}</Link>
        </h6>
        <p className="pb-2 space-x-2 rtl:space-x-reverse">
          <span className="text-slate-900 dark:text-slate-300 text-lg	font-semibold ">
            ${price}
          </span>
          <del className="text-slate-500 dark:text-slate-500 font-semibold text-lg">
            {oldPrice}
          </del>
        </p> */
        /* {rating && (
          <span className="flex items-center text-slate-900 dark:text-slate-300  font-normal text-xs space-x-[4px] rtl:space-x-reverse pb-3">
            <Icon icon="ph:star-fill" className="text-yellow-400" />
            <Icon icon="ph:star-fill" className="text-yellow-400" />
            <Icon icon="ph:star-fill" className="text-yellow-400" />
            <Icon icon="ph:star-fill" className="text-yellow-400" />
            <span className="ltr:pl-2 rtl:pr-2">{rating}</span>
          </span>
        )} */}
        {/* <p className="text-slate-500 dark:text-slate-500  text-sm  font-normal pb-4">
          {desc}
        </p> */}
        <div className="space-x-4 rtl:space-x-reverse grid grid-cols-5">


          {/* <CounterButton product={item} /> */}

          {/* <button
            onClick={() => handleAddToCart(item)}
            disabled={cartItems.some((cartItem) => cartItem.id === id)}
            className="font-medium text-sm flex items-center max-w-[202px] px-4  disabled:cursor-not-allowed disabled:opacity-50 border-slate-900 dark:border-slate-700 border hover:bg-slate-900 rounded hover:text-white dark:hover:text-white dark:hover:bg-slate-700 ml-3 rtl:mr-3"
            iconClass=" text-sm leading-none"
          >
            <Icon icon="heroicons:shopping-bag" className="ltr:mr-2 rtl:ml-2" />
            Add to Cartsss
          </button> */}
          <div className="truncate col-span-4">
            <Link to={item.id}>
              <div className="flex justify-between items-center border-b border-kog-300 pb-1">
                <p className="font-extrabold text-lg 	text-slate-900 dark:text-slate-300 uppercase ">
                  #{refNum}
                </p>

                <p className="text-sm	text-slate-900 dark:text-slate-300 uppercase font-normal grid grid-cols-3 gap-x-1 justify-items-end">
                  <div className="font-extrabold text-lg col-span-2 align-top">{item.reqDot}</div>
                  <div className="bg-polkalogo w-5 h-5 bg-no-repeat mt-1 animate-spin-slow mix-blend-plus-lighter opacity-60 "></div>
                </p>

              </div>
            </Link>

            <Link to={item.id}>

              <h5 className=" text-kog-800 text-2xl my-2 truncate border-b border-kog-300 pb-2 font-bold bg-gradient-to-r from-[#E6007A] via-kog-500 to-kog-900 text-transparent bg-clip-text bg-300% animate-gradient">
                {ptitle}
              </h5>
            </Link>

            <p>
              <Link to={item.id} className="text-gray-400 ">{summary.substring(0, 170) + "..."}</Link>
            </p>

            <div className="flex justify-between items-center mb-3 " >
              <h6 className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate	">
                <Icon icon="ph:user-fill" className="text-white-400 inline border rounded-3xl p-1 border-kog-700 text-3xl mr-2" /> <Link to={scanLink} target="_blank" className="text-blue-400 truncate">{benAdd}</Link>

              </h6>
              <p className="border-solid border border-[#890F83] px-3 py-1 rounded-3xl mt-2 text-sm text-kog-900 ml-2">{category}</p>

            </div>
            <div className="grid grid-cols-12 justify-center items-center " >
              {/* <p className="text-slate-500 dark:text-slate-500  text-[11px]  font-normal mt-1.5"> */}
              <Link className="min-h-[40px] bg-kog-200 border-solid col-span-3 border border-[#890F83] px-3 py-1 rounded mr-2  hover:bg-opacity-100 hover:shadow-[0px_0px_4px_4px_rgba(207,24,199,0.4)] duration-100 ease-out hover:ease-in" to={paLink} target="_blank">
                <svg className="m-auto" width="28" height="28" viewBox="0 0 39 40" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_8997_79043)"><path d="M6.09501 24.9033C6.90889 27.5289 8.33317 29.8097 10.2706 31.7368C12.553 34.0176 15.2777 35.5293 18.427 36.2719C19.7805 36.5901 21.1518 36.7669 22.5318 36.7404C24.9557 36.6962 27.2735 36.1746 29.4852 35.158C31.4314 34.2651 33.1299 33.0364 34.6073 31.4981C34.8196 31.2771 34.9434 31.2418 35.1911 31.4805C35.8015 32.0728 36.4385 32.6385 37.0666 33.2043C37.2524 33.3634 37.2612 33.4607 37.0843 33.6552C34.0676 36.82 30.4052 38.7914 26.1235 39.6489C24.4073 39.9936 22.6645 40.0644 20.9306 39.9494C18.4978 39.7903 16.1535 39.1892 13.9242 38.1725C11.6329 37.1382 9.60707 35.7238 7.86431 33.9381C5.66153 31.6838 3.99839 29.0759 3.04297 26.0526C3.61799 25.7166 4.26379 25.6017 4.88304 25.3719C5.28998 25.2216 5.72346 25.1243 6.10386 24.9033H6.09501Z" fill="#FC85C6"></path><path d="M16.4719 30.3222C13.2164 28.4481 11.1375 25.69 10.4121 22.0036C9.79281 18.883 10.3325 15.9303 12.0398 13.2252C13.756 10.5201 16.1711 8.74319 19.2763 7.91221C19.3293 7.89453 19.3824 7.90337 19.4355 7.89453C19.5859 8.00945 19.6124 8.1951 19.6567 8.36306C19.8247 9.01724 19.984 9.68026 20.1255 10.3433C20.1786 10.582 20.2582 10.8118 20.4086 11.0151C19.2497 11.245 18.1881 11.7047 17.2416 12.3942C14.9946 14.0473 13.6676 16.2397 13.4818 19.0598C13.2872 21.871 14.2603 24.2313 16.2773 26.1762C16.7992 26.6801 17.392 27.1044 18.0201 27.4668C18.0201 27.7497 17.8254 27.9442 17.6927 28.1652C17.2681 28.8813 16.9231 29.6415 16.4631 30.3311L16.4719 30.3222Z" fill="#FC85C6"></path><path d="M12.5088 6.72766C14.6851 5.10105 17.1179 4.0579 19.8072 3.62473C21.9127 3.27996 24.0093 3.38604 26.0794 3.87226C28.521 4.44687 30.7061 5.53422 32.6523 7.12547C33.3866 7.72661 34.0589 8.38962 34.6782 9.10568C34.8551 9.30901 34.802 9.40625 34.6162 9.55654C33.9174 10.1135 33.2273 10.6792 32.5639 11.2627C32.3427 11.4572 32.2631 11.3069 32.1392 11.1831C31.29 10.2638 30.3876 9.41509 29.3172 8.74323C27.6452 7.69124 25.8317 7.03707 23.8677 6.81606C20.4442 6.42709 17.3567 7.29343 14.5612 9.29133C14.287 9.18525 14.1897 8.9112 14.0216 8.69903C13.5173 8.04485 13.0662 7.34647 12.5 6.7365L12.5088 6.72766Z" fill="#FC85C6"></path><path d="M12.5068 6.72695C12.6749 6.68275 12.7456 6.80651 12.8252 6.92143C13.4003 7.70822 13.9841 8.495 14.5592 9.28178C13.0287 10.4752 11.7548 11.8897 10.8613 13.6223C9.23357 16.7518 8.93278 20.0227 9.89705 23.4173C9.94128 23.5588 9.96782 23.7091 10.0032 23.8505C9.81743 24.0273 9.56089 24.045 9.33088 24.1246C8.54354 24.4074 7.73851 24.6285 6.96886 24.9379C6.22576 22.8869 5.96036 20.7653 6.11075 18.5906C6.3673 14.8511 7.77389 11.5891 10.2598 8.78673C10.9321 8.02647 11.6929 7.35461 12.4979 6.73579L12.5068 6.72695Z" fill="#E2007A"></path><path d="M6.96917 24.9291C6.98686 24.8231 7.03994 24.77 7.1461 24.7347C8.03075 24.4429 8.9154 24.1424 9.8089 23.8506C9.87082 23.833 9.94159 23.8506 10.0124 23.8418C10.4812 25.0352 11.012 26.1845 11.7817 27.2188C14.3118 30.6223 17.7 32.4345 21.9374 32.6378C22.2294 32.6555 22.3444 32.7086 22.3355 33.0268C22.3178 33.8755 22.3267 34.7241 22.3444 35.5816C22.3444 35.8645 22.2559 35.9264 21.9905 35.9264C15.3822 35.7761 9.55235 31.6831 7.16379 25.5214C7.09302 25.3358 6.96032 25.159 6.96917 24.9468V24.9291Z" fill="#C10061"></path><path d="M3.95416 11.006C4.69727 9.32639 5.71461 7.8147 6.90889 6.43563C9.64246 3.27966 13.0218 1.14916 17.047 0.0352855C17.3743 -0.053117 17.4716 0.0176049 17.5424 0.327014C17.7105 1.10496 17.8962 1.87406 18.1174 2.63432C18.2147 2.98793 18.1705 3.13821 17.7901 3.23546C15.4458 3.85427 13.3491 4.9593 11.4825 6.49751C9.51861 8.12411 7.97932 10.0778 6.90004 12.3851C6.88235 12.4205 6.85581 12.4558 6.82927 12.4824C6.21886 12.0403 5.49345 11.8105 4.82112 11.4834C4.52034 11.3331 4.17532 11.2536 3.94531 10.9884L3.95416 11.006Z" fill="#FC4D9D"></path><path d="M3.95252 11.0059C4.84601 11.4125 5.73066 11.8192 6.62416 12.217C6.74801 12.27 6.81878 12.3673 6.83647 12.491C5.79259 14.8248 5.23526 17.2559 5.2618 19.8107C5.27949 21.5434 5.56258 23.2408 6.09337 24.8939C6.09337 25.0088 6.04029 25.1061 5.91644 25.1414C4.95217 25.4243 4.01444 25.8133 3.04133 26.052C1.41357 20.9777 1.69666 16.0094 3.8729 11.1473C3.89944 11.0943 3.92598 11.0501 3.95252 11.0059Z" fill="#E2007A"></path><path d="M16.4698 30.3218C16.4521 30.0389 16.6556 29.8444 16.7794 29.6234C17.1864 28.8985 17.5402 28.1382 18.0179 27.4575C20.6807 28.8366 23.3877 28.9427 26.1302 27.7051C26.6698 27.4575 27.174 27.157 27.6341 26.7857C27.8198 26.6354 27.9172 26.6619 28.0587 26.8476C28.5895 27.5283 29.1291 28.209 29.6776 28.8631C29.8722 29.1018 29.8634 29.2168 29.6157 29.4024C26.4929 31.6567 23.0604 32.3374 19.3184 31.4533C18.3099 31.2146 17.3633 30.8257 16.4609 30.3218H16.4698Z" fill="#E2007A"></path><path d="M20.4067 11.0061C20.1944 11.015 20.1413 10.8647 20.1059 10.6967C19.8848 9.75967 19.6548 8.8226 19.4336 7.88554C21.6187 7.31092 23.7861 7.417 25.9446 8.04466C26.3073 8.15075 26.3516 8.28335 26.2189 8.61044C25.9181 9.3707 25.6527 10.1486 25.3961 10.9266C25.3077 11.1918 25.2104 11.2537 24.9361 11.1653C23.6622 10.7675 22.3618 10.6791 21.0437 10.8559C20.8313 10.8824 20.6367 11.0238 20.4156 10.9885L20.4067 11.0061Z" fill="#E2007A"></path></g><defs><clipPath id="clip0_8997_79043"><rect width="39" height="40" fill="white"></rect></clipPath></defs></svg>

              </Link>
              <Link className="min-h-[40px]  bg-kog-200 border-solid col-span-3 border border-[#890F83] px-3 py-1 rounded mr-2 hover:bg-kog-800 hover:bg-opacity-90 hover:shadow-[0px_0px_2px_2px_rgba(207,24,199,0.2)] duration-100 ease-out hover:ease-in" to={subLink} target="_blank" >
                <svg className="m-auto" width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_3485_29957)">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M51.5772 29.0772L24 13.5L-3.57715 29.0772L24 46.1543L51.5772 29.0772ZM41.8764 29.2725L24 19.175L6.12369 29.2725L24 40.3425L41.8764 29.2725Z" fill="#8268f7" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M24 7.17497L6.12368 17.2725L24 28.3425L41.8763 17.2725L24 7.17497ZM24 1.5L-3.57715 17.0772L24 34.1543L51.5772 17.0772L24 1.5Z" fill="#6848FF" />
                  </g>
                  <defs>
                    <clipPath id="clip0_3485_29957">
                      <rect width="48" height="48" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </Link>

              <Link className="border-solid bg-kog-200 col-span-3 border border-[#890F83] min-h-[40px] px-3 py-1 rounded mr-2 z-50 hover:border-5 hover:from-kog-300 hover:to-kog-700 bg-gradient-to-l hover:bg-gradient-to-r hover:bg-opacity-100 hover:shadow-[0px_0px_2px_2px_rgba(207,24,199,0.2)] duration-100 ease-out hover:ease-in" to={scanLink} target="_blank"><Image className={'w-7 m-auto'} src={'https://assets.apidog.com/app/project-icon/custom/20231007/502cd210-450e-43b0-b162-09dd97ef1b1d.png'} /></Link>
              <Link className="border-solid bg-kog-200 col-span-3 border border-[#890F83] min-h-[40px] px-3 py-1 rounded mr-2 text-2xl text-[#fff] z-50 hover:bg-kog-800 hover:bg-opacity-90 hover:shadow-[0px_0px_2px_2px_rgba(207,24,199,0.2)] duration-100 ease-out hover:ease-in" to={propLink} target="_blank"><Icon className="m-auto text-3xl" icon="carbon:document" /></Link>
              {/* </p> */}
              <div className="col-span-4 ">
              </div>
            </div>
          </div>
          <div className="flex justify-center center mt-1">


            <CircularProgressBar
              startDate={fdate}
              endDate={ldate}
              size={200}
              strokeWidth={15}
              baseColor="#321a48"
              progressColor="#da18d0" // A pink color for the progress
              textColor="#ff69b4" // Matching text color
              shadowColor="rgba(255, 105, 180, 0.2)" // Light pink shadow
            />
          </div>




        </div>
      </div>
    </Card>
  );
};

export default ProductList;
