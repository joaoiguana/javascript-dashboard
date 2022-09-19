// Get CSS Variables
const getColorVariable = (color) => {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(`--color-${color}`)
    .trim();
}

const colorPrimary = getColorVariable("primary"),
 colorAccent = getColorVariable("accent"),
 colorDefault = getColorVariable("default"),
 colorCard = getColorVariable("card"),
 colorLabel = getColorVariable("label");

// Declare renderChart
const renderChart = (options, id) => {
  const chart = new ApexCharts(
    document.querySelector(`#${id}`),
    options
  );
  chart.render()
}

// Declare Default Chart Options
const defaultOptions = {
  chart: {
    height: 136,
    width: "100%",
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  tooltip: {
    enabled: true,
    fillSeriesColor: false,
    style: {
      fontFamily: "Sora"
    },
  },
  legend: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 0,
    colors: colorPrimary,
    strokeColors: colorCard,
    strokeWidth: 2,
    strokeOpacity: 0.5,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    shape: "circle",
    radius: 2,
    hover: {
      size: undefined,
      sizeOffset: 6,
    },
  },
  // states: {
  //   hover: {
  //     filter: {
  //       type: "none",
  //     },
  //   },
  // },
};

// Create sparklines bar chart
const sparklineBarOptions = {
  series: [
    {
      data: [12, 24, 15, 47, 42, 15, 47, 75],
    },
  ],
  ...defaultOptions,
  chart: {
    type: "bar",
    width: 80,
    height: 35,
    sparkline: {
      enabled: true,
    },
  },
  colors: [colorPrimary],
  plotOptions: {
    bar: {
      columnWidth: "80%",
    },
  },
  labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  xaxis: {
    crosshairs: {
      width: 0,
    },
  },
  tooltip: {
    enabled: false,
  },
  selection: {
    enabled: true,
  },
};
renderChart(sparklineBarOptions, "sparklinesBar");

// Create radial bar chart
const radialBarOptions = {
  ...defaultOptions,
  chart: {
    ...defaultOptions.chart,
    type: "radialBar",
    height: 130,
  },
  series: [33],
  labels: ["Usage"],
  colors: [colorPrimary],
  stroke: {
    lineCap: "round",
  },
  grid: {
    show: false,
    padding: { left: -30, right: -30, top: 0, bottom: -25 },
  },
  plotOptions: {
    radialBar: {
      hollow: {
        size: "60%",
      },
      track: {
        background: "#363636"
      },
      dataLabels: {
        show: false,
      },
    },
  },
};
renderChart(radialBarOptions, "radialBarChart");

// Create bar Chart
const barChartOptions = {
  series: [
    {
      name: "Data 1",
      data: [20, 21, 19, 40, 24, 28, 30, 50],
    },
    {
      name: "Data 2",
      data: [12, 14, 9, 20, 12, 14, 15, 25],
    },
  ],
  ...defaultOptions,
  chart: {
    ...defaultOptions.chart,
    type: "bar",
  },
  colors: [colorPrimary, "#363636"],
  plotOptions: {
    bar: {
      columnWidth: "50%",
    },
  },
  dataLabels: {
    enabled: false,
  },
  grid: {
    strokeDashArray: 3,
    borderColor: "rgba(255, 255, 255, 0.05)",
    padding: { left: 20, right: 20, top: -16, bottom: -12 },
  },
  labels: [1, 2, 3, 4, 5, 6, 7, 8],
  yaxis: {
    show: false,
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    labels: {
      floating: true,
      style: {
        fontFamily: "Sora",
        colors: colorLabel,
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    crosshairs: {
      show: false,
    },
  },
  tooltip: {
    enabled: true,
  },
  selection: {
    enabled: true,
  },
};
renderChart(barChartOptions, "barChart")

// Create gauge Chart
const gaugeChartOptions = {
  series: [
    {
      name: "Using",
      data: [0, 20, 0],
    },
    {
      name: "Not Unsing",
      data: [0, 12, 0],
    },
  ],
  ...defaultOptions,
  chart: {
    ...defaultOptions.chart,
    type: "bar",
    stacked: true,
  },
  colors: [colorPrimary, "#363636"],
  plotOptions: {
    bar: {
      columnWidth: "85%",
    },
  },
  dataLabels: {
    enabled: false,
  },
  grid: {
    strokeDashArray: 3,
    borderColor: "rgba(255, 255, 255, 0.05)",
    padding: { left: 20, right: 20, top: -16, bottom: -12 },
  },
  labels: [1, 2, 3, 4, 5, 6, 7, 8],
  yaxis: {
    show: false,
  },
  xaxis: {
    categories: [""],
    labels: {
      floating: true,
      style: {
        fontFamily: "Sora",
        colors: colorLabel,
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    crosshairs: {
      show: false,
    },
  },
  tooltip: {
    enabled: true,
  },
  selection: {
    enabled: true,
  },
};
renderChart(gaugeChartOptions, "gaugeChart")

// Create area chart
const areaOptions = {
  ...defaultOptions,
  series: [
    {
      name: "Series 1",
      data: [0, 0, 0, 60, 20, 60, 0, 0],
    },
    {
      name: "Series 2",
      data: [0, 10, 45, 20, 60, 20, 40, 0]
    },
  ],
  chart: {
    ...defaultOptions.chart,
    type: "area",
    height: 240,
  },
  colors: [colorDefault, colorPrimary],
  fill: {
    type: "solid",
    opacity: 0.75,
  },
  grid: {
    strokeDashArray: 3,
    borderColor: "rgba(255, 255, 255, 0.05)",
    padding: { left: 20, right: 20, top: 0, bottom: -8 }
  },
  stroke: {
    show: false,
  },
  markers: {
    size: 0,
    colors: undefined,
    strokeColors: colorCard,
    strokeWidth: 2,
    strokeOpacity: 0.5,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    shape: "circle",
    radius: 2,
    hover: {
      size: undefined,
      sizeOffset: 6,
    },
  },
  yaxis: {
    max: 100,
    labels: {
      floating: true,
      style: {
        fontFamily: "Sora",
        colors: colorLabel,
      },
    },
  },
  xaxis: {
    labels: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    crosshairs: {
      stroke: {
        color: "rgba(255, 255, 255, 0.25)",
        width: 1,
        dashArray: 2,
      },
    },
  },
};
renderChart(areaOptions, "areaChart")

// Create line Chart
const lineOptions = {
  ...defaultOptions,
  series: [
    {
      name: "Series 1",
      data: [20, 40, 24, 78, 26, 36, 28],
    },
  ],
  chart: {
    ...defaultOptions.chart,
    type: "area",
    height: 240,
  },
  colors: [colorDefault],
  fill: {
    gradient: {
      type: "vertical",
      stops: [0, 50, 100],
      colorStops: [
        {
          offset: 0,
          color: '#fff',
          opacity: 0.05,
        },
        {
          offset: 100,
          color: '#fff',
          opacity: 0,
        },
      ]
    },
  },
  grid: {
    strokeDashArray: 3,
    borderColor: "rgba(255, 255, 255, 0.05)",
    padding: { left: 20, right: 20, top: 0, bottom: -8 }
  },
  stroke: {
    show: true,
    curve: 'smooth',
    lineCap: 'butt',
    colors: undefined,
    width: 3,
    dashArray: 0,
  },
  yaxis: {
    min: 0,
    max: 100,
    labels: {
      floating: true,
      style: {
        fontFamily: "Sora",
        colors: colorLabel,
      },
    },
  },
  xaxis: {
    labels: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    crosshairs: {
      stroke: {
        color: "rgba(255, 255, 255, 0.25)",
        width: 1,
        dashArray: 2,
      },
    },
  },
};
renderChart(lineOptions, "lineChart")
