import React, { useEffect,useState } from "react";
import { Button } from "semantic-ui-react";

export function Image(props) {
  let [name, setName] = useState(props.name);
  let [description, setDescription] = useState(props.description);
  let [image, setImage] = useState(props.image);
  let [imageUrl, setImageUrl] = useState(null);
  let [oldName, setOldName] = useState(props.name);
  let [oldDescription, setOldDescription] = useState(props.description);
  let [oldImage, setOldImage] = useState(props.image);

  let reset = () => {


setName(oldName);
setDescription(oldDescription);
setImage(oldImage);
setImageUrl(oldImage);
  };


  let removeImage = () => {
    props.delete(props.id);
  };

  function changeImage(e) {
    let selectedFile = e.target.files[0];
  
    // Check if the selected file has a valid extension
    const validExtensions = [".png", ".jpg", ".jpeg"];
    const fileExtension = selectedFile.name.slice(((selectedFile.name.lastIndexOf(".") - 1) >>> 0) + 2);
    
    if (!validExtensions.includes(fileExtension.toLowerCase())) {
      // Invalid file extension, do nothing
      alert("Invalid file extension. Please select a valid image file.");
      return;
    }
  
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result.split(",")[1];
      setImage(base64Image);
      setImageUrl(base64Image);
    };
  
    reader.onerror = (error) => {
      console.error('Error reading the file:', error);
    };
  
    reader.readAsDataURL(selectedFile);
  }
  
  
  let filetoBase64 = async (file) => {
    try{
    if (props.image && props.image instanceof File) {
      // If the image is a File object, read it and set the data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      
      reader.readAsDataURL(props.image);
    } else {
      // If the image is not a File object, assume it's a URL and use it directly
      setImageUrl(props.image);
    }
    setImage(props.image);setName(props.name);setDescription(props.description);setImage(props.image);setOldName(props.name);setOldDescription(props.description);setOldImage(props.image);}
    catch(e){
      
    }
  }
  useEffect(() => {
    filetoBase64(props.image);
  }, [props.image]);

let submit=(e)=>{
  e.preventDefault();
  try{
  if(image!=""){
   let thisName=name;
   let thisDescription=description;
   let thisImage=image;
if(props.newImage===true){
    setImageUrl("");
    setImage("");
    setName("");
    setDescription("");
    setOldDescription("");
    setOldImage("");
    setOldName("");
   }
   props.saveImage({image:thisImage,description:thisDescription,name:thisName}) }}
    catch(e){
    }
  
  }

return (
  <div style={{
    width: '100%',
    margin: '0 auto',
    // Add other styles as needed
  }} className=" fs-2     ">
    <div className="row" >
     
      {props.title ?  
        <img src={`data:image/jpeg;base64,${image}`} alt={name} style={{ height: '60vh', width: '90%', display: 'flex', justifyContent: 'flex-start' }} /> 
  :
  <img src={`data:image/jpeg;base64,${image}`} alt={name} /> 
}

    </div>
    <form onSubmit={(e) => { submit(e) }}>
      <div className="image container">

        {props.slider !== false && props.edit ? <div><label htmlFor="image">image:</label> <input name="image" type="file"  accept=".png, .jpg, .jpeg" onChange={(e) => { changeImage(e) }} /></div> : <></>}

        <div className="row">
          {props.slider !== false && props.edit && (
            <>
              <label className="col-sm-3 col-form-label" htmlFor="title">Title:</label>
              <div className="col-sm-9">
                <input className="form-control" name="title" type="text" value={name} onChange={(e) => { setName(e.target.value); }} />
              </div>
            </>
          )}

          {props.slider !== false && props.edit && (
            <>
              <label className="col-sm-3 col-form-label" htmlFor="description">Desc:</label>
              <div className="col-sm-9">
                <textarea   style={{ whiteSpace: 'pre-line' }} className="form-control " name="description" value={description} onChange={(e) => { setDescription(e.target.value); }} />
              </div>
            </>
          )}
          {!props.edit && <p className="col-sm-6"  style={{ whiteSpace: 'pre-line' }}>{name}</p>}
          {!props.edit && <p className="col-sm-6"  style={{ whiteSpace: 'pre-line' }}>{description}</p>}
        </div>

        <div className="row">
          {props.slider !== false && props.edit && <Button className="btn btn-success col-sm-4" type="submit">Save Image</Button>}
          {props.newImage !== true && image !== '' && <Button className="btn btn-primary col-sm-4" onClick={() => { reset(); }}>Reset</Button>}
          {props.newImage !== true && image !== '' && <Button className="btn btn-danger col-sm-4" onClick={() => { removeImage(); }}>Delete</Button>}
        </div>
      </div>
    </form>
  </div>
);

}

export default Image;