const Ranking = require('./ranking.js');

class AdmPlayers
{
  constructor() 
  {
    this.players = [];
  }

  getPlayers()
  {
    return this.players;
  }

  addPlayer(newPlayer)
  {
    if (this.hasPlayerToAdd(newPlayer.getName()))
    {
      throw new Error('El jugador ' + newPlayer.getName() + ' ya fue registrado');
    }
    this.players.push(newPlayer);
  }

  addRank(playerId, playerRank){
    this.findPlayerById(playerId).addRank(playerRank);
  }

  // retorna: True si el jugador playerToAdd se encuentra registrado.
  hasPlayerToAdd(playerName)
  {
    return this.getAllNamesPlayers().includes(playerName);
  }

  // retorna: todos los nombres de los jugadores registrados.
  getAllNamesPlayers()
  {
    return this.players.map(player => player.getName());
  }

  removePlayer(playerName)
  {
    const playerToRemove = this.findPlayerByName(playerName);
    this.validatePlayerName(playerName, playerToRemove);
    const indexToRemove = this.players.indexOf(playerToRemove);
    this.players.splice(indexToRemove,1);
  }

  findPlayerByName(playerName)
  {
    return this.players.find(player => player.hasName(playerName));
  }

  validatePlayerName(playerName, player)
  {
    if (player === undefined)
    {
      throw new Error('No se encontró el jugador con el nombre: ' + playerName);
    }
  }

  getRankingFromPlayer(playerId)
  {
    return this.findPlayerById(playerId).getRankings();
  }

  getTheBestRankings()
  {
    return this.players.map(player => this.createRanking(player));
  }

  createRanking(player)
  {
    return new Ranking(player.getName(), player.getBestRank());
  }

  // Edita el perfil del jugador con la identificacion idPlayer
  editProfile(idPlayer, newName, newAge, newPassword)
  {
    this.validateEditPlayerName(idPlayer, newName);
    const editPlayer = this.findPlayerById(idPlayer);
    editPlayer.editProfile(newName, newAge, newPassword);
  }

  // retorna: un jugador con la identificacion playerId
  findPlayerById(playerId)
  {
    return this.players.find(player => player.hasId(playerId));
  }

  // retorna: una excepcion si el nombre newName ya esta siendo usado por un jugadore que no tenga la id idPlayer
  validateEditPlayerName(idPlayer, newName)
  {
    if (this.hasAnyPlayerName(idPlayer, newName))
    {
      throw new Error("ERROR DE EDICION: Ya existe un jugador con el nombre " + newName);
    } 
  }

  // retorna: True si existe un jugador con el nombre newName que no sea de identificacion idPlayer.
  hasAnyPlayerName(idPlayer, newName) 
  {
    const foundPlayer = this.findPlayerByName(newName);
    return foundPlayer !== undefined && (!foundPlayer.hasId(idPlayer) );
  }
}

module.exports = AdmPlayers;