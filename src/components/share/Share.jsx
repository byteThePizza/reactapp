import "./share.css"
import { EmojiEmotions, Label, PermMedia, Room } from '@mui/icons-material'
import {AuthContext} from "../../context/AuthContext";
import { useContext, useRef, useState } from "react";
import axios from "axios";

export default function Share() {

    const {user} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();
    const [file,setFile]=useState(null);
    const submitHandler = async (e)=>{
        e.preventDefault();
        const newPost = {
            userId:user._id,
            desc:desc.current.value,
        };

        if(file){
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name",fileName);            
            data.append("file",file);
            newPost.img = fileName;
            try{
                await axios.post("/upload", data);
            }catch(err){
                console.log(err);
            }
        }

        try{
           await axios.post("/posts", newPost);
           window.location.reload();
        }catch(err){

        }
    }
    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className="shareProfileImg" src={user.profilePicture? PF+user.profilePicture : PF+"defaultAvatar.png"} alt="" />
                    <input placeholder={"whats in your mind "+user.username+"?"} ref={desc} className="shareInput" />
                </div>
                <hr className="shareHr" />
                <form className="shareBottom" onSubmit={submitHandler} enctype="multipart/form-data">
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMedia htmlColor="tomato" className="shareIcon"/>
                            <span className="shareOptionText">Video or image</span>
                            <input style={{display:"none"}} type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e)=>setFile(e.target.files[0])}/>
                        </label>
                        <div className="shareOption">
                            <Label htmlColor="blue" className="shareIcon"/>
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor="green" className="shareIcon"/>
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                            <span className="shareOptionText">Feelings</span>
                        </div>
                    </div>
                    <button className="shareButton" type="submit">Share</button>
                </form>
            </div>
        </div>
    )
}
