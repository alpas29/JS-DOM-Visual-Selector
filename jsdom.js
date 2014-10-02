// vim: ts=2:sw=2

<<<<<<< Updated upstream
/* ======= Element Info Functions
 * ======================================================================== */


var ELINFOFUN = (function() {

    var boxElement = document.createElement('div');

    // LOCAL FUNCTIONS
    function getElInfo(e) {
      name = "&lt;" + e.tagName.toLowerCase() + "&gt; " + e.clientWidth + "x" + e.clientHeight;
      return name;
    }
    function showInfoBox(infoData,e) {
      rect = e.getBoundingClientRect();
      cssStyleString = "position: absolute; top: "+(rect.top-18)+"px; left: "+(rect.left+5)+"px; line-height: 12px; font-size: 12px; padding: 1px; border: 1px solid black; background-color: #ADD8E6;";
      console.log(cssStyleString);
      boxElement.style.cssText = cssStyleString;
      boxElement.innerHTML = infoData;
      document.body.appendChild(boxElement);
    }

    // CROSS FUNCTIONS
    return {
      elementInfo: function(e) {
        infoData = getElInfo(e);
        showInfoBox(infoData,e);
      }
    }

})(); // call with ELINFOFUN.showInfoBox etc. 


/* ======== Adding/Removing Inspector Box 
 * ======================================================================== */

var INSBOXFUN = (function() {

    function addEdgeDiv(newEl, width, height, ptop,pleft) {
      newEl.style.position = "absolute";
      newEl.style.top = ptop+"px";
      newEl.style.left = pleft+"px";
      newEl.style.height = height+"px";
      newEl.style.width = width+"px";
      newEl.style.background = "#FF69B4";
      document.body.appendChild(newEl);
    }

    return {
      drawBoundingBox: function(chosenEl) {
        // borders/outlines/margins/padding etc. will effect page layout
        // instead, add 4 divs positioned atop the element
        var box = chosenEl.getBoundingClientRect();

        divTop = document.createElement('div');
        divBottom = document.createElement('div');
        divLeft = document.createElement('div');
        divRight = document.createElement('div');

        var xOffset = window.scrollX;
        var yOffset = window.scrollY

        addEdgeDiv(divTop, box.width, 2, box.top+yOffset, box.left+xOffset);
        addEdgeDiv(divBottom, box.width, 2, box.bottom+yOffset, box.left+xOffset);
        addEdgeDiv(divLeft, 2, box.height, box.top+yOffset, box.left+xOffset);
        addEdgeDiv(divRight, 2, box.height, box.top+yOffset, box.right+xOffset);
      },
      removeBoundingBox: function() {
        document.body.removeChild(divTop);
        document.body.removeChild(divBottom);
        document.body.removeChild(divLeft);
        document.body.removeChild(divRight);
      }
    }

})();

/* ======== Mouse Event Handlers 
 * ======================================================================== */
function mouseOverHandler(m) {
  if(m.target.id !== "INSPECTORBUTTON000") {
    INSBOXFUN.drawBoundingBox(m.target);
  }
}
function mouseOutHandler(m) {
  INSBOXFUN.removeBoundingBox();
}
function mouseDownHandler(m) {
  if(m.target.id !== "INSPECTORBUTTON000") {
    try {
      ELINFOFUN.elementInfo(m.target);
    } catch (err) { console.log(err); stopInspector(); }
  }
  stopInspector();
}

// Cross-bOWSer event listener functions
function addEvent(element, eventName, handler) {
  if (element.addEventListener) {
    element.addEventListener(eventName, handler, false);
  } else if (element.attachEvent) {
    element.attachEvent("on" + eventName, handler);
  }
}
function removeEvent(element, eventName, handler) {
  if (element.removeEventListener) {
    element.removeEventListener(eventName, handler, false);
  } else if (element.removeEvent) {
    element.removeEvent("on" + eventName, handler);
  }
}

/* ======== Main Functions
 * ======================================================================== */

function startInspector() {
  addEvent(document.body, "mouseover", mouseOverHandler);
  addEvent(document.body, "mouseout", mouseOutHandler);
  addEvent(document.body, "mousedown", mouseDownHandler);

  btn.innerHTML = "Stop Inspector";
  btn.setAttribute("onclick", "stopInspector()");
  btn.parentNode.replaceChild(btn,btn);
}

function stopInspector() {
  removeEvent(document.body, "mouseover", mouseOverHandler);
  removeEvent(document.body, "mousedown", mouseDownHandler);

  btn.innerHTML = "Start Inspector";
  btn.setAttribute("onclick", "startInspector()");
}

function addInspectorButton() {
  btn = document.createElement("button"); //GLOBAL
  btn.setAttribute("type", "button");
  btn.setAttribute("onclick", "startInspector()");
  btn.setAttribute("id", "INSPECTORBUTTON000");
  btn.style.cssText = 'position: absolute; top: 0; right: 0;';
  btn.innerHTML = "Start Inspector";
  document.body.appendChild(btn);    
}

addInspectorButton();
=======
var __inspectorPlugin = __inspectorPlugin || {};

var __inspectorPlugin = {

    INIT: function() {       // initialization for inspector start
      var boxElement = document.createElement('div');
      var divTop = document.createElement('div');
      var divBottom = document.createElement('div');
      var divLeft = document.createElement('div');
      var divRight = document.createElement('div');
      this.MAINFUNCTIONS.addInspectorButtons();
    },

    /* ======= Element Info 
     */

    ELINFO: {
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
      }
    },

    /* ======== Adding/Removing Inspector Box
     */

    INSPEC: {
      init: function() {
        this.addEvent(document.body, "mouseover", this.mouseOverHandler);
        this.addEvent(document.body, "mouseout", this.mouseOutHandler);
        this.addEvent(document.body, "mousedown", this.mouseDownHandler);
      },
      exit: function() {
        this.removeEvent(document.body, "mouseover", this.mouseOverHandler);
        this.removeEvent(document.body, "mousedown", this.mouseDownHandler);
        this.removeEvent(document.body, "mouseout", mouseOutHandler); // remove this so that highlighting remains 
        document.body.removeChild(divBottom);
        document.body.removeChild(divLeft);
        document.body.removeChild(divRight);
      }
    },

    MAINFUNCTIONS: {
      startInspector: function() {
        __inspectorPlugin.INSPEC.init();
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
        startBtn.setAttribute("onclick", "__inspectorPlugin.MAINFUNCTIONS.startInspector()");
        __inspectorPlugin.INSPEC.exit();
      },
      addInspectorButtons: function() {
        startBtn = document.createElement("button");
        startBtn.setAttribute("type", "button");
        startBtn.setAttribute("onclick", "__inspectorPlugin.MAINFUNCTIONS.startInspector()");
        startBtn.setAttribute("class", "INSPECTORBUTTON000");
        startBtn.style.cssText = 'position: absolute; top: 0; right: 0;';
        startBtn.innerHTML = "Start Inspector";
        
        stopBtn = document.createElement("button");
        stopBtn.setAttribute("type", "button");
        stopBtn.setAttribute("onclick", "__inspectorPlugin.MAINFUNCTIONS.stopInspector()");
        stopBtn.setAttribute("class", "INSPECTORBUTTON000");
        stopBtn.style.cssText = 'position: absolute; top: 25px; right: 0;';
        stopBtn.innerHTML = "Stop Inspector";

        document.body.appendChild(stopBtn);
        document.body.appendChild(startBtn);
      }
    }
}

__inspectorPlugin.INIT();
>>>>>>> Stashed changes



