import React from "react";
import { Link } from "react-router-dom";

import ErrorImage from "@/assets/images/all-img/404-2.svg";
function Error() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center py-20 dark:bg-slate-900">
      <img src={ErrorImage} alt="" />
      {/* <div class="container">

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
      <div className="max-w-[546px] mx-auto w-full mt-12">
        <h4 className="text-slate-900 mb-4">
          Page not found
        </h4>
        <div className="dark:text-white text-base font-normal mb-10">
          The page you are looking for might have been removed had its name
          changed or is temporarily unavailable.
        </div>
      </div>
      <div className="max-w-[300px] mx-auto w-full">
        <Link
          to="/"
          className="btn btn-dark dark:bg-kog-50 block text-center"
        >

          Go to homepage
        </Link>
      </div>
    </div>
  );
}

export default Error;
