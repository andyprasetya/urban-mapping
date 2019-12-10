// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/styles/styles.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./../images/bg-desktop.jpg":[["bg-desktop.9ab09ccb.jpg","src/images/bg-desktop.jpg"],"src/images/bg-desktop.jpg"],"./../images/bg-tablet.jpg":[["bg-tablet.1f5fbaf2.jpg","src/images/bg-tablet.jpg"],"src/images/bg-tablet.jpg"],"./../images/bg-mobile.jpg":[["bg-mobile.e2e8c3b5.jpg","src/images/bg-mobile.jpg"],"src/images/bg-mobile.jpg"],"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.circlesLayout = exports.circleRadius = exports.circleOpacity = exports.heatmapOpacity = exports.heatmapRadius = exports.heatmapIntensity = exports.h = exports.HEATMAP_SHADES = exports.HEATMAP_ZERO = exports.getHeatColors = exports.pointSqrtCount = exports.PALETTES = exports.STYLES = exports.Tokens = exports.isDevelopment = void 0;

var _utils = require("./utils");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var isDevelopment = "development" === "development";
exports.isDevelopment = isDevelopment;
var Tokens = {
  development: "pk.eyJ1IjoiZHF1bmJwIiwiYSI6ImNqd3VuaGZyeTAwYTEzeW1oeHo3NHh1cnMifQ.AzNgwn8crwuAXGPmasjlzA",
  production: "pk.eyJ1IjoiZHF1bmJwIiwiYSI6ImNrM3l6dnNlNjBkZXAzbXAzMjh0d2g1NDcifQ.ShlseQwBKgaBIjKKhfkg3g"
};
exports.Tokens = Tokens;
var stylePath = "mapbox://styles/mapbox";
var STYLES = {
  dark: "".concat(stylePath, "/dark-v10"),
  satellite: "".concat(stylePath, "/satellite-v9")
};
exports.STYLES = STYLES;
var PALETTES = {
  red: ["#FAE26B", "#DC4942", "#EA5C33", "#A82D4A", "#4E136C"]
};
exports.PALETTES = PALETTES;
var pointSqrtCount = ["case", ["has", "sqrt_point_count"], ["get", "sqrt_point_count"], 1];
exports.pointSqrtCount = pointSqrtCount;

var getHeatColors = function getHeatColors(palette) {
  return ["interpolate", ["linear"], ["heatmap-density"]].concat(_toConsumableArray((0, _utils.buildHeatmapDencity)(palette, true)));
};

exports.getHeatColors = getHeatColors;
var HEATMAP_ZERO = [0, "rgba(33,102,172,0)"];
exports.HEATMAP_ZERO = HEATMAP_ZERO;
var HEATMAP_SHADES = [0.2, 0.4, 0.6, 0.8, 1];
exports.HEATMAP_SHADES = HEATMAP_SHADES;
var h = 9; // heatmapDissapearingZoom

exports.h = h;
var heatmapIntensity = ["interpolate", ["linear"], ["zoom"], 0, 2, h, 4];
exports.heatmapIntensity = heatmapIntensity;
var heatmapRadius = ["interpolate", ["linear"], ["zoom"], 0, 2, h, 20];
exports.heatmapRadius = heatmapRadius;
var heatmapOpacity = ["interpolate", ["linear"], ["zoom"], 7, 1, h, 0];
exports.heatmapOpacity = heatmapOpacity;
var circleOpacity = ["interpolate", ["linear"], ["zoom"], 6, 0.5, 15, 1];
exports.circleOpacity = circleOpacity;
var circleRadius = ["interpolate", ["linear"], ["zoom"], 10, 2, 22, 4];
exports.circleRadius = circleRadius;
var circlesLayout = {
  "circle-sort-key": ["get", "sqrt_point_count"]
};
exports.circlesLayout = circlesLayout;
},{"./utils":"src/utils.js"}],"src/layers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadHeatLayer = loadHeatLayer;
exports.loadCircleLayer = loadCircleLayer;
exports.removeDelay = void 0;

var _constants = require("./constants");

var removeDelay = 150;
exports.removeDelay = removeDelay;

function loadHeatLayer(map, before) {
  var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "gt-heat";
  var source = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "gt-points";
  var palette = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _constants.PALETTES.red;
  map.addLayer({
    id: id,
    type: "heatmap",
    source: source,
    "source-layer": "points",
    maxzoom: _constants.h,
    paint: {
      // Increase the heatmap weight based on frequency and property magnitude
      "heatmap-weight": ["interpolate", ["linear"], _constants.pointSqrtCount, 0, 0, 500, 1],
      // Increase the heatmap color weight weight by zoom level
      // heatmap-intensity is a multiplier on top of heatmap-weight
      "heatmap-intensity": _constants.heatmapIntensity,
      // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
      // Begin color ramp at 0-stop with a 0-transparancy color
      // to create a blur-like effect.
      "heatmap-color": (0, _constants.getHeatColors)(palette),
      // Adjust the heatmap radius by zoom level
      "heatmap-radius": _constants.heatmapRadius,
      // Transition from heatmap to circle layer by zoom level
      "heatmap-opacity": 0
    }
  }, before);
  map.setPaintProperty(id, "heatmap-opacity", _constants.heatmapOpacity); // return () => {
  //   map.setPaintProperty(id, "heatmap-opacity", 0);
  //   setTimeout(() => map.removeLayer(id), removeDelay);
  // };

  return id;
}

function loadCircleLayer(map, before) {
  var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "gt-points";
  var source = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "gt-points";
  var palette = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _constants.PALETTES.red;
  map.addLayer({
    id: id,
    type: "circle",
    source: source,
    "source-layer": "points",
    minzoom: 8,
    layout: _constants.circlesLayout,
    paint: {
      "circle-radius": _constants.circleRadius,
      "circle-color": "yellow",
      //palette[0],
      "circle-stroke-width": 1,
      "circle-stroke-color": palette[0],
      "circle-opacity": 0,
      "circle-stroke-opacity": 0
    }
  }, before);
  map.setPaintProperty(id, "circle-stroke-opacity", _constants.circleOpacity);
  map.setPaintProperty(id, "circle-opacity", _constants.circleOpacity); // return () => {
  //   map.setPaintProperty(id, "circle-opacity", 0);
  //   setTimeout(() => map.removeLayer(id), removeDelay);
  // };

  return id;
}
},{"./constants":"src/constants.js"}],"src/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeLabels = removeLabels;
exports.buildHeatmapDencity = buildHeatmapDencity;
exports.getLabelsLayer = getLabelsLayer;
exports.createInteractionsSwitcher = createInteractionsSwitcher;
exports.switchDataLayers = exports.createLayersKeeper = exports.getCircleColor = exports.zip = void 0;

var _constants = require("./constants");

var _layers = require("./layers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function removeLabels(map) {
  return map.getStyle().layers.reduce(function (removed, layer) {
    if (layer.type === "symbol") map.removeLayer(layer.id);
    return [].concat(_toConsumableArray(removed), [layer.id]);
  }, []);
}

var zip = function zip() {
  for (var _len = arguments.length, arrays = new Array(_len), _key = 0; _key < _len; _key++) {
    arrays[_key] = arguments[_key];
  }

  var maxLength = Math.max.apply(Math, _toConsumableArray(arrays.map(function (x) {
    return x.length;
  })));
  return Array.from({
    length: maxLength
  }).map(function (_, i) {
    return Array.from({
      length: arrays.length
    }, function (_, k) {
      return arrays[k][i];
    });
  });
};

exports.zip = zip;

function buildHeatmapDencity() {
  var palete = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _constants.PALETTES.red;
  var reverse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var result = _constants.HEATMAP_ZERO.concat(zip(_constants.HEATMAP_SHADES, reverse ? palete.slice().reverse() : palete));

  return result.flat();
}

function getLabelsLayer(style) {
  var layers = style.layers;
  var firstSymbolId = null;

  for (var i = 0; i < layers.length; i++) {
    if (layers[i].type === "symbol") {
      firstSymbolId = layers[i].id;
      break;
    }
  }

  return firstSymbolId;
}

function createInteractionsSwitcher(map) {
  var interactions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "all";
  var allInteractions = ["scrollZoom", "boxZoom", "dragRotate", "dragPan", "keyboard", "doubleClickZoom", "touchZoomRotate"];
  var handlers = interactions === "all" ? allInteractions : interactions;
  return function (enable) {
    var operation = enable ? "enable" : "disable";
    handlers.forEach(function (h) {
      return map[h][operation]();
    });
  };
}

var getCircleColor = function getCircleColor(colorSteps) {
  return ["interpolate", ["linear"], _constants.pointSqrtCount].concat(_toConsumableArray(colorSteps));
};

exports.getCircleColor = getCircleColor;

var createLayersKeeper = function createLayersKeeper(map) {
  var keepLayers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var layerIds = [],
      sourceIds = [],
      before = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = keepLayers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var l = _step.value;
      layerIds.push(l.id);
      sourceIds.push(l.source || l.id);
      if (l.before) before[l.id] = l.before;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var filterLayers = function filterLayers(_ref) {
    var id = _ref.id;
    return layerIds.some(function (l) {
      return id.startsWith(l);
    });
  };

  var filterSources = function filterSources(id) {
    return sourceIds.some(function (s) {
      return id.startsWith(s);
    });
  }; // const filterLayers = l => layerIds.indexOf(l.id) !== -1;
  // const filterSources = id => sourceIds.indexOf(id) !== -1;


  return function (nextStyle) {
    var onStyleChanged = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
    var currentStyle = map.getStyle();
    var dataLayers = currentStyle.layers.filter(filterLayers);
    var dataSources = Object.keys(currentStyle.sources).filter(filterSources).reduce(function (acc, s) {
      return _objectSpread({}, acc, _defineProperty({}, s, currentStyle.sources[s]));
    }, {});
    map.setStyle(nextStyle);
    map.once("styledata", function () {
      var style = map.getStyle();
      onStyleChanged(style);
      var layers = style.layers;
      var nextLayerIds = layers.map(function (_ref2) {
        var id = _ref2.id;
        return id;
      });
      Object.keys(dataSources).forEach(function (s) {
        return map.addSource(s, dataSources[s]);
      });
      dataLayers.forEach(function (l) {
        var boforeIndex = nextLayerIds.indexOf(before[l.id]);
        map.addLayer(l, boforeIndex !== -1 ? before[l.id] : undefined);
        layers.splice(boforeIndex, 0);
      });
    });
  };
};

exports.createLayersKeeper = createLayersKeeper;

var switchDataLayers = function switchDataLayers(id, map, before, currentDataLayers) {
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = currentDataLayers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var l = _step2.value;
      map.removeLayer(l);
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  var heatId = (0, _layers.loadHeatLayer)(map, before, "heat-".concat(id), "points-".concat(id));
  var circlesId = (0, _layers.loadCircleLayer)(map, "heat-".concat(id), "points-".concat(id), "points-".concat(id));
  return [heatId, circlesId];
};

exports.switchDataLayers = switchDataLayers;
},{"./constants":"src/constants.js","./layers":"src/layers.js"}],"src/sources.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadGTPointsSource = loadGTPointsSource;
exports.loadOSMPointsSource = loadOSMPointsSource;

function loadGTPointsSource(map) {
  map.addSource("points-gt", {
    type: "vector",
    url: "https://demo.geoalert.io/data/GT_cluster_densest_as_needed_max25K_features_max100Kbytes.json"
  });
}

function loadOSMPointsSource(map) {
  map.addSource("points-osm", {
    type: "vector",
    url: "https://demo.geoalert.io/data/OSM_cluster_densest_as_needed_max25K_features_max100Kbytes.json"
  });
}
},{}],"src/index.js":[function(require,module,exports) {
"use strict";

require("./styles/styles");

var _utils = require("./utils");

var _layers = require("./layers");

var _sources = require("./sources");

var _constants = require("./constants");

/* globals mapboxgl */
// import "mapbox-gl/dist/mapbox-gl.css";
// import mapboxgl from "mapbox-gl";
var mapNode = document.getElementById("map");
var info = document.getElementById("footer-info");
var header = document.getElementById("header");
var navbar = document.getElementById("navbar");
var controls = document.getElementById("footer-controls");

var showNavbar = function showNavbar() {
  return navbar.style.animationName = "appearsFromTop";
};

var showHeader = function showHeader() {
  return header.style.animationName = "appearsFromTop";
};

var hideHeader = function hideHeader() {
  return header.style.animationName = "vanishToTop";
};

var showInfo = function showInfo() {
  return info.style.animationName = "appearsFromBottom";
};

var hideInfo = function hideInfo() {
  return info.style.animationName = "vanishToBottom";
};

var showControls = function showControls() {
  return controls.style.animationName = "appearsFromBottom";
};

var hideControls = function hideControls() {
  return info.style.animationName = "vanishToBottom";
}; // window.addEventListener("resize", function() {
//   let vh = window.innerHeight * 0.01;
//   document.documentElement.style.setProperty("--vh", `${vh}px`);
// });
// showControls();


showInfo();
showHeader();
showNavbar(); // const hidePlacehoder = () => mapNode.classList.add("loaded");
// hidePlacehoder();

var exploreBtn = document.getElementById("explore");
exploreBtn.addEventListener("click", startExploring);
var map,
    setStyle,
    switchInteractions,
    labelsLayerId,
    currentDataLayers = [];
var accessToken = _constants.isDevelopment ? _constants.Tokens.development : _constants.Tokens.production;
setTimeout(function () {
  map = new mapboxgl.Map({
    accessToken: accessToken,
    container: mapNode,
    style: "mapbox://styles/mapbox/dark-v10",
    zoom: 2.71,
    center: [83.66, 58.56],
    minZoom: 2.71,
    // hash: true,
    attributionControl: false
  });
  switchInteractions = (0, _utils.createInteractionsSwitcher)(map);
  map.once("styledata", function () {
    (0, _utils.removeLabels)(map);
    labelsLayerId = (0, _utils.getLabelsLayer)(map.getStyle());
    (0, _sources.loadGTPointsSource)(map);
    (0, _sources.loadOSMPointsSource)(map);
    var heatId = (0, _layers.loadHeatLayer)(map, labelsLayerId, "heat-gt", "points-gt");
    var circlesId = (0, _layers.loadCircleLayer)(map, "heat-gt", "points-gt", "points-gt");
    currentDataLayers = currentDataLayers.concat([heatId, circlesId]);
    switchInteractions(false);
    map.getCanvas().style.cursor = "default";
  });
}, 100);

function startExploring() {
  hideHeader();
  hideInfo();
  showControls();
  map.flyTo({
    duration: 10000,
    zoom: 15.65,
    center: [37.162168, 55.698564]
  });
  setTimeout(function () {
    switchInteractions(true);
    map.getCanvas().style.cursor = "";
    toggleBaseMap({
      passedId: "satellite"
    });
  }, 1500);
}

var keepLayers = [{
  id: "points-gt",
  before: labelsLayerId
}, {
  id: "points-osm",
  before: labelsLayerId
}, {
  id: "heat-gt",
  before: labelsLayerId
}, {
  id: "heat-osm",
  before: labelsLayerId
}];
setTimeout(function () {
  setStyle = (0, _utils.createLayersKeeper)(map, keepLayers);
}, 101);

function onStyleChanged(style) {
  labelsLayerId = (0, _utils.getLabelsLayer)(style);
}

var baseMapTogglers = document.getElementsByClassName("basemap-toggle");
var prevStyleId;

function toggleBaseMap(_ref) {
  var passedId = _ref.passedId;
  var id = passedId || this.id;
  if (id === prevStyleId) return;
  prevStyleId = id;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = baseMapTogglers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var t = _step.value;
      t.classList.toggle("is-focused");
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  setStyle(_constants.STYLES[id], onStyleChanged);
}

var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
  for (var _iterator2 = baseMapTogglers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
    var t = _step2.value;
    t.addEventListener("click", toggleBaseMap);
  }
} catch (err) {
  _didIteratorError2 = true;
  _iteratorError2 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
      _iterator2.return();
    }
  } finally {
    if (_didIteratorError2) {
      throw _iteratorError2;
    }
  }
}

var dataLayerTogglers = document.getElementsByClassName("datalayer-toggle");
var prevLayerId;

function toggleDataLayer() {
  var id = this.id;
  if (id === prevLayerId) return;
  prevLayerId = id;
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = dataLayerTogglers[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var t = _step3.value;
      t.classList.toggle("is-focused");
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  currentDataLayers = (0, _utils.switchDataLayers)(id, map, labelsLayerId, currentDataLayers);
}

var _iteratorNormalCompletion4 = true;
var _didIteratorError4 = false;
var _iteratorError4 = undefined;

try {
  for (var _iterator4 = dataLayerTogglers[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
    var _t = _step4.value;

    _t.addEventListener("click", toggleDataLayer);
  }
} catch (err) {
  _didIteratorError4 = true;
  _iteratorError4 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
      _iterator4.return();
    }
  } finally {
    if (_didIteratorError4) {
      throw _iteratorError4;
    }
  }
}
},{"./styles/styles":"src/styles/styles.scss","./utils":"src/utils.js","./layers":"src/layers.js","./sources":"src/sources.js","./constants":"src/constants.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57079" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map