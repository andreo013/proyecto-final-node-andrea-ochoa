
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

// Si estoy en Vercel, obtengo las credenciales desde una variable de entorno.
// Si estoy trabajando en mi computadora, utilizo el archivo JSON local.
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
  : require("../../firebase-service-account.json");

// Inicializo Firebase con las credenciales correspondientes.
initializeApp({
  credential: cert(serviceAccount),
});

// Obtengo la conexión con Firestore.
const db = getFirestore();

// Exporto la conexión para utilizarla en el proyecto.
export default db;
