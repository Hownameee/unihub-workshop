FROM eclipse-temurin:21-jre AS runtime

WORKDIR /app

COPY build/libs/gateway-bff-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
