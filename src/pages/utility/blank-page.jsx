import React from "react";
import Card from "@/components/ui/Card";
import { Link } from "react-router-dom";

const BalnkPage = () => {
  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <Card className="max-w-[50vw] m-auto">
        <div className="center w-full flex flex-col justify-between content-center">
          <div className="mb-auto">
            <h4 className="font-medium lg:text-6xl text-xl  text-white inline-block  mt-6 text-center center w-full p-16">
              <span className="text-kog-900 lg:text-6xl text-xl"> OG Tracker </span> Feedback
            </h4>
            
           

          </div>
          <div>
            <Link to='https://forms.gle/xLRQjLzHW2P7ZBsd7' target="_blank">
              <button className="btn bg-kog-500 block w-full text-xl text-center mt-6 hover:bg-kog-300">Form</button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BalnkPage;
