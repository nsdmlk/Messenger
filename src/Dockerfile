# Используем базовый образ с Java
FROM openjdk:11-jre-slim

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем JAR-файл в контейнер
COPY target/blue-1.0-SNAPSHOT.jar blue-1.0-SNAPSHOT.jar

# Копируем статические файлы (HTML, CSS)
COPY src/front/webapp /app/static

# Открываем порт, на котором работает приложение
EXPOSE 8080

# Команда для запуска приложения
ENTRYPOINT ["java", "-jar", "blue-1.0-SNAPSHOT.jar"]