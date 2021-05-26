const twitterFeed = () => {
    return(
        <div id="socialMediaContent">
            <a href="https://twitter.com/intent/tweet?button_hashtag=education&ref_src=twsrc%5Etfw" 
            class="twitter-hashtag-button" 
            data-show-count="false">Tweet #education</a>
            
            <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
        </div>
    );
}

export default twitterFeed;