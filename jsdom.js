// vim: ts=2:sw=2

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



