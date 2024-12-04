import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { applyToEvent } from '../Redux/Actions/ApplicationActions';
import { currentuser } from '../Redux/Actions/AuthActions';

const CardEvent = ({ el }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(currentuser());
  }, [dispatch]);

  const user = useSelector(state => state.AuthReducer.user);
  const participant = user && { name: user.name, email: user.email, _id: user._id };
  const token = localStorage.getItem('token');

  const handleApplyClick = () => {
    if (!user || !token) {
      alert('You must log in to apply for an event.');
      return;
    }
    dispatch(applyToEvent({ participant: user._id, event: el._id }));
  };

  return (
    <div 
      className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      style={{ width: '295px', height: '340px' }} // Set the overall card dimensions
    >
      <div className="relative">
        <Link to={`/EventPage/${el._id}`}>
          <img
            src={el.eventPic}
            alt={el.Game}
            className="rounded-t-lg"
            style={{ width: '295px', height: '170px' }} // Set image dimensions
          />
        </Link>
        <button style={{marginLeft :'15px' , marginBottom :'5px'}}
          onClick={handleApplyClick}
          className="absolute bottom-2 left-2 px-3 py-2 text-xs font-medium text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Apply
        </button>
      </div>
      <div
        className="p-3"
        style={{ width: '295px', height: '170px' }} // Set content dimensions
      >
        <Link to={`/EventPage/${el._id}`}>
          <h5 className="mb-1 text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
            {el.Game}
          </h5>
        </Link>
        <p className="mb-1 text-sm font-normal text-gray-700 dark:text-gray-400">{el.Location}</p>
        <p className="mb-1 text-sm font-normal text-gray-700 dark:text-gray-400">{el.Description}</p>
      </div>
    </div>
  );
};

export default CardEvent;
