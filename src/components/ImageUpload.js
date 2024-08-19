import React, { useState, useEffect, useContext } from "react";
import imageContext from "../context/ImageContext";

export default function ImageUpload() {
  const context = useContext(imageContext);
  const { addListing, fetchImages } = context;
  const [image, setImage] = useState({
    name: "",
    image: null,
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading state

  useEffect(() => {
    const loadImages = async () => {
      try {
        const fetchedImages = await fetchImages();
        setImages(fetchedImages);
      } catch (error) {
        console.error("Error loading images:", error);
      } finally {
        setLoading(false); // Set loading to false once images are fetched or failed
      }
    };

    loadImages();
  }, [fetchImages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", image.name);
    formData.append("image", image.image);
    try {
      const newImage = await addListing(formData);
      setImages([...images, newImage]);
      setImage({
        name: "",
        image: null, // Reset image field after successful submission
      });
    } catch (error) {
      console.error("Error adding image:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  const onChange = (e) => {
    if (e.target.name === "image") {
      setImage({ ...image, image: e.target.files[0] });
    } else {
      setImage({ ...image, [e.target.name]: e.target.value });
    }
  };

  if (loading) {
    return <>Loading...</>; // Show loading indicator while images are being fetched
  }

  return (
    <>
      <h1 className="my-3">Upload An Image</h1>
      <form
        className="container"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="mb-3">
          <textarea
            name="name"
            value={image.name}
            onChange={onChange}
            className="form-control"
            placeholder="Enter description here"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            rows="3"
          />
        </div>
        <div className="mb-3">
          <input
            type="file"
            name="image"
            onChange={onChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      <div className="row mx-4 mt-3">
        {images.map((image) => (
          <div className="card mx-4" style={{ width: "18rem" }} key={image._id}>
            <img
              src={image.image.url}
              className="card-img-top"
              style={{ height: "220px" }}
              alt="..."
            />
            <div className="card-body">
              <p className="card-text">{image.name}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
