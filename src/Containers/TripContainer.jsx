import React,{ useEffect, useState } from "react";
import axios from 'axios';
import JSOG from "jsog";
import { Trip } from "../Models/Trip";
import TripMenu from "../Menus/TripMenu";

function TripContainer(props){
    let [trip, setTrip] = useState([]);
    let [tripQue, setTripQue] = useState([]);let [newObject,setNewObject]=useState(false);
    let [edit, setEdit] = useState(true);
    let [counter, setCounter] = useState(0);
    let [isTrue, setIsTrue] = useState(true);
    const [recycle , setRecycle] = useState(false);

   
    const Filtering = (e) => {
        
            setRecycle(true);
            setEdit(false);
            setIsTrue(false);
        
    
        const { name, keywords, ofDateFrom, ofDateTo } = e;
    
        const filteredList = trip.filter(tripT => {
            const dateFrom = tripT.dateOf ? new Date(tripT.dateOf) : null;
            const dateTo = tripT.dateTo ? new Date(tripT.dateTo) : null;
    
            const hasValidTitle = !name || tripT.title.includes(name) && name.trim().length > 0;
    
            // Check if description is blank or matches the value
            const hasValidDescription = !keywords || (tripT.description && tripT.description.includes(keywords) && keywords.trim().length > 0);
    
            // Check if keywords are blank or match the value
            const hasValidKeywords = !keywords || (tripT.locations && tripT.locations.includes(keywords) && keywords.trim().length > 0);
    
            // Check if the dates are within the specified range
            const isDateInRange = (!dateFrom || !ofDateFrom || new Date(ofDateFrom) <= dateFrom) &&
                                  (!dateTo || !ofDateTo || new Date(ofDateTo) >= dateTo);
    
            return hasValidTitle && (hasValidKeywords || hasValidDescription) && isDateInRange;
        });
    
        setTripQue(filteredList);
        props.setTarget(-1);
    };
    
    

    let targetLaunch = (e) => {
            
        let newTrip = [];   
        for(let trip of tripQue){
            if(trip.id === e){
                newTrip.push(trip);               
            }
        }
        setTripQue(newTrip);
        props.setTarget(e);
    }

    let getData = async () => {if(newObject){setNewObject(false);return;} setRecycle(false); setEdit(false);
        setIsTrue(prevIsTrue => false); // Trigger a state change to re-render
        
        let path = 'http://localhost:8080/trip/all';
        try {
            let res = await axios.get(path);
            let target = JSOG.stringify(res.data);
            let newObject = JSOG.parse(target);
            setTripQue(newObject["tripData"]);
            setTrip(newObject["tripData"]);
          
        } catch (error) {
           
        }
       
    }
    let switcher=()=>
    {
       
        setNewObject(true);
        setEdit(true);setIsTrue(true);props.setTarget(-1);
    }
let toEdit =()=>{
    if(!isTrue){
    let cur=!edit;
    setEdit(!edit);
    if(isTrue && cur===false){
        setTripQue(trip);
        setIsTrue(false);
    }}

}
    let refresh=()=>{
        setTrip([]);
        setTripQue([]);
        setEdit(true);
        setIsTrue(true);
        setCounter(0);
        getData();
        props.setTarget(-1);
    }
    useEffect(() => {
        getData();
    }, [props.id, props.count]);

    return (
        <div>
            <TripMenu
                search={(e) => { Filtering(e); }}
                newTripOn={() => { switcher() }}
                newTripOff={() => { switcher()}}
                isOn={isTrue}
            />
            
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      
            {props.id!=-1 &&  <button onClick={() => {toEdit();}} className={(edit && props.id!=-1 ) ? 'btn btn-success' : 'btn btn-danger'}>ToChangeMode</button>}
              </div>  

            {(edit && isTrue && props.id==-1) && <Trip 
                 description={""}  people={props.people}
                    locations={""} id={-1} toList={false}   ofTitle={false}
                        title={trip.title}  dateOf={""} dateTo={""} oldSuggestions={[]}
                  edit={edit} isNew={true} images={[]} 
                     refresh={()=>{refresh();}}
            />
            }
            {(props.id!=-1   && recycle===false) && (tripQue.map((trip) => {
                    if(props.id===trip.id){return (
                        <Trip 
                         ofTitle={false}
                        title={trip.title}
                        description={trip.description}
                        locations={trip.locations}
                        id={trip.id}
                        toList={true}
                        key={trip.id}
                        refresh={()=>{refresh();}}
                        edit={edit}
                    dateOf={trip.dateOf} dateTo={trip.dateTo}
                        target={(s) => {
                            targetLaunch(s);
                        }}
                       
                        images={trip.images}
                        people={props.people}
                        oldSuggestions={trip.people}
                        />
                    );}
                }))}
            {(tripQue.length > 0 && !isTrue && (props.id===-1  || recycle===true)) && (trip.map((trip) => {
                return (
                    <Trip 
                        ofTitle={true}
                        title={trip.title}
                        description={trip.description}
                        locations={trip.locations}
                        id={trip.id}
                        toList={false}
                        key={trip.id}
                        refresh={()=>{refresh();}}
                        edit={edit}
                        dateOf={trip.dateOf} dateTo={trip.dateTo}
                        target={(s) => {
                            targetLaunch(s);
                        }}
                        images={trip.images}
                        people={props.people}
                        oldSuggestions={trip.people}
                    />
                );
            }))}


           
               
        </div>
    );
}

export default TripContainer;