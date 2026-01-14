import Chart from "chart.js/auto";
import { getDimensions } from "./api";
import * as controller from "./controller.js";
import Papa from "papaparse";

let chartInstance;

renderChart();

async function renderChart() {
  console.log("rendering...");

  const results = await new Promise((resolve, reject) => {
    Papa.parse("/res/chart_data/global_temperature.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: resolve,
      error: (err) => reject(err),
    });
  });

  const csvData = results.data;
  const labels = csvData.map((row) => row.Year);
  const temperatures = csvData.map((row) => parseFloat(row.Temperature));

  if (chartInstance) {
    chartInstance.destroy();
  }
  chartInstance = new Chart(document.getElementById("default"), {
    type: controller.chartType,
    data: {
      labels: labels,
      datasets: [
        {
          label: "Global Temperature Mean since 1850",
          data: temperatures,
        },
      ],
    },
  });

  console.log("done rendering!");
}
