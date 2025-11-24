import express from "express";
import environments from "./src/api/config/environments.js";
import cors from "cors";
import { loggerUrl } from "./src/api/middlewares/middlewares.js";
import { productRoutes } from "./src/api/routes/index.js";

const app = express();
const PORT = environments.port;

app.use(cors());
app.use(express.json());

app.use(loggerUrl);

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});