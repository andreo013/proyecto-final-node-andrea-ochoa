// Importo las herramientas que necesito para conectar mi proyecto con Firebase.
import { initializeApp, cert } from "firebase-admin/app";

// Importo la herramienta que me permite trabajar con Firestore.
import { getFirestore } from "firebase-admin/firestore";

// Importo una herramienta de Node.js para leer archivos JSON.
import { createRequire } from "node:module";

// Creo una función para poder importar mi archivo de credenciales.
const require = createRequire(import.meta.url);

// Leo el archivo JSON que contiene las credenciales privadas de Firebase.
const serviceAccount = require("../../firebase-service-account.json");

// Inicializo Firebase utilizando las credenciales de mi proyecto.
initializeApp({
  credential: cert(serviceAccount),
});

// Obtengo la conexión con la base de datos Firestore.
const db = getFirestore();

// Exporto la conexión para poder utilizarla en otros archivos del proyecto.
export default db;