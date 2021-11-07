import './post.css'
import { Favorite, MoreVert, ThumbUp } from '@mui/icons-material'
import {Users} from '../../dummyData'
import {useState} from 'react'
export default function Post({post}) {
    const [like, setLike] = useState(post.likes)
    const [isLiked, setIsLiked] = useState(false)
    const likeHandler = ()=>{
        setLike(isLiked? like-1: like+1)
        setIsLiked(!isLiked)
    }
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img src={Users.filter(u=>u.id === post?.userId)[0].profilePicture} alt="" className="postProfileImg" />
                        <span className="postUsername">{Users.filter(u=>u.id === post?.userId)[0].username}</span>
                        <span className="postDate">{post.date}</span>
                    </div>
                    <div className="postTopRight">
                    <MoreVert/>
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img className="postImg" src={post.photo} alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <ThumbUp onClick={likeHandler}  className="postLikeIcon"/>
                        <Favorite onClick={likeHandler}  className="postHeartIcon"/>
                        <span className="postLikeCounter">{like} people liked the post! </span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postComments">{post.comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}