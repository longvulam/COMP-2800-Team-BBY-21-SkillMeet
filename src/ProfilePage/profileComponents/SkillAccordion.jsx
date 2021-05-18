
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
    const editable = props.editable;
    
    function expandSkills() {
        setExpanded(!expanded);
    }
    
    return (
      <Accordion
        expanded={expanded}
        onChange={expandSkills}
        style={{
          width: '100%',
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          key={skillName}
        >
          <div
           style={{
            display:'flex',
            justifyContent:'center',
            width:'100%',
          }}>
            <InputBase
              readOnly={true}
              defaultValue={skillName}
              inputProps={{
                'aria-label': 'naked',
                style: {
                  textAlign: 'center',
                  border: 'none',
                }
              }}
            />
            <InputBase
              readOnly={true}
              defaultValue={skillLevel}
              inputProps={{
                'aria-label': 'naked',
                style: {
                  textAlign: 'center',
                  border: 'none',
                }
              }}
            />
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{
            display:'flex',
            justifyContent:'center',
            width:'100%',
          }}>
             <InputBase
            defaultValue={skillDescription}
            readOnly={true}
            multiline
            style={{
              textAlign:'center'
            }}
            >
            </InputBase>
          </div>
        </AccordionDetails>
      </Accordion>
    );
  }