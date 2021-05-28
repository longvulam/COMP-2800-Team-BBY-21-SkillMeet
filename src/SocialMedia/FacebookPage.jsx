import React, { Component } from 'react';
import { FacebookProvider, Like } from 'react-facebook';
import { Page } from 'react-facebook';
import { Comments } from 'react-facebook';

/**
 * The code displayed is a modified version of the code examples displayed on the page linked.
 * 
 * @author zlatkofedor
 * @see https://www.npmjs.com/package/react-facebook
 */
export default class FacebookPage extends Component {
    render() {
        return (
            <div id="fb-content">
                <FacebookProvider appId="5637173396354300">
                    
                    <Page href="https://www.facebook.com/SkillMeet-104493365179779" tabs="timeline" />
                    <br/>
                    <br/>
                    <Like href="https://www.facebook.com/SkillMeet-104493365179779" colorScheme="dark" showFaces share />
                    <br/>

                    <Comments href="https://www.facebook.com/SkillMeet-104493365179779" />
                </FacebookProvider>
            </div>

        );
    }
}
