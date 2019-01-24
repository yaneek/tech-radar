import * as d3 from 'd3';

import {radar_visualization} from './radar';
import {getQuadrantEntriesGroupedByTags} from '../../lib/EntriesRepository';

function _deleteRadar() {
  var svg = d3.select('svg#radar');
  svg.selectAll('*').remove();
}

function _showRadar(options) {
  radar_visualization({
    svg_id: 'radar',
    colors: {
      background: '#fff',
      grid: '#bbb',
      inactive: '#eee'
    },
    quadrants: options.quadrants.map((quadrantItem) => {
      return { name: quadrantItem.name };
    }),
    // zoomed_quadrant: 0,
    //ENTRIES
    entries: getQuadrantEntriesGroupedByTags(
      options.quadrants,
      options.includeTags,
      options.includeRings,
    )
  });
}

export function redrawRadar(includeTags, includeRings) {
  // console.log('tags', JSON.stringify(includeTags));
  // console.log('rings', JSON.stringify(includeRings));
  _deleteRadar();
  _showRadar({
    includeTags: includeTags || [],
    includeRings: includeRings || [],
    quadrants: [
      {
        name: 'Languages & methodologies',
        tags: ['q0-languages'],
      },
      {
        name: 'Infrastructure & utilities',
        tags: ['q1-infrastructure'],
      },
      {
        name: 'Development tools',
        tags: ['q2-frameworks'],
      },
      {
        name: 'Data Management',
        tags: ['q3-data-management']
      },
    ]
  });
}
