import React, { useState } from "react";
import { Collapse } from "react-collapse";
import { NavLink } from "react-router-dom";
import Icon from "@/components/ui/Icon";
import Multilevel from "./Multi";

const Submenu = ({
  activeSubmenu,
  item,
  i,
  toggleMultiMenu,
  activeMultiMenu,
}) => {
  return (
    <Collapse isOpened={activeSubmenu === i}>
      <ul className="sub-menu">
        {item.child?.map((subItem, j) => (
          <li key={j} className="block  hover:bg-kog-400  hover:bg-opacity-20  rounded-full  ">
            {subItem?.multi_menu ? (
              <div>
                <div
                  onClick={() => toggleMultiMenu(j)}
                  className={`${
                    activeMultiMenu
                      ? " text-kog-900 font-medium"
                      : "text-kog-900"
                  } text-sm flex space-x-3 items-center transition-all duration-150 cursor-pointer rtl:space-x-reverse`}
                >
                  <span
                    className={`${
                      activeMultiMenu === j
                        ? " bg-slate-300 ring-4 ring-opacity-[15%] ring-black-500 dark:ring-slate-300 dark:ring-opacity-20"
                        : ""
                    } h-2 w-2 rounded-full border border-slate-600 dark:border-white inline-block flex-none `}
                  ></span>
                  <span className="flex-1 text-kog-900">{subItem.childtitle}</span>
                  <span className="flex-none">
                    {/* <span
                      className={`menu-arrow transform transition-all duration-300 bg-kog-100 ${
                        activeMultiMenu === j ? " rotate-90" : ""
                      }`}
                    >
                      <Icon icon="ph:caret-right" />
                    </span> */}
                  </span>
                </div>
                <Multilevel
                  activeMultiMenu={activeMultiMenu}
                  j={j}
                  subItem={subItem}
                />
              </div>
            ) : (
              <NavLink to={subItem.childlink}>
                {({ isActive }) => (
                  <span
                    className={`${
                      isActive
                        ? " text-white font-medium py-2 rounded-full pl-4 pr-1 mt-2 [text-shadow:3px_1px_7px_rgba(0,0,0,0.7)]"
                        : "text-kog-white py-2 pl-4 pr-1 rounded-full mt-2"
                    } text-sm flex space-x-3 items-center transition-all duration-150 rtl:space-x-reverse`}
                  >
                    <span
                      className={`${
                        isActive
                          ? " bg-kog-dot ring-4 ring-kog-dot ring-opacity-20 "
                          : ""
                      } h-2 w-2 rounded-full border border-kog-dot inline-block flex-none`}
                    ></span>
                    <span className="flex-1 text-[16px]">{subItem.childtitle}</span>
                  </span>
                )}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </Collapse>
  );
};

export default Submenu;
