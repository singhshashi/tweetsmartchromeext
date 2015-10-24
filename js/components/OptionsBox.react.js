var React = require('react');
var TweetSmartActionCreator = require('../actions/TweetSmartActionCreator');


var OptionsBox = React.createClass({
    render: function(){
        console.log("Inside render");
        console.log(this.props.numberingPositionAtStart);
        return (
            <div>
                <div className="radio">
                    <label>
                        <input type="radio" name="radioNumberingPositionOptions" id="numberingPositionAtStart" value="1" onChange={this._onClick} checked={this.props.numberingPositionAtStart == "true"}  />
                Append numbering at the beginning of tweets
                    </label>
                </div>
                <div className="radio">
                    <label>
                        <input type="radio" name="radioNumberingPositionOptions" id="numberingPositionAtEnd" value="0" onChange={this._onClick} checked={!(this.props.numberingPositionAtStart == "true")} />
                Append numbering at the end of tweets
                    </label>
                </div>
            </div>
        );
    },
    
    _onClick: function(event){
        if (event.target.value == 1)
            {
                TweetSmartActionCreator.numberingpositionatstart(true);
            }
        else{
            TweetSmartActionCreator.numberingpositionatstart(false);
        }
        
    }
});


module.exports = OptionsBox;
