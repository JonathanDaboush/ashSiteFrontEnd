import React, { useEffect,useState } from "react";

let AutoSuggest = (props) => {
  let [inputValue, setInputValue] = useState("");
  let [filteredSuggestions, setFilteredSuggestions] = useState([]);
  let [list,setList]=useState([]);
  let goThroughList = () => {
    let newList = [];
    props.oldSuggestions.forEach((person) => {
        newList.push(person.name); // Use push method to add elements to the array
    });
    setList(newList);
}

    useEffect(() => {
        goThroughList();
    }, [props.oldSuggestions]);

  let handleInputChange = (event) => {
    let input = event.target.value;
    setInputValue(input);
    let filtered = props.suggestions.filter(
      (suggestion) =>
        suggestion.name.toLowerCase().includes(input.toLowerCase()) && input !== ""
    );
    setFilteredSuggestions(filtered);
  };

  let handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setFilteredSuggestions([]);
    let newList=list;

    if(!newList.includes(suggestion)){newList.push(suggestion);}
    setList(newList);
  };
    let del=(name)=>{
        let newList=list.filter((item)=>item!=name);
        setList(newList);
    }

  return (
    <div className="auto-suggest">
   
      <input
      className="bg-dark text-white"
        type="text"
        value={inputValue}
        onChange={(e)=>handleInputChange(e)}
        placeholder="Type to search..."
      />
      <ul>
        {filteredSuggestions.map((suggestion, index) => (
          <li className="bg-dark text-white w-25" key={index} onClick={() => handleSuggestionClick(suggestion.name)}>
            {suggestion.name}
          </li>
        ))}
      </ul>

      <div>People Selected</div>
      <div>Click to remove.</div>
      <ul>
        {list.map((item,i)=>(<li key={i} className="bg-dark text-white w-25" onClick={() => del(item)}>{item}</li>))}
      </ul>
      <button  type="button" onClick={()=>props.updateList(list)}>Update List</button>
    </div>
  );
};

export default AutoSuggest;
