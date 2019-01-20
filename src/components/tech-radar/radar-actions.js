import {radar_visualization} from './radar';
import {getQuadrantEntriesGroupedByTags} from '../../lib/EntriesRepository';

function _deleteRadar() {
  var svg = d3.select("svg#radar");
  svg.selectAll("*").remove();
}

function _showRadar(options) {
  radar_visualization({
    svg_id: "radar",
    width: 1450,
    height: 800,
    colors: {
      background: "#fff",
      grid: "#bbb",
      inactive: "#eee"
    },
    quadrants: options.quadrants.map((quadrantItem) => {
      return { name: quadrantItem.name };
    }),
    // zoomed_quadrant: 0,
    //ENTRIES
    entries: getQuadrantEntriesGroupedByTags(
      options.quadrants,
      options.includeTags
    )
  });
}

export function redrawRadar(currentTagFilter) {
  _deleteRadar();
  _showRadar({
    includeTags: currentTagFilter || [],
    quadrants: [
      {
        name: "Languages",
        tags: ["q0-languages"]
      },
      {
        name: "Infrastructure & utilities",
        tags: ["q1-infrastructure"]
      },
      {
        name: "Development tools",
        tags: ["q2-frameworks"]
      },
      {
        name: "Data Management",
        tags: ["q3-data-management"]
      },
    ]
  });
}
