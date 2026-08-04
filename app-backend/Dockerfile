FROM eclipse-temurin:21-jre AS runtime

WORKDIR /app

COPY build/libs/app-backend-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 4000

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
