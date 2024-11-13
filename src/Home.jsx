import React, { useState } from 'react';

const Home = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setError('');
        setSuccess('');

        // Basic validation
        if (!email || !message) {
            setError('All fields are required!');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/home/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken'), // Include CSRF token if necessary
                },
                body: JSON.stringify({ email, message }),
            });
        
            console.log('Response:', response); // Log the response object
        
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error Response:', errorData); // Log the error response for debugging
                throw new Error(errorData.error || 'Something went wrong!');
            }
        
            const data = await response.json(); // Parse the response as JSON
            setSuccess(data.success);
        } catch (err) {
            setError(err.message);
            console.error('Fetch Error:', err); // Log the error for debugging
        }
        
    };

    // Function to get CSRF token from cookies if needed
    const getCookie = (name) => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    };
    
  return (
    <div>
        <div className="video-container">
  <img src="images/background1.jpg" alt="bg-img" className="background-img"/>
  <div className="caption">The perfect play surface,<br/>Rain or Shine</div>
  <div className="book">
    <a href="/booking" className="book-button">
      <b>Book Now</b>
    </a>
  </div>
</div>

<div className="pics">
  <img src="images/football_turf2.jpg" alt="Football Turf 1"/>
  <img src="images/cricket_turf.jpg" alt="Cricket Turf"/>
  <img src="images/football_turf3.jpg" alt="Football Turf 2"/>
  <img src="images/batminton.jpg" alt="Badminton Turf"/>
  <img src="images/football_turf4.jpg" alt="Football Turf 3"/>
</div>

<hr/>
<h2 className="sports-available">Sports Available</h2>

<div className="avail-sports">
            <div className="sport">
                <img
                    src="https://tse2.mm.bing.net/th/id/OIP.oX4TFbay100bTuNNjhdQ6gHaHa?rs=1&pid=ImgDetMain"
                    alt="Football"
                />
                <div className="rates">
                    Rates:<br />
                    Standard: ₹1000<br />
                    Premium: ₹1500<br />
                    Deluxe: ₹2000
                </div>
                <h3>Football</h3>
            </div>
            <div className="sport">
                <img
                    src="https://5.imimg.com/data5/WZ/OZ/WE/SELLER-65772240/kashmir-willow-cricket-bat-1000x1000.jpg"
                    alt="Cricket"
                />
                <div className="rates">
                    Rates:<br />
                    Standard: ₹1000<br />
                    Premium: ₹1500<br />
                    Deluxe: ₹2000
                </div>
                <h3>Cricket</h3>
            </div>
            <div className="sport">
                <img
                    src="https://tse2.mm.bing.net/th/id/OIP.xCcxXK09COHnyxrCCKvpwgHaE8?rs=1&pid=ImgDetMain"
                    alt="Badminton"
                />
                <div className="rates">
                    Rates:<br />
                    Standard: ₹1000<br />
                    Premium: ₹1500<br />
                    Deluxe: ₹2000
                </div>
                <h3>Badminton</h3>
            </div>
        </div>
        <div className="avail-sports">
            <div className="sport">
                <img
                    src="https://tse4.mm.bing.net/th/id/OIP.2S7vfMQQmEKnPNRMPNNTNAHaHP?w=177&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"
                    alt="Basketball"
                />
                <div className="rates">
                    Rates:<br />
                    Standard: ₹1000<br />
                    Premium: ₹1500<br />
                    Deluxe: ₹2000
                </div>
                <h3>Basketball</h3>
            </div>
            <div className="sport">
                <img
                    src="https://tse4.mm.bing.net/th/id/OIP.5lMjN2NEo94rK7rkH5ILjQHaHa?rs=1&pid=ImgDetMain"
                    alt="Volleyball"
                />
                <div className="rates">
                    Rates:<br />
                    Standard: ₹1000<br />
                    Premium: ₹1500<br />
                    Deluxe: ₹2000
                </div>
                <h3>Volleyball</h3>
            </div>
           
        </div>

  
    <hr/>
    <h2 className="sports-available">Contact Us</h2>
    <div className="location" id="location">
           
            <div className="contact-container">
                <div className="map-container">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62866.38998763225!2d76.3063860202837!3d10.004517715714774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080c9f1bd6ab8d%3A0x1e48f13514048cb6!2sUnited%20Sports%20Center!5e0!3m2!1sen!2sin!4v1729018125851!5m2!1sen!2sin" width="700" height="550" style={{border:"0"}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
        
                <div className="contact" id="contact" style={{backgroundColor: "white"}}>
                    <h3 style={{textAlign: "center"}}>Send us a message</h3>
                    <form onSubmit={handleSubmit} method="post">
            <div className="form-column">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label htmlFor="message">Message:</label>
                <textarea
                    id="message"
                    name="message"
                    placeholder="Write your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />

                <button type="submit" className="submit-button">Send Message</button>
            </div>
            {/* {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>} */}
        </form>
                    <div className="contact-info-column">
                        <div className="contact-info">
                            <img style={{width: "30px" }}src="images/whatsapp.png" alt="whatsapp"/>
                            <p className="small-text">+91 8281542361</p>
                        </div>
                        <div className="contact-info">
                            <img style={{width: "30px"}} src="images/email.png" alt="email"/>
                            <p className="small-text">campionssportarena@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home