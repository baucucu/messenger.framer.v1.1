require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"StatusBarLayer":[function(require,module,exports){

/*
	 * USING STATUSBARLAYER
	
	 * Require the module
	StatusBarLayer = require "StatusBarLayer"
	
	myStatusBar = new StatusBarLayer
		 * Text
		carrier: <string>
		time: <string> # if not set, will use local time
		percent: <number>
		
		 * Show or hide status items
		signal: <boolean>
		wifi: <boolean>
		powered: <boolean>
		showPercentage: <boolean>
		ipod: <boolean> # also affects signal and carrier
		
		 * Colors
		style: <string> ("light" || "dark")
		foregroundColor: <string> (hex or rgba)
		backgroundColor: <string> (hex or rgba)
		vibrant: <boolean>
		
		 * Behavior
		hide: <boolean> # initial visibility
		autoHide: <boolean> # hide in landscape where device-appropriate
		
		 * Set @1x, @2x or @3x -- usually unnecessary
		scaleFactor: <number> (1 || 2 || 3)
		
		 * Simulate call
		myStatusBar.startCall(message, color) # <string>, <string> (hex or rgba)
		myStatusBar.endCall()
		
		 * Check visibility and call status
		print myStatusBar.hidden
		print myStatusBar.onCall
 */
var StatusBarLayer,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

StatusBarLayer = (function(superClass) {
  var batteryGreen, fontWeight, onCallColor, timeFontWeight;

  extend(StatusBarLayer, superClass);

  fontWeight = 400;

  timeFontWeight = 500;

  batteryGreen = "#4cd964";

  onCallColor = "#4cd964";

  function StatusBarLayer(options) {
    var alarmMargin, base, base1, base10, base11, base12, base13, base14, base15, base2, base3, base4, base5, base6, base7, base8, base9, baseFontSize, battery, batteryColor, batterySVG, batterySVG3x, carrier, carrierMargin, colorBattery, colorForeground, device, foregroundItems, getBatteryLevel, getBatteryMargin, getOnCallMargin, getSVGFactor, getTime, getTopMargin, i, ipodMargin, layer, len, letterSpacing, locationMargin, onCallBlock, onCallFontSize, onCallLetterSpacing, onCallMargin, onCallMessage, onCallWordSpacing, percentage, percentageMargin, power, powerMargin, powerSVG, ref, signal, signalMargin, signalSVG, statusBarHeight, styleBar, time, topMargin, updateOrientation, wifi, wifiMargin, wifiSVG;
    this.options = options != null ? options : {};
    if ((base = this.options).style == null) {
      base.style = "light";
    }
    if ((base1 = this.options).powered == null) {
      base1.powered = false;
    }
    if ((base2 = this.options).carrier == null) {
      base2.carrier = "Carrier";
    }
    if ((base3 = this.options).foregroundColor == null) {
      base3.foregroundColor = "";
    }
    if ((base4 = this.options).backgroundColor == null) {
      base4.backgroundColor = "";
    }
    if ((base5 = this.options).time == null) {
      base5.time = "";
    }
    if ((base6 = this.options).percent == null) {
      base6.percent = 100;
    }
    if ((base7 = this.options).showPercentage == null) {
      base7.showPercentage = true;
    }
    if ((base8 = this.options).wifi == null) {
      base8.wifi = true;
    }
    if ((base9 = this.options).signal == null) {
      base9.signal = true;
    }
    if ((base10 = this.options).ipod == null) {
      base10.ipod = false;
    }
    if ((base11 = this.options).hide == null) {
      base11.hide = false;
    }
    if ((base12 = this.options).autoHide == null) {
      base12.autoHide = true;
    }
    if ((base13 = this.options).onCall == null) {
      base13.onCall = false;
    }
    if ((base14 = this.options).vibrant == null) {
      base14.vibrant = false;
    }
    if ((base15 = this.options).scaleFactor == null) {
      base15.scaleFactor = _.includes(Framer.Device.deviceType, "plus") ? 3 : 2;
    }
    this.options.scaleFactor = this.options.scaleFactor / 2;
    StatusBarLayer.__super__.constructor.call(this, this.options);
    getTopMargin = (function(_this) {
      return function() {
        switch (_this.options.scaleFactor) {
          case 1.5:
            return 8;
          case 0.5:
            return 2;
          default:
            return 5;
        }
      };
    })(this);
    getOnCallMargin = (function(_this) {
      return function() {
        switch (_this.options.scaleFactor) {
          case 1.5:
            return 35 * _this.options.scaleFactor;
          case 0.5:
            return 37 * _this.options.scaleFactor;
          default:
            return 37 * _this.options.scaleFactor;
        }
      };
    })(this);
    getBatteryMargin = (function(_this) {
      return function() {
        switch (_this.options.scaleFactor) {
          case 1.5:
            return 16.5;
          case 0.5:
            return 5;
          default:
            return 11;
        }
      };
    })(this);
    getSVGFactor = (function(_this) {
      return function() {
        switch (_this.options.scaleFactor) {
          case 1.5:
            return 6;
          case 0.5:
            return 5;
          default:
            return 2;
        }
      };
    })(this);
    statusBarHeight = 40 * this.options.scaleFactor;
    topMargin = getTopMargin();
    onCallMargin = topMargin + getOnCallMargin();
    signalMargin = 13 * this.options.scaleFactor;
    carrierMargin = 9 * this.options.scaleFactor;
    wifiMargin = _.includes(Framer.Device.deviceType, "plus") ? 8 * this.options.scaleFactor : 12 * this.options.scaleFactor;
    powerMargin = 11 * this.options.scaleFactor;
    percentageMargin = 6 * this.options.scaleFactor;
    alarmMargin = 13 * this.options.scaleFactor;
    locationMargin = 12 * this.options.scaleFactor;
    ipodMargin = 12 * this.options.scaleFactor;
    baseFontSize = 24;
    onCallFontSize = 27;
    letterSpacing = _.includes(Framer.Device.deviceType, "plus") ? 2 : 0;
    onCallLetterSpacing = 0;
    onCallWordSpacing = 0;
    this.height = statusBarHeight;
    if (this.options.ipod === true) {
      this.options.carrier = "iPod";
      this.options.signal = false;
    }
    if (this.options.powered === true) {
      batteryColor = batteryGreen;
    } else {
      batteryColor = this.options.foregroundColor;
    }
    getBatteryLevel = (function(_this) {
      return function(defaultBatteryWidth) {
        var percentageWidth;
        percentageWidth = _this.options.percent / 100 * defaultBatteryWidth;
        return percentageWidth;
      };
    })(this);
    signalSVG = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 67 " + (11 * getSVGFactor()) + "'><circle cx='5.5' cy='5.5' r='5.5' fill='" + this.options.foregroundColor + "' /><circle cx='19.5' cy='5.5' r='5.5' fill='" + this.options.foregroundColor + "' /><circle cx='33.5' cy='5.5' r='5.5' fill='" + this.options.foregroundColor + "' /><circle cx='47.5' cy='5.5' r='5.5' fill='" + this.options.foregroundColor + "' /><path d='M61.5,1A4.5,4.5,0,1,1,57,5.5,4.51,4.51,0,0,1,61.5,1m0-1A5.5,5.5,0,1,0,67,5.5,5.5,5.5,0,0,0,61.5,0Z' fill='" + this.options.foregroundColor + "' /></svg>";
    wifiSVG = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 25 " + (18 * getSVGFactor()) + "'><path d='M8.59,13.63,12.5,18l3.91-4.37a5.5,5.5,0,0,0-7.82,0Zm-4-4.47,2,2.23a8.48,8.48,0,0,1,11.82,0l2-2.23a11.46,11.46,0,0,0-15.81,0ZM12.5,0A17.42,17.42,0,0,0,.6,4.7l2,2.23a14.45,14.45,0,0,1,19.81,0l2-2.23A17.42,17.42,0,0,0,12.5,0Z' fill='" + this.options.foregroundColor + "' /></svg>";
    batterySVG = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 49 " + (19 * getSVGFactor()) + "'><path d='M41.5,0H3.5A3.5,3.5,0,0,0,0,3.5v12A3.5,3.5,0,0,0,3.5,19h38A3.5,3.5,0,0,0,45,15.5V3.5A3.5,3.5,0,0,0,41.5,0ZM44,15.5A2.5,2.5,0,0,1,41.5,18H3.5A2.5,2.5,0,0,1,1,15.5V3.5A2.5,2.5,0,0,1,3.5,1h38A2.5,2.5,0,0,1,44,3.5Z' fill='" + this.options.foregroundColor + "' /><rect x='2' y='2' width='" + (getBatteryLevel(41)) + "' height='15' rx='1.5' ry='1.5' fill='" + batteryColor + "' id='batteryFill' /><path d='M46,6v7a3.28,3.28,0,0,0,3-3.5A3.28,3.28,0,0,0,46,6Z' fill='" + this.options.foregroundColor + "'/></svg>";
    batterySVG3x = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 73 " + (29 * getSVGFactor()) + "'><path d='M62,0H5A5,5,0,0,0,0,5V24a5,5,0,0,0,5,5H62a5,5,0,0,0,5-5V5A5,5,0,0,0,62,0Zm4,24a4,4,0,0,1-4,4H5a4,4,0,0,1-4-4V5A4,4,0,0,1,5,1H62a4,4,0,0,1,4,4Z' fill='" + this.options.foregroundColor + "' /><rect x='2' y='2' width='" + (getBatteryLevel(63)) + "' height='25' rx='3' ry='3' fill='" + batteryColor + "' id='batteryFill' /><path d='M69,10.06v9.89A4.82,4.82,0,0,0,73,15,4.82,4.82,0,0,0,69,10.06Z' fill='" + this.options.foregroundColor + "' /></svg>";
    powerSVG = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 11 " + (19 * getSVGFactor()) + "'><polygon points='11 7.5 5.86 7.5 8 0 0 10.5 4.96 10.5 2 19 11 7.5' fill='" + this.options.foregroundColor + "' /></svg>";
    onCallBlock = new Layer({
      parent: this,
      name: "onCallBlock",
      height: statusBarHeight
    });
    this.onCallBlock = onCallBlock;
    onCallMessage = new TextLayer({
      parent: this,
      name: "onCallMessage",
      padding: {
        top: onCallMargin
      },
      text: "",
      fontSize: onCallFontSize * this.options.scaleFactor,
      fontWeight: fontWeight,
      textAlign: "center",
      color: "white",
      letterSpacing: onCallLetterSpacing,
      wordSpacing: onCallWordSpacing
    });
    this.onCallMessage = onCallMessage;
    carrier = new TextLayer({
      parent: this,
      name: "carrier",
      padding: {
        top: getTopMargin()
      },
      text: this.options.carrier,
      fontSize: baseFontSize * this.options.scaleFactor,
      fontWeight: fontWeight,
      letterSpacing: letterSpacing
    });
    this.carrier = carrier;
    signal = new Layer({
      parent: this,
      name: "signal",
      width: 67 * this.options.scaleFactor,
      height: 13 * this.options.scaleFactor,
      y: Align.center,
      html: signalSVG
    });
    this.signal = signal;
    wifi = new Layer({
      parent: this,
      name: "wifi",
      y: Align.center,
      width: 25 * this.options.scaleFactor,
      height: 18 * this.options.scaleFactor,
      html: wifiSVG
    });
    this.wifi = wifi;
    getTime = (function(_this) {
      return function() {
        var day, hour, minute, second, suffix, today;
        today = new Date;
        day = today.getDay();
        hour = today.getHours();
        minute = today.getMinutes();
        second = today.getSeconds();
        suffix = hour >= 12 ? ' PM' : ' AM';
        hour = hour > 12 ? hour - 12 : hour;
        minute = minute < 10 ? "0" + minute : minute;
        if (_this.options.time === "") {
          return hour + ':' + minute + suffix;
        } else {
          return _this.options.time;
        }
      };
    })(this);
    time = new TextLayer({
      parent: this,
      name: "time",
      width: this.width,
      padding: {
        top: getTopMargin()
      },
      text: getTime(),
      fontSize: baseFontSize * this.options.scaleFactor,
      fontWeight: timeFontWeight,
      textAlign: "center",
      letterSpacing: letterSpacing
    });
    this.time = time;
    power = new Layer({
      parent: this,
      name: "power",
      y: Align.center,
      width: 11 * this.options.scaleFactor,
      height: 19 * this.options.scaleFactor,
      html: powerSVG
    });
    this.power = power;
    battery = new Layer({
      parent: this,
      name: "battery",
      y: Align.center,
      width: 49 * this.options.scaleFactor,
      height: 18 * this.options.scaleFactor,
      html: this.options.scaleFactor === 1 ? batterySVG : batterySVG3x
    });
    this.battery = battery;
    percentage = new TextLayer({
      parent: this,
      name: "percentage",
      padding: {
        top: getTopMargin()
      },
      text: this.options.percent + "%",
      fontSize: baseFontSize * this.options.scaleFactor,
      fontWeight: fontWeight,
      textAlign: "right",
      letterSpacing: letterSpacing
    });
    this.percentage = percentage;
    ref = this.subLayers;
    for (i = 0, len = ref.length; i < len; i++) {
      layer = ref[i];
      layer.backgroundColor = "clear";
    }
    this.hide = (function(_this) {
      return function() {
        _this.options.hide = true;
        return _this.animate({
          properties: {
            y: 0 - statusBarHeight
          },
          time: 0.25
        });
      };
    })(this);
    this.show = (function(_this) {
      return function() {
        _this.options.hide = false;
        return _this.animate({
          properties: {
            y: 0
          },
          time: 0.25
        });
      };
    })(this);
    this.layout = (function(_this) {
      return function() {
        _this.width = Screen.width;
        if (_this.options.hide === true) {
          _this.hide();
        }
        if (Framer.Device.orientation > 0 && (Screen.width === 2208 || Screen.width === 1334 || Screen.width === 1136)) {
          if (_this.options.autoHide === true) {
            _this.hide();
          }
        } else {
          _this.show();
        }
        if (_this.options.carrier === "") {
          carrierMargin = 0;
        } else {
          carrierMargin = 9 * _this.options.scaleFactor;
        }
        if (_this.options.signal === true) {
          signal.visible = true;
          signal.x = signalMargin;
          carrier.x = signal.x + signal.width + carrierMargin;
        } else {
          signal.visible = false;
          carrier.x = ipodMargin;
        }
        if (_this.options.wifi === true) {
          wifi.visible = true;
        } else {
          wifi.visible = false;
        }
        wifi.x = carrier.x + carrier.width + wifiMargin;
        time.width = Screen.width;
        onCallBlock.width = Screen.width;
        onCallMessage.width = Screen.width;
        if (_this.options.powered === true) {
          power.x = Align.right(-powerMargin);
        } else {
          power.x = Screen.width;
        }
        battery.x = power.x - battery.width - getBatteryMargin();
        if (_this.options.showPercentage === false) {
          percentageMargin = 0;
          percentage.text = "";
        } else {
          percentageMargin = 6 * _this.options.scaleFactor;
          percentage.text = _this.options.percent + "%";
        }
        return percentage.x = battery.x - percentage.width - percentageMargin;
      };
    })(this);
    getTime();
    this.layout();
    foregroundItems = [percentage, power, time, wifi, signal, carrier, battery];
    colorForeground = (function(_this) {
      return function(color) {
        var SVG, j, layerSVG, len1, results;
        if (color == null) {
          color = _this.options.foregroundColor;
        }
        if (color === "") {
          if (_this.options.style === "dark") {
            color = "white";
          } else {
            color = "black";
          }
        }
        results = [];
        for (j = 0, len1 = foregroundItems.length; j < len1; j++) {
          layer = foregroundItems[j];
          layer.color = color;
          layerSVG = layer.querySelectorAll('path, circle, rect, polygon');
          results.push((function() {
            var k, len2, results1;
            results1 = [];
            for (k = 0, len2 = layerSVG.length; k < len2; k++) {
              SVG = layerSVG[k];
              results1.push(SVG.setAttribute('fill', color));
            }
            return results1;
          })());
        }
        return results;
      };
    })(this);
    colorBattery = (function(_this) {
      return function() {
        var SVG, batteryFillSVG, j, k, l, len1, len2, len3, len4, m, results, results1, results2, results3;
        batteryFillSVG = layer.querySelectorAll('#batteryFill');
        if (_this.options.onCall === true) {
          results = [];
          for (j = 0, len1 = batteryFillSVG.length; j < len1; j++) {
            SVG = batteryFillSVG[j];
            SVG.style.WebkitTransition = 'all 0.25s';
            results.push(SVG.setAttribute('fill', "white"));
          }
          return results;
        } else if (_this.options.powered === true) {
          results1 = [];
          for (k = 0, len2 = batteryFillSVG.length; k < len2; k++) {
            SVG = batteryFillSVG[k];
            SVG.style.WebkitTransition = 'all 0.25s';
            results1.push(SVG.setAttribute('fill', batteryGreen));
          }
          return results1;
        } else if (_this.options.style === "dark") {
          results2 = [];
          for (l = 0, len3 = batteryFillSVG.length; l < len3; l++) {
            SVG = batteryFillSVG[l];
            SVG.style.WebkitTransition = 'all 0.25s';
            results2.push(SVG.setAttribute('fill', "white"));
          }
          return results2;
        } else {
          results3 = [];
          for (m = 0, len4 = batteryFillSVG.length; m < len4; m++) {
            SVG = batteryFillSVG[m];
            SVG.style.WebkitTransition = 'all 0.25s';
            results3.push(SVG.setAttribute('fill', "black"));
          }
          return results3;
        }
      };
    })(this);
    styleBar = (function(_this) {
      return function(style, backgroundColor) {
        var barColor;
        if (backgroundColor == null) {
          backgroundColor = "";
        }
        if (backgroundColor === "") {
          _this.style = {
            "-webkit-backdrop-filter": "blur(60px)"
          };
          if (style === "dark") {
            _this.backgroundColor = "rgba(0, 0, 0, 0.5)";
          } else {
            _this.backgroundColor = "rgba(255, 255, 255, 0.5)";
          }
        } else {
          _this.backgroundColor = backgroundColor;
        }
        if (_this.options.vibrant === true) {
          barColor = new Color(backgroundColor).alpha(.5);
          _this.backgroundColor = barColor;
          return _this.style = {
            "-webkit-backdrop-filter": "blur(60px)"
          };
        }
      };
    })(this);
    this.applyStyle = (function(_this) {
      return function(style, foregroundColor, backgroundColor) {
        if (style == null) {
          style = _this.options.style;
        }
        if (foregroundColor == null) {
          foregroundColor = _this.options.foregroundColor;
        }
        if (backgroundColor == null) {
          backgroundColor = _this.options.backgroundColor;
        }
        if (style === "light" && foregroundColor === "") {
          foregroundColor = "black";
        }
        if (style === "dark" && foregroundColor === "") {
          foregroundColor = "white";
        }
        styleBar(style, backgroundColor);
        colorForeground(foregroundColor);
        return colorBattery();
      };
    })(this);
    this.applyStyle();
    this.startCall = (function(_this) {
      return function(message, color) {
        if (message == null) {
          message = "Touch to return to call 0:30";
        }
        if (color == null) {
          color = onCallColor;
        }
        _this.options.onCall = true;
        colorForeground("white");
        colorBattery();
        onCallBlock.animate({
          properties: {
            backgroundColor: color,
            opacity: 1,
            height: statusBarHeight * 2
          },
          time: 0.25
        });
        return onCallBlock.onAnimationEnd(function() {
          if (_this.options.onCall === true) {
            return onCallMessage.text = message;
          }
        });
      };
    })(this);
    this.endCall = (function(_this) {
      return function() {
        _this.options.onCall = false;
        onCallMessage.text = "";
        onCallBlock.animate({
          properties: {
            opacity: 0,
            height: statusBarHeight
          },
          time: 0.25
        });
        return _this.applyStyle();
      };
    })(this);
    updateOrientation = (function(_this) {
      return function(device) {
        var deviceOrientation, deviceRotation, rotation, value;
        value = device === "Framer" ? Framer.Device.orientation : window.orientation;
        if (value < 0 && device === "Framer") {
          value = Math.abs(value);
        }
        rotation = (function() {
          switch (false) {
            case value !== 0:
              return deviceRotation = "Portrait";
            case value !== 180:
              return deviceRotation = "Portrait (Upside-Down)";
            case value !== -90:
              return deviceRotation = "Landscape (Clockwise)";
            case value !== 90:
              return deviceRotation = "Landscape (Counterclockwise)";
          }
        })();
        deviceOrientation = deviceRotation;
        return _this.layout();
      };
    })(this);
    if (Utils.isMobile()) {
      device = "mobile";
      window.addEventListener("orientationchange", function() {
        return updateOrientation(device);
      });
    } else {
      Framer.Device.on("change:orientation", function() {
        device = "Framer";
        return updateOrientation(device);
      });
    }
  }

  StatusBarLayer.define('hidden', {
    get: function() {
      return this.options.hide;
    }
  });

  StatusBarLayer.define('onCall', {
    get: function() {
      return this.options.onCall;
    }
  });

  return StatusBarLayer;

})(Layer);

module.exports = StatusBarLayer;


},{}],"myModule":[function(require,module,exports){
exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uL21vZHVsZXMvbXlNb2R1bGUuY29mZmVlIiwiLi4vbW9kdWxlcy9TdGF0dXNCYXJMYXllci5jb2ZmZWUiLCJub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiMgQWRkIHRoZSBmb2xsb3dpbmcgbGluZSB0byB5b3VyIHByb2plY3QgaW4gRnJhbWVyIFN0dWRpby4gXG4jIG15TW9kdWxlID0gcmVxdWlyZSBcIm15TW9kdWxlXCJcbiMgUmVmZXJlbmNlIHRoZSBjb250ZW50cyBieSBuYW1lLCBsaWtlIG15TW9kdWxlLm15RnVuY3Rpb24oKSBvciBteU1vZHVsZS5teVZhclxuXG5leHBvcnRzLm15VmFyID0gXCJteVZhcmlhYmxlXCJcblxuZXhwb3J0cy5teUZ1bmN0aW9uID0gLT5cblx0cHJpbnQgXCJteUZ1bmN0aW9uIGlzIHJ1bm5pbmdcIlxuXG5leHBvcnRzLm15QXJyYXkgPSBbMSwgMiwgM10iLCIjIyNcblx0IyBVU0lORyBTVEFUVVNCQVJMQVlFUlxuXHRcblx0IyBSZXF1aXJlIHRoZSBtb2R1bGVcblx0U3RhdHVzQmFyTGF5ZXIgPSByZXF1aXJlIFwiU3RhdHVzQmFyTGF5ZXJcIlxuXHRcblx0bXlTdGF0dXNCYXIgPSBuZXcgU3RhdHVzQmFyTGF5ZXJcblx0XHQjIFRleHRcblx0XHRjYXJyaWVyOiA8c3RyaW5nPlxuXHRcdHRpbWU6IDxzdHJpbmc+ICMgaWYgbm90IHNldCwgd2lsbCB1c2UgbG9jYWwgdGltZVxuXHRcdHBlcmNlbnQ6IDxudW1iZXI+XG5cdFx0XG5cdFx0IyBTaG93IG9yIGhpZGUgc3RhdHVzIGl0ZW1zXG5cdFx0c2lnbmFsOiA8Ym9vbGVhbj5cblx0XHR3aWZpOiA8Ym9vbGVhbj5cblx0XHRwb3dlcmVkOiA8Ym9vbGVhbj5cblx0XHRzaG93UGVyY2VudGFnZTogPGJvb2xlYW4+XG5cdFx0aXBvZDogPGJvb2xlYW4+ICMgYWxzbyBhZmZlY3RzIHNpZ25hbCBhbmQgY2FycmllclxuXHRcdFxuXHRcdCMgQ29sb3JzXG5cdFx0c3R5bGU6IDxzdHJpbmc+IChcImxpZ2h0XCIgfHwgXCJkYXJrXCIpXG5cdFx0Zm9yZWdyb3VuZENvbG9yOiA8c3RyaW5nPiAoaGV4IG9yIHJnYmEpXG5cdFx0YmFja2dyb3VuZENvbG9yOiA8c3RyaW5nPiAoaGV4IG9yIHJnYmEpXG5cdFx0dmlicmFudDogPGJvb2xlYW4+XG5cdFx0XG5cdFx0IyBCZWhhdmlvclxuXHRcdGhpZGU6IDxib29sZWFuPiAjIGluaXRpYWwgdmlzaWJpbGl0eVxuXHRcdGF1dG9IaWRlOiA8Ym9vbGVhbj4gIyBoaWRlIGluIGxhbmRzY2FwZSB3aGVyZSBkZXZpY2UtYXBwcm9wcmlhdGVcblx0XHRcblx0XHQjIFNldCBAMXgsIEAyeCBvciBAM3ggLS0gdXN1YWxseSB1bm5lY2Vzc2FyeVxuXHRcdHNjYWxlRmFjdG9yOiA8bnVtYmVyPiAoMSB8fCAyIHx8IDMpXG5cdFx0XG5cdFx0IyBTaW11bGF0ZSBjYWxsXG5cdFx0bXlTdGF0dXNCYXIuc3RhcnRDYWxsKG1lc3NhZ2UsIGNvbG9yKSAjIDxzdHJpbmc+LCA8c3RyaW5nPiAoaGV4IG9yIHJnYmEpXG5cdFx0bXlTdGF0dXNCYXIuZW5kQ2FsbCgpXG5cdFx0XG5cdFx0IyBDaGVjayB2aXNpYmlsaXR5IGFuZCBjYWxsIHN0YXR1c1xuXHRcdHByaW50IG15U3RhdHVzQmFyLmhpZGRlblxuXHRcdHByaW50IG15U3RhdHVzQmFyLm9uQ2FsbFxuIyMjXG5cbmNsYXNzIFN0YXR1c0JhckxheWVyIGV4dGVuZHMgTGF5ZXJcblx0Zm9udFdlaWdodCA9IDQwMFxuXHR0aW1lRm9udFdlaWdodCA9IDUwMFxuXHRcblx0YmF0dGVyeUdyZWVuID0gXCIjNGNkOTY0XCJcblx0b25DYWxsQ29sb3IgPSBcIiM0Y2Q5NjRcIlxuXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0QG9wdGlvbnMuc3R5bGUgPz0gXCJsaWdodFwiXG5cdFx0QG9wdGlvbnMucG93ZXJlZCA/PSBmYWxzZVxuXHRcdEBvcHRpb25zLmNhcnJpZXIgPz0gXCJDYXJyaWVyXCJcblx0XHRAb3B0aW9ucy5mb3JlZ3JvdW5kQ29sb3IgPz0gXCJcIlxuXHRcdEBvcHRpb25zLmJhY2tncm91bmRDb2xvciA/PSBcIlwiXG5cdFx0QG9wdGlvbnMudGltZSA/PSBcIlwiXG5cdFx0QG9wdGlvbnMucGVyY2VudCA/PSAxMDBcblx0XHRAb3B0aW9ucy5zaG93UGVyY2VudGFnZSA/PSB0cnVlXG5cdFx0QG9wdGlvbnMud2lmaSA/PSB0cnVlXG5cdFx0QG9wdGlvbnMuc2lnbmFsID89IHRydWVcblx0XHRAb3B0aW9ucy5pcG9kID89IGZhbHNlXG5cdFx0QG9wdGlvbnMuaGlkZSA/PSBmYWxzZVxuXHRcdEBvcHRpb25zLmF1dG9IaWRlID89IHRydWVcblx0XHRAb3B0aW9ucy5vbkNhbGwgPz0gZmFsc2Vcblx0XHRAb3B0aW9ucy52aWJyYW50ID89IGZhbHNlXG5cdFx0QG9wdGlvbnMuc2NhbGVGYWN0b3IgPz0gaWYgXy5pbmNsdWRlcyhGcmFtZXIuRGV2aWNlLmRldmljZVR5cGUsIFwicGx1c1wiKSB0aGVuIDMgZWxzZSAyXG5cblx0XHRAb3B0aW9ucy5zY2FsZUZhY3RvciA9IEBvcHRpb25zLnNjYWxlRmFjdG9yIC8gMlxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRnZXRUb3BNYXJnaW4gPSAoKSA9PlxuXHRcdFx0c3dpdGNoIEBvcHRpb25zLnNjYWxlRmFjdG9yXG5cdFx0XHRcdHdoZW4gMS41IHRoZW4gcmV0dXJuIDhcblx0XHRcdFx0d2hlbiAwLjUgdGhlbiByZXR1cm4gMlxuXHRcdFx0XHRlbHNlIHJldHVybiA1XG5cdFx0XHRcdFxuXHRcdGdldE9uQ2FsbE1hcmdpbiA9ICgpID0+XG5cdFx0XHRzd2l0Y2ggQG9wdGlvbnMuc2NhbGVGYWN0b3Jcblx0XHRcdFx0d2hlbiAxLjUgdGhlbiByZXR1cm4gMzUgKiBAb3B0aW9ucy5zY2FsZUZhY3RvclxuXHRcdFx0XHR3aGVuIDAuNSB0aGVuIHJldHVybiAzNyAqIEBvcHRpb25zLnNjYWxlRmFjdG9yXG5cdFx0XHRcdGVsc2UgcmV0dXJuIDM3ICogQG9wdGlvbnMuc2NhbGVGYWN0b3Jcblx0XHRcdFx0XG5cdFx0Z2V0QmF0dGVyeU1hcmdpbiA9ICgpID0+XG5cdFx0XHRzd2l0Y2ggQG9wdGlvbnMuc2NhbGVGYWN0b3Jcblx0XHRcdFx0d2hlbiAxLjUgdGhlbiByZXR1cm4gMTYuNVxuXHRcdFx0XHR3aGVuIDAuNSB0aGVuIHJldHVybiA1XG5cdFx0XHRcdGVsc2UgcmV0dXJuIDExXG5cdFx0XHRcblx0XHRnZXRTVkdGYWN0b3IgPSAoKSA9PlxuXHRcdFx0c3dpdGNoIEBvcHRpb25zLnNjYWxlRmFjdG9yXG5cdFx0XHRcdHdoZW4gMS41IHRoZW4gcmV0dXJuIDZcblx0XHRcdFx0d2hlbiAwLjUgdGhlbiByZXR1cm4gNVxuXHRcdFx0XHRlbHNlIHJldHVybiAyXG5cblx0XHRzdGF0dXNCYXJIZWlnaHQgPSA0MCAqIEBvcHRpb25zLnNjYWxlRmFjdG9yXG5cdFx0dG9wTWFyZ2luID0gZ2V0VG9wTWFyZ2luKClcblx0XHRvbkNhbGxNYXJnaW4gPSB0b3BNYXJnaW4gKyBnZXRPbkNhbGxNYXJnaW4oKVxuXHRcdHNpZ25hbE1hcmdpbiA9IDEzICogQG9wdGlvbnMuc2NhbGVGYWN0b3Jcblx0XHRjYXJyaWVyTWFyZ2luID0gOSAqIEBvcHRpb25zLnNjYWxlRmFjdG9yXG5cdFx0d2lmaU1hcmdpbiA9IGlmIF8uaW5jbHVkZXMoRnJhbWVyLkRldmljZS5kZXZpY2VUeXBlLCBcInBsdXNcIikgdGhlbiA4ICogQG9wdGlvbnMuc2NhbGVGYWN0b3IgZWxzZSAxMiAqIEBvcHRpb25zLnNjYWxlRmFjdG9yXG5cdFx0cG93ZXJNYXJnaW4gPSAxMSAqIEBvcHRpb25zLnNjYWxlRmFjdG9yXG5cdFx0cGVyY2VudGFnZU1hcmdpbiA9IDYgKiBAb3B0aW9ucy5zY2FsZUZhY3RvclxuXHRcdGFsYXJtTWFyZ2luID0gMTMgKiBAb3B0aW9ucy5zY2FsZUZhY3RvclxuXHRcdGxvY2F0aW9uTWFyZ2luID0gMTIgKiBAb3B0aW9ucy5zY2FsZUZhY3RvclxuXHRcdGlwb2RNYXJnaW4gPSAxMiAqIEBvcHRpb25zLnNjYWxlRmFjdG9yXG5cdFx0YmFzZUZvbnRTaXplID0gMjRcblx0XHRvbkNhbGxGb250U2l6ZSA9IDI3XG5cdFx0bGV0dGVyU3BhY2luZyA9IGlmIF8uaW5jbHVkZXMoRnJhbWVyLkRldmljZS5kZXZpY2VUeXBlLCBcInBsdXNcIikgdGhlbiAyIGVsc2UgMFxuXHRcdG9uQ2FsbExldHRlclNwYWNpbmcgPSAwXG5cdFx0b25DYWxsV29yZFNwYWNpbmcgPSAwXG5cblx0XHRALmhlaWdodCA9IHN0YXR1c0JhckhlaWdodFxuXG5cdFx0aWYgQG9wdGlvbnMuaXBvZCA9PSB0cnVlXG5cdFx0XHRAb3B0aW9ucy5jYXJyaWVyID0gXCJpUG9kXCJcblx0XHRcdEBvcHRpb25zLnNpZ25hbCA9IGZhbHNlXG5cblx0XHRpZiBAb3B0aW9ucy5wb3dlcmVkID09IHRydWVcblx0XHRcdGJhdHRlcnlDb2xvciA9IGJhdHRlcnlHcmVlblxuXHRcdGVsc2Vcblx0XHRcdGJhdHRlcnlDb2xvciA9IEBvcHRpb25zLmZvcmVncm91bmRDb2xvclxuXG5cdFx0Z2V0QmF0dGVyeUxldmVsID0gKGRlZmF1bHRCYXR0ZXJ5V2lkdGgpID0+XG5cdFx0XHRwZXJjZW50YWdlV2lkdGggPSBAb3B0aW9ucy5wZXJjZW50IC8gMTAwICogZGVmYXVsdEJhdHRlcnlXaWR0aFxuXHRcdFx0cmV0dXJuIHBlcmNlbnRhZ2VXaWR0aFxuXG5cdFx0c2lnbmFsU1ZHID0gXCI8c3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgdmlld0JveD0nMCAwIDY3ICN7MTEgKiBnZXRTVkdGYWN0b3IoKX0nPjxjaXJjbGUgY3g9JzUuNScgY3k9JzUuNScgcj0nNS41JyBmaWxsPScje0BvcHRpb25zLmZvcmVncm91bmRDb2xvcn0nIC8+PGNpcmNsZSBjeD0nMTkuNScgY3k9JzUuNScgcj0nNS41JyBmaWxsPScje0BvcHRpb25zLmZvcmVncm91bmRDb2xvcn0nIC8+PGNpcmNsZSBjeD0nMzMuNScgY3k9JzUuNScgcj0nNS41JyBmaWxsPScje0BvcHRpb25zLmZvcmVncm91bmRDb2xvcn0nIC8+PGNpcmNsZSBjeD0nNDcuNScgY3k9JzUuNScgcj0nNS41JyBmaWxsPScje0BvcHRpb25zLmZvcmVncm91bmRDb2xvcn0nIC8+PHBhdGggZD0nTTYxLjUsMUE0LjUsNC41LDAsMSwxLDU3LDUuNSw0LjUxLDQuNTEsMCwwLDEsNjEuNSwxbTAtMUE1LjUsNS41LDAsMSwwLDY3LDUuNSw1LjUsNS41LDAsMCwwLDYxLjUsMFonIGZpbGw9JyN7QG9wdGlvbnMuZm9yZWdyb3VuZENvbG9yfScgLz48L3N2Zz5cIlx0XG5cdFx0d2lmaVNWRyA9IFwiPHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAyNSAjezE4ICogZ2V0U1ZHRmFjdG9yKCl9Jz48cGF0aCBkPSdNOC41OSwxMy42MywxMi41LDE4bDMuOTEtNC4zN2E1LjUsNS41LDAsMCwwLTcuODIsMFptLTQtNC40NywyLDIuMjNhOC40OCw4LjQ4LDAsMCwxLDExLjgyLDBsMi0yLjIzYTExLjQ2LDExLjQ2LDAsMCwwLTE1LjgxLDBaTTEyLjUsMEExNy40MiwxNy40MiwwLDAsMCwuNiw0LjdsMiwyLjIzYTE0LjQ1LDE0LjQ1LDAsMCwxLDE5LjgxLDBsMi0yLjIzQTE3LjQyLDE3LjQyLDAsMCwwLDEyLjUsMFonIGZpbGw9JyN7QG9wdGlvbnMuZm9yZWdyb3VuZENvbG9yfScgLz48L3N2Zz5cIlxuXHRcdGJhdHRlcnlTVkcgPSBcIjxzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB2aWV3Qm94PScwIDAgNDkgI3sxOSAqIGdldFNWR0ZhY3RvcigpfSc+PHBhdGggZD0nTTQxLjUsMEgzLjVBMy41LDMuNSwwLDAsMCwwLDMuNXYxMkEzLjUsMy41LDAsMCwwLDMuNSwxOWgzOEEzLjUsMy41LDAsMCwwLDQ1LDE1LjVWMy41QTMuNSwzLjUsMCwwLDAsNDEuNSwwWk00NCwxNS41QTIuNSwyLjUsMCwwLDEsNDEuNSwxOEgzLjVBMi41LDIuNSwwLDAsMSwxLDE1LjVWMy41QTIuNSwyLjUsMCwwLDEsMy41LDFoMzhBMi41LDIuNSwwLDAsMSw0NCwzLjVaJyBmaWxsPScje0BvcHRpb25zLmZvcmVncm91bmRDb2xvcn0nIC8+PHJlY3QgeD0nMicgeT0nMicgd2lkdGg9JyN7Z2V0QmF0dGVyeUxldmVsKDQxKX0nIGhlaWdodD0nMTUnIHJ4PScxLjUnIHJ5PScxLjUnIGZpbGw9JyN7YmF0dGVyeUNvbG9yfScgaWQ9J2JhdHRlcnlGaWxsJyAvPjxwYXRoIGQ9J000Niw2djdhMy4yOCwzLjI4LDAsMCwwLDMtMy41QTMuMjgsMy4yOCwwLDAsMCw0Niw2WicgZmlsbD0nI3tAb3B0aW9ucy5mb3JlZ3JvdW5kQ29sb3J9Jy8+PC9zdmc+XCJcblx0XHRiYXR0ZXJ5U1ZHM3ggPSBcIjxzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB2aWV3Qm94PScwIDAgNzMgI3syOSAqIGdldFNWR0ZhY3RvcigpfSc+PHBhdGggZD0nTTYyLDBINUE1LDUsMCwwLDAsMCw1VjI0YTUsNSwwLDAsMCw1LDVINjJhNSw1LDAsMCwwLDUtNVY1QTUsNSwwLDAsMCw2MiwwWm00LDI0YTQsNCwwLDAsMS00LDRINWE0LDQsMCwwLDEtNC00VjVBNCw0LDAsMCwxLDUsMUg2MmE0LDQsMCwwLDEsNCw0WicgZmlsbD0nI3tAb3B0aW9ucy5mb3JlZ3JvdW5kQ29sb3J9JyAvPjxyZWN0IHg9JzInIHk9JzInIHdpZHRoPScje2dldEJhdHRlcnlMZXZlbCg2Myl9JyBoZWlnaHQ9JzI1JyByeD0nMycgcnk9JzMnIGZpbGw9JyN7YmF0dGVyeUNvbG9yfScgaWQ9J2JhdHRlcnlGaWxsJyAvPjxwYXRoIGQ9J002OSwxMC4wNnY5Ljg5QTQuODIsNC44MiwwLDAsMCw3MywxNSw0LjgyLDQuODIsMCwwLDAsNjksMTAuMDZaJyBmaWxsPScje0BvcHRpb25zLmZvcmVncm91bmRDb2xvcn0nIC8+PC9zdmc+XCJcblx0XHRwb3dlclNWRyA9IFwiPHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxMSAjezE5ICogZ2V0U1ZHRmFjdG9yKCl9Jz48cG9seWdvbiBwb2ludHM9JzExIDcuNSA1Ljg2IDcuNSA4IDAgMCAxMC41IDQuOTYgMTAuNSAyIDE5IDExIDcuNScgZmlsbD0nI3tAb3B0aW9ucy5mb3JlZ3JvdW5kQ29sb3J9JyAvPjwvc3ZnPlwiXG5cblx0XHRvbkNhbGxCbG9jayA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHRuYW1lOiBcIm9uQ2FsbEJsb2NrXCJcblx0XHRcdGhlaWdodDogc3RhdHVzQmFySGVpZ2h0XG5cblx0XHRALm9uQ2FsbEJsb2NrID0gb25DYWxsQmxvY2tcblxuXHRcdG9uQ2FsbE1lc3NhZ2UgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdG5hbWU6IFwib25DYWxsTWVzc2FnZVwiXG5cdFx0XHRwYWRkaW5nOlxuXHRcdFx0XHR0b3A6IG9uQ2FsbE1hcmdpblxuXHRcdFx0dGV4dDogXCJcIlxuXHRcdFx0Zm9udFNpemU6IG9uQ2FsbEZvbnRTaXplICogQG9wdGlvbnMuc2NhbGVGYWN0b3Jcblx0XHRcdGZvbnRXZWlnaHQ6IGZvbnRXZWlnaHRcblx0XHRcdHRleHRBbGlnbjogXCJjZW50ZXJcIlxuXHRcdFx0Y29sb3I6IFwid2hpdGVcIlxuXHRcdFx0bGV0dGVyU3BhY2luZzogb25DYWxsTGV0dGVyU3BhY2luZ1xuXHRcdFx0d29yZFNwYWNpbmc6IG9uQ2FsbFdvcmRTcGFjaW5nXG5cdFx0XHRcdFxuXHRcdEAub25DYWxsTWVzc2FnZSA9IG9uQ2FsbE1lc3NhZ2VcblxuXHRcdGNhcnJpZXIgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdG5hbWU6IFwiY2FycmllclwiXG5cdFx0XHRwYWRkaW5nOlxuXHRcdFx0XHR0b3A6IGdldFRvcE1hcmdpbigpXG5cdFx0XHR0ZXh0OiBAb3B0aW9ucy5jYXJyaWVyXG5cdFx0XHRmb250U2l6ZTogYmFzZUZvbnRTaXplICogQG9wdGlvbnMuc2NhbGVGYWN0b3IgXG5cdFx0XHRmb250V2VpZ2h0OiBmb250V2VpZ2h0XG5cdFx0XHRsZXR0ZXJTcGFjaW5nOiBsZXR0ZXJTcGFjaW5nXG5cblx0XHRALmNhcnJpZXIgPSBjYXJyaWVyXG5cblx0XHRzaWduYWwgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0bmFtZTogXCJzaWduYWxcIlxuXHRcdFx0d2lkdGg6IDY3ICogQG9wdGlvbnMuc2NhbGVGYWN0b3Jcblx0XHRcdGhlaWdodDogMTMgKiBAb3B0aW9ucy5zY2FsZUZhY3RvclxuXHRcdFx0eTogQWxpZ24uY2VudGVyXG5cdFx0XHRodG1sOiBzaWduYWxTVkdcblxuXHRcdEAuc2lnbmFsID0gc2lnbmFsXG5cblx0XHR3aWZpID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdG5hbWU6IFwid2lmaVwiXG5cdFx0XHR5OiBBbGlnbi5jZW50ZXJcblx0XHRcdHdpZHRoOiAyNSAqIEBvcHRpb25zLnNjYWxlRmFjdG9yXG5cdFx0XHRoZWlnaHQ6IDE4ICogQG9wdGlvbnMuc2NhbGVGYWN0b3Jcblx0XHRcdGh0bWw6IHdpZmlTVkdcblxuXHRcdEAud2lmaSA9IHdpZmlcblxuXHRcdGdldFRpbWUgPSAoKSA9PlxuXHRcdFx0dG9kYXkgPSBuZXcgRGF0ZVxuXHRcdFx0ZGF5ID0gdG9kYXkuZ2V0RGF5KClcblx0XHRcdGhvdXIgPSB0b2RheS5nZXRIb3VycygpXG5cdFx0XHRtaW51dGUgPSB0b2RheS5nZXRNaW51dGVzKClcblx0XHRcdHNlY29uZCA9IHRvZGF5LmdldFNlY29uZHMoKVxuXHRcdFx0c3VmZml4ID0gaWYgaG91ciA+PSAxMiB0aGVuICcgUE0nIGVsc2UgJyBBTSdcblx0XHRcdGhvdXIgPSBpZiBob3VyID4gMTIgdGhlbiBob3VyIC0gMTIgZWxzZSBob3VyXG5cdFx0XHRtaW51dGUgPSBpZiBtaW51dGUgPCAxMCB0aGVuIFwiMFwiICsgbWludXRlIGVsc2UgbWludXRlXG5cdFx0XHRpZiBAb3B0aW9ucy50aW1lID09IFwiXCJcblx0XHRcdFx0cmV0dXJuIGhvdXIgKyAnOicgKyBtaW51dGUgKyBzdWZmaXhcblx0XHRcdGVsc2Vcblx0XHRcdFx0cmV0dXJuIEBvcHRpb25zLnRpbWVcblxuXHRcdHRpbWUgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdG5hbWU6IFwidGltZVwiXG5cdFx0XHR3aWR0aDogQC53aWR0aFxuXHRcdFx0cGFkZGluZzpcblx0XHRcdFx0dG9wOiBnZXRUb3BNYXJnaW4oKVxuXHRcdFx0dGV4dDogZ2V0VGltZSgpXG5cdFx0XHRmb250U2l6ZTogYmFzZUZvbnRTaXplICogQG9wdGlvbnMuc2NhbGVGYWN0b3IgXG5cdFx0XHRmb250V2VpZ2h0OiB0aW1lRm9udFdlaWdodFxuXHRcdFx0dGV4dEFsaWduOiBcImNlbnRlclwiXG5cdFx0XHRsZXR0ZXJTcGFjaW5nOiBsZXR0ZXJTcGFjaW5nXG5cblx0XHRALnRpbWUgPSB0aW1lXG5cblx0XHRwb3dlciA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHRuYW1lOiBcInBvd2VyXCJcblx0XHRcdHk6IEFsaWduLmNlbnRlclxuXHRcdFx0d2lkdGg6IDExICogQG9wdGlvbnMuc2NhbGVGYWN0b3Jcblx0XHRcdGhlaWdodDogMTkgKiBAb3B0aW9ucy5zY2FsZUZhY3RvclxuXHRcdFx0aHRtbDogcG93ZXJTVkdcblxuXHRcdEAucG93ZXIgPSBwb3dlclxuXG5cdFx0YmF0dGVyeSA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHRuYW1lOiBcImJhdHRlcnlcIlxuXHRcdFx0eTogQWxpZ24uY2VudGVyXG5cdFx0XHR3aWR0aDogNDkgKiBAb3B0aW9ucy5zY2FsZUZhY3RvclxuXHRcdFx0aGVpZ2h0OiAxOCAqIEBvcHRpb25zLnNjYWxlRmFjdG9yXG5cdFx0XHRodG1sOiBpZiBAb3B0aW9ucy5zY2FsZUZhY3RvciA9PSAxIHRoZW4gYmF0dGVyeVNWRyBlbHNlIGJhdHRlcnlTVkczeFxuXG5cdFx0QC5iYXR0ZXJ5ID0gYmF0dGVyeVxuXG5cdFx0cGVyY2VudGFnZSA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0bmFtZTogXCJwZXJjZW50YWdlXCJcblx0XHRcdHBhZGRpbmc6XG5cdFx0XHRcdHRvcDogZ2V0VG9wTWFyZ2luKClcblx0XHRcdHRleHQ6IEBvcHRpb25zLnBlcmNlbnQgKyBcIiVcIlxuXHRcdFx0Zm9udFNpemU6IGJhc2VGb250U2l6ZSAqIEBvcHRpb25zLnNjYWxlRmFjdG9yIFxuXHRcdFx0Zm9udFdlaWdodDogZm9udFdlaWdodFxuXHRcdFx0dGV4dEFsaWduOiBcInJpZ2h0XCJcblx0XHRcdGxldHRlclNwYWNpbmc6IGxldHRlclNwYWNpbmdcblxuXHRcdEAucGVyY2VudGFnZSA9IHBlcmNlbnRhZ2VcblxuXHRcdGZvciBsYXllciBpbiBALnN1YkxheWVyc1xuXHRcdFx0bGF5ZXIuYmFja2dyb3VuZENvbG9yID0gXCJjbGVhclwiXG5cblx0XHRAaGlkZSA9ICgpID0+XG5cdFx0XHRAb3B0aW9ucy5oaWRlID0gdHJ1ZVxuXHRcdFx0QC5hbmltYXRlXG5cdFx0XHRcdHByb3BlcnRpZXM6XG5cdFx0XHRcdFx0eTogMCAtIHN0YXR1c0JhckhlaWdodFxuXHRcdFx0XHR0aW1lOlxuXHRcdFx0XHRcdDAuMjVcblxuXHRcdEBzaG93ID0gKCkgPT5cblx0XHRcdEBvcHRpb25zLmhpZGUgPSBmYWxzZVxuXHRcdFx0QC5hbmltYXRlXG5cdFx0XHRcdHByb3BlcnRpZXM6XG5cdFx0XHRcdFx0eTogMFxuXHRcdFx0XHR0aW1lOlxuXHRcdFx0XHRcdDAuMjVcblxuXHRcdEBsYXlvdXQgPSAoKSA9PlxuXHRcdFx0QC53aWR0aCA9IFNjcmVlbi53aWR0aFxuXHRcdFx0aWYgQG9wdGlvbnMuaGlkZSA9PSB0cnVlXG5cdFx0XHRcdEBoaWRlKClcblx0XHRcdGlmIEZyYW1lci5EZXZpY2Uub3JpZW50YXRpb24gPiAwICYmIChTY3JlZW4ud2lkdGggPT0gMjIwOCB8fCBTY3JlZW4ud2lkdGggPT0gMTMzNCB8fCBTY3JlZW4ud2lkdGggPT0gMTEzNilcblx0XHRcdFx0IyBEZXZpY2UgaXMgbGFuZHNjYXBlIGlQaG9uZVxuXHRcdFx0XHRpZiBAb3B0aW9ucy5hdXRvSGlkZSA9PSB0cnVlXG5cdFx0XHRcdFx0QGhpZGUoKVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRAc2hvdygpXG5cdFx0XHQjIExlZnQtc2lkZSBpdGVtc1xuXHRcdFx0aWYgQG9wdGlvbnMuY2FycmllciA9PSBcIlwiXG5cdFx0XHRcdGNhcnJpZXJNYXJnaW4gPSAwXG5cdFx0XHRlbHNlXG5cdFx0XHRcdGNhcnJpZXJNYXJnaW4gPSA5ICogQG9wdGlvbnMuc2NhbGVGYWN0b3Jcblx0XHRcdGlmIEBvcHRpb25zLnNpZ25hbCA9PSB0cnVlXG5cdFx0XHRcdHNpZ25hbC52aXNpYmxlID0gdHJ1ZVxuXHRcdFx0XHRzaWduYWwueCA9IHNpZ25hbE1hcmdpblxuXHRcdFx0XHRjYXJyaWVyLnggPSBzaWduYWwueCArIHNpZ25hbC53aWR0aCArIGNhcnJpZXJNYXJnaW5cblx0XHRcdGVsc2Vcblx0XHRcdFx0c2lnbmFsLnZpc2libGUgPSBmYWxzZVxuXHRcdFx0XHRjYXJyaWVyLnggPSBpcG9kTWFyZ2luXG5cdFx0XHRpZiBAb3B0aW9ucy53aWZpID09IHRydWVcblx0XHRcdFx0d2lmaS52aXNpYmxlID0gdHJ1ZVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHR3aWZpLnZpc2libGUgPSBmYWxzZVxuXHRcdFx0d2lmaS54ID0gY2Fycmllci54ICsgY2Fycmllci53aWR0aCArIHdpZmlNYXJnaW5cblx0XHRcdCMgQ2VudGVyIGN1cnJlbnQgdGltZSBhbmQgb24tY2FsbFxuXHRcdFx0dGltZS53aWR0aCA9IFNjcmVlbi53aWR0aFxuXHRcdFx0b25DYWxsQmxvY2sud2lkdGggPSBTY3JlZW4ud2lkdGhcblx0XHRcdG9uQ2FsbE1lc3NhZ2Uud2lkdGggPSBTY3JlZW4ud2lkdGhcblx0XHRcdCMgUmlnaHQtc2lkZSBpdGVtc1xuXHRcdFx0aWYgQG9wdGlvbnMucG93ZXJlZCA9PSB0cnVlXG5cdFx0XHRcdHBvd2VyLnggPSBBbGlnbi5yaWdodCgtcG93ZXJNYXJnaW4pXG5cdFx0XHRlbHNlXG5cdFx0XHRcdHBvd2VyLnggPSBTY3JlZW4ud2lkdGhcblx0XHRcdGJhdHRlcnkueCA9IHBvd2VyLnggLSBiYXR0ZXJ5LndpZHRoIC0gZ2V0QmF0dGVyeU1hcmdpbigpXG5cdFx0XHRpZiBAb3B0aW9ucy5zaG93UGVyY2VudGFnZSA9PSBmYWxzZVxuXHRcdFx0XHRwZXJjZW50YWdlTWFyZ2luID0gMFxuXHRcdFx0XHRwZXJjZW50YWdlLnRleHQgPSBcIlwiXG5cdFx0XHRlbHNlXG5cdFx0XHRcdHBlcmNlbnRhZ2VNYXJnaW4gPSA2ICogQG9wdGlvbnMuc2NhbGVGYWN0b3Jcblx0XHRcdFx0cGVyY2VudGFnZS50ZXh0ID0gQG9wdGlvbnMucGVyY2VudCArIFwiJVwiXG5cdFx0XHRwZXJjZW50YWdlLnggPSBiYXR0ZXJ5LnggLSBwZXJjZW50YWdlLndpZHRoIC0gcGVyY2VudGFnZU1hcmdpblxuXG5cdFx0Z2V0VGltZSgpXG5cdFx0QGxheW91dCgpXG5cblx0XHRmb3JlZ3JvdW5kSXRlbXMgPSBbcGVyY2VudGFnZSwgcG93ZXIsIHRpbWUsIHdpZmksIHNpZ25hbCwgY2FycmllciwgYmF0dGVyeV1cblxuXHRcdGNvbG9yRm9yZWdyb3VuZCA9IChjb2xvciA9IEBvcHRpb25zLmZvcmVncm91bmRDb2xvcikgPT5cblx0XHRcdGlmIGNvbG9yID09IFwiXCJcblx0XHRcdFx0aWYgQG9wdGlvbnMuc3R5bGUgPT0gXCJkYXJrXCJcblx0XHRcdFx0XHRjb2xvciA9IFwid2hpdGVcIlxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0Y29sb3IgPSBcImJsYWNrXCJcblx0XHRcdGZvciBsYXllciBpbiBmb3JlZ3JvdW5kSXRlbXNcblx0XHRcdFx0bGF5ZXIuY29sb3IgPSBjb2xvclxuXHRcdFx0XHRsYXllclNWRyA9IGxheWVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ3BhdGgsIGNpcmNsZSwgcmVjdCwgcG9seWdvbicpXG5cdFx0XHRcdGZvciBTVkcgaW4gbGF5ZXJTVkdcblx0XHRcdFx0XHRTVkcuc2V0QXR0cmlidXRlKCdmaWxsJywgY29sb3IpXG5cblx0XHRjb2xvckJhdHRlcnkgPSAoKSA9PlxuXHRcdFx0YmF0dGVyeUZpbGxTVkcgPSBsYXllci5xdWVyeVNlbGVjdG9yQWxsKCcjYmF0dGVyeUZpbGwnKVxuXHRcdFx0aWYgQG9wdGlvbnMub25DYWxsID09IHRydWVcblx0XHRcdFx0Zm9yIFNWRyBpbiBiYXR0ZXJ5RmlsbFNWR1xuXHRcdFx0XHRcdFNWRy5zdHlsZS5XZWJraXRUcmFuc2l0aW9uID0gJ2FsbCAwLjI1cyc7XG5cdFx0XHRcdFx0U1ZHLnNldEF0dHJpYnV0ZSgnZmlsbCcsIFwid2hpdGVcIilcblx0XHRcdGVsc2UgaWYgQG9wdGlvbnMucG93ZXJlZCA9PSB0cnVlXG5cdFx0XHRcdGZvciBTVkcgaW4gYmF0dGVyeUZpbGxTVkdcblx0XHRcdFx0XHRTVkcuc3R5bGUuV2Via2l0VHJhbnNpdGlvbiA9ICdhbGwgMC4yNXMnO1xuXHRcdFx0XHRcdFNWRy5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCBiYXR0ZXJ5R3JlZW4pXG5cdFx0XHRlbHNlIGlmIEBvcHRpb25zLnN0eWxlID09IFwiZGFya1wiXG5cdFx0XHRcdGZvciBTVkcgaW4gYmF0dGVyeUZpbGxTVkdcblx0XHRcdFx0XHRTVkcuc3R5bGUuV2Via2l0VHJhbnNpdGlvbiA9ICdhbGwgMC4yNXMnO1xuXHRcdFx0XHRcdFNWRy5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCBcIndoaXRlXCIpXG5cdFx0XHRlbHNlXG5cdFx0XHRcdGZvciBTVkcgaW4gYmF0dGVyeUZpbGxTVkdcblx0XHRcdFx0XHRTVkcuc3R5bGUuV2Via2l0VHJhbnNpdGlvbiA9ICdhbGwgMC4yNXMnO1xuXHRcdFx0XHRcdFNWRy5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCBcImJsYWNrXCIpXG5cblx0XHRzdHlsZUJhciA9IChzdHlsZSwgYmFja2dyb3VuZENvbG9yID0gXCJcIikgPT5cblx0XHRcdGlmIGJhY2tncm91bmRDb2xvciA9PSBcIlwiXG5cdFx0XHRcdEAuc3R5bGUgPVxuXHRcdFx0XHRcdFwiLXdlYmtpdC1iYWNrZHJvcC1maWx0ZXJcIjogXCJibHVyKDYwcHgpXCJcblx0XHRcdFx0aWYgc3R5bGUgPT0gXCJkYXJrXCJcblx0XHRcdFx0XHRALmJhY2tncm91bmRDb2xvciA9IFwicmdiYSgwLCAwLCAwLCAwLjUpXCJcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdEAuYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNSlcIlxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRALmJhY2tncm91bmRDb2xvciA9IGJhY2tncm91bmRDb2xvclxuXHRcdFx0aWYgQG9wdGlvbnMudmlicmFudCA9PSB0cnVlXG5cdFx0XHRcdGJhckNvbG9yID0gbmV3IENvbG9yKGJhY2tncm91bmRDb2xvcikuYWxwaGEoLjUpXG5cdFx0XHRcdEAuYmFja2dyb3VuZENvbG9yID0gYmFyQ29sb3Jcblx0XHRcdFx0QC5zdHlsZSA9XG5cdFx0XHRcdFx0XCItd2Via2l0LWJhY2tkcm9wLWZpbHRlclwiOiBcImJsdXIoNjBweClcIlxuXG5cblx0XHRAYXBwbHlTdHlsZSA9IChzdHlsZSA9IEBvcHRpb25zLnN0eWxlLCBmb3JlZ3JvdW5kQ29sb3IgPSBAb3B0aW9ucy5mb3JlZ3JvdW5kQ29sb3IsIGJhY2tncm91bmRDb2xvciA9IEBvcHRpb25zLmJhY2tncm91bmRDb2xvcikgPT5cblx0XHRcdGlmIHN0eWxlID09IFwibGlnaHRcIiAmJiBmb3JlZ3JvdW5kQ29sb3IgPT0gXCJcIlxuXHRcdFx0XHRmb3JlZ3JvdW5kQ29sb3IgPSBcImJsYWNrXCJcblx0XHRcdGlmIHN0eWxlID09IFwiZGFya1wiICYmIGZvcmVncm91bmRDb2xvciA9PSBcIlwiXG5cdFx0XHRcdGZvcmVncm91bmRDb2xvciA9IFwid2hpdGVcIlxuXHRcdFx0c3R5bGVCYXIoc3R5bGUsIGJhY2tncm91bmRDb2xvcilcblx0XHRcdGNvbG9yRm9yZWdyb3VuZChmb3JlZ3JvdW5kQ29sb3IpXG5cdFx0XHRjb2xvckJhdHRlcnkoKVxuXG5cdFx0QGFwcGx5U3R5bGUoKVxuXG5cdFx0QHN0YXJ0Q2FsbCA9IChtZXNzYWdlID0gXCJUb3VjaCB0byByZXR1cm4gdG8gY2FsbCAwOjMwXCIsIGNvbG9yID0gb25DYWxsQ29sb3IpID0+XG5cdFx0XHRAb3B0aW9ucy5vbkNhbGwgPSB0cnVlXG5cdFx0XHRjb2xvckZvcmVncm91bmQoXCJ3aGl0ZVwiKVxuXHRcdFx0Y29sb3JCYXR0ZXJ5KClcblx0XHRcdG9uQ2FsbEJsb2NrLmFuaW1hdGVcblx0XHRcdFx0cHJvcGVydGllczpcblx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IGNvbG9yXG5cdFx0XHRcdFx0b3BhY2l0eTogMVxuXHRcdFx0XHRcdGhlaWdodDogc3RhdHVzQmFySGVpZ2h0ICogMlxuXHRcdFx0XHR0aW1lOlxuXHRcdFx0XHRcdDAuMjVcblx0XHRcdG9uQ2FsbEJsb2NrLm9uQW5pbWF0aW9uRW5kID0+XG5cdFx0XHRcdGlmIEBvcHRpb25zLm9uQ2FsbCA9PSB0cnVlXG5cdFx0XHRcdFx0b25DYWxsTWVzc2FnZS50ZXh0ID0gbWVzc2FnZVxuXG5cdFx0QGVuZENhbGwgPSAoKSA9PlxuXHRcdFx0QG9wdGlvbnMub25DYWxsID0gZmFsc2Vcblx0XHRcdG9uQ2FsbE1lc3NhZ2UudGV4dCA9IFwiXCJcblx0XHRcdG9uQ2FsbEJsb2NrLmFuaW1hdGVcblx0XHRcdFx0cHJvcGVydGllczpcblx0XHRcdFx0XHRvcGFjaXR5OiAwXG5cdFx0XHRcdFx0aGVpZ2h0OiBzdGF0dXNCYXJIZWlnaHRcblx0XHRcdFx0dGltZTpcblx0XHRcdFx0XHQwLjI1XG5cdFx0XHRAYXBwbHlTdHlsZSgpXG5cblx0XHR1cGRhdGVPcmllbnRhdGlvbiA9IChkZXZpY2UpID0+XG5cdFx0IyBTZXR1cCB2YWx1ZSB0byBiZSBlaXRoZXIgRnJhbWVyLkRldmljZS5vcmllbnRhdGlvbiBpZiB0eXBlIGlzIFwiRnJhbWVyXCJcblx0XHQjIE9yIHdpbmRvdy5vcmllbnRhdGlvbiBpZiBkZXZpY2UgaXMgb24gbW9iaWxlXG5cdFx0XHR2YWx1ZSA9IGlmIGRldmljZSBpcyBcIkZyYW1lclwiIHRoZW4gRnJhbWVyLkRldmljZS5vcmllbnRhdGlvbiBlbHNlIHdpbmRvdy5vcmllbnRhdGlvblxuXHRcdFx0IyBDb25kaXRpb24gdG8gbWF0Y2ggaU9TXG5cdFx0XHQjIEluIEZyYW1lciwgcm90YXRpbmcgdG8gbGFuZHNjYXBlIG1ha2VzIGl0IGEgbmVnYXRpdmUgcm90YXRpb24sIG5vdCBwb3NpdGl2ZVxuXHRcdFx0IyBUbyBiZSBjb25zaXN0ZW50LCBhdXRvbWF0aWNhbGx5IG1ha2luZyBpdCBzZXQgdmFsdWUgY29ycmVjdGx5XG5cdFx0XHRpZiB2YWx1ZSA8IDAgJiYgZGV2aWNlIGlzIFwiRnJhbWVyXCJcblx0XHRcdFx0dmFsdWUgPSBNYXRoLmFicyh2YWx1ZSlcblx0XHRcdCMgU3dpdGNoIHRvIGNoZWNrIHRoZSB2YWx1ZVxuXHRcdFx0cm90YXRpb24gPSBzd2l0Y2hcblx0XHRcdFx0d2hlbiB2YWx1ZSBpcyAwXG5cdFx0XHRcdFx0ZGV2aWNlUm90YXRpb24gPSBcIlBvcnRyYWl0XCJcblx0XHRcdFx0d2hlbiB2YWx1ZSBpcyAxODBcblx0XHRcdFx0XHRkZXZpY2VSb3RhdGlvbiA9IFwiUG9ydHJhaXQgKFVwc2lkZS1Eb3duKVwiXG5cdFx0XHRcdHdoZW4gdmFsdWUgaXMgLTkwXG5cdFx0XHRcdFx0ZGV2aWNlUm90YXRpb24gPSBcIkxhbmRzY2FwZSAoQ2xvY2t3aXNlKVwiXG5cdFx0XHRcdHdoZW4gdmFsdWUgaXMgOTBcblx0XHRcdFx0XHRkZXZpY2VSb3RhdGlvbiA9IFwiTGFuZHNjYXBlIChDb3VudGVyY2xvY2t3aXNlKVwiIFxuXHRcdFx0IyBTZXQgZGV2aWNlT3JpZW50YXRpb24gYXMgZGV2aWNlUm90YXRpb25cdFxuXHRcdFx0ZGV2aWNlT3JpZW50YXRpb24gPSBkZXZpY2VSb3RhdGlvblxuXHRcdFx0QGxheW91dCgpXG5cdFx0IyBDaGVjayB3aGV0aGVyIHRoZSBkZXZpY2UgaXMgbW9iaWxlIG9yIG5vdCAodmVyc3VzIEZyYW1lcilcblx0XHRpZiBVdGlscy5pc01vYmlsZSgpXG5cdFx0XHQjIFNldCB0eXBlXG5cdFx0XHRkZXZpY2UgPSBcIm1vYmlsZVwiXG5cdFx0XHQjIEFkZCBldmVudCBsaXN0ZW5lciBvbiBvcmllbnRhdGlvbiBjaGFuZ2Vcblx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyIFwib3JpZW50YXRpb25jaGFuZ2VcIiwgLT4gXG5cdFx0XHRcdCMgU2VuZCBldmVudCBoYW5kbGluZyB0byBmdW5jdGlvbiBhbG9uZyB3aXRoIGRldmljZSB0eXBlXG5cdFx0XHRcdHVwZGF0ZU9yaWVudGF0aW9uKGRldmljZSlcblx0XHRlbHNlXG5cdFx0XHQjIExpc3RlbiBmb3Igb3JpZW50YXRpb24gY2hhbmdlcyBvbiB0aGUgZGV2aWNlIHZpZXdcblx0XHRcdEZyYW1lci5EZXZpY2Uub24gXCJjaGFuZ2U6b3JpZW50YXRpb25cIiwgLT5cblx0XHRcdFx0IyBTZXQgdHlwZVxuXHRcdFx0XHRkZXZpY2UgPSBcIkZyYW1lclwiXG5cdFx0XHRcdCMgU2VuZCBldmVudCBoYW5kbGluZyB0byBmdW5jdGlvbiB3aXRoIGRldmljZSB0eXBlXG5cdFx0XHRcdHVwZGF0ZU9yaWVudGF0aW9uKGRldmljZSlcblxuXHRAZGVmaW5lICdoaWRkZW4nLCBnZXQ6ICgpIC0+IEBvcHRpb25zLmhpZGVcblx0QGRlZmluZSAnb25DYWxsJywgZ2V0OiAoKSAtPiBAb3B0aW9ucy5vbkNhbGxcblxubW9kdWxlLmV4cG9ydHMgPSBTdGF0dXNCYXJMYXllciIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBRUFBOztBREFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBQSxjQUFBO0VBQUE7OztBQXlDTTtBQUNMLE1BQUE7Ozs7RUFBQSxVQUFBLEdBQWE7O0VBQ2IsY0FBQSxHQUFpQjs7RUFFakIsWUFBQSxHQUFlOztFQUNmLFdBQUEsR0FBYzs7RUFFRCx3QkFBQyxPQUFEO0FBQ1osUUFBQTtJQURhLElBQUMsQ0FBQSw0QkFBRCxVQUFTOztVQUNkLENBQUMsUUFBUzs7O1dBQ1YsQ0FBQyxVQUFXOzs7V0FDWixDQUFDLFVBQVc7OztXQUNaLENBQUMsa0JBQW1COzs7V0FDcEIsQ0FBQyxrQkFBbUI7OztXQUNwQixDQUFDLE9BQVE7OztXQUNULENBQUMsVUFBVzs7O1dBQ1osQ0FBQyxpQkFBa0I7OztXQUNuQixDQUFDLE9BQVE7OztXQUNULENBQUMsU0FBVTs7O1lBQ1gsQ0FBQyxPQUFROzs7WUFDVCxDQUFDLE9BQVE7OztZQUNULENBQUMsV0FBWTs7O1lBQ2IsQ0FBQyxTQUFVOzs7WUFDWCxDQUFDLFVBQVc7OztZQUNaLENBQUMsY0FBa0IsQ0FBQyxDQUFD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
