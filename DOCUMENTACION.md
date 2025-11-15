# DOCUMENTACION

## AUTH

### LOGIN

```json
{
    "username": "admin",
    "password": "admin"
}
```

```json
{
    "success": true,
    "message": "Login exitoso",
    "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3NjIwNjAxNzUsImV4cCI6MTc2MjE0NjU3NX0.fGvplz9XLtpqv6p5ypRy1HmfeksmHl9HrN-f9i18p3w"
}
```

### REGISTER

```json
{
    "username": "admin",
    "password": "admin",
    "email": "admin@example.com"
}
```

```json
{
    "success": true,
    "message": "Registro exitoso",
    "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NjIwNjAyNjEsImV4cCI6MTc2MjE0NjY2MX0.LDt3X4_yWav2AvNSVRdIipRuCSqzCGZSoA44yiWGjN4"
}
```

## DEVTREE

### GET ALL 
GET  http://localhost:4000/devtree?page=0&size=3

```json
{
    "success": true,
    "message": "Recursos obtenidos",
    "data": {
        "data": [
            {
                "id": "69076e77a5412eda49d1812c",
                "title": "Portfolio Developer new",
                "description": "A portfolio showcasing my development projects.",
                "urlImage": "https://res.cloudinary.com/dkd37ttep/image/upload/v1762094714/uploads/sgaijf94vp57tafspmwp.png",
                "socialMedia": [
                    {
                        "name": "GitHub",
                        "url": "https://github.com/dev1"
                    },
                    {
                        "name": "LinkedIn",
                        "url": "https://linkedin.com/in/dev1"
                    }
                ],
                "slug": "portfolio-developer-new-1762094711610",
                "available": true,
                "createdAt": "2025-11-02T14:45:11.610Z",
                "updatedAt": "2025-11-02T14:45:11.610Z"
            },
            {
                "id": "69076eb0a5412eda49d18130",
                "title": "Java: Por qué es el mejor lenguaje de programación",
                "description": "Un DevTree que explora las razones por las que Java se considera uno de los lenguajes de programación más poderosos, confiables y ampliamente utilizados en el mundo tecnológico. Cubre sus ventajas como portabilidad, seguridad, escalabilidad y su uso en entornos empresariales y de desarrollo móvil.",
                "urlImage": "https://res.cloudinary.com/dkd37ttep/image/upload/v1757258364/kft4hp7sxtym0s7voynl.png",
                "socialMedia": [],
                "slug": "java-por-qu-es-el-mejor-lenguaje-de-programacin-1762094768134",
                "available": true,
                "createdAt": "2025-11-02T14:46:08.134Z",
                "updatedAt": "2025-11-02T14:46:08.134Z"
            }
        ],
        "total": 4,
        "page": 1,
        "size": 2
    }
}
```

### GET BY ID

GET http://localhost:4000/devtree/690551ec390ce9a09097c8a1

```json
{
    "success": true,
    "message": "Recurso encontrado",
    "data": {
        "id": "690551ec390ce9a09097c8a1",
        "title": "Portfolio Developer",
        "description": "A portfolio showcasing my development projects.",
        "socialMedia": [
            {
                "name": "GitHub",
                "url": "https://github.com/dev1"
            },
            {
                "name": "LinkedIn",
                "url": "https://linkedin.com/in/dev1"
            }
        ],
        "slug": "portfolio-developer-1761956332510",
        "available": true,
        "createdAt": "2025-11-01T00:18:52.509Z",
        "updatedAt": "2025-11-01T00:18:52.509Z"
    }
}
```

### GET BY SLUG

http://localhost:4000/public/devtree/slug/portfolio-developer-1761956332510

```json
{
    "success": true,
    "message": "Recurso encontrado",
    "data": {
        "id": "690551ec390ce9a09097c8a1",
        "title": "Portfolio Developer",
        "description": "A portfolio showcasing my development projects.",
        "socialMedia": [
            {
                "name": "GitHub",
                "url": "https://github.com/dev1"
            },
            {
                "name": "LinkedIn",
                "url": "https://linkedin.com/in/dev1"
            }
        ],
        "slug": "portfolio-developer-1761956332510",
        "available": true,
        "createdAt": "2025-11-01T00:18:52.509Z",
        "updatedAt": "2025-11-01T00:18:52.509Z"
    }
}
```

### CREATE
requiere file : multipart/form-data
requiero devtree : body

http://localhost:4000/devtree
```json
{
    "success": true,
    "message": "Recurso creado",
    "data": {
        "id": "69075e7aef365eef60149825",
        "title": "Portfolio Developer new",
        "description": "A portfolio showcasing my development projects.",
        "socialMedia": [
            {
                "name": "GitHub",
                "url": "https://github.com/dev1"
            },
            {
                "name": "LinkedIn",
                "url": "https://linkedin.com/in/dev1"
            }
        ],
        "slug": "portfolio-developer-new-1762090618120",
        "available": true,
        "createdAt": "2025-11-02T13:36:58.120Z",
        "updatedAt": "2025-11-02T13:36:58.120Z"
    }
}
```

### UPDATE
### DELETE

## POST (BLOG)

### GET ALL 
http://localhost:4000/post?page=0&size=2

```json
{
    "data": [
        {
            "id": "6905664def0f8bf7c0bb0f2f",
            "title": "Introducción a Node.js",
            "content": "En este artículo, exploramos los conceptos básicos de Node.js y cómo empezar a desarrollar aplicaciones con este entorno.",
            "slug": "introduccin-a-nodejs-1761961549702",
            "available": true,
            "createdAt": "2025-11-01T01:45:49.701Z",
            "updatedAt": "2025-11-01T01:45:49.701Z"
        },
        {
            "id": "69056669ef0f8bf7c0bb0f36",
            "title": "Guía de Express.js",
            "content": "Aprende a crear servidores web con Express.js, el framework más popular para Node.js.",
            "slug": "gua-de-expressjs-1761961577961",
            "available": true,
            "createdAt": "2025-11-01T01:46:17.961Z",
            "updatedAt": "2025-11-01T01:46:17.961Z"
        }
    ],
    "total": 11,
    "page": 1,
    "size": 2
}
```

### GET BY ID
http://localhost:4000/post/6905664def0f8bf7c0bb0f2f

```json
{
    "success": true,
    "message": "Recurso encontrado",
    "data": {
        "id": "6905664def0f8bf7c0bb0f2f",
        "title": "Introducción a Node.js",
        "content": "En este artículo, exploramos los conceptos básicos de Node.js y cómo empezar a desarrollar aplicaciones con este entorno.",
        "slug": "introduccin-a-nodejs-1761961549702",
        "available": true,
        "createdAt": "2025-11-01T01:45:49.701Z",
        "updatedAt": "2025-11-01T01:45:49.701Z"
    }
}
```

### GET BY SLUG
http://localhost:4000/public/post/slug/introduccin-a-nodejs-1761961549702

```json
{
    "success": true,
    "message": "Recurso encontrado",
    "data": {
        "id": "6905664def0f8bf7c0bb0f2f",
        "title": "Introducción a Node.js",
        "content": "En este artículo, exploramos los conceptos básicos de Node.js y cómo empezar a desarrollar aplicaciones con este entorno.",
        "slug": "introduccin-a-nodejs-1761961549702",
        "available": true,
        "createdAt": "2025-11-01T01:45:49.701Z",
        "updatedAt": "2025-11-01T01:45:49.701Z"
    }
}
```

### CREATE
http://localhost:4000/post

```json
{
    "title": "Mejores prácticas en Node.js 11",
    "content": "Conoce las mejores prácticas para escribir código limpio, seguro y eficiente en Node.js.",
    "slug": "mejores-practicas-en-nodejs",
    "available": true
  }
```

```json
{
    "success": true,
    "message": "Recurso creado",
    "data": {
        "id": "690766c6d8944ca8bade483b",
        "title": "Mejores prácticas en Node.js 11",
        "content": "Conoce las mejores prácticas para escribir código limpio, seguro y eficiente en Node.js.",
        "slug": "mejores-prcticas-en-nodejs-11-1762092742820",
        "available": true,
        "createdAt": "2025-11-02T14:12:22.819Z",
        "updatedAt": "2025-11-02T14:12:22.819Z"
    }
}
```

### UPDATE
### DELETE


## CHAT BOT 

- PRUEBA CREAR POST 

POST http://localhost:4000/chat/message

```json
{
    "message" : "crea un nuevo post sobre que es spring webflux , sus beneficios , caracteristicas, si redactalo tu mismo y completa los campos que falten"
}
```

```json
{
    "success": true,
    "message": "Mensaje procesado correctamente",
    "data": "¡He creado el post sobre **Spring WebFlux** con éxito! 🎉\n\n### 📝 Detalles del post:\n- **Título**: ¿Qué es Spring WebFlux? Sus beneficios, características y ventajas  \n- **Slug**: `que-es-spring-webflux`  \n- **Contenido**: Incluye una explicación clara y completa sobre lo que es Spring WebFlux, sus beneficios, características y por qué es ideal para aplicaciones modernas.  \n- **Estado**: Disponible (publicado)  \n- **Fecha de creación**: 2025-11-02  \n\nEl post está listo para ser publicado y visible en tu blog. ¿Te gustaría que agregue otro tema, o necesitas ayuda para editar, eliminar o organizar tus publicaciones? 😊"
}
```