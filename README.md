

# 📚 Library Management System

A full-stack Library Management application built with:

- **Backend:** FastAPI (Python) + PostgreSQL
- **Frontend:** Next.js (React + TypeScript)
- **Database:** PostgreSQL (Dockerized)

This application allows library staff to:

- Manage books
- Manage members
- Record borrowing and returning operations
- View all active and historical borrow records

---

# 🏗️ Project Structure

library-management/
│
├── backend/ # FastAPI + PostgreSQL
│ └── docker-compose.yml
│
├── library-mgmt-frontend/ # Next.js frontend
│
└── README.md


---

# 🚀 Getting Started

## 1️⃣ Clone the Repository

```bash
git clone <reponame>
cd <reponame>
```

## 2️⃣ Start Backend + Database

```bash
cd backend
docker-compose up -d
```

## 3️⃣ Run Frontend

```bash
cd library-mgmt-frontend
npm install
npm run dev
```

## 4️⃣ Open in Browser

http://localhost:3000

---

# 🛠️ Tech Stack

## Backend
- FastAPI
- PostgreSQL
- Alembic (migrations)
- Pydantic

## Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

## Infrastructure
- Docker
- Docker Compose

---

# 📂 Backend Details

## Database Setup

```bash
cd backend
# Create database
psql -U library_db_admin -d postgres -c "CREATE DATABASE library_mgmt;"

# Run migrations
alembic upgrade head
```

## API Endpoints

- `POST /books` — Create book
- `GET /books` — List books
- `POST /members` — Create member
- `GET /members` — List members
- `POST /borrow` — Borrow book
- `POST /return/<id>` — Return book
- `GET /borrow` — List all borrowings

---

# 🎨 Frontend Details

## Pages

- `/` — Dashboard
- `/books` — Manage books
- `/members` — Manage members
- `/borrow` — Borrow books
- `/borrow-history` — View all borrowings

## Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

# 🐳 Docker Details

## Backend Services

- `postgres` — PostgreSQL 15
- `pgadmin` — pgAdmin 4
- `backend` — FastAPI application

## Ports

- Frontend: 3000
- Backend API: 8000
- pgAdmin: 5050

---

# 📝 Database Schema

## Books Table

```sql
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    isbn VARCHAR(20) UNIQUE,
    quantity INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT NOW()
);
```

## Members Table

```sql
CREATE TABLE members (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT NOW()
);
```

## Borrowings Table

```sql
CREATE TABLE borrowings (
    id SERIAL PRIMARY KEY,
    book_id INT REFERENCES books(id),
    member_id INT REFERENCES members(id),
    borrowed_at TIMESTAMP DEFAULT NOW(),
    due_date TIMESTAMP NOT NULL,
    returned_at TIMESTAMP,
    status VARCHAR(20) DEFAULT 'borrowed'
);
```

---

# 🔄 Workflow

1. **Add Books** → Go to `/books` → Add book details
2. **Add Members** → Go to `/members` → Add member details
3. **Borrow Book** → Go to `/borrow` → Select book + member
4. **Return Book** → Go to `/borrow-history` → Click "Return"

---

# 🔧 Development

## Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

alembic upgrade head
uvicorn main:app --reload
```

## Frontend

```bash
cd library-mgmt-frontend
npm run dev
```

---

# 📦 Deployment

## Docker Compose

```bash
cd backend
docker-compose up -d --build
```

## Stop

```bash
cd backend
docker-compose down
```

---


