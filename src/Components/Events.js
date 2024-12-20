const Events = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const user = useSelector(state => state.AuthReducer.user);
  const token = localStorage.getItem('token');

  useEffect(() => {
    dispatch(getevents()).finally(() => setLoading(false)); // Set loading to false when fetching is done
  }, [dispatch]);

  const events = useSelector(state => state.eventsReducer.events);
  const [search, setSearch] = useState('');
  const [filteredEvents, setFilteredEvents] = useState(events);

  useEffect(() => {
    if (search === '') {
      setFilteredEvents(events);
    }
  }, [search, events]);

  // Show a loading spinner or message while the events are being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div style={{ marginBottom: '20px', marginTop: '20px' }}>
        <form className="flex items-center max-w-lg mx-auto" onSubmit={handleSearch}>
          <label htmlFor="voice-search" className="sr-only">Search</label>
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
          <button type="submit" className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Search
          </button>
        </form>
      </div>

      <div style={{ display: 'flex', gap: '25px', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((el) => <CardEvent key={el._id} el={el} />)
        ) : (
          <h1>No events found</h1>
        )}
      </div>
    </div>
  );
};
