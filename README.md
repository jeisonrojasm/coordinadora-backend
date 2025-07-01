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
- Zod
- Jest

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

## 📁 Estructura del Proyecto

La estructura del proyecto está organizada para mantener una clara separación de responsabilidades, facilitando el mantenimiento y la escalabilidad.

```bash
coordinadora-backend/
├── db/                     # Archivos de migración SQL (usados por dbmate)
│   └── migrations/         # Migraciones con timestamp
├── src/                    # Código fuente de la aplicación
│   ├── config/             # Configuraciones generales (Redis, DB, dotenv)
│   ├── middlewares/        # Middlewares personalizados (auth, validaciones, manejo de errores)
│   ├── modules/            # Módulos principales divididos por dominio
│   │   ├── auth/           # Registro e inicio de sesión
│   │   ├── quote/          # Cotización de envíos
│   │   ├── shipment/       # Creación y seguimiento de envíos
│   │   └── ...             # Otros módulos futuros
│   └── utils/              # Utilidades usadas a lo largo de toda la app
├── .env                    # Variables de entorno (no versionado)
├── .gitignore              # Excluye archivos o carpetas que no deben subirse al repositorio
├── docker-compose.yml      # Orquestación de servicios con Docker
├── Dockerfile              # Imagen de backend con Node.js
├── package.json            # Dependencias y scripts
├── README.md               # Documentación del proyecto
└── tsconfig.json           # Configuración de TypeScript
```

### Estructura Modular

Cada módulo dentro de `src/modules` sigue el siguiente patrón:

```bash
module/
├── module.controller.ts    # Controlador HTTP
├── module.repository.ts    # Consultas a base de datos
├── module.routes.ts        # Endpoints del módulo
├── module.service.spec.ts  # Pruebas unitarias del módulo
├── module.service.ts       # Lógica de negocio
├── module.validation.ts    # Validaciones con Zod
```

## 🚀 Ejecutar

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

### 4. Migraciones automáticas de la base de datos

Este proyecto utiliza **dbmate** como herramienta para gestionar migraciones de base de datos utilizando SQL puro, lo cual cumple con el requerimiento explícito de evitar ORMs.

🛠️ ¿Qué significa esto?

- No necesitas conectarte a pgAdmin ni crear las tablas manualmente.
- Al levantar los contenedores con Docker, las tablas necesarias se crean automáticamente en la base de datos PostgreSQL si no existen aún.

📦 ¿Cómo funciona?

- El archivo `docker-compose.yml` define un servicio adicional llamado `dbmate`, que se encarga de aplicar las migraciones una vez que PostgreSQL está listo.
- Este servicio utiliza la herramienta `dbmate` para buscar y aplicar todos los archivos `.sql` de migración ubicados en:

```bash
./db/migrations/
```

Cada archivo de migración tiene un nombre con marca de tiempo para garantizar el orden de ejecución, por ejemplo:

```bash
20240627150000_create_users_table.sql
```

Esto garantiza que cualquier persona que clone el proyecto y ejecute:

```bash
docker-compose up --build
```

Tendrá automáticamente la base de datos con todas las tablas necesarias sin necesidad de configuraciones adicionales.

## ✅ Aplicación lista para usarse

Una vez completados los pasos anteriores:

- El servidor backend estará corriendo en `http://localhost:3000`.
- La base de datos PostgreSQL estará lista y migrada.
- Podrás consumir los endpoints REST definidos.
- Tendrás acceso a pgAdmin para gestionar tus datos gráficamente.
- Redis estará disponible para almacenamiento en caché.
- Y la documentación interactiva estará disponible en Swagger (si ya configuraste el endpoint `/api-docs`).

> 🧪 Puedes ahora probar los endpoints usando **Postman** o cualquier cliente HTTP como **Insomnia**, y empezar a construir el frontend o integraciones que necesites.

## 📚 Documentación con Swagger

Esta API cuenta con documentación interactiva generada automáticamente con Swagger gracias a la integración con `swagger-jsdoc` y `swagger-ui-express`.

### ¿Qué puedes hacer desde Swagger?

- Ver todos los endpoints disponibles (GET, POST, PATCH, etc.)
- Consultar ejemplos de request y response.
- Ver los esquemas de validación definidos con Zod.
- Probar los endpoints directamente desde el navegador (requiere autenticación con JWT en los endpoints protegidos)..

### Acceder a la documentación

Una vez que el backend esté corriendo, puedes acceder a Swagger en:

```bash
http://localhost:3000/api-docs
```

### Autenticación con JWT en Swagger

1. Primero, haz una solicitud de login con un usuario válido para obtener un token.
2. En Swagger, haz clic en el botón **Authorize** (🔒) ubicado en la parte superior derecha.
3. Ingresa el token.
4. Una vez autenticado, podrás probar todos los endpoints protegidos sin necesidad de usar Postman o herramientas externas.

## 🧪 Pruebas automatizadas

Este proyecto incluye un conjunto de pruebas unitarias escritas con [Jest](https://jestjs.io/) para asegurar el correcto funcionamiento de los servicios y controladores principales.

### Estructura de pruebas

Las pruebas están organizadas siguiendo la misma estructura que los módulos de negocio:

```bash
src/
├── modules/
│   ├── auth/
│   │   ├── auth.service.ts
│   │   ├── auth.service.spec.ts   👈 Pruebas del módulo de autenticación
│   ├── quote/
│   │   ├── quote.service.ts
│   │   ├── quote.service.spec.ts  👈 Pruebas del cálculo de cotizaciones
│   ├── shipment/
│   │   ├── shipment.service.ts
│   │   ├── shipment.service.spec.ts 👈 Pruebas del registro de envíos
```

Cada archivo `*.spec.ts` contiene pruebas para el servicio correspondiente, simulando dependencias con `jest.mock()` y `jest.spyOn()`.

### Ejecutar los tests

Puedes ejecutar todos los tests con:

```bash
npm run test
```

## 👨‍💻 Autor

Desarrollado por **Jeison Rojas** - *Desarrollador Fullstack* - [jeisonrojasm](https://github.com/jeisonrojasm)