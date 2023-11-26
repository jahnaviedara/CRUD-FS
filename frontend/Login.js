import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
function Login(){
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const navigate=useNavigate()
    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:3001/login',{email,password})
        .then(result=>{console.log(result)
        if (result.data==='Success'){
            navigate('/home')
        }
        else {
            // Handle the case when authentication fails
            alert('Authentication failed');
            alert('You have entered the wrong password');
          }
    })
        .catch(err=>console.log(err))
    }
    return (
        <div className='d-flex vh-100 bg-primary align-items-center justify-content-center'>
            <div className='w-50 bg-white rounded p-3'>
                <h2>Sign up using your credentials</h2>
                <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' placeholder='Enter Email' autoComplete='off' name='email' className='form-control' onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>
                <div className='mb-3'>
                    <label htmlFor='email'>Password</label>
                    <input type='password' placeholder='Enter Password' autoComplete='off' name='password' className='form-control' onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                <button type='submit' className="btn btn-success">Login</button>
                </form>
            </div>
        </div>
    )
}
export default Login