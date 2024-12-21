import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const heroSectionStyle = {
    width: '100%',
    height: '40vh',
    backgroundImage: `url('https://wallpapercave.com/wp/wp3173690.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundAttachment: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: 'white',
  };

  const handleCreateEventClick = () => {
    if (token) {
      navigate('/AddEvent'); // Navigate to event creation page if token exists
    } else {
      // Trigger popover to show login message if no token
      const popover = document.getElementById('popover-click');
      popover.classList.remove('invisible', 'opacity-0');
      popover.classList.add('visible', 'opacity-100');

      // Hide the popover after 3 seconds
      setTimeout(() => {
        popover.classList.remove('visible', 'opacity-100');
        popover.classList.add('invisible', 'opacity-0');
      }, 3000); // 3000ms = 3 seconds
    }
  };

  return (
    <div style={heroSectionStyle}>
      <img
        src="https://i.ibb.co/6XQG9Ym/LOGO-removebg-preview.png"
        alt="Your Logo"
        className="rounded-lg"
        style={{ width: '110px', height: '110px', borderRadius: '10px' }}
      />
      <h1>Compete, Connect, Conquer. </h1>
      <h1> The Game Starts Here.</h1>

      <br />
      <div>
        <Link
          to="/Events"
          className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Find Events
        </Link>
        <button
          onClick={handleCreateEventClick}
          className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Create Your Event
        </button>
      </div>

      {/* Flowbite Popover for Login Reminder */}
      <div
        id="popover-click"
        role="tooltip"
        className="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
      >
        <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white">Please Login</h3>
        </div>
        <div className="px-3 py-2">
          <p>You need to log in to create an event. Please log in first!</p>
        </div>
        <div data-popper-arrow></div>
      </div>
    </div>
  );
};

export default HeroSection;
