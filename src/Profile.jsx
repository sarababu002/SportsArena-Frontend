import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
const Profile = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [eventTickets, setEventTickets] = useState([]);
    const [turfTickets, setTurfTickets] = useState([]);
    const [gymMembership, setGymMembership] = useState({});
    const [activeSection, setActiveSection] = useState('personal');  // To control which section is active
    const navigate=useNavigate()
    const accessToken = localStorage.getItem('access');
    const userId = parseInt(localStorage.getItem('user'));

    // Fetch user details and bookings from APIs
    useEffect(() => {
        if (accessToken && userId) {
            // Fetch user profile details
            axios.get(`http://127.0.0.1:8000/signup/${userId}/`, {
                // headers: { Authorization: `Bearer ${accessToken}` },
            })
            .then((response) => {
                setUserDetails(response.data);
                console.log(userDetails)
            })
            .catch((error) => {
                console.error("Error fetching user details:", error);
            });

            // Fetch bookings (event, turf, gym)
            axios.get(`http://127.0.0.1:8000/turfbookings/${userId}/`, {
                // headers: { Authorization: `Bearer ${accessToken}` },
            })
            .then((response) => {
                setTurfTickets(response.data);
            })
            .catch((error) => {
                console.error("Error fetching turf bookings:", error);
            });

            axios.get(`http://127.0.0.1:8000/eventbookings/${userId}`, {
                // headers: { Authorization: `Bearer ${accessToken}` },
            })
            .then((response) => {
                setEventTickets(response.data)
            })
            .catch((error) => {
                console.error("Error fetching event bookings:", error);
            });
        }
            
        
    }, [accessToken, userId]);
    const handleLogout= () => {
        const isConfirmed = window.confirm("Are you sure you want to logout?");
        if(isConfirmed){
            localStorage.removeItem('user');
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            console.log('Logout')
    
            navigate('/')
            return;
        }
        return;
       
        
    };
    const renderContent = () => {
        switch (activeSection) {
            case 'personal':
                return (
                    
                    <div className="section-content">
                        <h3>Personal Details</h3>
                        {userDetails ? (
                            <div>
                                {/* <p>Name: {userDetails.name}</p> */}
                                <p>Email: {userDetails.username}</p>
                                {/* <p>Phone: {userDetails.phone}</p> */}
                                {/* <p>Address: {userDetails.address}</p> */}
                            </div>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                );
            case 'events':
                return (
                    <div className="section-content">
                        <h3>Event Tickets</h3>
                        {eventTickets.length > 0 ? (
                            <ul>
                                {eventTickets.map(ticket => (
                                    <li key={ticket.id}>
                                        <h2>{ticket.ticket_no}</h2>
                                        <h3>{ticket.name}</h3>
                                        <p>Venue: {ticket.venue}</p>
                                        <p>Booked on: {ticket.date}</p>
                                        <p>Time: {ticket.time}</p>
                                        <p>Count:{ticket.ticket_count}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No event tickets booked.</p>
                        )}
                    </div>
                );
            case 'turf':
                return (
                    <div className="section-content">
                        <h3>Turf Tickets</h3>
                        {turfTickets.length > 0 ? (
                            <ul>
                                {turfTickets.map(ticket => (
                                    <li key={ticket.id}>
                                        <h2>{ticket.ticket_no}</h2>
                                        <h3>{ticket.game}</h3>
                                        <p>Turf: {ticket.turf_type}</p>
                                        <p>Booked on: {ticket.date}</p>
                                        <p>Time: {ticket.time}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No turf tickets booked.</p>
                        )}
                    </div>
                );
            case 'gym':
                return (
                    <div className="section-content">
                        <h3>Gym Membership</h3>
                        {gymMembership ? (
                            <div>
                                <p>Membership Type: {gymMembership.type}</p>
                                <p>Expires on: {gymMembership.expiry_date}</p>
                            </div>
                        ) : (
                            <p>No gym membership found.</p>
                        )}
                    </div>
                );
            default:
                return <p>Select a section to view details.</p>;
        }
    };

    return (
        <div>
            <div className="navigation"></div>
        <div className="profile-container">
            
            <div className="sidebar">
                <h2>Profile</h2>
                <nav>
                    <ul>
                        <li
                            className={activeSection === 'personal' ? 'active' : ''}
                            onClick={() => setActiveSection('personal')}
                        >
                            Personal Details
                        </li>
                        <li
                            className={activeSection === 'events' ? 'active' : ''}
                            onClick={() => setActiveSection('events')}
                        >
                            Event Tickets
                        </li>
                        <li
                            className={activeSection === 'turf' ? 'active' : ''}
                            onClick={() => setActiveSection('turf')}
                        >
                            Turf Tickets
                        </li>
                        <li
                            className={activeSection === 'gym' ? 'active' : ''}
                            onClick={() => setActiveSection('gym')}
                        >
                            Gym Membership
                        </li>
                    </ul>
                    
                </nav>
                
                <FontAwesomeIcon    
                                    icon={faRightFromBracket}
                                    style={{ color: 'white' ,fontSize:'20px',marginTop:'170px'}}
                                    onClick={handleLogout}
                                />
            </div>
            
            <div className="profile-content">
                {renderContent()}
            </div>
        </div>
        </div>
    );
};

export default Profile;
