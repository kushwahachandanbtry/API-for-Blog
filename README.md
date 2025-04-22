# 📝 Blog API

A RESTful Blog API built with **Node.js**, **Express**, and **MongoDB**. This API allows developers to create, manage, and publish blog content with features like authentication, categories, and optional tags, SEO tools for premium use cases.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- Secure JWT-based authentication
- Role-based access control (Admin, Author) *(premium)*

### 📝 Post Management
- Full CRUD for blog posts
- Draft and publish status support *(premium)*
- SEO-friendly slugs *(premium)*

### 🏷️ Tags & Categories
- Add and assign category to posts
- Organize content with categories
- Filter posts by categories

### 🔍 Search & Filtering
- Search blog posts by keywords
- Filter by author, tag, category, date *(premium)*

### 📅 Pagination & Sorting *(premium)*
- Paginate large post lists
- Sort by newest, oldest, popular

### 💬 Comments
- Nested comments support
- Admin moderation panel *(premium)*

### 🌟 SEO Features *(Premium)*
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

Install dependencies and run the project

```bash
npm install

npm start

```
---

## 📦 Dependencies

- **express**: ^5.1.0 – Web framework
- **mongoose**: ^8.13.2 – MongoDB object modeling
- **bcrypt**: ^5.1.1 – Password hashing
- **body-parser**: ^2.2.0 – Parse request bodies
- **jsonwebtoken**: ^9.0.2 – JWT auth support
- **nodemon**: ^3.1.9 – Auto-reload during development

---

## 📌 Endpoints

| Method | Endpoint                                         | Description                          |
|--------|--------------------------------------------------|--------------------------------------|
| GET    | `/api/blog`                                  | Get own blog                         |
| GET    | `/api/blog/getAllBlog`                       | List all blog posts                  |
| GET    | `/api//getByCategory/:id`                    | Get blogs by category                |
| GET    | `/api/category`                              | List all category                    |
| GET    | `/api/category/ownCategory`                  | Get own category                     |
| GET    | `/api/comment`                               | List all comment                     |
| GET    | `/api/comment/getAllComment/:blogId`         | Get all comment for particular blog  |
| POST   | `/api/blog`                                  | Add blog                             |
| POST   | `/api/category`                              | Add category                         |
| POST   | `/api/comment`                               | Add comment                          |
| POST   | `/api/user/signup`                           | Create user account                  |
| POST   | `/api/user/login`                            | Login user account                   |
| PUT    | `/api/blog/:id`                              | Update blog                          |
| PUT    | `/api/blog/:id`                              | Update blog                          |
| PUT    | `/api/blog/:id`                              | Update blog                          |
| PUT    | `/api/category/:id`                          | Update category                      |
| PUT    | `/api/comment/:id`                           | Update comment                       |
| DELETE | `/api/blog/:id`                              | Delete comment                       |
| DELETE | `/api/category/:id`                          | Delete comment                       |
| DELETE | `/api/comment/:id`                           | Delete comment                       |

---

## 📖 RESTful API - What Does It Mean?

A **RESTful API** is an API that follows the REST (Representational State Transfer) principles. It uses standard HTTP methods like `GET`, `POST`, `PUT`, and `DELETE` to interact with resources in a stateless, scalable, and consistent manner.

Example:
- `GET /api/blog` → Fetch all blog posts
- `POST /api/blog` → Create a new blog post
- `PUT /api/blog/1` → Update the blog post with ID 1
- `DELETE /api/blog/1` → Delete the blog post with ID 1

RESTful APIs make your backend easier to understand, maintain, and integrate with frontend applications.

---

## 👤 Author
**Chandan Kushwaha**
- **GitHub**: https://github.com/kushwahachandanbtry
- **Email**: infokushwahachandan@gmail.com
- **Whatsapp**: 9823196848
- Licensed under the **MIT License**

---

## 💬 Feedback or Contributions
Have suggestions or want to contribute?
- Open an issue on GitHub
- Submit a pull request
- Fork and customize your own version
