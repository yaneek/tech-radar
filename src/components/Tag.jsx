import React from 'react';
import { Chip } from '@material-ui/core';

const Tag = ({ tag, onClick, isSelected }) => {
  const color = isSelected ? 'primary' : 'default';
  return <Chip label={tag} onClick={onClick} color={color} />
};

export default Tag;
