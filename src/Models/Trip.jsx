import React,{ useEffect, useState } from "react";
import axios from 'axios';
import Image from "./Image";
import { Button } from "semantic-ui-react";
import ImageSlider from "../Main/ImageSlider";
import PersonInserter from "../Main/PersonInserter";


export function Trip(props) {
  let [title, setTitle] = useState(props.title || "");
  let [description, setdescription] = useState(props.description || "");
  let [location, setlocation] = useState(props.location || "");
  let [dateOf, setDateOf] = useState(props.dateOf || "");
  let [dateTo, setDateTo] = useState(props.dateTo || "");
  let [images, setImages] = useState(props.images || []);
  let [people,setPeople]=useState(props.oldSuggestions || []);
  useEffect(() => {
   
  }, []);

  let submit = async (event) => {
    event.preventDefault();
    let path = "http://localhost:8080/trip";
    let id = props.id;
  
    let imagesData = await Promise.all(images.map(async (image) => {
      if (image.image instanceof File) {
        // Convert File to base64
        const base64Image = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result.split(",")[1]);
          reader.onerror = reject;
          reader.readAsDataURL(image.image);
        });
        
        return {
          
          name: image.name,
          description: image.description,
          base64: base64Image,
          id:image.id
        };
      }
      
      // If image.image is not a File object, assume it's already a base64 string
      return {
        name: image.name,
        description: image.description,
        base64: image.base64,
        id:image.id
      };
    }));
  
    await axios
      .post(path, { id, title, description, location,dateOf,dateTo,people:people, images: imagesData })
      .then((res) => {
        // Handle success
       
        props.refresh();
      })
      .catch((error) => {
      });
      

  };
  

  let deleteTrip = async () => {
    if (props.id) {
      await axios.delete(`http://localhost:8080/trip/removeById/${props.id}`)
        .then(() => {
        
          props.refresh();
        })
        .catch((error) => {
        });
    }
    
  };

  let addImage = async(image, description, name) => {
    // Create a new array with the existing images and the new image
    let newImages = [...images, { id: -1, name: name, description: description, base64: image }];
    // Update the state with the new array
    setImages(newImages, () => {
      console.log(images); // This will log the updated state after it's updated
    });

  };
  let getNewList=(e)=>{
    setPeople(e);
  }

    if(props.ofTitle){
      return ( <div onClick={() => {props.target(props.id)}} className=" p-2 container mb-5  bg-black text-white" style={{ height: '60vh' }}>
      <div className="row">
        <div className="col-sm-3  fs-1 fw-bold">{title}</div>
            <div className="col-sm-9" style={{ height: '100%' }}>
        {(props.images != undefined && props.images.length>0) && <Image image={props.images[0].base64}  name={""} description={""} edit={false} newImage={true}   title={true}
                  style={{ maxHeight: '100%', width: '100%', objectFit: 'cover' }}/>}

        
</div>
          </div>
        </div>);
    }
    else if(props.edit==false){
      return ( <div id="description" className="  fs-2  p-2     bg-black text-white">
        <div>
        <ImageSlider images={props.images||[]} ReadStatus={true} save={(e)=>{setImages(e)}} edit={props.edit}/>
           <PersonInserter  people={props.people}  oldSuggestions={people}  updatePeople={(e)=>{setPeople(e)}} edit={props.edit}/>
        
        </div><div>
          <div>
            <label htmlFor="title"></label>
            <p id="title">{title}</p>
          </div>
          <div>
            <label htmlFor="description"></label>
            <p id="description"  style={{ whiteSpace: 'pre-line' }}>{description}</p>
          </div>
          <div>
            <label htmlFor="location"></label>
            <p id="location"  style={{ whiteSpace: 'pre-line' }}>{location}</p>
          </div>
          <div>
            <label htmlFor="dateOf"></label>
            <p id="dateOf">{dateOf}</p>
          </div>
          <div>
            <label htmlFor="dateTo"></label>
            <p id="dateTo">{dateTo}</p>
          </div>
        </div>
       
    </div>);
    
    }
  return (
    <div  className=" bg-black text-white  fs-2  p-2    ">
         <PersonInserter people={props.people} oldSuggestions={people} updatePeople={(e)=>{getNewList(e)}} edit={props.edit}/>
         <ImageSlider images={images} save={(e)=>{setImages(e)}} edit={props.edit}/>
              <Image edit={props.edit} title={""} content={""} image={""} newImage={true}  saveImage={(e)=>{addImage(e.image,e.description,e.name)}}/>    
       <form  className=" border border-primary mt-sm-2 mb-sm-4" onSubmit={submit} >
     
        <div className="form-group row">
          <label className="col-sm-2 col-form-label" htmlFor="title">title:</label>
          <div className="col-sm-10">
            <input
              type="text"
              id="title"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)} 
              required 
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-2 col-form-label" htmlFor="description">description:</label>
          <div className="col-sm-10">
          <textarea  style={{ whiteSpace: 'pre-line' }}
              id="description"
              className="form-control"
              value={description}
              onChange={(e) => setdescription(e.target.value)}  
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-2 col-form-label" htmlFor="dateOf">date Of:</label>
          <div className="col-sm-10">
            <input type="date"
              id="dateOf"
              className="form-control"
              value={dateOf}
              onChange={(e) => setDateOf(e.target.value)} 
              required
            />
          </div>

        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label" htmlFor="dateTo">date To:</label>
          <div className="col-sm-10">
            <input type="date"
              id="dateTo"
              className="form-control"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)} 
              required
            />
          </div>

        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label" htmlFor="location">location:</label>
          <div className="col-sm-10">
          <textarea  style={{ whiteSpace: 'pre-line' }}
              id="location"
              className="form-control"
              value={location}
              onChange={(e) => setlocation(e.target.value)} 
            />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-10 offset-sm-2">
            
            {props.id && <Button onClick={deleteTrip}>Delete</Button>}
          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-10 offset-sm-2">
    
           
         
          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-10 offset-sm-2">
            <input type="submit" className="btn btn-success" value="Save trip" />
          </div>
        </div>

      </form>
    </div>
  );
}
