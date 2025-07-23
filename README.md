# 🛒 Mercado Cautivo - Proyecto final React JS

Este proyecto consiste en una aplicación de e-commerce que simula una tienda online, demostrando las funcionalidades y conceptos aprendidos a lo largo del curso.

# 👨‍💻 Autor
Fernando Gabriel Camino  
DNI: 35730378  
Curso: React JS 25017 - Talento Tech 2025

# 🚀 Descripción de funcionalidades

Mercado Cautivo permite a los usuarios:
- Explorar Productos: Visualizar un catálogo combinado de productos (DummyJSON y creados por Admin), con paginación y una barra de búsqueda que filtra por nombre y categoría.
- Gestión del Carrito: Agregar productos al carrito, ajustar cantidades, vaciar el carrito y simular una compra (¡bajo tu propio riesgo! 😂).
- Autenticación: Iniciar y cerrar sesión, con persistencia del usuario (`localStorage`).
- Administración (CRUD): Los usuarios autenticados pueden acceder a un panel para crear, editar y eliminar productos.

# 🛠 Tecnologías utilizadas

- React.js + Vite: Para la construcción de la interfaz de usuario.
- React Bootstrap: Componentes UI responsivos.
- React Router DOM: Manejo de rutas y navegación.
- Context API: Gestión del estado global (Carrito y Autenticación).
- MockAPI.io: Backend simulado para el CRUD de productos.
- DummyJSON.com: Fuente adicional de productos del catálogo.
- React Icons: Inclusión de iconos visuales.
- React Toastify: Notificaciones de usuario (éxito, error, información).
- React Helmet Async: Gestión de metadatos de la página para SEO.
- Styled Components: Uso puntual para personalización de estilos.

# 🔐 Acceso y credenciales

Para acceder a las secciones protegidas (Carrito y Administración):
- Usuario:  `admin@cautivo.com`
- Contraseña:  `1234`

## 🧪 Acceso al proyecto

📂 Repositorio en GitHub:  
[https://github.com/CaminoFernando/talento_tech_react_proyecto_final_FC](https://github.com/CaminoFernando/talento_tech_react_proyecto_final_FC)
🌐 Versión desplegada (Vercel):  
[https://talento-tech-react-proyecto-final-f.vercel.app](https://talento-tech-react-proyecto-final-f.vercel.app)


## ⚙️ Instalación y ejecución (modo desarrollador)

- Terminal Bash:
git clone https://github.com/CaminoFernando/talento_tech_react_proyecto_final_FC.git
cd talento_tech_react_proyecto_final_FC
npm install
npm run dev

* La aplicación se iniciará en tu navegador, generalmente en `http://localhost:5173`.