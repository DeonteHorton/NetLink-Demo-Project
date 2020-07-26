import React from 'react'
import Header from './Header'
import {Link,Redirect} from 'react-router-dom'
import {StateContext} from './helper/globalState'


class Post extends React.Component{
    static contextType = StateContext
    constructor(){
        super()
        this.state = {
            user:{},
            redirect: false
        }
    }

    componentDidMount(){
        const [{user}] = this.context
        this.setState({
            user:user
        })

    }

    publish_blog = (eve) => {
        eve.preventDefault();
        let author = this.state.user.username;
        let blog_title = document.getElementById('blog-title').value;
        let blog_text = document.getElementById('blog-text').value;

        const data = {
            "title":blog_title,
            "author":author,
            "blog":blog_text,
            "created_on":'',
            "time_created":''
        }
        if(this.state.user.username === ''){
            window.alert('To publish a post, log in')
            this.setState(() => ({
                redirect: true
            }))
        } 
        else if ( blog_title === '' || blog_text === ''){
            window.alert('Missing data in one or more input field')
        } 
        else {
            fetch('http://localhost:3008/api/blogs/create',{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(data)
            })
            .then(repsonse => repsonse.json())
            .then(data)
            window.alert('Successfully published')
        }
    }

    render(){
        
        if(this.state.redirect === true){
            return < Redirect to='/login' />
        }

        const margin = {
            marginTop:'2%'
        }
        return (
            <>
            <Header />
            <div className='form-wrapper'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-sm-12'>
                            <div className='form-box'>
                                <form onSubmit={this.publish_blog} id='blog-form'>
                                    <h2>Enter Blog Title in the input field below</h2>
                                    <input type='text' placeholder='Title here' id='blog-title'/>
                                    <h2>Enter your Blog in the input field below</h2>
                                    <textarea className="space" cols="50" rows="5" id='blog-text' placeholder="This is how my day was......"/>
                                    <br/>
                                    <input type='submit' className='null btn btn-primary' value='Publish' />
                                </form>
                                <Link style={margin} className='btn btn-primary' to='/blog'>Blogs</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}
export default Post;