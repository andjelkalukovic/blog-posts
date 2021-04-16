import React from 'react'
import Post from './Post'
import Spinner from 'react-bootstrap/Spinner'

const Posts = ({ setPostId, posts }) => {
    console.log(posts)

    return (
        !posts.length ? <Spinner animation="grow" variant="secondary" /> :
        (<div>
                {posts.map((post) => (
                     <div key={post._id}>
                        <Post post={post} setPostId={setPostId} />
                    </div>
                ))}
            </div>)
    )
}

export default Posts;