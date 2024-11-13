import React from 'react';
import './App.css';
import Booking from './Booking';
import Home from './Home';
import Gym from './Gym';
import Ticket from './Ticket';
import Events from './Events';
import Login from './login';
import SignUp from './SignUp';
import Profile from './Profile'

import {
    BrowserRouter as Router,
    Link,
    Route,
    Routes,
  } from "react-router-dom";
 
import { useEffect, useState } from 'react';
 
function App() {
  // localStorage.removeItem('user');

    const [data, setData] = useState(null);
 
    // Fetch data from Django backend
    const fetchData = async () => {
        try {
            const url = "http://127.0.0.1:8000";  // Django backend URL
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const json = await response.json();
            setData(json);  // Update the state with the fetched data
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
 
    // Fetch data on component mount
    useEffect(() => {
        fetchData();
    }, []);
 
  return (
      <Router>
           
    <div>
      <div className="navbar">
        <Link to="/">Home</Link>
        {/* <a href="/#turf">Turf</a> */}
        <Link to='/gym'>Gym</Link>
        <Link to='/events'>Events</Link>
        <a href="/#location">Contact</a>
        <Link to='/login'>Profile</Link>
      </div>
     
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/gym' element={<Gym/>}/>
       <Route path="/booking" element={<Booking/>}/>
       <Route path="/ticket/:bookingId" element={<Ticket />} />
       <Route path="/events" element={<Events/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='/signup' element={<SignUp/>}/>
       <Route path='/profile' element={<Profile/>}/>
   </Routes>
        {/* <footer>
        <div className='footer'>
            <p>© 2024</p>
        </div>
    </footer> */}
   
    </div>
    </Router>
  );
}

export default App;
