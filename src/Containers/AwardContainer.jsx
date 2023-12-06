import React,{ useEffect, useState } from "react";
import axios from 'axios';
import JSOG from "jsog";
import { Award } from "../Models/Award";
import AwardMenu from "../Menus/AwardMenu";
//container for awards
function AwardContainer(props){
    let [award, setAward] = useState([]);
    let [awardQue, setAwardQue] = useState([]);
    let [edit, setEdit] = useState(true);
    let [counter, setCounter] = useState(0);
    let [isTrue, setIsTrue] = useState(true);let [newObject,setNewObject]=useState(false);
    const [recycle , setRecycle] = useState(false);
//to filter container objects based on menu criteria and all objects matching them.
   
    const Filtering = (e) => {
        
   
    setRecycle(true);
    setEdit(false);
    setIsTrue(false);

        const { name, keywords, dateTo, dateFrom } = e;
    
        const filteredList = award.filter(awardT => {
            const dateTarget = awardT.dateOfAward ? new Date(awardT.dateOfAward) : null;
            const hasValidTitle = !name || awardT.title.includes(name) && name.trim().length > 0;
            const hasValidContent = !keywords || awardT.content.includes(keywords) && keywords.trim().length > 0;
            const hasValidKeywords = !keywords || awardT.publication.includes(keywords) && keywords.trim().length > 0;
            
            const isDateInRange = (!dateFrom || !dateTarget || new Date(dateTarget) >= new Date(dateFrom)) &&
                                  (!dateTo || !dateTarget || new Date(dateTarget) <= new Date(dateTo));
    
            return   hasValidTitle && (hasValidKeywords || hasValidContent) && isDateInRange;
        });
    
        setAwardQue(filteredList);
        props.setTarget(-1);
    };
    
//to update on possible list of awards to view.
    let targetLaunch = (e) => {
            
        let newAward = [];   
        for(let award of awardQue){
            if(award.id === e){
                newAward.push(award);               
            }
        }
        setAwardQue(newAward);
        props.setTarget(e);
    }
//to get all award objects.
    let getData = async () => {if(newObject){setNewObject(false);return;}setRecycle(false); setEdit(false);
        let path = 'http://localhost:8080/award/all';
        try {
            let res = await axios.get(path);
            let target = JSOG.stringify(res.data);
            let newObject = JSOG.parse(target);
            setAwardQue(newObject["awardData"]);
            setAward(newObject["awardData"]);
          
        } catch (error) {
           
        }
        setIsTrue(prevIsTrue => false);
    }
    let switcher=()=>
    {
       
        setNewObject(true);
        setEdit(true);setIsTrue(true);props.setTarget(-1);
    }
    //to switch on and off of edit mode.
    let toEdit =()=>{if(!isTrue)setEdit(!edit);}
    //refresh to get all objects shown on read mode default setting.
    let refresh=()=>{
        setAward([]);
        setAwardQue([]);
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
            <AwardMenu
                search={(e) => { Filtering(e); }}
                newAwardOn={() => { switcher() }}
                newAwardOff={() => { switcher()}}
                isOn={isTrue}
            />
            
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      
            {props.id!=-1 && <button onClick={() => {toEdit();}} className={(edit && props.id!=-1 ) ? 'btn btn-success  mb-1' : 'btn btn-danger  mb-1'}>ToChangeMode</button>}
              </div>    

            {(edit && isTrue && props.id==-1) && <Award 
                 content={""}  people={props.people}
                    publication={""} id={-1} toList={false}   ofTitle={false}
                        title={award.title} dateOfAward={""} oldSuggestions={[]}
                  edit={edit} isNew={true} images={[]} 
                     refresh={()=>{refresh();}}
            />
            }
            {(props.id!=-1  && recycle===false) && (awardQue.map((award) => {
                    if(props.id===award.id){return (
                        <Award 
                         ofTitle={false}
                        title={award.title}
                        content={award.content}
                        publication={award.publication}
                        id={award.id}
                        toList={true}
                        key={award.id}
                        refresh={()=>{refresh();}}
                        edit={edit}
                        dateOfAward={award.dateOfAward}
                        target={(s) => {
                            targetLaunch(s);
                        }}
                       
                        images={award.images}
                        people={props.people}
                        oldSuggestions={award.people}
                        />
                    );}
                }))}
            {(awardQue.length > 0 && !isTrue && (props.id===-1  || recycle===true)) && (award.map((award) => {
                return (
                    <Award 
                        ofTitle={true}
                        title={award.title}
                        content={award.content}
                        publication={award.publication}
                        id={award.id}
                        toList={false}
                        key={award.id}
                        refresh={()=>{refresh();}}
                        edit={edit}
                        dateOfAward={award.dateOfAward}
                        target={(s) => {
                            targetLaunch(s);
                        }}
                        images={award.images}
                        people={props.people}
                        oldSuggestions={award.people}
                    />
                );
            }))}


           
               
        </div>
    );
}

export default AwardContainer;