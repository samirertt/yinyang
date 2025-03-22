# Yinyang Setup Guide

## Prerequisites
To ensure that your Spring Boot application runs smoothly, make sure you have the following installed:

### 1. Java 23
- Verify your Java version by running:
  ```sh
  java -version
  ```
- If Java 23 is not installed, download and install it from [Oracle JDK](https://www.oracle.com/java/technologies/javase-downloads.html) or use an OpenJDK distribution.

### 2. MySQL
- Ensure MySQL is installed and running.
- If MySQL is not installed, download it from [MySQL Downloads](https://dev.mysql.com/downloads/).
  Update your `application.properties` or `application.yml` file with the appropriate database connection settings.

## Running the Project

### 1. Clone the Repository
If you haven't already, clone the project.

### 2. Build and Run the Application
Use Gradle to build the project and install dependencies:
access and run the `build.gradle` file under the Backend folder
Run the following command to build the project:
"./gradlew build"
This compiles the code, runs tests, and generates a JAR file in build/libs/.
To force refresh dependencies:
"./gradlew build --refresh-dependencies"

Then, Run the app with the bootRun task:
./gradlew bootRun
The app will start on http://localhost:8080.
Stop the app with Ctrl + C.

### 3. Adding Dependencies
If you need to add new dependencies, update the `build.gradle` file under the `dependencies` section.
Then, run the `build.gradle` to fetch the new dependencies.

## Troubleshooting

### 1. Java Version Issues
If you encounter Java-related issues, ensure Gradle is using Java 23 by running:
If an older version is used, update your `JAVA_HOME` environment variable.

### 2. MySQL Connection Errors
- Check if MySQL is running:
- Ensure the database credentials in `application.properties` are correct.

### 3. Gradle Build Issues
If the build fails, try 'gradle clean'
and then re-run the build command.

---
With these steps, you should be able to set up and run your Spring Boot application successfully.

