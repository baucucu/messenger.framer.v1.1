(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var MasterLayout, ios, masterLayout, messenger, users, usersDB, usersModule;

ios = require('ios-kit');

MasterLayout = require("ipz-master-layout");

usersModule = require("ipz-dal-usersDAL");

Framer.Device.customize({
  screenWidth: 750,
  screenHeight: 1334,
  devicePixelRatio: 1
});

Framer.Defaults.Layer.force2d = true;

ios.device.name = "iphone-6s";

Screen.backgroundColor = "white";

usersDB = new usersModule;

users = usersDB.getUsers({}, 20, "", "serialno", -1);

masterLayout = new MasterLayout;

messenger = masterLayout.openApp("Messenger");

messenger.login(users[0]);


},{"ios-kit":17,"ipz-dal-usersDAL":18,"ipz-master-layout":19}],2:[function(require,module,exports){
var ios;

ios = require('ios-kit');

exports.defaults = {
  title: "Title",
  message: "",
  actions: ["OK"]
};

exports.defaults.props = Object.keys(exports.defaults);

exports.create = function(obj) {
  var act, actLabel, actLabel2, action, action2, actionDivider, actions, alert, cleanName, i, index, j, len, len1, ref, setup;
  setup = ios.utils.setupComponent(obj, exports.defaults);
  alert = new ios.View({
    backgroundColor: "transparent",
    name: "alert",
    constraints: {
      leading: 0,
      trailing: 0,
      top: 0,
      bottom: 0
    }
  });
  alert.overlay = new ios.View({
    backgroundColor: "rgba(0,0,0,.3)",
    superLayer: alert,
    name: ".overlay",
    constraints: {
      leading: 0,
      trailing: 0,
      top: 0,
      bottom: 0
    }
  });
  alert.modal = new ios.View({
    backgroundColor: "white",
    superLayer: alert,
    borderRadius: ios.utils.px(10),
    name: ".modal",
    constraints: {
      align: "center",
      width: 280,
      height: 400
    }
  });
  alert.title = new ios.Text({
    superLayer: alert.modal,
    text: setup.title,
    fontWeight: "semibold",
    name: ".title",
    textAlign: "center",
    lineHeight: 20,
    constraints: {
      top: 20,
      width: 220,
      align: "horizontal"
    }
  });
  alert.message = new ios.Text({
    superLayer: alert.modal,
    text: setup.message,
    fontSize: 13,
    name: ".message",
    textAlign: "center",
    lineHeight: 16,
    constraints: {
      top: [alert.title, 10],
      align: "horizontal",
      width: 220
    }
  });
  if (setup.message.length === 0) {
    alert.message.height = -24;
  }
  alert.horiDivider = new ios.View({
    superLayer: alert.modal,
    backgroundColor: "#E2E8EB",
    name: ".horiDivider",
    constraints: {
      leading: 0,
      trailing: 0,
      height: 1,
      bottom: 44
    }
  });
  cleanName = function(n) {
    if (n[0] === "-") {
      return n.slice(9);
    } else {
      return n;
    }
  };
  alert.modal.constraints["height"] = 20 + ios.utils.pt(alert.title.height) + 10 + ios.utils.pt(alert.message.height) + 24 + 44;
  actions = [];
  switch (setup.actions.length) {
    case 1:
      actLabel = ios.utils.capitalize(setup.actions[0]);
      action = new ios.View({
        superLayer: alert.modal,
        backgroundColor: "white",
        name: cleanName(setup.actions[0]),
        borderRadius: ios.utils.px(10),
        constraints: {
          leading: 0,
          trailing: 0,
          bottom: 0,
          height: 44
        }
      });
      action.label = new ios.Text({
        color: ios.utils.color("blue"),
        superLayer: action,
        text: actLabel,
        name: "label",
        constraints: {
          align: "horizontal",
          bottom: 16
        }
      });
      actions.push(action);
      break;
    case 2:
      actLabel = ios.utils.capitalize(setup.actions[0]);
      action = new ios.View({
        superLayer: alert.modal,
        name: cleanName(setup.actions[0]),
        borderRadius: ios.utils.px(10),
        backgroundColor: "white",
        constraints: {
          leading: 0,
          trailing: ios.utils.pt(alert.modal.width / 2),
          bottom: 0,
          height: 44
        }
      });
      action.label = new ios.Text({
        color: ios.utils.color("blue"),
        superLayer: action,
        text: actLabel,
        name: "label",
        constraints: {
          align: "horizontal",
          bottom: 16
        }
      });
      actions.push(action);
      alert.vertDivider = new ios.View({
        superLayer: alert.modal,
        backgroundColor: "#E2E8EB",
        name: ".vertDivider",
        constraints: {
          width: 1,
          bottom: 0,
          height: 44,
          align: "horizontal"
        }
      });
      actLabel2 = ios.utils.capitalize(setup.actions[1]);
      action2 = new ios.View({
        superLayer: alert.modal,
        name: cleanName(setup.actions[1]),
        borderRadius: ios.utils.px(10),
        backgroundColor: "white",
        constraints: {
          leading: ios.utils.pt(alert.modal.width / 2),
          trailing: 0,
          bottom: 0,
          height: 44
        }
      });
      action2.label = new ios.Text({
        color: ios.utils.color("blue"),
        superLayer: action2,
        text: actLabel2,
        name: "label",
        constraints: {
          align: "horizontal",
          bottom: 16
        }
      });
      actions.push(action2);
      break;
    default:
      ref = setup.actions;
      for (index = i = 0, len = ref.length; i < len; index = ++i) {
        act = ref[index];
        actLabel = ios.utils.capitalize(act);
        action = new ios.View({
          superLayer: alert.modal,
          name: cleanName(act),
          borderRadius: ios.utils.px(10),
          backgroundColor: "white",
          constraints: {
            leading: 0,
            trailing: 0,
            bottom: 0 + ((setup.actions.length - index - 1) * 44),
            height: 44
          }
        });
        actionDivider = new ios.View({
          superLayer: alert.modal,
          backgroundColor: "#E2E8EB",
          name: "action divider",
          constraints: {
            leading: 0,
            trailing: 0,
            height: 1,
            bottom: 0 + ((setup.actions.length - index) * 44)
          }
        });
        action.label = new ios.Text({
          style: "alertAction",
          color: ios.utils.color("blue"),
          superLayer: action,
          text: actLabel,
          name: "label",
          constraints: {
            align: "horizontal",
            bottom: 14
          }
        });
        actions.push(action);
        alert.modal.constraints["height"] = alert.modal.constraints["height"] + 42 - 12;
      }
  }
  alert.actions = {};
  for (index = j = 0, len1 = actions.length; j < len1; index = ++j) {
    act = actions[index];
    act.type = "button";
    ios.utils.specialChar(act);
    if (setup.actions[index].indexOf("-r") === 0) {
      act.origColor = ios.utils.color("red");
    } else {
      act.origColor = ios.utils.color("blue");
    }
    ios.layout.set(act.label);
    act.on(Events.TouchStart, function() {
      this.backgroundColor = "white";
      this.animate({
        properties: {
          backgroundColor: act.backgroundColor.darken(5)
        },
        time: .25
      });
      return this.label.animate({
        properties: {
          color: this.origColor.lighten(10)
        },
        time: .25
      });
    });
    act.on(Events.TouchEnd, function() {
      this.animate({
        properties: {
          backgroundColor: "white"
        },
        time: .25
      });
      this.label.animate({
        properties: {
          color: this.origColor
        },
        time: .25
      });
      return alert.destroy();
    });
    alert.actions[act.name] = act;
  }
  ios.layout.set(actions[actions.length - 1]);
  return alert;
};


},{"ios-kit":17}],3:[function(require,module,exports){
var ios;

ios = require('ios-kit');

exports.defaults = {
  title: "Title",
  message: "Message",
  action: "Action",
  time: "now",
  app: "app",
  icon: void 0,
  duration: 7,
  animated: true,
  reply: true
};

exports.defaults.props = Object.keys(exports.defaults);

exports.create = function(obj) {
  var banner, setup, specs;
  setup = ios.utils.setupComponent(obj, exports.defaults);
  specs = {
    leadingIcon: 15,
    topIcon: 8,
    topTitle: 6,
    width: 0
  };
  switch (ios.device.name) {
    case "iphone-5":
      specs.width = 304;
      break;
    case "iphone-6s":
      specs.width = 359;
      break;
    case "iphone-6s-plus":
      specs.leadingIcon = 15;
      specs.topIcon = 12;
      specs.topTitle = 10;
      specs.width = 398;
      break;
    case "ipad":
      specs.leadingIcon = 8;
      specs.topIcon = 8;
      specs.topTitle = 11;
      specs.width = 398;
      break;
    case "ipad-pro":
      specs.leadingIcon = 8;
      specs.topIcon = 8;
      specs.topTitle = 9;
      specs.width = 556;
  }
  banner = new ios.View({
    backgroundColor: "rgba(255,255,255,.6)",
    name: "banner",
    borderRadius: ios.px(12),
    shadowColor: "rgba(0,0,0,.3)",
    shadowY: ios.px(2),
    shadowBlur: ios.px(10),
    clip: true,
    constraints: {
      align: 'horizontal',
      width: specs.width,
      top: 8,
      height: 93
    }
  });
  banner.header = new ios.View({
    backgroundColor: "rgba(255,255,255, .3)",
    name: ".header",
    superLayer: banner,
    constraints: {
      height: 36,
      leading: 0,
      trailing: 0
    }
  });
  if (setup.icon === void 0) {
    banner.icon = new ios.View({
      superLayer: banner.header
    });
    banner.icon.style["background"] = "linear-gradient(-180deg, #67FF81 0%, #01B41F 100%)";
  } else {
    banner.header.addSubLayer(setup.icon);
    banner.icon = setup.icon;
  }
  banner.icon.borderRadius = ios.utils.px(4.5);
  banner.icon.name = ".icon";
  banner.icon.constraints = {
    height: 20,
    width: 20,
    leading: specs.leadingIcon,
    align: "vertical"
  };
  ios.layout.set(banner.icon);
  banner.app = new ios.Text({
    text: setup.app.toUpperCase(),
    color: "rgba(0,0,0,.5)",
    fontSize: 13,
    letterSpacing: .5,
    superLayer: banner.header,
    constraints: {
      leading: [banner.icon, 6],
      align: "vertical"
    }
  });
  banner.title = new ios.Text({
    text: setup.title,
    color: "black",
    fontWeight: "semibold",
    fontSize: 15,
    superLayer: banner,
    name: ".title",
    constraints: {
      top: 45,
      leading: 15
    }
  });
  banner.message = new ios.Text({
    text: setup.message,
    color: "black",
    fontSize: 15,
    fontWeight: "light",
    superLayer: banner,
    name: ".message",
    constraints: {
      leadingEdges: banner.title,
      top: [banner.title, 6]
    }
  });
  banner.time = new ios.Text({
    text: setup.time,
    color: "rgba(0,0,0,.5)",
    fontSize: 13,
    superLayer: banner.header,
    name: ".time",
    constraints: {
      trailing: 16,
      align: "vertical"
    }
  });
  if (ios.device.name === "ipad" || ios.device.name === "ipad-pro") {
    banner.time.constraints = {
      bottomEdges: banner.title,
      trailing: specs.leadingIcon
    };
  }
  ios.utils.bgBlur(banner);
  banner.draggable = true;
  banner.draggable.horizontal = false;
  banner.draggable.constraints = {
    y: ios.px(8),
    x: ios.px(8)
  };
  banner.draggable.bounceOptions = {
    friction: 25,
    tension: 250
  };
  banner.on(Events.DragEnd, function() {
    if (banner.maxY < ios.utils.px(68)) {
      banner.animate({
        properties: {
          maxY: 0
        },
        time: .15,
        curve: "ease-in-out"
      });
      return Utils.delay(.25, function() {
        return banner.destroy();
      });
    }
  });
  if (setup.animated === true) {
    banner.y = 0 - banner.height;
    ios.layout.animate({
      target: banner,
      time: .25,
      curve: 'ease-in-out'
    });
  }
  if (setup.duration) {
    Utils.delay(setup.duration, function() {
      return banner.animate({
        properties: {
          maxY: 0
        },
        time: .25,
        curve: "ease-in-out"
      });
    });
    Utils.delay(setup.duration + .25, function() {
      return banner.destroy();
    });
  }
  return banner;
};


},{"ios-kit":17}],4:[function(require,module,exports){
var ios;

ios = require('ios-kit');

exports.defaults = {
  text: "Button",
  type: "text",
  style: "light",
  backgroundColor: "white",
  color: "#007AFF",
  fontSize: 17,
  fontWeight: "regular",
  name: "button",
  blur: true,
  superLayer: void 0,
  constraints: void 0
};

exports.defaults.props = Object.keys(exports.defaults);

exports.create = function(array) {
  var backgroundColor, button, color, rgbString, rgbaString, setup;
  setup = ios.utils.setupComponent(array, exports.defaults);
  button = new ios.View({
    name: setup.name,
    constraints: setup.constraints,
    superLayer: setup.superLayer
  });
  button.type = setup.type;
  color = "";
  switch (setup.type) {
    case "big":
      setup.fontSize = 20;
      setup.fontWeight = "medium";
      button.borderRadius = ios.utils.px(12.5);
      backgroundColor = "";
      if (button.constraints === void 0) {
        button.constraints = {};
      }
      button.constraints.leading = 10;
      button.constraints.trailing = 10;
      button.constraints.height = 57;
      switch (setup.style) {
        case "light":
          color = ios.utils.color("blue");
          if (setup.blur) {
            backgroundColor = "rgba(255, 255, 255, .9)";
            ios.utils.bgBlur(button);
          } else {
            backgroundColor = "white";
          }
          break;
        case "dark":
          color = "#FFF";
          if (setup.blur) {
            backgroundColor = "rgba(43, 43, 43, .9)";
            ios.utils.bgBlur(button);
          } else {
            backgroundColor = "#282828";
          }
          break;
        default:
          if (setup.blur) {
            color = setup.color;
            backgroundColor = new Color(setup.backgroundColor);
            rgbString = backgroundColor.toRgbString();
            rgbaString = rgbString.replace(")", ", .9)");
            rgbaString = rgbaString.replace("rgb", "rgba");
            backgroundColor = rgbaString;
            ios.utils.bgBlur(button);
          } else {
            color = setup.color;
            backgroundColor = new Color(setup.backgroundColor);
          }
      }
      button.backgroundColor = backgroundColor;
      button.on(Events.TouchStart, function() {
        var newColor;
        newColor = "";
        if (setup.style === "dark") {
          newColor = button.backgroundColor.lighten(10);
        } else {
          newColor = button.backgroundColor.darken(10);
        }
        return button.animate({
          properties: {
            backgroundColor: newColor
          },
          time: .5
        });
      });
      button.on(Events.TouchEnd, function() {
        return button.animate({
          properties: {
            backgroundColor: backgroundColor
          },
          time: .5
        });
      });
      break;
    case "small":
      setup.fontSize = 14;
      setup.top = 4;
      button.borderRadius = ios.utils.px(2.5);
      setup.fontWeight = 500;
      setup.text = setup.text.toUpperCase();
      color = setup.color;
      button.borderColor = setup.color;
      button.backgroundColor = "transparent";
      button.borderWidth = ios.utils.px(1);
      break;
    default:
      button.backgroundColor = "transparent";
      button.origColor = ios.utils.specialChar(button);
      color = setup.color;
      button.labelOrigColor = color;
      button.on(Events.TouchStart, function() {
        var newColor;
        this.labelOrigColor = button.label.color;
        newColor = button.subLayers[0].color.lighten(30);
        return button.subLayers[0].animate({
          properties: {
            color: newColor
          },
          time: .5
        });
      });
      button.on(Events.TouchEnd, function() {
        return this.subLayers[0].animate({
          properties: {
            color: ios.utils.color(this.labelOrigColor)
          },
          time: .5
        });
      });
  }
  button.label = new ios.Text({
    name: ".label",
    text: setup.text,
    color: color,
    lineHeight: 16,
    superLayer: button,
    fontSize: setup.fontSize,
    fontWeight: setup.fontWeight,
    constraints: {
      align: "center"
    }
  });
  switch (setup.type) {
    case "small":
      button.props = {
        width: button.label.width + ios.utils.px(20),
        height: button.label.height + ios.utils.px(10)
      };
      button.on(Events.TouchStart, function() {
        button.animate({
          properties: {
            backgroundColor: color
          },
          time: .5
        });
        return button.label.animate({
          properties: {
            color: "#FFF"
          },
          time: .5
        });
      });
      button.on(Events.TouchEnd, function() {
        button.animate({
          properties: {
            backgroundColor: "transparent"
          },
          time: .5
        });
        return button.label.animate({
          properties: {
            color: color
          },
          time: .5
        });
      });
      break;
    default:
      button.props = {
        width: button.label.width,
        height: button.label.height
      };
  }
  ios.layout.set({
    target: button
  });
  ios.layout.set({
    target: button.label
  });
  return button;
};


},{"ios-kit":17}],5:[function(require,module,exports){
var genCSS, ios;

ios = require('ios-kit');

genCSS = function(cssArray) {
  var colonIndex, cssObj, i, j, key, len, prop, value;
  cssObj = {};
  for (i = j = 0, len = cssArray.length; j < len; i = ++j) {
    prop = cssArray[i];
    colonIndex = prop.indexOf(":");
    key = prop.slice(0, colonIndex);
    value = prop.slice(colonIndex + 2, prop.length - 1);
    cssObj[key] = value;
  }
  return cssObj;
};

exports.convert = function(obj) {
  var Artboard, artboards, b, children, device, found, genAlert, genBanner, genButton, genConstraints, genField, genKeyboard, genLayer, genNavBar, genSheet, genStatusBar, genTabBar, genText, getCSS, getColorString, getDesignedDevice, getImage, getLayer, getString, j, key, layerKeys, layers, len, len1, m, newArtboards, newLayers;
  getDesignedDevice = function(w) {
    var device;
    device = {};
    switch (w) {
      case 320:
      case 480:
      case 640:
      case 960:
      case 1280:
        device.scale = 2;
        device.height = 568;
        device.width = 320;
        device.name = 'iphone-5';
        break;
      case 375:
      case 562.5:
      case 750:
      case 1125:
      case 1500:
        device.scale = 2;
        device.height = 667;
        device.width = 375;
        device.name = 'iphone-6s';
        break;
      case 414:
      case 621:
      case 828:
      case 1242:
      case 1656:
        device.scale = 3;
        device.height = 736;
        device.width = 414;
        device.name = 'iphone-6s-plus';
        break;
      case 768:
      case 1152:
      case 1536:
      case 2304:
      case 3072:
        device.scale = 2;
        device.height = 1024;
        device.width = 768;
        device.name = 'ipad';
        break;
      case 1024:
      case 1536:
      case 2048:
      case 3072:
      case 4096:
        device.scale = 2;
        device.height = 1366;
        device.width = 1024;
        device.name = 'ipad-pro';
    }
    switch (w) {
      case 320:
      case 375:
      case 414:
      case 768:
      case 1024:
        device.iScale = 1;
        break;
      case 480:
      case 562.5:
      case 621:
      case 1152:
      case 1536:
        device.iScale = 1.5;
        break;
      case 640:
      case 750:
      case 828:
      case 1536:
      case 2048:
        device.iScale = 2;
        break;
      case 960:
      case 1125:
      case 1242:
      case 2304:
      case 3072:
        device.iScale = 3;
        break;
      case 1280:
      case 1500:
      case 1656:
      case 3072:
      case 4096:
        device.iScale = 4;
    }
    device.obj = 'device';
    return device;
  };
  layerKeys = Object.keys(obj);
  layers = [];
  artboards = [];
  newLayers = {};
  newArtboards = [];
  for (j = 0, len = layerKeys.length; j < len; j++) {
    key = layerKeys[j];
    if (obj[key]._info.kind === 'artboard') {
      artboards.push(obj[key]);
    }
  }
  for (m = 0, len1 = artboards.length; m < len1; m++) {
    b = artboards[m];
    device = getDesignedDevice(b.width);
    Artboard = function(artboard) {
      var board;
      board = new ios.View({
        name: artboard.name,
        backgroundColor: b.backgroundColor,
        constraints: {
          top: 0,
          bottom: 0,
          leading: 0,
          trailing: 0
        }
      });
      return board;
    };
    getString = function(l) {
      return l._info.metadata.string;
    };
    getCSS = function(l) {
      return genCSS(l._info.metadata.css);
    };
    getColorString = function(l) {
      return '-' + getCSS(l).color + ' ' + getString(l);
    };
    getImage = function(l) {
      return l.image;
    };
    getLayer = function(l) {
      return l.copy();
    };
    found = function(o, t) {
      if (o.indexOf(t) !== -1) {
        return true;
      }
    };
    genConstraints = function(l) {
      var bY, cX, cY, constraints, f, lX, r, s, tX, tY;
      constraints = {};
      s = device.iScale;
      cX = device.width / 2;
      cY = device.height / 2;
      tY = device.height / 4 * 3;
      bY = device.height / 4 * 3;
      lX = device.width / 4 * 3;
      tX = device.width / 4 * 3;
      r = function(n) {
        return Math.round(n);
      };
      f = function(n) {
        return Math.floor(n);
      };
      if (cX === l.midX / s || r(cX) === r(l.midX / s) || f(cX) === f(l.midX / s)) {
        constraints.align = 'horizontal';
      }
      if (cY === l.midY / s || r(cY) === r(l.midY / s) || f(cY) === f(l.midY / s)) {
        if (constraints.align === 'horizontal') {
          constraints.align = 'center';
        } else {
          constraints.align = 'vertical';
        }
      }
      if (l.x / s < lX) {
        constraints.leading = r(l.x / s);
      }
      if (l.x / s > tX) {
        constraints.trailing = r(l.parent.width / s - l.maxX / s);
      }
      if (l.y / s < tY) {
        constraints.top = r(l.y / s);
      }
      if (l.y / s > bY) {
        constraints.bottom = r(l.parent.height / s - l.maxY / s);
      }
      if (l.width / s === device.width) {
        constraints.leading = 0;
        constraints.trailing = 0;
      } else {
        constraints.width = l.width / s;
      }
      if (l.height / s === device.height) {
        constraints.top = 0;
        constraints.bottom = 0;
      } else {
        constraints.height = l.height / s;
      }
      return constraints;
    };
    genLayer = function(l, parent) {
      var props;
      props = {
        backgroundColor: 'transparent',
        name: l.name,
        image: l.image,
        superLayer: parent,
        constraints: genConstraints(l)
      };
      return new ios.View(props);
    };
    genAlert = function(l, nP) {
      var c, len2, n, props, q, ref;
      props = {
        actions: [],
        superLayer: nP
      };
      ref = l.children;
      for (q = 0, len2 = ref.length; q < len2; q++) {
        c = ref[q];
        n = c.name;
        if (found(n, 'title')) {
          props.title = getString(c);
        }
        if (found(n, 'message')) {
          props.message = getString(c);
        }
        if (found(n, 'action')) {
          props.actions.unshift(getColorString(c));
        }
        c.destroy();
      }
      return new ios.Alert(props);
    };
    genBanner = function(l, nP) {
      var c, len2, n, props, q, ref;
      props = {
        superLayer: nP
      };
      ref = l.children;
      for (q = 0, len2 = ref.length; q < len2; q++) {
        c = ref[q];
        n = c.name;
        if (found(n, 'app')) {
          props.app = getString(c);
        }
        if (found(n, 'title')) {
          props.title = getString(c);
        }
        if (found(n, 'message')) {
          props.message = getString(c);
        }
        if (found(n, 'time')) {
          props.time = getString(c);
        }
        if (found(n, 'icon')) {
          props.icon = getLayer(c);
        }
        c.destroy();
      }
      return new ios.Banner(props);
    };
    genButton = function(l, nP) {
      var c, len2, n, props, q, ref;
      props = {
        superLayer: nP,
        constraints: genConstraints(l)
      };
      ref = l.children;
      for (q = 0, len2 = ref.length; q < len2; q++) {
        c = ref[q];
        n = c.name;
        if (found(n, 'small')) {
          props.type = 'small';
        }
        if (found(n, 'big')) {
          props.type = 'big';
        }
        if (found(n, 'dark')) {
          props.style = 'dark';
        }
        if (found(n, 'label')) {
          props.text = getString(c);
          props.color = getCSS(c).color;
          props.fontSize = getCSS(c)['font-size'].replace('px', '');
        }
        c.destroy();
      }
      return new ios.Button(props);
    };
    genField = function(l, nP) {
      var c, len2, n, props, q, ref;
      props = {
        superLayer: nP,
        constraints: genConstraints(l)
      };
      ref = l.children;
      for (q = 0, len2 = ref.length; q < len2; q++) {
        c = ref[q];
        n = c.name;
        if (found(n, 'placeholder')) {
          props.placeholder = getString(c);
        }
        c.destroy();
      }
      return new ios.Field(props);
    };
    genKeyboard = function(l, nP) {
      var c, len2, n, props, q, ref;
      props = {
        superLayer: nP
      };
      ref = l.children;
      for (q = 0, len2 = ref.length; q < len2; q++) {
        c = ref[q];
        n = c.name;
        if (found(n, 'return')) {
          props.returnText = getString(c);
        }
        if (found(n, 'dark')) {
          props.style = 'dark';
        }
        c.destroy();
      }
      return new ios.Keyboard(props);
    };
    genNavBar = function(l, nP) {
      var c, len2, n, props, q, ref;
      props = {
        superLayer: nP
      };
      ref = l.children;
      for (q = 0, len2 = ref.length; q < len2; q++) {
        c = ref[q];
        n = c.name;
        if (found(n, 'title')) {
          props.title = getString(c);
          props.titleColor = getCSS(c).color;
        }
        if (found(n, 'right')) {
          props.right = getString(c);
          props.color = getCSS(c).color;
        }
        if (found(n, 'left')) {
          props.left = getString(c);
        }
        c.destroy();
      }
      return new ios.NavBar(props);
    };
    genSheet = function(l, nP) {
      var c, i, len2, n, props, q, ref;
      props = {
        actions: [],
        superLayer: nP
      };
      ref = l.children;
      for (i = q = 0, len2 = ref.length; q < len2; i = ++q) {
        c = ref[i];
        n = c.name;
        if (found(n, 'action')) {
          props.actions.push(getColorString(c));
        }
        if (found(n, 'exit')) {
          props.exit = getString(c);
        }
        c.destroy();
      }
      return new ios.Sheet(props);
    };
    genStatusBar = function(l, nP) {
      var c, len2, n, props, q, ref;
      props = {
        superLayer: nP
      };
      ref = l.children;
      for (q = 0, len2 = ref.length; q < len2; q++) {
        c = ref[q];
        n = c.name;
        if (found(n, 'carrier')) {
          props.carrier = getString(c);
        }
        if (found(n, 'battery')) {
          props.battery = getString(c).replace('%', '');
        }
        if (found(n, 'network')) {
          props.network = getString(c);
        }
        if (found(n, 'dark')) {
          props.style = 'light';
        }
        c.destroy();
      }
      return new ios.StatusBar(props);
    };
    genTabBar = function(l, nP) {
      var c, len2, len3, n, props, q, ref, ref1, t, tn, tprops, u;
      props = {
        tabs: [],
        superLayer: nP
      };
      ref = l.children;
      for (q = 0, len2 = ref.length; q < len2; q++) {
        c = ref[q];
        n = c.name;
        tprops = {};
        ref1 = c.children;
        for (u = 0, len3 = ref1.length; u < len3; u++) {
          t = ref1[u];
          tn = t.name;
          if (n === 'tab_active' && tn.indexOf('label') !== -1) {
            props.activeColor = getCSS(t).color;
          }
          if (n !== 'tab_active' && tn.indexOf('label') !== -1) {
            props.inactiveColor = getCSS(t).color;
          }
          if (found(tn, 'active') && tn.indexOf('inactive') === -1) {
            tprops.active = getLayer(t);
          }
          if (found(tn, 'inactive')) {
            tprops.inactive = getLayer(t);
          }
          if (found(tn, 'label')) {
            tprops.label = getString(t);
          }
          t.destroy();
        }
        props.tabs.unshift(new ios.Tab(tprops));
        c.destroy();
      }
      return new ios.TabBar(props);
    };
    genText = function(l, nP) {
      var css, k, keys, len2, props, q;
      props = {
        superLayer: nP,
        text: getString(l),
        constraints: genConstraints(l)
      };
      css = getCSS(l);
      keys = Object.keys(getCSS(l));
      for (q = 0, len2 = keys.length; q < len2; q++) {
        k = keys[q];
        if (found(k, 'font-family')) {
          props.fontFamily = css[k];
        }
        if (found(k, 'opacity')) {
          props.opacity = Number(css[k]);
        }
        if (found(k, 'color')) {
          props.color = css[k];
        }
        if (found(k, 'font-size')) {
          props.fontSize = css[k].replace('px', '');
        }
        if (found(k, 'letter-spacing')) {
          props.letterSpacing = css[k];
        }
        if (found(k, 'line-height')) {
          props.lineHeight = css[k].replace('px', '');
        }
      }
      return new ios.Text(props);
    };
    children = function(p, nP) {
      var c, len2, n, newLayer, q, ref, results;
      ref = p.children;
      results = [];
      for (q = 0, len2 = ref.length; q < len2; q++) {
        c = ref[q];
        n = c.name;
        newLayer = 0;
        if (c.name[0] === '_') {
          if (found(n, '_Alert')) {
            newLayer = genAlert(c, nP);
          }
          if (found(n, '_Banner')) {
            newLayer = genBanner(c, nP);
          }
          if (found(n, '_Button')) {
            newLayer = genButton(c, nP);
          }
          if (found(n, '_Field')) {
            newLayer = genField(c, nP);
          }
          if (found(n, '_Keyboard')) {
            newLayer = genKeyboard(c, nP);
          }
          if (found(n, '_NavBar')) {
            newLayer = genNavBar(c, nP);
          }
          if (found(n, '_Sheet')) {
            newLayer = genSheet(c, nP);
          }
          if (found(n, '_TabBar')) {
            newLayer = genTabBar(c, nP);
          }
          if (found(n, '_StatusBar')) {
            newLayer = new genStatusBar(c, nP);
          }
          if (found(n, '_Text')) {
            newLayer = genText(c, nP);
          }
          if (newLayer === void 0) {
            newLayer = genLayer(c, nP);
          }
        } else {
          newLayer = genLayer(c, nP);
        }
        newLayers[n] = newLayer;
        if (c.children) {
          children(c, newLayer);
        }
        results.push(c.destroy());
      }
      return results;
    };
    ios.l[b.name] = new Artboard(b);
    children(b, ios.l[b.name]);
    b.destroy();
    newArtboards.push(ios.l[b.name]);
    newLayers[b.name] = ios.l[b.name];
  }
  return newLayers;
};


},{"ios-kit":17}],6:[function(require,module,exports){
var ios;

ios = require('ios-kit');

exports.defaults = {
  name: 'field',
  active: false,
  keyboard: true,
  placeholder: "Enter text",
  placeholderColor: "#999",
  superLayer: void 0,
  backgroundColor: "white",
  borderColor: "#CCCCCC",
  borderRadius: ios.px(5),
  borderWidth: ios.px(1),
  height: ios.px(30),
  width: ios.px(97),
  fontSize: 17,
  color: 'black',
  textConstraints: {
    leading: 4,
    align: "vertical"
  },
  constraints: {
    height: 30,
    width: 97,
    align: "center"
  }
};

exports.defaults.props = Object.keys(exports.defaults);

exports.create = function(array) {
  var field, setup;
  setup = ios.utils.setupComponent(array, exports.defaults);
  field = new ios.View({
    name: setup.name,
    constraints: setup.constraints,
    backgroundColor: setup.backgroundColor,
    borderColor: setup.borderColor,
    borderRadius: setup.borderRadius,
    borderWidth: setup.borderWidth,
    height: setup.height,
    width: setup.width,
    clip: true,
    superLayer: setup.superLayer
  });
  field.text = new ios.Text({
    superLayer: field,
    name: ".text",
    constraints: setup.textConstraints,
    text: '',
    fontSize: 17,
    color: setup.color
  });
  field.text.placeholder = new ios.Text({
    superLayer: field,
    name: ".placeholder",
    constraints: setup.textConstraints,
    text: setup.placeholder,
    fontSize: 17,
    color: setup.placeholderColor
  });
  field.active = setup.active;
  field.type = 'field';
  field.on(Events.TouchEnd, function() {
    if (field.active !== true) {
      field.active = true;
      if (setup.keyboard === true && field.keyboard === void 0) {
        field.keyboard = new ios.Keyboard({
          output: field.text,
          hidden: true
        });
      }
      if (typeof setup.keyboard === 'object') {
        field.input(setup.keyboard);
        field.keyboard = setup.keyboard;
      }
      field.keyboard.call();
      field.text.cursor = new ios.View({
        superLayer: field,
        name: "cursor",
        backgroundColor: ios.color("blue"),
        constraints: {
          width: 2,
          height: setup.fontSize + 6,
          leading: 4,
          align: "vertical"
        }
      });
      if (field.text.html !== setup.placeholder) {
        field.text.cursor.constraints.leading = field.text;
        ios.layout.set(field.text.cursor);
      }
      field.listeningToField = Utils.interval(.1, function() {
        if (field.active === false) {
          clearInterval(field.interval);
          clearInterval(field.listeningToField);
          return field.text.cursor.destroy();
        }
      });
      field.interval = Utils.interval(.6, function() {
        if (field.active) {
          if (field.text.cursor.opacity) {
            return field.text.cursor.animate({
              properties: {
                opacity: 0
              },
              time: .5
            });
          } else {
            return field.text.cursor.animate({
              properties: {
                opacity: 1
              },
              time: .5
            });
          }
        }
      });
      return field.text.on("change:html", function() {
        this.cursor.constraints.leading = this;
        if (this.html === '') {
          this.placeholder.visible = true;
        } else {
          this.placeholder.visible = false;
        }
        if (this.html.indexOf(this.placeholder) !== -1) {
          this.html = this.html.replace(this.placeholder, '');
        }
        return ios.layout.set(this.cursor);
      });
    }
  });
  field.input = function(keyboard) {
    return keyboard.output(field);
  };
  return field;
};


},{"ios-kit":17}],7:[function(require,module,exports){
var arrayOfCodes, codeMap, device, ios, letters, numbers, symbols;

ios = require('ios-kit');

exports.defaults = {
  style: "light",
  shift: true,
  output: void 0,
  returnText: "return",
  state: "letters",
  hidden: false,
  returnColor: "blue",
  superLayer: void 0
};

device = {
  "iphone-5": {
    popUpChar: 40,
    popUpTop: 4,
    height: 215,
    lineHeight: 36,
    letterKey: {
      keyTop: 6,
      height: 39,
      width: 26.5,
      borderRadius: 5,
      fontSize: 22.5
    },
    specialKeyWidth: 38.5,
    specialKeyHeight: 38.5,
    space: 5,
    row1: {
      leading: 0,
      top: 0
    },
    row2: {
      leading: 19,
      top: 16
    },
    row3: {
      top: 16,
      leading: 51
    },
    area: {
      top: 11,
      leading: 3,
      trailing: 3,
      bottom: 4
    },
    returnWidth: 75,
    popUpOffset: {
      x: 4,
      y: 30
    }
  },
  "iphone-6s": {
    popUpChar: 40,
    popUpTop: 6,
    height: 218,
    lineHeight: 40,
    letterKey: {
      keyTop: 10,
      height: 42,
      width: 31.5,
      borderRadius: 5,
      fontSize: 23,
      top: 10
    },
    specialKeyWidth: 42,
    specialKeyHeight: 42,
    space: 6,
    row1: {
      leading: 0,
      top: 0
    },
    row2: {
      leading: 22,
      top: 12
    },
    row3: {
      top: 12,
      leading: 59
    },
    area: {
      top: 12,
      leading: 3,
      trailing: 3,
      bottom: 4
    },
    returnWidth: 87,
    popUpOffset: {
      x: 5,
      y: 32
    }
  },
  "iphone-6s-plus": {
    popUpChar: 38,
    popUpTop: 6,
    height: 226,
    lineHeight: 42,
    letterKey: {
      keyTop: 12,
      height: 45,
      width: 36,
      borderRadius: 5,
      fontSize: 24,
      top: 10
    },
    specialKeyWidth: 45,
    specialKeyHeight: 45,
    space: 5,
    row1: {
      leading: 0,
      top: 0
    },
    row2: {
      leading: 20,
      top: 11
    },
    row3: {
      top: 11,
      leading: 63
    },
    area: {
      top: 8,
      leading: 4,
      trailing: 4,
      bottom: 5
    },
    returnWidth: 97,
    popUpOffset: {
      x: 10,
      y: 38
    }
  },
  "ipad": {
    height: 313,
    lineHeight: 55,
    letterKey: {
      height: 55,
      width: 56,
      borderRadius: 5,
      fontSize: 23
    },
    specialKeyWidth: 56,
    specialKeyHeight: 55,
    space: 12,
    returnWidth: 106,
    row1: {
      leading: 0,
      top: 0
    },
    row2: {
      leading: 30,
      top: 9
    },
    row3: {
      leading: 68,
      top: 9
    },
    area: {
      top: 55,
      leading: 6,
      trailing: 6,
      bottom: 8
    }
  },
  "ipad-pro": {
    height: 378,
    lineHeight: 61,
    letterKey: {
      height: 61,
      width: 63,
      borderRadius: 5,
      fontSize: 23
    },
    space: 7,
    returnWidth: 120,
    specialKeyHeight: 61,
    specialKeyWidth: 93,
    row1: {
      leading: 111,
      top: 53
    },
    row2: {
      leading: 126,
      top: 7
    },
    row3: {
      leading: 161,
      top: 7
    },
    area: {
      top: 56,
      leading: 4,
      trailing: 4,
      bottom: 4
    }
  }
};

codeMap = {
  8: 'delete',
  9: 'tab',
  13: 'return',
  16: 'shift',
  20: 'caps',
  32: 'space',
  27: "dismiss",
  33: "!",
  34: "\"",
  35: "#",
  36: "$",
  37: "%",
  38: "&",
  39: "\'",
  40: "(",
  41: ")",
  42: "*",
  43: "+",
  44: ",",
  45: "-",
  47: "/",
  46: ".",
  48: "0",
  49: "!",
  50: "@",
  51: "#",
  52: "$",
  53: "%",
  54: "^",
  55: "&",
  56: "*",
  57: "(",
  48: ")",
  59: "_",
  60: "<",
  61: "=",
  62: ">",
  63: "?",
  64: "@",
  65: "A",
  66: "B",
  67: "C",
  68: "D",
  69: "E",
  70: "F",
  71: "G",
  72: "H",
  73: "I",
  74: "J",
  75: "K",
  76: "L",
  77: "M",
  78: "N",
  79: "O",
  80: "P",
  81: "Q",
  82: "R",
  83: "S",
  84: "T",
  85: "U",
  86: "V",
  87: "W",
  88: "X",
  89: "Y",
  90: "Z",
  91: 'cmd',
  219: "[",
  92: "\\",
  221: "]",
  94: "^",
  95: "_",
  96: "`",
  97: "a",
  98: "b",
  99: "c",
  100: "d",
  101: "e",
  102: "f",
  103: "g",
  104: "h",
  105: "i",
  106: "j",
  107: "k",
  108: "l",
  109: "m",
  110: "n",
  111: "o",
  112: "p",
  113: "q",
  114: "r",
  115: "s",
  116: "t",
  117: "u",
  118: "v",
  119: "w",
  120: "x",
  121: "y",
  122: "z",
  123: "{",
  124: "|",
  125: "}",
  126: "~",
  186: ":",
  187: "+",
  188: "<",
  190: ">",
  191: "?",
  189: "_",
  192: "~",
  219: "{",
  220: "\|",
  221: "}",
  222: "&rdquo;"
};

arrayOfCodes = Object.keys(codeMap);

letters = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"];

numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "/", ":", ";", "(", ")", "$", "&", "@", "\"", ".", ",", "?", "!", "′"];

symbols = ["[", "]", "{", "}", "#", "%", "^", "*", "+", "=", "_", "\\", "|", "~", "<", ">", "€", "£", "¥", "•"];

exports.defaults.props = Object.keys(exports.defaults);

exports.create = function(obj) {
  var Delete, Dismiss, Emoji, Icon, IconWithState, Key, Letter, Numbers, Return, Shift, Space, SpecialKey, Tab, board, capitalizeKeys, colors, handleKeyColor, popUp, setup, specs, style;
  setup = ios.utils.setupComponent(obj, exports.defaults);
  style = {
    light: {
      backgroundColor: "#D1D5DA",
      color: "#000",
      specialKeyBG: "#ACB3BD",
      keyBG: "#F7F7F7",
      shadowY: ios.px(1),
      shadowColor: "#898B8F",
      returnBG: ios.color(setup.returnColor)
    },
    dark: {
      backgroundColor: "rgba(0,0,0,.7)",
      color: "#FFF",
      specialKeyBG: "rgba(67,67,67,.8)",
      keyBG: "rgba(105,105,105,.8)",
      shadowY: ios.px(1),
      shadowColor: "rgba(0,0,0,.4)",
      returnBG: ios.color(setup.returnColor)
    }
  };
  specs = device[ios.device.name];
  colors = style[setup.style];
  device;
  board = new ios.View({
    name: "Keyboard",
    superLayer: setup.superLayer,
    backgroundColor: style[setup.style].backgroundColor,
    y: ios.device.height,
    constraints: {
      leading: 0,
      trailing: 0,
      bottom: -1 * specs.height,
      height: specs.height
    }
  });
  ios.utils.bgBlur(board);
  board.output = function(obj) {
    if (board.target) {
      if (board.target.type === 'field') {
        board.target.active = false;
      }
    }
    board.target = obj;
    if (board.target) {
      if (board.target.type === 'field') {
        return board.target.active = true;
      }
    }
  };
  board.hidden = setup.hidden;
  if (board.hidden === false) {
    board.constraints.bottom = 0;
    ios.layout.set(board);
  }
  board.call = function() {
    board.y = ios.device.height;
    board.constraints.bottom = 0;
    if (board.hidden) {
      board.hidden = false;
      ios.layout.animate({
        target: board,
        time: .5,
        curve: 'ease-in-out'
      });
    }
    return board.bringToFront();
  };
  board.dismiss = function() {
    board.constraints.bottom = -1 * ios.pt(board.height);
    board.hidden = true;
    board.target.active = false;
    return ios.layout.animate({
      target: board,
      time: .5,
      curve: 'ease-in-out'
    });
  };
  board["delete"] = function() {
    var isSpace, layer, text;
    layer = "";
    if (board.target) {
      if (board.target.type === 'field') {
        layer = board.target.text;
      } else {
        layer = board.target;
      }
      isSpace = layer.html.slice(layer.html.length - 5, +(layer.html.length - 1) + 1 || 9e9);
      if (isSpace !== 'nbsp;') {
        text = layer.html.slice(0, -1);
        return layer.html = text;
      } else {
        text = layer.html.slice(0, -6);
        return layer.html = text;
      }
    }
  };
  board.capsLock = function() {
    board.isCapsLock = true;
    board.isCapital = true;
    board.keys.shift.icon.toggle('off');
    handleKeyColor(board.keys.shift);
    if (ios.device.name === 'ipad-pro') {
      board.keys.shiftalt.icon.toggle('off');
      return handleKeyColor(board.keys.shiftalt);
    }
  };
  board.output(setup.output);
  board.keysArray = [];
  board.keys = {};
  board.isCapital = setup.shift;
  board.area = new ios.View({
    name: ".area",
    superLayer: board,
    constraints: specs.area,
    backgroundColor: "transparent"
  });
  Key = function(obj) {
    var key;
    key = new ios.View({
      name: ".keys." + obj.name,
      constraints: obj.constraints,
      superLayer: board.area,
      borderRadius: ios.px(specs.letterKey.borderRadius),
      shadowY: colors.shadowY,
      shadowColor: colors.shadowColor
    });
    key.style.fontFamily = "-apple-system, Helvetica, Arial, sans-serif";
    key.on(Events.TouchStart, function(event) {
      return event.preventDefault();
    });
    return key;
  };
  Letter = function(obj) {
    var key;
    key = new Key(obj);
    key.backgroundColor = colors.keyBG;
    key.html = obj.letter;
    key.color = colors.color;
    key.style.textAlign = "center";
    key.style.lineHeight = ios.px(specs.lineHeight) + "px";
    key.style.fontSize = ios.px(specs.letterKey.fontSize) + "px";
    key.value = obj.letter;
    if (key.value === "space") {
      key.value = "&nbsp;";
    }
    if (ios.isPad()) {
      key.down = function() {
        key.backgroundColor = colors.specialKeyBG;
        if (board.target) {
          return ios.utils.write(board.target, key.value);
        }
      };
      key.up = function() {
        key.backgroundColor = colors.keyBG;
        if (board.isCapital && board.isCapsLock !== true) {
          board.isCapital = false;
          capitalizeKeys();
          board.keys.shift.up();
          if (ios.isPad()) {
            return board.keys.shiftalt.up();
          }
        }
      };
      key.on(Events.TouchStart, function() {
        return key.down();
      });
      key.on(Events.TouchEnd, function() {
        return key.up();
      });
    } else {
      if (key.value !== '&nbsp;') {
        key.down = function() {
          board.popUp.visible = true;
          board.bringToFront();
          board.popUp.bringToFront();
          board.popUp.midX = key.midX;
          board.popUp.maxY = key.maxY;
          board.popUp.text.html = key.value;
          if (board.target) {
            return ios.utils.write(board.target, key.value);
          }
        };
        key.up = function() {
          board.popUp.visible = false;
          if (board.isCapital && board.capsLock !== true) {
            board.isCapital = false;
            capitalizeKeys();
            return board.keys.shift.up();
          }
        };
        key.on(Events.TouchStart, function() {
          return key.down();
        });
        key.on(Events.TouchEnd, function() {
          return key.up();
        });
      } else {
        key.down = function() {
          key.backgroundColor = colors.specialKeyBG;
          if (board.target) {
            return ios.utils.write(board.target, key.value);
          }
        };
        key.up = function() {
          return key.backgroundColor = colors.keyBG;
        };
        key.on(Events.TouchStart, function() {
          return key.down();
        });
        key.on(Events.TouchEnd, function() {
          return key.up();
        });
      }
    }
    return key;
  };
  SpecialKey = function(obj) {
    var key;
    key = new Key(obj);
    key.backgroundColor = colors.specialKeyBG;
    key.color = colors.color;
    key.style.textAlign = "center";
    if (ios.device.name === 'ipad-pro') {
      key.style.fontSize = ios.px(18) + "px";
    } else {
      key.style.fontSize = ios.px(16) + "px";
    }
    return key;
  };
  Icon = function(obj) {
    var icon;
    icon = new ios.View({
      name: 'icon',
      backgroundColor: "transparent",
      superLayer: obj.superLayer,
      constraints: {
        align: 'center'
      }
    });
    icon.props = {
      height: obj.icon.height,
      width: obj.icon.width,
      html: obj.icon.svg
    };
    ios.utils.changeFill(icon, colors.color);
    return icon;
  };
  IconWithState = function(obj) {
    var icon;
    icon = new ios.View({
      name: 'icon',
      backgroundColor: "transparent",
      superLayer: obj.superLayer,
      constraints: {
        align: 'center'
      }
    });
    icon.toggle = function(state) {
      if (state === void 0) {
        if (icon.state === 'on') {
          state = 'off';
        } else {
          state = 'on';
        }
      }
      if (state === "on") {
        if (ios.device.name !== 'ipad-pro') {
          icon.html = obj.on.svg;
          icon.width = obj.on.width;
          icon.height = obj.on.height;
        }
        icon.state = 'on';
      } else {
        if (ios.device.name !== 'ipad-pro') {
          icon.html = obj.off.svg;
          icon.width = obj.on.width;
          icon.height = obj.on.height;
        }
        icon.state = 'off';
      }
      return ios.utils.changeFill(icon, colors.color);
    };
    if (obj.state) {
      icon.toggle('on');
    } else {
      icon.toggle('off');
    }
    return icon;
  };
  capitalizeKeys = function() {
    var j, key, len, ref, results;
    ref = board.keysArray;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      key = ref[j];
      if (board.isCapital) {
        if (key.html.length === 1 && key.html.match(/[a-z]/i)) {
          key.html = key.html.toUpperCase();
          key.value = key.html;
        }
        if (key.alt) {
          key.alt.destroy();
          key.alt = void 0;
        }
        if (key.height > ios.px(46)) {
          key.style.lineHeight = ios.px(specs.letterKey.height) + 'px';
          key.style.fontSize = ios.px(23) + 'px';
        } else {
          if (ios.device.name === 'ipad-pro') {
            key.style.lineHeight = ios.px(46) + 'px';
          } else {
            key.style.lineHeight = ios.px(specs.lineHeight) + 'px';
          }
          key.style.fontSize = ios.px(20) + 'px';
        }
        results.push(key.value = key.html);
      } else {
        if (key.html.length === 1 && key.html.match(/[a-z]/i)) {
          key.html = key.html.toLowerCase();
          results.push(key.value = key.html);
        } else {
          if (key.alt === void 0) {
            key.alt = new ios.Text({
              text: "",
              superLayer: key,
              color: colors.color,
              constraints: {
                align: "horizontal",
                bottom: 4
              },
              fontSize: specs.letterKey.fontSize
            });
            if (board.topRow) {
              if (board.topRow.indexOf(key) !== -1) {
                key.style.lineHeight = ios.px(23) + 'px';
                key.style.fontSize = ios.px(16) + 'px';
                key.alt.style.fontSize = ios.px(16) + 'px';
              } else {
                key.style.lineHeight = ios.px(36) + 'px';
                key.style.fontSize = ios.px(20) + 'px';
                key.alt.style.fontSize = ios.px(20) + 'px';
                key.alt.constraints.bottom = 8;
              }
            }
            switch (key.value) {
              case "&lt;":
                key.alt.html = ".";
                break;
              case "&gt;":
                key.alt.html = ",";
                break;
              case "<":
                key.alt.html = ".";
                break;
              case ">":
                key.alt.html = ",";
                break;
              case "?":
                key.alt.html = ".";
                break;
              case "{":
                key.alt.html = "[";
                break;
              case "}":
                key.alt.html = "}";
                break;
              case "\|":
                key.alt.html = "\\";
                break;
              case "~":
                key.alt.html = "`";
                break;
              case "!":
                key.alt.html = ".";
                break;
              case "@":
                key.alt.html = "2";
                break;
              case "#":
                key.alt.html = "3";
                break;
              case "$":
                key.alt.html = "4";
                break;
              case "%":
                key.alt.html = "5";
                break;
              case "^":
                key.alt.html = "6";
                break;
              case "&amp;":
                key.alt.html = "7";
                break;
              case "&":
                key.alt.html = "7";
                break;
              case "*":
                key.alt.html = "8";
                break;
              case "(":
                key.alt.html = "9";
                break;
              case ")":
                key.alt.html = "0";
                break;
              case "_":
                key.alt.html = "-";
                break;
              case "+":
                key.alt.html = "=";
                break;
              default:
                key.alt.html = "&prime;";
            }
            ios.layout.set(key.alt);
            if (ios.device.name === 'ipad-pro' && key.value === '!') {
              key.alt.html = '1';
            }
            if (ios.device.name === 'ipad-pro' && key.value === '?') {
              key.alt.html = '/';
            }
            if (ios.device.name === 'ipad-pro' && key.value === ':') {
              key.alt.html = ';';
            }
            if (ios.device.name === 'ipad-pro' && key.value === '&rdquo;') {
              key.alt.html = '&prime;';
            }
            results.push(key.value = key.alt.html);
          } else {
            results.push(void 0);
          }
        }
      }
    }
    return results;
  };
  handleKeyColor = function(key) {
    if (ios.isPhone) {
      if (key.icon.state === 'on') {
        return key.backgroundColor = colors.keyBG;
      } else {
        return key.backgroundColor = colors.specialKeyBG;
      }
    }
  };
  Space = function(obj) {
    var key;
    key = new Letter(obj);
    key.html = 'space';
    key.backgroundColor = colors.keyBG;
    key.style.lineHeight = ios.px(specs.specialKeyHeight) + "px";
    key.style.fontSize = ios.px(16) + 'px';
    return key;
  };
  Shift = function(obj) {
    var key;
    key = new SpecialKey(obj);
    key.icon = new IconWithState({
      superLayer: key,
      state: obj.shift,
      on: ios.utils.svg(ios.assets.shift.on),
      off: ios.utils.svg(ios.assets.shift.off)
    });
    handleKeyColor(key);
    key.on(Events.TouchEnd, function() {
      this.icon.toggle();
      handleKeyColor(key);
      if (this.icon.state === 'on') {
        board.isCapital = true;
      } else {
        board.isCapital = false;
      }
      return capitalizeKeys();
    });
    key.down = function() {
      key.icon.toggle('on');
      handleKeyColor(key);
      board.isCapital = true;
      return capitalizeKeys();
    };
    key.up = function() {
      key.icon.toggle('off');
      handleKeyColor(key);
      board.isCapital = false;
      return capitalizeKeys();
    };
    ios.layout.set(key.icon);
    if (ios.isPad()) {
      key.on(Events.TouchEnd, function() {
        if (this.icon.state === 'on') {
          board.keys.shift.icon.toggle('on');
          board.keys.shiftalt.icon.toggle('on');
        } else {
          board.keys.shift.icon.toggle('off');
          board.keys.shiftalt.icon.toggle('off');
        }
        handleKeyColor(board.keys.shift);
        return handleKeyColor(board.keys.shiftalt);
      });
    }
    return key;
  };
  Delete = function(obj) {
    var key;
    key = new SpecialKey(obj);
    key.icon = new IconWithState({
      superLayer: key,
      on: ios.utils.svg(ios.assets["delete"].on),
      off: ios.utils.svg(ios.assets["delete"].off)
    });
    key.fire = function() {
      return board["delete"]();
    };
    key.down = function() {
      key.icon.toggle('on');
      handleKeyColor(key);
      return key.fire();
    };
    key.up = function() {
      key.icon.toggle('off');
      return handleKeyColor(key);
    };
    key.on(Events.TouchStart, function() {
      return key.down();
    });
    key.on(Events.TouchEnd, function() {
      return key.up();
    });
    return key;
  };
  Numbers = function(obj) {
    var key;
    key = new SpecialKey(obj);
    if (ios.isPhone()) {
      key.html = '123';
    } else {
      key.html = '.?123';
    }
    key.style.lineHeight = ios.px(specs.specialKeyHeight) + "px";
    return key;
  };
  Emoji = function(obj) {
    var key;
    key = new SpecialKey(obj);
    key.icon = new Icon({
      superLayer: key,
      icon: ios.utils.svg(ios.assets.emoji)
    });
    return key;
  };
  Return = function(obj) {
    var key;
    key = new SpecialKey(obj);
    key.backgroundColor = colors.returnBG;
    key.html = setup.returnText;
    key.style.lineHeight = ios.px(specs.specialKeyHeight) + "px";
    key.color = ios.utils.autoColor(colors.returnBG);
    key.down = function() {
      var nothingHappens;
      return nothingHappens = true;
    };
    key.up = function() {
      board.dismiss();
      if (board.target) {
        if (board.target.parent) {
          return board.target.parent.active = false;
        }
      }
    };
    key.on(Events.TouchEnd, function() {
      return key.down();
    });
    key.on(Events.TouchStart, function() {
      return key.up();
    });
    return key;
  };
  Dismiss = function(obj) {
    var key;
    key = new SpecialKey(obj);
    key.icon = new Icon({
      superLayer: key,
      icon: ios.utils.svg(ios.assets.keyboard)
    });
    key.icon.scale = .8;
    key.icon.constraints = {
      bottom: 12,
      trailing: 12
    };
    ios.layout.set(key.icon);
    key.down = function() {
      return board.dismiss();
    };
    key.up = function() {
      var nothingHappens;
      return nothingHappens = false;
    };
    key.on(Events.TouchEnd, function() {
      return key.down();
    });
    return key;
  };
  Tab = function(obj) {
    var key;
    key = new SpecialKey(obj);
    key.html = 'tab';
    key.style.lineHeight = ios.px(70) + 'px';
    key.style.textAlign = 'left';
    key.style.paddingLeft = ios.px(12) + 'px';
    return key;
  };
  board.switchLetters = function() {
    var i, j, k, key, l, len, len1, row1Break, row2Break, topKey, topLetters;
    row1Break = 10;
    row2Break = 19;
    if (ios.isPad()) {
      letters.push('!');
      letters.push('?');
    }
    if (ios.device.name === "ipad-pro") {
      letters = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "{", "}", "\|", "a", "s", "d", "f", "g", "h", "j", "k", "l", ":", "&rdquo;", "z", "x", "c", "v", "b", "n", "m", "<", ">", "?"];
      topLetters = ["~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+"];
      row1Break = 13;
      row2Break = 24;
    }
    for (i = j = 0, len = letters.length; j < len; i = ++j) {
      l = letters[i];
      key = new Letter({
        name: l,
        constraints: {
          height: specs.letterKey.height,
          width: specs.letterKey.width
        },
        letter: l
      });
      if (l === 'w' || l === 'r' || l === 'y' || l === 'i' || l === 'p') {
        key.constraints.width = key.constraints.width + 1;
      }
      board.keys[l] = key;
      board.keysArray.push(key);
      if (i === 0) {
        key.constraints.leading = specs.row1.leading;
        key.constraints.top = specs.row1.top;
      }
      if (i > 0 && i < row1Break) {
        key.constraints.leading = [board.keysArray[i - 1], specs.space];
        key.constraints.top = specs.row1.top;
      }
      if (i === row1Break) {
        key.constraints.leading = specs.row2.leading;
        key.constraints.top = [board.keysArray[0], specs.row2.top];
      }
      if (i > row1Break && i < row2Break) {
        key.constraints.leading = [board.keysArray[i - 1], specs.space];
        key.constraints.top = [board.keysArray[0], specs.row2.top];
      }
      if (i === row2Break) {
        key.constraints.leading = specs.row3.leading;
        key.constraints.top = [board.keysArray[row1Break], specs.row3.top];
      }
      if (i > row2Break) {
        key.constraints.leading = [board.keysArray[i - 1], specs.space];
        key.constraints.top = [board.keysArray[row1Break], specs.row3.top];
      }
      ios.layout.set(key);
    }
    board.keys.shift = new Shift({
      name: "shift",
      shift: setup.shift,
      constraints: {
        height: specs.specialKeyHeight,
        width: specs.specialKeyWidth,
        bottomEdges: board.keys.z
      }
    });
    board.keys["delete"] = new Delete({
      name: "delete",
      constraints: {
        height: specs.specialKeyHeight,
        width: specs.specialKeyWidth,
        bottomEdges: board.keys.z,
        trailing: 0
      }
    });
    board.keys.numbers = new Numbers({
      name: "numbers",
      constraints: {
        height: specs.specialKeyHeight,
        width: specs.specialKeyWidth,
        bottom: 0,
        leading: 0
      }
    });
    board.keys.emoji = new Emoji({
      name: "emoji",
      constraints: {
        height: specs.specialKeyHeight,
        width: specs.specialKeyWidth,
        leading: [board.keys.numbers, specs.space],
        bottom: 0
      }
    });
    board.keys["return"] = new Return({
      name: "return",
      constraints: {
        bottom: 0,
        trailing: 0,
        width: specs.returnWidth,
        height: specs.specialKeyHeight
      }
    });
    board.keys.space = new Space({
      name: "space",
      letter: "space",
      constraints: {
        leading: [board.keys.emoji, specs.space],
        trailing: [board.keys["return"], specs.space],
        bottom: 0,
        height: specs.specialKeyHeight
      }
    });
    if (ios.isPad()) {
      board.keys["return"].constraints.bottom = void 0;
      board.keys["return"].constraints.bottomEdges = board.keysArray[row1Break];
      board.keys["delete"].constraints.top = 0;
      board.keys["delete"].constraints.bottomEdges = void 0;
      board.keys["delete"].constraints.width = 61;
      board.keys.shiftalt = new Shift({
        name: "shiftalt",
        shift: setup.shift,
        constraints: {
          height: specs.specialKeyHeight,
          width: 76,
          bottomEdges: board.keys.z,
          trailing: 0
        }
      });
      board.keys.dismiss = new Dismiss({
        name: "dismiss",
        constraints: {
          height: specs.specialKeyHeight,
          width: specs.specialKeyWidth,
          bottom: 0,
          trailing: 0
        }
      });
      board.keys.numbersalt = new Numbers({
        name: "numbersalt",
        constraints: {
          height: specs.specialKeyHeight,
          width: 93,
          bottom: 0,
          trailing: [board.keys.dismiss, specs.space]
        }
      });
      board.keys.space.html = "";
      board.keys.space.constraints.trailing = [board.keys.numbersalt, specs.space];
      ios.layout.set();
    }
    board.topRow = [];
    if (ios.device.name === 'ipad-pro') {
      for (i = k = 0, len1 = topLetters.length; k < len1; i = ++k) {
        l = topLetters[i];
        topKey = new Letter({
          letter: l,
          name: l,
          constraints: {
            height: 46,
            width: 63,
            top: 0
          }
        });
        if (i === 0) {
          topKey.constraints.leading = 0;
        } else {
          topKey.constraints.leading = [board.topRow[i - 1], specs.space];
        }
        topKey.style.lineHeight = ios.px(46) + 'px';
        ios.layout.set(topKey);
        board.topRow.push(topKey);
        board.keysArray.push(topKey);
        board.keys[l] = topKey;
      }
      board.keys["delete"].icon.destroy();
      board.keys["delete"].html = 'delete';
      board.keys["delete"].style.lineHeight = ios.px(53) + 'px';
      board.keys["delete"].style.textAlign = 'right';
      board.keys["delete"].style.paddingRight = ios.px(12) + 'px';
      board.keys["delete"].constraints = {
        top: 0,
        trailing: 0,
        height: 46,
        width: 106
      };
      board.keys.shift.icon.destroy();
      board.keys.shift.html = 'shift';
      board.keys.shift.style.lineHeight = ios.px(70) + 'px';
      board.keys.shift.style.textAlign = 'left';
      board.keys.shift.style.paddingLeft = ios.px(12) + 'px';
      board.keys.shift.constraints.width = 154;
      board.keys.shiftalt.icon.destroy();
      board.keys.shiftalt.html = 'shift';
      board.keys.shiftalt.style.lineHeight = ios.px(70) + 'px';
      board.keys.shiftalt.style.textAlign = 'right';
      board.keys.shiftalt.style.paddingRight = ios.px(12) + 'px';
      board.keys.shiftalt.constraints.width = 155;
      board.keys.emoji.icon.constraints = {
        leading: 15,
        bottom: 11
      };
      board.keys.emoji.constraints = {
        width: 144,
        height: 61,
        leading: 0,
        bottom: 0
      };
      ios.layout.set();
      board.keys.numbersalt.constraints.width = 93;
      board.keys.dismiss.constraints.width = 93;
      board.keys.com = new Letter({
        name: '.com',
        letter: '.com',
        constraints: {
          height: specs.letterKey.height,
          width: specs.letterKey.width,
          bottom: 0,
          trailing: [board.keys.numbersalt, specs.space]
        }
      });
      board.keys.com.style.fontSize = ios.px(16) + 'px';
      board.keys.numbers.constraints = {
        width: 143,
        height: 61,
        leading: [board.keys.emoji, specs.space]
      };
      board.keys.numbers.style.lineHeight = ios.px(70) + 'px';
      board.keys.numbers.style.textAlign = 'left';
      board.keys.numbers.style.paddingLeft = ios.px(12) + 'px';
      board.keys["return"].style.lineHeight = ios.px(70) + 'px';
      board.keys["return"].style.textAlign = 'right';
      board.keys["return"].style.paddingRight = ios.px(12) + 'px';
      board.keys.space.constraints.leading = [board.keys.numbers, specs.space];
      board.keys.space.constraints.trailing = [board.keys.com, specs.space];
      board.keys.caps = new Shift({
        name: 'caps',
        caps: true,
        constraints: {
          height: specs.specialKeyHeight,
          width: 119,
          bottomEdges: board.keysArray[row1Break]
        }
      });
      board.keys.caps.icon.destroy();
      board.keys.caps.html = 'caps lock';
      board.keys.caps.style.lineHeight = ios.px(70) + 'px';
      board.keys.caps.style.textAlign = 'left';
      board.keys.caps.style.paddingLeft = ios.px(12) + 'px';
      board.keys.caps.down = function() {
        if (board.isCapsLock) {
          return board.isCapsLock = false;
        } else {
          return board.capsLock();
        }
      };
      board.keys.caps.on(Events.TouchEnd, function() {
        return board.keys.caps.down();
      });
      board.keys.caps.up = function() {
        var nothingHappens;
        return nothingHappens = true;
      };
      board.keys.tab = new Tab({
        name: 'tab',
        constraints: {
          height: specs.specialKeyHeight,
          width: 106,
          bottomEdges: board.keysArray[0]
        }
      });
      return ios.layout.set();
    }
  };
  if (ios.isPhone()) {
    popUp = ios.utils.svg(ios.assets.keyPopUp[setup.style][ios.device.name]);
    board.popUp = new Layer({
      height: popUp.height,
      width: popUp.width,
      backgroundColor: 'transparent',
      name: '.popUp',
      superLayer: board.area,
      visible: false
    });
    board.popUp.svg = new Layer({
      html: popUp.svg,
      height: popUp.height,
      width: popUp.width,
      superLayer: board.popUp,
      name: '.svg',
      backgroundColor: 'transparent'
    });
    board.popUp.text = new ios.Text({
      text: 'A',
      superLayer: board.popUp,
      fontSize: specs.popUpChar,
      fontWeight: 300,
      color: colors.color,
      textAlign: 'center',
      constraints: {
        align: 'horizontal',
        top: specs.popUpTop,
        width: ios.pt(popUp.width)
      }
    });
    board.popUp.center();
    switch (ios.device.name) {
      case 'iphone-6s-plus':
        board.popUp.width = board.popUp.width - 18;
        board.popUp.height = board.popUp.height - 24;
        board.popUp.svg.x = ios.px(-3);
        board.popUp.svg.y = ios.px(-3);
        break;
      case 'iphone-6s':
        board.popUp.width = board.popUp.width - 12;
        board.popUp.height = board.popUp.height - 12;
        board.popUp.svg.x = ios.px(-3);
        board.popUp.svg.y = ios.px(-2);
        break;
      case 'iphone-5':
        board.popUp.width = board.popUp.width - 12;
        board.popUp.height = board.popUp.height - 12;
        board.popUp.svg.x = ios.px(-3);
        board.popUp.svg.y = ios.px(-2);
    }
    capitalizeKeys();
  }
  board["switch"] = function(state) {
    switch (state) {
      case "letters":
        return board.switchLetters();
    }
  };
  board["switch"]("letters");
  document.addEventListener('keydown', function(e) {
    var key;
    if (arrayOfCodes.indexOf(e.keyCode.toString()) !== -1) {
      key = board.keys[codeMap[e.keyCode].toLowerCase()];
      if (key) {
        key.down();
      }
      if (ios.isPad()) {
        if (key === board.keys.shift || key === board.keys.shiftalt) {
          board.keys.shift.down();
          board.keys.shiftalt.icon.toggle('on');
          return handleKeyColor(board.keys.shiftalt);
        }
      }
    }
  });
  document.addEventListener('keyup', function(e) {
    var key;
    if (arrayOfCodes.indexOf(e.keyCode.toString()) !== -1) {
      key = board.keys[codeMap[e.keyCode].toLowerCase()];
      if (key) {
        key.up();
      }
      if (ios.isPad()) {
        if (key === board.keys.shift || key === board.keys.shiftalt) {
          board.keys.shift.up();
          board.keys.shiftalt.icon.toggle('off');
          return handleKeyColor(board.keys.shiftalt);
        }
      }
    }
  });
  capitalizeKeys();
  return board;
};


},{"ios-kit":17}],8:[function(require,module,exports){
var ios, layout;

ios = require('ios-kit');

exports.defaults = {
  animations: {
    target: void 0,
    constraints: void 0,
    curve: "ease-in-out",
    curveOptions: void 0,
    time: 1,
    delay: 0,
    repeat: void 0,
    colorModel: void 0,
    stagger: void 0,
    fadeOut: false,
    fadeIn: false
  }
};

layout = function(array) {
  var blueprint, i, index, j, k, l, layer, len, len1, len2, newConstraint, props, ref, ref1, setup, targetLayers;
  setup = {};
  targetLayers = [];
  blueprint = [];
  if (array) {
    ref = Object.keys(exports.defaults.animations);
    for (j = 0, len = ref.length; j < len; j++) {
      i = ref[j];
      if (array[i]) {
        setup[i] = array[i];
      } else {
        setup[i] = exports.defaults.animations[i];
      }
    }
  }
  if (setup.target) {
    if (setup.target.length) {
      targetLayers = setup.target;
    } else {
      targetLayers.push(setup.target);
    }
  } else {
    targetLayers = Framer.CurrentContext.layers;
  }
  if (setup.target) {
    if (setup.constraints) {
      ref1 = Object.keys(setup.constraints);
      for (k = 0, len1 = ref1.length; k < len1; k++) {
        newConstraint = ref1[k];
        setup.target.constraints[newConstraint] = setup.constraints[newConstraint];
      }
    }
  }
  for (index = l = 0, len2 = targetLayers.length; l < len2; index = ++l) {
    layer = targetLayers[index];
    layer.calculatedPosition = {};
    if (layer.constraints) {
      props = {};
      layer.superFrame = {};
      if (layer.superLayer) {
        layer.superFrame.height = layer.superLayer.height;
        layer.superFrame.width = layer.superLayer.width;
      } else {
        layer.superFrame.height = ios.device.height;
        layer.superFrame.width = ios.device.width;
      }
      if (layer.constraints.leading !== void 0 && layer.constraints.trailing !== void 0) {
        layer.constraints.autoWidth = {};
      }
      if (layer.constraints.top !== void 0 && layer.constraints.bottom !== void 0) {
        layer.constraints.autoHeight = {};
      }
      if (layer.constraints.width !== void 0) {
        props.width = ios.utils.px(layer.constraints.width);
      } else {
        props.width = layer.width;
      }
      if (layer.constraints.height !== void 0) {
        props.height = ios.utils.px(layer.constraints.height);
      } else {
        props.height = layer.height;
      }
      if (layer.constraints.leading !== void 0) {
        if (layer.constraints.leading === parseInt(layer.constraints.leading, 10)) {
          props.x = ios.utils.px(layer.constraints.leading);
        } else {
          if (layer.constraints.leading.length === void 0) {
            props.x = layer.constraints.leading.calculatedPosition.x + layer.constraints.leading.calculatedPosition.width;
          } else {
            props.x = layer.constraints.leading[0].calculatedPosition.x + layer.constraints.leading[0].calculatedPosition.width + ios.utils.px(layer.constraints.leading[1]);
          }
        }
      }
      if (layer.constraints.autoWidth !== void 0) {
        layer.constraints.autoWidth.startX = props.x;
      }
      if (layer.constraints.trailing !== void 0) {
        if (layer.constraints.trailing === parseInt(layer.constraints.trailing, 10)) {
          props.x = layer.superFrame.width - ios.utils.px(layer.constraints.trailing) - props.width;
        } else {
          if (layer.constraints.trailing.length === void 0) {
            props.x = layer.constraints.trailing.calculatedPosition.x - props.width;
          } else {
            props.x = layer.constraints.trailing[0].calculatedPosition.x - ios.utils.px(layer.constraints.trailing[1]) - props.width;
          }
        }
      }
      if (layer.constraints.autoWidth !== void 0) {
        layer.constraints.autoWidth.calculatedPositionX = props.x;
        props.x = layer.constraints.autoWidth.startX;
        props.width = layer.constraints.autoWidth.calculatedPositionX - layer.constraints.autoWidth.startX + props.width;
      }
      if (layer.constraints.top !== void 0) {
        if (layer.constraints.top === parseInt(layer.constraints.top, 10)) {
          props.y = ios.utils.px(layer.constraints.top);
        } else {
          if (layer.constraints.top.length === void 0) {
            props.y = layer.constraints.top.calculatedPosition.y + layer.constraints.top.calculatedPosition.height;
          } else {
            props.y = layer.constraints.top[0].calculatedPosition.y + layer.constraints.top[0].calculatedPosition.height + ios.utils.px(layer.constraints.top[1]);
          }
        }
      }
      if (layer.constraints.autoHeight !== void 0) {
        layer.constraints.autoHeight.startY = props.y;
      }
      if (layer.constraints.bottom !== void 0) {
        if (layer.constraints.bottom === parseInt(layer.constraints.bottom, 10)) {
          props.y = layer.superFrame.height - ios.utils.px(layer.constraints.bottom) - props.height;
        } else {
          if (layer.constraints.bottom.length === void 0) {
            props.y = layer.constraints.bottom.calculatedPosition.y - props.height;
          } else {
            props.y = layer.constraints.bottom[0].calculatedPosition.y - ios.utils.px(layer.constraints.bottom[1]) - props.height;
          }
        }
      }
      if (layer.constraints.autoHeight !== void 0) {
        layer.constraints.autoHeight.calculatedPositionY = props.y;
        props.height = layer.constraints.autoHeight.calculatedPositionY - layer.constraints.autoHeight.startY + props.height;
        props.y = layer.constraints.autoHeight.startY;
      }
      if (layer.constraints.align !== void 0) {
        if (layer.constraints.align === "horizontal") {
          props.x = layer.superFrame.width / 2 - props.width / 2;
        }
        if (layer.constraints.align === "vertical") {
          props.y = layer.superFrame.height / 2 - props.height / 2;
        }
        if (layer.constraints.align === "center") {
          props.x = layer.superFrame.width / 2 - props.width / 2;
          props.y = layer.superFrame.height / 2 - props.height / 2;
        }
      }
      if (layer.constraints.horizontalCenter !== void 0) {
        props.x = layer.constraints.horizontalCenter.calculatedPosition.x + (layer.constraints.horizontalCenter.calculatedPosition.width - props.width) / 2;
      }
      if (layer.constraints.verticalCenter !== void 0) {
        props.y = layer.constraints.verticalCenter.calculatedPosition.y + (layer.constraints.verticalCenter.calculatedPosition.height - props.height) / 2;
      }
      if (layer.constraints.center !== void 0) {
        props.x = layer.constraints.center.calculatedPosition.x + (layer.constraints.center.calculatedPosition.width - props.width) / 2;
        props.y = layer.constraints.center.calculatedPosition.y + (layer.constraints.center.calculatedPosition.height - props.height) / 2;
      }
      if (layer.constraints.leadingEdges !== void 0) {
        props.x = layer.constraints.leadingEdges.calculatedPosition.x;
      }
      if (layer.constraints.trailingEdges !== void 0) {
        props.x = layer.constraints.trailingEdges.calculatedPosition.x - props.width + layer.constraints.trailingEdges.calculatedPosition.width;
      }
      if (layer.constraints.topEdges !== void 0) {
        props.y = layer.constraints.topEdges.calculatedPosition.y;
      }
      if (layer.constraints.bottomEdges !== void 0) {
        props.y = layer.constraints.bottomEdges.calculatedPosition.y - props.height + layer.constraints.bottomEdges.calculatedPosition.height;
      }
      layer.calculatedPosition = props;
    } else {
      layer.calculatedPosition = layer.props;
    }
    blueprint.push(layer);
  }
  return blueprint;
};

exports.set = function(array) {
  var blueprint, i, index, j, k, key, layer, len, len1, props, ref, results, setup;
  setup = {};
  props = {};
  if (array) {
    ref = Object.keys(exports.defaults.animations);
    for (j = 0, len = ref.length; j < len; j++) {
      i = ref[j];
      if (array[i]) {
        setup[i] = array[i];
      } else {
        setup[i] = exports.defaults.animations[i];
      }
    }
  }
  blueprint = layout(array);
  results = [];
  for (index = k = 0, len1 = blueprint.length; k < len1; index = ++k) {
    layer = blueprint[index];
    results.push((function() {
      var l, len2, ref1, results1;
      ref1 = Object.keys(layer.calculatedPosition);
      results1 = [];
      for (l = 0, len2 = ref1.length; l < len2; l++) {
        key = ref1[l];
        results1.push(layer[key] = layer.calculatedPosition[key]);
      }
      return results1;
    })());
  }
  return results;
};

exports.animate = function(array) {
  var blueprint, delay, i, index, j, k, layer, len, len1, props, ref, results, setup, stag;
  setup = {};
  props = {};
  if (array) {
    ref = Object.keys(exports.defaults.animations);
    for (j = 0, len = ref.length; j < len; j++) {
      i = ref[j];
      if (array[i]) {
        setup[i] = array[i];
      } else {
        setup[i] = exports.defaults.animations[i];
      }
    }
  }
  blueprint = layout(array);
  results = [];
  for (index = k = 0, len1 = blueprint.length; k < len1; index = ++k) {
    layer = blueprint[index];
    delay = setup.delay;
    if (setup.stagger) {
      stag = setup.stagger;
      delay = (index * stag) + delay;
    }
    if (setup.fadeOut) {
      if (layer === setup.fadeOut) {
        layer.calculatedPosition.opacity = 0;
      }
    }
    if (setup.fadeIn) {
      layer.calculatedPosition.opacity = 1;
    }
    layer.animate({
      properties: layer.calculatedPosition,
      time: setup.time,
      delay: delay,
      curve: setup.curve,
      repeat: setup.repeat,
      colorModel: setup.colorModel,
      curveOptions: setup.curveOptions
    });
    results.push(layer.calculatedPosition = props);
  }
  return results;
};


},{"ios-kit":17}],9:[function(require,module,exports){
var ios, layer;

ios = require("ios-kit");

layer = new Layer;

exports.layerProps = Object.keys(layer.props);

exports.layerProps.push("superLayer");

exports.layerProps.push("constraints");

exports.layerStyles = Object.keys(layer.style);

layer.destroy();

exports.assets = {
  sheetTip: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='27px' height='13px' viewBox='0 0 27 13' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 39.1 (31720) - http://www.bohemiancoding.com/sketch --> <title>Triangle</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='iOS-Kit' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Navigation-Bar-Copy' transform='translate(-2634.000000, -124.000000)' fill='#FFFFFF'> <path d='M2644.71916,125.883834 C2646.25498,124.291136 2648.74585,124.291992 2650.28084,125.883834 L2661,137 L2634,137 L2644.71916,125.883834 Z' id='Triangle'></path> </g> </g> </svg>",
  bluetooth: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='7px' height='13px' viewBox='0 0 8 15' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.6.1 (26313) - http://www.bohemiancoding.com/sketch --> <title>Bluetooth</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Status-Icons-(White)' transform='translate(-137.000000, 0.000000)' fill='#FFF'> <path d='M140.5,14.5 L145,10.25 L141.8,7.5 L145,4.75 L140.5,0.5 L140.5,6.07142857 L137.8,3.75 L137,4.5 L140.258333,7.375 L137,10.25 L137.8,11 L140.5,8.67857143 L140.5,14.5 Z M141.5,3 L143.366667,4.75 L141.5,6.25 L141.5,3 Z M141.5,8.5 L143.366667,10.25 L141.5,12 L141.5,8.5 Z' id='Bluetooth'></path> </g> </svg>",
  batteryHigh: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='25px' height='10px' viewBox='0 0 25 10' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.7.2 (28276) - http://www.bohemiancoding.com/sketch --> <title>Battery</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Symbols' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Status-Bar/Black/100%' transform='translate(-345.000000, -5.000000)' fill='#030303'> <path d='M346.493713,5.5 C345.668758,5.5 345,6.16802155 345,7.00530324 L345,13.4946968 C345,14.3260528 345.67338,15 346.493713,15 L366.006287,15 C366.831242,15 367.5,14.3319784 367.5,13.4946968 L367.5,7.00530324 C367.5,6.17394722 366.82662,5.5 366.006287,5.5 L346.493713,5.5 Z M368,8.5 L368,12 L368.75,12 C369.164214,12 369.5,11.6644053 369.5,11.25774 L369.5,9.24225998 C369.5,8.83232111 369.167101,8.5 368.75,8.5 L368,8.5 Z M346.508152,6 C345.951365,6 345.5,6.45699692 345.5,7.00844055 L345.5,13.4915594 C345.5,14.0485058 345.949058,14.5 346.508152,14.5 L365.991848,14.5 C366.548635,14.5 367,14.0430031 367,13.4915594 L367,7.00844055 C367,6.45149422 366.550942,6 365.991848,6 L346.508152,6 Z M346.506744,6.5 C346.226877,6.5 346,6.71637201 346,6.99209595 L346,13.5079041 C346,13.7796811 346.230225,14 346.506744,14 L365.993256,14 C366.273123,14 366.5,13.783628 366.5,13.5079041 L366.5,6.99209595 C366.5,6.72031886 366.269775,6.5 365.993256,6.5 L346.506744,6.5 Z' id='Battery'></path> </g> </g> </svg>",
  batteryMid: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='25px' height='10px' viewBox='0 0 25 10' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.7.2 (28276) - http://www.bohemiancoding.com/sketch --> <title>Battery</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Symbols' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Status-Bar/Black/Low-Power' transform='translate(-345.000000, -5.000000)' fill='#030303'> <path d='M346.493713,5.5 C345.668758,5.5 345,6.16802155 345,7.00530324 L345,13.4946968 C345,14.3260528 345.67338,15 346.493713,15 L366.006287,15 C366.831242,15 367.5,14.3319784 367.5,13.4946968 L367.5,7.00530324 C367.5,6.17394722 366.82662,5.5 366.006287,5.5 L346.493713,5.5 Z M368,8.5 L368,12 L368.75,12 C369.164214,12 369.5,11.6644053 369.5,11.25774 L369.5,9.24225998 C369.5,8.83232111 369.167101,8.5 368.75,8.5 L368,8.5 Z M346.508152,6 C345.951365,6 345.5,6.45699692 345.5,7.00844055 L345.5,13.4915594 C345.5,14.0485058 345.949058,14.5 346.508152,14.5 L365.991848,14.5 C366.548635,14.5 367,14.0430031 367,13.4915594 L367,7.00844055 C367,6.45149422 366.550942,6 365.991848,6 L346.508152,6 Z M346.50965,6.5 C346.228178,6.5 346,6.71637201 346,6.99209595 L346,13.5079041 C346,13.7796811 346.227653,14 346.50965,14 L356,14 L356,6.5 L346.50965,6.5 Z' id='Battery'></path> </g> </g> </svg>",
  batteryLow: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='25px' height='10px' viewBox='0 0 25 10' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.7.2 (28276) - http://www.bohemiancoding.com/sketch --> <title>Battery</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Symbols' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Status-Bar/Black/20%' transform='translate(-345.000000, -5.000000)' fill='#030303'> <path d='M346.493713,5.5 C345.668758,5.5 345,6.16802155 345,7.00530324 L345,13.4946968 C345,14.3260528 345.67338,15 346.493713,15 L366.006287,15 C366.831242,15 367.5,14.3319784 367.5,13.4946968 L367.5,7.00530324 C367.5,6.17394722 366.82662,5.5 366.006287,5.5 L346.493713,5.5 L346.493713,5.5 Z M368,8.5 L368,12 L368.75,12 C369.164214,12 369.5,11.6644053 369.5,11.25774 L369.5,9.24225998 C369.5,8.83232111 369.167101,8.5 368.75,8.5 L368,8.5 L368,8.5 Z M346.508152,6 C345.951365,6 345.5,6.45699692 345.5,7.00844055 L345.5,13.4915594 C345.5,14.0485058 345.949058,14.5 346.508152,14.5 L365.991848,14.5 C366.548635,14.5 367,14.0430031 367,13.4915594 L367,7.00844055 C367,6.45149422 366.550942,6 365.991848,6 L346.508152,6 Z M346.490479,6.5 C346.219595,6.5 346,6.71637201 346,6.99209595 L346,13.5079041 C346,13.7796811 346.215057,14 346.490479,14 L350,14 L350,6.5 L346.490479,6.5 Z' id='Battery'></path> </g> </g> </svg>",
  bannerBG: {
    "iphone-5": "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='320px' height='68px' viewBox='0 0 320 68' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.6.1 (26313) - http://www.bohemiancoding.com/sketch --> <title>iphone5</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0.9'> <g id='iPhone-5/5S/5C' fill='#1A1A1C'> <path d='M0,0 L320,0 L320,68 L0,68 L0,0 Z M142,61.0048815 C142,59.897616 142.896279,59 144.0024,59 L176.9976,59 C178.103495,59 179,59.8938998 179,61.0048815 L179,61.9951185 C179,63.102384 178.103721,64 176.9976,64 L144.0024,64 C142.896505,64 142,63.1061002 142,61.9951185 L142,61.0048815 Z' id='iphone5'></path> </g> </g> </svg>",
    "iphone-6s": "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='375px' height='68px' viewBox='0 0 375 68' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.6 (26304) - http://www.bohemiancoding.com/sketch --> <title>Notification background</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0.9'> <g id='iOS8-Push-Notification' transform='translate(-58.000000, -23.000000)' fill='#1A1A1C'> <g transform='translate(58.000000, 7.000000)' id='Notification-container'> <g> <path d='M0,16 L375,16 L375,84 L0,84 L0,16 Z M169,77.0048815 C169,75.897616 169.896279,75 171.0024,75 L203.9976,75 C205.103495,75 206,75.8938998 206,77.0048815 L206,77.9951185 C206,79.102384 205.103721,80 203.9976,80 L171.0024,80 C169.896505,80 169,79.1061002 169,77.9951185 L169,77.0048815 Z' id='Notification-background'></path> </g> </g> </g> </g> </svg>",
    "iphone-6s-plus": "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='414px' height='68px' viewBox='0 0 414 68' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.6 (26304) - http://www.bohemiancoding.com/sketch --> <title>Notification background Copy</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0.9'> <g id='iOS8-Push-Notification' transform='translate(-43.000000, -74.000000)' fill='#1A1A1C'> <g transform='translate(43.000000, 74.000000)' id='Notification-container'> <g> <path d='M0,0 L414,0 L414,68 L0,68 L0,0 Z M189,61.0048815 C189,59.897616 189.896279,59 191.0024,59 L223.9976,59 C225.103495,59 226,59.8938998 226,61.0048815 L226,61.9951185 C226,63.102384 225.103721,64 223.9976,64 L191.0024,64 C189.896505,64 189,63.1061002 189,61.9951185 L189,61.0048815 Z' id='Notification-background-Copy'></path> </g> </g> </g> </g> </svg>",
    "ipad": "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='768px' height='68px' viewBox='0 0 768 68' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.6.1 (26313) - http://www.bohemiancoding.com/sketch --> <title>ipad-portrait</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0.9'> <g id='iPad-Portrait' fill='#1A1A1C'> <path d='M0,0 L768,0 L768,68 L0,68 L0,0 Z M366,61.0048815 C366,59.897616 366.896279,59 368.0024,59 L400.9976,59 C402.103495,59 403,59.8938998 403,61.0048815 L403,61.9951185 C403,63.102384 402.103721,64 400.9976,64 L368.0024,64 C366.896505,64 366,63.1061002 366,61.9951185 L366,61.0048815 Z' id='ipad-portrait'></path> </g> </g> </svg>",
    "ipad-pro": "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='1024px' height='68px' viewBox='0 0 1024 68' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.6.1 (26313) - http://www.bohemiancoding.com/sketch --> <title>ipad-pro-portrait</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0.9'> <g id='iPad-Pro-Portrait' fill='#1A1A1C'> <path d='M0,0 L1024,0 L1024,68 L0,68 L0,0 Z M494,61.0048815 C494,59.897616 494.896279,59 496.0024,59 L528.9976,59 C530.103495,59 531,59.8938998 531,61.0048815 L531,61.9951185 C531,63.102384 530.103721,64 528.9976,64 L496.0024,64 C494.896505,64 494,63.1061002 494,61.9951185 L494,61.0048815 Z' id='ipad-pro-portrait'></path> </g> </g> </svg>"
  },
  emojiCodes: ["98 80", "98 AC", "98 81", "98 82", "98 83", "98 84", "98 85", "98 86", "98 87", "98 89", "98 8a", "99 82", "99 83", "E2 98 BA EF B8 8F", "98 8B", "98 8C", "98 8D", "98 98", "98 97", "98 99", "98 9A", "98 9C", "98 9D", "98 9B", "A4 91", "A4 93", "98 8E", "A4 97", "98 8F", "98 B6", "98 90", "98 91", "98 92", "99 84", "A4 94", "98 B3", "98 9E", "98 9F", "98 A0", "98 A1", "98 94", "98 95", "99 81", "E2 98 B9 EF B8 8F", "98 A3", "98 96", "98 AB", "98 A9", "98 A4", "98 AE", "98 B1", "98 A8", "98 B0", "98 AF", "98 A6", "98 A7", "98 A2", "98 A5", "98 AA", "98 93", "98 AD", "98 B5", "98 B2", "A4 90", "98 B7", "A4 92", "A4 95", "98 B4", "92 A4", "92 A9", "98 88", "91 BF", "91 B9", "91 BA", "92 80", "91 BB", "91 BD", "A4 96", "98 BA", "98 B8", "98 B9", "98 BB", "98 BC", "98 BD", "99 80", "98 BF", "98 BE", "99 8C", "91 8F", "91 8B", "91 8D", "91 8E", "91 8A", "E2 9C 8A", "E2 9C 8C EF B8 8F", "91 8C", "E2 9C 8B", "91 90", "92 AA", "99 8F", "E2 98 9D EF B8 8F", "91 86", "91 87", "91 88", "91 89", "96 95", "96 90", "A4 98", "96 96", "E2 9C 8D EF B8 8F", "92 85", "91 84", "91 85", "91 82", "91 83", "91 81", "91 80", "91 A4", "91 A5", "97 A3", "91 B6", "91 A6", "91 A7", "91 A8", "91 A9", "91 B1", "91 B4", "91 B5", "91 B2", "91 B3", "91 AE", "91 B7", "92 82", "95 B5", "8E 85", "91 BC", "91 B8", "91 B0", "9A B6", "8F 83", "92 83", "91 AF", "91 AB", "91 AC", "91 AD", "99 87", "92 81", "99 85", "99 86", "99 8B", "99 8E", "99 8D", "92 87", "92 86", "92 91", "91 A9 E2 80 8D E2 9D A4 EF B8 8F E2 80 8D F0 9F 91 A9", "91 A8 E2 80 8D E2 9D A4 EF B8 8F E2 80 8D F0 9F 91 A8", "92 8F", "91 A9 E2 80 8D E2 9D A4 EF B8 8F E2 80 8D F0 9F 92 8B E2 80 8D F0 9F 91 A9", "91 A8 E2 80 8D E2 9D A4 EF B8 8F E2 80 8D F0 9F 92 8B E2 80 8D F0 9F 91 A8", "91 AA", "91 A8 E2 80 8D F0 9F 91 A9 E2 80 8D F0 9F 91 A7", "91 A8 E2 80 8D F0 9F 91 A9 E2 80 8D F0 9F 91 A7 E2 80 8D F0 9F 91 A6", "91 A8 E2 80 8D F0 9F 91 A9 E2 80 8D F0 9F 91 A6 E2 80 8D F0 9F 91 A6", "91 A8 E2 80 8D F0 9F 91 A9 E2 80 8D F0 9F 91 A7 E2 80 8D F0 9F 91 A7", "91 A9 E2 80 8D F0 9F 91 A9 E2 80 8D F0 9F 91 A6", "91 A9 E2 80 8D F0 9F 91 A9 E2 80 8D F0 9F 91 A7", "91 A9 E2 80 8D F0 9F 91 A9 E2 80 8D F0 9F 91 A7 E2 80 8D F0 9F 91 A6", "91 A9 E2 80 8D F0 9F 91 A9 E2 80 8D F0 9F 91 A6 E2 80 8D F0 9F 91 A6", "91 A9 E2 80 8D F0 9F 91 A9 E2 80 8D F0 9F 91 A7 E2 80 8D F0 9F 91 A7", "91 A8 E2 80 8D F0 9F 91 A8 E2 80 8D F0 9F 91 A6", "91 A8 E2 80 8D F0 9F 91 A8 E2 80 8D F0 9F 91 A7", "91 A8 E2 80 8D F0 9F 91 A8 E2 80 8D F0 9F 91 A7 E2 80 8D F0 9F 91 A6", "91 A8 E2 80 8D F0 9F 91 A8 E2 80 8D F0 9F 91 A6 E2 80 8D F0 9F 91 A6", "91 A8 E2 80 8D F0 9F 91 A8 E2 80 8D F0 9F 91 A7 E2 80 8D F0 9F 91 A7", "91 9A", "91 95", "91 96", "91 94", "91 97", "91 99", "91 98", "92 84", "92 8B", "91 A3", "91 A0", "91 A1", "91 A2", "91 9E", "91 9F", "91 92", "8E A9", "E2 9B 91", "8E 93", "91 91", "8E 92", "91 9D", "91 9B", "91 9C", "92 BC", "91 93", "95 B6", "92 8D", "8C 82", "9B 91", "90 B6", "90 B1", "90 AD", "90 B9", "90 B0", "90 BB", "90 BC", "90 A8", "90 AF", "A6 81", "90 AE", "90 B7", "90 BD", "90 B8", "90 99", "90 B5", "99 88", "99 89", "99 8A", "90 92", "90 94", "90 A7", "90 A6", "90 A4", "90 A3", "90 A5", "90 BA", "90 97", "90 B4", "A6 84", "90 9D", "90 9B", "90 8C", "90 9E", "90 9C", "95 B7", "A6 82", "A6 80", "90 8D", "90 A2", "90 A0", "90 9F", "90 A1", "90 AC", "90 B3", "90 8B", "90 8A", "90 86", "90 85", "90 83", "90 82", "90 84", "90 AA", "90 AB", "90 98", "90 90", "90 8F", "90 91", "90 8E", "90 96", "90 80", "90 81", "90 93", "A6 83", "95 8A", "90 95", "90 A9", "90 88", "90 87", "90 BF", "90 BE", "90 89", "90 B2", "8C B5", "8E 84", "8C B2", "8C B3", "8C B4", "8C B1", "8C BF", "E2 98 98", "8D 80", "8E 8D", "8E 8B", "8D 83", "8D 82", "8D 81", "8C BE", "8C BA", "8C BA", "8C BB", "8C B9", "8C B7", "8C BC", "8C B8", "92 90", "8D 84", "8C B0", "8E 83", "90 9A", "95 B8", "8C 8E", "8C 8D", "8C 8F", "8C 95", "8C 96", "8C 97", "8C 98", "8C 91", "8C 92", "8C 93", "8C 94", "8C 9A", "8C 9D", "8C 9B", "8C 9C", "8C 9E", "8C 99", "E2 AD 90 EF B8 8F", "8C 9F", "92 AB", "E2 9C A8", "E2 98 84 EF B8 8F", "E2 98 80 EF B8 8F", "8C A4", "E2 9B 85 EF B8 8F", "8C A5", "8C A6", "E2 98 81 EF B8 8F", "8C A7", "E2 9B 88", "8C A9", "E2 9A A1 EF B8 8F", "94 A5", "92 A5", "E2 9D 84 EF B8 8F", "8C A8", "E2 98 83 EF B8 8F", "E2 9B 84 EF B8 8F", "8C AC", "92 A8", "8C AA", "8C AB", "E2 98 82 EF B8 8F", "E2 98 94 EF B8 8F", "92 A7", "92 A6", "8C 8A", "9B 91", "9B 91", "8D 8F", "8D 8E", "8D 90", "8D 8A", "8D 8B", "8D 8C", "8D 89", "8D 87", "8D 93", "8D 88", "8D 92", "8D 91", "8D 8D", "8D 85", "8D 86", "8C B6", "8C BD", "8D A0", "8D AF", "8D 9E", "A7 80", "8D 97", "8D 96", "8D A4", "8D B3", "8D 94", "8D 9F", "8C AD", "8D 95", "8D 9D", "8C AE", "8C AF", "8D 9C", "8D B2", "8D A5", "8D A3", "8D B1", "8D 9B", "8D 99", "8D 9A", "8D 98", "8D A2", "8D A1", "8D A7", "8D A8", "8D A6", "8D B0", "8E 82", "8D AE", "8D AC", "8D AD", "8D AB", "8D BF", "8D A9", "8D AA", "8D BA", "8D BB", "8D B7", "8D B8", "8D B9", "8D BE", "8D B6", "8D B5", "E2 98 95 EF B8 8F", "8D BC", "8D B4", "8D BD", "9B 91", "9B 91", "9B 91", "E2 9A BD EF B8 8F", "8F 80", "8F 88", "E2 9A BE EF B8 8F", "8E BE", "8F 90", "8F 89", "8E B1", "E2 9B B3 EF B8 8F", "8F 8C", "8F 93", "8F B8", "8F 92", "8F 91", "8F 8F", "8E BF", "E2 9B B7", "8F 82", "E2 9B B8", "8F B9", "8E A3", "9A A3", "8F 8A", "8F 84", "9B 80", "E2 9B B9", "8F 8B", "9A B4", "9A B5", "8F 87", "95 B4", "8F 86", "8E BD", "8F 85", "8E 96", "8E 97", "8F B5", "8E AB", "8E 9F", "8E AD", "8E A8", "8E AA", "8E A4", "8E A7", "8E BC", "8E B9", "8E B7", "8E BA", "8E B8", "8E BB", "8E AC", "8E AE", "91 BE", "8E AF", "8E B2", "8E B0", "8E B3", "9B 91", "9B 91", "9B 91", "9A 97", "9A 95", "9A 99", "9A 8C", "9A 8E", "8F 8E", "9A 93", "9A 91", "9A 92", "9A 90", "9A 9A", "9A 9B", "9A 9C", "8F 8D", "9A B2", "9A A8", "9A 94", "9A 8D", "9A 98", "9A 96", "9A A1", "9A A0", "9A AF", "9A 83", "9A 8B", "9A 9D", "9A 84", "9A 85", "9A 88", "9A 9E", "9A 82", "9A 86", "9A 87", "9A 8A", "9A 89", "9A 81", "9B A9", "E2 9C 88 EF B8 8F", "9B AB", "9B AC", "E2 9B B5 EF B8 8F", "9B A5", "9A A4", "E2 9B B4", "9B B3", "9A 80", "9B B0", "92 BA", "E2 9A 93 EF B8 8F", "9A A7", "E2 9B BD EF B8 8F", "9A 8F", "9A A6", "9A A5", "8F 81", "9A A2", "8E A1", "8E A2", "8E A0", "8F 97", "8C 81", "97 BC", "8F AD", "E2 9B B2 EF B8 8F", "8E 91", "E2 9B B0", "8F 94", "97 BB", "8C 8B", "97 BE", "8F 95", "E2 9B BA EF B8 8F", "8F 9E", "9B A3", "9B A4", "8C 85", "8C 84", "8F 9C", "8F 96", "8F 9D", "8C 87", "8C 86", "8F 99", "8C 83", "8C 89", "8C 8C", "8C A0", "8E 87", "8E 86", "8C 88", "8F 98", "8F B0", "8F AF", "8F 9F", "97 BD", "8F A0", "8F A1", "8F 9A", "8F A2", "8F AC", "8F A3", "8F A4", "8F A5", "8F A6", "8F A8", "8F AA", "8F AB", "8F A9", "92 92", "8F 9B", "E2 9B AA EF B8 8F", "95 8C", "95 8D", "95 8B", "E2 9B A9", "E2 8C 9A EF B8 8F", "93 B1", "93 B2", "92 BB", "E2 8C A8 EF B8 8F", "96 A5", "96 A8", "96 B1", "96 B2", "95 B9", "97 9C", "92 BD", "92 BE", "92 BF", "93 80", "93 BC", "93 B7", "93 B8", "93 B9", "8E A5", "93 BD", "8E 9E", "93 9E", "E2 98 8E EF B8 8F", "93 9F", "93 A0", "93 BA", "93 BB", "8E 99", "8E 9A", "8E 9B", "E2 8F B1", "E2 8F B2", "E2 8F B0", "95 B0", "E2 8F B3", "E2 8C 9B EF B8 8F", "93 A1", "94 8B", "94 8C", "92 A1", "94 A6", "95 AF", "97 91", "9B A2", "92 B8", "92 B5", "92 B4", "92 B6", "92 B7", "92 B0", "92 B3", "92 8E", "E2 9A 96", "94 A7", "94 A8", "E2 9A 92", "9B A0", "E2 9B 8F", "94 A9", "E2 9A 99", "E2 9B 93", "94 AB", "92 A3", "94 AA", "97 A1", "E2 9A 94", "9B A1", "9A AC", "E2 98 A0 EF B8 8F", "E2 9A B0", "E2 9A B1", "8F BA", "94 AE", "93 BF", "92 88", "E2 9A 97", "94 AD", "94 AC", "95 B3", "92 8A", "92 89", "8C A1", "8F B7", "94 96", "9A BD", "9A BF", "9B 81", "94 91", "97 9D", "9B 8B", "9B 8C", "9B 8F", "9A AA", "9B 8E", "96 BC", "97 BA", "E2 9B B1", "97 BF", "9B 8D", "8E 88", "8E 8F", "8E 80", "8E 81", "8E 8A", "8E 89", "8E 8E", "8E 90", "8E 8C", "8F AE", "E2 9C 89 EF B8 8F", "93 A9", "93 A8", "93 A7", "92 8C", "93 AE", "93 AA", "93 AB", "93 AC", "93 AD", "93 A6", "93 AF", "93 A5", "93 A4", "93 9C", "93 83", "93 91", "93 8A", "93 88", "93 89", "93 84", "93 85", "93 86", "97 93", "93 87", "97 83", "97 B3", "97 84", "93 8B", "97 92", "93 81", "93 82", "97 82", "97 9E", "93 B0", "93 93", "93 95", "93 97", "93 98", "93 99", "93 94", "93 92", "93 9A", "93 96", "94 97", "93 8E", "96 87", "E2 9C 82 EF B8 8F", "93 90", "93 8F", "93 8C", "93 8D", "9A A9", "8F B3", "8F B4", "94 90", "94 92", "94 93", "94 8F", "96 8A", "96 8B", "E2 9C 92 EF B8 8F", "93 9D", "E2 9C 8F EF B8 8F", "96 8D", "96 8C", "94 8D", "94 8E", "9B 91", "9B 91", "E2 9D A4 EF B8 8F", "92 9B", "92 9A", "92 99", "92 9C", "92 94", "E2 9D A3 EF B8 8F", "92 95", "92 9E", "92 93", "92 97", "92 96", "92 98", "92 9D", "92 9F", "E2 98 AE EF B8 8F", "E2 9C 9D EF B8 8F", "E2 98 AA EF B8 8F", "95 89", "E2 98 B8 EF B8 8F", "E2 9C A1 EF B8 8F", "94 AF", "95 8E", "E2 98 AF EF B8 8F", "E2 98 A6 EF B8 8F", "9B 90", "E2 9B 8E", "E2 99 88 EF B8 8F", "E2 99 89 EF B8 8F", "E2 99 8A EF B8 8F", "E2 99 8B EF B8 8F", "E2 99 8C EF B8 8F", "E2 99 8D EF B8 8F", "E2 99 8E EF B8 8F", "E2 99 8F EF B8 8F", "E2 99 90 EF B8 8F", "E2 99 91 EF B8 8F", "E2 99 92 EF B8 8F", "E2 99 93 EF B8 8F", "86 94", "E2 9A 9B", "88 B3", "88 B9", "E2 98 A2 EF B8 8F", "E2 98 A3 EF B8 8F", "93 B4", "93 B3", "88 B6", "88 9A EF B8 8F", "88 B8", "88 BA", "88 B7 EF B8 8F", "E2 9C B4 EF B8 8F", "86 9A", "89 91", "92 AE", "89 90", "E3 8A 99 EF B8 8F", "E3 8A 97 EF B8 8F", "88 B4", "88 B5", "88 B2", "85 B0 EF B8 8F", "85 B1 EF B8 8F", "86 8E", "86 91", "85 BE EF B8 8F", "86 98", "E2 9B 94 EF B8 8F", "93 9B", "9A AB", "E2 9D 8C", "E2 AD 95 EF B8 8F", "92 A2", "E2 99 A8 EF B8 8F", "9A B7", "9A AF", "9A B3", "9A B1", "94 9E", "93 B5", "E2 9D 97 EF B8 8F", "E2 9D 95", "E2 9D 93", "E2 9D 94", "E2 80 BC EF B8 8F", "E2 81 89 EF B8 8F", "92 AF", "94 85", "94 86", "94 B1", "E2 9A 9C", "E3 80 BD EF B8 8F", "E2 9A A0 EF B8 8F", "9A B8", "94 B0", "E2 99 BB EF B8 8F", "88 AF EF B8 8F", "92 B9", "E2 9D 87 EF B8 8F", "E2 9C B3 EF B8 8F", "E2 9D 8E", "E2 9C 85", "92 A0", "8C 80", "E2 9E BF", "8C 90", "E2 93 82 EF B8 8F", "8F A7", "88 82 EF B8 8F", "9B 82", "9B 83", "9B 84", "9B 85", "E2 99 BF EF B8 8F", "9A AD", "9A BE", "85 BF EF B8 8F", "9A B0", "9A B9", "9A BA", "9A BC", "9A BB", "9A AE", "8E A6", "93 B6", "88 81", "86 96", "86 97", "86 99", "86 92", "86 95", "86 93", "30 EF B8 8F E2 83 A3", "31 EF B8 8F E2 83 A3", "32 EF B8 8F E2 83 A3", "33 EF B8 8F E2 83 A3", "34 EF B8 8F E2 83 A3", "35 EF B8 8F E2 83 A3", "36 EF B8 8F E2 83 A3", "37 EF B8 8F E2 83 A3", "38 EF B8 8F E2 83 A3", "39 EF B8 8F E2 83 A3", "94 9F", "94 A2", "E2 96 B6 EF B8 8F", "E2 8F B8", "E2 8F AF", "E2 8F B9", "E2 8F BA", "E2 8F AD", "E2 8F AE", "E2 8F A9", "E2 8F AA", "94 80", "94 81", "94 82", "E2 97 80 EF B8 8F", "94 BC", "94 BD", "E2 8F AB", "E2 8F AC", "E2 9E A1 EF B8 8F", "E2 AC 85 EF B8 8F", "E2 AC 86 EF B8 8F", "E2 AC 87 EF B8 8F", "E2 86 97 EF B8 8F", "E2 86 98 EF B8 8F", "E2 86 99 EF B8 8F", "E2 86 96 EF B8 8F", "E2 86 95 EF B8 8F", "E2 86 94 EF B8 8F", "94 84", "E2 86 AA EF B8 8F", "E2 86 A9 EF B8 8F", "E2 A4 B4 EF B8 8F", "E2 A4 B5 EF B8 8F", "23 EF B8 8F E2 83 A3", "2A EF B8 8F E2 83 A3", "E2 84 B9 EF B8 8F", "94 A4", "94 A1", "94 A0", "94 A3", "8E B5", "8E B6", "E3 80 B0 EF B8 8F", "E2 9E B0", "E2 9C 94 EF B8 8F", "94 83", "E2 9E 95", "E2 9E 96", "E2 9E 97", "E2 9C 96 EF B8 8F", "92 B2", "92 B1", "C2 A9 EF B8 8F", "C2 AE EF B8 8F", "E2 84 A2 EF B8 8F", "94 9A", "94 99", "94 9B", "94 9D", "94 9C", "E2 98 91 EF B8 8F", "94 98", "E2 9A AA EF B8 8F", "E2 9A AB EF B8 8F", "94 B4", "94 B5", "94 B8", "94 B9", "94 B6", "94 B7", "94 BA", "E2 96 AA EF B8 8F", "E2 96 AB EF B8 8F", "E2 AC 9B EF B8 8F", "E2 AC 9C EF B8 8F", "94 BB", "E2 97 BC EF B8 8F", "E2 97 BB EF B8 8F", "E2 97 BE EF B8 8F", "E2 97 BD EF B8 8F", "94 B2", "94 B3", "94 88", "94 89", "94 8A", "94 87", "93 A3", "93 A2", "94 94", "94 95", "83 8F", "80 84 EF B8 8F", "E2 99 A0 EF B8 8F", "E2 99 A3 EF B8 8F", "E2 99 A5 EF B8 8F", "E2 99 A6 EF B8 8F", "8E B4", "91 81 E2 80 8D F0 9F 97 A8", "92 AD", "97 AF", "92 AC", "95 90", "95 91", "95 92", "95 93", "95 94", "95 95", "95 96", "95 97", "95 98", "95 99", "95 9A", "95 9B", "95 9C", "95 9D", "95 9E", "95 9F", "95 A0", "95 A1", "95 A2", "95 A3", "95 A4", "95 A5", "95 A6", "95 A7", "9B 91", "87 A6 F0 9F 87 AB", "87 A6 F0 9F 87 BD", "87 A6 F0 9F 87 B1", "87 A9 F0 9F 87 BF", "87 A6 F0 9F 87 B8", "87 A6 F0 9F 87 A9", "87 A6 F0 9F 87 B4", "87 A6 F0 9F 87 AE", "87 A6 F0 9F 87 B6", "87 A6 F0 9F 87 AC", "87 A6 F0 9F 87 B7", "87 A6 F0 9F 87 B2", "87 A6 F0 9F 87 BC", "87 A6 F0 9F 87 BA", "87 A6 F0 9F 87 B9", "87 A6 F0 9F 87 BF", "87 A7 F0 9F 87 B8", "87 A7 F0 9F 87 AD", "87 A7 F0 9F 87 A9", "87 A7 F0 9F 87 A7", "87 A7 F0 9F 87 BE", "87 A7 F0 9F 87 AA", "87 A7 F0 9F 87 BF", "87 A7 F0 9F 87 AF", "87 A7 F0 9F 87 B2", "87 A7 F0 9F 87 B9", "87 A7 F0 9F 87 B4", "87 A7 F0 9F 87 B6", "87 A7 F0 9F 87 A6", "87 A7 F0 9F 87 BC", "87 A7 F0 9F 87 B7", "87 AE F0 9F 87 B4", "87 BB F0 9F 87 AC", "87 A7 F0 9F 87 B3", "87 A7 F0 9F 87 AC", "87 A7 F0 9F 87 AB", "87 A7 F0 9F 87 AE", "87 A8 F0 9F 87 BB", "87 B0 F0 9F 87 AD", "87 A8 F0 9F 87 B2", "87 A8 F0 9F 87 A6", "87 AE F0 9F 87 A8", "87 B0 F0 9F 87 BE", "87 A8 F0 9F 87 AB", "87 B9 F0 9F 87 A9", "87 A8 F0 9F 87 B1", "87 A8 F0 9F 87 B3", "87 A8 F0 9F 87 BD", "87 A8 F0 9F 87 A8", "87 A8 F0 9F 87 B4", "87 B0 F0 9F 87 B2", "87 A8 F0 9F 87 AC", "87 A8 F0 9F 87 A9", "87 A8 F0 9F 87 B0", "87 A8 F0 9F 87 B7", "87 AD F0 9F 87 B7", "87 A8 F0 9F 87 BA", "87 A8 F0 9F 87 BC", "87 A8 F0 9F 87 BE", "87 A8 F0 9F 87 BF", "87 A9 F0 9F 87 B0", "87 A9 F0 9F 87 AF", "87 A9 F0 9F 87 B2", "87 A9 F0 9F 87 B4", "87 AA F0 9F 87 A8", "87 AA F0 9F 87 AC", "87 B8 F0 9F 87 BB", "87 AC F0 9F 87 B6", "87 AA F0 9F 87 B7", "87 AA F0 9F 87 AA", "87 AA F0 9F 87 B9", "87 AA F0 9F 87 BA", "87 AB F0 9F 87 B0", "87 AB F0 9F 87 B4", "87 AB F0 9F 87 AF", "87 AB F0 9F 87 AE", "87 AB F0 9F 87 B7", "87 AC F0 9F 87 AB", "87 B5 F0 9F 87 AB", "87 B9 F0 9F 87 AB", "87 AC F0 9F 87 A6", "87 AC F0 9F 87 B2", "87 AC F0 9F 87 AA", "87 A9 F0 9F 87 AA", "87 AC F0 9F 87 AD", "87 AC F0 9F 87 AE", "87 AC F0 9F 87 B7", "87 AC F0 9F 87 B1", "87 AC F0 9F 87 A9", "87 AC F0 9F 87 B5", "87 AC F0 9F 87 BA", "87 AC F0 9F 87 B9", "87 AC F0 9F 87 AC", "87 AC F0 9F 87 B3", "87 AC F0 9F 87 BC", "87 AC F0 9F 87 BE", "87 AD F0 9F 87 B9", "87 AD F0 9F 87 B3", "87 AD F0 9F 87 B0", "87 AD F0 9F 87 BA", "87 AE F0 9F 87 B8", "87 AE F0 9F 87 B3", "87 AE F0 9F 87 A9", "87 AE F0 9F 87 B7", "87 AE F0 9F 87 B6", "87 AE F0 9F 87 AA", "87 AE F0 9F 87 B2", "87 AE F0 9F 87 B1", "87 AE F0 9F 87 B9", "87 A8 F0 9F 87 AE", "87 AF F0 9F 87 B2", "87 AF F0 9F 87 B5", "87 AF F0 9F 87 AA", "87 AF F0 9F 87 B4", "87 B0 F0 9F 87 BF", "87 B0 F0 9F 87 AA", "87 B0 F0 9F 87 AE", "87 BD F0 9F 87 B0", "87 B0 F0 9F 87 BC", "87 B0 F0 9F 87 AC", "87 B1 F0 9F 87 A6", "87 B1 F0 9F 87 BB", "87 B1 F0 9F 87 A7", "87 B1 F0 9F 87 B8", "87 B1 F0 9F 87 B7", "87 B1 F0 9F 87 BE", "87 B1 F0 9F 87 AE", "87 B1 F0 9F 87 B9", "87 B1 F0 9F 87 BA", "87 B2 F0 9F 87 B4", "87 B2 F0 9F 87 B0", "87 B2 F0 9F 87 AC", "87 B2 F0 9F 87 BC", "87 B2 F0 9F 87 BE", "87 B2 F0 9F 87 BB", "87 B2 F0 9F 87 B1", "87 B2 F0 9F 87 B9", "87 B2 F0 9F 87 AD", "87 B2 F0 9F 87 B6", "87 B2 F0 9F 87 B7", "87 B2 F0 9F 87 BA", "87 BE F0 9F 87 B9", "87 B2 F0 9F 87 BD", "87 AB F0 9F 87 B2", "87 B2 F0 9F 87 A9", "87 B2 F0 9F 87 A8", "87 B2 F0 9F 87 B3", "87 B2 F0 9F 87 AA", "87 B2 F0 9F 87 B8", "87 B2 F0 9F 87 A6", "87 B2 F0 9F 87 BF", "87 B2 F0 9F 87 B2", "87 B3 F0 9F 87 A6", "87 B3 F0 9F 87 B7", "87 B3 F0 9F 87 B5", "87 B3 F0 9F 87 B1", "87 B3 F0 9F 87 A8", "87 B3 F0 9F 87 BF", "87 B3 F0 9F 87 AE", "87 B3 F0 9F 87 AA", "87 B3 F0 9F 87 AC", "87 B3 F0 9F 87 BA", "87 B3 F0 9F 87 AB", "87 B2 F0 9F 87 B5", "87 B0 F0 9F 87 B5", "87 B3 F0 9F 87 B4", "87 B4 F0 9F 87 B2", "87 B5 F0 9F 87 B0", "87 B5 F0 9F 87 BC", "87 B5 F0 9F 87 B8", "87 B5 F0 9F 87 A6", "87 B5 F0 9F 87 AC", "87 B5 F0 9F 87 BE", "87 B5 F0 9F 87 AA", "87 B5 F0 9F 87 AD", "87 B5 F0 9F 87 B3", "87 B5 F0 9F 87 B1", "87 B5 F0 9F 87 B9", "87 B5 F0 9F 87 B7", "87 B6 F0 9F 87 A6", "87 B7 F0 9F 87 AA", "87 B7 F0 9F 87 B4", "87 B7 F0 9F 87 BA", "87 B7 F0 9F 87 BC", "87 A7 F0 9F 87 B1", "87 B8 F0 9F 87 AD", "87 B0 F0 9F 87 B3", "87 B1 F0 9F 87 A8", "87 B5 F0 9F 87 B2", "87 BB F0 9F 87 A8", "87 BC F0 9F 87 B8", "87 B8 F0 9F 87 B2", "87 B8 F0 9F 87 B9", "87 B8 F0 9F 87 A6", "87 B8 F0 9F 87 B3", "87 B7 F0 9F 87 B8", "87 B8 F0 9F 87 A8", "87 B8 F0 9F 87 B1", "87 B8 F0 9F 87 AC", "87 B8 F0 9F 87 BD", "87 B8 F0 9F 87 B0", "87 B8 F0 9F 87 AE", "87 B8 F0 9F 87 A7", "87 B8 F0 9F 87 B4", "87 BF F0 9F 87 A6", "87 AC F0 9F 87 B8", "87 B0 F0 9F 87 B7", "87 B8 F0 9F 87 B8", "87 AA F0 9F 87 B8", "87 B1 F0 9F 87 B0", "87 B8 F0 9F 87 A9", "87 B8 F0 9F 87 B7", "87 B8 F0 9F 87 BF", "87 B8 F0 9F 87 AA", "87 A8 F0 9F 87 AD", "87 B8 F0 9F 87 BE", "87 B9 F0 9F 87 BC", "87 B9 F0 9F 87 AF", "87 B9 F0 9F 87 BF", "87 B9 F0 9F 87 AD", "87 B9 F0 9F 87 B1", "87 B9 F0 9F 87 AC", "87 B9 F0 9F 87 B0", "87 B9 F0 9F 87 B4", "87 B9 F0 9F 87 B9", "87 B9 F0 9F 87 B3", "87 B9 F0 9F 87 B7", "87 B9 F0 9F 87 B2", "87 B9 F0 9F 87 A8", "87 B9 F0 9F 87 BB", "87 BA F0 9F 87 AC", "87 BA F0 9F 87 A6", "87 A6 F0 9F 87 AA", "87 AC F0 9F 87 A7", "87 BA F0 9F 87 B8", "87 BB F0 9F 87 AE", "87 BA F0 9F 87 BE", "87 BA F0 9F 87 BF", "87 BB F0 9F 87 BA", "87 BB F0 9F 87 A6", "87 BB F0 9F 87 AA", "87 BB F0 9F 87 B3", "87 BC F0 9F 87 AB", "87 AA F0 9F 87 AD", "87 BE F0 9F 87 AA", "87 BF F0 9F 87 B2", "87 BF F0 9F 87 BC"],
  network: "<svg width='14px' height='10px' viewBox='87 5 14 10' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.7.2 (28276) - http://www.bohemiancoding.com/sketch --> <desc>Created with Sketch.</desc> <defs></defs> <path d='M96.1444208,12.4385043 C95.626374,11.8454456 94.8523616,11.4689119 93.987563,11.4689119 C93.1390073,11.4689119 92.3778594,11.8314341 91.8601652,12.4053177 L94.0225391,14.5 L96.1444208,12.4385043 Z M98.3234964,10.3214425 C97.2447794,9.19174563 95.7014387,8.48445596 93.987563,8.48445596 C92.2882723,8.48445596 90.7566264,9.17975893 89.6792698,10.2926936 L90.7692987,11.3486 C91.567205,10.5053708 92.713648,9.97668394 93.987563,9.97668394 C95.2768836,9.97668394 96.4356305,10.518235 97.2346215,11.3793293 L98.3234964,10.3214425 L98.3234964,10.3214425 Z M100.5,8.20687933 C98.8629578,6.53943672 96.5505699,5.5 93.987563,5.5 C91.4375103,5.5 89.1355496,6.52895605 87.5,8.18164431 L88.5895579,9.23709441 C89.9460798,7.85431655 91.8628921,6.99222798 93.987563,6.99222798 C96.1260026,6.99222798 98.0538809,7.86552609 99.4118698,9.26404272 L100.5,8.20687933 Z' id='Wi-Fi' stroke='none' fill='#030303' fill-rule='evenodd'></path> </svg>",
  activity: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='16px' height='16px' viewBox='0 0 16 16' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Soccer Ball</title> <desc>Created with Sketch.</desc> <defs> <circle id='path-1' cx='8' cy='8' r='8'></circle> </defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='iPhone-6' sketch:type='MSArtboardGroup' transform='translate(-179.000000, -639.000000)'> <g id='Soccer-Ball' sketch:type='MSLayerGroup' transform='translate(179.000000, 639.000000)'> <mask id='mask-2' sketch:name='Mask' fill='white'> <use xlink:href='#path-1'></use> </mask> <use id='Mask' stroke='#4A5361' sketch:type='MSShapeGroup' xlink:href='#path-1'></use> <path d='M6,12.1203046 L12.8573384,8 L13.3723765,8.8571673 L6.51503807,12.9774719 L6,12.1203046 L6,12.1203046 Z' id='Rectangle-47' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)'></path> <path d='M11.849648,8.7260551 L19.1001103,5.34510901 L19.5227285,6.2514168 L12.2722662,9.63236289 L11.849648,8.7260551 L11.849648,8.7260551 Z' id='Rectangle-47-Copy-3' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)'></path> <path d='M6,3.1203046 L12.8573384,-1 L13.3723765,-0.142832699 L6.51503807,3.9774719 L6,3.1203046 L6,3.1203046 Z' id='Rectangle-47-Copy-2' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)'></path> <path d='M-1,7.1203046 L5.85733841,3 L6.37237648,3.8571673 L-0.484961925,7.9774719 L-1,7.1203046 L-1,7.1203046 Z' id='Rectangle-47-Copy-4' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)'></path> <rect id='Rectangle-50' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)' x='4' y='6' width='1' height='5'></rect> <rect id='Rectangle-51' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)' x='11.5' y='3' width='1' height='12'></rect> <path d='M5,4.8571673 L11.8573384,8.9774719 L12.3723765,8.1203046 L5.51503807,4 L5,4.8571673' id='Rectangle-47-Copy' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)'></path> <path d='M5,12.8571673 L11.8573384,16.9774719 L12.3723765,16.1203046 L5.51503807,12 L5,12.8571673' id='Rectangle-47-Copy-5' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)'></path> <path d='M11.9048972,6.14766064 L13.8714227,8.33170849 L12.4019596,10.8768933 L9.52725589,10.2658562 L9.22005445,7.34302965 L11.9048972,6.14766064' id='Polygon-1' fill='#D8D8D8' sketch:type='MSShapeGroup' mask='url(#mask-2)'></path> <path d='M11.9048972,6.14766064 L13.8714227,8.33170849 L12.4019596,10.8768933 L9.52725589,10.2658562 L9.22005445,7.34302965 L11.9048972,6.14766064' id='Polygon-1-Copy' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)'></path> <path d='M7.45771189,3.19504739 L7.35514484,6.13218333 L4.5300676,6.9422612 L2.88664089,4.5057809 L4.69602457,2.18987541 L7.45771189,3.19504739' id='Polygon-1-Copy-2' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)'></path> <path d='M7.45771189,11.1950474 L7.35514484,14.1321833 L4.5300676,14.9422612 L2.88664089,12.5057809 L4.69602457,10.1898754 L7.45771189,11.1950474' id='Polygon-1-Copy-3' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)'></path> <path d='M14.5431701,0.0725939314 L14.4406031,3.00972988 L11.6155258,3.81980774 L9.97209912,1.38332745 L11.7814828,-0.93257805 L14.5431701,0.0725939314' id='Polygon-1-Copy-4' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)'></path> </g> </g> </g> </svg>",
  animals: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='17px' height='16px' viewBox='0 0 17 17' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Group</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='iPhone-6' sketch:type='MSArtboardGroup' transform='translate(-117.000000, -639.000000)' stroke='#4A5361'> <g id='ic_Food' sketch:type='MSLayerGroup' transform='translate(118.000000, 640.000000)'> <g id='Group' sketch:type='MSShapeGroup'> <path d='M5.68377537,1.38156646 C6.23926066,1.13624 6.85372005,1 7.5,1 C8.14627995,1 8.76073934,1.13624 9.31622463,1.38156646 C9.80879275,0.562359019 10.8255888,0 12,0 C13.6568542,0 15,1.11928813 15,2.5 C15,3.5571398 14.2126246,4.46102843 13.0999226,4.82662514 C14.2496528,5.64185422 15,6.98330062 15,8.5 C15,10.7167144 13.3971873,12.5590719 11.2872671,12.9313673 C10.4867248,14.1757703 9.08961696,15 7.5,15 C5.91038304,15 4.51327524,14.1757703 3.71273291,12.9313673 C1.60281268,12.5590719 0,10.7167144 0,8.5 C0,6.98330062 0.750347244,5.64185422 1.90007741,4.82662514 C0.787375445,4.46102843 0,3.5571398 0,2.5 C0,1.11928813 1.34314575,0 3,0 C4.17441122,0 5.19120725,0.562359019 5.68377537,1.38156646 Z' id='Oval-8'></path> <path d='M5.73834228,12 C5.86290979,12 6.14642353,12 6.14642353,12 C6.14642353,12 6.43215696,12.4426123 6.5246582,12.4919739 C6.66455601,12.5666277 7,12.4919739 7,12.4919739 L7,12 L8,12 L8,12.4919739 L8.49799228,12.4919739 L8.84301769,12 L9.3918457,12 C9.3918457,12 8.99598457,12.9839478 8.49799228,12.9839478 L6.60702407,12.9839478 C6.21404813,12.9839478 5.45996094,12 5.73834228,12 Z' id='Rectangle-44-Copy-2'></path> <circle id='Oval-14' cx='10.5' cy='7.5' r='0.5'></circle> <circle id='Oval-14-Copy' cx='4.5' cy='7.5' r='0.5'></circle> <path d='M12.6999969,5 C12.6999969,3.06700338 11.1329936,1.5 9.19999695,1.5' id='Oval-16'></path> <path d='M5.5,5 C5.5,3.06700338 3.93299662,1.5 2,1.5' id='Oval-16-Copy' transform='translate(3.750000, 3.250000) scale(-1, 1) translate(-3.750000, -3.250000) '></path> <rect id='Rectangle-44-Copy' x='7' y='11' width='1' height='1'></rect> <path d='M6,10 L6.5,10 L6.49999999,9.5 L8.50000005,9.5 L8.50000005,10 L9,10 L9,10.5 L8.5,10.5 L8.5,11 L6.5,11 L6.5,10.5 L6,10.5 L6,10 Z' id='Path'></path> </g> </g> </g> </g> </svg>",
  chevron: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='13px' height='22px' viewBox='0 0 13 22' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.6.1 (26313) - http://www.bohemiancoding.com/sketch --> <title>Back Chevron</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Navigation-Bar/Back' transform='translate(-8.000000, -31.000000)' fill='#0076FF'> <path d='M8.5,42 L19,31.5 L21,33.5 L12.5,42 L21,50.5 L19,52.5 L8.5,42 Z' id='Back-Chevron'></path> </g> </g> </svg>",
  emojis: ["😀", "😬", "😁", "😂", "😃", "😄", "😅", "😆", "😇", "😉", "😊", "🙂", "🙃", "☺️", "😋", "😌", "😍", "😘", "😗", "😙", "😚", "😜", "😝", "😛", "🤑", "🤓", "😎", "🤗", "😏", "😶", "😐", "😑", "😒", "🙄", "🤔", "😳", "😞", "😟", "😠", "😡", "😔", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "😤", "😮", "😱", "😨", "😰", "😯", "😦", "😧", "😢", "😥", "😪", "😓", "😭", "😵", "😲", "🤐", "😷", "🤒", "🤕", "😴", "💤", "💩", "😈", "👿", "👹", "👺", "💀", "👻", "👽", "🤖", "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾", "🙌", "👏", "👋", "👍", "👎", "👊", "✊", "✌️", "👌", "✋", "👐", "💪", "🙏", "☝️", "👆", "👇", "👈", "👉", "🖕", "🖐", "🤘", "🖖", "✍️", "💅", "👄", "👅", "👂", "👃", "👁", "👀", "👤", "👥", "🗣", "👶", "👦", "👧", "👨", "👩", "👱", "👴", "👵", "👲", "👳", "👮", "👷", "💂", "🕵", "🎅", "👼", "👸", "👰", "🚶", "🏃", "💃", "👯", "👫", "👬", "👭", "🙇", "💁", "🙅", "🙆", "🙋", "🙎", "🙍", "💇", "💆", "💑", "👩‍❤️‍👩", "👨‍❤️‍👨", "💏", "👩‍❤️‍💋‍👩", "👨‍❤️‍💋‍👨", "👪", "👨‍👩‍👧", "👨‍👩‍👧‍👦", "👨‍👩‍👦‍👦", "👨‍👩‍👧‍👧", "👩‍👩‍👦", "👩‍👩‍👧", "👩‍👩‍👧‍👦", "👩‍👩‍👦‍👦", "👩‍👩‍👧‍👧", "👨‍👨‍👦", "👨‍👨‍👧", "👨‍👨‍👧‍👦", "👨‍👨‍👦‍👦", "👨‍👨‍👧‍👧", "👚", "👕", "👖", "👔", "👗", "👙", "👘", "💄", "💋", "👣", "👠", "👡", "👢", "👞", "👟", "👒", "🎩", "⛑", "🎓", "👑", "🎒", "👝", "👛", "👜", "💼", "👓", "🕶", "💍", "🌂", "🛑", "🐶", "🐱", "🐭", "🐹", "🐰", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐽", "🐸", "🐙", "🐵", "🙈", "🙉", "🙊", "🐒", "🐔", "🐧", "🐦", "🐤", "🐣", "🐥", "🐺", "🐗", "🐴", "🦄", "🐝", "🐛", "🐌", "🐞", "🐜", "🕷", "🦂", "🦀", "🐍", "🐢", "🐠", "🐟", "🐡", "🐬", "🐳", "🐋", "🐊", "🐆", "🐅", "🐃", "🐂", "🐄", "🐪", "🐫", "🐘", "🐐", "🐏", "🐑", "🐎", "🐖", "🐀", "🐁", "🐓", "🦃", "🕊", "🐕", "🐩", "🐈", "🐇", "🐿", "🐾", "🐉", "🐲", "🌵", "🎄", "🌲", "🌳", "🌴", "🌱", "🌿", "☘", "🍀", "🎍", "🎋", "🍃", "🍂", "🍁", "🌾", "🌺", "🌺", "🌻", "🌹", "🌷", "🌼", "🌸", "💐", "🍄", "🌰", "🎃", "🐚", "🕸", "🌎", "🌍", "🌏", "🌕", "🌖", "🌗", "🌘", "🌑", "🌒", "🌓", "🌔", "🌚", "🌝", "🌛", "🌜", "🌞", "🌙", "⭐️", "🌟", "💫", "✨", "☄️", "☀️", "🌤", "⛅️", "🌥", "🌦", "☁️", "🌧", "⛈", "🌩", "⚡️", "🔥", "💥", "❄️", "🌨", "☃️", "⛄️", "🌬", "💨", "🌪", "🌫", "☂️", "☔️", "💧", "💦", "🌊", "🛑", "🛑", "🍏", "🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🍈", "🍒", "🍑", "🍍", "🍅", "🍆", "🌶", "🌽", "🍠", "🍯", "🍞", "🧀", "🍗", "🍖", "🍤", "🍳", "🍔", "🍟", "🌭", "🍕", "🍝", "🌮", "🌯", "🍜", "🍲", "🍥", "🍣", "🍱", "🍛", "🍙", "🍚", "🍘", "🍢", "🍡", "🍧", "🍨", "🍦", "🍰", "🎂", "🍮", "🍬", "🍭", "🍫", "🍿", "🍩", "🍪", "🍺", "🍻", "🍷", "🍸", "🍹", "🍾", "🍶", "🍵", "☕️", "🍼", "🍴", "🍽", "🛑", "🛑", "🛑", "⚽️", "🏀", "🏈", "⚾️", "🎾", "🏐", "🏉", "🎱", "⛳️", "🏌", "🏓", "🏸", "🏒", "🏑", "🏏", "🎿", "⛷", "🏂", "⛸", "🏹", "🎣", "🚣", "🏊", "🏄", "🛀", "⛹", "🏋", "🚴", "🚵", "🏇", "🕴", "🏆", "🎽", "🏅", "🎖", "🎗", "🏵", "🎫", "🎟", "🎭", "🎨", "🎪", "🎤", "🎧", "🎼", "🎹", "🎷", "🎺", "🎸", "🎻", "🎬", "🎮", "👾", "🎯", "🎲", "🎰", "🎳", "🛑", "🛑", "🛑", "🚗", "🚕", "🚙", "🚌", "🚎", "🏎", "🚓", "🚑", "🚒", "🚐", "🚚", "🚛", "🚜", "🏍", "🚲", "🚨", "🚔", "🚍", "🚘", "🚖", "🚡", "🚠", "🚯", "🚃", "🚋", "🚝", "🚄", "🚅", "🚈", "🚞", "🚂", "🚆", "🚇", "🚊", "🚉", "🚁", "🛩", "✈️", "🛫", "🛬", "⛵️", "🛥", "🚤", "⛴", "🛳", "🚀", "🛰", "💺", "⚓️", "🚧", "⛽️", "🚏", "🚦", "🚥", "🏁", "🚢", "🎡", "🎢", "🎠", "🏗", "🌁", "🗼", "🏭", "⛲️", "🎑", "⛰", "🏔", "🗻", "🌋", "🗾", "🏕", "⛺️", "🏞", "🛣", "🛤", "🌅", "🌄", "🏜", "🏖", "🏝", "🌇", "🌆", "🏙", "🌃", "🌉", "🌌", "🌠", "🎇", "🎆", "🌈", "🏘", "🏰", "🏯", "🏟", "🗽", "🏠", "🏡", "🏚", "🏢", "🏬", "🏣", "🏤", "🏥", "🏦", "🏨", "🏪", "🏫", "🏩", "💒", "🏛", "⛪️", "🕌", "🕍", "🕋", "⛩", "⌚️", "📱", "📲", "💻", "⌨️", "🖥", "🖨", "🖱", "🖲", "🕹", "🗜", "💽", "💾", "💿", "📀", "📼", "📷", "📸", "📹", "🎥", "📽", "🎞", "📞", "☎️", "📟", "📠", "📺", "📻", "🎙", "🎚", "🎛", "⏱", "⏲", "⏰", "🕰", "⏳", "⌛️", "📡", "🔋", "🔌", "💡", "🔦", "🕯", "🗑", "🛢", "💸", "💵", "💴", "💶", "💷", "💰", "💳", "💎", "⚖", "🔧", "🔨", "⚒", "🛠", "⛏", "🔩", "⚙", "⛓", "🔫", "💣", "🔪", "🗡", "⚔", "🛡", "🚬", "☠️", "⚰", "⚱", "🏺", "🔮", "📿", "💈", "⚗", "🔭", "🔬", "🕳", "💊", "💉", "🌡", "🏷", "🔖", "🚽", "🚿", "🛁", "🔑", "🗝", "🛋", "🛌", "🛏", "🚪", "🛎", "🖼", "🗺", "⛱", "🗿", "🛍", "🎈", "🎏", "🎀", "🎁", "🎊", "🎉", "🎎", "🎐", "🎌", "🏮", "✉️", "📩", "📨", "📧", "💌", "📮", "📪", "📫", "📬", "📭", "📦", "📯", "📥", "📤", "📜", "📃", "📑", "📊", "📈", "📉", "📄", "📅", "📆", "🗓", "📇", "🗃", "🗳", "🗄", "📋", "🗒", "📁", "📂", "🗂", "🗞", "📰", "📓", "📕", "📗", "📘", "📙", "📔", "📒", "📚", "📖", "🔗", "📎", "🖇", "✂️", "📐", "📏", "📌", "📍", "🚩", "🏳", "🏴", "🔐", "🔒", "🔓", "🔏", "🖊", "🖋", "✒️", "📝", "✏️", "🖍", "🖌", "🔍", "🔎", "🛑", "🛑", "❤️", "💛", "💚", "💙", "💜", "💔", "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💟", "☮️", "✝️", "☪️", "🕉", "☸️", "✡️", "🔯", "🕎", "☯️", "☦️", "🛐", "⛎", "♈️", "♉️", "♊️", "♋️", "♌️", "♍️", "♎️", "♏️", "♐️", "♑️", "♒️", "♓️", "🆔", "⚛", "🈳", "🈹", "☢️", "☣️", "📴", "📳", "🈶", "🈚️", "🈸", "🈺", "🈷️", "✴️", "🆚", "🉑", "💮", "🉐", "㊙️", "㊗️", "🈴", "🈵", "🈲", "🅰️", "🅱️", "🆎", "🆑", "🅾️", "🆘", "⛔️", "📛", "🚫", "❌", "⭕️", "💢", "♨️", "🚷", "🚯", "🚳", "🚱", "🔞", "📵", "❗️", "❕", "❓", "❔", "‼️", "⁉️", "💯", "🔅", "🔆", "🔱", "⚜", "〽️", "⚠️", "🚸", "🔰", "♻️", "🈯️", "💹", "❇️", "✳️", "❎", "✅", "💠", "🌀", "➿", "🌐", "Ⓜ️", "🏧", "🈂️", "🛂", "🛃", "🛄", "🛅", "♿️", "🚭", "🚾", "🅿️", "🚰", "🚹", "🚺", "🚼", "🚻", "🚮", "🎦", "📶", "🈁", "🆖", "🆗", "🆙", "🆒", "🆕", "🆓", "0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟", "🔢", "▶️", "⏸", "⏯", "⏹", "⏺", "⏭", "⏮", "⏩", "⏪", "🔀", "🔁", "🔂", "◀️", "🔼", "🔽", "⏫", "⏬", "➡️", "⬅️", "⬆️", "⬇️", "↗️", "↘️", "↙️", "↖️", "↕️", "↔️", "🔄", "↪️", "↩️", "⤴️", "⤵️", "#️⃣", "*️⃣", "ℹ️", "🔤", "🔡", "🔠", "🔣", "🎵", "🎶", "〰️", "➰", "✔️", "🔃", "➕", "➖", "➗", "✖️", "💲", "💱", "©️", "®️", "™️", "🔚", "🔙", "🔛", "🔝", "🔜", "☑️", "🔘", "⚪️", "⚫️", "🔴", "🔵", "🔸", "🔹", "🔶", "🔷", "🔺", "▪️", "▫️", "⬛️", "⬜️", "🔻", "◼️", "◻️", "◾️", "◽️", "🔲", "🔳", "🔈", "🔉", "🔊", "🔇", "📣", "📢", "🔔", "🔕", "🃏", "🀄️", "♠️", "♣️", "♥️", "♦️", "🎴", "👁‍🗨", "💭", "🗯", "💬", "🕐", "🕑", "🕒", "🕓", "🕔", "🕕", "🕖", "🕗", "🕘", "🕙", "🕚", "🕛", "🕜", "🕝", "🕞", "🕟", "🕠", "🕡", "🕢", "🕣", "🕤", "🕥", "🕦", "🕧", "🛑", "🇦🇫", "🇦🇽", "🇦🇱", "🇩🇿", "🇦🇸", "🇦🇩", "🇦🇴", "🇦🇮", "🇦🇶", "🇦🇬", "🇦🇷", "🇦🇲", "🇦🇼", "🇦🇺", "🇦🇹", "🇦🇿", "🇧🇸", "🇧🇭", "🇧🇩", "🇧🇧", "🇧🇾", "🇧🇪", "🇧🇿", "🇧🇯", "🇧🇲", "🇧🇹", "🇧🇴", "🇧🇶", "🇧🇦", "🇧🇼", "🇧🇷", "🇮🇴", "🇻🇬", "🇧🇳", "🇧🇬", "🇧🇫", "🇧🇮", "🇨🇻", "🇰🇭", "🇨🇲", "🇨🇦", "🇮🇨", "🇰🇾", "🇨🇫", "🇹🇩", "🇨🇱", "🇨🇳", "🇨🇽", "🇨🇨", "🇨🇴", "🇰🇲", "🇨🇬", "🇨🇩", "🇨🇰", "🇨🇷", "🇭🇷", "🇨🇺", "🇨🇼", "🇨🇾", "🇨🇿", "🇩🇰", "🇩🇯", "🇩🇲", "🇩🇴", "🇪🇨", "🇪🇬", "🇸🇻", "🇬🇶", "🇪🇷", "🇪🇪", "🇪🇹", "🇪🇺", "🇫🇰", "🇫🇴", "🇫🇯", "🇫🇮", "🇫🇷", "🇬🇫", "🇵🇫", "🇹🇫", "🇬🇦", "🇬🇲", "🇬🇪", "🇩🇪", "🇬🇭", "🇬🇮", "🇬🇷", "🇬🇱", "🇬🇩", "🇬🇵", "🇬🇺", "🇬🇹", "🇬🇬", "🇬🇳", "🇬🇼", "🇬🇾", "🇭🇹", "🇭🇳", "🇭🇰", "🇭🇺", "🇮🇸", "🇮🇳", "🇮🇩", "🇮🇷", "🇮🇶", "🇮🇪", "🇮🇲", "🇮🇱", "🇮🇹", "🇨🇮", "🇯🇲", "🇯🇵", "🇯🇪", "🇯🇴", "🇰🇿", "🇰🇪", "🇰🇮", "🇽🇰", "🇰🇼", "🇰🇬", "🇱🇦", "🇱🇻", "🇱🇧", "🇱🇸", "🇱🇷", "🇱🇾", "🇱🇮", "🇱🇹", "🇱🇺", "🇲🇴", "🇲🇰", "🇲🇬", "🇲🇼", "🇲🇾", "🇲🇻", "🇲🇱", "🇲🇹", "🇲🇭", "🇲🇶", "🇲🇷", "🇲🇺", "🇾🇹", "🇲🇽", "🇫🇲", "🇲🇩", "🇲🇨", "🇲🇳", "🇲🇪", "🇲🇸", "🇲🇦", "🇲🇿", "🇲🇲", "🇳🇦", "🇳🇷", "🇳🇵", "🇳🇱", "🇳🇨", "🇳🇿", "🇳🇮", "🇳🇪", "🇳🇬", "🇳🇺", "🇳🇫", "🇲🇵", "🇰🇵", "🇳🇴", "🇴🇲", "🇵🇰", "🇵🇼", "🇵🇸", "🇵🇦", "🇵🇬", "🇵🇾", "🇵🇪", "🇵🇭", "🇵🇳", "🇵🇱", "🇵🇹", "🇵🇷", "🇶🇦", "🇷🇪", "🇷🇴", "🇷🇺", "🇷🇼", "🇧🇱", "🇸🇭", "🇰🇳", "🇱🇨", "🇵🇲", "🇻🇨", "🇼🇸", "🇸🇲", "🇸🇹", "🇸🇦", "🇸🇳", "🇷🇸", "🇸🇨", "🇸🇱", "🇸🇬", "🇸🇽", "🇸🇰", "🇸🇮", "🇸🇧", "🇸🇴", "🇿🇦", "🇬🇸", "🇰🇷", "🇸🇸", "🇪🇸", "🇱🇰", "🇸🇩", "🇸🇷", "🇸🇿", "🇸🇪", "🇨🇭", "🇸🇾", "🇹🇼", "🇹🇯", "🇹🇿", "🇹🇭", "🇹🇱", "🇹🇬", "🇹🇰", "🇹🇴", "🇹🇹", "🇹🇳", "🇹🇷", "🇹🇲", "🇹🇨", "🇹🇻", "🇺🇬", "🇺🇦", "🇦🇪", "🇬🇧", "🇺🇸", "🇻🇮", "🇺🇾", "🇺🇿", "🇻🇺", "🇻🇦", "🇻🇪", "🇻🇳", "🇼🇫", "🇪🇭", "🇾🇪", "🇿🇲", "🇿🇼"],
  emoji: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='20px' height='20px' viewBox='0 0 20 20' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Emoji</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='Keyboard/Light/Lower' sketch:type='MSLayerGroup' transform='translate(-60.000000, -181.000000)' fill='#030303'> <g id='Bottom-Row' transform='translate(3.000000, 170.000000)' sketch:type='MSShapeGroup'> <path d='M66.75,30.5 C72.1347763,30.5 76.5,26.1347763 76.5,20.75 C76.5,15.3652237 72.1347763,11 66.75,11 C61.3652237,11 57,15.3652237 57,20.75 C57,26.1347763 61.3652237,30.5 66.75,30.5 Z M66.75,29.5 C71.5824916,29.5 75.5,25.5824916 75.5,20.75 C75.5,15.9175084 71.5824916,12 66.75,12 C61.9175084,12 58,15.9175084 58,20.75 C58,25.5824916 61.9175084,29.5 66.75,29.5 Z M63.75,19 C64.4403559,19 65,18.4403559 65,17.75 C65,17.0596441 64.4403559,16.5 63.75,16.5 C63.0596441,16.5 62.5,17.0596441 62.5,17.75 C62.5,18.4403559 63.0596441,19 63.75,19 Z M69.75,19 C70.4403559,19 71,18.4403559 71,17.75 C71,17.0596441 70.4403559,16.5 69.75,16.5 C69.0596441,16.5 68.5,17.0596441 68.5,17.75 C68.5,18.4403559 69.0596441,19 69.75,19 Z M59.8876334,22.1641444 C59.6390316,21.383134 60.065918,20.9785156 60.8530951,21.2329304 C60.8530951,21.2329304 63.0937503,22.2125 66.7500001,22.2125 C70.4062499,22.2125 72.6469047,21.2329304 72.6469047,21.2329304 C73.4287162,20.9662153 73.8812463,21.4044097 73.6058477,22.1807437 C73.6058477,22.1807437 72.6,27.575 66.75,27.575 C60.9,27.575 59.8876334,22.1641444 59.8876334,22.1641444 Z M66.75,23.1875 C64.06875,23.1875 61.8544055,22.4737821 61.8544055,22.4737821 C61.3273019,22.32948 61.1781233,22.5721615 61.5639555,22.957075 C61.5639555,22.957075 62.3625,24.65 66.75,24.65 C71.1375,24.65 71.9508503,22.9438304 71.9508503,22.9438304 C72.3093659,22.5399278 72.1690793,22.3359844 71.6354273,22.476349 C71.6354273,22.476349 69.43125,23.1875 66.75,23.1875 Z' id='Emoji'></path> </g> </g> </g> </svg>",
  "delete": {
    on: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='24px' height='18px' viewBox='0 0 24 18' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Back</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='Keyboard/Light/Upper' sketch:type='MSLayerGroup' transform='translate(-339.000000, -130.000000)' fill='#030303'> <g id='Third-Row' transform='translate(3.000000, 118.000000)' sketch:type='MSShapeGroup'> <path d='M351.642663,20.9776903 L354.466795,18.1535585 C354.760106,17.8602476 354.763983,17.3814962 354.47109,17.088603 C354.176155,16.7936677 353.7014,16.7976328 353.406135,17.0928983 L350.582003,19.9170301 L347.757871,17.0928983 C347.46456,16.7995874 346.985809,16.7957097 346.692916,17.088603 C346.39798,17.3835382 346.401945,17.858293 346.697211,18.1535585 L349.521343,20.9776903 L346.697211,23.801822 C346.4039,24.0951329 346.400022,24.5738843 346.692916,24.8667776 C346.987851,25.1617128 347.462606,25.1577477 347.757871,24.8624822 L350.582003,22.0383504 L353.406135,24.8624822 C353.699445,25.1557931 354.178197,25.1596708 354.47109,24.8667776 C354.766025,24.5718423 354.76206,24.0970875 354.466795,23.801822 L351.642663,20.9776903 Z M337.059345,22.0593445 C336.474285,21.4742847 336.481351,20.5186489 337.059345,19.9406555 L343.789915,13.2100853 C344.182084,12.817916 344.94892,12.5 345.507484,12.5 L356.002098,12.5 C357.933936,12.5 359.5,14.0688477 359.5,16.0017983 L359.5,25.9982017 C359.5,27.9321915 357.923088,29.5 356.002098,29.5 L345.507484,29.5 C344.951066,29.5 344.177169,29.1771693 343.789915,28.7899148 L337.059345,22.0593445 Z' id='Back'></path> </g> </g> </g> </svg>",
    off: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='24px' height='18px' viewBox='0 0 24 18' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Back</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='Keyboard/Light/Upper' sketch:type='MSLayerGroup' transform='translate(-339.000000, -130.000000)' fill='#030303'> <g id='Third-Row' transform='translate(3.000000, 118.000000)' sketch:type='MSShapeGroup'> <path d='M337.059345,22.0593445 C336.474285,21.4742847 336.481351,20.5186489 337.059345,19.9406555 L343.789915,13.2100853 C344.182084,12.817916 344.94892,12.5 345.507484,12.5 L356.002098,12.5 C357.933936,12.5 359.5,14.0688477 359.5,16.0017983 L359.5,25.9982017 C359.5,27.9321915 357.923088,29.5 356.002098,29.5 L345.507484,29.5 C344.951066,29.5 344.177169,29.1771693 343.789915,28.7899148 L337.059345,22.0593445 Z M351.642663,20.9776903 L354.466795,18.1535585 C354.760106,17.8602476 354.763983,17.3814962 354.47109,17.088603 C354.176155,16.7936677 353.7014,16.7976328 353.406135,17.0928983 L350.582003,19.9170301 L347.757871,17.0928983 C347.46456,16.7995874 346.985809,16.7957097 346.692916,17.088603 C346.39798,17.3835382 346.401945,17.858293 346.697211,18.1535585 L349.521343,20.9776903 L346.697211,23.801822 C346.4039,24.0951329 346.400022,24.5738843 346.692916,24.8667776 C346.987851,25.1617128 347.462606,25.1577477 347.757871,24.8624822 L350.582003,22.0383504 L353.406135,24.8624822 C353.699445,25.1557931 354.178197,25.1596708 354.47109,24.8667776 C354.766025,24.5718423 354.76206,24.0970875 354.466795,23.801822 L351.642663,20.9776903 Z M338.70972,21.7097195 C338.317752,21.3177522 338.318965,20.6810349 338.70972,20.2902805 L344.643245,14.3567547 C344.840276,14.1597245 345.225639,14 345.493741,14 L355.997239,14 C357.103333,14 357.999999,14.8970601 357.999999,16.0058586 L357.999999,25.9941412 C357.999999,27.1019464 357.106457,27.9999999 355.997239,27.9999999 L345.493741,28 C345.221056,28 344.840643,27.8406431 344.643246,27.6432453 L338.70972,21.7097195 Z' id='Back'></path> </g> </g> </g> </svg>"
  },
  food: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='17px' height='16px' viewBox='0 0 17 17' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Food</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='iOS-9-Keyboards' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='iPhone-6-Portrait-Light-Copy' sketch:type='MSArtboardGroup' transform='translate(-148.000000, -637.000000)'> <g id='Keyboards' sketch:type='MSLayerGroup' transform='translate(0.000000, 408.000000)'> <g id='Food' transform='translate(149.500000, 229.500000)' sketch:type='MSShapeGroup'> <path d='M5.5,15.5 L1,15.5 L0,5 L6.5,5 L6.26360933,7.48210202' id='Drink' stroke='#4A5461'></path> <path d='M6.01077545,1.96930098 L6.51571352,5.22270539 L5.71908184,5.67947812 L5.0389009,1.96930098 L4.85557247,1.96930098 L4.85557247,0.96930098 L8.85557247,0.96930098 L8.85557247,1.96930098 L6.01077545,1.96930098 Z' id='Straw' fill='#4A5461' transform='translate(6.855572, 3.324390) rotate(24.000000) translate(-6.855572, -3.324390) '></path> <rect id='Bottom-Bun' stroke='#4A5461' x='3' y='14' width='10.5' height='1.5' rx='1'></rect> <path d='M1.5,12.5024408 C1.5,11.948808 1.94916916,11.5 2.49268723,11.5 L14.0073128,11.5 C14.5555588,11.5 15,11.9469499 15,12.5024408 L15,12.9975592 C15,13.551192 14.5508308,14 14.0073128,14 L2.49268723,14 C1.94444121,14 1.5,13.5530501 1.5,12.9975592 L1.5,12.5024408 Z M3.93300003,11.8392727 C3.41771834,11.6518976 3.44483697,11.5 3.9955775,11.5 L13.0044225,11.5 C13.5542648,11.5 13.5866061,11.6503251 13.067,11.8392727 L8.5,13.5 L3.93300003,11.8392727 Z' id='&quot;Patty&quot;' fill='#4A5461'></path> <path d='M2.5,10.5 L13.5,10.5 L15,11.5 L1,11.5 L2.5,10.5 Z' id='Cheese' fill='#4A5461'></path> <path d='M8.25,10.5 C11.4256373,10.5 14,10.3284271 14,9.5 C14,8.67157288 11.4256373,8 8.25,8 C5.07436269,8 2.5,8.67157288 2.5,9.5 C2.5,10.3284271 5.07436269,10.5 8.25,10.5 Z' id='Top-Bun' stroke='#4A5461' stroke-width='0.75'></path> </g> </g> </g> </g> </svg>",
  flags: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='11px' height='15px' viewBox='0 0 11 15' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Flag</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='iOS-9-Keyboards' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='iPhone-6-Portrait-Light-Copy' sketch:type='MSArtboardGroup' transform='translate(-275.000000, -639.000000)'> <g id='Keyboards' sketch:type='MSLayerGroup' transform='translate(0.000000, 408.000000)'> <g id='Flag' transform='translate(275.000000, 231.500000)' sketch:type='MSShapeGroup'> <rect id='Pole' fill='#4A5461' x='0' y='0' width='1' height='14'></rect> <path d='M1,1 C1,1 1.25,2 3.5,2 C5.75,2 6,0.749999998 8,0.75 C10,0.749999998 10,1.5 10,1.5 L10,7.5 C10,7.5 10,6.5 8,6.5 C6,6.5 4.80623911,8 3.5,8 C2.19376089,8 1,7 1,7 L1,1 Z' stroke='#4A5461' stroke-linejoin='round'></path> </g> </g> </g> </g> </svg>",
  frequent: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='17px' height='16px' viewBox='0 0 17 16' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Recent</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='iOS-9-Keyboards' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='iPhone-6-Portrait-Light-Copy' sketch:type='MSArtboardGroup' transform='translate(-55.000000, -638.000000)'> <g id='Keyboards' sketch:type='MSLayerGroup' transform='translate(0.000000, 408.000000)'> <g id='Recent' transform='translate(55.500000, 230.000000)' sketch:type='MSShapeGroup'> <circle id='Body' stroke='#4A5461' cx='8' cy='8' r='8'></circle> <path d='M7.5,7.5 L7.5,8.5 L8.5,8.5 L8.5,2 L7.5,2 L7.5,7.5 L4,7.5 L4,8.5 L8.5,8.5 L8.5,7.5 L7.5,7.5 Z' id='Hands' fill='#4A5461'></path> </g> </g> </g> </g> </svg>",
  keyboard: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='32.5px' height='23.5px' viewBox='0 0 65 47' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.6.1 (26313) - http://www.bohemiancoding.com/sketch --> <title>Shape</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='iPad-Portrait' transform='translate(-1436.000000, -1956.000000)' fill='#000000'> <g id='Keyboard-Light' transform='translate(0.000000, 1422.000000)'> <g id='Keyboard-down' transform='translate(1412.000000, 500.000000)'> <path d='M87.001332,34 C88.1051659,34 89,34.8997127 89,35.9932874 L89,61.0067126 C89,62.1075748 88.1058759,63 87.001332,63 L25.998668,63 C24.8948341,63 24,62.1002873 24,61.0067126 L24,35.9932874 C24,34.8924252 24.8941241,34 25.998668,34 L87.001332,34 Z M26,36 L26,61 L87,61 L87,36 L26,36 Z M79,40 L83,40 L83,44 L79,44 L79,40 Z M72,40 L76,40 L76,44 L72,44 L72,40 Z M65,40 L69,40 L69,44 L65,44 L65,40 Z M58,40 L62,40 L62,44 L58,44 L58,40 Z M51,40 L55,40 L55,44 L51,44 L51,40 Z M44,40 L48,40 L48,44 L44,44 L44,40 Z M37,40 L41,40 L41,44 L37,44 L37,40 Z M30,40 L34,40 L34,44 L30,44 L30,40 Z M79,47 L83,47 L83,51 L79,51 L79,47 Z M72,47 L76,47 L76,51 L72,51 L72,47 Z M65,47 L69,47 L69,51 L65,51 L65,47 Z M58,47 L62,47 L62,51 L58,51 L58,47 Z M51,47 L55,47 L55,51 L51,51 L51,47 Z M44,47 L48,47 L48,51 L44,51 L44,47 Z M37,47 L41,47 L41,51 L37,51 L37,47 Z M30,47 L34,47 L34,51 L30,51 L30,47 Z M79,54 L83,54 L83,58 L79,58 L79,54 Z M72,54 L76,54 L76,58 L72,58 L72,54 Z M44,54 L69,54 L69,58 L44,58 L44,54 Z M37,54 L41,54 L41,58 L37,58 L37,54 Z M30,54 L34,54 L34,58 L30,58 L30,54 Z M44.3163498,69.9771047 C43.3684225,70.5420342 43.3338721,71.5096495 44.2378217,72.1373912 L55.3621539,79.8626088 C56.2667113,80.4907726 57.7338965,80.4903505 58.6378461,79.8626088 L69.7621783,72.1373912 C70.6667357,71.5092274 70.648012,70.5205204 69.7115187,69.9234166 L69.9825731,70.0962396 C69.5181333,69.800115 68.7782557,69.8126493 68.3261307,70.1269323 L57.8154999,77.4331263 C57.3651117,77.746202 56.628165,77.7381786 56.1762103,77.4199424 L45.8386137,70.1408977 C45.3836472,69.8205407 44.6375039,69.7857088 44.1566393,70.0722862 L44.3163498,69.9771047 Z' id='Shape'></path> </g> </g> </g> </g> </svg>",
  keyPopUp: {
    light: {
      "iphone-5": "<svg width='55px' height='92px' viewBox='53 316 55 92' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.7.2 (28276) - http://www.bohemiancoding.com/sketch --> <desc>Created with Sketch.</desc> <defs> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-1'> <feOffset dx='0' dy='1' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feGaussianBlur stdDeviation='1.5' in='shadowOffsetOuter1' result='shadowBlurOuter1'></feGaussianBlur> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.4 0' type='matrix' in='shadowBlurOuter1' result='shadowMatrixOuter1'></feColorMatrix> <feMerge> <feMergeNode in='shadowMatrixOuter1'></feMergeNode> <feMergeNode in='SourceGraphic'></feMergeNode> </feMerge> </filter> <path d='M1.34173231,40.9391701 C0.517466128,40.20589 0,39.1374251 0,37.9477635 L0,4.00345598 C0,1.78917136 1.79528248,0 4.00987566,0 L44.9901243,0 C47.2125608,0 49,1.7924083 49,4.00345598 L49,37.9477635 C49,38.9124051 48.6592798,39.7963659 48.0916041,40.4868665 C48.0414233,40.9032289 47.7111888,41.4074672 47.0825908,41.95225 C47.0825908,41.95225 38.5299145,49.0643362 38.5299145,51.1526424 C38.5299145,61.6497561 38.1770099,82.0025406 38.1770099,82.0025406 C38.1412304,84.2024354 36.3210284,86 34.1128495,86 L15.3059539,86 C13.10796,86 11.2781884,84.2100789 11.2417936,82.0020993 C11.2417936,82.0020993 10.8888889,61.6470852 10.8888889,51.1486361 C10.8888889,49.0616654 2.34143662,42.238655 2.34143662,42.238655 C1.77827311,41.7641365 1.44881354,41.3204237 1.34173231,40.9391701 Z' id='path-2'></path> <mask id='mask-3' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='0' y='0' width='49' height='86' fill='white'> <use xlink:href='#path-2'></use> </mask> </defs> <g id='Popover' filter='url(#filter-1)' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' transform='translate(56.000000, 318.000000)'> <use id='Rectangle-14' stroke='#B2B4B9' mask='url(#mask-3)' fill='#FCFCFC' xlink:href='#path-2'></use> </g> </svg>",
      "iphone-6s": "<svg width='64px' height='107px' viewBox='24 387 64 107' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.7.2 (28276) - http://www.bohemiancoding.com/sketch --> <desc>Created with Sketch.</desc> <defs> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-1'> <feOffset dx='0' dy='1' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feGaussianBlur stdDeviation='1.5' in='shadowOffsetOuter1' result='shadowBlurOuter1'></feGaussianBlur> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.4 0' type='matrix' in='shadowBlurOuter1' result='shadowMatrixOuter1'></feColorMatrix> <feMerge> <feMergeNode in='shadowMatrixOuter1'></feMergeNode> <feMergeNode in='SourceGraphic'></feMergeNode> </feMerge> </filter> <path d='M1.48647646,48.3779947 C0.58026649,47.6464296 0,46.529587 0,45.2781948 L0,3.99009787 C0,1.7825912 1.79509577,0 4.00945862,0 L53.9905414,0 C56.2005746,0 58,1.78642767 58,3.99009787 L58,45.2781948 C58,46.1833004 57.6982258,47.0169733 57.1895097,47.6856325 C57.0396865,48.0212497 56.7360098,48.3972834 56.2718363,48.7950661 C56.2718363,48.7950661 45.6068376,57.6220693 45.6068376,60.0746149 C45.6068376,72.4026205 45.177967,96.9923164 45.177967,96.9923164 C45.1413748,99.2122214 43.3193065,101 41.1090035,101 L17.386723,101 C15.1812722,101 13.354683,99.2055009 13.3177595,96.9918741 C13.3177595,96.9918741 12.8888889,72.3994838 12.8888889,60.0699099 C12.8888889,57.6189326 2.22673437,49.1462936 2.22673437,49.1462936 C1.90524087,48.8788327 1.65911655,48.620733 1.48647646,48.3779947 Z' id='path-2'></path> <mask id='mask-3' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='0' y='0' width='58' height='101' fill='white'> <use xlink:href='#path-2'></use> </mask> </defs> <g id='Popover' filter='url(#filter-1)' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' transform='translate(27.000000, 389.000000)'> <use id='Rectangle-14' stroke='#B2B4B9' mask='url(#mask-3)' fill='#FCFCFC' xlink:href='#path-2'></use> </g> </svg>",
      "iphone-6s-plus": "<svg width='70px' height='119px' viewBox='28 450 70 119' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.7.2 (28276) - http://www.bohemiancoding.com/sketch --> <desc>Created with Sketch.</desc> <defs> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-1'> <feOffset dx='0' dy='1' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feGaussianBlur stdDeviation='1.5' in='shadowOffsetOuter1' result='shadowBlurOuter1'></feGaussianBlur> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.4 0' type='matrix' in='shadowBlurOuter1' result='shadowMatrixOuter1'></feColorMatrix> <feMerge> <feMergeNode in='shadowMatrixOuter1'></feMergeNode> <feMergeNode in='SourceGraphic'></feMergeNode> </feMerge> </filter> <path d='M1.95729395,54.0728304 C0.785911132,53.3757699 0,52.098776 0,50.6389022 L0,3.99524419 C0,1.78671428 1.79242202,0 4.00348663,0 L59.9965134,0 C62.2046235,0 64,1.78873175 64,3.99524419 L64,50.6389022 C64,51.9233686 63.3937116,53.0651556 62.451391,53.795754 C62.4427752,53.8032433 62.4341019,53.8107404 62.4253709,53.8182454 C62.4253709,53.8182454 50.3247863,63.8977402 50.3247863,66.6173947 C50.3247863,80.2880544 49.8443049,108.002007 49.8443049,108.002007 C49.8079665,110.210234 47.9874232,112 45.7789089,112 L18.7680997,112 C16.5534397,112 14.7394456,110.20984 14.7027037,108.001566 C14.7027037,108.001566 14.2222222,80.2845761 14.2222222,66.6121773 C14.2222222,63.8942619 2.14081422,54.2321337 2.14081422,54.2321337 C2.07664913,54.1786298 2.01548111,54.1255134 1.95729395,54.0728304 Z' id='path-2'></path> <mask id='mask-3' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='0' y='0' width='64' height='112' fill='white'> <use xlink:href='#path-2'></use> </mask> </defs> <g id='Popover' filter='url(#filter-1)' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' transform='translate(31.000000, 452.000000)'> <use id='Rectangle-14' stroke='#B2B4B9' mask='url(#mask-3)' fill='#FCFCFC' xlink:href='#path-2'></use> </g> </svg>"
    },
    dark: {
      "iphone-5": "<svg width='55px' height='92px' viewBox='53 316 55 92' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.7.2 (28276) - http://www.bohemiancoding.com/sketch --> <desc>Created with Sketch.</desc> <defs> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-1'> <feOffset dx='0' dy='1' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feGaussianBlur stdDeviation='1.5' in='shadowOffsetOuter1' result='shadowBlurOuter1'></feGaussianBlur> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.4 0' type='matrix' in='shadowBlurOuter1' result='shadowMatrixOuter1'></feColorMatrix> <feMerge> <feMergeNode in='shadowMatrixOuter1'></feMergeNode> <feMergeNode in='SourceGraphic'></feMergeNode> </feMerge> </filter> <path d='M1.34173231,40.9391701 C0.517466128,40.20589 0,39.1374251 0,37.9477635 L0,4.00345598 C0,1.78917136 1.79528248,0 4.00987566,0 L44.9901243,0 C47.2125608,0 49,1.7924083 49,4.00345598 L49,37.9477635 C49,38.9124051 48.6592798,39.7963659 48.0916041,40.4868665 C48.0414233,40.9032289 47.7111888,41.4074672 47.0825908,41.95225 C47.0825908,41.95225 38.5299145,49.0643362 38.5299145,51.1526424 C38.5299145,61.6497561 38.1770099,82.0025406 38.1770099,82.0025406 C38.1412304,84.2024354 36.3210284,86 34.1128495,86 L15.3059539,86 C13.10796,86 11.2781884,84.2100789 11.2417936,82.0020993 C11.2417936,82.0020993 10.8888889,61.6470852 10.8888889,51.1486361 C10.8888889,49.0616654 2.34143662,42.238655 2.34143662,42.238655 C1.77827311,41.7641365 1.44881354,41.3204237 1.34173231,40.9391701 Z' id='path-2'></path> <mask id='mask-3' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='0' y='0' width='49' height='86' fill='white'> <use xlink:href='#path-2'></use> </mask> </defs> <g id='Popover' filter='url(#filter-1)' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' transform='translate(56.000000, 318.000000)'> <use id='Rectangle-14' stroke='#636363' mask='url(#mask-3)' fill='#636363' xlink:href='#path-2'></use> </g> </svg>",
      "iphone-6s": "<svg width='64px' height='107px' viewBox='24 387 64 107' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.7.2 (28276) - http://www.bohemiancoding.com/sketch --> <desc>Created with Sketch.</desc> <defs> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-1'> <feOffset dx='0' dy='1' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feGaussianBlur stdDeviation='1.5' in='shadowOffsetOuter1' result='shadowBlurOuter1'></feGaussianBlur> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.4 0' type='matrix' in='shadowBlurOuter1' result='shadowMatrixOuter1'></feColorMatrix> <feMerge> <feMergeNode in='shadowMatrixOuter1'></feMergeNode> <feMergeNode in='SourceGraphic'></feMergeNode> </feMerge> </filter> <path d='M1.48647646,48.3779947 C0.58026649,47.6464296 0,46.529587 0,45.2781948 L0,3.99009787 C0,1.7825912 1.79509577,0 4.00945862,0 L53.9905414,0 C56.2005746,0 58,1.78642767 58,3.99009787 L58,45.2781948 C58,46.1833004 57.6982258,47.0169733 57.1895097,47.6856325 C57.0396865,48.0212497 56.7360098,48.3972834 56.2718363,48.7950661 C56.2718363,48.7950661 45.6068376,57.6220693 45.6068376,60.0746149 C45.6068376,72.4026205 45.177967,96.9923164 45.177967,96.9923164 C45.1413748,99.2122214 43.3193065,101 41.1090035,101 L17.386723,101 C15.1812722,101 13.354683,99.2055009 13.3177595,96.9918741 C13.3177595,96.9918741 12.8888889,72.3994838 12.8888889,60.0699099 C12.8888889,57.6189326 2.22673437,49.1462936 2.22673437,49.1462936 C1.90524087,48.8788327 1.65911655,48.620733 1.48647646,48.3779947 Z' id='path-2'></path> <mask id='mask-3' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='0' y='0' width='58' height='101' fill='white'> <use xlink:href='#path-2'></use> </mask> </defs> <g id='Popover' filter='url(#filter-1)' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' transform='translate(27.000000, 389.000000)'> <use id='Rectangle-14' stroke='##636363' mask='url(#mask-3)' fill='#636363' xlink:href='#path-2'></use> </g> </svg>",
      "iphone-6s-plus": "<svg width='70px' height='119px' viewBox='28 450 70 119' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.7.2 (28276) - http://www.bohemiancoding.com/sketch --> <desc>Created with Sketch.</desc> <defs> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-1'> <feOffset dx='0' dy='1' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feGaussianBlur stdDeviation='1.5' in='shadowOffsetOuter1' result='shadowBlurOuter1'></feGaussianBlur> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.4 0' type='matrix' in='shadowBlurOuter1' result='shadowMatrixOuter1'></feColorMatrix> <feMerge> <feMergeNode in='shadowMatrixOuter1'></feMergeNode> <feMergeNode in='SourceGraphic'></feMergeNode> </feMerge> </filter> <path d='M1.95729395,54.0728304 C0.785911132,53.3757699 0,52.098776 0,50.6389022 L0,3.99524419 C0,1.78671428 1.79242202,0 4.00348663,0 L59.9965134,0 C62.2046235,0 64,1.78873175 64,3.99524419 L64,50.6389022 C64,51.9233686 63.3937116,53.0651556 62.451391,53.795754 C62.4427752,53.8032433 62.4341019,53.8107404 62.4253709,53.8182454 C62.4253709,53.8182454 50.3247863,63.8977402 50.3247863,66.6173947 C50.3247863,80.2880544 49.8443049,108.002007 49.8443049,108.002007 C49.8079665,110.210234 47.9874232,112 45.7789089,112 L18.7680997,112 C16.5534397,112 14.7394456,110.20984 14.7027037,108.001566 C14.7027037,108.001566 14.2222222,80.2845761 14.2222222,66.6121773 C14.2222222,63.8942619 2.14081422,54.2321337 2.14081422,54.2321337 C2.07664913,54.1786298 2.01548111,54.1255134 1.95729395,54.0728304 Z' id='path-2'></path> <mask id='mask-3' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='0' y='0' width='64' height='112' fill='white'> <use xlink:href='#path-2'></use> </mask> </defs> <g id='Popover' filter='url(#filter-1)' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' transform='translate(31.000000, 452.000000)'> <use id='Rectangle-14' stroke='#636363' mask='url(#mask-3)' fill='#636363' xlink:href='#path-2'></use> </g> </svg>"
    }
  },
  objects: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='11px' height='16px' viewBox='0 0 11 16' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Lightbulb</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='iPhone-6' sketch:type='MSArtboardGroup' transform='translate(-244.000000, -639.000000)' stroke='#4A5361'> <g id='Lightbulb' sketch:type='MSLayerGroup' transform='translate(244.000000, 639.000000)'> <path d='M8,10.4002904 C9.78083795,9.48993491 11,7.63734273 11,5.5 C11,2.46243388 8.53756612,0 5.5,0 C2.46243388,0 0,2.46243388 0,5.5 C0,7.63734273 1.21916205,9.48993491 3,10.4002904 L3,14.0020869 C3,15.1017394 3.89761602,16 5.0048815,16 L5.9951185,16 C7.1061002,16 8,15.1055038 8,14.0020869 L8,10.4002904 Z' id='Oval-17' sketch:type='MSShapeGroup'></path> <rect id='Rectangle-50' sketch:type='MSShapeGroup' x='3' y='12' width='5' height='1'></rect> <rect id='Rectangle-51' sketch:type='MSShapeGroup' x='4' y='13.5' width='1.5' height='1'></rect> <path d='M5,8.5 C5,8.5 3.49999999,7.50000001 4,7 C4.50000001,6.49999999 5,7.66666667 5.5,8 C5.5,8 6.5,6.50000001 7,7 C7.5,7.49999999 6,8.5 6,8.5 L6,11 L5,11 L5,8.5 Z' id='Rectangle-52' sketch:type='MSShapeGroup'></path> </g> </g> </g> </svg>",
  shift: {
    on: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='20px' height='18px' viewBox='0 0 20 17' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Shift</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='Keyboard/Light/Upper' sketch:type='MSLayerGroup' transform='translate(-14.000000, -130.000000)' fill='#030303'> <g id='Third-Row' transform='translate(3.000000, 118.000000)' sketch:type='MSShapeGroup'> <path d='M21.7052388,13.2052388 C21.3157462,12.8157462 20.6857559,12.8142441 20.2947612,13.2052388 L11.9160767,21.5839233 C11.1339991,22.3660009 11.3982606,23 12.4979131,23 L16.5,23 L16.5,28.009222 C16.5,28.5564136 16.9463114,29 17.4975446,29 L24.5024554,29 C25.053384,29 25.5,28.5490248 25.5,28.009222 L25.5,23 L29.5020869,23 C30.6055038,23 30.866824,22.366824 30.0839233,21.5839233 L21.7052388,13.2052388 Z' id='Shift'></path> </g> </g> </g> </svg>",
    off: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='20px' height='18px' viewBox='0 0 20 19' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Shift</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='Keyboard/Light/Lower' sketch:type='MSLayerGroup' transform='translate(-14.000000, -129.000000)' fill='#030303'> <g id='Third-Row' transform='translate(3.000000, 118.000000)' sketch:type='MSShapeGroup'> <path d='M21.6719008,12.2325898 C21.301032,11.8279916 20.6946892,11.8334731 20.3288195,12.2325898 L11.6947023,21.6512983 C10.7587441,22.672308 11.1285541,23.5 12.5097751,23.5 L15.9999999,23.5000002 L15.9999999,28.0014241 C15.9999999,28.8290648 16.6716559,29.5000001 17.497101,29.5000001 L24.5028992,29.5000001 C25.3297253,29.5000001 26.0000003,28.8349703 26.0000003,28.0014241 L26.0000003,23.5000001 L29.4902251,23.5000002 C30.8763357,23.5000002 31.2439521,22.6751916 30.3054161,21.6512985 L21.6719008,12.2325898 Z M21.341748,14.3645316 C21.1530056,14.1632064 20.8433515,14.1670914 20.6582514,14.3645316 L13.5,21.9999998 L17.5000001,21.9999999 L17.5000002,27.5089956 C17.5000002,27.7801703 17.7329027,28.0000008 18.0034229,28.0000008 L23.996577,28.0000008 C24.2746097,28.0000008 24.4999997,27.7721203 24.4999997,27.5089956 L24.4999997,21.9999999 L28.5,21.9999999 L21.341748,14.3645316 Z' id='Shift'></path> </g> </g> </g> </svg>"
  },
  messages_app: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='60px' height='60px' viewBox='0 0 60 60' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 39.1 (31720) - http://www.bohemiancoding.com/sketch --> <title>Messages Copy</title> <desc>Created with Sketch.</desc> <defs> <linearGradient x1='50%' y1='0%' x2='50%' y2='100%' id='linearGradient-1'> <stop stop-color='#66FD7F' offset='0%'></stop> <stop stop-color='#09B826' offset='100%'></stop> </linearGradient> </defs> <g id='iOS-Kit' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Home-Screen' transform='translate(-1452.000000, -853.000000)'> <g id='Home-Screen-•-iPhone-6s-Plus' transform='translate(1417.000000, 812.000000)'> <g id='Messages-Copy' transform='translate(35.000000, 41.000000)'> <rect id='BG' fill='url(#linearGradient-1)' x='0' y='0' width='60' height='60' rx='14'></rect> <path d='M19.4223976,44.3088006 C13.1664228,41.1348949 9,35.4655421 9,29 C9,19.0588745 18.8497355,11 31,11 C43.1502645,11 53,19.0588745 53,29 C53,38.9411255 43.1502645,47 31,47 C28.6994588,47 26.4813914,46.7110897 24.3970409,46.1751953 C23.9442653,46.8838143 21.9065377,49.5 16.5,49.5 C15.6150187,49.5 17.1834749,48.5915921 18,47.5 C18.7894286,46.4446326 19.2505625,44.9480362 19.4223976,44.3088006 Z' id='Bubble' fill='#FFFFFF'></path> </g> </g> </g> </g> </svg>",
  calendar_app: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='60px' height='60px' viewBox='0 0 60 60' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 39.1 (31720) - http://www.bohemiancoding.com/sketch --> <title>Calendar</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Home-Screen-•-iPhone-SE' transform='translate(-92.000000, -27.000000)'> <g id='Home-Screen-•-iPhone-6s-Copy' transform='translate(0.000000, 27.000000)'> <g id='Calendar' transform='translate(92.000000, 0.000000)'> <rect id='BG' fill='#FFFFFF' x='0' y='0' width='60' height='60' rx='14'></rect> <text id='25' font-family='SFUIDisplay-Ultralight, SF UI Display' font-size='40' font-weight='200' letter-spacing='0.379999995' fill='#000000'> <tspan x='7.10828125' y='49'>25</tspan> </text> <text id='Monday' font-family='SFUIDisplay-Medium, SF UI Display' font-size='11' font-weight='400' letter-spacing='0.379999995' fill='#FF3B30'> <tspan x='9.02992189' y='15'>Monday</tspan> </text> </g> </g> </g> </g> </svg>",
  photos_app: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='60px' height='60px' viewBox='0 0 60 60' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 39.1 (31720) - http://www.bohemiancoding.com/sketch --> <title>Photos</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Home-Screen-•-iPhone-SE' transform='translate(-168.000000, -27.000000)'> <g id='Home-Screen-•-iPhone-6s-Copy' transform='translate(0.000000, 27.000000)'> <g id='Photos' transform='translate(168.000000, 0.000000)'> <rect id='BG' fill='#FFFFFF' x='0' y='0' width='60' height='60' rx='14'></rect> <rect id='Pedal' fill='#F26E64' style='mix-blend-mode: multiply;' transform='translate(20.142136, 20.142136) rotate(45.000000) translate(-20.142136, -20.142136) ' x='8.14213562' y='12.1421356' width='24' height='16' rx='8'></rect> <rect id='Pedal' fill='#F0E22A' style='mix-blend-mode: multiply;' transform='translate(39.142136, 19.142136) rotate(135.000000) translate(-39.142136, -19.142136) ' x='27.1421356' y='11.1421356' width='24' height='16' rx='8'></rect> <rect id='Pedal' fill='#D288B1' style='mix-blend-mode: multiply;' x='4' y='22' width='24' height='16' rx='8'></rect> <rect id='Pedal' fill='#FBAD31' style='mix-blend-mode: multiply;' transform='translate(30.000000, 16.000000) rotate(90.000000) translate(-30.000000, -16.000000) ' x='18' y='8' width='24' height='16' rx='8'></rect> <rect id='Pedal' fill='#A58EC2' style='mix-blend-mode: multiply;' transform='translate(20.142136, 40.142136) scale(1, -1) rotate(45.000000) translate(-20.142136, -40.142136) ' x='8.14213562' y='32.1421356' width='24' height='16' rx='8'></rect> <rect id='Pedal' fill='#6CC199' style='mix-blend-mode: multiply;' transform='translate(40.142136, 40.142136) scale(1, -1) rotate(135.000000) translate(-40.142136, -40.142136) ' x='28.1421356' y='32.1421356' width='24' height='16' rx='8'></rect> <rect id='Pedal' fill='#77AEDD' style='mix-blend-mode: multiply;' transform='translate(30.000000, 44.000000) scale(1, -1) rotate(90.000000) translate(-30.000000, -44.000000) ' x='18' y='36' width='24' height='16' rx='8'></rect> <rect id='Pedal' fill='#B5D655' style='mix-blend-mode: multiply;' transform='translate(44.000000, 30.000000) rotate(180.000000) translate(-44.000000, -30.000000) ' x='32' y='22' width='24' height='16' rx='8'></rect> </g> </g> </g> </g> </svg>",
  camera_app: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='60px' height='60px' viewBox='0 0 60 60' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 39.1 (31720) - http://www.bohemiancoding.com/sketch --> <title>Camera</title> <desc>Created with Sketch.</desc> <defs> <linearGradient x1='50%' y1='0%' x2='50%' y2='100%' id='linearGradient-1'> <stop stop-color='#DBDDDE' offset='0%'></stop> <stop stop-color='#898B91' offset='100%'></stop> </linearGradient> <linearGradient x1='50%' y1='0%' x2='50%' y2='100%' id='linearGradient-2'> <stop stop-color='#474747' offset='0%'></stop> <stop stop-color='#2B2B2B' offset='100%'></stop> </linearGradient> <path d='M9,20 L51,20 L51,42 L9,42 L9,20 Z M9,42.9975722 C9,44.3795877 10.1199653,45.5 11.5015125,45.5 L48.4984875,45.5 C49.8766015,45.5 51,44.3796249 51,42.9975722 L51,42.5 L9,42.5 L9,42.9975722 Z M9,19.5 L9,19.0024278 C9,17.6203751 10.1233985,16.5 11.5015125,16.5 L17.5304496,16.5 C18.4572011,16.4180186 19.3218208,16.2416313 19.9205322,15.8902588 C21.8326425,14.7680772 21.9641113,11.5 24.996205,11.5 L30.026083,11.5 L35.0559611,11.5 C38.0880548,11.5 38.2195236,14.7680772 40.1316339,15.8902588 C40.7303453,16.2416313 41.594965,16.4180186 42.5217165,16.5 L48.4984875,16.5 C49.8800347,16.5 51,17.6204123 51,19.0024278 L51,19.5 L9,19.5 L9,19.5 Z M39.25,31 C39.25,25.8913661 35.1086339,21.75 30,21.75 C24.8913661,21.75 20.75,25.8913661 20.75,31 C20.75,36.1086339 24.8913661,40.25 30,40.25 C35.1086339,40.25 39.25,36.1086339 39.25,31 L39.25,31 Z M22.25,31 C22.25,26.7197932 25.7197932,23.25 30,23.25 C34.2802068,23.25 37.75,26.7197932 37.75,31 C37.75,35.2802068 34.2802068,38.75 30,38.75 C25.7197932,38.75 22.25,35.2802068 22.25,31 L22.25,31 Z' id='path-3'></path> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-4'> <feOffset dx='0' dy='1' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feColorMatrix values='0 0 0 0 1   0 0 0 0 1   0 0 0 0 1  0 0 0 0.5 0' type='matrix' in='shadowOffsetOuter1'></feColorMatrix> </filter> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-5'> <feGaussianBlur stdDeviation='1' in='SourceAlpha' result='shadowBlurInner1'></feGaussianBlur> <feOffset dx='0' dy='1' in='shadowBlurInner1' result='shadowOffsetInner1'></feOffset> <feComposite in='shadowOffsetInner1' in2='SourceAlpha' operator='arithmetic' k2='-1' k3='1' result='shadowInnerInner1'></feComposite> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.3 0' type='matrix' in='shadowInnerInner1' result='shadowMatrixInner1'></feColorMatrix> <feGaussianBlur stdDeviation='0.5' in='SourceAlpha' result='shadowBlurInner2'></feGaussianBlur> <feOffset dx='0' dy='1' in='shadowBlurInner2' result='shadowOffsetInner2'></feOffset> <feComposite in='shadowOffsetInner2' in2='SourceAlpha' operator='arithmetic' k2='-1' k3='1' result='shadowInnerInner2'></feComposite> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.3 0' type='matrix' in='shadowInnerInner2' result='shadowMatrixInner2'></feColorMatrix> <feGaussianBlur stdDeviation='0.5' in='SourceAlpha' result='shadowBlurInner3'></feGaussianBlur> <feOffset dx='0' dy='0' in='shadowBlurInner3' result='shadowOffsetInner3'></feOffset> <feComposite in='shadowOffsetInner3' in2='SourceAlpha' operator='arithmetic' k2='-1' k3='1' result='shadowInnerInner3'></feComposite> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.3 0' type='matrix' in='shadowInnerInner3' result='shadowMatrixInner3'></feColorMatrix> <feGaussianBlur stdDeviation='0.5' in='SourceAlpha' result='shadowBlurInner4'></feGaussianBlur> <feOffset dx='-0' dy='0' in='shadowBlurInner4' result='shadowOffsetInner4'></feOffset> <feComposite in='shadowOffsetInner4' in2='SourceAlpha' operator='arithmetic' k2='-1' k3='1' result='shadowInnerInner4'></feComposite> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.3 0' type='matrix' in='shadowInnerInner4' result='shadowMatrixInner4'></feColorMatrix> <feMerge> <feMergeNode in='shadowMatrixInner1'></feMergeNode> <feMergeNode in='shadowMatrixInner2'></feMergeNode> <feMergeNode in='shadowMatrixInner3'></feMergeNode> <feMergeNode in='shadowMatrixInner4'></feMergeNode> </feMerge> </filter> <path d='M13,15.25 C13,14.8357864 13.3355947,14.5 13.7508378,14.5 L15.7491622,14.5 C16.1638385,14.5 16.5,14.8328986 16.5,15.25 L16.5,16 L13,16 L13,15.25 L13,15.25 Z' id='path-6'></path> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-7'> <feOffset dx='0' dy='0' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feColorMatrix values='0 0 0 0 1   0 0 0 0 1   0 0 0 0 1  0 0 0 0.5 0' type='matrix' in='shadowOffsetOuter1'></feColorMatrix> </filter> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-8'> <feOffset dx='0' dy='1' in='SourceAlpha' result='shadowOffsetInner1'></feOffset> <feComposite in='shadowOffsetInner1' in2='SourceAlpha' operator='arithmetic' k2='-1' k3='1' result='shadowInnerInner1'></feComposite> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0' type='matrix' in='shadowInnerInner1'></feColorMatrix> </filter> <circle id='path-9' cx='39.5' cy='23' r='1'></circle> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-10'> <feOffset dx='0' dy='0' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0' type='matrix' in='shadowOffsetOuter1'></feColorMatrix> </filter> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-11'> <feGaussianBlur stdDeviation='0.5' in='SourceAlpha' result='shadowBlurInner1'></feGaussianBlur> <feOffset dx='0' dy='0' in='shadowBlurInner1' result='shadowOffsetInner1'></feOffset> <feComposite in='shadowOffsetInner1' in2='SourceAlpha' operator='arithmetic' k2='-1' k3='1' result='shadowInnerInner1'></feComposite> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.3 0' type='matrix' in='shadowInnerInner1'></feColorMatrix> </filter> </defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Home-Screen-•-iPhone-SE' transform='translate(-244.000000, -27.000000)'> <g id='Home-Screen-•-iPhone-6s-Copy' transform='translate(0.000000, 27.000000)'> <g id='Camera' transform='translate(244.000000, 0.000000)'> <g id='icon'> <path d='M39.0815,0 C45.105,0 48.116,0 51.3585,1.025 C54.8985,2.3135 57.6865,5.1015 58.975,8.6415 C60,11.8835 60,14.8955 60,20.9185 L60,39.0815 C60,45.105 60,48.116 58.975,51.3585 C57.6865,54.8985 54.8985,57.6865 51.3585,58.9745 C48.116,60 45.105,60 39.0815,60 L20.9185,60 C14.895,60 11.8835,60 8.6415,58.9745 C5.1015,57.6865 2.3135,54.8985 1.025,51.3585 C0,48.116 0,45.105 0,39.0815 L0,20.9185 C0,14.8955 0,11.8835 1.025,8.6415 C2.3135,5.1015 5.1015,2.3135 8.6415,1.025 C11.8835,0 14.895,0 20.9185,0 L39.0815,0 Z' id='Icon' fill='url(#linearGradient-1)'></path> <g id='Camera'> <use fill='black' fill-opacity='1' filter='url(#filter-4)' xlink:href='#path-3'></use> <use fill='url(#linearGradient-2)' fill-rule='evenodd' xlink:href='#path-3'></use> <use fill='black' fill-opacity='1' filter='url(#filter-5)' xlink:href='#path-3'></use> </g> <g id='Path'> <use fill='black' fill-opacity='1' filter='url(#filter-7)' xlink:href='#path-6'></use> <use fill='url(#linearGradient-2)' fill-rule='evenodd' xlink:href='#path-6'></use> <use fill='black' fill-opacity='1' filter='url(#filter-8)' xlink:href='#path-6'></use> </g> <g id='Oval-16'> <use fill='black' fill-opacity='1' filter='url(#filter-10)' xlink:href='#path-9'></use> <use fill='#FFC209' fill-rule='evenodd' xlink:href='#path-9'></use> <use fill='black' fill-opacity='1' filter='url(#filter-11)' xlink:href='#path-9'></use> </g> </g> </g> </g> </g> </g> </svg>",
  weather_app: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='60px' height='60px' viewBox='0 0 60 60' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 39.1 (31720) - http://www.bohemiancoding.com/sketch --> <title>Wealther</title> <desc>Created with Sketch.</desc> <defs> <linearGradient x1='50%' y1='0%' x2='50%' y2='100%' id='linearGradient-1'> <stop stop-color='#1D62F0' offset='0%'></stop> <stop stop-color='#19D5FD' offset='100%'></stop> </linearGradient> </defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Home-Screen-•-iPhone-SE' transform='translate(-16.000000, -115.000000)'> <g id='Home-Screen-•-iPhone-6s-Copy' transform='translate(0.000000, 27.000000)'> <g id='Wealther' transform='translate(16.000000, 88.000000)'> <path d='M39.0815,0 C45.105,0 48.116,0 51.3585,1.025 C54.8985,2.3135 57.6865,5.1015 58.975,8.6415 C60,11.8835 60,14.8955 60,20.9185 L60,39.0815 C60,45.105 60,48.116 58.975,51.3585 C57.6865,54.8985 54.8985,57.6865 51.3585,58.9745 C48.116,60 45.105,60 39.0815,60 L20.9185,60 C14.895,60 11.8835,60 8.6415,58.9745 C5.1015,57.6865 2.3135,54.8985 1.025,51.3585 C0,48.116 0,45.105 0,39.0815 L0,20.9185 C0,14.8955 0,11.8835 1.025,8.6415 C2.3135,5.1015 5.1015,2.3135 8.6415,1.025 C11.8835,0 14.895,0 20.9185,0 L39.0815,0 Z' id='BG' fill='url(#linearGradient-1)'></path> <circle id='Sun' fill='#FFD800' cx='19.75' cy='24.25' r='11.25'></circle> <path d='M41.5,43.996687 C46.4930625,43.8642035 50.5,39.775037 50.5,34.75 C50.5,29.6413661 46.3586339,25.5 41.25,25.5 C41.0574549,25.5 40.8662838,25.505883 40.6766567,25.5174791 C39.0043353,21.4018889 34.9660539,18.5 30.25,18.5 C24.0367966,18.5 19,23.5367966 19,29.75 C19,30.0391915 19.0109117,30.3258344 19.032346,30.6095395 C15.8856244,31.1828157 13.5,33.9378116 13.5,37.25 C13.5,40.8942242 16.3879002,43.8639431 20,43.9954562 L20,44 L41.5,44 L41.5,43.996687 L41.5,43.996687 Z' id='Cloud' fill='#FFFFFF' opacity='0.900536381'></path> </g> </g> </g> </g> </svg>",
  clock_app: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='60px' height='60px' viewBox='0 0 60 60' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 39.1 (31720) - http://www.bohemiancoding.com/sketch --> <title>Clock</title> <desc>Created with Sketch.</desc> <defs> <linearGradient x1='50%' y1='0%' x2='50%' y2='100%' id='linearGradient-1'> <stop stop-color='#F1F1F1' offset='0%'></stop> <stop stop-color='#EEEEEE' offset='100%'></stop> </linearGradient> </defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Home-Screen-•-iPhone-SE' transform='translate(-92.000000, -115.000000)'> <g id='Home-Screen-•-iPhone-6s-Copy' transform='translate(0.000000, 27.000000)'> <g id='Clock' transform='translate(92.000000, 88.000000)'> <path d='M39.0815,0 C45.105,0 48.116,0 51.3585,1.025 C54.8985,2.3135 57.6865,5.1015 58.975,8.6415 C60,11.8835 60,14.8955 60,20.9185 L60,39.0815 C60,45.105 60,48.116 58.975,51.3585 C57.6865,54.8985 54.8985,57.6865 51.3585,58.9745 C48.116,60 45.105,60 39.0815,60 L20.9185,60 C14.895,60 11.8835,60 8.6415,58.9745 C5.1015,57.6865 2.3135,54.8985 1.025,51.3585 C0,48.116 0,45.105 0,39.0815 L0,20.9185 C0,14.8955 0,11.8835 1.025,8.6415 C2.3135,5.1015 5.1015,2.3135 8.6415,1.025 C11.8835,0 14.895,0 20.9185,0 L39.0815,0 Z' id='Icon' fill='#1E1E1F'></path> <circle id='Oval-12' fill='url(#linearGradient-1)' cx='30' cy='30' r='26'></circle> <g id='Digits' transform='translate(8.000000, 7.000000)' fill='#616161'> <path d='M32.468,8 L32.468,3.746 L32.078,3.746 C32.0499999,3.9060008 31.9980004,4.03799948 31.922,4.142 C31.8459996,4.24600052 31.7530005,4.3279997 31.643,4.388 C31.5329994,4.4480003 31.4100007,4.48899989 31.274,4.511 C31.1379993,4.53300011 30.9980007,4.544 30.854,4.544 L30.854,4.952 L31.958,4.952 L31.958,8 L32.468,8 Z' id='1'></path> <path d='M38.096,12.752 L38.606,12.752 C38.602,12.6239994 38.6149999,12.4970006 38.645,12.371 C38.6750002,12.2449994 38.7239997,12.1320005 38.792,12.032 C38.8600003,11.9319995 38.9469995,11.8510003 39.053,11.789 C39.1590005,11.7269997 39.2859993,11.696 39.434,11.696 C39.5460006,11.696 39.6519995,11.7139998 39.752,11.75 C39.8520005,11.7860002 39.9389996,11.8379997 40.013,11.906 C40.0870004,11.9740003 40.1459998,12.0549995 40.19,12.149 C40.2340002,12.2430005 40.256,12.3479994 40.256,12.464 C40.256,12.6120007 40.2330002,12.7419994 40.187,12.854 C40.1409998,12.9660006 40.0730005,13.0699995 39.983,13.166 C39.8929996,13.2620005 39.7800007,13.3569995 39.644,13.451 C39.5079993,13.5450005 39.3500009,13.6479994 39.17,13.76 C39.0219993,13.8480004 38.8800007,13.9419995 38.744,14.042 C38.6079993,14.1420005 38.4860005,14.2579993 38.378,14.39 C38.2699995,14.5220007 38.1810004,14.6769991 38.111,14.855 C38.0409997,15.0330009 37.9960001,15.2479987 37.976,15.5 L40.754,15.5 L40.754,15.05 L38.57,15.05 C38.5940001,14.9179993 38.6449996,14.8010005 38.723,14.699 C38.8010004,14.5969995 38.8949995,14.5020004 39.005,14.414 C39.1150006,14.3259996 39.2359993,14.2430004 39.368,14.165 C39.5000007,14.0869996 39.6319993,14.0080004 39.764,13.928 C39.8960007,13.8439996 40.0239994,13.7560005 40.148,13.664 C40.2720006,13.5719995 40.3819995,13.4690006 40.478,13.355 C40.5740005,13.2409994 40.6509997,13.1120007 40.709,12.968 C40.7670003,12.8239993 40.796,12.6580009 40.796,12.47 C40.796,12.269999 40.7610004,12.0940008 40.691,11.942 C40.6209997,11.7899992 40.5260006,11.6630005 40.406,11.561 C40.2859994,11.4589995 40.1450008,11.3810003 39.983,11.327 C39.8209992,11.2729997 39.6480009,11.246 39.464,11.246 C39.2399989,11.246 39.0400009,11.2839996 38.864,11.36 C38.6879991,11.4360004 38.5410006,11.5409993 38.423,11.675 C38.3049994,11.8090007 38.2180003,11.9679991 38.162,12.152 C38.1059997,12.3360009 38.0839999,12.5359989 38.096,12.752 L38.096,12.752 Z' id='2'></path> <path d='M42.14,22.57 L42.14,23.002 C42.2360005,22.9899999 42.3379995,22.984 42.446,22.984 C42.5740006,22.984 42.6929995,23.0009998 42.803,23.035 C42.9130006,23.0690002 43.0079996,23.1209997 43.088,23.191 C43.1680004,23.2610004 43.2319998,23.3469995 43.28,23.449 C43.3280002,23.5510005 43.352,23.6679993 43.352,23.8 C43.352,23.9280006 43.3270003,24.0429995 43.277,24.145 C43.2269998,24.2470005 43.1600004,24.3329997 43.076,24.403 C42.9919996,24.4730004 42.8940006,24.5269998 42.782,24.565 C42.6699994,24.6030002 42.5520006,24.622 42.428,24.622 C42.1359985,24.622 41.9140008,24.5350009 41.762,24.361 C41.6099992,24.1869991 41.53,23.9620014 41.522,23.686 L41.012,23.686 C41.008,23.9060011 41.0389997,24.1019991 41.105,24.274 C41.1710003,24.4460009 41.2659994,24.5909994 41.39,24.709 C41.5140006,24.8270006 41.6639991,24.9159997 41.84,24.976 C42.0160009,25.0360003 42.2119989,25.066 42.428,25.066 C42.628001,25.066 42.8169991,25.0390003 42.995,24.985 C43.1730009,24.9309997 43.3279993,24.8500005 43.46,24.742 C43.5920007,24.6339995 43.6969996,24.4990008 43.775,24.337 C43.8530004,24.1749992 43.892,23.9880011 43.892,23.776 C43.892,23.5199987 43.8290006,23.2980009 43.703,23.11 C43.5769994,22.9219991 43.3840013,22.8000003 43.124,22.744 L43.124,22.732 C43.2920008,22.6559996 43.4319994,22.5440007 43.544,22.396 C43.6560006,22.2479993 43.712,22.078001 43.712,21.886 C43.712,21.689999 43.6790003,21.5200007 43.613,21.376 C43.5469997,21.2319993 43.4560006,21.1140005 43.34,21.022 C43.2239994,20.9299995 43.0870008,20.8610002 42.929,20.815 C42.7709992,20.7689998 42.6000009,20.746 42.416,20.746 C42.2039989,20.746 42.0170008,20.7799997 41.855,20.848 C41.6929992,20.9160003 41.5580005,21.0099994 41.45,21.13 C41.3419995,21.2500006 41.2590003,21.3939992 41.201,21.562 C41.1429997,21.7300008 41.11,21.915999 41.102,22.12 L41.612,22.12 C41.612,21.9959994 41.6279998,21.8780006 41.66,21.766 C41.6920002,21.6539994 41.7409997,21.5560004 41.807,21.472 C41.8730003,21.3879996 41.9569995,21.3210003 42.059,21.271 C42.1610005,21.2209998 42.2799993,21.196 42.416,21.196 C42.6320011,21.196 42.8119993,21.2529994 42.956,21.367 C43.1000007,21.4810006 43.172,21.6519989 43.172,21.88 C43.172,21.9920006 43.1500002,22.0919996 43.106,22.18 C43.0619998,22.2680004 43.0030004,22.3409997 42.929,22.399 C42.8549996,22.4570003 42.7690005,22.5009999 42.671,22.531 C42.5729995,22.5610002 42.4700005,22.576 42.362,22.576 L42.254,22.576 L42.194,22.576 C42.1779999,22.576 42.1600001,22.574 42.14,22.57 L42.14,22.57 Z' id='3'></path> <path d='M40.366,34.054 L38.938,34.054 L40.354,31.972 L40.366,31.972 L40.366,34.054 Z M40.846,34.054 L40.846,31.246 L40.438,31.246 L38.5,34.012 L38.5,34.504 L40.366,34.504 L40.366,35.5 L40.846,35.5 L40.846,34.504 L41.422,34.504 L41.422,34.054 L40.846,34.054 Z' id='4'></path> <path d='M33.652,38.768 L33.652,38.318 L31.552,38.318 L31.156,40.526 L31.594,40.55 C31.6940005,40.4299994 31.8089993,40.3330004 31.939,40.259 C32.0690006,40.1849996 32.2179992,40.148 32.386,40.148 C32.5300007,40.148 32.6609994,40.1719998 32.779,40.22 C32.8970006,40.2680002 32.9979996,40.3349996 33.082,40.421 C33.1660004,40.5070004 33.2309998,40.6089994 33.277,40.727 C33.3230002,40.8450006 33.346,40.9739993 33.346,41.114 C33.346,41.2820008 33.3220002,41.4289994 33.274,41.555 C33.2259998,41.6810006 33.1610004,41.7859996 33.079,41.87 C32.9969996,41.9540004 32.9010005,42.0169998 32.791,42.059 C32.6809994,42.1010002 32.5660006,42.122 32.446,42.122 C32.3179994,42.122 32.2010005,42.1030002 32.095,42.065 C31.9889995,42.0269998 31.8970004,41.9730004 31.819,41.903 C31.7409996,41.8329997 31.6790002,41.7510005 31.633,41.657 C31.5869998,41.5629995 31.56,41.4620005 31.552,41.354 L31.042,41.354 C31.046,41.546001 31.0839996,41.7179992 31.156,41.87 C31.2280004,42.0220008 31.3259994,42.1489995 31.45,42.251 C31.5740006,42.3530005 31.7169992,42.4309997 31.879,42.485 C32.0410008,42.5390003 32.2139991,42.566 32.398,42.566 C32.6460012,42.566 32.8629991,42.5270004 33.049,42.449 C33.2350009,42.3709996 33.3899994,42.2660007 33.514,42.134 C33.6380006,42.0019993 33.7309997,41.8510009 33.793,41.681 C33.8550003,41.5109992 33.886,41.3360009 33.886,41.156 C33.886,40.9119988 33.8500004,40.6990009 33.778,40.517 C33.7059996,40.3349991 33.6080006,40.1830006 33.484,40.061 C33.3599994,39.9389994 33.2140008,39.8480003 33.046,39.788 C32.8779992,39.7279997 32.7000009,39.698 32.512,39.698 C32.3679993,39.698 32.2230007,39.7229998 32.077,39.773 C31.9309993,39.8230003 31.8120005,39.8999995 31.72,40.004 L31.708,39.992 L31.936,38.768 L33.652,38.768 Z' id='5'></path> <path d='M22.816,42.332 L23.326,42.332 C23.2939998,41.9799982 23.174001,41.7110009 22.966,41.525 C22.757999,41.3389991 22.4780018,41.246 22.126,41.246 C21.8219985,41.246 21.570001,41.3099994 21.37,41.438 C21.169999,41.5660006 21.0100006,41.7359989 20.89,41.948 C20.7699994,42.1600011 20.6850002,42.4029986 20.635,42.677 C20.5849997,42.9510014 20.56,43.2339985 20.56,43.526 C20.56,43.7500011 20.5769998,43.9819988 20.611,44.222 C20.6450002,44.4620012 20.7139995,44.681999 20.818,44.882 C20.9220005,45.082001 21.069999,45.2459994 21.262,45.374 C21.454001,45.5020006 21.7079984,45.566 22.024,45.566 C22.2920013,45.566 22.5169991,45.5210005 22.699,45.431 C22.8810009,45.3409996 23.0269994,45.2270007 23.137,45.089 C23.2470005,44.9509993 23.3259998,44.7980008 23.374,44.63 C23.4220002,44.4619992 23.446,44.3000008 23.446,44.144 C23.446,43.947999 23.4160003,43.7660008 23.356,43.598 C23.2959997,43.4299992 23.2110005,43.2840006 23.101,43.16 C22.9909994,43.0359994 22.8550008,42.9390004 22.693,42.869 C22.5309992,42.7989997 22.348001,42.764 22.144,42.764 C21.9119988,42.764 21.7070009,42.8079996 21.529,42.896 C21.3509991,42.9840004 21.2020006,43.125999 21.082,43.322 L21.07,43.31 C21.074,43.1459992 21.0899999,42.9700009 21.118,42.782 C21.1460001,42.5939991 21.1969996,42.4190008 21.271,42.257 C21.3450004,42.0949992 21.4479993,41.9610005 21.58,41.855 C21.7120007,41.7489995 21.8859989,41.696 22.102,41.696 C22.306001,41.696 22.4699994,41.7539994 22.594,41.87 C22.7180006,41.9860006 22.7919999,42.139999 22.816,42.332 L22.816,42.332 Z M22.048,43.214 C22.1920007,43.214 22.3179995,43.2399997 22.426,43.292 C22.5340005,43.3440003 22.6239996,43.4129996 22.696,43.499 C22.7680004,43.5850004 22.8209998,43.6869994 22.855,43.805 C22.8890002,43.9230006 22.906,44.0479993 22.906,44.18 C22.906,44.3040006 22.8870002,44.4229994 22.849,44.537 C22.8109998,44.6510006 22.7560004,44.7519996 22.684,44.84 C22.6119996,44.9280004 22.5230005,44.9969998 22.417,45.047 C22.3109995,45.0970003 22.1880007,45.122 22.048,45.122 C21.9079993,45.122 21.7830005,45.0970003 21.673,45.047 C21.5629994,44.9969998 21.4710004,44.9300004 21.397,44.846 C21.3229996,44.7619996 21.2660002,44.6620006 21.226,44.546 C21.1859998,44.4299994 21.166,44.3060007 21.166,44.174 C21.166,44.0419993 21.1849998,43.9170006 21.223,43.799 C21.2610002,43.6809994 21.3179996,43.5790004 21.394,43.493 C21.4700004,43.4069996 21.5619995,43.3390003 21.67,43.289 C21.7780005,43.2389998 21.9039993,43.214 22.048,43.214 L22.048,43.214 Z' id='6'></path> <path d='M12.886,38.756 L12.886,38.318 L10.132,38.318 L10.132,38.798 L12.364,38.798 C12.1399989,39.0340012 11.931001,39.2919986 11.737,39.572 C11.542999,39.8520014 11.3720007,40.1489984 11.224,40.463 C11.0759993,40.7770016 10.9550005,41.1049983 10.861,41.447 C10.7669995,41.7890017 10.7080001,42.1399982 10.684,42.5 L11.254,42.5 C11.2740001,42.1679983 11.3299995,41.8260018 11.422,41.474 C11.5140005,41.1219982 11.6329993,40.7800017 11.779,40.448 C11.9250007,40.1159983 12.0919991,39.8040015 12.28,39.512 C12.4680009,39.2199985 12.6699989,38.9680011 12.886,38.756 L12.886,38.756 Z' id='7'></path> <path d='M3.262,32.35 C3.262,32.2419995 3.2819998,32.1480004 3.322,32.068 C3.3620002,31.9879996 3.41499967,31.9200003 3.481,31.864 C3.54700033,31.8079997 3.62599954,31.7660001 3.718,31.738 C3.81000046,31.7099999 3.9059995,31.696 4.006,31.696 C4.21400104,31.696 4.38499933,31.7509995 4.519,31.861 C4.65300067,31.9710006 4.72,32.1339989 4.72,32.35 C4.72,32.5660011 4.65400066,32.7339994 4.522,32.854 C4.38999934,32.9740006 4.22200102,33.034 4.018,33.034 C3.91399948,33.034 3.81600046,33.0200001 3.724,32.992 C3.63199954,32.9639999 3.55200034,32.9220003 3.484,32.866 C3.41599966,32.8099997 3.3620002,32.7390004 3.322,32.653 C3.2819998,32.5669996 3.262,32.4660006 3.262,32.35 L3.262,32.35 Z M2.722,32.332 C2.722,32.524001 2.77599946,32.7009992 2.884,32.863 C2.99200054,33.0250008 3.1359991,33.1419996 3.316,33.214 C3.0759988,33.2980004 2.89200064,33.4329991 2.764,33.619 C2.63599936,33.8050009 2.572,34.0239987 2.572,34.276 C2.572,34.4920011 2.60899963,34.6809992 2.683,34.843 C2.75700037,35.0050008 2.85899935,35.1399995 2.989,35.248 C3.11900065,35.3560005 3.27199912,35.4359997 3.448,35.488 C3.62400088,35.5400003 3.81399898,35.566 4.018,35.566 C4.21400098,35.566 4.39799914,35.5380003 4.57,35.482 C4.74200086,35.4259997 4.89099937,35.3430006 5.017,35.233 C5.14300063,35.1229995 5.24299963,34.9880008 5.317,34.828 C5.39100037,34.6679992 5.428,34.484001 5.428,34.276 C5.428,34.0119987 5.36600062,33.7890009 5.242,33.607 C5.11799938,33.4249991 4.92800128,33.2940004 4.672,33.214 C4.8520009,33.1339996 4.99499947,33.0150008 5.101,32.857 C5.20700053,32.6989992 5.26,32.524001 5.26,32.332 C5.26,32.1959993 5.23600024,32.0630007 5.188,31.933 C5.13999976,31.8029994 5.06500051,31.6870005 4.963,31.585 C4.86099949,31.4829995 4.72800082,31.4010003 4.564,31.339 C4.39999918,31.2769997 4.20200116,31.246 3.97,31.246 C3.80599918,31.246 3.64900075,31.2699998 3.499,31.318 C3.34899925,31.3660002 3.21600058,31.4359995 3.1,31.528 C2.98399942,31.6200005 2.89200034,31.7329993 2.824,31.867 C2.75599966,32.0010007 2.722,32.1559991 2.722,32.332 L2.722,32.332 Z M3.112,34.3 C3.112,34.1759994 3.13499977,34.0640005 3.181,33.964 C3.22700023,33.8639995 3.29099959,33.7780004 3.373,33.706 C3.45500041,33.6339996 3.55099945,33.5790002 3.661,33.541 C3.77100055,33.5029998 3.88799938,33.484 4.012,33.484 C4.1320006,33.484 4.24499947,33.5049998 4.351,33.547 C4.45700053,33.5890002 4.5499996,33.6459996 4.63,33.718 C4.7100004,33.7900004 4.77299977,33.8749995 4.819,33.973 C4.86500023,34.0710005 4.888,34.1779994 4.888,34.294 C4.888,34.4140006 4.86700021,34.5239995 4.825,34.624 C4.78299979,34.7240005 4.72300039,34.8109996 4.645,34.885 C4.56699961,34.9590004 4.47500053,35.0169998 4.369,35.059 C4.26299947,35.1010002 4.14600064,35.122 4.018,35.122 C3.75399868,35.122 3.53700085,35.0490007 3.367,34.903 C3.19699915,34.7569993 3.112,34.5560013 3.112,34.3 L3.112,34.3 Z' id='8'></path> <path d='M1.136,23.974 L0.626,23.974 C0.65800016,24.3420018 0.79199882,24.6159991 1.028,24.796 C1.26400118,24.9760009 1.55999822,25.066 1.916,25.066 C2.43200258,25.066 2.80699883,24.869002 3.041,24.475 C3.27500117,24.080998 3.392,23.5160037 3.392,22.78 C3.392,22.375998 3.35300039,22.0430013 3.275,21.781 C3.19699961,21.5189987 3.09200066,21.3120008 2.96,21.16 C2.82799934,21.0079992 2.67400088,20.9010003 2.498,20.839 C2.32199912,20.7769997 2.134001,20.746 1.934,20.746 C1.72999898,20.746 1.54200086,20.7799997 1.37,20.848 C1.19799914,20.9160003 1.05000062,21.0109994 0.926,21.133 C0.80199938,21.2550006 0.70600034,21.4009992 0.638,21.571 C0.56999966,21.7410009 0.536,21.927999 0.536,22.132 C0.536,22.340001 0.56499971,22.5319991 0.623,22.708 C0.68100029,22.8840009 0.76699943,23.0339994 0.881,23.158 C0.99500057,23.2820006 1.13599916,23.3789997 1.304,23.449 C1.47200084,23.5190004 1.66399892,23.554 1.88,23.554 C2.08800104,23.554 2.27999912,23.5010005 2.456,23.395 C2.63200088,23.2889995 2.76799952,23.1460009 2.864,22.966 L2.876,22.978 C2.85999992,23.5340028 2.77400078,23.9469987 2.618,24.217 C2.46199922,24.4870014 2.22800156,24.622 1.916,24.622 C1.71199898,24.622 1.53600074,24.5660006 1.388,24.454 C1.23999926,24.3419994 1.1560001,24.182001 1.136,23.974 L1.136,23.974 Z M2.786,22.168 C2.786,22.2920006 2.7660002,22.4109994 2.726,22.525 C2.6859998,22.6390006 2.62800038,22.7389996 2.552,22.825 C2.47599962,22.9110004 2.38400054,22.9789998 2.276,23.029 C2.16799946,23.0790003 2.04800066,23.104 1.916,23.104 C1.79199938,23.104 1.67900051,23.0790003 1.577,23.029 C1.47499949,22.9789998 1.38700037,22.9120004 1.313,22.828 C1.23899963,22.7439996 1.18100021,22.6480005 1.139,22.54 C1.09699979,22.4319995 1.076,22.3200006 1.076,22.204 C1.076,22.0719993 1.09099985,21.9460006 1.121,21.826 C1.15100015,21.7059994 1.19899967,21.5990005 1.265,21.505 C1.33100033,21.4109995 1.41699947,21.3360003 1.523,21.28 C1.62900053,21.2239997 1.75799924,21.196 1.91,21.196 C2.05400072,21.196 2.17999946,21.2219997 2.288,21.274 C2.39600054,21.3260003 2.48699963,21.3969996 2.561,21.487 C2.63500037,21.5770005 2.69099981,21.6799994 2.729,21.796 C2.76700019,21.9120006 2.786,22.0359993 2.786,22.168 L2.786,22.168 Z' id='9'></path> <path d='M2.8,15.5 L2.8,11.246 L2.41,11.246 C2.38199986,11.4060008 2.33000038,11.5379995 2.254,11.642 C2.17799962,11.7460005 2.08500055,11.8279997 1.975,11.888 C1.86499945,11.9480003 1.74200068,11.9889999 1.606,12.011 C1.46999932,12.0330001 1.33000072,12.044 1.186,12.044 L1.186,12.452 L2.29,12.452 L2.29,15.5 L2.8,15.5 Z M4.792,13.406 C4.792,13.3019995 4.79299999,13.1870006 4.795,13.061 C4.79700001,12.9349994 4.80699991,12.8090006 4.825,12.683 C4.84300009,12.5569994 4.86899983,12.4340006 4.903,12.314 C4.93700017,12.1939994 4.98699967,12.0890005 5.053,11.999 C5.11900033,11.9089996 5.2019995,11.8360003 5.302,11.78 C5.4020005,11.7239997 5.52399928,11.696 5.668,11.696 C5.81200072,11.696 5.9339995,11.7239997 6.034,11.78 C6.1340005,11.8360003 6.21699967,11.9089996 6.283,11.999 C6.34900033,12.0890005 6.39899983,12.1939994 6.433,12.314 C6.46700017,12.4340006 6.49299991,12.5569994 6.511,12.683 C6.52900009,12.8090006 6.53899999,12.9349994 6.541,13.061 C6.54300001,13.1870006 6.544,13.3019995 6.544,13.406 C6.544,13.5660008 6.53900005,13.744999 6.529,13.943 C6.51899995,14.141001 6.48700027,14.3269991 6.433,14.501 C6.37899973,14.6750009 6.2920006,14.8219994 6.172,14.942 C6.0519994,15.0620006 5.88400108,15.122 5.668,15.122 C5.45199892,15.122 5.2840006,15.0620006 5.164,14.942 C5.0439994,14.8219994 4.95700027,14.6750009 4.903,14.501 C4.84899973,14.3269991 4.81700005,14.141001 4.807,13.943 C4.79699995,13.744999 4.792,13.5660008 4.792,13.406 L4.792,13.406 Z M4.252,13.412 C4.252,13.5680008 4.25599996,13.7299992 4.264,13.898 C4.27200004,14.0660008 4.29199984,14.2299992 4.324,14.39 C4.35600016,14.5500008 4.4019997,14.7009993 4.462,14.843 C4.5220003,14.9850007 4.60399948,15.1099995 4.708,15.218 C4.81200052,15.3260005 4.94299921,15.4109997 5.101,15.473 C5.25900079,15.5350003 5.4479989,15.566 5.668,15.566 C5.89200112,15.566 6.08199922,15.5350003 6.238,15.473 C6.39400078,15.4109997 6.52399948,15.3260005 6.628,15.218 C6.73200052,15.1099995 6.8139997,14.9850007 6.874,14.843 C6.9340003,14.7009993 6.97999984,14.5500008 7.012,14.39 C7.04400016,14.2299992 7.06399996,14.0660008 7.072,13.898 C7.08000004,13.7299992 7.084,13.5680008 7.084,13.412 C7.084,13.2559992 7.08000004,13.0940008 7.072,12.926 C7.06399996,12.7579992 7.04400016,12.5940008 7.012,12.434 C6.97999984,12.2739992 6.9340003,12.1220007 6.874,11.978 C6.8139997,11.8339993 6.73200052,11.7080005 6.628,11.6 C6.52399948,11.4919995 6.39300079,11.4060003 6.235,11.342 C6.07699921,11.2779997 5.8880011,11.246 5.668,11.246 C5.4479989,11.246 5.25900079,11.2779997 5.101,11.342 C4.94299921,11.4060003 4.81200052,11.4919995 4.708,11.6 C4.60399948,11.7080005 4.5220003,11.8339993 4.462,11.978 C4.4019997,12.1220007 4.35600016,12.2739992 4.324,12.434 C4.29199984,12.5940008 4.27200004,12.7579992 4.264,12.926 C4.25599996,13.0940008 4.252,13.2559992 4.252,13.412 L4.252,13.412 Z' id='10'></path> <path d='M10.8,8 L10.8,3.746 L10.41,3.746 C10.3819999,3.9060008 10.3300004,4.03799948 10.254,4.142 C10.1779996,4.24600052 10.0850005,4.3279997 9.975,4.388 C9.86499945,4.4480003 9.74200068,4.48899989 9.606,4.511 C9.46999932,4.53300011 9.33000072,4.544 9.186,4.544 L9.186,4.952 L10.29,4.952 L10.29,8 L10.8,8 Z M14.136,8 L14.136,3.746 L13.746,3.746 C13.7179999,3.9060008 13.6660004,4.03799948 13.59,4.142 C13.5139996,4.24600052 13.4210005,4.3279997 13.311,4.388 C13.2009994,4.4480003 13.0780007,4.48899989 12.942,4.511 C12.8059993,4.53300011 12.6660007,4.544 12.522,4.544 L12.522,4.952 L13.626,4.952 L13.626,8 L14.136,8 Z' id='11'></path> <path d='M20.8,5 L20.8,0.746 L20.41,0.746 C20.3819999,0.9060008 20.3300004,1.03799948 20.254,1.142 C20.1779996,1.24600052 20.0850005,1.3279997 19.975,1.388 C19.8649994,1.4480003 19.7420007,1.48899989 19.606,1.511 C19.4699993,1.53300011 19.3300007,1.544 19.186,1.544 L19.186,1.952 L20.29,1.952 L20.29,5 L20.8,5 Z M22.264,2.252 L22.774,2.252 C22.77,2.12399936 22.7829998,1.99700063 22.813,1.871 C22.8430001,1.74499937 22.8919997,1.6320005 22.96,1.532 C23.0280003,1.4319995 23.1149995,1.35100031 23.221,1.289 C23.3270005,1.22699969 23.4539993,1.196 23.602,1.196 C23.7140006,1.196 23.8199995,1.21399982 23.92,1.25 C24.0200005,1.28600018 24.1069996,1.33799966 24.181,1.406 C24.2550004,1.47400034 24.3139998,1.55499953 24.358,1.649 C24.4020002,1.74300047 24.424,1.84799942 24.424,1.964 C24.424,2.11200074 24.4010002,2.24199944 24.355,2.354 C24.3089998,2.46600056 24.2410004,2.56999952 24.151,2.666 C24.0609995,2.76200048 23.9480007,2.85699953 23.812,2.951 C23.6759993,3.04500047 23.5180009,3.14799944 23.338,3.26 C23.1899993,3.34800044 23.0480007,3.4419995 22.912,3.542 C22.7759993,3.6420005 22.6540005,3.75799934 22.546,3.89 C22.4379995,4.02200066 22.3490003,4.17699911 22.279,4.355 C22.2089996,4.53300089 22.1640001,4.74799874 22.144,5 L24.922,5 L24.922,4.55 L22.738,4.55 C22.7620001,4.41799934 22.8129996,4.30100051 22.891,4.199 C22.9690004,4.09699949 23.0629994,4.00200044 23.173,3.914 C23.2830005,3.82599956 23.4039993,3.74300039 23.536,3.665 C23.6680007,3.58699961 23.7999993,3.5080004 23.932,3.428 C24.0640007,3.34399958 24.1919994,3.25600046 24.316,3.164 C24.4400006,3.07199954 24.5499995,2.96900057 24.646,2.855 C24.7420005,2.74099943 24.8189997,2.61200072 24.877,2.468 C24.9350003,2.32399928 24.964,2.15800094 24.964,1.97 C24.964,1.769999 24.9290003,1.59400076 24.859,1.442 C24.7889996,1.28999924 24.6940006,1.16300051 24.574,1.061 C24.4539994,0.95899949 24.3130008,0.88100027 24.151,0.827 C23.9889992,0.77299973 23.8160009,0.746 23.632,0.746 C23.4079989,0.746 23.2080009,0.78399962 23.032,0.86 C22.8559991,0.93600038 22.7090006,1.04099933 22.591,1.175 C22.4729994,1.30900067 22.3860003,1.46799908 22.33,1.652 C22.2739997,1.83600092 22.2519999,2.03599892 22.264,2.252 L22.264,2.252 Z' id='12'></path> </g> <polygon id='Hour' fill='#2A2929' transform='translate(25.319297, 23.611917) rotate(-38.000000) translate(-25.319297, -23.611917) ' points='24.8192972 15.6119168 25.8192972 15.6119168 25.8192972 31.6119168 24.8192972 31.6119168'></polygon> <polygon id='Minute' fill='#2A2929' transform='translate(19.329949, 35.730028) rotate(62.000000) translate(-19.329949, -35.730028) ' points='19.0494321 24.2986991 19.9184363 24.2986991 19.7874404 47.2986991 18.9184363 47.2986991'></polygon> <polygon id='Second' fill='#DD4524' transform='translate(39.644621, 32.129480) rotate(-76.000000) translate(-39.644621, -32.129480) ' points='38.9523565 18.2482315 39.9221138 18.2482315 39.9523565 46.2482315 38.9825992 46.2482315'></polygon> <circle id='Oval-13' fill='#2A2929' cx='30' cy='30' r='1.25'></circle> <circle id='Oval-14' fill='#DD4524' cx='30' cy='30' r='0.75'></circle> </g> </g> </g> </g> </svg>",
  maps_app: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='60px' height='60px' viewBox='0 0 60 60' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 39.1 (31720) - http://www.bohemiancoding.com/sketch --> <title>Maps</title> <desc>Created with Sketch.</desc> <defs> <path d='M39.0815,0 C45.105,0 48.116,0 51.3585,1.025 C54.8985,2.3135 57.6865,5.1015 58.975,8.6415 C60,11.8835 60,14.8955 60,20.9185 L60,39.0815 C60,45.105 60,48.116 58.975,51.3585 C57.6865,54.8985 54.8985,57.6865 51.3585,58.9745 C48.116,60 45.105,60 39.0815,60 L20.9185,60 C14.895,60 11.8835,60 8.6415,58.9745 C5.1015,57.6865 2.3135,54.8985 1.025,51.3585 C0,48.116 0,45.105 0,39.0815 L0,20.9185 C0,14.8955 0,11.8835 1.025,8.6415 C2.3135,5.1015 5.1015,2.3135 8.6415,1.025 C11.8835,0 14.895,0 20.9185,0 L39.0815,0 Z' id='path-1'></path> <path d='M-4.5,30 C-4.5,30 -4.47462625,30.4967807 -4.42511695,30.4912401 C-3.44229055,30.3812506 9.10445696,28.4946923 17.5075684,34.5092773 C23.2683105,38.6325684 26.42078,43.7490087 31,48.1848145 C36.7919922,53.7954102 44.3314042,55.6680664 50.4058144,56.250293 C56.4802246,56.8325195 65,56 65,56 L65,66 C65,66 53.5489633,65.3769385 47.8234863,64.6784668 C42.0980093,63.9799951 33.2470703,62.026123 27.392334,57.927002 C17.9909668,50.1728516 19.277874,47.8193763 12.291748,43.2246094 C5.24072266,38.5871582 -4.5,40.5 -4.5,40.5 L-4.5,30 Z' id='path-3'></path> <mask id='mask-4' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='-0.5' y='-0.5' width='70.5' height='37'> <rect x='-5' y='29.5' width='70.5' height='37' fill='white'></rect> <use xlink:href='#path-3' fill='black'></use> </mask> <polygon id='path-5' points='50.5 60 41.5 60 41.5 18.8429752 0 18.8429752 0 9.91735537 41.5 9.91735537 41.5 0 50.5 0 50.5 9.91735537 60 9.91735537 60 18.8429752 50.5 18.8429752 50.5 36.6942149 60 36.6942149 60 45.6198347 50.5 45.6198347'></polygon> <mask id='mask-6' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='-0.5' y='-0.5' width='61' height='61'> <rect x='-0.5' y='-0.5' width='61' height='61' fill='white'></rect> <use xlink:href='#path-5' fill='black'></use> </mask> <path d='M0.5,7.5 C0.814961548,13.8459051 5.03679656,19.5 12.75,19.5 C20.4632034,19.5 24.6314755,13.8439381 25,7.5 C25.1235352,5.37341309 24.3674316,2.56555176 23.5068131,1.2710142 C22.4549565,2.02599285 20.4373562,2.5 18.75,2.5 C16.1596631,2.5 13.4693848,1.88292106 12.75,0.347133799 C12.0306152,1.88292106 9.34033689,2.5 6.75,2.5 C5.06264383,2.5 3.04504346,2.02599285 1.99318686,1.2710142 C1.13293457,2.76416016 0.392089844,5.32580566 0.5,7.5 Z' id='path-7'></path> <mask id='mask-8' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='0' y='0' width='24.5237787' height='19.1528662' fill='white'> <use xlink:href='#path-7'></use> </mask> <mask id='mask-10' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='0' y='0' width='24.5237787' height='19.1528662' fill='white'> <use xlink:href='#path-7'></use> </mask> <rect id='path-11' x='0' y='0.5' width='25' height='5'></rect> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-12'> <feOffset dx='0' dy='1' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feColorMatrix values='0 0 0 0 1   0 0 0 0 1   0 0 0 0 1  0 0 0 1 0' type='matrix' in='shadowOffsetOuter1'></feColorMatrix> </filter> <path d='M0.5,7.5 C0.814961548,13.8459051 5.03679656,19.5 12.75,19.5 C20.4632034,19.5 24.6314755,13.8439381 25,7.5 C25.1235352,5.37341309 24.3674316,2.56555176 23.5068131,1.2710142 C22.4549565,2.02599285 20.4373562,2.5 18.75,2.5 C16.1596631,2.5 13.4693848,1.88292106 12.75,0.347133799 C12.0306152,1.88292106 9.34033689,2.5 6.75,2.5 C5.06264383,2.5 3.04504346,2.02599285 1.99318686,1.2710142 C1.13293457,2.76416016 0.392089844,5.32580566 0.5,7.5 Z' id='path-13'></path> <mask id='mask-14' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='0' y='0' width='24.5237787' height='19.1528662' fill='white'> <use xlink:href='#path-13'></use> </mask> </defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Home-Screen-•-iPhone-SE' transform='translate(-168.000000, -115.000000)'> <g id='Home-Screen-•-iPhone-6s-Copy' transform='translate(0.000000, 27.000000)'> <g id='Maps' transform='translate(168.000000, 88.000000)'> <mask id='mask-2' fill='white'> <use xlink:href='#path-1'></use> </mask> <use id='BG' fill='#E4DDC9' xlink:href='#path-1'></use> <rect id='Block' fill='#76C63B' mask='url(#mask-2)' x='0' y='0' width='42' height='10'></rect> <rect id='Block' fill='#FBC6D1' mask='url(#mask-2)' x='45' y='0.5' width='15' height='10'></rect> <g id='Highway' mask='url(#mask-2)'> <use fill='#FFDE02' fill-rule='evenodd' xlink:href='#path-3'></use> <use stroke='#FEB312' mask='url(#mask-4)' stroke-width='1' xlink:href='#path-3'></use> </g> <g id='Map' mask='url(#mask-2)'> <use fill='#FFFFFF' fill-rule='evenodd' xlink:href='#path-5'></use> <use stroke-opacity='0.1' stroke='#000000' mask='url(#mask-6)' stroke-width='1' xlink:href='#path-5'></use> </g> <path d='M43.6565914,35.5 L43.4489796,35.5 L43.4489796,17 L-1,17 L-1,12 L48.5,12 L48.5,14.5 L48.5,14.5 L48.5,35.5 L48.2923882,35.5 C47.586899,35.178996 46.801811,35 45.9744898,35 C45.1471685,35 44.3620806,35.178996 43.6565914,35.5 L43.6565914,35.5 Z' id='Route' fill='#409BFF' mask='url(#mask-2)'></path> <g id='Indicator' mask='url(#mask-2)'> <g transform='translate(40.500000, 35.500000)'> <circle id='Circle' fill='#007AFF' cx='5.5' cy='5.5' r='5.5'></circle> <polygon id='Arrow' fill='#FFFFFF' points='7.75 8.75 5.5 1.65380592 3.25 8.75 5.5 6.65380592'></polygon> </g> </g> <g id='280' mask='url(#mask-2)'> <g transform='translate(8.000000, 22.500000)'> <mask id='mask-9' fill='white'> <use xlink:href='#path-7'></use> </mask> <g id='Oval-20' stroke='#FFFFFF' mask='url(#mask-8)' stroke-width='1' fill='#007AFF' fill-rule='evenodd'> <use mask='url(#mask-10)' xlink:href='#path-7'></use> </g> <g id='Top' stroke='none' fill='none' mask='url(#mask-9)'> <use fill='black' fill-opacity='1' filter='url(#filter-12)' xlink:href='#path-11'></use> <use fill='#DE1D26' fill-rule='evenodd' xlink:href='#path-11'></use> </g> <g id='Shield' stroke='none' fill='none' mask='url(#mask-9)' stroke-width='1.5'> <use stroke='#FFFFFF' mask='url(#mask-14)' xlink:href='#path-13'></use> </g> <path d='M5.64,9.378 L6.405,9.378 C6.39899997,9.18599904 6.41849978,8.99550095 6.4635,8.8065 C6.50850023,8.61749906 6.58199949,8.44800075 6.684,8.298 C6.78600051,8.14799925 6.91649921,8.02650047 7.0755,7.9335 C7.2345008,7.84049954 7.42499889,7.794 7.647,7.794 C7.81500084,7.794 7.97399925,7.82099973 8.124,7.875 C8.27400075,7.92900027 8.40449945,8.00699949 8.5155,8.109 C8.62650056,8.21100051 8.71499967,8.3324993 8.781,8.4735 C8.84700033,8.61450071 8.88,8.77199913 8.88,8.946 C8.88,9.16800111 8.84550035,9.36299916 8.7765,9.531 C8.70749966,9.69900084 8.60550068,9.85499928 8.4705,9.999 C8.33549933,10.1430007 8.16600102,10.2854993 7.962,10.4265 C7.75799898,10.5675007 7.52100135,10.7219992 7.251,10.89 C7.02899889,11.0220007 6.81600102,11.1629993 6.612,11.313 C6.40799898,11.4630008 6.22500081,11.636999 6.063,11.835 C5.90099919,12.033001 5.76750053,12.2654987 5.6625,12.5325 C5.55749948,12.7995013 5.49000015,13.1219981 5.46,13.5 L9.627,13.5 L9.627,12.825 L6.351,12.825 C6.38700018,12.626999 6.46349942,12.4515008 6.5805,12.2985 C6.69750059,12.1454992 6.83849918,12.0030007 7.0035,11.871 C7.16850083,11.7389993 7.34999901,11.6145006 7.548,11.4975 C7.74600099,11.3804994 7.94399901,11.2620006 8.142,11.142 C8.34000099,11.0159994 8.53199907,10.8840007 8.718,10.746 C8.90400093,10.6079993 9.06899928,10.4535009 9.213,10.2825 C9.35700072,10.1114991 9.47249957,9.91800108 9.5595,9.702 C9.64650044,9.48599892 9.69,9.23700141 9.69,8.955 C9.69,8.6549985 9.63750053,8.39100114 9.5325,8.163 C9.42749948,7.93499886 9.2850009,7.74450077 9.105,7.5915 C8.9249991,7.43849924 8.71350122,7.32150041 8.4705,7.2405 C8.22749879,7.1594996 7.96800138,7.119 7.692,7.119 C7.35599832,7.119 7.05600132,7.17599943 6.792,7.29 C6.52799868,7.40400057 6.30750089,7.561499 6.1305,7.7625 C5.95349912,7.96350101 5.82300042,8.20199862 5.739,8.478 C5.65499958,8.75400138 5.62199991,9.05399838 5.64,9.378 L5.64,9.378 Z M11.643,8.775 C11.643,8.61299919 11.6729997,8.4720006 11.733,8.352 C11.7930003,8.2319994 11.8724995,8.13000042 11.9715,8.046 C12.0705005,7.96199958 12.1889993,7.89900021 12.327,7.857 C12.4650007,7.81499979 12.6089993,7.794 12.759,7.794 C13.0710016,7.794 13.327499,7.87649918 13.5285,8.0415 C13.729501,8.20650083 13.83,8.45099838 13.83,8.775 C13.83,9.09900162 13.731001,9.3509991 13.533,9.531 C13.334999,9.7110009 13.0830015,9.801 12.777,9.801 C12.6209992,9.801 12.4740007,9.78000021 12.336,9.738 C12.1979993,9.69599979 12.0780005,9.63300042 11.976,9.549 C11.8739995,9.46499958 11.7930003,9.35850065 11.733,9.2295 C11.6729997,9.10049936 11.643,8.94900087 11.643,8.775 L11.643,8.775 Z M10.833,8.748 C10.833,9.03600144 10.9139992,9.30149879 11.076,9.5445 C11.2380008,9.78750122 11.4539987,9.96299946 11.724,10.071 C11.3639982,10.1970006 11.088001,10.3994986 10.896,10.6785 C10.703999,10.9575014 10.608,11.2859981 10.608,11.664 C10.608,11.9880016 10.6634994,12.2714988 10.7745,12.5145 C10.8855006,12.7575012 11.038499,12.9599992 11.2335,13.122 C11.428501,13.2840008 11.6579987,13.4039996 11.922,13.482 C12.1860013,13.5600004 12.4709985,13.599 12.777,13.599 C13.0710015,13.599 13.3469987,13.5570004 13.605,13.473 C13.8630013,13.3889996 14.0864991,13.2645008 14.2755,13.0995 C14.4645009,12.9344992 14.6144994,12.7320012 14.7255,12.492 C14.8365006,12.2519988 14.892,11.9760016 14.892,11.664 C14.892,11.267998 14.7990009,10.9335014 14.613,10.6605 C14.4269991,10.3874986 14.1420019,10.1910006 13.758,10.071 C14.0280014,9.9509994 14.2424992,9.77250119 14.4015,9.5355 C14.5605008,9.29849882 14.64,9.03600144 14.64,8.748 C14.64,8.54399898 14.6040004,8.34450098 14.532,8.1495 C14.4599996,7.95449903 14.3475008,7.78050077 14.1945,7.6275 C14.0414992,7.47449924 13.8420012,7.35150047 13.596,7.2585 C13.3499988,7.16549954 13.0530017,7.119 12.705,7.119 C12.4589988,7.119 12.2235011,7.15499964 11.9985,7.227 C11.7734989,7.29900036 11.5740009,7.40399931 11.4,7.542 C11.2259991,7.68000069 11.0880005,7.849499 10.986,8.0505 C10.8839995,8.25150101 10.833,8.48399868 10.833,8.748 L10.833,8.748 Z M11.418,11.7 C11.418,11.5139991 11.4524997,11.3460008 11.5215,11.196 C11.5905003,11.0459993 11.6864994,10.9170005 11.8095,10.809 C11.9325006,10.7009995 12.0764992,10.6185003 12.2415,10.5615 C12.4065008,10.5044997 12.5819991,10.476 12.768,10.476 C12.9480009,10.476 13.1174992,10.5074997 13.2765,10.5705 C13.4355008,10.6335003 13.5749994,10.7189995 13.695,10.827 C13.8150006,10.9350005 13.9094997,11.0624993 13.9785,11.2095 C14.0475003,11.3565007 14.082,11.5169991 14.082,11.691 C14.082,11.8710009 14.0505003,12.0359993 13.9875,12.186 C13.9244997,12.3360008 13.8345006,12.4664994 13.7175,12.5775 C13.6004994,12.6885006 13.4625008,12.7754997 13.3035,12.8385 C13.1444992,12.9015003 12.969001,12.933 12.777,12.933 C12.380998,12.933 12.0555013,12.8235011 11.8005,12.6045 C11.5454987,12.3854989 11.418,12.0840019 11.418,11.7 L11.418,11.7 Z M16.44,10.359 C16.44,10.2029992 16.4415,10.0305009 16.4445,9.8415 C16.4475,9.65249906 16.4624999,9.46350095 16.4895,9.2745 C16.5165001,9.08549906 16.5554997,8.9010009 16.6065,8.721 C16.6575003,8.5409991 16.7324995,8.38350068 16.8315,8.2485 C16.9305005,8.11349933 17.0549993,8.00400042 17.205,7.92 C17.3550008,7.83599958 17.5379989,7.794 17.754,7.794 C17.9700011,7.794 18.1529993,7.83599958 18.303,7.92 C18.4530008,8.00400042 18.5774995,8.11349933 18.6765,8.2485 C18.7755005,8.38350068 18.8504997,8.5409991 18.9015,8.721 C18.9525003,8.9010009 18.9914999,9.08549906 19.0185,9.2745 C19.0455001,9.46350095 19.0605,9.65249906 19.0635,9.8415 C19.0665,10.0305009 19.068,10.2029992 19.068,10.359 C19.068,10.5990012 19.0605001,10.8674985 19.0455,11.1645 C19.0304999,11.4615015 18.9825004,11.7404987 18.9015,12.0015 C18.8204996,12.2625013 18.6900009,12.4829991 18.51,12.663 C18.3299991,12.8430009 18.0780016,12.933 17.754,12.933 C17.4299984,12.933 17.1780009,12.8430009 16.998,12.663 C16.8179991,12.4829991 16.6875004,12.2625013 16.6065,12.0015 C16.5254996,11.7404987 16.4775001,11.4615015 16.4625,11.1645 C16.4474999,10.8674985 16.44,10.5990012 16.44,10.359 L16.44,10.359 Z M15.63,10.368 C15.63,10.6020012 15.6359999,10.8449987 15.648,11.097 C15.6600001,11.3490013 15.6899998,11.5949988 15.738,11.835 C15.7860002,12.0750012 15.8549996,12.3014989 15.945,12.5145 C16.0350005,12.7275011 16.1579992,12.9149992 16.314,13.077 C16.4700008,13.2390008 16.6664988,13.3664995 16.9035,13.4595 C17.1405012,13.5525005 17.4239984,13.599 17.754,13.599 C18.0900017,13.599 18.3749988,13.5525005 18.609,13.4595 C18.8430012,13.3664995 19.0379992,13.2390008 19.194,13.077 C19.3500008,12.9149992 19.4729996,12.7275011 19.563,12.5145 C19.6530005,12.3014989 19.7219998,12.0750012 19.77,11.835 C19.8180002,11.5949988 19.8479999,11.3490013 19.86,11.097 C19.8720001,10.8449987 19.878,10.6020012 19.878,10.368 C19.878,10.1339988 19.8720001,9.89100126 19.86,9.639 C19.8479999,9.38699874 19.8180002,9.1410012 19.77,8.901 C19.7219998,8.6609988 19.6530005,8.43300108 19.563,8.217 C19.4729996,8.00099892 19.3500008,7.81200081 19.194,7.65 C19.0379992,7.48799919 18.8415012,7.35900048 18.6045,7.263 C18.3674988,7.16699952 18.0840017,7.119 17.754,7.119 C17.4239984,7.119 17.1405012,7.16699952 16.9035,7.263 C16.6664988,7.35900048 16.4700008,7.48799919 16.314,7.65 C16.1579992,7.81200081 16.0350005,8.00099892 15.945,8.217 C15.8549996,8.43300108 15.7860002,8.6609988 15.738,8.901 C15.6899998,9.1410012 15.6600001,9.38699874 15.648,9.639 C15.6359999,9.89100126 15.63,10.1339988 15.63,10.368 L15.63,10.368 Z' id='280' stroke='none' fill='#FFFFFF' fill-rule='evenodd' mask='url(#mask-9)'></path> </g> </g> </g> </g> </g> </g> </svg>",
  news_app: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='60px' height='60px' viewBox='0 0 60 60' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 39.1 (31720) - http://www.bohemiancoding.com/sketch --> <title>News</title> <desc>Created with Sketch.</desc> <defs> <linearGradient x1='50%' y1='0%' x2='50%' y2='100%' id='linearGradient-1'> <stop stop-color='#FC5363' offset='0%'></stop> <stop stop-color='#FC3359' offset='100%'></stop> </linearGradient> <path d='M10.136624,47.3823853 C11,47.3823853 11,46.5 11,46.5 L11,12.0052617 C11,11.450071 11.4532303,11 11.9968754,11 L48.0031246,11 C48.5536837,11 49,11.4413032 49,12.0088498 L49,46.9911502 C49,47.5483226 48.543925,48.0029034 47.9964076,48.0062782 C47.9964076,48.0062782 18.6084831,48.1997544 11.0000001,48 C10.1174113,47.9768284 9.41662598,47.668457 9.05755615,47.3823853 C8.69848633,47.0963135 8.36309815,46.7116462 8.36309814,46.6607056 C8.36309814,46.457472 9.27324796,47.3823853 10.136624,47.3823853 Z' id='path-2'></path> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-4'> <feOffset dx='-1' dy='0' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feGaussianBlur stdDeviation='1' in='shadowOffsetOuter1' result='shadowBlurOuter1'></feGaussianBlur> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.25 0' type='matrix' in='shadowBlurOuter1'></feColorMatrix> </filter> </defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Home-Screen-•-iPhone-SE' transform='translate(-244.000000, -115.000000)'> <g id='Home-Screen-•-iPhone-6s-Copy' transform='translate(0.000000, 27.000000)'> <g id='News' transform='translate(244.000000, 88.000000)'> <rect id='BG' fill='url(#linearGradient-1)' x='0' y='0' width='60' height='60' rx='14'></rect> <path d='M8,45.9165262 L8,16.9953764 C8,16.4456452 8.45526288,16 8.99545703,16 L32.004543,16 C32.5543187,16 33,16.4523621 33,16.9927864 L33,47.0072136 C33,47.5555144 32.5447371,48 32.004543,48 L10.9907522,48 C9.33900538,48 8,46.6569475 8,45.9165262 L8,45.9165262 Z' id='Fold' fill='#FFFFFF'></path> <mask id='mask-3' fill='white'> <use xlink:href='#path-2'></use> </mask> <g id='Mask'> <use fill='black' fill-opacity='1' filter='url(#filter-4)' xlink:href='#path-2'></use> <use fill='#FFFFFF' fill-rule='evenodd' xlink:href='#path-2'></use> </g> <rect id='lines' fill='#BDBDBD' mask='url(#mask-3)' x='17' y='35' width='33' height='2' rx='1'></rect> <rect id='lines' fill='#BDBDBD' mask='url(#mask-3)' x='17' y='39' width='33' height='2' rx='1'></rect> <rect id='lines' fill='#BDBDBD' mask='url(#mask-3)' x='17' y='43' width='33' height='2' rx='1'></rect> <path d='M16,20.1213203 L16,16.9976567 C16,16.4466661 16.4410535,16 16.9976567,16 L20.1213203,16 L20,16.1213203 L31,27.1213203 L31,30.0011436 C31,30.5527968 30.5550661,31 30.0011436,31 L27.1213203,31 L16.1213203,20 L16,20.1213203 L16,20.1213203 Z M16,29.9997809 C16,30.5521867 16.4513294,31 17.0002191,31 L21.8784606,31 C22.4308663,31 22.5652427,30.6865631 22.1684484,30.2897688 L16.7102312,24.8315516 C16.3179814,24.4393017 16,24.5726497 16,25.1215394 L16,29.9997809 Z M29.9997809,16 C30.5521867,16 31,16.4513294 31,17.0002191 L31,21.8784606 C31,22.4308663 30.6873855,22.5660652 30.2956989,22.1743785 L29.5913977,21.4700774 L24.825239,16.7039186 C24.4364754,16.3151551 24.5726497,16 25.1215394,16 L29.9997809,16 Z' id='Logo' fill='#FD4C61' mask='url(#mask-3)'></path> </g> </g> </g> </g> </svg>",
  wallet_app: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='60px' height='60px' viewBox='0 0 60 60' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 39.1 (31720) - http://www.bohemiancoding.com/sketch --> <title>Wallet</title> <desc>Created with Sketch.</desc> <defs> <linearGradient x1='50%' y1='0%' x2='50%' y2='100%' id='linearGradient-1'> <stop stop-color='#1E1E1F' offset='0%'></stop> <stop stop-color='#1E1E1F' offset='100%'></stop> </linearGradient> <rect id='path-2' x='9' y='15' width='42' height='13' rx='2'></rect> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-3'> <feOffset dx='0' dy='0' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feGaussianBlur stdDeviation='0.5' in='shadowOffsetOuter1' result='shadowBlurOuter1'></feGaussianBlur> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.1 0' type='matrix' in='shadowBlurOuter1'></feColorMatrix> </filter> <rect id='path-4' x='9' y='18' width='42' height='13' rx='2'></rect> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-5'> <feOffset dx='0' dy='0' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feGaussianBlur stdDeviation='0.5' in='shadowOffsetOuter1' result='shadowBlurOuter1'></feGaussianBlur> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.1 0' type='matrix' in='shadowBlurOuter1'></feColorMatrix> </filter> <rect id='path-6' x='9' y='21' width='42' height='13' rx='2'></rect> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-7'> <feOffset dx='0' dy='0' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feGaussianBlur stdDeviation='0.5' in='shadowOffsetOuter1' result='shadowBlurOuter1'></feGaussianBlur> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.1 0' type='matrix' in='shadowBlurOuter1'></feColorMatrix> </filter> <rect id='path-8' x='9' y='25' width='42' height='13' rx='2'></rect> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-9'> <feOffset dx='0' dy='0' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feGaussianBlur stdDeviation='0.5' in='shadowOffsetOuter1' result='shadowBlurOuter1'></feGaussianBlur> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.1 0' type='matrix' in='shadowBlurOuter1'></feColorMatrix> </filter> <path d='M7,28 L7,42 L53,42 L53,28 L38.9065073,28 C37.7983339,28 36.3057558,28.6722229 35.5501237,29.4784882 C35.5501237,29.4784882 32.4189579,33.3076923 30,33.3076923 C27.5810421,33.3076923 24.4498763,29.4784882 24.4498763,29.4784882 C23.7043702,28.6619417 22.2114781,28 21.0934927,28 L7,28 Z' id='path-10'></path> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-11'> <feOffset dx='0' dy='-1' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feGaussianBlur stdDeviation='1' in='shadowOffsetOuter1' result='shadowBlurOuter1'></feGaussianBlur> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.1 0' type='matrix' in='shadowBlurOuter1'></feColorMatrix> </filter> </defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Home-Screen-•-iPhone-SE' transform='translate(-16.000000, -203.000000)'> <g id='Home-Screen-•-iPhone-6s-Copy' transform='translate(0.000000, 27.000000)'> <g id='Wallet' transform='translate(16.000000, 176.000000)'> <rect id='BG' fill='url(#linearGradient-1)' x='0' y='0' width='60' height='60' rx='14'></rect> <rect id='wallet' fill='#D9D6CC' x='7' y='12' width='46' height='34' rx='4'></rect> <g id='cards'> <use fill='black' fill-opacity='1' filter='url(#filter-3)' xlink:href='#path-2'></use> <use fill='#3B99C9' fill-rule='evenodd' xlink:href='#path-2'></use> </g> <g id='cards'> <use fill='black' fill-opacity='1' filter='url(#filter-5)' xlink:href='#path-4'></use> <use fill='#FFB003' fill-rule='evenodd' xlink:href='#path-4'></use> </g> <g id='cards'> <use fill='black' fill-opacity='1' filter='url(#filter-7)' xlink:href='#path-6'></use> <use fill='#50BE3D' fill-rule='evenodd' xlink:href='#path-6'></use> </g> <g id='cards'> <use fill='black' fill-opacity='1' filter='url(#filter-9)' xlink:href='#path-8'></use> <use fill='#F16C5E' fill-rule='evenodd' xlink:href='#path-8'></use> </g> <g id='Combined-Shape'> <use fill='black' fill-opacity='1' filter='url(#filter-11)' xlink:href='#path-10'></use> <use fill='#D9D6CC' fill-rule='evenodd' xlink:href='#path-10'></use> </g> </g> </g> </g> </g> </svg>",
  notes_app: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='60px' height='60px' viewBox='0 0 60 60' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 39.1 (31720) - http://www.bohemiancoding.com/sketch --> <title>Notes</title> <desc>Created with Sketch.</desc> <defs> <linearGradient x1='50%' y1='0%' x2='50%' y2='100%' id='linearGradient-1'> <stop stop-color='#F8F8F8' offset='0%'></stop> <stop stop-color='#EDEDED' offset='100%'></stop> </linearGradient> <path d='M39.0815,0 C45.105,0 48.116,0 51.3585,1.025 C54.8985,2.3135 57.6865,5.1015 58.975,8.6415 C60,11.8835 60,14.8955 60,20.9185 L60,39.0815 C60,45.105 60,48.116 58.975,51.3585 C57.6865,54.8985 54.8985,57.6865 51.3585,58.9745 C48.116,60 45.105,60 39.0815,60 L20.9185,60 C14.895,60 11.8835,60 8.6415,58.9745 C5.1015,57.6865 2.3135,54.8985 1.025,51.3585 C0,48.116 0,45.105 0,39.0815 L0,20.9185 C0,14.8955 0,11.8835 1.025,8.6415 C2.3135,5.1015 5.1015,2.3135 8.6415,1.025 C11.8835,0 14.895,0 20.9185,0 L39.0815,0 Z' id='path-2'></path> <linearGradient x1='50%' y1='0%' x2='50%' y2='100%' id='linearGradient-4'> <stop stop-color='#FFDF63' offset='0%'></stop> <stop stop-color='#FFCD02' offset='100%'></stop> </linearGradient> <rect id='path-5' x='0' y='-1' width='60' height='20'></rect> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-6'> <feOffset dx='0' dy='0.5' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feGaussianBlur stdDeviation='0.5' in='shadowOffsetOuter1' result='shadowBlurOuter1'></feGaussianBlur> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.3 0' type='matrix' in='shadowBlurOuter1'></feColorMatrix> </filter> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-7'> <feOffset dx='0' dy='-0.5' in='SourceAlpha' result='shadowOffsetInner1'></feOffset> <feComposite in='shadowOffsetInner1' in2='SourceAlpha' operator='arithmetic' k2='-1' k3='1' result='shadowInnerInner1'></feComposite> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.2 0' type='matrix' in='shadowInnerInner1'></feColorMatrix> </filter> </defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Home-Screen-•-iPhone-SE' transform='translate(-92.000000, -203.000000)'> <g id='Home-Screen-•-iPhone-6s-Copy' transform='translate(0.000000, 27.000000)'> <g id='Notes' transform='translate(92.000000, 176.000000)'> <mask id='mask-3' fill='white'> <use xlink:href='#path-2'></use> </mask> <use id='BG' fill='url(#linearGradient-1)' xlink:href='#path-2'></use> <g id='header' mask='url(#mask-3)'> <use fill='black' fill-opacity='1' filter='url(#filter-6)' xlink:href='#path-5'></use> <use fill='url(#linearGradient-4)' fill-rule='evenodd' xlink:href='#path-5'></use> <use fill='black' fill-opacity='1' filter='url(#filter-7)' xlink:href='#path-5'></use> </g> <polygon id='line' fill='#B7B7B7' mask='url(#mask-3)' points='59.75 30.5 60 30.5 60 30 59.75 30 -0.25 30 -0.5 30 -0.5 30.5 -0.25 30.5'></polygon> <polygon id='line' fill='#B7B7B7' mask='url(#mask-3)' points='59.75 41.5 60 41.5 60 41 59.75 41 -0.25 41 -0.5 41 -0.5 41.5 -0.25 41.5'></polygon> <polygon id='line' fill='#B7B7B7' mask='url(#mask-3)' points='59.75 53 60 53 60 52.5 59.75 52.5 -0.25 52.5 -0.5 52.5 -0.5 53 -0.25 53'></polygon> <path d='M58.5,22 L59.5,22 L59.5,23 L58.5,23 L58.5,22 L58.5,22 Z M56.5,22 L57.5,22 L57.5,23 L56.5,23 L56.5,22 L56.5,22 Z M54.5,22 L55.5,22 L55.5,23 L54.5,23 L54.5,22 L54.5,22 Z M52.5,22 L53.5,22 L53.5,23 L52.5,23 L52.5,22 L52.5,22 Z M50.5,22 L51.5,22 L51.5,23 L50.5,23 L50.5,22 L50.5,22 Z M48.5,22 L49.5,22 L49.5,23 L48.5,23 L48.5,22 L48.5,22 Z M46.5,22 L47.5,22 L47.5,23 L46.5,23 L46.5,22 L46.5,22 Z M44.5,22 L45.5,22 L45.5,23 L44.5,23 L44.5,22 L44.5,22 Z M42.5,22 L43.5,22 L43.5,23 L42.5,23 L42.5,22 L42.5,22 Z M40.5,22 L41.5,22 L41.5,23 L40.5,23 L40.5,22 L40.5,22 Z M38.5,22 L39.5,22 L39.5,23 L38.5,23 L38.5,22 L38.5,22 Z M36.5,22 L37.5,22 L37.5,23 L36.5,23 L36.5,22 L36.5,22 Z M34.5,22 L35.5,22 L35.5,23 L34.5,23 L34.5,22 L34.5,22 Z M32.5,22 L33.5,22 L33.5,23 L32.5,23 L32.5,22 L32.5,22 Z M30.5,22 L31.5,22 L31.5,23 L30.5,23 L30.5,22 L30.5,22 Z M28.5,22 L29.5,22 L29.5,23 L28.5,23 L28.5,22 L28.5,22 Z M26.5,22 L27.5,22 L27.5,23 L26.5,23 L26.5,22 L26.5,22 Z M24.5,22 L25.5,22 L25.5,23 L24.5,23 L24.5,22 L24.5,22 Z M22.5,22 L23.5,22 L23.5,23 L22.5,23 L22.5,22 L22.5,22 Z M20.5,22 L21.5,22 L21.5,23 L20.5,23 L20.5,22 L20.5,22 Z M18.5,22 L19.5,22 L19.5,23 L18.5,23 L18.5,22 L18.5,22 Z M16.5,22 L17.5,22 L17.5,23 L16.5,23 L16.5,22 L16.5,22 Z M14.5,22 L15.5,22 L15.5,23 L14.5,23 L14.5,22 L14.5,22 Z M12.5,22 L13.5,22 L13.5,23 L12.5,23 L12.5,22 L12.5,22 Z M10.5,22 L11.5,22 L11.5,23 L10.5,23 L10.5,22 L10.5,22 Z M8.5,22 L9.5,22 L9.5,23 L8.5,23 L8.5,22 L8.5,22 Z M6.5,22 L7.5,22 L7.5,23 L6.5,23 L6.5,22 L6.5,22 Z M4.5,22 L5.5,22 L5.5,23 L4.5,23 L4.5,22 L4.5,22 Z M2.5,22 L3.5,22 L3.5,23 L2.5,23 L2.5,22 L2.5,22 Z M0.5,22 L1.5,22 L1.5,23 L0.5,23 L0.5,22 L0.5,22 Z' id='Rectangle-37' fill='#AAAAAA' mask='url(#mask-3)'></path> </g> </g> </g> </g> </svg>",
  reminders_app: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='60px' height='60px' viewBox='0 0 60 60' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 39.1 (31720) - http://www.bohemiancoding.com/sketch --> <title>min</title> <desc>Created with Sketch.</desc> <defs> <rect id='path-1' x='0' y='0' width='60' height='60' rx='14'></rect> <circle id='path-3' cx='10' cy='12' r='4'></circle> <mask id='mask-4' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='0' y='0' width='8' height='8' fill='white'> <use xlink:href='#path-3'></use> </mask> <mask id='mask-5' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='-0.5' y='-0.5' width='9' height='9'> <rect x='5.5' y='7.5' width='9' height='9' fill='white'></rect> <use xlink:href='#path-3' fill='black'></use> </mask> <circle id='path-6' cx='10' cy='23' r='4'></circle> <mask id='mask-7' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='0' y='0' width='8' height='8' fill='white'> <use xlink:href='#path-6'></use> </mask> <mask id='mask-8' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='-0.5' y='-0.5' width='9' height='9'> <rect x='5.5' y='18.5' width='9' height='9' fill='white'></rect> <use xlink:href='#path-6' fill='black'></use> </mask> <circle id='path-9' cx='10' cy='35' r='4'></circle> <mask id='mask-10' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='0' y='0' width='8' height='8' fill='white'> <use xlink:href='#path-9'></use> </mask> <mask id='mask-11' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='-0.5' y='-0.5' width='9' height='9'> <rect x='5.5' y='30.5' width='9' height='9' fill='white'></rect> <use xlink:href='#path-9' fill='black'></use> </mask> <circle id='path-12' cx='10' cy='46' r='4'></circle> <mask id='mask-13' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='0' y='0' width='8' height='8' fill='white'> <use xlink:href='#path-12'></use> </mask> <mask id='mask-14' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='-0.5' y='-0.5' width='9' height='9'> <rect x='5.5' y='41.5' width='9' height='9' fill='white'></rect> <use xlink:href='#path-12' fill='black'></use> </mask> </defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Home-Screen-•-iPhone-SE' transform='translate(-168.000000, -203.000000)'> <g id='Home-Screen-•-iPhone-6s-Copy' transform='translate(0.000000, 27.000000)'> <g id='min' transform='translate(168.000000, 176.000000)'> <mask id='mask-2' fill='white'> <use xlink:href='#path-1'></use> </mask> <use id='BG' fill='#FFFFFF' xlink:href='#path-1'></use> <g id='circle' mask='url(#mask-2)'> <use stroke='#FFFFFF' mask='url(#mask-4)' fill='#FF9500' fill-rule='evenodd' xlink:href='#path-3'></use> <use stroke='#FF9500' mask='url(#mask-5)' xlink:href='#path-3'></use> </g> <g id='circle' mask='url(#mask-2)'> <use stroke='#FFFFFF' mask='url(#mask-7)' fill='#1BADF8' fill-rule='evenodd' xlink:href='#path-6'></use> <use stroke='#1BADF8' mask='url(#mask-8)' xlink:href='#path-6'></use> </g> <g id='circle' mask='url(#mask-2)'> <use stroke='#FFFFFF' mask='url(#mask-10)' fill='#63DA38' fill-rule='evenodd' xlink:href='#path-9'></use> <use stroke='#63DA38' mask='url(#mask-11)' xlink:href='#path-9'></use> </g> <g id='circle' mask='url(#mask-2)'> <use stroke='#FFFFFF' mask='url(#mask-13)' fill='#CC73E1' fill-rule='evenodd' xlink:href='#path-12'></use> <use stroke='#CC73E1' mask='url(#mask-14)' xlink:href='#path-12'></use> </g> <rect id='line' fill='#AEAEAE' mask='url(#mask-2)' x='19' y='17.5' width='41' height='0.5'></rect> <rect id='line' fill='#AEAEAE' mask='url(#mask-2)' x='19' y='6' width='41' height='0.5'></rect> <rect id='line' fill='#AEAEAE' mask='url(#mask-2)' x='19' y='29' width='41' height='0.5'></rect> <rect id='line' fill='#AEAEAE' mask='url(#mask-2)' x='19' y='40' width='41' height='0.5'></rect> <rect id='line' fill='#AEAEAE' mask='url(#mask-2)' x='19' y='51.5' width='41' height='0.5'></rect> </g> </g> </g> </g> </svg>",
  stocks_app: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='60px' height='60px' viewBox='0 0 60 60' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 39.1 (31720) - http://www.bohemiancoding.com/sketch --> <title>Stocks</title> <desc>Created with Sketch.</desc> <defs> <path d='M39.0815,0 C45.105,0 48.116,0 51.3585,1.025 C54.8985,2.3135 57.6865,5.1015 58.975,8.6415 C60,11.8835 60,14.8955 60,20.9185 L60,39.0815 C60,45.105 60,48.116 58.975,51.3585 C57.6865,54.8985 54.8985,57.6865 51.3585,58.9745 C48.116,60 45.105,60 39.0815,60 L20.9185,60 C14.895,60 11.8835,60 8.6415,58.9745 C5.1015,57.6865 2.3135,54.8985 1.025,51.3585 C0,48.116 0,45.105 0,39.0815 L0,20.9185 C0,14.8955 0,11.8835 1.025,8.6415 C2.3135,5.1015 5.1015,2.3135 8.6415,1.025 C11.8835,0 14.895,0 20.9185,0 L39.0815,0 Z' id='path-1'></path> <linearGradient x1='50%' y1='0%' x2='50%' y2='100%' id='linearGradient-3'> <stop stop-color='#454545' offset='0%'></stop> <stop stop-color='#111112' offset='100%'></stop> </linearGradient> <path d='M41.5,16.0112108 L41.5,-1.5 L41,-1.5 L41,16.0112108 C41.0823405,16.0037907 41.1657276,16 41.25,16 C41.3342724,16 41.4176595,16.0037907 41.5,16.0112108 Z M41.5,21.4887892 L41.5,63 L41,63 L41,21.4887892 C41.0823405,21.4962093 41.1657276,21.5 41.25,21.5 C41.3342724,21.5 41.4176595,21.4962093 41.5,21.4887892 Z M41.25,21 C42.4926407,21 43.5,19.9926407 43.5,18.75 C43.5,17.5073593 42.4926407,16.5 41.25,16.5 C40.0073593,16.5 39,17.5073593 39,18.75 C39,19.9926407 40.0073593,21 41.25,21 Z' id='path-4'></path> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-5'> <feOffset dx='0' dy='1' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0' type='matrix' in='shadowOffsetOuter1'></feColorMatrix> </filter> </defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Home-Screen-•-iPhone-SE' transform='translate(-244.000000, -203.000000)'> <g id='Home-Screen-•-iPhone-6s-Copy' transform='translate(0.000000, 27.000000)'> <g id='Stocks' transform='translate(244.000000, 176.000000)'> <mask id='mask-2' fill='white'> <use xlink:href='#path-1'></use> </mask> <use id='BG' fill='#141416' xlink:href='#path-1'></use> <path d='M-0.484863281,34.0537109 C-0.484863281,34.0537109 1.27239211,34.0644686 3.11938477,34.6320801 C4.70794495,35.120271 6.30098176,36.2523786 7.23388672,36.1945801 C9.25146484,36.0695801 11.3344727,35.3759766 11.3344727,35.3759766 L15.1208496,30.4450684 L18.7275391,33.5263672 L22.4941406,24.6245117 L26.1196289,34.3369141 L30.25,36.8659668 L33.9467773,30.2084961 L37.5385742,29.276123 L41.4316406,18.1323242 L45.1474609,27.2033691 L48.9438477,24.6655273 L52.7734375,31.9936523 L56.3422852,23.8173828 L60.3457031,19.65625 L60.3457031,60.4791166 L-0.304989325,60.4791166 L-0.484863281,34.0537109 Z' id='graph' stroke='#FFFFFF' stroke-width='0.75' fill='url(#linearGradient-3)' mask='url(#mask-2)'></path> <g id='mark' mask='url(#mask-2)'> <use fill='black' fill-opacity='1' filter='url(#filter-5)' xlink:href='#path-4'></use> <use fill='#01A6F1' fill-rule='evenodd' xlink:href='#path-4'></use> </g> <g id='Spark-line' mask='url(#mask-2)' fill='#777778'> <g transform='translate(7.000000, -1.500000)' id='mark'> <rect x='0' y='0' width='0.5' height='64.5'></rect> <rect x='11.5' y='0' width='0.5' height='64.5'></rect> <rect x='23' y='0' width='0.5' height='64.5'></rect> <rect x='45.5' y='0' width='0.5' height='64.5'></rect> </g> </g> </g> </g> </g> </g> </svg>"
};

exports.frames = {
  "fullscreen": {
    height: window.innerHeight,
    width: window.innerWidth,
    scale: 1,
    mobile: false,
    platform: "web"
  },
  "apple-iphone-5s-space-gray": {
    height: 1136,
    width: 640,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-iphone-5s-silver": {
    height: 1136,
    width: 640,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-iphone-5s-gold": {
    height: 1136,
    width: 640,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-iphone-5c-green": {
    height: 1136,
    width: 640,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-iphone-5c-blue": {
    height: 1136,
    width: 640,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-iphone-5c-red": {
    height: 1136,
    width: 640,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-iphone-5c-white": {
    height: 1136,
    width: 640,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-iphone-5c-yellow": {
    height: 1136,
    width: 640,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-iphone-5c-pink": {
    height: 1136,
    width: 640,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-iphone-6s-space-gray": {
    height: 1334,
    width: 750,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-iphone-6s-silver": {
    height: 1334,
    width: 750,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-iphone-6s-gold": {
    height: 1334,
    width: 750,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-iphone-6s-rose-gold": {
    height: 1334,
    width: 750,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-iphone-6s-plus-gold": {
    height: 2208,
    width: 1242,
    scale: 3,
    mobile: true,
    platform: "iOS"
  },
  "apple-iphone-6s-plus-silver": {
    height: 2208,
    width: 1242,
    scale: 3,
    mobile: true,
    platform: "iOS"
  },
  "apple-iphone-6s-plus-space-gray": {
    height: 2208,
    width: 1242,
    scale: 3,
    mobile: true,
    platform: "iOS"
  },
  "apple-iphone-6s-plus": {
    height: 2208,
    width: 1242,
    scale: 3,
    mobile: true,
    platform: "iOS"
  },
  "apple-iphone-6s-plus-rose-gold": {
    height: 2208,
    width: 1242,
    scale: 3,
    mobile: true,
    platform: "iOS"
  },
  "apple-ipad-air-2-gold": {
    height: 2048,
    width: 1536,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-ipad-air-2-silver": {
    height: 2048,
    width: 1536,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-ipad-air-2-space-gray": {
    height: 2048,
    width: 1536,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-ipad-mini-4-gold": {
    height: 2048,
    width: 1536,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-ipad-mini-4-space-gray": {
    height: 2048,
    width: 1536,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-ipad-mini-4-silver": {
    height: 2048,
    width: 1536,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-ipad-pro-gold": {
    height: 2732,
    width: 2048,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-ipad-pro-silver": {
    height: 2732,
    width: 2048,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-ipad-pro-space-gray": {
    height: 2732,
    width: 2048,
    scale: 2,
    mobile: true,
    platform: "iOS"
  }
};

exports.framerFrames = {
  640: 2,
  750: 2,
  768: 2,
  1080: 3,
  1242: 3,
  1440: 4,
  1536: 2
};

exports.realDevices = {
  320: {
    480: {
      name: "iphone",
      display_name: "iPhone",
      width: 320,
      height: 480,
      scale: 1
    }
  },
  480: {
    854: {
      name: "Android One",
      width: 480,
      height: 854,
      scale: 1.5
    }
  },
  640: {
    960: {
      name: "iphone-5",
      display_name: "iPhone 4",
      width: 640,
      height: 960,
      scale: 2
    },
    1136: {
      name: "iphone-5",
      display_name: "iPhone 5",
      width: 640,
      height: 1136,
      scale: 2
    }
  },
  720: {
    1280: {
      name: "XHDPI",
      width: 720,
      height: 1280,
      scale: 2
    }
  },
  750: {
    1118: {
      name: "iphone-6s",
      display_name: "iPhone 6s",
      width: 750,
      height: 1118,
      scale: 2
    },
    1334: {
      name: "iphone-6s",
      display_name: "iPhone 6s",
      width: 750,
      height: 1334,
      scale: 2
    }
  },
  768: {
    1024: {
      name: "ipad",
      display_name: "iPad",
      width: 768,
      height: 1024,
      scale: 1
    },
    1280: {
      name: "Nexus 4",
      width: 768,
      height: 1280,
      scale: 2
    }
  },
  800: {
    1280: {
      name: "Nexus 7",
      width: 800,
      height: 1280,
      scale: 1
    }
  },
  1080: {
    1920: {
      name: "XXHDPI",
      width: 1080,
      height: 1920,
      scale: 3
    }
  },
  1200: {
    1920: {
      name: "Nexus 7",
      width: 1200,
      height: 1920,
      scale: 2
    }
  },
  1242: {
    2208: {
      name: "iphone-6s-plus",
      display_name: "iPhone 6 Plus",
      width: 1242,
      height: 2208,
      scale: 3
    }
  },
  1334: {
    750: {
      name: "iphone-6s",
      display_name: "iPhone 6s",
      width: 750,
      height: 1334,
      scale: 2
    }
  },
  1440: {
    2560: {
      name: "XXXHDPI",
      width: 1440,
      height: 2560,
      scale: 4
    }
  },
  1441: {
    2561: {
      name: "Nexus 6",
      width: 1440,
      height: 2560,
      scale: 4
    }
  },
  1536: {
    2048: {
      name: "ipad",
      display_name: "iPad",
      width: 1536,
      height: 2048,
      scale: 2
    }
  },
  1600: {
    2056: {
      name: "Nexus 10",
      width: 1600,
      height: 2056,
      scale: 2
    }
  },
  2208: {
    1242: {
      name: "iphone-6s-plus",
      display_name: "iPhone 6 Plus",
      width: 1242,
      height: 2208,
      scale: 3
    }
  },
  2048: {
    1536: {
      name: "Nexus 9",
      width: 2048,
      height: 1536,
      scale: 2
    },
    2732: {
      name: "ipad-pro",
      display_name: "iPad Pro",
      width: 2048,
      height: 2732,
      scale: 2
    }
  },
  2560: {
    1600: {
      name: "Nexus 10",
      width: 2560,
      height: 1600,
      scale: 2
    }
  },
  2732: {
    2048: {
      name: "ipad-pro",
      display_name: "iPad Pro",
      width: 2732,
      height: 2048,
      scale: 2
    }
  }
};


},{"ios-kit":17}],10:[function(require,module,exports){
var ios;

ios = require('ios-kit');

exports.defaults = {
  title: "Title",
  left: void 0,
  right: "Edit",
  blur: true,
  superLayer: void 0,
  type: "navBar",
  color: 'blue',
  titleColor: 'black',
  backgroundColor: "rgba(255, 255, 255, .8)",
  dividerBackgroundColor: "#B2B2B2"
};

exports.defaults.props = Object.keys(exports.defaults);

exports.create = function(array) {
  var bar, i, layer, len, ref, setLeading, setup, svg;
  setup = ios.utils.setupComponent(array, exports.defaults);
  bar = new ios.View({
    name: "navBar",
    backgroundColor: setup.backgroundColor,
    constraints: {
      leading: 0,
      trailing: 0,
      top: 0,
      height: 64
    }
  });
  bar.bg = new ios.View({
    superLayer: bar,
    backgroundColor: 'transparent',
    name: ".bg",
    constraints: {
      leading: 0,
      trailing: 0,
      height: 44,
      bottom: 0
    }
  });
  bar.divider = new ios.View({
    backgroundColor: setup.dividerBackgroundColor,
    name: ".divider",
    superLayer: bar.bg,
    constraints: {
      height: .5,
      bottom: 0,
      leading: 0,
      trailing: 0
    }
  });
  if (setup.superLayer) {
    setup.superLayer.addSubLayer(bar);
  }
  if (setup.blur) {
    ios.utils.bgBlur(bar);
  }
  if (setup.blur === false && setup.backgroundColor === "rgba(255, 255, 255, .8)") {
    bar.backgroundColor = 'white';
  }
  bar.type = setup.type;
  ref = Framer.CurrentContext.layers;
  for (i = 0, len = ref.length; i < len; i++) {
    layer = ref[i];
    if (layer.type === "statusBar") {
      this.statusBar = layer;
      bar.placeBehind(this.statusBar);
    }
  }
  if (typeof setup.title === "object") {
    setup.title = setup.title.label.html;
  }
  bar.title = new ios.Text({
    fontWeight: "semibold",
    superLayer: bar.bg,
    text: setup.title,
    name: ".title",
    color: setup.titleColor,
    constraints: {
      align: "horizontal",
      bottom: 12
    }
  });
  ios.utils.specialChar(bar.title);
  if (typeof setup.right === "string" && typeof setup.right !== "boolean") {
    bar.right = new ios.Button({
      name: ".right",
      superLayer: bar.bg,
      text: setup.right,
      color: setup.color,
      fontWeight: 500,
      constraints: {
        bottom: 12,
        trailing: 8
      }
    });
    bar.right.type = "button";
    ios.utils.specialChar(bar.right);
  }
  if (typeof setup.right === "object") {
    bar.right = setup.right;
    bar.right.name = ".right";
    bar.right.superLayer = bar.bg;
    bar.right.constraints = {
      trailing: 8,
      bottom: 12
    };
    ios.layout.set(bar.right);
  }
  if (typeof setup.left === "string" && typeof setup.left !== "boolean") {
    setLeading = 8;
    if (setup.left.indexOf("<") !== -1) {
      svg = ios.utils.svg(ios.assets.chevron);
      bar.chevron = new ios.View({
        name: ".chevron",
        width: svg.width,
        height: svg.height,
        backgroundColor: "transparent",
        superLayer: bar.bg
      });
      bar.chevron.html = svg.svg;
      bar.chevron.constraints = {
        bottom: 9,
        leading: 8
      };
      setup.left = setup.left.replace("<", "");
      ios.utils.changeFill(bar.chevron, setup.color);
      setLeading = [bar.chevron, 4];
      ios.layout.set(bar.chevron);
    }
    bar.left = new ios.Button({
      name: ".left",
      superLayer: bar.bg,
      text: setup.left,
      color: setup.color,
      fontWeight: 500,
      constraints: {
        bottom: 12,
        leading: setLeading
      }
    });
    bar.left.type = "button";
    ios.utils.specialChar(bar.left);
    bar.left.on(Events.TouchStart, function() {
      if (bar.chevron) {
        return bar.chevron.animate({
          properties: {
            opacity: .25
          },
          time: .5
        });
      }
    });
    bar.left.on(Events.TouchEnd, function() {
      if (bar.chevron) {
        return bar.chevron.animate({
          properties: {
            opacity: 1
          },
          time: .5
        });
      }
    });
  }
  if (typeof setup.left === "object") {
    bar.left = setup.left;
    bar.left.name = ".left";
    bar.left.superLayer = bar.bg;
    bar.left.constraints = {
      leading: 8,
      bottom: 12
    };
  }
  ios.layout.set(bar.left);
  return bar;
};


},{"ios-kit":17}],11:[function(require,module,exports){
var ios;

ios = require('ios-kit');

exports.defaults = {
  actions: ["Reply", "Reply All", "Forward", "Print"],
  exit: "Cancel",
  animated: true,
  description: void 0,
  target: void 0
};

exports.defaults.props = Object.keys(exports.defaults);

exports.create = function(array) {
  var a, action, i, j, k, l, len, len1, place, ref, ref1, setup, sheet, sheetTip;
  setup = ios.utils.setupComponent(array, exports.defaults);
  ref = Framer.CurrentContext.layers;
  for (j = 0, len = ref.length; j < len; j++) {
    l = ref[j];
    if (l.type === 'sheet') {
      l.dismiss();
    }
  }
  sheet = new ios.View({
    name: "sheet",
    backgroundColor: "transparent",
    constraints: {
      top: 0,
      leading: 0,
      trailing: 0,
      bottom: 0
    }
  });
  sheet.type = 'sheet';
  sheet.menu = new Layer({
    name: "menu",
    superLayer: sheet,
    backgroundColor: "transparent",
    borderRadius: ios.px(12),
    clip: true
  }, ios.isPad() ? (sheetTip = ios.utils.svg(ios.assets.sheetTip), sheet.tip = new ios.View({
    name: '.tip',
    color: 'black',
    superLayer: sheet,
    html: sheetTip.svg,
    height: sheetTip.height - 4,
    width: sheetTip.width,
    backgroundColor: 'transparent',
    constraints: {
      horizontalCenter: setup.target
    }
  }), sheet.linked = setup.target, sheet.linked.ignoreEvents = true) : void 0);
  place = function(t, l) {
    var centerX, h, w;
    w = ios.device.width;
    h = ios.device.height;
    centerX = w / 2;
    if (w - t.x > centerX) {
      if (t.x - ios.px(150) < 0) {
        l.constraints.leading = 10;
      } else {
        l.constraints.horizontalCenter = t;
      }
    } else {
      if (t.x + ios.px(150) > w) {
        l.constraints.trailing = 10;
      } else {
        l.constraints.horizontalCenter = t;
      }
    }
    if (t.y + l.height < h) {
      l.constraints.top = [t, 40];
      if (ios.isPad()) {
        sheet.tip.constraints.bottom = [l, 1];
      }
    } else {
      l.constraints.bottom = [t, 40];
      if (ios.isPad()) {
        sheet.tip.constraints.top = [l, 1];
        sheet.tip.rotation = 180;
      }
    }
    if (ios.isPad()) {
      return ios.layout.set(sheet.tip);
    }
  };
  sheet.dismiss = function() {
    if (ios.isPhone()) {
      sheet.menu.animate({
        properties: {
          y: ios.device.height
        },
        time: .25
      });
      sheet.cancel.animate({
        properties: {
          y: ios.device.height + ios.px(75)
        },
        time: .25
      });
      sheet.overlay.animate({
        properties: {
          opacity: 0
        },
        time: .25
      });
      return Utils.delay(.25, function() {
        return sheet.destroy();
      });
    } else {
      sheet.linked.ignoreEvents = false;
      return Utils.delay(.15, function() {
        return sheet.destroy();
      });
    }
  };
  sheet.call = function() {
    if (ios.isPhone()) {
      sheet.menu.y = ios.device.height;
      sheet.cancel.y = ios.device.height + ios.px(75);
      sheet.overlay.opacity = 0;
      sheet.overlay.animate({
        properties: {
          opacity: .5
        },
        time: .25
      });
      return ios.layout.animate({
        target: [sheet.menu, sheet.cancel],
        time: .25
      });
    } else {
      place(setup.target, sheet.menu);
      return ios.layout.set(sheet.menu);
    }
  };
  if (ios.device.name.indexOf("ipad") === -1) {
    sheet.overlay = new ios.View({
      name: ".overlay",
      backgroundColor: "black",
      opacity: .5,
      superLayer: sheet,
      constraints: {
        top: 0,
        leading: 0,
        trailing: 0,
        bottom: 0
      }
    });
    sheet.overlay.sendToBack();
    sheet.menu.constraints = {
      leading: 10,
      trailing: 10,
      bottom: 57 + 8 + 10,
      height: setup.actions.length * 57
    };
    sheet.cancel = new ios.Button({
      name: ".cancel",
      type: "big",
      text: setup.exit,
      superLayer: sheet,
      constraints: {
        bottom: 10,
        leading: 0,
        trailing: 0
      }
    });
    sheet.cancel.on(Events.TouchEnd, function() {
      return sheet.dismiss();
    });
  } else {
    sheet.menu.constraints = {
      width: 300,
      height: setup.actions.length * 57
    };
    sheet.menu.props = {
      shadowY: 2,
      shadowBlur: ios.px(100),
      shadowColor: "rgba(0,0,0,0.1)"
    };
  }
  ios.layout.set(sheet);
  sheet.actionsArray = [];
  sheet.actions = {};
  ref1 = setup.actions;
  for (i = k = 0, len1 = ref1.length; k < len1; i = ++k) {
    a = ref1[i];
    action = new ios.View({
      name: ".actions.[\"" + a.toLowerCase() + "\"]",
      backgroundColor: "rgba(255,255,255,1)",
      superLayer: sheet.menu,
      constraints: {
        leading: 0,
        trailing: 0,
        height: 57
      }
    });
    action.style["-webkit-box-shadow"] = "inset 0 0 " + ios.px(.5) + "px rgba(0,0,0,.25)";
    action.label = new ios.Text({
      text: a,
      color: ios.color("blue"),
      fontSize: 20,
      superLayer: action,
      constraints: {
        align: "center"
      }
    });
    ios.utils.specialChar(action.label);
    if (i === 0) {
      action.constraints.top = 0;
    } else {
      action.constraints.top = sheet.actionsArray[i - 1];
    }
    action.on(Events.TouchStart, function() {
      return this.animate({
        properties: {
          backgroundColor: this.backgroundColor.darken(10),
          time: .2
        }
      });
    });
    action.on(Events.TouchEnd, function() {
      this.animate({
        properties: {
          backgroundColor: "rgba(255,255,255, .8)"
        },
        time: .2
      });
      return sheet.dismiss();
    });
    ios.layout.set(action);
    sheet.actionsArray.push(action);
    sheet.actions[a.toLowerCase()] = action;
  }
  if (setup.animated) {
    sheet.call();
  }
  if (ios.isPad()) {
    sheet.tip.bringToFront();
  }
  return sheet;
};


},{"ios-kit":17}],12:[function(require,module,exports){
var ios;

ios = require('ios-kit');

exports.defaults = {
  carrier: "",
  network: "LTE",
  battery: 100,
  signal: 5,
  style: "dark",
  clock24: false,
  type: "statusBar",
  superLayer: void 0
};

exports.defaults.props = Object.keys(exports.defaults);

exports.create = function(array) {
  var batteryIcon, batteryPercent, bluetooth, bluetoothSVG, carrier, dot, gripper, highBattery, i, j, k, l, layer, len, lowBattery, midBattery, network, networkIcon, noNetwork, nonDot, nonDots, ref, ref1, ref2, setup, signal, statusBar, time;
  setup = ios.utils.setupComponent(array, exports.defaults);
  statusBar = new Layer({
    backgroundColor: "transparent",
    name: "statusBar.all",
    superLayer: setup.superLayer
  });
  statusBar.type = setup.type;
  statusBar.constraints = {
    leading: 0,
    trailing: 0,
    height: 20
  };
  switch (ios.device.name) {
    case "iphone-6s-plus":
      this.topConstraint = 5;
      this.batteryIcon = 5;
      this.bluetooth = 5;
      break;
    case "fullscreen":
      this.topConstraint = 5;
      this.batteryIcon = -12;
      this.bluetooth = -10;
      break;
    default:
      this.topConstraint = 3;
      this.batteryIcon = 2;
      this.bluetooth = 3;
  }
  if (setup.style === "light") {
    this.color = "white";
  } else {
    this.color = "black";
  }
  ref = Framer.CurrentContext.layers;
  for (j = 0, len = ref.length; j < len; j++) {
    layer = ref[j];
    if (layer.type === "lockScreen") {
      this.isLockScreenPutilsent = true;
    }
  }
  if (this.isLockScreenPutilsent) {
    gripper = new Layer({
      superLayer: statusBar,
      width: utils.px(37),
      height: utils.px(5),
      name: "gripper",
      backgroundColor: "transparent",
      opacity: .5,
      name: "gripper"
    });
    gripper.html = "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='" + (utils.px(37)) + "px' height='" + (utils.px(5)) + "px' viewBox='0 0 37 5' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.6.1 (26313) - http://www.bohemiancoding.com/sketch --> <title>Gripper</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Keyboard/Auto-Complete-Bar-Closed' transform='translate(-169.000000, -2.000000)' fill='#FFFFFF'> <rect id='Gripper' x='169.5' y='2.5' width='36' height='4' rx='2.5'></rect> </g> </g> </svg>";
    gripper.constraints = {
      align: "horizontal",
      top: 2
    };
  } else {
    this.time = ios.utils.getTime();
    if (setup.clock24 === false) {
      if (this.time.hours > 11) {
        this.time.stamp = "PM";
      } else {
        this.time.stamp = "AM";
      }
    } else {
      this.time.stamp = "";
    }
    time = new ios.Text({
      style: "statusBarTime",
      text: ios.utils.timeFormatter(this.time, setup.clock24) + " " + this.time.stamp,
      fontSize: 12,
      fontWeight: "semibold",
      superLayer: statusBar,
      color: this.color,
      name: "time"
    });
    time.constraints = {
      align: "horizontal",
      top: this.topConstraint
    };
  }
  signal = [];
  if (setup.signal < 1) {
    noNetwork = new ios.Text({
      superLayer: statusBar,
      fontSize: 12,
      text: "No Network"
    });
    noNetwork.constraints = {
      leading: 7,
      top: 3
    };
  } else {
    for (i = k = 0, ref1 = setup.signal; 0 <= ref1 ? k < ref1 : k > ref1; i = 0 <= ref1 ? ++k : --k) {
      dot = new Layer({
        height: ios.utils.px(5.5),
        width: ios.utils.px(5.5),
        backgroundColor: "black",
        superLayer: statusBar,
        borderRadius: ios.utils.px(5.5) / 2,
        backgroundColor: this.color,
        name: "signal[" + i + "]"
      });
      if (i === 0) {
        dot.constraints = {
          leading: 7,
          top: 7
        };
      } else {
        dot.constraints = {
          leading: [signal[i - 1], 1],
          top: 7
        };
      }
      signal.push(dot);
      ios.layout.set();
    }
    if (setup.signal < 5) {
      nonDots = 5 - setup.signal;
      for (i = l = 0, ref2 = nonDots; 0 <= ref2 ? l < ref2 : l > ref2; i = 0 <= ref2 ? ++l : --l) {
        nonDot = new Layer({
          height: ios.utils.px(5.5),
          width: ios.utils.px(5.5),
          superLayer: statusBar,
          borderRadius: ios.utils.px(5.5) / 2,
          backgroundColor: "transparent",
          name: "signal[" + signal.length + "]"
        });
        nonDot.style.border = (ios.utils.px(1)) + "px solid " + this.color;
        nonDot.constraints = {
          leading: [signal[signal.length - 1], 1],
          top: 7
        };
        signal.push(nonDot);
        ios.layout.set();
      }
    }
    carrier = new ios.Text({
      style: "statusBarCarrier",
      text: setup.carrier,
      superLayer: statusBar,
      fontSize: 12,
      color: this.color,
      name: "carrier",
      textTransform: "capitalize"
    });
    carrier.constraints = {
      leading: [signal[signal.length - 1], 7],
      top: 3
    };
    ios.layout.set();
    if (setup.carrier) {
      network = new ios.Text({
        style: "statusBarNetwork",
        text: setup.network,
        superLayer: statusBar,
        fontSize: 12,
        color: this.color,
        name: "network",
        textTransform: "uppercase"
      });
      network.constraints = {
        leading: [carrier, 5],
        top: 3
      };
    }
    if (setup.carrier === "" || setup.carrier === "wifi") {
      networkIcon = ios.utils.svg(ios.assets.network, this.color);
      network = new Layer({
        width: networkIcon.width,
        height: networkIcon.height,
        superLayer: statusBar,
        backgroundColor: "transparent",
        name: "network"
      });
      network.html = networkIcon.svg;
      ios.utils.changeFill(network, this.color);
      network.constraints = {
        leading: [signal[signal.length - 1], 5],
        top: this.topConstraint
      };
    }
  }
  batteryIcon = new Layer({
    width: ios.utils.px(25),
    height: ios.utils.px(10),
    superLayer: statusBar,
    backgroundColor: "transparent",
    name: "batteryIcon"
  });
  if (setup.battery > 70) {
    highBattery = ios.utils.svg(ios.assets.batteryHigh);
    batteryIcon.html = highBattery.svg;
    ios.utils.changeFill(batteryIcon, this.color);
  }
  if (setup.battery <= 70 && setup.battery > 20) {
    midBattery = ios.utils.svg(ios.assets.batteryMid);
    batteryIcon.html = midBattery.svg;
    ios.utils.changeFill(batteryIcon, this.color);
  }
  if (setup.battery <= 20) {
    lowBattery = ios.utils.svg(ios.assets.batteryLow);
    batteryIcon.html = lowBattery.svg;
    ios.utils.changeFill(batteryIcon, this.color);
  }
  batteryIcon.constraints = {
    trailing: 7,
    top: this.batteryIcon
  };
  batteryPercent = new ios.Text({
    style: "statusBarBatteryPercent",
    text: setup.battery + "%",
    superLayer: statusBar,
    fontSize: 12,
    color: this.color,
    name: "batteryPercent"
  });
  batteryPercent.constraints = {
    trailing: [batteryIcon, 3],
    verticalCenter: time
  };
  bluetoothSVG = ios.utils.svg(ios.assets.bluetooth);
  bluetooth = new Layer({
    width: bluetoothSVG.width,
    height: bluetoothSVG.height,
    superLayer: statusBar,
    opacity: .5,
    backgroundColor: "transparent",
    name: "bluetooth"
  });
  bluetooth.html = bluetoothSVG.svg;
  ios.utils.changeFill(bluetooth, this.color);
  bluetooth.constraints = {
    top: this.bluetooth,
    trailing: [batteryPercent, 7]
  };
  ios.layout.set();
  statusBar.battery = {};
  statusBar.battery.percent = batteryPercent;
  statusBar.battery.icon = batteryIcon;
  statusBar.bluetooth = bluetooth;
  statusBar.time = time;
  statusBar.network = network;
  statusBar.carrier = carrier;
  statusBar.signal = signal;
  return statusBar;
};


},{"ios-kit":17}],13:[function(require,module,exports){
var ios;

ios = require('ios-kit');

exports.defaults = {
  tab: {
    label: "label",
    icon: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='25px' height='25px' viewBox='0 0 25 25' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.6.1 (26313) - http://www.bohemiancoding.com/sketch --> <title>1</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='1'> <g id='Bottom-Bar/Tab-Bar' transform='translate(-25.000000, -7.000000)' fill='#0076FF'> <g id='Placeholders' transform='translate(25.000000, 7.000000)'> <rect id='1' x='0' y='0' width='25' height='25' rx='3'></rect> </g> </g> </g> </svg>",
    active: void 0,
    inactive: void 0,
    tabBar: void 0,
    type: "tab"
  },
  bar: {
    tabs: [],
    start: 0,
    type: "tabBar",
    backgroundColor: "white",
    activeColor: "blue",
    inactiveColor: "gray",
    blur: true
  }
};

exports.defaults.tab.props = Object.keys(exports.defaults.tab);

exports.defaults.bar.props = Object.keys(exports.defaults.bar);

exports.tab = function(array) {
  var setup, specs, svgFrame, tab;
  setup = ios.utils.setupComponent(array, exports.defaults.tab);
  specs = {
    width: 75
  };
  switch (ios.device.name) {
    case "iphone-5":
      specs.width = 55;
  }
  tab = new ios.View({
    backgroundColor: "transparent",
    name: setup.label,
    constraints: {
      width: specs.width,
      height: 49
    }
  });
  tab.view = new ios.View({
    name: setup.label + ".view",
    backgroundColor: "transparent",
    constraints: {
      top: 0,
      bottom: 0,
      leading: 0,
      trailing: 0
    }
  });
  tab.active = new ios.View({
    name: ".active",
    backgroundColor: "transparent",
    constraints: {
      top: 0,
      bottom: 0,
      leading: 0,
      trailing: 0
    },
    superLayer: tab
  });
  tab.active.icon = new ios.View({
    name: ".active.icon",
    constraints: {
      width: 25,
      height: 25,
      align: "horizontal",
      top: 7
    },
    backgroundColor: "transparent",
    superLayer: tab.active
  });
  if (setup.active === void 0) {
    svgFrame = ios.utils.svg(setup.icon);
    tab.active.icon.html = svgFrame.svg;
    tab.active.icon.width = svgFrame.width;
    tab.active.icon.height = svgFrame.height;
  } else {
    setup.active.superLayer = tab.active.icon;
    setup.active.props = {
      width: tab.active.icon.width,
      height: tab.active.icon.height
    };
  }
  tab.inactive = new ios.View({
    backgroundColor: "transparent",
    name: ".inactive",
    constraints: {
      top: 0,
      bottom: 0,
      leading: 0,
      trailing: 0
    },
    superLayer: tab
  });
  tab.inactive.icon = new ios.View({
    constraints: {
      width: 25,
      height: 25,
      align: "horizontal",
      top: 7
    },
    backgroundColor: "transparent",
    name: ".inactive.icon",
    superLayer: tab.inactive
  });
  tab.label = new ios.Text({
    text: setup.label,
    superLayer: tab,
    color: "#929292",
    fontSize: 10,
    name: ".label",
    textTransform: "capitalize"
  });
  tab.label.constraints = {
    bottom: 2,
    horizontalCenter: tab.active.icon
  };
  if (setup.inactive === void 0) {
    svgFrame = ios.utils.svg(setup.icon);
    tab.inactive.icon.html = svgFrame.svg;
    tab.inactive.icon.width = svgFrame.width;
    tab.inactive.icon.height = svgFrame.height;
  } else {
    setup.inactive.superLayer = tab.inactive.icon;
    setup.inactive.props = {
      width: tab.inactive.icon.width,
      height: tab.inactive.icon.height
    };
  }
  return tab;
};

exports.bar = function(array) {
  var bar, dummyTab, dummyTab2, i, index, len, ref, setActive, setup, specs, tab;
  setup = ios.utils.setupComponent(array, exports.defaults.bar);
  if (setup.tabs.length === 0) {
    dummyTab = new exports.tab;
    dummyTab2 = new exports.tab;
    setup.tabs.push(dummyTab);
    setup.tabs.push(dummyTab2);
  }
  specs = {
    width: 75
  };
  switch (ios.device.name) {
    case "iphone-5":
      specs.width = 55;
  }
  bar = new ios.View({
    backgroundColor: "transparent",
    name: "tabBar",
    constraints: {
      leading: 0,
      trailing: 0,
      bottom: 0,
      height: 49
    }
  });
  bar.bg = new ios.View({
    superLayer: bar,
    name: ".bg",
    constraints: {
      leading: 0,
      trailing: 0,
      bottom: 0,
      height: 49
    }
  });
  bar.divider = new ios.View({
    backgroundColor: "#B2B2B2",
    name: ".divider",
    superLayer: bar,
    constraints: {
      top: 0,
      leading: 0,
      trailing: 0,
      height: .5
    }
  });
  bar.box = new ios.View({
    superLayer: bar,
    backgroundColor: "transparent",
    name: ".box",
    constraints: {
      height: 49,
      width: setup.tabs.length * specs.width
    }
  });
  setActive = function(tabIndex) {
    var i, index, len, ref, results, tab;
    ref = setup.tabs;
    results = [];
    for (index = i = 0, len = ref.length; i < len; index = ++i) {
      tab = ref[index];
      if (index === tabIndex) {
        tab.label.color = ios.utils.color(setup.activeColor);
        tab.active.visible = true;
        tab.inactive.visible = false;
        results.push(tab.view.visible = true);
      } else {
        tab.label.color = ios.utils.color(setup.inactiveColor);
        tab.active.visible = false;
        tab.inactive.visible = true;
        results.push(tab.view.visible = false);
      }
    }
    return results;
  };
  ref = setup.tabs;
  for (index = i = 0, len = ref.length; i < len; index = ++i) {
    tab = ref[index];
    bar.box.addSubLayer(tab);
    ios.utils.changeFill(tab.active.icon, ios.utils.color(setup.activeColor));
    ios.utils.changeFill(tab.inactive.icon, ios.utils.color(setup.inactiveColor));
    tab.label.color = ios.utils.color(setup.inactiveColor);
    bar.bg.backgroundColor = setup.backgroundColor;
    if (setup.blur) {
      bar.bg.backgroundColor = "rgba(255,255,255, .9)";
      ios.utils.bgBlur(bar.bg);
    }
    if (index === 0) {
      tab.constraints.leading = 0;
    } else {
      tab.constraints.leading = setup.tabs[index - 1];
    }
    ios.layout.set(tab);
    tab.on(Events.TouchStart, function() {
      var tabIndex;
      tabIndex = this.x / ios.utils.px(specs.width);
      return setActive(tabIndex);
    });
  }
  bar.box.constraints = {
    align: "horizontal"
  };
  ios.layout.set(bar.box);
  setActive(setup.start);
  bar.tabs = setup.tabs;
  return bar;
};


},{"ios-kit":17}],14:[function(require,module,exports){
var ios;

ios = require('ios-kit');

exports.defaults = {
  editable: true,
  constraints: void 0,
  text: "iOS Text Layer",
  type: "text",
  x: 0,
  y: 0,
  width: -1,
  height: -1,
  superLayer: void 0,
  style: "default",
  lines: 1,
  textAlign: "left",
  backgroundColor: "transparent",
  color: "black",
  fontSize: 17,
  fontFamily: "-apple-system, Helvetica, Arial, sans-serif",
  fontWeight: "regular",
  lineHeight: "auto",
  name: "text layer",
  opacity: 1,
  textTransform: "none",
  letterSpacing: 0,
  name: "text layer",
  selectable: true,
  selectColor: "rgba(0, 118, 255, .2)",
  selectControls: "#0076FF"
};

exports.defaults.props = Object.keys(exports.defaults);

exports.create = function(array) {
  var exceptions, i, j, len, len1, prop, ref, ref1, setup, textFrame, textLayer;
  setup = ios.utils.setupComponent(array, exports.defaults);
  exceptions = Object.keys(setup);
  textLayer = new ios.View({
    backgroundColor: "transparent",
    name: setup.name,
    superLayer: setup.superLayer,
    constraints: setup.constraints
  });
  textLayer.type = "text";
  textLayer.html = setup.text;
  ref = ios.lib.layerProps;
  for (i = 0, len = ref.length; i < len; i++) {
    prop = ref[i];
    if (setup[prop]) {
      if (prop === "color") {
        setup[prop] = ios.utils.color(setup[prop]);
      }
      textLayer[prop] = setup[prop];
    }
  }
  ref1 = ios.lib.layerStyles;
  for (j = 0, len1 = ref1.length; j < len1; j++) {
    prop = ref1[j];
    if (setup[prop]) {
      if (prop === "lineHeight" && setup[prop] === "auto") {
        textLayer.style.lineHeight = setup.fontSize;
      }
      if (prop === "fontWeight") {
        switch (setup[prop]) {
          case "ultrathin":
            setup[prop] = 100;
            break;
          case "thin":
            setup[prop] = 200;
            break;
          case "light":
            setup[prop] = 300;
            break;
          case "regular":
            setup[prop] = 400;
            break;
          case "medium":
            setup[prop] = 500;
            break;
          case "semibold":
            setup[prop] = 600;
            break;
          case "bold":
            setup[prop] = 700;
            break;
          case "black":
            setup[prop] = 800;
        }
      }
      if (prop === "fontSize" || prop === "lineHeight" || prop === "letterSpacing") {
        setup[prop] = ios.utils.px(setup[prop]) + "px";
      }
      textLayer.style[prop] = setup[prop];
    }
  }
  textFrame = ios.utils.textAutoSize(textLayer);
  textLayer.props = {
    height: textFrame.height,
    width: textFrame.width
  };
  if (setup.editable) {
    textLayer.on("change:html", function() {
      textFrame = ios.utils.textAutoSize(textLayer);
      return textLayer.props = {
        height: textFrame.height,
        width: textFrame.width
      };
    });
  }
  ios.layout.set({
    target: textLayer
  });
  return textLayer;
};


},{"ios-kit":17}],15:[function(require,module,exports){
var ios;

ios = require('ios-kit');

exports.pt = function(px) {
  var pt;
  pt = px / ios.device.scale;
  pt = Math.round(pt);
  return pt;
};

exports.px = function(pt) {
  var px;
  px = pt * ios.device.scale;
  px = Math.round(px);
  return px;
};

exports.color = function(colorString) {
  var color;
  color = "";
  if (typeof colorString === "string") {
    colorString = colorString.toLowerCase();
    if (colorString.slice(0, 4) === "rgba") {
      return colorString;
    }
  }
  switch (colorString) {
    case "red":
      color = new Color("#FE3824");
      break;
    case "blue":
      color = new Color("#0076FF");
      break;
    case "pink":
      color = new Color("#FE2851");
      break;
    case "grey":
      color = new Color("#929292");
      break;
    case "gray":
      color = new Color("#929292");
      break;
    case "black":
      color = new Color("#030303");
      break;
    case "white":
      color = new Color("#EFEFF4");
      break;
    case "orange":
      color = new Color("#FF9600");
      break;
    case "green":
      color = new Color("#44DB5E");
      break;
    case "light blue":
      color = new Color("#54C7FC");
      break;
    case "light-blue":
      color = new Color("#54C7FC");
      break;
    case "yellow":
      color = new Color("#FFCD00");
      break;
    case "light key":
      color = new Color("#9DA7B3");
      break;
    case "light-key":
      color = new Color("#9DA7B3");
      break;
    default:
      if (colorString[0] === "#" || colorString.toHexString()[0] === "#") {
        color = new Color(colorString);
      } else {
        color = new Color("#929292");
      }
  }
  return color;
};

exports.clean = function(string) {
  string = string.replace(/[&]nbsp[;]/gi, " ").replace(/[<]br[>]/gi, "");
  return string;
};

exports.svg = function(svg) {
  var endIndex, hEndIndex, hStartIndex, height, heightString, newHeight, newString, newWidth, startIndex, string, wEndIndex, wStartIndex, width;
  startIndex = svg.search("<svg width=");
  endIndex = svg.search(" viewBox");
  string = svg.slice(startIndex, endIndex);
  wStartIndex = string.search("=") + 2;
  wEndIndex = string.search("px");
  width = string.slice(wStartIndex, wEndIndex);
  newWidth = exports.px(width);
  heightString = string.slice(wEndIndex + 4, string.length);
  hStartIndex = heightString.search("=") + 2;
  hEndIndex = heightString.search("px");
  height = heightString.slice(hStartIndex, hEndIndex);
  newHeight = exports.px(height);
  newString = string.replace(width, newWidth);
  newString = newString.replace(height, newHeight);
  svg = svg.replace(string, newString);
  return {
    svg: svg,
    width: newWidth,
    height: newHeight
  };
};

exports.changeFill = function(layer, color) {
  var endIndex, fillString, newString, startIndex, string;
  startIndex = layer.html.search("fill=\"#");
  fillString = layer.html.slice(startIndex, layer.html.length);
  endIndex = fillString.search("\">");
  string = fillString.slice(0, endIndex);
  newString = "fill=\"" + exports.color(color);
  return layer.html = layer.html.replace(string, newString);
};

exports.capitalize = function(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

exports.getTime = function() {
  var date, dateObj, day, daysOfTheWeek, hours, mins, month, monthsOfTheYear, secs;
  daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  monthsOfTheYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  dateObj = new Date();
  month = monthsOfTheYear[dateObj.getMonth()];
  date = dateObj.getDate();
  day = daysOfTheWeek[dateObj.getDay()];
  hours = dateObj.getHours();
  mins = dateObj.getMinutes();
  secs = dateObj.getSeconds();
  return {
    month: month,
    date: date,
    day: day,
    hours: hours,
    mins: mins,
    secs: secs
  };
};

exports.bgBlur = function(layer) {
  layer.style["-webkit-backdrop-filter"] = "blur(" + (exports.px(5)) + "px)";
  return layer;
};

exports.textAutoSize = function(textLayer) {
  var constraints, styles, textFrame;
  constraints = {};
  if (textLayer.constraints) {
    if (textLayer.constraints.height) {
      constraints.height = exports.px(textLayer.constraints.height);
    }
    if (textLayer.constraints.width) {
      constraints.width = exports.px(textLayer.constraints.width);
    }
  }
  styles = {
    fontSize: textLayer.style.fontSize,
    fontFamily: textLayer.style.fontFamily,
    fontWeight: textLayer.style.fontWeight,
    lineHeight: textLayer.style.lineHeight,
    letterSpacing: textLayer.style.letterSpacing,
    textTransform: textLayer.style.textTransform
  };
  textFrame = Utils.textSize(textLayer.html, styles, constraints);
  return {
    width: textFrame.width,
    height: textFrame.height
  };
};

exports.getDevice = function() {
  var device, frame, nameFormatter;
  nameFormatter = function(name) {
    var j, len, removeTerms, term;
    removeTerms = ["apple-", "-gold", "-silver", "-rose", "-space-gray", "-yellow", "-green", "-red", "-white", "-blue", "-mini", "-air", "-2", "-4"];
    for (j = 0, len = removeTerms.length; j < len; j++) {
      term = removeTerms[j];
      name = name.replace(term, "");
    }
    if (name.indexOf("-5s") !== -1) {
      name = name.replace("-5s", "-5");
    }
    if (name.indexOf("-5c") !== -1) {
      name = name.replace("-5c", "-5");
    }
    return name;
  };
  device = "";
  frame = true;
  if (ios.lib.realDevices[innerWidth] && ios.lib.realDevices[innerWidth][innerHeight]) {
    device = ios.lib.realDevices[innerWidth][innerHeight];
    frame = false;
    Framer.Device.deviceType = "fullscreen";
  }
  if (frame) {
    device = {
      name: nameFormatter(Framer.Device.deviceType),
      display_name: Framer.DeviceView.Devices[Framer.Device.deviceType].display_name,
      width: Framer.DeviceView.Devices[Framer.Device.deviceType].screenWidth,
      height: Framer.DeviceView.Devices[Framer.Device.deviceType].screenHeight,
      scale: ios.lib.framerFrames[Framer.DeviceView.Devices[Framer.Device.deviceType].screenWidth]
    };
  }
  if (device.scale === void 0) {
    device.scale = 2;
  }
  if (device.width === void 0) {
    device.width = innerWidth;
  }
  if (device.height === void 0) {
    device.height = innerHeight;
  }
  return device;
  exports.scale = ios.lib.frames[device].scale;
  if (device === "fullscreen") {
    exports.width = window.innerWidth;
    exports.height = window.innerHeight;
  } else {
    exports.width = ios.lib.frames[device].width;
    exports.height = ios.lib.frames[device].height;
    if (window.innerWidth === 1242 || window.innerWidth === 2208) {
      exports.width = window.innerWidth;
      exports.height = window.innerHeight;
      exports.scale = 3;
    }
  }
  exports.mobile = ios.lib.frames[device].mobile;
  exports.platform = ios.lib.frames[device].platform;
  exports.orientation = Framer.Device.orientation;
  device = device.replace("apple-", "");
  device = device.replace("-gold", "");
  device = device.replace("-green", "");
  device = device.replace("-blue", "");
  device = device.replace("-red", "");
  device = device.replace("-white", "");
  device = device.replace("-yellow", "");
  device = device.replace("-pink", "");
  device = device.replace("-space-grey", "");
  device = device.replace("-rose", "");
  device = device.replace("5s", "5");
  device = device.replace("5c", "5");
  device = device.replace("-mini", "");
  device = device.replace("-air", "");
  device = device.replace("-2", "");
  device = device.replace("-4", "");
  device = device.replace("-silver", "");
  capturedDevice.name = device;
  return capturedDevice;
};

exports.specialChar = function(layer) {
  var chosenColor, newText, text;
  text = layer;
  if (layer.type === "button") {
    text = layer.label;
  }
  if (text.html.indexOf("-b") !== -1) {
    newText = text.html.replace("-b ", "");
    exports.update(text, [
      {
        text: newText
      }, {
        fontWeight: 600
      }
    ]);
  }
  if (text.html.indexOf("-r") !== -1) {
    newText = text.html.replace("-r ", "");
    exports.update(text, [
      {
        text: newText
      }, {
        color: "red"
      }
    ]);
  }
  if (text.html.indexOf("-rb") !== -1) {
    newText = text.html.replace("-rb ", "");
    exports.update(text, [
      {
        text: newText
      }, {
        color: "blue"
      }
    ]);
  }
  if (text.html.indexOf("-lb") !== -1) {
    newText = text.html.replace("-lb ", "");
    exports.update(text, [
      {
        text: newText
      }, {
        color: "light-blue"
      }
    ]);
  }
  if (text.html.indexOf("-g") !== -1) {
    newText = text.html.replace("-g ", "");
    exports.update(text, [
      {
        text: newText
      }, {
        color: "green"
      }
    ]);
  }
  if (text.html.indexOf("-o") !== -1) {
    newText = text.html.replace("-o ", "");
    exports.update(text, [
      {
        text: newText
      }, {
        color: "orange"
      }
    ]);
  }
  if (text.html.indexOf("-p") !== -1) {
    newText = text.html.replace("-p ", "");
    exports.update(text, [
      {
        text: newText
      }, {
        color: "orange"
      }
    ]);
  }
  if (text.html.indexOf("-y") !== -1) {
    newText = text.html.replace("-y ", "");
    exports.update(text, [
      {
        text: newText
      }, {
        color: "yellow"
      }
    ]);
  }
  if (text.html.indexOf("-#") !== -1) {
    chosenColor = text.html.slice(1, 8);
    newText = text.html.slice(9, text.html.length);
    exports.update(text, [
      {
        text: newText
      }, {
        color: chosenColor
      }
    ]);
  }
  if (text.html.indexOf("-") !== -1) {
    newText = text.html.replace("- ", "");
    exports.update(text, [
      {
        text: newText
      }
    ]);
  }
  if (layer.buttonType === "text") {
    layer.width = text.width;
  }
  ios.layout.set(layer);
  if (layer.type === "button") {
    layer.width = text.width;
  }
  return text.color;
};

exports.update = function(layer, array) {
  var change, j, key, len, textFrame, value;
  if (array === void 0) {
    array = [];
  }
  if (layer.type === "text") {
    for (j = 0, len = array.length; j < len; j++) {
      change = array[j];
      key = Object.keys(change)[0];
      value = change[key];
      if (key === "text") {
        layer.html = value;
      }
      if (key === "fontWeight") {
        layer.style[key] = value;
      }
      if (key === "color") {
        layer.color = exports.color(value);
      }
    }
    textFrame = exports.textAutoSize(layer);
    layer.width = textFrame.width;
    layer.height = textFrame.height;
  }
  return ios.layout.set();
};

exports.autoColor = function(colorObject) {
  var blue, color, green, red, rgb;
  rgb = colorObject.toRgbString();
  rgb = rgb.substring(4, rgb.length - 1);
  rgb = rgb.replace(/ /g, '');
  rgb = rgb.replace(/ /g, '');
  rgb = rgb.split(',');
  red = rgb[0];
  green = rgb[1];
  blue = rgb[2];
  color = "";
  if ((red * 0.299 + green * 0.587 + blue * 0.114) > 186) {
    color = "#000";
  } else {
    color = "#FFF";
  }
  return color;
};

exports.sameParent = function(layer1, layer2) {
  var parentOne, parentTwo;
  parentOne = layer1.superLayer;
  parentTwo = layer2.superLayer;
  if (parentOne === parentTwo) {
    return true;
  } else {
    return false;
  }
};

exports.timeDelegate = function(layer, clockType) {
  this.time = exports.getTime();
  return Utils.delay(60 - this.time.secs, function() {
    this.time = exports.getTime();
    exports.update(layer, [
      {
        text: exports.timeFormatter(this.time, clockType)
      }
    ]);
    return Utils.interval(60, function() {
      this.time = exports.getTime();
      return exports.update(layer, [
        {
          text: exports.timeFormatter(this.time, clockType)
        }
      ]);
    });
  });
};

exports.timeFormatter = function(timeObj, clockType) {
  if (clockType === false) {
    if (timeObj.hours > 12) {
      timeObj.hours = timeObj.hours - 12;
    }
    if (timeObj.hours === 0) {
      timeObj.hours = 12;
    }
  }
  if (timeObj.mins < 10) {
    timeObj.mins = "0" + timeObj.mins;
  }
  return timeObj.hours + ":" + timeObj.mins;
};

exports.setupComponent = function(array, defaults) {
  var i, j, len, obj, ref;
  if (array === void 0) {
    array = [];
  }
  obj = {};
  ref = defaults.props;
  for (j = 0, len = ref.length; j < len; j++) {
    i = ref[j];
    if (array[i] !== void 0) {
      obj[i] = array[i];
    } else {
      obj[i] = defaults[i];
    }
  }
  return obj;
};

exports.emojiFormatter = function(string) {
  var arrayOfCodes, code, decoded, j, k, len, len1, unicodeFormat;
  unicodeFormat = "";
  if (string[0] === "E" || string[0] === "3" || string[0] === "2" || string[0] === "C") {
    arrayOfCodes = string.split(" ");
    for (j = 0, len = arrayOfCodes.length; j < len; j++) {
      code = arrayOfCodes[j];
      unicodeFormat = unicodeFormat + "%" + code;
    }
  } else {
    arrayOfCodes = string.split(" ");
    unicodeFormat = "%F0%9F";
    for (k = 0, len1 = arrayOfCodes.length; k < len1; k++) {
      code = arrayOfCodes[k];
      unicodeFormat = unicodeFormat + "%" + code;
    }
  }
  decoded = decodeURIComponent(unicodeFormat);
  return decoded;
};

exports.buildEmojisObject = function() {
  var code, emoji, emojis, index, j, len, ref, results;
  emojis = [];
  ref = ios.assets.emojiCodes;
  results = [];
  for (index = j = 0, len = ref.length; j < len; index = ++j) {
    code = ref[index];
    emoji = exports.emojiFormatter(code);
    results.push(emojis.push(emoji));
  }
  return results;
};

exports.write = function(obj, text) {
  if (obj.type === 'field') {
    return obj.text.html = obj.text.html + text;
  } else {
    return obj.html = obj.html + text;
  }
};


},{"ios-kit":17}],16:[function(require,module,exports){
var ios;

ios = require('ios-kit');

exports.create = function(obj) {
  var i, len, prop, ref, view;
  if (obj === void 0) {
    obj = {};
  }
  view = new Layer;
  view.constraints = {};
  ref = ios.lib.layerProps;
  for (i = 0, len = ref.length; i < len; i++) {
    prop = ref[i];
    if (obj[prop]) {
      view[prop] = obj[prop];
    }
  }
  if (obj["constraints"]) {
    view.constraints = obj["constraints"];
    ios.layout.set(view);
  }
  return view;
};


},{"ios-kit":17}],17:[function(require,module,exports){
var conv, layout, library, utils;

exports.layout = layout = require('ios-kit-layout');

exports.lib = library = require('ios-kit-library');

exports.utils = utils = require('ios-kit-utils');

exports.converter = conv = require('ios-kit-converter');

exports.device = utils.getDevice();

exports.assets = library.assets;

exports.isPad = function() {
  if (exports.device.name.indexOf('ipad') !== -1) {
    return true;
  } else {
    return false;
  }
};

exports.isPhone = function() {
  if (exports.device.name.indexOf('iphone') !== -1) {
    return true;
  } else {
    return false;
  }
};

exports.convert = function(sketchObj) {
  return conv.convert(sketchObj);
};

exports.color = function(string) {
  return utils.color(string);
};

exports.px = function(num) {
  return utils.px(num);
};

exports.pt = function(num) {
  return utils.pt(num);
};

exports.alert = require('ios-kit-alert');

exports.banner = require('ios-kit-banner');

exports.button = require('ios-kit-button');

exports.field = require('ios-kit-field');

exports.keyboard = require('ios-kit-keyboard');

exports.nav = require('ios-kit-nav-bar');

exports.sheet = require('ios-kit-sheet');

exports.status = require('ios-kit-status-bar');

exports.tab = require('ios-kit-tab-bar');

exports.text = require('ios-kit-text');

exports.view = require('ios-kit-view');

exports.Alert = exports.alert.create;

exports.Banner = exports.banner.create;

exports.Button = exports.button.create;

exports.Field = exports.field.create;

exports.Keyboard = exports.keyboard.create;

exports.NavBar = exports.nav.create;

exports.Sheet = exports.sheet.create;

exports.StatusBar = exports.status.create;

exports.Tab = exports.tab.tab;

exports.TabBar = exports.tab.bar;

exports.Text = exports.text.create;

exports.View = exports.view.create;

exports.l = {};


},{"ios-kit-alert":2,"ios-kit-banner":3,"ios-kit-button":4,"ios-kit-converter":5,"ios-kit-field":6,"ios-kit-keyboard":7,"ios-kit-layout":8,"ios-kit-library":9,"ios-kit-nav-bar":10,"ios-kit-sheet":11,"ios-kit-status-bar":12,"ios-kit-tab-bar":13,"ios-kit-text":14,"ios-kit-utils":15,"ios-kit-view":16}],18:[function(require,module,exports){
var UsersDAL;

UsersDAL = (function() {
  var apikey, url;

  function UsersDAL() {}

  url = "https://fbusers-4494.restdb.io/rest/fbusers";

  apikey = "5956382dafce09e87211e986";

  UsersDAL.prototype.getUsers = function(query, max, filter, sort, sortDir) {
    var GETdata, users;
    GETdata = (url + "?apikey=" + apikey + "&max=" + max + "&sort=" + sort + "&dir={sortDir}&filter=" + filter + "&idtolink=true&q=") + JSON.stringify(query);
    users = JSON.parse(Utils.domLoadDataSync(GETdata));
    return users;
  };

  UsersDAL.prototype.getActiveUsers = function(users) {
    var activeUsers, i, len, user;
    activeUsers = [];
    for (i = 0, len = users.length; i < len; i++) {
      user = users[i];
      if (user.status === "active") {
        activeUsers.push(user);
      }
    }
    return activeUsers;
  };

  UsersDAL.prototype.getBirthdayUsers = function(users) {
    var birthdayUsers, i, len, user;
    birthdayUsers = [];
    for (i = 0, len = users.length; i < len; i++) {
      user = users[i];
      if (user.birthday === true) {
        birthdayUsers.push(user);
      }
    }
    return birthdayUsers;
  };

  UsersDAL.prototype.getFavoriteUsers = function(users) {
    var favoriteUsers, i, len, user;
    favoriteUsers = [];
    for (i = 0, len = users.length; i < len; i++) {
      user = users[i];
      if (user.favorite === true) {
        favoriteUsers.push(user);
      }
    }
    return favoriteUsers;
  };

  UsersDAL.prototype.getMyDays = function(users) {
    var i, len, myDays, user;
    myDays = [];
    for (i = 0, len = users.length; i < len; i++) {
      user = users[i];
      if (user.myDay === true) {
        myDays.push(user);
      }
    }
    return myDays;
  };

  module.exports = UsersDAL;

  return UsersDAL;

})();


},{}],19:[function(require,module,exports){
var IpzMessenger, MasterLayout, ios;

ios = require('ios-kit');

IpzMessenger = require("ipz-messenger");

MasterLayout = (function() {
  MasterLayout.contentView = void 0;

  function MasterLayout() {
    var mainView, statusBar;
    mainView = new ios.View({
      width: Screen.width,
      backgroundColor: Screen.backgroundColor
    });
    statusBar = new ios.StatusBar({
      superLayer: mainView,
      width: Screen.width,
      carrier: "VodafoneRO"
    });
    this.contentView = new ios.View({
      y: statusBar.height * 0.65,
      width: Screen.width,
      backgroundColor: Screen.backgroundColor
    });
  }

  MasterLayout.prototype.openApp = function(appName) {
    var app;
    switch (appName) {
      case "Messenger":
        app = new IpzMessenger(this.contentView);
        return app;
    }
  };

  return MasterLayout;

})();

module.exports = MasterLayout;


},{"ios-kit":17,"ipz-messenger":26}],20:[function(require,module,exports){
var IpzMessengerCalls, IpzMessengerSearchBox, ios, ipz;

ios = require('ios-kit');

ipz = require('ipz-messenger-kit');

IpzMessengerSearchBox = require("ipz-messenger-searchBox");

IpzMessengerCalls = (function() {
  IpzMessengerCalls.header = void 0;

  IpzMessengerCalls.flow = void 0;

  function IpzMessengerCalls(parentView) {
    var searchBox;
    this.header = new ios.View({
      superLayer: parentView,
      width: parentView.width,
      height: 64,
      backgroundColor: "white"
    });
    searchBox = new IpzMessengerSearchBox(this.header);
  }

  return IpzMessengerCalls;

})();

module.exports = IpzMessengerCalls;


},{"ios-kit":17,"ipz-messenger-kit":22,"ipz-messenger-searchBox":24}],21:[function(require,module,exports){
var IpzMessengerHome, ios, ipz, usersModule;

ios = require('ios-kit');

ipz = require('ipz-messenger-kit');

usersModule = require("ipz-dal-usersDAL");

IpzMessengerHome = (function() {
  IpzMessengerHome.header = void 0;

  IpzMessengerHome.flow = void 0;

  function IpzMessengerHome(parentView, users) {
    var activeFriends, activeUsers, activeView, compose, groupsView, lastMessages, messagesView, navBar, otherMessages, searchBox, usersDB;
    this.header = new ios.View({
      superLayer: parentView,
      width: parentView.width,
      height: 128
    });
    navBar = new ipz.IpzMessengerNavBar({
      superLayer: this.header,
      left: "Messages",
      center: "Active",
      right: "Groups",
      blur: false
    });
    searchBox = new ipz.IpzMessengerSearchBox(this.header);
    compose = new Layer({
      image: "images/CreateIcon.png",
      x: Align.right(-10),
      width: 52,
      height: 52,
      superLayer: this.header
    });
    messagesView = new ScrollComponent({
      y: parentView.y + this.header.height,
      width: parentView.width,
      height: parentView.height - this.header.height,
      scrollHorizontal: false
    });
    usersDB = new usersModule;
    users = usersDB.getUsers({}, 20, "", "serialno", -1);
    activeUsers = usersDB.getActiveUsers(users);
    lastMessages = new ipz.IpzMessageList({
      parent: messagesView.content
    }, users.slice(0, 3));
    activeFriends = new ipz.IpzActiveFriends({
      parent: messagesView.content,
      y: lastMessages.maxY + 8
    }, activeUsers);
    otherMessages = new ipz.IpzMessageList({
      parent: messagesView.content,
      y: activeFriends.maxY + 8
    }, users.slice(5, 21));
    activeView = new ios.View({
      x: Screen.width,
      y: parentView.y + this.header.height,
      width: parentView.width,
      height: parentView.height - this.header.height,
      backgroundColor: "orange"
    });
    groupsView = new ios.View({
      x: Screen.width,
      y: parentView.y + this.header.height,
      width: parentView.width,
      height: parentView.height - this.header.height,
      backgroundColor: "purple"
    });
    navBar.left.on(Events.Tap, function(event) {
      messagesView.x = 0;
      activeView.x = Screen.width;
      return groupsView.x = Screen.width;
    });
    navBar.center.on(Events.Tap, function(event) {
      messagesView.x = Screen.width;
      activeView.x = 0;
      return groupsView.x = Screen.width;
    });
    navBar.right.on(Events.Tap, function(event) {
      messagesView.x = Screen.width;
      activeView.x = Screen.width;
      return groupsView.x = 0;
    });
  }

  IpzMessengerHome.prototype.setAvatar = function(user) {
    var avatar;
    return avatar = new ipz.IpzAvatar({
      scale: 0.7,
      superLayer: this.header,
      x: Align.left(10)
    }, user);
  };

  return IpzMessengerHome;

})();

module.exports = IpzMessengerHome;


},{"ios-kit":17,"ipz-dal-usersDAL":18,"ipz-messenger-kit":22}],22:[function(require,module,exports){
var kit, nav, tab;

nav = require('ipz-messenger-nav-bar');

tab = require('ipz-messenger-tab-bar');

kit = require('messenger-kit');

exports.IpzMessengerHome = require("ipz-messenger-home");

exports.IpzMessengerCalls = require("ipz-messenger-calls");

exports.IpzMessengerSearchBox = require("ipz-messenger-searchBox");

exports.IpzMessengerNavBar = nav.create;

exports.IpzMessengerTab = tab.tab;

exports.IpzMessengerTabBar = tab.bar;

exports.IpzAvatar = kit.Avatar;

exports.IpzMessageList = kit.MessageList;

exports.IpzMessageListItem = kit.MessageListItem;

exports.IpzActiveFriendsScrollList = kit.ActiveFriendsScrollList;

exports.IpzActiveFriends = kit.ActiveFriends;


},{"ipz-messenger-calls":20,"ipz-messenger-home":21,"ipz-messenger-nav-bar":23,"ipz-messenger-searchBox":24,"ipz-messenger-tab-bar":25,"messenger-kit":27}],23:[function(require,module,exports){
var ios;

ios = require('ios-kit');

exports.defaults = {
  left: void 0,
  center: void 0,
  right: "Edit",
  blur: true,
  superLayer: void 0,
  type: "navBar",
  activeColor: 'blue',
  inactiveColor: 'grey',
  backgroundColor: "rgba(255, 255, 255, .8)",
  dividerBackgroundColor: "#B2B2B2"
};

exports.defaults.props = Object.keys(exports.defaults);

exports.create = function(array) {
  var bar, i, layer, len, ref, setup;
  setup = ios.utils.setupComponent(array, exports.defaults);
  bar = new ios.View({
    name: "navBar",
    backgroundColor: setup.backgroundColor,
    constraints: {
      leading: 0,
      trailing: 0,
      top: 0,
      height: 64
    }
  });
  bar.bg = new ios.View({
    superLayer: bar,
    backgroundColor: 'transparent',
    name: ".bg",
    constraints: {
      leading: 0,
      trailing: 0,
      height: 44,
      bottom: 0
    }
  });
  bar.divider = new ios.View({
    backgroundColor: setup.dividerBackgroundColor,
    name: ".divider",
    superLayer: bar.bg,
    constraints: {
      height: .5,
      bottom: 0,
      leading: 0,
      trailing: 0
    }
  });
  if (setup.superLayer) {
    setup.superLayer.addSubLayer(bar);
  }
  if (setup.blur) {
    ios.utils.bgBlur(bar);
  }
  if (setup.blur === false && setup.backgroundColor === "rgba(255, 255, 255, .8)") {
    bar.backgroundColor = 'white';
  }
  bar.type = setup.type;
  ref = Framer.CurrentContext.layers;
  for (i = 0, len = ref.length; i < len; i++) {
    layer = ref[i];
    if (layer.type === "statusBar") {
      this.statusBar = layer;
      bar.placeBehind(this.statusBar);
    }
  }
  if (typeof setup.left === "string" && typeof setup.left !== "boolean") {
    bar.left = new ios.Button({
      name: ".left",
      superLayer: bar.bg,
      text: setup.left,
      color: setup.activeColor,
      fontWeight: 500,
      constraints: {
        bottom: 12,
        leading: 8
      }
    });
    bar.left.type = "button";
    ios.utils.specialChar(bar.left);
  }
  if (typeof setup.left === "object") {
    bar.left = setup.left;
    bar.left.name = ".left";
    bar.left.superLayer = bar.bg;
    bar.left.constraints = {
      leading: 8,
      bottom: 12
    };
    ios.layout.set(bar.left);
  }
  if (typeof setup.center === "string" && typeof setup.center !== "boolean") {
    bar.center = new ios.Button({
      name: ".center",
      superLayer: bar.bg,
      text: setup.center,
      color: setup.inactiveColor,
      fontWeight: 500,
      constraints: {
        bottom: 12,
        align: "horizontal"
      }
    });
    bar.center.type = "button";
    ios.utils.specialChar(bar.center);
  }
  if (typeof setup.center === "object") {
    bar.center = setup.center;
    bar.center.name = ".right";
    bar.center.superLayer = bar.bg;
    bar.center.constraints = {
      align: "horizontal",
      bottom: 12
    };
    ios.layout.set(bar.center);
  }
  if (typeof setup.right === "string" && typeof setup.right !== "boolean") {
    bar.right = new ios.Button({
      name: ".right",
      superLayer: bar.bg,
      text: setup.right,
      color: setup.inactiveColor,
      fontWeight: 500,
      constraints: {
        bottom: 12,
        trailing: 8
      }
    });
    bar.right.type = "button";
    ios.utils.specialChar(bar.right);
  }
  if (typeof setup.right === "object") {
    bar.right = setup.right;
    bar.right.name = ".right";
    bar.right.superLayer = bar.bg;
    bar.right.constraints = {
      trailing: 8,
      bottom: 12
    };
    ios.layout.set(bar.right);
  }
  bar.left.on(Events.TouchStart, function() {
    bar.left.color = setup.activeColor;
    bar.center.color = setup.inactiveColor;
    return bar.right.color = setup.inactiveColor;
  });
  bar.center.on(Events.TouchStart, function() {
    bar.left.color = setup.inactiveColor;
    bar.center.color = setup.activeColor;
    return bar.right.color = setup.inactiveColor;
  });
  bar.right.on(Events.TouchStart, function() {
    bar.left.color = setup.inactiveColor;
    bar.center.color = setup.inactiveColor;
    return bar.right.color = setup.activeColor;
  });
  return bar;
};


},{"ios-kit":17}],24:[function(require,module,exports){
var IpzMessengerSearchBox;

IpzMessengerSearchBox = (function() {
  function IpzMessengerSearchBox(parentView) {
    var search, searchBar, searchIcon, searchPlaceholder;
    searchBar = new Layer({
      width: parentView.width,
      backgroundColor: "transparent",
      height: 64,
      parent: parentView
    });
    search = new Layer({
      width: searchBar.width - 150,
      x: Align.center,
      superLayer: searchBar,
      height: 56,
      borderRadius: 5,
      backgroundColor: "#DEDEDE"
    });
    searchPlaceholder = new TextLayer({
      parent: search,
      text: "Search",
      fontSize: 28,
      fontFamily: ".SF NS Display",
      letterSpacing: 0.0,
      x: Align.center,
      y: Align.center
    });
    searchIcon = new Layer({
      parent: search,
      image: "images/SearchIcon.png",
      height: 24,
      width: 24,
      y: Align.center
    });
    searchIcon.x = searchPlaceholder.x - (searchIcon.width + 5);
  }

  return IpzMessengerSearchBox;

})();

module.exports = IpzMessengerSearchBox;


},{}],25:[function(require,module,exports){
var ios;

ios = require('ios-kit');

exports.defaults = {
  tab: {
    label: "label",
    activeIcon: void 0,
    inactiveIcon: void 0,
    active: void 0,
    inactive: void 0,
    type: "tab",
    viewTop: 0,
    viewBottom: 0
  },
  bar: {
    tabs: [],
    start: 0,
    type: "tabBar",
    backgroundColor: "white",
    activeColor: "blue",
    inactiveColor: "gray",
    blur: true
  }
};

exports.defaults.tab.props = Object.keys(exports.defaults.tab);

exports.defaults.bar.props = Object.keys(exports.defaults.bar);

exports.tab = function(array) {
  var setup, specs, tab;
  setup = ios.utils.setupComponent(array, exports.defaults.tab);
  specs = {
    width: 75
  };
  switch (ios.device.name) {
    case "iphone-5":
      specs.width = 55;
  }
  tab = new ios.View({
    backgroundColor: "transparent",
    name: setup.label,
    constraints: {
      width: specs.width,
      height: 52
    }
  });
  tab.view = new ios.View({
    name: setup.label + ".view",
    backgroundColor: "transparent",
    constraints: {
      top: setup.viewTop,
      bottom: setup.viewBottom,
      leading: 0,
      trailing: 0
    }
  });
  tab.active = new ios.View({
    name: ".active",
    backgroundColor: "transparent",
    constraints: {
      top: 0,
      bottom: 0,
      leading: 0,
      trailing: 0
    },
    superLayer: tab
  });
  tab.active.icon = new ios.View({
    name: ".active.icon",
    constraints: {
      width: 25,
      height: 25,
      align: "horizontal",
      top: 7
    },
    backgroundColor: "transparent",
    superLayer: tab.active
  });
  if (setup.active === void 0) {
    tab.active.icon.image = setup.activeIcon;
    tab.active.icon.width = 52;
    tab.active.icon.height = 52;
  } else {
    setup.active.superLayer = tab.active.icon;
    setup.active.props = {
      width: tab.active.icon.width,
      height: tab.active.icon.height
    };
  }
  tab.inactive = new ios.View({
    backgroundColor: "transparent",
    name: ".inactive",
    constraints: {
      top: 0,
      bottom: 0,
      leading: 0,
      trailing: 0
    },
    superLayer: tab
  });
  tab.inactive.icon = new ios.View({
    constraints: {
      width: 25,
      height: 25,
      align: "horizontal",
      top: 7
    },
    backgroundColor: "transparent",
    name: ".inactive.icon",
    superLayer: tab.inactive
  });
  tab.label = new ios.Text({
    text: setup.label,
    superLayer: tab,
    color: "#929292",
    fontSize: 10,
    name: ".label",
    textTransform: "capitalize"
  });
  tab.label.constraints = {
    bottom: 2,
    horizontalCenter: tab.active.icon
  };
  if (setup.inactive === void 0) {
    tab.inactive.icon.image = setup.inactiveIcon;
    tab.inactive.icon.width = 52;
    tab.inactive.icon.height = 52;
  } else {
    setup.inactive.superLayer = tab.inactive.icon;
    setup.inactive.props = {
      width: tab.inactive.icon.width,
      height: tab.inactive.icon.height
    };
  }
  return tab;
};

exports.bar = function(array) {
  var bar, dummyTab, dummyTab2, i, index, len, ref, setActive, setup, specs, tab;
  setup = ios.utils.setupComponent(array, exports.defaults.bar);
  if (setup.tabs.length === 0) {
    dummyTab = new exports.tab;
    dummyTab2 = new exports.tab;
    setup.tabs.push(dummyTab);
    setup.tabs.push(dummyTab2);
  }
  specs = {
    width: 75
  };
  switch (ios.device.name) {
    case "iphone-5":
      specs.width = 55;
  }
  bar = new ios.View({
    backgroundColor: "transparent",
    name: "tabBar",
    constraints: {
      leading: 0,
      trailing: 0,
      bottom: 0,
      height: 52
    }
  });
  bar.bg = new ios.View({
    superLayer: bar,
    name: ".bg",
    constraints: {
      leading: 0,
      trailing: 0,
      bottom: 0,
      height: 52
    }
  });
  bar.divider = new ios.View({
    backgroundColor: "#B2B2B2",
    name: ".divider",
    superLayer: bar,
    constraints: {
      top: 0,
      leading: 0,
      trailing: 0,
      height: .5
    }
  });
  bar.box = new ios.View({
    superLayer: bar,
    backgroundColor: "transparent",
    name: ".box",
    constraints: {
      height: 52,
      width: setup.tabs.length * specs.width
    }
  });
  setActive = function(tabIndex) {
    var i, index, len, ref, results, tab;
    ref = setup.tabs;
    results = [];
    for (index = i = 0, len = ref.length; i < len; index = ++i) {
      tab = ref[index];
      if (index === tabIndex) {
        tab.label.color = ios.utils.color(setup.activeColor);
        tab.active.visible = true;
        tab.inactive.visible = false;
        results.push(tab.view.visible = true);
      } else {
        tab.label.color = ios.utils.color(setup.inactiveColor);
        tab.active.visible = false;
        tab.inactive.visible = true;
        results.push(tab.view.visible = false);
      }
    }
    return results;
  };
  ref = setup.tabs;
  for (index = i = 0, len = ref.length; i < len; index = ++i) {
    tab = ref[index];
    bar.box.addSubLayer(tab);
    tab.label.color = ios.utils.color(setup.inactiveColor);
    bar.bg.backgroundColor = setup.backgroundColor;
    if (setup.blur) {
      bar.bg.backgroundColor = "rgba(255,255,255, .9)";
      ios.utils.bgBlur(bar.bg);
    }
    if (index === 0) {
      tab.constraints.leading = 0;
    } else {
      tab.constraints.leading = setup.tabs[index - 1];
    }
    ios.layout.set(tab);
    tab.on(Events.TouchStart, function() {
      var tabIndex;
      tabIndex = this.x / ios.utils.px(specs.width);
      return setActive(tabIndex);
    });
  }
  bar.box.constraints = {
    align: "horizontal"
  };
  ios.layout.set(bar.box);
  setActive(setup.start);
  bar.tabs = setup.tabs;
  return bar;
};


},{"ios-kit":17}],26:[function(require,module,exports){
var IpzMessenger, ios, ipz;

ios = require('ios-kit');

ipz = require('ipz-messenger-kit');

IpzMessenger = (function() {
  IpzMessenger.homeView = void 0;

  function IpzMessenger(parentView, users) {
    var callsTab, callsView, cameraTab, gamesTab, gamesView, homeTab, peopleTab, peopleView, tabBar;
    homeTab = new ipz.IpzMessengerTab({
      label: "Home",
      activeIcon: "images/homeIconActive.png",
      inactiveIcon: "images/homeIcon.png",
      viewTop: parentView.y,
      viewBottom: 50
    });
    callsTab = new ipz.IpzMessengerTab({
      label: "Calls",
      activeIcon: "images/callIconActive.png",
      inactiveIcon: "images/callIcon.png",
      viewTop: parentView.y,
      viewBottom: 50
    });
    cameraTab = new ipz.IpzMessengerTab({
      label: "",
      activeIcon: "images/Circle.png",
      inactiveIcon: "images/Circle.png",
      viewTop: parentView.y,
      viewBottom: 50
    });
    peopleTab = new ipz.IpzMessengerTab({
      label: "People",
      activeIcon: "images/groupsIconActive.png",
      inactiveIcon: "images/groupsIcon.png",
      viewTop: parentView.y,
      viewBottom: 50
    });
    gamesTab = new ipz.IpzMessengerTab({
      label: "Games",
      activeIcon: "images/gamesIconActive.png",
      inactiveIcon: "images/gamesIcon.png",
      viewTop: parentView.y,
      viewBottom: 50
    });
    tabBar = new ipz.IpzMessengerTabBar({
      tabs: [homeTab, callsTab, cameraTab, peopleTab, gamesTab],
      activeColor: "blue",
      inactiveColor: "grey",
      start: 0
    });
    this.homeView = new ipz.IpzMessengerHome(homeTab.view, users);
    callsView = new ipz.IpzMessengerCalls(callsTab.view);
    peopleView = new ios.View({
      superLayer: peopleTab.view,
      y: parentView.y,
      width: parentView.width,
      backgroundColor: "blue"
    });
    gamesView = new ios.View({
      superLayer: gamesTab.view,
      y: parentView.y,
      width: parentView.width,
      backgroundColor: "red"
    });
  }

  IpzMessenger.prototype.login = function(user) {
    return this.homeView.setAvatar(user);
  };

  return IpzMessenger;

})();

module.exports = IpzMessenger;


},{"ios-kit":17,"ipz-messenger-kit":22}],27:[function(require,module,exports){
var ActiveFriends, ActiveFriendsScrollList, Avatar, MessageList, MessageListItem, style,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

style = {
  margin: 22,
  margins: 44,
  fontSizes: {
    name: 28,
    messageText: 24,
    messageTime: 22
  },
  fontWeights: []
};

Avatar = (function(superClass) {
  extend(Avatar, superClass);

  function Avatar(options, user) {
    var sign;
    if (options == null) {
      options = {};
    }
    this.changeStatus = bind(this.changeStatus, this);
    if (options.scale == null) {
      options.scale = 1;
    }
    options.width = options.height = 100 * options.scale;
    options.backgroundColor = "#EEEEEE";
    options.borderRadius = 100;
    if (options.image == null) {
      options.image = user.image_0;
    }
    if (options.status == null) {
      options.status = user.status;
    }
    Avatar.__super__.constructor.call(this, options);
    sign = new Layer({
      parent: this,
      x: Align.right,
      y: Align.bottom,
      width: 36 / 100 * this.width,
      height: 36 / 100 * this.height,
      borderRadius: 100,
      backgroundColor: "transparent",
      borderWidth: 4 * options.scale
    });
    sign.states = {
      inactive: {
        borderWidth: 0,
        backgroundColor: "transparent",
        image: null
      },
      active: {
        image: null,
        backgroundColor: "#60CA11",
        borderColor: "#FFFFFF"
      },
      messenger: {
        borderColor: "#FFFFFF",
        image: "images/messengerIcon.png"
      }
    };
    this.subLayers[0].animate(options.status);
  }

  Avatar.prototype.changeStatus = function(type) {
    return this.subLayers[0].animate(type);
  };

  return Avatar;

})(Layer);

exports.Avatar = Avatar;

MessageListItem = (function(superClass) {
  extend(MessageListItem, superClass);

  function MessageListItem(options, user) {
    var avatar, lastMessage, lastMessageTime, name;
    if (options == null) {
      options = {};
    }
    this.changeName = bind(this.changeName, this);
    if (options.scale == null) {
      options.scale = 1;
    }
    options.x = Align.center;
    options.width = Screen.width - style.margins;
    options.height = 150 * options.scale;
    options.backgroundColor = "transparent";
    options.clip = true;
    MessageListItem.__super__.constructor.call(this, options);
    options.name = user.firstname + " " + user.lastname;
    options.lastMessage = user.messageText;
    options.lastMessageTime = user.messageTime;
    avatar = new Avatar({
      parent: this,
      y: style.margin * options.scale
    }, user);
    name = new TextLayer({
      name: "name",
      parent: this,
      x: avatar.maxX + options.scale * 40,
      fontSize: 28 * options.scale,
      y: options.height / 4,
      text: options.name,
      fontSize: 28 * options.scale
    });
    lastMessage = new TextLayer({
      name: "lastMessage",
      parent: this,
      x: name.x,
      y: options.height / 1.8,
      text: options.lastMessage,
      fontSize: 24 * options.scale,
      truncate: true
    });
    lastMessageTime = new TextLayer({
      name: "lastMessageTime",
      parent: this,
      x: Align.right,
      y: name.y,
      fontSize: 22 * options.scale,
      text: options.lastMessageTime
    });
  }

  MessageListItem.prototype.changeName = function(name) {
    return this.name = name;
  };

  return MessageListItem;

})(Layer);

exports.MessageListItem = MessageListItem;

MessageList = (function(superClass) {
  extend(MessageList, superClass);

  function MessageList(options, users) {
    var i, index, len, message, user;
    if (options == null) {
      options = {};
    }
    if (options.scale == null) {
      options.scale = 1;
    }
    options.width = Screen.width - style.margins;
    options.height = users.length * 150 * options.scale;
    options.x = Align.center;
    options.backgroundColor = "transparent";
    MessageList.__super__.constructor.call(this, options);
    for (index = i = 0, len = users.length; i < len; index = ++i) {
      user = users[index];
      message = new MessageListItem({
        parent: this,
        y: options.scale * index * 150
      }, user);
    }
  }

  return MessageList;

})(Layer);

exports.MessageList = MessageList;

ActiveFriendsScrollList = (function(superClass) {
  extend(ActiveFriendsScrollList, superClass);

  function ActiveFriendsScrollList(options, users) {
    var avatar, container, i, index, len, name, user;
    if (options == null) {
      options = {};
    }
    if (options.scale == null) {
      options.scale = 1;
    }
    options.width = Screen.width;
    options.height = options.scale * 200;
    options.scrollVertical = false;
    ActiveFriendsScrollList.__super__.constructor.call(this, options);
    this.content.height = null;
    for (index = i = 0, len = users.length; i < len; index = ++i) {
      user = users[index];
      container = new Layer({
        parent: this.content,
        x: index * (100 + style.margin),
        width: 100,
        backgroundColor: "transparent"
      });
      avatar = new Avatar({
        parent: container
      }, user);
      name = new TextLayer({
        parent: container,
        text: user.firstname,
        fontSize: 24 * options.scale,
        y: avatar.maxY + 10
      });
      container.width = avatar.width;
      avatar.x = name.x = Align.center;
      this.content.height = container.height = avatar.height + name.height + 10;
      this.content.y = Align.center;
    }
  }

  return ActiveFriendsScrollList;

})(ScrollComponent);

exports.ActiveFriendsScrollList = ActiveFriendsScrollList;

ActiveFriends = (function(superClass) {
  extend(ActiveFriends, superClass);

  function ActiveFriends(options, users) {
    var activeFriendsIcon, activeFriendsLabel, activeNow, activeNowSettings, scroll;
    if (options == null) {
      options = {};
    }
    if (options.scale == null) {
      options.scale = 1;
    }
    options.height = 250;
    options.width = Screen.width - style.margins;
    options.backgroundColor = "transparent";
    ActiveFriends.__super__.constructor.call(this, options);
    activeFriendsLabel = new Layer({
      parent: this,
      width: this.width,
      height: 100 * options.scale,
      backgroundColor: "transparent"
    });
    activeFriendsIcon = new Layer({
      parent: activeFriendsLabel,
      x: Align.left,
      y: Align.center,
      image: "images/activeNowIcon.png",
      width: 40,
      height: 40
    });
    activeNow = new TextLayer({
      parent: activeFriendsLabel,
      x: activeFriendsIcon.maxX + 24,
      fontSize: 24,
      fontWeight: "bold",
      fontColor: "black",
      y: Align.center,
      text: "Active now (" + users.length + ") >"
    });
    activeNowSettings = new Layer({
      parent: activeFriendsLabel,
      x: Align.right(36),
      y: Align.center,
      image: "images/activeNowSettings.png",
      width: 75,
      height: 75
    });
    scroll = new ActiveFriendsScrollList({
      parent: this,
      y: Align.bottom
    }, users);
  }

  return ActiveFriends;

})(Layer);

exports.ActiveFriends = ActiveFriends;


},{}]},{},[1])

//# sourceMappingURL=app.js.map
