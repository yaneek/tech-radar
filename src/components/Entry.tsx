import React from 'react';

import { IRadarEntry } from '../types/IRadarEntry';

interface IEntryProps {
  entry: IRadarEntry;
}

export const Entry = ({ entry }: IEntryProps) => (
  <div className="entry">
    <a href={entry.link}>{entry.label}</a>{entry.active ? '+' : '-'}
  </div>
);
