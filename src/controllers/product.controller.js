
// PROYECTO FINAL - NODE.JS
// CONTROLADOR DE PRODUCTOS

// Importo las funciones del servicio que necesito
// para consultar, crear y eliminar productos.
import {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  eliminarProducto,
  actualizarProducto,
} from "../services/product.service.js";

// --------------------------------------------------
// FUNCIÓN 1: OBTENER TODOS LOS PRODUCTOS
// --------------------------------------------------

// Creo una función para responder con el listado de productos.
export const listarProductos = async (req, res) => {
  try {
    // Solicito todos los productos al servicio.
    const productos = await obtenerProductos();

    // Devuelvo los productos con el código HTTP 200.
    return res.status(200).json(productos);
  } catch (error) {
    // Muestro el error en la terminal.
    console.error("Error al obtener los productos:", error);

    // Informo que ocurrió un error interno.
    return res.status(500).json({
      mensaje: "Error interno al obtener los productos",
    });
  }
};

// --------------------------------------------------
// FUNCIÓN 2: BUSCAR UN PRODUCTO POR SU ID
// --------------------------------------------------

// Creo una función para buscar un producto por su ID.
export const buscarProductoPorId = async (req, res) => {
  try {
    // Obtengo el ID enviado en la dirección URL.
    const { id } = req.params;

    // Busco el producto utilizando el servicio.
    const producto = await obtenerProductoPorId(id);

    // Si el producto no existe, devuelvo el código HTTP 404.
    if (!producto) {
      return res.status(404).json({
        mensaje: "Producto no encontrado",
      });
    }

    // Si existe, devuelvo sus datos con el código HTTP 200.
    return res.status(200).json(producto);
  } catch (error) {
    // Muestro el error en la terminal.
    console.error("Error al buscar el producto:", error);

    // Informo que ocurrió un error interno.
    return res.status(500).json({
      mensaje: "Error interno al buscar el producto",
    });
  }
};

// --------------------------------------------------
// FUNCIÓN 3: CREAR UN PRODUCTO NUEVO
// --------------------------------------------------

// Creo una función para recibir y guardar productos nuevos.
export const agregarProducto = async (req, res) => {
  try {
    // Obtengo los datos enviados en el cuerpo de la solicitud.
    const { nombre, precio, categoria } = req.body || {};

    // Compruebo que el nombre y la categoría sean textos
    // y que no estén vacíos.
    if (
      typeof nombre !== "string" ||
      nombre.trim() === "" ||
      typeof categoria !== "string" ||
      categoria.trim() === ""
    ) {
      return res.status(400).json({
        mensaje: "El nombre y la categoría son obligatorios",
      });
    }

    // Compruebo que el precio sea un número válido
    // y que no sea negativo.
    if (
      typeof precio !== "number" ||
      !Number.isFinite(precio) ||
      precio < 0
    ) {
      return res.status(400).json({
        mensaje: "El precio debe ser un número válido y no negativo",
      });
    }

    // Preparo los datos que voy a guardar en Firestore.
    const datosProducto = {
      nombre: nombre.trim(),
      precio,
      categoria: categoria.trim(),
    };

    // Solicito al servicio que cree el producto.
    const nuevoProducto = await crearProducto(datosProducto);

    // Devuelvo el producto creado con el código HTTP 201.
    return res.status(201).json(nuevoProducto);
  } catch (error) {
    // Muestro el error en la terminal.
    console.error("Error al crear el producto:", error);

    // Informo que ocurrió un error interno.
    return res.status(500).json({
      mensaje: "Error interno al crear el producto",
    });
  }
};

// --------------------------------------------------
// FUNCIÓN 4: ELIMINAR UN PRODUCTO POR SU ID
// --------------------------------------------------

// Creo una función para responder a las solicitudes DELETE.
export const borrarProducto = async (req, res) => {
  try {
    // Obtengo el ID del producto desde la dirección URL.
    const { id } = req.params;

    // Solicito al servicio que elimine el producto.
    const eliminado = await eliminarProducto(id);

    // Si el producto no existe, devuelvo HTTP 404.
    if (!eliminado) {
      return res.status(404).json({
        mensaje: "Producto no encontrado",
      });
    }

    // Si se eliminó, devuelvo HTTP 200 y un mensaje.
    return res.status(200).json({
      mensaje: "Producto eliminado correctamente",
    });
  } catch (error) {
    // Muestro el error en la terminal.
    console.error("Error al eliminar el producto:", error);

    // Informo que ocurrió un error interno.
    return res.status(500).json({
      mensaje: "Error interno al eliminar el producto",
    });
  }
};


 // --------------------------------------------------
 // FUNCIÓN 5: ACTUALIZAR UN PRODUCTO
 // --------------------------------------------------

 // Creo una función para actualizar los datos de un producto.
 export const modificarProducto = async (req, res) => {
   try {
     // Obtengo el ID del producto desde la dirección URL.
     const { id } = req.params;

     // Obtengo los datos que quiero actualizar.
     const { nombre, precio, categoria } = req.body || {};

     // Compruebo que los datos recibidos sean válidos.
     if (
       typeof nombre !== "string" ||
       nombre.trim() === "" ||
       typeof categoria !== "string" ||
       categoria.trim() === "" ||
       typeof precio !== "number" ||
       !Number.isFinite(precio) ||
       precio < 0
     ) {
       return res.status(400).json({
         mensaje: "Los datos del producto son inválidos",
       });
     }

     // Preparo los datos actualizados.
     const datosProducto = {
       nombre: nombre.trim(),
       precio,
       categoria: categoria.trim(),
     };

     // Solicito al servicio que actualice el producto.
     const productoActualizado = await actualizarProducto(
       id,
       datosProducto
     );

     // Si el producto no existe, devuelvo HTTP 404.
     if (!productoActualizado) {
       return res.status(404).json({
         mensaje: "Producto no encontrado",
       });
     }

     // Devuelvo el producto actualizado con HTTP 200.
     return res.status(200).json(productoActualizado);

   } catch (error) {
     // Muestro el error en la terminal.
     console.error("Error al actualizar el producto:", error);

     // Informo que ocurrió un error interno.
     return res.status(500).json({
       mensaje: "Error interno al actualizar el producto",
     });
   }
 };
