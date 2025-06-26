
# 🧠 Therapp - Backend

Backend del MVP de **Therapp**, una plataforma terapéutica que permite la gestión de usuarios, eventos, sesiones y reflexiones personales. Este servidor maneja la lógica de autenticación, envío de notificaciones por correo y operaciones con base de datos mediante Sequelize y PostgreSQL.

---

## 🚀 Stack Tecnológico

- Node.js + Express
- PostgreSQL + Sequelize ORM
- JWT + Bcrypt para autenticación
- Nodemailer para correos
- Cloudinary para archivos multimedia (audios)

---

## 📌 Endpoints Principales

### 🔐 Autenticación

#### `POST /login`
Inicia sesión con correo y contraseña.

```json
{
  "email": "correo@example.com",
  "password": "contraseña"
}
```

---

### 👤 Usuarios (`/users`)

#### `POST /users`  
Crea un usuario (admin, facilitador o participante).

```json
{
  "name": "Luna Participante",
  "email": "luna@correo.com",
  "password": "micromagia2025",
  "role": "participante",
  "imageUrl": "https://i.pravatar.cc/150?img=8",
  "eventId": "uuid-del-evento"
}
```

#### `GET /users`  
Lista todos los usuarios activos.

#### `GET /users/:id`  
Obtiene un usuario por su ID.

#### `PUT /users/:id`  
Actualiza datos de un usuario.

#### `DELETE /users/:id`  
Desactiva un usuario (soft delete).

---

### 📆 Eventos (`/event`)

#### `POST /event`  
Crea un nuevo evento.

```json
{
  "eventType": "Programa Microdosis",
  "eventName": "Sanación interior 21 días",
  "eventImage": "https://i.imgur.com/evento.jpg",
  "description": "Un programa intensivo de reconexión personal.",
  "startDate": "2025-07-01",
  "endDate": "2025-07-21",
  "facilitadorId": "uuid-facilitador"
}
```

#### `GET /event`  
Lista todos los eventos activos.

---

### 📅 Sesiones (`/session`)

#### `POST /session`  
Crea una nueva sesión (individual o grupal).

```json
{
  "eventId": "uuid-del-evento",
  "name": "Sesión Grupal 1",
  "sessionType": "grupal",
  "dates": ["2025-07-04"],
  "time": "20:00:00",
  "duration": 90,
  "meetingLink": "https://meet.google.com/zxyz-5678",
  "message": "Meditación grupal guiada.",
  "notify": true
}
```

#### `GET /session`  
Lista todas las sesiones.

#### `GET /session/:id`  
Consulta una sesión específica.

#### `PUT /session/:id`  
Actualiza una sesión.

#### `DELETE /session/:id`  
Elimina una sesión.

---

## 📫 Notificaciones por correo

Se envían automáticamente al crear sesiones (`notify: true`) y al registrar usuarios (según el rol).

---

## 🧪 Testeo

Puedes usar **Postman** o cualquier cliente REST para probar los endpoints.  
Asegúrate de tener configuradas las variables de entorno en `.env` para:

- Conexión a la base de datos
- Credenciales de correo (Nodemailer)
- Configuración de Cloudinary

---

## 🧑‍💻 Autor

Desarrollado por **Jesu Guzmán** y equipo de **Therapp** 💜
