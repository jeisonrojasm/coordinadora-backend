<p align="center">
  <img src="https://coordinadora.com/wp-content/uploads/2023/03/logo-coordinadora.svg" width="500" alt="Coordinadora logo" />
</p>

# Coordinadora Backend

RESTful API built with Express and TypeScript for quoting, registering, and tracking shipments. The API leverages PostgreSQL for data storage, Redis for caching, and JWT for secure authentication. Data is validated safely, and interactive documentation is provided through Swagger. Shipment statuses can be tracked in real time thanks to WebSocket integration, enabling seamless communication between the backend and frontend.

## 🛠️ Built with

- Node.js + Express
- TypeScript
- PostgreSQL
- Redis
- JWT for authentication
- Swagger for documentation
- Docker
- Zod
- Jest

## ✅ Prerequisites

Before getting started, make sure you have the following installed:

- ✅ [*Git*](https://git-scm.com/)
- ✅ [*Docker* y Docker Compose](https://www.docker.com/get-started) installed and running

## 📥 Get the project

Clone the repository:

```bash
#Clone the repository:
git clone https://github.com/jeisonrojasm/coordinadora-backend.git
cd coordinadora-backend
```

## 📁 Project Structure

The project structure is organized to maintain a clear separation of responsibilities, making the application easier to maintain and scale.

```bash
coordinadora-backend/
├── db/                     # SQL migration files (used by dbmate)
│   └── migrations/         # Timestamped migrations
├── src/                    # Application source code
│   ├── config/             # General configurations (Redis, DB, dotenv)
│   ├── middlewares/        # Custom middlewares (auth, validations, error handling)
│   ├── modules/            # Main modules divided by domain
│   │   ├── auth/           # Sign up and log in
│   │   ├── quote/          # Shipping quote
│   │   ├── shipment/       # Shipment creation and tracking
│   │   └── ...             # Other future modules
│   └── utils/              # Utilities used throughout the entire app
├── .env                    # Environment variables (not versioned)
├── .gitignore              # Excludes files or folders that should not be uploaded to the repository
├── docker-compose.yml      # Service orchestration with Docker
├── Dockerfile              # Backend image with Node.js
├── package.json            # Dependencies and scripts
├── README.md               # Project documentation
└── tsconfig.json           # TypeScript configuration
```

### Modular Structure

Each module inside `src/modules` follows the following pattern:

```bash
module/
├── module.controller.ts    # HTTP controller
├── module.repository.ts    # Database queries
├── module.routes.ts        # Module endpoints
├── module.service.spec.ts  # Module unit tests
├── module.service.ts       # Business logic
├── module.validation.ts    # Validations with Zod
```

## 🚀 Run

### 1. **`.env` file required**

Normally, the `.env` file **should not be included** in a public repository, as it may contain sensitive configuration values.
However, for demonstration and evaluation purposes —and because this is not a production project— the `.env` file is included in the repository so anyone can run the project without additional setup.

You will find the `.env` file already placed in the root of the project.

### 2. Set up the development environment with Docker

Since this application is fully dockerized, there is no need to manually install Node.js or dependencies on your machine. Simply run the following command from the project root to build the image and start the backend container:

```bash
docker-compose up --build
```

This command will perform the following actions:

- It will build the Docker image defined in the `Dockerfile`, using `node:20-alpine` as the base.
- It will automatically install all dependencies declared in the `package.json`.
- It will mount the source code from your machine into the container, allowing you to see changes in real time.
- It will start the development server with `ts-node-dev`, enabling automatic hot-reload whenever any `.ts` files change.

Once the process is complete, the backend will be available at:

```arduino
http://localhost:3000
```

### 3. Connect to pgAdmin

The PostgreSQL database and the pgAdmin administration tool are also dockerized, so there is no need to install them locally.

To access pgAdmin and view the database:

1. Open your browser and visit the following URL:

   ```bash
   http://localhost:8080
   ```

2. Log in using the credentials defined in your `.env` file:

   ```bash
   PGADMIN_DEFAULT_EMAIL
   PGADMIN_DEFAULT_PASSWORD
   ```

3. Once inside the pgAdmin dashboard:
   - Right-click on the **Servers** section (left sidebar).
   - Select **Register** > **Server**.

4. In the configuration form:

   🧾 **General tab**
   - **Name**: Enter a descriptive name, for example: `Coordinadora DB`.

   🔌 **Connection tab**
   - **Host name/address**: Defined in the `DB_HOST` variable of the `.env` file
   - **Port**: Defined in the `DB_PORT` variable of the `.env` file
   - **Username**: Defined in the `DB_USER` variable of the `.env` file
   - **Password**: Defined in the `DB_PASSWORD` variable of the `.env` file
   - Optional: Check the *Save password* box to avoid entering it each time.
  
5. Click **Save** to save the configuration and connect.

   Once the connection is created, you can browse the databases, view tables, run queries, and manage data from the pgAdmin interface.

### 4. Automatic database migrations

This project uses **dbmate** as a tool to manage database migrations using pure SQL, which meets the explicit requirement to avoid ORMs.

🛠️ What does this mean?

- You don’t need to connect to pgAdmin or create the tables manually.
- When starting the containers with Docker, the necessary tables are automatically created in the PostgreSQL database if they do not already exist.

📦 How does it work?

- The `docker-compose.yml` file defines an additional service called `dbmate`, which is responsible for applying the migrations once PostgreSQL is ready.
- This service uses the `dbmate` tool to find and apply all migration `.sql` files located in:

```bash
./db/migrations/
```

Each migration file has a timestamped name to ensure the execution order, for example:

```bash
20240627150000_create_users_table.sql
```

This ensures that anyone who clones the project and runs:

```bash
docker-compose up --build
```

Will automatically have the database with all the necessary tables without any additional configuration.

## ✅ Application ready to use

Once the previous steps are completed:

- The backend server will be running at `http://localhost:3000`.
- The PostgreSQL database will be ready and migrated.
- You will be able to consume the defined REST endpoints.
- You will have access to pgAdmin to manage your data through a graphical interface.
- Redis will be available for caching.
- And the interactive documentation will be available in Swagger (if you have already set up the `/api-docs` endpoint).

> 🧪 You can now test the endpoints using **Postman** or any HTTP client like **Insomnia**, and start building the frontend or any integrations you need.

## 📚 Swagger documentation

This API features interactive documentation automatically generated with Swagger, thanks to the integration with `swagger-jsdoc` and `swagger-ui-express`.

### What can you do from Swagger?

- View all available endpoints (GET, POST, PATCH, etc.)
- View request and response examples.
- View the validation schemas defined with Zod.
- Test the endpoints directly from the browser (requires JWT authentication for protected endpoints).

### Access the documentation

Once the backend is running, you can access Swagger at:

```bash
http://localhost:3000/api-docs
```

### JWT authentication in Swagger

1. First, make a login request with a valid user to obtain a token.
2. In Swagger, click the **Authorize** button (🔒)located at the top right.
3. Enter the token.
4. Once authenticated, you can test all protected endpoints without needing Postman or any external tools.

## 🧪 Automated tests

This project includes a set of unit tests written with [Jest](https://jestjs.io/) to ensure the proper functioning of the main services and controllers.

### Test structure

The tests are organized following the same structure as the business modules:

```bash
src/
├── modules/
│   ├── auth/
│   │   ├── auth.service.ts
│   │   ├── auth.service.spec.ts   👈 Authentication module tests
│   ├── quote/
│   │   ├── quote.service.ts
│   │   ├── quote.service.spec.ts  👈 Shipping quote calculation tests
│   ├── shipment/
│   │   ├── shipment.service.ts
│   │   ├── shipment.service.spec.ts 👈 Shipment registration tests
```

Each `*.spec.ts` file contains tests for the corresponding service, mocking dependencies with `jest.mock()` and `jest.spyOn()`.

### Run the tests

You can run all the tests with:

```bash
npm run test
```

## 👨‍💻 Author

Developed by **Jeison Rojas Mora** - *Fullstack Developer*

- [https://github.com/jeisonrojasm](https://github.com/jeisonrojasm)
- [https://www.linkedin.com/in/jeison-rojas-mora/](https://www.linkedin.com/in/jeison-rojas-mora/)