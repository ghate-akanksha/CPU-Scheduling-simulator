const express = require("express");

const cors = require("cors");

// Import Routes
const scheduleRoutes =
  require("./routes/scheduleRoutes");

const app = express();


// Middleware
app.use(cors());

app.use(express.json());


// Routes
app.use("/api/schedule", scheduleRoutes);


// Default Route
app.get("/", (req, res) => {

  res.send("CPU Scheduling Backend Running");

});


// Server Port
const PORT = 5000;


// Start Server
app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

});