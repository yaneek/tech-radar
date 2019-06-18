import intersection from 'lodash.intersection';

import { ALL_ENTRIES } from '../data/entries';
import { QUADRANTS } from '../data/quadrants';
import { RINGS } from '../data/rings';

import { IEntry } from '../types/IEntry';
import { IRadarEntry } from '../types/IRadarEntry';
import { IQuadrant } from '../types/IQuadrant';
import { IRing } from '../types/IRing';
import { RingFilter } from '../types/RingFilter';

let id = 1;
function normalizeEntry(entry: IEntry, quadrantIndex: number, availableRingNames: string[]): IRadarEntry | null {
  let ringIndex = availableRingNames.indexOf(entry.ring);
  if ( ringIndex < 0) {
    return null;
  }
  return {
    ring: ringIndex,
    label: entry.label,
    link: entry.link,
    moved: (typeof(entry.moved) === 'undefined') ? 0 : entry.moved,
    active: (typeof(entry.active) === 'undefined') ? true : entry.active,
    quadrant: quadrantIndex,
    id: id++,
  }
}

function filterByTags(entries: IEntry[], includeTags: string[]): IEntry[] {
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

function filterByRings(entries: IEntry[], availableRingsNames: string[], includeRings: string[]): IEntry[] {
  if (!(includeRings && includeRings.length) ) {
    includeRings = availableRingsNames;
  }

  let intersectionRings = intersection(availableRingsNames, includeRings);
  return entries.map((entry) => {
    if (intersectionRings.indexOf(entry.ring) >= 0) {
      return entry;
    }

    return {
      ...entry,
      active: false,
    };
  });
}

export function getQuadrantEntriesGroupedByTags(
  quadrantsList: IQuadrant[], availableRings: IRing[], includeTags: string[], includeRings: string[]
) {
  id = 1;
  let availableRingNames = getRingNames(availableRings);
  let entriesResult: IRadarEntry[] = [];
  let entriesFilteredByTags = filterByTags(getEntries(), includeTags);
  let entriesFilteredByRings = filterByRings( entriesFilteredByTags, availableRingNames, includeRings );
  for (let entry of entriesFilteredByRings) {
    for (let quadrantIndex = 0; quadrantIndex <  quadrantsList.length; quadrantIndex++ ) {
      let quadrantTags = quadrantsList[quadrantIndex].tags;
      for (let quadrantTag of quadrantTags) {
        if (entry.tags.indexOf(quadrantTag) >= 0) {
          let normalizedEntry = normalizeEntry(entry, quadrantIndex, availableRingNames);
          if (normalizedEntry) {
            entriesResult.push(normalizedEntry)
          }
        }
      }
    }
  }

  return entriesResult;
}

export function getAllTags(): string[] {
  let tagKeys: Record<string, boolean> = {};
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

export function getRingNames(rings: IRing[]) {
  return rings.map( (ring) => {
    return ring.name;
  } );
}

export function getRings(): IRing[] {
  return RINGS;
}

export function getQuadrants(): IQuadrant[] {
  return QUADRANTS;
}

export function getEntries(): IEntry[] {
  return ALL_ENTRIES;
}

export function getRingFilters(rings: IRing[]): RingFilter {
  const singleRingFilters: RingFilter = {};
  getRingNames(rings).forEach( (ringName) => {
    singleRingFilters[ringName] = [ringName];
  });

  return {
    ...singleRingFilters,
  }
}
