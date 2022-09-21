// Load Dark Mode Settings

// Get Colors From CSS Variables
const getColorVariable = (color) =>
  getComputedStyle(document.documentElement)
    .getPropertyValue(`--color-${color}`)
    .trim();

const colorPrimary = getColorVariable("primary"),
  colorAccent = getColorVariable("accent"),
  colorDefault = getColorVariable("default"),
  colorCard = getColorVariable("card"),
  colorBorder = getColorVariable("border"),
  colorGrey = getColorVariable("grey"),
  colorLabel = getColorVariable("label");

// Create Jquery style selector function
const $ = (selector) => document.querySelector(selector);

// Create chart
const createChart = (selector, options) => {
  const ctx = document.getElementById(selector).getContext("2d");
  const chart = new Chart(ctx, options);
  return [ctx, chart];
}

// Abbreviate long number function
const abbreviateLongNumber = n => {
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(2) + "K";
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
  if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
};

// Get Data From API
const category = "beverages";
const country = "pt";

const getWorldProducts = async () => {
  try {
    const res = await fetch(
      `https://world.openfoodfacts.org/cgi/search.pl?action=process&tagtype_0=categories&tag_contains_0=contains&tag_0=${category}&json=true&sort_by=additives_n&page_size=6`
    );
    const data = await res.json();

    const { count } = data;

    $("#totalProducts").innerHTML = abbreviateLongNumber(count);
    $("#preloader").classList.remove("drinks-loading");
  } catch(error) {
    console.log("error", error);
  }
};

getWorldProducts();

const getPTProducts = async () => {
  try {
    const res = await fetch(
      `https://${country}.openfoodfacts.org/cgi/search.pl?action=process&tagtype_0=categories&tag_contains_0=contains&tag_0=${category}&json=true&sort_by=additives_n&page_size=6`
    );
    const data = await res.json();

    const { count } = data;

    $("#totalAdditives").innerHTML = abbreviateLongNumber(count);
    $("#preloader").classList.remove("drinks-loading");
  } catch(error) {
    console.log("error", error);
  }
};

getPTProducts();

// Chart default options
const defaultOptions = {
  type: 'bar',
  data: {},
  options: {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        usePointStyle: true,
        caretSize: 0,
        padding: 12,
        titleFont: {
          family: "Sora",
          size: 12,
          weight: 400,
        },
        bodyFont: {
          family: "Sora",
          size: 12,
          weight: 400,
        },
        footerFont: {
          family: "Sora",
          size: 12,
          weight: 400,
        },
      }
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  },
};

// Bar Figure Chart

const barRes = axios
  .get(`https://${country}.openfoodfacts.org/cgi/search.pl?action=process&tagtype_0=categories&tag_contains_0=contains&tag_0=${category}&json=true&sort_by=additives_n&page_size=6`, {
  })
  .then(function (response) {
    const { data } = response;
    const { products } = data;

    const labels = products.map((product) => product.brands);

    const barData1 = [],
      barData2 = [];

    products.forEach(product => {
      const additives = product.additives_n,
        ingredients = product.ingredients.length;

      barData1.push(additives);
      barData2.push(ingredients);
    });

    const barOptions = {
      ...defaultOptions,
      data: {
        ...defaultOptions.data,
        labels,
        datasets: [
          {
            label: 'Additives',
            data: barData1,
            backgroundColor: ["#885ce6"],
            hoverBackgroundColor: ["#885ce6"],
            borderColor: ["#885ce6"],
            borderWidth: 0,
            barThickness: 12,
            borderRadius: 6,
          },
          {
            label: 'Ingredients',
            data: barData2,
            backgroundColor: ["#ffffff"],
            hoverBackgroundColor: ["#ffffff"],
            borderColor: ["#ffffff"],
            borderWidth: 0,
            barThickness: 12,
            borderRadius: 6,
          },
        ],
      },
    };

    createChart("figureBarChart", barOptions);
  })
  .catch(function (error) {
    console.log(error);
  });

// Area Table Chart
const data2022 = [
  700000, 1400000, 300000, 2500000, 500000, 1200000, 400000, 1100000, 600000,
];
const data2021 = [
  500000, 1200000, 400000, 900000, 600000, 2300000, 360000, 1800000, 500000,
];

const areaTableOptions = {
  ...defaultOptions,
  type: "line",
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Aug", "Sep"],
    datasets: [
      {
        backgroundColor: colorPrimary,
        borderColor: colorPrimary,
        hoverBackgroundColor: colorPrimary,
        label: "",
        fill: true,
        data: data2022,
      }
    ]
  },
  options: {
    ...defaultOptions.options,
    elements: {
      point: {
        radius: 6,
        hoverRadius: 8,
        borderWidth: 0,
      },
    },
    plugins: defaultOptions.options.plugins,
    tension: 0.3,
    scales: {
      x: {
        display: false,
      },
      y: {
        suggestedMax: 3500000,
        suggestedMin: 0,
        ticks: {
          font: {
            family:"Sora",
            size: 10,
          },
          callback: (value) => abbreviateLongNumber(value),
        },
        grid: {
          drawBorder: true,
          drawOnChartArea: true,
          drawTicks: true,
          color: colorBorder,
          borderColor: "transparent",
          borderDash: [5,5],
          borderDashOffset: 2,
          tickColor: "transparent",
        }
      },
    },
  },
};

const [areaChartCtx, areaChart] = createChart("areaTableChart", areaTableOptions);

const gradient = areaChartCtx.createLinearGradient(0,0,0,220);
gradient.addColorStop(0, "rgba(0,0,0,0.2)");
gradient.addColorStop(0.8, "rgba(0,0,0,0)");

areaChart.data.datasets[0].backgroundColor = gradient;
areaChart.update();

// Get paged table

// Radial Bar Card

// Dark Mode Toggle
