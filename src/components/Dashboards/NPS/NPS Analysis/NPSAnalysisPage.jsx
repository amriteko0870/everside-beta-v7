import React from "react";
import NPSAllGraph from "./NPSAllGraph";
import NPSDetailCard from "./NPSDetailCard";
import NPSFormula from "./NPSFormula";
import NPSVsSentiment from "../NPS Overall Dashboard/NPSVsSentiment";
import Filter from "../Misc/Filter";
import AvgNPS from "./AvgNPS";
import AvgNPS2 from "./AvgNPS2";

const NPSAnalysisPage = () => {
  return (
    <div className="relative">
      {/* <Filter /> */}
      <section className="flex flex-col lg:flex-row items-center justify-center gap-5 mt-[8px]">
        {/* <NPSFormula /> */}
        <NPSDetailCard />
      </section>

      <section className="my-[8px]  flex flex-col lg:flex-row justify-center gap-[18px]">
        <NPSAllGraph />
      </section>
      <section className="my-[8px]  flex flex-col lg:flex-row justify-center gap-[18px]">
        <AvgNPS2 />
      </section>
    </div>
  );
};

export default NPSAnalysisPage;
