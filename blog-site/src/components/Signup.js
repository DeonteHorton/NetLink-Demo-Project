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
        let age = document.getElementById('age').value;
        let guardian_select = document.getElementById("guardians");
        let g_value = guardian_select.options[guardian_select.selectedIndex].value;
        let class_select = document.getElementById("classes");
        let c_value = class_select.options[class_select.selectedIndex].value;
     
        const data = {
         "email":email,
         "username":user,
         "password":password,  
         "fname": first_name,
         "lname":last_name,
         "age":age,
         "guardian_id":g_value,
         "class_id":c_value,
         "rank_id":'',
         "created_on":''
        }
        

        if(email === '' ||  user === '' || password === '' || first_name === '' || last_name === '' || age === '' || g_value === 'Guardian' || c_value === 'Class' ){
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
            fetch('http://localhost:3006/api/accounts/create',{
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
                                    <input type="text" name="User" id="login-username" placeholder="User"/>
                                    <p className="login-ptag">Password:</p>
                                    <input type="password" name="password" id="login-password" placeholder="Password" />
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