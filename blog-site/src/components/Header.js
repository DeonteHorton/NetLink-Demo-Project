import React from 'react'
import {Link} from 'react-router-dom'
import {StateContext} from './helper/globalState'


class Header extends React.Component {
    static contextType = StateContext
    constructor(){
        super()
        this.state = {
            user:{},
        }
    }


    componentDidMount(){
        const [{user}] = this.context
        this.setState({
            user:user
        })

    }


    render(){
        const [{user},dispatch] = this.context

        const LogOutUser = () =>{
            window.location.reload(false)
        }

        const LogOutLink = () =>{

            return <Link onClick={LogOutUser}>Log Out</Link>
        }
        
        const LogInLink = () =>{
        
            return <Link to='/login'>Log In</Link>
        }

        let log_status = user.username ? < LogOutLink /> : <LogInLink />

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
                                    <li>{log_status}</li>
                                    <li>{this.state.user.username}</li>
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