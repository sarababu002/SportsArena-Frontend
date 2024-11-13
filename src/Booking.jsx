import React, { useState, useEffect } from 'react';
import './App.css'; // Make sure to import your CSS file
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import jwtDecode from 'jwt-decode';
function Booking() {
    const [selectedDetails, setSelectedDetails] = useState([]);
    const [game, setGame] = useState('');
    const [date, setDate] = useState('');
    const [timeSlots, setTimeSlots] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [turfAvailability, setTurfAvailability] = useState({
        "standard": [],
        "premium": [],
        "deluxe": []
    });

    const prices = {
        "standard": 1000,
        "premium": 1500,
        "deluxe": 2000
    };

    const navigate = useNavigate();
    const accessToken = localStorage.getItem('access');
    const user=parseInt(localStorage.getItem('user'),10);
    console.log(user)
    
   
    useEffect(() => {
        if (game && date) {
            fetchBookedTimes(game, date);
        }
    }, [game, date]);

    const fetchBookedTimes = async (game, date) => {
        console.log('In fetchBookedTimes');
        const response = await fetch('http://127.0.0.1:8000/book/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify({ game, date })
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Error fetching booked times:', error);
            return;
        }

        const availability = await response.json();
        console.log('Fetched availability:', availability);

        setTurfAvailability({
            standard: availability.standard || [],
            premium: availability.premium || [],
            deluxe: availability.deluxe || []
        });
    };

    const handleGameChange = (event) => {
        setGame(event.target.value);
        const today = new Date().toISOString().split('T')[0];
        setDate(today);
    };

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const handleSlotClick = (turf, time) => {
        if (turfAvailability[turf].includes(time)) {
            alert("This time slot is already booked.");
            return;
        }

        const alreadySelected = selectedDetails.some(detail => detail.turf === turf && detail.time === time);
        if (alreadySelected) {
            alert("You have already selected this time slot.");
            return;
        }

        const price = prices[turf];
        const newDetails = [...selectedDetails, { turf, time, price, date, game }];
        setSelectedDetails(newDetails);
        setTotalPrice(totalPrice + price);
    };
    function generateRandomId(length) {
        return Math.random().toString(36).substr(2, length);
    };
    const handleBooking = async () => {
        
        if (!user) {
            
            // If email is null, navigate to profile and stop the rest of the code execution
            navigate('/login');
            return; // This ensures that the rest of the code doesn't run
        }
        
        console.log('User:',user);
        if (selectedDetails.length === 0) {
            alert('Please select at least one time slot to book!');
            return;
        }
        
    
        try {
                for (const detail of selectedDetails) {
                    const bookingDetails = {
                        game: detail.game,
                        turf_type: detail.turf,
                        date: detail.date,
                        time: detail.time,
                        ticket_no: generateRandomId(8),
                        user:user,
                    };
                    console.log('Details:',bookingDetails );
                    const response = await axios.post('http://127.0.0.1:8000/turfbook/', bookingDetails);
                    console.log('Response:', response.data); // Log the response object
                }
        
                console.log(accessToken);
                alert('All tickets booked successfully!');
            } catch (err) {
                console.error('Fetch Error:', err); // Log the error for debugging
                alert('Error booking tickets: ' + err.message);
            }
        
    
    }

    return (
        <div>
            <div className="body">
                <div className="navigation"></div>
                <center>
                    <form className='booking' onSubmit={(e) => e.preventDefault()}>
                        <div className="form-group">
                            <select name="game" id="game-select" onChange={handleGameChange} required>
                                <option value="">Select Game</option>
                                <option value="Badminton">Badminton</option>
                                <option value="Basketball">Basketball</option>
                                <option value="Cricket">Cricket</option>
                                <option value="Football">Football</option>
                                <option value="Volleyball">Volleyball</option>
                                </select>
                        </div>
                        <div className="form-group">
                            <input type="date" id="date-input" name="date" value={date} onChange={handleDateChange} required />
                        </div>
                    </form>

                    <h3>Available Time Slots</h3>
                    <table>
                        <tbody>
                            {["standard", "premium", "deluxe"].map(turfName => (
                                <tr key={turfName}>
                                    <td>{turfName.charAt(0).toUpperCase() + turfName.slice(1)}</td>
                                    <td>₹{prices[turfName]}/hour</td>
                                    {["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM"].map(time => (
                                        <td
                                            key={time}
                                            className={
                                                turfAvailability[turfName].includes(time) ? 'booked' : 
                                                selectedDetails.some(detail => detail.turf === turfName && detail.time === time) ? 'selected' : 'available'
                                            }
                                            onClick={() => handleSlotClick(turfName, time)}
                                        >
                                            {time}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="total-price">Total Price: ₹{totalPrice}</div>
                    <button type="button" className="book-button1" onClick={handleBooking}>Book Now</button>
                    <div style={{ marginTop: 20 }} id="confirmation-message"></div>
                </center>
            </div>
        </div>
    );
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(`${name}=`)) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export default Booking;
