import React, { Component } from 'react';

import { getAllTags } from '../lib/EntriesRepository';
import FilterContainer from './FilterContainer.jsx';
import '../styles/radar.css';
import { redrawRadar } from './tech-radar/radar-actions';
import { Typography } from '@material-ui/core';

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: getAllTags(),
      selectedTags: [],
      date: new Date(),
    };

    this.selectTags = this.selectTags.bind(this);
    // console.log('constructor');
  }

  componentDidMount() {
    // console.log('componentDidMount');
    this.timerID = setInterval(
      () => this.tick(),
      5000
    );
  }

  componentWillUnmount() {
    // console.log('componentWillUnmount');
    clearInterval(this.timerID);
  }

  tick() {
    // this.setState({
    //   date: new Date()
    // });
  }

  selectTags(selectedTags) {
    this.setState({
      selectedTags
    });
    // im not sure how d3 works so i run update anyc
    new Promise((resolve) => {
      redrawRadar(selectedTags);
      resolve();
    });
  }

  render() {
    // console.log('render');
    return (
      <>
        <Typography variant="h1">Technology radar</Typography>
        <Typography variant="h2">Grzegorz Marchwiński</Typography>
        <FilterContainer tags={this.state.tags} selectedTags={this.state.selectedTags} selectTags={this.selectTags}/>
      </>
    );
  }
}

export default AppContainer;
