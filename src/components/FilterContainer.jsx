import React from 'react';

import Tag from './Tag.jsx';
import { Typography } from '@material-ui/core';

const FilterContainer = ({tags, selectedTags, selectTags}) => {
  const tagsComponents = tags.sort().map((tag) => {
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
      <Typography variant="h6">Filter by tag:</Typography>

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
