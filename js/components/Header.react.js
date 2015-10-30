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
                        <div className="navbar-header">
                            <a href="#" className="navbar-brand">
                              <img alt="TweetSmart" src="images/logo_main.png" />
                            </a>
                            <span className="mod-navbar-toggle">
                                <span className="navbar-text navbar-right">{signedInText} &nbsp;&nbsp; <a href="#" className="navbar-link" onClick={this.signOut}>{singOutLinkText}</a></span>
                            </span>
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
         