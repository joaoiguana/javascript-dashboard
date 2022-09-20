// Get colors from CSS variables
const getColorVariable = (color) =>
  getComputedStyle(document.documentElement)
    .getPropertyValue(`--color-${color}`)
    .trim();

const colorPrimary = getColorVariable("primary"),
  colorAccent = getColorVariable("accent"),
  colorDefault = getColorVariable("default"),
  colorCard = getColorVariable("card"),
  colorLabel = getColorVariable("label");

// Create chartist line chart
const lineChartData = {
  series: [[0, 10, 4, 13, 10, 25, 10, 12, 0]],
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"]
};

const lineChart2Data = {
  series: [[0, 10, 4, 42, 10, 25, 10, 12, 0]],
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"]
};

const lineChartOptions = {
  showArea: true,
  showLabels: true,
  fullWidth: true,
  high: 60,
  low: 0,
  chartPadding: {
    top: 0,
    right: 30,
    bottom: 0,
    left: -20,
  },
  axisX: {
    show: true,
    showLabel: true,
  },
  axisY: {
    showLabel: false,
    showGrid: false,
  },
};

const chartColors = [
  colorPrimary,
  colorAccent
]

const handleCreate = (ctx, index) => {
  const color = chartColors[index - 1];
  const defs = ctx.svg.elem("defs")

  //area gradient
  defs
    .elem("linearGradient", {
      id: "areaGradient",
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 1,
    })
    .elem("stop", {
      offset: 0,
      "stop-color": "rgba(255, 255, 255, 0.1)",
    })
    .parent()
    .elem("stop", {
      offset: 0.9,
      "stop-color": "rgba(255, 255, 255, 0)",
    })
    .parent();

    //gird gradient
  defs
  .elem("linearGradient", {
    id: "gridGradient",
    gradientUnits: "userSpaceOnUse",
    x1: 0,
    y1: 0,
    x2: 1,
    y2: 240,
  })
  .elem("stop", {
    offset: 0,
    "stop-color": "rgba(255, 255, 255, 0)",
  })
  .parent()
  .elem("stop", {
    offset: 1,
    "stop-color": "rgba(255, 255, 255, 0.1)",
  })
  .parent();


    //line gradient
    defs
    .elem("linearGradient", {
      id: "lineGradient" + index,
      x1: 0,
      y1: 0,
      x2: 1,
      y2: 0,
    })
    .elem("stop", {
      offset: 0,
      "stop-color": colorCard,
    })
    .parent()
    .elem("stop", {
      offset: 0.25,
      "stop-color": color,
    })
    .parent()
    .elem("stop", {
      offset: 0.75,
      "stop-color": color,
    })
    .parent()
    .elem("stop", {
      offset: 1,
      "stop-color": colorCard,
    })
    .parent();
};

const lineChart1 = new Chartist.Line(
  ".line-chart",
  lineChartData,
  lineChartOptions,
);

lineChart1.on("created", (ctx) => handleCreate(ctx, 1))

const lineChart2 = new Chartist.Line(
  ".line-chart-2",
  lineChart2Data,
  lineChartOptions,
);

lineChart2.on("created", (ctx) => handleCreate(ctx, 2))

// Add event handle to draw point

// Add event handle to draw gradients

// Initialise line chart

// Initialise line chart

// Create Maps
