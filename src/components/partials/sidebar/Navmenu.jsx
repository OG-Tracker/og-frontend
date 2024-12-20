import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Collapse } from "react-collapse";
import Icon from "@/components/ui/Icon";
import { toggleActiveChat } from "@/pages/app/chat/store";
import { useDispatch } from "react-redux";
import useMobileMenu from "@/hooks/useMobileMenu";
import Submenu from "./Submenu";

const Navmenu = ({ menus }) => {
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const toggleSubmenu = (i) => {
    if (activeSubmenu === i) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(i);
    }
  };

  const location = useLocation();
  const locationName = location.pathname.replace("/", "");
  const [mobileMenu, setMobileMenu] = useMobileMenu();
  const [activeMultiMenu, setMultiMenu] = useState(null);
  const dispatch = useDispatch();

  const toggleMultiMenu = (j) => {
    if (activeMultiMenu === j) {
      setMultiMenu(null);
    } else {
      setMultiMenu(j);
    }
  };

  const isLocationMatch = (targetLocation) => {
    return (
      locationName === targetLocation ||
      locationName.startsWith(`${targetLocation}/`)
    );
  };

  useEffect(() => {
    let submenuIndex = null;
    let multiMenuIndex = null;
    menus.forEach((item, i) => {
      if (isLocationMatch(item.link)) {
        submenuIndex = i;
      }

      if (item.child) {
        item.child.forEach((childItem, j) => {
          if (isLocationMatch(childItem.childlink)) {
            submenuIndex = i;
          }

          if (childItem.multi_menu) {
            childItem.multi_menu.forEach((nestedItem) => {
              if (isLocationMatch(nestedItem.multiLink)) {
                submenuIndex = i;
                multiMenuIndex = j;
              }
            });
          }
        });
      }
    });
    document.title = `OG Tracker  | ${locationName}`;
    // TODO : document title

    setActiveSubmenu(submenuIndex);
    setMultiMenu(multiMenuIndex);
    dispatch(toggleActiveChat(false));
    if (mobileMenu) {
      setMobileMenu(false);
    }
  }, [location]);

  return (
    <>
      <ul className="mt-2">
        {menus.map((item, i) => (
          <li
            key={i}
            className={` single-sidebar-menu 
              ${item.child ? "item-has-children" : ""}
              ${activeSubmenu === i ? "open" : ""}
              ${locationName === item.link ? "menu-item-active" : ""}`}>
            {/* single menu with no childred*/}
            {!item.child && !item.isHeadr && (
              <NavLink className="menu-link hover:bg-kog-100 ease-out hover:ease-in hover:shadow-[0px_0px_50px_3px_rgba(0,0,0,0.3)] hover:bg-gradient-to-t from-kog-100 to-kog-400 duration-10 rourned-l-none border-l-none    " to={item.link}>
                <span className="menu-icon flex-grow-0">
                  <Icon icon={item.icon} />
                </span>
                <div className="text-box flex-grow">{item.title}</div>
                {item.badge && <span className="menu-badge">{item.badge}</span>}
              </NavLink>
            )}
            {/* only for menulabel */}
            {item.isHeadr && !item.child && (
              <div className="menulabel px-3 text-kog-900 text-md ">{item.title}</div>
            )}
            {/*    !!sub menu parent   */}
            {item.child && (
              <div
                className={`menu-link menu-link ease-out hover:ease-in hover:shadow-[0px_0px_50px_3px_rgba(0,0,0,0.3)] hover:bg-gradient-to-t from-kog-100 to-kog-400 duration-10 rourned-l-none border-l-none   ${
                  activeSubmenu === i
                    ? "parent_active not-collapsed bg-gradient-to-t from-kog-100 to-kog-700"
                    : "collapsed"
                }`}
                onClick={() => toggleSubmenu(i)} 
              >
                <div className="flex-1 flex items-start ">
                  <span className="menu-icon mt-1">
                    <Icon icon={item.icon} />
                  </span>
                  <div className="text-box text-white">{item.title}</div>
                </div>
                <div className="flex-0 mt-1">
                  <div
                    className={`menu-arrow transform transition-all duration-300 shadow-[inset_0px_0px_10px_2px_rgba(0,0,0,1)] border border-kog-700 text-kog-700 ${
                      activeSubmenu === i ? "rotate-180 text-kog-700 shadow-[inset_0px_0px_10px_2px_rgba(0,0,0,1)]" : ""
                    }`}
                  >
                    <Icon icon="heroicons-outline:chevron-down" className=" rounded-full h-5 w-5 text-kog-700" />
                  </div>
                </div>
              </div>
            )}

            <Submenu
              activeSubmenu={activeSubmenu}
              item={item}
              i={i}
              toggleMultiMenu={toggleMultiMenu}
              activeMultiMenu={activeMultiMenu}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Navmenu;
