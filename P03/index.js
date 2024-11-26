// Import necessary modules
const express = require("express"); // Express framework
const socketio = require("socket.io"); // Socket.IO for real-time communication
const http = require("http"); // HTTP module for server
const path = require("path"); // Path module for file paths

// Initialize the Express application
const app = express();
// Create an HTTP server
const server = http.createServer(app);
// Set up Socket.IO on the server
const io = socketio(server);

// Set the view engine to EJS for rendering views
app.set("view engine", "ejs");
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from 'public'

// Handle new connections with Socket.IO
io.on("connection", function (socket) {
  console.log("connected"); // Log when a client connects

  // Listen for location data sent from the client
  socket.on("send-location", function (data) {
    // Broadcast the location to all connected clients
    io.emit("recive-location", {
      id: socket.id, // Include the sender's socket ID
      ...data, // Spread the location data
    });
  });

  // Listen for disconnect events
  socket.on("disconnect", function () {
    // Notify all clients that a user has disconnected
    io.emit("user-disconnected", socket.id);
  });
});

// Define the route for the root URL
app.get("/", function (req, res) {
  res.render("index"); // Render the index view
});

// Start the server and listen on port 8000
server.listen(8000, () => {
  console.log("Server Start"); // Log when the server starts
});
