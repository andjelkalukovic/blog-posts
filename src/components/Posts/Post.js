import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { deletePost, likePost } from '../../actions/posts'
import { ImBin } from "react-icons/im"
import { AiTwotoneLike, AiTwotoneEdit } from 'react-icons/ai'
import './posts.css'

const Post = ({ post, setPostId }) => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const [readMore, setReadMore] = useState(false);

    const Likes = () => {
        if (user) {
            if (post.likes.length > 0) {
                return post.likes.find((like) => like === (user.result.googleId || user.result._id))
                    ? (
                        <span className='like-text'>{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</span>
                    ) : (
                        <span className='like-text'>{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</span>
                    );
            }
        }
        return <span><AiTwotoneLike /></span>;
    }

    const handleReadMore = () => { setReadMore(!readMore) }

    const handleSeeFull = () => {
        console.log('see post')
    }

    return (
        <div className='py-5'>
            <h3 className='post-title'>{post.title}</h3>
            <h6><span className='post-name'>{post.name}</span>, <span>{moment(post.createdAt).fromNow()}</span></h6>
            <img src={post.selectedFile} alt={post.title} className='post-img' />

            <div>
                {readMore ? <p>{post.content}</p> : <p>{`${post.content.substring(0, 300)}...`}</p>}
                <button className='button-link' onClick={handleReadMore}>
                    {readMore ? 'Show less...' : 'Read More...'}</button>
            </div>

            <p className='post-tags'>{post.tags.map((tag) => `#${tag} `)}</p>

            <div>
                <button onClick={() => dispatch(likePost(post._id))} className='like-btn post-btn'><Likes /></button>

                {(user.result.googleId === post.author || user.result._id === post.author) && (
                    <button onClick={() => setPostId(post._id)} className='edit-btn post-btn'><AiTwotoneEdit /></button>
                )}

                {(user.result.googleId === post.author || user.result._id === post.author) && (
                    <button onClick={() => dispatch(deletePost(post._id))} className='delete-btn post-btn'><ImBin /></button>
                )}
            </div>
            <button onClick={handleSeeFull}>See Full</button>
        </div>
    )
}

export default Post;