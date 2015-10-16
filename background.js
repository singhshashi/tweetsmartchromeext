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
        oauth.authorize().then(function(response){
            sendResponse({success:true,userId:response.userId,screenName:response.screenName});
        });
        return true;
    }

    if (type == "background.twitterSignOut")
    {
        oauth.clearTokens();
        sendResponse({success:true});
    }

    if (type == "background.tweet")
    {
        var url = "https://api.twitter.com/1.1/statuses/update.json";
        var payload = {}
        if (request.in_reply_to == -1)
        {
            payload ={
                'method':'POST',
                'parameters':{
                    'status':request.tweet.text
                }
            }
        }
        else{
            payload ={
                'method':'POST',
                'parameters':{
                    'status':request.tweet.text,
                    'in_reply_to_status_id':request.in_reply_to
                }
            }
        }


        oauth.sendSignedRequest(url,payload).then(onSuccessfulResponse,onErrorResponse).then(function(response){
            console.log("Before sendResponse:");
            console.log(response);
           sendResponse({success:response.success,tweetId:response.statusId,message:response.message});
        });

        return true;
    }

});

 function onSuccessfulResponse(response){
    return new Promise(function(fulfill,reject){
        console.log("OnSuccessfulResponse");
        var parsedResponse = JSON.parse(response.xhr.response);
        console.log(parsedResponse);
        var data = {success:true,statusId:parsedResponse.id_str, message:response.responseText}
        fulfill(data);
    });
 }

 function onErrorResponse(response){
     return new Promise(function (fulfill, reject) {
         console.log("OnErrorResponse");
         console.log(response);
         var data = {success:false,statusId:-1,message:response.responseText};
         fulfill(data);
     });
 }


