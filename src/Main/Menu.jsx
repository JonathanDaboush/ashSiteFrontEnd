import React, { useEffect, useState } from "react";
//menu to change category of objects to see.
function Menu(props) {
  const [category, setCategory] = useState("Person");
//to change category.
  const changeCategory = (target) => {
    setCategory(target);
   
    props.CategoryCall(target); // Use 'target' directly
  };

  const handleLinkClick = (e, target) => {
    e.preventDefault(); // Prevent default anchor tag behavior
    changeCategory(target);
  };

  
  return (
    <div className="container-fluid pb-3 pt-2 text-light bg-dark" style={{width:'100%',margin: '0'}}>
      <div className="row">
        <div className="col bg-dark"></div>
        <div className="col-10 container">
  
          <div className="row">
            <div className="col-3 h1">Ashok Dutta</div>
  
            <div className="col d-flex flex-wrap">
              <button
                className="btn btn-dark btn-block custom-btn"
                onClick={(e) => handleLinkClick(e, "Person")}
              >
                People
              </button>
              <button
                className="btn btn-dark btn-block custom-btn"
                onClick={(e) => handleLinkClick(e, "Analysis")}
              >
                Analysis
              </button>
              <button
                className="btn btn-dark btn-block custom-btn"
                onClick={(e) => handleLinkClick(e, "Article")}
              >
                Articles
              </button>
              <button
                className="btn btn-dark btn-block custom-btn"
                onClick={(e) => handleLinkClick(e, "Award")}
              >
                Awards
              </button>
              <button
                className="btn btn-dark btn-block custom-btn"
                onClick={(e) => handleLinkClick(e, "Conferences")}
              >
                Conferences
              </button>
              
              <button
                className="btn btn-dark btn-block custom-btn"
                onClick={(e) => handleLinkClick(e, "Podcast")}
              >
                Podcasts
              </button>
              <button
                className="btn btn-dark btn-block custom-btn"
                onClick={(e) => handleLinkClick(e, "Trip")}
              >
                Trips
              </button>
              <button
                className="btn btn-dark btn-block custom-btn"
                onClick={(e) => handleLinkClick(e, "about")}
              >
                About Me
              </button>
            </div>
          </div>
  
          <div className="row">
            <div className="col"><hr className="my-4" /></div>
          </div>
  
        </div>
        <div className="col bg-dark"></div>
      </div>
    </div>
  );
  
  
  
  
}

export default Menu;

