TodoAPP Technical Exam

Full-stack Todo application using Spring Boot for the backend and React + TypeScript + Vite for the frontend.

Tech Stack

Backend:
Java 17
Spring Boot
Spring Data JPA
MySQL / H2
Lombok
Maven

Frontend:
React
TypeScript
Vite
Material UI
Axios
ESLint

Prerequisites
Java 17
Maven
Node.js 18+ and npm or yarn
MySQL
Git (optional, for cloning repo)

Backend (Spring Boot)
Clone the repository
git clone (https://github.com/jpellogo01/TodoAPP-Technical-Exam.git)
cd Todo-Backend

Configure the database
MySQL: Update src/main/resources/application.properties with your credentials:

spring.datasource.url=jdbc:mysql://localhost:3306/todo_db
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update

H2 (in-memory): No configuration required; H2 will run automatically.

Build and run the backend:
mvn clean install
mvn spring-boot:run

The backend will start at: http://localhost:8080
Test API (optional)
Open your browser or Postman and visit:
GET http://localhost:8080/api/v1/todos

Frontend (React + TypeScript + Vite)
Navigate to the frontend folder
cd TodoAPP-Technical-Exam\Todo-Frontend
Install dependencies
npm install
Run the frontend
npm run dev

Open your browser at the URL shown in the terminal (usually http://localhost:5173).

Running the Full App

Start the backend first (http://localhost:8080)

Start the frontend (http://localhost:5173)
