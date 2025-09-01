# Fullstack App (Frontend + Backend + PostgreSQL)

This project contains two main parts:

- **Frontend** → React/Next.js app  
- **Backend** → NestJS app with PostgreSQL (TypeORM)  

All services are orchestrated with **Docker Compose**.

---

## 🚀 How to Run

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/)  
- [Docker Compose](https://docs.docker.com/compose/install/)  

### Start the project
From the project root (where `docker-compose.yml` is located), run:

```bash
docker-compose up --build -d
```

This will:
* Start the **frontend**
* Start the **backend**
* Start the **PostgreSQL** database

## 🌐 Service URLs

Once everything is up and running:
* **Frontend (Next.js)** → http://localhost:5000
* **Backend (NestJS)** → http://localhost:3000

## 🛑 Stop the project

To stop all containers:

```bash
docker-compose down
```

If you also want to remove volumes (clean DB):

```bash
docker-compose down -v
```

## 📝 Notes

* If ports are already in use, you can change them in `docker-compose.yml`.