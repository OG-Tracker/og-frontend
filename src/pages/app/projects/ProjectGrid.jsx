import React from "react";
import Card from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";
import { useNavigate } from "react-router-dom";
import { cb as childBounties } from "./cb"; // Ensure this path is correct
import { products } from "@/constant/data"; // Import products to access category information
import { Link } from "react-router-dom";


const ProjectGrid = ({ project }) => {
  const {
    id,
    status,
    parentTitle,
    total,
    remaining,
    summary,
    rRefs, // Related refs as a comma-separated string
  } = project;

  const navigate = useNavigate();

  // Helper function to format numbers with commas and no decimals
  const formatNumber = (num) => {
    if (isNaN(num)) return "0";
    return Math.floor(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Calculate total cPayment for child bounties related to this project
  const totalChildPayment = childBounties
    .filter((child) => child.parentID === id)
    .reduce((sum, child) => {
      let payment = parseFloat(child.cPayment?.replace(/,/g, "") || 0);
      if (child.cPayment?.endsWith("K")) {
        payment *= 1000; // Convert "K" notation to the correct value
      }
      return sum + payment;
    }, 0);

  // Count total child bounties for the current project
  const totalChildBountyCount = childBounties.filter((child) => child.parentID === id).length;

  // Parse total and remaining values, removing commas and handling NaN
  const totalAmount = parseFloat(total?.replace(/,/g, "") || 0);
  const calculatedRemaining = totalChildPayment;

  // Calculate progress percentage, ensuring we handle any division by zero
  const progress = totalAmount ? (1 - calculatedRemaining / totalAmount) * 100 : 0;

  // Handle navigation to project details page
  // const handleClick = () => {
  //   navigate(`/bounties/${id}`);
  // };

  // Extract related references from rRefs and fetch their categories from products
  const relatedRefs = (rRefs || "").split(",").map((ref) => ref.trim()).filter(Boolean);
  const relatedCategories = relatedRefs
    .map((refNum) => {
      const product = products.find((p) => p.refNum === refNum);
      return product ? product.category : null;
    })
    .filter(Boolean); // Filter out any null or undefined values

  // Determine category display: if all categories are the same, show it; otherwise, "-"
  const uniqueCategories = Array.from(new Set(relatedCategories));
  const categoryDisplay = uniqueCategories.length === 1 ? uniqueCategories[0] : "-";

  return (
    <Card
      className="cursor-pointer rounded-md bg-kog-50 m-2 group shadow-[inset_0px_0px_10px_7px_rgba(0,0,0,0.4)] hover:shadow-[0px_0px_7px_7px_rgba(166,0,157,0.3)] border-kog-700 border-2 hover:bg-kog-100 hover:bg-opacity-70 duration-150 ease-out hover:ease-in"

    >
      <Link to={`/bounties/${id}`} className="pb-2">
        {/* Header with Category */}
        <header className="flex justify-between items-center border-b border-kog-300">
          <div className="flex space-x-4 items-center min-w-0">
            <div className="flex-none">
              <div className="py-1 px-1 rounded-full text-white text-xl font-bold">
                #{id}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h5 className="truncate text-2xl my-2 font-bold text-white bg-clip-text bg-300% animate-gradient overflow-hidden whitespace-nowrap max-w-full">
                {parentTitle}
              </h5>
            </div>
          </div>
        </header>

        <p className="line-clamp-3 text-gray-400 text-md my-5 " >{summary}</p>

        <div className="text-white font-medium text-center">
          <span
            className={`inline-flex font-bold bg-opacity-20 [text-shadow:2px_2px_5px_rgba(0,0,0,0.7)] text-white text-md px-4 py-[4px] rounded-full bg-gradient-to-t from-kog-300 ${status === "Active" || status === "Funded" ? "to-kog-900" : status === "Canceled" || status === "Claimed" ? "to-purple-800" : "to-kog-700"
              }`}
          >
            {status}
          </span>
        </div>

        {/* Uncomment if you want to display the progress bar */}
        {/* <ProgressBar value={progress} className="bg-kog-500" showPercentage /> */}
      </Link>
    </Card>
  );
};

export default ProjectGrid;
