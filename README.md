TodoAPP Technical Exam – Full-Stack Todo Application

This project is a full-stack Todo application using Spring Boot for the backend and React + TypeScript + Vite for the frontend.

Tech Stack

Backend:

Java 17

Spring Boot

Spring Data JPA

MySQL / H2 (in-memory database)

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

Before running the project, make sure you have:

Java 17 installed

Maven installed (optional if using IntelliJ IDEA)

Node.js 18+ and npm or yarn

MySQL (optional if using H2 in-memory database)

Git (optional, for cloning repo)

Backend Setup (Spring Boot)
1. Clone the backend repository
git clone https://github.com/jpellogo01/TodoAPP-Technical-Exam.git
cd Todo-Backend

2. Configure the database
Option 1: MySQL

Open src/main/resources/application.properties and update your credentials:

spring.datasource.url=jdbc:mysql://localhost:3306/todo_db
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update


Make sure the database todo_db exists in your MySQL server.

Option 2: H2 (in-memory)

No configuration needed. H2 will run automatically. You can access the console at:

http://localhost:8080/h2-console

3. Build and run the backend
Option 1: IntelliJ IDEA (Recommended)

Open the Todo-Backend folder in IntelliJ IDEA.

IntelliJ will automatically detect it as a Maven project.

Click Run → Run 'TodoBackendApplication' (main class).

Backend will start at:

http://localhost:8080

Option 2: VS Code or Terminal

If you don’t use IntelliJ:

# build the project
mvn clean install

# run the Spring Boot application
mvn spring-boot:run

4. Test the API (optional)

Open your browser or Postman and check the endpoint:

GET http://localhost:8080/api/v1/todos

Frontend Setup (React + TypeScript + Vite)
1. Navigate to the frontend folder
cd C:\Users\User\Downloads\TodoAPP-Technical-Exam\Todo-Frontend\my-react-app

2. Install dependencies
npm install

3. Run the frontend
npm run dev


Open your browser at the URL shown in the terminal (usually: http://localhost:5173).

The frontend will now communicate with the backend running at http://localhost:8080.

Running the Full App

Start the backend first (Spring Boot).

Start the frontend (Vite).

Navigate to the frontend URL in your browser and start using the app.
