// vim: ts=2:sw=2

var __inspectorPlugin = (function() {

    /* ======= Element Info Functions
     */
    var boxElement = document.createElement('div');
    var divTop = document.createElement('div');
    var divBottom = document.createElement('div');
    var divLeft = document.createElement('div');
    var divRight = document.createElement('div');

    function getElInfo(e) {
      name = "&lt;" + e.tagName.toLowerCase() + "&gt; " + e.clientWidth + "x" + e.clientHeight;
      return name;
    }
    function showInfoBox(infoData,e) {
      rect = e.getBoundingClientRect();
      cssStyleString = "position: absolute; top: "+(rect.top-18)+"px; left: "+(rect.left+5)+"px; line-height: 12px; font-size: 12px; padding: 1px; border: 1px solid black; background-color: #ADD8E6;";
      boxElement.style.cssText = cssStyleString;
      boxElement.innerHTML = infoData;
      document.body.appendChild(boxElement);
    }

    /* ======== Adding/Removing Inspector Box
     */

    function addEdgeDiv(newEl, width, height, ptop,pleft) {
      newEl.style.position = "absolute";
      newEl.style.top = ptop+"px";
      newEl.style.left = pleft+"px";
      newEl.style.height = height+"px";
      newEl.style.width = width+"px";
      newEl.style.background = "#FF69B4";
      document.body.appendChild(newEl);
    }

    /* ======== Mouse Event Handlers 
     */
    function mouseOverHandler(m) {
      if(m.target.class !== "INSPECTORBUTTON000") {
        drawBoundingBox(m.target);
      }
      if(m.target.class !== "INSPECTORBUTTON000") {
        elementInfo(m.target);
      }
    }
    function mouseOutHandler(m) {
      removeBoundingBox();
    }
    function mouseDownHandler(m) {
      __inspectorPlugin.pauseInspector();
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

    function elementInfo(e) {
        infoData = getElInfo(e);
        showInfoBox(infoData,e);
      }
    function drawBoundingBox(chosenEl) {
      // borders/outlines/margins/padding etc. will effect page layout
      // instead, add 4 divs positioned atop the element
      var box = chosenEl.getBoundingClientRect();

      var xOffset = window.scrollX;
      var yOffset = window.scrollY;

      addEdgeDiv(divTop, box.width, 2, box.top+yOffset, box.left+xOffset);
      addEdgeDiv(divBottom, box.width, 2, box.bottom+yOffset, box.left+xOffset);
      addEdgeDiv(divLeft, 2, box.height, box.top+yOffset, box.left+xOffset);
      addEdgeDiv(divRight, 2, box.height, box.top+yOffset, box.right+xOffset);
    }
      
    function removeBoundingBox() {
      document.body.removeChild(divTop);
      document.body.removeChild(divBottom);
      document.body.removeChild(divLeft);
      document.body.removeChild(divRight);
    }

    return {
      startInspector: function() {
        addEvent(document.body, "mouseover", mouseOverHandler);
        addEvent(document.body, "mouseout", mouseOutHandler);
        addEvent(document.body, "mousedown", mouseDownHandler);
        document.body.style.cursor = 'crosshair';
        startBtn.innerHTML = "Pause Inspector";
        startBtn.setAttribute("onclick", "__inspectorPlugin.pauseInspector()");
      },
      stopInspector: function() {
        __inspectorPlugin.pauseInspector();
        removeBoundingBox();
        document.body.removeChild(boxElement);
      },
      pauseInspector: function() {
        removeEvent(document.body, "mouseover", mouseOverHandler);
        removeEvent(document.body, "mousedown", mouseDownHandler);
        removeEvent(document.body, "mouseout", mouseOutHandler); // remove this so that highlighting remains
        document.body.style.cursor = 'auto';
        startBtn.innerHTML = "Start Inspector";
        startBtn.setAttribute("onclick", "__inspectorPlugin.startInspector()");
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
})();

__inspectorPlugin.addInspectorButtons();



