import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom/client';
import Image from "../Models/Image";

function ImageSlider(props){
  let [images, setImages] = useState(props.images);
  let [counter,setCounter]=useState(0);
  let [fImage,setFImage]=useState([]);
let [newImage,setNewImage]=useState(false);

  const focusSlides = () => {
   let updatedImage = props.images;
    if(updatedImage==undefined){
      setImages([]);
    }
    else{
        let thisList=props.images;
        let newSlides = [];
        for (let i = 0; i < thisList.length; i++) {
          if (counter >= 0 && counter < thisList.length && Math.abs(i - counter) <= 2) {
            newSlides.push(thisList[i]);
          }
        }
        setFImage(newSlides);
        setImages(props.images);
    }
   
    
  };

  useEffect(() => {
   
      focusSlides();
      if(props.ReadStatus){
          setNewImage(true);
      }
      else{
        setNewImage(false);
      }
  }, [props.images, counter]);
  

  let deleteImage = async (number) => {
    if(number!=0){
    if(counter===number ){setCounter(number-1)}
    if(number===images.length-1 ){
      let newImages = [...images]; // Create a new copy of the images array
      newImages.pop();
      setImages(newImages);
      props.save(newImages);}
    }
    else{
    let newImages = [...images]; // Create a new copy of the images array
    newImages.splice(number, 1);
    setImages(newImages);
    props.save(newImages);}
  };

  let saveImage = (image, description, name) => {

    
      let newImage = { name: name, description: description, base64: image, id: images[counter].id };
      let newImages = [...images]; // Create a new copy of the images array
      newImages[counter] = newImage;
      setImages(newImages);
      focusSlides();
    };

      
  let step=(value)=>{
      if(value<images.length && value>=0){
        setCounter(value);
        
        focusSlides();
      }
        
    }

    return (
      <div className="container" style={{
        width: '100%',
        margin: '0 auto',
        // Add other styles as needed
      }}>
        <div className="row imageSlider">
          <div className="col-sm-2">
            <button
              onClick={() => { step(counter - 1) }}
              className="btn btn-dark w-100 h-100"
            >
              &lt;
            </button>
          </div>
    
          {(images !== undefined && images.length !== 0) && (
            <div className="col-sm-8">
              <Image
                slider={true}
                edit={props.edit}
                name={images[counter].name || ""}
                description={images[counter].description || ""}
                image={images[counter].base64 || ""}
                id={counter}
                delete={(e) => { deleteImage(e) }}
                save={(e) => { saveImage(e.image, e.description, e.name) }}
                newImage={newImage}
                
              />
            </div>
          )}
    
          <div className="col-sm-2">
            <button
              onClick={() => { step(counter + 1) }}
              className="btn btn-dark w-100 h-100"
            >
              &gt;
            </button>
          </div>
        </div>
        <div className="row imageSlider">
          {images !== undefined && images.length > 1 ? (
            fImage.map((image, i) => (
              <div key={i} className="col-4">
                <a onClick={() => step(i)}>
                  <img src={`data:image/jpeg;base64,${image.base64}`} alt={image.name} className="img-fluid h-100" />
                </a>
              </div>
            ))
          ) : <></>}
        </div>
      </div>
    );
    
    
    
      
}
export default ImageSlider;