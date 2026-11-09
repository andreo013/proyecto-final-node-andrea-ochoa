
// PROYECTO FINAL - NODE.JS
// MODELO DE PRODUCTOS

// Importo la conexión con Firestore que configuré anteriormente.
import db from "../config/firebase.config.js";

// Selecciono la colección "products" de mi base de datos.
// Desde este modelo voy a consultar y administrar sus documentos.
const productosCollection = db.collection("products");

// --------------------------------------------------
// FUNCIÓN 1: OBTENER TODOS LOS PRODUCTOS
// --------------------------------------------------

// Creo una función para obtener todos los productos de Firestore.
export const getAllProducts = async () => {
  // Consulto todos los documentos de la colección.
  const snapshot = await productosCollection.get();

  // Transformo los documentos en un array de objetos.
  // Incluyo el ID que Firebase asignó a cada producto.
  const productos = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  // Devuelvo el array de productos.
  return productos;
};

// --------------------------------------------------
// FUNCIÓN 2: BUSCAR UN PRODUCTO POR SU ID
// --------------------------------------------------

// Creo una función para buscar un producto específico
// utilizando el ID que Firebase le asignó.
export const getProductById = async (id) => {
  // Busco en la colección "products" el documento
  // que tiene el ID recibido.
  const documento = await productosCollection.doc(id).get();

  // Compruebo si el documento existe en Firestore.
  // Si no existe, devuelvo null.
  if (!documento.exists) {
    return null;
  }

  // Si el documento existe, devuelvo un objeto
  // con su ID y todos los datos del producto.
  return {
    id: documento.id,
    ...documento.data(),
  };
};

// --------------------------------------------------
// FUNCIÓN 3: CREAR UN PRODUCTO NUEVO
// --------------------------------------------------

// Creo una función para guardar un producto nuevo en Firestore.
export const createProduct = async (datosProducto) => {
  // Agrego un documento nuevo a la colección "products".
  // Firebase genera automáticamente un ID para identificarlo.
  const nuevoDocumento = await productosCollection.add(datosProducto);

  // Devuelvo el producto creado junto con su nuevo ID.
  return {
    id: nuevoDocumento.id,
    ...datosProducto,
  };
};

// --------------------------------------------------
// FUNCIÓN 4: ELIMINAR UN PRODUCTO POR SU ID
// --------------------------------------------------

// Creo una función para eliminar un producto de Firestore.
export const deleteProduct = async (id) => {
  // Busco el documento utilizando el ID recibido.
  const referenciaProducto = productosCollection.doc(id);

  // Consulto si el documento existe antes de eliminarlo.
  const documento = await referenciaProducto.get();

  // Si el producto no existe, devuelvo false.
  if (!documento.exists) {
    return false;
  }

  // Si existe, elimino el documento de Firestore.
  await referenciaProducto.delete();

  // Devuelvo true para indicar que se eliminó.
  return true;
};



 // --------------------------------------------------
 // FUNCIÓN 5: ACTUALIZAR UN PRODUCTO POR SU ID
 // --------------------------------------------------

 // Creo una función para actualizar los datos de un producto.
 export const updateProduct = async (id, datosProducto) => {
   // Busco el documento utilizando el ID recibido.
   const referenciaProducto = productosCollection.doc(id);

   // Compruebo si el producto existe en Firestore.
   const documento = await referenciaProducto.get();

   // Si el producto no existe, devuelvo null.
   if (!documento.exists) {
     return null;
   }

   // Actualizo los datos del producto en Firestore.
   await referenciaProducto.update(datosProducto);

   // Devuelvo el producto con sus datos actualizados.
   return {
     id,
     ...documento.data(),
     ...datosProducto,
   };
 };
