const picklify = require('picklify'); // para cargar/guardar Educards
const fs = require('fs'); // para cargar/guardar Educards
const Card = require('./models/card.js');
const Player = require('./models/player.js');
const AdmCards = require('./models/admCards.js');
const AdmPlayers = require('./models/admPlayers.js');

class Educards {

  constructor() 
  {
    this.admCards = new AdmCards();
    this.admPlayers = new AdmPlayers();
    this.ids = 0;
  }
  
// returna: Una identificación irrepetible.
  getId()
  {
    this.ids++;
    return this.ids;
  }

  // retorna: Todos las cartas.
  getCards()
  {
    return this.admCards.getCards();
  }

  // retorna: Todas los jugadores.

  getPlayers()
  {
    return this.admPlayers.getPlayers();
  }


  save(filetittle) 
  {
    const listenersBkp = this.listeners;
    this.listeners = [];

    const serializedData = picklify.picklify(this);

    this.listeners = listenersBkp;
    fs.writeFileSync(filetittle, JSON.stringify(serializedData, null, 2));
  }

  static load(filetittle) 
  {
    const serializedData = fs.readFileSync(filetittle, {encoding: 'utf-8'});
    //Agregar a la lista todas las clases que necesitan ser instanciadas
    const classes = [Educards, Card, AdmCards, AdmPlayers, Player];
    return picklify.unpicklify(JSON.parse(serializedData), classes);
  }
  
}

module.exports = Educards;
