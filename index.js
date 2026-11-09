
 // PROYECTO FINAL - NODE.JS
 // Andrea Ochoa

 // Importo Express para crear mi servidor.
 import express from "express";

 // Importo CORS para permitir solicitudes desde otras aplicaciones.
 import cors from "cors";

 // Importo body-parser para interpretar los datos JSON.
 import bodyParser from "body-parser";

 // Cargo las variables de entorno desde mi archivo .env.
 import "dotenv/config";

 // Importo las rutas de productos.
 import productRoutes from "./src/routes/product.routes.js";

 // Importo las rutas de autenticación.
 import authRoutes from "./src/routes/auth.routes.js";

 // Creo mi aplicación con Express.
 const app = express();

 // Habilito las solicitudes desde otros orígenes.
 app.use(cors());

 // Configuro la lectura de datos JSON.
 app.use(bodyParser.json());

 // Registro las rutas para administrar productos.
 app.use("/api/products", productRoutes);

 // Registro las rutas para iniciar sesión.
 app.use("/auth", authRoutes);

 // Creo una ruta principal para comprobar que mi API funciona.
 app.get("/", (req, res) => {
   res.send("API REST - Proyecto Final de Andrea Ochoa");
 });

 // Manejo las solicitudes a rutas que no existen.
 // Coloco este middleware después de todas las rutas válidas.
 app.use((req, res) => {
   return res.status(404).json({
     mensaje: "La ruta solicitada no existe"
   });
 });

 // Obtengo el puerto desde .env o utilizo 3000.
 const PORT = process.env.PORT || 3000;

 // Inicio mi servidor y muestro la dirección en la terminal.
 app.listen(PORT, () => {
   console.log(`Servidor funcionando en http://localhost:${PORT}`);
 });
