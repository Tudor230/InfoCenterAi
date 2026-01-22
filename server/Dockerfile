# --- Stage 1: Build (Corrected for 2026) ---
# We use the official Maven 4 image and manually specify the JDK 25 environment
FROM maven:eclipse-temurin AS build
WORKDIR /app

# 1. Pre-fetch dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

# 2. Build the JAR
COPY src ./src
RUN mvn clean package -DskipTests

# --- Stage 2: Runtime (Unchanged) ---
FROM eclipse-temurin:25-jre-jammy
WORKDIR /app

RUN addgroup --system spring && adduser --system spring --ingroup spring
USER spring:spring

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "--sun-misc-unsafe-memory-access=allow", "-XX:MaxRAMPercentage=75.0", "-jar", "app.jar"]