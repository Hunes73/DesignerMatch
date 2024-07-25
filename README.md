# DesignerMatch

# Spis treści

- [**Opis aplikacji**](#opis-aplikacji)
- [**Uruchomienie aplikacji**](#uruchomienie-aplikacji)
- [**Działanie aplikacji**](#działanie-aplikacji)
- [**Dodatkowe informacje**](#dodatkowe-informacje)

# Opis aplikacji

**DesignerMatch** to platforma, która ułatwia nawiązywanie współpracy między projektantami a
klientami.
Jest ona dostępna zarówno jako aplikacja webowa, jak i mobilna.
Jest ona przeznaczona dla osób i firm, które poszukują specjalistów w dziedzinie designu, a także
dla projektantów, którzy chcą zaprezentować swoje portfolio.
Artyści mogą tworzyć swoje profile, dodawać portfolio, umieszczać informacje o swoich
umiejętnościach, doświadczeniu, wykształceniu, a także oczekiwaniach finansowych.
Użytkownicy mogą przeglądać profile artystów, wyszukiwać ich według różnych kryteriów, a także
nawiązywać z nimi kontakt.

# Uruchomienie aplikacji

1. **Sklonuj repozytorium**
    ```bash
    git clone https://github.com/Hunes73/DesignerMatch.git
    ```

2. **Przejdź do katalogu z projektem**
    ```bash
    cd DesignerMatch
    ```

3. **Przygotuj bazę danych Postgres**
    - Docker
    - Uruchom kontener z bazą danych w katalogu z projektem:
        ```bash
        docker-compose up db
        ```
    - Konfiguracja dostępna jest w pliku 'docker-compose.yml'
    - Lokalnie
        - Utwórz bazę o nazwie `mylibraryfx`:
          ```pgsql
          CREATE DATABASE mylibraryfx;
          ``` 
        - W pliku `src/main/resources/application.properties` zmień dane dostępowe do bazy danych:
          ```properties
          spring.datasource.url=jdbc:postgresql://localhost:$PORT/mylibraryfx
          spring.datasource.username=$USERNAME
          spring.datasource.password=$PASSWORD
          ```

4. **Przygotuj serwer SMTP**
    - Docker
        - Uruchom kontener z serwerem SMTP w katalogu z projektem:
          ```bash
          docker-compose -f docker-compose-mail.yml up
          ```
    - Lokalnie
        - Uruchom serwer SMTP,
          np. [PaperCut SMTP](https://github.com/ChangemakerStudios/Papercut-SMTP)
        - W pliku `src/main/resources/application.properties` zmień dane dostępowe do serwera SMTP:
          ```properties
          spring.mail.host=$HOST
          spring.mail.port=$PORT
          spring.mail.username=$USERNAME
          spring.mail.password=$PASSWORD
          ```

5. **Uruchom serwer aplikacji**
    - Uruchom serwer po raz pierwszy:
        - Ustaw parametry w pliku `src/main/resources/application.properties`:
          ```properties
          spring.jpa.hibernate.ddl-auto=create
          spring.sql.init.mode=never
          ```
        - Uruchom aplikację:
             ```bash
             mvnw spring-boot:run
             ```
    - Uruchom serwer po raz kolejny:
        - Ustaw parametry w pliku `src/main/resources/application.properties`:
          ```properties
          spring.jpa.hibernate.ddl-auto=update
          spring.sql.init.mode=never
          ```
        - Uruchom aplikację:
          ```bash
          mvn spring-boot:run
          ```
    - Aplikacja będzie dostępna pod adresem `http://localhost:8080`
    - Dokumentacja API dostępna jest pod adresem `http://localhost:8080/docs/swagger-ui/index.html`

6. **Uruchom klienta aplikacji**
    - Przejdź do katalogu `frontend`:
        ```bash
        cd frontend
        ```
    - Zainstaluj zależności:
        ```bash
        npm install
        ```
    - Uruchom aplikację:
        ```bash
        npm start
        ```
    - Aplikacja będzie dostępna pod adresem `http://localhost:3000`

# Działanie aplikacji

Aplikacja pozwala na tworzenie dwóch rodzajów kont:

- **Konto artysty** - pozwala na tworzenie profilu artysty, dodawanie portfolio, umieszczanie
  informacji o swoich umiejętnościach, doświadczeniu, wykształceniu, a także profilach
  społecznościowych.
- **Konto firmy** - pozwala na tworzenie profilu firmy, dodawanie informacji o firmie, umieszczanie
  ofert pracy, a także przeglądanie profili artystów.

Aplikacja pozwala na wyszukiwanie artystów według różnych kryteriów, takich jak:
- **Lokalizacja** - np. Toruń, Warszawa, Kraków, Zdalnie
- **Język** - np. polski, angielski, niemiecki
- **Tagi** - np. fitness, internet, moda, zwierzęta
- **Umiejętności** - np. logo, strona internetowa, plakat, T-shirt
- **Doświadczenie** - np. Junior, Mid, Senior

Aplikacja pozwala na nawiązywanie kontaktu z innymi użytkownikami poprzez czat.

# Dodatkowe informacje

**Zespół projektowy**
Aplikacja została stworzona w ramach zajęć Programowania Zespołowego na Wydziale Matematyki i
Informatyki Uniwersytetu Mikolaja Kopernika w Toruniu.
W skład zespołu wchodzą:

- [Jakub Kasiński](https://github.com/Hunes73)
- [Błażej Cieślewicz](https://github.com/cblazej77)
- [Wojciech Duklas](https://github.com/DuklasW)
- [Konrad Domeradzki](https://github.com/RadzkiK)
- [Yahor Michalenka](https://github.com/YahorM1)

**Użyte technologie**

- **Backend**
    - Język programowania: [Java 17](https://www.java.com/)
    - Framework: [Spring](https://spring.io/)
    - Autoryzacja i uwierzytelnianie: [Spring Security](https://spring.io/projects/spring-security)
    - Komunikacja z bazą danych: [Spring Data JPA](https://spring.io/projects/spring-data-jpa)
    - Baza danych: [PostgreSQL](https://www.postgresql.org/)
    - Generowanie kodu: [Lombok](https://projectlombok.org/)
    - Dokumentacja API: [Swagger](https://swagger.io/)
    - Konteneryzacja: [Docker](https://www.docker.com/)
    - Budowanie aplikacji: [Maven](https://maven.apache.org/)
    - Wszystkie zależności dostępna jest w pliku `backend/pom.xml`

- **Frontend**
    - Język programowania: [JavaScript](https://developer.mozilla.org/pl/docs/Web/JavaScript)
    - Framework: [React](https://reactjs.org/)
    - Routing: [React Router](https://reactrouter.com/)
    - Klient HTTP: [Axios](https://axios-http.com/)
    - CSS-in-JS: [Styled Components](https://styled-components.com/)
    -
  Ikony: [React Icons](https://react-icons.github.io/react-icons/), [Font Awesome](https://fontawesome.com/)
    - Modal: [React Modal](https://github.com/reactjs/react-modal)
    - Listy rozwijane: [React Dropdown](https://github.com/fraserxu/react-dropdown)
    - Wszystkie zależności dostępna jest w pliku `frontend/package.json`

- **Inne**
    - Kontrola wersji: [Git](https://git-scm.com/)
    - Repozytorium kodu: [GitHub](https://github.com)