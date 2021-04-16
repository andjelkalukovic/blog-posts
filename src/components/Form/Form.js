import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FileBase from 'react-file-base64'
import { createPost, updatePost } from '../../actions/posts'
import './form.css'

const Form = ({ postId, setPostId }) => {
    const [postData, setPostData] = useState({
        title: '',
        content: '',
        tags: '',
        selectedFile: ''
    })

    const post = useSelector((state) => postId ? state.posts.find((pst) => pst._id === postId) : null);
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if (post) setPostData(post)
    }, [post])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (postId === 0) {
            dispatch(createPost({ ...postData, name: user.result.name }))
        } else  {
            dispatch(updatePost(postId, { ...postData, name: user.result.name }))
        }
        setPostId(0);
        setPostData({ title: '', content: '', tags: '', selectedFile: '' })
    }

    console.log(user.result.name)

    // if (!user.result.name) {
    //     return (
    //         <div>
    //             <h6>Please Sign in to create your own blog post and like other's posts.</h6>
    //         </div>
    //     )
    // }

    return (
        <div className='form-card py-5'>
            <h3>{postId ? 'Edit your' : 'Create new'} blog post</h3>
            <form onSubmit={()=>handleSubmit}>
                <input name='title' placeholder='Title' value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} className='form-input'/>
                <div>
                    <textarea name='content' placeholder='Content' value={postData.content} onChange={(e) => setPostData({ ...postData, content: e.target.value })}  className='form-input'/>
                </div>
                <input name='tags' placeholder='Tags' value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}  className='form-input'/>

                <div>
                    <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
                </div>

                <div>
                    <button type='submit' className='button'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Form;