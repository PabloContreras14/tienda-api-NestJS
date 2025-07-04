# Tienda API - NestJS + MySQL

Esto es una API desarrollada con **NestJS** y **TypeORM**, utilizando como base de datos a **MySQL Workbench**, que permite la gestion de usuarios, productos, pedidos y categorías. Fue desarrollada para la entrega de un trabajo final de un trimestre del sena.

Los objetivos principales del taller son:

Desarrollar una API RESTful en NestJS que implemente:
✅ Buenas prácticas en la estructura del proyecto
✅ CRUD completo (Create, Read, Update, Delete)
✅ Validaciones con class-validator y class-transformer
✅ Manejo de errores con HttpException y HttpStatus
✅ Conexión a base de datos con TypeORM y al menos 4 entidades relacionadas

---

## 🚀 Tecnologías utilizadas

- **NestJS** – Framework progresivo para aplicaciones backend con Node.js
- **TypeORM** – ORM para TypeScript y JavaScript
- **MySQL** – Sistema de gestión de bases de datos relacional
- **Insomnia** – Cliente REST para pruebas de APIs
- **class-validator** – Validaciones a nivel de DTOs
- **dotenv** – Variables de entorno
- **@nestjs/config** – Manejo de configuración en entornos NestJS

---

## 📦 Requisitos

- Node.js `v18+`
- MySQL instalado y corriendo
- Tener `npm` o `yarn` instalados

---

## ⚙️ Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido (ajusta según tu entorno):

```
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=tu_usuario_mysql
DB_PASSWORD=tu_contraseña_mysql
DB_NAME=tienda
```

---

## ▶️ Instalación y ejecución

```bash
# Clona el repositorio
git clone https://github.com/tu_usuario/tienda-api.git
cd tienda-api

# Instala dependencias
npm install

# Ejecuta el servidor
npm run start:dev
```

---

## La api esta disponible en:

- http://localhost:3000

## 🧪 Pruebas con Insomnia

Se utilizaron colecciones en Insomnia para probar todos los endpoints.

### Para importar las pruebas:
1. Abre Insomnia
2. Ve a `File > Import`
3. Selecciona el archivo `tienda-api-insomnia.json`

Prueba los endpoints `POST`, `GET`, `PATCH`, `DELETE` de cada entidad.

El archivo exportado está ubicado en la carpeta `/docs`

---

## 📚 Endpoints principales

### 👤 Usuarios
- `POST /usuarios`
- `GET /usuarios`
- `GET /usuarios/:id`
- `PATCH /usuarios/:id`
- `DELETE /usuarios/:id`

### 📦 Productos
- `POST /productos`
- `GET /productos`
- `GET /productos/:id`
- `PATCH /productos/:id`
- `DELETE /productos/:id`

### 🛒 Pedidos
- `POST /pedidos`
- `GET /pedidos`
- `GET /pedidos/:id`
- `PATCH /pedidos/:id`
- `DELETE /pedidos/:id`

### 🏷️ Categorías
- `POST /categorias`
- `GET /categorias`
- `GET /categorias/:id`
- `PATCH /categorias/:id`
- `DELETE /categorias/:id`

---

## 👨‍💻 Autor

Este proyecto fue desarrollado por:

**Juan Pablo Contreras**
Centro de Tecnología de la Manufactura Avanzada – SENA  
  
---

## 📄 Licencia

Proyecto desarrollado con fines académicos para el SENA. Puedes reutilizarlo y adaptarlo libremente para uso educativo.
