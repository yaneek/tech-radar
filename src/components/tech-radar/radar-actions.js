import * as d3 from 'd3';

import {radar_visualization} from './radar';

function _deleteRadar(radarId) {
  var svg = d3.select('svg#' + radarId);
  svg.selectAll('*').remove();
}

function _showRadar(options) {
  radar_visualization({
    svg_id: options.radarId,
    colors: {
      background: '#fff',
      grid: '#bbb',
      inactive: '#eee'
    },
    quadrants: options.quadrants,
    entries: options.entries,
  });
}

export function redrawRadar(options) {
  _deleteRadar(options.radarId);
  _showRadar(options);
}
