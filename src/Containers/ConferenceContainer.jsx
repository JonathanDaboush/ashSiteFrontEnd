import React,{ useEffect, useState } from "react";
import axios from 'axios';
import JSOG from "jsog";
import { Conference } from "../Models/Conference";
import ConferenceMenu from "../Menus/ConferenceMenu";

function ConferenceContainer(props){
    let [conference, setConference] = useState([]);
    let [conferenceQue, setConferenceQue] = useState([]);
    let [edit, setEdit] = useState(true);let [newObject,setNewObject]=useState(false);
    let [counter, setCounter] = useState(0);
    let [isTrue, setIsTrue] = useState(true);
let [find,setFind] = useState(false);
    const [recycle , setRecycle] = useState(false);

   
    const Filtering = (e) => {
        setFind(true);
    
       
            setRecycle(true);
            setEdit(false);
            setIsTrue(false);
        
    
        const { name, keywords, dateTo, dateFrom, going } = e;
    
        const filteredList = conference.filter((conferenceT) => {
            const dateTarget = conferenceT.dateOfConference ? new Date(conferenceT.dateOfConference) : null;
    
            const hasValidTitle = !name || (conferenceT.title && conferenceT.title.includes(name) && name.trim().length > 0);
            const hasValidContent = !keywords || (conferenceT.content && conferenceT.content.includes(keywords) && keywords.trim().length > 0);
            const hasValidKeywords = !keywords || (conferenceT.link && conferenceT.link.includes(keywords) && keywords.trim().length > 0);
            const hasValidLocation = !keywords || (conferenceT.location && conferenceT.location.includes(keywords) && keywords.trim().length > 0);
            const hasValidDissidents = !keywords || (conferenceT.dissidents && conferenceT.dissidents.includes(keywords) && keywords.trim().length > 0);
            const isActivlyAttending = conferenceT.activelyGoing === going;
    
            const isDateInRange =
                (!dateFrom || !dateTarget || new Date(dateTarget) >= new Date(dateFrom)) &&
                (!dateTo || !dateTarget || new Date(dateTarget) <= new Date(dateTo));
    
            const nameIsBlankOrNotInTitle = !name || (!conferenceT.title || !conferenceT.title.includes(name) && name.trim().length > 0);
            const keywordsIsBlankOrNotInComparator =
    !keywords ||
    (
        (conferenceT.content && conferenceT.content.includes(keywords)) ||
        (conferenceT.link && conferenceT.link.includes(keywords)) ||
        (conferenceT.location && conferenceT.location.includes(keywords)) ||
        (conferenceT.dissidents && conferenceT.dissidents.includes(keywords))
    );
    
            const isTrue =
                hasValidTitle &&
                (hasValidKeywords || hasValidLocation || hasValidDissidents || hasValidContent) &&
                isDateInRange &&
                isActivlyAttending &&
                nameIsBlankOrNotInTitle &&
                keywordsIsBlankOrNotInComparator;
    
            return isTrue || !conferenceT.dateOfConference; // additional condition for date value check
        });
    
        setConferenceQue(filteredList);
      setIsTrue(false); setRecycle(true);
    };
    
    

    let targetLaunch = (e) => {
            
        let newConference = [];   
        for(let conference of conferenceQue){
            if(conference.id === e){
                newConference.push(conference);               
            }
        }
        setConferenceQue(newConference);
        props.setTarget(e);
    }

    let getData = async () => {setRecycle(false); setEdit(false);
        let path = 'http://localhost:8080/conference/all';
        try {
            let res = await axios.get(path);
            let target = JSOG.stringify(res.data);
            let newObject = JSOG.parse(target);
            setConferenceQue(newObject["conferenceData"]);
            setConference(newObject["conferenceData"]);
          
        } catch (error) {
           
        }
        setIsTrue(prevIsTrue =>false);
    }
    let switcher=()=>
    {
       
        setNewObject(true);
        setEdit(true);setIsTrue(true);props.setTarget(-1);
    }
    let toEdit = () => {
        if (!isTrue) {
          setEdit((prevEdit) => !prevEdit);
        }
      };
      
    let refresh=()=>{
        setConference([]);
        setConferenceQue([]);
        setEdit(true);
        setIsTrue(true);
        setCounter(0);
        getData();
        props.setTarget(-1);
    }
    useEffect(() => {
        if(newObject){setNewObject(false);return;}
        getData();
      
        
    }, [props.id, props.count]);

    return (
        <div>
            <ConferenceMenu
                search={(e) => { Filtering(e); }}
                newConferenceOn={() => { switcher() }}
                newConferenceOff={() => { switcher()}}
                isOn={isTrue}
            />
            
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      
            {props.id!=-1 && <button onClick={() => {toEdit();}} className={(edit && props.id!=-1 ) ? 'btn btn-success mb-1' : 'btn btn-danger mb-1'}>ToChangeMode</button>}
              </div>      

            {(edit && isTrue && props.id==-1) && <Conference 
                 content={""}  people={props.people}
                    link={""} id={-1} toList={false}   ofTitle={false}
                        title={conference.title} dateOfConference={""} oldSuggestions={[]}
                  edit={edit} isNew={true} images={[]}  activelyGoing={false}
                     refresh={()=>{refresh();}} location={""} dissedents={""}
            />
            }
            {(props.id!=-1  && recycle===false) && (conferenceQue.map((conference) => {
                    if(props.id===conference.id){return (
                        <Conference 
                         ofTitle={false}
                        title={conference.title}
                        content={conference.content}  location={conference.location} dissedents={conference.dissedents}
                        link={conference.link}
                        id={conference.id}  activelyGoing={conference.activelyGoing}
                        toList={true}
                        key={conference.id}
                        refresh={()=>{refresh();}}
                        edit={edit}
                        dateOfConference={conference.dateOfConference}
                        target={(s) => {
                            targetLaunch(s);
                        }}
                       
                        images={conference.images}
                        people={props.people}
                        oldSuggestions={conference.people}
                        />
                    );}
                }))}
            {(conferenceQue.length > 0 && !isTrue && (props.id===-1 || recycle===true)) && (conference.map((conference) => {
                return (
                    <Conference 
                        ofTitle={true}
                        title={conference.title} location={conference.location} dissedents={conference.dissedents}
                        content={conference.content}
                        link={conference.link}
                    id={conference.id} activelyGoing={conference.activelyGoing}
                        toList={false}
                        key={conference.id}
                        refresh={()=>{refresh();}}
                        edit={edit}
                        dateOfConference={conference.dateOfConference}
                        target={(s) => {
                            targetLaunch(s);
                        }}
                        images={conference.images}
                        people={props.people}
                        oldSuggestions={conference.people}
                    />
                );
            }))}


           
               
        </div>
    );
}

export default ConferenceContainer;