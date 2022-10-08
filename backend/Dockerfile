FROM maven:3-openjdk-17-slim AS builder
ENV WORKDIR /app
WORKDIR $WORKDIR
COPY . .
RUN mvn clean package

FROM eclipse-temurin:17.0.4.1_1-jre-jammy
ENV WORKDIR /app
WORKDIR $WORKDIR
COPY --from=builder $WORKDIR/target/event-manager-0.0.1.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]