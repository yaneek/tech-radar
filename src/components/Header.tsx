import React from 'react';
import { Typography } from '@material-ui/core';

export class Header extends React.Component {
  render = () => (
    <>
      <Typography variant="h4">
        Technology Radar
      </Typography>
      {this.props.children}
    </>
  );
}

