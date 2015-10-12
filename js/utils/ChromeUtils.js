/**
 * Created by shashi on 5/10/15.
 */


var Settings = require('../stores/Settings');

var ChromeUtils = {

    connectToTwitter: function () {

        return new Promise(function(fulfill,reject){
            var request = {
                type : "background.twitterRequestToken",
            };
            chrome.runtime.sendMessage(request, function(response) {

                if (response)
                {
                    fulfill(response);
                }
                else
                {
                    reject(response);
                }
            });
        });
    },

    signOut: function(){
        var request ={
            type:"background.twitterSignOut",
        };

        chrome.runtime.sendMessage(request, function (response) {

        });
    }
};

module.exports = ChromeUtils;