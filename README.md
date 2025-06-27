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

Clona el repositorio:

```bash
#Clona el repositorio
git clone https://github.com/jeisonrojasm/coordinadora-backend.git
cd coordinadora-backend
```

## Ejecutar

### 1. **Archivo `.env` requerido**

El archivo `.env` contiene variables sensibles necesarias para ejecutar el proyecto (como credenciales, tokens y URLs de servicios).
Por motivos de seguridad **no está incluido en el repositorio**.

> 🔐 **En el correo que te llegó encontrarás el archivo `.env` necesario para que la ejecución del backend funcione correctamente.**

Una vez lo tengas, colócalo en la raíz del proyecto.

### 2. Levantar el entorno de desarrollo con Docker

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

### 3. Conectarse a pgadmin

La base de datos PostgreSQL y la herramienta de administración pgAdmin están también dockerizadas, por lo que no es necesario instalarlas localmente.

Para acceder a pgAdmin y visualizar la base de datos:

1. Abre tu navegador y visita la siguiente URL:

   ```bash
   http://localhost:8080
   ```

2. Inicia sesión con las credenciales definidas en tu archivo `.env`:

   ```bash
   PGADMIN_DEFAULT_EMAIL
   PGADMIN_DEFAULT_PASSWORD
   ```

3. Una vez dentro del panel de pgAdmin:
   - Haz clic derecho sobre la sección **Servers** (barra lateral izquierda).
   - Selecciona **Register** > **Server**.

4. En el formulario de configuración:

   🧾 **Pestaña General**
   - **Name**: Escribe un nombre descriptivo, por ejemplo: `Coordinadora DB`.

   🔌 **Pestaña Connection**
   - **Host name/address**: Definido en la variable `DB_HOST` del `.env`
   - **Port**: Definido en la variable `DB_PORT` del `.env`
   - **Username**: Definido en la variable `DB_USER` del `.env`
   - **Password**: Definido en la variable `DB_PASSWORD` del `.env`
   - Opcional: Marca la casilla *Save password* para no tener que ingresarla cada vez.
  
5. Haz clic en **Save** para guardar la configuración y conectar.

   Una vez creada la conexión, podrás navegar por las bases de datos, ver tablas, ejecutar queries y gestionar los datos desde la interfaz de pgAdmin.
