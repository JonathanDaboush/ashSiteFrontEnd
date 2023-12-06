import React, { useEffect,useState } from "react";

function PodCastMenu(props) {
  let [name, setName] = useState("");
  let [keywords, setKeywords] = useState("");
  let [option,setOption]=useState(props.isOn);
  

  useEffect(() => {
    
}, [props.isOn]);

  let search = (event) => {
    event.preventDefault();
props.search({name:name, keywords:keywords });
  };
  let changeAvailability = () => {
    
  
    if (option===true) {
      props.newPodCastOff();
    } else {
      props.newPodCastOn();
    }
    
  }
  return (
    <div  className=" fs-2  p-2  ">
      <form className="container bg-warning mt-3 mb-2" onSubmit={search}><br></br>
        <div className="form-group row">
          <label className="col-sm-6 col-form-label" htmlFor="name">
            Name:
          </label>
          <div className="col-sm-6">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
          
              onChange={(e)=>{let value=e.target.value;
                    setName(value);}}
              value={name} 
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-6 col-form-label" htmlFor="keywords">
            Keywords:
          </label>
          <div className="col-sm-6">
            <textarea
              className="form-control"
              id="keyword"
              name="keyword"
            
              onChange={(e)=>{let value=e.target.value;
                    setKeywords(value);}}
              value={keywords} 
            />
          </div>
        </div>

      
        <br></br>
    
       
        <div className="form-group row">
          <input type="submit" className="btn btn-success col-sm-6 " value="Search" />
          
          <button
            type="button"
            className="btn btn-primary col-sm-6 "
            onClick={() => {
              changeAvailability();
            }}
          >
            new Pod Cast
          </button>
        </div>
      </form>
     
    </div>
  );
}

export default PodCastMenu;
