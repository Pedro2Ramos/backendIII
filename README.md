# AdoptMe API

Sistema de gestión para adopción de mascotas.

## Características

- Autenticación de usuarios con JWT
- CRUD completo de mascotas
- Sistema de adopción
- Logging y manejo de errores
- Mocks para testing

## Tecnologías

- Node.js
- Express
- MongoDB (con Mongoose)
- JWT para autenticación
- Winston para logging
- Passport para estrategias de autenticación

## Instalación

1. Clonar el repositorio:
```bash
git clone [tu-repositorio]
cd adoptme
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
Crear archivo `.env` con:
```
PORT=8080
MONGODB_URI=tu_uri_de_mongodb_atlas
JWT_SECRET=tu_secreto_jwt
COOKIE_SECRET=tu_secreto_cookies
```

4. Iniciar el servidor:
```bash
npm run dev
```

## Endpoints API

### Autenticación
- POST `/api/sessions/register` - Registro de usuario
- POST `/api/sessions/login` - Login
- GET `/api/sessions/current` - Usuario actual

### Mascotas
- GET `/api/pets` - Listar todas
- GET `/api/pets/:id` - Obtener una
- POST `/api/pets` - Crear nueva (requiere autenticación)
- PUT `/api/pets/:id` - Actualizar (requiere autenticación)
- DELETE `/api/pets/:id` - Eliminar (requiere autenticación)

### Mocks
- GET `/api/mocks/pets` - Generar datos de prueba 