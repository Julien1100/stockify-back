import express from "express";
import bodyParser from "body-parser";
import volleyball from "volleyball";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";

import productRouter from "./routes/productRoute";

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

app.use("/products", productRouter);

app.listen(port, () => {
  console.log(`Stockify running - http://localhost:${port}`);
});
