
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  buttonsWrap: {
      width: '100vw',
      display: 'flex',
      justifyContent: 'flex-end',
  },
  avatarWrap: {
      width: '100vw',
      height: '5em',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
  },
  avatar: {
      height: '4.5em',
      width: '4.5em',
  },
  skillsAndLevels: {
    // "& .Mui-focused" : {
    //   backgroundColor: theme.palette.secondary.main,
    // }
  },
  skillAcordionSummary: {
    backgroundColor: theme.palette.secondary.main,
  }
}));

const AccordionSummary = withStyles((theme) => ({
  root: {
    "&.Mui-focused": {
      backgroundColor: theme.palette.secondary.main,
    },
    "&.MuiIconButton-root": {
      color: theme.palette.primary.main,
    }
  }
}))(MuiAccordionSummary);

export default function SkillAccordion(props) {
    const { skillName, skillLevel, skillDescription } = props;
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);

    return (
        <Accordion
            expanded={expanded}
            elevation={2}
            onChange={() => setExpanded(!expanded)}
            style={{
                width: '100%',
            }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                className={classes.skillAcordionSummary}
                key={skillName}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'start',
                        width: '100%',
                        flexDirection:'column'
                    }}>
                    <Typography
                    variant='h6'
                    >
                      {skillName}
                    </Typography>
                    <Typography
                    variant='subtitle1'
                    >
                      {skillLevel}
                    </Typography>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                }}>
                 <Typography
                    variant='body1'
                    >
                      {skillDescription}
                    </Typography>
                </div>
            </AccordionDetails>
        </Accordion>
    );
}
