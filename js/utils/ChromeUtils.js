/**
 * Created by shashi on 5/10/15.
 */


var Settings = require('../stores/Settings');

var ChromeUtils = {

    connecttotwitter: function () {

        console.log("Inside Chrome Utils");
        var request = {
            type : "background.twitterRequestToken",
        };

        chrome.runtime.sendMessage(request, function(response) {

            alert("Inside response: " + response);
        });

    }
};

module.exports = ChromeUtils;