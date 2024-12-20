import React, { useRef, useEffect, useState } from "react";
import SidebarLogo from "./Logo";
import Navmenu from "./Navmenu";
import { menuItems } from "@/constant/data";
import SimpleBar from "simplebar-react";
import useSidebar from "@/hooks/useSidebar";
import useSemiDark from "@/hooks/useSemiDark";
import useSkin from "@/hooks/useSkin";
import { Icon } from "@iconify/react";
import CalendarPage from "../../../pages/app/calendar";
import Upcoming from "@/pages/upcoming";

const Sidebar = () => {
  const scrollableNodeRef = useRef();
  const [scroll, setScroll] = useState(false);
  const [popupContent, setPopupContent] = useState(null); // Manage which popup content to show

  useEffect(() => {
    const handleScroll = () => {
      if (scrollableNodeRef.current.scrollTop > 0) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
    scrollableNodeRef.current.addEventListener("scroll", handleScroll);
  }, [scrollableNodeRef]);

  const [collapsed, setMenuCollapsed] = useSidebar();
  const [menuHover, setMenuHover] = useState(false);
  const [isSemiDark] = useSemiDark();
  const [skin] = useSkin();

  const handleToggleContent = (content) => {
    setPopupContent(content === popupContent ? null : content);
  };

  return (
    <div className={isSemiDark ? "dark" : ""}>
      <div
        className={`sidebar-wrapper backdrop-blur-xl bg-kog-999 dark:bg-kog-999 flex flex-col h-full ${collapsed ? "w-[72px] close_sidebar" : "w-[248px]"
          }
        ${menuHover ? "sidebar-hovered" : ""}
        ${skin === "bordered"
            ? "border-r border-slate-200 dark:border-slate-700"
            : "shadow-base"
          }`}
        onMouseEnter={() => {
          setMenuHover(true);
        }}
        onMouseLeave={() => {
          setMenuHover(false);
        }}
      >
        {/* Sidebar Logo */}
        <SidebarLogo menuHover={menuHover} />

        {/* Scrollable Menu */}
        <div className="flex-1 overflow-y-auto">
          <SimpleBar
            className="sidebar-menu px-4 pl-0"
            scrollableNodeProps={{ ref: scrollableNodeRef }}
          >
            <Navmenu menus={menuItems} />
          </SimpleBar>
        </div>

        {/* Fixed Social Icons */}
        {!collapsed && (
          <div className="w-full flex justify-center space-x-3 p-3">
            <button
              onClick={() => handleToggleContent("upcoming")}
              className="p-2 px-6 text-white cursor-pointer rounded-md shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)] transition-all duration-200 ease-in-out bg-gradient-to-t hover:bg-gradient-to-l from-kog-300 to-kog-500 hover:bg-kog-500"
            >
              <Icon icon="ion:binoculars-outline" className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleToggleContent("calendar")}
              className="p-2 px-6 text-white cursor-pointer rounded-md shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)] transition-all duration-200 ease-in-out bg-gradient-to-t hover:bg-gradient-to-l from-kog-300 to-kog-500 hover:bg-kog-500"
            >
              <Icon icon="cil:calendar" className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Popup Content */}
      {popupContent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black-500 bg-opacity-80"
          onClick={() => setPopupContent(null)}
        >
          <div
            className={`p-6 rounded-lg shadow-[inset_0px_0px_10px_5px_rgba(0,0,0,0.4)] border ${popupContent === "calendar" ? "bg-gradient-to-t from-kog-300 to-black-500 border-kog-400" : "bg-gradient-to-t from-kog-400 to-black-500 border-[#E6007A]"
              } w-[90%] max-w-4xl h-[75%] overflow-auto `}
            onClick={(e) => e.stopPropagation()} // Prevent closing popup when clicking inside
          >
            <div className="flex justify-between items-center mb-4">
              <h2
                className={`text-xl font-semibold text-white w-full ${popupContent === "calendar" ? "text-center" : "text-center"
                  }`}
              >
                {popupContent === "calendar" ? "OGT Calendar" : "OGT Scout"}
              </h2>

              <button
                onClick={() => setPopupContent(null)}
                className="text-white"
              >
                <Icon icon="mdi:close" className="w-5 h-5" />
              </button>
            </div>
            {popupContent === "calendar" && <CalendarPage />}
            {popupContent === "upcoming" && <Upcoming />}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
