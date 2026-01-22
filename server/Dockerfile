# --- Stage 1: Build ---
# Using Maven 4 with JDK 25 for the compilation process
FROM maven:4.0.0-beta-3-eclipse-temurin-25 AS build
WORKDIR /app

# Copy only the pom.xml first to cache dependencies
# This speeds up subsequent builds if your code changes but dependencies don't
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy the source code and build the application
COPY src ./src
RUN mvn clean package -DskipTests

# --- Stage 2: Runtime ---
# Using the lightweight JRE 25 image for the final container
FROM eclipse-temurin:25-jre-jammy
WORKDIR /app

# Create a non-root user for security (Standard for 2026)
RUN addgroup --system spring && adduser --system spring --ingroup spring
USER spring:spring

# Copy the compiled JAR from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the standard Spring Boot port
EXPOSE 8080

# Run the application with container-aware memory settings
ENTRYPOINT ["java", "-XX:MaxRAMPercentage=75.0", "-jar", "app.jar"]