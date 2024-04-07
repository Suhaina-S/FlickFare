import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../App.css';
import munjummelBoysImage from '../pics/munjummel boys.jpeg';
import varisuImage from '../pics/varisu.jpeg';
import thunivuImage from '../pics/thunivu.jpeg';

import 'bootstrap/dist/css/bootstrap.min.css';
import Tickets from './Tickets';
import { Carousel } from 'react-bootstrap';

const SEAT_COST = 160;

const SCREENS = [
  {
    id: 1,
    time: '10:00am',
    seats: [1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1],
  },
  {
    id: 2,
    time: '2:00pm',
    seats: [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1],
  },
  {
    id: 3,
    time: '6:00pm',
    seats: [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
  },
];

const MOVIES = [
  {
    id: 1,
    title: 'Thunivu',
    image: thunivuImage,
    releaseDate: '2024-05-15',
    description: 'A thrilling action-packed movie set in a futuristic world.',
  },
  {
    id: 2,
    title: 'Varisu',
    image: varisuImage,
    releaseDate: '2024-06-20',
    description: 'A heartwarming family drama about love and sacrifice.',
  },
  {
    id: 3,
    title: 'Mangumil Boys',
    image: munjummelBoysImage,
    releaseDate: '2024-07-10',
    description: 'A group of friends on a hilarious adventure.',
  },
];

const MovieBooking = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedScreen, setSelectedScreen] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const location = useLocation();

  const handleSeatSelected = (index, screen) => {
    if (screen?.id !== selectedScreen?.id) {
      setSelectedSeats([index]);
      setSelectedScreen(screen);
      setTotalAmount(SEAT_COST);
      return;
    }

    let updatedSeats;
    if (selectedSeats.includes(index)) {
      updatedSeats = selectedSeats.filter((i) => i !== index);
    } else {
      updatedSeats = [...selectedSeats, index];
    }

    const amount = updatedSeats.length * SEAT_COST;
    setSelectedSeats(updatedSeats);
    setTotalAmount(amount);
  };

  const handleBooking = () => {
    if (selectedScreen) {
      const updatedScreens = SCREENS.map((screen) => {
        if (screen.id === selectedScreen.id) {
          const seats = screen.seats.slice();
          selectedSeats.forEach((seat) => (seats[seat] = 0));
          return {
            ...screen,
            seats,
          };
        }
        return screen;
      });

      const amount = selectedSeats.length * SEAT_COST;
      setTotalAmount(amount);

      setSelectedMovie(null);
      setSelectedScreen(null);
      setSelectedSeats([]);

      alert(
        `Seats ${selectedSeats.map((index) => index + 1).join(", ")} booked for ${selectedMovie.title} at ${selectedScreen.time}. Total amount: $${amount}`
      );
    } else {
      alert("Please select a screen.");
    }
  };

  const handleDownloadSummary = () => {
    if (!selectedScreen || selectedSeats.length === 0) {
      alert("Please select seats before downloading the summary.");
      return;
    }

    const amount = selectedSeats.length * SEAT_COST;

    const summaryDetails = `
      Selected Screen: ${selectedScreen?.id}
      Time: ${selectedScreen?.time}
      Movie: ${selectedMovie.title}
      Selected Seats: ${selectedSeats.map((index) => index + 1).join(", ")}
      No of tickets: ${selectedSeats?.length}
      Total Amount: $${amount}
    `;
    
    const blob = new Blob([summaryDetails], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'booking_summary.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Function to filter movies based on search term
  const filteredMovies = MOVIES.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = () => {
    // Perform search operations here
    console.log("Search button clicked");
    // No need to do anything here, as filteredMovies state is updated automatically due to useState hook
  };

  return (
    <div className="App" style={{ backgroundImage: `url('/path/to/background/image.jpg')` }}>
      <h1 className="rainbow-text">Movie Booking App</h1>
      
      {/* Search Bar */}
      <div className="search-bar-container">
  <input
    type="text"
    placeholder="Search for a movie..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="search-bar"
  />
  
       </div>
      
      {location.pathname !== '/Tickets' && (
        <div>
          <h2>Choose your movie:</h2>
          <Carousel>
  {filteredMovies.map((movie) => (
    <Carousel.Item key={movie.id} onClick={() => setSelectedMovie(movie)}>
      <div style={{ height: '60vh', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: 'calc(100% - 2in)', height: '100%', display: 'flex', justifyContent: 'center' }}>
          <img
            className="d-block"
            src={movie.image}
            alt={movie.title}
            style={{ maxWidth: '100%', maxHeight: '100%' }}
          />
        </div>
      </div>
      <Carousel.Caption>
        <h3>{movie.title}</h3>
      </Carousel.Caption>
    </Carousel.Item>
  ))}
</Carousel>

          
                  </div>
      )}
      
      {selectedMovie && (
        <>
          <h2>Choose your screen</h2>
          <div className="screen-selection">
            {SCREENS.map((screen) => (
              <div
                key={screen.id}
                className={`screen ${screen.id === selectedScreen?.id ? 'selected' : ''}`}
                onClick={() => setSelectedScreen(screen)}
              >
                <div className="screen-number">Screen {screen.id}</div>
                <div className="screen-time" style={{ color: 'blue' }}>{screen.time}</div>
                <div className="movie-title">{selectedMovie.title}</div>
                <div className="screen-seats">
                  {screen.seats.map((seat, index) => (
                    <div
                      key={index}
                      className={`seat ${seat ? 'available' : 'unavailable'} ${
                        selectedSeats.includes(index) && selectedScreen?.id === screen.id ? 'selected' : ''
                      } ${selectedSeats.includes(index) ? 'booked' : ''}`}
                      onClick={() => {
                        if (seat) {
                          handleSeatSelected(index, {
                            ...screen,
                            movie: selectedMovie,
                          });
                        }
                      }}
                    >
                      <div className="seat-number">{index + 1}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      
      <div className="booking-summary">
        <div className="selected-screen">
          {selectedScreen && (
            <div>
              <h3>Selected Screen: {selectedScreen?.id}</h3>
              <p>Time: {selectedScreen?.time}</p>
              <p>Movie: {selectedMovie && selectedMovie.title}</p>
            </div>
          )}
        </div>
        <div className="selected-seat">
          {selectedScreen && selectedSeats?.length > 0 && (
            <div>
              <h3>Selected Seats: {selectedSeats.map((index) => index + 1).join(", ")}</h3>
              <h3>No of tickets: {selectedSeats?.length}</h3>
              <h3>Total Amount: ${totalAmount}</h3>
            </div>
          )}
        </div>
      </div>
      
      <button
        className="payment-button"
        onClick={handleBooking}
        disabled={!selectedScreen || selectedSeats?.length === 0}
      >
        Book now
      </button>
      
      <button
        className="download-button"
        onClick={handleDownloadSummary}
        disabled={!selectedScreen || selectedSeats?.length === 0}
        style={{ backgroundColor: 'green', color: 'white' }}
      >
        Download Summary
      </button>
      
      <div className="upcoming-movies">
        <h2>Upcoming Movies</h2>
        <p>Check out our exciting lineup of upcoming movies!</p>
        <div className="scroll-container"> {/* Wrap the movie cards with a scroll container */}
          <div className="upcoming-movie-cards">
            {MOVIES.map((movie) => (
              <div key={movie.id} className="upcoming-movie-card">
                <div className="image-wrapper">
                  <img src={movie.image} alt={movie.title} />
                </div>
                <h3>{movie.title}</h3>
                <p>{movie.description}</p>
                <p>Release Date: {movie.releaseDate}</p>
              </div>
            ))}
          </div>
        </div>
        
        <Link
          to={{
            pathname: "/Tickets",
            state: {
              selectedScreen,
              selectedSeats,
              totalAmount,
              selectedMovie
            },
          }}
          className="btn btn-default border w-100 bg-red rounded-0 text-decoration-none"
        >
          Order Your foods
        </Link>
      </div>
    </div>
  );
};

export default MovieBooking;
