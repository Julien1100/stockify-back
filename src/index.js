import express from "express";
import volleyball from "volleyball";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const port = process.env.PORT;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.DATABASE_URL);
  console.log("[DATABASE] - Database is running");
}

app.use(volleyball);
app.use(cors());

app.get("/", (req, res) => {
  res.send("Stockify");
});

app.listen(port, () => {
  console.log(`Stockify running - http://localhost:${port}`);
});
