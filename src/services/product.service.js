
// PROYECTO FINAL - NODE.JS
// SERVICIO DE PRODUCTOS

// Importo las funciones del modelo que necesito
// para consultar, crear y eliminar productos en Firestore.
import {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../models/product.model.js";

// --------------------------------------------------
// FUNCIÓN 1: OBTENER TODOS LOS PRODUCTOS
// --------------------------------------------------

// Creo una función para solicitar el listado de productos.
export const obtenerProductos = async () => {
  // Llamo al modelo y espero los productos de Firestore.
  const productos = await getAllProducts();

  // Devuelvo el listado de productos.
  return productos;
};

// --------------------------------------------------
// FUNCIÓN 2: BUSCAR UN PRODUCTO POR SU ID
// --------------------------------------------------

// Creo una función para buscar un producto específico.
export const obtenerProductoPorId = async (id) => {
  // Llamo al modelo para buscar el producto por su ID.
  const producto = await getProductById(id);

  // Devuelvo el producto encontrado o null si no existe.
  return producto;
};

// --------------------------------------------------
// FUNCIÓN 3: CREAR UN PRODUCTO NUEVO
// --------------------------------------------------

// Creo una función para guardar un producto nuevo.
export const crearProducto = async (datosProducto) => {
  // Llamo al modelo para guardar los datos en Firestore.
  const nuevoProducto = await createProduct(datosProducto);

  // Devuelvo el producto creado con su ID.
  return nuevoProducto;
};

// --------------------------------------------------
// FUNCIÓN 4: ELIMINAR UN PRODUCTO POR SU ID
// --------------------------------------------------

// Creo una función para solicitar la eliminación de un producto.
export const eliminarProducto = async (id) => {
  // Llamo al modelo para eliminar el documento de Firestore.
  const eliminado = await deleteProduct(id);

  // Devuelvo true si se eliminó correctamente
  // o false si el producto no existe.
  return eliminado;
};

// --------------------------------------------------
// FUNCIÓN 5: ACTUALIZAR UN PRODUCTO
// --------------------------------------------------

// Creo una función para actualizar los datos de un producto.
export const actualizarProducto = async (id, datosProducto) => {
  // Llamo al modelo para actualizar el producto en Firestore.
  const productoActualizado = await updateProduct(id, datosProducto);

  // Devuelvo el producto actualizado o null si no existe.
  return productoActualizado;
};