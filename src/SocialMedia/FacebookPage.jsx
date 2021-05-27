import React, { Component } from 'react';
import { FacebookProvider, Like } from 'react-facebook';
import { Page } from 'react-facebook';
import { Comments } from 'react-facebook';

export default class FacebookPage extends Component {
    render() {
        return (
            <div id="fb-content">
                <FacebookProvider appId="5637173396354300">
                    
                    <Page href="https://www.facebook.com/bcit.ca" tabs="timeline" />
                    <br/>
                    <br/>
                    <Like href="http://www.facebook.com/bcit.ca" colorScheme="dark" showFaces share />
                    <br/>

                    <Comments href="http://www.facebook.com/bcit.ca" />
                </FacebookProvider>
            </div>

        );
    }
}
