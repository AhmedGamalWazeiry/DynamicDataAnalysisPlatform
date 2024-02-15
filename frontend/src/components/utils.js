export const options = (xLabelName, yLabelName) => {
  return {
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: "x",
          speed: 0.1,
        },
        zoom: {
          wheel: {
            enabled: true,
            speed: 0.000000001,
          },
          pinch: {
            enabled: true,
          },
          mode: "x",
        },
      },
    },
    legend: {
      display: false,
    },
    scales: {
      x: {
        offset: false,
        type: "linear",
        position: "bottom",
        border: {
          color: "rgb(238, 236, 236)",
          dash: [4, 4],
        },
        title: {
          display: true,
          text: xLabelName,
        },

        grid: {
          display: true,
          color: "rgb(238, 236, 236)",
          tickColor: "rgb(238, 236, 236)",
        },
      },

      y: {
        grace: 1,
        ticks: {
          color: "#a3aeb9",
          backdropColor: "yallow",
          textStrokeColor: "blue",
          callback: function (value, index, values) {
            // Check if it is the last tick
            if (index === values.length - 1) {
              return null; // Do not display the last tick
            }
            return value; // Display other ticks
          },
        },
        title: {
          display: true,
          text: yLabelName,
        },

        border: {
          color: "rgb(238, 236, 236)",
          dash: [4, 4],
        },
        grid: {
          drawTicks: false,
          color: "rgb(238, 236, 236)",
          zeroLineIndex: function (context) {
            // Set the zero line to the last tick
            return context.chart.scales.y.ticks.length - 1;
          },
        },
      },
    },
  };
};

export const data = {
  datasets: [
    {
      label: "Bar Dataset",
      data: [],
      backgroundColor: "rgba(25,119,242,255)",
      borderColor: "rgba(25,119,242,255)",
      borderRadius: 10,
      borderWidth: 1,
      type: "scatter",
    },
    {
      label: "Line Dataset",
      data: [],
      fill: false,
      borderColor: "#5fd3e7",
      borderRadius: 10,
      type: "line",
    },
  ],
};
export const processDatabaseData = (databaseData) => {
  console.log(databaseData);
  const labels = databaseData[databaseData["dependent_name"]];
  const independent = databaseData[databaseData["independent_name"]];
  const predicted_y = databaseData["predicted_y"];

  let dataPoints = [];
  let regressionLine = [];
  let regressionLineDraw = [];
  for (let i = 0; i < labels.length; i++) {
    dataPoints.push({ x: independent[i], y: labels[i] });
    regressionLine.push({ x: independent[i], y: predicted_y[i] });
  }

  regressionLine = regressionLine.sort(function (a, b) {
    return a.x - b.x;
  });

  regressionLineDraw.push(regressionLine[0]);
  regressionLineDraw.push(regressionLine[regressionLine.length - 1]);

  return {
    xLabelName: databaseData["independent_name"],
    yLabelName: databaseData["dependent_name"],
    datasets: [
      {
        label: "Feature Dataset",
        data: dataPoints,
        backgroundColor: "rgba(25,119,242,255)",
        borderColor: "rgba(25,119,242,255)",
        borderRadius: 10,
        borderWidth: 1,
        type: "scatter",
      },
      {
        label: "Line Dataset",
        data: regressionLineDraw,
        fill: false,
        borderColor: "#5fd3e7",
        borderRadius: 10,
        type: "line",
      },
    ],
  };
};
export const defaultDataSets = () => {
  return {
    datasets: [
      {
        label: "Bar Dataset",
        data: [],
        backgroundColor: "rgba(25,119,242,255)",
        borderColor: "rgba(25,119,242,255)",
        borderRadius: 10,
        borderWidth: 1,
        type: "scatter",
      },
      {
        label: "Line Dataset",
        data: [],
        fill: false,
        borderColor: "#5fd3e7",
        borderRadius: 10,
        type: "line",
      },
    ],
  };
};
