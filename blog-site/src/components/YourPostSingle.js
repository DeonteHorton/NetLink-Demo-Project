import React,{useState,useEffect} from 'react'
import {Link,Redirect} from 'react-router-dom'
import Header from './Header'

const MyBlogSingle = (props) => {
    const [postData,getData] = useState([])
    const [redirect,status] = useState(false)
    // The id from YourPost.js Blog is stored in the Destruturing Object
    const {id} = props.match.params;

    const placeHolder = 'https://via.placeholder.com/1115x300'

    // Using useEffect as componentDidMount and ComponentDidUpdate
    useEffect(()=>{
        fetch(`http://localhost:3008/api/blogs/findBlog/${id}`)
        .then(response => response.json())
        .then(data => {
            getData(data.map(post => <Post key={post.id} postData={post} />))
        })
    },[id])

    const Delete_Blog = (eve) =>{
        // Asks the user if they are sure about deleting the post they created.
        eve.preventDefault();
        if (window.confirm('Are you sure about this')){
            fetch(`http://localhost:3008/api/blogs/delete/${id}`,{
                method:'POST'
            })
            .then(repsonse => repsonse.json());
            // changes redirect to true 
            status(true)
        }
            
    }

    // When the user submits the form, all the information is stored in the data object then it's posted through a fetch
    const Submit_Edit = (eve) =>{
        eve.preventDefault();
        let blog_title = document.getElementById('edit-title').value;
        let blog_text = document.getElementById('edit-text').value;

        // Once submitted, the data is stored in here
        const data = {
            "title":blog_title,
            "blog":blog_text,
            "created_on":'',
            "time_created":''
        }

        // Not allowed to send the data unless both inputs contains data
        if(blog_title === '' || blog_text === ''){
            window.alert('Please put information in both fields')

        }  
        else {
            fetch(`http://localhost:3008/api/blogs/update/${id}`,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(data)
            })
            .then(repsonse => repsonse.json())
            .then(data)
            window.alert('Successfully published')
            // changes redirect to true 
            status(true)
        }

    }

    const Edit_Form = () =>{
        return (
            <>
           <form onSubmit={Submit_Edit} id='edit-form'>
                <h2>Blog Title</h2>
                <input type='text' placeholder='Title here' id='edit-title'/>
                <h2>Blog</h2>
                <textarea className="space" cols="50" rows="5" id='edit-text' placeholder="This is how my day was......"/>
                <br/>
                <input type='submit' className='null btn btn-primary' value='confirm' />
            </form>
            </>
        )
    }

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
                <h1>When editing Blog, Please fill in both inputs or data will not be saved!</h1>
                <Link className='null btn btn-primary' to='/yourBlogs'>Back</Link>
                <Link className='btn btn-danger' onClick={Delete_Blog} >Delete Blog</Link>
                <h1 style={title_style}>{title}</h1>
                <img src={placeHolder} />
                <h2 style={user_style}>Author: {author}</h2>
                <p>{blog}</p>
                <Edit_Form />
            </div>
            </>
        )
    }
    // When redirect becomes true, the user is directed to the yourBlogs page
    if(redirect === true){
        return <Redirect to='/yourBlogs' />
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
export default MyBlogSingle;