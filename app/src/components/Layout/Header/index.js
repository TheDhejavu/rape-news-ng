import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.scss";

class Header extends Component{
    constructor( props ){
        super(props);
        this.state ={}
    }
  
    render(){
        return (
            <header className="app-header">
                <div className="app-header__panel">
                    <div className="app-header__left">
                        <button className="harmburger-btn btn reset-btn">
                            <i className='uil uil-bars'></i>
                        </button>
                        <form className="search-form ">
                            <span className="search-icon"><i className='uil uil-search'></i></span>
                            <input type="text" className="form-control" placeholder="Search"/>
                        </form>
                    </div>
                </div>
            </header>
        );
    }
}
export default Header;

