
// PROYECTO FINAL - NODE.JS
// SERVICIO DE AUTENTICACIÓN

// Importo la biblioteca jsonwebtoken para generar
// los tokens que utilizaré en la autenticación.
import jwt from "jsonwebtoken";

// Importo una herramienta de Node.js para comparar
// valores de forma segura.
import { timingSafeEqual } from "node:crypto";

// --------------------------------------------------
// FUNCIÓN 1: INICIAR SESIÓN
// --------------------------------------------------

// Creo una función para verificar las credenciales
// de un usuario y generar un token JWT.
export const iniciarSesion = async (usuario, password) => {
  // Obtengo las credenciales del usuario de prueba
  // desde las variables de entorno.
  const usuarioValido = process.env.AUTH_USER;
  const passwordValida = process.env.AUTH_PASSWORD;

  // Compruebo que las credenciales estén configuradas.
  if (!usuarioValido || !passwordValida) {
    throw new Error("Las credenciales no están configuradas");
  }

  // Creo una función auxiliar para comparar textos.
  const compararTextos = (valorRecibido, valorEsperado) => {
    // Verifico que ambos valores sean cadenas de texto.
    if (
      typeof valorRecibido !== "string" ||
      typeof valorEsperado !== "string"
    ) {
      return false;
    }

    // Convierto los textos en datos binarios.
    const recibido = Buffer.from(valorRecibido);
    const esperado = Buffer.from(valorEsperado);

    // Si tienen longitudes diferentes, no coinciden.
    if (recibido.length !== esperado.length) {
      return false;
    }

    // Comparo los valores utilizando timingSafeEqual.
    return timingSafeEqual(recibido, esperado);
  };

  // Compruebo que el usuario y la contraseña coincidan.
  const usuarioCorrecto = compararTextos(usuario, usuarioValido);
  const passwordCorrecta = compararTextos(password, passwordValida);

  // Si alguno es incorrecto, no permito iniciar sesión.
  if (!usuarioCorrecto || !passwordCorrecta) {
    return null;
  }

  // Compruebo que exista la clave secreta para firmar el token.
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error("La clave JWT no está configurada");
  }

  // Genero un token JWT con una duración de una hora.
  const token = jwt.sign(
    { usuario, rol: "admin" },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1h" }
  );

  // Devuelvo el token generado.
  return token;
};
