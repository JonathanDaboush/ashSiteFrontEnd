import React, { useEffect,useState } from "react";

function AwardMenu(props) {
  let [name, setName] = useState("");
  let [keywords, setKeywords] = useState("");
  let [option,setOption]=useState(props.isOn);
  let [dateFrom, setDateFrom] = useState("");
  let [dateTo, setDateTo] = useState("");

  useEffect(() => {
    
}, [props.isOn]);

  let search = (event) => {
    event.preventDefault();
try{
  let date1 = new Date(dateFrom).getTime();
let date2 = new Date(dateTo).getTime();
  if((date1<date2)||dateTo == "" ||dateFrom == ""){props.search({name:name, keywords:keywords ,dateFrom:dateFrom, dateTo:dateTo});}
  else{alert("dates are not chronologically ordered")} } 
  catch{}
  };
  let changeAvailability = () => {
    
  
    if (option===true) {
      props.newAwardOff();
    } else {
      props.newAwardOn();
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
          <label className="col-sm-6 col-form-label" htmlFor="DateFrom">
            Date From:
          </label>
          <div className="col-sm-6">
            <input
              type="date"
              className="form-control"
              id="DateFrom"
              name="DateFrom"
          
              onChange={(e)=>{let dateFrom=e.target.value;
                    setDateFrom(dateFrom);}}
              value={dateFrom} 
            />
          </div>
        </div>
          <div className="form-group row">
          <label className="col-sm-6 col-form-label" htmlFor="dateTo">
            date To:
          </label>
          <div className="col-sm-6">
            <input
              type="date"
              className="form-control"
              id="dateTo"
              name="dateTo"
          
              onChange={(e)=>{let value=e.target.value;
                    setDateTo(value);}}
              value={dateTo} 
            />
          </div>
        
        </div> <br></br>
        <div className="form-group row">
          <input type="submit" className="btn btn-success col-sm-6 " value="Search" />
          
          <button
            type="button"
            className="btn btn-primary col-sm-6 "
            onClick={() => {
              changeAvailability();
            }}
          >
            new Award
          </button>
        </div>
      </form>
     
    </div>
  );
}

export default AwardMenu;
