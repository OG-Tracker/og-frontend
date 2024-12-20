import React, { useState } from "react";
import Card from "@/components/ui/Card";
import BountyBarChart from "@/components/partials/widget/chart/bounties-bar-chart";
import AccountReceivable from "@/components/partials/widget/chart/account-receivable";
import AccountPayable from "@/components/partials/widget/chart/account-payable";
import { cb, bounties } from "@/pages/app/projects/cb";
import { bountyRefs, products } from "@/constant/data";

const BankingPage = () => {
  // Calculate the required totals
  const totalBounties = bounties.length;

  // Filter child bounties by "Claimed" status
  const claimedChildBounties = cb.filter((child) => child.status === "Claimed");
  const totalClaimedChildBounties = claimedChildBounties.length;

  // Format numbers with commas as thousands separators and no decimals
  const formatNumber = (num) => num.toLocaleString();

  // Total DOT requested for all bounties
  const totalBountiesDot = bounties.reduce((acc, bounty) => {
    const totalValue = bounty.total ? parseFloat(bounty.total.replace(",", "")) : 0;
    return acc + totalValue;
  }, 0);

  // Total DOT requested for claimed child bounties, handling "K" suffix for thousands
  const totalClaimedChildBountiesDot = claimedChildBounties.reduce((acc, child) => {
    let payment = 0;
    if (typeof child.cPayment === "string") {
      payment = child.cPayment.includes("K")
        ? parseFloat(child.cPayment.replace(/K/g, "").replace(/,/g, "")) * 1000
        : parseFloat(child.cPayment.replace(/,/g, ""));
    }
    return acc + (payment || 0);
  }, 0);

  // Active bounties based on status (considering both "Active" and "Funded" statuses)
  const totalActiveBounties = bounties.filter(
    (bounty) => bounty.status === "Active" || bounty.status === "Funded"
  ).length;

 // Calculate total reqDot from bountyRefs in products
const refsArray = bountyRefs[0]?.refs.split(",").map((ref) => ref.trim());
const totalReqDotFromRefs = products
  .filter((product) => refsArray.includes(product.refNum))
  .reduce((sum, product) => {
    const reqDot = parseFloat(product.reqDot.replace(/,/g, "")) || 0;
    return sum + reqDot;
  }, 0);

// Calculate total "total" from bounties
const totalFromBounties = bounties.reduce((acc, bounty) => {
  const totalValue = parseFloat(bounty.total.replace(/,/g, "")) || 0;
  return acc + totalValue;
}, 0);

// Calculate the adjusted total
const adjustedTotalBountiesDot = totalReqDotFromRefs + totalFromBounties;

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="space-y-5 mb-10">
      <div className="grid grid-cols-12 gap-5">
        <div className="lg:col-span-4 col-span-12 space-y-5">
          <Card title="" className="shadow-[inset_0px_1px_15px_12px_rgba(0,0,0,0.4)]">
            <div className="space-y-6">
              <div className="gap-4">
                <div
                  className="shadow-[0px_0px_20px_5px_rgba(0,0,0,0.4)] border border-kog-300 border-opacity-30 rounded-md p-3 text-center bg-svgline bg-no-repeat bg-center bg-cover"
                >
                  <span className="text-md ext-slate-400 block mb-1 font-semibold text-kog-900">
                    Total Active Bounties
                  </span>
                  <span className="text-4xl font-bold">{formatNumber(totalActiveBounties)}</span>
                </div>

                <div
                  className="shadow-[0px_0px_20px_5px_rgba(0,0,0,0.4)] border border-kog-300 border-opacity-30 rounded-md p-3 text-center mt-2 bg-svgline2  bg-no-repeat bg-center bg-cover"
                >
                  <span className="text-md ext-slate-400 block mb-1 font-semibold text-kog-900">
                    Total Bounties in DOT
                  </span>
                  <span className="text-4xl font-bold">{formatNumber(Math.floor(adjustedTotalBountiesDot))}</span>
                </div>

                <div
                  className="shadow-[0px_0px_20px_5px_rgba(0,0,0,0.4)] border border-kog-300 border-opacity-30  rounded-md p-3 text-center mt-2 bg-svgline3 bg-no-repeat bg-center bg-cover"
                >
                  <span className="text-md ext-slate-400 block mb-1 font-semibold text-kog-900">
                    Total Claimed Child Bounties
                  </span>
                  <span className="text-4xl font-bold">{formatNumber(totalClaimedChildBounties)}</span>
                </div>

                <div
                  className="shadow-[0px_0px_20px_5px_rgba(0,0,0,0.4)] border border-kog-300 border-opacity-30 rounded-md p-3 text-center mt-2 bg-svgline4 bg-no-repeat bg-center bg-cover"
                >
                  <span className="text-md ext-slate-400 block mb-1 font-semibold text-kog-900">
                    Total Claimed Child Bounties in DOT
                  </span>
                  <span className="text-4xl font-bold">{formatNumber(Math.floor(totalClaimedChildBountiesDot))}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-8 col-span-12">
          <div className="space-y-5 bank-table">
            <Card title="Most Active Bounties" className="shadow-[inset_0px_1px_15px_12px_rgba(0,0,0,0.4)]">
              <div className="legend-ring4">
                <BountyBarChart />
              </div>
            </Card>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
        <Card title="Monthly Claimed Child Bounties" className="shadow-[inset_0px_1px_15px_12px_rgba(0,0,0,0.4)]">
          <AccountReceivable />
        </Card>
        <Card title="Monthly Claimed Child Bounties in DOT" className="shadow-[inset_0px_1px_15px_12px_rgba(0,0,0,0.4)]">
          <AccountPayable />
        </Card>
      </div>
    </div>
  );
};

export default BankingPage;
