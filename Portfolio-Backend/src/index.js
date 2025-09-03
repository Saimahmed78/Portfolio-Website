import app from "../src/app.js";
import dotenv from "dotenv";
dotenv.config({
  path: ".env", // relative path is /home/saimahmed/Desktop/Folder/.env
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`PORT is listening on ${PORT}`);
});
