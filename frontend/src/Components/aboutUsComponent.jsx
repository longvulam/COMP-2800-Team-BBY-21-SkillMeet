import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeroImage from './heroImageComponent';
import Mission from './missionComponent';
import Team from './ourTeamComponent';
import ContactUs from './contactUsComponent';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

class AboutUs extends Component {
    render() { 
        return <div><HeroImage /><Mission /><Team /><ContactUs /></div>;
    }
}
 
export default AboutUs;