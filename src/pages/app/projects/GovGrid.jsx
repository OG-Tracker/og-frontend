import React from "react";
import Card from "@/components/ui/Card";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/Icon";
import { Link } from "react-router-dom";


const GovGrid = ({ gov1 }) => {
  if (!gov1) return <div>No project data available</div>;

  const {
    motion,
    ptitle,
    status,
    proposeradd,
    proposername,
    benadd,
    sublink,
    palink,
    scanlink,
    reqdot,
    proplink,
    summary,
    twitter,
    github,
    youtube,
    website,
    articles,
    pow,
  } = gov1;
  const navigate = useNavigate();

  return (
    <div
      className="cursor-pointer rounded-md bg-gradient-to-t from-kog-50  to-gray-800 m-2 group shadow-[inset_0px_0px_10px_7px_rgba(0,0,0,0.4)] hover:shadow-[0px_0px_7px_7px_rgba(167,167,167,0.3)] border-gray-600 border-2 hover:bg-kog-100 hover:bg-opacity-70 duration-150 ease-out hover:ease-in">
      <div className="bg-seven p-6 rounded bg-cover font-special">
        <div className="">
          <Link to={`/gov1/${motion}`} >
            {/* Header with Category */}
            <header className="flex justify-between items-center border-b border-gray-600">
              <div className="flex space-x-4 items-center min-w-0">
                <div className="flex-none">
                  <div className="py-1 px-1 rounded-full text-white text-xl font-bold">
                    #{motion}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="truncate text-2xl my-2 font-bold text-white bg-clip-text bg-300% animate-gradient overflow-hidden whitespace-nowrap max-w-full">
                    {ptitle}
                  </h5>
                </div>
              </div>
              <span
                className={`text-2xl text-kog-white px-2 pt-2 rounded-md mx-1 p-1 shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)] border border-gray-600 ml-3 mb-3 ${pow && pow !== "-"
                    ? "bg-gradient-to-t from-green-900 to-gray-700"
                    : "bg-gradient-to-t from-gray-500 to-gray-700"
                  }`}
              >
                {pow && !pow.includes("0") && "PoW"}
              </span>

            </header>

            <p className="line-clamp-3 text-gray-300 text-md my-5 min-h-[4.4em]">{summary}</p>
          </Link>
          <div className="grid grid-cols-12 shadow-[inset_0px_0px_35px_rgba(0,0,0)] justify-center items-center divide-x divide-gray-700 border rounded-md border-gray-700 divide-x-5 py-1 bg-transparent" >
            {/* <p className="text-kog-500 text-kog-500  text-[11px]  font-normal mt-1.5"> */}
            <Link className="   border-solid col-span-3  border-[#890F83] px-2 py-1" to={palink} target="_blank">

              <div class="rounded-md p-2 shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)] transition-all duration-200 ease-in-out bg-gradient-to-t text-white from-kog-300 to-gray-700  hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 text-center  hover:bg-kog-500 m-auto max-w-[45px] min-h-[45px] hover:max-w-full hover:shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)] 		">
                <svg className="m-auto" width="28" height="28" viewBox="0 0 39 40" fill="#fff" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_8997_79043)"><path d="M6.09501 24.9033C6.90889 27.5289 8.33317 29.8097 10.2706 31.7368C12.553 34.0176 15.2777 35.5293 18.427 36.2719C19.7805 36.5901 21.1518 36.7669 22.5318 36.7404C24.9557 36.6962 27.2735 36.1746 29.4852 35.158C31.4314 34.2651 33.1299 33.0364 34.6073 31.4981C34.8196 31.2771 34.9434 31.2418 35.1911 31.4805C35.8015 32.0728 36.4385 32.6385 37.0666 33.2043C37.2524 33.3634 37.2612 33.4607 37.0843 33.6552C34.0676 36.82 30.4052 38.7914 26.1235 39.6489C24.4073 39.9936 22.6645 40.0644 20.9306 39.9494C18.4978 39.7903 16.1535 39.1892 13.9242 38.1725C11.6329 37.1382 9.60707 35.7238 7.86431 33.9381C5.66153 31.6838 3.99839 29.0759 3.04297 26.0526C3.61799 25.7166 4.26379 25.6017 4.88304 25.3719C5.28998 25.2216 5.72346 25.1243 6.10386 24.9033H6.09501Z" fill="#fff"></path><path d="M16.4719 30.3222C13.2164 28.4481 11.1375 25.69 10.4121 22.0036C9.79281 18.883 10.3325 15.9303 12.0398 13.2252C13.756 10.5201 16.1711 8.74319 19.2763 7.91221C19.3293 7.89453 19.3824 7.90337 19.4355 7.89453C19.5859 8.00945 19.6124 8.1951 19.6567 8.36306C19.8247 9.01724 19.984 9.68026 20.1255 10.3433C20.1786 10.582 20.2582 10.8118 20.4086 11.0151C19.2497 11.245 18.1881 11.7047 17.2416 12.3942C14.9946 14.0473 13.6676 16.2397 13.4818 19.0598C13.2872 21.871 14.2603 24.2313 16.2773 26.1762C16.7992 26.6801 17.392 27.1044 18.0201 27.4668C18.0201 27.7497 17.8254 27.9442 17.6927 28.1652C17.2681 28.8813 16.9231 29.6415 16.4631 30.3311L16.4719 30.3222Z" fill="#fff"></path><path d="M12.5088 6.72766C14.6851 5.10105 17.1179 4.0579 19.8072 3.62473C21.9127 3.27996 24.0093 3.38604 26.0794 3.87226C28.521 4.44687 30.7061 5.53422 32.6523 7.12547C33.3866 7.72661 34.0589 8.38962 34.6782 9.10568C34.8551 9.30901 34.802 9.40625 34.6162 9.55654C33.9174 10.1135 33.2273 10.6792 32.5639 11.2627C32.3427 11.4572 32.2631 11.3069 32.1392 11.1831C31.29 10.2638 30.3876 9.41509 29.3172 8.74323C27.6452 7.69124 25.8317 7.03707 23.8677 6.81606C20.4442 6.42709 17.3567 7.29343 14.5612 9.29133C14.287 9.18525 14.1897 8.9112 14.0216 8.69903C13.5173 8.04485 13.0662 7.34647 12.5 6.7365L12.5088 6.72766Z" fill="#fff"></path><path d="M12.5068 6.72695C12.6749 6.68275 12.7456 6.80651 12.8252 6.92143C13.4003 7.70822 13.9841 8.495 14.5592 9.28178C13.0287 10.4752 11.7548 11.8897 10.8613 13.6223C9.23357 16.7518 8.93278 20.0227 9.89705 23.4173C9.94128 23.5588 9.96782 23.7091 10.0032 23.8505C9.81743 24.0273 9.56089 24.045 9.33088 24.1246C8.54354 24.4074 7.73851 24.6285 6.96886 24.9379C6.22576 22.8869 5.96036 20.7653 6.11075 18.5906C6.3673 14.8511 7.77389 11.5891 10.2598 8.78673C10.9321 8.02647 11.6929 7.35461 12.4979 6.73579L12.5068 6.72695Z" fill="#fff"></path><path d="M6.96917 24.9291C6.98686 24.8231 7.03994 24.77 7.1461 24.7347C8.03075 24.4429 8.9154 24.1424 9.8089 23.8506C9.87082 23.833 9.94159 23.8506 10.0124 23.8418C10.4812 25.0352 11.012 26.1845 11.7817 27.2188C14.3118 30.6223 17.7 32.4345 21.9374 32.6378C22.2294 32.6555 22.3444 32.7086 22.3355 33.0268C22.3178 33.8755 22.3267 34.7241 22.3444 35.5816C22.3444 35.8645 22.2559 35.9264 21.9905 35.9264C15.3822 35.7761 9.55235 31.6831 7.16379 25.5214C7.09302 25.3358 6.96032 25.159 6.96917 24.9468V24.9291Z" fill="#fff"></path><path d="M3.95416 11.006C4.69727 9.32639 5.71461 7.8147 6.90889 6.43563C9.64246 3.27966 13.0218 1.14916 17.047 0.0352855C17.3743 -0.053117 17.4716 0.0176049 17.5424 0.327014C17.7105 1.10496 17.8962 1.87406 18.1174 2.63432C18.2147 2.98793 18.1705 3.13821 17.7901 3.23546C15.4458 3.85427 13.3491 4.9593 11.4825 6.49751C9.51861 8.12411 7.97932 10.0778 6.90004 12.3851C6.88235 12.4205 6.85581 12.4558 6.82927 12.4824C6.21886 12.0403 5.49345 11.8105 4.82112 11.4834C4.52034 11.3331 4.17532 11.2536 3.94531 10.9884L3.95416 11.006Z" fill="#fff"></path><path d="M3.95252 11.0059C4.84601 11.4125 5.73066 11.8192 6.62416 12.217C6.74801 12.27 6.81878 12.3673 6.83647 12.491C5.79259 14.8248 5.23526 17.2559 5.2618 19.8107C5.27949 21.5434 5.56258 23.2408 6.09337 24.8939C6.09337 25.0088 6.04029 25.1061 5.91644 25.1414C4.95217 25.4243 4.01444 25.8133 3.04133 26.052C1.41357 20.9777 1.69666 16.0094 3.8729 11.1473C3.89944 11.0943 3.92598 11.0501 3.95252 11.0059Z" fill="#fff"></path><path d="M16.4698 30.3218C16.4521 30.0389 16.6556 29.8444 16.7794 29.6234C17.1864 28.8985 17.5402 28.1382 18.0179 27.4575C20.6807 28.8366 23.3877 28.9427 26.1302 27.7051C26.6698 27.4575 27.174 27.157 27.6341 26.7857C27.8198 26.6354 27.9172 26.6619 28.0587 26.8476C28.5895 27.5283 29.1291 28.209 29.6776 28.8631C29.8722 29.1018 29.8634 29.2168 29.6157 29.4024C26.4929 31.6567 23.0604 32.3374 19.3184 31.4533C18.3099 31.2146 17.3633 30.8257 16.4609 30.3218H16.4698Z" fill="#fff"></path><path d="M20.4067 11.0061C20.1944 11.015 20.1413 10.8647 20.1059 10.6967C19.8848 9.75967 19.6548 8.8226 19.4336 7.88554C21.6187 7.31092 23.7861 7.417 25.9446 8.04466C26.3073 8.15075 26.3516 8.28335 26.2189 8.61044C25.9181 9.3707 25.6527 10.1486 25.3961 10.9266C25.3077 11.1918 25.2104 11.2537 24.9361 11.1653C23.6622 10.7675 22.3618 10.6791 21.0437 10.8559C20.8313 10.8824 20.6367 11.0238 20.4156 10.9885L20.4067 11.0061Z" fill="#fff"></path></g><defs><clipPath id="clip0_8997_79043"><rect width="39" height="40" fill="white"></rect></clipPath></defs></svg>
              </div>
            </Link>

            <Link className=" z-40   border-solid col-span-3  border-[#890F83] px-2 py-1 " to={sublink} target="_blank" >
              <div class="rounded-md p-2 shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)] transition-all duration-200 ease-in-out bg-gradient-to-t text-white from-kog-300 to-gray-700  hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 text-center  hover:bg-kog-500 m-auto max-w-[45px] min-h-[45px] hover:max-w-full hover:shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)] 		">
                <svg className="m-auto" width="28" height="28" viewBox="0 0 48 48" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_3485_29957)">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M51.5772 29.0772L24 13.5L-3.57715 29.0772L24 46.1543L51.5772 29.0772ZM41.8764 29.2725L24 19.175L6.12369 29.2725L24 40.3425L41.8764 29.2725Z" fill="#fff" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M24 7.17497L6.12368 17.2725L24 28.3425L41.8763 17.2725L24 7.17497ZM24 1.5L-3.57715 17.0772L24 34.1543L51.5772 17.0772L24 1.5Z" fill="#fff" />
                  </g>
                  <defs>
                    <clipPath id="clip0_3485_29957">
                      <rect width="48" height="48" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </Link>

            <Link className="border-solid  col-span-3  border-[#890F83]  px-2 py-1    " to={scanlink} target="_blank">
              <div class="rounded-md p-2 shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)] transition-all duration-200 ease-in-out bg-gradient-to-t text-white from-kog-300 to-gray-700  hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 text-center  hover:bg-kog-500 m-auto max-w-[45px] min-h-[45px] hover:max-w-full hover:shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)] 		">

                <svg className="m-auto" width="29" height="29" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg"><path opacity="0.4" d="M10.86 1.74096C11.4896 1.11138 12.5103 1.11138 13.1399 1.74096C13.7695 2.37054 13.7695 3.3913 13.1399 4.02088L5.54017 11.6206C5.33031 11.8305 5.33031 12.1707 5.54017 12.3806L7.06012 13.9005C7.26998 14.1104 7.61024 14.1104 7.8201 13.9005L15.4198 6.3008C16.0494 5.67122 17.0702 5.67122 17.6998 6.3008L22.3632 10.9643C22.9356 11.5366 22.9356 12.4646 22.3632 13.0369L13.1399 22.2603C12.5103 22.8898 11.4896 22.8898 10.86 22.2603C10.2304 21.6307 10.2304 20.6099 10.86 19.9803L18.4597 12.3806C18.6696 12.1707 18.6696 11.8305 18.4597 11.6206L16.9398 10.1007C16.7299 9.89081 16.3897 9.89081 16.1798 10.1007L8.58007 17.7004C7.95049 18.33 6.92973 18.33 6.30015 17.7004L1.63667 13.0369C1.06432 12.4646 1.06432 11.5366 1.63667 10.9643L10.86 1.74096Z" fill="#fff"></path><path d="M4.02023 10.8606C4.64981 11.4902 4.64981 12.511 4.02023 13.1406C3.39064 13.7702 2.36989 13.7702 1.7403 13.1406C1.11072 12.511 1.11072 11.4902 1.7403 10.8606C2.36989 10.2311 3.39064 10.2311 4.02023 10.8606Z" fill="#fff"></path><path d="M13.1399 1.74096C13.7695 2.37054 13.7695 3.3913 13.1399 4.02088C12.5103 4.65046 11.4896 4.65046 10.86 4.02088C10.2304 3.3913 10.2304 2.37054 10.86 1.74096C11.4896 1.11138 12.5103 1.11138 13.1399 1.74096Z" fill="#fff"></path><path d="M17.6998 6.3008C18.3293 6.93039 18.3293 7.95114 17.6998 8.58073C17.0702 9.21031 16.0494 9.21031 15.4198 8.58073C14.7903 7.95114 14.7903 6.93039 15.4198 6.3008C16.0494 5.67122 17.0702 5.67122 17.6998 6.3008Z" fill="#fff"></path><path d="M13.1399 10.8606C13.7695 11.4902 13.7695 12.511 13.1399 13.1406C12.5103 13.7702 11.4896 13.7702 10.86 13.1406C10.2304 12.511 10.2304 11.4902 10.86 10.8606C11.4896 10.2311 12.5103 10.2311 13.1399 10.8606Z" fill="#fff"></path><path d="M8.58007 6.3008C9.20965 6.93039 9.20965 7.95114 8.58007 8.58073C7.95049 9.21031 6.92973 9.21031 6.30015 8.58073C5.67056 7.95114 5.67056 6.93039 6.30015 6.3008C6.92973 5.67122 7.95049 5.67122 8.58007 6.3008Z" fill="#fff"></path><path d="M8.58007 15.4205C9.20965 16.0501 9.20965 17.0708 8.58007 17.7004C7.95049 18.33 6.92973 18.33 6.30015 17.7004C5.67056 17.0708 5.67056 16.0501 6.30015 15.4205C6.92973 14.7909 7.95049 14.7909 8.58007 15.4205Z" fill="#fff"></path><path d="M13.1399 19.9803C13.7695 20.6099 13.7695 21.6307 13.1399 22.2603C12.5103 22.8898 11.4896 22.8898 10.86 22.2603C10.2304 21.6307 10.2304 20.6099 10.86 19.9803C11.4896 19.3508 12.5103 19.3508 13.1399 19.9803Z" fill="#fff"></path><path d="M17.6998 15.4205C18.3293 16.0501 18.3293 17.0708 17.6998 17.7004C17.0702 18.33 16.0494 18.33 15.4198 17.7004C14.7903 17.0708 14.7903 16.0501 15.4198 15.4205C16.0494 14.7909 17.0702 14.7909 17.6998 15.4205Z" fill="#fff"></path><path d="M22.2596 10.8606C22.8892 11.4902 22.8892 12.511 22.2596 13.1406C21.63 13.7702 20.6093 13.7702 19.9797 13.1406C19.3501 12.511 19.3501 11.4902 19.9797 10.8606C20.6093 10.2311 21.63 10.2311 22.2596 10.8606Z" fill="#fff"></path></svg>
              </div>
            </Link>
            <Link className="border-solid  col-span-3   border-[#890F83]  px-2 py-1  text-2xl text-[#fff] " to={proplink} target="_blank">
              <div class="rounded-md p-2 shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)] transition-all duration-200 ease-in-out bg-gradient-to-t text-white from-kog-300 to-gray-700  hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 text-center  hover:bg-kog-500 m-auto max-w-[45px] min-h-[45px] hover:max-w-full hover:shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)] 		">
                <Icon className="m-auto text-3xl" icon="heroicons:book-open" />
              </div>
            </Link>

          </div>


        </div>
      </div>
    </div>
  );
};

export default GovGrid;
