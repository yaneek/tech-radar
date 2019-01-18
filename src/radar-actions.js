import {radar_visualization} from './radar';
import {getQuadrantEntriesGroupedByTags} from './data';

function _deleteRadar() {
  var svg = d3.select("svg#radar");
  svg.selectAll("*").remove();
}

function _showRadar(options) {
  radar_visualization({
    svg_id: "radar",
    width: 1450,
    height: 1000,
    colors: {
      background: "#fff",
      grid: "#bbb",
      inactive: "#ddd"
    },
    title: "Grzegorz Marchwiński - tech radar",
    quadrants: options.quadrants.map((quadrantItem) => {
      return { name: quadrantItem.name };
    }),
    print_layout: true,
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
        tags: ["q0"]
      },
      {
        name: "Infrastructure & utilities",
        tags: ["q1"]
      },
      {
        name: "Frameworks, libraries & development tools",
        tags: ["q2"]
      },
      {
        name: "Data Management",
        tags: ["q3"]
      },
    ]
  });
}
