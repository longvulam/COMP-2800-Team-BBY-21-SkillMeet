
import React, { useState } from 'react';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InputBase from '@material-ui/core/InputBase';

export default function SkillAccordion(props) {
    const { skillName, skillLevel, skillDescription } = props;

    const [expanded, setExpanded] = useState(false);

    return (
        <Accordion
            expanded={expanded}
            onChange={() => setExpanded(!expanded)}
            style={{
                width: '90vw',
            }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                key={skillName}
                style={{
                width: '100%',
            }}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'start',
                        width: '100%',
                        flexDirection:'column'
                    }}>
                    <InputBase
                        readOnly={true}
                        defaultValue={skillName}
                        inputProps={{
                            'aria-label': 'naked',
                            style: {
                                textAlign: 'left',
                                border: 'none',
                            }
                        }} />
                    <InputBase
                        readOnly={true}
                        defaultValue={skillLevel}
                        inputProps={{
                            'aria-label': 'naked',
                            style: {
                                textAlign: 'left',
                                border: 'none',
                            }
                        }}
                    />
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                }}>
                    <InputBase
                        defaultValue={skillDescription}
                        readOnly={true}
                        multiline
                        style={{
                            textAlign: 'center',
                            width: '95%',
                        }}
                    >
                    </InputBase>
                </div>
            </AccordionDetails>
        </Accordion>
    );
}
