import React, {useState} from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";

const AddPostForm = () => {
    const {actions} = useContext(Context);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [country, setCountry] = useState("");
    const [image, setImage] = useState("");
    const [user_id, setUserId] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await actions.addAPost(title,description,country,image)
        if (result.success) {
            alert("Post created successfully!");
        } else {
            alert("Error creating post: " + result.message);
        }
    };

    return(
        <div className="m-5">
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label for="title" class="form-label">Title</label>
                <input type="text" value={title} class="form-control" onChange={(e) => setTitle(e.target.value)} required />                
            </div>
            <div className="mb-3">
                <label for="description" class="form-label">description</label>
                <input type="text" value={description} class="form-control" onChange={(e) => setDescription(e.target.value)} required />                
            </div>
            <div className="mb-3">
                <label for="imageUrl" class="form-label">Image url</label>
                <input type="text" value={image} class="form-control" onChange={(e) => setImage(e.target.value)} required />                
            </div>
            <div className="mb-3">
                <label for="country" class="form-label">Country</label>
                <input type="text" value={country} class="form-control" onChange={(e) => setCountry(e.target.value)} required />                
            </div>
            
            
                        
            <button type="submit" class="btn btn-primary">Add Post</button>
        </form>
        </div>
    )
}

export default AddPostForm