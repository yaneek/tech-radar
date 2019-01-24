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
        'I know it quite well': ['ADOPT', 'TRIAL', 'HOLD'],
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
    setTimeout(() => {
      redrawRadar(selectedTags, this.state.selectedRingsValues);
    }, 0);
  }


  selectRings(selectedRings) {
    const selectedRingsValues = this.state.rings[selectedRings[0]] || [];

    this.setState({
      selectedRings,
      selectedRingsValues,
    });

    setTimeout(() => {
      redrawRadar(this.state.selectedTags, selectedRingsValues);
    }, 0);
  }

  render() {
    return (
      <>
        <Typography variant="h4">
          Technology radar - Grzegorz Marchwiński
        </Typography>
        <Typography variant="subtitle1">
          <a className="social-icon" title="Fork me at github" href="https://github.com/yaneek/tech-radar" target="_BLANK" rel="noopener noreferrer"><img alt="github" src="./img/GitHub-Mark-32px.png"></img></a>
          <a className="social-icon" title="Linkedin" href="https://www.linkedin.com/in/grzegorz-marchwinski/" target="_BLANK" rel="noopener noreferrer" ><img alt="github" src="./img/In-Black-34px-R.png"></img></a>
        </Typography>
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
