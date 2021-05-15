import React, { Component } from 'react';

import Autocomplete from '@material-ui/lab/Autocomplete';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { green } from '@material-ui/core/colors';
import { Button } from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

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
          <IconButton color='primary' style={{marginLeft: '48%'} } onClick={this.changeState}> Search </IconButton>
        </div>
    </div>
  );
  }
}
 
export default withStyles(useStyles)(Searchbar);


const skillsList = [
    { title: 'Algorithms' },
    { title: 'Big Data' },
    { title: 'Statistical Analysis' },
    { title: 'Modeling' },
    { title: 'Database Design' },
    { title: 'Compiling Statistics' },
    { title: 'Needs Analysis' },
    { title: 'Doumentation' },
    { title: 'Database Management' },
    { title: 'Data Mining' },
    { title: 'Networking' },
    { title: 'Security' },
    { title: 'Servers' },
    { title: 'Testing' },
    { title: 'Python' },
    { title: 'C#' },
    { title: 'Fundamental Analysis' },
    { title: 'Public Speaking' },
    { title: 'Technical Analysis' },
    { title: 'React' },
    { title: 'Java' },
    { title: 'Vue' },
    { title: 'Svelte' },
    { title: 'Ruby' },
    { title: 'Javascript' },
    { title: 'JQuery' },
    { title: 'Firebase' },
    { title: 'MongoDB' },
    { title: 'MySQL' },
    { title: 'Game Development' },
    { title: 'Quality Assurance' },
  ];
