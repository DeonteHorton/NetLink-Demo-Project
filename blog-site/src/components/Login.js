import React,{useState,useEffect} from 'react'
import {Link,Redirect} from 'react-router-dom'


const Login = () => {
    const [redirect,statusChange] = useState(false);
   
    const check_info = (eve) =>{
        eve.preventDefault();
        
        let user_name = document.getElementById('login-username').value;
        let password = document.getElementById('login-password').value;
        
        // const [{user},dispatch] = this.context;
        
        fetch(`http://localhost:3008/api/accounts/login/${user_name}&${password}`)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0 || data === undefined) {
                window.alert('User Name or Password is incorrect')
            } else{
                // user.loggedIn = true;
                // dispatch({
                //     type:'changeUser',
                //     newUser:data[0]
                // })
                statusChange(true)
            }
        })
        
    }
    
    if(redirect === true){
        return <Redirect to='/blog' />
    }

    return (
        <>
        <div className='colored-bar'></div>
        <div className="login-wrapper">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-xs-12">
                        <form onSubmit={check_info} action="" method="get">
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
export default Login;