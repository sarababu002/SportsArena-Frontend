import React from 'react';

function Gym() {
  // Function to scroll to a specific section
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div>
      <div className="gym-bg">
        <img src="./images/gym-bg.jpg" alt="Gym Background" className="gym-image" />
        <div className="overlay"></div>
        <div className="quote">GET INTO THE SHAPE</div>
        <div className="mem_button">
          {/* Handle button clicks to scroll to the respective sections */}
          <button onClick={() => scrollToSection('pricings')}>MEMBERSHIP</button>
          <button onClick={() => scrollToSection('container')}>VIEW MORE</button>
        </div>
      </div>

      <div className="container" id="container">
        <h2>Fitness Plans & <span>Nutritions</span></h2>
        <div className="grid-container">
          <div className="grid-item">
            <img src="./images/weightlifting.png" alt="Icon 1" className="icon" />
            <p>Weight Loss</p>
          </div>
          <div className="grid-item">
            <img src="./images/exercise.png" alt="Icon 2" className="icon" />
            <p>Classic Yoga</p>
          </div>
          <div className="grid-item">
            <img src="./images/bicycle.png" alt="Icon 3" className="icon" />
            <p>Cycling</p>
          </div>
          <div className="grid-item">
            <img src="./images/dumbbell.png" alt="Icon 4" className="icon" />
            <p>Musculation</p>
          </div>
          <div className="grid-item">
            <img src="./images/arm-muscle.png" alt="Icon 5" className="icon" />
            <p>Body Building</p>
          </div>
          <div className="grid-item">
            <img src="./images/runner.png" alt="Icon 6" className="icon" />
            <p>Fitness Running</p>
          </div>
        </div>

        <h2>Subscribe To & <span>Plans</span></h2>
        <div className="pricings" id="pricings">
          <div className="membership-box">
            <h2>Standard</h2>
            <p>6 Month Plan</p>
            <h2>₹4800</h2>
            <p>₹800/month</p>
          </div>
          <div className="membership-box">
            <h2>Fitness</h2>
            <p>12 Month Plan</p>
            <h2>₹7200</h2>
            <p>₹600/month</p>
          </div>
          <div className="membership-box">
            <h2>Enterprise</h2>
            <p>24 Month Plan</p>
            <h2>₹12000</h2>
            <p>₹500/month</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gym;
