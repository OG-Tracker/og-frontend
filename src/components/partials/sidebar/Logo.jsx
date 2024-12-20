import React from "react";
import { Link } from "react-router-dom";
// Removed unused imports for brevity
import useDarkMode from "@/hooks/useDarkMode";
import useSidebar from "@/hooks/useSidebar";
import useSemiDark from "@/hooks/useSemiDark";
import useSkin from "@/hooks/useSkin";
import Icon from "@/components/ui/Icon"

// Import existing images
import MobileLogo from "@/assets/images/logo/oglogo.png";
import MobileLogoWhite from "@/assets/images/logo/oglogo.png";
// Import your custom logo
import OgLogo from "@/assets/images/logo/oglogo.png"; 


const SidebarLogo = ({ menuHover }) => {
  const [isDark] = useDarkMode();
  const [collapsed, setMenuCollapsed] = useSidebar();
  const [isSemiDark] = useSemiDark();
  const [skin] = useSkin();

  return (
    <div
      className={`logo-segment flex justify-between items-center bg-kog-50 z-[9] py-6 px-4 
      ${menuHover ? "logo-hovered" : ""}
      ${
        skin === "bordered"
          ? " border-b border-r-0 border-slate-700"
          : " border-none"
      }
      `}
    >
      <Link to="/dashboard">
        <div className="flex items-center space-x-4">
          <div className="logo-icon">
            {/* Conditionally render logos based on the theme */}
            {!isDark && !isSemiDark ? (
              <img src={OgLogo} alt="" className="max-w-[35px]" />
            ) : (
              // Use OgLogo for dark or semi-dark themes
              <img src={OgLogo} alt="OG Logo" className="max-w-[35px]" />
            )}
          </div>

          {(!collapsed || menuHover) && (
            <div>
              <h1 className="text-xl font-semibold text-kog-white">
                OG Tracker <Icon icon="clarity:beta-line" className="text-kog-900 text-[38px] inline-block mt-[-40px] animate-bounce " />
              </h1>
              
            </div>
          )}
        </div>
      </Link>

      {(!collapsed || menuHover) && (
        <div
          onClick={() => setMenuCollapsed(!collapsed)}
          className={`h-4 w-4 border-[1.5px] border-slate-700 rounded-full transition-all duration-150
          ${
            collapsed
              ? ""
              : "ring-2 ring-inset ring-offset-4 ring-slate-900 bg-slate-900 ring-offset-slate-700 cursor-pointer hover:ring-offset-kog-900"
          }
          `}
        ></div>
      )}
    </div>
  );
};

export default SidebarLogo;
