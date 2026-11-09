# Proyecto Final – API REST de Productos

**Curso:** Desarrollo Back-End con Node.js  
**Institución:** Agencia de Habilidades para el Futuro – Buenos Aires Aprende  
**Estudiante:** Andrea Ochoa

## Descripción del proyecto

Este proyecto consiste en el desarrollo de una API REST para administrar un catálogo de productos mediante Node.js y Express.

La aplicación permite consultar, crear, actualizar y eliminar productos almacenados en una base de datos Firestore de Firebase.

Además, implementa un sistema de autenticación mediante JSON Web Tokens (JWT) para proteger las operaciones que modifican los productos.

## Tecnologías utilizadas

- Node.js
- Express.js
- JavaScript con ES Modules
- Firebase Admin SDK
- Cloud Firestore
- JSON Web Tokens (JWT)
- dotenv
- cors
- body-parser
- Postman para realizar pruebas
- Git y GitHub para el control de versiones
- Vercel para el despliegue en producción

## Estructura del proyecto

```text
proyecto-final-node-andrea-ochoa/
│
├── src/
│   ├── config/
│   │   └── firebase.config.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── product.controller.js
│   ├── middlewares/
│   │   └── auth.middleware.js
│   ├── models/
│   │   └── product.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── product.routes.js
│   └── services/
│       ├── auth.service.js
│       └── product.service.js
│
├── .gitignore
├── index.js
├── package.json
├── package-lock.json
└── README.md
```

Los archivos de credenciales y las variables de entorno no se incluyen en el repositorio público.

## Instalación y ejecución local

**1.** Clonar el repositorio:

```bash
git clone URL_DEL_REPOSITORIO
```

**2.** Ingresar a la carpeta del proyecto:

```bash
cd proyecto-final-node-andrea-ochoa
```

**3.** Instalar las dependencias:

```bash
npm install
```

**4.** Configurar las variables de entorno en un archivo `.env`:

```env
PORT=3000
AUTH_USER=usuario_configurado
AUTH_PASSWORD=contraseña_configurada
JWT_SECRET_KEY=clave_secreta_segura
```

Los valores son ejemplos y deben reemplazarse por credenciales propias.

Para ejecutar localmente la configuración actual de Firebase Admin, también es necesario disponer de un archivo privado `firebase-service-account.json` válido en la raíz del proyecto, correspondiente al proyecto Firebase utilizado.

**Nunca se deben publicar las credenciales reales en GitHub.**

**5.** Iniciar el servidor:

```bash
npm start
```

El servidor local estará disponible en:

```text
http://localhost:3000
```

## Endpoints de la API

| Método | Endpoint | Descripción | Autenticación |
|---|---|---|---|
| GET | `/api/products` | Obtiene todos los productos | No |
| GET | `/api/products/:id` | Obtiene un producto por ID | No |
| POST | `/api/products/create` | Crea un nuevo producto | Sí |
| PUT | `/api/products/:id` | Actualiza un producto | Sí |
| DELETE | `/api/products/:id` | Elimina un producto | Sí |
| POST | `/auth/login` | Autentica al usuario y devuelve un JWT | No |

## Autenticación JWT

Para acceder a las rutas protegidas, primero se debe realizar una petición:

```http
POST /auth/login
```

Con el siguiente cuerpo JSON:

```json
{
  "usuario": "usuario_configurado",
  "password": "contraseña_configurada"
}
```

Si las credenciales son válidas, la API devuelve un token JWT con una duración de una hora.

Para utilizarlo en las rutas protegidas, se debe incluir el encabezado:

```http
Authorization: Bearer TOKEN_OBTENIDO
```

El middleware de autenticación verifica la validez del token antes de permitir las operaciones de creación, actualización y eliminación.

## Ejemplos de peticiones

### Consultar productos

```http
GET /api/products
```

### Consultar un producto por ID

```http
GET /api/products/ID_DEL_PRODUCTO
```

### Crear un producto

```http
POST /api/products/create
```

Cuerpo JSON:

```json
{
  "nombre": "Producto de ejemplo",
  "precio": 1500,
  "categoria": "Pruebas"
}
```

### Actualizar un producto

```http
PUT /api/products/ID_DEL_PRODUCTO
```

Cuerpo JSON:

```json
{
  "nombre": "Producto actualizado",
  "precio": 2500,
  "categoria": "Pruebas"
}
```

### Eliminar un producto

```http
DELETE /api/products/ID_DEL_PRODUCTO
```

**Importante:** el ID debe copiarse exactamente del resultado de `GET /api/products`, respetando las letras mayúsculas, minúsculas y los números.

Las operaciones POST, PUT y DELETE requieren un token JWT válido.

## Manejo de errores

La API contempla los siguientes códigos HTTP:

| Código | Significado |
|---|---|
| 200 | Operación exitosa |
| 201 | Producto creado correctamente |
| 400 | Datos inválidos o incompletos |
| 401 | Falta autenticación o credenciales incorrectas |
| 403 | Token inválido o vencido |
| 404 | Producto o ruta inexistente |
| 500 | Error interno del servidor o servicio externo |

Los errores se devuelven mediante respuestas JSON con mensajes descriptivos.

## Base de datos

El proyecto utiliza Cloud Firestore, perteneciente a Firebase.

La colección utilizada se denomina `products`.

Cada documento contiene los campos:

- `nombre`: nombre del producto.
- `precio`: precio numérico del producto.
- `categoria`: categoría del producto.

Firestore genera un identificador único para cada documento.

## Pruebas realizadas

Se realizaron pruebas de funcionamiento utilizando Postman y PowerShell.

Se verificaron:

- Consulta del listado completo de productos.
- Búsqueda de productos por ID.
- Creación de nuevos productos.
- Actualización de productos existentes.
- Eliminación de productos.
- Autenticación mediante JWT.
- Acceso autorizado y rechazo de peticiones sin token.
- Manejo de errores HTTP 400, 401, 403 y 404.

Las pruebas de creación, actualización y eliminación se realizaron con productos temporales, conservando los productos originales de la base de datos.

## Despliegue en Vercel

El proyecto está preparado para incorporar un despliegue en Vercel, utilizando GitHub como repositorio de origen.

**URL pública:** pendiente de configurar y verificar.

Para el entorno de producción se deberán configurar las variables de entorno y las credenciales de Firebase de manera segura, sin incorporarlas al repositorio público.

## Autoría

**Andrea Ochoa**  
Proyecto Final – Desarrollo Back-End con Node.js
