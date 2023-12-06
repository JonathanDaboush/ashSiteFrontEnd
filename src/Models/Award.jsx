import React,{ useEffect, useState } from "react";
import axios from 'axios';
import Image from "./Image";
import { Button } from "semantic-ui-react";
import ImageSlider from "../Main/ImageSlider";
import PersonInserter from "../Main/PersonInserter";


export function Award(props) {
  let [title, setTitle] = useState(props.title || "");
  let [content, setContent] = useState(props.content || "");
  let [publication, setPublication] = useState(props.publication || "");
  let [dateOfAward, setDateOfAward] = useState(props.dateOfAward || "");
  let [images, setImages] = useState(props.images || []);
  let [people,setPeople]=useState(props.oldSuggestions || []);
  useEffect(() => {
   
  }, []);

  let submit = async (event) => {
    event.preventDefault();
    let path = "http://localhost:8080/award";
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
      .post(path, { id, title, content, publication,dateOfAward,people:people, images: imagesData })
      .then((res) => {
        // Handle success
       
        props.refresh();
      })
      .catch((error) => {
      });
      

  };
  

  let deleteAward = async () => {
    if (props.id) {
      await axios.delete(`http://localhost:8080/award/removeById/${props.id}`)
        .then(() => {
        
          props.refresh();
        })
        .catch((error) => {
        });
    }
    
  };

  let addImage = async(image, content, name) => {
    // Create a new array with the existing images and the new image
    let newImages = [...images, { id: -1, name: name, content: content, base64: image }];
    // Update the state with the new array
    setImages(newImages, () => {
      console.log(images); // This will log the updated state after it's updated
    });

  };
  let getNewList=(e)=>{
    setPeople(e);
  }

    if(props.ofTitle){
      return ( <div onClick={() => {props.target(props.id)}} className="p-2 container mb-5 bg-black text-white" style={{ height: '60vh' }}>
      <div className="row">
        <div className="col-sm-3  fs-1 fw-bold">{title}</div>
            <div className="col-sm-9" style={{ height: '100%' }}>
        {(props.images != undefined && props.images.length>0) && <Image  title={true}
                  style={{ maxHeight: '100%', width: '100%', objectFit: 'cover' }} image={props.images[0].base64}  name={""} description={""} edit={false} newImage={true}  />}
      
      </div>
          </div>
        </div>);
    }
    else if(props.edit==false){
      return ( <div id="content"  className=" fs-2  p-2     bg-black text-white">
        <div>
        <ImageSlider images={props.images||[]} ReadStatus={true} save={(e)=>{setImages(e)}} edit={props.edit}/>
          <PersonInserter  people={props.people}  oldSuggestions={people}  updatePeople={(e)=>{setPeople(e)}} edit={props.edit}/>
        
        </div><div>
          <div>
            <label htmlFor="title"></label>
            <p id="title">{title}</p>
          </div>
          <div>
            <label htmlFor="content"></label>
            <p id="content"  style={{ whiteSpace: 'pre-line' }}>{content}</p>
          </div>
          <div>
            <label htmlFor="publication"></label>
            <p id="publication"  style={{ whiteSpace: 'pre-line' }}>{publication}</p>
          </div>
          <div>
            <label htmlFor="dateOfAward"></label>
            <p id="dateOfAward">{dateOfAward}</p>
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
          <label className="col-sm-2 col-form-label" htmlFor="content">content:</label>
          <div className="col-sm-10">
          <textarea  style={{ whiteSpace: 'pre-line' }}
              id="content"
              className="form-control"
              value={content}
              onChange={(e) => setContent(e.target.value)}  
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-2 col-form-label" htmlFor="dateOfAward">date Of award:</label>
          <div className="col-sm-10">
            <input type="date"
              id="dateOfAward"
              className="form-control"
              value={dateOfAward}
              onChange={(e) => setDateOfAward(e.target.value)} 
              required
            />
          </div>

        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label" htmlFor="publication">publication:</label>
          <div className="col-sm-10">
          <textarea  style={{ whiteSpace: 'pre-line' }}
              id="publication"
              className="form-control"
              value={publication}
              onChange={(e) => setPublication(e.target.value)} 
            />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-10 offset-sm-2">
            
            {props.id && <Button onClick={deleteAward}>Delete</Button>}
          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-10 offset-sm-2">
    
           
         
          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-10 offset-sm-2">
            <input type="submit" className="btn btn-success" value="Save award" />
          </div>
        </div>

      </form>
    </div>
  );
}
