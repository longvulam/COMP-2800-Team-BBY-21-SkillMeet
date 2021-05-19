import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import { render } from '@testing-library/react';
import { makeStyles } from '@material-ui/core/styles';
import { faAlignJustify } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles((theme) => ({
  paper:{
    width:'100%',
    height:'4em',
  },
  cardContain:{
    width:'95%',
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between',
    height:'4em',
    margin:'auto',
  },
  avatar : {
    height:'3em',
    width:'3em',
  },
  skillContain: {
    display:'flex',
    alignItems:'center',
    justifyContent:'space-around',
    width:'calc(100% - 8em)',
    height: '95%',
  },
  addIcon: {
    width:'1.5em',
    height:'1.5em',
  },
  chips : {
    fontSize:'1em',
  }
}));

export default function UserSearchCard(props) {
  const classes = useStyles();
  const { displayName, city, skillName, skillLevel, id } = props;
  return (
    <>
      <Paper className={classes.paper}elevation={2}>
        <div className={classes.cardContain}>
          <Avatar className={classes.avatar}/>
          <div className={classes.skillContain}>
            <Chip className={classes.chips} label="Java"/>
            <Chip className={classes.chips} label="Expert"/>
          </div>
          <IconButton>
            <PersonAddIcon className={classes.addIcon}/>
          </IconButton>
        </div>
      </Paper>
    </>
  );
}