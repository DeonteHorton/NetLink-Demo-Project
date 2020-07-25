import React from 'react'
import {Link} from 'react-router-dom'
import Header from './Header'

const Home = () => {
    return (
        <>
        <Header />
        <div className='home-wrapper'>
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-12'>
                        <h1>NetLink Demo-Project</h1>
                        <p>Click the button below to view Blogs</p>
                        <Link className='null btn btn-primary' to='/blog'>Blogs</Link>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default Home;