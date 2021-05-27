import React, { Component } from 'react';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

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
