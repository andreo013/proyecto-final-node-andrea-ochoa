
// PROYECTO FINAL - NODE.JS
// RUTAS DE AUTENTICACIÓN

// Importo Router de Express para organizar
// las rutas relacionadas con la autenticación.
import { Router } from "express";

// Importo la función del controlador
// que se encarga de procesar el inicio de sesión.
import { login } from "../controllers/auth.controller.js";

// Creo un enrutador para administrar las rutas de autenticación.
const router = Router();

// --------------------------------------------------
// RUTA 1: INICIAR SESIÓN
// --------------------------------------------------

// Defino una ruta POST para recibir las credenciales
// del usuario y enviarlas al controlador de autenticación.
router.post("/login", login);

// Exporto el enrutador para poder utilizarlo
// desde el archivo principal index.js.
export default router;
