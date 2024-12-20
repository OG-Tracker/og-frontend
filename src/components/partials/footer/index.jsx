import React, { useState, useEffect, useRef } from "react";
import useFooterType from "@/hooks/useFooterType";
import { Icon } from "@iconify/react";
import grill from "@subsocial/grill-widget";
import grillogo from "@/assets/images/logo/grill.png";

const Footer = ({ className = "" }) => {
  const [footerType] = useFooterType();
  const footerClassName = () => {
    switch (footerType) {
      case "sticky":
        return "fixed inset-x-0 bottom-0 z-[999]";
      case "static":
        return "fixed inset-x-0 bottom-0 z-[999]";
      case "hidden":
        return "hidden";
      default:
        return "fixed inset-x-0 bottom-0 z-[999]"; // Default to always sticky at the bottom
    }
  };

  const [showChat, setShowChat] = useState(false); // State to toggle chat popup
  const popupRef = useRef(null); // Reference for the popup

  useEffect(() => {
    if (showChat) {
      grill.init({
        widgetElementId: "grill-popup", // The ID of the div where the widget will render
        theme: "dark", // Optional: Set the theme to "light" or "dark"
        hub: { id: "featured" }, // Replace with your hub ID
        channel: {
          type: "channel", // Open a specific chat
          id: "224976", // Replace with your channel ID
          settings: {
            enableBackButton: false,
            enableLoginButton: true,
            enableInputAutofocus: true,
          },
        },
        onWidgetCreated: (iframe) => {
          iframe.style.borderRadius = "12px"; // Add a border radius to iframe
          return iframe;
        },
      });
    }
  }, [showChat]);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowChat(false);
      }
    };

    if (showChat) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showChat]);

  const handleChatToggle = () => {
    setShowChat(!showChat);
  };

  return (
    <footer className={`${className} ${footerClassName()}`}>
      <div className="site-footer px-6 bg-kog-999 dark:bg-kog-50 text-slate-500 dark:text-slate-300 py-2 backdrop-blur-[10px]">
        <div className="grid md:grid-cols-3 grid-cols-1 md:gap-5 items-center">
          {/* Copyright */}
          <div className="text-center ltr:md:text-start rtl:md:text-right text-sm">
            Copyright &copy; 2024{" "}
            <span className="text-kog-900 font-bold">K.O.G. Labs</span> |{" "}
            <span className="text-white">contact@ogtracker.io</span>
          </div>

          {/* Social Icons */}
          <div className="w-full flex justify-center space-x-4">
            <a
              href="https://x.com/og_tracker"
              target="_blank"
              className="p-2 text-white cursor-pointer rounded-full shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)] transition-all duration-200 ease-in-out bg-gradient-to-t hover:bg-gradient-to-l from-kog-300 to-kog-500 hover:bg-kog-500"
            >
              <Icon icon="hugeicons:new-twitter" className="w-5 h-5" />
            </a>
            <a
              href="https://t.me/ogtracker"
              target="_blank"
              className="p-2 text-white cursor-pointer rounded-full shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)] transition-all duration-200 ease-in-out bg-gradient-to-t hover:bg-gradient-to-l from-kog-300 to-kog-500 hover:bg-kog-500"
            >
              <Icon icon="basil:telegram-outline" className="w-5 h-5" />
            </a>
            <a
              href="https://docs.ogtracker.io/overview"
              target="_blank"
              className="p-2 text-white cursor-pointer rounded-full shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)] transition-all duration-200 ease-in-out bg-gradient-to-t hover:bg-gradient-to-l from-kog-300 to-kog-500 hover:bg-kog-500"
            >
              <Icon icon="oui:documentation" className="w-5 h-5" />
            </a>
            <a
              href="https://x.com/ogtracker_bot"
              target="_blank"
              className="p-1 text-white cursor-pointer rounded-full shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)] transition-all duration-200 ease-in-out bg-gradient-to-t hover:bg-gradient-to-l from-kog-300 to-kog-500 hover:bg-kog-500"
            >
              <Icon icon="icon-park-outline:robot-one" className="w-7 h-6" />
            </a>
            <div
              onClick={handleChatToggle}
              className="flex justify-center items-center w-9 h-9 p-2 text-white cursor-pointer rounded-full shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)] transition-all duration-200 ease-in-out bg-gradient-to-t hover:bg-gradient-to-l from-kog-300 to-kog-500 hover:bg-kog-500"
            >
              <img className="" src={grillogo} alt="Grill Chat" />
            </div>
          </div>

          {/* Polkadot */}
          <div className="ltr:md:text-right rtl:md:text-end text-center text-sm">
            Powered by{" "}
            <a
              href="https://polkadot.network"
              target="_blank"
              rel="noopener noreferrer"
              className="text-kog-dot font-bold"
            >
              Polkadot
            </a>
          </div>
        </div>
      </div>

      {/* Chat Popup */}
      {showChat && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[1000]">
          <div
            ref={popupRef}
            className="bg-[#111729] rounded-lg shadow-[inset_0px_0px_15px_5px_rgba(0,0,0,1)] p-8 relative w-[90%] max-w-[1000px] h-[80%] border border-kog-900"
          >
            <button
              onClick={handleChatToggle}
              className="absolute top-0 right-4 text-kog-900 text-4xl hover:text-red-600 cursor-pointer"
            >
              &times;
            </button>
            <div id="grill-popup" className="w-full h-full"></div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
