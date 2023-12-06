import React, { useEffect, useState } from "react";
//component to declare value if link is clicked.
function Link(props){
    let[id,setId]=useState(props.id);
    let[value,setValue]=useState(props.value);

    const handleClick = () => {
        props.handleClick({category:props.category,id:props.id});
    }

    return(
        <div>
            <a href="#" onClick={handleClick}>{value}</a>
        </div>
    );
}
export default Link;