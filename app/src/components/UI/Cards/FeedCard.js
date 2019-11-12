import React ,  { Component }from "react";
import Card from "./Card";
import Badge from "../Badge";
import PropTypes from "prop-types";

class FeedCard extends Component{
    constructor(props){
        super(props);
    }
    render (){
        return (
            <div className="col-s-33">
                <Card className="feed-card">
                    <Badge className={this.props.item.reaction}> { this.props.item.reaction }</Badge>
                    <h4 className="title"> { this.props.item.title }</h4>
                    <p className="text"> { this.props.item.text }</p>
                    <p className="source"> { this.props.item.source }</p>
                    <p className="date"> <i className="uil uil-calender"></i> {this.props.item.date } </p>
                </Card>
            </div>
        )
    }
}

FeedCard.propTypes = {
    item: PropTypes.shape({
        title: PropTypes.string,
        text: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        source: PropTypes.string.isRequired
    })
}

FeedCard.defaultProps = {
    item: {}
}
export default FeedCard