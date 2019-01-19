import { ALL_ENTRIES, RING_NAME_TO_RING_INDEX } from '../data/entries';

function normalizeEntry(entry, quadrantIndex) {
  return {
    ring: RING_NAME_TO_RING_INDEX.indexOf(entry.ring),
    label: entry.label,
    link: entry.link,
    moved: (typeof(entry.moved) === 'undefined') ? 0 : entry.moved,
    active: (typeof(entry.active) === 'undefined') ? 0 : entry.active,
    quadrant: quadrantIndex,
  }
}

function filterEntries(entries, includeTags) {
  // when includeTags is not provided just return all entries
  if (!(includeTags && includeTags.length) ) {
    return entries;
  }
  return entries.filter((entry) => {
    for( let includeTag of includeTags) {
      if (entry.tags.indexOf(includeTag) >= 0) {
        return true;
      }
    }
    return false;
  });
}

export function getQuadrantEntriesGroupedByTags(quadrantsList, excludeTags, includeTags) {
  let filteredEntries = [];
  let entries = filterEntries(ALL_ENTRIES, excludeTags, includeTags);
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
