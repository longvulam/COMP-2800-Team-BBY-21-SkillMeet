
import React, { useState } from 'react';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InputBase from '@material-ui/core/InputBase';

export default function SkillAccordion(props) {
    const { skillName, skillLevel, skillDescription }= props;
    
    const [expanded, setExpanded] = useState(false);
    
    function expandSkills() {
      setExpanded(!expanded);
    }
    
    return (
      <Accordion
        expanded={expanded}
        onChange={expandSkills}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          key={skillName}
        >
          <InputBase
            defaultValue={skillName}
            inputProps={{
              'aria-label': 'naked',
              style: {
                textAlign: 'center',
              }
            }}
          />
          <InputBase
            defaultValue={skillLevel}
            inputProps={{
              'aria-label': 'naked',
              style: {
                textAlign: 'center',
              }
            }}
          />
          
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {skillDescription}
          </Typography>
        </AccordionDetails>
      </Accordion>
    );
  }