import React, { Component } from 'react';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

/** 
 * The code displayed is a modified version of the code examples displayed on the page linked.
 * 
 * @author saurabhnemade
 * @see https://www.npmjs.com/package/react-twitter-embed
 */
export default class Twitter extends Component {
    render() {
        return (
            <div id="tweet-content">
                <TwitterTimelineEmbed
                    sourceType="profile"
                    screenName="bcit"
                    options={{ marginTop: '5vh', height: '80vh', width: "90%" }}
                />
            </div>

        );
    }
}
