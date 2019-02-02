import React from 'react';

import { IRadarEntry } from '../types/IRadarEntry';
import { Entry } from './Entry';

type EntryListProps = { entries: IRadarEntry[] };

export class EntryList extends React.Component<EntryListProps> {
  render() {
    const entryList = this.props.entries.map((entry: any) => {
      return <Entry entry={entry} key={entry.id} />
    })

    return (
      <div className="entry-list">{entryList}</div>
    )
  }
}
