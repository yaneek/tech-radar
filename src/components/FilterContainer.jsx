import React, { Component } from "react";

import Tag from "./Tag.jsx";
import '../styles/radar.css';
import { getAllTags } from '../data';
import { redrawRadar } from '../radar-actions';

class FilterContainer extends Component {
  constructor() {
    super();
    this.state = {
      tags: getAllTags(),
      selectedTags: [],
    };
  }

  selectTag(tags) {
    this.setState({
      selectedTags: tags
    });
    // im not sure how d3 works so i run update anyc
    new Promise((resolve) => {
      redrawRadar(tags);
      resolve();
    });
  }

  render() {
    const tags = this.state.tags.sort().map((tag) => {
      return <Tag
        tag={tag}
        key={tag}
        isSelected={this.state.selectedTags.indexOf(tag) >= 0}
        onClick={() => {
          this.selectTag([tag]);
        }}
      />
    })
    return (
      <>
        <div>
          Filter by tag:
          <Tag
            tag="all"
            onClick={() => {
              this.selectTag([]);
            }}
            isSelected={this.state.selectedTags.length === 0}
          />
          {tags}
        </div>
      </>
    );
  }
}
export default FilterContainer;
