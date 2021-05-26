import React from 'react';
import { Grid } from '@material-ui/core';
import SkillAccordion from './profileComponents/SkillAccordion';

export function SkillsList(props) {
    const { userSkills } = props;
    return userSkills.map(accordion => {
        const { skillName, skillLevel, skillDescription } = accordion;
        return (
            <Grid key={skillName} item xs={12}
                style={{
                    width: '100%',
                    margin: 'auto'
                }}>
                <SkillAccordion
                    skillName={skillName}
                    skillLevel={skillLevel}
                    skillDescription={skillDescription} />
            </Grid>
        );
    });
}
