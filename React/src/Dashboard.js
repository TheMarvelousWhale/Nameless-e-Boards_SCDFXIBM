import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Canvas from './Canvas';
import Board from './Board';

export default class Dashboard extends Component {

  render() {
    return (
      <div>
        <Grid container item spacing={2} alignItems={'flex-start'} direction={'row'}>

          <Grid item xs={6}>
            <Board/>
          </Grid>
          <Grid item xs={6}>
            <Canvas/>
          </Grid>

        </Grid>
      </div>
    )
  }
}
