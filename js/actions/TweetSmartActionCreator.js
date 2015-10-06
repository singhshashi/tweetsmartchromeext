var AppDispatcher = require('../dispatcher/AppDispatcher');
var TweetSmartActions = require('../constants/TweetSmartActionTypes');
var TweetSmartConstants = require('../constants/TweetSmartConstants');
var TweetSmartAPIUtils = require('../utils/TweetSmartAPIUtils');
var ChromeUtils = require('../utils/ChromeUtils');

var updateStateOnTweetSuccess = function(data){
    AppDispatcher.dispatch({actionType:TweetSmartActions.TWEET_SUCCESS});
}

var updateStateOnTweetFailed = function(data){
    AppDispatcher.dispatch({actionType:TweetSmartActions.TWEET_FAILURE});
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
    
    tweet: function(tweet,signature){
        AppDispatcher.dispatch({actionType:TweetSmartActions.TWEET, tweet:tweet})
        TweetSmartAPIUtils.tweet(tweet,signature).then(updateStateOnTweetSuccess, updateStateOnTweetFailed);        
    },
    
    tweetstormsuccess: function(){
        AppDispatcher.dispatch({actionType:TweetSmartActions.TWEETSTORM_SUCCESS})
    },
    
    tweetstormfailed: function(){
        
    },

    signin: function(){
        ChromeUtils.connecttotwitter();
    },
    
    refreshAfterSuccess: function(){
        AppDispatcher.dispatch({actionType:TweetSmartActions.REFRESH_AFTER_SUCCESS});
    },
    
    democompose: function(){
        AppDispatcher.dispatch({actionType:TweetSmartActions.DEMO_COMPOSE})
    }
};

module.exports = TweetSmartActionCreator;