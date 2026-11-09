
// PROYECTO FINAL - NODE.JS
// CONTROLADOR DE AUTENTICACIÓN

// Importo la función del servicio que me permite
// verificar las credenciales y generar un token JWT.
import { iniciarSesion } from "../services/auth.service.js";

// --------------------------------------------------
// FUNCIÓN 1: INICIAR SESIÓN
// --------------------------------------------------

// Creo una función para recibir las solicitudes de login.
export const login = async (req, res) => {
  try {
    // Obtengo el usuario y la contraseña enviados
    // en el cuerpo de la solicitud HTTP.
    const { usuario, password } = req.body || {};

    // Compruebo que ambos datos sean textos
    // y que no estén vacíos.
    if (
      typeof usuario !== "string" ||
      usuario.trim() === "" ||
      typeof password !== "string" ||
      password === ""
    ) {
      // Si faltan datos, devuelvo el código HTTP 400.
      return res.status(400).json({
        mensaje: "El usuario y la contraseña son obligatorios",
      });
    }

    // Llamo al servicio para comprobar las credenciales.
    const token = await iniciarSesion(usuario, password);

    // Si las credenciales son incorrectas,
    // devuelvo el código HTTP 401.
    if (!token) {
      return res.status(401).json({
        mensaje: "Usuario o contraseña incorrectos",
      });
    }

    // Si las credenciales son correctas,
    // devuelvo el token JWT con el código HTTP 200.
    return res.status(200).json({
      mensaje: "Inicio de sesión exitoso",
      token,
    });

  } catch (error) {
    // Muestro el error en la terminal
    // para poder identificar el problema.
    console.error("Error al iniciar sesión:", error);

    // Devuelvo el código HTTP 500
    // si ocurre un error interno.
    return res.status(500).json({
      mensaje: "Error interno al iniciar sesión",
    });
  }
};
