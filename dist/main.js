/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/objects/UI.js":
/*!***********************************!*\
  !*** ./src/modules/objects/UI.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initEvents": () => (/* binding */ initEvents)
/* harmony export */ });
/* harmony import */ var _util_DataFetcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/DataFetcher */ "./src/modules/util/DataFetcher.js");

const searchBar = document.querySelector("#search-box");
const searchButton = document.querySelector("#search-button");
const weatherType = document.querySelector(".weather-name");
const weatherLocation = document.querySelector(".weather-location");
const weatherTemperature = document.querySelector(".weather-temperature");
const weatherWind = document.querySelector(".weather-wind");
const weatherTime = document.querySelector(".weather-time");
const body = document.querySelector("body");
const initEvents = function initializeAllEvents() {
  searchButton.addEventListener("click", fetchWeather);
};

const fetchWeather = async function fetchWeatherInformation() {
  const location = searchBar.value;
  let weather = null;
  if (location != "") {
    try {
      weather = await (0,_util_DataFetcher__WEBPACK_IMPORTED_MODULE_0__.getWeather)(location);
    } catch (error) {
      console.log("Error Fetching Weather Data.");
      return;
    }
    updateUI(weather);
  }
};
const updateUI = function updateUI(weather) {
  console.log(weather);
  weatherType.innerText = weather.description;
  weatherLocation.innerText = weather.location;
  weatherTemperature.innerText = weather.temperature;
  weatherWind.innerText = weather.wind;
  weatherTime.innerText = weather.time;

  updateBackground(parseInt(weather.time.slice(0, 2)));
};

const updateBackground = function updateBackground(hour) {
  console.log(hour);
  if (hour >= 19 || hour < 6) {
    body.style.backgroundImage = 'url("./images/background/night-bg.jpg")';
    return;
  }
  if (hour >= 6 && hour < 11) {
    body.style.backgroundImage = 'url("./images/background/morning-bg.jpg")';
    return;
  }
  if (hour >= 11 && hour < 16) {
    body.style.backgroundImage = 'url("./images/background/noon-bg.jpg")';
    return;
  }
  if (hour >= 16 && hour < 19) {
    body.style.backgroundImage = 'url("./images/background/afternoon-bg.jpg")';
    return;
  }
};




/***/ }),

/***/ "./src/modules/objects/Weather.js":
/*!****************************************!*\
  !*** ./src/modules/objects/Weather.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const weatherInterface = () => ({
  type: "weatherInterface",
});

const Weather = (
  weather,
  description,
  imageIcon,
  location,
  temperature,
  wind,
  time
) => {
  const state = {
    weather,
    description,
    imageIcon,
    location,
    temperature,
    wind,
    time,
  };
  state.temperature = Math.round(temperature - 273.15) + "°C";
  state.wind = wind + "m/s";
  return Object.assign(Object.create(weatherInterface()), state);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Weather);


/***/ }),

/***/ "./src/modules/util/DataFetcher.js":
/*!*****************************************!*\
  !*** ./src/modules/util/DataFetcher.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getWeather": () => (/* binding */ getWeather),
/* harmony export */   "weatherAPIKey": () => (/* binding */ weatherAPIKey)
/* harmony export */ });
/* harmony import */ var _WeatherMapper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WeatherMapper */ "./src/modules/util/WeatherMapper.js");
/* harmony import */ var countries_and_timezones__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! countries-and-timezones */ "./node_modules/countries-and-timezones/esm/index.js");
/* harmony import */ var _Time__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Time */ "./src/modules/util/Time.js");




const weatherAPIKey = "505fa3efb086bd23d8571b744ea64b69";
const getWeather = async function dataFetcherFromWeatherAPI(location) {
  try {
    const weatherData = fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${weatherAPIKey}`,
      { mode: "cors" }
    )
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(response);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const timeZone = getTimeZone(data.sys.country, data.name);
        const time = (0,_Time__WEBPACK_IMPORTED_MODULE_2__.getCurrentTimeFromUTC)(timeZone);
        data.time = time;
        const weather = (0,_WeatherMapper__WEBPACK_IMPORTED_MODULE_0__.mapRawToWeatherObject)(data);
        return weather;
      });
    return weatherData;
  } catch (error) {
    console.log("Error fetching data of weather");
  }
};
//https://timeapi.io/api/Time/current/coordinate?latitude=14.6042&longitude=120.9822
const getTimeZone = function dataFetcherFromTimeApi(countryCode, name) {
  const notOnList = {
    Africa: "ZA",
  };
  if (!countryCode) {
    countryCode = notOnList[name];
  }
  const region = (0,countries_and_timezones__WEBPACK_IMPORTED_MODULE_1__.getTimezonesForCountry)(countryCode).filter((region) => {
    return region.name.split("/")[1] === name;
  });
  if (region[0]) {
    return region[0].utcOffsetStr;
  }
  return (0,countries_and_timezones__WEBPACK_IMPORTED_MODULE_1__.getTimezonesForCountry)(countryCode)[0].utcOffsetStr;
};




/***/ }),

/***/ "./src/modules/util/Time.js":
/*!**********************************!*\
  !*** ./src/modules/util/Time.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getCurrentTimeFromUTC": () => (/* binding */ getCurrentTimeFromUTC)
/* harmony export */ });
const getUTCTimeNow = function getCurrentTimeOfUTC() {
  const utcStr = new Date().toUTCString().split(" ")[4];
  const utcTimeNow = utcStr.slice(0, -3);
  return utcTimeNow;
};
const getCurrentTimeFromUTC = function subtractTimeZoneFromUTC(timeZone) {
  const utc = getUTCTimeNow();
  const utcHour = parseInt(utc.slice(0, 2));
  const timeZoneHour = parseInt(timeZone.slice(0, 3));
  const currentTime = utcHour + timeZoneHour;
  return currentTime + utc.slice(2);
};




/***/ }),

/***/ "./src/modules/util/WeatherMapper.js":
/*!*******************************************!*\
  !*** ./src/modules/util/WeatherMapper.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mapRawToWeatherObject": () => (/* binding */ mapRawToWeatherObject)
/* harmony export */ });
/* harmony import */ var _objects_Weather__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../objects/Weather */ "./src/modules/objects/Weather.js");

const mapRawToWeatherObject = (raw) => {
  const weather = (0,_objects_Weather__WEBPACK_IMPORTED_MODULE_0__["default"])(
    raw.weather[0].main,
    raw.weather[0].description,
    raw.weather[0].icon,
    raw.name,
    raw.main.temp,
    raw.wind.speed,
    raw.time
  );
  return weather;
};




/***/ }),

/***/ "./node_modules/countries-and-timezones/esm/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/countries-and-timezones/esm/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ index),
/* harmony export */   "getAllCountries": () => (/* binding */ getAllCountries),
/* harmony export */   "getAllTimezones": () => (/* binding */ getAllTimezones),
/* harmony export */   "getCountriesForTimezone": () => (/* binding */ getCountriesForTimezone),
/* harmony export */   "getCountry": () => (/* binding */ getCountry),
/* harmony export */   "getCountryForTimezone": () => (/* binding */ getCountryForTimezone),
/* harmony export */   "getTimezone": () => (/* binding */ getTimezone),
/* harmony export */   "getTimezonesForCountry": () => (/* binding */ getTimezonesForCountry)
/* harmony export */ });
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var countries$1 = {
	AD: "Andorra",
	AE: "United Arab Emirates",
	AF: "Afghanistan",
	AG: "Antigua and Barbuda",
	AI: "Anguilla",
	AL: "Albania",
	AM: "Armenia",
	AO: "Angola",
	AQ: "Antarctica",
	AR: "Argentina",
	AS: "American Samoa",
	AT: "Austria",
	AU: "Australia",
	AW: "Aruba",
	AX: "Åland Islands",
	AZ: "Azerbaijan",
	BA: "Bosnia and Herzegovina",
	BB: "Barbados",
	BD: "Bangladesh",
	BE: "Belgium",
	BF: "Burkina Faso",
	BG: "Bulgaria",
	BH: "Bahrain",
	BI: "Burundi",
	BJ: "Benin",
	BL: "Saint Barthélemy",
	BM: "Bermuda",
	BN: "Brunei",
	BO: "Bolivia",
	BQ: "Caribbean Netherlands",
	BR: "Brazil",
	BS: "Bahamas",
	BT: "Bhutan",
	BV: "Bouvet Island",
	BW: "Botswana",
	BY: "Belarus",
	BZ: "Belize",
	CA: "Canada",
	CC: "Cocos Islands",
	CD: "Democratic Republic of the Congo",
	CF: "Central African Republic",
	CG: "Republic of the Congo",
	CH: "Switzerland",
	CI: "Ivory Coast",
	CK: "Cook Islands",
	CL: "Chile",
	CM: "Cameroon",
	CN: "China",
	CO: "Colombia",
	CR: "Costa Rica",
	CU: "Cuba",
	CV: "Cabo Verde",
	CW: "Curaçao",
	CX: "Christmas Island",
	CY: "Cyprus",
	CZ: "Czechia",
	DE: "Germany",
	DJ: "Djibouti",
	DK: "Denmark",
	DM: "Dominica",
	DO: "Dominican Republic",
	DZ: "Algeria",
	EC: "Ecuador",
	EE: "Estonia",
	EG: "Egypt",
	EH: "Western Sahara",
	ER: "Eritrea",
	ES: "Spain",
	ET: "Ethiopia",
	FI: "Finland",
	FJ: "Fiji",
	FK: "Falkland Islands",
	FM: "Micronesia",
	FO: "Faroe Islands",
	FR: "France",
	GA: "Gabon",
	GB: "United Kingdom",
	GD: "Grenada",
	GE: "Georgia",
	GF: "French Guiana",
	GG: "Guernsey",
	GH: "Ghana",
	GI: "Gibraltar",
	GL: "Greenland",
	GM: "Gambia",
	GN: "Guinea",
	GP: "Guadeloupe",
	GQ: "Equatorial Guinea",
	GR: "Greece",
	GS: "South Georgia and the South Sandwich Islands",
	GT: "Guatemala",
	GU: "Guam",
	GW: "Guinea-Bissau",
	GY: "Guyana",
	HK: "Hong Kong",
	HM: "Heard Island and McDonald Islands",
	HN: "Honduras",
	HR: "Croatia",
	HT: "Haiti",
	HU: "Hungary",
	ID: "Indonesia",
	IE: "Ireland",
	IL: "Israel",
	IM: "Isle of Man",
	IN: "India",
	IO: "British Indian Ocean Territory",
	IQ: "Iraq",
	IR: "Iran",
	IS: "Iceland",
	IT: "Italy",
	JE: "Jersey",
	JM: "Jamaica",
	JO: "Jordan",
	JP: "Japan",
	KE: "Kenya",
	KG: "Kyrgyzstan",
	KH: "Cambodia",
	KI: "Kiribati",
	KM: "Comoros",
	KN: "Saint Kitts and Nevis",
	KP: "North Korea",
	KR: "South Korea",
	KW: "Kuwait",
	KY: "Cayman Islands",
	KZ: "Kazakhstan",
	LA: "Laos",
	LB: "Lebanon",
	LC: "Saint Lucia",
	LI: "Liechtenstein",
	LK: "Sri Lanka",
	LR: "Liberia",
	LS: "Lesotho",
	LT: "Lithuania",
	LU: "Luxembourg",
	LV: "Latvia",
	LY: "Libya",
	MA: "Morocco",
	MC: "Monaco",
	MD: "Moldova",
	ME: "Montenegro",
	MF: "Saint Martin",
	MG: "Madagascar",
	MH: "Marshall Islands",
	MK: "North Macedonia",
	ML: "Mali",
	MM: "Myanmar",
	MN: "Mongolia",
	MO: "Macao",
	MP: "Northern Mariana Islands",
	MQ: "Martinique",
	MR: "Mauritania",
	MS: "Montserrat",
	MT: "Malta",
	MU: "Mauritius",
	MV: "Maldives",
	MW: "Malawi",
	MX: "Mexico",
	MY: "Malaysia",
	MZ: "Mozambique",
	NA: "Namibia",
	NC: "New Caledonia",
	NE: "Niger",
	NF: "Norfolk Island",
	NG: "Nigeria",
	NI: "Nicaragua",
	NL: "Netherlands",
	NO: "Norway",
	NP: "Nepal",
	NR: "Nauru",
	NU: "Niue",
	NZ: "New Zealand",
	OM: "Oman",
	PA: "Panama",
	PE: "Peru",
	PF: "French Polynesia",
	PG: "Papua New Guinea",
	PH: "Philippines",
	PK: "Pakistan",
	PL: "Poland",
	PM: "Saint Pierre and Miquelon",
	PN: "Pitcairn",
	PR: "Puerto Rico",
	PS: "Palestine",
	PT: "Portugal",
	PW: "Palau",
	PY: "Paraguay",
	QA: "Qatar",
	RE: "Réunion",
	RO: "Romania",
	RS: "Serbia",
	RU: "Russia",
	RW: "Rwanda",
	SA: "Saudi Arabia",
	SB: "Solomon Islands",
	SC: "Seychelles",
	SD: "Sudan",
	SE: "Sweden",
	SG: "Singapore",
	SH: "Saint Helena, Ascension and Tristan da Cunha",
	SI: "Slovenia",
	SJ: "Svalbard and Jan Mayen",
	SK: "Slovakia",
	SL: "Sierra Leone",
	SM: "San Marino",
	SN: "Senegal",
	SO: "Somalia",
	SR: "Suriname",
	SS: "South Sudan",
	ST: "Sao Tome and Principe",
	SV: "El Salvador",
	SX: "Sint Maarten",
	SY: "Syria",
	SZ: "Eswatini",
	TC: "Turks and Caicos Islands",
	TD: "Chad",
	TF: "French Southern Territories",
	TG: "Togo",
	TH: "Thailand",
	TJ: "Tajikistan",
	TK: "Tokelau",
	TL: "Timor-Leste",
	TM: "Turkmenistan",
	TN: "Tunisia",
	TO: "Tonga",
	TR: "Turkey",
	TT: "Trinidad and Tobago",
	TV: "Tuvalu",
	TW: "Taiwan",
	TZ: "Tanzania",
	UA: "Ukraine",
	UG: "Uganda",
	UM: "United States Minor Outlying Islands",
	US: "United States of America",
	UY: "Uruguay",
	UZ: "Uzbekistan",
	VA: "Holy See",
	VC: "Saint Vincent and the Grenadines",
	VE: "Venezuela",
	VG: "Virgin Islands (UK)",
	VI: "Virgin Islands (US)",
	VN: "Vietnam",
	VU: "Vanuatu",
	WF: "Wallis and Futuna",
	WS: "Samoa",
	YE: "Yemen",
	YT: "Mayotte",
	ZA: "South Africa",
	ZM: "Zambia",
	ZW: "Zimbabwe"
};
var timezones$1 = {
	"Africa/Abidjan": {
		u: 0,
		c: [
			"CI",
			"BF",
			"GH",
			"GM",
			"GN",
			"ML",
			"MR",
			"SH",
			"SL",
			"SN",
			"TG"
		]
	},
	"Africa/Accra": {
		a: "Africa/Abidjan",
		c: [
			"GH"
		],
		r: 1
	},
	"Africa/Addis_Ababa": {
		a: "Africa/Nairobi",
		c: [
			"ET"
		],
		r: 1
	},
	"Africa/Algiers": {
		u: 60,
		c: [
			"DZ"
		]
	},
	"Africa/Asmara": {
		a: "Africa/Nairobi",
		c: [
			"ER"
		],
		r: 1
	},
	"Africa/Asmera": {
		a: "Africa/Nairobi",
		c: [
			"ER"
		],
		r: 1
	},
	"Africa/Bamako": {
		a: "Africa/Abidjan",
		c: [
			"ML"
		],
		r: 1
	},
	"Africa/Bangui": {
		a: "Africa/Lagos",
		c: [
			"CF"
		],
		r: 1
	},
	"Africa/Banjul": {
		a: "Africa/Abidjan",
		c: [
			"GM"
		],
		r: 1
	},
	"Africa/Bissau": {
		u: 0,
		c: [
			"GW"
		]
	},
	"Africa/Blantyre": {
		a: "Africa/Maputo",
		c: [
			"MW"
		],
		r: 1
	},
	"Africa/Brazzaville": {
		a: "Africa/Lagos",
		c: [
			"CG"
		],
		r: 1
	},
	"Africa/Bujumbura": {
		a: "Africa/Maputo",
		c: [
			"BI"
		],
		r: 1
	},
	"Africa/Cairo": {
		u: 120,
		c: [
			"EG"
		]
	},
	"Africa/Casablanca": {
		u: 60,
		d: 0,
		c: [
			"MA"
		]
	},
	"Africa/Ceuta": {
		u: 60,
		d: 120,
		c: [
			"ES"
		]
	},
	"Africa/Conakry": {
		a: "Africa/Abidjan",
		c: [
			"GN"
		],
		r: 1
	},
	"Africa/Dakar": {
		a: "Africa/Abidjan",
		c: [
			"SN"
		],
		r: 1
	},
	"Africa/Dar_es_Salaam": {
		a: "Africa/Nairobi",
		c: [
			"TZ"
		],
		r: 1
	},
	"Africa/Djibouti": {
		a: "Africa/Nairobi",
		c: [
			"DJ"
		],
		r: 1
	},
	"Africa/Douala": {
		a: "Africa/Lagos",
		c: [
			"CM"
		],
		r: 1
	},
	"Africa/El_Aaiun": {
		u: 60,
		d: 0,
		c: [
			"EH"
		]
	},
	"Africa/Freetown": {
		a: "Africa/Abidjan",
		c: [
			"SL"
		],
		r: 1
	},
	"Africa/Gaborone": {
		a: "Africa/Maputo",
		c: [
			"BW"
		],
		r: 1
	},
	"Africa/Harare": {
		a: "Africa/Maputo",
		c: [
			"ZW"
		],
		r: 1
	},
	"Africa/Johannesburg": {
		u: 120,
		c: [
			"ZA",
			"LS",
			"SZ"
		]
	},
	"Africa/Juba": {
		u: 120,
		c: [
			"SS"
		]
	},
	"Africa/Kampala": {
		a: "Africa/Nairobi",
		c: [
			"UG"
		],
		r: 1
	},
	"Africa/Khartoum": {
		u: 120,
		c: [
			"SD"
		]
	},
	"Africa/Kigali": {
		a: "Africa/Maputo",
		c: [
			"RW"
		],
		r: 1
	},
	"Africa/Kinshasa": {
		a: "Africa/Lagos",
		c: [
			"CD"
		],
		r: 1
	},
	"Africa/Lagos": {
		u: 60,
		c: [
			"NG",
			"AO",
			"BJ",
			"CD",
			"CF",
			"CG",
			"CM",
			"GA",
			"GQ",
			"NE"
		]
	},
	"Africa/Libreville": {
		a: "Africa/Lagos",
		c: [
			"GA"
		],
		r: 1
	},
	"Africa/Lome": {
		a: "Africa/Abidjan",
		c: [
			"TG"
		],
		r: 1
	},
	"Africa/Luanda": {
		a: "Africa/Lagos",
		c: [
			"AO"
		],
		r: 1
	},
	"Africa/Lubumbashi": {
		a: "Africa/Maputo",
		c: [
			"CD"
		],
		r: 1
	},
	"Africa/Lusaka": {
		a: "Africa/Maputo",
		c: [
			"ZM"
		],
		r: 1
	},
	"Africa/Malabo": {
		a: "Africa/Lagos",
		c: [
			"GQ"
		],
		r: 1
	},
	"Africa/Maputo": {
		u: 120,
		c: [
			"MZ",
			"BI",
			"BW",
			"CD",
			"MW",
			"RW",
			"ZM",
			"ZW"
		]
	},
	"Africa/Maseru": {
		a: "Africa/Johannesburg",
		c: [
			"LS"
		],
		r: 1
	},
	"Africa/Mbabane": {
		a: "Africa/Johannesburg",
		c: [
			"SZ"
		],
		r: 1
	},
	"Africa/Mogadishu": {
		a: "Africa/Nairobi",
		c: [
			"SO"
		],
		r: 1
	},
	"Africa/Monrovia": {
		u: 0,
		c: [
			"LR"
		]
	},
	"Africa/Nairobi": {
		u: 180,
		c: [
			"KE",
			"DJ",
			"ER",
			"ET",
			"KM",
			"MG",
			"SO",
			"TZ",
			"UG",
			"YT"
		]
	},
	"Africa/Ndjamena": {
		u: 60,
		c: [
			"TD"
		]
	},
	"Africa/Niamey": {
		a: "Africa/Lagos",
		c: [
			"NE"
		],
		r: 1
	},
	"Africa/Nouakchott": {
		a: "Africa/Abidjan",
		c: [
			"MR"
		],
		r: 1
	},
	"Africa/Ouagadougou": {
		a: "Africa/Abidjan",
		c: [
			"BF"
		],
		r: 1
	},
	"Africa/Porto-Novo": {
		a: "Africa/Lagos",
		c: [
			"BJ"
		],
		r: 1
	},
	"Africa/Sao_Tome": {
		u: 0,
		c: [
			"ST"
		]
	},
	"Africa/Timbuktu": {
		a: "Africa/Abidjan",
		c: [
			"ML"
		],
		r: 1
	},
	"Africa/Tripoli": {
		u: 120,
		c: [
			"LY"
		]
	},
	"Africa/Tunis": {
		u: 60,
		c: [
			"TN"
		]
	},
	"Africa/Windhoek": {
		u: 120,
		c: [
			"NA"
		]
	},
	"America/Adak": {
		u: -600,
		d: -540,
		c: [
			"US"
		]
	},
	"America/Anchorage": {
		u: -540,
		d: -480,
		c: [
			"US"
		]
	},
	"America/Anguilla": {
		a: "America/Puerto_Rico",
		c: [
			"AI"
		],
		r: 1
	},
	"America/Antigua": {
		a: "America/Puerto_Rico",
		c: [
			"AG"
		],
		r: 1
	},
	"America/Araguaina": {
		u: -180,
		c: [
			"BR"
		]
	},
	"America/Argentina/Buenos_Aires": {
		u: -180,
		c: [
			"AR"
		]
	},
	"America/Argentina/Catamarca": {
		u: -180,
		c: [
			"AR"
		]
	},
	"America/Argentina/ComodRivadavia": {
		a: "America/Argentina/Catamarca",
		r: 1
	},
	"America/Argentina/Cordoba": {
		u: -180,
		c: [
			"AR"
		]
	},
	"America/Argentina/Jujuy": {
		u: -180,
		c: [
			"AR"
		]
	},
	"America/Argentina/La_Rioja": {
		u: -180,
		c: [
			"AR"
		]
	},
	"America/Argentina/Mendoza": {
		u: -180,
		c: [
			"AR"
		]
	},
	"America/Argentina/Rio_Gallegos": {
		u: -180,
		c: [
			"AR"
		]
	},
	"America/Argentina/Salta": {
		u: -180,
		c: [
			"AR"
		]
	},
	"America/Argentina/San_Juan": {
		u: -180,
		c: [
			"AR"
		]
	},
	"America/Argentina/San_Luis": {
		u: -180,
		c: [
			"AR"
		]
	},
	"America/Argentina/Tucuman": {
		u: -180,
		c: [
			"AR"
		]
	},
	"America/Argentina/Ushuaia": {
		u: -180,
		c: [
			"AR"
		]
	},
	"America/Aruba": {
		a: "America/Puerto_Rico",
		c: [
			"AW"
		],
		r: 1
	},
	"America/Asuncion": {
		u: -240,
		d: -180,
		c: [
			"PY"
		]
	},
	"America/Atikokan": {
		a: "America/Panama",
		c: [
			"CA"
		],
		r: 1
	},
	"America/Atka": {
		a: "America/Adak",
		r: 1
	},
	"America/Bahia": {
		u: -180,
		c: [
			"BR"
		]
	},
	"America/Bahia_Banderas": {
		u: -360,
		d: -300,
		c: [
			"MX"
		]
	},
	"America/Barbados": {
		u: -240,
		c: [
			"BB"
		]
	},
	"America/Belem": {
		u: -180,
		c: [
			"BR"
		]
	},
	"America/Belize": {
		u: -360,
		c: [
			"BZ"
		]
	},
	"America/Blanc-Sablon": {
		a: "America/Puerto_Rico",
		c: [
			"CA"
		],
		r: 1
	},
	"America/Boa_Vista": {
		u: -240,
		c: [
			"BR"
		]
	},
	"America/Bogota": {
		u: -300,
		c: [
			"CO"
		]
	},
	"America/Boise": {
		u: -420,
		d: -360,
		c: [
			"US"
		]
	},
	"America/Buenos_Aires": {
		a: "America/Argentina/Buenos_Aires",
		r: 1
	},
	"America/Cambridge_Bay": {
		u: -420,
		d: -360,
		c: [
			"CA"
		]
	},
	"America/Campo_Grande": {
		u: -240,
		c: [
			"BR"
		]
	},
	"America/Cancun": {
		u: -300,
		c: [
			"MX"
		]
	},
	"America/Caracas": {
		u: -240,
		c: [
			"VE"
		]
	},
	"America/Catamarca": {
		a: "America/Argentina/Catamarca",
		r: 1
	},
	"America/Cayenne": {
		u: -180,
		c: [
			"GF"
		]
	},
	"America/Cayman": {
		a: "America/Panama",
		c: [
			"KY"
		],
		r: 1
	},
	"America/Chicago": {
		u: -360,
		d: -300,
		c: [
			"US"
		]
	},
	"America/Chihuahua": {
		u: -420,
		d: -360,
		c: [
			"MX"
		]
	},
	"America/Coral_Harbour": {
		a: "America/Panama",
		c: [
			"CA"
		],
		r: 1
	},
	"America/Cordoba": {
		a: "America/Argentina/Cordoba",
		r: 1
	},
	"America/Costa_Rica": {
		u: -360,
		c: [
			"CR"
		]
	},
	"America/Creston": {
		a: "America/Phoenix",
		c: [
			"CA"
		],
		r: 1
	},
	"America/Cuiaba": {
		u: -240,
		c: [
			"BR"
		]
	},
	"America/Curacao": {
		a: "America/Puerto_Rico",
		c: [
			"CW"
		],
		r: 1
	},
	"America/Danmarkshavn": {
		u: 0,
		c: [
			"GL"
		]
	},
	"America/Dawson": {
		u: -420,
		c: [
			"CA"
		]
	},
	"America/Dawson_Creek": {
		u: -420,
		c: [
			"CA"
		]
	},
	"America/Denver": {
		u: -420,
		d: -360,
		c: [
			"US"
		]
	},
	"America/Detroit": {
		u: -300,
		d: -240,
		c: [
			"US"
		]
	},
	"America/Dominica": {
		a: "America/Puerto_Rico",
		c: [
			"DM"
		],
		r: 1
	},
	"America/Edmonton": {
		u: -420,
		d: -360,
		c: [
			"CA"
		]
	},
	"America/Eirunepe": {
		u: -300,
		c: [
			"BR"
		]
	},
	"America/El_Salvador": {
		u: -360,
		c: [
			"SV"
		]
	},
	"America/Ensenada": {
		a: "America/Tijuana",
		r: 1
	},
	"America/Fort_Nelson": {
		u: -420,
		c: [
			"CA"
		]
	},
	"America/Fort_Wayne": {
		a: "America/Indiana/Indianapolis",
		r: 1
	},
	"America/Fortaleza": {
		u: -180,
		c: [
			"BR"
		]
	},
	"America/Glace_Bay": {
		u: -240,
		d: -180,
		c: [
			"CA"
		]
	},
	"America/Godthab": {
		a: "America/Nuuk",
		r: 1
	},
	"America/Goose_Bay": {
		u: -240,
		d: -180,
		c: [
			"CA"
		]
	},
	"America/Grand_Turk": {
		u: -300,
		d: -240,
		c: [
			"TC"
		]
	},
	"America/Grenada": {
		a: "America/Puerto_Rico",
		c: [
			"GD"
		],
		r: 1
	},
	"America/Guadeloupe": {
		a: "America/Puerto_Rico",
		c: [
			"GP"
		],
		r: 1
	},
	"America/Guatemala": {
		u: -360,
		c: [
			"GT"
		]
	},
	"America/Guayaquil": {
		u: -300,
		c: [
			"EC"
		]
	},
	"America/Guyana": {
		u: -240,
		c: [
			"GY"
		]
	},
	"America/Halifax": {
		u: -240,
		d: -180,
		c: [
			"CA"
		]
	},
	"America/Havana": {
		u: -300,
		d: -240,
		c: [
			"CU"
		]
	},
	"America/Hermosillo": {
		u: -420,
		c: [
			"MX"
		]
	},
	"America/Indiana/Indianapolis": {
		u: -300,
		d: -240,
		c: [
			"US"
		]
	},
	"America/Indiana/Knox": {
		u: -360,
		d: -300,
		c: [
			"US"
		]
	},
	"America/Indiana/Marengo": {
		u: -300,
		d: -240,
		c: [
			"US"
		]
	},
	"America/Indiana/Petersburg": {
		u: -300,
		d: -240,
		c: [
			"US"
		]
	},
	"America/Indiana/Tell_City": {
		u: -360,
		d: -300,
		c: [
			"US"
		]
	},
	"America/Indiana/Vevay": {
		u: -300,
		d: -240,
		c: [
			"US"
		]
	},
	"America/Indiana/Vincennes": {
		u: -300,
		d: -240,
		c: [
			"US"
		]
	},
	"America/Indiana/Winamac": {
		u: -300,
		d: -240,
		c: [
			"US"
		]
	},
	"America/Indianapolis": {
		a: "America/Indiana/Indianapolis",
		r: 1
	},
	"America/Inuvik": {
		u: -420,
		d: -360,
		c: [
			"CA"
		]
	},
	"America/Iqaluit": {
		u: -300,
		d: -240,
		c: [
			"CA"
		]
	},
	"America/Jamaica": {
		u: -300,
		c: [
			"JM"
		]
	},
	"America/Jujuy": {
		a: "America/Argentina/Jujuy",
		r: 1
	},
	"America/Juneau": {
		u: -540,
		d: -480,
		c: [
			"US"
		]
	},
	"America/Kentucky/Louisville": {
		u: -300,
		d: -240,
		c: [
			"US"
		]
	},
	"America/Kentucky/Monticello": {
		u: -300,
		d: -240,
		c: [
			"US"
		]
	},
	"America/Knox_IN": {
		a: "America/Indiana/Knox",
		r: 1
	},
	"America/Kralendijk": {
		a: "America/Puerto_Rico",
		c: [
			"BQ"
		],
		r: 1
	},
	"America/La_Paz": {
		u: -240,
		c: [
			"BO"
		]
	},
	"America/Lima": {
		u: -300,
		c: [
			"PE"
		]
	},
	"America/Los_Angeles": {
		u: -480,
		d: -420,
		c: [
			"US"
		]
	},
	"America/Louisville": {
		a: "America/Kentucky/Louisville",
		r: 1
	},
	"America/Lower_Princes": {
		a: "America/Puerto_Rico",
		c: [
			"SX"
		],
		r: 1
	},
	"America/Maceio": {
		u: -180,
		c: [
			"BR"
		]
	},
	"America/Managua": {
		u: -360,
		c: [
			"NI"
		]
	},
	"America/Manaus": {
		u: -240,
		c: [
			"BR"
		]
	},
	"America/Marigot": {
		a: "America/Puerto_Rico",
		c: [
			"MF"
		],
		r: 1
	},
	"America/Martinique": {
		u: -240,
		c: [
			"MQ"
		]
	},
	"America/Matamoros": {
		u: -360,
		d: -300,
		c: [
			"MX"
		]
	},
	"America/Mazatlan": {
		u: -420,
		d: -360,
		c: [
			"MX"
		]
	},
	"America/Mendoza": {
		a: "America/Argentina/Mendoza",
		r: 1
	},
	"America/Menominee": {
		u: -360,
		d: -300,
		c: [
			"US"
		]
	},
	"America/Merida": {
		u: -360,
		d: -300,
		c: [
			"MX"
		]
	},
	"America/Metlakatla": {
		u: -540,
		d: -480,
		c: [
			"US"
		]
	},
	"America/Mexico_City": {
		u: -360,
		d: -300,
		c: [
			"MX"
		]
	},
	"America/Miquelon": {
		u: -180,
		d: -120,
		c: [
			"PM"
		]
	},
	"America/Moncton": {
		u: -240,
		d: -180,
		c: [
			"CA"
		]
	},
	"America/Monterrey": {
		u: -360,
		d: -300,
		c: [
			"MX"
		]
	},
	"America/Montevideo": {
		u: -180,
		c: [
			"UY"
		]
	},
	"America/Montreal": {
		a: "America/Toronto",
		c: [
			"CA"
		],
		r: 1
	},
	"America/Montserrat": {
		a: "America/Puerto_Rico",
		c: [
			"MS"
		],
		r: 1
	},
	"America/Nassau": {
		a: "America/Toronto",
		c: [
			"BS"
		],
		r: 1
	},
	"America/New_York": {
		u: -300,
		d: -240,
		c: [
			"US"
		]
	},
	"America/Nipigon": {
		u: -300,
		d: -240,
		c: [
			"CA"
		]
	},
	"America/Nome": {
		u: -540,
		d: -480,
		c: [
			"US"
		]
	},
	"America/Noronha": {
		u: -120,
		c: [
			"BR"
		]
	},
	"America/North_Dakota/Beulah": {
		u: -360,
		d: -300,
		c: [
			"US"
		]
	},
	"America/North_Dakota/Center": {
		u: -360,
		d: -300,
		c: [
			"US"
		]
	},
	"America/North_Dakota/New_Salem": {
		u: -360,
		d: -300,
		c: [
			"US"
		]
	},
	"America/Nuuk": {
		u: -180,
		d: -120,
		c: [
			"GL"
		]
	},
	"America/Ojinaga": {
		u: -420,
		d: -360,
		c: [
			"MX"
		]
	},
	"America/Panama": {
		u: -300,
		c: [
			"PA",
			"CA",
			"KY"
		]
	},
	"America/Pangnirtung": {
		u: -300,
		d: -240,
		c: [
			"CA"
		]
	},
	"America/Paramaribo": {
		u: -180,
		c: [
			"SR"
		]
	},
	"America/Phoenix": {
		u: -420,
		c: [
			"US",
			"CA"
		]
	},
	"America/Port-au-Prince": {
		u: -300,
		d: -240,
		c: [
			"HT"
		]
	},
	"America/Port_of_Spain": {
		a: "America/Puerto_Rico",
		c: [
			"TT"
		],
		r: 1
	},
	"America/Porto_Acre": {
		a: "America/Rio_Branco",
		r: 1
	},
	"America/Porto_Velho": {
		u: -240,
		c: [
			"BR"
		]
	},
	"America/Puerto_Rico": {
		u: -240,
		c: [
			"PR",
			"AG",
			"CA",
			"AI",
			"AW",
			"BL",
			"BQ",
			"CW",
			"DM",
			"GD",
			"GP",
			"KN",
			"LC",
			"MF",
			"MS",
			"SX",
			"TT",
			"VC",
			"VG",
			"VI"
		]
	},
	"America/Punta_Arenas": {
		u: -180,
		c: [
			"CL"
		]
	},
	"America/Rainy_River": {
		u: -360,
		d: -300,
		c: [
			"CA"
		]
	},
	"America/Rankin_Inlet": {
		u: -360,
		d: -300,
		c: [
			"CA"
		]
	},
	"America/Recife": {
		u: -180,
		c: [
			"BR"
		]
	},
	"America/Regina": {
		u: -360,
		c: [
			"CA"
		]
	},
	"America/Resolute": {
		u: -360,
		d: -300,
		c: [
			"CA"
		]
	},
	"America/Rio_Branco": {
		u: -300,
		c: [
			"BR"
		]
	},
	"America/Rosario": {
		a: "America/Argentina/Cordoba",
		r: 1
	},
	"America/Santa_Isabel": {
		a: "America/Tijuana",
		r: 1
	},
	"America/Santarem": {
		u: -180,
		c: [
			"BR"
		]
	},
	"America/Santiago": {
		u: -240,
		d: -180,
		c: [
			"CL"
		]
	},
	"America/Santo_Domingo": {
		u: -240,
		c: [
			"DO"
		]
	},
	"America/Sao_Paulo": {
		u: -180,
		c: [
			"BR"
		]
	},
	"America/Scoresbysund": {
		u: -60,
		d: 0,
		c: [
			"GL"
		]
	},
	"America/Shiprock": {
		a: "America/Denver",
		r: 1
	},
	"America/Sitka": {
		u: -540,
		d: -480,
		c: [
			"US"
		]
	},
	"America/St_Barthelemy": {
		a: "America/Puerto_Rico",
		c: [
			"BL"
		],
		r: 1
	},
	"America/St_Johns": {
		u: -150,
		d: -90,
		c: [
			"CA"
		]
	},
	"America/St_Kitts": {
		a: "America/Puerto_Rico",
		c: [
			"KN"
		],
		r: 1
	},
	"America/St_Lucia": {
		a: "America/Puerto_Rico",
		c: [
			"LC"
		],
		r: 1
	},
	"America/St_Thomas": {
		a: "America/Puerto_Rico",
		c: [
			"VI"
		],
		r: 1
	},
	"America/St_Vincent": {
		a: "America/Puerto_Rico",
		c: [
			"VC"
		],
		r: 1
	},
	"America/Swift_Current": {
		u: -360,
		c: [
			"CA"
		]
	},
	"America/Tegucigalpa": {
		u: -360,
		c: [
			"HN"
		]
	},
	"America/Thule": {
		u: -240,
		d: -180,
		c: [
			"GL"
		]
	},
	"America/Thunder_Bay": {
		u: -300,
		d: -240,
		c: [
			"CA"
		]
	},
	"America/Tijuana": {
		u: -480,
		d: -420,
		c: [
			"MX"
		]
	},
	"America/Toronto": {
		u: -300,
		d: -240,
		c: [
			"CA",
			"BS"
		]
	},
	"America/Tortola": {
		a: "America/Puerto_Rico",
		c: [
			"VG"
		],
		r: 1
	},
	"America/Vancouver": {
		u: -480,
		d: -420,
		c: [
			"CA"
		]
	},
	"America/Virgin": {
		a: "America/Puerto_Rico",
		c: [
			"VI"
		],
		r: 1
	},
	"America/Whitehorse": {
		u: -420,
		c: [
			"CA"
		]
	},
	"America/Winnipeg": {
		u: -360,
		d: -300,
		c: [
			"CA"
		]
	},
	"America/Yakutat": {
		u: -540,
		d: -480,
		c: [
			"US"
		]
	},
	"America/Yellowknife": {
		u: -420,
		d: -360,
		c: [
			"CA"
		]
	},
	"Antarctica/Casey": {
		u: 660,
		c: [
			"AQ"
		]
	},
	"Antarctica/Davis": {
		u: 420,
		c: [
			"AQ"
		]
	},
	"Antarctica/DumontDUrville": {
		a: "Pacific/Port_Moresby",
		c: [
			"AQ"
		],
		r: 1
	},
	"Antarctica/Macquarie": {
		u: 600,
		d: 660,
		c: [
			"AU"
		]
	},
	"Antarctica/Mawson": {
		u: 300,
		c: [
			"AQ"
		]
	},
	"Antarctica/McMurdo": {
		a: "Pacific/Auckland",
		c: [
			"AQ"
		],
		r: 1
	},
	"Antarctica/Palmer": {
		u: -180,
		c: [
			"AQ"
		]
	},
	"Antarctica/Rothera": {
		u: -180,
		c: [
			"AQ"
		]
	},
	"Antarctica/South_Pole": {
		a: "Pacific/Auckland",
		c: [
			"AQ"
		],
		r: 1
	},
	"Antarctica/Syowa": {
		a: "Asia/Riyadh",
		c: [
			"AQ"
		],
		r: 1
	},
	"Antarctica/Troll": {
		u: 0,
		d: 120,
		c: [
			"AQ"
		]
	},
	"Antarctica/Vostok": {
		u: 360,
		c: [
			"AQ"
		]
	},
	"Arctic/Longyearbyen": {
		a: "Europe/Oslo",
		c: [
			"SJ"
		],
		r: 1
	},
	"Asia/Aden": {
		a: "Asia/Riyadh",
		c: [
			"YE"
		],
		r: 1
	},
	"Asia/Almaty": {
		u: 360,
		c: [
			"KZ"
		]
	},
	"Asia/Amman": {
		u: 120,
		d: 180,
		c: [
			"JO"
		]
	},
	"Asia/Anadyr": {
		u: 720,
		c: [
			"RU"
		]
	},
	"Asia/Aqtau": {
		u: 300,
		c: [
			"KZ"
		]
	},
	"Asia/Aqtobe": {
		u: 300,
		c: [
			"KZ"
		]
	},
	"Asia/Ashgabat": {
		u: 300,
		c: [
			"TM"
		]
	},
	"Asia/Ashkhabad": {
		a: "Asia/Ashgabat",
		r: 1
	},
	"Asia/Atyrau": {
		u: 300,
		c: [
			"KZ"
		]
	},
	"Asia/Baghdad": {
		u: 180,
		c: [
			"IQ"
		]
	},
	"Asia/Bahrain": {
		a: "Asia/Qatar",
		c: [
			"BH"
		],
		r: 1
	},
	"Asia/Baku": {
		u: 240,
		c: [
			"AZ"
		]
	},
	"Asia/Bangkok": {
		u: 420,
		c: [
			"TH",
			"KH",
			"LA",
			"VN"
		]
	},
	"Asia/Barnaul": {
		u: 420,
		c: [
			"RU"
		]
	},
	"Asia/Beirut": {
		u: 120,
		d: 180,
		c: [
			"LB"
		]
	},
	"Asia/Bishkek": {
		u: 360,
		c: [
			"KG"
		]
	},
	"Asia/Brunei": {
		u: 480,
		c: [
			"BN"
		]
	},
	"Asia/Calcutta": {
		a: "Asia/Kolkata",
		r: 1
	},
	"Asia/Chita": {
		u: 540,
		c: [
			"RU"
		]
	},
	"Asia/Choibalsan": {
		u: 480,
		c: [
			"MN"
		]
	},
	"Asia/Chongqing": {
		a: "Asia/Shanghai",
		r: 1
	},
	"Asia/Chungking": {
		a: "Asia/Shanghai",
		r: 1
	},
	"Asia/Colombo": {
		u: 330,
		c: [
			"LK"
		]
	},
	"Asia/Dacca": {
		a: "Asia/Dhaka",
		r: 1
	},
	"Asia/Damascus": {
		u: 120,
		d: 180,
		c: [
			"SY"
		]
	},
	"Asia/Dhaka": {
		u: 360,
		c: [
			"BD"
		]
	},
	"Asia/Dili": {
		u: 540,
		c: [
			"TL"
		]
	},
	"Asia/Dubai": {
		u: 240,
		c: [
			"AE",
			"OM"
		]
	},
	"Asia/Dushanbe": {
		u: 300,
		c: [
			"TJ"
		]
	},
	"Asia/Famagusta": {
		u: 120,
		d: 180,
		c: [
			"CY"
		]
	},
	"Asia/Gaza": {
		u: 120,
		d: 180,
		c: [
			"PS"
		]
	},
	"Asia/Harbin": {
		a: "Asia/Shanghai",
		r: 1
	},
	"Asia/Hebron": {
		u: 120,
		d: 180,
		c: [
			"PS"
		]
	},
	"Asia/Ho_Chi_Minh": {
		u: 420,
		c: [
			"VN"
		]
	},
	"Asia/Hong_Kong": {
		u: 480,
		c: [
			"HK"
		]
	},
	"Asia/Hovd": {
		u: 420,
		c: [
			"MN"
		]
	},
	"Asia/Irkutsk": {
		u: 480,
		c: [
			"RU"
		]
	},
	"Asia/Istanbul": {
		a: "Europe/Istanbul",
		r: 1
	},
	"Asia/Jakarta": {
		u: 420,
		c: [
			"ID"
		]
	},
	"Asia/Jayapura": {
		u: 540,
		c: [
			"ID"
		]
	},
	"Asia/Jerusalem": {
		u: 120,
		d: 180,
		c: [
			"IL"
		]
	},
	"Asia/Kabul": {
		u: 270,
		c: [
			"AF"
		]
	},
	"Asia/Kamchatka": {
		u: 720,
		c: [
			"RU"
		]
	},
	"Asia/Karachi": {
		u: 300,
		c: [
			"PK"
		]
	},
	"Asia/Kashgar": {
		a: "Asia/Urumqi",
		r: 1
	},
	"Asia/Kathmandu": {
		u: 345,
		c: [
			"NP"
		]
	},
	"Asia/Katmandu": {
		a: "Asia/Kathmandu",
		r: 1
	},
	"Asia/Khandyga": {
		u: 540,
		c: [
			"RU"
		]
	},
	"Asia/Kolkata": {
		u: 330,
		c: [
			"IN"
		]
	},
	"Asia/Krasnoyarsk": {
		u: 420,
		c: [
			"RU"
		]
	},
	"Asia/Kuala_Lumpur": {
		u: 480,
		c: [
			"MY"
		]
	},
	"Asia/Kuching": {
		u: 480,
		c: [
			"MY"
		]
	},
	"Asia/Kuwait": {
		a: "Asia/Riyadh",
		c: [
			"KW"
		],
		r: 1
	},
	"Asia/Macao": {
		a: "Asia/Macau",
		r: 1
	},
	"Asia/Macau": {
		u: 480,
		c: [
			"MO"
		]
	},
	"Asia/Magadan": {
		u: 660,
		c: [
			"RU"
		]
	},
	"Asia/Makassar": {
		u: 480,
		c: [
			"ID"
		]
	},
	"Asia/Manila": {
		u: 480,
		c: [
			"PH"
		]
	},
	"Asia/Muscat": {
		a: "Asia/Dubai",
		c: [
			"OM"
		],
		r: 1
	},
	"Asia/Nicosia": {
		u: 120,
		d: 180,
		c: [
			"CY"
		]
	},
	"Asia/Novokuznetsk": {
		u: 420,
		c: [
			"RU"
		]
	},
	"Asia/Novosibirsk": {
		u: 420,
		c: [
			"RU"
		]
	},
	"Asia/Omsk": {
		u: 360,
		c: [
			"RU"
		]
	},
	"Asia/Oral": {
		u: 300,
		c: [
			"KZ"
		]
	},
	"Asia/Phnom_Penh": {
		a: "Asia/Bangkok",
		c: [
			"KH"
		],
		r: 1
	},
	"Asia/Pontianak": {
		u: 420,
		c: [
			"ID"
		]
	},
	"Asia/Pyongyang": {
		u: 540,
		c: [
			"KP"
		]
	},
	"Asia/Qatar": {
		u: 180,
		c: [
			"QA",
			"BH"
		]
	},
	"Asia/Qostanay": {
		u: 360,
		c: [
			"KZ"
		]
	},
	"Asia/Qyzylorda": {
		u: 300,
		c: [
			"KZ"
		]
	},
	"Asia/Rangoon": {
		a: "Asia/Yangon",
		r: 1
	},
	"Asia/Riyadh": {
		u: 180,
		c: [
			"SA",
			"AQ",
			"KW",
			"YE"
		]
	},
	"Asia/Saigon": {
		a: "Asia/Ho_Chi_Minh",
		r: 1
	},
	"Asia/Sakhalin": {
		u: 660,
		c: [
			"RU"
		]
	},
	"Asia/Samarkand": {
		u: 300,
		c: [
			"UZ"
		]
	},
	"Asia/Seoul": {
		u: 540,
		c: [
			"KR"
		]
	},
	"Asia/Shanghai": {
		u: 480,
		c: [
			"CN"
		]
	},
	"Asia/Singapore": {
		u: 480,
		c: [
			"SG",
			"MY"
		]
	},
	"Asia/Srednekolymsk": {
		u: 660,
		c: [
			"RU"
		]
	},
	"Asia/Taipei": {
		u: 480,
		c: [
			"TW"
		]
	},
	"Asia/Tashkent": {
		u: 300,
		c: [
			"UZ"
		]
	},
	"Asia/Tbilisi": {
		u: 240,
		c: [
			"GE"
		]
	},
	"Asia/Tehran": {
		u: 210,
		d: 270,
		c: [
			"IR"
		]
	},
	"Asia/Tel_Aviv": {
		a: "Asia/Jerusalem",
		r: 1
	},
	"Asia/Thimbu": {
		a: "Asia/Thimphu",
		r: 1
	},
	"Asia/Thimphu": {
		u: 360,
		c: [
			"BT"
		]
	},
	"Asia/Tokyo": {
		u: 540,
		c: [
			"JP"
		]
	},
	"Asia/Tomsk": {
		u: 420,
		c: [
			"RU"
		]
	},
	"Asia/Ujung_Pandang": {
		a: "Asia/Makassar",
		r: 1
	},
	"Asia/Ulaanbaatar": {
		u: 480,
		c: [
			"MN"
		]
	},
	"Asia/Ulan_Bator": {
		a: "Asia/Ulaanbaatar",
		r: 1
	},
	"Asia/Urumqi": {
		u: 360,
		c: [
			"CN"
		]
	},
	"Asia/Ust-Nera": {
		u: 600,
		c: [
			"RU"
		]
	},
	"Asia/Vientiane": {
		a: "Asia/Bangkok",
		c: [
			"LA"
		],
		r: 1
	},
	"Asia/Vladivostok": {
		u: 600,
		c: [
			"RU"
		]
	},
	"Asia/Yakutsk": {
		u: 540,
		c: [
			"RU"
		]
	},
	"Asia/Yangon": {
		u: 390,
		c: [
			"MM"
		]
	},
	"Asia/Yekaterinburg": {
		u: 300,
		c: [
			"RU"
		]
	},
	"Asia/Yerevan": {
		u: 240,
		c: [
			"AM"
		]
	},
	"Atlantic/Azores": {
		u: -60,
		d: 0,
		c: [
			"PT"
		]
	},
	"Atlantic/Bermuda": {
		u: -240,
		d: -180,
		c: [
			"BM"
		]
	},
	"Atlantic/Canary": {
		u: 0,
		d: 60,
		c: [
			"ES"
		]
	},
	"Atlantic/Cape_Verde": {
		u: -60,
		c: [
			"CV"
		]
	},
	"Atlantic/Faeroe": {
		a: "Atlantic/Faroe",
		r: 1
	},
	"Atlantic/Faroe": {
		u: 0,
		d: 60,
		c: [
			"FO"
		]
	},
	"Atlantic/Jan_Mayen": {
		a: "Europe/Oslo",
		c: [
			"SJ"
		],
		r: 1
	},
	"Atlantic/Madeira": {
		u: 0,
		d: 60,
		c: [
			"PT"
		]
	},
	"Atlantic/Reykjavik": {
		u: 0,
		c: [
			"IS"
		]
	},
	"Atlantic/South_Georgia": {
		u: -120,
		c: [
			"GS"
		]
	},
	"Atlantic/St_Helena": {
		a: "Africa/Abidjan",
		c: [
			"SH"
		],
		r: 1
	},
	"Atlantic/Stanley": {
		u: -180,
		c: [
			"FK"
		]
	},
	"Australia/ACT": {
		a: "Australia/Sydney",
		r: 1
	},
	"Australia/Adelaide": {
		u: 570,
		d: 630,
		c: [
			"AU"
		]
	},
	"Australia/Brisbane": {
		u: 600,
		c: [
			"AU"
		]
	},
	"Australia/Broken_Hill": {
		u: 570,
		d: 630,
		c: [
			"AU"
		]
	},
	"Australia/Canberra": {
		a: "Australia/Sydney",
		r: 1
	},
	"Australia/Currie": {
		a: "Australia/Hobart",
		r: 1
	},
	"Australia/Darwin": {
		u: 570,
		c: [
			"AU"
		]
	},
	"Australia/Eucla": {
		u: 525,
		c: [
			"AU"
		]
	},
	"Australia/Hobart": {
		u: 600,
		d: 660,
		c: [
			"AU"
		]
	},
	"Australia/LHI": {
		a: "Australia/Lord_Howe",
		r: 1
	},
	"Australia/Lindeman": {
		u: 600,
		c: [
			"AU"
		]
	},
	"Australia/Lord_Howe": {
		u: 630,
		d: 660,
		c: [
			"AU"
		]
	},
	"Australia/Melbourne": {
		u: 600,
		d: 660,
		c: [
			"AU"
		]
	},
	"Australia/NSW": {
		a: "Australia/Sydney",
		r: 1
	},
	"Australia/North": {
		a: "Australia/Darwin",
		r: 1
	},
	"Australia/Perth": {
		u: 480,
		c: [
			"AU"
		]
	},
	"Australia/Queensland": {
		a: "Australia/Brisbane",
		r: 1
	},
	"Australia/South": {
		a: "Australia/Adelaide",
		r: 1
	},
	"Australia/Sydney": {
		u: 600,
		d: 660,
		c: [
			"AU"
		]
	},
	"Australia/Tasmania": {
		a: "Australia/Hobart",
		r: 1
	},
	"Australia/Victoria": {
		a: "Australia/Melbourne",
		r: 1
	},
	"Australia/West": {
		a: "Australia/Perth",
		r: 1
	},
	"Australia/Yancowinna": {
		a: "Australia/Broken_Hill",
		r: 1
	},
	"Brazil/Acre": {
		a: "America/Rio_Branco",
		r: 1
	},
	"Brazil/DeNoronha": {
		a: "America/Noronha",
		r: 1
	},
	"Brazil/East": {
		a: "America/Sao_Paulo",
		r: 1
	},
	"Brazil/West": {
		a: "America/Manaus",
		r: 1
	},
	CET: {
		u: 60,
		d: 120
	},
	CST6CDT: {
		u: -360,
		d: -300
	},
	"Canada/Atlantic": {
		a: "America/Halifax",
		r: 1
	},
	"Canada/Central": {
		a: "America/Winnipeg",
		r: 1
	},
	"Canada/Eastern": {
		a: "America/Toronto",
		c: [
			"CA"
		],
		r: 1
	},
	"Canada/Mountain": {
		a: "America/Edmonton",
		r: 1
	},
	"Canada/Newfoundland": {
		a: "America/St_Johns",
		r: 1
	},
	"Canada/Pacific": {
		a: "America/Vancouver",
		r: 1
	},
	"Canada/Saskatchewan": {
		a: "America/Regina",
		r: 1
	},
	"Canada/Yukon": {
		a: "America/Whitehorse",
		r: 1
	},
	"Chile/Continental": {
		a: "America/Santiago",
		r: 1
	},
	"Chile/EasterIsland": {
		a: "Pacific/Easter",
		r: 1
	},
	Cuba: {
		a: "America/Havana",
		r: 1
	},
	EET: {
		u: 120,
		d: 180
	},
	EST: {
		u: -300
	},
	EST5EDT: {
		u: -300,
		d: -240
	},
	Egypt: {
		a: "Africa/Cairo",
		r: 1
	},
	Eire: {
		a: "Europe/Dublin",
		r: 1
	},
	"Etc/GMT": {
		u: 0
	},
	"Etc/GMT+0": {
		a: "Etc/GMT",
		r: 1
	},
	"Etc/GMT+1": {
		u: -60
	},
	"Etc/GMT+10": {
		u: -600
	},
	"Etc/GMT+11": {
		u: -660
	},
	"Etc/GMT+12": {
		u: -720
	},
	"Etc/GMT+2": {
		u: -120
	},
	"Etc/GMT+3": {
		u: -180
	},
	"Etc/GMT+4": {
		u: -240
	},
	"Etc/GMT+5": {
		u: -300
	},
	"Etc/GMT+6": {
		u: -360
	},
	"Etc/GMT+7": {
		u: -420
	},
	"Etc/GMT+8": {
		u: -480
	},
	"Etc/GMT+9": {
		u: -540
	},
	"Etc/GMT-0": {
		a: "Etc/GMT",
		r: 1
	},
	"Etc/GMT-1": {
		u: 60
	},
	"Etc/GMT-10": {
		u: 600
	},
	"Etc/GMT-11": {
		u: 660
	},
	"Etc/GMT-12": {
		u: 720
	},
	"Etc/GMT-13": {
		u: 780
	},
	"Etc/GMT-14": {
		u: 840
	},
	"Etc/GMT-2": {
		u: 120
	},
	"Etc/GMT-3": {
		u: 180
	},
	"Etc/GMT-4": {
		u: 240
	},
	"Etc/GMT-5": {
		u: 300
	},
	"Etc/GMT-6": {
		u: 360
	},
	"Etc/GMT-7": {
		u: 420
	},
	"Etc/GMT-8": {
		u: 480
	},
	"Etc/GMT-9": {
		u: 540
	},
	"Etc/GMT0": {
		a: "Etc/GMT",
		r: 1
	},
	"Etc/Greenwich": {
		a: "Etc/GMT",
		r: 1
	},
	"Etc/UCT": {
		a: "Etc/UTC",
		r: 1
	},
	"Etc/UTC": {
		u: 0
	},
	"Etc/Universal": {
		a: "Etc/UTC",
		r: 1
	},
	"Etc/Zulu": {
		a: "Etc/UTC",
		r: 1
	},
	"Europe/Amsterdam": {
		u: 60,
		d: 120,
		c: [
			"NL"
		]
	},
	"Europe/Andorra": {
		u: 60,
		d: 120,
		c: [
			"AD"
		]
	},
	"Europe/Astrakhan": {
		u: 240,
		c: [
			"RU"
		]
	},
	"Europe/Athens": {
		u: 120,
		d: 180,
		c: [
			"GR"
		]
	},
	"Europe/Belfast": {
		a: "Europe/London",
		c: [
			"GB"
		],
		r: 1
	},
	"Europe/Belgrade": {
		u: 60,
		d: 120,
		c: [
			"RS",
			"BA",
			"HR",
			"ME",
			"MK",
			"SI"
		]
	},
	"Europe/Berlin": {
		u: 60,
		d: 120,
		c: [
			"DE"
		]
	},
	"Europe/Bratislava": {
		a: "Europe/Prague",
		c: [
			"SK"
		],
		r: 1
	},
	"Europe/Brussels": {
		u: 60,
		d: 120,
		c: [
			"BE"
		]
	},
	"Europe/Bucharest": {
		u: 120,
		d: 180,
		c: [
			"RO"
		]
	},
	"Europe/Budapest": {
		u: 60,
		d: 120,
		c: [
			"HU"
		]
	},
	"Europe/Busingen": {
		a: "Europe/Zurich",
		c: [
			"DE"
		],
		r: 1
	},
	"Europe/Chisinau": {
		u: 120,
		d: 180,
		c: [
			"MD"
		]
	},
	"Europe/Copenhagen": {
		u: 60,
		d: 120,
		c: [
			"DK"
		]
	},
	"Europe/Dublin": {
		u: 60,
		d: 0,
		c: [
			"IE"
		]
	},
	"Europe/Gibraltar": {
		u: 60,
		d: 120,
		c: [
			"GI"
		]
	},
	"Europe/Guernsey": {
		a: "Europe/London",
		c: [
			"GG"
		],
		r: 1
	},
	"Europe/Helsinki": {
		u: 120,
		d: 180,
		c: [
			"FI",
			"AX"
		]
	},
	"Europe/Isle_of_Man": {
		a: "Europe/London",
		c: [
			"IM"
		],
		r: 1
	},
	"Europe/Istanbul": {
		u: 180,
		c: [
			"TR"
		]
	},
	"Europe/Jersey": {
		a: "Europe/London",
		c: [
			"JE"
		],
		r: 1
	},
	"Europe/Kaliningrad": {
		u: 120,
		c: [
			"RU"
		]
	},
	"Europe/Kiev": {
		u: 120,
		d: 180,
		c: [
			"UA"
		]
	},
	"Europe/Kirov": {
		u: 180,
		c: [
			"RU"
		]
	},
	"Europe/Lisbon": {
		u: 0,
		d: 60,
		c: [
			"PT"
		]
	},
	"Europe/Ljubljana": {
		a: "Europe/Belgrade",
		c: [
			"SI"
		],
		r: 1
	},
	"Europe/London": {
		u: 0,
		d: 60,
		c: [
			"GB",
			"GG",
			"IM",
			"JE"
		]
	},
	"Europe/Luxembourg": {
		u: 60,
		d: 120,
		c: [
			"LU"
		]
	},
	"Europe/Madrid": {
		u: 60,
		d: 120,
		c: [
			"ES"
		]
	},
	"Europe/Malta": {
		u: 60,
		d: 120,
		c: [
			"MT"
		]
	},
	"Europe/Mariehamn": {
		a: "Europe/Helsinki",
		c: [
			"AX"
		],
		r: 1
	},
	"Europe/Minsk": {
		u: 180,
		c: [
			"BY"
		]
	},
	"Europe/Monaco": {
		u: 60,
		d: 120,
		c: [
			"MC"
		]
	},
	"Europe/Moscow": {
		u: 180,
		c: [
			"RU"
		]
	},
	"Europe/Nicosia": {
		a: "Asia/Nicosia",
		r: 1
	},
	"Europe/Oslo": {
		u: 60,
		d: 120,
		c: [
			"NO",
			"SJ",
			"BV"
		]
	},
	"Europe/Paris": {
		u: 60,
		d: 120,
		c: [
			"FR"
		]
	},
	"Europe/Podgorica": {
		a: "Europe/Belgrade",
		c: [
			"ME"
		],
		r: 1
	},
	"Europe/Prague": {
		u: 60,
		d: 120,
		c: [
			"CZ",
			"SK"
		]
	},
	"Europe/Riga": {
		u: 120,
		d: 180,
		c: [
			"LV"
		]
	},
	"Europe/Rome": {
		u: 60,
		d: 120,
		c: [
			"IT",
			"SM",
			"VA"
		]
	},
	"Europe/Samara": {
		u: 240,
		c: [
			"RU"
		]
	},
	"Europe/San_Marino": {
		a: "Europe/Rome",
		c: [
			"SM"
		],
		r: 1
	},
	"Europe/Sarajevo": {
		a: "Europe/Belgrade",
		c: [
			"BA"
		],
		r: 1
	},
	"Europe/Saratov": {
		u: 240,
		c: [
			"RU"
		]
	},
	"Europe/Simferopol": {
		u: 180,
		c: [
			"RU",
			"UA"
		]
	},
	"Europe/Skopje": {
		a: "Europe/Belgrade",
		c: [
			"MK"
		],
		r: 1
	},
	"Europe/Sofia": {
		u: 120,
		d: 180,
		c: [
			"BG"
		]
	},
	"Europe/Stockholm": {
		u: 60,
		d: 120,
		c: [
			"SE"
		]
	},
	"Europe/Tallinn": {
		u: 120,
		d: 180,
		c: [
			"EE"
		]
	},
	"Europe/Tirane": {
		u: 60,
		d: 120,
		c: [
			"AL"
		]
	},
	"Europe/Tiraspol": {
		a: "Europe/Chisinau",
		r: 1
	},
	"Europe/Ulyanovsk": {
		u: 240,
		c: [
			"RU"
		]
	},
	"Europe/Uzhgorod": {
		u: 120,
		d: 180,
		c: [
			"UA"
		]
	},
	"Europe/Vaduz": {
		a: "Europe/Zurich",
		c: [
			"LI"
		],
		r: 1
	},
	"Europe/Vatican": {
		a: "Europe/Rome",
		c: [
			"VA"
		],
		r: 1
	},
	"Europe/Vienna": {
		u: 60,
		d: 120,
		c: [
			"AT"
		]
	},
	"Europe/Vilnius": {
		u: 120,
		d: 180,
		c: [
			"LT"
		]
	},
	"Europe/Volgograd": {
		u: 180,
		c: [
			"RU"
		]
	},
	"Europe/Warsaw": {
		u: 60,
		d: 120,
		c: [
			"PL"
		]
	},
	"Europe/Zagreb": {
		a: "Europe/Belgrade",
		c: [
			"HR"
		],
		r: 1
	},
	"Europe/Zaporozhye": {
		u: 120,
		d: 180,
		c: [
			"UA"
		]
	},
	"Europe/Zurich": {
		u: 60,
		d: 120,
		c: [
			"CH",
			"DE",
			"LI"
		]
	},
	Factory: {
		u: 0
	},
	GB: {
		a: "Europe/London",
		c: [
			"GB"
		],
		r: 1
	},
	"GB-Eire": {
		a: "Europe/London",
		c: [
			"GB"
		],
		r: 1
	},
	GMT: {
		a: "Etc/GMT",
		r: 1
	},
	"GMT+0": {
		a: "Etc/GMT",
		r: 1
	},
	"GMT-0": {
		a: "Etc/GMT",
		r: 1
	},
	GMT0: {
		a: "Etc/GMT",
		r: 1
	},
	Greenwich: {
		a: "Etc/GMT",
		r: 1
	},
	HST: {
		u: -600
	},
	Hongkong: {
		a: "Asia/Hong_Kong",
		r: 1
	},
	Iceland: {
		a: "Atlantic/Reykjavik",
		r: 1
	},
	"Indian/Antananarivo": {
		a: "Africa/Nairobi",
		c: [
			"MG"
		],
		r: 1
	},
	"Indian/Chagos": {
		u: 360,
		c: [
			"IO"
		]
	},
	"Indian/Christmas": {
		u: 420,
		c: [
			"CX"
		]
	},
	"Indian/Cocos": {
		u: 390,
		c: [
			"CC"
		]
	},
	"Indian/Comoro": {
		a: "Africa/Nairobi",
		c: [
			"KM"
		],
		r: 1
	},
	"Indian/Kerguelen": {
		u: 300,
		c: [
			"TF",
			"HM"
		]
	},
	"Indian/Mahe": {
		u: 240,
		c: [
			"SC"
		]
	},
	"Indian/Maldives": {
		u: 300,
		c: [
			"MV"
		]
	},
	"Indian/Mauritius": {
		u: 240,
		c: [
			"MU"
		]
	},
	"Indian/Mayotte": {
		a: "Africa/Nairobi",
		c: [
			"YT"
		],
		r: 1
	},
	"Indian/Reunion": {
		u: 240,
		c: [
			"RE",
			"TF"
		]
	},
	Iran: {
		a: "Asia/Tehran",
		r: 1
	},
	Israel: {
		a: "Asia/Jerusalem",
		r: 1
	},
	Jamaica: {
		a: "America/Jamaica",
		r: 1
	},
	Japan: {
		a: "Asia/Tokyo",
		r: 1
	},
	Kwajalein: {
		a: "Pacific/Kwajalein",
		r: 1
	},
	Libya: {
		a: "Africa/Tripoli",
		r: 1
	},
	MET: {
		u: 60,
		d: 120
	},
	MST: {
		u: -420
	},
	MST7MDT: {
		u: -420,
		d: -360
	},
	"Mexico/BajaNorte": {
		a: "America/Tijuana",
		r: 1
	},
	"Mexico/BajaSur": {
		a: "America/Mazatlan",
		r: 1
	},
	"Mexico/General": {
		a: "America/Mexico_City",
		r: 1
	},
	NZ: {
		a: "Pacific/Auckland",
		c: [
			"NZ"
		],
		r: 1
	},
	"NZ-CHAT": {
		a: "Pacific/Chatham",
		r: 1
	},
	Navajo: {
		a: "America/Denver",
		r: 1
	},
	PRC: {
		a: "Asia/Shanghai",
		r: 1
	},
	PST8PDT: {
		u: -480,
		d: -420
	},
	"Pacific/Apia": {
		u: 780,
		c: [
			"WS"
		]
	},
	"Pacific/Auckland": {
		u: 720,
		d: 780,
		c: [
			"NZ",
			"AQ"
		]
	},
	"Pacific/Bougainville": {
		u: 660,
		c: [
			"PG"
		]
	},
	"Pacific/Chatham": {
		u: 765,
		d: 825,
		c: [
			"NZ"
		]
	},
	"Pacific/Chuuk": {
		u: 600,
		c: [
			"FM"
		]
	},
	"Pacific/Easter": {
		u: -360,
		d: -300,
		c: [
			"CL"
		]
	},
	"Pacific/Efate": {
		u: 660,
		c: [
			"VU"
		]
	},
	"Pacific/Enderbury": {
		a: "Pacific/Kanton",
		r: 1
	},
	"Pacific/Fakaofo": {
		u: 780,
		c: [
			"TK"
		]
	},
	"Pacific/Fiji": {
		u: 720,
		d: 780,
		c: [
			"FJ"
		]
	},
	"Pacific/Funafuti": {
		u: 720,
		c: [
			"TV"
		]
	},
	"Pacific/Galapagos": {
		u: -360,
		c: [
			"EC"
		]
	},
	"Pacific/Gambier": {
		u: -540,
		c: [
			"PF"
		]
	},
	"Pacific/Guadalcanal": {
		u: 660,
		c: [
			"SB"
		]
	},
	"Pacific/Guam": {
		u: 600,
		c: [
			"GU",
			"MP"
		]
	},
	"Pacific/Honolulu": {
		u: -600,
		c: [
			"US",
			"UM"
		]
	},
	"Pacific/Johnston": {
		a: "Pacific/Honolulu",
		c: [
			"UM"
		],
		r: 1
	},
	"Pacific/Kanton": {
		u: 780,
		c: [
			"KI"
		]
	},
	"Pacific/Kiritimati": {
		u: 840,
		c: [
			"KI"
		]
	},
	"Pacific/Kosrae": {
		u: 660,
		c: [
			"FM"
		]
	},
	"Pacific/Kwajalein": {
		u: 720,
		c: [
			"MH"
		]
	},
	"Pacific/Majuro": {
		u: 720,
		c: [
			"MH"
		]
	},
	"Pacific/Marquesas": {
		u: -510,
		c: [
			"PF"
		]
	},
	"Pacific/Midway": {
		a: "Pacific/Pago_Pago",
		c: [
			"UM"
		],
		r: 1
	},
	"Pacific/Nauru": {
		u: 720,
		c: [
			"NR"
		]
	},
	"Pacific/Niue": {
		u: -660,
		c: [
			"NU"
		]
	},
	"Pacific/Norfolk": {
		u: 660,
		d: 720,
		c: [
			"NF"
		]
	},
	"Pacific/Noumea": {
		u: 660,
		c: [
			"NC"
		]
	},
	"Pacific/Pago_Pago": {
		u: -660,
		c: [
			"AS",
			"UM"
		]
	},
	"Pacific/Palau": {
		u: 540,
		c: [
			"PW"
		]
	},
	"Pacific/Pitcairn": {
		u: -480,
		c: [
			"PN"
		]
	},
	"Pacific/Pohnpei": {
		u: 660,
		c: [
			"FM"
		]
	},
	"Pacific/Ponape": {
		a: "Pacific/Pohnpei",
		r: 1
	},
	"Pacific/Port_Moresby": {
		u: 600,
		c: [
			"PG",
			"AQ"
		]
	},
	"Pacific/Rarotonga": {
		u: -600,
		c: [
			"CK"
		]
	},
	"Pacific/Saipan": {
		a: "Pacific/Guam",
		c: [
			"MP"
		],
		r: 1
	},
	"Pacific/Samoa": {
		a: "Pacific/Pago_Pago",
		c: [
			"WS"
		],
		r: 1
	},
	"Pacific/Tahiti": {
		u: -600,
		c: [
			"PF"
		]
	},
	"Pacific/Tarawa": {
		u: 720,
		c: [
			"KI"
		]
	},
	"Pacific/Tongatapu": {
		u: 780,
		c: [
			"TO"
		]
	},
	"Pacific/Truk": {
		a: "Pacific/Chuuk",
		r: 1
	},
	"Pacific/Wake": {
		u: 720,
		c: [
			"UM"
		]
	},
	"Pacific/Wallis": {
		u: 720,
		c: [
			"WF"
		]
	},
	"Pacific/Yap": {
		a: "Pacific/Chuuk",
		r: 1
	},
	Poland: {
		a: "Europe/Warsaw",
		r: 1
	},
	Portugal: {
		a: "Europe/Lisbon",
		r: 1
	},
	ROC: {
		a: "Asia/Taipei",
		r: 1
	},
	ROK: {
		a: "Asia/Seoul",
		r: 1
	},
	Singapore: {
		a: "Asia/Singapore",
		c: [
			"SG"
		],
		r: 1
	},
	Turkey: {
		a: "Europe/Istanbul",
		r: 1
	},
	UCT: {
		a: "Etc/UTC",
		r: 1
	},
	"US/Alaska": {
		a: "America/Anchorage",
		r: 1
	},
	"US/Aleutian": {
		a: "America/Adak",
		r: 1
	},
	"US/Arizona": {
		a: "America/Phoenix",
		c: [
			"US"
		],
		r: 1
	},
	"US/Central": {
		a: "America/Chicago",
		r: 1
	},
	"US/East-Indiana": {
		a: "America/Indiana/Indianapolis",
		r: 1
	},
	"US/Eastern": {
		a: "America/New_York",
		r: 1
	},
	"US/Hawaii": {
		a: "Pacific/Honolulu",
		c: [
			"US"
		],
		r: 1
	},
	"US/Indiana-Starke": {
		a: "America/Indiana/Knox",
		r: 1
	},
	"US/Michigan": {
		a: "America/Detroit",
		r: 1
	},
	"US/Mountain": {
		a: "America/Denver",
		r: 1
	},
	"US/Pacific": {
		a: "America/Los_Angeles",
		r: 1
	},
	"US/Samoa": {
		a: "Pacific/Pago_Pago",
		c: [
			"WS"
		],
		r: 1
	},
	UTC: {
		a: "Etc/UTC",
		r: 1
	},
	Universal: {
		a: "Etc/UTC",
		r: 1
	},
	"W-SU": {
		a: "Europe/Moscow",
		r: 1
	},
	WET: {
		u: 0,
		d: 60
	},
	Zulu: {
		a: "Etc/UTC",
		r: 1
	}
};
var data = {
	countries: countries$1,
	timezones: timezones$1
};

var timezonesMap;
function buildCountry(data, id) {
  var name = data.countries[id];
  if (!name) return null;
  var tzMap = getTimezonesMap(data)[id] || {};
  return {
    id: id,
    name: name,
    timezones: tzMap.current || [],
    allTimezones: tzMap.all || []
  };
}

function getTimezonesMap(data) {
  if (!timezonesMap) timezonesMap = buildTimezonesMap(data);
  return timezonesMap;
}

function buildTimezonesMap(data) {
  return Object.keys(data.timezones).reduce(function (result, id) {
    var tz = data.timezones[id];
    var c = tz.c,
        a = tz.a;
    var aliasTz = data.timezones[a] || {};
    var countries = c || aliasTz.c;
    if (!countries) return result;
    countries.forEach(function (country) {
      if (!result[country]) Object.assign(result, _defineProperty({}, country, {
        current: [],
        all: []
      }));
      if (tz.r === undefined) result[country].current.push(id);
      result[country].all.push(id);
    });
    return result;
  }, {});
}

function buildTimezone(data, name) {
  var timezone = data.timezones[name];
  if (!timezone) return null;
  var _timezone$a = timezone.a,
      aliasOf = _timezone$a === void 0 ? null : _timezone$a;
  var aliasTz = aliasOf ? data.timezones[aliasOf] : {};

  var tz = _objectSpread2(_objectSpread2({}, aliasTz), data.timezones[name]);

  var countries = tz.c || [];
  var utcOffset = tz.u;
  var dstOffset = Number.isInteger(tz.d) ? tz.d : utcOffset;
  var result = {
    name: name,
    countries: countries,
    utcOffset: utcOffset,
    utcOffsetStr: getOffsetStr(utcOffset),
    dstOffset: dstOffset,
    dstOffsetStr: getOffsetStr(dstOffset),
    aliasOf: aliasOf
  };
  if (timezone.r) result.deprecated = true;
  return result;
}

function getOffsetStr(offset) {
  var hours = Math.floor(offset / 60);
  var min = offset % 60;
  var sign = offset < 0 ? '-' : '+';
  return "".concat(sign).concat(getNumStr(hours), ":").concat(getNumStr(min));
}

function getNumStr(input) {
  var num = Math.abs(input);
  var prefix = num < 10 ? '0' : '';
  return "".concat(prefix).concat(num);
}

var _excluded = ["allTimezones"];
var totalTimezones = Object.keys(data.timezones).length;
var countries = {};
var timezones = {};
var memoizedTimezones = 0;
function getAllCountries() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Object.keys(data.countries).reduce(function (prev, id) {
    return Object.assign(prev, _defineProperty({}, id, getCountry(id, options)));
  }, {});
}
function getAllTimezones() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (totalTimezones !== memoizedTimezones) Object.keys(data.timezones).forEach(getTimezone);
  return deliverTimezones(timezones, options);
}
function getCountry(id) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (!countries[id]) memoizeCountry(buildCountry(data, id));
  return deliverCountry(countries[id], options);
}

function memoizeCountry(country) {
  if (!country) return;
  countries[country.id] = country;
}

function getTimezone(name) {
  if (!timezones[name]) memoizeTimezone(buildTimezone(data, name));
  return timezones[name] ? _objectSpread2({}, timezones[name]) : null;
}

function memoizeTimezone(timezone) {
  if (!timezone) return;
  timezones[timezone.name] = timezone;
  memoizedTimezones = Object.keys(timezone).length;
}

function getCountriesForTimezone(tzName) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var timezone = getTimezone(tzName) || {};
  var values = timezone.countries || [];
  return values.map(function (c) {
    return getCountry(c, options);
  });
}
function getCountryForTimezone(tzName) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var _getCountriesForTimez = getCountriesForTimezone(tzName, options),
      _getCountriesForTimez2 = _slicedToArray(_getCountriesForTimez, 1),
      main = _getCountriesForTimez2[0];

  return main || null;
}
function getTimezonesForCountry(countryId) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var country = getCountry(countryId, options);
  if (!country) return null;
  var values = country.timezones || [];
  return values.map(getTimezone);
}

function deliverTimezones(tzs, options) {
  var _ref = options || {},
      deprecated = _ref.deprecated;

  if (deprecated === true) return tzs;
  return Object.keys(tzs).reduce(function (prev, key) {
    if (!tzs[key].deprecated) Object.assign(prev, _defineProperty({}, key, tzs[key]));
    return prev;
  }, {});
}

function deliverCountry(country, options) {
  if (!country) return null;

  var _ref2 = options || {},
      deprecated = _ref2.deprecated;

  country.allTimezones;
      var other = _objectWithoutProperties(country, _excluded);

  var tz = deprecated ? country.allTimezones : country.timezones;
  return _objectSpread2(_objectSpread2({}, other), {}, {
    timezones: tz
  });
}

var index = {
  getCountry: getCountry,
  getTimezone: getTimezone,
  getAllCountries: getAllCountries,
  getAllTimezones: getAllTimezones,
  getTimezonesForCountry: getTimezonesForCountry,
  getCountriesForTimezone: getCountriesForTimezone,
  getCountryForTimezone: getCountryForTimezone
};


//# sourceMappingURL=index.js.map


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_objects_UI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/objects/UI */ "./src/modules/objects/UI.js");
/* harmony import */ var _modules_util_DataFetcher_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/util/DataFetcher.js */ "./src/modules/util/DataFetcher.js");
/* harmony import */ var _modules_util_Time__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/util/Time */ "./src/modules/util/Time.js");



console.log((0,_modules_util_DataFetcher_js__WEBPACK_IMPORTED_MODULE_1__.getWeather)("manila"));
(0,_modules_objects_UI__WEBPACK_IMPORTED_MODULE_0__.initEvents)();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBaUQ7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLDZEQUFVO0FBQ2hDLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVzQjs7Ozs7Ozs7Ozs7Ozs7O0FDekR0QjtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxPQUFPLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzQmlDO0FBQ1M7QUFDbEI7O0FBRS9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkRBQTJELFNBQVMsU0FBUyxjQUFjO0FBQzNGLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDREQUFxQjtBQUMxQztBQUNBLHdCQUF3QixxRUFBcUI7QUFDN0M7QUFDQSxPQUFPO0FBQ1A7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQiwrRUFBc0I7QUFDdkM7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsU0FBUywrRUFBc0I7QUFDL0I7O0FBRXFDOzs7Ozs7Ozs7Ozs7Ozs7QUMvQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFaUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNiUTtBQUN6QztBQUNBLGtCQUFrQiw0REFBTztBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFaUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNkakM7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxrQkFBa0Isc0JBQXNCO0FBQ3hDOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGNBQWMsdUJBQXVCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLGdCQUFnQiw2QkFBNkI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsNEJBQTRCLCtCQUErQjtBQUMzRDs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEseUNBQXlDLFNBQVM7O0FBRWxEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9FQUFvRTtBQUNwRTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHLElBQUk7QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMkNBQTJDOztBQUUzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRCxHQUFHLElBQUk7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0Q0FBNEM7QUFDNUM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQkFBMEI7QUFDMUI7O0FBRUE7QUFDQTtBQUNBLG9FQUFvRTtBQUNwRTtBQUNBLEdBQUcsSUFBSTtBQUNQOztBQUVBO0FBQ0E7O0FBRUEsMkJBQTJCO0FBQzNCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx5Q0FBeUMsWUFBWTtBQUNyRDtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRStKO0FBQy9KOzs7Ozs7O1VDNWlJQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOa0Q7QUFDUztBQUNDO0FBQzVELFlBQVksd0VBQVU7QUFDdEIsK0RBQVUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC10b3AvLi9zcmMvbW9kdWxlcy9vYmplY3RzL1VJLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLXRvcC8uL3NyYy9tb2R1bGVzL29iamVjdHMvV2VhdGhlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC10b3AvLi9zcmMvbW9kdWxlcy91dGlsL0RhdGFGZXRjaGVyLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLXRvcC8uL3NyYy9tb2R1bGVzL3V0aWwvVGltZS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC10b3AvLi9zcmMvbW9kdWxlcy91dGlsL1dlYXRoZXJNYXBwZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAtdG9wLy4vbm9kZV9tb2R1bGVzL2NvdW50cmllcy1hbmQtdGltZXpvbmVzL2VzbS9pbmRleC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC10b3Avd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAtdG9wL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC10b3Avd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC10b3Avd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC10b3AvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0V2VhdGhlciB9IGZyb20gXCIuLi91dGlsL0RhdGFGZXRjaGVyXCI7XG5jb25zdCBzZWFyY2hCYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NlYXJjaC1ib3hcIik7XG5jb25zdCBzZWFyY2hCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NlYXJjaC1idXR0b25cIik7XG5jb25zdCB3ZWF0aGVyVHlwZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2VhdGhlci1uYW1lXCIpO1xuY29uc3Qgd2VhdGhlckxvY2F0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53ZWF0aGVyLWxvY2F0aW9uXCIpO1xuY29uc3Qgd2VhdGhlclRlbXBlcmF0dXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53ZWF0aGVyLXRlbXBlcmF0dXJlXCIpO1xuY29uc3Qgd2VhdGhlcldpbmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndlYXRoZXItd2luZFwiKTtcbmNvbnN0IHdlYXRoZXJUaW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53ZWF0aGVyLXRpbWVcIik7XG5jb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XG5jb25zdCBpbml0RXZlbnRzID0gZnVuY3Rpb24gaW5pdGlhbGl6ZUFsbEV2ZW50cygpIHtcbiAgc2VhcmNoQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmZXRjaFdlYXRoZXIpO1xufTtcblxuY29uc3QgZmV0Y2hXZWF0aGVyID0gYXN5bmMgZnVuY3Rpb24gZmV0Y2hXZWF0aGVySW5mb3JtYXRpb24oKSB7XG4gIGNvbnN0IGxvY2F0aW9uID0gc2VhcmNoQmFyLnZhbHVlO1xuICBsZXQgd2VhdGhlciA9IG51bGw7XG4gIGlmIChsb2NhdGlvbiAhPSBcIlwiKSB7XG4gICAgdHJ5IHtcbiAgICAgIHdlYXRoZXIgPSBhd2FpdCBnZXRXZWF0aGVyKGxvY2F0aW9uKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coXCJFcnJvciBGZXRjaGluZyBXZWF0aGVyIERhdGEuXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB1cGRhdGVVSSh3ZWF0aGVyKTtcbiAgfVxufTtcbmNvbnN0IHVwZGF0ZVVJID0gZnVuY3Rpb24gdXBkYXRlVUkod2VhdGhlcikge1xuICBjb25zb2xlLmxvZyh3ZWF0aGVyKTtcbiAgd2VhdGhlclR5cGUuaW5uZXJUZXh0ID0gd2VhdGhlci5kZXNjcmlwdGlvbjtcbiAgd2VhdGhlckxvY2F0aW9uLmlubmVyVGV4dCA9IHdlYXRoZXIubG9jYXRpb247XG4gIHdlYXRoZXJUZW1wZXJhdHVyZS5pbm5lclRleHQgPSB3ZWF0aGVyLnRlbXBlcmF0dXJlO1xuICB3ZWF0aGVyV2luZC5pbm5lclRleHQgPSB3ZWF0aGVyLndpbmQ7XG4gIHdlYXRoZXJUaW1lLmlubmVyVGV4dCA9IHdlYXRoZXIudGltZTtcblxuICB1cGRhdGVCYWNrZ3JvdW5kKHBhcnNlSW50KHdlYXRoZXIudGltZS5zbGljZSgwLCAyKSkpO1xufTtcblxuY29uc3QgdXBkYXRlQmFja2dyb3VuZCA9IGZ1bmN0aW9uIHVwZGF0ZUJhY2tncm91bmQoaG91cikge1xuICBjb25zb2xlLmxvZyhob3VyKTtcbiAgaWYgKGhvdXIgPj0gMTkgfHwgaG91ciA8IDYpIHtcbiAgICBib2R5LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9ICd1cmwoXCIuL2ltYWdlcy9iYWNrZ3JvdW5kL25pZ2h0LWJnLmpwZ1wiKSc7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChob3VyID49IDYgJiYgaG91ciA8IDExKSB7XG4gICAgYm9keS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAndXJsKFwiLi9pbWFnZXMvYmFja2dyb3VuZC9tb3JuaW5nLWJnLmpwZ1wiKSc7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChob3VyID49IDExICYmIGhvdXIgPCAxNikge1xuICAgIGJvZHkuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gJ3VybChcIi4vaW1hZ2VzL2JhY2tncm91bmQvbm9vbi1iZy5qcGdcIiknO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoaG91ciA+PSAxNiAmJiBob3VyIDwgMTkpIHtcbiAgICBib2R5LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9ICd1cmwoXCIuL2ltYWdlcy9iYWNrZ3JvdW5kL2FmdGVybm9vbi1iZy5qcGdcIiknO1xuICAgIHJldHVybjtcbiAgfVxufTtcblxuZXhwb3J0IHsgaW5pdEV2ZW50cyB9O1xuIiwiY29uc3Qgd2VhdGhlckludGVyZmFjZSA9ICgpID0+ICh7XG4gIHR5cGU6IFwid2VhdGhlckludGVyZmFjZVwiLFxufSk7XG5cbmNvbnN0IFdlYXRoZXIgPSAoXG4gIHdlYXRoZXIsXG4gIGRlc2NyaXB0aW9uLFxuICBpbWFnZUljb24sXG4gIGxvY2F0aW9uLFxuICB0ZW1wZXJhdHVyZSxcbiAgd2luZCxcbiAgdGltZVxuKSA9PiB7XG4gIGNvbnN0IHN0YXRlID0ge1xuICAgIHdlYXRoZXIsXG4gICAgZGVzY3JpcHRpb24sXG4gICAgaW1hZ2VJY29uLFxuICAgIGxvY2F0aW9uLFxuICAgIHRlbXBlcmF0dXJlLFxuICAgIHdpbmQsXG4gICAgdGltZSxcbiAgfTtcbiAgc3RhdGUudGVtcGVyYXR1cmUgPSBNYXRoLnJvdW5kKHRlbXBlcmF0dXJlIC0gMjczLjE1KSArIFwiwrBDXCI7XG4gIHN0YXRlLndpbmQgPSB3aW5kICsgXCJtL3NcIjtcbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oT2JqZWN0LmNyZWF0ZSh3ZWF0aGVySW50ZXJmYWNlKCkpLCBzdGF0ZSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBXZWF0aGVyO1xuIiwiaW1wb3J0IHsgbWFwUmF3VG9XZWF0aGVyT2JqZWN0IH0gZnJvbSBcIi4vV2VhdGhlck1hcHBlclwiO1xuaW1wb3J0IHsgZ2V0VGltZXpvbmVzRm9yQ291bnRyeSB9IGZyb20gXCJjb3VudHJpZXMtYW5kLXRpbWV6b25lc1wiO1xuaW1wb3J0IHsgZ2V0Q3VycmVudFRpbWVGcm9tVVRDIH0gZnJvbSBcIi4vVGltZVwiO1xuXG5jb25zdCB3ZWF0aGVyQVBJS2V5ID0gXCI1MDVmYTNlZmIwODZiZDIzZDg1NzFiNzQ0ZWE2NGI2OVwiO1xuY29uc3QgZ2V0V2VhdGhlciA9IGFzeW5jIGZ1bmN0aW9uIGRhdGFGZXRjaGVyRnJvbVdlYXRoZXJBUEkobG9jYXRpb24pIHtcbiAgdHJ5IHtcbiAgICBjb25zdCB3ZWF0aGVyRGF0YSA9IGZldGNoKFxuICAgICAgYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9JHtsb2NhdGlvbn0mYXBwaWQ9JHt3ZWF0aGVyQVBJS2V5fWAsXG4gICAgICB7IG1vZGU6IFwiY29yc1wiIH1cbiAgICApXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZXNwb25zZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgY29uc3QgdGltZVpvbmUgPSBnZXRUaW1lWm9uZShkYXRhLnN5cy5jb3VudHJ5LCBkYXRhLm5hbWUpO1xuICAgICAgICBjb25zdCB0aW1lID0gZ2V0Q3VycmVudFRpbWVGcm9tVVRDKHRpbWVab25lKTtcbiAgICAgICAgZGF0YS50aW1lID0gdGltZTtcbiAgICAgICAgY29uc3Qgd2VhdGhlciA9IG1hcFJhd1RvV2VhdGhlck9iamVjdChkYXRhKTtcbiAgICAgICAgcmV0dXJuIHdlYXRoZXI7XG4gICAgICB9KTtcbiAgICByZXR1cm4gd2VhdGhlckRhdGE7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coXCJFcnJvciBmZXRjaGluZyBkYXRhIG9mIHdlYXRoZXJcIik7XG4gIH1cbn07XG4vL2h0dHBzOi8vdGltZWFwaS5pby9hcGkvVGltZS9jdXJyZW50L2Nvb3JkaW5hdGU/bGF0aXR1ZGU9MTQuNjA0MiZsb25naXR1ZGU9MTIwLjk4MjJcbmNvbnN0IGdldFRpbWVab25lID0gZnVuY3Rpb24gZGF0YUZldGNoZXJGcm9tVGltZUFwaShjb3VudHJ5Q29kZSwgbmFtZSkge1xuICBjb25zdCBub3RPbkxpc3QgPSB7XG4gICAgQWZyaWNhOiBcIlpBXCIsXG4gIH07XG4gIGlmICghY291bnRyeUNvZGUpIHtcbiAgICBjb3VudHJ5Q29kZSA9IG5vdE9uTGlzdFtuYW1lXTtcbiAgfVxuICBjb25zdCByZWdpb24gPSBnZXRUaW1lem9uZXNGb3JDb3VudHJ5KGNvdW50cnlDb2RlKS5maWx0ZXIoKHJlZ2lvbikgPT4ge1xuICAgIHJldHVybiByZWdpb24ubmFtZS5zcGxpdChcIi9cIilbMV0gPT09IG5hbWU7XG4gIH0pO1xuICBpZiAocmVnaW9uWzBdKSB7XG4gICAgcmV0dXJuIHJlZ2lvblswXS51dGNPZmZzZXRTdHI7XG4gIH1cbiAgcmV0dXJuIGdldFRpbWV6b25lc0ZvckNvdW50cnkoY291bnRyeUNvZGUpWzBdLnV0Y09mZnNldFN0cjtcbn07XG5cbmV4cG9ydCB7IGdldFdlYXRoZXIsIHdlYXRoZXJBUElLZXkgfTtcbiIsImNvbnN0IGdldFVUQ1RpbWVOb3cgPSBmdW5jdGlvbiBnZXRDdXJyZW50VGltZU9mVVRDKCkge1xuICBjb25zdCB1dGNTdHIgPSBuZXcgRGF0ZSgpLnRvVVRDU3RyaW5nKCkuc3BsaXQoXCIgXCIpWzRdO1xuICBjb25zdCB1dGNUaW1lTm93ID0gdXRjU3RyLnNsaWNlKDAsIC0zKTtcbiAgcmV0dXJuIHV0Y1RpbWVOb3c7XG59O1xuY29uc3QgZ2V0Q3VycmVudFRpbWVGcm9tVVRDID0gZnVuY3Rpb24gc3VidHJhY3RUaW1lWm9uZUZyb21VVEModGltZVpvbmUpIHtcbiAgY29uc3QgdXRjID0gZ2V0VVRDVGltZU5vdygpO1xuICBjb25zdCB1dGNIb3VyID0gcGFyc2VJbnQodXRjLnNsaWNlKDAsIDIpKTtcbiAgY29uc3QgdGltZVpvbmVIb3VyID0gcGFyc2VJbnQodGltZVpvbmUuc2xpY2UoMCwgMykpO1xuICBjb25zdCBjdXJyZW50VGltZSA9IHV0Y0hvdXIgKyB0aW1lWm9uZUhvdXI7XG4gIHJldHVybiBjdXJyZW50VGltZSArIHV0Yy5zbGljZSgyKTtcbn07XG5cbmV4cG9ydCB7IGdldEN1cnJlbnRUaW1lRnJvbVVUQyB9O1xuIiwiaW1wb3J0IFdlYXRoZXIgZnJvbSBcIi4uL29iamVjdHMvV2VhdGhlclwiO1xuY29uc3QgbWFwUmF3VG9XZWF0aGVyT2JqZWN0ID0gKHJhdykgPT4ge1xuICBjb25zdCB3ZWF0aGVyID0gV2VhdGhlcihcbiAgICByYXcud2VhdGhlclswXS5tYWluLFxuICAgIHJhdy53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uLFxuICAgIHJhdy53ZWF0aGVyWzBdLmljb24sXG4gICAgcmF3Lm5hbWUsXG4gICAgcmF3Lm1haW4udGVtcCxcbiAgICByYXcud2luZC5zcGVlZCxcbiAgICByYXcudGltZVxuICApO1xuICByZXR1cm4gd2VhdGhlcjtcbn07XG5cbmV4cG9ydCB7IG1hcFJhd1RvV2VhdGhlck9iamVjdCB9O1xuIiwiZnVuY3Rpb24gb3duS2V5cyhvYmplY3QsIGVudW1lcmFibGVPbmx5KSB7XG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0KTtcblxuICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICAgIHZhciBzeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhvYmplY3QpO1xuXG4gICAgaWYgKGVudW1lcmFibGVPbmx5KSB7XG4gICAgICBzeW1ib2xzID0gc3ltYm9scy5maWx0ZXIoZnVuY3Rpb24gKHN5bSkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHN5bSkuZW51bWVyYWJsZTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGtleXMucHVzaC5hcHBseShrZXlzLCBzeW1ib2xzKTtcbiAgfVxuXG4gIHJldHVybiBrZXlzO1xufVxuXG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkMih0YXJnZXQpIHtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldICE9IG51bGwgPyBhcmd1bWVudHNbaV0gOiB7fTtcblxuICAgIGlmIChpICUgMikge1xuICAgICAgb3duS2V5cyhPYmplY3Qoc291cmNlKSwgdHJ1ZSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIF9kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgc291cmNlW2tleV0pO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycykge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhzb3VyY2UpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3duS2V5cyhPYmplY3Qoc291cmNlKSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIGtleSkpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKHNvdXJjZSwgZXhjbHVkZWQpIHtcbiAgaWYgKHNvdXJjZSA9PSBudWxsKSByZXR1cm4ge307XG4gIHZhciB0YXJnZXQgPSB7fTtcbiAgdmFyIHNvdXJjZUtleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpO1xuICB2YXIga2V5LCBpO1xuXG4gIGZvciAoaSA9IDA7IGkgPCBzb3VyY2VLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAga2V5ID0gc291cmNlS2V5c1tpXTtcbiAgICBpZiAoZXhjbHVkZWQuaW5kZXhPZihrZXkpID49IDApIGNvbnRpbnVlO1xuICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5mdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoc291cmNlLCBleGNsdWRlZCkge1xuICBpZiAoc291cmNlID09IG51bGwpIHJldHVybiB7fTtcblxuICB2YXIgdGFyZ2V0ID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2Uoc291cmNlLCBleGNsdWRlZCk7XG5cbiAgdmFyIGtleSwgaTtcblxuICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICAgIHZhciBzb3VyY2VTeW1ib2xLZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzb3VyY2UpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IHNvdXJjZVN5bWJvbEtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGtleSA9IHNvdXJjZVN5bWJvbEtleXNbaV07XG4gICAgICBpZiAoZXhjbHVkZWQuaW5kZXhPZihrZXkpID49IDApIGNvbnRpbnVlO1xuICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwoc291cmNlLCBrZXkpKSBjb250aW51ZTtcbiAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7XG4gIHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7XG59XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjtcbn1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkge1xuICB2YXIgX2kgPSBhcnIgPT0gbnVsbCA/IG51bGwgOiB0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGFycltTeW1ib2wuaXRlcmF0b3JdIHx8IGFycltcIkBAaXRlcmF0b3JcIl07XG5cbiAgaWYgKF9pID09IG51bGwpIHJldHVybjtcbiAgdmFyIF9hcnIgPSBbXTtcbiAgdmFyIF9uID0gdHJ1ZTtcbiAgdmFyIF9kID0gZmFsc2U7XG5cbiAgdmFyIF9zLCBfZTtcblxuICB0cnkge1xuICAgIGZvciAoX2kgPSBfaS5jYWxsKGFycik7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHtcbiAgICAgIF9hcnIucHVzaChfcy52YWx1ZSk7XG5cbiAgICAgIGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhaztcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIF9kID0gdHJ1ZTtcbiAgICBfZSA9IGVycjtcbiAgfSBmaW5hbGx5IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoX2QpIHRocm93IF9lO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBfYXJyO1xufVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7XG4gIGlmICghbykgcmV0dXJuO1xuICBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xuICB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7XG4gIGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7XG4gIGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pO1xuICBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG59XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7XG4gIGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoO1xuXG4gIGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgYXJyMltpXSA9IGFycltpXTtcblxuICByZXR1cm4gYXJyMjtcbn1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn1cblxudmFyIGNvdW50cmllcyQxID0ge1xuXHRBRDogXCJBbmRvcnJhXCIsXG5cdEFFOiBcIlVuaXRlZCBBcmFiIEVtaXJhdGVzXCIsXG5cdEFGOiBcIkFmZ2hhbmlzdGFuXCIsXG5cdEFHOiBcIkFudGlndWEgYW5kIEJhcmJ1ZGFcIixcblx0QUk6IFwiQW5ndWlsbGFcIixcblx0QUw6IFwiQWxiYW5pYVwiLFxuXHRBTTogXCJBcm1lbmlhXCIsXG5cdEFPOiBcIkFuZ29sYVwiLFxuXHRBUTogXCJBbnRhcmN0aWNhXCIsXG5cdEFSOiBcIkFyZ2VudGluYVwiLFxuXHRBUzogXCJBbWVyaWNhbiBTYW1vYVwiLFxuXHRBVDogXCJBdXN0cmlhXCIsXG5cdEFVOiBcIkF1c3RyYWxpYVwiLFxuXHRBVzogXCJBcnViYVwiLFxuXHRBWDogXCLDhWxhbmQgSXNsYW5kc1wiLFxuXHRBWjogXCJBemVyYmFpamFuXCIsXG5cdEJBOiBcIkJvc25pYSBhbmQgSGVyemVnb3ZpbmFcIixcblx0QkI6IFwiQmFyYmFkb3NcIixcblx0QkQ6IFwiQmFuZ2xhZGVzaFwiLFxuXHRCRTogXCJCZWxnaXVtXCIsXG5cdEJGOiBcIkJ1cmtpbmEgRmFzb1wiLFxuXHRCRzogXCJCdWxnYXJpYVwiLFxuXHRCSDogXCJCYWhyYWluXCIsXG5cdEJJOiBcIkJ1cnVuZGlcIixcblx0Qko6IFwiQmVuaW5cIixcblx0Qkw6IFwiU2FpbnQgQmFydGjDqWxlbXlcIixcblx0Qk06IFwiQmVybXVkYVwiLFxuXHRCTjogXCJCcnVuZWlcIixcblx0Qk86IFwiQm9saXZpYVwiLFxuXHRCUTogXCJDYXJpYmJlYW4gTmV0aGVybGFuZHNcIixcblx0QlI6IFwiQnJhemlsXCIsXG5cdEJTOiBcIkJhaGFtYXNcIixcblx0QlQ6IFwiQmh1dGFuXCIsXG5cdEJWOiBcIkJvdXZldCBJc2xhbmRcIixcblx0Qlc6IFwiQm90c3dhbmFcIixcblx0Qlk6IFwiQmVsYXJ1c1wiLFxuXHRCWjogXCJCZWxpemVcIixcblx0Q0E6IFwiQ2FuYWRhXCIsXG5cdENDOiBcIkNvY29zIElzbGFuZHNcIixcblx0Q0Q6IFwiRGVtb2NyYXRpYyBSZXB1YmxpYyBvZiB0aGUgQ29uZ29cIixcblx0Q0Y6IFwiQ2VudHJhbCBBZnJpY2FuIFJlcHVibGljXCIsXG5cdENHOiBcIlJlcHVibGljIG9mIHRoZSBDb25nb1wiLFxuXHRDSDogXCJTd2l0emVybGFuZFwiLFxuXHRDSTogXCJJdm9yeSBDb2FzdFwiLFxuXHRDSzogXCJDb29rIElzbGFuZHNcIixcblx0Q0w6IFwiQ2hpbGVcIixcblx0Q006IFwiQ2FtZXJvb25cIixcblx0Q046IFwiQ2hpbmFcIixcblx0Q086IFwiQ29sb21iaWFcIixcblx0Q1I6IFwiQ29zdGEgUmljYVwiLFxuXHRDVTogXCJDdWJhXCIsXG5cdENWOiBcIkNhYm8gVmVyZGVcIixcblx0Q1c6IFwiQ3VyYcOnYW9cIixcblx0Q1g6IFwiQ2hyaXN0bWFzIElzbGFuZFwiLFxuXHRDWTogXCJDeXBydXNcIixcblx0Q1o6IFwiQ3plY2hpYVwiLFxuXHRERTogXCJHZXJtYW55XCIsXG5cdERKOiBcIkRqaWJvdXRpXCIsXG5cdERLOiBcIkRlbm1hcmtcIixcblx0RE06IFwiRG9taW5pY2FcIixcblx0RE86IFwiRG9taW5pY2FuIFJlcHVibGljXCIsXG5cdERaOiBcIkFsZ2VyaWFcIixcblx0RUM6IFwiRWN1YWRvclwiLFxuXHRFRTogXCJFc3RvbmlhXCIsXG5cdEVHOiBcIkVneXB0XCIsXG5cdEVIOiBcIldlc3Rlcm4gU2FoYXJhXCIsXG5cdEVSOiBcIkVyaXRyZWFcIixcblx0RVM6IFwiU3BhaW5cIixcblx0RVQ6IFwiRXRoaW9waWFcIixcblx0Rkk6IFwiRmlubGFuZFwiLFxuXHRGSjogXCJGaWppXCIsXG5cdEZLOiBcIkZhbGtsYW5kIElzbGFuZHNcIixcblx0Rk06IFwiTWljcm9uZXNpYVwiLFxuXHRGTzogXCJGYXJvZSBJc2xhbmRzXCIsXG5cdEZSOiBcIkZyYW5jZVwiLFxuXHRHQTogXCJHYWJvblwiLFxuXHRHQjogXCJVbml0ZWQgS2luZ2RvbVwiLFxuXHRHRDogXCJHcmVuYWRhXCIsXG5cdEdFOiBcIkdlb3JnaWFcIixcblx0R0Y6IFwiRnJlbmNoIEd1aWFuYVwiLFxuXHRHRzogXCJHdWVybnNleVwiLFxuXHRHSDogXCJHaGFuYVwiLFxuXHRHSTogXCJHaWJyYWx0YXJcIixcblx0R0w6IFwiR3JlZW5sYW5kXCIsXG5cdEdNOiBcIkdhbWJpYVwiLFxuXHRHTjogXCJHdWluZWFcIixcblx0R1A6IFwiR3VhZGVsb3VwZVwiLFxuXHRHUTogXCJFcXVhdG9yaWFsIEd1aW5lYVwiLFxuXHRHUjogXCJHcmVlY2VcIixcblx0R1M6IFwiU291dGggR2VvcmdpYSBhbmQgdGhlIFNvdXRoIFNhbmR3aWNoIElzbGFuZHNcIixcblx0R1Q6IFwiR3VhdGVtYWxhXCIsXG5cdEdVOiBcIkd1YW1cIixcblx0R1c6IFwiR3VpbmVhLUJpc3NhdVwiLFxuXHRHWTogXCJHdXlhbmFcIixcblx0SEs6IFwiSG9uZyBLb25nXCIsXG5cdEhNOiBcIkhlYXJkIElzbGFuZCBhbmQgTWNEb25hbGQgSXNsYW5kc1wiLFxuXHRITjogXCJIb25kdXJhc1wiLFxuXHRIUjogXCJDcm9hdGlhXCIsXG5cdEhUOiBcIkhhaXRpXCIsXG5cdEhVOiBcIkh1bmdhcnlcIixcblx0SUQ6IFwiSW5kb25lc2lhXCIsXG5cdElFOiBcIklyZWxhbmRcIixcblx0SUw6IFwiSXNyYWVsXCIsXG5cdElNOiBcIklzbGUgb2YgTWFuXCIsXG5cdElOOiBcIkluZGlhXCIsXG5cdElPOiBcIkJyaXRpc2ggSW5kaWFuIE9jZWFuIFRlcnJpdG9yeVwiLFxuXHRJUTogXCJJcmFxXCIsXG5cdElSOiBcIklyYW5cIixcblx0SVM6IFwiSWNlbGFuZFwiLFxuXHRJVDogXCJJdGFseVwiLFxuXHRKRTogXCJKZXJzZXlcIixcblx0Sk06IFwiSmFtYWljYVwiLFxuXHRKTzogXCJKb3JkYW5cIixcblx0SlA6IFwiSmFwYW5cIixcblx0S0U6IFwiS2VueWFcIixcblx0S0c6IFwiS3lyZ3l6c3RhblwiLFxuXHRLSDogXCJDYW1ib2RpYVwiLFxuXHRLSTogXCJLaXJpYmF0aVwiLFxuXHRLTTogXCJDb21vcm9zXCIsXG5cdEtOOiBcIlNhaW50IEtpdHRzIGFuZCBOZXZpc1wiLFxuXHRLUDogXCJOb3J0aCBLb3JlYVwiLFxuXHRLUjogXCJTb3V0aCBLb3JlYVwiLFxuXHRLVzogXCJLdXdhaXRcIixcblx0S1k6IFwiQ2F5bWFuIElzbGFuZHNcIixcblx0S1o6IFwiS2F6YWtoc3RhblwiLFxuXHRMQTogXCJMYW9zXCIsXG5cdExCOiBcIkxlYmFub25cIixcblx0TEM6IFwiU2FpbnQgTHVjaWFcIixcblx0TEk6IFwiTGllY2h0ZW5zdGVpblwiLFxuXHRMSzogXCJTcmkgTGFua2FcIixcblx0TFI6IFwiTGliZXJpYVwiLFxuXHRMUzogXCJMZXNvdGhvXCIsXG5cdExUOiBcIkxpdGh1YW5pYVwiLFxuXHRMVTogXCJMdXhlbWJvdXJnXCIsXG5cdExWOiBcIkxhdHZpYVwiLFxuXHRMWTogXCJMaWJ5YVwiLFxuXHRNQTogXCJNb3JvY2NvXCIsXG5cdE1DOiBcIk1vbmFjb1wiLFxuXHRNRDogXCJNb2xkb3ZhXCIsXG5cdE1FOiBcIk1vbnRlbmVncm9cIixcblx0TUY6IFwiU2FpbnQgTWFydGluXCIsXG5cdE1HOiBcIk1hZGFnYXNjYXJcIixcblx0TUg6IFwiTWFyc2hhbGwgSXNsYW5kc1wiLFxuXHRNSzogXCJOb3J0aCBNYWNlZG9uaWFcIixcblx0TUw6IFwiTWFsaVwiLFxuXHRNTTogXCJNeWFubWFyXCIsXG5cdE1OOiBcIk1vbmdvbGlhXCIsXG5cdE1POiBcIk1hY2FvXCIsXG5cdE1QOiBcIk5vcnRoZXJuIE1hcmlhbmEgSXNsYW5kc1wiLFxuXHRNUTogXCJNYXJ0aW5pcXVlXCIsXG5cdE1SOiBcIk1hdXJpdGFuaWFcIixcblx0TVM6IFwiTW9udHNlcnJhdFwiLFxuXHRNVDogXCJNYWx0YVwiLFxuXHRNVTogXCJNYXVyaXRpdXNcIixcblx0TVY6IFwiTWFsZGl2ZXNcIixcblx0TVc6IFwiTWFsYXdpXCIsXG5cdE1YOiBcIk1leGljb1wiLFxuXHRNWTogXCJNYWxheXNpYVwiLFxuXHRNWjogXCJNb3phbWJpcXVlXCIsXG5cdE5BOiBcIk5hbWliaWFcIixcblx0TkM6IFwiTmV3IENhbGVkb25pYVwiLFxuXHRORTogXCJOaWdlclwiLFxuXHRORjogXCJOb3Jmb2xrIElzbGFuZFwiLFxuXHRORzogXCJOaWdlcmlhXCIsXG5cdE5JOiBcIk5pY2FyYWd1YVwiLFxuXHROTDogXCJOZXRoZXJsYW5kc1wiLFxuXHROTzogXCJOb3J3YXlcIixcblx0TlA6IFwiTmVwYWxcIixcblx0TlI6IFwiTmF1cnVcIixcblx0TlU6IFwiTml1ZVwiLFxuXHROWjogXCJOZXcgWmVhbGFuZFwiLFxuXHRPTTogXCJPbWFuXCIsXG5cdFBBOiBcIlBhbmFtYVwiLFxuXHRQRTogXCJQZXJ1XCIsXG5cdFBGOiBcIkZyZW5jaCBQb2x5bmVzaWFcIixcblx0UEc6IFwiUGFwdWEgTmV3IEd1aW5lYVwiLFxuXHRQSDogXCJQaGlsaXBwaW5lc1wiLFxuXHRQSzogXCJQYWtpc3RhblwiLFxuXHRQTDogXCJQb2xhbmRcIixcblx0UE06IFwiU2FpbnQgUGllcnJlIGFuZCBNaXF1ZWxvblwiLFxuXHRQTjogXCJQaXRjYWlyblwiLFxuXHRQUjogXCJQdWVydG8gUmljb1wiLFxuXHRQUzogXCJQYWxlc3RpbmVcIixcblx0UFQ6IFwiUG9ydHVnYWxcIixcblx0UFc6IFwiUGFsYXVcIixcblx0UFk6IFwiUGFyYWd1YXlcIixcblx0UUE6IFwiUWF0YXJcIixcblx0UkU6IFwiUsOpdW5pb25cIixcblx0Uk86IFwiUm9tYW5pYVwiLFxuXHRSUzogXCJTZXJiaWFcIixcblx0UlU6IFwiUnVzc2lhXCIsXG5cdFJXOiBcIlJ3YW5kYVwiLFxuXHRTQTogXCJTYXVkaSBBcmFiaWFcIixcblx0U0I6IFwiU29sb21vbiBJc2xhbmRzXCIsXG5cdFNDOiBcIlNleWNoZWxsZXNcIixcblx0U0Q6IFwiU3VkYW5cIixcblx0U0U6IFwiU3dlZGVuXCIsXG5cdFNHOiBcIlNpbmdhcG9yZVwiLFxuXHRTSDogXCJTYWludCBIZWxlbmEsIEFzY2Vuc2lvbiBhbmQgVHJpc3RhbiBkYSBDdW5oYVwiLFxuXHRTSTogXCJTbG92ZW5pYVwiLFxuXHRTSjogXCJTdmFsYmFyZCBhbmQgSmFuIE1heWVuXCIsXG5cdFNLOiBcIlNsb3Zha2lhXCIsXG5cdFNMOiBcIlNpZXJyYSBMZW9uZVwiLFxuXHRTTTogXCJTYW4gTWFyaW5vXCIsXG5cdFNOOiBcIlNlbmVnYWxcIixcblx0U086IFwiU29tYWxpYVwiLFxuXHRTUjogXCJTdXJpbmFtZVwiLFxuXHRTUzogXCJTb3V0aCBTdWRhblwiLFxuXHRTVDogXCJTYW8gVG9tZSBhbmQgUHJpbmNpcGVcIixcblx0U1Y6IFwiRWwgU2FsdmFkb3JcIixcblx0U1g6IFwiU2ludCBNYWFydGVuXCIsXG5cdFNZOiBcIlN5cmlhXCIsXG5cdFNaOiBcIkVzd2F0aW5pXCIsXG5cdFRDOiBcIlR1cmtzIGFuZCBDYWljb3MgSXNsYW5kc1wiLFxuXHRURDogXCJDaGFkXCIsXG5cdFRGOiBcIkZyZW5jaCBTb3V0aGVybiBUZXJyaXRvcmllc1wiLFxuXHRURzogXCJUb2dvXCIsXG5cdFRIOiBcIlRoYWlsYW5kXCIsXG5cdFRKOiBcIlRhamlraXN0YW5cIixcblx0VEs6IFwiVG9rZWxhdVwiLFxuXHRUTDogXCJUaW1vci1MZXN0ZVwiLFxuXHRUTTogXCJUdXJrbWVuaXN0YW5cIixcblx0VE46IFwiVHVuaXNpYVwiLFxuXHRUTzogXCJUb25nYVwiLFxuXHRUUjogXCJUdXJrZXlcIixcblx0VFQ6IFwiVHJpbmlkYWQgYW5kIFRvYmFnb1wiLFxuXHRUVjogXCJUdXZhbHVcIixcblx0VFc6IFwiVGFpd2FuXCIsXG5cdFRaOiBcIlRhbnphbmlhXCIsXG5cdFVBOiBcIlVrcmFpbmVcIixcblx0VUc6IFwiVWdhbmRhXCIsXG5cdFVNOiBcIlVuaXRlZCBTdGF0ZXMgTWlub3IgT3V0bHlpbmcgSXNsYW5kc1wiLFxuXHRVUzogXCJVbml0ZWQgU3RhdGVzIG9mIEFtZXJpY2FcIixcblx0VVk6IFwiVXJ1Z3VheVwiLFxuXHRVWjogXCJVemJla2lzdGFuXCIsXG5cdFZBOiBcIkhvbHkgU2VlXCIsXG5cdFZDOiBcIlNhaW50IFZpbmNlbnQgYW5kIHRoZSBHcmVuYWRpbmVzXCIsXG5cdFZFOiBcIlZlbmV6dWVsYVwiLFxuXHRWRzogXCJWaXJnaW4gSXNsYW5kcyAoVUspXCIsXG5cdFZJOiBcIlZpcmdpbiBJc2xhbmRzIChVUylcIixcblx0Vk46IFwiVmlldG5hbVwiLFxuXHRWVTogXCJWYW51YXR1XCIsXG5cdFdGOiBcIldhbGxpcyBhbmQgRnV0dW5hXCIsXG5cdFdTOiBcIlNhbW9hXCIsXG5cdFlFOiBcIlllbWVuXCIsXG5cdFlUOiBcIk1heW90dGVcIixcblx0WkE6IFwiU291dGggQWZyaWNhXCIsXG5cdFpNOiBcIlphbWJpYVwiLFxuXHRaVzogXCJaaW1iYWJ3ZVwiXG59O1xudmFyIHRpbWV6b25lcyQxID0ge1xuXHRcIkFmcmljYS9BYmlkamFuXCI6IHtcblx0XHR1OiAwLFxuXHRcdGM6IFtcblx0XHRcdFwiQ0lcIixcblx0XHRcdFwiQkZcIixcblx0XHRcdFwiR0hcIixcblx0XHRcdFwiR01cIixcblx0XHRcdFwiR05cIixcblx0XHRcdFwiTUxcIixcblx0XHRcdFwiTVJcIixcblx0XHRcdFwiU0hcIixcblx0XHRcdFwiU0xcIixcblx0XHRcdFwiU05cIixcblx0XHRcdFwiVEdcIlxuXHRcdF1cblx0fSxcblx0XCJBZnJpY2EvQWNjcmFcIjoge1xuXHRcdGE6IFwiQWZyaWNhL0FiaWRqYW5cIixcblx0XHRjOiBbXG5cdFx0XHRcIkdIXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBZnJpY2EvQWRkaXNfQWJhYmFcIjoge1xuXHRcdGE6IFwiQWZyaWNhL05haXJvYmlcIixcblx0XHRjOiBbXG5cdFx0XHRcIkVUXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBZnJpY2EvQWxnaWVyc1wiOiB7XG5cdFx0dTogNjAsXG5cdFx0YzogW1xuXHRcdFx0XCJEWlwiXG5cdFx0XVxuXHR9LFxuXHRcIkFmcmljYS9Bc21hcmFcIjoge1xuXHRcdGE6IFwiQWZyaWNhL05haXJvYmlcIixcblx0XHRjOiBbXG5cdFx0XHRcIkVSXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBZnJpY2EvQXNtZXJhXCI6IHtcblx0XHRhOiBcIkFmcmljYS9OYWlyb2JpXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJFUlwiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiQWZyaWNhL0JhbWFrb1wiOiB7XG5cdFx0YTogXCJBZnJpY2EvQWJpZGphblwiLFxuXHRcdGM6IFtcblx0XHRcdFwiTUxcIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFmcmljYS9CYW5ndWlcIjoge1xuXHRcdGE6IFwiQWZyaWNhL0xhZ29zXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJDRlwiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiQWZyaWNhL0Jhbmp1bFwiOiB7XG5cdFx0YTogXCJBZnJpY2EvQWJpZGphblwiLFxuXHRcdGM6IFtcblx0XHRcdFwiR01cIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFmcmljYS9CaXNzYXVcIjoge1xuXHRcdHU6IDAsXG5cdFx0YzogW1xuXHRcdFx0XCJHV1wiXG5cdFx0XVxuXHR9LFxuXHRcIkFmcmljYS9CbGFudHlyZVwiOiB7XG5cdFx0YTogXCJBZnJpY2EvTWFwdXRvXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJNV1wiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiQWZyaWNhL0JyYXp6YXZpbGxlXCI6IHtcblx0XHRhOiBcIkFmcmljYS9MYWdvc1wiLFxuXHRcdGM6IFtcblx0XHRcdFwiQ0dcIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFmcmljYS9CdWp1bWJ1cmFcIjoge1xuXHRcdGE6IFwiQWZyaWNhL01hcHV0b1wiLFxuXHRcdGM6IFtcblx0XHRcdFwiQklcIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFmcmljYS9DYWlyb1wiOiB7XG5cdFx0dTogMTIwLFxuXHRcdGM6IFtcblx0XHRcdFwiRUdcIlxuXHRcdF1cblx0fSxcblx0XCJBZnJpY2EvQ2FzYWJsYW5jYVwiOiB7XG5cdFx0dTogNjAsXG5cdFx0ZDogMCxcblx0XHRjOiBbXG5cdFx0XHRcIk1BXCJcblx0XHRdXG5cdH0sXG5cdFwiQWZyaWNhL0NldXRhXCI6IHtcblx0XHR1OiA2MCxcblx0XHRkOiAxMjAsXG5cdFx0YzogW1xuXHRcdFx0XCJFU1wiXG5cdFx0XVxuXHR9LFxuXHRcIkFmcmljYS9Db25ha3J5XCI6IHtcblx0XHRhOiBcIkFmcmljYS9BYmlkamFuXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJHTlwiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiQWZyaWNhL0Rha2FyXCI6IHtcblx0XHRhOiBcIkFmcmljYS9BYmlkamFuXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJTTlwiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiQWZyaWNhL0Rhcl9lc19TYWxhYW1cIjoge1xuXHRcdGE6IFwiQWZyaWNhL05haXJvYmlcIixcblx0XHRjOiBbXG5cdFx0XHRcIlRaXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBZnJpY2EvRGppYm91dGlcIjoge1xuXHRcdGE6IFwiQWZyaWNhL05haXJvYmlcIixcblx0XHRjOiBbXG5cdFx0XHRcIkRKXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBZnJpY2EvRG91YWxhXCI6IHtcblx0XHRhOiBcIkFmcmljYS9MYWdvc1wiLFxuXHRcdGM6IFtcblx0XHRcdFwiQ01cIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFmcmljYS9FbF9BYWl1blwiOiB7XG5cdFx0dTogNjAsXG5cdFx0ZDogMCxcblx0XHRjOiBbXG5cdFx0XHRcIkVIXCJcblx0XHRdXG5cdH0sXG5cdFwiQWZyaWNhL0ZyZWV0b3duXCI6IHtcblx0XHRhOiBcIkFmcmljYS9BYmlkamFuXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJTTFwiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiQWZyaWNhL0dhYm9yb25lXCI6IHtcblx0XHRhOiBcIkFmcmljYS9NYXB1dG9cIixcblx0XHRjOiBbXG5cdFx0XHRcIkJXXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBZnJpY2EvSGFyYXJlXCI6IHtcblx0XHRhOiBcIkFmcmljYS9NYXB1dG9cIixcblx0XHRjOiBbXG5cdFx0XHRcIlpXXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBZnJpY2EvSm9oYW5uZXNidXJnXCI6IHtcblx0XHR1OiAxMjAsXG5cdFx0YzogW1xuXHRcdFx0XCJaQVwiLFxuXHRcdFx0XCJMU1wiLFxuXHRcdFx0XCJTWlwiXG5cdFx0XVxuXHR9LFxuXHRcIkFmcmljYS9KdWJhXCI6IHtcblx0XHR1OiAxMjAsXG5cdFx0YzogW1xuXHRcdFx0XCJTU1wiXG5cdFx0XVxuXHR9LFxuXHRcIkFmcmljYS9LYW1wYWxhXCI6IHtcblx0XHRhOiBcIkFmcmljYS9OYWlyb2JpXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJVR1wiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiQWZyaWNhL0toYXJ0b3VtXCI6IHtcblx0XHR1OiAxMjAsXG5cdFx0YzogW1xuXHRcdFx0XCJTRFwiXG5cdFx0XVxuXHR9LFxuXHRcIkFmcmljYS9LaWdhbGlcIjoge1xuXHRcdGE6IFwiQWZyaWNhL01hcHV0b1wiLFxuXHRcdGM6IFtcblx0XHRcdFwiUldcIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFmcmljYS9LaW5zaGFzYVwiOiB7XG5cdFx0YTogXCJBZnJpY2EvTGFnb3NcIixcblx0XHRjOiBbXG5cdFx0XHRcIkNEXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBZnJpY2EvTGFnb3NcIjoge1xuXHRcdHU6IDYwLFxuXHRcdGM6IFtcblx0XHRcdFwiTkdcIixcblx0XHRcdFwiQU9cIixcblx0XHRcdFwiQkpcIixcblx0XHRcdFwiQ0RcIixcblx0XHRcdFwiQ0ZcIixcblx0XHRcdFwiQ0dcIixcblx0XHRcdFwiQ01cIixcblx0XHRcdFwiR0FcIixcblx0XHRcdFwiR1FcIixcblx0XHRcdFwiTkVcIlxuXHRcdF1cblx0fSxcblx0XCJBZnJpY2EvTGlicmV2aWxsZVwiOiB7XG5cdFx0YTogXCJBZnJpY2EvTGFnb3NcIixcblx0XHRjOiBbXG5cdFx0XHRcIkdBXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBZnJpY2EvTG9tZVwiOiB7XG5cdFx0YTogXCJBZnJpY2EvQWJpZGphblwiLFxuXHRcdGM6IFtcblx0XHRcdFwiVEdcIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFmcmljYS9MdWFuZGFcIjoge1xuXHRcdGE6IFwiQWZyaWNhL0xhZ29zXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJBT1wiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiQWZyaWNhL0x1YnVtYmFzaGlcIjoge1xuXHRcdGE6IFwiQWZyaWNhL01hcHV0b1wiLFxuXHRcdGM6IFtcblx0XHRcdFwiQ0RcIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFmcmljYS9MdXNha2FcIjoge1xuXHRcdGE6IFwiQWZyaWNhL01hcHV0b1wiLFxuXHRcdGM6IFtcblx0XHRcdFwiWk1cIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFmcmljYS9NYWxhYm9cIjoge1xuXHRcdGE6IFwiQWZyaWNhL0xhZ29zXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJHUVwiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiQWZyaWNhL01hcHV0b1wiOiB7XG5cdFx0dTogMTIwLFxuXHRcdGM6IFtcblx0XHRcdFwiTVpcIixcblx0XHRcdFwiQklcIixcblx0XHRcdFwiQldcIixcblx0XHRcdFwiQ0RcIixcblx0XHRcdFwiTVdcIixcblx0XHRcdFwiUldcIixcblx0XHRcdFwiWk1cIixcblx0XHRcdFwiWldcIlxuXHRcdF1cblx0fSxcblx0XCJBZnJpY2EvTWFzZXJ1XCI6IHtcblx0XHRhOiBcIkFmcmljYS9Kb2hhbm5lc2J1cmdcIixcblx0XHRjOiBbXG5cdFx0XHRcIkxTXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBZnJpY2EvTWJhYmFuZVwiOiB7XG5cdFx0YTogXCJBZnJpY2EvSm9oYW5uZXNidXJnXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJTWlwiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiQWZyaWNhL01vZ2FkaXNodVwiOiB7XG5cdFx0YTogXCJBZnJpY2EvTmFpcm9iaVwiLFxuXHRcdGM6IFtcblx0XHRcdFwiU09cIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFmcmljYS9Nb25yb3ZpYVwiOiB7XG5cdFx0dTogMCxcblx0XHRjOiBbXG5cdFx0XHRcIkxSXCJcblx0XHRdXG5cdH0sXG5cdFwiQWZyaWNhL05haXJvYmlcIjoge1xuXHRcdHU6IDE4MCxcblx0XHRjOiBbXG5cdFx0XHRcIktFXCIsXG5cdFx0XHRcIkRKXCIsXG5cdFx0XHRcIkVSXCIsXG5cdFx0XHRcIkVUXCIsXG5cdFx0XHRcIktNXCIsXG5cdFx0XHRcIk1HXCIsXG5cdFx0XHRcIlNPXCIsXG5cdFx0XHRcIlRaXCIsXG5cdFx0XHRcIlVHXCIsXG5cdFx0XHRcIllUXCJcblx0XHRdXG5cdH0sXG5cdFwiQWZyaWNhL05kamFtZW5hXCI6IHtcblx0XHR1OiA2MCxcblx0XHRjOiBbXG5cdFx0XHRcIlREXCJcblx0XHRdXG5cdH0sXG5cdFwiQWZyaWNhL05pYW1leVwiOiB7XG5cdFx0YTogXCJBZnJpY2EvTGFnb3NcIixcblx0XHRjOiBbXG5cdFx0XHRcIk5FXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBZnJpY2EvTm91YWtjaG90dFwiOiB7XG5cdFx0YTogXCJBZnJpY2EvQWJpZGphblwiLFxuXHRcdGM6IFtcblx0XHRcdFwiTVJcIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFmcmljYS9PdWFnYWRvdWdvdVwiOiB7XG5cdFx0YTogXCJBZnJpY2EvQWJpZGphblwiLFxuXHRcdGM6IFtcblx0XHRcdFwiQkZcIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFmcmljYS9Qb3J0by1Ob3ZvXCI6IHtcblx0XHRhOiBcIkFmcmljYS9MYWdvc1wiLFxuXHRcdGM6IFtcblx0XHRcdFwiQkpcIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFmcmljYS9TYW9fVG9tZVwiOiB7XG5cdFx0dTogMCxcblx0XHRjOiBbXG5cdFx0XHRcIlNUXCJcblx0XHRdXG5cdH0sXG5cdFwiQWZyaWNhL1RpbWJ1a3R1XCI6IHtcblx0XHRhOiBcIkFmcmljYS9BYmlkamFuXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJNTFwiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiQWZyaWNhL1RyaXBvbGlcIjoge1xuXHRcdHU6IDEyMCxcblx0XHRjOiBbXG5cdFx0XHRcIkxZXCJcblx0XHRdXG5cdH0sXG5cdFwiQWZyaWNhL1R1bmlzXCI6IHtcblx0XHR1OiA2MCxcblx0XHRjOiBbXG5cdFx0XHRcIlROXCJcblx0XHRdXG5cdH0sXG5cdFwiQWZyaWNhL1dpbmRob2VrXCI6IHtcblx0XHR1OiAxMjAsXG5cdFx0YzogW1xuXHRcdFx0XCJOQVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvQWRha1wiOiB7XG5cdFx0dTogLTYwMCxcblx0XHRkOiAtNTQwLFxuXHRcdGM6IFtcblx0XHRcdFwiVVNcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL0FuY2hvcmFnZVwiOiB7XG5cdFx0dTogLTU0MCxcblx0XHRkOiAtNDgwLFxuXHRcdGM6IFtcblx0XHRcdFwiVVNcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL0FuZ3VpbGxhXCI6IHtcblx0XHRhOiBcIkFtZXJpY2EvUHVlcnRvX1JpY29cIixcblx0XHRjOiBbXG5cdFx0XHRcIkFJXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBbWVyaWNhL0FudGlndWFcIjoge1xuXHRcdGE6IFwiQW1lcmljYS9QdWVydG9fUmljb1wiLFxuXHRcdGM6IFtcblx0XHRcdFwiQUdcIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFtZXJpY2EvQXJhZ3VhaW5hXCI6IHtcblx0XHR1OiAtMTgwLFxuXHRcdGM6IFtcblx0XHRcdFwiQlJcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL0FyZ2VudGluYS9CdWVub3NfQWlyZXNcIjoge1xuXHRcdHU6IC0xODAsXG5cdFx0YzogW1xuXHRcdFx0XCJBUlwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvQXJnZW50aW5hL0NhdGFtYXJjYVwiOiB7XG5cdFx0dTogLTE4MCxcblx0XHRjOiBbXG5cdFx0XHRcIkFSXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9BcmdlbnRpbmEvQ29tb2RSaXZhZGF2aWFcIjoge1xuXHRcdGE6IFwiQW1lcmljYS9BcmdlbnRpbmEvQ2F0YW1hcmNhXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFtZXJpY2EvQXJnZW50aW5hL0NvcmRvYmFcIjoge1xuXHRcdHU6IC0xODAsXG5cdFx0YzogW1xuXHRcdFx0XCJBUlwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvQXJnZW50aW5hL0p1anV5XCI6IHtcblx0XHR1OiAtMTgwLFxuXHRcdGM6IFtcblx0XHRcdFwiQVJcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL0FyZ2VudGluYS9MYV9SaW9qYVwiOiB7XG5cdFx0dTogLTE4MCxcblx0XHRjOiBbXG5cdFx0XHRcIkFSXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9BcmdlbnRpbmEvTWVuZG96YVwiOiB7XG5cdFx0dTogLTE4MCxcblx0XHRjOiBbXG5cdFx0XHRcIkFSXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9BcmdlbnRpbmEvUmlvX0dhbGxlZ29zXCI6IHtcblx0XHR1OiAtMTgwLFxuXHRcdGM6IFtcblx0XHRcdFwiQVJcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL0FyZ2VudGluYS9TYWx0YVwiOiB7XG5cdFx0dTogLTE4MCxcblx0XHRjOiBbXG5cdFx0XHRcIkFSXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9BcmdlbnRpbmEvU2FuX0p1YW5cIjoge1xuXHRcdHU6IC0xODAsXG5cdFx0YzogW1xuXHRcdFx0XCJBUlwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvQXJnZW50aW5hL1Nhbl9MdWlzXCI6IHtcblx0XHR1OiAtMTgwLFxuXHRcdGM6IFtcblx0XHRcdFwiQVJcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL0FyZ2VudGluYS9UdWN1bWFuXCI6IHtcblx0XHR1OiAtMTgwLFxuXHRcdGM6IFtcblx0XHRcdFwiQVJcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL0FyZ2VudGluYS9Vc2h1YWlhXCI6IHtcblx0XHR1OiAtMTgwLFxuXHRcdGM6IFtcblx0XHRcdFwiQVJcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL0FydWJhXCI6IHtcblx0XHRhOiBcIkFtZXJpY2EvUHVlcnRvX1JpY29cIixcblx0XHRjOiBbXG5cdFx0XHRcIkFXXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBbWVyaWNhL0FzdW5jaW9uXCI6IHtcblx0XHR1OiAtMjQwLFxuXHRcdGQ6IC0xODAsXG5cdFx0YzogW1xuXHRcdFx0XCJQWVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvQXRpa29rYW5cIjoge1xuXHRcdGE6IFwiQW1lcmljYS9QYW5hbWFcIixcblx0XHRjOiBbXG5cdFx0XHRcIkNBXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBbWVyaWNhL0F0a2FcIjoge1xuXHRcdGE6IFwiQW1lcmljYS9BZGFrXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFtZXJpY2EvQmFoaWFcIjoge1xuXHRcdHU6IC0xODAsXG5cdFx0YzogW1xuXHRcdFx0XCJCUlwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvQmFoaWFfQmFuZGVyYXNcIjoge1xuXHRcdHU6IC0zNjAsXG5cdFx0ZDogLTMwMCxcblx0XHRjOiBbXG5cdFx0XHRcIk1YXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9CYXJiYWRvc1wiOiB7XG5cdFx0dTogLTI0MCxcblx0XHRjOiBbXG5cdFx0XHRcIkJCXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9CZWxlbVwiOiB7XG5cdFx0dTogLTE4MCxcblx0XHRjOiBbXG5cdFx0XHRcIkJSXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9CZWxpemVcIjoge1xuXHRcdHU6IC0zNjAsXG5cdFx0YzogW1xuXHRcdFx0XCJCWlwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvQmxhbmMtU2FibG9uXCI6IHtcblx0XHRhOiBcIkFtZXJpY2EvUHVlcnRvX1JpY29cIixcblx0XHRjOiBbXG5cdFx0XHRcIkNBXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBbWVyaWNhL0JvYV9WaXN0YVwiOiB7XG5cdFx0dTogLTI0MCxcblx0XHRjOiBbXG5cdFx0XHRcIkJSXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9Cb2dvdGFcIjoge1xuXHRcdHU6IC0zMDAsXG5cdFx0YzogW1xuXHRcdFx0XCJDT1wiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvQm9pc2VcIjoge1xuXHRcdHU6IC00MjAsXG5cdFx0ZDogLTM2MCxcblx0XHRjOiBbXG5cdFx0XHRcIlVTXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9CdWVub3NfQWlyZXNcIjoge1xuXHRcdGE6IFwiQW1lcmljYS9BcmdlbnRpbmEvQnVlbm9zX0FpcmVzXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFtZXJpY2EvQ2FtYnJpZGdlX0JheVwiOiB7XG5cdFx0dTogLTQyMCxcblx0XHRkOiAtMzYwLFxuXHRcdGM6IFtcblx0XHRcdFwiQ0FcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL0NhbXBvX0dyYW5kZVwiOiB7XG5cdFx0dTogLTI0MCxcblx0XHRjOiBbXG5cdFx0XHRcIkJSXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9DYW5jdW5cIjoge1xuXHRcdHU6IC0zMDAsXG5cdFx0YzogW1xuXHRcdFx0XCJNWFwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvQ2FyYWNhc1wiOiB7XG5cdFx0dTogLTI0MCxcblx0XHRjOiBbXG5cdFx0XHRcIlZFXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9DYXRhbWFyY2FcIjoge1xuXHRcdGE6IFwiQW1lcmljYS9BcmdlbnRpbmEvQ2F0YW1hcmNhXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFtZXJpY2EvQ2F5ZW5uZVwiOiB7XG5cdFx0dTogLTE4MCxcblx0XHRjOiBbXG5cdFx0XHRcIkdGXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9DYXltYW5cIjoge1xuXHRcdGE6IFwiQW1lcmljYS9QYW5hbWFcIixcblx0XHRjOiBbXG5cdFx0XHRcIktZXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBbWVyaWNhL0NoaWNhZ29cIjoge1xuXHRcdHU6IC0zNjAsXG5cdFx0ZDogLTMwMCxcblx0XHRjOiBbXG5cdFx0XHRcIlVTXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9DaGlodWFodWFcIjoge1xuXHRcdHU6IC00MjAsXG5cdFx0ZDogLTM2MCxcblx0XHRjOiBbXG5cdFx0XHRcIk1YXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9Db3JhbF9IYXJib3VyXCI6IHtcblx0XHRhOiBcIkFtZXJpY2EvUGFuYW1hXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJDQVwiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiQW1lcmljYS9Db3Jkb2JhXCI6IHtcblx0XHRhOiBcIkFtZXJpY2EvQXJnZW50aW5hL0NvcmRvYmFcIixcblx0XHRyOiAxXG5cdH0sXG5cdFwiQW1lcmljYS9Db3N0YV9SaWNhXCI6IHtcblx0XHR1OiAtMzYwLFxuXHRcdGM6IFtcblx0XHRcdFwiQ1JcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL0NyZXN0b25cIjoge1xuXHRcdGE6IFwiQW1lcmljYS9QaG9lbml4XCIsXG5cdFx0YzogW1xuXHRcdFx0XCJDQVwiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiQW1lcmljYS9DdWlhYmFcIjoge1xuXHRcdHU6IC0yNDAsXG5cdFx0YzogW1xuXHRcdFx0XCJCUlwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvQ3VyYWNhb1wiOiB7XG5cdFx0YTogXCJBbWVyaWNhL1B1ZXJ0b19SaWNvXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJDV1wiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiQW1lcmljYS9EYW5tYXJrc2hhdm5cIjoge1xuXHRcdHU6IDAsXG5cdFx0YzogW1xuXHRcdFx0XCJHTFwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvRGF3c29uXCI6IHtcblx0XHR1OiAtNDIwLFxuXHRcdGM6IFtcblx0XHRcdFwiQ0FcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL0Rhd3Nvbl9DcmVla1wiOiB7XG5cdFx0dTogLTQyMCxcblx0XHRjOiBbXG5cdFx0XHRcIkNBXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9EZW52ZXJcIjoge1xuXHRcdHU6IC00MjAsXG5cdFx0ZDogLTM2MCxcblx0XHRjOiBbXG5cdFx0XHRcIlVTXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9EZXRyb2l0XCI6IHtcblx0XHR1OiAtMzAwLFxuXHRcdGQ6IC0yNDAsXG5cdFx0YzogW1xuXHRcdFx0XCJVU1wiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvRG9taW5pY2FcIjoge1xuXHRcdGE6IFwiQW1lcmljYS9QdWVydG9fUmljb1wiLFxuXHRcdGM6IFtcblx0XHRcdFwiRE1cIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFtZXJpY2EvRWRtb250b25cIjoge1xuXHRcdHU6IC00MjAsXG5cdFx0ZDogLTM2MCxcblx0XHRjOiBbXG5cdFx0XHRcIkNBXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9FaXJ1bmVwZVwiOiB7XG5cdFx0dTogLTMwMCxcblx0XHRjOiBbXG5cdFx0XHRcIkJSXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9FbF9TYWx2YWRvclwiOiB7XG5cdFx0dTogLTM2MCxcblx0XHRjOiBbXG5cdFx0XHRcIlNWXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9FbnNlbmFkYVwiOiB7XG5cdFx0YTogXCJBbWVyaWNhL1RpanVhbmFcIixcblx0XHRyOiAxXG5cdH0sXG5cdFwiQW1lcmljYS9Gb3J0X05lbHNvblwiOiB7XG5cdFx0dTogLTQyMCxcblx0XHRjOiBbXG5cdFx0XHRcIkNBXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9Gb3J0X1dheW5lXCI6IHtcblx0XHRhOiBcIkFtZXJpY2EvSW5kaWFuYS9JbmRpYW5hcG9saXNcIixcblx0XHRyOiAxXG5cdH0sXG5cdFwiQW1lcmljYS9Gb3J0YWxlemFcIjoge1xuXHRcdHU6IC0xODAsXG5cdFx0YzogW1xuXHRcdFx0XCJCUlwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvR2xhY2VfQmF5XCI6IHtcblx0XHR1OiAtMjQwLFxuXHRcdGQ6IC0xODAsXG5cdFx0YzogW1xuXHRcdFx0XCJDQVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvR29kdGhhYlwiOiB7XG5cdFx0YTogXCJBbWVyaWNhL051dWtcIixcblx0XHRyOiAxXG5cdH0sXG5cdFwiQW1lcmljYS9Hb29zZV9CYXlcIjoge1xuXHRcdHU6IC0yNDAsXG5cdFx0ZDogLTE4MCxcblx0XHRjOiBbXG5cdFx0XHRcIkNBXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9HcmFuZF9UdXJrXCI6IHtcblx0XHR1OiAtMzAwLFxuXHRcdGQ6IC0yNDAsXG5cdFx0YzogW1xuXHRcdFx0XCJUQ1wiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvR3JlbmFkYVwiOiB7XG5cdFx0YTogXCJBbWVyaWNhL1B1ZXJ0b19SaWNvXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJHRFwiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiQW1lcmljYS9HdWFkZWxvdXBlXCI6IHtcblx0XHRhOiBcIkFtZXJpY2EvUHVlcnRvX1JpY29cIixcblx0XHRjOiBbXG5cdFx0XHRcIkdQXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBbWVyaWNhL0d1YXRlbWFsYVwiOiB7XG5cdFx0dTogLTM2MCxcblx0XHRjOiBbXG5cdFx0XHRcIkdUXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9HdWF5YXF1aWxcIjoge1xuXHRcdHU6IC0zMDAsXG5cdFx0YzogW1xuXHRcdFx0XCJFQ1wiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvR3V5YW5hXCI6IHtcblx0XHR1OiAtMjQwLFxuXHRcdGM6IFtcblx0XHRcdFwiR1lcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL0hhbGlmYXhcIjoge1xuXHRcdHU6IC0yNDAsXG5cdFx0ZDogLTE4MCxcblx0XHRjOiBbXG5cdFx0XHRcIkNBXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9IYXZhbmFcIjoge1xuXHRcdHU6IC0zMDAsXG5cdFx0ZDogLTI0MCxcblx0XHRjOiBbXG5cdFx0XHRcIkNVXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9IZXJtb3NpbGxvXCI6IHtcblx0XHR1OiAtNDIwLFxuXHRcdGM6IFtcblx0XHRcdFwiTVhcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL0luZGlhbmEvSW5kaWFuYXBvbGlzXCI6IHtcblx0XHR1OiAtMzAwLFxuXHRcdGQ6IC0yNDAsXG5cdFx0YzogW1xuXHRcdFx0XCJVU1wiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvSW5kaWFuYS9Lbm94XCI6IHtcblx0XHR1OiAtMzYwLFxuXHRcdGQ6IC0zMDAsXG5cdFx0YzogW1xuXHRcdFx0XCJVU1wiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvSW5kaWFuYS9NYXJlbmdvXCI6IHtcblx0XHR1OiAtMzAwLFxuXHRcdGQ6IC0yNDAsXG5cdFx0YzogW1xuXHRcdFx0XCJVU1wiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvSW5kaWFuYS9QZXRlcnNidXJnXCI6IHtcblx0XHR1OiAtMzAwLFxuXHRcdGQ6IC0yNDAsXG5cdFx0YzogW1xuXHRcdFx0XCJVU1wiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvSW5kaWFuYS9UZWxsX0NpdHlcIjoge1xuXHRcdHU6IC0zNjAsXG5cdFx0ZDogLTMwMCxcblx0XHRjOiBbXG5cdFx0XHRcIlVTXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9JbmRpYW5hL1ZldmF5XCI6IHtcblx0XHR1OiAtMzAwLFxuXHRcdGQ6IC0yNDAsXG5cdFx0YzogW1xuXHRcdFx0XCJVU1wiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvSW5kaWFuYS9WaW5jZW5uZXNcIjoge1xuXHRcdHU6IC0zMDAsXG5cdFx0ZDogLTI0MCxcblx0XHRjOiBbXG5cdFx0XHRcIlVTXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9JbmRpYW5hL1dpbmFtYWNcIjoge1xuXHRcdHU6IC0zMDAsXG5cdFx0ZDogLTI0MCxcblx0XHRjOiBbXG5cdFx0XHRcIlVTXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9JbmRpYW5hcG9saXNcIjoge1xuXHRcdGE6IFwiQW1lcmljYS9JbmRpYW5hL0luZGlhbmFwb2xpc1wiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBbWVyaWNhL0ludXZpa1wiOiB7XG5cdFx0dTogLTQyMCxcblx0XHRkOiAtMzYwLFxuXHRcdGM6IFtcblx0XHRcdFwiQ0FcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL0lxYWx1aXRcIjoge1xuXHRcdHU6IC0zMDAsXG5cdFx0ZDogLTI0MCxcblx0XHRjOiBbXG5cdFx0XHRcIkNBXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9KYW1haWNhXCI6IHtcblx0XHR1OiAtMzAwLFxuXHRcdGM6IFtcblx0XHRcdFwiSk1cIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL0p1anV5XCI6IHtcblx0XHRhOiBcIkFtZXJpY2EvQXJnZW50aW5hL0p1anV5XCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFtZXJpY2EvSnVuZWF1XCI6IHtcblx0XHR1OiAtNTQwLFxuXHRcdGQ6IC00ODAsXG5cdFx0YzogW1xuXHRcdFx0XCJVU1wiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvS2VudHVja3kvTG91aXN2aWxsZVwiOiB7XG5cdFx0dTogLTMwMCxcblx0XHRkOiAtMjQwLFxuXHRcdGM6IFtcblx0XHRcdFwiVVNcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL0tlbnR1Y2t5L01vbnRpY2VsbG9cIjoge1xuXHRcdHU6IC0zMDAsXG5cdFx0ZDogLTI0MCxcblx0XHRjOiBbXG5cdFx0XHRcIlVTXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9Lbm94X0lOXCI6IHtcblx0XHRhOiBcIkFtZXJpY2EvSW5kaWFuYS9Lbm94XCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFtZXJpY2EvS3JhbGVuZGlqa1wiOiB7XG5cdFx0YTogXCJBbWVyaWNhL1B1ZXJ0b19SaWNvXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJCUVwiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiQW1lcmljYS9MYV9QYXpcIjoge1xuXHRcdHU6IC0yNDAsXG5cdFx0YzogW1xuXHRcdFx0XCJCT1wiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvTGltYVwiOiB7XG5cdFx0dTogLTMwMCxcblx0XHRjOiBbXG5cdFx0XHRcIlBFXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9Mb3NfQW5nZWxlc1wiOiB7XG5cdFx0dTogLTQ4MCxcblx0XHRkOiAtNDIwLFxuXHRcdGM6IFtcblx0XHRcdFwiVVNcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL0xvdWlzdmlsbGVcIjoge1xuXHRcdGE6IFwiQW1lcmljYS9LZW50dWNreS9Mb3Vpc3ZpbGxlXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFtZXJpY2EvTG93ZXJfUHJpbmNlc1wiOiB7XG5cdFx0YTogXCJBbWVyaWNhL1B1ZXJ0b19SaWNvXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJTWFwiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiQW1lcmljYS9NYWNlaW9cIjoge1xuXHRcdHU6IC0xODAsXG5cdFx0YzogW1xuXHRcdFx0XCJCUlwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvTWFuYWd1YVwiOiB7XG5cdFx0dTogLTM2MCxcblx0XHRjOiBbXG5cdFx0XHRcIk5JXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9NYW5hdXNcIjoge1xuXHRcdHU6IC0yNDAsXG5cdFx0YzogW1xuXHRcdFx0XCJCUlwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvTWFyaWdvdFwiOiB7XG5cdFx0YTogXCJBbWVyaWNhL1B1ZXJ0b19SaWNvXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJNRlwiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiQW1lcmljYS9NYXJ0aW5pcXVlXCI6IHtcblx0XHR1OiAtMjQwLFxuXHRcdGM6IFtcblx0XHRcdFwiTVFcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL01hdGFtb3Jvc1wiOiB7XG5cdFx0dTogLTM2MCxcblx0XHRkOiAtMzAwLFxuXHRcdGM6IFtcblx0XHRcdFwiTVhcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL01hemF0bGFuXCI6IHtcblx0XHR1OiAtNDIwLFxuXHRcdGQ6IC0zNjAsXG5cdFx0YzogW1xuXHRcdFx0XCJNWFwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvTWVuZG96YVwiOiB7XG5cdFx0YTogXCJBbWVyaWNhL0FyZ2VudGluYS9NZW5kb3phXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFtZXJpY2EvTWVub21pbmVlXCI6IHtcblx0XHR1OiAtMzYwLFxuXHRcdGQ6IC0zMDAsXG5cdFx0YzogW1xuXHRcdFx0XCJVU1wiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvTWVyaWRhXCI6IHtcblx0XHR1OiAtMzYwLFxuXHRcdGQ6IC0zMDAsXG5cdFx0YzogW1xuXHRcdFx0XCJNWFwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvTWV0bGFrYXRsYVwiOiB7XG5cdFx0dTogLTU0MCxcblx0XHRkOiAtNDgwLFxuXHRcdGM6IFtcblx0XHRcdFwiVVNcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL01leGljb19DaXR5XCI6IHtcblx0XHR1OiAtMzYwLFxuXHRcdGQ6IC0zMDAsXG5cdFx0YzogW1xuXHRcdFx0XCJNWFwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvTWlxdWVsb25cIjoge1xuXHRcdHU6IC0xODAsXG5cdFx0ZDogLTEyMCxcblx0XHRjOiBbXG5cdFx0XHRcIlBNXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9Nb25jdG9uXCI6IHtcblx0XHR1OiAtMjQwLFxuXHRcdGQ6IC0xODAsXG5cdFx0YzogW1xuXHRcdFx0XCJDQVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvTW9udGVycmV5XCI6IHtcblx0XHR1OiAtMzYwLFxuXHRcdGQ6IC0zMDAsXG5cdFx0YzogW1xuXHRcdFx0XCJNWFwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvTW9udGV2aWRlb1wiOiB7XG5cdFx0dTogLTE4MCxcblx0XHRjOiBbXG5cdFx0XHRcIlVZXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9Nb250cmVhbFwiOiB7XG5cdFx0YTogXCJBbWVyaWNhL1Rvcm9udG9cIixcblx0XHRjOiBbXG5cdFx0XHRcIkNBXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBbWVyaWNhL01vbnRzZXJyYXRcIjoge1xuXHRcdGE6IFwiQW1lcmljYS9QdWVydG9fUmljb1wiLFxuXHRcdGM6IFtcblx0XHRcdFwiTVNcIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFtZXJpY2EvTmFzc2F1XCI6IHtcblx0XHRhOiBcIkFtZXJpY2EvVG9yb250b1wiLFxuXHRcdGM6IFtcblx0XHRcdFwiQlNcIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFtZXJpY2EvTmV3X1lvcmtcIjoge1xuXHRcdHU6IC0zMDAsXG5cdFx0ZDogLTI0MCxcblx0XHRjOiBbXG5cdFx0XHRcIlVTXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9OaXBpZ29uXCI6IHtcblx0XHR1OiAtMzAwLFxuXHRcdGQ6IC0yNDAsXG5cdFx0YzogW1xuXHRcdFx0XCJDQVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvTm9tZVwiOiB7XG5cdFx0dTogLTU0MCxcblx0XHRkOiAtNDgwLFxuXHRcdGM6IFtcblx0XHRcdFwiVVNcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL05vcm9uaGFcIjoge1xuXHRcdHU6IC0xMjAsXG5cdFx0YzogW1xuXHRcdFx0XCJCUlwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvTm9ydGhfRGFrb3RhL0JldWxhaFwiOiB7XG5cdFx0dTogLTM2MCxcblx0XHRkOiAtMzAwLFxuXHRcdGM6IFtcblx0XHRcdFwiVVNcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL05vcnRoX0Rha290YS9DZW50ZXJcIjoge1xuXHRcdHU6IC0zNjAsXG5cdFx0ZDogLTMwMCxcblx0XHRjOiBbXG5cdFx0XHRcIlVTXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9Ob3J0aF9EYWtvdGEvTmV3X1NhbGVtXCI6IHtcblx0XHR1OiAtMzYwLFxuXHRcdGQ6IC0zMDAsXG5cdFx0YzogW1xuXHRcdFx0XCJVU1wiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvTnV1a1wiOiB7XG5cdFx0dTogLTE4MCxcblx0XHRkOiAtMTIwLFxuXHRcdGM6IFtcblx0XHRcdFwiR0xcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL09qaW5hZ2FcIjoge1xuXHRcdHU6IC00MjAsXG5cdFx0ZDogLTM2MCxcblx0XHRjOiBbXG5cdFx0XHRcIk1YXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9QYW5hbWFcIjoge1xuXHRcdHU6IC0zMDAsXG5cdFx0YzogW1xuXHRcdFx0XCJQQVwiLFxuXHRcdFx0XCJDQVwiLFxuXHRcdFx0XCJLWVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvUGFuZ25pcnR1bmdcIjoge1xuXHRcdHU6IC0zMDAsXG5cdFx0ZDogLTI0MCxcblx0XHRjOiBbXG5cdFx0XHRcIkNBXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9QYXJhbWFyaWJvXCI6IHtcblx0XHR1OiAtMTgwLFxuXHRcdGM6IFtcblx0XHRcdFwiU1JcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL1Bob2VuaXhcIjoge1xuXHRcdHU6IC00MjAsXG5cdFx0YzogW1xuXHRcdFx0XCJVU1wiLFxuXHRcdFx0XCJDQVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvUG9ydC1hdS1QcmluY2VcIjoge1xuXHRcdHU6IC0zMDAsXG5cdFx0ZDogLTI0MCxcblx0XHRjOiBbXG5cdFx0XHRcIkhUXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9Qb3J0X29mX1NwYWluXCI6IHtcblx0XHRhOiBcIkFtZXJpY2EvUHVlcnRvX1JpY29cIixcblx0XHRjOiBbXG5cdFx0XHRcIlRUXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBbWVyaWNhL1BvcnRvX0FjcmVcIjoge1xuXHRcdGE6IFwiQW1lcmljYS9SaW9fQnJhbmNvXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFtZXJpY2EvUG9ydG9fVmVsaG9cIjoge1xuXHRcdHU6IC0yNDAsXG5cdFx0YzogW1xuXHRcdFx0XCJCUlwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvUHVlcnRvX1JpY29cIjoge1xuXHRcdHU6IC0yNDAsXG5cdFx0YzogW1xuXHRcdFx0XCJQUlwiLFxuXHRcdFx0XCJBR1wiLFxuXHRcdFx0XCJDQVwiLFxuXHRcdFx0XCJBSVwiLFxuXHRcdFx0XCJBV1wiLFxuXHRcdFx0XCJCTFwiLFxuXHRcdFx0XCJCUVwiLFxuXHRcdFx0XCJDV1wiLFxuXHRcdFx0XCJETVwiLFxuXHRcdFx0XCJHRFwiLFxuXHRcdFx0XCJHUFwiLFxuXHRcdFx0XCJLTlwiLFxuXHRcdFx0XCJMQ1wiLFxuXHRcdFx0XCJNRlwiLFxuXHRcdFx0XCJNU1wiLFxuXHRcdFx0XCJTWFwiLFxuXHRcdFx0XCJUVFwiLFxuXHRcdFx0XCJWQ1wiLFxuXHRcdFx0XCJWR1wiLFxuXHRcdFx0XCJWSVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvUHVudGFfQXJlbmFzXCI6IHtcblx0XHR1OiAtMTgwLFxuXHRcdGM6IFtcblx0XHRcdFwiQ0xcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL1JhaW55X1JpdmVyXCI6IHtcblx0XHR1OiAtMzYwLFxuXHRcdGQ6IC0zMDAsXG5cdFx0YzogW1xuXHRcdFx0XCJDQVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvUmFua2luX0lubGV0XCI6IHtcblx0XHR1OiAtMzYwLFxuXHRcdGQ6IC0zMDAsXG5cdFx0YzogW1xuXHRcdFx0XCJDQVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvUmVjaWZlXCI6IHtcblx0XHR1OiAtMTgwLFxuXHRcdGM6IFtcblx0XHRcdFwiQlJcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL1JlZ2luYVwiOiB7XG5cdFx0dTogLTM2MCxcblx0XHRjOiBbXG5cdFx0XHRcIkNBXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9SZXNvbHV0ZVwiOiB7XG5cdFx0dTogLTM2MCxcblx0XHRkOiAtMzAwLFxuXHRcdGM6IFtcblx0XHRcdFwiQ0FcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL1Jpb19CcmFuY29cIjoge1xuXHRcdHU6IC0zMDAsXG5cdFx0YzogW1xuXHRcdFx0XCJCUlwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvUm9zYXJpb1wiOiB7XG5cdFx0YTogXCJBbWVyaWNhL0FyZ2VudGluYS9Db3Jkb2JhXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFtZXJpY2EvU2FudGFfSXNhYmVsXCI6IHtcblx0XHRhOiBcIkFtZXJpY2EvVGlqdWFuYVwiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBbWVyaWNhL1NhbnRhcmVtXCI6IHtcblx0XHR1OiAtMTgwLFxuXHRcdGM6IFtcblx0XHRcdFwiQlJcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL1NhbnRpYWdvXCI6IHtcblx0XHR1OiAtMjQwLFxuXHRcdGQ6IC0xODAsXG5cdFx0YzogW1xuXHRcdFx0XCJDTFwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvU2FudG9fRG9taW5nb1wiOiB7XG5cdFx0dTogLTI0MCxcblx0XHRjOiBbXG5cdFx0XHRcIkRPXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9TYW9fUGF1bG9cIjoge1xuXHRcdHU6IC0xODAsXG5cdFx0YzogW1xuXHRcdFx0XCJCUlwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvU2NvcmVzYnlzdW5kXCI6IHtcblx0XHR1OiAtNjAsXG5cdFx0ZDogMCxcblx0XHRjOiBbXG5cdFx0XHRcIkdMXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9TaGlwcm9ja1wiOiB7XG5cdFx0YTogXCJBbWVyaWNhL0RlbnZlclwiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBbWVyaWNhL1NpdGthXCI6IHtcblx0XHR1OiAtNTQwLFxuXHRcdGQ6IC00ODAsXG5cdFx0YzogW1xuXHRcdFx0XCJVU1wiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvU3RfQmFydGhlbGVteVwiOiB7XG5cdFx0YTogXCJBbWVyaWNhL1B1ZXJ0b19SaWNvXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJCTFwiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiQW1lcmljYS9TdF9Kb2huc1wiOiB7XG5cdFx0dTogLTE1MCxcblx0XHRkOiAtOTAsXG5cdFx0YzogW1xuXHRcdFx0XCJDQVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvU3RfS2l0dHNcIjoge1xuXHRcdGE6IFwiQW1lcmljYS9QdWVydG9fUmljb1wiLFxuXHRcdGM6IFtcblx0XHRcdFwiS05cIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFtZXJpY2EvU3RfTHVjaWFcIjoge1xuXHRcdGE6IFwiQW1lcmljYS9QdWVydG9fUmljb1wiLFxuXHRcdGM6IFtcblx0XHRcdFwiTENcIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFtZXJpY2EvU3RfVGhvbWFzXCI6IHtcblx0XHRhOiBcIkFtZXJpY2EvUHVlcnRvX1JpY29cIixcblx0XHRjOiBbXG5cdFx0XHRcIlZJXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBbWVyaWNhL1N0X1ZpbmNlbnRcIjoge1xuXHRcdGE6IFwiQW1lcmljYS9QdWVydG9fUmljb1wiLFxuXHRcdGM6IFtcblx0XHRcdFwiVkNcIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFtZXJpY2EvU3dpZnRfQ3VycmVudFwiOiB7XG5cdFx0dTogLTM2MCxcblx0XHRjOiBbXG5cdFx0XHRcIkNBXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9UZWd1Y2lnYWxwYVwiOiB7XG5cdFx0dTogLTM2MCxcblx0XHRjOiBbXG5cdFx0XHRcIkhOXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9UaHVsZVwiOiB7XG5cdFx0dTogLTI0MCxcblx0XHRkOiAtMTgwLFxuXHRcdGM6IFtcblx0XHRcdFwiR0xcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL1RodW5kZXJfQmF5XCI6IHtcblx0XHR1OiAtMzAwLFxuXHRcdGQ6IC0yNDAsXG5cdFx0YzogW1xuXHRcdFx0XCJDQVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvVGlqdWFuYVwiOiB7XG5cdFx0dTogLTQ4MCxcblx0XHRkOiAtNDIwLFxuXHRcdGM6IFtcblx0XHRcdFwiTVhcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL1Rvcm9udG9cIjoge1xuXHRcdHU6IC0zMDAsXG5cdFx0ZDogLTI0MCxcblx0XHRjOiBbXG5cdFx0XHRcIkNBXCIsXG5cdFx0XHRcIkJTXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9Ub3J0b2xhXCI6IHtcblx0XHRhOiBcIkFtZXJpY2EvUHVlcnRvX1JpY29cIixcblx0XHRjOiBbXG5cdFx0XHRcIlZHXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBbWVyaWNhL1ZhbmNvdXZlclwiOiB7XG5cdFx0dTogLTQ4MCxcblx0XHRkOiAtNDIwLFxuXHRcdGM6IFtcblx0XHRcdFwiQ0FcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL1ZpcmdpblwiOiB7XG5cdFx0YTogXCJBbWVyaWNhL1B1ZXJ0b19SaWNvXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJWSVwiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiQW1lcmljYS9XaGl0ZWhvcnNlXCI6IHtcblx0XHR1OiAtNDIwLFxuXHRcdGM6IFtcblx0XHRcdFwiQ0FcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL1dpbm5pcGVnXCI6IHtcblx0XHR1OiAtMzYwLFxuXHRcdGQ6IC0zMDAsXG5cdFx0YzogW1xuXHRcdFx0XCJDQVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvWWFrdXRhdFwiOiB7XG5cdFx0dTogLTU0MCxcblx0XHRkOiAtNDgwLFxuXHRcdGM6IFtcblx0XHRcdFwiVVNcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL1llbGxvd2tuaWZlXCI6IHtcblx0XHR1OiAtNDIwLFxuXHRcdGQ6IC0zNjAsXG5cdFx0YzogW1xuXHRcdFx0XCJDQVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFudGFyY3RpY2EvQ2FzZXlcIjoge1xuXHRcdHU6IDY2MCxcblx0XHRjOiBbXG5cdFx0XHRcIkFRXCJcblx0XHRdXG5cdH0sXG5cdFwiQW50YXJjdGljYS9EYXZpc1wiOiB7XG5cdFx0dTogNDIwLFxuXHRcdGM6IFtcblx0XHRcdFwiQVFcIlxuXHRcdF1cblx0fSxcblx0XCJBbnRhcmN0aWNhL0R1bW9udERVcnZpbGxlXCI6IHtcblx0XHRhOiBcIlBhY2lmaWMvUG9ydF9Nb3Jlc2J5XCIsXG5cdFx0YzogW1xuXHRcdFx0XCJBUVwiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiQW50YXJjdGljYS9NYWNxdWFyaWVcIjoge1xuXHRcdHU6IDYwMCxcblx0XHRkOiA2NjAsXG5cdFx0YzogW1xuXHRcdFx0XCJBVVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFudGFyY3RpY2EvTWF3c29uXCI6IHtcblx0XHR1OiAzMDAsXG5cdFx0YzogW1xuXHRcdFx0XCJBUVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFudGFyY3RpY2EvTWNNdXJkb1wiOiB7XG5cdFx0YTogXCJQYWNpZmljL0F1Y2tsYW5kXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJBUVwiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiQW50YXJjdGljYS9QYWxtZXJcIjoge1xuXHRcdHU6IC0xODAsXG5cdFx0YzogW1xuXHRcdFx0XCJBUVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFudGFyY3RpY2EvUm90aGVyYVwiOiB7XG5cdFx0dTogLTE4MCxcblx0XHRjOiBbXG5cdFx0XHRcIkFRXCJcblx0XHRdXG5cdH0sXG5cdFwiQW50YXJjdGljYS9Tb3V0aF9Qb2xlXCI6IHtcblx0XHRhOiBcIlBhY2lmaWMvQXVja2xhbmRcIixcblx0XHRjOiBbXG5cdFx0XHRcIkFRXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBbnRhcmN0aWNhL1N5b3dhXCI6IHtcblx0XHRhOiBcIkFzaWEvUml5YWRoXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJBUVwiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiQW50YXJjdGljYS9Ucm9sbFwiOiB7XG5cdFx0dTogMCxcblx0XHRkOiAxMjAsXG5cdFx0YzogW1xuXHRcdFx0XCJBUVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFudGFyY3RpY2EvVm9zdG9rXCI6IHtcblx0XHR1OiAzNjAsXG5cdFx0YzogW1xuXHRcdFx0XCJBUVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFyY3RpYy9Mb25neWVhcmJ5ZW5cIjoge1xuXHRcdGE6IFwiRXVyb3BlL09zbG9cIixcblx0XHRjOiBbXG5cdFx0XHRcIlNKXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBc2lhL0FkZW5cIjoge1xuXHRcdGE6IFwiQXNpYS9SaXlhZGhcIixcblx0XHRjOiBbXG5cdFx0XHRcIllFXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBc2lhL0FsbWF0eVwiOiB7XG5cdFx0dTogMzYwLFxuXHRcdGM6IFtcblx0XHRcdFwiS1pcIlxuXHRcdF1cblx0fSxcblx0XCJBc2lhL0FtbWFuXCI6IHtcblx0XHR1OiAxMjAsXG5cdFx0ZDogMTgwLFxuXHRcdGM6IFtcblx0XHRcdFwiSk9cIlxuXHRcdF1cblx0fSxcblx0XCJBc2lhL0FuYWR5clwiOiB7XG5cdFx0dTogNzIwLFxuXHRcdGM6IFtcblx0XHRcdFwiUlVcIlxuXHRcdF1cblx0fSxcblx0XCJBc2lhL0FxdGF1XCI6IHtcblx0XHR1OiAzMDAsXG5cdFx0YzogW1xuXHRcdFx0XCJLWlwiXG5cdFx0XVxuXHR9LFxuXHRcIkFzaWEvQXF0b2JlXCI6IHtcblx0XHR1OiAzMDAsXG5cdFx0YzogW1xuXHRcdFx0XCJLWlwiXG5cdFx0XVxuXHR9LFxuXHRcIkFzaWEvQXNoZ2FiYXRcIjoge1xuXHRcdHU6IDMwMCxcblx0XHRjOiBbXG5cdFx0XHRcIlRNXCJcblx0XHRdXG5cdH0sXG5cdFwiQXNpYS9Bc2hraGFiYWRcIjoge1xuXHRcdGE6IFwiQXNpYS9Bc2hnYWJhdFwiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBc2lhL0F0eXJhdVwiOiB7XG5cdFx0dTogMzAwLFxuXHRcdGM6IFtcblx0XHRcdFwiS1pcIlxuXHRcdF1cblx0fSxcblx0XCJBc2lhL0JhZ2hkYWRcIjoge1xuXHRcdHU6IDE4MCxcblx0XHRjOiBbXG5cdFx0XHRcIklRXCJcblx0XHRdXG5cdH0sXG5cdFwiQXNpYS9CYWhyYWluXCI6IHtcblx0XHRhOiBcIkFzaWEvUWF0YXJcIixcblx0XHRjOiBbXG5cdFx0XHRcIkJIXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBc2lhL0Jha3VcIjoge1xuXHRcdHU6IDI0MCxcblx0XHRjOiBbXG5cdFx0XHRcIkFaXCJcblx0XHRdXG5cdH0sXG5cdFwiQXNpYS9CYW5na29rXCI6IHtcblx0XHR1OiA0MjAsXG5cdFx0YzogW1xuXHRcdFx0XCJUSFwiLFxuXHRcdFx0XCJLSFwiLFxuXHRcdFx0XCJMQVwiLFxuXHRcdFx0XCJWTlwiXG5cdFx0XVxuXHR9LFxuXHRcIkFzaWEvQmFybmF1bFwiOiB7XG5cdFx0dTogNDIwLFxuXHRcdGM6IFtcblx0XHRcdFwiUlVcIlxuXHRcdF1cblx0fSxcblx0XCJBc2lhL0JlaXJ1dFwiOiB7XG5cdFx0dTogMTIwLFxuXHRcdGQ6IDE4MCxcblx0XHRjOiBbXG5cdFx0XHRcIkxCXCJcblx0XHRdXG5cdH0sXG5cdFwiQXNpYS9CaXNoa2VrXCI6IHtcblx0XHR1OiAzNjAsXG5cdFx0YzogW1xuXHRcdFx0XCJLR1wiXG5cdFx0XVxuXHR9LFxuXHRcIkFzaWEvQnJ1bmVpXCI6IHtcblx0XHR1OiA0ODAsXG5cdFx0YzogW1xuXHRcdFx0XCJCTlwiXG5cdFx0XVxuXHR9LFxuXHRcIkFzaWEvQ2FsY3V0dGFcIjoge1xuXHRcdGE6IFwiQXNpYS9Lb2xrYXRhXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFzaWEvQ2hpdGFcIjoge1xuXHRcdHU6IDU0MCxcblx0XHRjOiBbXG5cdFx0XHRcIlJVXCJcblx0XHRdXG5cdH0sXG5cdFwiQXNpYS9DaG9pYmFsc2FuXCI6IHtcblx0XHR1OiA0ODAsXG5cdFx0YzogW1xuXHRcdFx0XCJNTlwiXG5cdFx0XVxuXHR9LFxuXHRcIkFzaWEvQ2hvbmdxaW5nXCI6IHtcblx0XHRhOiBcIkFzaWEvU2hhbmdoYWlcIixcblx0XHRyOiAxXG5cdH0sXG5cdFwiQXNpYS9DaHVuZ2tpbmdcIjoge1xuXHRcdGE6IFwiQXNpYS9TaGFuZ2hhaVwiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBc2lhL0NvbG9tYm9cIjoge1xuXHRcdHU6IDMzMCxcblx0XHRjOiBbXG5cdFx0XHRcIkxLXCJcblx0XHRdXG5cdH0sXG5cdFwiQXNpYS9EYWNjYVwiOiB7XG5cdFx0YTogXCJBc2lhL0RoYWthXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFzaWEvRGFtYXNjdXNcIjoge1xuXHRcdHU6IDEyMCxcblx0XHRkOiAxODAsXG5cdFx0YzogW1xuXHRcdFx0XCJTWVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFzaWEvRGhha2FcIjoge1xuXHRcdHU6IDM2MCxcblx0XHRjOiBbXG5cdFx0XHRcIkJEXCJcblx0XHRdXG5cdH0sXG5cdFwiQXNpYS9EaWxpXCI6IHtcblx0XHR1OiA1NDAsXG5cdFx0YzogW1xuXHRcdFx0XCJUTFwiXG5cdFx0XVxuXHR9LFxuXHRcIkFzaWEvRHViYWlcIjoge1xuXHRcdHU6IDI0MCxcblx0XHRjOiBbXG5cdFx0XHRcIkFFXCIsXG5cdFx0XHRcIk9NXCJcblx0XHRdXG5cdH0sXG5cdFwiQXNpYS9EdXNoYW5iZVwiOiB7XG5cdFx0dTogMzAwLFxuXHRcdGM6IFtcblx0XHRcdFwiVEpcIlxuXHRcdF1cblx0fSxcblx0XCJBc2lhL0ZhbWFndXN0YVwiOiB7XG5cdFx0dTogMTIwLFxuXHRcdGQ6IDE4MCxcblx0XHRjOiBbXG5cdFx0XHRcIkNZXCJcblx0XHRdXG5cdH0sXG5cdFwiQXNpYS9HYXphXCI6IHtcblx0XHR1OiAxMjAsXG5cdFx0ZDogMTgwLFxuXHRcdGM6IFtcblx0XHRcdFwiUFNcIlxuXHRcdF1cblx0fSxcblx0XCJBc2lhL0hhcmJpblwiOiB7XG5cdFx0YTogXCJBc2lhL1NoYW5naGFpXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFzaWEvSGVicm9uXCI6IHtcblx0XHR1OiAxMjAsXG5cdFx0ZDogMTgwLFxuXHRcdGM6IFtcblx0XHRcdFwiUFNcIlxuXHRcdF1cblx0fSxcblx0XCJBc2lhL0hvX0NoaV9NaW5oXCI6IHtcblx0XHR1OiA0MjAsXG5cdFx0YzogW1xuXHRcdFx0XCJWTlwiXG5cdFx0XVxuXHR9LFxuXHRcIkFzaWEvSG9uZ19Lb25nXCI6IHtcblx0XHR1OiA0ODAsXG5cdFx0YzogW1xuXHRcdFx0XCJIS1wiXG5cdFx0XVxuXHR9LFxuXHRcIkFzaWEvSG92ZFwiOiB7XG5cdFx0dTogNDIwLFxuXHRcdGM6IFtcblx0XHRcdFwiTU5cIlxuXHRcdF1cblx0fSxcblx0XCJBc2lhL0lya3V0c2tcIjoge1xuXHRcdHU6IDQ4MCxcblx0XHRjOiBbXG5cdFx0XHRcIlJVXCJcblx0XHRdXG5cdH0sXG5cdFwiQXNpYS9Jc3RhbmJ1bFwiOiB7XG5cdFx0YTogXCJFdXJvcGUvSXN0YW5idWxcIixcblx0XHRyOiAxXG5cdH0sXG5cdFwiQXNpYS9KYWthcnRhXCI6IHtcblx0XHR1OiA0MjAsXG5cdFx0YzogW1xuXHRcdFx0XCJJRFwiXG5cdFx0XVxuXHR9LFxuXHRcIkFzaWEvSmF5YXB1cmFcIjoge1xuXHRcdHU6IDU0MCxcblx0XHRjOiBbXG5cdFx0XHRcIklEXCJcblx0XHRdXG5cdH0sXG5cdFwiQXNpYS9KZXJ1c2FsZW1cIjoge1xuXHRcdHU6IDEyMCxcblx0XHRkOiAxODAsXG5cdFx0YzogW1xuXHRcdFx0XCJJTFwiXG5cdFx0XVxuXHR9LFxuXHRcIkFzaWEvS2FidWxcIjoge1xuXHRcdHU6IDI3MCxcblx0XHRjOiBbXG5cdFx0XHRcIkFGXCJcblx0XHRdXG5cdH0sXG5cdFwiQXNpYS9LYW1jaGF0a2FcIjoge1xuXHRcdHU6IDcyMCxcblx0XHRjOiBbXG5cdFx0XHRcIlJVXCJcblx0XHRdXG5cdH0sXG5cdFwiQXNpYS9LYXJhY2hpXCI6IHtcblx0XHR1OiAzMDAsXG5cdFx0YzogW1xuXHRcdFx0XCJQS1wiXG5cdFx0XVxuXHR9LFxuXHRcIkFzaWEvS2FzaGdhclwiOiB7XG5cdFx0YTogXCJBc2lhL1VydW1xaVwiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBc2lhL0thdGhtYW5kdVwiOiB7XG5cdFx0dTogMzQ1LFxuXHRcdGM6IFtcblx0XHRcdFwiTlBcIlxuXHRcdF1cblx0fSxcblx0XCJBc2lhL0thdG1hbmR1XCI6IHtcblx0XHRhOiBcIkFzaWEvS2F0aG1hbmR1XCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFzaWEvS2hhbmR5Z2FcIjoge1xuXHRcdHU6IDU0MCxcblx0XHRjOiBbXG5cdFx0XHRcIlJVXCJcblx0XHRdXG5cdH0sXG5cdFwiQXNpYS9Lb2xrYXRhXCI6IHtcblx0XHR1OiAzMzAsXG5cdFx0YzogW1xuXHRcdFx0XCJJTlwiXG5cdFx0XVxuXHR9LFxuXHRcIkFzaWEvS3Jhc25veWFyc2tcIjoge1xuXHRcdHU6IDQyMCxcblx0XHRjOiBbXG5cdFx0XHRcIlJVXCJcblx0XHRdXG5cdH0sXG5cdFwiQXNpYS9LdWFsYV9MdW1wdXJcIjoge1xuXHRcdHU6IDQ4MCxcblx0XHRjOiBbXG5cdFx0XHRcIk1ZXCJcblx0XHRdXG5cdH0sXG5cdFwiQXNpYS9LdWNoaW5nXCI6IHtcblx0XHR1OiA0ODAsXG5cdFx0YzogW1xuXHRcdFx0XCJNWVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFzaWEvS3V3YWl0XCI6IHtcblx0XHRhOiBcIkFzaWEvUml5YWRoXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJLV1wiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiQXNpYS9NYWNhb1wiOiB7XG5cdFx0YTogXCJBc2lhL01hY2F1XCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFzaWEvTWFjYXVcIjoge1xuXHRcdHU6IDQ4MCxcblx0XHRjOiBbXG5cdFx0XHRcIk1PXCJcblx0XHRdXG5cdH0sXG5cdFwiQXNpYS9NYWdhZGFuXCI6IHtcblx0XHR1OiA2NjAsXG5cdFx0YzogW1xuXHRcdFx0XCJSVVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFzaWEvTWFrYXNzYXJcIjoge1xuXHRcdHU6IDQ4MCxcblx0XHRjOiBbXG5cdFx0XHRcIklEXCJcblx0XHRdXG5cdH0sXG5cdFwiQXNpYS9NYW5pbGFcIjoge1xuXHRcdHU6IDQ4MCxcblx0XHRjOiBbXG5cdFx0XHRcIlBIXCJcblx0XHRdXG5cdH0sXG5cdFwiQXNpYS9NdXNjYXRcIjoge1xuXHRcdGE6IFwiQXNpYS9EdWJhaVwiLFxuXHRcdGM6IFtcblx0XHRcdFwiT01cIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFzaWEvTmljb3NpYVwiOiB7XG5cdFx0dTogMTIwLFxuXHRcdGQ6IDE4MCxcblx0XHRjOiBbXG5cdFx0XHRcIkNZXCJcblx0XHRdXG5cdH0sXG5cdFwiQXNpYS9Ob3Zva3V6bmV0c2tcIjoge1xuXHRcdHU6IDQyMCxcblx0XHRjOiBbXG5cdFx0XHRcIlJVXCJcblx0XHRdXG5cdH0sXG5cdFwiQXNpYS9Ob3Zvc2liaXJza1wiOiB7XG5cdFx0dTogNDIwLFxuXHRcdGM6IFtcblx0XHRcdFwiUlVcIlxuXHRcdF1cblx0fSxcblx0XCJBc2lhL09tc2tcIjoge1xuXHRcdHU6IDM2MCxcblx0XHRjOiBbXG5cdFx0XHRcIlJVXCJcblx0XHRdXG5cdH0sXG5cdFwiQXNpYS9PcmFsXCI6IHtcblx0XHR1OiAzMDAsXG5cdFx0YzogW1xuXHRcdFx0XCJLWlwiXG5cdFx0XVxuXHR9LFxuXHRcIkFzaWEvUGhub21fUGVuaFwiOiB7XG5cdFx0YTogXCJBc2lhL0Jhbmdrb2tcIixcblx0XHRjOiBbXG5cdFx0XHRcIktIXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBc2lhL1BvbnRpYW5ha1wiOiB7XG5cdFx0dTogNDIwLFxuXHRcdGM6IFtcblx0XHRcdFwiSURcIlxuXHRcdF1cblx0fSxcblx0XCJBc2lhL1B5b25neWFuZ1wiOiB7XG5cdFx0dTogNTQwLFxuXHRcdGM6IFtcblx0XHRcdFwiS1BcIlxuXHRcdF1cblx0fSxcblx0XCJBc2lhL1FhdGFyXCI6IHtcblx0XHR1OiAxODAsXG5cdFx0YzogW1xuXHRcdFx0XCJRQVwiLFxuXHRcdFx0XCJCSFwiXG5cdFx0XVxuXHR9LFxuXHRcIkFzaWEvUW9zdGFuYXlcIjoge1xuXHRcdHU6IDM2MCxcblx0XHRjOiBbXG5cdFx0XHRcIktaXCJcblx0XHRdXG5cdH0sXG5cdFwiQXNpYS9ReXp5bG9yZGFcIjoge1xuXHRcdHU6IDMwMCxcblx0XHRjOiBbXG5cdFx0XHRcIktaXCJcblx0XHRdXG5cdH0sXG5cdFwiQXNpYS9SYW5nb29uXCI6IHtcblx0XHRhOiBcIkFzaWEvWWFuZ29uXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFzaWEvUml5YWRoXCI6IHtcblx0XHR1OiAxODAsXG5cdFx0YzogW1xuXHRcdFx0XCJTQVwiLFxuXHRcdFx0XCJBUVwiLFxuXHRcdFx0XCJLV1wiLFxuXHRcdFx0XCJZRVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFzaWEvU2FpZ29uXCI6IHtcblx0XHRhOiBcIkFzaWEvSG9fQ2hpX01pbmhcIixcblx0XHRyOiAxXG5cdH0sXG5cdFwiQXNpYS9TYWtoYWxpblwiOiB7XG5cdFx0dTogNjYwLFxuXHRcdGM6IFtcblx0XHRcdFwiUlVcIlxuXHRcdF1cblx0fSxcblx0XCJBc2lhL1NhbWFya2FuZFwiOiB7XG5cdFx0dTogMzAwLFxuXHRcdGM6IFtcblx0XHRcdFwiVVpcIlxuXHRcdF1cblx0fSxcblx0XCJBc2lhL1Nlb3VsXCI6IHtcblx0XHR1OiA1NDAsXG5cdFx0YzogW1xuXHRcdFx0XCJLUlwiXG5cdFx0XVxuXHR9LFxuXHRcIkFzaWEvU2hhbmdoYWlcIjoge1xuXHRcdHU6IDQ4MCxcblx0XHRjOiBbXG5cdFx0XHRcIkNOXCJcblx0XHRdXG5cdH0sXG5cdFwiQXNpYS9TaW5nYXBvcmVcIjoge1xuXHRcdHU6IDQ4MCxcblx0XHRjOiBbXG5cdFx0XHRcIlNHXCIsXG5cdFx0XHRcIk1ZXCJcblx0XHRdXG5cdH0sXG5cdFwiQXNpYS9TcmVkbmVrb2x5bXNrXCI6IHtcblx0XHR1OiA2NjAsXG5cdFx0YzogW1xuXHRcdFx0XCJSVVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFzaWEvVGFpcGVpXCI6IHtcblx0XHR1OiA0ODAsXG5cdFx0YzogW1xuXHRcdFx0XCJUV1wiXG5cdFx0XVxuXHR9LFxuXHRcIkFzaWEvVGFzaGtlbnRcIjoge1xuXHRcdHU6IDMwMCxcblx0XHRjOiBbXG5cdFx0XHRcIlVaXCJcblx0XHRdXG5cdH0sXG5cdFwiQXNpYS9UYmlsaXNpXCI6IHtcblx0XHR1OiAyNDAsXG5cdFx0YzogW1xuXHRcdFx0XCJHRVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFzaWEvVGVocmFuXCI6IHtcblx0XHR1OiAyMTAsXG5cdFx0ZDogMjcwLFxuXHRcdGM6IFtcblx0XHRcdFwiSVJcIlxuXHRcdF1cblx0fSxcblx0XCJBc2lhL1RlbF9Bdml2XCI6IHtcblx0XHRhOiBcIkFzaWEvSmVydXNhbGVtXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFzaWEvVGhpbWJ1XCI6IHtcblx0XHRhOiBcIkFzaWEvVGhpbXBodVwiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBc2lhL1RoaW1waHVcIjoge1xuXHRcdHU6IDM2MCxcblx0XHRjOiBbXG5cdFx0XHRcIkJUXCJcblx0XHRdXG5cdH0sXG5cdFwiQXNpYS9Ub2t5b1wiOiB7XG5cdFx0dTogNTQwLFxuXHRcdGM6IFtcblx0XHRcdFwiSlBcIlxuXHRcdF1cblx0fSxcblx0XCJBc2lhL1RvbXNrXCI6IHtcblx0XHR1OiA0MjAsXG5cdFx0YzogW1xuXHRcdFx0XCJSVVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFzaWEvVWp1bmdfUGFuZGFuZ1wiOiB7XG5cdFx0YTogXCJBc2lhL01ha2Fzc2FyXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFzaWEvVWxhYW5iYWF0YXJcIjoge1xuXHRcdHU6IDQ4MCxcblx0XHRjOiBbXG5cdFx0XHRcIk1OXCJcblx0XHRdXG5cdH0sXG5cdFwiQXNpYS9VbGFuX0JhdG9yXCI6IHtcblx0XHRhOiBcIkFzaWEvVWxhYW5iYWF0YXJcIixcblx0XHRyOiAxXG5cdH0sXG5cdFwiQXNpYS9VcnVtcWlcIjoge1xuXHRcdHU6IDM2MCxcblx0XHRjOiBbXG5cdFx0XHRcIkNOXCJcblx0XHRdXG5cdH0sXG5cdFwiQXNpYS9Vc3QtTmVyYVwiOiB7XG5cdFx0dTogNjAwLFxuXHRcdGM6IFtcblx0XHRcdFwiUlVcIlxuXHRcdF1cblx0fSxcblx0XCJBc2lhL1ZpZW50aWFuZVwiOiB7XG5cdFx0YTogXCJBc2lhL0Jhbmdrb2tcIixcblx0XHRjOiBbXG5cdFx0XHRcIkxBXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBc2lhL1ZsYWRpdm9zdG9rXCI6IHtcblx0XHR1OiA2MDAsXG5cdFx0YzogW1xuXHRcdFx0XCJSVVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFzaWEvWWFrdXRza1wiOiB7XG5cdFx0dTogNTQwLFxuXHRcdGM6IFtcblx0XHRcdFwiUlVcIlxuXHRcdF1cblx0fSxcblx0XCJBc2lhL1lhbmdvblwiOiB7XG5cdFx0dTogMzkwLFxuXHRcdGM6IFtcblx0XHRcdFwiTU1cIlxuXHRcdF1cblx0fSxcblx0XCJBc2lhL1lla2F0ZXJpbmJ1cmdcIjoge1xuXHRcdHU6IDMwMCxcblx0XHRjOiBbXG5cdFx0XHRcIlJVXCJcblx0XHRdXG5cdH0sXG5cdFwiQXNpYS9ZZXJldmFuXCI6IHtcblx0XHR1OiAyNDAsXG5cdFx0YzogW1xuXHRcdFx0XCJBTVwiXG5cdFx0XVxuXHR9LFxuXHRcIkF0bGFudGljL0F6b3Jlc1wiOiB7XG5cdFx0dTogLTYwLFxuXHRcdGQ6IDAsXG5cdFx0YzogW1xuXHRcdFx0XCJQVFwiXG5cdFx0XVxuXHR9LFxuXHRcIkF0bGFudGljL0Jlcm11ZGFcIjoge1xuXHRcdHU6IC0yNDAsXG5cdFx0ZDogLTE4MCxcblx0XHRjOiBbXG5cdFx0XHRcIkJNXCJcblx0XHRdXG5cdH0sXG5cdFwiQXRsYW50aWMvQ2FuYXJ5XCI6IHtcblx0XHR1OiAwLFxuXHRcdGQ6IDYwLFxuXHRcdGM6IFtcblx0XHRcdFwiRVNcIlxuXHRcdF1cblx0fSxcblx0XCJBdGxhbnRpYy9DYXBlX1ZlcmRlXCI6IHtcblx0XHR1OiAtNjAsXG5cdFx0YzogW1xuXHRcdFx0XCJDVlwiXG5cdFx0XVxuXHR9LFxuXHRcIkF0bGFudGljL0ZhZXJvZVwiOiB7XG5cdFx0YTogXCJBdGxhbnRpYy9GYXJvZVwiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBdGxhbnRpYy9GYXJvZVwiOiB7XG5cdFx0dTogMCxcblx0XHRkOiA2MCxcblx0XHRjOiBbXG5cdFx0XHRcIkZPXCJcblx0XHRdXG5cdH0sXG5cdFwiQXRsYW50aWMvSmFuX01heWVuXCI6IHtcblx0XHRhOiBcIkV1cm9wZS9Pc2xvXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJTSlwiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiQXRsYW50aWMvTWFkZWlyYVwiOiB7XG5cdFx0dTogMCxcblx0XHRkOiA2MCxcblx0XHRjOiBbXG5cdFx0XHRcIlBUXCJcblx0XHRdXG5cdH0sXG5cdFwiQXRsYW50aWMvUmV5a2phdmlrXCI6IHtcblx0XHR1OiAwLFxuXHRcdGM6IFtcblx0XHRcdFwiSVNcIlxuXHRcdF1cblx0fSxcblx0XCJBdGxhbnRpYy9Tb3V0aF9HZW9yZ2lhXCI6IHtcblx0XHR1OiAtMTIwLFxuXHRcdGM6IFtcblx0XHRcdFwiR1NcIlxuXHRcdF1cblx0fSxcblx0XCJBdGxhbnRpYy9TdF9IZWxlbmFcIjoge1xuXHRcdGE6IFwiQWZyaWNhL0FiaWRqYW5cIixcblx0XHRjOiBbXG5cdFx0XHRcIlNIXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBdGxhbnRpYy9TdGFubGV5XCI6IHtcblx0XHR1OiAtMTgwLFxuXHRcdGM6IFtcblx0XHRcdFwiRktcIlxuXHRcdF1cblx0fSxcblx0XCJBdXN0cmFsaWEvQUNUXCI6IHtcblx0XHRhOiBcIkF1c3RyYWxpYS9TeWRuZXlcIixcblx0XHRyOiAxXG5cdH0sXG5cdFwiQXVzdHJhbGlhL0FkZWxhaWRlXCI6IHtcblx0XHR1OiA1NzAsXG5cdFx0ZDogNjMwLFxuXHRcdGM6IFtcblx0XHRcdFwiQVVcIlxuXHRcdF1cblx0fSxcblx0XCJBdXN0cmFsaWEvQnJpc2JhbmVcIjoge1xuXHRcdHU6IDYwMCxcblx0XHRjOiBbXG5cdFx0XHRcIkFVXCJcblx0XHRdXG5cdH0sXG5cdFwiQXVzdHJhbGlhL0Jyb2tlbl9IaWxsXCI6IHtcblx0XHR1OiA1NzAsXG5cdFx0ZDogNjMwLFxuXHRcdGM6IFtcblx0XHRcdFwiQVVcIlxuXHRcdF1cblx0fSxcblx0XCJBdXN0cmFsaWEvQ2FuYmVycmFcIjoge1xuXHRcdGE6IFwiQXVzdHJhbGlhL1N5ZG5leVwiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBdXN0cmFsaWEvQ3VycmllXCI6IHtcblx0XHRhOiBcIkF1c3RyYWxpYS9Ib2JhcnRcIixcblx0XHRyOiAxXG5cdH0sXG5cdFwiQXVzdHJhbGlhL0RhcndpblwiOiB7XG5cdFx0dTogNTcwLFxuXHRcdGM6IFtcblx0XHRcdFwiQVVcIlxuXHRcdF1cblx0fSxcblx0XCJBdXN0cmFsaWEvRXVjbGFcIjoge1xuXHRcdHU6IDUyNSxcblx0XHRjOiBbXG5cdFx0XHRcIkFVXCJcblx0XHRdXG5cdH0sXG5cdFwiQXVzdHJhbGlhL0hvYmFydFwiOiB7XG5cdFx0dTogNjAwLFxuXHRcdGQ6IDY2MCxcblx0XHRjOiBbXG5cdFx0XHRcIkFVXCJcblx0XHRdXG5cdH0sXG5cdFwiQXVzdHJhbGlhL0xISVwiOiB7XG5cdFx0YTogXCJBdXN0cmFsaWEvTG9yZF9Ib3dlXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIkF1c3RyYWxpYS9MaW5kZW1hblwiOiB7XG5cdFx0dTogNjAwLFxuXHRcdGM6IFtcblx0XHRcdFwiQVVcIlxuXHRcdF1cblx0fSxcblx0XCJBdXN0cmFsaWEvTG9yZF9Ib3dlXCI6IHtcblx0XHR1OiA2MzAsXG5cdFx0ZDogNjYwLFxuXHRcdGM6IFtcblx0XHRcdFwiQVVcIlxuXHRcdF1cblx0fSxcblx0XCJBdXN0cmFsaWEvTWVsYm91cm5lXCI6IHtcblx0XHR1OiA2MDAsXG5cdFx0ZDogNjYwLFxuXHRcdGM6IFtcblx0XHRcdFwiQVVcIlxuXHRcdF1cblx0fSxcblx0XCJBdXN0cmFsaWEvTlNXXCI6IHtcblx0XHRhOiBcIkF1c3RyYWxpYS9TeWRuZXlcIixcblx0XHRyOiAxXG5cdH0sXG5cdFwiQXVzdHJhbGlhL05vcnRoXCI6IHtcblx0XHRhOiBcIkF1c3RyYWxpYS9EYXJ3aW5cIixcblx0XHRyOiAxXG5cdH0sXG5cdFwiQXVzdHJhbGlhL1BlcnRoXCI6IHtcblx0XHR1OiA0ODAsXG5cdFx0YzogW1xuXHRcdFx0XCJBVVwiXG5cdFx0XVxuXHR9LFxuXHRcIkF1c3RyYWxpYS9RdWVlbnNsYW5kXCI6IHtcblx0XHRhOiBcIkF1c3RyYWxpYS9CcmlzYmFuZVwiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBdXN0cmFsaWEvU291dGhcIjoge1xuXHRcdGE6IFwiQXVzdHJhbGlhL0FkZWxhaWRlXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIkF1c3RyYWxpYS9TeWRuZXlcIjoge1xuXHRcdHU6IDYwMCxcblx0XHRkOiA2NjAsXG5cdFx0YzogW1xuXHRcdFx0XCJBVVwiXG5cdFx0XVxuXHR9LFxuXHRcIkF1c3RyYWxpYS9UYXNtYW5pYVwiOiB7XG5cdFx0YTogXCJBdXN0cmFsaWEvSG9iYXJ0XCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIkF1c3RyYWxpYS9WaWN0b3JpYVwiOiB7XG5cdFx0YTogXCJBdXN0cmFsaWEvTWVsYm91cm5lXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIkF1c3RyYWxpYS9XZXN0XCI6IHtcblx0XHRhOiBcIkF1c3RyYWxpYS9QZXJ0aFwiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBdXN0cmFsaWEvWWFuY293aW5uYVwiOiB7XG5cdFx0YTogXCJBdXN0cmFsaWEvQnJva2VuX0hpbGxcIixcblx0XHRyOiAxXG5cdH0sXG5cdFwiQnJhemlsL0FjcmVcIjoge1xuXHRcdGE6IFwiQW1lcmljYS9SaW9fQnJhbmNvXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIkJyYXppbC9EZU5vcm9uaGFcIjoge1xuXHRcdGE6IFwiQW1lcmljYS9Ob3JvbmhhXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIkJyYXppbC9FYXN0XCI6IHtcblx0XHRhOiBcIkFtZXJpY2EvU2FvX1BhdWxvXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIkJyYXppbC9XZXN0XCI6IHtcblx0XHRhOiBcIkFtZXJpY2EvTWFuYXVzXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRDRVQ6IHtcblx0XHR1OiA2MCxcblx0XHRkOiAxMjBcblx0fSxcblx0Q1NUNkNEVDoge1xuXHRcdHU6IC0zNjAsXG5cdFx0ZDogLTMwMFxuXHR9LFxuXHRcIkNhbmFkYS9BdGxhbnRpY1wiOiB7XG5cdFx0YTogXCJBbWVyaWNhL0hhbGlmYXhcIixcblx0XHRyOiAxXG5cdH0sXG5cdFwiQ2FuYWRhL0NlbnRyYWxcIjoge1xuXHRcdGE6IFwiQW1lcmljYS9XaW5uaXBlZ1wiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJDYW5hZGEvRWFzdGVyblwiOiB7XG5cdFx0YTogXCJBbWVyaWNhL1Rvcm9udG9cIixcblx0XHRjOiBbXG5cdFx0XHRcIkNBXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJDYW5hZGEvTW91bnRhaW5cIjoge1xuXHRcdGE6IFwiQW1lcmljYS9FZG1vbnRvblwiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJDYW5hZGEvTmV3Zm91bmRsYW5kXCI6IHtcblx0XHRhOiBcIkFtZXJpY2EvU3RfSm9obnNcIixcblx0XHRyOiAxXG5cdH0sXG5cdFwiQ2FuYWRhL1BhY2lmaWNcIjoge1xuXHRcdGE6IFwiQW1lcmljYS9WYW5jb3V2ZXJcIixcblx0XHRyOiAxXG5cdH0sXG5cdFwiQ2FuYWRhL1Nhc2thdGNoZXdhblwiOiB7XG5cdFx0YTogXCJBbWVyaWNhL1JlZ2luYVwiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJDYW5hZGEvWXVrb25cIjoge1xuXHRcdGE6IFwiQW1lcmljYS9XaGl0ZWhvcnNlXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIkNoaWxlL0NvbnRpbmVudGFsXCI6IHtcblx0XHRhOiBcIkFtZXJpY2EvU2FudGlhZ29cIixcblx0XHRyOiAxXG5cdH0sXG5cdFwiQ2hpbGUvRWFzdGVySXNsYW5kXCI6IHtcblx0XHRhOiBcIlBhY2lmaWMvRWFzdGVyXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRDdWJhOiB7XG5cdFx0YTogXCJBbWVyaWNhL0hhdmFuYVwiLFxuXHRcdHI6IDFcblx0fSxcblx0RUVUOiB7XG5cdFx0dTogMTIwLFxuXHRcdGQ6IDE4MFxuXHR9LFxuXHRFU1Q6IHtcblx0XHR1OiAtMzAwXG5cdH0sXG5cdEVTVDVFRFQ6IHtcblx0XHR1OiAtMzAwLFxuXHRcdGQ6IC0yNDBcblx0fSxcblx0RWd5cHQ6IHtcblx0XHRhOiBcIkFmcmljYS9DYWlyb1wiLFxuXHRcdHI6IDFcblx0fSxcblx0RWlyZToge1xuXHRcdGE6IFwiRXVyb3BlL0R1YmxpblwiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJFdGMvR01UXCI6IHtcblx0XHR1OiAwXG5cdH0sXG5cdFwiRXRjL0dNVCswXCI6IHtcblx0XHRhOiBcIkV0Yy9HTVRcIixcblx0XHRyOiAxXG5cdH0sXG5cdFwiRXRjL0dNVCsxXCI6IHtcblx0XHR1OiAtNjBcblx0fSxcblx0XCJFdGMvR01UKzEwXCI6IHtcblx0XHR1OiAtNjAwXG5cdH0sXG5cdFwiRXRjL0dNVCsxMVwiOiB7XG5cdFx0dTogLTY2MFxuXHR9LFxuXHRcIkV0Yy9HTVQrMTJcIjoge1xuXHRcdHU6IC03MjBcblx0fSxcblx0XCJFdGMvR01UKzJcIjoge1xuXHRcdHU6IC0xMjBcblx0fSxcblx0XCJFdGMvR01UKzNcIjoge1xuXHRcdHU6IC0xODBcblx0fSxcblx0XCJFdGMvR01UKzRcIjoge1xuXHRcdHU6IC0yNDBcblx0fSxcblx0XCJFdGMvR01UKzVcIjoge1xuXHRcdHU6IC0zMDBcblx0fSxcblx0XCJFdGMvR01UKzZcIjoge1xuXHRcdHU6IC0zNjBcblx0fSxcblx0XCJFdGMvR01UKzdcIjoge1xuXHRcdHU6IC00MjBcblx0fSxcblx0XCJFdGMvR01UKzhcIjoge1xuXHRcdHU6IC00ODBcblx0fSxcblx0XCJFdGMvR01UKzlcIjoge1xuXHRcdHU6IC01NDBcblx0fSxcblx0XCJFdGMvR01ULTBcIjoge1xuXHRcdGE6IFwiRXRjL0dNVFwiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJFdGMvR01ULTFcIjoge1xuXHRcdHU6IDYwXG5cdH0sXG5cdFwiRXRjL0dNVC0xMFwiOiB7XG5cdFx0dTogNjAwXG5cdH0sXG5cdFwiRXRjL0dNVC0xMVwiOiB7XG5cdFx0dTogNjYwXG5cdH0sXG5cdFwiRXRjL0dNVC0xMlwiOiB7XG5cdFx0dTogNzIwXG5cdH0sXG5cdFwiRXRjL0dNVC0xM1wiOiB7XG5cdFx0dTogNzgwXG5cdH0sXG5cdFwiRXRjL0dNVC0xNFwiOiB7XG5cdFx0dTogODQwXG5cdH0sXG5cdFwiRXRjL0dNVC0yXCI6IHtcblx0XHR1OiAxMjBcblx0fSxcblx0XCJFdGMvR01ULTNcIjoge1xuXHRcdHU6IDE4MFxuXHR9LFxuXHRcIkV0Yy9HTVQtNFwiOiB7XG5cdFx0dTogMjQwXG5cdH0sXG5cdFwiRXRjL0dNVC01XCI6IHtcblx0XHR1OiAzMDBcblx0fSxcblx0XCJFdGMvR01ULTZcIjoge1xuXHRcdHU6IDM2MFxuXHR9LFxuXHRcIkV0Yy9HTVQtN1wiOiB7XG5cdFx0dTogNDIwXG5cdH0sXG5cdFwiRXRjL0dNVC04XCI6IHtcblx0XHR1OiA0ODBcblx0fSxcblx0XCJFdGMvR01ULTlcIjoge1xuXHRcdHU6IDU0MFxuXHR9LFxuXHRcIkV0Yy9HTVQwXCI6IHtcblx0XHRhOiBcIkV0Yy9HTVRcIixcblx0XHRyOiAxXG5cdH0sXG5cdFwiRXRjL0dyZWVud2ljaFwiOiB7XG5cdFx0YTogXCJFdGMvR01UXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIkV0Yy9VQ1RcIjoge1xuXHRcdGE6IFwiRXRjL1VUQ1wiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJFdGMvVVRDXCI6IHtcblx0XHR1OiAwXG5cdH0sXG5cdFwiRXRjL1VuaXZlcnNhbFwiOiB7XG5cdFx0YTogXCJFdGMvVVRDXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIkV0Yy9adWx1XCI6IHtcblx0XHRhOiBcIkV0Yy9VVENcIixcblx0XHRyOiAxXG5cdH0sXG5cdFwiRXVyb3BlL0Ftc3RlcmRhbVwiOiB7XG5cdFx0dTogNjAsXG5cdFx0ZDogMTIwLFxuXHRcdGM6IFtcblx0XHRcdFwiTkxcIlxuXHRcdF1cblx0fSxcblx0XCJFdXJvcGUvQW5kb3JyYVwiOiB7XG5cdFx0dTogNjAsXG5cdFx0ZDogMTIwLFxuXHRcdGM6IFtcblx0XHRcdFwiQURcIlxuXHRcdF1cblx0fSxcblx0XCJFdXJvcGUvQXN0cmFraGFuXCI6IHtcblx0XHR1OiAyNDAsXG5cdFx0YzogW1xuXHRcdFx0XCJSVVwiXG5cdFx0XVxuXHR9LFxuXHRcIkV1cm9wZS9BdGhlbnNcIjoge1xuXHRcdHU6IDEyMCxcblx0XHRkOiAxODAsXG5cdFx0YzogW1xuXHRcdFx0XCJHUlwiXG5cdFx0XVxuXHR9LFxuXHRcIkV1cm9wZS9CZWxmYXN0XCI6IHtcblx0XHRhOiBcIkV1cm9wZS9Mb25kb25cIixcblx0XHRjOiBbXG5cdFx0XHRcIkdCXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJFdXJvcGUvQmVsZ3JhZGVcIjoge1xuXHRcdHU6IDYwLFxuXHRcdGQ6IDEyMCxcblx0XHRjOiBbXG5cdFx0XHRcIlJTXCIsXG5cdFx0XHRcIkJBXCIsXG5cdFx0XHRcIkhSXCIsXG5cdFx0XHRcIk1FXCIsXG5cdFx0XHRcIk1LXCIsXG5cdFx0XHRcIlNJXCJcblx0XHRdXG5cdH0sXG5cdFwiRXVyb3BlL0JlcmxpblwiOiB7XG5cdFx0dTogNjAsXG5cdFx0ZDogMTIwLFxuXHRcdGM6IFtcblx0XHRcdFwiREVcIlxuXHRcdF1cblx0fSxcblx0XCJFdXJvcGUvQnJhdGlzbGF2YVwiOiB7XG5cdFx0YTogXCJFdXJvcGUvUHJhZ3VlXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJTS1wiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiRXVyb3BlL0JydXNzZWxzXCI6IHtcblx0XHR1OiA2MCxcblx0XHRkOiAxMjAsXG5cdFx0YzogW1xuXHRcdFx0XCJCRVwiXG5cdFx0XVxuXHR9LFxuXHRcIkV1cm9wZS9CdWNoYXJlc3RcIjoge1xuXHRcdHU6IDEyMCxcblx0XHRkOiAxODAsXG5cdFx0YzogW1xuXHRcdFx0XCJST1wiXG5cdFx0XVxuXHR9LFxuXHRcIkV1cm9wZS9CdWRhcGVzdFwiOiB7XG5cdFx0dTogNjAsXG5cdFx0ZDogMTIwLFxuXHRcdGM6IFtcblx0XHRcdFwiSFVcIlxuXHRcdF1cblx0fSxcblx0XCJFdXJvcGUvQnVzaW5nZW5cIjoge1xuXHRcdGE6IFwiRXVyb3BlL1p1cmljaFwiLFxuXHRcdGM6IFtcblx0XHRcdFwiREVcIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkV1cm9wZS9DaGlzaW5hdVwiOiB7XG5cdFx0dTogMTIwLFxuXHRcdGQ6IDE4MCxcblx0XHRjOiBbXG5cdFx0XHRcIk1EXCJcblx0XHRdXG5cdH0sXG5cdFwiRXVyb3BlL0NvcGVuaGFnZW5cIjoge1xuXHRcdHU6IDYwLFxuXHRcdGQ6IDEyMCxcblx0XHRjOiBbXG5cdFx0XHRcIkRLXCJcblx0XHRdXG5cdH0sXG5cdFwiRXVyb3BlL0R1YmxpblwiOiB7XG5cdFx0dTogNjAsXG5cdFx0ZDogMCxcblx0XHRjOiBbXG5cdFx0XHRcIklFXCJcblx0XHRdXG5cdH0sXG5cdFwiRXVyb3BlL0dpYnJhbHRhclwiOiB7XG5cdFx0dTogNjAsXG5cdFx0ZDogMTIwLFxuXHRcdGM6IFtcblx0XHRcdFwiR0lcIlxuXHRcdF1cblx0fSxcblx0XCJFdXJvcGUvR3Vlcm5zZXlcIjoge1xuXHRcdGE6IFwiRXVyb3BlL0xvbmRvblwiLFxuXHRcdGM6IFtcblx0XHRcdFwiR0dcIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkV1cm9wZS9IZWxzaW5raVwiOiB7XG5cdFx0dTogMTIwLFxuXHRcdGQ6IDE4MCxcblx0XHRjOiBbXG5cdFx0XHRcIkZJXCIsXG5cdFx0XHRcIkFYXCJcblx0XHRdXG5cdH0sXG5cdFwiRXVyb3BlL0lzbGVfb2ZfTWFuXCI6IHtcblx0XHRhOiBcIkV1cm9wZS9Mb25kb25cIixcblx0XHRjOiBbXG5cdFx0XHRcIklNXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJFdXJvcGUvSXN0YW5idWxcIjoge1xuXHRcdHU6IDE4MCxcblx0XHRjOiBbXG5cdFx0XHRcIlRSXCJcblx0XHRdXG5cdH0sXG5cdFwiRXVyb3BlL0plcnNleVwiOiB7XG5cdFx0YTogXCJFdXJvcGUvTG9uZG9uXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJKRVwiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiRXVyb3BlL0thbGluaW5ncmFkXCI6IHtcblx0XHR1OiAxMjAsXG5cdFx0YzogW1xuXHRcdFx0XCJSVVwiXG5cdFx0XVxuXHR9LFxuXHRcIkV1cm9wZS9LaWV2XCI6IHtcblx0XHR1OiAxMjAsXG5cdFx0ZDogMTgwLFxuXHRcdGM6IFtcblx0XHRcdFwiVUFcIlxuXHRcdF1cblx0fSxcblx0XCJFdXJvcGUvS2lyb3ZcIjoge1xuXHRcdHU6IDE4MCxcblx0XHRjOiBbXG5cdFx0XHRcIlJVXCJcblx0XHRdXG5cdH0sXG5cdFwiRXVyb3BlL0xpc2JvblwiOiB7XG5cdFx0dTogMCxcblx0XHRkOiA2MCxcblx0XHRjOiBbXG5cdFx0XHRcIlBUXCJcblx0XHRdXG5cdH0sXG5cdFwiRXVyb3BlL0xqdWJsamFuYVwiOiB7XG5cdFx0YTogXCJFdXJvcGUvQmVsZ3JhZGVcIixcblx0XHRjOiBbXG5cdFx0XHRcIlNJXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJFdXJvcGUvTG9uZG9uXCI6IHtcblx0XHR1OiAwLFxuXHRcdGQ6IDYwLFxuXHRcdGM6IFtcblx0XHRcdFwiR0JcIixcblx0XHRcdFwiR0dcIixcblx0XHRcdFwiSU1cIixcblx0XHRcdFwiSkVcIlxuXHRcdF1cblx0fSxcblx0XCJFdXJvcGUvTHV4ZW1ib3VyZ1wiOiB7XG5cdFx0dTogNjAsXG5cdFx0ZDogMTIwLFxuXHRcdGM6IFtcblx0XHRcdFwiTFVcIlxuXHRcdF1cblx0fSxcblx0XCJFdXJvcGUvTWFkcmlkXCI6IHtcblx0XHR1OiA2MCxcblx0XHRkOiAxMjAsXG5cdFx0YzogW1xuXHRcdFx0XCJFU1wiXG5cdFx0XVxuXHR9LFxuXHRcIkV1cm9wZS9NYWx0YVwiOiB7XG5cdFx0dTogNjAsXG5cdFx0ZDogMTIwLFxuXHRcdGM6IFtcblx0XHRcdFwiTVRcIlxuXHRcdF1cblx0fSxcblx0XCJFdXJvcGUvTWFyaWVoYW1uXCI6IHtcblx0XHRhOiBcIkV1cm9wZS9IZWxzaW5raVwiLFxuXHRcdGM6IFtcblx0XHRcdFwiQVhcIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkV1cm9wZS9NaW5za1wiOiB7XG5cdFx0dTogMTgwLFxuXHRcdGM6IFtcblx0XHRcdFwiQllcIlxuXHRcdF1cblx0fSxcblx0XCJFdXJvcGUvTW9uYWNvXCI6IHtcblx0XHR1OiA2MCxcblx0XHRkOiAxMjAsXG5cdFx0YzogW1xuXHRcdFx0XCJNQ1wiXG5cdFx0XVxuXHR9LFxuXHRcIkV1cm9wZS9Nb3Njb3dcIjoge1xuXHRcdHU6IDE4MCxcblx0XHRjOiBbXG5cdFx0XHRcIlJVXCJcblx0XHRdXG5cdH0sXG5cdFwiRXVyb3BlL05pY29zaWFcIjoge1xuXHRcdGE6IFwiQXNpYS9OaWNvc2lhXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIkV1cm9wZS9Pc2xvXCI6IHtcblx0XHR1OiA2MCxcblx0XHRkOiAxMjAsXG5cdFx0YzogW1xuXHRcdFx0XCJOT1wiLFxuXHRcdFx0XCJTSlwiLFxuXHRcdFx0XCJCVlwiXG5cdFx0XVxuXHR9LFxuXHRcIkV1cm9wZS9QYXJpc1wiOiB7XG5cdFx0dTogNjAsXG5cdFx0ZDogMTIwLFxuXHRcdGM6IFtcblx0XHRcdFwiRlJcIlxuXHRcdF1cblx0fSxcblx0XCJFdXJvcGUvUG9kZ29yaWNhXCI6IHtcblx0XHRhOiBcIkV1cm9wZS9CZWxncmFkZVwiLFxuXHRcdGM6IFtcblx0XHRcdFwiTUVcIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkV1cm9wZS9QcmFndWVcIjoge1xuXHRcdHU6IDYwLFxuXHRcdGQ6IDEyMCxcblx0XHRjOiBbXG5cdFx0XHRcIkNaXCIsXG5cdFx0XHRcIlNLXCJcblx0XHRdXG5cdH0sXG5cdFwiRXVyb3BlL1JpZ2FcIjoge1xuXHRcdHU6IDEyMCxcblx0XHRkOiAxODAsXG5cdFx0YzogW1xuXHRcdFx0XCJMVlwiXG5cdFx0XVxuXHR9LFxuXHRcIkV1cm9wZS9Sb21lXCI6IHtcblx0XHR1OiA2MCxcblx0XHRkOiAxMjAsXG5cdFx0YzogW1xuXHRcdFx0XCJJVFwiLFxuXHRcdFx0XCJTTVwiLFxuXHRcdFx0XCJWQVwiXG5cdFx0XVxuXHR9LFxuXHRcIkV1cm9wZS9TYW1hcmFcIjoge1xuXHRcdHU6IDI0MCxcblx0XHRjOiBbXG5cdFx0XHRcIlJVXCJcblx0XHRdXG5cdH0sXG5cdFwiRXVyb3BlL1Nhbl9NYXJpbm9cIjoge1xuXHRcdGE6IFwiRXVyb3BlL1JvbWVcIixcblx0XHRjOiBbXG5cdFx0XHRcIlNNXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJFdXJvcGUvU2FyYWpldm9cIjoge1xuXHRcdGE6IFwiRXVyb3BlL0JlbGdyYWRlXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJCQVwiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiRXVyb3BlL1NhcmF0b3ZcIjoge1xuXHRcdHU6IDI0MCxcblx0XHRjOiBbXG5cdFx0XHRcIlJVXCJcblx0XHRdXG5cdH0sXG5cdFwiRXVyb3BlL1NpbWZlcm9wb2xcIjoge1xuXHRcdHU6IDE4MCxcblx0XHRjOiBbXG5cdFx0XHRcIlJVXCIsXG5cdFx0XHRcIlVBXCJcblx0XHRdXG5cdH0sXG5cdFwiRXVyb3BlL1Nrb3BqZVwiOiB7XG5cdFx0YTogXCJFdXJvcGUvQmVsZ3JhZGVcIixcblx0XHRjOiBbXG5cdFx0XHRcIk1LXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJFdXJvcGUvU29maWFcIjoge1xuXHRcdHU6IDEyMCxcblx0XHRkOiAxODAsXG5cdFx0YzogW1xuXHRcdFx0XCJCR1wiXG5cdFx0XVxuXHR9LFxuXHRcIkV1cm9wZS9TdG9ja2hvbG1cIjoge1xuXHRcdHU6IDYwLFxuXHRcdGQ6IDEyMCxcblx0XHRjOiBbXG5cdFx0XHRcIlNFXCJcblx0XHRdXG5cdH0sXG5cdFwiRXVyb3BlL1RhbGxpbm5cIjoge1xuXHRcdHU6IDEyMCxcblx0XHRkOiAxODAsXG5cdFx0YzogW1xuXHRcdFx0XCJFRVwiXG5cdFx0XVxuXHR9LFxuXHRcIkV1cm9wZS9UaXJhbmVcIjoge1xuXHRcdHU6IDYwLFxuXHRcdGQ6IDEyMCxcblx0XHRjOiBbXG5cdFx0XHRcIkFMXCJcblx0XHRdXG5cdH0sXG5cdFwiRXVyb3BlL1RpcmFzcG9sXCI6IHtcblx0XHRhOiBcIkV1cm9wZS9DaGlzaW5hdVwiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJFdXJvcGUvVWx5YW5vdnNrXCI6IHtcblx0XHR1OiAyNDAsXG5cdFx0YzogW1xuXHRcdFx0XCJSVVwiXG5cdFx0XVxuXHR9LFxuXHRcIkV1cm9wZS9Vemhnb3JvZFwiOiB7XG5cdFx0dTogMTIwLFxuXHRcdGQ6IDE4MCxcblx0XHRjOiBbXG5cdFx0XHRcIlVBXCJcblx0XHRdXG5cdH0sXG5cdFwiRXVyb3BlL1ZhZHV6XCI6IHtcblx0XHRhOiBcIkV1cm9wZS9adXJpY2hcIixcblx0XHRjOiBbXG5cdFx0XHRcIkxJXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJFdXJvcGUvVmF0aWNhblwiOiB7XG5cdFx0YTogXCJFdXJvcGUvUm9tZVwiLFxuXHRcdGM6IFtcblx0XHRcdFwiVkFcIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkV1cm9wZS9WaWVubmFcIjoge1xuXHRcdHU6IDYwLFxuXHRcdGQ6IDEyMCxcblx0XHRjOiBbXG5cdFx0XHRcIkFUXCJcblx0XHRdXG5cdH0sXG5cdFwiRXVyb3BlL1ZpbG5pdXNcIjoge1xuXHRcdHU6IDEyMCxcblx0XHRkOiAxODAsXG5cdFx0YzogW1xuXHRcdFx0XCJMVFwiXG5cdFx0XVxuXHR9LFxuXHRcIkV1cm9wZS9Wb2xnb2dyYWRcIjoge1xuXHRcdHU6IDE4MCxcblx0XHRjOiBbXG5cdFx0XHRcIlJVXCJcblx0XHRdXG5cdH0sXG5cdFwiRXVyb3BlL1dhcnNhd1wiOiB7XG5cdFx0dTogNjAsXG5cdFx0ZDogMTIwLFxuXHRcdGM6IFtcblx0XHRcdFwiUExcIlxuXHRcdF1cblx0fSxcblx0XCJFdXJvcGUvWmFncmViXCI6IHtcblx0XHRhOiBcIkV1cm9wZS9CZWxncmFkZVwiLFxuXHRcdGM6IFtcblx0XHRcdFwiSFJcIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkV1cm9wZS9aYXBvcm96aHllXCI6IHtcblx0XHR1OiAxMjAsXG5cdFx0ZDogMTgwLFxuXHRcdGM6IFtcblx0XHRcdFwiVUFcIlxuXHRcdF1cblx0fSxcblx0XCJFdXJvcGUvWnVyaWNoXCI6IHtcblx0XHR1OiA2MCxcblx0XHRkOiAxMjAsXG5cdFx0YzogW1xuXHRcdFx0XCJDSFwiLFxuXHRcdFx0XCJERVwiLFxuXHRcdFx0XCJMSVwiXG5cdFx0XVxuXHR9LFxuXHRGYWN0b3J5OiB7XG5cdFx0dTogMFxuXHR9LFxuXHRHQjoge1xuXHRcdGE6IFwiRXVyb3BlL0xvbmRvblwiLFxuXHRcdGM6IFtcblx0XHRcdFwiR0JcIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkdCLUVpcmVcIjoge1xuXHRcdGE6IFwiRXVyb3BlL0xvbmRvblwiLFxuXHRcdGM6IFtcblx0XHRcdFwiR0JcIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRHTVQ6IHtcblx0XHRhOiBcIkV0Yy9HTVRcIixcblx0XHRyOiAxXG5cdH0sXG5cdFwiR01UKzBcIjoge1xuXHRcdGE6IFwiRXRjL0dNVFwiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJHTVQtMFwiOiB7XG5cdFx0YTogXCJFdGMvR01UXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRHTVQwOiB7XG5cdFx0YTogXCJFdGMvR01UXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRHcmVlbndpY2g6IHtcblx0XHRhOiBcIkV0Yy9HTVRcIixcblx0XHRyOiAxXG5cdH0sXG5cdEhTVDoge1xuXHRcdHU6IC02MDBcblx0fSxcblx0SG9uZ2tvbmc6IHtcblx0XHRhOiBcIkFzaWEvSG9uZ19Lb25nXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRJY2VsYW5kOiB7XG5cdFx0YTogXCJBdGxhbnRpYy9SZXlramF2aWtcIixcblx0XHRyOiAxXG5cdH0sXG5cdFwiSW5kaWFuL0FudGFuYW5hcml2b1wiOiB7XG5cdFx0YTogXCJBZnJpY2EvTmFpcm9iaVwiLFxuXHRcdGM6IFtcblx0XHRcdFwiTUdcIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkluZGlhbi9DaGFnb3NcIjoge1xuXHRcdHU6IDM2MCxcblx0XHRjOiBbXG5cdFx0XHRcIklPXCJcblx0XHRdXG5cdH0sXG5cdFwiSW5kaWFuL0NocmlzdG1hc1wiOiB7XG5cdFx0dTogNDIwLFxuXHRcdGM6IFtcblx0XHRcdFwiQ1hcIlxuXHRcdF1cblx0fSxcblx0XCJJbmRpYW4vQ29jb3NcIjoge1xuXHRcdHU6IDM5MCxcblx0XHRjOiBbXG5cdFx0XHRcIkNDXCJcblx0XHRdXG5cdH0sXG5cdFwiSW5kaWFuL0NvbW9yb1wiOiB7XG5cdFx0YTogXCJBZnJpY2EvTmFpcm9iaVwiLFxuXHRcdGM6IFtcblx0XHRcdFwiS01cIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkluZGlhbi9LZXJndWVsZW5cIjoge1xuXHRcdHU6IDMwMCxcblx0XHRjOiBbXG5cdFx0XHRcIlRGXCIsXG5cdFx0XHRcIkhNXCJcblx0XHRdXG5cdH0sXG5cdFwiSW5kaWFuL01haGVcIjoge1xuXHRcdHU6IDI0MCxcblx0XHRjOiBbXG5cdFx0XHRcIlNDXCJcblx0XHRdXG5cdH0sXG5cdFwiSW5kaWFuL01hbGRpdmVzXCI6IHtcblx0XHR1OiAzMDAsXG5cdFx0YzogW1xuXHRcdFx0XCJNVlwiXG5cdFx0XVxuXHR9LFxuXHRcIkluZGlhbi9NYXVyaXRpdXNcIjoge1xuXHRcdHU6IDI0MCxcblx0XHRjOiBbXG5cdFx0XHRcIk1VXCJcblx0XHRdXG5cdH0sXG5cdFwiSW5kaWFuL01heW90dGVcIjoge1xuXHRcdGE6IFwiQWZyaWNhL05haXJvYmlcIixcblx0XHRjOiBbXG5cdFx0XHRcIllUXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJJbmRpYW4vUmV1bmlvblwiOiB7XG5cdFx0dTogMjQwLFxuXHRcdGM6IFtcblx0XHRcdFwiUkVcIixcblx0XHRcdFwiVEZcIlxuXHRcdF1cblx0fSxcblx0SXJhbjoge1xuXHRcdGE6IFwiQXNpYS9UZWhyYW5cIixcblx0XHRyOiAxXG5cdH0sXG5cdElzcmFlbDoge1xuXHRcdGE6IFwiQXNpYS9KZXJ1c2FsZW1cIixcblx0XHRyOiAxXG5cdH0sXG5cdEphbWFpY2E6IHtcblx0XHRhOiBcIkFtZXJpY2EvSmFtYWljYVwiLFxuXHRcdHI6IDFcblx0fSxcblx0SmFwYW46IHtcblx0XHRhOiBcIkFzaWEvVG9reW9cIixcblx0XHRyOiAxXG5cdH0sXG5cdEt3YWphbGVpbjoge1xuXHRcdGE6IFwiUGFjaWZpYy9Ld2FqYWxlaW5cIixcblx0XHRyOiAxXG5cdH0sXG5cdExpYnlhOiB7XG5cdFx0YTogXCJBZnJpY2EvVHJpcG9saVwiLFxuXHRcdHI6IDFcblx0fSxcblx0TUVUOiB7XG5cdFx0dTogNjAsXG5cdFx0ZDogMTIwXG5cdH0sXG5cdE1TVDoge1xuXHRcdHU6IC00MjBcblx0fSxcblx0TVNUN01EVDoge1xuXHRcdHU6IC00MjAsXG5cdFx0ZDogLTM2MFxuXHR9LFxuXHRcIk1leGljby9CYWphTm9ydGVcIjoge1xuXHRcdGE6IFwiQW1lcmljYS9UaWp1YW5hXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIk1leGljby9CYWphU3VyXCI6IHtcblx0XHRhOiBcIkFtZXJpY2EvTWF6YXRsYW5cIixcblx0XHRyOiAxXG5cdH0sXG5cdFwiTWV4aWNvL0dlbmVyYWxcIjoge1xuXHRcdGE6IFwiQW1lcmljYS9NZXhpY29fQ2l0eVwiLFxuXHRcdHI6IDFcblx0fSxcblx0Tlo6IHtcblx0XHRhOiBcIlBhY2lmaWMvQXVja2xhbmRcIixcblx0XHRjOiBbXG5cdFx0XHRcIk5aXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJOWi1DSEFUXCI6IHtcblx0XHRhOiBcIlBhY2lmaWMvQ2hhdGhhbVwiLFxuXHRcdHI6IDFcblx0fSxcblx0TmF2YWpvOiB7XG5cdFx0YTogXCJBbWVyaWNhL0RlbnZlclwiLFxuXHRcdHI6IDFcblx0fSxcblx0UFJDOiB7XG5cdFx0YTogXCJBc2lhL1NoYW5naGFpXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRQU1Q4UERUOiB7XG5cdFx0dTogLTQ4MCxcblx0XHRkOiAtNDIwXG5cdH0sXG5cdFwiUGFjaWZpYy9BcGlhXCI6IHtcblx0XHR1OiA3ODAsXG5cdFx0YzogW1xuXHRcdFx0XCJXU1wiXG5cdFx0XVxuXHR9LFxuXHRcIlBhY2lmaWMvQXVja2xhbmRcIjoge1xuXHRcdHU6IDcyMCxcblx0XHRkOiA3ODAsXG5cdFx0YzogW1xuXHRcdFx0XCJOWlwiLFxuXHRcdFx0XCJBUVwiXG5cdFx0XVxuXHR9LFxuXHRcIlBhY2lmaWMvQm91Z2FpbnZpbGxlXCI6IHtcblx0XHR1OiA2NjAsXG5cdFx0YzogW1xuXHRcdFx0XCJQR1wiXG5cdFx0XVxuXHR9LFxuXHRcIlBhY2lmaWMvQ2hhdGhhbVwiOiB7XG5cdFx0dTogNzY1LFxuXHRcdGQ6IDgyNSxcblx0XHRjOiBbXG5cdFx0XHRcIk5aXCJcblx0XHRdXG5cdH0sXG5cdFwiUGFjaWZpYy9DaHV1a1wiOiB7XG5cdFx0dTogNjAwLFxuXHRcdGM6IFtcblx0XHRcdFwiRk1cIlxuXHRcdF1cblx0fSxcblx0XCJQYWNpZmljL0Vhc3RlclwiOiB7XG5cdFx0dTogLTM2MCxcblx0XHRkOiAtMzAwLFxuXHRcdGM6IFtcblx0XHRcdFwiQ0xcIlxuXHRcdF1cblx0fSxcblx0XCJQYWNpZmljL0VmYXRlXCI6IHtcblx0XHR1OiA2NjAsXG5cdFx0YzogW1xuXHRcdFx0XCJWVVwiXG5cdFx0XVxuXHR9LFxuXHRcIlBhY2lmaWMvRW5kZXJidXJ5XCI6IHtcblx0XHRhOiBcIlBhY2lmaWMvS2FudG9uXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIlBhY2lmaWMvRmFrYW9mb1wiOiB7XG5cdFx0dTogNzgwLFxuXHRcdGM6IFtcblx0XHRcdFwiVEtcIlxuXHRcdF1cblx0fSxcblx0XCJQYWNpZmljL0ZpamlcIjoge1xuXHRcdHU6IDcyMCxcblx0XHRkOiA3ODAsXG5cdFx0YzogW1xuXHRcdFx0XCJGSlwiXG5cdFx0XVxuXHR9LFxuXHRcIlBhY2lmaWMvRnVuYWZ1dGlcIjoge1xuXHRcdHU6IDcyMCxcblx0XHRjOiBbXG5cdFx0XHRcIlRWXCJcblx0XHRdXG5cdH0sXG5cdFwiUGFjaWZpYy9HYWxhcGFnb3NcIjoge1xuXHRcdHU6IC0zNjAsXG5cdFx0YzogW1xuXHRcdFx0XCJFQ1wiXG5cdFx0XVxuXHR9LFxuXHRcIlBhY2lmaWMvR2FtYmllclwiOiB7XG5cdFx0dTogLTU0MCxcblx0XHRjOiBbXG5cdFx0XHRcIlBGXCJcblx0XHRdXG5cdH0sXG5cdFwiUGFjaWZpYy9HdWFkYWxjYW5hbFwiOiB7XG5cdFx0dTogNjYwLFxuXHRcdGM6IFtcblx0XHRcdFwiU0JcIlxuXHRcdF1cblx0fSxcblx0XCJQYWNpZmljL0d1YW1cIjoge1xuXHRcdHU6IDYwMCxcblx0XHRjOiBbXG5cdFx0XHRcIkdVXCIsXG5cdFx0XHRcIk1QXCJcblx0XHRdXG5cdH0sXG5cdFwiUGFjaWZpYy9Ib25vbHVsdVwiOiB7XG5cdFx0dTogLTYwMCxcblx0XHRjOiBbXG5cdFx0XHRcIlVTXCIsXG5cdFx0XHRcIlVNXCJcblx0XHRdXG5cdH0sXG5cdFwiUGFjaWZpYy9Kb2huc3RvblwiOiB7XG5cdFx0YTogXCJQYWNpZmljL0hvbm9sdWx1XCIsXG5cdFx0YzogW1xuXHRcdFx0XCJVTVwiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiUGFjaWZpYy9LYW50b25cIjoge1xuXHRcdHU6IDc4MCxcblx0XHRjOiBbXG5cdFx0XHRcIktJXCJcblx0XHRdXG5cdH0sXG5cdFwiUGFjaWZpYy9LaXJpdGltYXRpXCI6IHtcblx0XHR1OiA4NDAsXG5cdFx0YzogW1xuXHRcdFx0XCJLSVwiXG5cdFx0XVxuXHR9LFxuXHRcIlBhY2lmaWMvS29zcmFlXCI6IHtcblx0XHR1OiA2NjAsXG5cdFx0YzogW1xuXHRcdFx0XCJGTVwiXG5cdFx0XVxuXHR9LFxuXHRcIlBhY2lmaWMvS3dhamFsZWluXCI6IHtcblx0XHR1OiA3MjAsXG5cdFx0YzogW1xuXHRcdFx0XCJNSFwiXG5cdFx0XVxuXHR9LFxuXHRcIlBhY2lmaWMvTWFqdXJvXCI6IHtcblx0XHR1OiA3MjAsXG5cdFx0YzogW1xuXHRcdFx0XCJNSFwiXG5cdFx0XVxuXHR9LFxuXHRcIlBhY2lmaWMvTWFycXVlc2FzXCI6IHtcblx0XHR1OiAtNTEwLFxuXHRcdGM6IFtcblx0XHRcdFwiUEZcIlxuXHRcdF1cblx0fSxcblx0XCJQYWNpZmljL01pZHdheVwiOiB7XG5cdFx0YTogXCJQYWNpZmljL1BhZ29fUGFnb1wiLFxuXHRcdGM6IFtcblx0XHRcdFwiVU1cIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIlBhY2lmaWMvTmF1cnVcIjoge1xuXHRcdHU6IDcyMCxcblx0XHRjOiBbXG5cdFx0XHRcIk5SXCJcblx0XHRdXG5cdH0sXG5cdFwiUGFjaWZpYy9OaXVlXCI6IHtcblx0XHR1OiAtNjYwLFxuXHRcdGM6IFtcblx0XHRcdFwiTlVcIlxuXHRcdF1cblx0fSxcblx0XCJQYWNpZmljL05vcmZvbGtcIjoge1xuXHRcdHU6IDY2MCxcblx0XHRkOiA3MjAsXG5cdFx0YzogW1xuXHRcdFx0XCJORlwiXG5cdFx0XVxuXHR9LFxuXHRcIlBhY2lmaWMvTm91bWVhXCI6IHtcblx0XHR1OiA2NjAsXG5cdFx0YzogW1xuXHRcdFx0XCJOQ1wiXG5cdFx0XVxuXHR9LFxuXHRcIlBhY2lmaWMvUGFnb19QYWdvXCI6IHtcblx0XHR1OiAtNjYwLFxuXHRcdGM6IFtcblx0XHRcdFwiQVNcIixcblx0XHRcdFwiVU1cIlxuXHRcdF1cblx0fSxcblx0XCJQYWNpZmljL1BhbGF1XCI6IHtcblx0XHR1OiA1NDAsXG5cdFx0YzogW1xuXHRcdFx0XCJQV1wiXG5cdFx0XVxuXHR9LFxuXHRcIlBhY2lmaWMvUGl0Y2Fpcm5cIjoge1xuXHRcdHU6IC00ODAsXG5cdFx0YzogW1xuXHRcdFx0XCJQTlwiXG5cdFx0XVxuXHR9LFxuXHRcIlBhY2lmaWMvUG9obnBlaVwiOiB7XG5cdFx0dTogNjYwLFxuXHRcdGM6IFtcblx0XHRcdFwiRk1cIlxuXHRcdF1cblx0fSxcblx0XCJQYWNpZmljL1BvbmFwZVwiOiB7XG5cdFx0YTogXCJQYWNpZmljL1BvaG5wZWlcIixcblx0XHRyOiAxXG5cdH0sXG5cdFwiUGFjaWZpYy9Qb3J0X01vcmVzYnlcIjoge1xuXHRcdHU6IDYwMCxcblx0XHRjOiBbXG5cdFx0XHRcIlBHXCIsXG5cdFx0XHRcIkFRXCJcblx0XHRdXG5cdH0sXG5cdFwiUGFjaWZpYy9SYXJvdG9uZ2FcIjoge1xuXHRcdHU6IC02MDAsXG5cdFx0YzogW1xuXHRcdFx0XCJDS1wiXG5cdFx0XVxuXHR9LFxuXHRcIlBhY2lmaWMvU2FpcGFuXCI6IHtcblx0XHRhOiBcIlBhY2lmaWMvR3VhbVwiLFxuXHRcdGM6IFtcblx0XHRcdFwiTVBcIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIlBhY2lmaWMvU2Ftb2FcIjoge1xuXHRcdGE6IFwiUGFjaWZpYy9QYWdvX1BhZ29cIixcblx0XHRjOiBbXG5cdFx0XHRcIldTXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJQYWNpZmljL1RhaGl0aVwiOiB7XG5cdFx0dTogLTYwMCxcblx0XHRjOiBbXG5cdFx0XHRcIlBGXCJcblx0XHRdXG5cdH0sXG5cdFwiUGFjaWZpYy9UYXJhd2FcIjoge1xuXHRcdHU6IDcyMCxcblx0XHRjOiBbXG5cdFx0XHRcIktJXCJcblx0XHRdXG5cdH0sXG5cdFwiUGFjaWZpYy9Ub25nYXRhcHVcIjoge1xuXHRcdHU6IDc4MCxcblx0XHRjOiBbXG5cdFx0XHRcIlRPXCJcblx0XHRdXG5cdH0sXG5cdFwiUGFjaWZpYy9UcnVrXCI6IHtcblx0XHRhOiBcIlBhY2lmaWMvQ2h1dWtcIixcblx0XHRyOiAxXG5cdH0sXG5cdFwiUGFjaWZpYy9XYWtlXCI6IHtcblx0XHR1OiA3MjAsXG5cdFx0YzogW1xuXHRcdFx0XCJVTVwiXG5cdFx0XVxuXHR9LFxuXHRcIlBhY2lmaWMvV2FsbGlzXCI6IHtcblx0XHR1OiA3MjAsXG5cdFx0YzogW1xuXHRcdFx0XCJXRlwiXG5cdFx0XVxuXHR9LFxuXHRcIlBhY2lmaWMvWWFwXCI6IHtcblx0XHRhOiBcIlBhY2lmaWMvQ2h1dWtcIixcblx0XHRyOiAxXG5cdH0sXG5cdFBvbGFuZDoge1xuXHRcdGE6IFwiRXVyb3BlL1dhcnNhd1wiLFxuXHRcdHI6IDFcblx0fSxcblx0UG9ydHVnYWw6IHtcblx0XHRhOiBcIkV1cm9wZS9MaXNib25cIixcblx0XHRyOiAxXG5cdH0sXG5cdFJPQzoge1xuXHRcdGE6IFwiQXNpYS9UYWlwZWlcIixcblx0XHRyOiAxXG5cdH0sXG5cdFJPSzoge1xuXHRcdGE6IFwiQXNpYS9TZW91bFwiLFxuXHRcdHI6IDFcblx0fSxcblx0U2luZ2Fwb3JlOiB7XG5cdFx0YTogXCJBc2lhL1NpbmdhcG9yZVwiLFxuXHRcdGM6IFtcblx0XHRcdFwiU0dcIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRUdXJrZXk6IHtcblx0XHRhOiBcIkV1cm9wZS9Jc3RhbmJ1bFwiLFxuXHRcdHI6IDFcblx0fSxcblx0VUNUOiB7XG5cdFx0YTogXCJFdGMvVVRDXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIlVTL0FsYXNrYVwiOiB7XG5cdFx0YTogXCJBbWVyaWNhL0FuY2hvcmFnZVwiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJVUy9BbGV1dGlhblwiOiB7XG5cdFx0YTogXCJBbWVyaWNhL0FkYWtcIixcblx0XHRyOiAxXG5cdH0sXG5cdFwiVVMvQXJpem9uYVwiOiB7XG5cdFx0YTogXCJBbWVyaWNhL1Bob2VuaXhcIixcblx0XHRjOiBbXG5cdFx0XHRcIlVTXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJVUy9DZW50cmFsXCI6IHtcblx0XHRhOiBcIkFtZXJpY2EvQ2hpY2Fnb1wiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJVUy9FYXN0LUluZGlhbmFcIjoge1xuXHRcdGE6IFwiQW1lcmljYS9JbmRpYW5hL0luZGlhbmFwb2xpc1wiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJVUy9FYXN0ZXJuXCI6IHtcblx0XHRhOiBcIkFtZXJpY2EvTmV3X1lvcmtcIixcblx0XHRyOiAxXG5cdH0sXG5cdFwiVVMvSGF3YWlpXCI6IHtcblx0XHRhOiBcIlBhY2lmaWMvSG9ub2x1bHVcIixcblx0XHRjOiBbXG5cdFx0XHRcIlVTXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJVUy9JbmRpYW5hLVN0YXJrZVwiOiB7XG5cdFx0YTogXCJBbWVyaWNhL0luZGlhbmEvS25veFwiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJVUy9NaWNoaWdhblwiOiB7XG5cdFx0YTogXCJBbWVyaWNhL0RldHJvaXRcIixcblx0XHRyOiAxXG5cdH0sXG5cdFwiVVMvTW91bnRhaW5cIjoge1xuXHRcdGE6IFwiQW1lcmljYS9EZW52ZXJcIixcblx0XHRyOiAxXG5cdH0sXG5cdFwiVVMvUGFjaWZpY1wiOiB7XG5cdFx0YTogXCJBbWVyaWNhL0xvc19BbmdlbGVzXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIlVTL1NhbW9hXCI6IHtcblx0XHRhOiBcIlBhY2lmaWMvUGFnb19QYWdvXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJXU1wiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFVUQzoge1xuXHRcdGE6IFwiRXRjL1VUQ1wiLFxuXHRcdHI6IDFcblx0fSxcblx0VW5pdmVyc2FsOiB7XG5cdFx0YTogXCJFdGMvVVRDXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIlctU1VcIjoge1xuXHRcdGE6IFwiRXVyb3BlL01vc2Nvd1wiLFxuXHRcdHI6IDFcblx0fSxcblx0V0VUOiB7XG5cdFx0dTogMCxcblx0XHRkOiA2MFxuXHR9LFxuXHRadWx1OiB7XG5cdFx0YTogXCJFdGMvVVRDXCIsXG5cdFx0cjogMVxuXHR9XG59O1xudmFyIGRhdGEgPSB7XG5cdGNvdW50cmllczogY291bnRyaWVzJDEsXG5cdHRpbWV6b25lczogdGltZXpvbmVzJDFcbn07XG5cbnZhciB0aW1lem9uZXNNYXA7XG5mdW5jdGlvbiBidWlsZENvdW50cnkoZGF0YSwgaWQpIHtcbiAgdmFyIG5hbWUgPSBkYXRhLmNvdW50cmllc1tpZF07XG4gIGlmICghbmFtZSkgcmV0dXJuIG51bGw7XG4gIHZhciB0ek1hcCA9IGdldFRpbWV6b25lc01hcChkYXRhKVtpZF0gfHwge307XG4gIHJldHVybiB7XG4gICAgaWQ6IGlkLFxuICAgIG5hbWU6IG5hbWUsXG4gICAgdGltZXpvbmVzOiB0ek1hcC5jdXJyZW50IHx8IFtdLFxuICAgIGFsbFRpbWV6b25lczogdHpNYXAuYWxsIHx8IFtdXG4gIH07XG59XG5cbmZ1bmN0aW9uIGdldFRpbWV6b25lc01hcChkYXRhKSB7XG4gIGlmICghdGltZXpvbmVzTWFwKSB0aW1lem9uZXNNYXAgPSBidWlsZFRpbWV6b25lc01hcChkYXRhKTtcbiAgcmV0dXJuIHRpbWV6b25lc01hcDtcbn1cblxuZnVuY3Rpb24gYnVpbGRUaW1lem9uZXNNYXAoZGF0YSkge1xuICByZXR1cm4gT2JqZWN0LmtleXMoZGF0YS50aW1lem9uZXMpLnJlZHVjZShmdW5jdGlvbiAocmVzdWx0LCBpZCkge1xuICAgIHZhciB0eiA9IGRhdGEudGltZXpvbmVzW2lkXTtcbiAgICB2YXIgYyA9IHR6LmMsXG4gICAgICAgIGEgPSB0ei5hO1xuICAgIHZhciBhbGlhc1R6ID0gZGF0YS50aW1lem9uZXNbYV0gfHwge307XG4gICAgdmFyIGNvdW50cmllcyA9IGMgfHwgYWxpYXNUei5jO1xuICAgIGlmICghY291bnRyaWVzKSByZXR1cm4gcmVzdWx0O1xuICAgIGNvdW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uIChjb3VudHJ5KSB7XG4gICAgICBpZiAoIXJlc3VsdFtjb3VudHJ5XSkgT2JqZWN0LmFzc2lnbihyZXN1bHQsIF9kZWZpbmVQcm9wZXJ0eSh7fSwgY291bnRyeSwge1xuICAgICAgICBjdXJyZW50OiBbXSxcbiAgICAgICAgYWxsOiBbXVxuICAgICAgfSkpO1xuICAgICAgaWYgKHR6LnIgPT09IHVuZGVmaW5lZCkgcmVzdWx0W2NvdW50cnldLmN1cnJlbnQucHVzaChpZCk7XG4gICAgICByZXN1bHRbY291bnRyeV0uYWxsLnB1c2goaWQpO1xuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH0sIHt9KTtcbn1cblxuZnVuY3Rpb24gYnVpbGRUaW1lem9uZShkYXRhLCBuYW1lKSB7XG4gIHZhciB0aW1lem9uZSA9IGRhdGEudGltZXpvbmVzW25hbWVdO1xuICBpZiAoIXRpbWV6b25lKSByZXR1cm4gbnVsbDtcbiAgdmFyIF90aW1lem9uZSRhID0gdGltZXpvbmUuYSxcbiAgICAgIGFsaWFzT2YgPSBfdGltZXpvbmUkYSA9PT0gdm9pZCAwID8gbnVsbCA6IF90aW1lem9uZSRhO1xuICB2YXIgYWxpYXNUeiA9IGFsaWFzT2YgPyBkYXRhLnRpbWV6b25lc1thbGlhc09mXSA6IHt9O1xuXG4gIHZhciB0eiA9IF9vYmplY3RTcHJlYWQyKF9vYmplY3RTcHJlYWQyKHt9LCBhbGlhc1R6KSwgZGF0YS50aW1lem9uZXNbbmFtZV0pO1xuXG4gIHZhciBjb3VudHJpZXMgPSB0ei5jIHx8IFtdO1xuICB2YXIgdXRjT2Zmc2V0ID0gdHoudTtcbiAgdmFyIGRzdE9mZnNldCA9IE51bWJlci5pc0ludGVnZXIodHouZCkgPyB0ei5kIDogdXRjT2Zmc2V0O1xuICB2YXIgcmVzdWx0ID0ge1xuICAgIG5hbWU6IG5hbWUsXG4gICAgY291bnRyaWVzOiBjb3VudHJpZXMsXG4gICAgdXRjT2Zmc2V0OiB1dGNPZmZzZXQsXG4gICAgdXRjT2Zmc2V0U3RyOiBnZXRPZmZzZXRTdHIodXRjT2Zmc2V0KSxcbiAgICBkc3RPZmZzZXQ6IGRzdE9mZnNldCxcbiAgICBkc3RPZmZzZXRTdHI6IGdldE9mZnNldFN0cihkc3RPZmZzZXQpLFxuICAgIGFsaWFzT2Y6IGFsaWFzT2ZcbiAgfTtcbiAgaWYgKHRpbWV6b25lLnIpIHJlc3VsdC5kZXByZWNhdGVkID0gdHJ1ZTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gZ2V0T2Zmc2V0U3RyKG9mZnNldCkge1xuICB2YXIgaG91cnMgPSBNYXRoLmZsb29yKG9mZnNldCAvIDYwKTtcbiAgdmFyIG1pbiA9IG9mZnNldCAlIDYwO1xuICB2YXIgc2lnbiA9IG9mZnNldCA8IDAgPyAnLScgOiAnKyc7XG4gIHJldHVybiBcIlwiLmNvbmNhdChzaWduKS5jb25jYXQoZ2V0TnVtU3RyKGhvdXJzKSwgXCI6XCIpLmNvbmNhdChnZXROdW1TdHIobWluKSk7XG59XG5cbmZ1bmN0aW9uIGdldE51bVN0cihpbnB1dCkge1xuICB2YXIgbnVtID0gTWF0aC5hYnMoaW5wdXQpO1xuICB2YXIgcHJlZml4ID0gbnVtIDwgMTAgPyAnMCcgOiAnJztcbiAgcmV0dXJuIFwiXCIuY29uY2F0KHByZWZpeCkuY29uY2F0KG51bSk7XG59XG5cbnZhciBfZXhjbHVkZWQgPSBbXCJhbGxUaW1lem9uZXNcIl07XG52YXIgdG90YWxUaW1lem9uZXMgPSBPYmplY3Qua2V5cyhkYXRhLnRpbWV6b25lcykubGVuZ3RoO1xudmFyIGNvdW50cmllcyA9IHt9O1xudmFyIHRpbWV6b25lcyA9IHt9O1xudmFyIG1lbW9pemVkVGltZXpvbmVzID0gMDtcbmZ1bmN0aW9uIGdldEFsbENvdW50cmllcygpIHtcbiAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuICByZXR1cm4gT2JqZWN0LmtleXMoZGF0YS5jb3VudHJpZXMpLnJlZHVjZShmdW5jdGlvbiAocHJldiwgaWQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihwcmV2LCBfZGVmaW5lUHJvcGVydHkoe30sIGlkLCBnZXRDb3VudHJ5KGlkLCBvcHRpb25zKSkpO1xuICB9LCB7fSk7XG59XG5mdW5jdGlvbiBnZXRBbGxUaW1lem9uZXMoKSB7XG4gIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcbiAgaWYgKHRvdGFsVGltZXpvbmVzICE9PSBtZW1vaXplZFRpbWV6b25lcykgT2JqZWN0LmtleXMoZGF0YS50aW1lem9uZXMpLmZvckVhY2goZ2V0VGltZXpvbmUpO1xuICByZXR1cm4gZGVsaXZlclRpbWV6b25lcyh0aW1lem9uZXMsIG9wdGlvbnMpO1xufVxuZnVuY3Rpb24gZ2V0Q291bnRyeShpZCkge1xuICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG4gIGlmICghY291bnRyaWVzW2lkXSkgbWVtb2l6ZUNvdW50cnkoYnVpbGRDb3VudHJ5KGRhdGEsIGlkKSk7XG4gIHJldHVybiBkZWxpdmVyQ291bnRyeShjb3VudHJpZXNbaWRdLCBvcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gbWVtb2l6ZUNvdW50cnkoY291bnRyeSkge1xuICBpZiAoIWNvdW50cnkpIHJldHVybjtcbiAgY291bnRyaWVzW2NvdW50cnkuaWRdID0gY291bnRyeTtcbn1cblxuZnVuY3Rpb24gZ2V0VGltZXpvbmUobmFtZSkge1xuICBpZiAoIXRpbWV6b25lc1tuYW1lXSkgbWVtb2l6ZVRpbWV6b25lKGJ1aWxkVGltZXpvbmUoZGF0YSwgbmFtZSkpO1xuICByZXR1cm4gdGltZXpvbmVzW25hbWVdID8gX29iamVjdFNwcmVhZDIoe30sIHRpbWV6b25lc1tuYW1lXSkgOiBudWxsO1xufVxuXG5mdW5jdGlvbiBtZW1vaXplVGltZXpvbmUodGltZXpvbmUpIHtcbiAgaWYgKCF0aW1lem9uZSkgcmV0dXJuO1xuICB0aW1lem9uZXNbdGltZXpvbmUubmFtZV0gPSB0aW1lem9uZTtcbiAgbWVtb2l6ZWRUaW1lem9uZXMgPSBPYmplY3Qua2V5cyh0aW1lem9uZSkubGVuZ3RoO1xufVxuXG5mdW5jdGlvbiBnZXRDb3VudHJpZXNGb3JUaW1lem9uZSh0ek5hbWUpIHtcbiAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICB2YXIgdGltZXpvbmUgPSBnZXRUaW1lem9uZSh0ek5hbWUpIHx8IHt9O1xuICB2YXIgdmFsdWVzID0gdGltZXpvbmUuY291bnRyaWVzIHx8IFtdO1xuICByZXR1cm4gdmFsdWVzLm1hcChmdW5jdGlvbiAoYykge1xuICAgIHJldHVybiBnZXRDb3VudHJ5KGMsIG9wdGlvbnMpO1xuICB9KTtcbn1cbmZ1bmN0aW9uIGdldENvdW50cnlGb3JUaW1lem9uZSh0ek5hbWUpIHtcbiAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuXG4gIHZhciBfZ2V0Q291bnRyaWVzRm9yVGltZXogPSBnZXRDb3VudHJpZXNGb3JUaW1lem9uZSh0ek5hbWUsIG9wdGlvbnMpLFxuICAgICAgX2dldENvdW50cmllc0ZvclRpbWV6MiA9IF9zbGljZWRUb0FycmF5KF9nZXRDb3VudHJpZXNGb3JUaW1leiwgMSksXG4gICAgICBtYWluID0gX2dldENvdW50cmllc0ZvclRpbWV6MlswXTtcblxuICByZXR1cm4gbWFpbiB8fCBudWxsO1xufVxuZnVuY3Rpb24gZ2V0VGltZXpvbmVzRm9yQ291bnRyeShjb3VudHJ5SWQpIHtcbiAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICB2YXIgY291bnRyeSA9IGdldENvdW50cnkoY291bnRyeUlkLCBvcHRpb25zKTtcbiAgaWYgKCFjb3VudHJ5KSByZXR1cm4gbnVsbDtcbiAgdmFyIHZhbHVlcyA9IGNvdW50cnkudGltZXpvbmVzIHx8IFtdO1xuICByZXR1cm4gdmFsdWVzLm1hcChnZXRUaW1lem9uZSk7XG59XG5cbmZ1bmN0aW9uIGRlbGl2ZXJUaW1lem9uZXModHpzLCBvcHRpb25zKSB7XG4gIHZhciBfcmVmID0gb3B0aW9ucyB8fCB7fSxcbiAgICAgIGRlcHJlY2F0ZWQgPSBfcmVmLmRlcHJlY2F0ZWQ7XG5cbiAgaWYgKGRlcHJlY2F0ZWQgPT09IHRydWUpIHJldHVybiB0enM7XG4gIHJldHVybiBPYmplY3Qua2V5cyh0enMpLnJlZHVjZShmdW5jdGlvbiAocHJldiwga2V5KSB7XG4gICAgaWYgKCF0enNba2V5XS5kZXByZWNhdGVkKSBPYmplY3QuYXNzaWduKHByZXYsIF9kZWZpbmVQcm9wZXJ0eSh7fSwga2V5LCB0enNba2V5XSkpO1xuICAgIHJldHVybiBwcmV2O1xuICB9LCB7fSk7XG59XG5cbmZ1bmN0aW9uIGRlbGl2ZXJDb3VudHJ5KGNvdW50cnksIG9wdGlvbnMpIHtcbiAgaWYgKCFjb3VudHJ5KSByZXR1cm4gbnVsbDtcblxuICB2YXIgX3JlZjIgPSBvcHRpb25zIHx8IHt9LFxuICAgICAgZGVwcmVjYXRlZCA9IF9yZWYyLmRlcHJlY2F0ZWQ7XG5cbiAgY291bnRyeS5hbGxUaW1lem9uZXM7XG4gICAgICB2YXIgb3RoZXIgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoY291bnRyeSwgX2V4Y2x1ZGVkKTtcblxuICB2YXIgdHogPSBkZXByZWNhdGVkID8gY291bnRyeS5hbGxUaW1lem9uZXMgOiBjb3VudHJ5LnRpbWV6b25lcztcbiAgcmV0dXJuIF9vYmplY3RTcHJlYWQyKF9vYmplY3RTcHJlYWQyKHt9LCBvdGhlciksIHt9LCB7XG4gICAgdGltZXpvbmVzOiB0elxuICB9KTtcbn1cblxudmFyIGluZGV4ID0ge1xuICBnZXRDb3VudHJ5OiBnZXRDb3VudHJ5LFxuICBnZXRUaW1lem9uZTogZ2V0VGltZXpvbmUsXG4gIGdldEFsbENvdW50cmllczogZ2V0QWxsQ291bnRyaWVzLFxuICBnZXRBbGxUaW1lem9uZXM6IGdldEFsbFRpbWV6b25lcyxcbiAgZ2V0VGltZXpvbmVzRm9yQ291bnRyeTogZ2V0VGltZXpvbmVzRm9yQ291bnRyeSxcbiAgZ2V0Q291bnRyaWVzRm9yVGltZXpvbmU6IGdldENvdW50cmllc0ZvclRpbWV6b25lLFxuICBnZXRDb3VudHJ5Rm9yVGltZXpvbmU6IGdldENvdW50cnlGb3JUaW1lem9uZVxufTtcblxuZXhwb3J0IHsgaW5kZXggYXMgZGVmYXVsdCwgZ2V0QWxsQ291bnRyaWVzLCBnZXRBbGxUaW1lem9uZXMsIGdldENvdW50cmllc0ZvclRpbWV6b25lLCBnZXRDb3VudHJ5LCBnZXRDb3VudHJ5Rm9yVGltZXpvbmUsIGdldFRpbWV6b25lLCBnZXRUaW1lem9uZXNGb3JDb3VudHJ5IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXBcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgaW5pdEV2ZW50cyB9IGZyb20gXCIuL21vZHVsZXMvb2JqZWN0cy9VSVwiO1xuaW1wb3J0IHsgZ2V0V2VhdGhlciB9IGZyb20gXCIuL21vZHVsZXMvdXRpbC9EYXRhRmV0Y2hlci5qc1wiO1xuaW1wb3J0IHsgZ2V0Q3VycmVudFRpbWVGcm9tVVRDIH0gZnJvbSBcIi4vbW9kdWxlcy91dGlsL1RpbWVcIjtcbmNvbnNvbGUubG9nKGdldFdlYXRoZXIoXCJtYW5pbGFcIikpO1xuaW5pdEV2ZW50cygpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9