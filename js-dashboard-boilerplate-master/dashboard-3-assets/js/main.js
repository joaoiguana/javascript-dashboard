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

// Abbreviate long number function
const abbreviateLongNumber = n => {
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(2) + "K";
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
  if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
};

// Get Data From API
const category = "beverages"

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
      `https://pt.openfoodfacts.org/cgi/search.pl?action=process&tagtype_0=categories&tag_contains_0=contains&tag_0=${category}&json=true&sort_by=additives_n&page_size=6`
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

// Bar Figure Chart

// Area Table Chart

// Get paged table

// Radial Bar Card

// Dark Mode Toggle
