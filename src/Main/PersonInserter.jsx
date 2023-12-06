import React, { useEffect, useState } from "react";
import AutoSuggest from "./AutoSuggest";
import { Person } from "../Models/Person";

function PersonInserter(props) {
    let [people, setPeople] = useState([]);
    let [names, setNames] = useState("");
    
    useEffect(() => {
        getInitNames();
    }, []);
  //get list of all people from parent.
let getInitNames=()=>{
    let newNames=[];
    for(let person of props.oldSuggestions){
        newNames.push(person.name);
    }
    setNames(newNames);
    let newPeople=[];
    for(let person of props.people){
        if( newNames.includes(person.name)){
            newPeople.push(person);
        }
    }
    setPeople(newPeople);
} //go through list of people and find people objects of whom name match.
    let getPeople = (e) => {
        let newPeople=[];
        for(let person of props.people){
            if( e.includes(person.name)){
                newPeople.push(person);
            }
        }
        setPeople(newPeople);
        props.updatePeople(newPeople);
    };
    //to update the list
    let updateList=async(e)=>{
        setNames(e);
        getPeople(e)
    }
    // to delete said entry by index. from child component delivering index.
    let del = (i) => {
        return () => {
            let newPeople = [...people];
            newPeople.splice(i, 1);
            setPeople(newPeople);
            props.updatePeople(newPeople);
        }
    }
    return( <div>

        {props.edit==true && <AutoSuggest oldSuggestions={people} suggestions={props.people} updateList={(e)=>{updateList(e)}} />}
        <div>
        {props.edit 
            ? 
                <div  className="container ">
                        {people.map((person, i) => (
                            <div className="row"><a style={{ textDecoration: 'none' }} className="text-black w-25" href="#" onClick={() => del(i)}>{person.name}</a></div>
                        ))}
                    </div> 
            : 
            <div>
            <div className="container ">
                {people.map((person, i) => (
                    <div className="row w-25 bg-dark text-white">{person.name}</div>
                ))}
            </div>
    </div>
}

        </div>
    </div>);
}
export default PersonInserter;
