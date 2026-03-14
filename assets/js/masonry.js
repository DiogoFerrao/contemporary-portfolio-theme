(function () {
  "use strict";

  const GRID_SELECTOR = ".masonry-grid";
  const ITEM_SELECTOR = ".masonry-item";
  const GAP = 10; // px gap between tiles

  function getColumnCount(containerWidth) {
    if (containerWidth >= 900) return 3;
    if (containerWidth >= 480) return 2;
    return 1;
  }

  function layout(grid) {
    const items = Array.from(grid.querySelectorAll(ITEM_SELECTOR));
    if (items.length === 0) return;

    const containerWidth = grid.clientWidth;
    const numCols = getColumnCount(containerWidth);
    const colWidth = (containerWidth - GAP * (numCols - 1)) / numCols;

    // Track the running height of each column
    const colHeights = new Array(numCols).fill(0);

    items.forEach(function (item) {
      // Find the shortest column to place this item in
      const shortestCol = colHeights.indexOf(Math.min.apply(null, colHeights));

      const x = shortestCol * (colWidth + GAP);
      const y = colHeights[shortestCol];

      item.style.position = "absolute";
      item.style.left = x + "px";
      item.style.top = y + "px";
      item.style.width = colWidth + "px";

      // Let the browser compute height from the image's natural aspect ratio
      const img = item.querySelector("img");
      let itemHeight;
      if (img && img.naturalWidth && img.naturalHeight) {
        itemHeight = (img.naturalHeight / img.naturalWidth) * colWidth;
      } else {
        // Fallback: read rendered height
        itemHeight = item.getBoundingClientRect().height;
      }

      colHeights[shortestCol] = y + itemHeight + GAP;
    });

    // Set the container height to the tallest column
    grid.style.position = "relative";
    grid.style.height = Math.max.apply(null, colHeights) - GAP + "px";
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
      // Do an initial layout once all images in this grid have loaded
      imagesLoaded(grid).then(function () {
        layout(grid);
        grid.classList.add("masonry-ready");
      });

      // Also run a quick layout before images finish (progressive feel)
      layout(grid);
    });
  }

  // Re-layout on resize (debounced)
  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      document.querySelectorAll(GRID_SELECTOR).forEach(layout);
    }, 120);
  });

  // Kick off on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
