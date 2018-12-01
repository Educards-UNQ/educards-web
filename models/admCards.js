class AdmCards
{

  constructor() 
  {
    this.cards = [];
  }

  getCards()
  {
    return this.cards;
  }

 addCard(newCard)
  {
    if (this.hasCardToAdd(newCard))
    {
      throw new Error('La carta ' + newCard.getTittle() + ' ya fue registrada');
    }
    this.cards.push(newCard);
  }

// retorna: True si la carta cardToAdd se encuentra registrado.
  hasCardToAdd(cardToAdd)
  {
    return this.getAllTittleCards().includes(cardToAdd.getTittle());
  }

  // retorna: todos los titulos de las cartas registradas.
  getAllTittleCards()
  {
    return this.cards.map(card => card.getTittle());
  }

  removeCard(cardTittle)
  {
    const cardToRemove = this.findCardByTittle(cardTittle);
    this.validateCardName(cardTittle, cardToRemove);
    const indexToRemove = this.cards.indexOf(cardToRemove);
    this.cards.splice(indexToRemove,1);
  }

  findCardByTittle(cardTittle)
  {
    return this.cards.find(card => card.hasTittle(cardTittle));
  }

  validateCardName(cartTittle, card)
  {
    if (card === undefined)
    {
      throw new Error('No se encontró una carta con el titulo: ' + cartTittle);
    }
  }

  // retorna: una cantidad cant de cartas aleatoriamente.
  getPlayingCards(cant)
  {
    const indexsList = this.getRandomIndexs(cant);
    const playingCards = indexsList.map(num => { return this.cards[num];});
    return playingCards;
  }

  // retorna: una lista con una cantidad cant de numeros aleatorios irrepetibles.
  getRandomIndexs(cant)
  {
    const indexsList = this.generateIndexs();
    const result = [];
    for (var i=0; i<cant; i++)
    {
      const index = this.getRandomInt(0, indexsList.length-1); // Obtengo un numero aleatorio dentre 0 y el maximo
      const indexToAdd = indexsList[index]; // obtengo el index en la posicion del numero aleatorio.
      result.push(indexToAdd); // Agrego el index a mi lista de resultados.
      indexsList.splice(index,1); // Elimino el index ya usado de la lista original.
    }
    return result;
  }

  generateIndexs()
  {
    const maxIndex = this.cards.length;
    const result = [];
    for (var i=0; i<maxIndex; i++)
    {
      result.push(i);
    }
    return result;
  }

  getRandomInt(min, max) 
  {
    return Math.round(Math.random() * (max - min) + min);
  }
}

module.exports = AdmCards;