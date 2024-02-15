import React, { useState } from "react";
import Charts from "./Charts";
import Form from "./Form";
import { data } from "./utils";
import Style from "./AnalyticsDashboard.module.css";
import Tap from "./Tab";

export default function AnalyticsDashboard() {
  const [chartData, setChartData] = useState(data);
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  return (
    <div className={Style["dashboard"]}>
      <Charts chartData={chartData} />

      <div className={Style["dashboard__form"]}>
        <Form
          setChartData={setChartData}
          setIsFileUploaded={setIsFileUploaded}
        />
        <Tap setChartData={setChartData} isFileUploaded={isFileUploaded} />
      </div>
    </div>
  );
}
