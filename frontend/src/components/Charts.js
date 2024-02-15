import React from "react";
import { Line } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import Style from "./Charts.module.css";
import { Chart as ChartJS, registerables } from "chart.js";
import { options } from "./utils";

ChartJS.register(...registerables, zoomPlugin);

export default function Charts({ chartData }) {
  return (
    <div className={Style["charts__container"]}>
      <Line
        data={chartData}
        options={options(chartData.xLabelName, chartData.yLabelName)}
      />
    </div>
  );
}
