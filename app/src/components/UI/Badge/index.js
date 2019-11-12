import React from "react";
import "./style.scss";

const Badge = ( props )=>{
    const className = `badge ${props.className}`
    return (
        <div className={className}>
            { props.children }
        </div>
    )
}

export default Badge;