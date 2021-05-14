import React, { Component } from 'react';
import Background from '../aboutUsSplash.jpg';

class HeroImage extends Component {

    render() { 
        return <header style={{ backgroundImage: "url(" + Background + ")",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '68vh'
        }}><h1 style={{ textAlign: 'center', transform: 'translate(0%, 170%)', fontSize: '48pt'}}>About Us</h1></header>;
    }
}
 
export default HeroImage;