import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import Header from './Header'

const BlogSingle = (props) => {
    const [postData,getData] = useState([])
    const placeHolder = 'https://via.placeholder.com/1115x300'

    const {id} = props.match.params;
    // Using useEffect as componentDidMount and ComponentDidUpdate
    useEffect(()=>{
        fetch(`http://localhost:3008/api/blogs/findBlog/${id}`)
        .then(response => response.json())
        .then(data => {
            getData(data.map(post => <Post key={post.id} postData={post} />))
        })
    },[id])

    const Post = (props) =>{
        // Destructuring the data from postData in this.state
        const {title,author,blog,created_on,time_created} = props.postData;
        
        const title_style = {
            color:'Black',
            fontWeight:'Bold'
        }
        const user_style = {
            color:'black',
            fontWeight:'200'
        }
        return (
            <>
            {/* contain all information from post */}
            <div className='box'>
                <h1 style={title_style}>{title}</h1>
                <img src={placeHolder} />
                <h2 style={user_style}>Author: {author}</h2>
                <p>{blog}</p>
                <Link className='null btn btn-primary' to='/blog'>Back</Link>
            </div>
            </>
        )
    }
    return (
        <>
        <Header />
        <div className='blog-wrapper'>
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-12'>
                    {postData}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default BlogSingle;