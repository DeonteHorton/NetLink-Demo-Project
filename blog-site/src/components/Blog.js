import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import Header from './Header'

class Blog extends React.Component{
    constructor(){
        super()
        this.state = {
            postData:[]
        }
    }
    
    Post = (props) =>{
        const placeHolder = 'https://via.placeholder.com/1115x300'
        // Destructuring the data from postData in this.state
        const {id,title,author,blog} = props.postData;

        // if the blog is over 400 characters, the rest of the blog is hidden
        const text = blog.slice(0,400).concat('........')

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
                <p>{text}</p>
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