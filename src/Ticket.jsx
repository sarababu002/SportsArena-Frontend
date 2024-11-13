import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Ticket() {
    const { bookingId } = useParams();
    const [ticketDetails, setTicketDetails] = useState(null);

    useEffect(() => {
        const fetchTicketDetails = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/ticket/${bookingId}/`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setTicketDetails(data.data); // Adjust based on your API response structure
            } catch (error) {
                console.error('Error fetching ticket details:', error);
            }
        };

        fetchTicketDetails();
    }, [bookingId]);

    if (!ticketDetails) {
        return <div>Loading...</div>; // Loading state
    }

    return (
        <div>
            <h1>Ticket Details</h1>
            <p>Game: {ticketDetails.game}</p>
            <p>Date: {ticketDetails.date}</p>
            <p>Time: {ticketDetails.time}</p>
            <p>Turf: {ticketDetails.turf}</p>
            <p>Price: ₹{ticketDetails.price}</p>
        </div>
    );
}

export default Ticket;
