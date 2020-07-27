import React from 'react'
import {Link} from 'react-router-dom'
import {StateContext} from './helper/globalState'


class Header extends React.Component {
    // Imported the createContext to have access to the user object
    static contextType = StateContext
    constructor(){
        super()
        this.state = {
            user:{},
        }
    }
    
    // When the user click the log out link, the page refreshes
    LogOutUser = () =>{
        window.location.reload(false);
    }

    LogOutLink = () =>{

        return <Link onClick={this.LogOutUser}>Log Out</Link>
    }
    
    LogInLink = () =>{
    
        return <Link to='/login'>Log In</Link>
    }


    componentDidMount(){
        // When the component is mounted, the global state becomes accessible
        const [{user}] = this.context
        this.setState({
            user:user
        })

    }


    render(){
        const [{user}] = this.context
        // When the username is undefined, the log in link is loaded unless the username is not undefined
        let log_status = user.username ? <this.LogOutLink /> : <this.LogInLink />

        const userStyle = {
            'color':'white'
        }
        let Check_Blog;
        // Using if else statment to show different Links for Admin and general users
        if(user.username === 'Admin'){
            Check_Blog = <Link to='/yourBlogs'>Check All Blogs</Link>;
        } 
        else if (user.username === undefined){
            Check_Blog = undefined;
        }
        else{
            Check_Blog = <Link to='/yourBlogs'>Check your Blogs</Link>;
        }

        return (
            <>
            <header>
                <nav>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-sm-4 heading'>Blog</div>
                            <div className='col-sm-8 nav-links'>
                                <ul>
                                    {/* Link at the top in the nav bar */}
                                    <li><Link to='/'>Home </Link></li>
                                    <li><Link to='/createPost'>Create Post </Link></li>
                                    <li>{Check_Blog}</li>
                                    {/* log in and log out link */}
                                    <li>{log_status}</li>
                                    {/* Displays username on once logged in */}
                                    <li style={userStyle}>{this.state.user.username}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            </>
        )
    }
}
export default Header;