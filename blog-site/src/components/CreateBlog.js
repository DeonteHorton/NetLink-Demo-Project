import React from 'react'
import Header from './Header'
import {Link,Redirect} from 'react-router-dom'
import {StateContext} from './helper/globalState'


class Post extends React.Component{
    // Imported the createContext to have access to the user object
    static contextType = StateContext
    constructor(){
        super()
        this.state = {
            user:{},
            redirect: false
        }
    }

    componentDidMount(){
        // When the component is mounted, the global state becomes accessible
        const [{user}] = this.context
        this.setState({
            user:user
        })

    }

    // When the user submits the form, all the information is stored in the data object then it's posted through a fetch
    publish_blog = (eve) => {
        eve.preventDefault();
        let author = this.state.user.username;
        let blog_title = document.getElementById('blog-title').value;
        let blog_text = document.getElementById('blog-text').value;

        // data is stored here on submit
        const data = {
            "title":blog_title,
            "author":author,
            "blog":blog_text,
            "created_on":'',
            "time_created":''
        }
        if(this.state.user.username === undefined){
            // Checks for if the user is logged in, if not, they will be directed to the log in component
            window.alert('To publish a post, log in')
            this.setState(() => ({
                redirect: true
            }))
        } 
        // Not allowed to send the data unless both inputs contains data
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
        // When redirect becomes true, the user is directed to the login page
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