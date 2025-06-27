README BACK

<p align="center">
  <img src="https://coordinadora.com/wp-content/uploads/2023/03/logo-coordinadora.svg" width="500" alt="Coordinadora logo" />
</p>
# Coordinadora Backend

API RESTful para la gestión de cotizaciones y envíos en tiempo real.

## 🛠️ Construido con
- Node.js + Express
- TypeScript
- PostgreSQL
- Redis
- JWT para autenticación
- Swagger para documentación
- Docker

## ✅ Prerrequisitos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- ✅ [*Git*](https://git-scm.com/)
- ✅ [*Docker* y Docker Compose](https://www.docker.com/get-started) instalados y en ejecución

## 📥 Obtener el proyecto

Clona el repositorio e instala las dependencias necesarias:

```bash
#Clona el repositorio
git clone https://github.com/jeisonrojasm/coordinadora-backend.git
cd coordinadora-backend
```

## Ejecutar
### 1. Levantar el entorno de desarrollo con Docker

Como esta aplicación está completamente dockerizada, no es necesario instalar Node.js ni dependencias manualmente en tu equipo. Basta con ejecutar el siguiente comando desde la raíz del proyecto para construir la imagen y levantar el contenedor del backend:

```bash
docker-compose up --build
```

Este comando realizará las siguientes acciones:
  - Construirá la imagen de Docker definida en el `Dockerfile`, utilizando `node:20-alpine` como base.
  - Instalará automáticamente todas las dependencias declaradas en el `package.json`.
  - Montará el código fuente de tu máquina dentro del contenedor, lo que permite ver los cambios en tiempo real.
  - Iniciará el servidor de desarrollo con `ts-node-dev`, lo que habilita el hot-reload automático ante cualquier cambio en los archivos `.ts`.

Una vez finalizado el proceso, el backend quedará disponible en:

```arduino
http://localhost:3000
```