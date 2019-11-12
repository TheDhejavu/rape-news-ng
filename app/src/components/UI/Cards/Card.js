import React ,  { Component  } from "react";
import {  fadeIn} from 'react-animations';
import styled, { keyframes } from 'styled-components';

const fadeInAnimation = keyframes`${fadeIn}`;
const Element = styled.div`
  animation: 1s ${fadeInAnimation};
`;

class Card extends Component{
    constructor(props){
        super(props);
    }
    render (){
        const className = `card ${this.props.className}`;
        return (
            <Element className={className}>
               { this.props.children }
            </Element>
        )
    }
}

export default Card