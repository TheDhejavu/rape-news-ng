import React, { Component } from "react";
import queryString from 'query-string'
import { NavLink } from "react-router-dom";
import Dropdown from "../../UI/Dropdown";
import "./style.scss";

class Nav extends Component{
    constructor( props ){
        super(props);
        this.state = {
            filters:{
                years: ["2016", "2017","2018","2019"],
                sources: [
                    {
                        logo: "",
                        name:"Vanguard"
                    },
                    {
                        logo:"",
                        name:"Punch"
                    },
                    {
                        logo:"",
                        name: "Twitter"
                    }
                ],
                reactions: ["Positive","Negative","Neutral"]
            },
            yearDropdownVisible: false,
            reactionDropdownVisible: false,
            sourceDropdownVisible: false,
            query:{}
        }
    }
    handleOnClick(e){
        let query = queryString.parse(e.target.href.split("?")[1]);
        query = {...this.state.query, ...query};

        this.setState({
            query: query
        });
    }
    toggleYearDropdown( visible ){
        const vs = (typeof visible == "boolean")? visible : !this.state.yearDropdownVisible;

        this.setState({
            yearDropdownVisible: vs
        })
    }
    toggleSourceDropdown( visible ){
        const vs = (typeof visible == "boolean")? visible : !this.state.sourceDropdownVisible;

        this.setState({
            sourceDropdownVisible: vs
        })
    }
    toggleReactionDropdown( visible ){
        const vs = (typeof visible == "boolean")? visible : !this.state.reactionDropdownVisible;

        this.setState({
            reactionDropdownVisible: vs
        })
    }
    
    render(){
        const { reactions, years, sources} = this.state.filters;
        return (
            <nav className="app-layout__nav">
                <ul className="nav-lists ">
                    <li className="nav-list">
                        { this.state.query.year || null }
                        <button 
                            onClick={this.toggleYearDropdown.bind(this)}
                            ref={ node => this.triggerNode = node}
                        > Year </button>
                        <Dropdown
                            className="dropdown"
                            triggerNode={this.triggerNode}
                            toggleDropdown={this.toggleYearDropdown.bind(this)}
                            visible={this.state.yearDropdownVisible}
                        >
                            <ul>
                                {
                                    years.map( year=>{
                                        return (<li onClick={this.handleOnClick.bind(this)}>
                                                    <NavLink 
                                                        to={`/feed?year=${year}`}
                                                    > { year} 
                                                    </NavLink>
                                                </li>)
                                    })
                                }
                            </ul>
                        </Dropdown>
                    </li>
                    <li className="nav-list">
                        <button 
                            onClick={this.toggleSourceDropdown.bind(this)}
                            ref={ node => this.triggerNode_1 = node}
                        > Sources </button>

                        <Dropdown
                         className="dropdown"
                         onClick={this.toggleSourceDropdown.bind(this)}
                         triggerNode={this.triggerNode_1}
                         toggleDropdown={this.toggleSourceDropdown.bind(this)}
                         visible={this.state.sourceDropdownVisible}
                        >
                            <ul>
                                {
                                    sources.map( source=>{
                                        return (<li onClick={this.handleOnClick.bind(this)}>
                                                    <NavLink to={`/feed?source=${source.name}`}> { source.name} </NavLink>
                                                </li>)
                                    })
                                }
                            </ul>
                        </Dropdown>
                    </li>
                    <li className="nav-list">
                        <button 
                            onClick={this.toggleReactionDropdown.bind(this)}
                            ref={ node => this.triggerNode_2 = node}
                        > Reactions </button>
                        <Dropdown
                         className="dropdown"
                         toggleDropdown={this.toggleReactionDropdown.bind(this)}
                         triggerNode={this.triggerNode_2}
                         visible={this.state.reactionDropdownVisible}
                        >
                            <ul>
                                {
                                    reactions.map( reaction=>{
                                        return (<li onClick={this.handleOnClick.bind(this)}>
                                                    <NavLink to={`/feed?reaction=${reaction}`}> { reaction } </NavLink>
                                                </li>)
                                    })
                                }
                            </ul>
                        </Dropdown>
                    </li>
                </ul>
            </nav>
        );
    }
}
export default Nav;

