import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';

function SearchCustomer() {
  const [customers, setCustomers] = useState([]);
  const [searchResult, setSearchResult] = useState(null);
  const [custNumber, setNumber] = useState("");

  useEffect(() => {
    fetchData();
  }, [custNumber]);

  const fetchData = () => {
    axios.get("http://localhost:3001")
      .then((response) => setCustomers(response.data))
      .catch((error) => console.log("Error fetching data:", error));
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/getCustomer/${custNumber}`);
      setSearchResult(response.data);
      if(response.data===null){
        alert("Customer not found");
      }
    } 
    catch (error) {
      console.log("Error searching for customer:", error);
      setSearchResult(null);
      alert("Customer not found!");
    } 
    finally {
      fetchData();
    }
  };

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
    <div className='w-50 bg-white rounded p-1'>
        <h3>Search By Customer Number</h3>

        <input
          type="text"
          placeholder="Enter Customer Number "
          value={custNumber}
          onChange={(e) => setNumber(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <br></br>

        <br></br>
        <h3>Results</h3>
        {searchResult ? (
          <div>
            <table className='table'>
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Customer Number</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Pincode</th>
                </tr>
              </thead>
              <tbody>
                <tr key={searchResult.custNumber}>
                  <td>{searchResult.custname}</td>
                  <td>{searchResult.custNumber}</td>
                  <td>{searchResult.city}</td>
                  <td>{searchResult.state}</td>
                  <td>{searchResult.pincode}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
            <div>
                Customer Not found
            </div>
        )}
        <Link to="/home" className="btn btn-success">HOME</Link>
        
      </div>
      
    </div>
  );
}

export default SearchCustomer;