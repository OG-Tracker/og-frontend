import React from "react";
import useDarkMode from "@/hooks/useDarkMode";
import { Link } from "react-router-dom";
import useWidth from "@/hooks/useWidth";

import MainLogo from "@/assets/images/logo/oglogo.png";
import LogoWhite from "@/assets/images/logo/oglogo.png";
import MobileLogo from "@/assets/images/logo/oglogo.png";
import MobileLogoWhite from "@/assets/images/logo/oglogo.png";
const Logo = () => {
  const [isDark] = useDarkMode();
  const { width, breakpoints } = useWidth();

  return (
    <div>
      <Link to="/dashboard" >
        {width >= breakpoints.xl ? (
          <img src={MainLogo} alt="" className="max-w-[35px]" />
        ) : (
          <img src={MobileLogo} alt=""  className="max-w-[35px]"/>
        )}
      </Link>
    </div>
  );
};

export default Logo;
