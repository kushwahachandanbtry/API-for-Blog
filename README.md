# 📝 Blog API

A RESTful Blog API built with **Node.js**, **Express**, and **MongoDB**. This API allows developers to create, manage, and publish blog content with features like authentication, categories, and optional tags, SEO tools for premium use cases.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- Secure JWT-based authentication
- Role-based access control (Admin, Author)

### 📝 Post Management
- Full CRUD for blog posts
- Draft and publish status support
- SEO-friendly slugs

### 🏷️ Tags & Categories
- Add and assign tags to posts
- Organize content with categories
- Filter posts by tags or categories

### 🔍 Search & Filtering
- Search blog posts by keywords
- Filter by author, tag, category, date

### 📅 Pagination & Sorting
- Paginate large post lists
- Sort by newest, oldest, popular

### 💬 Comments (Optional)
- Nested comments support
- Admin moderation panel

### 🌟 SEO Features *(Premium Only)*
- Meta title, description, and keywords
- Open Graph & Twitter Card support
- Sitemap & robots.txt generation
- Canonical URLs

> 🔐 **Upgrade to Premium** to unlock advanced SEO features that improve search engine visibility.

---

## 📦 Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT, bcrypt
- **Runtime Tools**: Nodemon

---

## 📂 Project Structure
api-for-blog/ ├── server.js ├── routes/ ├── app.js├── models/ ├── middleware/ └── package.json

---

## 📌 Available Scripts
In the project directory, you can run:

```bash
npm start
