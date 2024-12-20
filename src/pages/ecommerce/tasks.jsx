import React, { Fragment, useState } from "react";
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
import { Link } from "react-router-dom";

import { useParams, useNavigate } from "react-router-dom";
import ThumbSliderCom from "@/components/partials/ecommerce/thumb-slider";
import { useGetProductQuery } from "@/store/api/shop/shopApiSlice";
import { addToCart, updateQuantity } from "@/store/api/shop/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@/components/ui/Alert";
import LoaderCircle from "@/components/Loader-circle";
import { products, proposals } from "@/constant/data";

export const ItemsList = (items) => {
  // Function to generate task list items for a single item
  const generateTaskListItems = (item) => {
    const taskItems = [];

    for (let i = 1; i <= 16; i++) { // Assuming a maximum of 16 tasks based on your object
      const taskKey = `task${i}`;
      const statusKey = `status${i}`;

      if (item[taskKey]) { // Check if the task exists
        taskItems.push(
          <li key={i}>
            {item[taskKey]}<span className="text-kog-500"> {item[statusKey]}</span>
          </li>
        );
      }
    }

    return taskItems.length > 0 ? <ul>{taskItems}</ul> : null;
  };

  // Render the list of items, each with its task list
  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>
          <h3>Item {item.refNum}</h3>
          {generateTaskListItems(item)}
        </div>
      ))}
    </div>
  );
}
