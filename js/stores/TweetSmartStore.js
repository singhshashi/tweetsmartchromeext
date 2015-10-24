var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TweetSmartActions = require('../constants/TweetSmartActionTypes');
var TweetSmartConstants = require('../constants/TweetSmartConstants');
var assign = require('object-assign');
var Utils = require('../utils/Utils');
var _ = require('../../node_modules/underscore/underscore');
var State = require('./State');
var AppState = State.AppState;
var UIState = State.UIState;


var CHANGE_EVENT = 'change';
//const TWEET_LENGTH = 140;
const WORD_SEPARATOR = ' ';


var TweetSmartStore = assign({}, EventEmitter.prototype, {
    
    getAppState: function(){
        return AppState;
    },
    
    getUIState: function(){
      return UIState;  
    },
    
    getSignedInSignature: function(){
      var sig = Utils.getParameterByName('sig');
        if (sig === null || sig === '')
            return null;
        return sig;
    },
    
    getTweetStorm: function(){
        if (AppState.queuedTweets.length > 0)
            {
                return AppState.queuedTweets;
            }
        
        var tweetStorm = [];
        if (AppState.tweetStormText.length > 0)
        {
            var spaceIndexArr = Utils.getArrayOfIndices(AppState.tweetStormText,WORD_SEPARATOR);
            if (Utils.getMaxOfNumberArray(spaceIndexArr) <= TweetSmartConstants.TWEET_LENGTH)
            {
                tweetStorm.push({key:0,text:AppState.tweetStormText});
            }
            else{
                    var splitPoints = [];
                    splitPoints.push(0);//initialize with 0 which is used later when splitting using substr
                    var i;
                    var possibleNumberOfTweets = Math.floor(AppState.tweetStormText.length/TweetSmartConstants.TWEET_LENGTH);

                    var index = 0;
                    while(index != null)
                        {
                            var neighbours = Utils.getNeighboursInSortedNumberArray(spaceIndexArr, index + TweetSmartConstants.TWEET_LENGTH);
                            if (neighbours.rightSideNeighbour == null)
                                {
                                    index = null;
                                }
                            else{
                                    splitPoints.push(neighbours.leftSideNeighbour);
                                    index = neighbours.leftSideNeighbour;                                
                            }
                        }                    
                    
                
                    var splitPointPairs = [];
                    var i;
                    var limit = splitPoints.length;
                    for (i = 0; i < limit; i++) {
                        if(isNaN(splitPoints[i+1]))
                            {
                                splitPointPairs.push({start:splitPoints[i],length:AppState.tweetStormText.length - splitPoints[i]});
                            }
                        else{
                            splitPointPairs.push({start:splitPoints[i],length: splitPoints[i+1] - splitPoints[i]});                            
                        }
                    }
                
//                console.log(splitPointPairs);
                        console.log(AppState);
                    _.each(splitPointPairs, function(splitPointPair,index){
                        
                        var numberedTweet = '';

                       if (AppState.numberingPositionAtStart == "true")
                       {
                         numberedTweet = (index + 1).toString() + '/' + this.length + ' ' +                  AppState.tweetStormText.substr(splitPointPair.start,splitPointPair.length);
                       }                   
else{
      numberedTweet =  AppState.tweetStormText.substr(splitPointPair.start,splitPointPair.length) + ' ' + (index + 1).toString() + '/' + this.length;
}
                        tweetStorm.push({key:index,text:numberedTweet});
                    },splitPointPairs);                
            }            
        }        
        return tweetStorm;
    }, 
    
    emitChange: function(){
        this.emit(CHANGE_EVENT);
    }, 
    
    addChangeListener: function(callback){
        this.on(CHANGE_EVENT,callback);
    }, 
    
    removeChangeListener: function(callback){
        this.removeListener(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register(function(action){
    switch(action.actionType) {
        case TweetSmartActions.COMPOSE: 
            AppState.tweetStormText = action.text;
            TweetSmartStore.emitChange();
            break;  
        case TweetSmartActions.QUEUE_TWEETSTORM:
            queuedTweets = [];
            _.each(action.tweetstorm, function(element, index){
                queuedTweets.push({key: element.key, text:element.text, status: 0});
            });
            AppState.queuedTweets = queuedTweets;
            UIState.composebox = false;
            UIState.tweetbutton = 'tweeting';
            TweetSmartStore.emitChange();
            break;
        case TweetSmartActions.TWEET_SUCCESS:
            var queuedTweets = AppState.queuedTweets;
            var successfulTweet = _.find(queuedTweets, function(twt){
                return twt.status == 0;
            });
            successfulTweet.status = 1;
            AppState.queuedTweets = queuedTweets;
            AppState.lastSuccessfulTweetId = action.lastSuccessfulTweetId;
            setTimeout(function(){TweetSmartStore.emitChange()}, 2100);
            break;
        case TweetSmartActions.TWEET_FAILURE:
            var unsuccesfulTweet = _.find(AppState.queuedTweets, function(twt){
               return twt.status == 0; 
            });
            unsuccesfulTweet.status = -1;
            UIState.tweetbutton = 'failure';
            TweetSmartStore.emitChange();
            break;
        case TweetSmartActions.TWEETSTORM_SUCCESS:
            UIState.composebox = true;
            UIState.tweetbutton = 'success';
            AppState.tweetStormText = '';
            AppState.queuedTweets = [];
            AppState.lastSuccessfulTweetId = -1;
            TweetSmartStore.emitChange();
            break;
        case TweetSmartActions.TWEETSTORM_FAILURE:
            UIState.composebox = false;
            UIState.tweetbutton = 'failure';
            TweetSmartStore.emitChange();
            break;
        case TweetSmartActions.REFRESH_AFTER_SUCCESS:
             UIState.tweetbutton = null;
             TweetSmartStore.emitChange();
            break;
        case TweetSmartActions.CHANGE_NUMBERING_POSITION:
            console.log("Changing numbering position to: " + action.numberingpositionatstart);
            AppState.numberingPositionAtStart = action.numberingpositionatstart;
            console.log(AppState.numberingPositionAtStart);
            TweetSmartStore.emitChange();
            break;
        case TweetSmartActions.SIGN_IN:
            AppState.signedInTwitterUserId =  action.signedInTwitterUserId;
            AppState.signedInScreenName = action.signedInScreenName;
            AppState.signedIn = true;
            TweetSmartStore.emitChange();
            break;
        case TweetSmartActions.SIGN_OUT:
            AppState.signedIn = false;
            AppState.signedInScreenName = "";
            AppState.signedInTwitterUserId = -1;
            TweetSmartStore.emitChange();
            break;
    }
    
});

module.exports = TweetSmartStore;