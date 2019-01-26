import * as d3 from 'd3';

import {radar_visualization} from './radar';
import {getQuadrantEntriesGroupedByTags, getQuadrants} from '../../lib/EntriesRepository';

function _deleteRadar(radarID) {
  var svg = d3.select('svg#' + radarID);
  svg.selectAll('*').remove();
}

function _showRadar(options) {
  radar_visualization({
    svg_id: options.radarID,
    colors: {
      background: '#fff',
      grid: '#bbb',
      inactive: '#eee'
    },
    quadrants: options.quadrants,
    entries: getQuadrantEntriesGroupedByTags(
      options.quadrants,
      options.includeTags,
      options.includeRings,
    )
  });
}

export function redrawRadar(radarID, includeTags, includeRings) {
  _deleteRadar(radarID);
  _showRadar({
    radarID,
    includeTags: includeTags || [],
    includeRings: includeRings || [],
    quadrants: getQuadrants(),
  });
}
