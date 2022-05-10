import express from "express";
import router from "./routes.js";

const PORT = 8000;
const app = express();

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
