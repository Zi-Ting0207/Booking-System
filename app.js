// Retrieve bookings from Local Storage or initialize empty array
let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

// Function to check booking limits
function isBookingAllowed(name, date, startTime, endTime) {
    const userBookings = bookings.filter(booking => booking.date === date && booking.name === name);

    // Check if more than 2 bookings exist for the day for this user
    if (userBookings.length >= 2) {
        alert("You can only make 2 bookings per day.");
        return false;
    }

    // Check if booking exceeds 1 hour
    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);
    const duration = (end - start) / (1000 * 60); // in minutes

    if (duration > 60) {
        alert("Each booking can only be up to 1 hour long.");
        return false;
    }
    return true;
}

// Function to display bookings
function loadBookings() {
    const bookingList = document.getElementById("bookingList");
    bookingList.innerHTML = ""; // Clear current list

    bookings.forEach((booking, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `Name: ${booking.name}, Date: ${booking.date}, From: ${booking.startTime} to ${booking.endTime}`;
        
        // Add a delete button for each booking
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            deleteBooking(index);
        });
        
        listItem.appendChild(deleteButton);
        bookingList.appendChild(listItem);
    });
}

// Function to save a new booking
function saveBooking(name, date, startTime, endTime) {
    bookings.push({ name, date, startTime, endTime });
    localStorage.setItem("bookings", JSON.stringify(bookings));
    loadBookings(); // Refresh the list
}

// Function to delete a booking
function deleteBooking(index) {
    bookings.splice(index, 1); // Remove booking at given index
    localStorage.setItem("bookings", JSON.stringify(bookings));
    loadBookings(); // Refresh the list
}

// Handle form submission
document.getElementById("bookingForm").addEventListener("submit", (e) => {
    e.preventDefault();
    
    const name = document.getElementById("name").value;
    const date = document.getElementById("date").value;
    const startTime = document.getElementById("startTime").value;
    const endTime = document.getElementById("endTime").value;

    // Check if booking meets criteria
    if (isBookingAllowed(name, date, startTime, endTime)) {
        // Save the booking
        saveBooking(name, date, startTime, endTime);
        
        // Clear the form
        document.getElementById("bookingForm").reset();
    }
});

// Initial load of bookings
loadBookings();
