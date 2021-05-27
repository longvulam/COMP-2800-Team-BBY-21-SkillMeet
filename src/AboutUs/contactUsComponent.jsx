import React, { Component } from 'react';
import Container from '@material-ui/core/Container';


class ContactUs extends Component {
    render() { 
        return <div style={{ border:'2px solid black', backgroundColor: 'black', width: '100%'}}>
        <h1 style={{ textAlign: 'center', color: 'lightblue', marginTop: '1.5rem' }}>Contact Us</h1>
        <p style={{ color: 'white', lineHeight: '0rem' }}><i>Email Address:</i></p>
        <p style={{ color: 'grey' }}>customerservice@SkillMeet.ca</p>
        <p style={{ color: 'white', lineHeight: '0rem' }}><i>Telephone Number:</i></p>
        <p style={{ color: 'grey' }}>1-800-292-2992</p>
        <p style={{ color: 'white', lineHeight: '0rem' }}><i>Fax Number:</i></p>
        <p style={{ color: 'grey' }}>1-800-292-2992</p>
        <p style={{ color: 'white', lineHeight: '0rem' }}><i>Mailing Address:</i></p>
        <p style={{ color: 'grey' }}>#363 - 4885 Lam Street, Budapest, Hungary</p>
        </div>
        ;
    }
}
 
export default ContactUs;