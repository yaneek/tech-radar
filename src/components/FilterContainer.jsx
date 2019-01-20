import React from 'react';

import Tag from './Tag.jsx';

const FilterContainer = ({tags, selectedTags, selectTags}) => {
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
