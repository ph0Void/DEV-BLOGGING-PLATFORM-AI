# 🚀 **DEV Blogging Platform AI**

**El futuro de la creación de contenido técnico ha llegado.** ✨  
Combina la simplicidad de plataformas como *Dev.to* con el poder de la **Inteligencia Artificial**, para escribir, publicar y compartir tu conocimiento de desarrollo como nunca antes.  

🎥 Demo: https://youtu.be/C1RgGucH6Ec 

## 🧠 **Descripción general**

**DEV Blogging Platform AI** es una plataforma creada para desarrolladores que desean escribir artículos técnicos o compartir proyectos de forma sencilla y asistida por IA.  
Olvídate del bloqueo del escritor: tu **asistente de inteligencia artificial** genera ideas, sugiere estructuras, corrige código y optimiza tu flujo de escritura.

La solución completa incluye un **frontend (Next.js + TypeScript)** y un **backend (Node.js + Express + OpenAI)**. Juntos proporcionan una experiencia fluida, moderna y potenciada por inteligencia artificial, con métricas de interacción en tiempo real.  

<img width="1918" height="937" alt="image" src="https://github.com/user-attachments/assets/3913d57a-2cd1-4064-b7be-822d3ad4f763" />

 
<img width="1000" height="943" alt="image" src="https://github.com/user-attachments/assets/1eb3ec0b-382e-4d6c-92ac-30a926cf7e73" />

 
## 🎯 *Características Principales*
- 🤖 Asistente de Contenido IA: Un chatbot integrado y funcionalidades en el editor para generar ideas, crear borradores completos, optimizar código y dar formato a tus artículos.
- ✍️ Editor Enriquecido (Milkdown): Un editor de texto moderno con soporte completo para Markdown, ideal para escribir código y documentación técnica.
- 📊 Dashboard de Analíticas: Mide el impacto de tu contenido con gráficos que muestran vistas, "likes" y comparativas entre tus publicaciones.
- 🔗 Blogs y "DevLinks": Publica artículos técnicos detallados o comparte rápidamente enlaces de interés para la comunidad, todo en un mismo lugar.
- 🔐 Autenticación Segura: Sistema de registro y login basado en JSON Web Tokens (JWT) para proteger las cuentas y los datos de los usuarios.
- ☁️ Gestión de Archivos: Sube imágenes para tus posts y proyectos directamente a Cloudinary.


## 📊 *Capturas de pantalla*
 
<img width="1000" height="943" alt="image" src="https://github.com/user-attachments/assets/476d22bc-4189-49fd-9715-15783240acdd" />
<img width="1000" height="943" alt="image" src="https://github.com/user-attachments/assets/0938ec13-810c-47df-a60c-113c0e4c236b" />
<img width="1000" height="943" alt="image" src="https://github.com/user-attachments/assets/514beb36-021a-40ec-bcf1-bf91884ba863" />
<img width="1000" height="943" alt="image" src="https://github.com/user-attachments/assets/eb874182-1741-47f9-8673-6bd71a0f6223" />
<img width="1000" height="943" alt="image" src="https://github.com/user-attachments/assets/ce457c62-dae3-44f6-a065-2fbc3338034b" />
<img width="1000" height="943" alt="image" src="https://github.com/user-attachments/assets/45940173-210a-4a3c-acb0-76f42e0c0e22" />
<img width="1000" height="943" alt="image" src="https://github.com/user-attachments/assets/7591b96d-8918-4e1e-9d2c-b8144bc91b6b" />
<img width="1000" height="943" alt="image" src="https://github.com/user-attachments/assets/44e46f2e-b98f-4991-b1fd-d0330c550fa3" />
<img width="1000" height="943" alt="image" src="https://github.com/user-attachments/assets/759142ca-22ac-420d-aa5b-fa5b5a0c2049" />

 
## 🧩 **Frontend – DEV Blogging Platform**

### 🔹 Tecnologías
- **Next.js**  
- **TypeScript**  
- **Tailwind CSS**  
- **React**  
- **Chart.js**  
- **Milkdown (editor Markdown con IA integrada)**  
- **Zod**  
- **Zustand (gestión de estado)**  

### 🔹 Funcionalidades
- Crear, editar y eliminar **posts** y **DevLinks**  
- Editor enriquecido con **asistente IA**  
- Dashboard con **gráficas interactivas (líneas y doughnuts)**  
- Métricas en tiempo casi real: **vistas, comparativas, tendencias**  
- Chatbot integrado con acciones contextuales  
- Formularios validados con **Zod**  
- Métricas visuales en el panel: evolución de visitas por día o mes  

### 🔹 Cómo ejecutar
```bash
npm install
npm run dev
# Abre en http://localhost:3000
```

⚙️ Variables necesarias (.env.local):
```
API_URL=http://localhost:4000
DOMAIN=http://localhost:3000
```

---

## 💾 **Backend – DEV Blogging Platform AI API**

### 🔹 Tecnologías
- **Node.js + Express**
- **TypeScript**
- **MongoDB + Mongoose**
- **Cloudinary**
- **JWT (autenticación segura)**
- **OpenAI (soporte IA)**
- **Multer (subida de archivos)**

### 🔹 Características clave
- Autenticación JWT (login/registro)  
- CRUD para Posts, Profiles y DevTree  
- Subida de imágenes y portadas con **Cloudinary**  
- Chatbot integrado (OpenAI o LLM local)  
- API de métricas: registrar y consultar vistas/likes  
- Paginación y búsqueda optimizada  
- Preparado para despliegue en Docker o VPS  

### 🔹 Configuración rápida
```bash
npm install
npm run dev
```
Variables necesarias:
```
MONGODB_URI=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
JWT_SECRET=
```

## 📈 **Dashboard de métricas**

Visualiza el rendimiento de tus contenidos en un solo lugar:  

- **Resumen general:** blogs, devlinks, vistas totales  
- **Gráfica comparativa:** DevLinks vs Blogs por mes o día  
- **Estadísticas detalladas:** porcentaje de engagement, totales acumulados  
- **Visualización dinámica con Chart.js**  



## 🧠 **Próximos pasos**
- Añadir modo colaborativo (multiusuario con permisos).  
- Optimizar actualización en tiempo real de métricas vía WebSockets o Redis.  
- Implementar badges y estadísticas públicas por perfil.  


 
 

  
#DevCommunity #AI #Blogging #Tech #Developer #IA #Productividad  
#AIWriting #DevTools #SoftwareDevelopment #NextJS #NodeJS #Metrics #Dashboard  
