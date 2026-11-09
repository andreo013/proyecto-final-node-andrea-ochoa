
 // PROYECTO FINAL - NODE.JS
 // RUTAS DE PRODUCTOS

 // Importo Router para organizar las rutas de mi API.
 import { Router } from "express";

 // Importo las funciones del controlador de productos.
 import {
   listarProductos,
   buscarProductoPorId,
   agregarProducto,
   borrarProducto,
   modificarProducto,
 } from "../controllers/product.controller.js";

 // Importo el middleware que verifica los tokens JWT.
 import { verificarToken } from "../middlewares/auth.middleware.js";

 // Creo el enrutador de productos.
 const router = Router();

 // Permito consultar todos los productos sin iniciar sesión.
 router.get("/", listarProductos);

 // Permito buscar un producto por su ID sin iniciar sesión.
 router.get("/:id", buscarProductoPorId);

 // Exijo un token válido antes de crear un producto.
 router.post("/create", verificarToken, agregarProducto);

 // Exijo un token válido antes de eliminar un producto.
 router.delete("/:id", verificarToken, borrarProducto);

 // Permito actualizar productos solamente con un token válido.
router.put("/:id", verificarToken, modificarProducto);

 // Exporto las rutas para utilizarlas en index.js.
 export default router;
