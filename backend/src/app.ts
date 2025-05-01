import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import progressRoutes from "./routes/progress";

dotenv.config();

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB Connection error", err));

app.get("/", (req, res) => {
  res.send("HEllo World !");
});

app.use("/api/progress", progressRoutes);

app.listen(PORT, () => {
  console.log(`App is listening on Port ${PORT}`);
});
