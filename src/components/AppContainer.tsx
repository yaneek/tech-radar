import React from 'react';
import { Typography } from '@material-ui/core';

import { getAllTags, getRingFilters, getQuadrants, getQuadrantEntriesGroupedByTags } from '../lib/EntriesRepository';
import FilterContainer from './FilterContainer.jsx';
import '../styles/radar.css';
import { redrawRadar } from './tech-radar/radar-actions';
import { IQuadrant } from '../data/IQuadrant';

interface IAppProps {
  radarId: string;
}

interface IAppState {
  // @TODO add type
  tags: any[],
  selectedTags: string[],
  // @TODO add type
  rings: any,
  selectedRings: string[],
  quadrants: IQuadrant[],
  // @TODO add type
  entries: any,
};

export class AppContainer extends React.Component<IAppProps, IAppState>{
  constructor(props: IAppProps) {
    super(props);
    const quadrants = getQuadrants();

    this.state = {
      tags: getAllTags(),
      selectedTags: [],
      rings: getRingFilters(),
      selectedRings: [],
      quadrants,
      entries: getQuadrantEntriesGroupedByTags(quadrants, [], []),
    };
  }

  selectTags = (selectedTags: string[]) => {
    this.setState({selectedTags}, this.renderExternalRadar );
  }

  selectRings = (selectedRings: string[]) => {
    this.setState({ selectedRings}, this.renderExternalRadar );
  }

  componentDidMount() {
    this.renderExternalRadar();
  }

  renderExternalRadar = () => {
    setTimeout(() => {
      const selectedRingsValues = this.state.rings[this.state.selectedRings[0]] || [];
      const entries =  getQuadrantEntriesGroupedByTags(this.state.quadrants, this.state.selectedTags, selectedRingsValues);
      redrawRadar( {
        radarId: this.props.radarId,
        quadrants: this.state.quadrants,
        entries,
      });
    }, 0);
  }

  render = () => (
    <>
      <Typography variant="h4">
        Technology radar - Grzegorz Marchwiński
      </Typography>
      <Typography variant="subtitle1">
        <a className="social-icon" title="Fork me at github" href="https://github.com/yaneek/tech-radar" target="_BLANK" rel="noopener noreferrer"><img alt="github" src="./img/GitHub-Mark-32px.png"></img></a>
        <a className="social-icon" title="Linkedin" href="https://www.linkedin.com/in/grzegorz-marchwinski/" target="_BLANK" rel="noopener noreferrer" ><img alt="github" src="./img/In-Black-34px-R.png"></img></a>
      </Typography>
      <FilterContainer
        caption="Filter by tag"
        tags={this.state.tags.sort()}
        selectedTags={this.state.selectedTags}
        selectTags={this.selectTags}
      />
      <FilterContainer
        caption="Filter by ring"
        tags={Object.keys(this.state.rings)}
        selectedTags={this.state.selectedRings}
        selectTags={this.selectRings}
      />
    </>
  )
}