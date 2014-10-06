// vim: ts=2:sw=2

var __inspectorPlugin = __inspectorPlugin || {};

var __inspectorPlugin = {

  INIT: function() {       // initialization for inspector start
    boxElement = document.createElement('div');
    divTop = document.createElement('div');
    divBottom = document.createElement('div');
    divLeft = document.createElement('div');
    divRight = document.createElement('div');
    this.addInspectorButtons();
  },

  /* ======= Element Info 
   */

  elementInfo: function(e) {
    infoData = this.getElInfo(e);
    this.showInfoBox(infoData,e);
  },
  getElInfo: function(e) {
    name = "&lt;" + e.tagName.toLowerCase() + "&gt; " + e.clientWidth + "x" + e.clientHeight;
    return name;
  },
  showInfoBox: function (infoData,e) {
    rect = e.getBoundingClientRect();
    cssStyleString = "position: absolute; top: "+(rect.top-18)+"px; left: "+(rect.left+5)+"px; line-height: 12px; font-size: 12px; padding: 1px; border: 1px solid black; background-color: #ADD8E6;";
    boxElement.style.cssText = cssStyleString;
    boxElement.innerHTML = infoData;
    document.body.appendChild(boxElement);
  },

    /* ======== Adding/Removing Inspector Box
     */

  INSBOXFUN: {
    INIT: function() {
      var kapa = __inspectorPlugin;
      kapa.addEvent(document.body, "mouseover", kapa.mouseOverHandler);
      kapa.addEvent(document.body, "mouseout", kapa.mouseOutHandler);
      kapa.addEvent(document.body, "mousedown", kapa.mouseDownHandler);
    },
    EXIT: function() {
      var kapa = __inspectorPlugin;
      kapa.removeEvent(document.body, "mouseover", kapa.mouseOverHandler);
      kapa.removeEvent(document.body, "mousedown", kapa.mouseDownHandler);
      kapa.removeEvent(document.body, "mouseout", kapa.mouseOutHandler); // remove kapa so that highlighting remains 
    }
  },

  mouseOverHandler: function(m) {
    if(m.target.id !== "INSPECTORBUTTON000") {
      __inspectorPlugin.drawBoundingBox(m.target);
      __inspectorPlugin.elementInfo(m.target);
    }
  },
  mouseOutHandler: function(m) {
    __inspectorPlugin.removeBoundingBox();
  },
  mouseDownHandler: function(m) {
    __inspectorPlugin.pauseInspector();
  },
  addEvent: function(element, eventName, handler) {
    if (element.addEventListener) {
      element.addEventListener(eventName, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent("on" + eventName, handler);
    }
  },
  removeEvent: function(element, eventName, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(eventName, handler, false);
    } else if (element.removeEvent) {
      element.removeEvent("on" + eventName, handler);
    }
  },
  addEdgeDiv: function(newEl, width, height, ptop, pleft) {
    newEl.style.position = "absolute";
    newEl.style.top = ptop+"px";
    newEl.style.left = pleft+"px";
    newEl.style.height = height+"px";
    newEl.style.width = width+"px";
    newEl.style.background = "#FF69B4";
    document.body.appendChild(newEl);
  },
  drawBoundingBox: function(chosenEl) {
    // borders/outlines/margins/padding etc. will effect page layout
    // instead, add 4 divs positioned atop the element
    var box = chosenEl.getBoundingClientRect();
    var xOffset = window.scrollX;
    var yOffset = window.scrollY;

    this.addEdgeDiv(divTop, box.width, 2, box.top+yOffset, box.left+xOffset);
    this.addEdgeDiv(divBottom, box.width, 2, box.bottom+yOffset, box.left+xOffset);
    this.addEdgeDiv(divLeft, 2, box.height, box.top+yOffset, box.left+xOffset);
    this.addEdgeDiv(divRight, 2, box.height, box.top+yOffset, box.right+xOffset);
  },
  removeBoundingBox: function() {
    document.body.removeChild(divTop);
    document.body.removeChild(divBottom);
    document.body.removeChild(divLeft);
    document.body.removeChild(divRight);
  },

  startInspector: function() {
    __inspectorPlugin.INSBOXFUN.INIT();
    document.body.style.cursor = 'crosshair';
    startBtn.innerHTML = "Pause Inspector";
    startBtn.setAttribute("onclick", "__inspectorPlugin.pauseInspector()");
  },
  stopInspector: function() {
    __inspectorPlugin.pauseInspector();
    document.body.removeChild(boxElement);
  },
  pauseInspector: function() {
    document.body.style.cursor = 'auto';
    startBtn.innerHTML = "Start Inspector";
    startBtn.setAttribute("onclick", "__inspectorPlugin.startInspector()");
    __inspectorPlugin.INSBOXFUN.EXIT();
  },
  addInspectorButtons: function() {
    startBtn = document.createElement("button");
    startBtn.setAttribute("type", "button");
    startBtn.setAttribute("onclick", "__inspectorPlugin.startInspector()");
    startBtn.setAttribute("class", "INSPECTORBUTTON000");
    startBtn.style.cssText = 'position: absolute; top: 0; right: 0;';
    startBtn.innerHTML = "Start Inspector";

    stopBtn = document.createElement("button");
    stopBtn.setAttribute("type", "button");
    stopBtn.setAttribute("onclick", "__inspectorPlugin.stopInspector()");
    stopBtn.setAttribute("class", "INSPECTORBUTTON000");
    stopBtn.style.cssText = 'position: absolute; top: 25px; right: 0;';
    stopBtn.innerHTML = "Stop Inspector";

    document.body.appendChild(stopBtn);
    document.body.appendChild(startBtn);
  }
}

__inspectorPlugin.INIT();



