import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
function Register(){
    const [username,setUserName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const navigate=useNavigate()
    const handleSubmit=(e)=>{
        e.preventDefault()

        const validateEmail = (email) => {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailPattern.test(email);
        };

        if (!validateEmail(email)) {
            alert("Invalid email format.Example:abc@gmail.com");
            return;
        }
        else{


        var lowerCase = /[a-z]/g;
        var upperCase = /[A-Z]/g;
        var numbers = /[0-9]/g;

        if (!password.match(lowerCase)) {
            alert("Password should contains lowercase letters!");
        } 
        else if (!password.match(upperCase)) {
            alert("Password should contain uppercase letters!");
        } 
        else if (!password.match(numbers)) {
            alert("Password should contains numbers also!");
        } 
        else if (password.length < 10) {
            alert("Password length should be more than 10.");
        } 
        else {
         alert("Password is strong!"); 
         axios.post('http://localhost:3001/register',{username,email,password})
        .then(result=>{console.log(result)
            navigate('/login')})
        .catch(err=>console.log(err))
        }
    }
        
    }
    return (
        <div className='d-flex vh-100 bg-primary align-items-center justify-content-center'>
            <div className='w-50 bg-white rounded p-3'>
                <h2>Sign up using your credentials</h2>
                <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='email'>Username</label>
                    <input type='text' placeholder='Enter Username' autoComplete='off' name='username' className='form-control' onChange={(e)=>{setUserName(e.target.value)}}/>
                </div>
                <div className='mb-3'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' placeholder='Enter Email' autoComplete='off' name='email' className='form-control' onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>
                <div className='mb-3'>
                    <label htmlFor='email'>Password</label>
                    <input type='password' placeholder='Enter Password' autoComplete='off' name='password' className='form-control' onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                <button className='btn btn-success' type='submit'>Register</button>
                <p>Already have an account?</p>
                <Link to={'/login'} className="btn btn-default">Login</Link>
                </form>
            </div>
        </div>
    )
}
export default Register