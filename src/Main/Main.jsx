import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import PersonContainer from "../Containers/PersonContainer";
import Link from "./Link";
import AnalysisContainer from "../Containers/AnalysisContainer";
import ArticleContainer from "../Containers/ArticleConntainer";
import AwardContainer from "../Containers/AwardContainer";
import ConferenceContainer from "../Containers/ConferenceContainer";
import PodCastContainer from "../Containers/PodCastContainer";
import TripContainer from "../Containers/TripContainer";
import AboutMe from "../Models/AboutMe"
//main component to navigate components based on desired object.
function Main(props) {
  let [category, setCategory] = useState("Person");
  let [id,setId]=useState(-1);
  let [count,setCount]=useState(0);
let [people,setPeople]=useState([]);
//to change category change.
  let handleCategoryChange = (e) => {
   
    if(e.category===undefined){
      
      setCategory(e);
    }
    else{
      setCategory(e.category);
    }
     
      setCount(count+1);
      
      if(e.id!==undefined){
        setId(e.id);
      }
      else{
        setId(-1);
      }
      
  };
//update people if new person is created via persons category.
let peopleUpdate=(e)=>{
  setPeople(e);
}
  useEffect(() => {
  }, []);



  return (
    <div
    style={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh", // Ensure the parent covers the entire viewport
    }}
  >
      <Menu CategoryCall={handleCategoryChange}/>
      <div  style={{
          flex: 1, // Allow the child container to expand and fill the available space
          display: "flex",
          flexDirection: "column",
        }} className="p-3">


        {category === "Person" && <PersonContainer id={id} count={count} peopleUpdate={(e)=>peopleUpdate(e)}  setTarget={(e)=>setId(e)}/>}
        {category==="Analysis"&&  <AnalysisContainer id={id}  count={count}  people={people} setTarget={(e)=>setId(e)} />}

        
        {category==="Article" &&  <ArticleContainer id={id}  count={count}  people={people} setTarget={(e)=>setId(e)} />}
        {category==="Award"&&  <AwardContainer id={id}  count={count}  people={people} setTarget={(e)=>setId(e)} />}
        {category==="Conferences"&&  <ConferenceContainer id={id}  count={count}  people={people} setTarget={(e)=>setId(e)} />}
        {category==="Podcast"&& <PodCastContainer id={id}  count={count}  people={people} setTarget={(e)=>setId(e)} />}
        {category==="Trip"&&  <TripContainer id={id}  count={count}  people={people} setTarget={(e)=>setId(e)} />}
        {category==="about"&&  <AboutMe />}
      </div>
    </div> 
   
  );
}

export default Main;
