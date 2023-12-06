import React,{ useEffect, useState } from "react";
import axios from 'axios';
import JSOG from "jsog";
import { PodCast } from "../Models/Podcast";
import PodCastMenu from "../Menus/PodCastMenu";

function PodCastContainer(props){
    let [podCast, setPodCast] = useState([]);
    let [podCastQue, setPodCastQue] = useState([]);let [newObject,setNewObject]=useState(false);
    let [edit, setEdit] = useState(true);
    let [counter, setCounter] = useState(0);
    let [isTrue, setIsTrue] = useState(true);
    const [recycle , setRecycle] = useState(false);

   
    const Filtering = (e) => {
        
  
    setRecycle(true);
    setEdit(false);
    setIsTrue(false);

        const { name, keywords } = e;
    
        const filteredList = podCast.filter(podCastT => {
            const hasValidTitle = !name || podCastT.title.includes(name) && name.trim().length > 0;
            const hasValidDescription = !keywords || podCastT.description.includes(keywords) && keywords.trim().length > 0;
            const hasValidLink = !keywords || podCastT.link.includes(keywords) && keywords.trim().length > 0;
            
         
            return   hasValidTitle && (hasValidLink || hasValidDescription);
        });
    
        setPodCastQue(filteredList);
        props.setTarget(-1);
    };
    

    let targetLaunch = (e) => {
            
        let newPodCast = [];   
        for(let podCast of podCastQue){
            if(podCast.id === e){
                newPodCast.push(podCast);               
            }
        }
        setPodCastQue(newPodCast);
        props.setTarget(e);
    }

    let getData = async () => {if(newObject){setNewObject(false);return;} setRecycle(false); setEdit(false);
        setIsTrue(prevIsTrue => false);
        let path = 'http://localhost:8080/podcast/all';
        try {
            let res = await axios.get(path);
            let target = JSOG.stringify(res.data);
            let newObject = JSOG.parse(target);
            setPodCastQue(newObject["podcastData"]);
            setPodCast(newObject["podcastData"]);
          
        } catch (error) {
           
        }
    }
    let switcher=()=>
    {
       
        setNewObject(true);
        setEdit(true);setIsTrue(true);props.setTarget(-1);
    }
    let toEdit =()=>{if(!isTrue)setEdit(!edit);}
    let refresh=()=>{
        setPodCast([]);
        setPodCastQue([]);
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
            <PodCastMenu
                search={(e) => { Filtering(e); }}
                newPodCastOn={() => { switcher() }}
                newPodCastOff={() => { switcher()}}
                isOn={isTrue}
            />
            
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      
            {props.id!=-1 &&  <button onClick={() => {toEdit();}} className={(edit && props.id!=-1 ) ? 'btn btn-success  mb-1' : '  mb-1 btn btn-danger'}>ToChangeMode</button>}
              </div>    

            {(edit && isTrue && props.id==-1) && <PodCast 
                 description={""}  people={props.people}
                    link={""} id={-1} toList={false}   ofTitle={false}
                        title={podCast.title}  oldSuggestions={[]}
                  edit={edit} isNew={true} images={[]} 
                     refresh={()=>{refresh();}}
            />
            }
            {(props.id!=-1  && recycle===false) && (podCastQue.map((podCast) => {
                    if(props.id===podCast.id){return (
                        <PodCast 
                         ofTitle={false}
                        title={podCast.title}
                        description={podCast.description}
                        link={podCast.link}
                        id={podCast.id}
                        toList={true}
                        key={podCast.id}
                        refresh={()=>{refresh();}}
                        edit={edit}
                        target={(s) => {
                            targetLaunch(s);
                        }}
                       
                        images={podCast.images}
                        people={props.people}
                        oldSuggestions={podCast.people}
                        />
                    );}
                }))}
            {(podCastQue.length > 0 && !isTrue && (props.id===-1  || recycle===true)) && (podCast.map((podCast) => {
                return (
                    <PodCast 
                        ofTitle={true}
                        title={podCast.title}
                        description={podCast.description}
                        link={podCast.link}
                        id={podCast.id}
                        toList={false}
                        key={podCast.id}
                        refresh={()=>{refresh();}}
                        edit={edit}
                        target={(s) => {
                            targetLaunch(s);
                        }}
                        images={podCast.images}
                        people={props.people}
                        oldSuggestions={podCast.people}
                    />
                );
            }))}


           
               
        </div>
    );
}

export default PodCastContainer;