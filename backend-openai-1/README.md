# Backend - Dev Blogging Platform (AI)

## Descripción

Este repositorio contiene el backend de una plataforma de blogging/portfolio con funcionalidades de IA (chatbot), subida de imágenes a Cloudinary, autenticación JWT y recursos para gestionar publicaciones, perfiles y "devtree" (portafolios/proyectos). Está escrito en TypeScript y diseñado para usarse junto a un frontend que consuma sus endpoints REST.

## Tecnologías

- Node.js + Express
- TypeScript
- Mongoose  (MongoDB ODM)
- Multer  
- Cloudinary  
- JSON Web Tokens  
- OpenAI  

## Características principales

- Autenticación con JWT (registro/login)
- CRUD para Posts, Profiles y DevTree (proyectos/portafolios)
- Subida de imágenes a Cloudinary
- Integración con la API de OpenAI para funcionalidades de chatbot
- Paginación y búsqueda básica

## Funcionalidades (resumen)

- Registrar y autenticar usuarios
- Crear, leer, actualizar y eliminar Posts
- Crear recursos DevTree con imagen asociada (subida desde multipart/form-data)
- Consultar recursos por slug y paginación por usuario
- Contabilizar y exponer métricas (se puede ampliar para views)
- Endpoints protegidos por middleware de autorización

## Instalación (local)

1. Clona el proyecto:

	git clone  

2. Entra al directorio y configura variables de entorno (ej. `.env`):

	- MONGODB_URI
	- CLOUDINARY_CLOUD_NAME
	- CLOUDINARY_API_KEY
	- CLOUDINARY_API_SECRET
	- JWT_SECRET

3. Instala dependencias e inicia en desarrollo:

```powershell
npm install
npm run dev
```

El servidor usa `nodemon` en modo desarrollo y compila TypeScript al vuelo (según `package.json`).

## Uso / Endpoints principales

Nota: la API espera JSON para la mayoría de endpoints. Para subir imagen + JSON (ej. crear `devtree`) usa `multipart/form-data` con:

- Campo `file` (type=file) -> la imagen
- Campo `devtree` (type=text) -> JSON string con el objeto devtree (ej. title, description, socialMedia, slug, available)

Ejemplos útiles:

- POST /auth/register -> registrar usuario
- POST /auth/login -> obtener token
- GET /devtree?page=1&size=10 -> listar paginado (protegido)
- POST /devtree -> crear devtree con imagen (protegido). Body: form-data `file` + `devtree` (JSON string)
- GET /devtree/:slug -> obtener por slug

Para contabilizar vistas hay dos opciones comunes:

1. Incremento directo al solicitar el recurso (el backend hace $inc en Mongo).
2. Endpoint dedicado (POST /devtree/:id/view) o uso de Redis para alta concurrencia. El frontend puede llamar a este endpoint usando `fetch` o `navigator.sendBeacon`.

## Notas sobre multipart/form-data y Postman

- En Postman, elige Body -> form-data.
- Añade un campo de tipo File llamado exactamente `file` (o el nombre que configure `multer` en tu servidor).
- Añade otro campo de tipo Text llamado `devtree` con el JSON como string.
- No fuerces el header `Content-Type`; deja que Postman configure `multipart/form-data; boundary=...` automáticamente.

## Cómo contribuir

- Abrir un issue describiendo la mejora o bug
- Crear una rama, hacer commits claros y abrir un PR

## Licencia

Repositorio bajo la licencia que prefieras (añade un archivo `LICENSE` si corresponde).

## Contacto

Si necesitas que genere ejemplos de endpoints, scripts de pruebas o que implemente el contador de vistas (Mongo/Redis), dime cuál prefieres y lo agrego.
