import React from "react";

const Tag = ({ tag, onClick, isSelected }) => (
  <>
    <button onClick={onClick} className={isSelected?'entry-tag-selected':'entry-tag'}>
      {tag}
    </button>
  </>
);

export default Tag;
