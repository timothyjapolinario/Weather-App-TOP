/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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

const Weather = (weather, description, location, temperature, wind) => {
  const state = {
    weather,
    description,
    location,
    temperature,
    wind,
  };
  return Object.assign(Object.create(weatherInterface()), state);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Weather);


/***/ }),

/***/ "./src/modules/util/DataFetcher":
/*!**************************************!*\
  !*** ./src/modules/util/DataFetcher ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getWeather": () => (/* binding */ getWeather),
/* harmony export */   "weatherAPIKey": () => (/* binding */ weatherAPIKey)
/* harmony export */ });
/* harmony import */ var _WeatherMapper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WeatherMapper */ "./src/modules/util/WeatherMapper.js");

const weatherAPIKey = "505fa3efb086bd23d8571b744ea64b69";
const getWeather = async function dataFetcherFromWeatherAPI(location) {
  try {
    const weatherData = fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${weatherAPIKey}`,
      { mode: "cors" }
    )
      .then((response) => {
        //console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const weather = (0,_WeatherMapper__WEBPACK_IMPORTED_MODULE_0__.mapRawToWeatherObject)(data);
        console.log(weather);
        return weather;
      });
    return weatherData;
  } catch (error) {
    console.log("Error fetching data of weather");
  }
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
    raw.name,
    raw.main.temp,
    raw.wind.speed
  );
  return weather;
};




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
/* harmony import */ var _modules_util_DataFetcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/util/DataFetcher */ "./src/modules/util/DataFetcher");


(0,_modules_util_DataFetcher__WEBPACK_IMPORTED_MODULE_0__.getWeather)("manila");

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLE9BQU8sRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNmaUM7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyREFBMkQsU0FBUyxTQUFTLGNBQWM7QUFDM0YsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSx3QkFBd0IscUVBQXFCO0FBQzdDO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVxQzs7Ozs7Ozs7Ozs7Ozs7OztBQ3hCSTtBQUN6QztBQUNBLGtCQUFrQiw0REFBTztBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVpQzs7Ozs7OztVQ1pqQztVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTndEOztBQUV4RCxxRUFBVSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLXRvcC8uL3NyYy9tb2R1bGVzL29iamVjdHMvV2VhdGhlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC10b3AvLi9zcmMvbW9kdWxlcy91dGlsL0RhdGFGZXRjaGVyIiwid2VicGFjazovL3dlYXRoZXItYXBwLXRvcC8uL3NyYy9tb2R1bGVzL3V0aWwvV2VhdGhlck1hcHBlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC10b3Avd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAtdG9wL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC10b3Avd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC10b3Avd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC10b3AvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgd2VhdGhlckludGVyZmFjZSA9ICgpID0+ICh7XG4gIHR5cGU6IFwid2VhdGhlckludGVyZmFjZVwiLFxufSk7XG5cbmNvbnN0IFdlYXRoZXIgPSAod2VhdGhlciwgZGVzY3JpcHRpb24sIGxvY2F0aW9uLCB0ZW1wZXJhdHVyZSwgd2luZCkgPT4ge1xuICBjb25zdCBzdGF0ZSA9IHtcbiAgICB3ZWF0aGVyLFxuICAgIGRlc2NyaXB0aW9uLFxuICAgIGxvY2F0aW9uLFxuICAgIHRlbXBlcmF0dXJlLFxuICAgIHdpbmQsXG4gIH07XG4gIHJldHVybiBPYmplY3QuYXNzaWduKE9iamVjdC5jcmVhdGUod2VhdGhlckludGVyZmFjZSgpKSwgc3RhdGUpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgV2VhdGhlcjtcbiIsImltcG9ydCB7IG1hcFJhd1RvV2VhdGhlck9iamVjdCB9IGZyb20gXCIuL1dlYXRoZXJNYXBwZXJcIjtcbmNvbnN0IHdlYXRoZXJBUElLZXkgPSBcIjUwNWZhM2VmYjA4NmJkMjNkODU3MWI3NDRlYTY0YjY5XCI7XG5jb25zdCBnZXRXZWF0aGVyID0gYXN5bmMgZnVuY3Rpb24gZGF0YUZldGNoZXJGcm9tV2VhdGhlckFQSShsb2NhdGlvbikge1xuICB0cnkge1xuICAgIGNvbnN0IHdlYXRoZXJEYXRhID0gZmV0Y2goXG4gICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2xvY2F0aW9ufSZhcHBpZD0ke3dlYXRoZXJBUElLZXl9YCxcbiAgICAgIHsgbW9kZTogXCJjb3JzXCIgfVxuICAgIClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAvL2NvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgY29uc3Qgd2VhdGhlciA9IG1hcFJhd1RvV2VhdGhlck9iamVjdChkYXRhKTtcbiAgICAgICAgY29uc29sZS5sb2cod2VhdGhlcik7XG4gICAgICAgIHJldHVybiB3ZWF0aGVyO1xuICAgICAgfSk7XG4gICAgcmV0dXJuIHdlYXRoZXJEYXRhO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgZmV0Y2hpbmcgZGF0YSBvZiB3ZWF0aGVyXCIpO1xuICB9XG59O1xuXG5leHBvcnQgeyBnZXRXZWF0aGVyLCB3ZWF0aGVyQVBJS2V5IH07XG4iLCJpbXBvcnQgV2VhdGhlciBmcm9tIFwiLi4vb2JqZWN0cy9XZWF0aGVyXCI7XG5jb25zdCBtYXBSYXdUb1dlYXRoZXJPYmplY3QgPSAocmF3KSA9PiB7XG4gIGNvbnN0IHdlYXRoZXIgPSBXZWF0aGVyKFxuICAgIHJhdy53ZWF0aGVyWzBdLm1haW4sXG4gICAgcmF3LndlYXRoZXJbMF0uZGVzY3JpcHRpb24sXG4gICAgcmF3Lm5hbWUsXG4gICAgcmF3Lm1haW4udGVtcCxcbiAgICByYXcud2luZC5zcGVlZFxuICApO1xuICByZXR1cm4gd2VhdGhlcjtcbn07XG5cbmV4cG9ydCB7IG1hcFJhd1RvV2VhdGhlck9iamVjdCB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBnZXRXZWF0aGVyIH0gZnJvbSBcIi4vbW9kdWxlcy91dGlsL0RhdGFGZXRjaGVyXCI7XG5cbmdldFdlYXRoZXIoXCJtYW5pbGFcIik7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=