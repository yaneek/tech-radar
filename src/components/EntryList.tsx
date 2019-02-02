import React from 'react';

import { IRadarEntry } from '../types/IRadarEntry';
import { Entry } from './Entry';

// type EntryListProps = { entries: IRadarEntry[] };

export const EntryList = ({ entries }: any) => {
  return entries.map((entry: any) => {
    return <Entry entry={entry} key={entry.id} />
  })
};
