import React from 'react';
import { Chip } from '@material-ui/core';

interface ITagProps {
  tag: string;
  onClick: () => void;
  isSelected: boolean;
}
const Tag = ({ tag, onClick, isSelected }: ITagProps) => {
  const color = isSelected ? 'primary' : 'default';
  return <Chip label={tag} onClick={onClick} color={color} />
};

export default Tag;
