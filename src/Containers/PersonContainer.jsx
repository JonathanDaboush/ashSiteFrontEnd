import React,{ useEffect, useState } from "react";
import axios from 'axios';
import JSOG from "jsog";
import { Person } from "../Models/Person";
import PersonMenu from "../Menus/PersonMenu";
//container for people objects.
function PersonContainer(props){
    const [persons, setPersons] = useState([]);
    const [name, setName] = useState("");
    const [keywords, setKeywords] = useState("");
    const [PersonQue, setPersonQue] = useState([]);
    const [edit, setEdit] = useState(true);
    const [counter, setCounter] = useState(0);
    const [ofTitle, setOfTitle] = useState(true);
    const [isTrue, setIsTrue] = useState(false);
    const [recycle , setRecycle] = useState(false);
    let [newObject,setNewObject]=useState(false);
    //refresh to get all objects shown on read mode default setting.
    let refresh=()=>{
        setPersons([]);
        setName("");
        setKeywords("");
        setPersonQue([]);setCounter(0);
        setEdit(true);
        
        setOfTitle(true);
       
        setIsTrue(false);
        getData();
        props.setTarget(-1);
    } //to filter container objects based on menu criteria and all objects matching them.
    const filter = (name, keywords) => {
        const newPersons = persons.filter((person) => {
            const nameCondition = name.trim() === '' || person.name.toLowerCase().includes(name.toLowerCase());
            const keywordsCondition =
                keywords.trim() === '' ||
                person.opinions.toLowerCase().includes(keywords.toLowerCase()) ||
                person.description.toLowerCase().includes(keywords.toLowerCase());
    
            return nameCondition && keywordsCondition;
        });
    
        setPersonQue(newPersons);
    };
    
    //to filter container objects based on menu criteria and all objects matching them.
    const Filtering = (e) => {
        props.setTarget(-1);
        setNewObject(false);
        setRecycle(true);
        setEdit(false);
        setOfTitle(true);
        setIsTrue(false);
    
        setName(e.name);
        setKeywords(e.keywords);
    
        filter(e.name, e.keywords);
    };
 //to set up new adjusted list of objects.
    const targetLaunch = (e) => {
        setPersons([]);    
        const newPersons = [];   
        for(const person of PersonQue){
            if(person.id === e){
                newPersons.push(person);
                setOfTitle(false);
            }
        }
        setPersonQue(newPersons);
        props.setTarget(e);
       
    }
    //this code is where id does not show.
    const getData = async () => {
    if(newObject){setNewObject(false);return;}
        const path = 'http://localhost:8080/person/all';
        setRecycle(false);
        setEdit(false);
        let value=[];
        try {
            const res = await axios.get(path);
            const target = JSOG.stringify(res.data);
            const newObject = JSOG.parse(target);
            setPersonQue(newObject["peopleData"]);
            setPersons(newObject["peopleData"]);
            console.log(newObject["peopleData"]);
            value=newObject["peopleData"];
        } catch (error) {
           
        }
        props.peopleUpdate(value);
        if(PersonQue.length > 0 && !isTrue && props.id===-1)
        {
            setEdit(false);
            setOfTitle(true);
        }
      if(isTrue){ setIsTrue(prevIsTrue => false);}
    }

    let switcher=()=>
    {
       
        setNewObject(true);
        setEdit(true);setIsTrue(true);props.setTarget(-1);
    }
    let toEdit =()=>
    {
        setEdit(!edit);
        if(recycle){
            setRecycle(!recycle);
        }
        let target=!edit;
        if(isTrue===true && target ===false)
        {refresh();}
    }
    useEffect(() => {
        getData();
      }, [props.id, props.count]);
    
      

    return (
        <div>
          <PersonMenu
                search={(e) => { Filtering(e); }}
                newPersonOn={() => { switcher(); }}
                newPersonOff={() => {switcher();  }}
            />
             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      
            {props.id!=-1 && <button onClick={() => {toEdit();}} className={(edit && props.id!=-1 ) ? 'btn btn-success  mb-1' : 'btn btn-danger  mb-1'}>ToChangeMode</button>}
              </div>  
            {(edit && isTrue && props.id==-1) && <div><Person name={""} description={""} 
                    opinions={""} id={-1} title={false} refresh={()=>{refresh();}}
                    upCounter={() => {setCounter(counter + 1)}} edit={edit} toSwitch={true}
                        
                    /></div>
            }
            {(props.id!=-1  && recycle===false) && (PersonQue.map((person) => {
                    if(props.id===person.id){return (
                            <div >
                                <Person
                                name={person.name}
                                description={person.description}
                                opinions={person.opinions}
                                id={person.id}
                                title={false}
                                key={person.id}
                                edit={edit}
                                refresh={() => { refresh(); }}
                                target={(s) => { targetLaunch(s); }}
                                images={person.images}
                                />
                            </div>
                            );
                        }
                }))}
            {(PersonQue.length > 0 && !isTrue && (props.id===-1 || recycle===true)) && (PersonQue.map((person) => {
                return (
                    <Person name={person.name} description={person.description} 
                        opinions={person.opinions} id={person.id}  title={ofTitle}  key={person.id}
                       edit={false} refresh={()=>{refresh();}}
                    target={(s) => {targetLaunch(s)}}  images={person.images}
                    />
                );
            }))}
        </div>
    );
}

export default PersonContainer;