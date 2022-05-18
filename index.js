import express from "express";
import router from "./routes.js";

const PORT = 8000;
const app = express();

export const uri =
  "mongodb+srv://alexreb:CZ8K8iPVpx2AHp8@cluster0.ianf7.mongodb.net/Cluster0?retryWrites=true&w=majority";

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
