import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class Mission extends Component {
    render() {
        return <React.Fragment>
        <div style={{ textAlign: 'center', border: '1px solid black', marginTop: '3rem', backgroundColor: 'black', marginBottom: '0rem' }}>
            <h1 style={{ color: 'lightblue', marginTop: '1.5rem' }}>Our Mission..</h1>
            <p style={{ marginBottom:'1.5rem', color: 'white' }}>"At SkillMeet our mission is to enable people to connect and grow by create a space where like-minded individuals gather to inspire one another."</p>
            </div>
            <div style={{ textAlign: 'center',}}>
                <FontAwesomeIcon icon={["fas", "chevron-down"]} color="black" opacity=".4" size="3x" onClick={() => window.scrollBy(0, 690)} />
            </div>
            </React.Fragment>
            ;
    }
}

export default Mission;