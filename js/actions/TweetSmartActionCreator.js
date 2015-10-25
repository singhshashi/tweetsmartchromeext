var AppDispatcher = require('../dispatcher/AppDispatcher');
var TweetSmartActions = require('../constants/TweetSmartActionTypes');
var TweetSmartConstants = require('../constants/TweetSmartConstants');
var TweetSmartAPIUtils = require('../utils/TweetSmartAPIUtils');
var ChromeUtils = require('../utils/ChromeUtils');

var updateStateOnTweetSuccess = function(data){
    console.log(data);
    AppDispatcher.dispatch({actionType:TweetSmartActions.TWEET_SUCCESS,lastSuccessfulTweetId:data.tweetId});
}

var updateStateOnTweetFailed = function(data){
    AppDispatcher.dispatch({actionType:TweetSmartActions.TWEET_FAILURE});
}

var updateStateOnLoggedIn = function (data) {
    AppDispatcher.dispatch({actionType:TweetSmartActions.SIGN_IN_COMPLETE,signedInTwitterUserId:data.userId,signedInScreenName:data.screenName})
}

var TweetSmartActionCreator = {
    
    compose: function(text){
        var action = {actionType: TweetSmartActions.COMPOSE, text: text};
        AppDispatcher.dispatch(action);        
    },
    
    numberingpositionatstart:function(numberingpositionatstart){
      AppDispatcher.dispatch({actionType:TweetSmartActions.CHANGE_NUMBERING_POSITION, numberingpositionatstart: numberingpositionatstart});  
    },
    
    queuetweetstorm: function(tweetstorm){
        AppDispatcher.dispatch({actionType:TweetSmartActions.QUEUE_TWEETSTORM, tweetstorm: tweetstorm});
    },
    
    tweet: function(tweet,lastSuccessfulTweetId){
        ChromeUtils.tweet(tweet,lastSuccessfulTweetId).then(updateStateOnTweetSuccess,updateStateOnTweetFailed);
        //TweetSmartAPIUtils.tweet(tweet,signature).then(updateStateOnTweetSuccess, updateStateOnTweetFailed);
    },
    
    tweetstormsuccess: function(){
        AppDispatcher.dispatch({actionType:TweetSmartActions.TWEETSTORM_SUCCESS})
    },
    
    tweetstormfailed: function(){
        
    },

    signin: function(){
        AppDispatcher.dispatch({actionType:TweetSmartActions.SIGN_IN});
        //ChromeUtils.connectToTwitter().then(updateStateOnLoggedIn);
    },

    checkSignedIn: function () {
      ChromeUtils.connectToTwitter().then(updateStateOnLoggedIn);
    },

    signout: function () {
        ChromeUtils.signOut();
        AppDispatcher.dispatch({actionType:TweetSmartActions.SIGN_OUT});
    },
    
    refreshAfterSuccess: function(){
        AppDispatcher.dispatch({actionType:TweetSmartActions.REFRESH_AFTER_SUCCESS});
    },
    
    democompose: function(){
        AppDispatcher.dispatch({actionType:TweetSmartActions.DEMO_COMPOSE})
    }
};

module.exports = TweetSmartActionCreator;