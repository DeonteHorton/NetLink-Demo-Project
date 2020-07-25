import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => {
    return (
        <>
        <header>
            <nav>
                <div className='container'>
                    <div className='row'>
                        <div className='col-sm-6 heading'>Blog</div>
                        <div className='col-sm-6 nav-links'>
                            {/* Link at the top in the nav bar */}
                            <ul>
                                <li><Link to='/'>Home </Link></li>
                                <li><Link to='/createPost'>Create Post </Link></li>
                                <li><Link to='/login'>Log in</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
        </>
    )
}
export default Header;