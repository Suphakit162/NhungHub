# NhungHub

Project about 960103  
Movie & Series API

มี API สองฝั่งคือ Movies และ Users

---

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Contributors](#contributors)

---

## Features
- RESTful API สำหรับจัดการข้อมูลหนังและผู้ใช้
- ใช้ Express, Sequelize, PostgreSQL
- รองรับ CRUD (Create, Read, Update, Delete)
- มีระบบ Auth สำหรับผู้ใช้และแอดมิน

---

## Installation

```bash
git clone https://github.com/yourusername/nhunghub.git
cd nhunghub
npm install express sequelize pg pg-hstore express-session morgan bcrypt
```

- ตั้งค่า database ใน `config/db.js`
- นำเข้าไฟล์ `nhunghub.sql` เข้าฐานข้อมูล PostgreSQL

---

## Usage

```bash
node app.js
```
หรือ  
```bash
npm start
```

---

## API Endpoints

### Movies
- `GET /movies` : ดึงหนังทั้งหมด
- `GET /movies/:id` : ดึงหนังตาม id
- `GET /movies/search?keyword=xxx` : ค้นหาหนังด้วย keyword
- `GET /movies/genres` : ดึง genre ทั้งหมด

### Users
- `GET /users` : ดึงผู้ใช้ทั้งหมด
- `GET /users/:id` : ดึงผู้ใช้ตาม id
- `POST /users/register` : สมัครสมาชิก
  {
  "username": "alice",
  "email": "alice@example.com",
  "password": "passAlice1"
}
- `POST /auth/login` : เข้าสู่ระบบ
  {
  "email": "alice@example.com",
  "password": "passAlice1"
}

### Admin 
Admin ทั้งหมดต้องระบุ Name และ password ให้ถูกต้องถายใน body ก่อน ถึงจะสามารถส่งคืนข้อมูลได้
- `GET /admin` : ดึงข้อมูลทั้งหมดจาก Table Movies หรือ Users ตามที่ระบุใน Body
- `GET /admin/:id` : ดึงข้อมูลตาม id จาก Table Movies หรือ Users ตามที่ระบุใน Body
- `POST /admin/add` : เพิ่มข้อมุลภายใน Table Movies หรือ Users ตามที่ระบุใน Body
- `PUT /admin/update/:id` : แก้ไขข้อมูลตาม id จาก Table Movies หรือ Users ตามที่ระบุใน Body
- `DELETE /admin/delete/:id` : ลบข้อมูลตาม id จาก Table Movies หรือ Users ตามที่ระบุใน Body

---

## Project Structure

```
NhungHub/
│
├── controllers/
├── models/
├── routes/
├── services/
├── config/
├── middlewares/
├── app.js
├── nhunghub.sql
└── README.md
```

---

## Contributors
- ธนกร กันอูบ 672110142
- นฤดล เมืองอุดร 672110147
- ศุภกฤต แสนวงค์คำ 672110162
- พีรวิชญ์ เตจ๊ะใหม่ 672110238
