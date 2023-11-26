import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import React from "react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
function UpdateCustomer(){
    const {id}=useParams()
    const [custname,setCustName]=useState()
    const [custNumber,setCustNum]=useState()
    const [city,setCity]=useState()
    const [state,setState]=useState()
    const [pincode,setPincode]=useState()
    const navigate=useNavigate()
    const validateAndUpdate=async(e)=>{
        e.preventDefault();
            if (!custname) {
                alert("Customer Name is required.")
                return;
            }
    
            if (!custNumber) {
                alert("Customer Number is required.")
                return;
            }
            if (custNumber.length!==7) {
                alert("Customer Number required length is 7.")
                return;
            }
    
            try {
                // Check if custNumber is unique
                const response = await axios.get(`http://localhost:3001/checkUniqueCustNumber/${custNumber}`);
                if (!response.data.isUnique) {
                    alert("Customer Number must be unique.")
                    return;
                }
            } catch (error) {
                console.error("Error checking unique custNumber:", error);
                alert("Customer Number must be unique.")
                return;
            }
        axios.put('http://localhost:3001/updateCustomer/'+id,{custname,custNumber,city,state,pincode})
        .then(result=>{
            console.log(result)
            
            navigate('/home')
            alert("Details Updated")
        })
        .catch(err=>console.log(err))
    }
    useEffect(()=>{
        axios.get('http://localhost:3001/getCustomerbyID/'+id)
        .then(result=>{
            console.log(result)
            setCustName(result.data.custname)
            setCustNum(result.data.custNumber)
            setCity(result.data.city)
            setState(result.data.state)
            setPincode(result.data.pincode)
        })
        .catch(err=>console.log(err))
    },[])
    return(
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={validateAndUpdate}>
                    <h2>Update Customer</h2>
                    <div className="mb-2">
                        <label htmlFor="">Customer Name</label>
                        <input type="text" placeholder="Enter Customer Name" value={custname} className="form-control" onChange={(e)=>setCustName(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Customer Number</label>
                        <input type='text' placeholder="Enter Customer Number" value={custNumber} className="form-control" onChange={(e)=>setCustNum(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">City</label>
                        <input type='text' placeholder="Enter City" value={city} className="form-control" onChange={(e)=>setCity(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">State</label>
                        <input type='text' placeholder="Enter State" value={state} className="form-control" onChange={(e)=>setState(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Pincode</label>
                        <input type='text' placeholder="Enter Pincode" value={pincode} className="form-control" onChange={(e)=>setPincode(e.target.value)}/>
                    </div>
                    <button className="btn btn-success">Update</button>
                </form>
            </div>
        </div>
    )
}
export default UpdateCustomer