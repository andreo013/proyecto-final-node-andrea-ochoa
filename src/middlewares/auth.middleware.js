
 // PROYECTO FINAL - NODE.JS
 // MIDDLEWARE DE AUTENTICACIÓN

 // Importo jsonwebtoken para poder verificar los tokens JWT.
 import jwt from "jsonwebtoken";

 // Creo un middleware que comprueba si la solicitud tiene
 // un token válido antes de permitir que continúe.
 export const verificarToken = (req, res, next) => {
   // Obtengo el encabezado Authorization de la solicitud.
   const autorizacion = req.headers.authorization;

   // Compruebo si recibí el encabezado y si comienza con "Bearer ".
   if (!autorizacion || !autorizacion.startsWith("Bearer ")) {
     return res.status(401).json({
       mensaje: "Acceso denegado. Se requiere un token"
     });
   }

   // Separo el encabezado para obtener solamente el token.
   const token = autorizacion.split(" ")[1];

   // Compruebo que el token no esté vacío.
   if (!token) {
     return res.status(401).json({
       mensaje: "El token está vacío"
     });
   }

   // Verifico que la clave secreta esté configurada en .env.
   if (!process.env.JWT_SECRET_KEY) {
     return res.status(500).json({
       mensaje: "Error de configuración del servidor"
     });
   }

   try {
     // Verifico la firma y la vigencia del token
     // utilizando la clave secreta de mi archivo .env.
     const datosUsuario = jwt.verify(
       token,
       process.env.JWT_SECRET_KEY
     );

     // Guardo los datos del usuario en la solicitud
     // para que las siguientes funciones puedan utilizarlos.
     req.usuario = datosUsuario;

     // Si el token es válido, permito que la solicitud continúe.
     next();

      } catch (error) {
     // Si el token es incorrecto o venció, rechazo el acceso.
     // Devuelvo 403 siguiendo el ejemplo de la clase 15.
     return res.status(403).json({
       mensaje: "Token inválido o vencido"
     });
   }
 };
