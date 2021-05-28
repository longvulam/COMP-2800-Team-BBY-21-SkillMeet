import { makeStyles } from "@material-ui/core";


/**
 *  useStyle React hook used to style the elements.
 */
export const searchStyles = makeStyles((theme) => ({
    inputRoot: {
      width:'95%',
      backgroundColor:'white',
      height:'3.5em',
      marginTop:'1em',
      color: theme.palette.primary.dark,
      "&.MuiOutlinedInput-notchedOutline": {
        borderWidth: "0px",
        borderColor: "blue"
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderWidth: "0px",
        borderColor: "blue"
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderWidth: "0px",
        borderColor: "blue"
      }
    },
    searchWrap: {
      width: '100vw',
      display: 'flex', 
      justifyContent:'space-around',
      alignItems:'top',
      margin:'auto', 
      position:'fixed',
      top:'0',
      height:'5.4em',
      backgroundColor: theme.palette.primary.dark,
      zIndex:'1000',
    },
    searchBar: {
      width:'calc(100%)',
      color:'white',
    },
    searchIcon: {
      width:'1.5em', 
      height:'auto',
    },
    userContain: {
      width:'98vw',
      margin:'auto',
      marginTop:'5.5em',
      marginBottom:'4.5em',
      overflowY:'scroll',
    },
    cardContain: {
      width:'100%',
    }
  }));