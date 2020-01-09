import React from 'react';

import { getAllTags, getRingFilters, getQuadrants, getQuadrantEntriesGroupedByTags, getRings } from '../lib/EntriesRepository';
import FilterContainer from './FilterContainer.jsx';
import '../styles/radar.css';
import { redrawRadar } from './tech-radar/radar';
import { IQuadrant } from '../types/IQuadrant';
import { Header } from './Header';
import { IRadarEntry } from '../types/IRadarEntry';
import { RingFilter } from '../types/RingFilter';
import { RingType } from '../types/RingType';
import { IRing } from '../types/IRing';

interface IAppProps {
  radarId: string;
}

interface IAppState {
  availableTags: string[],
  selectedTags: string[],
  availableRingFilters: RingFilter,
  selectedRingFilters: string[],
  quadrants: IQuadrant[],
  entries: IRadarEntry[],
  rings: IRing[],
};

export class AppContainer extends React.Component<IAppProps, IAppState>{
  constructor(props: IAppProps) {
    super(props);
    const quadrants = getQuadrants();
    const rings: IRing[] = getRings();

    this.state = {
      availableTags: getAllTags(),
      selectedTags: [],
      availableRingFilters: getRingFilters(rings),
      selectedRingFilters: [],
      quadrants,
      rings,
      entries: [],
    };
  }

  selectTags = (selectedTags: string[]) => {
    this.setState({ selectedTags }, this.fetchEntries);
  }

  selectRings = (selectedRings: RingType[]) => {
    this.setState({ selectedRingFilters: selectedRings }, this.fetchEntries);
  }

  componentDidMount() {
    this.fetchEntries();
  }

  fetchEntries = () => {
    const selectedRingsValues = this.state.availableRingFilters[this.state.selectedRingFilters[0]] || [];
    const entries = getQuadrantEntriesGroupedByTags(
      this.state.quadrants, this.state.rings, this.state.selectedTags, selectedRingsValues);
    this.setState({ entries }, this.renderExternalRadar);
  }

  renderExternalRadar = () => {
    setTimeout(() => {
      redrawRadar({
        radarId: this.props.radarId,
        quadrants: this.state.quadrants,
        entries: this.state.entries,
        colors: {
          background: '#fff',
          grid: '#bbb',
          inactive: '#eee'
        },
        rings: this.state.rings,
      });
    }, 0);
  }

  render = () => (
    <>
      <Header>
        <FilterContainer
          caption="Filter by tag"
          tags={this.state.availableTags.sort()}
          selectedTags={this.state.selectedTags}
          selectTags={this.selectTags}
        />
        <FilterContainer
          caption="Filter by ring"
          tags={Object.keys(this.state.availableRingFilters)}
          selectedTags={this.state.selectedRingFilters}
          selectTags={this.selectRings}
        />
      </Header>
      {/* <EntryList entries={this.state.entries} /> */}
    </>
  )
}
