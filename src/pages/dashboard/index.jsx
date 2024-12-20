import React, { useState } from "react";
import Card from "@/components/ui/Card";
import ImageBlock1 from "@/components/partials/widget/block/image-block-1";
import GroupChart1 from "@/components/partials/widget/chart/group-chart-1";
import GroupChart3 from "@/components/partials/widget/chart/group-chart-3";
import GroupChart2 from "@/components/partials/widget/chart/group-chart-2";
import RevenueBarChart from "@/components/partials/widget/chart/revenue-bar-chart";
import DotByCategory from "@/components/partials/widget/chart/dotByCategory";
import RadialsChart from "@/components/partials/widget/chart/radials";
import SelectMonth from "@/components/partials/SelectMonth";
import CompanyTable from "@/components/partials/Table/company-table";
import RecentActivity from "@/components/partials/widget/recent-activity";
import MostSales from "../../components/partials/widget/most-sales";
import RadarChart from "../../components/partials/widget/chart/radar-chart";
import HomeBredCurbs from "./HomeBredCurbs";
import BasicArea from "../chart/appex-chart/BasicArea";
import Pie from "../chart/appex-chart/Pie";
import Donut from "../chart/appex-chart/Donut";
import PollerAreaChart from "../chart/chartjs/PollerAreaChart";
import BasicBar from "../chart/appex-chart/Basicbar";
import BarChart from "../chart/chartjs/Bar";
import ReBarChart from "../chart/recharts/ReBarChart";
import ReAreaChart from "../chart/recharts/ReAreaChart";
import ComingSoonWrapper from "@/components/ComingSoonWrapper";
import AreaSpaLine from "../chart/appex-chart/AreaSpaline";
import ColumnChart from "../chart/appex-chart/HorizontalBar"
import ReAreaChartTrack from "../chart/recharts/tracksApproved";
import StablesBarChart from "@/components/partials/widget/chart/stables-bar-chart";
import ColumnChartDynamic from "../chart/appex-chart/HorizontalBar";





// TODO home dashboard
const Dashboard = () => {
  const [filterMap, setFilterMap] = useState("usa");
  return (
    <div className="mb-10">
      {/* <HomeBredCurbs title="Overview" /> */}
      <div className="grid grid-cols-12 gap-5 mb-5">
        {/* <div className="2xl:col-span-3 lg:col-span-4 col-span-12">
          <ImageBlock1 />
        </div> */}
        {/* TODO stats */}
        <div className="2xl:col-span-12 lg:col-span-12 col-span-12">
          <Card bodyClass="p-4" >
            {/* <div className="grid md:grid-cols-4 col-span-1 gap-4">
              <GroupChart1 />
            </div> */}
            <div className="grid md:grid-cols-5 sm:grid-cols-2 grid-cols-1 gap-3">
              {/* <GroupChart3 /> */}
              <GroupChart2 />
            </div>
          </Card>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-5">
        <div className="lg:col-span-12 col-span-12">
          <Card title="Proposals approved by track" className="shadow-[inset_0px_1px_15px_12px_rgba(0,0,0,0.4)]">

            <div >
              {/* <RevenueBarChart /> */}
              {/* <ReBarChart /> */}
              {/* <ColumnChart /> */}
              {/* <ComingSoonWrapper> */}
              <ReAreaChartTrack />
              {/* </ComingSoonWrapper> */}
            </div>
          </Card>
        </div>
        <div className="lg:col-span-8 col-span-12 ">

          <Card title="Monthly DOT Spent" className="shadow-[inset_0px_1px_15px_12px_rgba(0,0,0,0.4)]">
            {/* <ComingSoonWrapper> */}
            <BasicArea height={281} />
            {/* </ComingSoonWrapper> */}
          </Card>

        </div>

        <div className="lg:col-span-4 col-span-12">
          <Card title="Proposals Approved by Category" className="shadow-[inset_0px_1px_15px_12px_rgba(0,0,0,0.4)]">
            {/* <PollerAreaChart /> */}
            {/* <Pie /> */}
            <Donut height={320} />
          </Card>
        </div>
        <div className="lg:col-span-6 col-span-12">

          <Card title="Monthly DOT by Category" className="shadow-[inset_0px_1px_15px_12px_rgba(0,0,0,0.4)]">
            {/* <BarChart  /> */}
            {/* <ComingSoonWrapper> */}
            <div >
              <ReAreaChart />

            </div>
            {/* </ComingSoonWrapper> */}
          </Card>
        </div>

        <div className="lg:col-span-6 col-span-12">

          <Card title="Spenders Status" className="shadow-[inset_0px_1px_15px_12px_rgba(0,0,0,0.4)]">
            <BasicBar height={335} />
          </Card>

        </div>

        <div className="lg:col-span-4 col-span-12">
          <Card title="Average Duration by spenders" className="shadow-[inset_0px_1px_15px_12px_rgba(0,0,0,0.4)]">
            {/* <ComingSoonWrapper> */}
            <DotByCategory height={350} />
            {/* </ComingSoonWrapper> */}
          </Card>
        </div>




        <div className="lg:col-span-8 col-span-12 ">
          <Card title="Monthly DOT spent by Track" className="shadow-[inset_0px_1px_15px_12px_rgba(0,0,0,0.4)]">
            {/* <ComingSoonWrapper> */}
            {/* <ReAreaChart /> */}
            <AreaSpaLine />
            {/* </ComingSoonWrapper> */}
          </Card>
        </div>

        <div className="lg:col-span-6 col-span-12">
          <Card title="Monthly Stables Spent" className="shadow-[inset_0px_1px_15px_12px_rgba(0,0,0,0.4)]">
            <StablesBarChart />
          </Card>
        </div>
        <div className="lg:col-span-6 col-span-12">

          <Card title="Proposals Approved By Track In Stables" className="shadow-[inset_0px_1px_15px_12px_rgba(0,0,0,0.4)]">
            {/* <ChartTrackStables /> */}
            <ColumnChartDynamic />
          </Card>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
