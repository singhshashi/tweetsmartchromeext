/**
 * Created by shashi on 10/10/15.
 */

var React = require('react');
var TweetSmartActionCreator = require('../actions/TweetSmartActionCreator');

var Header = React.createClass({

    render: function () {

        var signedInText = "";
        var singOutLinkText = "";
        if (this.props.signedInScreenName != '')
        {
            signedInText = "Signed In as " + this.props.signedInScreenName;
            singOutLinkText = "Sign out";
        }
            return (
            <div>
                <nav className="navbar navbar-default navbar-static-top">
                    <div className="container-fluid">
                        <div className="navbar-header pull-left">
                            <span className="navbar-brand">TweetSmart</span>
                        </div>
                        <div className="navbar-header pull-right">
                            <p className="navbar-text">{signedInText}. <a href="#" className="navbar-link" onClick={this.signOut}>{singOutLinkText}</a></p>
                        </div>
                    </div>
                </nav>

            </div>
            );
    },

    signOut : function(evt){
        TweetSmartActionCreator.signout();
    }

});

module.exports = Header
         