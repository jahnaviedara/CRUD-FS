import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
function Customer(){
    const [users,setUsers]=useState([])
    useEffect(()=>{
        axios.get('http://localhost:3001')
        .then(result=>setUsers(result.data))
        .catch(err=>console.log(err))
    },[])
    const handleDelete=(id)=>{
        axios.delete('http://localhost:3001/deleteCustomer/'+id)
        .then(res=>{console.log(res) 
            window.location.reload()
            alert("Customer details deleting")
        })
        .catch(err=>console.log(err))
    }
    return(
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <Link to='/create' className='btn btn-success mr-10'>Add +</Link>
                <br></br>
                <br></br>
                <Link to='/search' className='btn btn-success'>Search By Number</Link>
                <br></br>
                <br></br>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Number</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Pincode</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user)=>{
                                return <tr>
                                    <td>{user.custname}</td>
                                    <td>{user.custNumber}</td>
                                    <td>{user.city}</td>
                                    <td>{user.state}</td>
                                    <td>{user.pincode}</td>
                                    <td>
                                        <Link to={`/update/${user._id}`} className='btn btn-success'>Update</Link>
                                        <button className='btn btn-danger' onClick={()=>handleDelete(user._id)}>Delete</button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Customer;