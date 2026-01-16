TodoAPP: Cadet Frontend Developer Assesment

Tech Stack

Backend:
Java 17 & Spring Boot 3.x

Spring Data JPA (Persistence layer)

MySQL / H2 (Database options)

Lombok (Boilerplate reduction)

Maven (Build tool)

Frontend:
React 18 (UI Library)

TypeScript (Type safety)

Vite (Build tool & Dev server)

Material UI (MUI) (Component library)

Axios (HTTP Client)

Prerequisites:
Ensure you have the following installed:

Java JDK 17

Node.js 18+ & npm

Maven (Optional if using IntelliJ)

MySQL (Optional, defaults to H2 in-memory)

Backend Setup (Spring Boot)
1. Clone and Navigate
Bash

git clone https://github.com/jpellogo01/TodoAPP-Technical-Exam.git
cd Todo-Backend
2. Database Configuration
By default, the app is configured for H2 (In-Memory). If you wish to use MySQL, update src/main/resources/application.properties:

Properties

# Switch to MySQL
spring.datasource.url=jdbc:mysql://localhost:3306/todo_db

spring.datasource.username=YOUR_USERNAME

spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update

Note: If using MySQL, manually create the database todo_db before starting the app.

3. Run the Application
4. 
IntelliJ IDEA: Open the folder, wait for Maven indexing, and run TodoBackendApplication.java.

Terminal:



mvn clean install

mvn spring-boot:run

The API will be available at: http://localhost:8080

💻 Frontend Setup (React + TS)
1. Navigate to Project


cd Todo-Frontend/my-react-app
2. Install & Launch


# Install dependencies
npm install

# Start the development server
npm run dev

The frontend will launch at: http://localhost:5173
