import React from 'react'
import Header from './Header'
import {Link} from 'react-router-dom'


const Post = () => {
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
                            <form id='blog-form'>
                                <h2>Enter Blog Title in the input field below</h2>
                                <input type='text' placeholder='Title here' className=''/>
                                <h2>Enter your Blog in the input field below</h2>
                                <textarea className="space" cols="50" rows="5" id='contact-comment' placeholder="This is how my day was......"/>
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
export default Post;