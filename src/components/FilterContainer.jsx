import React from 'react';
import { Typography } from '@material-ui/core';

import Tag from './Tag.jsx';

const FilterContainer = ({caption, tags, selectedTags, selectTags}) => {
  const tagsComponents = tags.map((tag) => {
    return <Tag
      tag={tag}
      key={tag}
      isSelected={selectedTags.indexOf(tag) >= 0}
      onClick={() => {
        selectTags([tag]);
      }}
    />
  })
  return (
    <>
      <Typography variant="h6">{caption}:</Typography>
      <Tag
        tag='all'
        onClick={() => {
          selectTags([]);
        }}
        isSelected={selectedTags.length === 0}
      />
      {tagsComponents}
    </>
  );
}

export default FilterContainer;
