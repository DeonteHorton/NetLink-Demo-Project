import React,{useState} from 'react'
import {Link} from 'react-router-dom'



const Signup = () =>{
    
    const post_form = (eve) =>{
        eve.preventDefault();
        
        let first_name = document.getElementById('first-name').value;
        let last_name = document.getElementById('last-name').value;
        let user = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        let confirm_password = document.getElementById('confirm-password').value;
        let email = document.getElementById('email').value;

     
        const data = {
        "username":user,
        "password":password,  
        "fname": first_name,
        "lname":last_name,
        "email":email,
        "created_on":''
        }
        

        if(email === '' ||  user === '' || password === '' || first_name === '' || last_name === '' ){
            window.alert('Missing Data in one or more input field')
        } 
        else if (password.length < 8 || password.length > 20 ){
            window.alert(`Password must be at least 8 characters and no more than 20 characters `)
        } 
        else if (!password.match(/[A-Z]/g)){
            window.alert('Password must contain atleast one uppercase letter')
        } 
        else if (!password.match(/[a-z]/g)){
            window.alert('Password must contain atleast one lowercase letter')
        } 
        else if (!password.match(/[0-9]/g)){
            window.alert('Password must contain atleast one number')
        }
        else if (!password.match(/[!@#$%^&*_:?|]/g)){
            window.alert('Password must contain at least one special character')
        }         
        else if (password !== confirm_password){
            window.alert('Password does not match confirm password')
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
            this.setState(() => ({
                redirect: true
            })) 

        } 
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
                                    <input type="text" name="User Name" id="login-username" placeholder="User Name"/>

                                    <p className="login-ptag">First Name:</p>
                                    <input type="text" name="First Name" id="login-username" placeholder="First Name"/>

                                    <p className="login-ptag">Last Name:</p>
                                    <input type="text" name="Last Name" id="login-username" placeholder="Last Name"/>

                                    <p className="login-ptag">Email:</p>
                                    <input type="text" name="Email" id="login-username" placeholder="nunuya@gmail.com"/>

                                    <p className="login-ptag">Password:</p>
                                    <input type="password" name="password" id="login-password" placeholder="Password" /> 

                                    <p className="login-ptag">Confirm Password:</p>
                                    <input type="password" name=" confirm password" id="login-password" placeholder=" Confirm Password" />
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