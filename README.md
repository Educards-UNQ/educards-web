# EduCards
Juego de cartas interactivo que busca modificar la forma en la que las personas aprenden y se interesan por la historia. Ofreciendo un juego competitivo donde se suman puntos por recordar fechas de eventos importantes a lo largo de historia en general donde podemos encontrar categorías como Musica, Historia General, etc.


## Instalación y ejecución 

    git clone https://github.com/Educards-UNQ/educards-web.git
    npm install
    npm install -s request-promise request
	npm start
	curl -v -X GET http://localhost:8080/api/
	
## Funcionamiento

| Acción | Endpoint | Argumentos de Request | Respuesta |
| ------ | ------ | ------ | ------ |
| Registrar un jugador | POST /api/players | Body: { "name": "Liza",  "year": 24,  "image": "default.png",  "password": "1234" } | Status: 201 Json: {  "id": <idPlayer>  "name": "Liza",  "year": 24, "image": "default.png", "password": "1234"} |
|Loguear un jugador |GET /api/players | Query: name: Liza password: 1234 | Status: 200 Json: {  "id": <idPlayer> "name”: "Liza",  "year”: 24, "image”: "default.png", "password": "1234" } |
| Agregar ranking a un jugador | POST /api/rankings | Body: {  "id": <idPlayer>,  "rank": <gamePoints>} | Status: 201 Json: [20, 60, 30, 100] |
| Obtener los mejores rankings | GET /api/rankings | | Status: 200 Json: [Ranking1, Ranking2, Ranking3]
| Editar un jugador | PUT /api/players/<id> | Query: {name: Melody, year: 25, password: 1234} | Status: 201 Json: { "id": <idPlayer>,  "name”: "Melody", "year”: 25, "image”: "default.png", "password": "1234"} |
| Crear una partida | POST /api/play | Query: cant: 5 theme: “Story” | Status: 201 Json: [card1, card2, card3, card4, card5] |


## Registrode errores:

| Acción | StatusCode Respuesta | Body respuesta |
| ------ | ------ | ------ | 
| Se intenta registrar un jugador duplicado | 409 | { status: 409, errorCode: "RESOURCE_ALREADY_EXISTS"} |
| Se intenta editar un jugador con un nombre en uso | 409 | {status: 409, errorCode: "RESOURCE_ALREADY_EXISTS"} |
| Se intenta obtener un jugador inexistente | 404 | { status: 404, errorCode: "RESOURCE_NOT_FOUND"} |
| Se intenta obtener un jugador con una contraseña incorrecta | 400 | { status: 400, errorCode: "BAD_REQUEST" } |
| Falta ingresar parámetros a la petición | 400 | {status: 400, errorCode: "BAD_REQUEST"} |
| Se envía un JSON inválido en el BODY | 400 | {status: 400, errorCode: "BAD_REQUEST"} |
| URL inexistente | 404 | {status: 404, errorCode: "RESOURCE_NOT_FOUND"} |
|Fallo inesperado | 500 | {status: 500, errorCode: "INTERNAL_SERVER_ERROR"} |



