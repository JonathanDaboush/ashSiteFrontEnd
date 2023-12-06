import React,{ useEffect, useState } from "react";
import axios from 'axios';
import JSOG from "jsog";
import { Article } from "../Models/Article";
import ArticleMenu from "../Menus/ArticleMenu";

function ArticleContainer(props){
    let [article, setArticle] = useState([]);
    let [articleQue, setArticleQue] = useState([]);
    let [edit, setEdit] = useState(true);
    let [counter, setCounter] = useState(0);
    let [isTrue, setIsTrue] = useState(true);
    let [newObject,setNewObject]=useState(false);
    const [recycle , setRecycle] = useState(false);

   
    const Filtering = (e) => {
        props.setTarget(-1); 
   
    setRecycle(true);
    setEdit(false);
    setIsTrue(false);

        const { name, keywords, dateTo, dateFrom } = e;
    
        const filteredList = article.filter(articleT => {
            const dateTarget = articleT.dateOfArticle ? new Date(articleT.dateOfArticle) : null;
            const hasValidTitle = !name || articleT.title.includes(name) && name.trim().length > 0;
            const hasValidContent = !keywords || articleT.content.includes(keywords) && keywords.trim().length > 0;
            const hasValidKeywords = !keywords || articleT.publication.includes(keywords) && keywords.trim().length > 0;
            
            const isDateInRange = (!dateFrom || !dateTarget || new Date(dateTarget) >= new Date(dateFrom)) &&
                                  (!dateTo || !dateTarget || new Date(dateTarget) <= new Date(dateTo));
    
            return   hasValidTitle && (hasValidKeywords || hasValidContent) && isDateInRange;
        });
    
        setArticleQue(filteredList);
        
    };
    

    let targetLaunch = (e) => {
            
        let newArticle = [];   
        for(let article of articleQue){
            if(article.id === e){
                newArticle.push(article);               
            }
        }
        setArticleQue(newArticle);
        props.setTarget(e);
    }

    let getData = async () => {
        if(newObject){setNewObject(false);return;}
        setRecycle(false);  setEdit(false);
        let path = 'http://localhost:8080/article/all';
        try {
            let res = await axios.get(path);
            let target = JSOG.stringify(res.data);
            let newObject = JSOG.parse(target);
            setArticleQue(newObject["articleData"]);
            setArticle(newObject["articleData"]);
          
        } catch (error) {
           
        }
        setIsTrue(prevIsTrue => false);
    }
    let switcher=()=>
    {
        props.setTarget(-1);
        setNewObject(true);
        setEdit(true);
        setIsTrue(true);
    }
    let toEdit =()=>{if(!isTrue)setEdit(!edit);}
    let refresh=()=>{
        setArticle([]);
        setArticleQue([]);
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
        <div style={{ minHeight: '100%' }}>
            <ArticleMenu
                search={(e) => { Filtering(e); }}
                newArticleOn={() => { switcher() }}
                newArticleOff={() => { switcher()}}
                isOn={isTrue}
            />
            
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      
            {props.id!=-1 && <button onClick={() => {toEdit();}} className={(edit && props.id!=-1 ) ? 'btn btn-success  mb-1' : 'btn btn-danger  mb-1'}>ToChangeMode</button>}
        </div>     

            {(edit && isTrue && props.id==-1) && <Article 
                 content={""}  people={props.people}
                    publication={""} id={-1} toList={false}   ofTitle={false}
                        title={article.title} dateOfArticle={""} oldSuggestions={[]}
                  edit={edit} isNew={true} images={[]} 
                     refresh={()=>{refresh();}}
            />
            }
            {(props.id!=-1  && recycle===false) && (articleQue.map((article) => {
                    if(props.id===article.id){return (
                        <Article 
                         ofTitle={false}
                        title={article.title}
                        content={article.content}
                        publication={article.publication}
                        id={article.id}
                        toList={true}
                        key={article.id}
                        refresh={()=>{refresh();}}
                        edit={edit}
                        dateOfArticle={article.dateOfArticle}
                        target={(s) => {
                            targetLaunch(s);
                        }}
                       
                        images={article.images}
                        people={props.people}
                        oldSuggestions={article.people}
                        />
                    );}
                }))}
            {(articleQue.length > 0 && !isTrue && (props.id===-1  || recycle===true)) && (article.map((article) => {
                return (
                    <Article 
                        ofTitle={true}
                        title={article.title}
                        content={article.content}
                        publication={article.publication}
                        id={article.id}
                        toList={false}
                        key={article.id}
                        refresh={()=>{refresh();}}
                        edit={edit}
                        dateOfArticle={article.dateOfArticle}
                        target={(s) => {
                            targetLaunch(s);
                        }}
                        images={article.images}
                        people={props.people}
                        oldSuggestions={article.people}
                    />
                );
            }))}


           
               
        </div>
    );
}

export default ArticleContainer;