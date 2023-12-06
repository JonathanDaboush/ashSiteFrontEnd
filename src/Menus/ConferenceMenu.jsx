import React, { useEffect,useState } from "react";

function ConferenceMenu(props) {
  let [name, setName] = useState("");
  let [keywords, setKeywords] = useState("");
  let [option,setOption]=useState(props.isOn);
  let [dateFrom, setDateFrom] = useState("");
  let [dateTo, setDateTo] = useState("");
let [activlyGoing,setActivlyGoing] = useState(false);
  useEffect(() => {
    
}, [props.isOn]);

  let search = (event) => {
    event.preventDefault();


  let date1 = new Date(dateFrom).getTime();
let date2 = new Date(dateTo).getTime();
  if((date1<date2)||dateTo == "" ||dateFrom == ""){props.search({name:name, keywords:keywords ,dateFrom:dateFrom, dateTo:dateTo,going:activlyGoing});}
  else{alert("dates are not chronologically ordered")} 
  
};
  let changeAvailability = () => {
    
  
    if (option===true) {
      props.newConferenceOff();
    } else {
      props.newConferenceOn();
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
        
        </div>
        <div className="form-group row">
  <label className="col-sm-11 col-form-label" htmlFor="activlyGoing">
    Active:
  </label>
  <div className="col-sm-1">
    <input
      type="checkbox"
      id="activlyGoing"
      name="activlyGoing"
      checked={activlyGoing}
      onChange={(e) => {
        let value = e.target.checked;
        setActivlyGoing(value);
      }}
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
            new Conference
          </button>
        </div>
      </form>
      
    </div>
  );
}

export default ConferenceMenu;
