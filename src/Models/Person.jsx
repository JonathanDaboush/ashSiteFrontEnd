import React,{ useEffect, useState } from "react";
import axios from 'axios';
import Image from "./Image";
import { Button } from "semantic-ui-react";
import ImageSlider from "../Main/ImageSlider";


export function Person(props) {
  let [name, setName] = useState(props.name || "");
  let [description, setDescription] = useState(props.description || "");
  let [opinions, setOpinions] = useState(props.opinions || "");
  let [images, setImages] = useState(props.images || []);

  useEffect(() => {
   
  }, []);

  let submit = async (event) => {
    event.preventDefault();
    let path = "http://localhost:8080/person";
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
      .post(path, { id, name, description, opinions, images: imagesData })
      .then((res) => {
        // Handle success
        
        props.refresh();
      })
      .catch((error) => {
      });
  };
  

  let deletePerson = async () => {
    if (props.id) {
      await axios.delete(`http://localhost:8080/person/removeById/${props.id}`)
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
  

    if(props.title){
      return (
        <div onClick={() => {props.target(props.id)}} className="container mb-5  bg-black text-white" style={{ height: '60vh' }}>
          <div className="row">
            <div className="col-sm-3 fs-1 fw-bold">{name}</div>
            <div className="col-sm-9" style={{ height: '100%' }}>
              {(props.images != undefined && props.images.length > 0) && 
                <Image 
                  image={props.images[0].base64}  
                  name={""} 
                  description={""} 
                  edit={false} 
                  newImage={true}
                  title={true}
                  style={{ maxHeight: '100%', width: '100%', objectFit: 'cover' }}
                />
              }
            </div>
          </div>
        </div>
      );
      
      
    }
    else if(props.edit==false){
      return ( <div id="content"  className=" fs-2  p-2    bg-black text-white">
        <div><ImageSlider images={props.images||[]} ReadStatus={true} save={(e)=>{setImages(e)}} edit={props.edit}/>
          
          <div>
            <label htmlFor="name"></label>
            <p id="name"  style={{ whiteSpace: 'pre-line' }}>{name}</p>
          </div>
          <div>
            <label htmlFor="description"></label>
            <p id="description"  style={{ whiteSpace: 'pre-line' }}>{description}</p>
          </div>
          <div>
            <label htmlFor="opinions"></label>
            <p id="opinions"  style={{ whiteSpace: 'pre-line' }}>{opinions}</p>
          </div>
        </div>
        <div>
        </div>
    </div>);
    
    }
  return (
    <div style={{ height: '100%', width: '75%', margin:'0 auto'}}  className=" fs-2  p-2   bg-black text-white">
 
   
          
              <ImageSlider images={images} save={(e)=>{setImages(e)}} edit={props.edit}/>
              <Image edit={props.edit} title={""} content={""} image={""} newImage={true} saveImage={(e)=>{addImage(e.image,e.description,e.name)}}/>    
      
         
      <form  className="mt-sm-2 mb-sm-4" onSubmit={submit} >
     
        <div className="form-group row">
          <label className="col-sm-2 col-form-label" htmlFor="name">Name:</label>
          <div className="col-sm-10">
            <input
              type="text"
              id="name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}  
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-2 col-form-label" htmlFor="description">Description:</label>
          <div className="col-sm-10">
          <textarea  style={{ whiteSpace: 'pre-line' }}
              id="description"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}  
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-2 col-form-label" htmlFor="opinions">Opinions:</label>
          <div className="col-sm-10">
          <textarea  style={{ whiteSpace: 'pre-line' }}
              id="opinions"
              className="form-control"
              value={opinions}
              onChange={(e) => setOpinions(e.target.value)} 
            />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-10 offset-sm-2">
            
            {props.id && <Button onClick={deletePerson}>Delete</Button>}
          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-10 offset-sm-2">
    
           
         
          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-10 offset-sm-2">
            <input type="submit" className="btn btn-success" value="Save" />
          </div>
        </div>

      </form>
    </div>
  );
}
