import React from "react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import GroupChart4 from "@/components/partials/widget/chart/group-chart-4";

// import GroupChart1 from "@/components/partials/widget/chart/group-chart-1";
import GroupChart2 from "@/components/partials/widget/chart/group-chart-2";
import GroupChart5 from "@/components/partials/widget/chart/group-chart5";
import DonutChart from "@/components/partials/widget/chart/donut-chart";
import BasicArea from "../chart/appex-chart/BasicArea";
import SelectMonth from "@/components/partials/SelectMonth";
import TaskLists from "@/components/partials/widget/task-list";
import MessageList from "@/components/partials/widget/message-list";
import TrackingParcel from "../../components/partials/widget/activity";
import CardSlider from "@/components/partials/widget/CardSlider";
import TeamTable from "@/components/partials/Table/team-table";
import { meets, files } from "@/constant/data";
import CalendarView from "@/components/partials/widget/CalendarView";
import HomeBredCurbs from "./HomeBredCurbs";
import CalendarPage from "../app/calendar";
import Radar from "../chart/appex-chart/Radar";
// import BasicTablePage from "../../components/partials/widget/latest-refs";
import GroupChart3 from "@/components/partials/widget/chart/group-chart-3";
import ExampleTwo from "../table/react-tables/ExampleTwo";
import MixedChart from "@/pages/chart/appex-chart/Mixed";


const ProjectPage = () => {
  return (
    <div className="space-y-5 mb-10">
      {/* <HomeBredCurbs title="Project" /> */}


      <div className="grid grid-cols-12 gap-5 mb-5">

        <div className="2xl:col-span-12 lg:col-span-12 col-span-12">
          <Card bodyClass="p-4" >

            <div className="grid md:grid-cols-5 sm:grid-cols-2 grid-cols-1 gap-3">
              <GroupChart3 />
            </div>
          </Card>
        </div>
      </div>

      

      <div className="grid grid-cols-12 gap-2">

        {/* <Card title="Monthly Unique Proposers & Beneficiaries" className="shadow-[inset_0px_1px_15px_12px_rgba(0,0,0,0.4)] col-span-7">
          <MixedChart />
        </Card> */}

        <div className="sm:col-span-7 col-span-12 m-2">
          <div className="border rounded-md border-opacity-40 border-kog-400 bg-kog-50 pb-4 shadow-[0px_1px_10px_2px_rgba(0,0,0,0.4)] backdrop-filter backdrop-blur-sm bg-opacity-10">
            <div className="border-kog-400 py-3 px-4">
            <MixedChart />
            </div>
          </div>
        </div>

        <div className="sm:col-span-5 col-span-12 m-2">
          <div className="border rounded-md border-opacity-40 border-kog-400 bg-kog-50 pb-4 shadow-[0px_1px_10px_2px_rgba(0,0,0,0.4)] backdrop-filter backdrop-blur-sm bg-opacity-10">
            <div className="border-kog-400 py-3 px-4">
              <TrackingParcel />
              <CardSlider />
            </div>
          </div>
        </div>

      </div>
      <div className="col-span-12 space-y-5">
        <ExampleTwo />


      </div>



      <div className="grid grid-cols-12 gap-2">



      </div>

    </div>
  );
};

export default ProjectPage;
