/* IMPORTS OF LIBRARIES */
import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";

/**
 * Configures the server by loading environment variables, setting up middleware, defining routes, and connecting to the
 * MongoDB database.
 *
 * @throws Exception if there is an error connecting to the MongoDB database.
 */
dotenv.config();
const app = express();
const corsOptions = {
  origin: [process.env.ORIGIN],
  credentials: true,
};
/* CONFIGURATION OF MIDDLEWARES */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors(corsOptions));

app.use("/images", express.static(path.join(__dirname, "public/images")));

/* CONFIGURATION OF ROUTES */
import userRoutes from "./routes/user.routes.js";
import formRoutes from "./routes/form.routes.js";

app.use("/users", userRoutes);
app.use("/solicitudes", formRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 5001;

mongoose.set("strictQuery", false);
mongoose.set("strictPopulate", false);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
    dbName: process.env.DB_NAME,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
