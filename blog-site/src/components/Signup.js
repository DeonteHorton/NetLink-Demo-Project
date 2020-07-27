import React,{useState} from 'react'
import {Link, Redirect} from 'react-router-dom'

const Signup = () =>{
    const [redirect,statusChange] = useState(false);
    // When the user submits the form, all the information is stored in the data object then it's posted through a fetch
    const post_form = (eve) =>{
        eve.preventDefault();
        
        let first_name = document.getElementById('signup-fname').value;
        let last_name = document.getElementById('signup-lname').value;
        let user = document.getElementById('signup-username').value;
        let password = document.getElementById('signup-password').value;
        let confirm_password = document.getElementById('signup-confirm-password').value;
        let email = document.getElementById('signup-email').value;
    
        // data is stored here on submit
        const data = {
        "username":user,
        "password":password,  
        "fname": first_name,
        "lname":last_name,
        "email":email,
        "created_on":''
        }
        
        // Check if the inputs are empty. Must fill in all input fields 
        if(email === '' ||  user === '' || password === '' || first_name === '' || last_name === '' ){
            window.alert('Missing Data in one or more input field')
        } 
        else{
            window.alert('Thank you for joining us!')
            fetch('http://localhost:3008/api/accounts/create',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(data)
            })
            .then(repsonse => repsonse.json())
            .then(data)
            //  changes the useState from false to true
            statusChange(true) 

        } 
    }

    // When redirect becomes true, the user will be direct to the log in component
    if(redirect === true){
        return <Redirect to='/login' />
    }
    return (
        <>
         <div className='colored-bar'></div>
         <div className="login-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-xs-12">
                            <form onSubmit={post_form} action="" method="get">
                                <div className="login-form">
                                    <p className="login-ptag">User Name:</p>
                                    <input type="text" name="User Name" id="signup-username" placeholder="User Name"/>

                                    <p className="login-ptag">First Name:</p>
                                    <input type="text" name="First Name" id="signup-fname" placeholder="First Name"/>

                                    <p className="login-ptag">Last Name:</p>
                                    <input type="text" name="Last Name" id="signup-lname" placeholder="Last Name"/>

                                    <p className="login-ptag">Email:</p>
                                    <input type="text" name="Email" id="signup-email" placeholder="nunuya@gmail.com"/>

                                    <p className="login-ptag">Password:</p>
                                    <input type="password" name="password" id="signup-password" placeholder="Password" /> 

                                    <p className="login-ptag">Confirm Password:</p>
                                    <input type="password" name=" confirm password" id="signup-confirm-password" placeholder=" Confirm Password" />
                                    <br/>
                                    <input id="login-button" type="submit" value="Sign up"/>
                    
                                    <p className="login-ptag">Already have an account? <Link to='/login'>Log in</Link></p>
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
export default Signup;