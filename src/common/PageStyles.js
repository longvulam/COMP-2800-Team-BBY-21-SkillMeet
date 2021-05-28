import { makeStyles } from "@material-ui/core";


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

export const userSearchCardStyles = makeStyles((theme) => ({
    paper: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
    },
    avatar: {
        height: '2.5em',
        width: '2.5em',
        marginRight: '1em',
        marginLeft: '0.5em',
        backgroundColor: theme.palette.primary.main,
    },
    addIcon: {
        width: '0.9em',
        height: '0.9em',
    },
    fab: {
        width: '2.5em',
        height: '2.5em',
        marginRight: '0.5em',
    },
    chips: {
        fontSize: '1em',
    },
    infoGrid: {
        width: '100%%',
        height: '100%',
        alignItems: 'center',
        margin: 'auto',
    },
    firstGridItem: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'top',
    },
    skillGridItem: {
        marginTop: '0.5em',
        width: '100%',
        backgroundColor: theme.palette.primary.light,
    },
    skills: {
        marginLeft: '0.5em',
    },
    skillLevel: {
        marginLeft: '0.5em',
    },
    nameAndLocation: {
        display: 'flex',
        flexDirection: 'column',
    },
    avatarNameLocation: {
        display: 'flex',
        alignItems: 'center',
    }
}));

export const profileFormStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(2),
      }
    },
    inputRoot: {
      width:'95%',
      height:'2.5em',
      marginBottom:'3em',
    },
    button: {
      margin: theme.spacing(2),
    },
    avatarWrap: {
      width: '100%',
      height: '12em',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatar: {
      height: '7.5em',
      width: '7.5em',
    },
    editAvatarbtn: {
      marginLeft: '12em',
      marginTop: '-7em',
    },
    bioInput: {
      backgroundColor: '#e3f6f5',
      borderBottom: '1px solid black',
      width: '85%'
    },
    levelInput:{
      width: '55%',
    },
    skillDescInput:{
      width: '80%',
    }
  }))
