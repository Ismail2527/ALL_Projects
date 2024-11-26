// Initialize a socket connection
const socket = io();

// Check if the browser supports geolocation
if (navigator.geolocation) {
  // Continuously watch the user's position
  navigator.geolocation.watchPosition(
    (position) => {
      // Extract latitude and longitude from the position
      const { latitude, longitude } = position.coords;
      // Emit the user's location to the server
      socket.emit("send-location", { latitude, longitude });
    },
    (error) => {
      // Log any errors that occur while trying to get the location
      console.error(error);
    },
    {
      // Options for geolocation
      enableHighAccuracy: true, // Request high accuracy
      maximumAge: 0, // Do not use a cached position
      timeout: 2500, // Timeout after 2.5 seconds
    }
  );
}

// Initialize the map centered at [0, 0] with zoom level 10
const map = L.map("map").setView([0, 0], 10);

// Add OpenStreetMap tile layer to the map
L.tileLayer("https://a.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

// Object to store markers on the map
const markers = {};

// Listen for incoming location data from the server
socket.on("recive-location", (data) => {
  // Destructure id, latitude, and longitude from the received data
  const { id, latitude, longitude } = data;
  // Update the map view to the new location
  map.setView([latitude, longitude], 15);
  // Check if a marker for the user already exists
  if (markers[id]) {
    // Update the existing marker's position
    markers[id].setLatLong([latitude, longitude]);
  } else {
    // Create a new marker and add it to the map
    markers[id] = L.marker([latitude, longitude]).addTo(map);
  }
});

// Listen for user disconnection events from the server
socket.on("user-disconnected", (id) => {
  // Check if the marker for the disconnected user exists
  if (markers[id]) {
    // Remove the marker from the map
    map.removeLayer(markers[id]);
    // Delete the marker from the markers object
    delete markers[id];
    // Log that the user has disconnected
    console.log("Disconnected from server");
  }
});
