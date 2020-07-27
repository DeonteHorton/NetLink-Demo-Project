import React from 'react'
import {Link,Redirect} from 'react-router-dom'
import { StateContext } from './helper/globalState'

class Login extends React.Component {
    // Imported the createContext to have access to the user object

    static contextType = StateContext
    constructor(){
        super()
        this.state = {
            redirect:false
        }
    }
    
    componentDidMount(){
        // When the component is mounted, the global state becomes accessible
        const [{user}] = this.context;
    }

    // Check if the Username and password
     check_info = (eve) =>{
        eve.preventDefault();

        // When the component is mounted, the global state becomes accessible
        const [{user},dispatch] = this.context;

        let user_name = document.getElementById('login-username').value;
        let password = document.getElementById('login-password').value;
        
        
        fetch(`http://localhost:3008/api/accounts/login/${user_name}&${password}`)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0 || data === undefined) {
                window.alert('User Name or Password is incorrect')
            } 
            else{
                dispatch({
                    type:'changeUser',
                    newUser:data[0]
                })
                this.setState(() => ({
                    redirect: true
                }))
            }
        })
        console.log(user)
        
    }
    
    render(){
        // When the component is mounted, the globalState becomes accessible
        const [{user}] = this.context;

        // When redirect becomes true, the user is directed to the blog page and the loggedin becomes true in the globalState
        if(this.state.redirect === true){
            user.loggedin = true;
            return <Redirect to='/blog' />
        }
        return (
            <>
            <div className='colored-bar'></div>
            <div className="login-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-xs-12">
                            <form onSubmit={this.check_info} action="" method="get">
                                <div className="login-form">
                                    <p className="login-ptag">User Name:</p>
                                    <input type="text" name="User" id="login-username" placeholder="User"/>
                                    <p className="login-ptag">Password:</p>
                                    <input type="password" name="password" id="login-password" placeholder="Password" />
                                    <br/>
                                    <input id="login-button" type="submit" value="Login"/>
                    
                                    <p className="login-ptag">Don't have an account? <Link to='/signup'>Create Account</Link></p>
                                    <Link className='btn btn-primary' to='/'>Back to home</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}
export default Login;