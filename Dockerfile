FROM maven:3.8.7-openjdk-18-slim AS build

# Copy pom.xml first for better Docker layer caching
COPY pom.xml /app/
WORKDIR /app

# Download dependencies (cached layer)
RUN mvn dependency:go-offline -B

# Copy source code
COPY src /app/src

# Build the application
RUN mvn package -DskipTests

# Runtime stage
FROM registry.access.redhat.com/ubi8/openjdk-17-runtime:1.18

ENV LANGUAGE='en_US:en'

# Copy the Quarkus application
COPY --from=build /app/target/quarkus-app/lib/ /deployments/lib/
COPY --from=build /app/target/quarkus-app/*.jar /deployments/
COPY --from=build /app/target/quarkus-app/app/ /deployments/app/
COPY --from=build /app/target/quarkus-app/quarkus/ /deployments/quarkus/

# Run the application
EXPOSE 8080
USER 185
CMD ["java", "-jar", "/deployments/quarkus-run.jar"]