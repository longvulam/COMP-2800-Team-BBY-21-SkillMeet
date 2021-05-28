import React from 'react';
import { Grid } from '@material-ui/core';
import SkillAccordion from './SkillAccordion';

/**
 * functional component that displays skills with their name, 
 * level and description in a SkillAccordian.
 * @param props 
 * @returns 
 */
export function SkillsList(props) {
    const { userSkills } = props;
    return userSkills.map((accordion, index) => {
        const { skillName, skillLevel, skillDescription } = accordion;
        return (
            <Grid key={skillName} item xs={12}
                style={{
                    width: '100%',
                    margin: 'auto'
                }}>
                <SkillAccordion
                    index={index}
                    skillName={skillName}
                    skillLevel={skillLevel}
                    skillDescription={skillDescription} />
            </Grid>
        );
    });
}
