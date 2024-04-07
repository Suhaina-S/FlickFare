import React, { useState } from 'react';
import popcornImage from '../pics/popcorn.jpg'; // Import the popcorn image
import cocacolaImage from '../pics/cocacola.jpeg'; // Import the Coca-Cola image
import './Ticket.css'; // Import the CSS file for styling

function Tickets(props) {
  const popcornCost = 100; // Cost for each popcorn
  const frenchFriesCost = 80; // Cost for each french fries
  const momosCost = 70; // Cost for each momos

  const [totalAmount, setTotalAmount] = useState(0); // State for total amount
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [softDrinksQuantity, setSoftDrinksQuantity] = useState(0);
  const [foodOfferings, setFoodOfferings] = useState([]);
  const [selectedFlavor, setSelectedFlavor] = useState(''); // State for selected popcorn flavor
  const [selectedSeats, setSelectedSeats] = useState([]); // State for selected seats

  // Function to handle seat selection
  const handleSeatSelection = (seat) => {
    if (selectedSeats.includes(seat)) {
      // Deselect the seat if already selected
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else {
      // Select the seat if not selected
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleTogglePaymentDetails = () => {
    setShowPaymentDetails(!showPaymentDetails);
  };

  const handleConfirmBooking = () => {
    // Perform booking confirmation logic here (e.g., make API call to book seats)
    // For demonstration purpose, we just set bookingConfirmed to true
    setBookingConfirmed(true);
    // Calculate total amount based on selected seats, snacks, and drinks
    const seatsCost = selectedSeats.length * 120; // Assume seat cost is $120 each
    const totalCost = seatsCost + totalAmount;
    setTotalAmount(totalCost);
    handleTogglePaymentDetails();
  };

  const handleAddFoodOffering = (item, cost) => {
    setFoodOfferings(prevFoodOfferings => [...prevFoodOfferings, { item, cost }]);
    setTotalAmount(prevAmount => prevAmount + cost); // Increment total amount
  };

  const handleRemoveFoodOffering = (item, cost) => {
    const removedItemIndex = foodOfferings.findIndex(food => food.item === item);
    if (removedItemIndex !== -1) {
      const updatedFoodOfferings = [...foodOfferings];
      updatedFoodOfferings.splice(removedItemIndex, 1);
      setFoodOfferings(updatedFoodOfferings);
      setTotalAmount(prevAmount => prevAmount - cost); // Decrement total amount
    }
  };

  const handlePopcornSelection = (flavor, cost) => {
    setSelectedFlavor(flavor);
    handleAddFoodOffering(`Popcorn (${flavor})`, cost);
  };

  const handleBook = () => {
    alert(`Booking Summary:\nSnacks: Popcorn (${foodOfferings.filter(food => food.item.includes("Popcorn")).length}), French Fries (${foodOfferings.filter(food => food.item === "French Fries").length}), Momos (${foodOfferings.filter(food => food.item === "Momos").length})\nSoft Drinks: Coca-Cola (${softDrinksQuantity})\nTotal Amount: $${totalAmount}\nSelected Seats: ${selectedSeats.join(', ')}`);
  };

  // Function to reset all selections and booking status
  const handleReset = () => {
    setTotalAmount(0);
    setShowPaymentDetails(false);
    setBookingConfirmed(false);
    setSoftDrinksQuantity(0);
    setFoodOfferings([]);
    setSelectedFlavor('');
    setSelectedSeats([]);
  };

  // Function to simulate payment process
  const handlePayment = () => {
    // Mock payment processing
    alert('Payment successful! Your booking is confirmed.');
    handleConfirmBooking();
  };

  return (
    <div className="ticket-details">
      <h2>Food & Beverage Booking</h2>
      <div className="snacks-container">
        <div className="snacks-section">
          <h3>Snacks</h3>
          <div className="popcorn-selection">
            <img src={popcornImage} alt="Popcorn" />
            <select value={selectedFlavor} onChange={(e) => setSelectedFlavor(e.target.value)}>
              <option value="">Select Flavor</option>
              <option value="Sweet">Sweet</option>
              <option value="Spicy">Spicy</option>
              <option value="Salted">Salted</option>
            </select>
            <button onClick={() => handlePopcornSelection(selectedFlavor, popcornCost)}>Add Popcorn</button>
            <p>Cost: ${popcornCost}</p>
          </div>
          <div className="snacks-quantities-wrapper">
            <div className="snacks-quantities">
              <p>Popcorn Quantity: {foodOfferings.filter(food => food.item.includes("Popcorn")).length}</p>
              <p>French Fries Quantity: {foodOfferings.filter(food => food.item === "French Fries").length}</p>
              <p>French Fries Cost: ${foodOfferings.filter(food => food.item === "French Fries").length * frenchFriesCost}</p>
              <p>Momos Quantity: {foodOfferings.filter(food => food.item === "Momos").length}</p>
              <p>Momos Cost: ${foodOfferings.filter(food => food.item === "Momos").length * momosCost}</p>
            </div>
          </div>
          <div className="snacks-buttons">
            <button onClick={() => handleAddFoodOffering("French Fries", frenchFriesCost)}>Add French Fries</button>
            <button onClick={() => handleRemoveFoodOffering("French Fries", frenchFriesCost)}>Remove French Fries</button>
            <button onClick={() => handleAddFoodOffering("Momos", momosCost)}>Add Momos</button>
            <button onClick={() => handleRemoveFoodOffering("Momos", momosCost)}>Remove Momos</button>
          </div>
        </div>
        <div className="drinks-section">
          <img src={cocacolaImage} alt="Coca-Cola" />
          <h3>Coca-Cola Soft Drinks</h3>
          <div className="drinks-buttons">
            <button onClick={() => setSoftDrinksQuantity(prevQuantity => prevQuantity + 1)}>Add Coca-Cola</button>
            <button onClick={() => setSoftDrinksQuantity(prevQuantity => Math.max(prevQuantity - 1, 0))}>Remove Coca-Cola</button>
          </div>
          <p>Coca-Cola Quantity: {softDrinksQuantity}</p>
        </div>
      </div>
      <div className="seat-selection">
        <h3>Seat Selection</h3>
        <div className="seats">
          {/* Render seat components and handle seat selection */}
          {[...Array(12)].map((_, index) => (
            <button
              key={index}
              className={selectedSeats.includes(index + 1) ? 'selected' : ''} // Add 'selected' class if seat is selected
              onClick={() => handleSeatSelection(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      <div className="button-container">
        <button onClick={handleBook}>Book</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      {showPaymentDetails && (
        <div>
          <h2>Payment Details</h2>
          <p>Selected Seats: {selectedSeats.join(', ')}</p>
          <p>Total Amount: ${totalAmount}</p>
          <button onClick={handlePayment}>Proceed to Payment</button>
        </div>
      )}
      {bookingConfirmed && (
        <div>
          <h2>Booking Confirmed!</h2>
          <p>Thank you for booking your snacks and beverages.</p>
          
        </div>
      )}
    </div>
  );
}

export default Tickets;

