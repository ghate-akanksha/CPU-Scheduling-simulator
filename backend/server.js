const express = require("express");
const cors = require("cors");

// Import Routes
const scheduleRoutes = require("./routes/scheduleRoutes");

const app = express();


// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());


// ================= ROUTES =================
app.use("/api/schedule", scheduleRoutes);


// ================= HEALTH CHECK =================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CPU Scheduling Backend Running 🚀"
  });
});


// ================= 404 HANDLER =================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});


// ================= GLOBAL ERROR HANDLER =================
app.use((err, req, res, next) => {
  console.error("Error:", err.message);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: err.message
  });
});


// ================= SERVER START =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});