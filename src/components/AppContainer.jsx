import React, { Component } from 'react';
import { Typography } from '@material-ui/core';

import { getAllTags } from '../lib/EntriesRepository';
import FilterContainer from './FilterContainer.jsx';
import '../styles/radar.css';
import { redrawRadar } from './tech-radar/radar-actions';

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: getAllTags(),
      selectedTags: [],
      rings: {
        'I know it quite well': ['ADOPT', 'TRIAL'],
        'I would like to know it better': ['TRIAL', 'ASSESS'],
        'ADOPT': ['ADOPT'],
        'TRIAL': ['TRIAL'],
        'ASSESS': ['ASSESS'],
        'HOLD': ['HOLD'],
      },
      selectedRings: [],
      selectedRingsValues: [],
    };

    this.selectTags = this.selectTags.bind(this);
    this.selectRings = this.selectRings.bind(this);
  }

  selectTags(selectedTags) {
    this.setState({
      selectedTags
    });
    // im not sure how d3 works so i run update anyc
    new Promise((resolve) => {
      redrawRadar(selectedTags, this.state.selectedRingsValues);
      resolve();
    });
  }


  selectRings(selectedRings) {
    const selectedRingsValues = this.state.rings[selectedRings[0]] || [];

    this.setState({
      selectedRings,
      selectedRingsValues,
    });

    new Promise((resolve) => {
      redrawRadar(this.state.selectedTags, selectedRingsValues);
      resolve();
    });
  }

  render() {
    return (
      <>
        <Typography variant="h1">Technology radar</Typography>
        <Typography variant="h2">Grzegorz Marchwiński</Typography>
        <Typography variant="h6">Filter by tag:</Typography>
        <FilterContainer
          tags={this.state.tags.sort()}
          selectedTags={this.state.selectedTags}
          selectTags={this.selectTags}
        />
        <Typography variant="h6">Filter by ring:</Typography>
        <FilterContainer
          tags={Object.keys(this.state.rings)}
          selectedTags={this.state.selectedRings}
          selectTags={this.selectRings}
        />
      </>
    );
  }
}

export default AppContainer;
