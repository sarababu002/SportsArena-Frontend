import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
function Events() {
  const [data, setData] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ticketCount, setTicketCount] = useState(1); // State for ticket count
  const user=parseInt(localStorage.getItem('user'),10);
  const navigate=useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/events/');
        console.log('Fetched Events:', response.data);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchData();
  }, []);

  const handleBookTicket = (event) => {
    if (!user) {
            
      // If email is null, navigate to profile and stop the rest of the code execution
      navigate('/login');
      return; // This ensures that the rest of the code doesn't run
  }
  
    setSelectedEvent(event);
    setIsModalOpen(true);
    setTicketCount(1); // Reset ticket count when selecting a new event
  };

  function generateRandomId(length) {
    return Math.random().toString(36).substr(2, length);
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const postData = async () => {
    if (!selectedEvent) {
      console.error('No event selected');
      return;
    }
    const bookingData = {
      name: selectedEvent.name,
      date: selectedEvent.date,
      time: selectedEvent.time,
      venue: selectedEvent.venue,
      ticket_no: generateRandomId(8),
      ticket_count: ticketCount, // Include ticket count in booking data
      user:user
    };
    try {
      const response = await axios.post('http://127.0.0.1:8000/eventticket/', bookingData);
      console.log('Ticket Booked', response.data);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  return (
    <div style={styles.container}>
      <img src='https://tse4.mm.bing.net/th/id/OIP.acBtBOXWVnhmabRoHmLbngHaDr?w=796&h=395&rs=1&pid=ImgDetMain' style={styles.bgImg} />
      <h1 style={styles.title}>Upcoming Sports Events</h1>
      <center>
        <ul style={styles.eventList}>
          {data.map(event => {
            const dateString = new Date(event.date);
            const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const day = dayNames[dateString.getDay()];
            const date = dateString.getDate();
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const month = monthNames[dateString.getMonth()];
            const year = dateString.getFullYear();

            return (
              <div key={event.id}>
                <hr />
                <li style={styles.eventItem}>
                  <div style={styles.eventDetails}>
                    <h3>{day}<br />{date}, {month}<br />{year}</h3>
                    <img src={`http://127.0.0.1:8000/${event.image}`} alt={event.name} style={styles.eventImage} />
                    <div>
                      <h2>{event.name}</h2>
                      <p><img src="./images/location.png" style={styles.icon} />{event.venue}. {event.time}</p>
                    </div>
                  </div>
                  <div style={styles.buttonContainer}>
                    <button style={styles.button} onClick={() => handleBookTicket(event)}>
                      Book Ticket
                    </button>
                  </div>
                </li>
              </div>
            );
          })}
        </ul>
      </center>

      {isModalOpen && selectedEvent && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2>Booking for: {selectedEvent.name}</h2>
            <p>Date: {selectedEvent.date}</p>
            <p>Price: ₹500</p>
            <div style={styles.ticketCountContainer}>
              <button  style={styles.countButton} onClick={() => setTicketCount(ticketCount > 1 ? ticketCount - 1 : 1)}>-</button>
              <span style={styles.ticketCount}>{ticketCount}</span>
              <button style={styles.countButton} onClick={() => setTicketCount(ticketCount + 1)}>+</button>
            </div>
            <p>Total Price: ₹{500 * ticketCount}</p>
            <button style={styles.confirmButton} onClick={async () => {
              await postData();
              closeModal();
              setTimeout(() => {
                alert('Ticket booked!');
              }, 100);
            }}>
              Confirm Booking
            </button>
            <button style={styles.cancelButton} onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
    backgroundColor: 'black',
    fontFamily: 'Arial, sans-serif',
    color: 'white',
  },
  bgImg: {
    width: '100%',
    height: '250px',
    zIndex: '1',
    position: 'relative',
  },
  title: {
    marginTop: '0px',
    zIndex: '2',
    position: 'relative',
    marginLeft: '470px',
  },
  eventList: {
    listStyleType: 'none',
  },
  icon: {
    width: '20px',
  },
  eventItem: {
    margin: '10px 0',
    display: 'flex',
    justifyContent: 'space-between', // Use space-between to align items
    alignItems: 'center', // Center align the items vertically
    width: '100%',
  },
  eventImage: {
    width: '150px',
    height: '150px',
    marginRight: '20px',
    marginLeft: '60px',
  },
  eventDetails: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center', // Center align the items vertically
    marginLeft: '180px',
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center', // Align button to center vertically
    marginRight: '80px', // Add some margin to space it from the event details
  },
  button: {
    background: "linear-gradient(90deg, #00c964, #008341, #004944)",
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    width: '120px',
    height: '50px',
    cursor: 'pointer',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '20px',
    minWidth: '300px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    color: 'black',
  },
  confirmButton: {
    marginLeft:'180px',
    backgroundColor: 'black',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    width: '130px',
    cursor: 'pointer',
  },
  cancelButton: {
    backgroundColor: 'black',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    width: '100px',
    cursor: 'pointer',
  },
  ticketCountContainer: {
    display: 'flex',
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: '10px', 
  },
  
  countButton: {
    backgroundColor: 'black',
    width: '40px',
    height: '40px',
    color: 'white',
    borderRadius: '50%', 
    fontWeight: 'bolder',
    fontSize: '20px',
    display: 'inline-flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    cursor: 'pointer',
    margin: '0 9px', // Space between the buttons
  },

  ticketCount:{
    color:'black',
  }
};

export default Events;
