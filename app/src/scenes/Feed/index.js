import React, { Component } from "react";
import  Layout from "../../components/Layout";
import { connect } from "react-redux";
import "./style.scss";
import { FeedCard } from "../../components/UI/Cards";

class Feed extends Component{
  constructor(props){
    super(props);
    this.state = {
      data:[
        { 
          key: "345678",
          title: "A new rape case in arise news",
          source: "Punchngr",
          date: "12-08-2019",
          reaction: "positive",
          text: "News & social conversations around rape cases crawled from vanguardngr.com, punchng.com & twitter.comNews & social conversations around rape cases crawled from vanguardngr.com, punchng.com & twitter.com"
        },
        { 
          key: "34567dfghj8sdf",
          title: "A new rape case in arise news",
          source: "Punchngr",
          date: "12-08-2019",
          reaction: "positive",
          text: "News & social conversations around rape cases crawled from vanguardngr.com, punchng.com & twitter.comNews & social conversations around rape cases crawled from vanguardngr.com, punchng.com & twitter.com"
        },
        { 
          key: "34567fg8fghj",
          title: "A new rape case in arise news",
          source: "Punchngr",
          date: "12-08-2019",
          reaction: "positive",
          text: "News & social conversations around rape cases crawled from vanguardngr.com, punchng.com & twitter.comNews & social conversations around rape cases crawled from vanguardngr.com, punchng.com & twitter.com"
        },
        { 
          key: "345678fg",
          title: "A new rape case in arise news",
          source: "Punchngr",
          date: "12-08-2019",
          reaction: "positive",
          text: "News & social conversations around rape cases crawled from vanguardngr.com, punchng.com & twitter.comNews & social conversations around rape cases crawled from vanguardngr.com, punchng.com & twitter.com"
        },
        { 
          key: "34567dfghj8",
          title: "A new rape case in arise news",
          source: "Punchngr",
          date: "12-08-2019",
          reaction: "positive",
          text: "News & social conversations around rape cases crawled from vanguardngr.com, punchng.com & twitter.comNews & social conversations around rape cases crawled from vanguardngr.com, punchng.com & twitter.com"
        },
        { 
          key: "34567dfg8fghj",
          title: "A new rape case in arise news",
          source: "Punchngr",
          date: "12-08-2019",
          reaction: "positive",
          text: "News & social conversations around rape cases crawled from vanguardngr.com, punchng.com & twitter.comNews & social conversations around rape cases crawled from vanguardngr.com, punchng.com & twitter.com"
        },{ 
          key: "345fghj67fg8fg",
          title: "A new rape case in arise news",
          source: "Punchngr",
          date: "12-08-2019",
          reaction: "positive",
          text: "News & social conversations around rape cases crawled from vanguardngr.com, punchng.com & twitter.comNews & social conversations around rape cases crawled from vanguardngr.com, punchng.com & twitter.com"
        },
        { 
          key: "34567dfghghjj8",
          title: "A new rape case in arise news",
          source: "Punchngr",
          date: "12-08-2019",
          reaction: "positive",
          text: "News & social conversations around rape cases crawled from vanguardngr.com, punchng.com & twitter.comNews & social conversations around rape cases crawled from vanguardngr.com, punchng.com & twitter.com"
        },
        { 
          key: "34567rt8fghj",
          title: "A new rape case in arise news",
          source: "Punchngr",
          date: "12-08-2019",
          reaction: "positive",
          text: "News & social conversations around rape cases crawled from vanguardngr.com, punchng.com & twitter.comNews & social conversations around rape cases crawled from vanguardngr.com, punchng.com & twitter.com"
        }
      ]
    }

  }
  componentDidUpdate(){
    console.log( this.props.history.location.search )
  }
  render() {
    const { data } = this.state;
    return (

      <Layout 
        page="Feed"
        text="News & social conversations around rape cases crawled from vanguardngr.com, punchng.com & twitter.com."
      >
        <div className="flex flex--wrap">
          {
            data.map( item=>{
              return (
                <FeedCard
                    key={item.key}
                    item={item}
                />
              )
            })
          }
        </div>
      </Layout>
    );
  }
}

export default Feed;