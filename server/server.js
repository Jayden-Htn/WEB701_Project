import express from "express";
import cors from "cors";
import routes from "./routes/index.js";

// Set up server
const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/routes", routes);

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});