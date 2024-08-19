import ImageContext from "./ImageContext";
import { useState } from "react";




const ImageState = ({children}) => {
    const host = "http://localhost:5000";
    const ImageInitial = [];
    const [image, setImage] = useState(ImageInitial);

 // Add a Listing
 const addListing = async (formData) => {
  const response = await fetch(`${host}/listings`, {
      method: "POST",
      body: formData,
  });

  const listing = await response.json();
  setImage([...image, listing]); // Append the new listing to the existing listings
  return listing; // Ensure it returns the new listing
};


  const fetchImages = async () => {
    const response = await fetch(`${host}/listings`);
    const data = await response.json();
    return data;
  };
  


  return (
    <div>
       <ImageContext.Provider
      value={{
        addListing, fetchImages
      }}
    >
      {children}
    </ImageContext.Provider>
    </div>
  )
}

export default ImageState
