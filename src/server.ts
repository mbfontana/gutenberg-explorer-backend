import express from "express";
import cors from "cors";
import router from "./routes";
import dotenv from "dotenv";
import errorHandler from "./middlewares/errorHandler";

dotenv.config();

const app = express();

app.use(express.json())
app.use(cors());
app.use(router);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});
