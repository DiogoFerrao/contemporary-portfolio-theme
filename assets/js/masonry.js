(function () {
  "use strict";

  var GRID_SELECTOR = ".masonry-grid";
  var ITEM_SELECTOR = ".masonry-item";
  var DEFAULT_GAP = 24;

  function getColumnCount(containerWidth) {
    if (containerWidth >= 900) return 3;
    if (containerWidth >= 480) return 2;
    return 1;
  }

  function getImageHeight(item, width) {
    var img = item.querySelector("img");
    if (img && img.naturalWidth && img.naturalHeight) {
      return (img.naturalHeight / img.naturalWidth) * width;
    }
    return item.getBoundingClientRect().height || width * 0.66;
  }

  function layout(grid) {
    var items = Array.from(grid.querySelectorAll(ITEM_SELECTOR));
    if (items.length === 0) return;

    var GAP = parseInt(grid.getAttribute("data-gap"), 10) || DEFAULT_GAP;
    var containerWidth = grid.clientWidth;
    var numCols = getColumnCount(containerWidth);
    var colWidth = (containerWidth - GAP * (numCols - 1)) / numCols;
    var colHeights = new Array(numCols).fill(0);

    items.forEach(function (item) {
      // Find the shortest column
      var shortest = 0;
      for (var i = 1; i < numCols; i++) {
        if (colHeights[i] < colHeights[shortest]) {
          shortest = i;
        }
      }

      var x = shortest * (colWidth + GAP);
      var y = colHeights[shortest];
      var h = getImageHeight(item, colWidth);

      item.style.position = "absolute";
      item.style.left = x + "px";
      item.style.top = y + "px";
      item.style.width = colWidth + "px";

      colHeights[shortest] = y + h + GAP;
    });

    var maxH = Math.max.apply(null, colHeights);
    grid.style.position = "relative";
    grid.style.height = Math.max(0, maxH - GAP) + "px";
  }

  function imagesLoaded(container) {
    var imgs = container.querySelectorAll("img");
    var promises = Array.from(imgs).map(function (img) {
      if (img.complete && img.naturalWidth > 0) {
        return Promise.resolve();
      }
      return new Promise(function (resolve) {
        img.addEventListener("load", resolve, { once: true });
        img.addEventListener("error", resolve, { once: true });
      });
    });
    return Promise.all(promises);
  }

  function init() {
    var grids = document.querySelectorAll(GRID_SELECTOR);
    grids.forEach(function (grid) {
      imagesLoaded(grid).then(function () {
        layout(grid);
        grid.classList.add("masonry-ready");
      });
      layout(grid);
    });
  }

  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      document.querySelectorAll(GRID_SELECTOR).forEach(layout);
    }, 120);
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
