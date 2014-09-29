// vim: ts=2:sw=2

/* ======= Element Info Functions
 * ======================================================================== */


var ELINFOFUN = (function() {

    var tracker='';

    // LOCAL FUNCTIONS
    function showInfoBox(infoData) {
      // register box in global tracker
      // (then use it to remove the box when the next element is clicked)
      var boxElement = document.createElement(div);
    }
    function remInfoBox() {
      document.body.removeChild(tracker);
      tracker='';
    }

    // CROSS FUNCTIONS
    return {
      function elementInfo(el) {
        // get element info

        // display info
        if(typeof variable !== '') {
          remInfoBox();
        } else {
          showInfoBox(infoData);
        }
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
      function drawBoundingBox(chosenEl) {
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
      }

      function removeBoundingBox() {
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
    drawBoundingBox(m.target);
  }
}
function mouseOutHandler(m) {
  removeBoundingBox();
}
function mouseDownHandler(m) {
  if(m.target.id !== "INSPECTORBUTTON000") {
    ELINFOFUN.elementInfo(m.target);
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
