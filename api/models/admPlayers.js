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

}

module.exports = AdmPlayers;