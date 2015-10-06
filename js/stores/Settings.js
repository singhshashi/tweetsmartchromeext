/**
 * Created by shashi on 6/10/15.
 */

var Settings = {

    // set to false for development
    ONLINE : false,

    UI_TIMEOUT : 2000,

    PROXY : 'https://stage.birdops.com/',
    API_KEY : 'GQyCKJBmiufakgJ7P5T1eAsxV',
    API_SECRET : 'Hmwv71tVYpHOSOrNT7w0WGdb71JG5Wgxcfo3Gn2qDlhmbtWs2w',
    ACCESS_TOKEN : null,
    ACCESS_TOKEN_SECRET : null,

    AUTH_STATE_LOGIN : 'login',
    AUTH_STATE_PIN : 'pin',
    AUTH_STATE_COMPLETED : 'completed',

    PROPERTIES : [ 'apiKey', 'apiSecret', 'accessToken', 'accessTokenSecret', 'authState'],

    properties : null,

    init : function(success, failure) {

        chrome.storage.sync.get(this.PROPERTIES, function(properties) {
            Settings.properties = properties;
            success(properties);
        });

    },

    save : function(properties, callback) {

        console.log(properties);
        console.log(Settings);
        chrome.storage.sync.set(properties, function() {
            for (var key in properties) {
                Settings.properties[key] = properties[key];
            }
            if (callback){
                callback();
            }
        });

    },

    remove : function(properties, callback) {

        chrome.storage.sync.remove(properties, function() {
            for (var key in properties) {
                delete Settings.properties[key];
            }
            if (callback){
                callback();
            }
        });

    }

};


Settings.DEFAULT = {
    'apiKey' : Settings.API_KEY,
    'apiSecret' : Settings.API_SECRET,
    'accessToken' : Settings.ACCESS_TOKEN,
    'accessTokenSecret' : Settings.ACCESS_TOKEN_SECRET,
    'authState' : Settings.AUTH_STATE_LOGIN
}
