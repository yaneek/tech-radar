import { ALL_ENTRIES } from '../data/entries';
import { QUADRANTS } from '../data/quadrants';
import { RING_NAMES, RINGS, CUSTOM_RING_FILTERS } from '../data/rings';

let id = 1;
function normalizeEntry(entry, quadrantIndex) {
  return {
    ring: getRingNames().indexOf(entry.ring),
    label: entry.label,
    link: entry.link,
    moved: (typeof(entry.moved) === 'undefined') ? 0 : entry.moved,
    active: (typeof(entry.active) === 'undefined') ? true : entry.active,
    quadrant: quadrantIndex,
    id: id++,
  }
}

function filterByTags(entries, includeTags) {
  // when includeTags is not provided just return all entries
  if (!(includeTags && includeTags.length) ) {
    return entries;
  }
  return entries.map((entry) => {
    for( let includeTag of includeTags) {
      if (entry.tags.indexOf(includeTag) >= 0) {
        return entry;
      }
    }
    return {
      ...entry,
      active: false,
    };
  });
}

function filterByRings(entries, includeRings) {
  if (!(includeRings && includeRings.length) ) {
    return entries;
  }
  return entries.map((entry) => {
    if (includeRings.indexOf(entry.ring) >= 0) {
      return entry;
    }

    return {
      ...entry,
      active: false,
    };
  });
}

export function getQuadrantEntriesGroupedByTags(quadrantsList, includeTags, includeRings) {
  id = 1;
  let filteredEntries = [];
  let entries = filterByRings( filterByTags(getEntries(), includeTags), includeRings );

  for (let entry of entries) {
    for (let quadrantIndex in quadrantsList) {
      let quadrantTags = quadrantsList[quadrantIndex].tags;

      for (let quadrantTag of quadrantTags) {
        if (entry.tags.indexOf(quadrantTag) >= 0) {
          filteredEntries.push(normalizeEntry(entry, quadrantIndex))
        }
      }
    }
  }

  return filteredEntries;
}

export function getAllTags() {
  let tagKeys = {};
  ALL_ENTRIES.forEach( (entry) => {
    entry.tags.forEach(tag => {
      tagKeys[tag] = true;
    })
  });
  return Object.keys(tagKeys).filter(tag => {
    const reQuadrantTag = /q[0-9]-*/;
    // filter out quadrant tags
    return !reQuadrantTag.test(tag);
  });
}

export function getRingNames() {
  return RING_NAMES;
}

export function getRings() {
  return RINGS;
}

export function getQuadrants() {
  return QUADRANTS;
}

export function getEntries() {
  return ALL_ENTRIES;
}

export function getRingFilters() {
  const singleRingFilters = {};
  getRingNames().forEach( (ringName) => {
    singleRingFilters[ringName] = [ringName];
  });

  return {
    ...CUSTOM_RING_FILTERS,
    ...singleRingFilters,
  }
}
