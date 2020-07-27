import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import Header from './Header'
import {StateContext} from './helper/globalState'


class MyBlogs extends React.Component{
    static contextType = StateContext
    constructor(){
        super()
        this.state = {
            postData:[]
        }
    }
    componentDidMount(){
        const [{user}] = this.context
        if(user.username === 'Admin'){
            // Admin has access to all blogs, can edit or delete any blog post
            fetch(`http://localhost:3008/api/blogs/`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    postData:data
                })
            })
        }
        else{
            // general user has access to only their blogs, can edit or delete only their post
            fetch(`http://localhost:3008/api/blogs/searchByUser/${user.username}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    postData:data
                })
            })
        }
    }

    Post = (props) =>{
        const placeHolder = 'https://via.placeholder.com/1115x300'
        // Destructuring the data from postData in this.state
        const {id,title,author,blog} = props.postData;

        // if the blog is over 400 characters, the rest of the blog is hidden
        const text = blog.slice(0,400).concat('........')

        const Delete_Blog = () =>{
            // Asks the user if they are sure about deleting the post they created.
            if (window.confirm('Are you sure about this? You will not be able to undo this.')){
                fetch(`http://localhost:3008/api/blogs/delete/${id}`,{
                    method:'POST'
                })
                .then(repsonse => repsonse.json())
            }
        }
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
                <Link className='null btn btn-primary' to={`/yourBlogs/${id}`} >Edit</Link>
                <img src={placeHolder} />
                <h2 style={user_style}>Author: {author}</h2>
                <p>{text}</p>
                <Link className='null btn btn-primary' to={`/blog/${id}`}>View Blog</Link>
                <Link className='danger btn btn-danger' onClick={Delete_Blog} >Delete Blog</Link>
                {/* <Link className='null btn btn-primary' to='/blog'>Back</Link> */}

            </div>
            </>
        )
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

export default MyBlogs;