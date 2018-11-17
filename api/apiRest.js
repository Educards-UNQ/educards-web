/* eslint-disable no-undef */
/* eslint-disable prefer-arrow-callback */
const express = require('express'); // call express
const app = express(); // define our app using express
const router = express.Router();
const port = process.env.PORT || 8080; // set our port
const educardsMod = require('./educards'); // importamos el modulo educards
const fs = require('fs'); // se necesita para guardar/cargar educards
const bodyParser = require('body-parser');
const errors = require('./errors/apiError.js'); // api de errores

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);
app.use(errorHandler); // Registramos un manejador de errores
app.listen(port);
console.log('Magic happens on port ' + port);


// <*><*><*><*><*> PERSISTENCIA DE DATOS <*><*><*><*><*>

// Retorna una instancia de Educards. Si existe filename, recupera la instancia desde el archivo.
function getEducards(filename = 'data.json') 
{
  let educards = new educardsMod.Educards();
  if (fs.existsSync(filename)) {
    educards = educardsMod.Educards.load(filename);
  }
  return educards;
}
  
function saveEducards(educards, filename = 'data.json') {
  educards.save(filename);
}

// <*><*><*><*><*> MANEJO DE ERRORES <*><*><*><*><*>

// Error de URL invalida
app.use((req, res, err) => {
  const error = new errors.InvalidOrUnexistingURLError();
  res.status(error.status);
  res.json({status: error.status, errorCode:error.errorCode});
});

// ErrorHandler
function errorHandler(err, req, res, next) {
  console.error(err.name); // se imprime error en consola
  //actuamos dependiendo el tipo de error 
  if (err instanceof errors.ApiError)
  {
    res.status(err.status);
    res.json({status: err.status, errorCode: err.errorCode});
  } 
  else if (err.type === 'entity.parse.failed')
  {
  // body-parser error para JSON invalido
    res.status(err.status);
    res.json({status: err.status, errorCode: 'BAD_REQUEST'});
  } 
  else 
  {
    // continua con el error handler por defecto
    next(err);
  }
}

// <*><*><*><*><*> IMPLEMENTACION SERVICIOS <*><*><*><*><*>

// Ruta inicial de nuestra API
router.get('/', (req, res) => 
{
  res.json({ message: 'Hooray! welcome to our api!' });
});

// Agregar un jugador
router.route('/players').post(function (req, res)
{
  const data = req.body;
  const educards = getEducards();

  // Lanzar error si no se ingresaron los parámetros correctos.
  if (data.name === undefined || data.year === undefined || data.image === undefined || data.password === undefined)
  {
    throw new errors.InvalidJsonError();
  }
  // Lanza error si ya existe un jugador con ese nombre
  if(educards.hasPlayerToAdd(data.name))
  {
    throw new errors.PlayerHasAlreadyBeenRegisteredError(data.name);
  }
  const newPlayer = educards.addPlayer(data);
  const response = 
  {
    id: newPlayer.id, 
    name: newPlayer.name,
    year: newPlayer.year,
    image: newPlayer.image,
    password: newPlayer.password 
  };
  res.status(201);
  res.json(response);
 
  saveEducards(educards);
});

// Obtener un jugador por su nombre y contraseña.
router.route('/players').get(function (req, res)
{
  const playerName = req.query.name;
  const playerPass = req.query.password;
  
  const educards = getEducards();

  if (playerName === undefined || playerPass === undefined)
  {
    throw new errors.MissingParemetersError();
  }
  
  const foundPlayer = educards.searchPlayer(playerName);

  if (foundPlayer === undefined)
  {
    throw new errors.UnexistingPlayerError(playerName);
  }

  if (! foundPlayer.hasPass(playerPass))
  {
    throw new errors.WrongPasswordError();
  }

  const player = 
  {
    id: foundPlayer.getId(), 
    name: foundPlayer.getName(), 
    year: foundPlayer.getYear(), 
    image: foundPlayer.getImage(), 
    password: foundPlayer.getPassword(),
  };
  res.status(200);
  res.json(player);
});

// Agregar un puntaje a un jugador.
router.route('/rankings').post(function (req, res)
{
  const playerId = req.body.id;
  const playerRank = req.body.rank;
  const educards = getEducards();

  // Lanza excepcion si no se pasaron los parametros correspondientes.
  if (playerId === undefined || playerRank === undefined)
  {
    throw new errors.MissingParemetersError();
  }
  educards.addRank(playerId, playerRank);
  const playerRanking = educards.getRankingFromPlayer(playerId);
  res.status(201);
  res.json(playerRanking);
 
  saveEducards(educards);
});

// Obtener los mejores rakings de todos los jugadores.
router.route('/rankings').get(function (req, res)
{
  const educards = getEducards();
  const rankings = educards.getTheBestRankings();
  res.status(200);
  res.json(rankings);
 
  saveEducards(educards);
});

