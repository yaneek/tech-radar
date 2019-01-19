import React from "react";
import { Chip } from '@material-ui/core';

const Tag = ({ tag, onClick, isSelected }) => (
  <>
    <Chip label={tag} onClick={onClick} color={isSelected?'primary':'default'}/>
  </>
);

export default Tag;
