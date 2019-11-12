import React, { Component } from "react";
import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import "./style.scss";

class Layout extends Component{
  constructor(props){
    super(props);
    this.state = {};
  }
  render() {
    
    return (
      <div className="app-layout">
        <Sidebar/>
        <main className="app-layout__main">
          <Header/>
          <div className="app-content">
              <div className="app-content__top">
                <h4 className="heading"> {this.props.page}</h4>
                <p className="page-summary">{ this.props.text }</p>
              </div>
              {
                (!this.props.disableNav)? (<Nav/>) : ""
              }
               {this.props.children}
            </div>
          <Footer/>
        </main>
      </div>
    );
  }
}

export default Layout;