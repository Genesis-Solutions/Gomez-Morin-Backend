/* IMPORTS DE LIBRERÍAS */
import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import multer from "multer";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
const corsOptions = {
  origin: [process.env.ORIGIN],
  credentials: true,
};
/* CONFIGURACION DE MIDDLEWARES */
const __filename = fileURLToPath(import.meta.url); //import.meta.url obtiene la url del server y fileURLtoPath la convierte en directorio adecuado al OS (incluye el archivo)
const __dirname = path.dirname(__filename); //path.dirname Obtiene el directorio de un archivo sin el archivo: de C:/Documentos/test.txt regresa -> C:/Documentos
app.use(express.json()); //Parsea los Jsons
app.use(helmet()); //Protege las APIs y no muestra las tecnologías usadas del Backend los headers
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); //Permite recibir peticiones de un orígen diferente para leer recursos del Backend
app.use(morgan("common")); //Loggea las peticiones hechas al Backend
app.use(cookieParser()) //Parsea las cookies
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); //Parseo del form
app.use(cors(corsOptions)); //Permite recibir peticiones de diferentes orígenes para cargar recursos al Backend (Se puede configurar para que acepte sólo de ciertos dominios)

/*Ruta para acceder a las imagenes serán recursos estáticos en local,
  en producción no es necesario, se guardan en el bucket y se consultan igual
*/
app.use("/images", express.static(path.join(__dirname, "public/images")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    cb(null, `${timestamp}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.use(upload.single("urlImg"));

/* CONFIGURACIÓN DE RUTAS */
import userRoutes from "./routes/user.routes.js";

app.use("/users", userRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 5001;

mongoose.set("strictQuery", false);
mongoose.set("strictPopulate", false);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true, //make this also true
    dbName: process.env.DB_NAME,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));

