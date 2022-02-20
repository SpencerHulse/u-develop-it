const express = require("express");
const app = express();

const { router: apiRoutes } = require("./routes/api_routes/index");

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use("/api", apiRoutes);

// Default response to everything else
app.use((req, res) => {
  res.status(404).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, console.log(`The server is listening on port ${PORT}`));
