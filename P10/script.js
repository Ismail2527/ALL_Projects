const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const countryList = {
  AED: "AE", // United Arab Emirates
  USD: "US", // United States
  EUR: "EU", // European Union
  GBP: "GB", // United Kingdom
  INR: "IN", // India
  AUD: "AU", // Australia
  CAD: "CA", // Canada
  JPY: "JP", // Japan
  CNY: "CN", // China
  CHF: "CH", // Switzerland
  NZD: "NZ", // New Zealand
  SEK: "SE", // Sweden
  NOK: "NO", // Norway
  SGD: "SG", // Singapore
  ZAR: "ZA", // South Africa
  HKD: "HK", // Hong Kong
  KRW: "KR", // South Korea
  MYR: "MY", // Malaysia
  THB: "TH", // Thailand
  BRL: "BR", // Brazil
  RUB: "RU", // Russia
  MXN: "MX", // Mexico
  SAR: "SA", // Saudi Arabia
  ARS: "AR", // Argentina
  BDT: "BD", // Bangladesh
  CLP: "CL", // Chile
  COP: "CO", // Colombia
  CZK: "CZ", // Czech Republic
  DKK: "DK", // Denmark
  EGP: "EG", // Egypt
  HUF: "HU", // Hungary
  IDR: "ID", // Indonesia
  ILS: "IL", // Israel
  KES: "KE", // Kenya
  KWD: "KW", // Kuwait
  LKR: "LK", // Sri Lanka
  MAD: "MA", // Morocco
  NGN: "NG", // Nigeria
  OMR: "OM", // Oman
  PEN: "PE", // Peru
  PHP: "PH", // Philippines
  PKR: "PK", // Pakistan
  PLN: "PL", // Poland
  QAR: "QA", // Qatar
  RON: "RO", // Romania
  TWD: "TW", // Taiwan
  TRY: "TR", // Turkey
  UAH: "UA", // Ukraine
  UYU: "UY", // Uruguay
  VND: "VN", // Vietnam
  BHD: "BH", // Bahrain
  DZD: "DZ", // Algeria
  FJD: "FJ", // Fiji
  GHS: "GH", // Ghana
  ISK: "IS", // Iceland
  JMD: "JM", // Jamaica
  JOD: "JO", // Jordan
  KZT: "KZ", // Kazakhstan
  LBP: "LB", // Lebanon
  LYD: "LY", // Libya
  MUR: "MU", // Mauritius
  MVR: "MV", // Maldives
  NPR: "NP", // Nepal
  PYG: "PY", // Paraguay
  RSD: "RS", // Serbia
  SCR: "SC", // Seychelles
  SYP: "SY", // Syria
  TZS: "TZ", // Tanzania
  UGX: "UG", // Uganda
  XAF: "CM", // Central African States
  XCD: "AG", // Eastern Caribbean States
  XOF: "SN", // West African States
  XPF: "PF", // French Pacific Territories
  ZMW: "ZM", // Zambia
  BOB: "BO", // Bolivia
  CRC: "CR", // Costa Rica
  CUP: "CU", // Cuba
  ETB: "ET", // Ethiopia
  FKP: "FK", // Falkland Islands
  GIP: "GI", // Gibraltar
  GTQ: "GT", // Guatemala
  HRK: "HR", // Croatia
  KHR: "KH", // Cambodia
  LAK: "LA", // Laos
  MKD: "MK", // North Macedonia
  MNT: "MN", // Mongolia
  MZN: "MZ", // Mozambique
  NAD: "NA", // Namibia
  SDG: "SD", // Sudan
  SLL: "SL", // Sierra Leone
  SOS: "SO", // Somalia
  SZL: "SZ", // Eswatini (Swaziland)
  TND: "TN", // Tunisia
  VEF: "VE", // Venezuela
  YER: "YE", // Yemen
};

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".form select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
for (let select of dropdowns) {
  for (currCode in countryList) {
    let newoption = document.createElement("option");
    newoption.innerText = currCode;
    newoption.value = currCode;
    if (select.name == "from" && currCode === "USD") {
      newoption.selected = "selected";
    }
    if (select.name == "to" && currCode === "INR") {
      newoption.selected = "selected";
    }
    select.append(newoption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target); // update flag
  });
}

//Update Flag
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();

  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1"; // Set default value
  }

  try {
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    const response = await fetch(URL);
    const data = await response.json();

    let rate = data[toCurr.value.toLowerCase()];
    if (!rate) {
      msg.innerText = `Exchange rate not available for ${fromCurr.value} to ${toCurr.value}`;
      return;
    }

    let finalAmount = (amtVal * rate).toFixed(2); // Format result
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  } catch (error) {
    msg.innerText = "An error occurred. Please try again.";
    console.error(error);
  }
});
