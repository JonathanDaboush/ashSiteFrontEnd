import React,{ useEffect, useState } from "react";
import axios from 'axios';
import JSOG from "jsog";
import { Analysis } from "../Models/Analysis";
import AnalysisMenu from "../Menus/AnalysisMenu";

function AnalysisContainer(props){
    let [analysis, setAnalysis] = useState([]);
    let [analysisQue, setAnalysisQue] = useState([]);
    let [edit, setEdit] = useState(true);
    let [counter, setCounter] = useState(0);
    let [isTrue, setIsTrue] = useState(false);
    const [recycle , setRecycle] = useState(false);
    let [newObject,setNewObject]=useState(false);
   
    const Filtering =  (e) => {
        props.setTarget(-1);
        setRecycle(true);
    setEdit(false);
    setIsTrue(false);
        const { name, keywords, dateTo, dateFrom } = e;
    
        const filteredList = analysis.filter(analysisT => {
            const dateTarget = analysisT.dateOfAnalysis ? new Date(analysisT.dateOfAnalysis) : null;
            const hasValidTitle = !name || analysisT.title.includes(name) && name.trim().length > 0;
            const hasValidContent = !keywords || analysisT.content.includes(keywords) && keywords.trim().length > 0;
            const hasValidKeywords = !keywords || analysisT.keyTakeaways.includes(keywords) && keywords.trim().length > 0;
            
            const isDateInRange = (!dateFrom || !dateTarget || new Date(dateTarget) >= new Date(dateFrom)) &&
                                  (!dateTo || !dateTarget || new Date(dateTarget) <= new Date(dateTo));
    
            return   hasValidTitle && (hasValidKeywords || hasValidContent) && isDateInRange;
        });
    
        setAnalysisQue(filteredList);
       
    };
    

    let targetLaunch = (e) => {
            
        let newAnalysis = [];   
        for(let analysis of analysisQue){
            if(analysis.id === e){
                newAnalysis.push(analysis);               
            }
        }
        setAnalysisQue(newAnalysis);
        props.setTarget(e);
    }

    let getData = async () => {
        
        if(newObject){setNewObject(false);return;}
    setRecycle(false); 
    setEdit(false);
        let path = 'http://localhost:8080/analysis/all';
        try {
            let res = await axios.get(path);
            let target = JSOG.stringify(res.data);
            let newObject = JSOG.parse(target);
            setAnalysisQue(newObject["analysisData"]);
            setAnalysis(newObject["analysisData"]);
          
        } catch (error) {
        }
        setIsTrue(prevIsTrue => false);

     
    }
    //fix switchers
    let switcher=()=>
    {
        props.setTarget(-1);
        setNewObject(true);
        setEdit(true);setIsTrue(true);
    }
let toEdit =()=>{if(!isTrue)setEdit(!edit);}

    let refresh=()=>{
        setAnalysis([]);
        setAnalysisQue([]);
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
            <AnalysisMenu
                search={(e) => { Filtering(e); }}
                newAnalysisOn={() => { switcher() }}
                newAnalysisOff={() => { switcher()}}
                isOn={isTrue}
            />
            
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      
           {props.id!=-1 &&  <button onClick={() => {toEdit();}} className={(edit && props.id!=-1 ) ? 'btn btn-success  mb-1' : 'btn btn-danger  mb-1'}>ToChangeMode</button>}
              </div>    

            {(edit && isTrue && props.id==-1) && <Analysis 
                 content={""}  people={props.people}
                    keyTakeaways={""} id={-1} toList={false}   ofTitle={false}
                        title={analysis.title} dateOfAnalysis={""} oldSuggestions={[]}
                  edit={edit} isNew={true} images={[]} 
                     refresh={()=>{refresh();}}
            />
            }
        
    

  
            {(props.id!=-1   && recycle===false) && (analysisQue.map((analysis) => {
                    if(props.id===analysis.id){return (
                        
                        <Analysis 
                         ofTitle={false}
                        title={analysis.title}
                        content={analysis.content}
                        keyTakeaways={analysis.keyTakeaways}
                        id={analysis.id}
                        toList={true}
                        key={analysis.id}
                        refresh={()=>{refresh();}}
                        edit={edit}
                        dateOfAnalysis={analysis.dateOfAnalysis}
                        target={(s) => {
                            targetLaunch(s);
                        }}
                       
                        images={analysis.images}
                        people={props.people}
                        oldSuggestions={analysis.people}
                        />
                    );}
                }))}
                
            {(analysisQue.length > 0 && !isTrue && (props.id===-1  || recycle===true)) && (analysis.map((analysis) => {
                return (
                    
                    <Analysis 
                        ofTitle={true}
                        title={analysis.title}
                        content={analysis.content}
                        keyTakeaways={analysis.keyTakeaways}
                        id={analysis.id}
                        toList={false}
                        key={analysis.id}
                        refresh={()=>{refresh();}}
                        edit={edit}
                        dateOfAnalysis={analysis.dateOfAnalysis}
                        target={(s) => {
                            targetLaunch(s);
                        }}
                        images={analysis.images}
                        people={props.people}
                        oldSuggestions={analysis.people}
                    />  
                );
            }))}
          



           
               
        </div>
    );
}

export default AnalysisContainer;