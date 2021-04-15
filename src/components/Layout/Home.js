import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getPosts } from '../../actions/posts'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import Pagination from './Pagination'
import { useSelector } from "react-redux";


const Home = () => {
    const posts = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const [postId, setPostId] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5)

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber)

    useEffect(() => {
        dispatch(getPosts())
    }, [postId, dispatch])

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-8'>
                    <Posts setPostId={setPostId} posts={currentPosts} />
                </div>

                <div className='col-md-4 form-wrapper'>
                    <Form postId={postId} setPostId={setPostId} />
                </div>
            </div>

            <div className='d-flex justify-content-center'>
                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={posts.length}
                    paginate={paginate} />
            </div>
        </div>

    )
}

export default Home;