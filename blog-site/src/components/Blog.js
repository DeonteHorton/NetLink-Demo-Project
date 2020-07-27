import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import Header from './Header'
import {StateContext} from './helper/globalState'


class Blog extends React.Component{
    constructor(){
        super()
        this.state = {
            postData:[]
        }
    }
    
    Post = (props) =>{
        const placeHolder = 'https://via.placeholder.com/1115x300'
        const {id,title,author,blog} = props.postData;
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
                <Link className='null btn btn-primary' to={`/blog/${id}`}>View Blog</Link>
            </div>
            </>
        )
    }

    componentDidMount(){
        fetch('http://localhost:3008/api/blogs')
        .then(response => response.json())
        .then(data => {
            this.setState({
                postData:data
            })
        })
    }

    render(){
        const blog = this.state.postData.map(post => <this.Post key={post.id} postData={post} />)
        return(
        <>
            <Header />
            <div className='blog-wrapper'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-sm-12'>
                            {blog}  
                        </div>
                    </div>
                </div>
            </div>
            </>
    )

    }
    
}

export default Blog;