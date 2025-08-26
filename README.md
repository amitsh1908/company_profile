# Company Portfolio Website with Admin Panel

This is a simple company portfolio website. It has normal pages to show company details and services.  
There is also an **admin panel** where admin can login and manage contact form data.  

### Features
- Contact form to save messages in database  
- Admin panel to see all messages  
- CRUD operations (add, view, update, delete contacts)  
- Login system using sessions  
- Made with MVC pattern (controllers, models, routes, views)  

### Technologies Used
- HTML, CSS, JavaScript  
- Node.js, Express.js  
- MySQL  
- EJS for templates  

### How to Run
1. Clone the project  
2. Run `npm install` to install dependencies  
3. Make a `.env` file for database connection and session secret  
4. Run `npm start`  
5. Open browser at `http://localhost:8085`  

### Folder Structure (basic idea)
```
src/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── db/
 └── app.js
views/
public/
```
