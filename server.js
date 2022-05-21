import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectToServer } from "./db/connect.js";
import BoardRouter from "./routes/BoardRoutes.js";
import ListRouter from "./routes/ListRoutes.js";
import CardRouter from "./routes/CardRoutes.js";
import ActionRouter from "./routes/ActionRoutes.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(BoardRouter);
app.use(ListRouter);
app.use(CardRouter);
app.use(ActionRouter);

app.use(function (err, _req, res) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

connectToServer((err) => {
  if (err) {
    console.error(err);
    process.exit();
  }
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});
