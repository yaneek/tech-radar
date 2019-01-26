import * as d3 from 'd3';
import { getRings } from '../../lib/EntriesRepository';

// radial_min / radial_max are multiples of PI
const QUADRANTS = [
  { radial_min: 0, radial_max: 0.5, factor_x: 1, factor_y: 1, textAnchor: 'end' },
  { radial_min: 0.5, radial_max: 1, factor_x: -1, factor_y: 1, textAnchor: 'start' },
  { radial_min: -1, radial_max: -0.5, factor_x: -1, factor_y: -1, textAnchor: 'start' },
  { radial_min: -0.5, radial_max: 0, factor_x: 1, factor_y: -1, textAnchor: 'end' }
];

const RINGS = getRings();

const ORIGINAL_WIDTH = 1450;
const ORIGINAL_HEIGHT = 800;

const LAST_RING_INDEX = RINGS.length - 1;
const MAX_RING_RADIUS = RINGS[LAST_RING_INDEX].radius;

const FOOTER_OFFSET =
  { x: -675, y: MAX_RING_RADIUS - 10 };

const LEGEND_OFFSET_Y = 20;
const LEGEND_OFFSET_X = 20;
const LEGEND_WIDTH = 260;
const LEGEND_OFFSET = [
  {
    x: MAX_RING_RADIUS + LEGEND_OFFSET_X,
    y: LEGEND_OFFSET_Y
  },
  {
    x: -MAX_RING_RADIUS - LEGEND_WIDTH - LEGEND_OFFSET_X,
    y: LEGEND_OFFSET_Y
  },
  {
    x: -MAX_RING_RADIUS - LEGEND_WIDTH - LEGEND_OFFSET_X,
    y: -MAX_RING_RADIUS + LEGEND_OFFSET_Y
  },
  {
    x: MAX_RING_RADIUS + LEGEND_OFFSET_X,
    y: -MAX_RING_RADIUS + LEGEND_OFFSET_Y
  }
];

const TRIANGLE_POINTING_UP = 'M -11,5 11,5 0,-13 z';
const TRIANGLE_POINTING_DOWN = 'M -11,-5 11,-5 0,13 z';

// custom random number generator, to make random sequence reproducible
// source: https://stackoverflow.com/questions/521295
const START_SEED = 42;
let seed = START_SEED;
function random() {
  let x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

function random_between(min, max) {
  return min + random() * (max - min);
}

function normal_between(min, max) {
  return min + (random() + random()) * 0.5 * (max - min);
}

function polar(cartesian) {
  let x = cartesian.x;
  let y = cartesian.y;
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
  let low = Math.min(min, max);
  let high = Math.max(min, max);
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
  let polar_min = {
    t: QUADRANTS[quadrantIndex].radial_min * Math.PI,
    r: ringIndex === 0 ? 30 : RINGS[ringIndex - 1].radius
  };
  let polar_max = {
    t: QUADRANTS[quadrantIndex].radial_max * Math.PI,
    r: RINGS[ringIndex].radius
  };
  let cartesian_min = {
    x: 15 * QUADRANTS[quadrantIndex].factor_x,
    y: 15 * QUADRANTS[quadrantIndex].factor_y
  };

  let cartesian_max = {
    x: RINGS[LAST_RING_INDEX].radius * QUADRANTS[quadrantIndex].factor_x,
    y: RINGS[LAST_RING_INDEX].radius * QUADRANTS[quadrantIndex].factor_y
  };
  return {
    clipx: function (d) {
      let c = bounded_box(d, cartesian_min, cartesian_max);
      let p = bounded_ring(polar(c), polar_min.r + 15, polar_max.r - 15);
      d.x = cartesian(p).x; // adjust data too!
      return d.x;
    },
    clipy: function (d) {
      let c = bounded_box(d, cartesian_min, cartesian_max);
      let p = bounded_ring(polar(c), polar_min.r + 15, polar_max.r - 15);
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
  for (let entry of config.entries) {
    entry.segment = segment(entry.quadrant, entry.ring);
    let point = entry.segment.random();
    entry.x = point.x;
    entry.y = point.y;
    entry.color = entry.active ?
      getRingColor(config, entry.ring) : config.colors.inactive;
  }
}

function translate(x, y) {
  return 'translate(' + x + ',' + y + ')';
}

function viewbox(quadrant) {
  let coordinates = [
    Math.max(0, QUADRANTS[quadrant].factor_x * MAX_RING_RADIUS) - (MAX_RING_RADIUS + 20),
    Math.max(0, QUADRANTS[quadrant].factor_y * MAX_RING_RADIUS) - (MAX_RING_RADIUS + 20),
    MAX_RING_RADIUS + 40,
    MAX_RING_RADIUS + 40
  ].join(' ');

  return coordinates;
}

export function radar_visualization(config) {
  function addQuadandLegend(legendContainer, quadrantIndex, caption) {
    legendContainer.append('text')
      .attr('transform', translate(
        MAX_RING_RADIUS * QUADRANTS[quadrantIndex].factor_x,
        (MAX_RING_RADIUS - 18) * QUADRANTS[quadrantIndex].factor_y,
      ))
      .attr('text-anchor', QUADRANTS[quadrantIndex].textAnchor)
      .text(caption)
      .style('font-family', 'Arial, Helvetica')
      .style('font-size', '18');
  }

  function addQuadrantRingLegend(legendContainer, quadrantIndex, ringIndex, caption) {
    legendContainer.append('text')
      .attr('transform', legend_transform(quadrantIndex, ringIndex))
      .text(caption)
      .style('font-family', 'Arial, Helvetica')
      .style('font-size', '12')
      .style('font-weight', 'bold');
  }

  function legend_transform(quadrantIndex, ringIndex, legendIndex = null) {
    let dx = ringIndex < 2 ? 0 : 120;
    let dy = (legendIndex == null ? 0 : 16 + legendIndex * 12);
    if (ringIndex % 2 === 1) {
      dy = dy + 36 + segmentedEntries[quadrantIndex][ringIndex - 1].length * 12;
    }
    return translate(
      LEGEND_OFFSET[quadrantIndex].x + dx,
      LEGEND_OFFSET[quadrantIndex].y + dy
    );
  }

  function partitionEntries() {
    let segmentedEntries = new Array(4);
    for (let quadrantIndex in QUADRANTS) {
      segmentedEntries[quadrantIndex] = new Array(4);
      for (let ringIndex in RINGS) {
        segmentedEntries[quadrantIndex][ringIndex] = [];
      }
    }
    config.entries.sort(function (a, b) { return a.label.localeCompare(b.label); })
    for (let entry of config.entries) {
      segmentedEntries[entry.quadrant][entry.ring].push(entry);
    }

    return segmentedEntries;
  }

  seed = START_SEED;

  // position each entry randomly in its segment
  setEntriesPositions(config);

  // partition entries according to segments
  let segmentedEntries = partitionEntries();

  let svg = d3.select('svg#' + config.svg_id)
    .style('background-color', config.colors.background)
    // .attr("width", config.width)
    // .attr("height", config.height)
    ;

  let radar = svg.append('g');
  if ('zoomed_quadrant' in config) {
    svg.attr('viewBox', viewbox(config.zoomed_quadrant));
  } else {
    radar.attr('transform', translate(ORIGINAL_WIDTH / 2, ORIGINAL_HEIGHT / 2));
  }

  let grid = radar.append('g');

  // draw grid lines
  grid.append('line')
    .attr('x1', 0).attr('y1', -MAX_RING_RADIUS)
    .attr('x2', 0).attr('y2', MAX_RING_RADIUS)
    .style('stroke', config.colors.grid)
    .style('stroke-width', 1);
  grid.append('line')
    .attr('x1', -1000).attr('y1', 0)
    .attr('x2', 1000).attr('y2', 0)
    .style('stroke', config.colors.grid)
    .style('stroke-width', 1);

  // draw rings
  for (let ringIndex = 0; ringIndex < RINGS.length; ringIndex++) {
    grid.append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', RINGS[ringIndex].radius)
      .style('fill', 'none')
      .style('stroke', config.colors.grid)
      .style('stroke-width', 1);
    grid.append('text')
      .text(getRingName(config, ringIndex))
      .attr('y', -RINGS[ringIndex].radius + 62)
      .attr('text-anchor', 'middle')
      .style('fill', '#e5e5e5')
      .style('font-family', 'Arial, Helvetica')
      .style('font-size', 42)
      .style('font-weight', 'bold')
      .style('pointer-events', 'none')
      .style('user-select', 'none');
  }

  // footer
  radar.append('text')
    .attr('transform', translate(FOOTER_OFFSET.x, FOOTER_OFFSET.y))
    .text('▲ moved up     ▼ moved down')
    .attr('xml:space', 'preserve')
    .style('font-family', 'Arial, Helvetica')
    .style('font-size', '10');

  // legend
  let legendContainer = radar.append('g');
  for (let quadrantIndex in QUADRANTS) {
    addQuadandLegend(legendContainer, quadrantIndex, config.quadrants[quadrantIndex].name);
    for (let ringIndex in RINGS) {
      addQuadrantRingLegend(legendContainer, quadrantIndex, ringIndex, getRingName(config, ringIndex));
      legendContainer.selectAll('.legend' + quadrantIndex + ringIndex)
        .data(segmentedEntries[quadrantIndex][ringIndex])
        .enter()
        .append('a')
        .attr('xlink:href', (d) => d.link)
        .attr('target', '_BLANK')
        .append('text')
        .attr('transform', function (d, i) { return legend_transform(quadrantIndex, ringIndex, i); })
        .attr('class', 'legend' + quadrantIndex + ringIndex)
        .attr('id', function (d) { return 'legendItem' + d.id; })
        .text(function (d) { return d.label; })
        .style('font-family', 'Arial, Helvetica')
        .style('font-size', '10')
        .style('fill', (d) => {
          return d.active ? 'black' : 'silver';
        } )
        .on('mouseover', function (d) { showBubble(d); highlightLegendItem(d); })
        .on('mouseout', function (d) { hideBubble(d); unhighlightLegendItem(d); })
        ;
    }
  }

  // layer for entries
  let rink = radar.append('g')
    .attr('id', 'rink');

  // rollover bubble (on top of everything else)
  let bubble = radar.append('g')
    .attr('id', 'bubble')
    .attr('x', 0)
    .attr('y', 0)
    .style('opacity', 0)
    .style('pointer-events', 'none')
    .style('user-select', 'none');
  bubble.append('rect')
    .attr('rx', 4)
    .attr('ry', 4)
    .style('fill', '#333');
  bubble.append('text')
    .style('font-family', 'sans-serif')
    .style('font-size', '10px')
    .style('fill', '#fff');
  bubble.append('path')
    .attr('d', 'M 0,0 10,0 5,8 z')
    .style('fill', '#333');

  function showBubble(entryData) {
    if (entryData.active) {
      let tooltip = d3.select('#bubble text')
        .text(entryData.label);
      let bbox = tooltip.node().getBBox();
      d3.select('#bubble')
        .attr('transform', translate(entryData.x - bbox.width / 2, entryData.y - 16))
        .style('opacity', 0.8);
      d3.select('#bubble rect')
        .attr('x', -5)
        .attr('y', -bbox.height)
        .attr('width', bbox.width + 10)
        .attr('height', bbox.height + 4);
      d3.select('#bubble path')
        .attr('transform', translate(bbox.width / 2 - 5, 3));
    }
  }

  function hideBubble() {
    d3.select('#bubble')
      .attr('transform', translate(0, 0))
      .style('opacity', 0);
  }

  function highlightLegendItem(d) {
    let legendItem = document.getElementById('legendItem' + d.id);
    legendItem.setAttribute('fill', 'blue')
    legendItem.setAttribute('font-weight', 'bold')
  }

  function unhighlightLegendItem(d) {
    let legendItem = document.getElementById('legendItem' + d.id);
    legendItem.setAttribute('fill', 'black')
    legendItem.setAttribute('font-weight', 'normal')
  }

  // draw blips on radar
  let blips = rink.selectAll('.blip')
    .data(config.entries)
    .enter()
    .append('g')
    .attr('class', 'blip')
    .attr('transform', function (d, i) { return legend_transform(d.quadrant, d.ring, i); })
    .on('mouseover', function (d) { showBubble(d); highlightLegendItem(d); })
    .on('mouseout', function (d) { hideBubble(d); unhighlightLegendItem(d); });

  // configure each blip
  blips.each(function (entryData) {
    let blip = d3.select(this);

    // blip link
    if (entryData.active && entryData.link) {
      blip = blip.append('a')
        .attr('xlink:href', entryData.link)
        .attr('target', '_BLANK');
    }

    // blip shape
    if (entryData.moved > 0) {
      blip.append('path')
        .attr('d', TRIANGLE_POINTING_UP) // triangle pointing up
        .style('fill', entryData.color);
    } else if (entryData.moved < 0) {
      blip.append('path')
        .attr('d', TRIANGLE_POINTING_DOWN) // triangle pointing down
        .style('fill', entryData.color);
    } else {
      blip.append('circle')
        .attr('r', 9)
        .attr('fill', entryData.color);
    }

    // blip text
    if (entryData.active) {
      let blip_text = entryData.label.match(/[a-z]/i);
      blip.append('text')
        .text(blip_text)
        .attr('y', 3)
        .attr('text-anchor', 'middle')
        .style('fill', '#fff')
        .style('font-family', 'Arial, Helvetica')
        .style('font-size', function () { return blip_text.length > 2 ? '8' : '9'; })
        .style('pointer-events', 'none')
        .style('user-select', 'none');
    }
  });

  // make sure that blips stay inside their segment
  function ticked() {
    blips.attr('transform', function (d) {
      return translate(d.segment.clipx(d), d.segment.clipy(d));
    })
  }

  // distribute blips, while avoiding collisions
  d3.forceSimulation()
    .nodes(config.entries)
    .velocityDecay(0.19) // magic number (found by experimentation)
    .force('collision', d3.forceCollide().radius(12).strength(0.85))
    .on('tick', ticked);
}
