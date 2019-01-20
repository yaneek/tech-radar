// radial_min / radial_max are multiples of PI
const QUADRANTS = [
  { radial_min: 0, radial_max: 0.5, factor_x: 1, factor_y: 1 },
  { radial_min: 0.5, radial_max: 1, factor_x: -1, factor_y: 1 },
  { radial_min: -1, radial_max: -0.5, factor_x: -1, factor_y: -1 },
  { radial_min: -0.5, radial_max: 0, factor_x: 1, factor_y: -1 }
];

const RINGS = [
  { radius: 130, name: "ADOPT", color: "#93c47d" },
  { radius: 220, name: "TRIAL", color: "#93d2c2" },
  { radius: 310, name: "ASSESS", color: "#fbdb84" },
  { radius: 400, name: "HOLD", color: "#efafa9" }
];

const TITLE_OFFSET =
  { x: -675, y: -420 };

const FOOTER_OFFSET =
  { x: -675, y: 420 };

const LEGEND_OFFSET = [
  { x: 450, y: 90 },
  { x: -675, y: 90 },
  { x: -675, y: -310 },
  { x: 450, y: -310 }
];

// custom random number generator, to make random sequence reproducible
// source: https://stackoverflow.com/questions/521295
const START_SEED = 42;
var seed = START_SEED;
function random() {
  var x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

function random_between(min, max) {
  return min + random() * (max - min);
}

function normal_between(min, max) {
  return min + (random() + random()) * 0.5 * (max - min);
}

function polar(cartesian) {
  var x = cartesian.x;
  var y = cartesian.y;
  return {
    t: Math.atan2(y, x),
    r: Math.sqrt(x * x + y * y)
  }
}

function cartesian(polar) {
  return {
    x: polar.r * Math.cos(polar.t),
    y: polar.r * Math.sin(polar.t)
  }
}

function bounded_interval(value, min, max) {
  var low = Math.min(min, max);
  var high = Math.max(min, max);
  return Math.min(Math.max(value, low), high);
}

function bounded_ring(polar, r_min, r_max) {
  return {
    t: polar.t,
    r: bounded_interval(polar.r, r_min, r_max)
  }
}

function bounded_box(point, min, max) {
  return {
    x: bounded_interval(point.x, min.x, max.x),
    y: bounded_interval(point.y, min.y, max.y)
  }
}

function segment(quadrantIndex, ringIndex) {
  var polar_min = {
    t: QUADRANTS[quadrantIndex].radial_min * Math.PI,
    r: ringIndex === 0 ? 30 : RINGS[ringIndex - 1].radius
  };
  var polar_max = {
    t: QUADRANTS[quadrantIndex].radial_max * Math.PI,
    r: RINGS[ringIndex].radius
  };
  var cartesian_min = {
    x: 15 * QUADRANTS[quadrantIndex].factor_x,
    y: 15 * QUADRANTS[quadrantIndex].factor_y
  };
  var cartesian_max = {
    x: RINGS[3].radius * QUADRANTS[quadrantIndex].factor_x,
    y: RINGS[3].radius * QUADRANTS[quadrantIndex].factor_y
  };
  return {
    clipx: function (d) {
      var c = bounded_box(d, cartesian_min, cartesian_max);
      var p = bounded_ring(polar(c), polar_min.r + 15, polar_max.r - 15);
      d.x = cartesian(p).x; // adjust data too!
      return d.x;
    },
    clipy: function (d) {
      var c = bounded_box(d, cartesian_min, cartesian_max);
      var p = bounded_ring(polar(c), polar_min.r + 15, polar_max.r - 15);
      d.y = cartesian(p).y; // adjust data too!
      return d.y;
    },
    random: function () {
      return cartesian({
        t: random_between(polar_min.t, polar_max.t),
        r: normal_between(polar_min.r, polar_max.r)
      });
    }
  }
}

function getRingConfigField(config, ringIndex, fieldName) {
  return (config.rings && config.rings[ringIndex] && config.rings[ringIndex][fieldName])
    ? config.rings[ringIndex][fieldName]
    : RINGS[ringIndex][fieldName]
}

function getRingColor(config, ringIndex) {
  return getRingConfigField(config, ringIndex, 'color')
}

function getRingName(config, ringIndex) {
  return getRingConfigField(config, ringIndex, 'name')
}

function setEntriesPositions(config) {
  for (var entry of config.entries) {
    entry.segment = segment(entry.quadrant, entry.ring);
    var point = entry.segment.random();
    entry.x = point.x;
    entry.y = point.y;
    entry.color = entry.active || config.print_layout ?
      getRingColor(config, entry.ring): config.colors.inactive;
  };
}

function translate(x, y) {
  return "translate(" + x + "," + y + ")";
}

function viewbox(quadrant) {
  return [
    Math.max(0, QUADRANTS[quadrant].factor_x * 400) - 420,
    Math.max(0, QUADRANTS[quadrant].factor_y * 400) - 420,
    440,
    440
  ].join(" ");
}

export function radar_visualization(config) {
  function addQuadandLegend(legendContainer, quadrantIndex, caption) {
    legendContainer.append("text")
      .attr("transform", translate(
        LEGEND_OFFSET[quadrantIndex].x,
        LEGEND_OFFSET[quadrantIndex].y - 45
      ))
      .text(caption)
      .style("font-family", "Arial, Helvetica")
      .style("font-size", "18");
  }

  function addQuadrantRingLegend(legendContainer, quadrantIndex, ringIndex, caption) {
    legendContainer.append("text")
      .attr("transform", legend_transform(quadrantIndex, ringIndex))
      .text(caption)
      .style("font-family", "Arial, Helvetica")
      .style("font-size", "12")
      .style("font-weight", "bold");
  }

  function legend_transform(quadrantIndex, ringIndex, legendIndex = null) {
    var dx = ringIndex < 2 ? 0 : 120;
    var dy = (legendIndex == null ? -16 : legendIndex * 12);
    if (ringIndex % 2 === 1) {
      dy = dy + 36 + segmentedEntries[quadrantIndex][ringIndex - 1].length * 12;
    }
    return translate(
      LEGEND_OFFSET[quadrantIndex].x + dx,
      LEGEND_OFFSET[quadrantIndex].y + dy
    );
  }

  function partitionEntries() {
    var segmentedEntries = new Array(4);
    for (var quadrantIndex in QUADRANTS) {
      segmentedEntries[quadrantIndex] = new Array(4);
      for (var ringIndex in RINGS) {
        segmentedEntries[quadrantIndex][ringIndex] = [];
      }
    }
    config.entries.sort(function (a, b) { return a.label.localeCompare(b.label); })
    var id = 1;
    for (var entry of config.entries) {
      // assign unique sequential id to each entry
      entry.id = "" + id++;
      segmentedEntries[entry.quadrant][entry.ring].push(entry);
    }

    return segmentedEntries;
  }

  seed = START_SEED;

  // position each entry randomly in its segment
  setEntriesPositions(config);

  // partition entries according to segments
  var segmentedEntries = partitionEntries();

  var svg = d3.select("svg#" + config.svg_id)
    .style("background-color", config.colors.background)
    .attr("width", config.width)
    .attr("height", config.height);

  var radar = svg.append("g");
  if ("zoomed_quadrant" in config) {
    svg.attr("viewBox", viewbox(config.zoomed_quadrant));
  } else {
    radar.attr("transform", translate(config.width / 2, config.height / 2));
  }

  var grid = radar.append("g");

  // draw grid lines
  grid.append("line")
    .attr("x1", 0).attr("y1", -400)
    .attr("x2", 0).attr("y2", 400)
    .style("stroke", config.colors.grid)
    .style("stroke-width", 1);
  grid.append("line")
    .attr("x1", -400).attr("y1", 0)
    .attr("x2", 400).attr("y2", 0)
    .style("stroke", config.colors.grid)
    .style("stroke-width", 1);

  // draw rings
  for (var ringIndex = 0; ringIndex < RINGS.length; ringIndex++) {
    grid.append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", RINGS[ringIndex].radius)
      .style("fill", "none")
      .style("stroke", config.colors.grid)
      .style("stroke-width", 1);
    if (config.print_layout) {
      grid.append("text")
        .text(getRingName(config, ringIndex))
        .attr("y", -RINGS[ringIndex].radius + 62)
        .attr("text-anchor", "middle")
        .style("fill", "#e5e5e5")
        .style("font-family", "Arial, Helvetica")
        .style("font-size", 42)
        .style("font-weight", "bold")
        .style("pointer-events", "none")
        .style("user-select", "none");
    }
  }

  // draw title and legend (only in print layout)
  if (config.print_layout) {

    // // title
    // radar.append("text")
    //   .attr("transform", translate(TITLE_OFFSET.x, TITLE_OFFSET.y))
    //   .text(config.title)
    //   .style("font-family", "Arial, Helvetica")
    //   .style("font-size", "34");

    // footer
    radar.append("text")
      .attr("transform", translate(FOOTER_OFFSET.x, FOOTER_OFFSET.y))
      .text("▲ moved up     ▼ moved down")
      .attr("xml:space", "preserve")
      .style("font-family", "Arial, Helvetica")
      .style("font-size", "10");

    // legend
    var legendContainer = radar.append("g");
    for (var quadrantIndex in QUADRANTS) {
      addQuadandLegend(legendContainer, quadrantIndex, config.quadrants[quadrantIndex].name);
      for (var ringIndex in RINGS) {
        addQuadrantRingLegend(legendContainer, quadrantIndex, ringIndex, getRingName(config, ringIndex));
        legendContainer.selectAll(".legend" + quadrantIndex + ringIndex)
          .data(segmentedEntries[quadrantIndex][ringIndex])
          .enter()
          .append("a")
          .attr("xlink:href", (d, i) => d.link)
          .attr("target", "_BLANK")
          .append("text")
          .attr("transform", function (d, i) { return legend_transform(quadrantIndex, ringIndex, i); })
          .attr("class", "legend" + quadrantIndex + ringIndex)
          .attr("id", function (d, i) { return "legendItem" + d.id; })
          .text(function (d, i) { return d.id + ". " + d.label; })
          .style("font-family", "Arial, Helvetica")
          .style("font-size", "10")
          .on("mouseover", function (d) { showBubble(d); highlightLegendItem(d); })
          .on("mouseout", function (d) { hideBubble(d); unhighlightLegendItem(d); })
          ;
      }
    }
  }

  // layer for entries
  var rink = radar.append("g")
    .attr("id", "rink");

  // rollover bubble (on top of everything else)
  var bubble = radar.append("g")
    .attr("id", "bubble")
    .attr("x", 0)
    .attr("y", 0)
    .style("opacity", 0)
    .style("pointer-events", "none")
    .style("user-select", "none");
  bubble.append("rect")
    .attr("rx", 4)
    .attr("ry", 4)
    .style("fill", "#333");
  bubble.append("text")
    .style("font-family", "sans-serif")
    .style("font-size", "10px")
    .style("fill", "#fff");
  bubble.append("path")
    .attr("d", "M 0,0 10,0 5,8 z")
    .style("fill", "#333");

  function showBubble(d) {
    if (d.active || config.print_layout) {
      var tooltip = d3.select("#bubble text")
        .text(d.label);
      var bbox = tooltip.node().getBBox();
      d3.select("#bubble")
        .attr("transform", translate(d.x - bbox.width / 2, d.y - 16))
        .style("opacity", 0.8);
      d3.select("#bubble rect")
        .attr("x", -5)
        .attr("y", -bbox.height)
        .attr("width", bbox.width + 10)
        .attr("height", bbox.height + 4);
      d3.select("#bubble path")
        .attr("transform", translate(bbox.width / 2 - 5, 3));
    }
  }

  function hideBubble(d) {
    var bubble = d3.select("#bubble")
      .attr("transform", translate(0, 0))
      .style("opacity", 0);
  }

  function highlightLegendItem(d) {
    var legendItem = document.getElementById("legendItem" + d.id);
    legendItem.setAttribute("fill", "blue")
    legendItem.setAttribute("font-weight", "bold")
  }

  function unhighlightLegendItem(d) {
    var legendItem = document.getElementById("legendItem" + d.id);
    legendItem.setAttribute("fill", "black")
    legendItem.setAttribute("font-weight", "normal")
  }

  // draw blips on radar
  var blips = rink.selectAll(".blip")
    .data(config.entries)
    .enter()
    .append("g")
    .attr("class", "blip")
    .attr("transform", function (d, i) { return legend_transform(d.quadrant, d.ring, i); })
    .on("mouseover", function (d) { showBubble(d); highlightLegendItem(d); })
    .on("mouseout", function (d) { hideBubble(d); unhighlightLegendItem(d); });

  // configure each blip
  blips.each(function (d) {
    var blip = d3.select(this);

    // blip link
    if (d.active && d.hasOwnProperty("link")) {
      blip = blip.append("a")
        .attr("xlink:href", d.link)
        .attr("target", "_BLANK");
    }

    // blip shape
    if (d.moved > 0) {
      blip.append("path")
        .attr("d", "M -11,5 11,5 0,-13 z") // triangle pointing up
        .style("fill", d.color);
    } else if (d.moved < 0) {
      blip.append("path")
        .attr("d", "M -11,-5 11,-5 0,13 z") // triangle pointing down
        .style("fill", d.color);
    } else {
      blip.append("circle")
        .attr("r", 9)
        .attr("fill", d.color);
    }

    // blip text
    if (d.active || config.print_layout) {
      var blip_text = config.print_layout ? d.id : d.label.match(/[a-z]/i);
      blip.append("text")
        .text(blip_text)
        .attr("y", 3)
        .attr("text-anchor", "middle")
        .style("fill", "#fff")
        .style("font-family", "Arial, Helvetica")
        .style("font-size", function (d) { return blip_text.length > 2 ? "8" : "9"; })
        .style("pointer-events", "none")
        .style("user-select", "none");
    }
  });

  // make sure that blips stay inside their segment
  function ticked() {
    blips.attr("transform", function (d) {
      return translate(d.segment.clipx(d), d.segment.clipy(d));
    })
  }

  // distribute blips, while avoiding collisions
  d3.forceSimulation()
    .nodes(config.entries)
    .velocityDecay(0.19) // magic number (found by experimentation)
    .force("collision", d3.forceCollide().radius(12).strength(0.85))
    .on("tick", ticked);
}
