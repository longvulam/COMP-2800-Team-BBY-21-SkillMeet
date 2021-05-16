import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Jumbotron, Button, Card, Row, Col } from 'react-bootstrap';


class ContactUs extends Component {
    render() { 
        return <Container style={{ border:'1px solid black', backgroundColor: 'black' }}>
        <h1 style={{ textAlign: 'center', color: 'goldenrod', marginTop: '1.5rem' }}>Contact Us</h1>
        <p style={{ color: 'white' }}><i>Email Address:</i>       customerservice@SkillMeet.ca</p>
        <p style={{ color: 'white' }}><i>Telephone Number:</i>    1-800-292-2992</p>
        <p style={{ color: 'white' }}><i>Fax Number:</i>          1-800-292-2992</p>
        <p style={{ color: 'white' }}><i>Mailing Address:</i>     #363 - 4885 Lam Street, Budapest, Hungary</p>
        </Container>
        ;
    }
}
 
export default ContactUs;