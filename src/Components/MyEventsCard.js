import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { deleteEvent } from '../Redux/Actions/EventsActions';

const MyEventsCard = ({ el, userId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    dispatch(deleteEvent(el._id, location, navigate, userId));
    setIsModalOpen(false); // Close the modal after deleting
  };

  return (
    <div
      className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      style={{ width: '295px', height: '340px' }} // Card dimensions
    >
      <div className="relative">
        <Link to={`/EventPage/${el._id}`}>
          <img
            src={el.eventPic}
            alt={el.Game}
            className="rounded-t-lg"
            style={{ width: '295px', height: '170px', objectFit: 'cover' }} // Image dimensions
          />
        </Link>
      </div>
      <div
        className="p-3 flex flex-col justify-between"
        style={{ width: '295px', height: '170px' }} // Content area dimensions
      >
        <div>
          <Link to={`/EventPage/${el._id}`}>
            <h5 className="mb-1 text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
              {el.Game}
            </h5>
          </Link>
          <p className="mb-1 text-sm font-normal text-gray-700 dark:text-gray-400">{el.Location}</p>
          <p className="mb-1 text-sm font-normal text-gray-700 dark:text-gray-400">{el.Description}</p>
        </div>
        <div className="flex space-x-2 mt-2">
          <button
            onClick={() => navigate(`/ParticipantList/${el._id}`)}
            className="px-3 py-2 text-xs font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Participants
          </button>
          <button
            onClick={() => navigate(`/UpdateEvent/${el._id}`)}
            className="px-3 py-2 text-xs font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800"
          >
            Update
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-3 py-2 text-xs font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          id="popup-modal"
          className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50"
        >
          <div className="bg-white rounded-lg shadow dark:bg-gray-700 max-w-md p-6">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this event?
            </h3>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800"
              >
                Yes, I'm sure
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyEventsCard;
