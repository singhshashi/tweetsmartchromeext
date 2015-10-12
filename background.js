 var oauth = ChromeExOAuth.initBackgroundPage({
              'request_url': 'https://api.twitter.com/oauth/request_token',
              'authorize_url': 'https://api.twitter.com/oauth/authenticate',
              'access_url': 'https://api.twitter.com/oauth/access_token',
              'consumer_key': '4KivKOww0BUnsSnrz29Fysq8i',
              'consumer_secret': 'VprxAb1SAEzewUscPlhQF2iH2wtEC7yPj0ryhTI0piY9JXlFwJ',
//              'scope': 'https://docs.google.com/feeds/',
              'app_name': 'Tweet Smart Extension'
            });





chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    console.log("background.js: " + JSON.stringify(request));

    var type = request.type;


    if (type == "background.twitterRequestToken")
    {
        oauth.authorize(function(token,secret,userId,screenname){
            sendResponse({success:true,userId:userId,screenName:screenname});
        });
        return true;
    }

    if (type == "background.twitterSignOut")
    {
        oauth.clearTokens();
        sendResponse({success:true});
    }

});



