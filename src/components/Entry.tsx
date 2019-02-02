import React from 'react';

import { IRadarEntry } from '../types/IRadarEntry';

interface IEntryProps {
  entry: IRadarEntry;
}

export const Entry = ({ entry }: IEntryProps) => (
  <div>
    <a className={entry.active ? 'entry' : 'entry entry-disabled'} href={entry.link}>{entry.label}</a>
  </div>
);
