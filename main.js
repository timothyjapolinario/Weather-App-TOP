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
        const timeZone = getTimeZone("ZA", data.name);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBaUQ7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQiw2REFBVTtBQUNoQyxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFc0I7Ozs7Ozs7Ozs7Ozs7OztBQ2xDdEI7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsT0FBTyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0JpQztBQUNTO0FBQ2xCOztBQUUvQztBQUNBO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRCxTQUFTLFNBQVMsY0FBYztBQUMzRixRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiw0REFBcUI7QUFDMUM7QUFDQSx3QkFBd0IscUVBQXFCO0FBQzdDO0FBQ0EsT0FBTztBQUNQO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsK0VBQXNCO0FBQ3ZDO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLFNBQVMsK0VBQXNCO0FBQy9COztBQUVxQzs7Ozs7Ozs7Ozs7Ozs7O0FDL0NyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWlDOzs7Ozs7Ozs7Ozs7Ozs7O0FDYlE7QUFDekM7QUFDQSxrQkFBa0IsNERBQU87QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWlDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZGpDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esa0JBQWtCLHNCQUFzQjtBQUN4Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxjQUFjLHVCQUF1QjtBQUNyQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxnQkFBZ0IsNkJBQTZCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLDRCQUE0QiwrQkFBK0I7QUFDM0Q7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHlDQUF5QyxTQUFTOztBQUVsRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvRUFBb0U7QUFDcEU7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsR0FBRyxJQUFJO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDJDQUEyQzs7QUFFM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQ7QUFDakQsR0FBRyxJQUFJO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNENBQTRDO0FBQzVDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCO0FBQzFCOztBQUVBO0FBQ0E7QUFDQSxvRUFBb0U7QUFDcEU7QUFDQSxHQUFHLElBQUk7QUFDUDs7QUFFQTtBQUNBOztBQUVBLDJCQUEyQjtBQUMzQjs7QUFFQTtBQUNBOztBQUVBO0FBQ0EseUNBQXlDLFlBQVk7QUFDckQ7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUUrSjtBQUMvSjs7Ozs7OztVQzVpSUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTmtEO0FBQ1M7QUFDQztBQUM1RCxZQUFZLHdFQUFVO0FBQ3RCLCtEQUFVIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAtdG9wLy4vc3JjL21vZHVsZXMvb2JqZWN0cy9VSS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC10b3AvLi9zcmMvbW9kdWxlcy9vYmplY3RzL1dlYXRoZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAtdG9wLy4vc3JjL21vZHVsZXMvdXRpbC9EYXRhRmV0Y2hlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC10b3AvLi9zcmMvbW9kdWxlcy91dGlsL1RpbWUuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAtdG9wLy4vc3JjL21vZHVsZXMvdXRpbC9XZWF0aGVyTWFwcGVyLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLXRvcC8uL25vZGVfbW9kdWxlcy9jb3VudHJpZXMtYW5kLXRpbWV6b25lcy9lc20vaW5kZXguanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAtdG9wL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwLXRvcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAtdG9wL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAtdG9wL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAtdG9wLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldFdlYXRoZXIgfSBmcm9tIFwiLi4vdXRpbC9EYXRhRmV0Y2hlclwiO1xuY29uc3Qgc2VhcmNoQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZWFyY2gtYm94XCIpO1xuY29uc3Qgc2VhcmNoQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZWFyY2gtYnV0dG9uXCIpO1xuY29uc3Qgd2VhdGhlclR5cGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndlYXRoZXItbmFtZVwiKTtcbmNvbnN0IHdlYXRoZXJMb2NhdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2VhdGhlci1sb2NhdGlvblwiKTtcbmNvbnN0IHdlYXRoZXJUZW1wZXJhdHVyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2VhdGhlci10ZW1wZXJhdHVyZVwiKTtcbmNvbnN0IHdlYXRoZXJXaW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53ZWF0aGVyLXdpbmRcIik7XG5jb25zdCB3ZWF0aGVyVGltZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2VhdGhlci10aW1lXCIpO1xuY29uc3QgaW5pdEV2ZW50cyA9IGZ1bmN0aW9uIGluaXRpYWxpemVBbGxFdmVudHMoKSB7XG4gIHNlYXJjaEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZmV0Y2hXZWF0aGVyKTtcbn07XG5cbmNvbnN0IGZldGNoV2VhdGhlciA9IGFzeW5jIGZ1bmN0aW9uIGZldGNoV2VhdGhlckluZm9ybWF0aW9uKCkge1xuICBjb25zdCBsb2NhdGlvbiA9IHNlYXJjaEJhci52YWx1ZTtcbiAgbGV0IHdlYXRoZXIgPSBudWxsO1xuICBpZiAobG9jYXRpb24gIT0gXCJcIikge1xuICAgIHRyeSB7XG4gICAgICB3ZWF0aGVyID0gYXdhaXQgZ2V0V2VhdGhlcihsb2NhdGlvbik7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgRmV0Y2hpbmcgV2VhdGhlciBEYXRhLlwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdXBkYXRlVUkod2VhdGhlcik7XG4gIH1cbn07XG5jb25zdCB1cGRhdGVVSSA9IGZ1bmN0aW9uIHVwZGF0ZVVJKHdlYXRoZXIpIHtcbiAgY29uc29sZS5sb2cod2VhdGhlcik7XG4gIHdlYXRoZXJUeXBlLmlubmVyVGV4dCA9IHdlYXRoZXIuZGVzY3JpcHRpb247XG4gIHdlYXRoZXJMb2NhdGlvbi5pbm5lclRleHQgPSB3ZWF0aGVyLmxvY2F0aW9uO1xuICB3ZWF0aGVyVGVtcGVyYXR1cmUuaW5uZXJUZXh0ID0gd2VhdGhlci50ZW1wZXJhdHVyZTtcbiAgd2VhdGhlcldpbmQuaW5uZXJUZXh0ID0gd2VhdGhlci53aW5kO1xuICB3ZWF0aGVyVGltZS5pbm5lclRleHQgPSB3ZWF0aGVyLnRpbWU7XG59O1xuXG5leHBvcnQgeyBpbml0RXZlbnRzIH07XG4iLCJjb25zdCB3ZWF0aGVySW50ZXJmYWNlID0gKCkgPT4gKHtcbiAgdHlwZTogXCJ3ZWF0aGVySW50ZXJmYWNlXCIsXG59KTtcblxuY29uc3QgV2VhdGhlciA9IChcbiAgd2VhdGhlcixcbiAgZGVzY3JpcHRpb24sXG4gIGltYWdlSWNvbixcbiAgbG9jYXRpb24sXG4gIHRlbXBlcmF0dXJlLFxuICB3aW5kLFxuICB0aW1lXG4pID0+IHtcbiAgY29uc3Qgc3RhdGUgPSB7XG4gICAgd2VhdGhlcixcbiAgICBkZXNjcmlwdGlvbixcbiAgICBpbWFnZUljb24sXG4gICAgbG9jYXRpb24sXG4gICAgdGVtcGVyYXR1cmUsXG4gICAgd2luZCxcbiAgICB0aW1lLFxuICB9O1xuICBzdGF0ZS50ZW1wZXJhdHVyZSA9IE1hdGgucm91bmQodGVtcGVyYXR1cmUgLSAyNzMuMTUpICsgXCLCsENcIjtcbiAgc3RhdGUud2luZCA9IHdpbmQgKyBcIm0vc1wiO1xuICByZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuY3JlYXRlKHdlYXRoZXJJbnRlcmZhY2UoKSksIHN0YXRlKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFdlYXRoZXI7XG4iLCJpbXBvcnQgeyBtYXBSYXdUb1dlYXRoZXJPYmplY3QgfSBmcm9tIFwiLi9XZWF0aGVyTWFwcGVyXCI7XG5pbXBvcnQgeyBnZXRUaW1lem9uZXNGb3JDb3VudHJ5IH0gZnJvbSBcImNvdW50cmllcy1hbmQtdGltZXpvbmVzXCI7XG5pbXBvcnQgeyBnZXRDdXJyZW50VGltZUZyb21VVEMgfSBmcm9tIFwiLi9UaW1lXCI7XG5cbmNvbnN0IHdlYXRoZXJBUElLZXkgPSBcIjUwNWZhM2VmYjA4NmJkMjNkODU3MWI3NDRlYTY0YjY5XCI7XG5jb25zdCBnZXRXZWF0aGVyID0gYXN5bmMgZnVuY3Rpb24gZGF0YUZldGNoZXJGcm9tV2VhdGhlckFQSShsb2NhdGlvbikge1xuICB0cnkge1xuICAgIGNvbnN0IHdlYXRoZXJEYXRhID0gZmV0Y2goXG4gICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2xvY2F0aW9ufSZhcHBpZD0ke3dlYXRoZXJBUElLZXl9YCxcbiAgICAgIHsgbW9kZTogXCJjb3JzXCIgfVxuICAgIClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlc3BvbnNlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICBjb25zdCB0aW1lWm9uZSA9IGdldFRpbWVab25lKFwiWkFcIiwgZGF0YS5uYW1lKTtcbiAgICAgICAgY29uc3QgdGltZSA9IGdldEN1cnJlbnRUaW1lRnJvbVVUQyh0aW1lWm9uZSk7XG4gICAgICAgIGRhdGEudGltZSA9IHRpbWU7XG4gICAgICAgIGNvbnN0IHdlYXRoZXIgPSBtYXBSYXdUb1dlYXRoZXJPYmplY3QoZGF0YSk7XG4gICAgICAgIHJldHVybiB3ZWF0aGVyO1xuICAgICAgfSk7XG4gICAgcmV0dXJuIHdlYXRoZXJEYXRhO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgZmV0Y2hpbmcgZGF0YSBvZiB3ZWF0aGVyXCIpO1xuICB9XG59O1xuLy9odHRwczovL3RpbWVhcGkuaW8vYXBpL1RpbWUvY3VycmVudC9jb29yZGluYXRlP2xhdGl0dWRlPTE0LjYwNDImbG9uZ2l0dWRlPTEyMC45ODIyXG5jb25zdCBnZXRUaW1lWm9uZSA9IGZ1bmN0aW9uIGRhdGFGZXRjaGVyRnJvbVRpbWVBcGkoY291bnRyeUNvZGUsIG5hbWUpIHtcbiAgY29uc3Qgbm90T25MaXN0ID0ge1xuICAgIEFmcmljYTogXCJaQVwiLFxuICB9O1xuICBpZiAoIWNvdW50cnlDb2RlKSB7XG4gICAgY291bnRyeUNvZGUgPSBub3RPbkxpc3RbbmFtZV07XG4gIH1cbiAgY29uc3QgcmVnaW9uID0gZ2V0VGltZXpvbmVzRm9yQ291bnRyeShjb3VudHJ5Q29kZSkuZmlsdGVyKChyZWdpb24pID0+IHtcbiAgICByZXR1cm4gcmVnaW9uLm5hbWUuc3BsaXQoXCIvXCIpWzFdID09PSBuYW1lO1xuICB9KTtcbiAgaWYgKHJlZ2lvblswXSkge1xuICAgIHJldHVybiByZWdpb25bMF0udXRjT2Zmc2V0U3RyO1xuICB9XG4gIHJldHVybiBnZXRUaW1lem9uZXNGb3JDb3VudHJ5KGNvdW50cnlDb2RlKVswXS51dGNPZmZzZXRTdHI7XG59O1xuXG5leHBvcnQgeyBnZXRXZWF0aGVyLCB3ZWF0aGVyQVBJS2V5IH07XG4iLCJjb25zdCBnZXRVVENUaW1lTm93ID0gZnVuY3Rpb24gZ2V0Q3VycmVudFRpbWVPZlVUQygpIHtcbiAgY29uc3QgdXRjU3RyID0gbmV3IERhdGUoKS50b1VUQ1N0cmluZygpLnNwbGl0KFwiIFwiKVs0XTtcbiAgY29uc3QgdXRjVGltZU5vdyA9IHV0Y1N0ci5zbGljZSgwLCAtMyk7XG4gIHJldHVybiB1dGNUaW1lTm93O1xufTtcbmNvbnN0IGdldEN1cnJlbnRUaW1lRnJvbVVUQyA9IGZ1bmN0aW9uIHN1YnRyYWN0VGltZVpvbmVGcm9tVVRDKHRpbWVab25lKSB7XG4gIGNvbnN0IHV0YyA9IGdldFVUQ1RpbWVOb3coKTtcbiAgY29uc3QgdXRjSG91ciA9IHBhcnNlSW50KHV0Yy5zbGljZSgwLCAyKSk7XG4gIGNvbnN0IHRpbWVab25lSG91ciA9IHBhcnNlSW50KHRpbWVab25lLnNsaWNlKDAsIDMpKTtcbiAgY29uc3QgY3VycmVudFRpbWUgPSB1dGNIb3VyICsgdGltZVpvbmVIb3VyO1xuICByZXR1cm4gY3VycmVudFRpbWUgKyB1dGMuc2xpY2UoMik7XG59O1xuXG5leHBvcnQgeyBnZXRDdXJyZW50VGltZUZyb21VVEMgfTtcbiIsImltcG9ydCBXZWF0aGVyIGZyb20gXCIuLi9vYmplY3RzL1dlYXRoZXJcIjtcbmNvbnN0IG1hcFJhd1RvV2VhdGhlck9iamVjdCA9IChyYXcpID0+IHtcbiAgY29uc3Qgd2VhdGhlciA9IFdlYXRoZXIoXG4gICAgcmF3LndlYXRoZXJbMF0ubWFpbixcbiAgICByYXcud2VhdGhlclswXS5kZXNjcmlwdGlvbixcbiAgICByYXcud2VhdGhlclswXS5pY29uLFxuICAgIHJhdy5uYW1lLFxuICAgIHJhdy5tYWluLnRlbXAsXG4gICAgcmF3LndpbmQuc3BlZWQsXG4gICAgcmF3LnRpbWVcbiAgKTtcbiAgcmV0dXJuIHdlYXRoZXI7XG59O1xuXG5leHBvcnQgeyBtYXBSYXdUb1dlYXRoZXJPYmplY3QgfTtcbiIsImZ1bmN0aW9uIG93bktleXMob2JqZWN0LCBlbnVtZXJhYmxlT25seSkge1xuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iamVjdCk7XG5cbiAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgICB2YXIgc3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMob2JqZWN0KTtcblxuICAgIGlmIChlbnVtZXJhYmxlT25seSkge1xuICAgICAgc3ltYm9scyA9IHN5bWJvbHMuZmlsdGVyKGZ1bmN0aW9uIChzeW0pIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBzeW0pLmVudW1lcmFibGU7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBrZXlzLnB1c2guYXBwbHkoa2V5cywgc3ltYm9scyk7XG4gIH1cblxuICByZXR1cm4ga2V5cztcbn1cblxuZnVuY3Rpb24gX29iamVjdFNwcmVhZDIodGFyZ2V0KSB7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXSAhPSBudWxsID8gYXJndW1lbnRzW2ldIDoge307XG5cbiAgICBpZiAoaSAlIDIpIHtcbiAgICAgIG93bktleXMoT2JqZWN0KHNvdXJjZSksIHRydWUpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBfZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHNvdXJjZVtrZXldKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMoc291cmNlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG93bktleXMoT2JqZWN0KHNvdXJjZSkpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5mdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShzb3VyY2UsIGV4Y2x1ZGVkKSB7XG4gIGlmIChzb3VyY2UgPT0gbnVsbCkgcmV0dXJuIHt9O1xuICB2YXIgdGFyZ2V0ID0ge307XG4gIHZhciBzb3VyY2VLZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcbiAgdmFyIGtleSwgaTtcblxuICBmb3IgKGkgPSAwOyBpIDwgc291cmNlS2V5cy5sZW5ndGg7IGkrKykge1xuICAgIGtleSA9IHNvdXJjZUtleXNbaV07XG4gICAgaWYgKGV4Y2x1ZGVkLmluZGV4T2Yoa2V5KSA+PSAwKSBjb250aW51ZTtcbiAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKHNvdXJjZSwgZXhjbHVkZWQpIHtcbiAgaWYgKHNvdXJjZSA9PSBudWxsKSByZXR1cm4ge307XG5cbiAgdmFyIHRhcmdldCA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKHNvdXJjZSwgZXhjbHVkZWQpO1xuXG4gIHZhciBrZXksIGk7XG5cbiAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgICB2YXIgc291cmNlU3ltYm9sS2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlKTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBzb3VyY2VTeW1ib2xLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBrZXkgPSBzb3VyY2VTeW1ib2xLZXlzW2ldO1xuICAgICAgaWYgKGV4Y2x1ZGVkLmluZGV4T2Yoa2V5KSA+PSAwKSBjb250aW51ZTtcbiAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHNvdXJjZSwga2V5KSkgY29udGludWU7XG4gICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkge1xuICByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpO1xufVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7XG59XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHtcbiAgdmFyIF9pID0gYXJyID09IG51bGwgPyBudWxsIDogdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdO1xuXG4gIGlmIChfaSA9PSBudWxsKSByZXR1cm47XG4gIHZhciBfYXJyID0gW107XG4gIHZhciBfbiA9IHRydWU7XG4gIHZhciBfZCA9IGZhbHNlO1xuXG4gIHZhciBfcywgX2U7XG5cbiAgdHJ5IHtcbiAgICBmb3IgKF9pID0gX2kuY2FsbChhcnIpOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7XG4gICAgICBfYXJyLnB1c2goX3MudmFsdWUpO1xuXG4gICAgICBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBfZCA9IHRydWU7XG4gICAgX2UgPSBlcnI7XG4gIH0gZmluYWxseSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKF9kKSB0aHJvdyBfZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gX2Fycjtcbn1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikge1xuICBpZiAoIW8pIHJldHVybjtcbiAgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbiAgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpO1xuICBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lO1xuICBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTtcbiAgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xufVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikge1xuICBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDtcblxuICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIGFycjJbaV0gPSBhcnJbaV07XG5cbiAgcmV0dXJuIGFycjI7XG59XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7XG59XG5cbnZhciBjb3VudHJpZXMkMSA9IHtcblx0QUQ6IFwiQW5kb3JyYVwiLFxuXHRBRTogXCJVbml0ZWQgQXJhYiBFbWlyYXRlc1wiLFxuXHRBRjogXCJBZmdoYW5pc3RhblwiLFxuXHRBRzogXCJBbnRpZ3VhIGFuZCBCYXJidWRhXCIsXG5cdEFJOiBcIkFuZ3VpbGxhXCIsXG5cdEFMOiBcIkFsYmFuaWFcIixcblx0QU06IFwiQXJtZW5pYVwiLFxuXHRBTzogXCJBbmdvbGFcIixcblx0QVE6IFwiQW50YXJjdGljYVwiLFxuXHRBUjogXCJBcmdlbnRpbmFcIixcblx0QVM6IFwiQW1lcmljYW4gU2Ftb2FcIixcblx0QVQ6IFwiQXVzdHJpYVwiLFxuXHRBVTogXCJBdXN0cmFsaWFcIixcblx0QVc6IFwiQXJ1YmFcIixcblx0QVg6IFwiw4VsYW5kIElzbGFuZHNcIixcblx0QVo6IFwiQXplcmJhaWphblwiLFxuXHRCQTogXCJCb3NuaWEgYW5kIEhlcnplZ292aW5hXCIsXG5cdEJCOiBcIkJhcmJhZG9zXCIsXG5cdEJEOiBcIkJhbmdsYWRlc2hcIixcblx0QkU6IFwiQmVsZ2l1bVwiLFxuXHRCRjogXCJCdXJraW5hIEZhc29cIixcblx0Qkc6IFwiQnVsZ2FyaWFcIixcblx0Qkg6IFwiQmFocmFpblwiLFxuXHRCSTogXCJCdXJ1bmRpXCIsXG5cdEJKOiBcIkJlbmluXCIsXG5cdEJMOiBcIlNhaW50IEJhcnRow6lsZW15XCIsXG5cdEJNOiBcIkJlcm11ZGFcIixcblx0Qk46IFwiQnJ1bmVpXCIsXG5cdEJPOiBcIkJvbGl2aWFcIixcblx0QlE6IFwiQ2FyaWJiZWFuIE5ldGhlcmxhbmRzXCIsXG5cdEJSOiBcIkJyYXppbFwiLFxuXHRCUzogXCJCYWhhbWFzXCIsXG5cdEJUOiBcIkJodXRhblwiLFxuXHRCVjogXCJCb3V2ZXQgSXNsYW5kXCIsXG5cdEJXOiBcIkJvdHN3YW5hXCIsXG5cdEJZOiBcIkJlbGFydXNcIixcblx0Qlo6IFwiQmVsaXplXCIsXG5cdENBOiBcIkNhbmFkYVwiLFxuXHRDQzogXCJDb2NvcyBJc2xhbmRzXCIsXG5cdENEOiBcIkRlbW9jcmF0aWMgUmVwdWJsaWMgb2YgdGhlIENvbmdvXCIsXG5cdENGOiBcIkNlbnRyYWwgQWZyaWNhbiBSZXB1YmxpY1wiLFxuXHRDRzogXCJSZXB1YmxpYyBvZiB0aGUgQ29uZ29cIixcblx0Q0g6IFwiU3dpdHplcmxhbmRcIixcblx0Q0k6IFwiSXZvcnkgQ29hc3RcIixcblx0Q0s6IFwiQ29vayBJc2xhbmRzXCIsXG5cdENMOiBcIkNoaWxlXCIsXG5cdENNOiBcIkNhbWVyb29uXCIsXG5cdENOOiBcIkNoaW5hXCIsXG5cdENPOiBcIkNvbG9tYmlhXCIsXG5cdENSOiBcIkNvc3RhIFJpY2FcIixcblx0Q1U6IFwiQ3ViYVwiLFxuXHRDVjogXCJDYWJvIFZlcmRlXCIsXG5cdENXOiBcIkN1cmHDp2FvXCIsXG5cdENYOiBcIkNocmlzdG1hcyBJc2xhbmRcIixcblx0Q1k6IFwiQ3lwcnVzXCIsXG5cdENaOiBcIkN6ZWNoaWFcIixcblx0REU6IFwiR2VybWFueVwiLFxuXHRESjogXCJEamlib3V0aVwiLFxuXHRESzogXCJEZW5tYXJrXCIsXG5cdERNOiBcIkRvbWluaWNhXCIsXG5cdERPOiBcIkRvbWluaWNhbiBSZXB1YmxpY1wiLFxuXHREWjogXCJBbGdlcmlhXCIsXG5cdEVDOiBcIkVjdWFkb3JcIixcblx0RUU6IFwiRXN0b25pYVwiLFxuXHRFRzogXCJFZ3lwdFwiLFxuXHRFSDogXCJXZXN0ZXJuIFNhaGFyYVwiLFxuXHRFUjogXCJFcml0cmVhXCIsXG5cdEVTOiBcIlNwYWluXCIsXG5cdEVUOiBcIkV0aGlvcGlhXCIsXG5cdEZJOiBcIkZpbmxhbmRcIixcblx0Rko6IFwiRmlqaVwiLFxuXHRGSzogXCJGYWxrbGFuZCBJc2xhbmRzXCIsXG5cdEZNOiBcIk1pY3JvbmVzaWFcIixcblx0Rk86IFwiRmFyb2UgSXNsYW5kc1wiLFxuXHRGUjogXCJGcmFuY2VcIixcblx0R0E6IFwiR2Fib25cIixcblx0R0I6IFwiVW5pdGVkIEtpbmdkb21cIixcblx0R0Q6IFwiR3JlbmFkYVwiLFxuXHRHRTogXCJHZW9yZ2lhXCIsXG5cdEdGOiBcIkZyZW5jaCBHdWlhbmFcIixcblx0R0c6IFwiR3Vlcm5zZXlcIixcblx0R0g6IFwiR2hhbmFcIixcblx0R0k6IFwiR2licmFsdGFyXCIsXG5cdEdMOiBcIkdyZWVubGFuZFwiLFxuXHRHTTogXCJHYW1iaWFcIixcblx0R046IFwiR3VpbmVhXCIsXG5cdEdQOiBcIkd1YWRlbG91cGVcIixcblx0R1E6IFwiRXF1YXRvcmlhbCBHdWluZWFcIixcblx0R1I6IFwiR3JlZWNlXCIsXG5cdEdTOiBcIlNvdXRoIEdlb3JnaWEgYW5kIHRoZSBTb3V0aCBTYW5kd2ljaCBJc2xhbmRzXCIsXG5cdEdUOiBcIkd1YXRlbWFsYVwiLFxuXHRHVTogXCJHdWFtXCIsXG5cdEdXOiBcIkd1aW5lYS1CaXNzYXVcIixcblx0R1k6IFwiR3V5YW5hXCIsXG5cdEhLOiBcIkhvbmcgS29uZ1wiLFxuXHRITTogXCJIZWFyZCBJc2xhbmQgYW5kIE1jRG9uYWxkIElzbGFuZHNcIixcblx0SE46IFwiSG9uZHVyYXNcIixcblx0SFI6IFwiQ3JvYXRpYVwiLFxuXHRIVDogXCJIYWl0aVwiLFxuXHRIVTogXCJIdW5nYXJ5XCIsXG5cdElEOiBcIkluZG9uZXNpYVwiLFxuXHRJRTogXCJJcmVsYW5kXCIsXG5cdElMOiBcIklzcmFlbFwiLFxuXHRJTTogXCJJc2xlIG9mIE1hblwiLFxuXHRJTjogXCJJbmRpYVwiLFxuXHRJTzogXCJCcml0aXNoIEluZGlhbiBPY2VhbiBUZXJyaXRvcnlcIixcblx0SVE6IFwiSXJhcVwiLFxuXHRJUjogXCJJcmFuXCIsXG5cdElTOiBcIkljZWxhbmRcIixcblx0SVQ6IFwiSXRhbHlcIixcblx0SkU6IFwiSmVyc2V5XCIsXG5cdEpNOiBcIkphbWFpY2FcIixcblx0Sk86IFwiSm9yZGFuXCIsXG5cdEpQOiBcIkphcGFuXCIsXG5cdEtFOiBcIktlbnlhXCIsXG5cdEtHOiBcIkt5cmd5enN0YW5cIixcblx0S0g6IFwiQ2FtYm9kaWFcIixcblx0S0k6IFwiS2lyaWJhdGlcIixcblx0S006IFwiQ29tb3Jvc1wiLFxuXHRLTjogXCJTYWludCBLaXR0cyBhbmQgTmV2aXNcIixcblx0S1A6IFwiTm9ydGggS29yZWFcIixcblx0S1I6IFwiU291dGggS29yZWFcIixcblx0S1c6IFwiS3V3YWl0XCIsXG5cdEtZOiBcIkNheW1hbiBJc2xhbmRzXCIsXG5cdEtaOiBcIkthemFraHN0YW5cIixcblx0TEE6IFwiTGFvc1wiLFxuXHRMQjogXCJMZWJhbm9uXCIsXG5cdExDOiBcIlNhaW50IEx1Y2lhXCIsXG5cdExJOiBcIkxpZWNodGVuc3RlaW5cIixcblx0TEs6IFwiU3JpIExhbmthXCIsXG5cdExSOiBcIkxpYmVyaWFcIixcblx0TFM6IFwiTGVzb3Rob1wiLFxuXHRMVDogXCJMaXRodWFuaWFcIixcblx0TFU6IFwiTHV4ZW1ib3VyZ1wiLFxuXHRMVjogXCJMYXR2aWFcIixcblx0TFk6IFwiTGlieWFcIixcblx0TUE6IFwiTW9yb2Njb1wiLFxuXHRNQzogXCJNb25hY29cIixcblx0TUQ6IFwiTW9sZG92YVwiLFxuXHRNRTogXCJNb250ZW5lZ3JvXCIsXG5cdE1GOiBcIlNhaW50IE1hcnRpblwiLFxuXHRNRzogXCJNYWRhZ2FzY2FyXCIsXG5cdE1IOiBcIk1hcnNoYWxsIElzbGFuZHNcIixcblx0TUs6IFwiTm9ydGggTWFjZWRvbmlhXCIsXG5cdE1MOiBcIk1hbGlcIixcblx0TU06IFwiTXlhbm1hclwiLFxuXHRNTjogXCJNb25nb2xpYVwiLFxuXHRNTzogXCJNYWNhb1wiLFxuXHRNUDogXCJOb3J0aGVybiBNYXJpYW5hIElzbGFuZHNcIixcblx0TVE6IFwiTWFydGluaXF1ZVwiLFxuXHRNUjogXCJNYXVyaXRhbmlhXCIsXG5cdE1TOiBcIk1vbnRzZXJyYXRcIixcblx0TVQ6IFwiTWFsdGFcIixcblx0TVU6IFwiTWF1cml0aXVzXCIsXG5cdE1WOiBcIk1hbGRpdmVzXCIsXG5cdE1XOiBcIk1hbGF3aVwiLFxuXHRNWDogXCJNZXhpY29cIixcblx0TVk6IFwiTWFsYXlzaWFcIixcblx0TVo6IFwiTW96YW1iaXF1ZVwiLFxuXHROQTogXCJOYW1pYmlhXCIsXG5cdE5DOiBcIk5ldyBDYWxlZG9uaWFcIixcblx0TkU6IFwiTmlnZXJcIixcblx0TkY6IFwiTm9yZm9sayBJc2xhbmRcIixcblx0Tkc6IFwiTmlnZXJpYVwiLFxuXHROSTogXCJOaWNhcmFndWFcIixcblx0Tkw6IFwiTmV0aGVybGFuZHNcIixcblx0Tk86IFwiTm9yd2F5XCIsXG5cdE5QOiBcIk5lcGFsXCIsXG5cdE5SOiBcIk5hdXJ1XCIsXG5cdE5VOiBcIk5pdWVcIixcblx0Tlo6IFwiTmV3IFplYWxhbmRcIixcblx0T006IFwiT21hblwiLFxuXHRQQTogXCJQYW5hbWFcIixcblx0UEU6IFwiUGVydVwiLFxuXHRQRjogXCJGcmVuY2ggUG9seW5lc2lhXCIsXG5cdFBHOiBcIlBhcHVhIE5ldyBHdWluZWFcIixcblx0UEg6IFwiUGhpbGlwcGluZXNcIixcblx0UEs6IFwiUGFraXN0YW5cIixcblx0UEw6IFwiUG9sYW5kXCIsXG5cdFBNOiBcIlNhaW50IFBpZXJyZSBhbmQgTWlxdWVsb25cIixcblx0UE46IFwiUGl0Y2Fpcm5cIixcblx0UFI6IFwiUHVlcnRvIFJpY29cIixcblx0UFM6IFwiUGFsZXN0aW5lXCIsXG5cdFBUOiBcIlBvcnR1Z2FsXCIsXG5cdFBXOiBcIlBhbGF1XCIsXG5cdFBZOiBcIlBhcmFndWF5XCIsXG5cdFFBOiBcIlFhdGFyXCIsXG5cdFJFOiBcIlLDqXVuaW9uXCIsXG5cdFJPOiBcIlJvbWFuaWFcIixcblx0UlM6IFwiU2VyYmlhXCIsXG5cdFJVOiBcIlJ1c3NpYVwiLFxuXHRSVzogXCJSd2FuZGFcIixcblx0U0E6IFwiU2F1ZGkgQXJhYmlhXCIsXG5cdFNCOiBcIlNvbG9tb24gSXNsYW5kc1wiLFxuXHRTQzogXCJTZXljaGVsbGVzXCIsXG5cdFNEOiBcIlN1ZGFuXCIsXG5cdFNFOiBcIlN3ZWRlblwiLFxuXHRTRzogXCJTaW5nYXBvcmVcIixcblx0U0g6IFwiU2FpbnQgSGVsZW5hLCBBc2NlbnNpb24gYW5kIFRyaXN0YW4gZGEgQ3VuaGFcIixcblx0U0k6IFwiU2xvdmVuaWFcIixcblx0U0o6IFwiU3ZhbGJhcmQgYW5kIEphbiBNYXllblwiLFxuXHRTSzogXCJTbG92YWtpYVwiLFxuXHRTTDogXCJTaWVycmEgTGVvbmVcIixcblx0U006IFwiU2FuIE1hcmlub1wiLFxuXHRTTjogXCJTZW5lZ2FsXCIsXG5cdFNPOiBcIlNvbWFsaWFcIixcblx0U1I6IFwiU3VyaW5hbWVcIixcblx0U1M6IFwiU291dGggU3VkYW5cIixcblx0U1Q6IFwiU2FvIFRvbWUgYW5kIFByaW5jaXBlXCIsXG5cdFNWOiBcIkVsIFNhbHZhZG9yXCIsXG5cdFNYOiBcIlNpbnQgTWFhcnRlblwiLFxuXHRTWTogXCJTeXJpYVwiLFxuXHRTWjogXCJFc3dhdGluaVwiLFxuXHRUQzogXCJUdXJrcyBhbmQgQ2FpY29zIElzbGFuZHNcIixcblx0VEQ6IFwiQ2hhZFwiLFxuXHRURjogXCJGcmVuY2ggU291dGhlcm4gVGVycml0b3JpZXNcIixcblx0VEc6IFwiVG9nb1wiLFxuXHRUSDogXCJUaGFpbGFuZFwiLFxuXHRUSjogXCJUYWppa2lzdGFuXCIsXG5cdFRLOiBcIlRva2VsYXVcIixcblx0VEw6IFwiVGltb3ItTGVzdGVcIixcblx0VE06IFwiVHVya21lbmlzdGFuXCIsXG5cdFROOiBcIlR1bmlzaWFcIixcblx0VE86IFwiVG9uZ2FcIixcblx0VFI6IFwiVHVya2V5XCIsXG5cdFRUOiBcIlRyaW5pZGFkIGFuZCBUb2JhZ29cIixcblx0VFY6IFwiVHV2YWx1XCIsXG5cdFRXOiBcIlRhaXdhblwiLFxuXHRUWjogXCJUYW56YW5pYVwiLFxuXHRVQTogXCJVa3JhaW5lXCIsXG5cdFVHOiBcIlVnYW5kYVwiLFxuXHRVTTogXCJVbml0ZWQgU3RhdGVzIE1pbm9yIE91dGx5aW5nIElzbGFuZHNcIixcblx0VVM6IFwiVW5pdGVkIFN0YXRlcyBvZiBBbWVyaWNhXCIsXG5cdFVZOiBcIlVydWd1YXlcIixcblx0VVo6IFwiVXpiZWtpc3RhblwiLFxuXHRWQTogXCJIb2x5IFNlZVwiLFxuXHRWQzogXCJTYWludCBWaW5jZW50IGFuZCB0aGUgR3JlbmFkaW5lc1wiLFxuXHRWRTogXCJWZW5lenVlbGFcIixcblx0Vkc6IFwiVmlyZ2luIElzbGFuZHMgKFVLKVwiLFxuXHRWSTogXCJWaXJnaW4gSXNsYW5kcyAoVVMpXCIsXG5cdFZOOiBcIlZpZXRuYW1cIixcblx0VlU6IFwiVmFudWF0dVwiLFxuXHRXRjogXCJXYWxsaXMgYW5kIEZ1dHVuYVwiLFxuXHRXUzogXCJTYW1vYVwiLFxuXHRZRTogXCJZZW1lblwiLFxuXHRZVDogXCJNYXlvdHRlXCIsXG5cdFpBOiBcIlNvdXRoIEFmcmljYVwiLFxuXHRaTTogXCJaYW1iaWFcIixcblx0Wlc6IFwiWmltYmFid2VcIlxufTtcbnZhciB0aW1lem9uZXMkMSA9IHtcblx0XCJBZnJpY2EvQWJpZGphblwiOiB7XG5cdFx0dTogMCxcblx0XHRjOiBbXG5cdFx0XHRcIkNJXCIsXG5cdFx0XHRcIkJGXCIsXG5cdFx0XHRcIkdIXCIsXG5cdFx0XHRcIkdNXCIsXG5cdFx0XHRcIkdOXCIsXG5cdFx0XHRcIk1MXCIsXG5cdFx0XHRcIk1SXCIsXG5cdFx0XHRcIlNIXCIsXG5cdFx0XHRcIlNMXCIsXG5cdFx0XHRcIlNOXCIsXG5cdFx0XHRcIlRHXCJcblx0XHRdXG5cdH0sXG5cdFwiQWZyaWNhL0FjY3JhXCI6IHtcblx0XHRhOiBcIkFmcmljYS9BYmlkamFuXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJHSFwiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiQWZyaWNhL0FkZGlzX0FiYWJhXCI6IHtcblx0XHRhOiBcIkFmcmljYS9OYWlyb2JpXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJFVFwiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiQWZyaWNhL0FsZ2llcnNcIjoge1xuXHRcdHU6IDYwLFxuXHRcdGM6IFtcblx0XHRcdFwiRFpcIlxuXHRcdF1cblx0fSxcblx0XCJBZnJpY2EvQXNtYXJhXCI6IHtcblx0XHRhOiBcIkFmcmljYS9OYWlyb2JpXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJFUlwiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiQWZyaWNhL0FzbWVyYVwiOiB7XG5cdFx0YTogXCJBZnJpY2EvTmFpcm9iaVwiLFxuXHRcdGM6IFtcblx0XHRcdFwiRVJcIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFmcmljYS9CYW1ha29cIjoge1xuXHRcdGE6IFwiQWZyaWNhL0FiaWRqYW5cIixcblx0XHRjOiBbXG5cdFx0XHRcIk1MXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBZnJpY2EvQmFuZ3VpXCI6IHtcblx0XHRhOiBcIkFmcmljYS9MYWdvc1wiLFxuXHRcdGM6IFtcblx0XHRcdFwiQ0ZcIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFmcmljYS9CYW5qdWxcIjoge1xuXHRcdGE6IFwiQWZyaWNhL0FiaWRqYW5cIixcblx0XHRjOiBbXG5cdFx0XHRcIkdNXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBZnJpY2EvQmlzc2F1XCI6IHtcblx0XHR1OiAwLFxuXHRcdGM6IFtcblx0XHRcdFwiR1dcIlxuXHRcdF1cblx0fSxcblx0XCJBZnJpY2EvQmxhbnR5cmVcIjoge1xuXHRcdGE6IFwiQWZyaWNhL01hcHV0b1wiLFxuXHRcdGM6IFtcblx0XHRcdFwiTVdcIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFmcmljYS9CcmF6emF2aWxsZVwiOiB7XG5cdFx0YTogXCJBZnJpY2EvTGFnb3NcIixcblx0XHRjOiBbXG5cdFx0XHRcIkNHXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBZnJpY2EvQnVqdW1idXJhXCI6IHtcblx0XHRhOiBcIkFmcmljYS9NYXB1dG9cIixcblx0XHRjOiBbXG5cdFx0XHRcIkJJXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBZnJpY2EvQ2Fpcm9cIjoge1xuXHRcdHU6IDEyMCxcblx0XHRjOiBbXG5cdFx0XHRcIkVHXCJcblx0XHRdXG5cdH0sXG5cdFwiQWZyaWNhL0Nhc2FibGFuY2FcIjoge1xuXHRcdHU6IDYwLFxuXHRcdGQ6IDAsXG5cdFx0YzogW1xuXHRcdFx0XCJNQVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFmcmljYS9DZXV0YVwiOiB7XG5cdFx0dTogNjAsXG5cdFx0ZDogMTIwLFxuXHRcdGM6IFtcblx0XHRcdFwiRVNcIlxuXHRcdF1cblx0fSxcblx0XCJBZnJpY2EvQ29uYWtyeVwiOiB7XG5cdFx0YTogXCJBZnJpY2EvQWJpZGphblwiLFxuXHRcdGM6IFtcblx0XHRcdFwiR05cIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFmcmljYS9EYWthclwiOiB7XG5cdFx0YTogXCJBZnJpY2EvQWJpZGphblwiLFxuXHRcdGM6IFtcblx0XHRcdFwiU05cIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFmcmljYS9EYXJfZXNfU2FsYWFtXCI6IHtcblx0XHRhOiBcIkFmcmljYS9OYWlyb2JpXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJUWlwiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiQWZyaWNhL0RqaWJvdXRpXCI6IHtcblx0XHRhOiBcIkFmcmljYS9OYWlyb2JpXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJESlwiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiQWZyaWNhL0RvdWFsYVwiOiB7XG5cdFx0YTogXCJBZnJpY2EvTGFnb3NcIixcblx0XHRjOiBbXG5cdFx0XHRcIkNNXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBZnJpY2EvRWxfQWFpdW5cIjoge1xuXHRcdHU6IDYwLFxuXHRcdGQ6IDAsXG5cdFx0YzogW1xuXHRcdFx0XCJFSFwiXG5cdFx0XVxuXHR9LFxuXHRcIkFmcmljYS9GcmVldG93blwiOiB7XG5cdFx0YTogXCJBZnJpY2EvQWJpZGphblwiLFxuXHRcdGM6IFtcblx0XHRcdFwiU0xcIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFmcmljYS9HYWJvcm9uZVwiOiB7XG5cdFx0YTogXCJBZnJpY2EvTWFwdXRvXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJCV1wiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiQWZyaWNhL0hhcmFyZVwiOiB7XG5cdFx0YTogXCJBZnJpY2EvTWFwdXRvXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJaV1wiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiQWZyaWNhL0pvaGFubmVzYnVyZ1wiOiB7XG5cdFx0dTogMTIwLFxuXHRcdGM6IFtcblx0XHRcdFwiWkFcIixcblx0XHRcdFwiTFNcIixcblx0XHRcdFwiU1pcIlxuXHRcdF1cblx0fSxcblx0XCJBZnJpY2EvSnViYVwiOiB7XG5cdFx0dTogMTIwLFxuXHRcdGM6IFtcblx0XHRcdFwiU1NcIlxuXHRcdF1cblx0fSxcblx0XCJBZnJpY2EvS2FtcGFsYVwiOiB7XG5cdFx0YTogXCJBZnJpY2EvTmFpcm9iaVwiLFxuXHRcdGM6IFtcblx0XHRcdFwiVUdcIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFmcmljYS9LaGFydG91bVwiOiB7XG5cdFx0dTogMTIwLFxuXHRcdGM6IFtcblx0XHRcdFwiU0RcIlxuXHRcdF1cblx0fSxcblx0XCJBZnJpY2EvS2lnYWxpXCI6IHtcblx0XHRhOiBcIkFmcmljYS9NYXB1dG9cIixcblx0XHRjOiBbXG5cdFx0XHRcIlJXXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBZnJpY2EvS2luc2hhc2FcIjoge1xuXHRcdGE6IFwiQWZyaWNhL0xhZ29zXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJDRFwiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiQWZyaWNhL0xhZ29zXCI6IHtcblx0XHR1OiA2MCxcblx0XHRjOiBbXG5cdFx0XHRcIk5HXCIsXG5cdFx0XHRcIkFPXCIsXG5cdFx0XHRcIkJKXCIsXG5cdFx0XHRcIkNEXCIsXG5cdFx0XHRcIkNGXCIsXG5cdFx0XHRcIkNHXCIsXG5cdFx0XHRcIkNNXCIsXG5cdFx0XHRcIkdBXCIsXG5cdFx0XHRcIkdRXCIsXG5cdFx0XHRcIk5FXCJcblx0XHRdXG5cdH0sXG5cdFwiQWZyaWNhL0xpYnJldmlsbGVcIjoge1xuXHRcdGE6IFwiQWZyaWNhL0xhZ29zXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJHQVwiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiQWZyaWNhL0xvbWVcIjoge1xuXHRcdGE6IFwiQWZyaWNhL0FiaWRqYW5cIixcblx0XHRjOiBbXG5cdFx0XHRcIlRHXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBZnJpY2EvTHVhbmRhXCI6IHtcblx0XHRhOiBcIkFmcmljYS9MYWdvc1wiLFxuXHRcdGM6IFtcblx0XHRcdFwiQU9cIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFmcmljYS9MdWJ1bWJhc2hpXCI6IHtcblx0XHRhOiBcIkFmcmljYS9NYXB1dG9cIixcblx0XHRjOiBbXG5cdFx0XHRcIkNEXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBZnJpY2EvTHVzYWthXCI6IHtcblx0XHRhOiBcIkFmcmljYS9NYXB1dG9cIixcblx0XHRjOiBbXG5cdFx0XHRcIlpNXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBZnJpY2EvTWFsYWJvXCI6IHtcblx0XHRhOiBcIkFmcmljYS9MYWdvc1wiLFxuXHRcdGM6IFtcblx0XHRcdFwiR1FcIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFmcmljYS9NYXB1dG9cIjoge1xuXHRcdHU6IDEyMCxcblx0XHRjOiBbXG5cdFx0XHRcIk1aXCIsXG5cdFx0XHRcIkJJXCIsXG5cdFx0XHRcIkJXXCIsXG5cdFx0XHRcIkNEXCIsXG5cdFx0XHRcIk1XXCIsXG5cdFx0XHRcIlJXXCIsXG5cdFx0XHRcIlpNXCIsXG5cdFx0XHRcIlpXXCJcblx0XHRdXG5cdH0sXG5cdFwiQWZyaWNhL01hc2VydVwiOiB7XG5cdFx0YTogXCJBZnJpY2EvSm9oYW5uZXNidXJnXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJMU1wiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiQWZyaWNhL01iYWJhbmVcIjoge1xuXHRcdGE6IFwiQWZyaWNhL0pvaGFubmVzYnVyZ1wiLFxuXHRcdGM6IFtcblx0XHRcdFwiU1pcIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFmcmljYS9Nb2dhZGlzaHVcIjoge1xuXHRcdGE6IFwiQWZyaWNhL05haXJvYmlcIixcblx0XHRjOiBbXG5cdFx0XHRcIlNPXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBZnJpY2EvTW9ucm92aWFcIjoge1xuXHRcdHU6IDAsXG5cdFx0YzogW1xuXHRcdFx0XCJMUlwiXG5cdFx0XVxuXHR9LFxuXHRcIkFmcmljYS9OYWlyb2JpXCI6IHtcblx0XHR1OiAxODAsXG5cdFx0YzogW1xuXHRcdFx0XCJLRVwiLFxuXHRcdFx0XCJESlwiLFxuXHRcdFx0XCJFUlwiLFxuXHRcdFx0XCJFVFwiLFxuXHRcdFx0XCJLTVwiLFxuXHRcdFx0XCJNR1wiLFxuXHRcdFx0XCJTT1wiLFxuXHRcdFx0XCJUWlwiLFxuXHRcdFx0XCJVR1wiLFxuXHRcdFx0XCJZVFwiXG5cdFx0XVxuXHR9LFxuXHRcIkFmcmljYS9OZGphbWVuYVwiOiB7XG5cdFx0dTogNjAsXG5cdFx0YzogW1xuXHRcdFx0XCJURFwiXG5cdFx0XVxuXHR9LFxuXHRcIkFmcmljYS9OaWFtZXlcIjoge1xuXHRcdGE6IFwiQWZyaWNhL0xhZ29zXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJORVwiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiQWZyaWNhL05vdWFrY2hvdHRcIjoge1xuXHRcdGE6IFwiQWZyaWNhL0FiaWRqYW5cIixcblx0XHRjOiBbXG5cdFx0XHRcIk1SXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBZnJpY2EvT3VhZ2Fkb3Vnb3VcIjoge1xuXHRcdGE6IFwiQWZyaWNhL0FiaWRqYW5cIixcblx0XHRjOiBbXG5cdFx0XHRcIkJGXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBZnJpY2EvUG9ydG8tTm92b1wiOiB7XG5cdFx0YTogXCJBZnJpY2EvTGFnb3NcIixcblx0XHRjOiBbXG5cdFx0XHRcIkJKXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBZnJpY2EvU2FvX1RvbWVcIjoge1xuXHRcdHU6IDAsXG5cdFx0YzogW1xuXHRcdFx0XCJTVFwiXG5cdFx0XVxuXHR9LFxuXHRcIkFmcmljYS9UaW1idWt0dVwiOiB7XG5cdFx0YTogXCJBZnJpY2EvQWJpZGphblwiLFxuXHRcdGM6IFtcblx0XHRcdFwiTUxcIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFmcmljYS9Ucmlwb2xpXCI6IHtcblx0XHR1OiAxMjAsXG5cdFx0YzogW1xuXHRcdFx0XCJMWVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFmcmljYS9UdW5pc1wiOiB7XG5cdFx0dTogNjAsXG5cdFx0YzogW1xuXHRcdFx0XCJUTlwiXG5cdFx0XVxuXHR9LFxuXHRcIkFmcmljYS9XaW5kaG9la1wiOiB7XG5cdFx0dTogMTIwLFxuXHRcdGM6IFtcblx0XHRcdFwiTkFcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL0FkYWtcIjoge1xuXHRcdHU6IC02MDAsXG5cdFx0ZDogLTU0MCxcblx0XHRjOiBbXG5cdFx0XHRcIlVTXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9BbmNob3JhZ2VcIjoge1xuXHRcdHU6IC01NDAsXG5cdFx0ZDogLTQ4MCxcblx0XHRjOiBbXG5cdFx0XHRcIlVTXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9Bbmd1aWxsYVwiOiB7XG5cdFx0YTogXCJBbWVyaWNhL1B1ZXJ0b19SaWNvXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJBSVwiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiQW1lcmljYS9BbnRpZ3VhXCI6IHtcblx0XHRhOiBcIkFtZXJpY2EvUHVlcnRvX1JpY29cIixcblx0XHRjOiBbXG5cdFx0XHRcIkFHXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBbWVyaWNhL0FyYWd1YWluYVwiOiB7XG5cdFx0dTogLTE4MCxcblx0XHRjOiBbXG5cdFx0XHRcIkJSXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9BcmdlbnRpbmEvQnVlbm9zX0FpcmVzXCI6IHtcblx0XHR1OiAtMTgwLFxuXHRcdGM6IFtcblx0XHRcdFwiQVJcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL0FyZ2VudGluYS9DYXRhbWFyY2FcIjoge1xuXHRcdHU6IC0xODAsXG5cdFx0YzogW1xuXHRcdFx0XCJBUlwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvQXJnZW50aW5hL0NvbW9kUml2YWRhdmlhXCI6IHtcblx0XHRhOiBcIkFtZXJpY2EvQXJnZW50aW5hL0NhdGFtYXJjYVwiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBbWVyaWNhL0FyZ2VudGluYS9Db3Jkb2JhXCI6IHtcblx0XHR1OiAtMTgwLFxuXHRcdGM6IFtcblx0XHRcdFwiQVJcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL0FyZ2VudGluYS9KdWp1eVwiOiB7XG5cdFx0dTogLTE4MCxcblx0XHRjOiBbXG5cdFx0XHRcIkFSXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9BcmdlbnRpbmEvTGFfUmlvamFcIjoge1xuXHRcdHU6IC0xODAsXG5cdFx0YzogW1xuXHRcdFx0XCJBUlwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvQXJnZW50aW5hL01lbmRvemFcIjoge1xuXHRcdHU6IC0xODAsXG5cdFx0YzogW1xuXHRcdFx0XCJBUlwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvQXJnZW50aW5hL1Jpb19HYWxsZWdvc1wiOiB7XG5cdFx0dTogLTE4MCxcblx0XHRjOiBbXG5cdFx0XHRcIkFSXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9BcmdlbnRpbmEvU2FsdGFcIjoge1xuXHRcdHU6IC0xODAsXG5cdFx0YzogW1xuXHRcdFx0XCJBUlwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvQXJnZW50aW5hL1Nhbl9KdWFuXCI6IHtcblx0XHR1OiAtMTgwLFxuXHRcdGM6IFtcblx0XHRcdFwiQVJcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL0FyZ2VudGluYS9TYW5fTHVpc1wiOiB7XG5cdFx0dTogLTE4MCxcblx0XHRjOiBbXG5cdFx0XHRcIkFSXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9BcmdlbnRpbmEvVHVjdW1hblwiOiB7XG5cdFx0dTogLTE4MCxcblx0XHRjOiBbXG5cdFx0XHRcIkFSXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9BcmdlbnRpbmEvVXNodWFpYVwiOiB7XG5cdFx0dTogLTE4MCxcblx0XHRjOiBbXG5cdFx0XHRcIkFSXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9BcnViYVwiOiB7XG5cdFx0YTogXCJBbWVyaWNhL1B1ZXJ0b19SaWNvXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJBV1wiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiQW1lcmljYS9Bc3VuY2lvblwiOiB7XG5cdFx0dTogLTI0MCxcblx0XHRkOiAtMTgwLFxuXHRcdGM6IFtcblx0XHRcdFwiUFlcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL0F0aWtva2FuXCI6IHtcblx0XHRhOiBcIkFtZXJpY2EvUGFuYW1hXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJDQVwiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiQW1lcmljYS9BdGthXCI6IHtcblx0XHRhOiBcIkFtZXJpY2EvQWRha1wiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBbWVyaWNhL0JhaGlhXCI6IHtcblx0XHR1OiAtMTgwLFxuXHRcdGM6IFtcblx0XHRcdFwiQlJcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL0JhaGlhX0JhbmRlcmFzXCI6IHtcblx0XHR1OiAtMzYwLFxuXHRcdGQ6IC0zMDAsXG5cdFx0YzogW1xuXHRcdFx0XCJNWFwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvQmFyYmFkb3NcIjoge1xuXHRcdHU6IC0yNDAsXG5cdFx0YzogW1xuXHRcdFx0XCJCQlwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvQmVsZW1cIjoge1xuXHRcdHU6IC0xODAsXG5cdFx0YzogW1xuXHRcdFx0XCJCUlwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvQmVsaXplXCI6IHtcblx0XHR1OiAtMzYwLFxuXHRcdGM6IFtcblx0XHRcdFwiQlpcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL0JsYW5jLVNhYmxvblwiOiB7XG5cdFx0YTogXCJBbWVyaWNhL1B1ZXJ0b19SaWNvXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJDQVwiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiQW1lcmljYS9Cb2FfVmlzdGFcIjoge1xuXHRcdHU6IC0yNDAsXG5cdFx0YzogW1xuXHRcdFx0XCJCUlwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvQm9nb3RhXCI6IHtcblx0XHR1OiAtMzAwLFxuXHRcdGM6IFtcblx0XHRcdFwiQ09cIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL0JvaXNlXCI6IHtcblx0XHR1OiAtNDIwLFxuXHRcdGQ6IC0zNjAsXG5cdFx0YzogW1xuXHRcdFx0XCJVU1wiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvQnVlbm9zX0FpcmVzXCI6IHtcblx0XHRhOiBcIkFtZXJpY2EvQXJnZW50aW5hL0J1ZW5vc19BaXJlc1wiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBbWVyaWNhL0NhbWJyaWRnZV9CYXlcIjoge1xuXHRcdHU6IC00MjAsXG5cdFx0ZDogLTM2MCxcblx0XHRjOiBbXG5cdFx0XHRcIkNBXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9DYW1wb19HcmFuZGVcIjoge1xuXHRcdHU6IC0yNDAsXG5cdFx0YzogW1xuXHRcdFx0XCJCUlwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvQ2FuY3VuXCI6IHtcblx0XHR1OiAtMzAwLFxuXHRcdGM6IFtcblx0XHRcdFwiTVhcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL0NhcmFjYXNcIjoge1xuXHRcdHU6IC0yNDAsXG5cdFx0YzogW1xuXHRcdFx0XCJWRVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvQ2F0YW1hcmNhXCI6IHtcblx0XHRhOiBcIkFtZXJpY2EvQXJnZW50aW5hL0NhdGFtYXJjYVwiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBbWVyaWNhL0NheWVubmVcIjoge1xuXHRcdHU6IC0xODAsXG5cdFx0YzogW1xuXHRcdFx0XCJHRlwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvQ2F5bWFuXCI6IHtcblx0XHRhOiBcIkFtZXJpY2EvUGFuYW1hXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJLWVwiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiQW1lcmljYS9DaGljYWdvXCI6IHtcblx0XHR1OiAtMzYwLFxuXHRcdGQ6IC0zMDAsXG5cdFx0YzogW1xuXHRcdFx0XCJVU1wiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvQ2hpaHVhaHVhXCI6IHtcblx0XHR1OiAtNDIwLFxuXHRcdGQ6IC0zNjAsXG5cdFx0YzogW1xuXHRcdFx0XCJNWFwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvQ29yYWxfSGFyYm91clwiOiB7XG5cdFx0YTogXCJBbWVyaWNhL1BhbmFtYVwiLFxuXHRcdGM6IFtcblx0XHRcdFwiQ0FcIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFtZXJpY2EvQ29yZG9iYVwiOiB7XG5cdFx0YTogXCJBbWVyaWNhL0FyZ2VudGluYS9Db3Jkb2JhXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFtZXJpY2EvQ29zdGFfUmljYVwiOiB7XG5cdFx0dTogLTM2MCxcblx0XHRjOiBbXG5cdFx0XHRcIkNSXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9DcmVzdG9uXCI6IHtcblx0XHRhOiBcIkFtZXJpY2EvUGhvZW5peFwiLFxuXHRcdGM6IFtcblx0XHRcdFwiQ0FcIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFtZXJpY2EvQ3VpYWJhXCI6IHtcblx0XHR1OiAtMjQwLFxuXHRcdGM6IFtcblx0XHRcdFwiQlJcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL0N1cmFjYW9cIjoge1xuXHRcdGE6IFwiQW1lcmljYS9QdWVydG9fUmljb1wiLFxuXHRcdGM6IFtcblx0XHRcdFwiQ1dcIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFtZXJpY2EvRGFubWFya3NoYXZuXCI6IHtcblx0XHR1OiAwLFxuXHRcdGM6IFtcblx0XHRcdFwiR0xcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL0Rhd3NvblwiOiB7XG5cdFx0dTogLTQyMCxcblx0XHRjOiBbXG5cdFx0XHRcIkNBXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9EYXdzb25fQ3JlZWtcIjoge1xuXHRcdHU6IC00MjAsXG5cdFx0YzogW1xuXHRcdFx0XCJDQVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvRGVudmVyXCI6IHtcblx0XHR1OiAtNDIwLFxuXHRcdGQ6IC0zNjAsXG5cdFx0YzogW1xuXHRcdFx0XCJVU1wiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvRGV0cm9pdFwiOiB7XG5cdFx0dTogLTMwMCxcblx0XHRkOiAtMjQwLFxuXHRcdGM6IFtcblx0XHRcdFwiVVNcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL0RvbWluaWNhXCI6IHtcblx0XHRhOiBcIkFtZXJpY2EvUHVlcnRvX1JpY29cIixcblx0XHRjOiBbXG5cdFx0XHRcIkRNXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBbWVyaWNhL0VkbW9udG9uXCI6IHtcblx0XHR1OiAtNDIwLFxuXHRcdGQ6IC0zNjAsXG5cdFx0YzogW1xuXHRcdFx0XCJDQVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvRWlydW5lcGVcIjoge1xuXHRcdHU6IC0zMDAsXG5cdFx0YzogW1xuXHRcdFx0XCJCUlwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvRWxfU2FsdmFkb3JcIjoge1xuXHRcdHU6IC0zNjAsXG5cdFx0YzogW1xuXHRcdFx0XCJTVlwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvRW5zZW5hZGFcIjoge1xuXHRcdGE6IFwiQW1lcmljYS9UaWp1YW5hXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFtZXJpY2EvRm9ydF9OZWxzb25cIjoge1xuXHRcdHU6IC00MjAsXG5cdFx0YzogW1xuXHRcdFx0XCJDQVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvRm9ydF9XYXluZVwiOiB7XG5cdFx0YTogXCJBbWVyaWNhL0luZGlhbmEvSW5kaWFuYXBvbGlzXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFtZXJpY2EvRm9ydGFsZXphXCI6IHtcblx0XHR1OiAtMTgwLFxuXHRcdGM6IFtcblx0XHRcdFwiQlJcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL0dsYWNlX0JheVwiOiB7XG5cdFx0dTogLTI0MCxcblx0XHRkOiAtMTgwLFxuXHRcdGM6IFtcblx0XHRcdFwiQ0FcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL0dvZHRoYWJcIjoge1xuXHRcdGE6IFwiQW1lcmljYS9OdXVrXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFtZXJpY2EvR29vc2VfQmF5XCI6IHtcblx0XHR1OiAtMjQwLFxuXHRcdGQ6IC0xODAsXG5cdFx0YzogW1xuXHRcdFx0XCJDQVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvR3JhbmRfVHVya1wiOiB7XG5cdFx0dTogLTMwMCxcblx0XHRkOiAtMjQwLFxuXHRcdGM6IFtcblx0XHRcdFwiVENcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL0dyZW5hZGFcIjoge1xuXHRcdGE6IFwiQW1lcmljYS9QdWVydG9fUmljb1wiLFxuXHRcdGM6IFtcblx0XHRcdFwiR0RcIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFtZXJpY2EvR3VhZGVsb3VwZVwiOiB7XG5cdFx0YTogXCJBbWVyaWNhL1B1ZXJ0b19SaWNvXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJHUFwiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiQW1lcmljYS9HdWF0ZW1hbGFcIjoge1xuXHRcdHU6IC0zNjAsXG5cdFx0YzogW1xuXHRcdFx0XCJHVFwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvR3VheWFxdWlsXCI6IHtcblx0XHR1OiAtMzAwLFxuXHRcdGM6IFtcblx0XHRcdFwiRUNcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL0d1eWFuYVwiOiB7XG5cdFx0dTogLTI0MCxcblx0XHRjOiBbXG5cdFx0XHRcIkdZXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9IYWxpZmF4XCI6IHtcblx0XHR1OiAtMjQwLFxuXHRcdGQ6IC0xODAsXG5cdFx0YzogW1xuXHRcdFx0XCJDQVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvSGF2YW5hXCI6IHtcblx0XHR1OiAtMzAwLFxuXHRcdGQ6IC0yNDAsXG5cdFx0YzogW1xuXHRcdFx0XCJDVVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvSGVybW9zaWxsb1wiOiB7XG5cdFx0dTogLTQyMCxcblx0XHRjOiBbXG5cdFx0XHRcIk1YXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9JbmRpYW5hL0luZGlhbmFwb2xpc1wiOiB7XG5cdFx0dTogLTMwMCxcblx0XHRkOiAtMjQwLFxuXHRcdGM6IFtcblx0XHRcdFwiVVNcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL0luZGlhbmEvS25veFwiOiB7XG5cdFx0dTogLTM2MCxcblx0XHRkOiAtMzAwLFxuXHRcdGM6IFtcblx0XHRcdFwiVVNcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL0luZGlhbmEvTWFyZW5nb1wiOiB7XG5cdFx0dTogLTMwMCxcblx0XHRkOiAtMjQwLFxuXHRcdGM6IFtcblx0XHRcdFwiVVNcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL0luZGlhbmEvUGV0ZXJzYnVyZ1wiOiB7XG5cdFx0dTogLTMwMCxcblx0XHRkOiAtMjQwLFxuXHRcdGM6IFtcblx0XHRcdFwiVVNcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL0luZGlhbmEvVGVsbF9DaXR5XCI6IHtcblx0XHR1OiAtMzYwLFxuXHRcdGQ6IC0zMDAsXG5cdFx0YzogW1xuXHRcdFx0XCJVU1wiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvSW5kaWFuYS9WZXZheVwiOiB7XG5cdFx0dTogLTMwMCxcblx0XHRkOiAtMjQwLFxuXHRcdGM6IFtcblx0XHRcdFwiVVNcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL0luZGlhbmEvVmluY2VubmVzXCI6IHtcblx0XHR1OiAtMzAwLFxuXHRcdGQ6IC0yNDAsXG5cdFx0YzogW1xuXHRcdFx0XCJVU1wiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvSW5kaWFuYS9XaW5hbWFjXCI6IHtcblx0XHR1OiAtMzAwLFxuXHRcdGQ6IC0yNDAsXG5cdFx0YzogW1xuXHRcdFx0XCJVU1wiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvSW5kaWFuYXBvbGlzXCI6IHtcblx0XHRhOiBcIkFtZXJpY2EvSW5kaWFuYS9JbmRpYW5hcG9saXNcIixcblx0XHRyOiAxXG5cdH0sXG5cdFwiQW1lcmljYS9JbnV2aWtcIjoge1xuXHRcdHU6IC00MjAsXG5cdFx0ZDogLTM2MCxcblx0XHRjOiBbXG5cdFx0XHRcIkNBXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9JcWFsdWl0XCI6IHtcblx0XHR1OiAtMzAwLFxuXHRcdGQ6IC0yNDAsXG5cdFx0YzogW1xuXHRcdFx0XCJDQVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvSmFtYWljYVwiOiB7XG5cdFx0dTogLTMwMCxcblx0XHRjOiBbXG5cdFx0XHRcIkpNXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9KdWp1eVwiOiB7XG5cdFx0YTogXCJBbWVyaWNhL0FyZ2VudGluYS9KdWp1eVwiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBbWVyaWNhL0p1bmVhdVwiOiB7XG5cdFx0dTogLTU0MCxcblx0XHRkOiAtNDgwLFxuXHRcdGM6IFtcblx0XHRcdFwiVVNcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL0tlbnR1Y2t5L0xvdWlzdmlsbGVcIjoge1xuXHRcdHU6IC0zMDAsXG5cdFx0ZDogLTI0MCxcblx0XHRjOiBbXG5cdFx0XHRcIlVTXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9LZW50dWNreS9Nb250aWNlbGxvXCI6IHtcblx0XHR1OiAtMzAwLFxuXHRcdGQ6IC0yNDAsXG5cdFx0YzogW1xuXHRcdFx0XCJVU1wiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvS25veF9JTlwiOiB7XG5cdFx0YTogXCJBbWVyaWNhL0luZGlhbmEvS25veFwiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBbWVyaWNhL0tyYWxlbmRpamtcIjoge1xuXHRcdGE6IFwiQW1lcmljYS9QdWVydG9fUmljb1wiLFxuXHRcdGM6IFtcblx0XHRcdFwiQlFcIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFtZXJpY2EvTGFfUGF6XCI6IHtcblx0XHR1OiAtMjQwLFxuXHRcdGM6IFtcblx0XHRcdFwiQk9cIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL0xpbWFcIjoge1xuXHRcdHU6IC0zMDAsXG5cdFx0YzogW1xuXHRcdFx0XCJQRVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvTG9zX0FuZ2VsZXNcIjoge1xuXHRcdHU6IC00ODAsXG5cdFx0ZDogLTQyMCxcblx0XHRjOiBbXG5cdFx0XHRcIlVTXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9Mb3Vpc3ZpbGxlXCI6IHtcblx0XHRhOiBcIkFtZXJpY2EvS2VudHVja3kvTG91aXN2aWxsZVwiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBbWVyaWNhL0xvd2VyX1ByaW5jZXNcIjoge1xuXHRcdGE6IFwiQW1lcmljYS9QdWVydG9fUmljb1wiLFxuXHRcdGM6IFtcblx0XHRcdFwiU1hcIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFtZXJpY2EvTWFjZWlvXCI6IHtcblx0XHR1OiAtMTgwLFxuXHRcdGM6IFtcblx0XHRcdFwiQlJcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL01hbmFndWFcIjoge1xuXHRcdHU6IC0zNjAsXG5cdFx0YzogW1xuXHRcdFx0XCJOSVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvTWFuYXVzXCI6IHtcblx0XHR1OiAtMjQwLFxuXHRcdGM6IFtcblx0XHRcdFwiQlJcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL01hcmlnb3RcIjoge1xuXHRcdGE6IFwiQW1lcmljYS9QdWVydG9fUmljb1wiLFxuXHRcdGM6IFtcblx0XHRcdFwiTUZcIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFtZXJpY2EvTWFydGluaXF1ZVwiOiB7XG5cdFx0dTogLTI0MCxcblx0XHRjOiBbXG5cdFx0XHRcIk1RXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9NYXRhbW9yb3NcIjoge1xuXHRcdHU6IC0zNjAsXG5cdFx0ZDogLTMwMCxcblx0XHRjOiBbXG5cdFx0XHRcIk1YXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9NYXphdGxhblwiOiB7XG5cdFx0dTogLTQyMCxcblx0XHRkOiAtMzYwLFxuXHRcdGM6IFtcblx0XHRcdFwiTVhcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL01lbmRvemFcIjoge1xuXHRcdGE6IFwiQW1lcmljYS9BcmdlbnRpbmEvTWVuZG96YVwiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBbWVyaWNhL01lbm9taW5lZVwiOiB7XG5cdFx0dTogLTM2MCxcblx0XHRkOiAtMzAwLFxuXHRcdGM6IFtcblx0XHRcdFwiVVNcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL01lcmlkYVwiOiB7XG5cdFx0dTogLTM2MCxcblx0XHRkOiAtMzAwLFxuXHRcdGM6IFtcblx0XHRcdFwiTVhcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL01ldGxha2F0bGFcIjoge1xuXHRcdHU6IC01NDAsXG5cdFx0ZDogLTQ4MCxcblx0XHRjOiBbXG5cdFx0XHRcIlVTXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9NZXhpY29fQ2l0eVwiOiB7XG5cdFx0dTogLTM2MCxcblx0XHRkOiAtMzAwLFxuXHRcdGM6IFtcblx0XHRcdFwiTVhcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL01pcXVlbG9uXCI6IHtcblx0XHR1OiAtMTgwLFxuXHRcdGQ6IC0xMjAsXG5cdFx0YzogW1xuXHRcdFx0XCJQTVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvTW9uY3RvblwiOiB7XG5cdFx0dTogLTI0MCxcblx0XHRkOiAtMTgwLFxuXHRcdGM6IFtcblx0XHRcdFwiQ0FcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL01vbnRlcnJleVwiOiB7XG5cdFx0dTogLTM2MCxcblx0XHRkOiAtMzAwLFxuXHRcdGM6IFtcblx0XHRcdFwiTVhcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL01vbnRldmlkZW9cIjoge1xuXHRcdHU6IC0xODAsXG5cdFx0YzogW1xuXHRcdFx0XCJVWVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvTW9udHJlYWxcIjoge1xuXHRcdGE6IFwiQW1lcmljYS9Ub3JvbnRvXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJDQVwiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiQW1lcmljYS9Nb250c2VycmF0XCI6IHtcblx0XHRhOiBcIkFtZXJpY2EvUHVlcnRvX1JpY29cIixcblx0XHRjOiBbXG5cdFx0XHRcIk1TXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBbWVyaWNhL05hc3NhdVwiOiB7XG5cdFx0YTogXCJBbWVyaWNhL1Rvcm9udG9cIixcblx0XHRjOiBbXG5cdFx0XHRcIkJTXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBbWVyaWNhL05ld19Zb3JrXCI6IHtcblx0XHR1OiAtMzAwLFxuXHRcdGQ6IC0yNDAsXG5cdFx0YzogW1xuXHRcdFx0XCJVU1wiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvTmlwaWdvblwiOiB7XG5cdFx0dTogLTMwMCxcblx0XHRkOiAtMjQwLFxuXHRcdGM6IFtcblx0XHRcdFwiQ0FcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL05vbWVcIjoge1xuXHRcdHU6IC01NDAsXG5cdFx0ZDogLTQ4MCxcblx0XHRjOiBbXG5cdFx0XHRcIlVTXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9Ob3JvbmhhXCI6IHtcblx0XHR1OiAtMTIwLFxuXHRcdGM6IFtcblx0XHRcdFwiQlJcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL05vcnRoX0Rha290YS9CZXVsYWhcIjoge1xuXHRcdHU6IC0zNjAsXG5cdFx0ZDogLTMwMCxcblx0XHRjOiBbXG5cdFx0XHRcIlVTXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9Ob3J0aF9EYWtvdGEvQ2VudGVyXCI6IHtcblx0XHR1OiAtMzYwLFxuXHRcdGQ6IC0zMDAsXG5cdFx0YzogW1xuXHRcdFx0XCJVU1wiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvTm9ydGhfRGFrb3RhL05ld19TYWxlbVwiOiB7XG5cdFx0dTogLTM2MCxcblx0XHRkOiAtMzAwLFxuXHRcdGM6IFtcblx0XHRcdFwiVVNcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL051dWtcIjoge1xuXHRcdHU6IC0xODAsXG5cdFx0ZDogLTEyMCxcblx0XHRjOiBbXG5cdFx0XHRcIkdMXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9PamluYWdhXCI6IHtcblx0XHR1OiAtNDIwLFxuXHRcdGQ6IC0zNjAsXG5cdFx0YzogW1xuXHRcdFx0XCJNWFwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvUGFuYW1hXCI6IHtcblx0XHR1OiAtMzAwLFxuXHRcdGM6IFtcblx0XHRcdFwiUEFcIixcblx0XHRcdFwiQ0FcIixcblx0XHRcdFwiS1lcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL1BhbmduaXJ0dW5nXCI6IHtcblx0XHR1OiAtMzAwLFxuXHRcdGQ6IC0yNDAsXG5cdFx0YzogW1xuXHRcdFx0XCJDQVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvUGFyYW1hcmlib1wiOiB7XG5cdFx0dTogLTE4MCxcblx0XHRjOiBbXG5cdFx0XHRcIlNSXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9QaG9lbml4XCI6IHtcblx0XHR1OiAtNDIwLFxuXHRcdGM6IFtcblx0XHRcdFwiVVNcIixcblx0XHRcdFwiQ0FcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL1BvcnQtYXUtUHJpbmNlXCI6IHtcblx0XHR1OiAtMzAwLFxuXHRcdGQ6IC0yNDAsXG5cdFx0YzogW1xuXHRcdFx0XCJIVFwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvUG9ydF9vZl9TcGFpblwiOiB7XG5cdFx0YTogXCJBbWVyaWNhL1B1ZXJ0b19SaWNvXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJUVFwiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiQW1lcmljYS9Qb3J0b19BY3JlXCI6IHtcblx0XHRhOiBcIkFtZXJpY2EvUmlvX0JyYW5jb1wiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBbWVyaWNhL1BvcnRvX1ZlbGhvXCI6IHtcblx0XHR1OiAtMjQwLFxuXHRcdGM6IFtcblx0XHRcdFwiQlJcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL1B1ZXJ0b19SaWNvXCI6IHtcblx0XHR1OiAtMjQwLFxuXHRcdGM6IFtcblx0XHRcdFwiUFJcIixcblx0XHRcdFwiQUdcIixcblx0XHRcdFwiQ0FcIixcblx0XHRcdFwiQUlcIixcblx0XHRcdFwiQVdcIixcblx0XHRcdFwiQkxcIixcblx0XHRcdFwiQlFcIixcblx0XHRcdFwiQ1dcIixcblx0XHRcdFwiRE1cIixcblx0XHRcdFwiR0RcIixcblx0XHRcdFwiR1BcIixcblx0XHRcdFwiS05cIixcblx0XHRcdFwiTENcIixcblx0XHRcdFwiTUZcIixcblx0XHRcdFwiTVNcIixcblx0XHRcdFwiU1hcIixcblx0XHRcdFwiVFRcIixcblx0XHRcdFwiVkNcIixcblx0XHRcdFwiVkdcIixcblx0XHRcdFwiVklcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL1B1bnRhX0FyZW5hc1wiOiB7XG5cdFx0dTogLTE4MCxcblx0XHRjOiBbXG5cdFx0XHRcIkNMXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9SYWlueV9SaXZlclwiOiB7XG5cdFx0dTogLTM2MCxcblx0XHRkOiAtMzAwLFxuXHRcdGM6IFtcblx0XHRcdFwiQ0FcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL1Jhbmtpbl9JbmxldFwiOiB7XG5cdFx0dTogLTM2MCxcblx0XHRkOiAtMzAwLFxuXHRcdGM6IFtcblx0XHRcdFwiQ0FcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL1JlY2lmZVwiOiB7XG5cdFx0dTogLTE4MCxcblx0XHRjOiBbXG5cdFx0XHRcIkJSXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9SZWdpbmFcIjoge1xuXHRcdHU6IC0zNjAsXG5cdFx0YzogW1xuXHRcdFx0XCJDQVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvUmVzb2x1dGVcIjoge1xuXHRcdHU6IC0zNjAsXG5cdFx0ZDogLTMwMCxcblx0XHRjOiBbXG5cdFx0XHRcIkNBXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9SaW9fQnJhbmNvXCI6IHtcblx0XHR1OiAtMzAwLFxuXHRcdGM6IFtcblx0XHRcdFwiQlJcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL1Jvc2FyaW9cIjoge1xuXHRcdGE6IFwiQW1lcmljYS9BcmdlbnRpbmEvQ29yZG9iYVwiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBbWVyaWNhL1NhbnRhX0lzYWJlbFwiOiB7XG5cdFx0YTogXCJBbWVyaWNhL1RpanVhbmFcIixcblx0XHRyOiAxXG5cdH0sXG5cdFwiQW1lcmljYS9TYW50YXJlbVwiOiB7XG5cdFx0dTogLTE4MCxcblx0XHRjOiBbXG5cdFx0XHRcIkJSXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9TYW50aWFnb1wiOiB7XG5cdFx0dTogLTI0MCxcblx0XHRkOiAtMTgwLFxuXHRcdGM6IFtcblx0XHRcdFwiQ0xcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL1NhbnRvX0RvbWluZ29cIjoge1xuXHRcdHU6IC0yNDAsXG5cdFx0YzogW1xuXHRcdFx0XCJET1wiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvU2FvX1BhdWxvXCI6IHtcblx0XHR1OiAtMTgwLFxuXHRcdGM6IFtcblx0XHRcdFwiQlJcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL1Njb3Jlc2J5c3VuZFwiOiB7XG5cdFx0dTogLTYwLFxuXHRcdGQ6IDAsXG5cdFx0YzogW1xuXHRcdFx0XCJHTFwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvU2hpcHJvY2tcIjoge1xuXHRcdGE6IFwiQW1lcmljYS9EZW52ZXJcIixcblx0XHRyOiAxXG5cdH0sXG5cdFwiQW1lcmljYS9TaXRrYVwiOiB7XG5cdFx0dTogLTU0MCxcblx0XHRkOiAtNDgwLFxuXHRcdGM6IFtcblx0XHRcdFwiVVNcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL1N0X0JhcnRoZWxlbXlcIjoge1xuXHRcdGE6IFwiQW1lcmljYS9QdWVydG9fUmljb1wiLFxuXHRcdGM6IFtcblx0XHRcdFwiQkxcIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFtZXJpY2EvU3RfSm9obnNcIjoge1xuXHRcdHU6IC0xNTAsXG5cdFx0ZDogLTkwLFxuXHRcdGM6IFtcblx0XHRcdFwiQ0FcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL1N0X0tpdHRzXCI6IHtcblx0XHRhOiBcIkFtZXJpY2EvUHVlcnRvX1JpY29cIixcblx0XHRjOiBbXG5cdFx0XHRcIktOXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBbWVyaWNhL1N0X0x1Y2lhXCI6IHtcblx0XHRhOiBcIkFtZXJpY2EvUHVlcnRvX1JpY29cIixcblx0XHRjOiBbXG5cdFx0XHRcIkxDXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBbWVyaWNhL1N0X1Rob21hc1wiOiB7XG5cdFx0YTogXCJBbWVyaWNhL1B1ZXJ0b19SaWNvXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJWSVwiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiQW1lcmljYS9TdF9WaW5jZW50XCI6IHtcblx0XHRhOiBcIkFtZXJpY2EvUHVlcnRvX1JpY29cIixcblx0XHRjOiBbXG5cdFx0XHRcIlZDXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBbWVyaWNhL1N3aWZ0X0N1cnJlbnRcIjoge1xuXHRcdHU6IC0zNjAsXG5cdFx0YzogW1xuXHRcdFx0XCJDQVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvVGVndWNpZ2FscGFcIjoge1xuXHRcdHU6IC0zNjAsXG5cdFx0YzogW1xuXHRcdFx0XCJITlwiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvVGh1bGVcIjoge1xuXHRcdHU6IC0yNDAsXG5cdFx0ZDogLTE4MCxcblx0XHRjOiBbXG5cdFx0XHRcIkdMXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9UaHVuZGVyX0JheVwiOiB7XG5cdFx0dTogLTMwMCxcblx0XHRkOiAtMjQwLFxuXHRcdGM6IFtcblx0XHRcdFwiQ0FcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL1RpanVhbmFcIjoge1xuXHRcdHU6IC00ODAsXG5cdFx0ZDogLTQyMCxcblx0XHRjOiBbXG5cdFx0XHRcIk1YXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9Ub3JvbnRvXCI6IHtcblx0XHR1OiAtMzAwLFxuXHRcdGQ6IC0yNDAsXG5cdFx0YzogW1xuXHRcdFx0XCJDQVwiLFxuXHRcdFx0XCJCU1wiXG5cdFx0XVxuXHR9LFxuXHRcIkFtZXJpY2EvVG9ydG9sYVwiOiB7XG5cdFx0YTogXCJBbWVyaWNhL1B1ZXJ0b19SaWNvXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJWR1wiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiQW1lcmljYS9WYW5jb3V2ZXJcIjoge1xuXHRcdHU6IC00ODAsXG5cdFx0ZDogLTQyMCxcblx0XHRjOiBbXG5cdFx0XHRcIkNBXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9WaXJnaW5cIjoge1xuXHRcdGE6IFwiQW1lcmljYS9QdWVydG9fUmljb1wiLFxuXHRcdGM6IFtcblx0XHRcdFwiVklcIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFtZXJpY2EvV2hpdGVob3JzZVwiOiB7XG5cdFx0dTogLTQyMCxcblx0XHRjOiBbXG5cdFx0XHRcIkNBXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9XaW5uaXBlZ1wiOiB7XG5cdFx0dTogLTM2MCxcblx0XHRkOiAtMzAwLFxuXHRcdGM6IFtcblx0XHRcdFwiQ0FcIlxuXHRcdF1cblx0fSxcblx0XCJBbWVyaWNhL1lha3V0YXRcIjoge1xuXHRcdHU6IC01NDAsXG5cdFx0ZDogLTQ4MCxcblx0XHRjOiBbXG5cdFx0XHRcIlVTXCJcblx0XHRdXG5cdH0sXG5cdFwiQW1lcmljYS9ZZWxsb3drbmlmZVwiOiB7XG5cdFx0dTogLTQyMCxcblx0XHRkOiAtMzYwLFxuXHRcdGM6IFtcblx0XHRcdFwiQ0FcIlxuXHRcdF1cblx0fSxcblx0XCJBbnRhcmN0aWNhL0Nhc2V5XCI6IHtcblx0XHR1OiA2NjAsXG5cdFx0YzogW1xuXHRcdFx0XCJBUVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFudGFyY3RpY2EvRGF2aXNcIjoge1xuXHRcdHU6IDQyMCxcblx0XHRjOiBbXG5cdFx0XHRcIkFRXCJcblx0XHRdXG5cdH0sXG5cdFwiQW50YXJjdGljYS9EdW1vbnREVXJ2aWxsZVwiOiB7XG5cdFx0YTogXCJQYWNpZmljL1BvcnRfTW9yZXNieVwiLFxuXHRcdGM6IFtcblx0XHRcdFwiQVFcIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFudGFyY3RpY2EvTWFjcXVhcmllXCI6IHtcblx0XHR1OiA2MDAsXG5cdFx0ZDogNjYwLFxuXHRcdGM6IFtcblx0XHRcdFwiQVVcIlxuXHRcdF1cblx0fSxcblx0XCJBbnRhcmN0aWNhL01hd3NvblwiOiB7XG5cdFx0dTogMzAwLFxuXHRcdGM6IFtcblx0XHRcdFwiQVFcIlxuXHRcdF1cblx0fSxcblx0XCJBbnRhcmN0aWNhL01jTXVyZG9cIjoge1xuXHRcdGE6IFwiUGFjaWZpYy9BdWNrbGFuZFwiLFxuXHRcdGM6IFtcblx0XHRcdFwiQVFcIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFudGFyY3RpY2EvUGFsbWVyXCI6IHtcblx0XHR1OiAtMTgwLFxuXHRcdGM6IFtcblx0XHRcdFwiQVFcIlxuXHRcdF1cblx0fSxcblx0XCJBbnRhcmN0aWNhL1JvdGhlcmFcIjoge1xuXHRcdHU6IC0xODAsXG5cdFx0YzogW1xuXHRcdFx0XCJBUVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFudGFyY3RpY2EvU291dGhfUG9sZVwiOiB7XG5cdFx0YTogXCJQYWNpZmljL0F1Y2tsYW5kXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJBUVwiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiQW50YXJjdGljYS9TeW93YVwiOiB7XG5cdFx0YTogXCJBc2lhL1JpeWFkaFwiLFxuXHRcdGM6IFtcblx0XHRcdFwiQVFcIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFudGFyY3RpY2EvVHJvbGxcIjoge1xuXHRcdHU6IDAsXG5cdFx0ZDogMTIwLFxuXHRcdGM6IFtcblx0XHRcdFwiQVFcIlxuXHRcdF1cblx0fSxcblx0XCJBbnRhcmN0aWNhL1Zvc3Rva1wiOiB7XG5cdFx0dTogMzYwLFxuXHRcdGM6IFtcblx0XHRcdFwiQVFcIlxuXHRcdF1cblx0fSxcblx0XCJBcmN0aWMvTG9uZ3llYXJieWVuXCI6IHtcblx0XHRhOiBcIkV1cm9wZS9Pc2xvXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJTSlwiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiQXNpYS9BZGVuXCI6IHtcblx0XHRhOiBcIkFzaWEvUml5YWRoXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJZRVwiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiQXNpYS9BbG1hdHlcIjoge1xuXHRcdHU6IDM2MCxcblx0XHRjOiBbXG5cdFx0XHRcIktaXCJcblx0XHRdXG5cdH0sXG5cdFwiQXNpYS9BbW1hblwiOiB7XG5cdFx0dTogMTIwLFxuXHRcdGQ6IDE4MCxcblx0XHRjOiBbXG5cdFx0XHRcIkpPXCJcblx0XHRdXG5cdH0sXG5cdFwiQXNpYS9BbmFkeXJcIjoge1xuXHRcdHU6IDcyMCxcblx0XHRjOiBbXG5cdFx0XHRcIlJVXCJcblx0XHRdXG5cdH0sXG5cdFwiQXNpYS9BcXRhdVwiOiB7XG5cdFx0dTogMzAwLFxuXHRcdGM6IFtcblx0XHRcdFwiS1pcIlxuXHRcdF1cblx0fSxcblx0XCJBc2lhL0FxdG9iZVwiOiB7XG5cdFx0dTogMzAwLFxuXHRcdGM6IFtcblx0XHRcdFwiS1pcIlxuXHRcdF1cblx0fSxcblx0XCJBc2lhL0FzaGdhYmF0XCI6IHtcblx0XHR1OiAzMDAsXG5cdFx0YzogW1xuXHRcdFx0XCJUTVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFzaWEvQXNoa2hhYmFkXCI6IHtcblx0XHRhOiBcIkFzaWEvQXNoZ2FiYXRcIixcblx0XHRyOiAxXG5cdH0sXG5cdFwiQXNpYS9BdHlyYXVcIjoge1xuXHRcdHU6IDMwMCxcblx0XHRjOiBbXG5cdFx0XHRcIktaXCJcblx0XHRdXG5cdH0sXG5cdFwiQXNpYS9CYWdoZGFkXCI6IHtcblx0XHR1OiAxODAsXG5cdFx0YzogW1xuXHRcdFx0XCJJUVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFzaWEvQmFocmFpblwiOiB7XG5cdFx0YTogXCJBc2lhL1FhdGFyXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJCSFwiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiQXNpYS9CYWt1XCI6IHtcblx0XHR1OiAyNDAsXG5cdFx0YzogW1xuXHRcdFx0XCJBWlwiXG5cdFx0XVxuXHR9LFxuXHRcIkFzaWEvQmFuZ2tva1wiOiB7XG5cdFx0dTogNDIwLFxuXHRcdGM6IFtcblx0XHRcdFwiVEhcIixcblx0XHRcdFwiS0hcIixcblx0XHRcdFwiTEFcIixcblx0XHRcdFwiVk5cIlxuXHRcdF1cblx0fSxcblx0XCJBc2lhL0Jhcm5hdWxcIjoge1xuXHRcdHU6IDQyMCxcblx0XHRjOiBbXG5cdFx0XHRcIlJVXCJcblx0XHRdXG5cdH0sXG5cdFwiQXNpYS9CZWlydXRcIjoge1xuXHRcdHU6IDEyMCxcblx0XHRkOiAxODAsXG5cdFx0YzogW1xuXHRcdFx0XCJMQlwiXG5cdFx0XVxuXHR9LFxuXHRcIkFzaWEvQmlzaGtla1wiOiB7XG5cdFx0dTogMzYwLFxuXHRcdGM6IFtcblx0XHRcdFwiS0dcIlxuXHRcdF1cblx0fSxcblx0XCJBc2lhL0JydW5laVwiOiB7XG5cdFx0dTogNDgwLFxuXHRcdGM6IFtcblx0XHRcdFwiQk5cIlxuXHRcdF1cblx0fSxcblx0XCJBc2lhL0NhbGN1dHRhXCI6IHtcblx0XHRhOiBcIkFzaWEvS29sa2F0YVwiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBc2lhL0NoaXRhXCI6IHtcblx0XHR1OiA1NDAsXG5cdFx0YzogW1xuXHRcdFx0XCJSVVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFzaWEvQ2hvaWJhbHNhblwiOiB7XG5cdFx0dTogNDgwLFxuXHRcdGM6IFtcblx0XHRcdFwiTU5cIlxuXHRcdF1cblx0fSxcblx0XCJBc2lhL0Nob25ncWluZ1wiOiB7XG5cdFx0YTogXCJBc2lhL1NoYW5naGFpXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFzaWEvQ2h1bmdraW5nXCI6IHtcblx0XHRhOiBcIkFzaWEvU2hhbmdoYWlcIixcblx0XHRyOiAxXG5cdH0sXG5cdFwiQXNpYS9Db2xvbWJvXCI6IHtcblx0XHR1OiAzMzAsXG5cdFx0YzogW1xuXHRcdFx0XCJMS1wiXG5cdFx0XVxuXHR9LFxuXHRcIkFzaWEvRGFjY2FcIjoge1xuXHRcdGE6IFwiQXNpYS9EaGFrYVwiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBc2lhL0RhbWFzY3VzXCI6IHtcblx0XHR1OiAxMjAsXG5cdFx0ZDogMTgwLFxuXHRcdGM6IFtcblx0XHRcdFwiU1lcIlxuXHRcdF1cblx0fSxcblx0XCJBc2lhL0RoYWthXCI6IHtcblx0XHR1OiAzNjAsXG5cdFx0YzogW1xuXHRcdFx0XCJCRFwiXG5cdFx0XVxuXHR9LFxuXHRcIkFzaWEvRGlsaVwiOiB7XG5cdFx0dTogNTQwLFxuXHRcdGM6IFtcblx0XHRcdFwiVExcIlxuXHRcdF1cblx0fSxcblx0XCJBc2lhL0R1YmFpXCI6IHtcblx0XHR1OiAyNDAsXG5cdFx0YzogW1xuXHRcdFx0XCJBRVwiLFxuXHRcdFx0XCJPTVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFzaWEvRHVzaGFuYmVcIjoge1xuXHRcdHU6IDMwMCxcblx0XHRjOiBbXG5cdFx0XHRcIlRKXCJcblx0XHRdXG5cdH0sXG5cdFwiQXNpYS9GYW1hZ3VzdGFcIjoge1xuXHRcdHU6IDEyMCxcblx0XHRkOiAxODAsXG5cdFx0YzogW1xuXHRcdFx0XCJDWVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFzaWEvR2F6YVwiOiB7XG5cdFx0dTogMTIwLFxuXHRcdGQ6IDE4MCxcblx0XHRjOiBbXG5cdFx0XHRcIlBTXCJcblx0XHRdXG5cdH0sXG5cdFwiQXNpYS9IYXJiaW5cIjoge1xuXHRcdGE6IFwiQXNpYS9TaGFuZ2hhaVwiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBc2lhL0hlYnJvblwiOiB7XG5cdFx0dTogMTIwLFxuXHRcdGQ6IDE4MCxcblx0XHRjOiBbXG5cdFx0XHRcIlBTXCJcblx0XHRdXG5cdH0sXG5cdFwiQXNpYS9Ib19DaGlfTWluaFwiOiB7XG5cdFx0dTogNDIwLFxuXHRcdGM6IFtcblx0XHRcdFwiVk5cIlxuXHRcdF1cblx0fSxcblx0XCJBc2lhL0hvbmdfS29uZ1wiOiB7XG5cdFx0dTogNDgwLFxuXHRcdGM6IFtcblx0XHRcdFwiSEtcIlxuXHRcdF1cblx0fSxcblx0XCJBc2lhL0hvdmRcIjoge1xuXHRcdHU6IDQyMCxcblx0XHRjOiBbXG5cdFx0XHRcIk1OXCJcblx0XHRdXG5cdH0sXG5cdFwiQXNpYS9Jcmt1dHNrXCI6IHtcblx0XHR1OiA0ODAsXG5cdFx0YzogW1xuXHRcdFx0XCJSVVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFzaWEvSXN0YW5idWxcIjoge1xuXHRcdGE6IFwiRXVyb3BlL0lzdGFuYnVsXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFzaWEvSmFrYXJ0YVwiOiB7XG5cdFx0dTogNDIwLFxuXHRcdGM6IFtcblx0XHRcdFwiSURcIlxuXHRcdF1cblx0fSxcblx0XCJBc2lhL0pheWFwdXJhXCI6IHtcblx0XHR1OiA1NDAsXG5cdFx0YzogW1xuXHRcdFx0XCJJRFwiXG5cdFx0XVxuXHR9LFxuXHRcIkFzaWEvSmVydXNhbGVtXCI6IHtcblx0XHR1OiAxMjAsXG5cdFx0ZDogMTgwLFxuXHRcdGM6IFtcblx0XHRcdFwiSUxcIlxuXHRcdF1cblx0fSxcblx0XCJBc2lhL0thYnVsXCI6IHtcblx0XHR1OiAyNzAsXG5cdFx0YzogW1xuXHRcdFx0XCJBRlwiXG5cdFx0XVxuXHR9LFxuXHRcIkFzaWEvS2FtY2hhdGthXCI6IHtcblx0XHR1OiA3MjAsXG5cdFx0YzogW1xuXHRcdFx0XCJSVVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFzaWEvS2FyYWNoaVwiOiB7XG5cdFx0dTogMzAwLFxuXHRcdGM6IFtcblx0XHRcdFwiUEtcIlxuXHRcdF1cblx0fSxcblx0XCJBc2lhL0thc2hnYXJcIjoge1xuXHRcdGE6IFwiQXNpYS9VcnVtcWlcIixcblx0XHRyOiAxXG5cdH0sXG5cdFwiQXNpYS9LYXRobWFuZHVcIjoge1xuXHRcdHU6IDM0NSxcblx0XHRjOiBbXG5cdFx0XHRcIk5QXCJcblx0XHRdXG5cdH0sXG5cdFwiQXNpYS9LYXRtYW5kdVwiOiB7XG5cdFx0YTogXCJBc2lhL0thdGhtYW5kdVwiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBc2lhL0toYW5keWdhXCI6IHtcblx0XHR1OiA1NDAsXG5cdFx0YzogW1xuXHRcdFx0XCJSVVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFzaWEvS29sa2F0YVwiOiB7XG5cdFx0dTogMzMwLFxuXHRcdGM6IFtcblx0XHRcdFwiSU5cIlxuXHRcdF1cblx0fSxcblx0XCJBc2lhL0tyYXNub3lhcnNrXCI6IHtcblx0XHR1OiA0MjAsXG5cdFx0YzogW1xuXHRcdFx0XCJSVVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFzaWEvS3VhbGFfTHVtcHVyXCI6IHtcblx0XHR1OiA0ODAsXG5cdFx0YzogW1xuXHRcdFx0XCJNWVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFzaWEvS3VjaGluZ1wiOiB7XG5cdFx0dTogNDgwLFxuXHRcdGM6IFtcblx0XHRcdFwiTVlcIlxuXHRcdF1cblx0fSxcblx0XCJBc2lhL0t1d2FpdFwiOiB7XG5cdFx0YTogXCJBc2lhL1JpeWFkaFwiLFxuXHRcdGM6IFtcblx0XHRcdFwiS1dcIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFzaWEvTWFjYW9cIjoge1xuXHRcdGE6IFwiQXNpYS9NYWNhdVwiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBc2lhL01hY2F1XCI6IHtcblx0XHR1OiA0ODAsXG5cdFx0YzogW1xuXHRcdFx0XCJNT1wiXG5cdFx0XVxuXHR9LFxuXHRcIkFzaWEvTWFnYWRhblwiOiB7XG5cdFx0dTogNjYwLFxuXHRcdGM6IFtcblx0XHRcdFwiUlVcIlxuXHRcdF1cblx0fSxcblx0XCJBc2lhL01ha2Fzc2FyXCI6IHtcblx0XHR1OiA0ODAsXG5cdFx0YzogW1xuXHRcdFx0XCJJRFwiXG5cdFx0XVxuXHR9LFxuXHRcIkFzaWEvTWFuaWxhXCI6IHtcblx0XHR1OiA0ODAsXG5cdFx0YzogW1xuXHRcdFx0XCJQSFwiXG5cdFx0XVxuXHR9LFxuXHRcIkFzaWEvTXVzY2F0XCI6IHtcblx0XHRhOiBcIkFzaWEvRHViYWlcIixcblx0XHRjOiBbXG5cdFx0XHRcIk9NXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBc2lhL05pY29zaWFcIjoge1xuXHRcdHU6IDEyMCxcblx0XHRkOiAxODAsXG5cdFx0YzogW1xuXHRcdFx0XCJDWVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFzaWEvTm92b2t1em5ldHNrXCI6IHtcblx0XHR1OiA0MjAsXG5cdFx0YzogW1xuXHRcdFx0XCJSVVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFzaWEvTm92b3NpYmlyc2tcIjoge1xuXHRcdHU6IDQyMCxcblx0XHRjOiBbXG5cdFx0XHRcIlJVXCJcblx0XHRdXG5cdH0sXG5cdFwiQXNpYS9PbXNrXCI6IHtcblx0XHR1OiAzNjAsXG5cdFx0YzogW1xuXHRcdFx0XCJSVVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFzaWEvT3JhbFwiOiB7XG5cdFx0dTogMzAwLFxuXHRcdGM6IFtcblx0XHRcdFwiS1pcIlxuXHRcdF1cblx0fSxcblx0XCJBc2lhL1Bobm9tX1BlbmhcIjoge1xuXHRcdGE6IFwiQXNpYS9CYW5na29rXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJLSFwiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiQXNpYS9Qb250aWFuYWtcIjoge1xuXHRcdHU6IDQyMCxcblx0XHRjOiBbXG5cdFx0XHRcIklEXCJcblx0XHRdXG5cdH0sXG5cdFwiQXNpYS9QeW9uZ3lhbmdcIjoge1xuXHRcdHU6IDU0MCxcblx0XHRjOiBbXG5cdFx0XHRcIktQXCJcblx0XHRdXG5cdH0sXG5cdFwiQXNpYS9RYXRhclwiOiB7XG5cdFx0dTogMTgwLFxuXHRcdGM6IFtcblx0XHRcdFwiUUFcIixcblx0XHRcdFwiQkhcIlxuXHRcdF1cblx0fSxcblx0XCJBc2lhL1Fvc3RhbmF5XCI6IHtcblx0XHR1OiAzNjAsXG5cdFx0YzogW1xuXHRcdFx0XCJLWlwiXG5cdFx0XVxuXHR9LFxuXHRcIkFzaWEvUXl6eWxvcmRhXCI6IHtcblx0XHR1OiAzMDAsXG5cdFx0YzogW1xuXHRcdFx0XCJLWlwiXG5cdFx0XVxuXHR9LFxuXHRcIkFzaWEvUmFuZ29vblwiOiB7XG5cdFx0YTogXCJBc2lhL1lhbmdvblwiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBc2lhL1JpeWFkaFwiOiB7XG5cdFx0dTogMTgwLFxuXHRcdGM6IFtcblx0XHRcdFwiU0FcIixcblx0XHRcdFwiQVFcIixcblx0XHRcdFwiS1dcIixcblx0XHRcdFwiWUVcIlxuXHRcdF1cblx0fSxcblx0XCJBc2lhL1NhaWdvblwiOiB7XG5cdFx0YTogXCJBc2lhL0hvX0NoaV9NaW5oXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFzaWEvU2FraGFsaW5cIjoge1xuXHRcdHU6IDY2MCxcblx0XHRjOiBbXG5cdFx0XHRcIlJVXCJcblx0XHRdXG5cdH0sXG5cdFwiQXNpYS9TYW1hcmthbmRcIjoge1xuXHRcdHU6IDMwMCxcblx0XHRjOiBbXG5cdFx0XHRcIlVaXCJcblx0XHRdXG5cdH0sXG5cdFwiQXNpYS9TZW91bFwiOiB7XG5cdFx0dTogNTQwLFxuXHRcdGM6IFtcblx0XHRcdFwiS1JcIlxuXHRcdF1cblx0fSxcblx0XCJBc2lhL1NoYW5naGFpXCI6IHtcblx0XHR1OiA0ODAsXG5cdFx0YzogW1xuXHRcdFx0XCJDTlwiXG5cdFx0XVxuXHR9LFxuXHRcIkFzaWEvU2luZ2Fwb3JlXCI6IHtcblx0XHR1OiA0ODAsXG5cdFx0YzogW1xuXHRcdFx0XCJTR1wiLFxuXHRcdFx0XCJNWVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFzaWEvU3JlZG5la29seW1za1wiOiB7XG5cdFx0dTogNjYwLFxuXHRcdGM6IFtcblx0XHRcdFwiUlVcIlxuXHRcdF1cblx0fSxcblx0XCJBc2lhL1RhaXBlaVwiOiB7XG5cdFx0dTogNDgwLFxuXHRcdGM6IFtcblx0XHRcdFwiVFdcIlxuXHRcdF1cblx0fSxcblx0XCJBc2lhL1Rhc2hrZW50XCI6IHtcblx0XHR1OiAzMDAsXG5cdFx0YzogW1xuXHRcdFx0XCJVWlwiXG5cdFx0XVxuXHR9LFxuXHRcIkFzaWEvVGJpbGlzaVwiOiB7XG5cdFx0dTogMjQwLFxuXHRcdGM6IFtcblx0XHRcdFwiR0VcIlxuXHRcdF1cblx0fSxcblx0XCJBc2lhL1RlaHJhblwiOiB7XG5cdFx0dTogMjEwLFxuXHRcdGQ6IDI3MCxcblx0XHRjOiBbXG5cdFx0XHRcIklSXCJcblx0XHRdXG5cdH0sXG5cdFwiQXNpYS9UZWxfQXZpdlwiOiB7XG5cdFx0YTogXCJBc2lhL0plcnVzYWxlbVwiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBc2lhL1RoaW1idVwiOiB7XG5cdFx0YTogXCJBc2lhL1RoaW1waHVcIixcblx0XHRyOiAxXG5cdH0sXG5cdFwiQXNpYS9UaGltcGh1XCI6IHtcblx0XHR1OiAzNjAsXG5cdFx0YzogW1xuXHRcdFx0XCJCVFwiXG5cdFx0XVxuXHR9LFxuXHRcIkFzaWEvVG9reW9cIjoge1xuXHRcdHU6IDU0MCxcblx0XHRjOiBbXG5cdFx0XHRcIkpQXCJcblx0XHRdXG5cdH0sXG5cdFwiQXNpYS9Ub21za1wiOiB7XG5cdFx0dTogNDIwLFxuXHRcdGM6IFtcblx0XHRcdFwiUlVcIlxuXHRcdF1cblx0fSxcblx0XCJBc2lhL1VqdW5nX1BhbmRhbmdcIjoge1xuXHRcdGE6IFwiQXNpYS9NYWthc3NhclwiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBc2lhL1VsYWFuYmFhdGFyXCI6IHtcblx0XHR1OiA0ODAsXG5cdFx0YzogW1xuXHRcdFx0XCJNTlwiXG5cdFx0XVxuXHR9LFxuXHRcIkFzaWEvVWxhbl9CYXRvclwiOiB7XG5cdFx0YTogXCJBc2lhL1VsYWFuYmFhdGFyXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIkFzaWEvVXJ1bXFpXCI6IHtcblx0XHR1OiAzNjAsXG5cdFx0YzogW1xuXHRcdFx0XCJDTlwiXG5cdFx0XVxuXHR9LFxuXHRcIkFzaWEvVXN0LU5lcmFcIjoge1xuXHRcdHU6IDYwMCxcblx0XHRjOiBbXG5cdFx0XHRcIlJVXCJcblx0XHRdXG5cdH0sXG5cdFwiQXNpYS9WaWVudGlhbmVcIjoge1xuXHRcdGE6IFwiQXNpYS9CYW5na29rXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJMQVwiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiQXNpYS9WbGFkaXZvc3Rva1wiOiB7XG5cdFx0dTogNjAwLFxuXHRcdGM6IFtcblx0XHRcdFwiUlVcIlxuXHRcdF1cblx0fSxcblx0XCJBc2lhL1lha3V0c2tcIjoge1xuXHRcdHU6IDU0MCxcblx0XHRjOiBbXG5cdFx0XHRcIlJVXCJcblx0XHRdXG5cdH0sXG5cdFwiQXNpYS9ZYW5nb25cIjoge1xuXHRcdHU6IDM5MCxcblx0XHRjOiBbXG5cdFx0XHRcIk1NXCJcblx0XHRdXG5cdH0sXG5cdFwiQXNpYS9ZZWthdGVyaW5idXJnXCI6IHtcblx0XHR1OiAzMDAsXG5cdFx0YzogW1xuXHRcdFx0XCJSVVwiXG5cdFx0XVxuXHR9LFxuXHRcIkFzaWEvWWVyZXZhblwiOiB7XG5cdFx0dTogMjQwLFxuXHRcdGM6IFtcblx0XHRcdFwiQU1cIlxuXHRcdF1cblx0fSxcblx0XCJBdGxhbnRpYy9Bem9yZXNcIjoge1xuXHRcdHU6IC02MCxcblx0XHRkOiAwLFxuXHRcdGM6IFtcblx0XHRcdFwiUFRcIlxuXHRcdF1cblx0fSxcblx0XCJBdGxhbnRpYy9CZXJtdWRhXCI6IHtcblx0XHR1OiAtMjQwLFxuXHRcdGQ6IC0xODAsXG5cdFx0YzogW1xuXHRcdFx0XCJCTVwiXG5cdFx0XVxuXHR9LFxuXHRcIkF0bGFudGljL0NhbmFyeVwiOiB7XG5cdFx0dTogMCxcblx0XHRkOiA2MCxcblx0XHRjOiBbXG5cdFx0XHRcIkVTXCJcblx0XHRdXG5cdH0sXG5cdFwiQXRsYW50aWMvQ2FwZV9WZXJkZVwiOiB7XG5cdFx0dTogLTYwLFxuXHRcdGM6IFtcblx0XHRcdFwiQ1ZcIlxuXHRcdF1cblx0fSxcblx0XCJBdGxhbnRpYy9GYWVyb2VcIjoge1xuXHRcdGE6IFwiQXRsYW50aWMvRmFyb2VcIixcblx0XHRyOiAxXG5cdH0sXG5cdFwiQXRsYW50aWMvRmFyb2VcIjoge1xuXHRcdHU6IDAsXG5cdFx0ZDogNjAsXG5cdFx0YzogW1xuXHRcdFx0XCJGT1wiXG5cdFx0XVxuXHR9LFxuXHRcIkF0bGFudGljL0phbl9NYXllblwiOiB7XG5cdFx0YTogXCJFdXJvcGUvT3Nsb1wiLFxuXHRcdGM6IFtcblx0XHRcdFwiU0pcIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkF0bGFudGljL01hZGVpcmFcIjoge1xuXHRcdHU6IDAsXG5cdFx0ZDogNjAsXG5cdFx0YzogW1xuXHRcdFx0XCJQVFwiXG5cdFx0XVxuXHR9LFxuXHRcIkF0bGFudGljL1JleWtqYXZpa1wiOiB7XG5cdFx0dTogMCxcblx0XHRjOiBbXG5cdFx0XHRcIklTXCJcblx0XHRdXG5cdH0sXG5cdFwiQXRsYW50aWMvU291dGhfR2VvcmdpYVwiOiB7XG5cdFx0dTogLTEyMCxcblx0XHRjOiBbXG5cdFx0XHRcIkdTXCJcblx0XHRdXG5cdH0sXG5cdFwiQXRsYW50aWMvU3RfSGVsZW5hXCI6IHtcblx0XHRhOiBcIkFmcmljYS9BYmlkamFuXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJTSFwiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiQXRsYW50aWMvU3RhbmxleVwiOiB7XG5cdFx0dTogLTE4MCxcblx0XHRjOiBbXG5cdFx0XHRcIkZLXCJcblx0XHRdXG5cdH0sXG5cdFwiQXVzdHJhbGlhL0FDVFwiOiB7XG5cdFx0YTogXCJBdXN0cmFsaWEvU3lkbmV5XCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIkF1c3RyYWxpYS9BZGVsYWlkZVwiOiB7XG5cdFx0dTogNTcwLFxuXHRcdGQ6IDYzMCxcblx0XHRjOiBbXG5cdFx0XHRcIkFVXCJcblx0XHRdXG5cdH0sXG5cdFwiQXVzdHJhbGlhL0JyaXNiYW5lXCI6IHtcblx0XHR1OiA2MDAsXG5cdFx0YzogW1xuXHRcdFx0XCJBVVwiXG5cdFx0XVxuXHR9LFxuXHRcIkF1c3RyYWxpYS9Ccm9rZW5fSGlsbFwiOiB7XG5cdFx0dTogNTcwLFxuXHRcdGQ6IDYzMCxcblx0XHRjOiBbXG5cdFx0XHRcIkFVXCJcblx0XHRdXG5cdH0sXG5cdFwiQXVzdHJhbGlhL0NhbmJlcnJhXCI6IHtcblx0XHRhOiBcIkF1c3RyYWxpYS9TeWRuZXlcIixcblx0XHRyOiAxXG5cdH0sXG5cdFwiQXVzdHJhbGlhL0N1cnJpZVwiOiB7XG5cdFx0YTogXCJBdXN0cmFsaWEvSG9iYXJ0XCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIkF1c3RyYWxpYS9EYXJ3aW5cIjoge1xuXHRcdHU6IDU3MCxcblx0XHRjOiBbXG5cdFx0XHRcIkFVXCJcblx0XHRdXG5cdH0sXG5cdFwiQXVzdHJhbGlhL0V1Y2xhXCI6IHtcblx0XHR1OiA1MjUsXG5cdFx0YzogW1xuXHRcdFx0XCJBVVwiXG5cdFx0XVxuXHR9LFxuXHRcIkF1c3RyYWxpYS9Ib2JhcnRcIjoge1xuXHRcdHU6IDYwMCxcblx0XHRkOiA2NjAsXG5cdFx0YzogW1xuXHRcdFx0XCJBVVwiXG5cdFx0XVxuXHR9LFxuXHRcIkF1c3RyYWxpYS9MSElcIjoge1xuXHRcdGE6IFwiQXVzdHJhbGlhL0xvcmRfSG93ZVwiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBdXN0cmFsaWEvTGluZGVtYW5cIjoge1xuXHRcdHU6IDYwMCxcblx0XHRjOiBbXG5cdFx0XHRcIkFVXCJcblx0XHRdXG5cdH0sXG5cdFwiQXVzdHJhbGlhL0xvcmRfSG93ZVwiOiB7XG5cdFx0dTogNjMwLFxuXHRcdGQ6IDY2MCxcblx0XHRjOiBbXG5cdFx0XHRcIkFVXCJcblx0XHRdXG5cdH0sXG5cdFwiQXVzdHJhbGlhL01lbGJvdXJuZVwiOiB7XG5cdFx0dTogNjAwLFxuXHRcdGQ6IDY2MCxcblx0XHRjOiBbXG5cdFx0XHRcIkFVXCJcblx0XHRdXG5cdH0sXG5cdFwiQXVzdHJhbGlhL05TV1wiOiB7XG5cdFx0YTogXCJBdXN0cmFsaWEvU3lkbmV5XCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIkF1c3RyYWxpYS9Ob3J0aFwiOiB7XG5cdFx0YTogXCJBdXN0cmFsaWEvRGFyd2luXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIkF1c3RyYWxpYS9QZXJ0aFwiOiB7XG5cdFx0dTogNDgwLFxuXHRcdGM6IFtcblx0XHRcdFwiQVVcIlxuXHRcdF1cblx0fSxcblx0XCJBdXN0cmFsaWEvUXVlZW5zbGFuZFwiOiB7XG5cdFx0YTogXCJBdXN0cmFsaWEvQnJpc2JhbmVcIixcblx0XHRyOiAxXG5cdH0sXG5cdFwiQXVzdHJhbGlhL1NvdXRoXCI6IHtcblx0XHRhOiBcIkF1c3RyYWxpYS9BZGVsYWlkZVwiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBdXN0cmFsaWEvU3lkbmV5XCI6IHtcblx0XHR1OiA2MDAsXG5cdFx0ZDogNjYwLFxuXHRcdGM6IFtcblx0XHRcdFwiQVVcIlxuXHRcdF1cblx0fSxcblx0XCJBdXN0cmFsaWEvVGFzbWFuaWFcIjoge1xuXHRcdGE6IFwiQXVzdHJhbGlhL0hvYmFydFwiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBdXN0cmFsaWEvVmljdG9yaWFcIjoge1xuXHRcdGE6IFwiQXVzdHJhbGlhL01lbGJvdXJuZVwiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJBdXN0cmFsaWEvV2VzdFwiOiB7XG5cdFx0YTogXCJBdXN0cmFsaWEvUGVydGhcIixcblx0XHRyOiAxXG5cdH0sXG5cdFwiQXVzdHJhbGlhL1lhbmNvd2lubmFcIjoge1xuXHRcdGE6IFwiQXVzdHJhbGlhL0Jyb2tlbl9IaWxsXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIkJyYXppbC9BY3JlXCI6IHtcblx0XHRhOiBcIkFtZXJpY2EvUmlvX0JyYW5jb1wiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJCcmF6aWwvRGVOb3JvbmhhXCI6IHtcblx0XHRhOiBcIkFtZXJpY2EvTm9yb25oYVwiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJCcmF6aWwvRWFzdFwiOiB7XG5cdFx0YTogXCJBbWVyaWNhL1Nhb19QYXVsb1wiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJCcmF6aWwvV2VzdFwiOiB7XG5cdFx0YTogXCJBbWVyaWNhL01hbmF1c1wiLFxuXHRcdHI6IDFcblx0fSxcblx0Q0VUOiB7XG5cdFx0dTogNjAsXG5cdFx0ZDogMTIwXG5cdH0sXG5cdENTVDZDRFQ6IHtcblx0XHR1OiAtMzYwLFxuXHRcdGQ6IC0zMDBcblx0fSxcblx0XCJDYW5hZGEvQXRsYW50aWNcIjoge1xuXHRcdGE6IFwiQW1lcmljYS9IYWxpZmF4XCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIkNhbmFkYS9DZW50cmFsXCI6IHtcblx0XHRhOiBcIkFtZXJpY2EvV2lubmlwZWdcIixcblx0XHRyOiAxXG5cdH0sXG5cdFwiQ2FuYWRhL0Vhc3Rlcm5cIjoge1xuXHRcdGE6IFwiQW1lcmljYS9Ub3JvbnRvXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJDQVwiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiQ2FuYWRhL01vdW50YWluXCI6IHtcblx0XHRhOiBcIkFtZXJpY2EvRWRtb250b25cIixcblx0XHRyOiAxXG5cdH0sXG5cdFwiQ2FuYWRhL05ld2ZvdW5kbGFuZFwiOiB7XG5cdFx0YTogXCJBbWVyaWNhL1N0X0pvaG5zXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIkNhbmFkYS9QYWNpZmljXCI6IHtcblx0XHRhOiBcIkFtZXJpY2EvVmFuY291dmVyXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIkNhbmFkYS9TYXNrYXRjaGV3YW5cIjoge1xuXHRcdGE6IFwiQW1lcmljYS9SZWdpbmFcIixcblx0XHRyOiAxXG5cdH0sXG5cdFwiQ2FuYWRhL1l1a29uXCI6IHtcblx0XHRhOiBcIkFtZXJpY2EvV2hpdGVob3JzZVwiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJDaGlsZS9Db250aW5lbnRhbFwiOiB7XG5cdFx0YTogXCJBbWVyaWNhL1NhbnRpYWdvXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIkNoaWxlL0Vhc3RlcklzbGFuZFwiOiB7XG5cdFx0YTogXCJQYWNpZmljL0Vhc3RlclwiLFxuXHRcdHI6IDFcblx0fSxcblx0Q3ViYToge1xuXHRcdGE6IFwiQW1lcmljYS9IYXZhbmFcIixcblx0XHRyOiAxXG5cdH0sXG5cdEVFVDoge1xuXHRcdHU6IDEyMCxcblx0XHRkOiAxODBcblx0fSxcblx0RVNUOiB7XG5cdFx0dTogLTMwMFxuXHR9LFxuXHRFU1Q1RURUOiB7XG5cdFx0dTogLTMwMCxcblx0XHRkOiAtMjQwXG5cdH0sXG5cdEVneXB0OiB7XG5cdFx0YTogXCJBZnJpY2EvQ2Fpcm9cIixcblx0XHRyOiAxXG5cdH0sXG5cdEVpcmU6IHtcblx0XHRhOiBcIkV1cm9wZS9EdWJsaW5cIixcblx0XHRyOiAxXG5cdH0sXG5cdFwiRXRjL0dNVFwiOiB7XG5cdFx0dTogMFxuXHR9LFxuXHRcIkV0Yy9HTVQrMFwiOiB7XG5cdFx0YTogXCJFdGMvR01UXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIkV0Yy9HTVQrMVwiOiB7XG5cdFx0dTogLTYwXG5cdH0sXG5cdFwiRXRjL0dNVCsxMFwiOiB7XG5cdFx0dTogLTYwMFxuXHR9LFxuXHRcIkV0Yy9HTVQrMTFcIjoge1xuXHRcdHU6IC02NjBcblx0fSxcblx0XCJFdGMvR01UKzEyXCI6IHtcblx0XHR1OiAtNzIwXG5cdH0sXG5cdFwiRXRjL0dNVCsyXCI6IHtcblx0XHR1OiAtMTIwXG5cdH0sXG5cdFwiRXRjL0dNVCszXCI6IHtcblx0XHR1OiAtMTgwXG5cdH0sXG5cdFwiRXRjL0dNVCs0XCI6IHtcblx0XHR1OiAtMjQwXG5cdH0sXG5cdFwiRXRjL0dNVCs1XCI6IHtcblx0XHR1OiAtMzAwXG5cdH0sXG5cdFwiRXRjL0dNVCs2XCI6IHtcblx0XHR1OiAtMzYwXG5cdH0sXG5cdFwiRXRjL0dNVCs3XCI6IHtcblx0XHR1OiAtNDIwXG5cdH0sXG5cdFwiRXRjL0dNVCs4XCI6IHtcblx0XHR1OiAtNDgwXG5cdH0sXG5cdFwiRXRjL0dNVCs5XCI6IHtcblx0XHR1OiAtNTQwXG5cdH0sXG5cdFwiRXRjL0dNVC0wXCI6IHtcblx0XHRhOiBcIkV0Yy9HTVRcIixcblx0XHRyOiAxXG5cdH0sXG5cdFwiRXRjL0dNVC0xXCI6IHtcblx0XHR1OiA2MFxuXHR9LFxuXHRcIkV0Yy9HTVQtMTBcIjoge1xuXHRcdHU6IDYwMFxuXHR9LFxuXHRcIkV0Yy9HTVQtMTFcIjoge1xuXHRcdHU6IDY2MFxuXHR9LFxuXHRcIkV0Yy9HTVQtMTJcIjoge1xuXHRcdHU6IDcyMFxuXHR9LFxuXHRcIkV0Yy9HTVQtMTNcIjoge1xuXHRcdHU6IDc4MFxuXHR9LFxuXHRcIkV0Yy9HTVQtMTRcIjoge1xuXHRcdHU6IDg0MFxuXHR9LFxuXHRcIkV0Yy9HTVQtMlwiOiB7XG5cdFx0dTogMTIwXG5cdH0sXG5cdFwiRXRjL0dNVC0zXCI6IHtcblx0XHR1OiAxODBcblx0fSxcblx0XCJFdGMvR01ULTRcIjoge1xuXHRcdHU6IDI0MFxuXHR9LFxuXHRcIkV0Yy9HTVQtNVwiOiB7XG5cdFx0dTogMzAwXG5cdH0sXG5cdFwiRXRjL0dNVC02XCI6IHtcblx0XHR1OiAzNjBcblx0fSxcblx0XCJFdGMvR01ULTdcIjoge1xuXHRcdHU6IDQyMFxuXHR9LFxuXHRcIkV0Yy9HTVQtOFwiOiB7XG5cdFx0dTogNDgwXG5cdH0sXG5cdFwiRXRjL0dNVC05XCI6IHtcblx0XHR1OiA1NDBcblx0fSxcblx0XCJFdGMvR01UMFwiOiB7XG5cdFx0YTogXCJFdGMvR01UXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIkV0Yy9HcmVlbndpY2hcIjoge1xuXHRcdGE6IFwiRXRjL0dNVFwiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJFdGMvVUNUXCI6IHtcblx0XHRhOiBcIkV0Yy9VVENcIixcblx0XHRyOiAxXG5cdH0sXG5cdFwiRXRjL1VUQ1wiOiB7XG5cdFx0dTogMFxuXHR9LFxuXHRcIkV0Yy9Vbml2ZXJzYWxcIjoge1xuXHRcdGE6IFwiRXRjL1VUQ1wiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJFdGMvWnVsdVwiOiB7XG5cdFx0YTogXCJFdGMvVVRDXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIkV1cm9wZS9BbXN0ZXJkYW1cIjoge1xuXHRcdHU6IDYwLFxuXHRcdGQ6IDEyMCxcblx0XHRjOiBbXG5cdFx0XHRcIk5MXCJcblx0XHRdXG5cdH0sXG5cdFwiRXVyb3BlL0FuZG9ycmFcIjoge1xuXHRcdHU6IDYwLFxuXHRcdGQ6IDEyMCxcblx0XHRjOiBbXG5cdFx0XHRcIkFEXCJcblx0XHRdXG5cdH0sXG5cdFwiRXVyb3BlL0FzdHJha2hhblwiOiB7XG5cdFx0dTogMjQwLFxuXHRcdGM6IFtcblx0XHRcdFwiUlVcIlxuXHRcdF1cblx0fSxcblx0XCJFdXJvcGUvQXRoZW5zXCI6IHtcblx0XHR1OiAxMjAsXG5cdFx0ZDogMTgwLFxuXHRcdGM6IFtcblx0XHRcdFwiR1JcIlxuXHRcdF1cblx0fSxcblx0XCJFdXJvcGUvQmVsZmFzdFwiOiB7XG5cdFx0YTogXCJFdXJvcGUvTG9uZG9uXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJHQlwiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiRXVyb3BlL0JlbGdyYWRlXCI6IHtcblx0XHR1OiA2MCxcblx0XHRkOiAxMjAsXG5cdFx0YzogW1xuXHRcdFx0XCJSU1wiLFxuXHRcdFx0XCJCQVwiLFxuXHRcdFx0XCJIUlwiLFxuXHRcdFx0XCJNRVwiLFxuXHRcdFx0XCJNS1wiLFxuXHRcdFx0XCJTSVwiXG5cdFx0XVxuXHR9LFxuXHRcIkV1cm9wZS9CZXJsaW5cIjoge1xuXHRcdHU6IDYwLFxuXHRcdGQ6IDEyMCxcblx0XHRjOiBbXG5cdFx0XHRcIkRFXCJcblx0XHRdXG5cdH0sXG5cdFwiRXVyb3BlL0JyYXRpc2xhdmFcIjoge1xuXHRcdGE6IFwiRXVyb3BlL1ByYWd1ZVwiLFxuXHRcdGM6IFtcblx0XHRcdFwiU0tcIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkV1cm9wZS9CcnVzc2Vsc1wiOiB7XG5cdFx0dTogNjAsXG5cdFx0ZDogMTIwLFxuXHRcdGM6IFtcblx0XHRcdFwiQkVcIlxuXHRcdF1cblx0fSxcblx0XCJFdXJvcGUvQnVjaGFyZXN0XCI6IHtcblx0XHR1OiAxMjAsXG5cdFx0ZDogMTgwLFxuXHRcdGM6IFtcblx0XHRcdFwiUk9cIlxuXHRcdF1cblx0fSxcblx0XCJFdXJvcGUvQnVkYXBlc3RcIjoge1xuXHRcdHU6IDYwLFxuXHRcdGQ6IDEyMCxcblx0XHRjOiBbXG5cdFx0XHRcIkhVXCJcblx0XHRdXG5cdH0sXG5cdFwiRXVyb3BlL0J1c2luZ2VuXCI6IHtcblx0XHRhOiBcIkV1cm9wZS9adXJpY2hcIixcblx0XHRjOiBbXG5cdFx0XHRcIkRFXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJFdXJvcGUvQ2hpc2luYXVcIjoge1xuXHRcdHU6IDEyMCxcblx0XHRkOiAxODAsXG5cdFx0YzogW1xuXHRcdFx0XCJNRFwiXG5cdFx0XVxuXHR9LFxuXHRcIkV1cm9wZS9Db3BlbmhhZ2VuXCI6IHtcblx0XHR1OiA2MCxcblx0XHRkOiAxMjAsXG5cdFx0YzogW1xuXHRcdFx0XCJES1wiXG5cdFx0XVxuXHR9LFxuXHRcIkV1cm9wZS9EdWJsaW5cIjoge1xuXHRcdHU6IDYwLFxuXHRcdGQ6IDAsXG5cdFx0YzogW1xuXHRcdFx0XCJJRVwiXG5cdFx0XVxuXHR9LFxuXHRcIkV1cm9wZS9HaWJyYWx0YXJcIjoge1xuXHRcdHU6IDYwLFxuXHRcdGQ6IDEyMCxcblx0XHRjOiBbXG5cdFx0XHRcIkdJXCJcblx0XHRdXG5cdH0sXG5cdFwiRXVyb3BlL0d1ZXJuc2V5XCI6IHtcblx0XHRhOiBcIkV1cm9wZS9Mb25kb25cIixcblx0XHRjOiBbXG5cdFx0XHRcIkdHXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJFdXJvcGUvSGVsc2lua2lcIjoge1xuXHRcdHU6IDEyMCxcblx0XHRkOiAxODAsXG5cdFx0YzogW1xuXHRcdFx0XCJGSVwiLFxuXHRcdFx0XCJBWFwiXG5cdFx0XVxuXHR9LFxuXHRcIkV1cm9wZS9Jc2xlX29mX01hblwiOiB7XG5cdFx0YTogXCJFdXJvcGUvTG9uZG9uXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJJTVwiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiRXVyb3BlL0lzdGFuYnVsXCI6IHtcblx0XHR1OiAxODAsXG5cdFx0YzogW1xuXHRcdFx0XCJUUlwiXG5cdFx0XVxuXHR9LFxuXHRcIkV1cm9wZS9KZXJzZXlcIjoge1xuXHRcdGE6IFwiRXVyb3BlL0xvbmRvblwiLFxuXHRcdGM6IFtcblx0XHRcdFwiSkVcIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkV1cm9wZS9LYWxpbmluZ3JhZFwiOiB7XG5cdFx0dTogMTIwLFxuXHRcdGM6IFtcblx0XHRcdFwiUlVcIlxuXHRcdF1cblx0fSxcblx0XCJFdXJvcGUvS2lldlwiOiB7XG5cdFx0dTogMTIwLFxuXHRcdGQ6IDE4MCxcblx0XHRjOiBbXG5cdFx0XHRcIlVBXCJcblx0XHRdXG5cdH0sXG5cdFwiRXVyb3BlL0tpcm92XCI6IHtcblx0XHR1OiAxODAsXG5cdFx0YzogW1xuXHRcdFx0XCJSVVwiXG5cdFx0XVxuXHR9LFxuXHRcIkV1cm9wZS9MaXNib25cIjoge1xuXHRcdHU6IDAsXG5cdFx0ZDogNjAsXG5cdFx0YzogW1xuXHRcdFx0XCJQVFwiXG5cdFx0XVxuXHR9LFxuXHRcIkV1cm9wZS9ManVibGphbmFcIjoge1xuXHRcdGE6IFwiRXVyb3BlL0JlbGdyYWRlXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJTSVwiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiRXVyb3BlL0xvbmRvblwiOiB7XG5cdFx0dTogMCxcblx0XHRkOiA2MCxcblx0XHRjOiBbXG5cdFx0XHRcIkdCXCIsXG5cdFx0XHRcIkdHXCIsXG5cdFx0XHRcIklNXCIsXG5cdFx0XHRcIkpFXCJcblx0XHRdXG5cdH0sXG5cdFwiRXVyb3BlL0x1eGVtYm91cmdcIjoge1xuXHRcdHU6IDYwLFxuXHRcdGQ6IDEyMCxcblx0XHRjOiBbXG5cdFx0XHRcIkxVXCJcblx0XHRdXG5cdH0sXG5cdFwiRXVyb3BlL01hZHJpZFwiOiB7XG5cdFx0dTogNjAsXG5cdFx0ZDogMTIwLFxuXHRcdGM6IFtcblx0XHRcdFwiRVNcIlxuXHRcdF1cblx0fSxcblx0XCJFdXJvcGUvTWFsdGFcIjoge1xuXHRcdHU6IDYwLFxuXHRcdGQ6IDEyMCxcblx0XHRjOiBbXG5cdFx0XHRcIk1UXCJcblx0XHRdXG5cdH0sXG5cdFwiRXVyb3BlL01hcmllaGFtblwiOiB7XG5cdFx0YTogXCJFdXJvcGUvSGVsc2lua2lcIixcblx0XHRjOiBbXG5cdFx0XHRcIkFYXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJFdXJvcGUvTWluc2tcIjoge1xuXHRcdHU6IDE4MCxcblx0XHRjOiBbXG5cdFx0XHRcIkJZXCJcblx0XHRdXG5cdH0sXG5cdFwiRXVyb3BlL01vbmFjb1wiOiB7XG5cdFx0dTogNjAsXG5cdFx0ZDogMTIwLFxuXHRcdGM6IFtcblx0XHRcdFwiTUNcIlxuXHRcdF1cblx0fSxcblx0XCJFdXJvcGUvTW9zY293XCI6IHtcblx0XHR1OiAxODAsXG5cdFx0YzogW1xuXHRcdFx0XCJSVVwiXG5cdFx0XVxuXHR9LFxuXHRcIkV1cm9wZS9OaWNvc2lhXCI6IHtcblx0XHRhOiBcIkFzaWEvTmljb3NpYVwiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJFdXJvcGUvT3Nsb1wiOiB7XG5cdFx0dTogNjAsXG5cdFx0ZDogMTIwLFxuXHRcdGM6IFtcblx0XHRcdFwiTk9cIixcblx0XHRcdFwiU0pcIixcblx0XHRcdFwiQlZcIlxuXHRcdF1cblx0fSxcblx0XCJFdXJvcGUvUGFyaXNcIjoge1xuXHRcdHU6IDYwLFxuXHRcdGQ6IDEyMCxcblx0XHRjOiBbXG5cdFx0XHRcIkZSXCJcblx0XHRdXG5cdH0sXG5cdFwiRXVyb3BlL1BvZGdvcmljYVwiOiB7XG5cdFx0YTogXCJFdXJvcGUvQmVsZ3JhZGVcIixcblx0XHRjOiBbXG5cdFx0XHRcIk1FXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJFdXJvcGUvUHJhZ3VlXCI6IHtcblx0XHR1OiA2MCxcblx0XHRkOiAxMjAsXG5cdFx0YzogW1xuXHRcdFx0XCJDWlwiLFxuXHRcdFx0XCJTS1wiXG5cdFx0XVxuXHR9LFxuXHRcIkV1cm9wZS9SaWdhXCI6IHtcblx0XHR1OiAxMjAsXG5cdFx0ZDogMTgwLFxuXHRcdGM6IFtcblx0XHRcdFwiTFZcIlxuXHRcdF1cblx0fSxcblx0XCJFdXJvcGUvUm9tZVwiOiB7XG5cdFx0dTogNjAsXG5cdFx0ZDogMTIwLFxuXHRcdGM6IFtcblx0XHRcdFwiSVRcIixcblx0XHRcdFwiU01cIixcblx0XHRcdFwiVkFcIlxuXHRcdF1cblx0fSxcblx0XCJFdXJvcGUvU2FtYXJhXCI6IHtcblx0XHR1OiAyNDAsXG5cdFx0YzogW1xuXHRcdFx0XCJSVVwiXG5cdFx0XVxuXHR9LFxuXHRcIkV1cm9wZS9TYW5fTWFyaW5vXCI6IHtcblx0XHRhOiBcIkV1cm9wZS9Sb21lXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJTTVwiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiRXVyb3BlL1NhcmFqZXZvXCI6IHtcblx0XHRhOiBcIkV1cm9wZS9CZWxncmFkZVwiLFxuXHRcdGM6IFtcblx0XHRcdFwiQkFcIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIkV1cm9wZS9TYXJhdG92XCI6IHtcblx0XHR1OiAyNDAsXG5cdFx0YzogW1xuXHRcdFx0XCJSVVwiXG5cdFx0XVxuXHR9LFxuXHRcIkV1cm9wZS9TaW1mZXJvcG9sXCI6IHtcblx0XHR1OiAxODAsXG5cdFx0YzogW1xuXHRcdFx0XCJSVVwiLFxuXHRcdFx0XCJVQVwiXG5cdFx0XVxuXHR9LFxuXHRcIkV1cm9wZS9Ta29wamVcIjoge1xuXHRcdGE6IFwiRXVyb3BlL0JlbGdyYWRlXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJNS1wiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiRXVyb3BlL1NvZmlhXCI6IHtcblx0XHR1OiAxMjAsXG5cdFx0ZDogMTgwLFxuXHRcdGM6IFtcblx0XHRcdFwiQkdcIlxuXHRcdF1cblx0fSxcblx0XCJFdXJvcGUvU3RvY2tob2xtXCI6IHtcblx0XHR1OiA2MCxcblx0XHRkOiAxMjAsXG5cdFx0YzogW1xuXHRcdFx0XCJTRVwiXG5cdFx0XVxuXHR9LFxuXHRcIkV1cm9wZS9UYWxsaW5uXCI6IHtcblx0XHR1OiAxMjAsXG5cdFx0ZDogMTgwLFxuXHRcdGM6IFtcblx0XHRcdFwiRUVcIlxuXHRcdF1cblx0fSxcblx0XCJFdXJvcGUvVGlyYW5lXCI6IHtcblx0XHR1OiA2MCxcblx0XHRkOiAxMjAsXG5cdFx0YzogW1xuXHRcdFx0XCJBTFwiXG5cdFx0XVxuXHR9LFxuXHRcIkV1cm9wZS9UaXJhc3BvbFwiOiB7XG5cdFx0YTogXCJFdXJvcGUvQ2hpc2luYXVcIixcblx0XHRyOiAxXG5cdH0sXG5cdFwiRXVyb3BlL1VseWFub3Zza1wiOiB7XG5cdFx0dTogMjQwLFxuXHRcdGM6IFtcblx0XHRcdFwiUlVcIlxuXHRcdF1cblx0fSxcblx0XCJFdXJvcGUvVXpoZ29yb2RcIjoge1xuXHRcdHU6IDEyMCxcblx0XHRkOiAxODAsXG5cdFx0YzogW1xuXHRcdFx0XCJVQVwiXG5cdFx0XVxuXHR9LFxuXHRcIkV1cm9wZS9WYWR1elwiOiB7XG5cdFx0YTogXCJFdXJvcGUvWnVyaWNoXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJMSVwiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiRXVyb3BlL1ZhdGljYW5cIjoge1xuXHRcdGE6IFwiRXVyb3BlL1JvbWVcIixcblx0XHRjOiBbXG5cdFx0XHRcIlZBXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJFdXJvcGUvVmllbm5hXCI6IHtcblx0XHR1OiA2MCxcblx0XHRkOiAxMjAsXG5cdFx0YzogW1xuXHRcdFx0XCJBVFwiXG5cdFx0XVxuXHR9LFxuXHRcIkV1cm9wZS9WaWxuaXVzXCI6IHtcblx0XHR1OiAxMjAsXG5cdFx0ZDogMTgwLFxuXHRcdGM6IFtcblx0XHRcdFwiTFRcIlxuXHRcdF1cblx0fSxcblx0XCJFdXJvcGUvVm9sZ29ncmFkXCI6IHtcblx0XHR1OiAxODAsXG5cdFx0YzogW1xuXHRcdFx0XCJSVVwiXG5cdFx0XVxuXHR9LFxuXHRcIkV1cm9wZS9XYXJzYXdcIjoge1xuXHRcdHU6IDYwLFxuXHRcdGQ6IDEyMCxcblx0XHRjOiBbXG5cdFx0XHRcIlBMXCJcblx0XHRdXG5cdH0sXG5cdFwiRXVyb3BlL1phZ3JlYlwiOiB7XG5cdFx0YTogXCJFdXJvcGUvQmVsZ3JhZGVcIixcblx0XHRjOiBbXG5cdFx0XHRcIkhSXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJFdXJvcGUvWmFwb3Jvemh5ZVwiOiB7XG5cdFx0dTogMTIwLFxuXHRcdGQ6IDE4MCxcblx0XHRjOiBbXG5cdFx0XHRcIlVBXCJcblx0XHRdXG5cdH0sXG5cdFwiRXVyb3BlL1p1cmljaFwiOiB7XG5cdFx0dTogNjAsXG5cdFx0ZDogMTIwLFxuXHRcdGM6IFtcblx0XHRcdFwiQ0hcIixcblx0XHRcdFwiREVcIixcblx0XHRcdFwiTElcIlxuXHRcdF1cblx0fSxcblx0RmFjdG9yeToge1xuXHRcdHU6IDBcblx0fSxcblx0R0I6IHtcblx0XHRhOiBcIkV1cm9wZS9Mb25kb25cIixcblx0XHRjOiBbXG5cdFx0XHRcIkdCXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJHQi1FaXJlXCI6IHtcblx0XHRhOiBcIkV1cm9wZS9Mb25kb25cIixcblx0XHRjOiBbXG5cdFx0XHRcIkdCXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0R01UOiB7XG5cdFx0YTogXCJFdGMvR01UXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIkdNVCswXCI6IHtcblx0XHRhOiBcIkV0Yy9HTVRcIixcblx0XHRyOiAxXG5cdH0sXG5cdFwiR01ULTBcIjoge1xuXHRcdGE6IFwiRXRjL0dNVFwiLFxuXHRcdHI6IDFcblx0fSxcblx0R01UMDoge1xuXHRcdGE6IFwiRXRjL0dNVFwiLFxuXHRcdHI6IDFcblx0fSxcblx0R3JlZW53aWNoOiB7XG5cdFx0YTogXCJFdGMvR01UXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRIU1Q6IHtcblx0XHR1OiAtNjAwXG5cdH0sXG5cdEhvbmdrb25nOiB7XG5cdFx0YTogXCJBc2lhL0hvbmdfS29uZ1wiLFxuXHRcdHI6IDFcblx0fSxcblx0SWNlbGFuZDoge1xuXHRcdGE6IFwiQXRsYW50aWMvUmV5a2phdmlrXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIkluZGlhbi9BbnRhbmFuYXJpdm9cIjoge1xuXHRcdGE6IFwiQWZyaWNhL05haXJvYmlcIixcblx0XHRjOiBbXG5cdFx0XHRcIk1HXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJJbmRpYW4vQ2hhZ29zXCI6IHtcblx0XHR1OiAzNjAsXG5cdFx0YzogW1xuXHRcdFx0XCJJT1wiXG5cdFx0XVxuXHR9LFxuXHRcIkluZGlhbi9DaHJpc3RtYXNcIjoge1xuXHRcdHU6IDQyMCxcblx0XHRjOiBbXG5cdFx0XHRcIkNYXCJcblx0XHRdXG5cdH0sXG5cdFwiSW5kaWFuL0NvY29zXCI6IHtcblx0XHR1OiAzOTAsXG5cdFx0YzogW1xuXHRcdFx0XCJDQ1wiXG5cdFx0XVxuXHR9LFxuXHRcIkluZGlhbi9Db21vcm9cIjoge1xuXHRcdGE6IFwiQWZyaWNhL05haXJvYmlcIixcblx0XHRjOiBbXG5cdFx0XHRcIktNXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJJbmRpYW4vS2VyZ3VlbGVuXCI6IHtcblx0XHR1OiAzMDAsXG5cdFx0YzogW1xuXHRcdFx0XCJURlwiLFxuXHRcdFx0XCJITVwiXG5cdFx0XVxuXHR9LFxuXHRcIkluZGlhbi9NYWhlXCI6IHtcblx0XHR1OiAyNDAsXG5cdFx0YzogW1xuXHRcdFx0XCJTQ1wiXG5cdFx0XVxuXHR9LFxuXHRcIkluZGlhbi9NYWxkaXZlc1wiOiB7XG5cdFx0dTogMzAwLFxuXHRcdGM6IFtcblx0XHRcdFwiTVZcIlxuXHRcdF1cblx0fSxcblx0XCJJbmRpYW4vTWF1cml0aXVzXCI6IHtcblx0XHR1OiAyNDAsXG5cdFx0YzogW1xuXHRcdFx0XCJNVVwiXG5cdFx0XVxuXHR9LFxuXHRcIkluZGlhbi9NYXlvdHRlXCI6IHtcblx0XHRhOiBcIkFmcmljYS9OYWlyb2JpXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJZVFwiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiSW5kaWFuL1JldW5pb25cIjoge1xuXHRcdHU6IDI0MCxcblx0XHRjOiBbXG5cdFx0XHRcIlJFXCIsXG5cdFx0XHRcIlRGXCJcblx0XHRdXG5cdH0sXG5cdElyYW46IHtcblx0XHRhOiBcIkFzaWEvVGVocmFuXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRJc3JhZWw6IHtcblx0XHRhOiBcIkFzaWEvSmVydXNhbGVtXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRKYW1haWNhOiB7XG5cdFx0YTogXCJBbWVyaWNhL0phbWFpY2FcIixcblx0XHRyOiAxXG5cdH0sXG5cdEphcGFuOiB7XG5cdFx0YTogXCJBc2lhL1Rva3lvXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRLd2FqYWxlaW46IHtcblx0XHRhOiBcIlBhY2lmaWMvS3dhamFsZWluXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRMaWJ5YToge1xuXHRcdGE6IFwiQWZyaWNhL1RyaXBvbGlcIixcblx0XHRyOiAxXG5cdH0sXG5cdE1FVDoge1xuXHRcdHU6IDYwLFxuXHRcdGQ6IDEyMFxuXHR9LFxuXHRNU1Q6IHtcblx0XHR1OiAtNDIwXG5cdH0sXG5cdE1TVDdNRFQ6IHtcblx0XHR1OiAtNDIwLFxuXHRcdGQ6IC0zNjBcblx0fSxcblx0XCJNZXhpY28vQmFqYU5vcnRlXCI6IHtcblx0XHRhOiBcIkFtZXJpY2EvVGlqdWFuYVwiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJNZXhpY28vQmFqYVN1clwiOiB7XG5cdFx0YTogXCJBbWVyaWNhL01hemF0bGFuXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIk1leGljby9HZW5lcmFsXCI6IHtcblx0XHRhOiBcIkFtZXJpY2EvTWV4aWNvX0NpdHlcIixcblx0XHRyOiAxXG5cdH0sXG5cdE5aOiB7XG5cdFx0YTogXCJQYWNpZmljL0F1Y2tsYW5kXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJOWlwiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiTlotQ0hBVFwiOiB7XG5cdFx0YTogXCJQYWNpZmljL0NoYXRoYW1cIixcblx0XHRyOiAxXG5cdH0sXG5cdE5hdmFqbzoge1xuXHRcdGE6IFwiQW1lcmljYS9EZW52ZXJcIixcblx0XHRyOiAxXG5cdH0sXG5cdFBSQzoge1xuXHRcdGE6IFwiQXNpYS9TaGFuZ2hhaVwiLFxuXHRcdHI6IDFcblx0fSxcblx0UFNUOFBEVDoge1xuXHRcdHU6IC00ODAsXG5cdFx0ZDogLTQyMFxuXHR9LFxuXHRcIlBhY2lmaWMvQXBpYVwiOiB7XG5cdFx0dTogNzgwLFxuXHRcdGM6IFtcblx0XHRcdFwiV1NcIlxuXHRcdF1cblx0fSxcblx0XCJQYWNpZmljL0F1Y2tsYW5kXCI6IHtcblx0XHR1OiA3MjAsXG5cdFx0ZDogNzgwLFxuXHRcdGM6IFtcblx0XHRcdFwiTlpcIixcblx0XHRcdFwiQVFcIlxuXHRcdF1cblx0fSxcblx0XCJQYWNpZmljL0JvdWdhaW52aWxsZVwiOiB7XG5cdFx0dTogNjYwLFxuXHRcdGM6IFtcblx0XHRcdFwiUEdcIlxuXHRcdF1cblx0fSxcblx0XCJQYWNpZmljL0NoYXRoYW1cIjoge1xuXHRcdHU6IDc2NSxcblx0XHRkOiA4MjUsXG5cdFx0YzogW1xuXHRcdFx0XCJOWlwiXG5cdFx0XVxuXHR9LFxuXHRcIlBhY2lmaWMvQ2h1dWtcIjoge1xuXHRcdHU6IDYwMCxcblx0XHRjOiBbXG5cdFx0XHRcIkZNXCJcblx0XHRdXG5cdH0sXG5cdFwiUGFjaWZpYy9FYXN0ZXJcIjoge1xuXHRcdHU6IC0zNjAsXG5cdFx0ZDogLTMwMCxcblx0XHRjOiBbXG5cdFx0XHRcIkNMXCJcblx0XHRdXG5cdH0sXG5cdFwiUGFjaWZpYy9FZmF0ZVwiOiB7XG5cdFx0dTogNjYwLFxuXHRcdGM6IFtcblx0XHRcdFwiVlVcIlxuXHRcdF1cblx0fSxcblx0XCJQYWNpZmljL0VuZGVyYnVyeVwiOiB7XG5cdFx0YTogXCJQYWNpZmljL0thbnRvblwiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJQYWNpZmljL0Zha2FvZm9cIjoge1xuXHRcdHU6IDc4MCxcblx0XHRjOiBbXG5cdFx0XHRcIlRLXCJcblx0XHRdXG5cdH0sXG5cdFwiUGFjaWZpYy9GaWppXCI6IHtcblx0XHR1OiA3MjAsXG5cdFx0ZDogNzgwLFxuXHRcdGM6IFtcblx0XHRcdFwiRkpcIlxuXHRcdF1cblx0fSxcblx0XCJQYWNpZmljL0Z1bmFmdXRpXCI6IHtcblx0XHR1OiA3MjAsXG5cdFx0YzogW1xuXHRcdFx0XCJUVlwiXG5cdFx0XVxuXHR9LFxuXHRcIlBhY2lmaWMvR2FsYXBhZ29zXCI6IHtcblx0XHR1OiAtMzYwLFxuXHRcdGM6IFtcblx0XHRcdFwiRUNcIlxuXHRcdF1cblx0fSxcblx0XCJQYWNpZmljL0dhbWJpZXJcIjoge1xuXHRcdHU6IC01NDAsXG5cdFx0YzogW1xuXHRcdFx0XCJQRlwiXG5cdFx0XVxuXHR9LFxuXHRcIlBhY2lmaWMvR3VhZGFsY2FuYWxcIjoge1xuXHRcdHU6IDY2MCxcblx0XHRjOiBbXG5cdFx0XHRcIlNCXCJcblx0XHRdXG5cdH0sXG5cdFwiUGFjaWZpYy9HdWFtXCI6IHtcblx0XHR1OiA2MDAsXG5cdFx0YzogW1xuXHRcdFx0XCJHVVwiLFxuXHRcdFx0XCJNUFwiXG5cdFx0XVxuXHR9LFxuXHRcIlBhY2lmaWMvSG9ub2x1bHVcIjoge1xuXHRcdHU6IC02MDAsXG5cdFx0YzogW1xuXHRcdFx0XCJVU1wiLFxuXHRcdFx0XCJVTVwiXG5cdFx0XVxuXHR9LFxuXHRcIlBhY2lmaWMvSm9obnN0b25cIjoge1xuXHRcdGE6IFwiUGFjaWZpYy9Ib25vbHVsdVwiLFxuXHRcdGM6IFtcblx0XHRcdFwiVU1cIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRcIlBhY2lmaWMvS2FudG9uXCI6IHtcblx0XHR1OiA3ODAsXG5cdFx0YzogW1xuXHRcdFx0XCJLSVwiXG5cdFx0XVxuXHR9LFxuXHRcIlBhY2lmaWMvS2lyaXRpbWF0aVwiOiB7XG5cdFx0dTogODQwLFxuXHRcdGM6IFtcblx0XHRcdFwiS0lcIlxuXHRcdF1cblx0fSxcblx0XCJQYWNpZmljL0tvc3JhZVwiOiB7XG5cdFx0dTogNjYwLFxuXHRcdGM6IFtcblx0XHRcdFwiRk1cIlxuXHRcdF1cblx0fSxcblx0XCJQYWNpZmljL0t3YWphbGVpblwiOiB7XG5cdFx0dTogNzIwLFxuXHRcdGM6IFtcblx0XHRcdFwiTUhcIlxuXHRcdF1cblx0fSxcblx0XCJQYWNpZmljL01hanVyb1wiOiB7XG5cdFx0dTogNzIwLFxuXHRcdGM6IFtcblx0XHRcdFwiTUhcIlxuXHRcdF1cblx0fSxcblx0XCJQYWNpZmljL01hcnF1ZXNhc1wiOiB7XG5cdFx0dTogLTUxMCxcblx0XHRjOiBbXG5cdFx0XHRcIlBGXCJcblx0XHRdXG5cdH0sXG5cdFwiUGFjaWZpYy9NaWR3YXlcIjoge1xuXHRcdGE6IFwiUGFjaWZpYy9QYWdvX1BhZ29cIixcblx0XHRjOiBbXG5cdFx0XHRcIlVNXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJQYWNpZmljL05hdXJ1XCI6IHtcblx0XHR1OiA3MjAsXG5cdFx0YzogW1xuXHRcdFx0XCJOUlwiXG5cdFx0XVxuXHR9LFxuXHRcIlBhY2lmaWMvTml1ZVwiOiB7XG5cdFx0dTogLTY2MCxcblx0XHRjOiBbXG5cdFx0XHRcIk5VXCJcblx0XHRdXG5cdH0sXG5cdFwiUGFjaWZpYy9Ob3Jmb2xrXCI6IHtcblx0XHR1OiA2NjAsXG5cdFx0ZDogNzIwLFxuXHRcdGM6IFtcblx0XHRcdFwiTkZcIlxuXHRcdF1cblx0fSxcblx0XCJQYWNpZmljL05vdW1lYVwiOiB7XG5cdFx0dTogNjYwLFxuXHRcdGM6IFtcblx0XHRcdFwiTkNcIlxuXHRcdF1cblx0fSxcblx0XCJQYWNpZmljL1BhZ29fUGFnb1wiOiB7XG5cdFx0dTogLTY2MCxcblx0XHRjOiBbXG5cdFx0XHRcIkFTXCIsXG5cdFx0XHRcIlVNXCJcblx0XHRdXG5cdH0sXG5cdFwiUGFjaWZpYy9QYWxhdVwiOiB7XG5cdFx0dTogNTQwLFxuXHRcdGM6IFtcblx0XHRcdFwiUFdcIlxuXHRcdF1cblx0fSxcblx0XCJQYWNpZmljL1BpdGNhaXJuXCI6IHtcblx0XHR1OiAtNDgwLFxuXHRcdGM6IFtcblx0XHRcdFwiUE5cIlxuXHRcdF1cblx0fSxcblx0XCJQYWNpZmljL1BvaG5wZWlcIjoge1xuXHRcdHU6IDY2MCxcblx0XHRjOiBbXG5cdFx0XHRcIkZNXCJcblx0XHRdXG5cdH0sXG5cdFwiUGFjaWZpYy9Qb25hcGVcIjoge1xuXHRcdGE6IFwiUGFjaWZpYy9Qb2hucGVpXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIlBhY2lmaWMvUG9ydF9Nb3Jlc2J5XCI6IHtcblx0XHR1OiA2MDAsXG5cdFx0YzogW1xuXHRcdFx0XCJQR1wiLFxuXHRcdFx0XCJBUVwiXG5cdFx0XVxuXHR9LFxuXHRcIlBhY2lmaWMvUmFyb3RvbmdhXCI6IHtcblx0XHR1OiAtNjAwLFxuXHRcdGM6IFtcblx0XHRcdFwiQ0tcIlxuXHRcdF1cblx0fSxcblx0XCJQYWNpZmljL1NhaXBhblwiOiB7XG5cdFx0YTogXCJQYWNpZmljL0d1YW1cIixcblx0XHRjOiBbXG5cdFx0XHRcIk1QXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0XCJQYWNpZmljL1NhbW9hXCI6IHtcblx0XHRhOiBcIlBhY2lmaWMvUGFnb19QYWdvXCIsXG5cdFx0YzogW1xuXHRcdFx0XCJXU1wiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiUGFjaWZpYy9UYWhpdGlcIjoge1xuXHRcdHU6IC02MDAsXG5cdFx0YzogW1xuXHRcdFx0XCJQRlwiXG5cdFx0XVxuXHR9LFxuXHRcIlBhY2lmaWMvVGFyYXdhXCI6IHtcblx0XHR1OiA3MjAsXG5cdFx0YzogW1xuXHRcdFx0XCJLSVwiXG5cdFx0XVxuXHR9LFxuXHRcIlBhY2lmaWMvVG9uZ2F0YXB1XCI6IHtcblx0XHR1OiA3ODAsXG5cdFx0YzogW1xuXHRcdFx0XCJUT1wiXG5cdFx0XVxuXHR9LFxuXHRcIlBhY2lmaWMvVHJ1a1wiOiB7XG5cdFx0YTogXCJQYWNpZmljL0NodXVrXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIlBhY2lmaWMvV2FrZVwiOiB7XG5cdFx0dTogNzIwLFxuXHRcdGM6IFtcblx0XHRcdFwiVU1cIlxuXHRcdF1cblx0fSxcblx0XCJQYWNpZmljL1dhbGxpc1wiOiB7XG5cdFx0dTogNzIwLFxuXHRcdGM6IFtcblx0XHRcdFwiV0ZcIlxuXHRcdF1cblx0fSxcblx0XCJQYWNpZmljL1lhcFwiOiB7XG5cdFx0YTogXCJQYWNpZmljL0NodXVrXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRQb2xhbmQ6IHtcblx0XHRhOiBcIkV1cm9wZS9XYXJzYXdcIixcblx0XHRyOiAxXG5cdH0sXG5cdFBvcnR1Z2FsOiB7XG5cdFx0YTogXCJFdXJvcGUvTGlzYm9uXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRST0M6IHtcblx0XHRhOiBcIkFzaWEvVGFpcGVpXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRST0s6IHtcblx0XHRhOiBcIkFzaWEvU2VvdWxcIixcblx0XHRyOiAxXG5cdH0sXG5cdFNpbmdhcG9yZToge1xuXHRcdGE6IFwiQXNpYS9TaW5nYXBvcmVcIixcblx0XHRjOiBbXG5cdFx0XHRcIlNHXCJcblx0XHRdLFxuXHRcdHI6IDFcblx0fSxcblx0VHVya2V5OiB7XG5cdFx0YTogXCJFdXJvcGUvSXN0YW5idWxcIixcblx0XHRyOiAxXG5cdH0sXG5cdFVDVDoge1xuXHRcdGE6IFwiRXRjL1VUQ1wiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJVUy9BbGFza2FcIjoge1xuXHRcdGE6IFwiQW1lcmljYS9BbmNob3JhZ2VcIixcblx0XHRyOiAxXG5cdH0sXG5cdFwiVVMvQWxldXRpYW5cIjoge1xuXHRcdGE6IFwiQW1lcmljYS9BZGFrXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIlVTL0FyaXpvbmFcIjoge1xuXHRcdGE6IFwiQW1lcmljYS9QaG9lbml4XCIsXG5cdFx0YzogW1xuXHRcdFx0XCJVU1wiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiVVMvQ2VudHJhbFwiOiB7XG5cdFx0YTogXCJBbWVyaWNhL0NoaWNhZ29cIixcblx0XHRyOiAxXG5cdH0sXG5cdFwiVVMvRWFzdC1JbmRpYW5hXCI6IHtcblx0XHRhOiBcIkFtZXJpY2EvSW5kaWFuYS9JbmRpYW5hcG9saXNcIixcblx0XHRyOiAxXG5cdH0sXG5cdFwiVVMvRWFzdGVyblwiOiB7XG5cdFx0YTogXCJBbWVyaWNhL05ld19Zb3JrXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIlVTL0hhd2FpaVwiOiB7XG5cdFx0YTogXCJQYWNpZmljL0hvbm9sdWx1XCIsXG5cdFx0YzogW1xuXHRcdFx0XCJVU1wiXG5cdFx0XSxcblx0XHRyOiAxXG5cdH0sXG5cdFwiVVMvSW5kaWFuYS1TdGFya2VcIjoge1xuXHRcdGE6IFwiQW1lcmljYS9JbmRpYW5hL0tub3hcIixcblx0XHRyOiAxXG5cdH0sXG5cdFwiVVMvTWljaGlnYW5cIjoge1xuXHRcdGE6IFwiQW1lcmljYS9EZXRyb2l0XCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIlVTL01vdW50YWluXCI6IHtcblx0XHRhOiBcIkFtZXJpY2EvRGVudmVyXCIsXG5cdFx0cjogMVxuXHR9LFxuXHRcIlVTL1BhY2lmaWNcIjoge1xuXHRcdGE6IFwiQW1lcmljYS9Mb3NfQW5nZWxlc1wiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJVUy9TYW1vYVwiOiB7XG5cdFx0YTogXCJQYWNpZmljL1BhZ29fUGFnb1wiLFxuXHRcdGM6IFtcblx0XHRcdFwiV1NcIlxuXHRcdF0sXG5cdFx0cjogMVxuXHR9LFxuXHRVVEM6IHtcblx0XHRhOiBcIkV0Yy9VVENcIixcblx0XHRyOiAxXG5cdH0sXG5cdFVuaXZlcnNhbDoge1xuXHRcdGE6IFwiRXRjL1VUQ1wiLFxuXHRcdHI6IDFcblx0fSxcblx0XCJXLVNVXCI6IHtcblx0XHRhOiBcIkV1cm9wZS9Nb3Njb3dcIixcblx0XHRyOiAxXG5cdH0sXG5cdFdFVDoge1xuXHRcdHU6IDAsXG5cdFx0ZDogNjBcblx0fSxcblx0WnVsdToge1xuXHRcdGE6IFwiRXRjL1VUQ1wiLFxuXHRcdHI6IDFcblx0fVxufTtcbnZhciBkYXRhID0ge1xuXHRjb3VudHJpZXM6IGNvdW50cmllcyQxLFxuXHR0aW1lem9uZXM6IHRpbWV6b25lcyQxXG59O1xuXG52YXIgdGltZXpvbmVzTWFwO1xuZnVuY3Rpb24gYnVpbGRDb3VudHJ5KGRhdGEsIGlkKSB7XG4gIHZhciBuYW1lID0gZGF0YS5jb3VudHJpZXNbaWRdO1xuICBpZiAoIW5hbWUpIHJldHVybiBudWxsO1xuICB2YXIgdHpNYXAgPSBnZXRUaW1lem9uZXNNYXAoZGF0YSlbaWRdIHx8IHt9O1xuICByZXR1cm4ge1xuICAgIGlkOiBpZCxcbiAgICBuYW1lOiBuYW1lLFxuICAgIHRpbWV6b25lczogdHpNYXAuY3VycmVudCB8fCBbXSxcbiAgICBhbGxUaW1lem9uZXM6IHR6TWFwLmFsbCB8fCBbXVxuICB9O1xufVxuXG5mdW5jdGlvbiBnZXRUaW1lem9uZXNNYXAoZGF0YSkge1xuICBpZiAoIXRpbWV6b25lc01hcCkgdGltZXpvbmVzTWFwID0gYnVpbGRUaW1lem9uZXNNYXAoZGF0YSk7XG4gIHJldHVybiB0aW1lem9uZXNNYXA7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkVGltZXpvbmVzTWFwKGRhdGEpIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKGRhdGEudGltZXpvbmVzKS5yZWR1Y2UoZnVuY3Rpb24gKHJlc3VsdCwgaWQpIHtcbiAgICB2YXIgdHogPSBkYXRhLnRpbWV6b25lc1tpZF07XG4gICAgdmFyIGMgPSB0ei5jLFxuICAgICAgICBhID0gdHouYTtcbiAgICB2YXIgYWxpYXNUeiA9IGRhdGEudGltZXpvbmVzW2FdIHx8IHt9O1xuICAgIHZhciBjb3VudHJpZXMgPSBjIHx8IGFsaWFzVHouYztcbiAgICBpZiAoIWNvdW50cmllcykgcmV0dXJuIHJlc3VsdDtcbiAgICBjb3VudHJpZXMuZm9yRWFjaChmdW5jdGlvbiAoY291bnRyeSkge1xuICAgICAgaWYgKCFyZXN1bHRbY291bnRyeV0pIE9iamVjdC5hc3NpZ24ocmVzdWx0LCBfZGVmaW5lUHJvcGVydHkoe30sIGNvdW50cnksIHtcbiAgICAgICAgY3VycmVudDogW10sXG4gICAgICAgIGFsbDogW11cbiAgICAgIH0pKTtcbiAgICAgIGlmICh0ei5yID09PSB1bmRlZmluZWQpIHJlc3VsdFtjb3VudHJ5XS5jdXJyZW50LnB1c2goaWQpO1xuICAgICAgcmVzdWx0W2NvdW50cnldLmFsbC5wdXNoKGlkKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9LCB7fSk7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkVGltZXpvbmUoZGF0YSwgbmFtZSkge1xuICB2YXIgdGltZXpvbmUgPSBkYXRhLnRpbWV6b25lc1tuYW1lXTtcbiAgaWYgKCF0aW1lem9uZSkgcmV0dXJuIG51bGw7XG4gIHZhciBfdGltZXpvbmUkYSA9IHRpbWV6b25lLmEsXG4gICAgICBhbGlhc09mID0gX3RpbWV6b25lJGEgPT09IHZvaWQgMCA/IG51bGwgOiBfdGltZXpvbmUkYTtcbiAgdmFyIGFsaWFzVHogPSBhbGlhc09mID8gZGF0YS50aW1lem9uZXNbYWxpYXNPZl0gOiB7fTtcblxuICB2YXIgdHogPSBfb2JqZWN0U3ByZWFkMihfb2JqZWN0U3ByZWFkMih7fSwgYWxpYXNUeiksIGRhdGEudGltZXpvbmVzW25hbWVdKTtcblxuICB2YXIgY291bnRyaWVzID0gdHouYyB8fCBbXTtcbiAgdmFyIHV0Y09mZnNldCA9IHR6LnU7XG4gIHZhciBkc3RPZmZzZXQgPSBOdW1iZXIuaXNJbnRlZ2VyKHR6LmQpID8gdHouZCA6IHV0Y09mZnNldDtcbiAgdmFyIHJlc3VsdCA9IHtcbiAgICBuYW1lOiBuYW1lLFxuICAgIGNvdW50cmllczogY291bnRyaWVzLFxuICAgIHV0Y09mZnNldDogdXRjT2Zmc2V0LFxuICAgIHV0Y09mZnNldFN0cjogZ2V0T2Zmc2V0U3RyKHV0Y09mZnNldCksXG4gICAgZHN0T2Zmc2V0OiBkc3RPZmZzZXQsXG4gICAgZHN0T2Zmc2V0U3RyOiBnZXRPZmZzZXRTdHIoZHN0T2Zmc2V0KSxcbiAgICBhbGlhc09mOiBhbGlhc09mXG4gIH07XG4gIGlmICh0aW1lem9uZS5yKSByZXN1bHQuZGVwcmVjYXRlZCA9IHRydWU7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIGdldE9mZnNldFN0cihvZmZzZXQpIHtcbiAgdmFyIGhvdXJzID0gTWF0aC5mbG9vcihvZmZzZXQgLyA2MCk7XG4gIHZhciBtaW4gPSBvZmZzZXQgJSA2MDtcbiAgdmFyIHNpZ24gPSBvZmZzZXQgPCAwID8gJy0nIDogJysnO1xuICByZXR1cm4gXCJcIi5jb25jYXQoc2lnbikuY29uY2F0KGdldE51bVN0cihob3VycyksIFwiOlwiKS5jb25jYXQoZ2V0TnVtU3RyKG1pbikpO1xufVxuXG5mdW5jdGlvbiBnZXROdW1TdHIoaW5wdXQpIHtcbiAgdmFyIG51bSA9IE1hdGguYWJzKGlucHV0KTtcbiAgdmFyIHByZWZpeCA9IG51bSA8IDEwID8gJzAnIDogJyc7XG4gIHJldHVybiBcIlwiLmNvbmNhdChwcmVmaXgpLmNvbmNhdChudW0pO1xufVxuXG52YXIgX2V4Y2x1ZGVkID0gW1wiYWxsVGltZXpvbmVzXCJdO1xudmFyIHRvdGFsVGltZXpvbmVzID0gT2JqZWN0LmtleXMoZGF0YS50aW1lem9uZXMpLmxlbmd0aDtcbnZhciBjb3VudHJpZXMgPSB7fTtcbnZhciB0aW1lem9uZXMgPSB7fTtcbnZhciBtZW1vaXplZFRpbWV6b25lcyA9IDA7XG5mdW5jdGlvbiBnZXRBbGxDb3VudHJpZXMoKSB7XG4gIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKGRhdGEuY291bnRyaWVzKS5yZWR1Y2UoZnVuY3Rpb24gKHByZXYsIGlkKSB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24ocHJldiwgX2RlZmluZVByb3BlcnR5KHt9LCBpZCwgZ2V0Q291bnRyeShpZCwgb3B0aW9ucykpKTtcbiAgfSwge30pO1xufVxuZnVuY3Rpb24gZ2V0QWxsVGltZXpvbmVzKCkge1xuICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG4gIGlmICh0b3RhbFRpbWV6b25lcyAhPT0gbWVtb2l6ZWRUaW1lem9uZXMpIE9iamVjdC5rZXlzKGRhdGEudGltZXpvbmVzKS5mb3JFYWNoKGdldFRpbWV6b25lKTtcbiAgcmV0dXJuIGRlbGl2ZXJUaW1lem9uZXModGltZXpvbmVzLCBvcHRpb25zKTtcbn1cbmZ1bmN0aW9uIGdldENvdW50cnkoaWQpIHtcbiAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICBpZiAoIWNvdW50cmllc1tpZF0pIG1lbW9pemVDb3VudHJ5KGJ1aWxkQ291bnRyeShkYXRhLCBpZCkpO1xuICByZXR1cm4gZGVsaXZlckNvdW50cnkoY291bnRyaWVzW2lkXSwgb3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIG1lbW9pemVDb3VudHJ5KGNvdW50cnkpIHtcbiAgaWYgKCFjb3VudHJ5KSByZXR1cm47XG4gIGNvdW50cmllc1tjb3VudHJ5LmlkXSA9IGNvdW50cnk7XG59XG5cbmZ1bmN0aW9uIGdldFRpbWV6b25lKG5hbWUpIHtcbiAgaWYgKCF0aW1lem9uZXNbbmFtZV0pIG1lbW9pemVUaW1lem9uZShidWlsZFRpbWV6b25lKGRhdGEsIG5hbWUpKTtcbiAgcmV0dXJuIHRpbWV6b25lc1tuYW1lXSA/IF9vYmplY3RTcHJlYWQyKHt9LCB0aW1lem9uZXNbbmFtZV0pIDogbnVsbDtcbn1cblxuZnVuY3Rpb24gbWVtb2l6ZVRpbWV6b25lKHRpbWV6b25lKSB7XG4gIGlmICghdGltZXpvbmUpIHJldHVybjtcbiAgdGltZXpvbmVzW3RpbWV6b25lLm5hbWVdID0gdGltZXpvbmU7XG4gIG1lbW9pemVkVGltZXpvbmVzID0gT2JqZWN0LmtleXModGltZXpvbmUpLmxlbmd0aDtcbn1cblxuZnVuY3Rpb24gZ2V0Q291bnRyaWVzRm9yVGltZXpvbmUodHpOYW1lKSB7XG4gIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgdmFyIHRpbWV6b25lID0gZ2V0VGltZXpvbmUodHpOYW1lKSB8fCB7fTtcbiAgdmFyIHZhbHVlcyA9IHRpbWV6b25lLmNvdW50cmllcyB8fCBbXTtcbiAgcmV0dXJuIHZhbHVlcy5tYXAoZnVuY3Rpb24gKGMpIHtcbiAgICByZXR1cm4gZ2V0Q291bnRyeShjLCBvcHRpb25zKTtcbiAgfSk7XG59XG5mdW5jdGlvbiBnZXRDb3VudHJ5Rm9yVGltZXpvbmUodHpOYW1lKSB7XG4gIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcblxuICB2YXIgX2dldENvdW50cmllc0ZvclRpbWV6ID0gZ2V0Q291bnRyaWVzRm9yVGltZXpvbmUodHpOYW1lLCBvcHRpb25zKSxcbiAgICAgIF9nZXRDb3VudHJpZXNGb3JUaW1lejIgPSBfc2xpY2VkVG9BcnJheShfZ2V0Q291bnRyaWVzRm9yVGltZXosIDEpLFxuICAgICAgbWFpbiA9IF9nZXRDb3VudHJpZXNGb3JUaW1lejJbMF07XG5cbiAgcmV0dXJuIG1haW4gfHwgbnVsbDtcbn1cbmZ1bmN0aW9uIGdldFRpbWV6b25lc0ZvckNvdW50cnkoY291bnRyeUlkKSB7XG4gIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgdmFyIGNvdW50cnkgPSBnZXRDb3VudHJ5KGNvdW50cnlJZCwgb3B0aW9ucyk7XG4gIGlmICghY291bnRyeSkgcmV0dXJuIG51bGw7XG4gIHZhciB2YWx1ZXMgPSBjb3VudHJ5LnRpbWV6b25lcyB8fCBbXTtcbiAgcmV0dXJuIHZhbHVlcy5tYXAoZ2V0VGltZXpvbmUpO1xufVxuXG5mdW5jdGlvbiBkZWxpdmVyVGltZXpvbmVzKHR6cywgb3B0aW9ucykge1xuICB2YXIgX3JlZiA9IG9wdGlvbnMgfHwge30sXG4gICAgICBkZXByZWNhdGVkID0gX3JlZi5kZXByZWNhdGVkO1xuXG4gIGlmIChkZXByZWNhdGVkID09PSB0cnVlKSByZXR1cm4gdHpzO1xuICByZXR1cm4gT2JqZWN0LmtleXModHpzKS5yZWR1Y2UoZnVuY3Rpb24gKHByZXYsIGtleSkge1xuICAgIGlmICghdHpzW2tleV0uZGVwcmVjYXRlZCkgT2JqZWN0LmFzc2lnbihwcmV2LCBfZGVmaW5lUHJvcGVydHkoe30sIGtleSwgdHpzW2tleV0pKTtcbiAgICByZXR1cm4gcHJldjtcbiAgfSwge30pO1xufVxuXG5mdW5jdGlvbiBkZWxpdmVyQ291bnRyeShjb3VudHJ5LCBvcHRpb25zKSB7XG4gIGlmICghY291bnRyeSkgcmV0dXJuIG51bGw7XG5cbiAgdmFyIF9yZWYyID0gb3B0aW9ucyB8fCB7fSxcbiAgICAgIGRlcHJlY2F0ZWQgPSBfcmVmMi5kZXByZWNhdGVkO1xuXG4gIGNvdW50cnkuYWxsVGltZXpvbmVzO1xuICAgICAgdmFyIG90aGVyID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKGNvdW50cnksIF9leGNsdWRlZCk7XG5cbiAgdmFyIHR6ID0gZGVwcmVjYXRlZCA/IGNvdW50cnkuYWxsVGltZXpvbmVzIDogY291bnRyeS50aW1lem9uZXM7XG4gIHJldHVybiBfb2JqZWN0U3ByZWFkMihfb2JqZWN0U3ByZWFkMih7fSwgb3RoZXIpLCB7fSwge1xuICAgIHRpbWV6b25lczogdHpcbiAgfSk7XG59XG5cbnZhciBpbmRleCA9IHtcbiAgZ2V0Q291bnRyeTogZ2V0Q291bnRyeSxcbiAgZ2V0VGltZXpvbmU6IGdldFRpbWV6b25lLFxuICBnZXRBbGxDb3VudHJpZXM6IGdldEFsbENvdW50cmllcyxcbiAgZ2V0QWxsVGltZXpvbmVzOiBnZXRBbGxUaW1lem9uZXMsXG4gIGdldFRpbWV6b25lc0ZvckNvdW50cnk6IGdldFRpbWV6b25lc0ZvckNvdW50cnksXG4gIGdldENvdW50cmllc0ZvclRpbWV6b25lOiBnZXRDb3VudHJpZXNGb3JUaW1lem9uZSxcbiAgZ2V0Q291bnRyeUZvclRpbWV6b25lOiBnZXRDb3VudHJ5Rm9yVGltZXpvbmVcbn07XG5cbmV4cG9ydCB7IGluZGV4IGFzIGRlZmF1bHQsIGdldEFsbENvdW50cmllcywgZ2V0QWxsVGltZXpvbmVzLCBnZXRDb3VudHJpZXNGb3JUaW1lem9uZSwgZ2V0Q291bnRyeSwgZ2V0Q291bnRyeUZvclRpbWV6b25lLCBnZXRUaW1lem9uZSwgZ2V0VGltZXpvbmVzRm9yQ291bnRyeSB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGluaXRFdmVudHMgfSBmcm9tIFwiLi9tb2R1bGVzL29iamVjdHMvVUlcIjtcbmltcG9ydCB7IGdldFdlYXRoZXIgfSBmcm9tIFwiLi9tb2R1bGVzL3V0aWwvRGF0YUZldGNoZXIuanNcIjtcbmltcG9ydCB7IGdldEN1cnJlbnRUaW1lRnJvbVVUQyB9IGZyb20gXCIuL21vZHVsZXMvdXRpbC9UaW1lXCI7XG5jb25zb2xlLmxvZyhnZXRXZWF0aGVyKFwibWFuaWxhXCIpKTtcbmluaXRFdmVudHMoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==