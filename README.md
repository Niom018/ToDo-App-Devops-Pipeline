# 📝 Todo App — DevOps CI/CD Pipeline

![CI/CD Pipeline](https://github.com/Niom018/ToDo-App-Devops-Pipeline/actions/workflows/ci.yml/badge.svg)

A console-based CRUD Todo app (Node.js + MySQL) wrapped with a full DevOps pipeline: automated testing, containerization, and CI/CD via GitHub Actions.

> This is the DevOps-enhanced version of the original console app. Core application logic lives in the base project: [Console-based-ToDo-app](https://github.com/Niom018/Console-based-ToDo-app).

## 🚀 DevOps Highlights

- **Automated testing** — 9 Jest integration tests running against a real MySQL instance (not mocks), covering auth and task CRUD operations
- **Containerization** — Dockerfile + `docker-compose.yml` for a reproducible app + database environment
- **CI/CD pipeline** — GitHub Actions workflow that on every push/PR to `main`:
  1. Spins up a MySQL service container
  2. Installs dependencies
  3. Runs the full automated test suite against MySQL
  4. Builds the Docker image
- **Pipeline as code** — see [`.github/workflows/ci.yml`](.github/workflows/ci.yml)

## 🛠️ Tech Stack

**App:** Node.js · MySQL2 · dotenv · readline-sync
**DevOps:** Docker · Docker Compose · GitHub Actions · Jest

## ⚙️ Quick Start (Docker)

```bash
git clone https://github.com/Niom018/ToDo-App-Devops-Pipeline.git
cd ToDo-App-Devops-Pipeline
docker compose up --build
```

This spins up the app alongside a MySQL container — no manual DB setup needed.

## ⚙️ Manual Setup

1. Install dependencies
```bash
npm install
```

2. Create `.env` from example and fill in your MySQL credentials
```bash
cp .env.example .env
```
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=my_password
DB_NAME=todo_app
DB_PORT=3306
```

3. Create the database
```sql
CREATE DATABASE todo_app;
```

4. Run the app
```bash
node app.js
```

## 🧪 Running Tests

```bash
npm test
```

Runs Jest against a live MySQL database, covering registration, login, and task CRUD (add/edit/delete) — including validation edge cases.

## 📁 Project Structure

ToDo-App-Devops-Pipeline/
├── .github/
│   └── workflows/
│       └── ci.yml          # CI/CD pipeline definition
├── src/
│   ├── config/db.js
│   ├── models/initDB.js
│   ├── services/
│   │   ├── authService.js
│   │   └── taskService.js
│   ├── menus/
│   └── utils/validators.js
├── tests/
│   ├── authService.test.js
│   └── taskService.test.js
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── .env.example
└── app.js

## 🗄️ Database Schema

**Users** — id, name, email, password
**Tasks** — id, userId (FK), title, description, dueDate, priority (Low/Medium/High), status (Pending/Completed), createdAt, updatedAt

## 🎥 Demo Video
[▶️ Watch Demo Video](https://drive.google.com/file/d/1tJ3WBuh90HuCWUuaK78Q15RH5t3cDvjz/view?usp=sharing)

## 👤 Author
- **Name:** Niamul Hasan
- **Batch:** 18
- **Student ID:** NH91974
- **Institute:** Daffodil International University