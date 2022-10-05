FROM openjdk:17

COPY . /usr/src/event-manager
WORKDIR /usr/src/event-manager

RUN ./mvnw clean install

CMD java -jar ./target/event-manager-0.0.1.jar
