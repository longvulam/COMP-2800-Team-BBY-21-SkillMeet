import React, { Component } from 'react';

import Autocomplete from '@material-ui/lab/Autocomplete';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { green } from '@material-ui/core/colors';
import { Button } from '@material-ui/core';

const useStyles = ((theme) => ({
    bar: {
      width: '98vw',
      '& > * + *': {
        marginTop: theme.spacing(3),
      },
      marginLeft: '1vw',
      marginBottom: '3rem',
    },
    textField: {
        border: '1px solid blue',
    },
    input: {

    },
  }));
  
  class Searchbar extends Component {
    state = {  }
    render() { 
    const {classes} = this.props;
  
    return (
      <div className={classes.bar}>
          <br />
        <Autocomplete
          multiple
          id="tags-standard"
          options={skillsList}
          getOptionLabel={(option) => option.title}
          renderInput={(params) => (
            <TextField
              {...params}
              id="autocomplete-text-field"
              variant="standard"
              label="&#8981;
              Enter Skills to Search For Here:"
              className={classes.textField}
              placeholder=""
            //    InputProps={{ ...params.InputProps,
            //      startAdornment: (
            //        <InputAdornment position="start">
            //          <SearchIcon />
            //        </InputAdornment>
            //      ),
            //    }}
            />
          )}
        />
        <div>
          <Button color='primary' variant='outlined' style={{marginLeft: '48%'} } onClick={this.changeState}> Search </Button>
        </div>
    </div>
  );
  }
}
 
export default withStyles(useStyles)(Searchbar);


const skillsList = [
    { title: 'Bowling' },
    { title: 'Dancing' },
    { title: 'Long Distance Running' },
    { title: 'Hurdling' },
    { title: 'Beekeeping' },
    { title: 'Taxidermy' },
    { title: 'Parkour' },
    { title: 'Baking' },
    { title: 'Cooking' },
    { title: 'Sailing' },
    { title: 'Photography' },
    { title: 'Painting' },
    { title: 'Dog Training' },
    { title: 'Horse Breeding' },
    { title: 'Python' },
    { title: 'C#' },
    { title: 'Fundamental Analysis' },
    { title: 'Public Speaking' },
    { title: 'Technical Analysis' },
    { title: 'Rock Climbing' },
    { title: 'Java' },
    { title: 'Kite Boarding' },
    { title: 'Juggling' },
    { title: 'Scrapbooking' },
    { title: 'Astrology' },
    { title: 'Berry Gathering' },
    { title: 'Snowshoeing' },
    { title: 'Flute' },
    { title: 'Battling Robots' },
    { title: 'Wine Making' },
    { title: 'Poker' },
  ];
