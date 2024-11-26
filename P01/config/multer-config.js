const multer = require("multer");


// The first line creates a memory storage engine for handling file uploads in memory,
//  while the second line initializes Multer with this memory storage configuration as
//  middleware for handling file uploads in an Express application.
const storage = multer.memoryStorage();
const upload = multer({ storage: storage});

module.exports = upload;