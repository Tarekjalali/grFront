import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getevents } from '../Redux/Actions/EventsActions';
import CardEvent from './CardEvent';
import LoadingSpinner from './LoadingSpinner'; // Import the LoadingSpinner component
import {  useNavigate } from 'react-router-dom';

const Events = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.AuthReducer.user);
  const token = localStorage.getItem('token');

  const errors = useSelector(state=>state.ErrorsReducer)

  useEffect(() => {
    dispatch(getevents());
  }, [dispatch]);

  const events = useSelector((state) => state.eventsReducer.events);

  // State to store search query and filtered events
  const [search, setSearch] = useState('');
  const [filteredEvents, setFilteredEvents] = useState(events);

  // Handle search button click
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent form submission

    // If the search input is not empty, filter events
    if (search.length > 0) {
      const filtered = events.filter((event) =>
        event.Game.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredEvents(filtered);
    } else {
      // If the search input is empty, reset to original events
      setFilteredEvents(events);
    }
  };

  // Handle input field change
  const handleInputChange = (e) => {
    setSearch(e.target.value); // Update the search state
  };

  // Effect to reset filtered events whenever search is cleared
  useEffect(() => {
    if (search === '') {
      setFilteredEvents(events); // Reset to original events when search is cleared
    }
  }, [search, events]); // Trigger effect when search or events change

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
    <div>
      

      <div>
        {
          errors.length >0 && <>{errors.map((el,i,t)=>alert(el.msg))}</>
        }
      </div>
      <div style={{ marginBottom: '20px', marginTop: '20px' }}>
        <form className="flex items-center max-w-lg mx-auto" onSubmit={handleSearch}>
          <label htmlFor="voice-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <input
              type="text"
              id="voice-search"
              value={search}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Events"
              required
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="w-4 h-4 me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            Search
          </button>
          <button
            type="button"
            onClick={handleCreateEventClick}
            className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            style={{ width: '175px' }}
          >
            Create Event
          </button>
        </form>
      </div>

      <div style={{ display: 'flex', gap: '25px', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
        {events.length === 0 ? (
          <LoadingSpinner /> // Show LoadingSpinner if no events
        ) : filteredEvents.length > 0 ? (
          filteredEvents.map((el) => <CardEvent key={el._id} el={el} />)
        ) : (
          <h1>No events found</h1>
        )}
      </div>

      {/* Flowbite Popover for Login Reminder */}
      <div style ={{position: 'fixed', top: '10px', right: '575px'}}
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

export default Events;
