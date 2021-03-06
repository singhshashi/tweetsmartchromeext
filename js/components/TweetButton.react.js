var React=require('react');
var TweetSmartActionCreator=require('../actions/TweetSmartActionCreator');


var TweetButton = React.createClass({
    
   render: function(){


        var signedIn = this.props.signedIn;
        var uiState = this.props.uiState;

        if (signedIn == "1")
            {
                if (uiState === 'tweeting')
                    {
                        return(
                                <div className="pull-right">
                                    <a className='btn btn-twitter' id='btnAction'>Tweeting...</a>
                                    <img alt='loading...' src='../../images/ajax-loader.gif' />
                                </div>                       
                        );
                    }
                else{
                        if (uiState === 'success')
                            {
                                setTimeout(TweetSmartActionCreator.refreshAfterSuccess, 3500);
                            }
                        return(
                            <div className="pull-right">
                                <a className='btn btn-twitter' id='btnAction' onClick={this._onClick}>Tweet</a>
                                <p>{this.getStatusText()}</p>
                            </div>);
                }
                
            }
        
        return(<div className="pull-right"><a className='btn btn-social btn-twitter' id='btnAction' onClick={this._signIn}><i className="fa fa-twitter"></i>Sign in with Twitter</a></div>);
    }, 
        
    _onClick:function(){     
        TweetSmartActionCreator.queuetweetstorm(this.props.tweetStorm);
    },

    _signIn:function(){
        TweetSmartActionCreator.signin();
    },
    
    getStatusText: function(){
        var uiState = this.props.uiState;
        var statusText = '';
        switch(uiState){
            case 'success': 
                statusText = "Success!";
                break;
            case 'failure':
                statusText = "Failed!";
                break;                   
        }
        
        return statusText;
        
    }
});

module.exports = TweetButton;

